
;

ubr = {
  setCatalogURI: function (uri) {
    ubr.globalCatalogURI = uri;
  },
  setFeedProxyURI: function (uri) {
    ubr.feedProxyURI = uri;
  },
  setBookBaseURI: function (uri) {
    //Debug.log('setting book base URI to '+uri);
    ubr.bookBaseURI       = uri;
  },
  purchaseBook: function (e)
  {
    /*
    if(e) {
     e.stopPropagation();
     e.preventDefault();
    }
    ubr.hide(dojo.byId("flow"));
    ubr.uiView.showLoadAnim();
    var newurl = 'http://'+window.location.host+'/store/purchase?buyid='+ubr.bookId;
    ubr.close(newurl);
    */
  },
	isPaginating: function () {
	  return ubr.pageCtl.isPaginating();
	},
	close: function(redir)
	{
    //alert('closing reader');
		ubr.APPCLOSED = true;
		//ubr.deActivatePlugins();
    ubr.navCtl.saveMark();
    //alert('your location has been saved at '+ubr.currentHref); 
		if(redir) document.location.href = redir;
	},
	logout: function ()
	{
	  ubr.sendLogout(dojo.hitch(this, function (){
      window.location.reload();
    }));
	},
	setMark: function ()
	{ // pass in a mark obj to set,
	  // or it will create from
     return ubr.navCtl.setMark();
	},
	getMark: function () {
      return ubr.navCtl.getMark();
	},
	saveMark: function() {
      ubr.navCtl.saveMark();
	},
	invalidatePageCache: function ()
	{ // nullifys all page nodes for all sections
      ubr.pageModel.invalidatePageCache();
	},
	getPages: function ()
  {
     ubr.navCtl.getPages();
  },
	unloadPageView: function () {
       ubr.pageCtl.unloadPageView();
	},
	getViewport: function () {
	  
	  // (asm) copied from dijit library - why would they move this to dijit?
	  
	  var _window = dojo.global;
    var _document = dojo.doc;


    // get viewport size
    var w = 0, h = 0;
    var de = _document.documentElement;
    var dew = de.clientWidth, deh = de.clientHeight;
    if(dojo.isMozilla){
    	// mozilla
    	// _window.innerHeight includes the height taken by the scroll bar
    	// clientHeight is ideal but has DTD issues:
    	// #4539: FF reverses the roles of body.clientHeight/Width and documentElement.clientHeight/Width based on the DTD!
    	// check DTD to see whether body or documentElement returns the viewport dimensions using this algorithm:
    	var minw, minh, maxw, maxh;
    	var dbw = _document.body.clientWidth;
    	if(dbw > dew){
    		minw = dew;
    		maxw = dbw;
    	}else{
    		maxw = dew;
    		minw = dbw;
    	}
    	var dbh = _document.body.clientHeight;
    	if(dbh > deh){
    		minh = deh;
    		maxh = dbh;
    	}else{
    		maxh = deh;
    		minh = dbh;
    	}
    	w = (maxw > _window.innerWidth) ? minw : maxw;
    	h = (maxh > _window.innerHeight) ? minh : maxh;
    }else if(!dojo.isOpera && _window.innerWidth){
    	//in opera9, dojo.body().clientWidth should be used, instead
    	//of window.innerWidth/document.documentElement.clientWidth
    	//so we have to check whether it is opera
    	w = _window.innerWidth;
    	h = _window.innerHeight;
    }else if(dojo.isIE && de && deh){
    	w = dew;
    	h = deh;
    }else if(dojo.body().clientWidth){
    	// IE5, Opera
    	w = dojo.body().clientWidth;
    	h = dojo.body().clientHeight;
    }


    // get scroll position
    var scroll = dojo._docScroll();


    return { w: w, h: h, l: scroll.x, t: scroll.y };	//	object
	}

}

Stage = function ()
{

            this.loadanim       = dojo.byId("loadprogress"); 
      		  this.tocitems		= dojo.byId('ubrTocItems'); // holds items
            this.pageProg      = dojo.byId('pageProg');
            this.pageProgStatus      = dojo.byId('pageProgStatus');
            this.progFill     = dojo.byId('progressFill');
            this.progMeter    = dojo.byId('progressMeter');
            this.book = dojo.byId('flow');
            this.flow = dojo.byId('flow');
}


PubSubP8n = {
  
  /*
  
  Pubsub Pagination copyright(c) 2008 Aaron Miller, may only be reused under
  Gnu Public License (GPL). See http://www.gnu.org for full terms
  Parts of this were derived from a function in the Dojo 0.4.3 library
  
  */
  
  active:false,
  callbackStack:  {
    page: [],
    lastpage: [],
    resize: [],
    viewchange: []
  },
	pmap: [],
	reversePmap: [],
	currentPara: null,
	pagePointer: null,
	pageCount: 0,
	sub_pagedata: null,
	sub_complete: null,
  refsQ:[],
  workers:{ length:0, grid:{} },
  workerSpeed:10,
  maxheight:1,
  singletons: ["br", "img", "hr", "input", "!--"],
  singletonre: new RegExp( '/('+["br", "img", "hr", "input", "!--"].join('|')+')/', "i"),
  chop: ["<BR>", "<br>", "<br/>", "<br />", "<p></p>", "<P></P>"],
  hre: /height\s*?=\s*?"(\d+?%?)"/,
	wre: /width\s*?=\s*?"(\d+?%?)"/,
	minimgscaleratio: .30,
  ERR_NODE_NEGATIVE_HEIGHT:100,
	getInstance: function() {
		return this;
	},
  getActive:function() {
    return this.active;
  },
  registerHandler:function (name, cb) {
    Debug.log('registering p8n handler');
    this.callbackStack[name].push(cb);
    return this.callbackStack[name].length;
    
  },
  fireCallbacks:function () {
	  //console.log('fireCallbacks');
    var results = [];
    var args = Array.prototype.slice.call(arguments);
    var name = args.shift();
		//console.log(name);
    if(!this.callbackStack[name]) return results;
    for(var i=0; i < this.callbackStack[name].length; i++) {
      results.push(this.callbackStack[name][i].apply(this, args));
    }
    return results;
  },
  setFlowContent:function(str, refnode, maxheight){

		//console.log('maxheight is '+maxheight);
    // try to precache in the node
    //refnode.innerHTML = str;
    //console.log('loaded str:'+str);
    if(!str) throw 'Cannot load a null as string';
    var ind = this.refsQ.push({str:str,refnode:refnode,maxheight:maxheight,lastlen:undefined});
    var id = ind+'_'+(new Date()).getTime();
    if(!this.active) {
      //console.log('not active, activating');
      this.activate(id);
    } else {
      //console.log('already active, stored in Q');
    }

		dojo.unsubscribe(this.sub_pagedata);
    this.sub_pagedata = dojo.subscribe('p8n/'+id+'/pagedata', dojo.hitch(this, function() {
			//console.log('firing page callbacks');
			this.fireCallbacks('page',arguments);
		}));
		dojo.unsubscribe(this.sub_complete);
    this.sub_complete = dojo.subscribe('p8n/'+id+'/complete', dojo.hitch(this, function() {
			this.fireCallbacks('lastpage');
		}));

    return (id); // index into array
  },
  activate:function(id) {
    //main processing loop
    if(this.refsQ.length > 0) {
      this.active = true;
      //console.log('id '+id+' now active');
      var strdata = this.refsQ[0]['str'];
      //console.log('processing '+strdata.length+' bytes of data');
      //console.log('subscribing to completion event');
      this.subscribe('p8n/'+id+'/complete', this, function() {
        /* on completion of task, we will: */
        this.removeWorker(id);
        //console.log(this.workers);
        this.refsQ.shift(); // get rid of empty string  
        this.active = false;
      });
      /* until then: */
      //console.log('calling worker to work');
      this.assignWorker(id); 
    }
  },
  assignWorker:function(id) {
    
    // main work loop -- splits and tests string against layout box
    
    //console.log('fitting '+this.refsQ[0]['str'].substr(0,20)+' into node '+this.refsQ[0]['refnode']);
    this.workers.grid[id] = setInterval(dojo.hitch(this, function () {
      //console.log('worker '+id+' on interval '+ this.workers.grid[id] +' is working at '+this.workerSpeed+' ms pace ...');
      // grab buffer

        var html = this.refsQ[0]['str'];
        var node = this.refsQ[0]['refnode'];
      //	dojo.style(node, 'height', 'auto');
      	var maxheight = this.refsQ[0]['maxheight'];
      //	console.log('this workers maxheight is '+maxheight);
        if(maxheight < 1) {
          dojo.publish('p8n/'+id+'/complete', [ (new Date()).getTime(), this.ERR_NODE_NEGATIVE_HEIGHT ]);
        }
      	var i = 0; var limit = html.length; var add = 0; var doLoop = true;

         //asm 10-10-09 commented for testing
         
      	html = this.adjustFirstImage(node, html, maxheight);

      	while (doLoop) { 
      		add = Math.round((limit - i) / 2); // take half of untested string
      	//	console.log(add);
            if (add <= 1) { // if one or less, stop
      			doLoop = false;
      		}
      		i += add; 
      		
      		
      		
      	//  console.log('before:'+node.scrollHeight);
         // console.log(html.substr(0, i));
          
          if(html.substr(0, i).match(/<[^>]*?$/)) {
           // console.log('looks like a broken tag');
            var poo = html.substr(i).indexOf('>');
            if(poo!=-1) {
              i += (poo+1);
          //    console.log('advanced i from '+i+' to '+(poo+i+1));
              //console.log(html.substr(0, (i+poo+1)));
            }
          }
         
         /* TEST THIS FRAGMENT IN OUR BOX */
       // console.log('** testing fragment of length '+html.substr(0, i).length+' **');
      	node.innerHTML = html.substr(0, i); // test half of the string
      		
      		
      		
      //	  console.log('after:'+node.scrollHeight);
      		if (node.scrollHeight > maxheight) { // too big for box?
      	//		console.log('too big');
      			limit = i;
      			i -= add;
      		}
      	}
      	var s = this.splitAndBalance( html, i );

      	//s.page = this.adjustFirstImage(node, s.page, maxheight);

        dojo.publish('p8n/'+id+'/pagedata', [ s.page, s.remainder.length ]);

        //node.innerHTML = ''; // clear to avoid id conflict
        if(s.remainder.length > 0) {
          if(this.refsQ[0]['lastlen'] == s.remainder.length) {
                // this should NOT happen, but does
                // usually when all the following pages fail to fit due to large 
                // images overrunning the boundaries
        //    console.log('abnormal completion');
            dojo.publish('p8n/'+id+'/complete', [ (new Date()).getTime(), 'FAILED' ]);

          } else {
            this.refsQ[0]['lastlen'] = s.remainder.length;
            this.refsQ[0]['str'] = s.remainder;
          }
        } else {
          dojo.publish('p8n/'+id+'/complete', [ (new Date()).getTime() ]);

        }
        
   
    }), this.workerSpeed);
    this.workers.length++;
  },
  adjustFirstImage:function(node, html, maxheight) {
    /*
      Given a node, some html to fit, and a max page height,
      use the dom to figure out whether the first image on 
      the page will fit. If not, use a regex to force a
      suitable height on it, and return the html.
    */
    
  	node.innerHTML = html; // place in dom
  	var imgnodes = dojo.query('img', node); // quickly grab img els
  	if(imgnodes[0]) {

  	  var lh = dojo.style(node, 'lineHeight');
  	  //console.log('current line height is '+lh);
  	  var maxlines = (maxheight/lh);
  	  //console.log('max lines to fit on this page: '+maxlines);
  	  
  	  
  	  var imgcoords = dojo.coords(imgnodes[0]);
  	  var nodecoords = dojo.coords(node);
  	  var imgh = imgcoords.h;
  	  //console.log('image is '+imgh+' pixels high');
  	  var imagetop = imgcoords.y;
  	  //console.log('top of image is at '+imagetop);
	    var imagebottom = imgh + imagetop;
	    //console.log('reported bottom of image is at '+imagebottom);
	    var pagebottom = nodecoords.y + maxheight;
	    //console.log('computed bottom of page is '+pagebottom);
      
      if(imagetop > pagebottom) return html;
      
		  if(imagebottom > pagebottom) {
	      //console.log('imagebottom exceeds pagebottom - is bigger than our allowed page size of '+(maxheight)+', resizing by '+(imagebottom - pagebottom)+' plus 10 pixels');
	      //  bottom of page (node bottom y) - top of image (image top y) plus
	      var hadjust = Math.floor(imagebottom - pagebottom);
	      var newh = imgh - hadjust;
	      if(newh > 20) {
	        newh = newh - 60;
	      }
	      var ratio = (newh/imgh);
  	    var neww = Math.floor(ratio * imgcoords.w);
	      //console.log('scale ratio is '+ratio);

   	      // use regex instead of updating dom
   	      // imgnodes[0].setAttribute('height', adjustheight);
    	    html = html.replace(/<img\s([^>]+?)>/, function (tag, atts, offset) {
            //console.log('tag is '+tag+', replacing height attribute val');
            var prepend = '';
            if(atts.match(this.hre)) {
              atts = atts.replace(this.hre, 'height="'+newh+'"');
            } else {
              prepend += 'height="'+newh+'" ';
            }
            //console.log('atts now '+atts+', replacing width attribute val');
            if(atts.match(this.wre)) {
              atts = atts.replace(this.wre, 'width="'+neww+'"');
            } else {
              prepend += 'width="'+neww+'" ';
            }
            atts = prepend+atts;
            //console.log(atts);
            return '<img '+atts+'>';
      		});	        

	    } 
	  }
  	return html; 
  },
  
  
  splitAndBalance:function(html, i) {

    /*
    Given a wad of html and a suggested index into that string,
    this will calculate the best adjusted index to split the
    string, split it, and balance the tags on the first and
    second resulting chunks of html, returning those two chunks.
    */
    
    var str = html;
    var subby = str.substr(0, i);
    if (subby != str) {
  		var lastSpace = subby.lastIndexOf(" ");
  		var lastNewLine = subby.lastIndexOf("\n");
  		var lastGreater = subby.lastIndexOf(">");
  		var lastLess = subby.lastIndexOf("<");
  		if (lastLess <= lastGreater && lastNewLine == i - 1) {
  			i = i; // perfect index was passed!
  			//console.log('perfect index passed!');
  		} else {
  			if (lastSpace != -1 && lastSpace > lastGreater && lastGreater > lastLess) {
  				i = lastSpace + 1; // index after tag, break after last space
  				//console.log('split index is between tags, adjusting to last space');
  			} else {
  				if (lastLess > lastGreater) { 
  					i = lastLess; // index in middle of tag, move index to start of next tag
//  					console.log('middle of tag, adjusted index to start of next tag');
  				} else {
  					if (lastGreater != -1) { // there is at least one complete tag here
  						i = lastGreater + 1;
  					//	console.log('adjusted index to just after first complete tag');
  					}/* else {
  					  console.log('ERROR! no complete tags found!');
  					}
             */
  				}
  			}
  		}
  	}
    str = str.substr(0, i);
  	var ret = html.substr(str.length);
  	var openTags = [];
  	var doPush = true;
  	var tags = str.split("<"); // break into discrete open/close tags
  	
  	//last tag on page            '/p>' or 'p class="">'
  	
  	tags.shift();
  	
  	
  	// run thru all tags, stacking open tags as theyre found and popping them when closed
  	// leftover open tags will be balanced in the first return string, and
  	// leftover close tags balanced by prepending to the second return
  	
  	for (var j = 0; j < tags.length; j++) {
  		
 
  		var tagj = tags[j].split(">")[0]; //    '/p' or 'p class=""'

  		if (tagj.charAt(tagj.length - 1) == "/") {  //  only true for 'img ... /', ' br/', etc
  			continue; // short circuit the loop for closed singleton tags
  		}
  		
 
  		// except for singleton, push open tags onto stack
  		
  		if (tagj.charAt(0) != "/") { // opening tags eg 'p class=""'

  		  // i think the following is faster than the loop below it




        if(!tagj.split(" ")[0].match(this.singletonre)) {
          
          // push all but singleton tags onto open stack
                                              
          openTags.push(tagj);
        }
        
  		  /*
  			for (var k = 0; k < this.singletons.length; k++) {
  				if (tags[j].split(" ")[0].toLowerCase() == this.singletons[k]) {
  					doPush = false;
  				}
  			}

  			if (doPush) {
          openTags.push(tags[j]);
  			}
  			doPush = true;
  			*/

  		} else { //close tags, eg '/p' will pop the 
  		  openTags.pop();

  		}
  	}
/*
  	for (var j = 0; j < this.chop.length; j++) {
  		if (ret.charAt(0) == "\n") {
  			ret = ret.substr(1);
  		}
  		while (ret.indexOf(this.chop[j]) == 0) {
  			ret = ret.substr(this.chop[j].length);
  		}
  	}
  */	

  	// add close tags for page chunk, open tags for return chunk
  	// goes in reverse order
  	for (var j = openTags.length - 1; j >= 0; j--) {
      //str = str.replace(/\s\s*$/,''); //trim trailiing whitespace
      
      // ?? need the minus one on this? i think to check for full tag with > at end
    
  		var ot = openTags[j];    
      var lastot = str.lastIndexOf(ot);
      //Debug.log('last open tag is at '+lastot+', character there is '+str[lastot+1]);
  		if (lastot == (str.length - ot.length - 1)) {
  		  
  		  // if tag is 'p class=""', find last index of it in str
  		  // is it 'p class="">' at end of str?
  		  
  		  
  		  // trim the str to right before the open tag
  		  str = str.substring(0, lastot-1); // asm: the -1 fixes the stranded &lt/&gt bug
  		  Debug.log(str);
  		  // this way open tags at end of string get pruned and not closed
  		  
  		  ret = ["<" , ot , ">" , ret].join(''); // append the pruned tag to return
        
        
  		} else {
  		  
  		  // if not a stranded open tag, close it - this should be the condition for
        // paragraph splits eg '<p>text text text' .../... 'text text</p>'
  		  

        
  		  if(ot.indexOf(" ")) { // account for attributes
  		    str += ["</" , ot.split(" ")[0] , ">"].join('');
  		  } else {
  			 str += ["</" , ot , ">"].join('');
  		  }
  		  
  		  
  		    		
  		////  move below back into block below?  		
         if (ret.length > 0) {
   
               /** added by asm **/

               // this used to only add fragment class to paragraphs
               // experimenting with adding it to any element
              // var otj = openTags[j];
              if(openTags[j].search(/^p[^a-z]*?/) != -1) {
             //  {
                // if(openTags[j].search(/class="([^"]*?)"/) != -1) {
                /* 
                if(openTags[j].match(/class="([^"]*?)"/)) { 
                    openTags[j] = openTags[j].replace(/class="([^"]*?)"/, ' class="$1 fragment"');
                 } else {
                    openTags[j] += ' class="fragment" '; 
                 }
                 
                 */
                if(ot.match(/class="([^"]*?)"/)) { 
                    ot = ot.replace(/class="([^"]*?)"/, ' class="$1 fragment"');
                } else {
                    ot += ' class="fragment" '; 
                }            
              }
               /** end asm added **/
   
               ret = ["<" , ot , ">" , ret].join('');
   
         }
  		  
  		  
  		  
  		}
  		


  		
  		
  		
  		
  		
  	}

/*
  	for (var j = 0; j < this.chop.length; j++) {
  		if (ret.charAt(0) == "\n") {
  			ret = ret.substr(1);
  		}
  		while (ret.indexOf(this.chop[j]) == 0) {
  			ret = ret.substr(this.chop[j].length);
  		}
  	}
 */

  	return { page: str, remainder: ret };
  },
  removeWorker:function(id) {
    //console.log('clearing interval '+this.workers.grid[id]+' for worker '+id);
    clearInterval(this.workers.grid[id]);
    delete this.workers.grid[id];
    this.workers.length--;
    //console.log('done');
  },
  publish: function(topic, arr) {
    dojo.publish(topic, arr);
  },
  subscribe: function(topic, context, cb) {
    dojo.subscribe(topic, context, cb);
  },
	showPara: function (/*Integer*/ par) {
    
    
    /**
    
      Shows the referenced paragraph (by document order)
      in the view, setting the paragraph pointer to it
      and setting the page according. Returns the new page num.
      
    */
		//console.log('showPara:');
    //console.log(par);
		//console.log(this.pmap);
    var p = 0;
    if(this.pmap[par]) {
      if(this.pmap[par].page) {
        p = this.pmap[par].page;
        this.currentPara = par;
      } else {
				//console.log('not in map');
			}	
    } else {
			//console.log('not found');
		}
    return this.setPage(p);
  },
  getPmap: function () {
    return this.pmap;
  },
  getReversePmap: function() {
    return [];
  },
  setPage: function (/*Integer*/ num) {
    
    /** 
    
    Shows page in view, setting index accordingly,
    unless bounds checking fails. Works by calculating
    difference between passed integer and current page
    index, then moving view to pixel position. Resets
    para pointer to first para on page.
    
    */
    return this.setPageInView(num);
  },
  setPageInView: function (num) {
      //console.log('set page in view:'+num);
			if(!this.pagePointer) return 0;
      if(num > this.pageCount - 1) return this.pagePointer;
      if(num < 0) return this.pagePointer;    
      this.pagePointer = num;
      if(this.reversePmap.length>0) {
        if(this.reversePmap[this.pagePointer]) {
          this.currentPara = this.reversePmap[this.pagePointer][0];
        }
      }
      return this.pagePointer;
    }

  
}
ubr.touch = {};

ubr.touch.controller = {
    init: function() {
        if (ubr.iPhone) {
            ubr.touch.controller.dispatch['touchstart'] = ubr.touch.controller.actionStart;
            ubr.touch.controller.dispatch['touchmove'] = ubr.touch.controller.actionChange;
            ubr.touch.controller.dispatch['touchend'] = ubr.touch.controller.actionEnd;
        } else {
            ubr.touch.controller.dispatch['mousedown'] = ubr.touch.controller.actionStart;
            ubr.touch.controller.dispatch['mousemove'] = ubr.touch.controller.actionChange;
            ubr.touch.controller.dispatch['mouseup'] = ubr.touch.controller.actionEnd;
        }
    },
    dispatch: {
        
        mouseup: function () {},
        mousemove: function () {},
        mouseout: function () {},
        mousedown: function () {},
        mouseenter: function () {},
        mouseover: function () {},
        touchstart: function () {},
        touchenter: function () {},
        touchleave: function () {},
        touchhold: function () {},
        touchmove: function () {},
        touchcancel: function () {},
        touchend: function () {}
    
    },
    actionStart: function (e) {

             ubr.touch.console.actionStart = (new Date()).getTime();
             ubr.touch.console.dwellTime = 0;
             if(e.target.nodeName=='P') {
                ubr.touch.console.paragraphTouched = e.target;
             }
             if(e.targetTouches) {
                 ubr.touch.console.startX = e.targetTouches[0].pageX;
                 ubr.touch.console.startY = e.targetTouches[0].pageY;                        
             } else {
                 ubr.touch.console.startX = e.clientX;
                 ubr.touch.console.startY = e.clientY;                 
             }
             ubr.touch.console.endY = ubr.touch.console.startY;
             ubr.touch.console.endX = ubr.touch.console.startX;      
    },
    actionChange: function (e) {

             if(e.targetTouches) {
                 ubr.touch.console.endX = e.targetTouches[0].pageX;
                 ubr.touch.console.endY = e.targetTouches[0].pageY;                        
             } else {
                 ubr.touch.console.endX = e.clientX;
                 ubr.touch.console.endY = e.clientY;                 
             }

             // uncommenting this will calculate delta on the fly
             
             //ubr.touch.console.deltaY = ubr.touch.console.startY - ubr.touch.console.endY;
             //ubr.touch.console.deltaX = ubr.touch.console.startX - ubr.touch.console.endX;
             

             
             // uncommenting this will enable microfiche effect
            
             //ubr.uiView._consoleTouchResponse(e, clientX, clientY, deltaY);
            
            e.preventDefault();
            e.stopPropagation();
        

    },
    actionEnd: function (e) {
        
            ubr.touch.console.actionEnd = (new Date()).getTime();

             ubr.touch.console.deltaY = ubr.touch.console.startY - ubr.touch.console.endY;
             ubr.touch.console.deltaX = ubr.touch.console.startX - ubr.touch.console.endX;

            if(e.target.id=='purchaseThisBook' || e.target.id=='ubrbuyitbutton') {
              
              // force a click event to occur
              // this is a fix for mobile safari
              // on iphone where the touch event
              // doesn't fire a click when it's on
              // the buy button
              dojo.style(dojo.byId('flow'), 'visibility', 'hidden');
              ubr.uiView.showLoadAnim();
              
              var evObj = document.createEvent('MouseEvents');
              evObj.initEvent( 'click', true, false );
              dojo.byId('purchaseThisBookButton').dispatchEvent(evObj);
              return true;
            }

            ubr.touch.console.touchResponse(e,
                ubr.touch.console.endX,
                ubr.touch.console.endY,
                ubr.touch.console.deltaY,
                ubr.touch.console.deltaX
            );
    },
    globalClickH: function (e) {
        ubr.touch.controller.dispatch[e.type](e);
    }

};

ubr.touch.console = {
    startX: 0,
    startY: 0,
    curX:0,
    curY:0,
    endX: 0,
    endY: 0,
    deltaX: 0,
    deltaY: 0,
    highDeltaY: 0,
    scrollOffset: 0,
    actionStart: 0,
    actionEnd: 0,
    dwellTime: 0,
    actionRunning: false,
    paragraphTouched: null,
    touchResponse: function (e, clientX, clientY, deltaY, deltaX) {
        
        ubr.touch.console.dwellTime = ubr.touch.console.actionEnd  - ubr.touch.console.actionStart; 
        console.log('touch response:'+clientX+','+clientY+','+deltaX+','+deltaY+',dwell:'+ubr.touch.console.dwellTime);


          if(!ubr.consoleShowing) {
              var conditionShowConsole = (
           /*     deltaY < (window.innerHeight/4) && */
                clientX > (window.innerWidth/3) &&
                clientX < 2*(window.innerWidth/3)
              );
              
              var conditionPageNext = (
               
               clientX > 2*(window.innerWidth/3) ||  
               deltaX > (window.innerWidth/5) 
               
              );
              
             var conditionPagePrevious = (
               
               clientX < window.innerWidth/3 ||
               deltaX < -1*(window.innerWidth/5)
               
              );
             
             
             if(conditionPagePrevious) {
                 ubr.navCtl.previousPage();
             } else if(conditionPageNext) {
                 ubr.navCtl.nextPage();
             } else if(ubr.touch.console.paragraphTouched && ubr.touch.console.dwellTime>1000) {
                 ubr.selectionCtl.selectPara(ubr.touch.console.paragraphTouched);
                 ubr.touch.console.paragraphTouched = null;            
             } else if(conditionShowConsole) {
                 ubr.uiView.showConsole();
             } else {
                 e.preventDefault();
                 e.stopPropagation();
             }
             
          } else {

                 ubr.uiView.hideConsole();
              
          }
     
     }
};

ubr.touch.toc = {
   touchResponse: function (e)
   {
       var ts = ubr.touch.tocScroller;
       if(e.type=='touchmove'||e.type=='mousemove') {
             e.preventDefault();
             if(ts.mouseIsDown) {
                 var y = (ubr.iPhone) ? e.targetTouches[0].pageY : e.clientY;
                 ts.highDeltaY = y - ts.curY;
                 ts.curY = y;
                 //console.log(ts.highDeltaY);
                 
                 // adjust scrollTop by however much touch location
                 // has changed since the touchstart
                 ts.scroller.scrollTop = ts.scrollOffset + (ts.startY - y);
             }
           
       } else if(e.type=='touchend'||e.type=='mouseup') {

            ts.mouseIsDown = false;
            ts.endX = ts.curX;
            ts.endY = ts.curY;  
            ts.deltaX = ts.startX - ts.endX;
            ts.deltaY = ts.startY - ts.endY;

            if(ts.highDeltaY > 10 || ts.highDeltaY < -10) {

               // if swiped by more than y-axis threshold,
               // continue to scroll content according to
               // velocity
               
                e.preventDefault();
                //var newpos = ts.scroller.scrollTop + ts.deltaY;
                if(ts.isAnimating) {
                    ts.animation.stop();
                    ts.animation = ubr.touch.factory.getTocAnimation();
                    ts.animation.play();
                } else {
                    ts.animation = ubr.touch.factory.getTocAnimation();
                    ts.animation.play();
                }
            }
       } else if(e.type=='touchstart'||e.type=='mousedown') {
            e.preventDefault();
            ts.mouseIsDown = true;
            ts.startX = (ubr.iPhone) ? e.targetTouches[0].pageX : e.clientX;
            ts.startY = (ubr.iPhone) ? e.targetTouches[0].pageY : e.clientY;
            ts.scrollOffset = ts.scroller.scrollTop; 
       }
   }
};
ubr.touch.factory = {

   iPhoneAddScrolling: function ()
   {
               
         /**
                    
          implement a scrolling TOC div for iphone
         
         */
         
         var sm = dojo.byId('sectionMenu');
         ubr.touch.tocScroller = {
            scroller: dojo.byId('ubrTocItems'),
            startX: 0,
            startY: 0,
            curX:0,
            curY:0,
            endX: 0,
            endY: 0,
            deltaX: 0,
            deltaY: 0,
            highDeltaY: 0,
            scrollOffset: 0,
            isAnimating: false,
            animation: null
         };
         if(ubr.iPhone) {
             sm.addEventListener('touchstart', ubr.touch.toc.touchResponse, false);
             sm.addEventListener('touchmove', ubr.touch.toc.touchResponse, false);
             sm.addEventListener('touchend', ubr.touch.toc.touchResponse, false);
         } else {
             sm.addEventListener('mousedown', ubr.touch.toc.touchResponse, false);
             sm.addEventListener('mousemove', ubr.touch.toc.touchResponse, false);
             sm.addEventListener('mouseup', ubr.touch.toc.touchResponse, false);         
         }
   },
 
   getTocAnimation: function ()
   {
       var ts = ubr.touch.tocScroller;
       return new dojo._Animation(
                       {
                          curve:[/* sets the start and end values */
                             ts.scroller.scrollTop,
                             ts.scroller.scrollTop + (ts.deltaY*2)
                          ],
                          onAnimate: function (val) {
                             ts.scroller.scrollTop = val;
                          },
                          onEnd: function () {
                             ts.isAnimating = false;
                             ts.animation = null;
                          },
                          duration: 550,
                          easing: function (num) {
                             return num * 1.2; /* sets the decay, or ease-out */
                          }
                       }
                     );
   },
   
   addGlobalHandlers: function(el)
   {
      if(ubr.iPhone) {
         el.addEventListener("touchstart", ubr.touch.controller.globalClickH, true);
         el.addEventListener("touchmove", ubr.touch.controller.globalClickH, true);
         el.addEventListener("touchend", ubr.touch.controller.globalClickH, true);
      } else {
         el.addEventListener("mousedown", ubr.touch.controller.globalClickH, true);
         el.addEventListener("mousemove", ubr.touch.controller.globalClickH, true);
         el.addEventListener("mouseup", ubr.touch.controller.globalClickH, true);      
      }
   },
   
   addButtonActions: function(el, over, notover, press)
   {
       if(ubr.iPhone) {
         el.addEventListener('touchstart', over ,false);
         el.addEventListener('touchcancel', notover ,false);
         el.addEventListener('touchend', press,false);       
       } else {
         el.addEventListener('mouseover', over ,false);
         el.addEventListener('mouseout', notover ,false);
         el.addEventListener('mouseup', press, false);       
       }

   }
   

}



ubr.uiView = {


   hide: function (node) {
       dojo.style(node, 'visibility', 'hidden');
   },
   show: function (node) {
       dojo.style(node, 'visibility', 'visible');
   },   
   setBookMetaHTML: function ()
	{
    
    var title = ubr.bookTitle; 
    if(ubr.bookTitle.length>24) {
       title = ubr.bookTitle.substr(0,24)+'...';
    }
    var author = ubr.bookAuthor;
    if(ubr.bookAuthor.length>24) {
       author = ubr.bookAuthor.substr(0,24)+'...';
    }
    var section = ubr.uiView.getLabelForSection(ubr.currentHref);
    if(section.length>14) {
       section = section.substr(0,14)+'...';
    }
    dojo.byId('titleText').innerHTML = title;
    dojo.byId('authorText').innerHTML = author;
    //dojo.byId('sectionProgStatus').innerHTML = ubr.filePointer + '/' + ubr.files.length;
    //dojo.byId('sectionText').innerHTML = section;
	},
	showFlow: function ()
	{
		dojo.style(STAGE.book, 'visibility', 'visible');
	},
   showPurchasePrompt: function ()
   {
      //dojo.style(dojo.byId('purchaseThisBook'),'display','block');
   },
   
   hidePurchasePrompt: function ()
   {
      if(arguments.length) {
         //Debug.log(arguments);
         arguments[0].preventDefault();
      }
      //dojo.style(dojo.byId('purchaseThisBook'),'display','none');
   },   
   
    hideHelp: function () {
       dojo.style(dojo.byId('navWrap'),{ display:'none', opacity:'0' });
       dojo.removeClass(dojo.byId('consoleHelpButton'), 'on');
       if(ubr.consoleShowing) {
          ubr.uiView.showPageProg();
       }
       ubr.helpShowing = false;
    },
 
    showHelp: function () {
       //ubr.uiView.hidePageProg();
       //if(ubr.tocShowing) ubr.uiView.hideToc();
       dojo.style(dojo.byId('navWrap'),{opacity:'.9', display:'block'});
       ubr.helpShowing = true;
    },
    hideConsole: function () {

       if(ubr.tocShowing) return;
       dojo.style(dojo.byId('consoleView'),'height','0px');

       //dojo.style(dojo.byId('consoleTop'),'height','0px');
       ubr.uiView.hidePageProg();
       ubr.consoleShowing = false;
       //ubr.uiView.hideHelp();
       if(ubr.tocShowing) ubr.uiView.hideToc();
    },
    
    showConsole: function () {
       dojo.style(dojo.byId('consoleView'),'height','45px');
       ubr.uiView.hidePurchasePrompt();
       //dojo.style(dojo.byId('consoleTop'),'height','60px');
       
       ubr.uiView.showPageProg();
       
       ubr.consoleShowing = true;
    },
    showPageProg: function () {
       
       dojo.style(STAGE.pageProg, { display:'block', opacity:'.9' });
       
    },
    hidePageProg: function () {
       //Debug.log('hiding pageProg');
       dojo.style(STAGE.pageProg, { opacity:'0.0' });
       dojo.style(STAGE.pageProg, { display:'none' });
    },
    conClickH: function (e) {
            e.preventDefault();
            e.stopPropagation();
            if(ubr.tocShowing) {
               ubr.uiView.hideToc();
            } else {
               ubr.uiView.showToc();
            }
    },
    conOverH: function () {
       dojo.addClass(dojo.byId('consoleTocButton'), 'on');
    },
    conNotOverH: function () {
       dojo.removeClass(dojo.byId('consoleTocButton'), 'on');
    },
    helpClickH: function (e) {
            e.preventDefault();
            e.stopPropagation();
            if(ubr.helpShowing) {
               ubr.uiView.hideHelp();
            } else {
               ubr.uiView.showHelp();
            }
    },
    helpOverH: function () {
       dojo.addClass(dojo.byId('consoleHelpButton'), 'on');
    },
    helpNotOverH: function () {
        if(!ubr.helpShowing) {
            dojo.removeClass(dojo.byId('consoleHelpButton'), 'on');
        }
    },
    fontOverH: function () {
            dojo.addClass(dojo.byId('consoleFontButton'), 'on');       
    },
    fontNotOverH: function () {
            dojo.removeClass(dojo.byId('consoleFontButton'), 'on');       
    },    
    fontClickH: function () {
            ubr.pageCtl.toggleFontSize();
    },
   buyClickH: function (e)
   {
      e.preventDefault();
      e.stopPropagation();
      ubr.purchaseBook();
   },
   
   backClickH: function (e)
   {
     
            if(ubr.isXD) {  
              e.stopPropagation();
              e.preventDefault();
              return false;
            } else {
                if(ubr.bookId==0) {
                   window.history.back();
                } else {
                   window.location.href = '/mobile';//ubr.bookDetailLink;
                   return true;
                }
            }
          
   },
   backOverH: function (e)
   {
      dojo.addClass(dojo.byId('consoleBackButton'), 'on');   
   },
   backNotOverH: function (e)
   {
      dojo.removeClass(dojo.byId('consoleBackButton'), 'on');
          
   },   
     
    addPurchasePrompt: function (flow) {
      var pl = dojo.query('input[id="ubrPurchaseLink"]',flow);
      if(pl[0]) {
          var input = pl[0];
          if(input) {
             ubr.buyitLink = input.value;
            var pd = dojo.create("div", {
            id:"purchaseThisBook"
            }, flow);
            var pdm = dojo.create("div", {
            id:"purchasePromptMsg",
            innerHTML:"<h2>PREVIEW LIMIT</h2>Buy the whole book for <b>"+ubr.bookPrice.replace(' ', '&nbsp;')+"</b> or <a href=\"#\" onclick=\"ubr.navCtl.nextPage();return false;\")>continue previewing sections</a>"
            }, pd);
            var pdb = dojo.create("a", {
            id:"purchaseThisBookButton",
            href:ubr.buyitLink+'&ismobile=1'
            }, pd);
            dojo.addClass(pdb, 'ubrdirectlink');
            var bi = dojo.create("img", {id: 'ubrbuyitbutton', src:'/ubrx/mobile/images/buyit-detail.png', alt:'Buy this book now'}, pdb);
          }
       }
      },
     
     	 makeItFit: function () {

			    console.log('making a better fit for your comfort');
			    if(ubr.resizePending==true) {
			       console.log('looks like we already have a resize pending!');
			    }

			    ubr.uiView.suspendUI();
		      ubr.uiView.autoScale();
					//ubr.navCtl.getPages();
		    //  ubr.panelSlide('L', ubr.panelStates['L'], true);
		    //  ubr.panelSlide('R', ubr.panelStates['R'], true);
		  	  ubr.pageView.resetPageView(true);
		      ubr.resizePending = false;
			    //}
			  },
				initPageSpace: function  ()
				{

			    var stobj = ubr.pageCSS;
			    var adjustTo = '82%'; // must be larger than layout

					dojo.style(dojo.byId('flow'), stobj);
				  // uncomment to show pagination:
				  //dojo.style(STAGE.layout, 'visibility', 'visible');

				},
			  autoScale: function() {

			     ubr.uiView.scaleLayout('current');

			  },
			
			  scaleLayout: function(type)
			  {
			    if(ubr.isPaginating()) return false;
			    var so = ubr.sizeProfiles;
			    var rdr = dojo.byId('ubReader');
			    rdr.setAttribute('style', '');
			    if(type=='current') {
			      var c = dojo.coords(rdr);
			      var stobj = {
			        height: c.h,
			        width: c.w,
			        left:  -1*(c.w/2),
			        marginLeft: '50%'
			      };
			      var st = ['height:' , c.h, 'px;width:', c.w , 'px;left:', -1*(c.w/2), 'px; margin-left:','50%'];
			      rdr.setAttribute('style', st.join(''));
			      //dojo.style(rdr, stobj);
			    } else if(so[type]) {
			      var stobj = {
			        height: so[type].h,
			        width: so[type].w,
			        left:  so[type].l,
			        marginLeft: '50%'
			      };
			      var st = ['height:' , so[type].h, 'px;width:', so[type].w , 'px;left:', so[type].l, 'px;margin-left:','50%'];
			      rdr.setAttribute('style', st.join(''));
			      //dojo.style(rdr, stobj);
			    }

			  },
			
    initUI: function (cb) {


      ubr.consoleTimer = setTimeout(function() {
          ubr.uiView.hideConsole();
          ubr.consoleTimer = null;
      }, 3000);
      setTimeout(ubr.uiView.hideHelp, 3000);
      

      ubr.touch.controller.init();      
      ubr.touch.factory.addButtonActions(dojo.byId('consoleHelpButton'), this.helpOverH, this.helpNotOverH, this.helpClickH);
      ubr.touch.factory.addButtonActions(dojo.byId('consoleTocButton'), this.conOverH, this.conNotOverH, this.conClickH);
      ubr.touch.factory.addButtonActions(dojo.byId('consoleBackButton'), this.backOverH, this.backNotOverH, this.backClickH);
      ubr.touch.factory.addButtonActions(dojo.byId('consoleFontButton'), this.fontOverH, this.fontNotOverH, this.fontClickH);
      ubr.touch.factory.iPhoneAddScrolling();   
      ubr.touch.factory.addGlobalHandlers(dojo.byId('ubReader'));
      dojo.connect(window, 'onscroll', function (e) {
         e.preventDefault();
         e.stopPropagation();
      });
      if(cb) {
         cb();
      }

	},
   
   hidebuyClickH: function (e)
   {
     e.preventDefault();
     e.stopPropagation();
     ubr.uiView.hidePurchasePrompt();
   },
   

   
   msgNotAuthed: function ()
   {
      
        alert("Looks like this is someone else's book. Try logging in first, if they've shared it with you. If that doesn't work, you can request access from the book detail page");
        //dojo.style(dojo.byId("loadprogress"), 'display', 'none');
        ubr.uiView.hideLoadAnim();
		  ubr.uiView.enablePageControls();
		  ubr.UIready = true;
      
   },
   msgNoAccess: function ()
   {
               alert("Looks like you're logged in but can't see this book because the owner hasn't shared it with you yet. Save and exit the reader and request a share.");
   },

   
  hideLoadAnim: function ()
  {
     dojo.style(STAGE.loadanim, "display", "none");
  },
  
  showLoadAnim: function ()
  {
     dojo.style(STAGE.loadanim, "display", "block");  
  },
  
  suspendUI: function ()
	{
     //Debug.log('suspending UI');
	  ubr.UIready = false;
	  //ubr.showPageControlsDisabled();
	  //ubr.showProgMeterDisabled();
	},
   readyUI: function ()
	{
    Debug.log('readying UI');
	  ubr.pageCtl.updatePageView();
	  ubr.UIready = false; // make sure
    ubr.uiView.hideLoadAnim();
	  ubr.UIready = true;
	},
  
  
		
   // TOC
   
   
    buildToc: function () {
  
      var toc = 'No book loaded';
      if(ubr.sections) {
         if(ubr.sections.length > 0) {
           toc = '<ul>';
           for(var i = 0; i < ubr.sections.length; i++) {
             toc += ubr.uiView.getTocEntryHTML(i, ubr.sections[i]);
           }
           toc += '</ul>';
         }

         ubr.uiView.setTocHTML(toc);
 
         dojo.query('a', STAGE.tocitems).forEach(function (node) {
           dojo.connect(node, 'onclick', function (evt) {
              ubr.navCtl.handleTocClick(evt);
           });        
         });



      } else {
      
         throw new Exception('sections variable not defined');
      }
    },

    hideToc: function () {
       dojo.style(dojo.byId('sectionMenu'), 'display', 'none');
       dojo.style(dojo.byId('sectionMenu'),{height:'0px', opacity:'0' });
       dojo.removeClass(dojo.byId('consoleTocButton'), 'on');
       if(ubr.consoleShowing) {
          ubr.uiView.showPageProg();
       }
       //dojo.style(dojo.byId('consoleTocButton'),{ backgroundColor:'#333' });
       //dojo.style(dojo.byId('consoleTop'),{ height:'60px' });    
       //dojo.style(, { display:'block', opacity:'.7' });
       ubr.tocShowing = false;
       //ubr.iscroll = null;
    },
    
    showToc: function () {
       dojo.style(dojo.byId('sectionMenu'), 'display', 'block');
       dojo.addClass(dojo.byId('consoleTocButton'), 'on');
       //ubr.uiView.hideHelp();
       ubr.uiView.hidePageProg();
       dojo.style(dojo.byId('sectionMenu'),{ height:'100%', opacity:'.9' });
       //dojo.style(dojo.byId('consoleTocButton'),{ backgroundColor:'#999' });
       //dojo.style(dojo.byId('consoleTop'),{ height:'0' });
       //dojo.style(, { display:'none', opacity:'0' });
       ubr.tocShowing = true;
      // ubr.iscroll = new iScroll(STAGE.tocitems);
    },
    
    setTocHTML: function (html) {
      STAGE.tocitems.innerHTML = html;
    },
    
    getTocEntryHTML: function (i, secobj) {
       if(secobj.navPoints.length==0) {
          return '<li id="tocitem'+(secobj.playOrder-1)+'" class="reader-tocitem"><a title="Section '+i+'" href="#href('+secobj.src+')">'+secobj.label+'</a></li>';   
       } else {
          var list = '<li class="reader-section-wrap"><span id="tocitem'+(secobj.playOrder-1)+'" class="reader-tocitem reader-tocheading"><a title="Section '+i+'" href="#href('+secobj.src+')">'+secobj.label+'</a></span><ul>';
          for(var ii=0; ii < secobj.navPoints.length; ii++) {
             list += this.getTocEntryHTML(i+'-'+ii, secobj.navPoints[ii]);
          }
          return list + '</ul></li>';
       }
    },
    
    markHrefSelected: function (href) {
       //Debug.log('markHrefSelected');
      if(href.indexOf('#!')) { // internal id system, ignore
         href = href.split('#')[0];
      }
      var qstr = '.reader-tocitem a[href="#href('+href+')"]';
      var nodes = dojo.query(qstr);
      if(nodes.length>0) {
         var count = 0;
         var up = nodes[0].parentNode;
         while(up.nodeName.toLowerCase()!='li') {
            if(count++>10) { throw ('Something is wrong with the page structure'); }
            up = up.parentNode;
         }
         ubr.uiView.markTocSelectionByNode(up);
         return true;
      } else {
         return false;
      }
    },
    
   markTocSelection: function ()
  	{
  	  if(!ubr.sectionPointer) ubr.sectionPointer = 0;
  	  dojo.query('.reader-tocselected', STAGE.tocitems).removeClass('reader-tocselected');
  	  dojo.addClass(dojo.byId('tocitem'+ubr.sectionPointer), 'reader-tocselected');
  	},
   
   markTocSelectionByNode: function (node)
   {
     //if(!node) Debug.log('no node to highlight!-->'+node);
      if(!node) return false;
     
  	  dojo.query('.reader-tocselected', STAGE.tocitems).removeClass('reader-tocselected');      
  	  dojo.addClass(node, 'reader-tocselected');      
   },
   getLabelForSection: function (href)
   {
      var qstr = '.reader-tocitem a[href="#href('+href+')"]';
      var nodes = dojo.query(qstr);
      //console.log(nodes);
      if(nodes.length>0) {
         var count = 0;
         var up = nodes[0].parentNode;
         while(up.nodeName.toLowerCase()!='li') {
            if(count++>10) { throw ('Something is wrong with the page structure'); }
            up = up.parentNode;
         }
         return up.firstChild.innerHTML;
      } else {
         return 'not found';
      }
      
   },
   
   // PROGMETER
   
   updateProgStatus: function (num)
   {
		//STAGE.pageProgStatus.innerHTML =   'Section '+(ubr.filePointer +1)+' of '+ubr.files.length+', page '+(num + 1) + ' of '+ubr.pageNodes.length+' in this section.';      
   },

	progPageNumFlash: function (num,fadein,fadeout,orient,x,y)
	{
	  // accept a number to flash or show current pagenum
    // fade in and out or simply flash on (up to caller to turn off)


      this.updateProgStatus(num);

      ubr.uiView.showPageProg();
// dojo.style(STAGE.pageProg, 'top', y);
     
//   dojo.style(STAGE.pageProg, 'left',x+'px');


      
		//if(dojo.style(STAGE.pageProg, 'opacity')==0) {
         

  		if(fadein) {

         dojo.animateProperty({
            node: STAGE.pageProg,
            duration:400,
            properties: {
                opacity: { start: 0, end: 0.7}
               /*, top: { start: y, end: y-100 } */
            },
            onEnd:(fadeout) ? function () {

               dojo.animateProperty({
                  node: STAGE.pageProg,
                  duration:400,
                  properties: {
                      opacity: { start: 0.7, end: 0 }
                     /*, top: { start: y-100, end: y-120 }*/
                     
                  },
                  onEnd: function () {
                      ubr.uiView.hidePageProg();
                  }
               }
             ).play();
             
               
            } : function () {}            
        }).play();

  //	  } else {
 // 	    dojo.style(STAGE.pageProg, 'opacity','1.0');
  //	  }
    }
	},

	setProgMeter: function (percent)
	{


      
		if(percent > 100) percent=100;
		if(percent < 0) percent=0;
/*
		if(percent==0) {
			dojo.removeClass(STAGE.progLeft, 'full');			  
		} else if(percent>0) {
			dojo.addClass(STAGE.progLeft, 'full');				  
		}
*/

		dojo.style(STAGE.progFill, 'width', percent+'%');
       
/*
		if(percent==100) {
			dojo.addClass(STAGE.progRight, 'full');				
		} else {
			dojo.removeClass(STAGE.progRight, 'full');
		}
  */    
	},
   showProgMeterDisabled: function ()
	{
		ubr.fadeProgMeter(ubr.progMeterFadeLevel, 1.0);
	},
   fadeProgMeter: function (start, end)
	{
		ubr.progMeterFadeLevel = end;
      dojo.style(STAGE.progMeter, 'opacity', '0.0');
      dojo.style(STAGE.progMeter, 'display', 'block');
      dojo.animateProperty({
         node: STAGE.progMeter,
         duration:300,
         properties: {
             opacity: {
               start: start,
               end: end
             }
         },
         onEnd: function () {
                dojo.animateProperty({
                      node: STAGE.progMeter,
                      duration: 300,
                      properties: {
                         opacity: {
                            start: end,
                            end: start
                         }
                      },
                      onEnd: function () {
                         dojo.style(STAGE.progMeter, 'display', 'none');
                      }
                }).play();         
          }
      }).play();
	},
   updateProgMeter: function ()
   {	
      /*
      if(!ubr.pageNodes) {       
         return;
      }
      if(ubr.pageNodes.length < 2) {
         ubr.percentProgress = 100;
      } else {
         ubr.percentProgress =  Math.ceil(ubr.pagePointer / (ubr.pageNodes.length - 1) * 100);						
      }
      */
      
     // Debug.log('updateProgMeter');
      var bookprog = ubr.filePointer / ubr.files.length;
     // Debug.log(bookprog);
      var percentile = 100/ubr.files.length;
      //Debug.log(percentile);      
      if(ubr.pageNodes.length<2) {
         var secprog = 1;
      } else {
         var secprog = ((ubr.pagePointer) / (ubr.pageNodes.length-1) );
      }      
      //Debug.log(secprog);
      var adjustby = secprog * percentile;
      //Debug.log(adjustby);
      ubr.percentProgress = (bookprog * 100) + adjustby;
      //Debug.log(ubr.percentProgress);
      if(ubr.percentProgress < 0) {
         ubr.percentProgress = 0;
      } else if (ubr.percentProgress > 100) {
         ubr.percentProgress = 100;
      }
       
      ubr.uiView.setProgMeter(ubr.percentProgress);
      ubr.uiView.updateProgStatus(ubr.pagePointer);
   },
   
   showSharing: function ()
   {
       
       if(ubr.facebook.requireLogin(ubr.uiView.showSharing)) {
       
           
           // add whatever code is needed here
           // to show a FB authed user their options
           
           
           //alert('you have logged into facebook');
           
       }
       
   }
   

}
ubr.userModel = {

  initUser: function (user,xmpp) {

   var uobj = {
         id:user.id,
         nick:user.nick,
         link:user.link,
         icon:user.img,
         username:user.bglogin,
         isLogged:user.islogged,
         chatParams: ubr.userModel.setChatParams(user,xmpp),
         withGroup: (parseInt(user.groupid) > 0) ? true : false,
         bookGroup: parseInt(user.groupid),
         groupListForBook: user.groups,
         readingFrom: xmpp.remotenode
     };
     
  	 ubr.isLogged          = uobj.isLogged;
  	 ubr.profileId	 	     = uobj.id;
  	 ubr.profileLink       = uobj.link;
    ubr.profileImg        = uobj.icon;
    ubr.profileNick       = uobj.nick;
    ubr.username          = uobj.username;



    if(uobj.chatParams) { // only clobber if set explicitly
      ubr.chatParams      = uobj.chatParams;      
    }
    ubr.bookGroup					= uobj.bookGroup;
    ubr.withGroup					= uobj.withGroup;
    ubr.groupListForBook = uobj.groupListForBook;
    ubr.readingFrom = uobj.readingFrom;
    //ubr.user = ubr.getUser();
    return uobj;
    
  },
  
  setUser: function (uobj)
  {
     ubr.user = uobj;
  },
  
  setChatParams: function(user,xmpp) {
     var myresource = xmpp.roomname + 'pr' + user.id + ':' + xmpp.remotedomain; 
     ubr.chatParams = {
          myJID:xmpp.username + '@' + xmpp.domain,
          myFullJID:xmpp.username + '@' + xmpp.domain + '/' +myresource,
          myRoomJID:xmpp.roomname + '@' + xmpp.roomserv,
          myNick:user.nick,
          myPass:xmpp.token,
          myResource: myresource,
          HTTPBASE:xmpp.httpbase,
          USERNAME:xmpp.username,
          XMPPDOMAIN:xmpp.domain
      };
  },
  
  getUser: function () {
    return {
      isLogged:ubr.isLogged,
    	profileId:ubr.profileId,
      profileImg:ubr.profileImg,
      profileLink:ubr.profileLink,
      profileNick:ubr.myNick,
      username:ubr.username,
      chatParams:ubr.chatParams,
      withGroup:ubr.withGroup,
      bookGroup:ubr.bookGroup,
      groupListForBook:ubr.groupListForBook,
      readingFrom:ubr.readingFrom
    };
  },
  clearUser: function () {
    //TODO: this needs to reload, to sync with server

  }

}

// see end of declaration for event hookups
ubr.navCtl =
   {
      
      
      sectionMap: {},
    
      setFileList: function (list) {
         // takes array of file objects
         
         if(!list) {
            alert('There were no files found for this book. Something is wrong with it.');
            return;
         }
         if(list.length==0) {
            alert('There were no files found for this book. Something is wrong with it.');
            return;            
         }
         
         ubr.files = list;
         for(var i=0; i < ubr.files.length; i++) {
            ubr.files[i].itemString=undefined;
            ubr.files[i].pageNodes=undefined;
         }
         ubr.currentHref = ubr.files[0].href+'#!0p:0';
         ubr.currentFile = ubr.files[0].href;
         ubr.filePointer = 0;
         
         // set itemStem
         // Safari has an annoying bug where the 2nd regex below fails
         if(dojo.isSafari) {
            ubr.itemStem = (matches = ubr.currentFile.match(/^(.*?\/)[^\/]+?/)) ? matches[1] : '';
         } else {
           ubr.itemStem = (matches = ubr.currentFile.match(/^(.*\/)[^\/]+?$/)) ? matches[1] :'';
         }
         
         if(!ubr.itemStem.match(/\/$/)) {
            ubr.itemStem += '/';
         }
         
      },
      
      handleParagraphSelect: function () {
         //Debug.log('navCtl: para selected');
         ubr.paragraphPointer = ubr.selectedParagraph;
         ubr.currentHref = ubr.currentFile+'#!'+ubr.paragraphPointer+'p:0';
         ubr.navCtl.setUriFrag();
      },
     
      handleParagraphDeSelect: function () {
         //Debug.log('navCtl: para deselect');
         ubr.navCtl.setUriFrag();     
      },
      
      setSectionList: function (list) {
         // takes array of section objects
         ubr.sections = list;
      },
      
      setUriFrag: function () {
         //if(!(ubr.paragraphPointer>=0)) throw ("must define paragraphPointer first!");
         //var par = (ubr.selectedParagraph) ? ubr.selectedParagraph : ubr.paragraphPointer;
         window.location.replace('#href('+ubr.currentHref+')');
      },
      
      loadHref: function (href) {

         /* first kick-off from boot chain, usually leads to getPages */


         dojo.publish('ubr/events/pageUnload', [{time:(new Date()).getTime()}]);
         ubr.currentHref = href;
         ubr.paragraphPointer = 0;
         ubr.pagePointer = 0;
         ubr.pageRendered = false;
			   ubr.paragraphPointer = undefined;

         ubr.uiView.showConsole();
         ubr.uiView.showLoadAnim();
         // fix url for agents that encode subsequent pound signs
         if(ubr.currentHref.indexOf('#') < ubr.currentHref.indexOf('%23')) {
            ubr.currentHref = ubr.currentHref.replace('%23', '#');
         }
         ubr.postJumpFragId = this.getPostJumpFragId();
         if(ubr.postJumpFragId.match(/^!\d+p/)) { // postjumppara will override postjumpfrag
            ubr.postJumpParaId = ubr.navCtl.getParaFromFragId(ubr.postJumpFragId);
            ubr.paragraphPointer = parseInt(ubr.postJumpParaId,10);
            Debug.log('set paragraph pointer from frag id to '+ubr.paragraphPointer);
         }
         ubr.currentFile = (ubr.currentHref.indexOf('#')>-1) ? ubr.currentHref.split('#')[0] : ubr.currentHref;
         var valid = false;
         dojo.map(ubr.files, function (f) {
              if(f.href==ubr.currentFile) {
                 valid = true;
                 ubr.filePointer = arguments[1];
              }
         });
         if(!valid) { // fall back on defaults
           if(ubr.files.length>0) {
              ubr.filePointer = 0;
              ubr.currentFile = ubr.files[0];
              ubr.currentHref = ubr.currentFile;
           } else {
              Debug.log('invalid href');
              return;
           }
         }
         if(ubr.filePointer==undefined) { // can happen when a package is screwed up
            Debug.log('filePointer is undefined');
            return;
         }
         
         Debug.log('getting file at index '+ubr.filePointer);
         
         ubr.pagePointer        = 0;
         ubr.pageNodes 					= [];

         ubr.paragraphCount			= 0;
         // pagination
         ubr.itemString 				= "";		 
         ubr.paginationPointer	= 0;
         // selection
         ubr.selectedParagraph 	= undefined; 
         ubr.selectedNode			= undefined;
         
         ubr.pageMap = [[]];
  		   if(!ubr.files[ubr.filePointer].itemString) {
             Debug.log('not cached');
             dojo.xhrGet({
                   url: ubr.restEndpoint.getItem.url,
                   content: {
                     book_id: ubr.bookId,
                     group_id: ubr.user.groupId,
                     html: ubr.currentFile,
                     forcesample: ubr.forcePreview
                   },
                   encoding: 'utf-8',
                   load: dojo.hitch(this, function (data, xhr) {
                     var itemString = (data=='AUTH') ?
                       '<p>Sorry, but this is a personal library item, not viewable without owner permission.</p>': data;
                     ubr.pageCtl.setItemString(itemString);
                     dojo.publish('ubr/events/sectionView', [
                        ubr.uiView.getLabelForSection(ubr.currentHref),
                        ubr.currentHref
                     ]);            
                     this.getPages();
                   })
            }); 
  			 } else {
               Debug.log('file is cached');
               ubr.itemString = ubr.files[ubr.filePointer].itemString;
               dojo.publish('ubr/events/sectionView', [
                  ubr.uiView.getLabelForSection(ubr.currentHref),
                  ubr.currentHref
               ]);
               this.getPages();
  			 }
         
      },
      getPages: function() {

						
						
						ubr.uiView.initPageSpace();
						
						
						/*
						
						//FIXME
						
						
				    ubr.paginationPointer = 0;
				    ubr.getPagesCalledAt = (new Date()).getTime();
				    dojo.publish('ubr/events/paginationStarted', [{time:ubr.getPagesCalledAt}]);

						STAGE.flow.innerHTML = ubr.pageCtl.getItemString();

			      dojo.publish('ubr/events/paginationDone', [{time:0}]);
			
						 var tm = (new Date()).getTime();
              if(ubr.consoleShowing || !ubr.consoleTimer) {
                setTimeout(ubr.uiView.hideConsole, 1000);
              }
		    
         		ubr.pageCtl.updatePageView();

			      ubr.uiView.readyUI();
			*/
			
			
			


              Debug.log('getPages');
              if(ubr.isPaginating()) {
                 Debug.log('already paginating, returning...');
                 return;
              }
              

              ubr.paginationPointer = 0;
              ubr.getPagesCalledAt = (new Date()).getTime();
              dojo.publish('ubr/events/paginationStarted', [{time:ubr.getPagesCalledAt}]);
 
              if(!ubr.flow) {      
		
							  ubr.flow = PubSubP8n.getInstance();

                ubr.flow.registerHandler('resize', function () {
	
									if(!ubr.resizeDelay) {
										
											Debug.log('no resize delay set');
											
											ubr.resizeDelay = setTimeout(function() {
												
												Debug.log('resize adjustment');
												
												STAGE.lastBookCoords = dojo.coords(STAGE.book);
									      STAGE.lastViewport = ubr.getViewport();
									      ubr.resizePending = setTimeout(ubr.uiView.makeItFit,100);
									
												Debug.log('set resize pending: '+ubr.resizePending);

									      ubr.resizeDelay = null;
												
											
											},200);
											
									}	else {
										
										Debug.log('resize delay already set');
										
									}
										
                });
								Debug.log('registered resize handler');
								
								window.addEventListener('resize', function () {
									ubr.flow.fireCallbacks('resize');
									}, true);
								
                ubr.flow.registerHandler('page', function() {
	
								  if(typeof ubr.paginationPointer!='number') throw ("The pagination pointer must be a valid number");
						      if(ubr.paginationPointer > ubr.paginationMaxLimit) { // runaway pagination?
						         dojo.publish('ubr/events/paginationDone', [{time:(new Date()).getTime()}]);
						         throw ("Hit maximum number of pages we can handle for a given file");
						      }

                  var data = arguments[0];
								//	Debug.log('page handler');
								//	Debug.log(data);
									var pagetext = data[0];

//							     ubr.pageModel.storePage(pagetext);

                  ubr.pageNodes[ubr.paginationPointer] = data[0];
                  ubr.paginationPointer++;
			//				      ubr.progPageNumFlash(ubr.paginationPointer, false);
									ubr.uiView.setProgMeter(Math.ceil(((ubr.itemString.length - arguments[1])/ubr.itemString.length)*100));
									 // originally:
                   //ubr.uiView.setProgMeter(Math.ceil((itemnum/totalitems)*100));
                });
							//	Debug.log('registered page handler');
                ubr.flow.registerHandler('lastpage', function() {
                                              //  Debug.log('rcvd pageDone signal');
                                                
                                                
                                                  
                                                var tm = (new Date()).getTime();
                                                if(ubr.consoleShowing || !ubr.consoleTimer) {
                                                  setTimeout(ubr.uiView.hideConsole, 1000);
                                                }
                                              
                                                ubr.pageMap = ubr.flow.getPmap();
      
                                                Debug.log('done mapping paragraphs to pages');
                                                
                                                dojo.query('a', dojo.byId('flow')).forEach(function (a) { // add selection click handler
                                                      dojo.connect( a, "onclick", null, ubr.navCtl.handleHrefClick );
                                                });
                                                
                                               // dojo.query('p', dojo.byId('flow')).forEach(function (pnode) { // add selection click handler
                                                   
                                                    //dojo.connect( pnode, "onclick", null, ubr.selectionCtl.selectPara );

                                               //  });
                                                
                                                ubr.paginationPointer = 0;
                                                
                                                ubr.paragraphCount = 0;
                                                
                                                ubr.percentProgress = 100;
                                                
                                                // set the correct page for viewing
                                                var page;
                                                
                                                // Determine what page we're on
                                      
                                                if(!ubr.pagePointer) {
                                                   Debug.log('no page pointer set');
                                                      if(ubr.postJumpParaId) {     
                                                        
                                                        Debug.log('we do have a post jump paragraph id');
                                                        page = ubr.flow.showPara(ubr.postJumpParaId);
                                                        dojo.publish('ubr/events/postJumpParaLoaded', [page, ubr.postJumpParaId]);
                                                           // used to use pub-sub, now we just set directly
                                                        ubr.pagePointer = page;
                                        
                                                      } else if(ubr.postJumpFragId) {
                                                        
                                                        page = ubr.flow.showId(ubr.postJumpFragId);

                                                        dojo.publish('ubr/events/postJumpFragLoaded', [page]); 
                                                        ubr.pagePointer = page;
                                                        
                                                     } else {
                                                        ubr.pagePointer = 0;                                        
                                                     }
                                                }
                                            
                                                ubr.postJumpParaId = null;
                                                ubr.postJumpFragId = null;
                                                // cache it
                                                ubr.files[ubr.filePointer].pageNodes = ubr.pageNodes;
                                                
                                                // render the current page by scrolling into view
                                                // call renderPage via updatePageView
                                                
                                                
                                               if(ubr.iPhone) {
                                                  //dojo.byId('flow').style.webkitTransition = 'none';
                                               }
                                 
                                               
                                               ubr.pageCtl.updatePageView();

                                               
                                               if(ubr.iPhone) {
                                                  //dojo.byId('flow').style.webkitTransition = 'left .5s ease-out';
                                               }
      
                                                dojo.publish('ubr/events/paginationDone', [{time:0}]);
                                                
                                                ubr.uiView.readyUI();
                });
              }
							Debug.log('registered last page handler');
              ubr.pageTopic = 'p8n/'+(new Date()).getTime()+'/pagedata';
              ubr.flow.setFlowContent(ubr.pageCtl.getItemString(), STAGE.flow, dojo.style('ubReaderView', 'height'));
              
             // ubr.uiView.addPurchasePrompt(ubr.flow.getFlow());

             // ubr.flow.reflow();
    
              
              
      },
      getPostJumpFragId: function () {
         return (ubr.currentHref.indexOf('#')!=-1) ? ubr.currentHref.split('#')[1] : '';
      },
      getParaFromFragId: function (f) {
         return f.substr(f.indexOf('!')+1,f.indexOf('p')-1);
      },
      
      loadFromHash: function () {

         var cmd = window.location.href.substr(window.location.href.indexOf('#')+1);
         //Debug.log('got command from URL fragment: '+cmd);
         ubr.navCtl.runCommand(cmd);
      },


      runCommand: function(cmd) {
         
         /*
         
         a simple API for calling functions from
         the URL or from links in the book.
         
         follows simple function syntax of
         
         #cmd(arg)
         
         and supports:
         
         #href(hrefarg) - load an href in the EPUB
         #note(hrefarg or note_id) - jump to href and load a note
         
         */
         
         var name, args;
         

         cmd.replace(/^(href|note)\(([^\)]+?)\)/, function(match, m1, m2) {

            name = m1;
            args = m2;
         });
         
         //alert('got cmd '+name+' with args '+args+' from URL fragment');

         if(name=='href') {
            ubr.navCtl.loadHref(args);
         } else if(name=='note') {
            var note_id;
            if(args.match(/^(\d+)$/)) {
               ubr.navCtl.loadNoteById(args);            
            } else {
               ubr.navCtl.loadNotesByHref(args);
            }
         } else {
            ubr.navCtl.loadHref(ubr.currentHref);
         }
        
      },

      handleTocClick: function(e) {
         if(e.currentTarget.hash.match(/^#/)) {
            var frag = e.currentTarget.hash.substr(1);
         }
         ubr.uiView.hideToc();
         ubr.uiView.hideConsole();
         ubr.navCtl.runCommand(frag);
         ubr.uiView.setBookMetaHTML();
         e.preventDefault();
         e.stopPropagation();
      },

      nextPage: function () {

            Debug.log('navCtl.nextPage');
            if(!ubr.UIready) {
               Debug.log('UI not ready');
            }
            if(!ubr.pageNodes || !ubr.UIready) return;

           if(ubr.isPaginating()) { // not while paginating!
             return;
             if(ubr.pagePointer >= ubr.paginationPointer) {
							 Debug.log(ubr.pagePointer+'>='+ubr.paginationPointer);
               return;
             }
           }
           Debug.log('proceeding');
            
            if (ubr.pagePointer === (ubr.pageNodes.length-1)) {   // next section/file
               
               Debug.log('at last page already!');
               
               if(ubr.filePointer < ubr.files.length-1) {
               
                  ubr.lastSection = ubr.filePointer;
                  ubr.filePointer++;
                  ubr.currentFile = ubr.files[ubr.filePointer].href;
                  ubr.currentHref = ubr.currentFile;

                  ubr.uiView.suspendUI();
			            ubr.pageRendered = false;
			            ubr.paragraphPointer = undefined;
                  ubr.pagePointer            = 0;
                  ubr.pageNodes 					= [];
                  ubr.paragraphCount			= 0;
                   // pagination
                  ubr.itemString 				= "";		 
                  ubr.paginationPointer	= 0;

                   // selection
                  ubr.selectedParagraph 	= undefined; 
                  ubr.selectedNode			= undefined;
                  ubr.paragraphPointer = 0;
                  ubr.pagePointer = 0;
                  ubr.uiView.showLoadAnim();
                  ubr.navCtl.loadHref(ubr.currentHref);
   
               
               } else {
               
                  Debug.log('at last page of last file');
               }

            } else if (ubr.pagePointer < ubr.pageNodes.length - 1) { //next page
            
               // advance page
            
               ubr.pagePointer++;
               var par = ubr.pageCtl.firstUbrid();
               Debug.log('returned '+par+' as first ubrid');
               if(par > -1) {
                 ubr.currentHref = ubr.currentFile + '#!'+par+'p:0';                  
               } else {
                 ubr.currentHref = ubr.currentFile;              
               }
               ubr.pageRendered = false;
               ubr.paragraphPointer = undefined;
               Debug.log('updating page view');
               ubr.pageCtl.updatePageView();
               ubr.uiView.updateProgMeter();

            } else {
              
               Debug.log('nothing to do');
               Debug.log(ubr.pagePointer);
               Debug.log(ubr.pageNodes);
               
            }
      },  

       previousPage: function () {
         if(ubr.isPaginating() || !ubr.UIready) { // not while paginating!
               //Debug.log('not while paginating...');
				   return;
			   } else {
				   if (ubr.pagePointer == 0) {
					   if (ubr.filePointer > 0) { // go to previous section

                 ubr.toLastPage = true; // flag it to validate negative values
           
  
                 ubr.lastSection = ubr.filePointer;
                 ubr.filePointer--;
                 ubr.currentFile = ubr.files[ubr.filePointer].href;
                 ubr.currentHref = ubr.currentFile;
                 ubr.uiView.suspendUI();
                 ubr.pageRendered = false;
                 ubr.paragraphPointer = undefined;
                 ubr.pagePointer            = 0;
                 ubr.pageNodes 					= [];
                 ubr.paragraphCount			= 0;
                 // pagination
                 ubr.itemString 				= "";		 
                 ubr.paginationPointer	= 0;
                 // selection
                 ubr.selectedParagraph 	= undefined; 
                 ubr.selectedNode			= undefined;
                 ubr.paragraphPointer = -1; //determine after file load
                 ubr.pagePointer = -1; // determine after pagination
                 ubr.uiView.showLoadAnim();
                 ubr.navCtl.loadHref(ubr.currentHref);

                  
                     
					   } else {
                  
                 Debug.log('at last page of last file');
             }
                     
                     
				   } else if (ubr.pagePointer > 0) { // previous page
                  
					    ubr.pagePointer--;
         
              var par = ubr.pageCtl.firstUbrid();
              //Debug.log('returned '+par+' as first ubrid');
              if(par > -1) {
                ubr.currentHref = ubr.currentFile + '#!'+par+'p:0';                  
              } else {
                ubr.currentHref = ubr.currentFile;              
              }
  
              ubr.pageRendered = false;
              ubr.paragraphPointer = undefined;
              dojo.publish('ubr/events/pageUnload', [{time:(new Date()).getTime()}]);
              ubr.pageCtl.updatePageView();
              ubr.uiView.updateProgMeter();
    
  

				   }				
			   }
      },
      updatePagePointer: function () {


      },
      
       handleHrefClick: function (evt) {
        var url = evt.currentTarget.getAttribute('href');
        
        
        if(!url) return;
        
        if(!dojo.hasClass(evt.currentTarget, "ubrdirectlink")) { /* bypass */
        
          evt.preventDefault();
          evt.stopPropagation();
        
          if(url.match(/^http:\/\/(www\.)?feedbooks\.com\/book\/stanza\/\d+\/?/) ||
                 url.match(/^http:\/\/(www\.)?feedbooks\.com\/book\/\d+?\.epub$/i)) {
                 // feedbooks urls to epubs
                 if(confirm("This replaces your current read with a book from feedbooks.com and adds it to your reading history. Sounds like a good idea. Ready?")) {
                   var rdr = ubr.util.getSfUrl('book', 'importnew')+'?url='+dojo.toJson(url);
                   document.location.href = rdr;
                   return false;
                 }
           }
           if(url.match(/^http:\/\/(.*?)$/)) {
                    //Debug.log('opening new window for this');
                     window.open(url);
           } else {
              // since coming from a content doc, not the ncx,
              // adjust path so its relative to the ops dir
              var stem = (ubr.itemStem.substr(0,1)=='/') ? '' : ubr.itemStem; 
              //Debug.log('trying to jump to '+stem+url);
              ubr.navCtl.loadHref(stem+url);
           }           
        } else {

        }
      },

      
      getCurrentFile: function() {
         return ubr.files[ubr.filePointer];         
      },
      
      
              
      getMark: function () {

        return ubr.navCtl.setMark();
      },
      
      saveMark: function() {
//        var mark = ubr.navCtl.setMark();
        dojo.xhrPost({
                                       url: ubr.restEndpoint.close.url,
                                       encoding: 'utf-8',
                                       sync: true,
                                       content: ubr.navCtl.getMark()
                              });
      },

      setMark: function ()
      { 

        return {
           filePointer: ubr.filePointer,
           currentFile: ubr.currentFile,
           currentHref: ubr.currentHref,
           itemStem: ubr.itemStem,
           bookId: ubr.bookId,
           epubId: ubr.epubId,
           bookBaseURI: ubr.bookBaseURI,
           bookid: ubr.bookId,
           sectionPointer: ubr.sectionPointer,
           paragraphPointer: ubr.paragraphPointer,
           panelStates: ubr.panelStates,
           fontScaled: ubr.fontScaled,
           bookGroup: ubr.bookGroup,
           documentHref: ubr.currentHref,
           noteOpened: false,
           chatOpened: false,
           selectedParagraph:ubr.selectedParagraph,
           selectedNode:ubr.selectedNode
        };
      },
        
     initPositionVars: function () {
       ubr.sectionPointer = 0;
       ubr.paragraphPointer = 0;
       ubr.selectedParagraph = null;
       ubr.chapterFile = ubr.mark.currentFile;
       ubr.sectionPointer = ubr.mark.sectionPointer;
       ubr.paragraphPointer = ubr.mark.paragraphPointer;
       ubr.selectedParagraph = ubr.mark.selectedParagraph;
     },
     
     handlePageView: function () {

       ubr.navCtl.setUriFrag();
       var msg = arguments[0];

     }

}

dojo.subscribe('ubr/events/pageView', this, ubr.navCtl.handlePageView);



ubr.pageCtl = {

     
     firstUbrid: function()
     {
       var paras = ubr.flow.getReversePmap()[ubr.pagePointer];       
       if(paras) {
         return parseInt(paras[0].id,10);
       } else { // no paragraphs on this page
         // return first preceding paragraph
         var limit = 0;
         var max = 10;
         var page = ubr.pagePointer;
         while(!ubr.flow.getReversePmap()[page]) {
           page--;
           limit++;
           if(limit >= max) {
             break;
           }
         }
         if(!ubr.flow.getReversePmap()[page]) { // still undefined 10 pages previous?
           return 0;
         } else {
           return (parseInt(ubr.flow.getReversePmap()[page][0].id,10));
         }
         
         
       }
       /*
        if(ubr.pageMap.length==ubr.pageNodes.length) {
           if(ubr.pageMap[ubr.pagePointer]) {
              return ubr.pageMap[ubr.pagePointer][0].node.getAttribute('ubrid');
           } else {
              return 0;
           }
        } else {
           if(ubr.pageMap[ubr.pageMap.length-1]) {
              if(ubr.pageMap[ubr.pageMap.length-1][ubr.pageMap[ubr.pageMap.length-1].length-1]) {
                 return ubr.pageMap[ubr.pageMap.length-1][ubr.pageMap[ubr.pageMap.length-1].length-1].node.getAttribute('ubrid');
              } else {
                 return 0;
              }
           } else {
              return 0;
           }
        }
        */
        // var par = -1;
         
         //return par;
               
     },
     getPage: function()
     {
        return ubr.pageNodes[ubr.pagePointer];
     },


      
      renderPage: function() {

         var pnids = [];
         var pns = [];        

         var flow = STAGE.flow;

         //Debug.log('page pointer is '+ubr.pagePointer+' so setting left of flow to display it');
         //dojo.style(flow,'left',(-1*(ubr.pagePointer * window.innerWidth))+'px');

         dojo.style(flow, 'visibility', 'visible');
         Debug.log('setting page to '+ubr.pagePointer);
         ubr.flow.setPage(ubr.pagePointer);
         
         if(ubr.pagePointer==ubr.pageNodes.length-1) {
            var pl = dojo.query('input[id="ubrPurchaseLink"]',flow);
            if(pl[0]) {
   
               var input = pl[0];
               if(input) {
                  ubr.buyitLink = input.value;
                  //ubr.uiView.showPurchasePrompt();
               }
            }
         } else {
           // ubr.uiView.hidePurchasePrompt();
         }
         
         
         ubr.pageRendered = true;

         var msg = {
              time:(new Date()).getTime(),
              user: ubr.user,
              mark: ubr.navCtl.getMark(),
              pageNum:ubr.pagePointer,
              pageTotal:ubr.pageNodes.length,
              pNodes:pns,
              pNodeIds:pnids,
              pageContent:''
            };

         //Debug.log('publishing pageView');
         dojo.publish('ubr/events/pageView', [  msg ]);
         //Debug.log('done rendering');
           
      },

      findPageForPara: function(id) {

         var found = -1;
         for (var pp=0; pp < ubr.pageMap.length; pp++) {

            if(ubr.pageMap[pp]) {

               for(var ppp=0; ppp < ubr.pageMap[pp].length; ppp++) {

                  if(ubr.pageMap[pp][ppp].node.getAttribute('ubrid')==id) {
       
                     found = pp;
                     
                  }
                  
               
               }
            }
         
         }
         return found;
      },
      renderPage: function() {
         Debug.log('rendering page');
         /*
           To "render" a page, we call some 
           methods in the view to set the
           content (to the default which is
           the currently selected page in the
           model. Then we attach handlers to 
           some of the elements in the page
           
        */
        
        // Debug.log('pageCtl.renderPage: setting page text in view');
         ubr.pageView.showOverflow();
         ubr.pageView.setContent();

         var pnids = [];
         var pns = [];
				 Debug.log(STAGE.book);
         /*
				 dojo.query('p', STAGE.book).forEach(function (pnode) { // add selection click handler
            dojo.connect( pnode, "onclick", null, ubr.selectPara );
            dojo.connect( pnode, "onmouseup", null, function(e) {
                  e.preventDefault();
                  e.stopPropagation();
            });
            dojo.connect( pnode, "onmousedown", null, function(e) {
                  e.preventDefault();
                  e.stopPropagation();                  
            });
            
            dojo.connect( pnode, "onmouseover", null, ubr.showParaNumbering );
            dojo.connect( pnode, "onmouseout", null, ubr.hideParaNumbering );			
            var ubrid = pnode.getAttribute('ubrid');
            pnids.push(parseInt(ubrid));
            pns.push(pnode);
         });
 	       */
         if(!(ubr.paragraphPointer>=0)) { // set paragraph pointer
           Debug.log('null ass pp, going to set from first in list');
           var first = pnids[0];
           if(pns.length > 1) {
              if(dojo.hasClass(pns[0], 'fragment')) {
                 var first = pnids[1];
              }
           }
           ubr.paragraphPointer = (first) ? first : 0;
         }
  
         ubr.pageRendered = true;
				 Debug.log('page rendered');
         var pl = dojo.query('input[id="ubrPurchaseLink"]',STAGE.book);
         if(pl[0]) {

            var input = pl[0];
            if(input) {
               ubr.buyitLink = input.value;
               ubr.uiView.showPurchasePrompt();
            }
         } else {
            ubr.uiView.hidePurchasePrompt();
         }
         
         
         var msg = {
           time:(new Date()).getTime(),
           user: ubr.user,
           mark: ubr.getMark(),
           pageNum:(ubr.pagePointer),
           pageTotal:ubr.pageNodes.length,
           pNodes:pns,
           pNodeIds:pnids,
           pageContent:ubr.pageNodes[ubr.pagePointer]
         };
				 Debug.log(msg);
         dojo.query('a', STAGE.book).forEach(function (a) { // add selection click handler
            dojo.connect( a, "onclick", null, ubr.handleHrefClick );
         });
      

         dojo.publish('ubr/events/pageView', [  msg ]);
         Debug.log('done rendering');
      },
	    unloadPageView: function () {

				ubr.pageRendered = false;
				ubr.paragraphPointer = undefined;
	         ubr.pageView.hideOverflow();
				dojo.publish('ubr/events/pageUnload', [{time:(new Date()).getTime()}]);
			},
      updatePageView: function ()
      {
 
         if(!ubr.pageNodes.length || !(ubr.sections.length>0)) return;
         ubr.lastPageUpdate = (new Date()).getTime();
         var lastindex = ubr.pageNodes.length-1;
         if(ubr.pageRendered==false) {
            Debug.log('page has not been rendered yet');
            if (ubr.toLastPage==true) { // set page to end of section if flagged for it
               Debug.log('need to jump to last page and now resetting that flag');
               ubr.toLastPage = false;
               ubr.pagePointer = lastindex;
            }
            // bounds checking
            if(ubr.pagePointer < 0 || (ubr.pagePointer > (lastindex))) {
                Debug.log('pp out of bounds, correcting');
                ubr.pagePointer = (ubr.pagePointer < 0) ? 0 : lastindex;
                Debug.log('pp is now '+ubr.pagePointer);
            }
            ubr.pageCtl.renderPage();
        } else {
          Debug.log('page is already rendered:'+ubr.pageRendered);
        }
         ubr.uiView.updateProgStatus(ubr.pagePointer);
         ubr.uiView.showFlow();             
         ubr.uiView.updateProgMeter();
		},
      toggleFontSize: function () {
         if(!ubr.isPaginating()) {
           ubr.fontScaled++;
            //Debug.log('temp inc to font scale '+ubr.fontScaled);
            ubr.fontScaled = (ubr.fontScaled > 2) ? 0: ubr.fontScaled ;
            //Debug.log('now font scaling is '+ubr.fontScaled);
            var flow = dojo.byId('flow');
            ubr.uiView.hide(flow);
            this.setFontSize(flow);
            ubr.postJumpFragId = ubr.navCtl.getPostJumpFragId();
            ubr.postJumpParaId = ubr.navCtl.getParaFromFragId(ubr.postJumpFragId);
            //this.getPages();
            ubr.navCtl.loadHref(ubr.currentHref);
            //Debug.log('removing on class from font button');
            dojo.removeClass(dojo.byId('consoleFontButton'), 'on');
            

          //  ubr.pageView.resetPageView(true);
         }
      },
      setFontSize: function (flow) {
       //dojo.forEach([STAGE.book,STAGE.layout], function (div) {

         if(ubr.fontScaled == 0) {
            //Debug.log('font has not been scaled');
            dojo.removeClass(flow, 'larger');
            dojo.removeClass(flow, 'largest');
         } else {
            if(ubr.fontScaled == 1) {
               dojo.removeClass(flow, 'largest');
               dojo.addClass(flow,'larger');
            } else {
               dojo.removeClass(flow, 'larger');
               dojo.addClass(flow,'largest');
            }
         }
         //Debug.log('font scaled');
      },
      idToPageMap: [],
      isPaginating: function () {
        if(!ubr.flow) return false;
        return (ubr.flow.getActive());
      },
      invalidatePageCache: function ()
      { // nullifys all page nodes for all sections
         for (var i=0; i < ubr.files.length; i++) {
            if(ubr.files[i].pageNodes) {
               ubr.files[i].pageNodes = undefined;
            }
         }
      },
      setItemString: function (itemString)
      {
         ubr.itemString = itemString;
         ubr.files[ubr.filePointer].itemString = itemString;
         //dojo.byId('flow').innerHTML = ubr.pageCtl.filterForDisplay(ubr.files[ubr.filePointer].itemString);
      },
      getItemString: function ()
      {
         return ubr.pageCtl.filterForDisplay(ubr.files[ubr.filePointer].itemString);
      },
      filterForDisplay: function (str)
      {
         
         // possibly move more of this to backend?
         // ie Book::getItemByFilename()
         // wish we knew performance impacts for each
         
         /* eliminate data urls, since they interfere with pagination */
         str = str.replace(/<img([^>]+?)src\s*?=\s*?"data\:[^"]+?"[^>]*?>/gm, "");
         /* translate bad svg with img links to img files */
         str = str.replace(/<svg:image[^>]+?xlink:href\s*?=\s*?"([^"]+?)"[^>]*?>/gm, '<img src="'+"$1"+'"/>');
         str = str.replace(/<\/svg:image>/, '');
         ubr.imgTagExp = /<img([^>]+?)src\s*=\s*"([^"]+?\.(png|jpe?g|svg|gif))"/gmi;
         /* REPLACE IMAGE TAGS WITH ABSOLUTE URLS */
         str = str.replace(ubr.imgTagExp, function(whole, firstmatch, secondmatch, extmatch, offset, stringthing) {
            
               if(secondmatch.match(/^http:\/\//)) { // support remote image urls
                  var url = secondmatch;
               } else {
                  var url = ubr.bookBaseURI + ubr.itemStem + secondmatch;
               }
               
               return '<img'+firstmatch+'src="' + url +'"';
         });
                  
                  /*
         <object type="application/x-shockwave-flash" data="swf/04_SirenSong.swf">\n <param name="movie" value="swf/04_SirenSong.swf"/ ubrid="28">\n <param name="play" value="false"/ ubrid="29">\n <param name="loop" value="false"/ ubrid="30">\n </object>
                  */
                  
         str = str.replace(/<object(.+?)data="([^"]+?)\.swf"/gmi,function (whole, first, second) {
         
               if(second.match(/^http:\/\//)) { // support remote image urls
                  var url = second;
               } else {
                  var url = ubr.bookBaseURI + ubr.itemStem + second;
               }
               
               
               return '<object'+first+'data="'+url+'.swf"';
         });
         str = str.replace(/<param(.+?)value="([^"]+?)\.swf"/gmi,function (whole, first, second) {
         
               if(second.match(/^http:\/\//)) { // support remote image urls
                  var url = second;
               } else {
                  var url = ubr.bookBaseURI + ubr.itemStem + second;
               }
               
               
               return '<param'+first+'value="'+url+'.swf"';
         });   
                  
         /* GET RID OF Hn SINGLETONS */
         str = str.replace(/<h\d\s*?\/>/gm, '');
         
         /* assign paragraph ubrids */
         
         ubr.paragraphCount = 0;
         str = str.replace(/<p([^>]*?)>/gm, dojo.hitch(ubr, function (match, par) {
               if(match=='<p>'||match.match(/^<p\s/)) {
                  var html = '<p' + par + ' ubrid="'+ubr.paragraphCount + '">';
                  ubr.paragraphCount++;
                  return html;
               } else {
                  return match;
               }
         }));

         
         return str;
         
      }

  
}
ubr.pageView = {

	destroyPageSpace: function ()
	{
	  if(STAGE.layout) STAGE.view.parentNode.removeChild(STAGE.layout);
	  if(STAGE.book) STAGE.view.parentNode.removeChild(STAGE.book);
	  STAGE.book 							= undefined;
	  STAGE.layout						= undefined;
	},
	
	initPageSpace: function ()
	{
	  /*
	  <div id="pageLayout">	</div><div id="pageMaster"> </div>
	  #pageLayout, #pageMaster { position:absolute; visibility:hidden; overflow:hidden; height:80%; left:29%; padding-top:1em; padding-bottom:2em; top:7%; width:42%; background-color:#ffffff; border:none}
    #pageMaster { height:82%;}
	  */

    var stobj = ubr.pageDims;
    var adjustTo = '82%'; // must be larger than layout
    if(ubr.isAmznKiller) {
      stobj.position = 'absolute';
      stobj.height = '90%';
      stobj.width = '90%';
      stobj.left = '5%';
      stobj.top = '5%';
      adjustTo = '92%';
    }
    
    var layout = dojo.doc.createElement('DIV');
    layout.id = 'pageLayout';
    dojo.style(layout, stobj);
	  STAGE.view.parentNode.insertBefore(layout, STAGE.view.nextSibling);
	  STAGE.layout = layout;
	  
    var master = dojo.doc.createElement('DIV');
    master.id = 'pageMaster';

     dojo.style(master, stobj);
	  STAGE.layout.parentNode.insertBefore(master, STAGE.layout.nextSibling);
	  STAGE.book = master;
     
    var cache = dojo.byId('itemCache');
    dojo.style(cache, stobj);
    dojo.style(cache, {
            height:'auto'
            });
     
     
	  
	  dojo.style(STAGE.book, 'height', adjustTo);
	  ubr.setFontSize();
	  
	  // uncomment to show pagination:
	  //dojo.style(STAGE.layout, 'visibility', 'visible');

	},
   getParaFromPage: function()
		{
		  // starts on current page and goes backwards, looking for a ubrid
			var pp = 0;
			for (var i = ubr.pagePointer; i > 0; i-- )
			{
				if (f = ubr.pageNodes[i].match(/ubrid="(\d+?)"/)) {
				  //Debug.log('found matches:'+f[1])
					pp = f[1];
					break;
				}
	 		}
	 		return pp;
	},
  showParaNumbering: function (e) {
     ubr.killIEResizeEvent = true;
      if(e.target.nodeName.toLowerCase() != 'p') return;
      var ubrid = e.target.getAttribute('ubrid');
      if(dojo.byId('paragraph-numbering')) {
        var attached = dojo.byId('paragraph-numbering');
      } else {
        var div = dojo.doc.createElement('div');
        dojo.attr(div, 'class', 'paragraph-number');
        dojo.style(div, 'visibility', 'hidden');
        dojo.style(div, 'color', '#999999');
        dojo.style(div, 'font-size', 'small');
        dojo.style(div, 'font-family', 'sans-serif');
        div.id = 'paragraph-numbering';
        var attached = dojo.body().appendChild(div);
      }
      attached.innerHTML = parseInt(ubrid)+1;
      var pos = dojo.coords(e.target); // the para position on screen
      var nt = (pos.x+pos.w) + 5; // numbering								
      var nl = pos.y;
      dojo.style(attached, 'position', 'absolute');
      dojo.style(attached, 'top', nl+'px');
      dojo.style(attached, 'left', nt+'px');
      dojo.style(attached, 'visibility', 'visible');
   },
   hideParaNumbering: function (e) {

      ubr.killIEResizeEvent = false;
      if(e.target.nodeName.toLowerCase() != 'p') return;
      var num = e.target.getAttribute('ubrid');
      var ind = 'paragraph-numbering';
      dojo.style(dojo.byId(ind), 'visibility', 'hidden');
	},
   /*
   showParaNumbering: function (e) {
     ubr.killIEResizeEvent = true;
      if(e.target.nodeName.toLowerCase() != 'p') return;
      var ubrid = e.target.getAttribute('ubrid');
      if(dojo.byId('paragraph-numbering-'+ubrid)) {
        var attached = dojo.byId('paragraph-numbering-'+ubrid);
      } else {
        var div = dojo.doc.createElement('div');
        dojo.attr(div, 'class', 'paragraph-number');
        dojo.style(div, 'visibility', 'hidden');
        dojo.style(div, 'color', '#999999');
        dojo.style(div, 'font-size', 'small');
        div.id = 'paragraph-numbering-'+ubrid;
        var attached = dojo.body().appendChild(div);
      }
      attached.innerHTML = parseInt(ubrid)+1;
      var pos = dojo.coords(e.target); // the para position on screen
      var nt = (pos.x+pos.w) + 5; // numbering								
      var nl = pos.y;
      dojo.style(attached, 'position', 'absolute');
      dojo.style(attached, 'top', nl+'px');
      dojo.style(attached, 'left', nt+'px');
      dojo.style(attached, 'visibility', 'visible');
   },
   hideParaNumbering: function (e) {

      ubr.killIEResizeEvent = false;
      if(e.target.nodeName.toLowerCase() != 'p') return;
      var num = e.target.getAttribute('ubrid');
      var ind = 'paragraph-numbering-'+num;
      dojo.style(dojo.byId(ind), 'visibility', 'hidden');
	},
   */
   resetPageView: function ()
	{
	  if(arguments[0]==true) {
	    var donotdestroy = true;
	  }
	  //Debug.log('page view reset');
	  //ubr.panelSlide('L', 2); // 2=poised
		//ubr.panelSlide('R', 2); // 2=poised
		//ubr.panelSlide('B', 4); // 2=poised
	  ubr.invalidatePageCache();
	  //Debug.log('page cache invalidated, unloading page view');
	  ubr.unloadPageView();
		
		if(!donotdestroy) {
			//Debug.log('destroying page space');
			ubr.destroyPageSpace();
			//Debug.log('page space destroyed, intializing');
			ubr.initPageSpace();
	  }
		//Debug.log('initializing page vars');
		ubr.pageModel.initPageVars();
      ubr.itemString = ubr.pageModel.getItemString();
		//Debug.log('calling getPages');
		ubr.getPages();
		//Debug.log('called getPages');
		
	},
   loadItem: function ()
   {
      ubr.markTocSelection();
  		dojo.publish('ubr/events/sectionView', [{
  			  mark:ubr.mark,
  			  time:(new Date()).getTime(),
  			  user:ubr.user,
  			  sectionNum:ubr.sectionPointer,
  			  sectionTitle:ubr.sections[ubr.sectionPointer].text,
  			  sectionFirstPara: ''
  		}]);
      ubr.getPages();
   },
   hideOverflow: function ()
   { // normal default condition at start of page area creation
     if(!ubr.preserveMasterHeight) return;
     dojo.style(STAGE.book, 'height', ubr.preserveMasterHeight);
   },
   showOverflow: function ()
   { // sets height to auto to avoid clipping
      ubr.preserveMasterHeight = dojo.style(STAGE.book, 'height');
	   dojo.style(STAGE.book, 'height', 'auto');
   },
   setContent: function ()
   {
      // one page only! overflow will show
      // unless you call hideOverflow
      
      if(arguments.length) {
         var html = arguments[0];
      } else {
         var html = ubr.pageNodes[ubr.pagePointer];
      }
      // shows content of current page in page view
      STAGE.book.innerHTML = html; // set page text in view		
   },
   getContent: function ()
   {
      return STAGE.book.innerHTML;
   }

}
ubr.pageModel = {
   idToPageMap: [],
   initPageVars: function () {
		ubr.pageNodes 					= [];
		ubr.pageClone					= undefined;
		ubr.paragraphCount			= 0;
		// pagination
		ubr.itemString 				= "";		 
		ubr.paginationPointer	= 0;
		ubr.paginationStart		= 0;
		ubr.paginationEnd			= 0;
		// selection
		ubr.selectedParagraph 	= undefined; 
		ubr.selectedNode			= undefined;
	},
	isPaginating: function () {
	  return (PubSubP8n.getActive());
	},
	invalidatePageCache: function ()
	{ // nullifys all page nodes for all sections
		for (var i=0; i < ubr.files.length; i++) {
			if(ubr.files[i].pageNodes) {
				ubr.files[i].pageNodes = undefined;
			}
		}
	},
   setItemString: function (itemString)
   {
      ubr.itemString = itemString;
      ubr.files[ubr.filePointer].itemString = itemString;
      dojo.byId('itemCache').innerHTML =
                     ubr.pageModel.filterForDisplay(ubr.files[ubr.filePointer].itemString);
   },
   getItemString: function ()
   {
      // gets the cached itemString, which
      // is the content of the current file
      // this is different from the active
      // itemString, which is for the currently
      // displayed content only, and may be
      // modified
      return ubr.pageModel.filterForDisplay(ubr.files[ubr.filePointer].itemString);
      
      //return dojo.byId('itemCache').innerHTML;
      
   },
   filterForDisplay: function (str)
   {
      
      // possibly move more of this to backend?
      // ie Book::getItemByFilename()
      // wish we knew performance impacts for each
      
      /* eliminate data urls, since they interfere with pagination */
      str = str.replace(/<img([^>]+?)src\s*?=\s*?"data\:[^"]+?"[^>]*?>/gm, "");
      /* translate bad svg with img links to img files */
      str = str.replace(/<svg:image[^>]+?xlink:href\s*?=\s*?"([^"]+?)"[^>]*?>/gm, '<img src="'+"$1"+'"/>');
      str = str.replace(/<\/svg:image>/, '');
      ubr.imgTagExp = /<img([^>]+?)src\s*=\s*"([^"]+?\.(png|jpe?g|svg|gif))"/gmi;
      /* REPLACE IMAGE TAGS WITH ABSOLUTE URLS */
      str = str.replace(ubr.imgTagExp, function(whole, firstmatch, secondmatch, extmatch, offset, stringthing) {
         
            if(secondmatch.match(/^http:\/\//)) { // support remote image urls
               var url = secondmatch;
            } else {
               var url = ubr.bookBaseURI + ubr.itemStem + secondmatch;
            }
            
            return '<img'+firstmatch+'src="' + url +'"';
      });
               
     /*
      <object type="application/x-shockwave-flash" data="swf/04_SirenSong.swf">\n <param name="movie" value="swf/04_SirenSong.swf"/ ubrid="28">\n <param name="play" value="false"/ ubrid="29">\n <param name="loop" value="false"/ ubrid="30">\n </object>
     */
               
      str = str.replace(/<object(.+?)data="([^"]+?)\.swf"/gmi,function (whole, first, second) {
      
            if(second.match(/^http:\/\//)) { // support remote image urls
               var url = second;
            } else {
               var url = ubr.bookBaseURI + ubr.itemStem + second;
            }
            
            
            return '<object'+first+'data="'+url+'.swf"';
      });
      str = str.replace(/<param(.+?)value="([^"]+?)\.swf"/gmi,function (whole, first, second) {
      
            if(second.match(/^http:\/\//)) { // support remote image urls
               var url = second;
            } else {
               var url = ubr.bookBaseURI + ubr.itemStem + second;
            }
            
            
            return '<param'+first+'value="'+url+'.swf"';
      });   
               
      /* GET RID OF Hn SINGLETONS */
      str = str.replace(/<h\d\s*?\/>/gm, '');
      
      /* assign paragraph ubrids */
      
      ubr.paragraphCount = 0;
      str = str.replace(/<p([^>]*?)>/gm, dojo.hitch(ubr, function (match, par) {
            if(match=='<p>'||match.match(/^<p\s/)) {
               var html = '<p' + par + ' ubrid="'+ubr.paragraphCount + '">';
               ubr.paragraphCount++;
               return html;
            } else {
               return match;
            }
      }));

      return str;
      
   },
   findPageForPara: function(id) {
  
      var found = -1;
      id = parseInt(id,10)+1;
      var pgs = ubr.files[ubr.filePointer].pageNodes;
   
      //Debug.log('checking '+pgs.length+' pageNodes for '+id);
      for (var i = 0; i < pgs.length; i++ )
      {
         var f = pgs[i].indexOf('ubrid="'+id+'"');
         if (f > -1) {
            found = i;
            break;
         }
      }
      return found;
   },
  clearPageCache: function (fileNum)
  {
    //Debug.log('clearPageCache called for sectionNum '+sectionNum);
    if(!fileNum) fileNum = ubr.filePointer;
    if(!ubr.files[fileNum]) Debug.log('clearPageCache: no file defined at that index!');
    ubr.files[fileNum].pageNodes = [];
    ubr.files[fileNum].itemString = undefined;
  },
  handlePage: function (pagetext)
  {
      if(typeof ubr.paginationPointer!='number') throw ("The pagination pointer must be a valid number");
      if(ubr.paginationPointer > ubr.paginationMaxLimit) { // runaway pagination?
         dojo.publish('ubr/events/paginationDone', [{time:(new Date()).getTime()}]);
         throw ("Hit maximum number of pages we can handle for a given file");
      }
      var pagetext = arguments[0];

      // match all paragraph elements on this chunk and number them
      // if marked as fragments, don't increment number
      // if count reaches paragraph pointer value, show the page
      //var paragraphFound = false;
      //Debug.log('tagging paragraphs with internal ids...');
      /*
      if(pagetext.match(/(<p[^>]*?)>/gm)) { // found a paragraph
        // Debug.log('found a paragraph');
         pagetext = pagetext.replace(/(<p[^>]*?)>/gm, dojo.hitch(ubr, function (match, par) {
            if(ubr.postJumpParaId==ubr.paragraphCount) {
                paragraphFound = true;
            }
            ubr.paragraphCount += (!par.match(/fragment/)) ? 1 : 0;
            return par + ' ubrid="'+((ubr.paragraphCount < 1) ? 0 : ubr.paragraphCount-1)+'">';
         }));
      }
      */

      pagetext.replace(/id=["']([A-za-z]\S+?)["']/g, function (match, sub1) {
         ubr.pageModel.idToPageMap[sub1] = ubr.paginationPointer;
         if(sub1==ubr.postJumpFragId) {
            if(ubr.postJumpFragId) {
            Debug.log('MATCHED OUR POST JUMP FRAG ID ON THIS PAGE');
            dojo.publish('ubr/events/postJumpFragLoaded', [ubr.paginationPointer]);
            }
         }
         return match;
      });
      
      ubr.pageModel.storePage(pagetext);
      
      
      /*
      var re = new RegExp('id="'+ubr.postJumpFragId+'"');
      if(pagetext.match(re)) {
         Debug.log('MATCHED OUR POST JUMP FRAG ID ON THIS PAGE');
         dojo.publish('ubr/events/postJumpFragLoaded', []);
      }
      */
      if(ubr.postJumpParaId) {
         var re = new RegExp('ubrid="'+ubr.postJumpParaId+'"');
         if(pagetext.match(re)) {
            Debug.log('MATCHED OUR POST JUMP ID ON THIS PAGE');
            dojo.publish('ubr/events/postJumpParaLoaded', [ubr.paginationPointer,ubr.postJumpParaId]);
         }
      }
      ubr.paginationPointer++;
      ubr.progPageNumFlash(ubr.paginationPointer, false);
      ubr.setProgMeter(Math.ceil(((ubr.itemString.length - arguments[1])/ubr.itemString.length)*100));
  },
  storePage: function(pagetext)
  {
     // uncomment top line to do on-the-fly perm caching of pages
     //ubr.files[ubr.filePointer].pageNodes[ubr.paginationPointer] = pagetext;
     ubr.pageNodes[ubr.paginationPointer] = pagetext;
  },
  firstUbrid: function()
  {
   var matches;
   return (matches = /ubrid="(\d+)"/.exec(ubr.pageModel.getPage())) ?
     matches[1]
     :
     -1;
  },
  getPage: function()
  {
     return ubr.pageNodes[ubr.pagePointer];
  },
  cacheAllPages: function ()
  {
     ubr.files[ubr.filePointer].pageNodes = ubr.pageNodes;  
  },
  handlePagesDone: function (time, err)
  { 
     Debug.log('rcvd pageDone signal:'+time);
     
    if(err) {
       
      console.log('error paginating item string');
      // fall back on cache, if there is one
      //ubr.pageNodes = ubr.sections[ubr.sectionPointer].cache.pageNodes; 
      //console.log(err);
      //ubr.getItem();
      Debug.log('Exception in pagination:'+err);
      ubr.pageModel.cacheAllPages();
      dojo.publish('ubr/events/paginationDone', [{time:0}]);
      Debug.log('handlePagesDone exited with errors');
      
    } else {

      Debug.log('caching all pages');
      ubr.pageModel.cacheAllPages();


      //TODO: ideally this should be a plugins message allowing plugin initialization
      // so that plugin code doesnt interfere with pagination
      var tm = (new Date()).getTime();
      //Debug.log((tm-ubr.getPagesCalledAt)+' pagination time');

      dojo.publish('ubr/events/paginationDone', [{time:0}]);
      
      Debug.log('handlePagesDone exited normally');
      
    }
  },
  
   processItemString: function (html)
   {
   
         html = data.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
   
   
         var linkref = /<a(.+?)href\s*?=\s*?"(.*?)"([^>]*?)>/gm;
         var linkreplace = '<a$1href="#"$3 onclick="ubr.handleHrefClick('+"'$2'"+'); return false;">';
   
         var preexp = /<pre([^<]+?)<\/pre>/ig;
         var prereplace = '<pre style="max-height:80%; width:90%; overflow:auto" $1</pre>';
   
         // strip out xml declarations
         html = html.replace(/<\s*?\?xml[^\?]+\?>/, '');
         html = html.replace(/<meta[^>]+?>/g, '');
         html = html.replace(/<title>[^<]*?<\/title>/ig, '');
       
         if(ubr.isAmznKiller) {
         //alert(html.match(/<object.+?<\/object>/));
         html = html.replace(/<object.+?<\/object>/ig, '');
         }
         
         html = html.replace(/<\s*?!DOCTYPE[^>]+?>/, '');
         html = html.replace(/<html[^>]*?>/, '');
         html = html.replace(/<\/html[^>]*?>/, '');	
         html = html.replace(/<body[^>]*?>/, '');
         html = html.replace(/<\/body[^>]*?>/, '');
         html = html.replace(/<head[^>]*?>/, '');
         html = html.replace(/<\/head[^>]*?>/, '');
         var linkels = [];
         html = html.replace(/<link[^>]*?>/g, function(linkel) {
                     linkels.push(linkel); 
                     return '';
         });
         for(var i=0; i < linkels.length; i++) {
           if(linkels[i].match(/purchase/)) {
             ubr.showbuylink = true;
           }
         }
         html = html.replace(/<script[^>]*?>/g, '');
         html = html.replace(/<\/script[^>]*?>/g, '');
         if (ubr.showbuylink) {
              html += '<div class="purchase-button"><a href="#" onclick="ubr.purchaseBook(); return false;">Read the whole book</a><span class="purchase-message"> for just </span></div>';        
         }
         // get rid of fixed unit font sizes so font can be scaled
         html = html.replace(/font-size\s*?:\s*?\d+?(px|pt)/g, '');
         ubr.imgTagExp = /<img([^>]+?)src\s*=\s*"([^"]+?\.(png|jpe?g|svg|gif))"/gmi;
         // REPLACE IMAGE TAGS WITH ABSOLUTE URLS
         html = html.replace(ubr.imgTagExp, function(whole, firstmatch, secondmatch, extmatch, offset, stringthing) {
         
            if(secondmatch.match(/^http:\/\//)) { // support remote image urls
               var url = secondmatch;
            } else {
               var url = ubr.bookBaseURI + ubr.itemStem + secondmatch;
            }
            
            return '<img'+firstmatch+'src="' + url +'"';
         });
            
         return html;
    }

}


ubr.m = {};
ubr.util = {};
ubr.util.getSfUrl = function (module, action) {
	// makes symfony url based on actual controller name
	var host = window.location.host;
	var pathname = window.location.pathname;
	var controller = '/';
	var url = 'http://';
	var parts = pathname.split('/');
	var isphp = parts[1].indexOf('.php');
	if (parts.length > 0 && isphp != -1) {
		controller = '/' + parts[1] + '/';
	} else {
		controller = '/';
	}

	var sfurl = url + host + controller + module + '/' + action;

	return sfurl;
}


ubr.util.hide = function(id) {
      dojo.style(id, 'visibility', 'hidden');
}

ubr.util.show = function(id) {
      dojo.style(id, 'visibility', 'visible');
}

ubr.util.setDebugging = function (debug, level) {
    ubr.debugging = debug;
 
    //Debug = console;
    window.Debug = {level:0,debug:false,log:function(){},start:function(){}};
    window.ChatDebug = window.Debug;
    if(debug) {
		window.Debug = {level:level,debug:debug,log:function(msg) {  console.log(msg);},start:function() {}};  
    }
    // uncomment for chat testing
    // window.ChatDebug = window.Debug;
}

ubr.bootstrap = {
   init: function () {
      $ = dojo.byId; // map prototype selector func to dojo


      window.STAGE = new Stage();
      // SET UP DEFAULTS BEFORE LOADING CONFIG
      ubr.isXD = false;
      ubr.debugging = false;
			ubr.pageCSS = {
         position:'absolute',
         visibility:'hidden',
         left:'17%',
         overflow:'hidden',
         paddingTop:'0em',
         paddingBottom:'0em',
         top:'0px',
         backgroundColor:'#ffffff',
         border:'none',
				 letterSpacing:'auto',
				 lineHeight:'1.5em',
				 padding:'0 !important',
				 margin:'0 !important',
				 height:'96%',
				 width:'66%'
      };
      ubr.bookId = 0; // default is book zero, unloaded state
      ubr.APPCLOSED = false;
      ubr.UIready = false;
      ubr.safariResizeEventFlag = true; // hack for ugly double call in safari
      ubr.imageLoadCheckIterations = 0;
      ubr.imageLoadCheckFadeInc = .005;
      ubr.imageLoadCheckFadeOpac = 1.0;							
      ubr.imageLoadCheckMaxIterations = 2000;
      ubr.proxyImages = false;
      ubr.itemStem = undefined; // for resolving package assets
      ubr.proxyImagesAsDataUrls = false;
      ubr.plugins = [];
      ubr.customSizeProfile = undefined;
      ubr.panelStates = { T:1, R:1, B:1, L:1 }; // 1,2 or 4 (hidden, poised or extended)
      ubr.stateList = undefined;
      ubr.panelLimits = { T:80, R:100, B:80, L:100 }; // percentages to determine bounds of motion
      ubr.panelNodes = { T:undefined, R:STAGE.note, B:STAGE.sectionMenu, L:STAGE.chat };
      ubr.socketNodes = { T:undefined, R:dojo.byId('rightSocket'), B:STAGE.sectionMenu, L:dojo.byId('leftSocket') };
      ubr.panelProps = { T:'top', R:'right', B:'height', L:'left'};
      ubr.percentProgress		= 0;
      ubr.navPointCounter = 0;
      ubr.pagePointer    		= 0;
      ubr.fontScaled         = 0;
      ubr.sections = [];
      ubr.files = [];
      ubr.filecache = [];
      ubr.pageNodes = [];
      ubr.chapterFile				= undefined;
      ubr.chapterTitle			= undefined;
      ubr.pagePointer = 0;
      ubr.paragraphPointer = 0;
      ubr.paragraphCount = 0;
      ubr.paginationPointer = 0;
      ubr.paginationMaxLimit = 500;
      ubr.pageRendered			= false;
      ubr.progFollowing			= false;
      ubr.paginationTimers 	= [];
      ubr.helpShowing				= false;										
      ubr.toLastPage					= false; 													// stupid flag for stupid coder
      ubr.pageControlsShowing	= false;
      ubr.navShowing = true;
      ubr.helpShowing = false;
      ubr.tocShowing = false;
      ubr.consoleShowing = false;
      ubr.navTimeout = null;
      ubr.doubleClickDelay = 500;
      ubr.usingNav = false;
      ubr.navShowInterval = 10000;
      ubr.mouseIdleTimeout = null;
      ubr.mouseIdleInterval = 12000;
      ubr.pageControlsEnabled = false;
      ubr.pageControlsFadeLevel = 0;														// opacity 0, .5 or 1.0
      ubr.sectionControlsFadeLevel = 0;
      ubr.progMeterFadeLevel = 0;
      ubr.sectionOpened			= false; 													// panel state
      ubr.ajaxTimeout				= 10;
      ubr.clearedEls 				= new Array(); 										// ???? some relic from muc code..
      ubr.loadedPageIsMarked = false;													// flag for annotation indicators
      ubr.profileId					= undefined;
      ubr.idLookup						= undefined;
      ubr.profileImg         = undefined;
      ubr.profileNick       = undefined;
      ubr.isLogged           = undefined;
      ubr.bookBaseURI        = undefined;
      ubr.mustrefresh = 0;
      ubr.allowKeynav = true;
      ubr.showbuylink = false;
      ubr.iphonemode = false;
      ubr.isAmznKiller = false;//(dojo.isSafari && (navigator.userAgent.indexOf("iPhone")||navigator.userAgent.indexOf("iPod")) != -1);
      // delete old-style cookies
      ubr.isAndroid = navigator.userAgent.indexOf("Android");
      ubr.touchEnabled = (
          navigator.userAgent.indexOf("iPhone")||
              navigator.userAgent.indexOf("iPod") != -1||
                 navigator.userAgent.indexOf("iPad") != -1||
                    ubr.isAndroid
                    );
      ubr.iPhone = (dojo.isSafari && ubr.touchEnabled);
      ubr.webkit = (navigator.userAgent.search(/WebKit/i) != -1);
      ubr.killIEResizeEvent = false;
      ubr.atomHistory = [];
      ubr.currentUrl = undefined;
      ubr.linearMode = true;
      ubr.restEndpoint = undefined;
      
      if(ubr.iPhone) { // dojo doesnt set unload on iPhone for some reason 
        window.addEventListener('unload', ubr.close, false);
      } else {
        dojo.addOnUnload(ubr.close);      
      }
      
      ubr.mark = undefined;
      ubr.user = undefined;
      ubr.bookGroup = 0;
      ubr.globalCatalogURI = 'http://www.bookglutton.com/api/stanza';
      ubr.feedProxyUrl = '/reader/atom2json';
      ubr.catalogShowing = false;
      ubr.readingFrom = undefined;
      ubr.fragPattern = /^bookgluttonid\((\d+)\)\s*?xpointer\(doc\(([^\)]+?)\)\)\/\/p\[(\d+?)\]\)/;
      ubr.fragTemplate = 'bookgluttonid(###BOOKID###)xpointer(doc(###DOCNAME###))//p[###PARA###])';
      ubr.mark = null;
      ubr.remoteUser = {id:null};
      ubr.epubId = null;


      var matches;

      if(matches = window.location.href.match(/group_id=(\d+?)&/)) {
        ubr.bookGroup = parseInt(matches[1]);
      }

     if(window.ubrConfig) { // load configuration from config object

         var cfg = window.ubrConfig;

         if(cfg.app) {
            cfg.app.plugins = [];
            ubr.minimalUI = true;
            ubr.forcePreview = cfg.app.forcepreview;
            ubr.util.setDebugging(cfg.app.debug, cfg.app.debuglvl);

            //Debug.log('plugins registered');
            ubr.setCatalogURI(cfg.app.catalog);
            ubr.setFeedProxyURI(cfg.app.feedproxy);
            
                
            ubr.restEndpoint = cfg.app.rest;
            

                               
         } else {
            throw ('Configuration directive "cfg.app" is required');
         }

         if(cfg.user) {
            var uobj = ubr.userModel.initUser(cfg.user, cfg.xmpp);
            //Debug.log('user initialized');
            ubr.userModel.setUser(uobj);
            //Debug.log('user set');
         } else {
            throw ('Configuration directive "cfg.user" is required');
         }
         
         ubr.uiView.initUI();

         //Debug.log('UI inited');

         if(cfg.book && cfg.mark) {
            var book = cfg.book;
            var mark = cfg.mark;
            ubr.setBookBaseURI(book.base);
            ubr.bookDetailLink = book.link;
            ubr.bookId = book.id;
            ubr.epubId = book.epubid;
            ubr.navCtl.setFileList(book.files);
            ubr.navCtl.setSectionList(book.sections);
            ubr.uiView.buildToc();


            if(window.location.href.indexOf('#')>-1) { // load from fragment id
               ubr.navCtl.loadFromHash();
            } else { // load from memex or stored bookmark  
               if(mark.href) {
                  ubr.navCtl.loadHref(mark.href);
               } else {
                 ubr.navCtl.loadHref(ubr.currentHref);
               }
            }
            ubr.bookTitle = book.title;
            ubr.bookPrice = book.price;
            ubr.bookAuthor = book.author;
            ubr.bookIdentifier = ubr.epubId;
            
            ubr.uiView.setBookMetaHTML();
            

            ubr.uiView.updateProgStatus(0);

            
            //ubr.uiView.setBookMetaHTML();
         } else { // user mode, sets ready for user-driven loading
            ubr.uiView.readyUI();
         }
      } else { 
        alert('error: no configuration found');
      }

            
   }
}

/**
 * 
 * Find more about the scrolling function at
 * http://cubiq.org/scrolling-div-on-iphone-ipod-touch/5
 *
 * Copyright (c) 2009 Matteo Spinelli, http://cubiq.org/
 * Released under MIT license
 * http://cubiq.org/dropbox/mit-license.txt
 * 
 * Version 2.3 - Last updated: 2009.07.09
 * 
 */
/*
function iScroll(el)
{
	this.element = el;
	this.position = 0;
	this.refresh();
	this.element.style.webkitTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
	this.acceleration = 0.009;

	this.element.addEventListener('touchstart', this, false);
}

iScroll.prototype = {
	handleEvent: function(e) {
		switch(e.type) {
			case 'touchstart': this.onTouchStart(e); break;
			case 'touchmove': this.onTouchMove(e); break;
			case 'touchend': this.onTouchEnd(e); break;
			case 'webkitTransitionEnd': this.onTransitionEnd(e); break;
		}
	},

	get position() {
		return this._position;
	},
	
	set position(pos) {
		this._position = pos;
		this.element.style.webkitTransform = 'translate3d(0, ' + this._position + 'px, 0)';
	},
	
	refresh: function() {
		this.element.style.webkitTransitionDuration = '0';

		if( this.element.offsetHeight<this.element.parentNode.clientHeight )
			this.maxScroll = 0;
		else		
			this.maxScroll = this.element.parentNode.clientHeight - this.element.offsetHeight;
	},
	
	onTouchStart: function(e) {
		e.preventDefault();

		this.element.style.webkitTransitionDuration = '0';	// Remove any transition
		var theTransform = window.getComputedStyle(this.element).webkitTransform;
		theTransform = new WebKitCSSMatrix(theTransform).m42;
		if( theTransform!=this.position )
			this.position = theTransform;
		
		this.startY = e.targetTouches[0].clientY;
		this.scrollStartY = this.position;
		this.scrollStartTime = e.timeStamp;
		this.moved = false;

		this.element.addEventListener('touchmove', this, false);
		this.element.addEventListener('touchend', this, false);

		return false;
	},
	
	onTouchMove: function(e) {
		if( e.targetTouches.length != 1 )
			return false;
		
		var topDelta = e.targetTouches[0].clientY - this.startY;
		if( this.position>0 || this.position<this.maxScroll ) topDelta/=2;
		this.position = this.position + topDelta;
		this.startY = e.targetTouches[0].clientY;
		this.moved = true;

		// Prevent slingshot effect
		if( e.timeStamp-this.scrollStartTime>100 ) {
			this.scrollStartY = this.position;
			this.scrollStartTime = e.timeStamp;
		}

		return false;
	},
	
	onTouchEnd: function(e) {
		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);

		// If we are outside of the boundaries, let's go back to the sheepfold
		if( this.position>0 || this.position<this.maxScroll ) {
			this.scrollTo(this.position>0 ? 0 : this.maxScroll);
			return false;
		}

		if( !this.moved ) {
			var theTarget = e.target;
			if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;
			var theEvent = document.createEvent("MouseEvents");
			theEvent.initEvent('click', true, true);
			theTarget.dispatchEvent(theEvent);
			return false
		}

		// Lame formula to calculate a fake deceleration
		var scrollDistance = this.position - this.scrollStartY;
		var scrollDuration = e.timeStamp - this.scrollStartTime;

		var newDuration = (2 * scrollDistance / scrollDuration) / this.acceleration;
		var newScrollDistance = (this.acceleration / 2) * (newDuration * newDuration);
		
		if( newDuration<0 ) {
			newDuration = -newDuration;
			newScrollDistance = -newScrollDistance;
		}

		var newPosition = this.position + newScrollDistance;
		
		if( newPosition>this.element.parentNode.clientHeight/2 )
			newPosition = this.element.parentNode.clientHeight/2;
		else if( newPosition>0 )
			newPosition/= 1.5;
		else if( newPosition<this.maxScroll-this.element.parentNode.clientHeight/2 )
			newPosition = this.maxScroll-this.element.parentNode.clientHeight/2;
		else if( newPosition<this.maxScroll )
			newPosition = (newPosition - this.maxScroll) / 1.5 + this.maxScroll;
		else
			newDuration*= 6;

		this.scrollTo(newPosition, Math.round(newDuration) + 'ms');

		return false;
	},
	
	onTransitionEnd: function() {
		this.element.removeEventListener('webkitTransitionEnd', this, false);
		this.scrollTo( this.position>0 ? 0 : this.maxScroll );
	},
	
	scrollTo: function(dest, runtime) {
		this.element.style.webkitTransitionDuration = runtime ? runtime : '300ms';
		this.position = dest ? dest : 0;

		// If we are outside of the boundaries at the end of the transition go back to the sheepfold
		if( this.position>0 || this.position<this.maxScroll )
			this.element.addEventListener('webkitTransitionEnd', this, false);
	}
};
*/


ubr.selectionCtl = {

    selectPara: function (selection)
    {
        if(!selection) return;
       
        
        // first in chain from click handler on a <p> node
        if(!ubr.selectedNodes) {
          ubr.selectedNodes = [];  
        }

        if(dojo.some(ubr.selectedNodes, function (node) {return (selection==node);})) { // clicking on same node will clear          
            ubr.selectionCtl._deselect(selection);
        } else {
            if(ubr.selectedNodes.length<1) {
                ubr.selectionCtl._select(selection);
            } else {
                ubr.selectionCtl._deselect(selection);
                ubr.selectionCtl._select(selection);
            }
        }
        
    },
    _deselect: function (selection)
    {
        dojo.forEach(ubr.selectedNodes, function (node) {
                dojo.removeClass(node, 'selected');
        });
        dojo.removeClass(selection, 'selected');
        ubr.selectedNodes = [];
        ubr.selectedNode = null;
    },
    _select: function (selection)
    {
        dojo.addClass(selection, 'selected');
        ubr.selectedNodes.push(selection);
        ubr.selectedNode = selection;
        ubr.uiView.showSharing();
    }
    

}
ubr.facebook = {

    connected: false,
    requireLogin: function(callback) {
        
        if(ubr.facebook.connected) {
            return true;
        } else {
            ubr.facebook.showLoginPrompt(callback);
        }
       
    },
    
    
    showLoginPrompt: function(callback) {
    
        // add whatever display call you need here
        // to show the FB login prompt
        
        //alert('you must log in dude');
        
        ubr.facebook.connected = true;
        callback();
    
    }
    



}
