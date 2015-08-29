/*
String.prototype.splice = function( index, howManyToDelete, stringToInsert ) {
var characterArray = this.split( "" );
Array.prototype.splice.apply(characterArray,arguments);
return(characterArray.join( "" ));
};
*/

ReadSocial.Sel = (function () {
  

  
  //rangy.init();
  
  var launcherLoc = { left:0, top:0 };
  var pointerEvent = { x:0, y:0 };
  var contentdoc;
  var currentParagraph;
  var currentHighlight;
  var originalHTML;
  var originalBgColor;
  var hoverRestoreBG;

  var mouseIsDown = false;
  var appendToEl = document.body;
  var storedRange = null;
  var appendBox = {};
  var markid;
  var launcherHTML = '<div style="display:none;width: 109px; height: 46px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAAuCAYAAAAiNJeUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTVBRUUyRkMzODBDMTFFMTgxMThEM0FDRTM3RDQ1OTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTVBRUUyRkQzODBDMTFFMTgxMThEM0FDRTM3RDQ1OTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMUY3MkM1NzM4MEMxMUUxODExOEQzQUNFMzdENDU5MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMUY3MkM1ODM4MEMxMUUxODExOEQzQUNFMzdENDU5MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqIiLqsAAAfmSURBVHja7FtpaBRJ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); -webkit-transition-property: top, bottom, left, right; -webkit-transition-duration: 0.5s; position:absolute; margin:0 auto; cursor:pointer; padding:0; z-index:100;" id="selui-launcher" class="launcher readsocial-buttonbox launcherButtonBox launcherButton">\
				</div>';
  var markTag = 'mark';
  var markClass= 'highlight';
//  var cssApplier = rangy.createCssClassApplier(markClass, {normalize: true, elementTagName: markTag });
  var launcher;





  function _init(config)
  {

    ReadSocial.log('selection init');

    if(typeof config!== 'undefined') {
      if(typeof config.launcherHTML !== 'undefined') {
        launcherHTML = config.launcherHTML;
      }    
      if(typeof config.attachTo !== 'undefined') {
        appendToEl = config.attachTo;
      }
      if(typeof config.markTag !== 'undefined') {
        markTag = config.markTag;
      }
      if(typeof config.markClass !== 'undefined') {
        markClass = config.markClass;
      }
      
    }
         
    jQuery(window).resize(function (e) {
      _showCursor();
    });

    contentdoc = ReadSocial.API.getContentDoc();

    jQuery(contentdoc).bind('scroll',function (e) {
      _showCursor();
    });


    // support for ibooks buttons

    ReadSocial.log('searching for nodes...');

    $('a.readsocial-epublink').each(function (i,n) {

      ReadSocial.log(n);

      var button = $(n);

      var ch = ReadSocial.API.createGroupName(button.text());

      button.html('#'+ch);

    //  button.addClass('group-pill');
      button.attr('title', 'Use ReadSocial to discuss with the #'+ch+' group');

      button.contents().wrap('<span style="color:white !important"></span>');

      var hashlabel = "readsocial-hashlabel-"+ch+'-'+(new Date()).getTime();

      var p = button.parent('p');

      button.click(function(e){

        ReadSocial.API.setGroupName(button.text().replace(/^#/,''));

        var eln = p[0];

        _clearAll();
   
        currentParagraph = eln;

        originalHTML = $(currentParagraph).html();

        ReadSocial.API.setContext(_getSelectionContext());

        ReadSocial.API.setNode(currentParagraph);

        var h = _getHighlight();

        storedRange = ReadSocial.Sel.serializeSelection();

        ReadSocial.API.setHighlight(h);

        ReadSocial.API.setLocator(storedRange);

/*
        if(h) {
          ReadSocial.API.showPublisherModal({
            view:'post'
          });
        } else {*/
        ReadSocial.API.showPublisherModal({
          view:'list'
        });
  //      }


      });
    });
    //ReadSocial.log('initialized selection mechanism');
  }
  
  function _toggleBySelector (sel) {
    
    jQuery(sel).trigger('mouseup');
    
  }

  function _attachLauncher () {
    
      var p = jQuery(currentParagraph);

      if(!p.size()>0) return false;

      var parents = p.parents();

      if(!parents.size()>0) return false;

      if(typeof appendToEl === 'undefined') {
        appendToEl = jQuery(p.parents()[0]);
        appendBox = {};
        appendBox.h = appendToEl.height();
        appendBox.w = appendToEl.width();
      }

      var jq = jQuery(appendToEl);

      if(jq.size()<1) {
        jq = jQuery('body');
      }

      jq.append(launcherHTML);

    	launcher = jQuery('#selui-launcher');

    	launcher.mousedown(function(e){

    		e.preventDefault();
    		e.stopPropagation();

        //_markSelection();

    	  ReadSocial.API.showPublisherModal({
          view:'post'
        });
    		//return false;

    	});


  }
  
  function _removeLauncher()
  {
    if(typeof launcher !=='undefined') {
      launcher.remove();
    }
  }
   
  function _toggleParagraph (e) {

    var p = e.target;

    if(p.nodeName.toLowerCase()=='p' && p !== currentParagraph) {

      if (e.type=='mouseover') {
        hoverRestoreBG = p.style.backgroundColor;
        p.style.backgroundColor = '#ececec';
        return;
      } else if (e.type=='mouseout') {
        p.style.backgroundColor = hoverRestoreBG;
        return;
      }
    }

    var el = jQuery(p);

    if(el[0].nodeName.toLowerCase()!='p') {
     el = el.parents('p');
    }
    if(!el.size()) {
      
      //ReadSocial.log('there is no paragraph here');
      el = el.parents('div');
      return false;
    } else {
      var eln = el[0];
    }

    var type = (e.type=='mouseup') ? 'selend' :
                  (e.type=='mousedown') ? 'selstart' :
                    'selmove';

    if(type=='selstart') {

      _handleSelStart(e,eln);

    } else if(type=='selend') {

       _handleSelEnd(e,eln);

    } else if(type=='selmove') {

    }
   
  }


 function _handleSelStart(e,eln) {

      _clearAll();
      mouseIsDown = true;
      currentParagraph = eln;

      originalHTML = $(currentParagraph).html();

      ReadSocial.API.setContext(_getSelectionContext());
 //     ReadSocial.API.setLocator(_getDOMLocation(eln));
      ReadSocial.API.setNode(currentParagraph);
      // highlight this item as selected
      var p = jQuery(currentParagraph);
      
      //p.addClass('bghilite');
      originalBgColor = hoverRestoreBG; //p.css('backgroundColor');
      p.css({backgroundColor:'#C6DAF5'});

      // capture mousedown location for pointer placement
      pointerEvent = e;
      
      if(typeof e.originalEvent !== 'undefined') { // only if this is a real click
      
        _attachLauncher();    
            
      }

  }

  function _handleSelEnd(e,eln) {

    mouseIsDown = false;
    
    _showCursor();

    if(eln==currentParagraph && _getHighlight().length<1) {
      
      alert('you clicked the same paragraph and there is no selection');
      
    }

    // before changing the paragraph's dom, store the range serialization:
    storedRange = ReadSocial.Sel.serializeSelection();
    ReadSocial.API.setHighlight(_getHighlight());
    ReadSocial.API.setLocator(storedRange);
                
    // now show highlight:
    ReadSocial.Sel.toggleSelectionColor();

  } 

  function _getSelector(el) {
    
	  var tag = (arguments.length>1) ? arguments[1] : 'p';
	  // generate a location string for this dom element
	  var tags = [];
	  var index = jQuery(el).prevAll(el.nodeName).size();
	  
	  jQuery(el).parents().each(function (i, n) {
	    
	    tags.unshift(n.nodeName.toLowerCase());
	    
	  });
	  
	  var sel = ('("'+tags.join(' > ') + ' > ' + tag + '")[' + index + ']');
 
	  return sel;
	  
  }
  

  function _getHighlight()
  {
    
    if(currentParagraph) {
      var s = window.getSelection();
      if(s.toString().length) {
        currentHighlight = s.toString();
        return s.toString();
      } else {
        var sc = _getSelectionContext();
        currentHighlight = sc;
        return sc;
      }
    } else {
      return '';
    }
    
  }
  
  
   function _getSelectionContext ()
   {
      var p = jQuery(currentParagraph).clone(true,true);
      $('a.readsocial-epublink',p).empty();
      return p.text().trim();
   }

  
  
   function _reposLauncher() {
      launcherLoc = { /* default */
        left:-7000,
        top:0
      };

      if(currentParagraph && typeof launcher !== 'undefined') {


        var p = jQuery(currentParagraph);
        
        
        // get relative event coords
         /*
         var totalOffsetX = 0;
         var totalOffsetY = 0;
         var elX = 0;
         var elY = 0;
         var currentElement = pointerEvent.target;

         do{
             totalOffsetX += currentElement.offsetLeft;
             totalOffsetY += currentElement.offsetTop;
         }
         while(currentElement = currentElement.offsetParent)

         elX = event.pageX - totalOffsetX;
         elY = event.pageY - totalOffsetY;

         var relco = {x:elX, y:elY}
         */

         // set adjustment offset for event
         
         //ReadSocial.log(pointerEvent);
         
         if(pointerEvent.offsetX>0) {
           //ReadSocial.log('setting pos from pointerEvent');
           var ox = pointerEvent.offsetX;/*-1 * relco.x - 20;//20;*/           
         } else {
           //ReadSocial.log('setting pos from p offset');
           var ox = p.offset().left;/*-1 * relco.x - 20;//20;*/
         }
       //  var ox = pointerEvent.offsetX;/*-1 * relco.x - 20;//20;*/
         var oy = p.offset().top;//pointerEvent.offsetY;/*-1 * relco.y + 40;//10;*/

         // get parent position

         var cpp = p.position();

         if(cpp) {

           // position based on parent pos and event offset

         // launcherLoc.left=cpp.left +p.width()-100/* - ox*/;
         //launcherLoc.top=cpp.top + p.height()-20/* - oy */;
          //launcherLoc.left=cpp.left + ox;// - 40;
          //launcherLoc.top=oy;//cpp.top + oy - 20;
          launcherLoc.top = pointerEvent.pageY - 40;
          launcherLoc.left = pointerEvent.pageX + 30;
          
           var cssblock = {
             top:launcherLoc.top+"px",
             left:launcherLoc.left+"px",
             position:"absolute !important",
             opacity:1
           };
           //ReadSocial.log(cssblock);

           launcher.css(cssblock);

         }
        
        
        
        launcher.show();
      }

   }

   function _clearAll () {

            
      var mh = jQuery(markTag+'.highlight');
      if(mh.size()>0) {
        mh.each(function (i,m) {
          
          jQuery(m.childNodes).unwrap();

        });
      }
      var p = jQuery(currentParagraph);
      p.removeClass('bghilite');
      p.css({backgroundColor:originalBgColor});

      //jQuery('p.bghilite').removeClass('bghilite');

      // remove selected status from selected items
      jQuery('p.readsocial-selected').removeClass('readsocial-selected');
      //_unmark();
      
      // use this instead of unmark
      //_restore();
      currentParagraph = null;
      currentHighlight = null;

      _removeLauncher();
      
   }
   
  function _showCursor() {

    _reposLauncher();

  }
    /*
  function _getCursorLocOld() {
        
    launcherLoc = {
         left:-7000,
         top:0
    };

    var p = jQuery(currentParagraph);
    
    var ox = -1 * pointerEvent.x - 20;//20;
    var oy = -1 * pointerEvent.y + 40;//10;

    var cpp = p.position();
    
    
    
    if(cpp) {
      launcherLoc.left=cpp.left-ox;
      launcherLoc.top=cpp.top-oy;      
    }
       
    ReadSocial.log('reporting cursor location:');
    ReadSocial.log(launcherLoc);
       
    return launcherLoc;

  }

*/


  function _markSelection()
  {

    //ReadSocial.log('markSelection');

    if(window.getSelection().toString().length>0) {
      
      var r = window.getSelection().getRangeAt(0);
      
      //ReadSocial.log(r);
      
      if(r.startContainer.nodeType==3) {
        var p = jQuery(r.startContainer).parent('p');
        if(p.size()) {
          var newh = _mark(p.html(), r);
          p.html(newh);
        }
      } else if(r.startContainer.nodeType==1) {
        
        
      }

    }
  }

  function _unmark() {
    
    var m = jQuery('#'+markid+' span');
    var s = jQuery('#'+markid+' span *');
    s.unwrap();
    m.unwrap();
    
  }
/*
  function _restore() {
    
    ReadSocial.log('restoring dom');
    jQuery(currentParagraph).html(originalHTML);
    ReadSocial.log('done');
  }
*/
/*
  function _mark(html,r)
  {
      if(!html) return "";
      originalHTML = html;
      markid = 'mark'+(new Date()).getTime();
      return [
          html.slice(0, r.startOffset),
          '<mark id="'+markid+'"><span>',
          html.slice(r.startOffset, r.endOffset),
          '</span></mark>',
          html.slice(r.endOffset)
        ].join('');
  }
  */
  

	function _getDOMLocation(p) {
	  
	  var tag = (arguments.length>1) ? arguments[1] : 'p';
	  // generate a location string for this dom element
	  var tags = [];
	  var index = jQuery(p).prevAll(tag).size();
	  jQuery(p).parents().each(function (i, n) {
	    
	    tags.unshift(n.nodeName.toLowerCase());
	    
	  });
	  
	  var sel = (tags.join(' > ')+' > '+tag+':nth-child('+(index+1)+')');
 
	  return sel;
	  
	}
	/*
	function _showHighlighted(str)
	{
	
    var words = str.split(' ');

    // only attempt this for longer highlights
    if(words.length<4) return;
        
    var d;

	  var start = words.shift(); // first frag
    var second = words.shift();
	  var end = words.pop(); // last frag
    var penul = words.pop();
    var middle = ' '+words.join(' ')+' ';


    // could fail
    var s = originalHTML.indexOf([start,second].join(' '));
    var e = originalHTML.indexOf([penul,end].join(' '))+[penul,end].join(' ').length;
    
    
    
    ReadSocial.log(s);
    ReadSocial.log(e);
    if(s == -1 || e == -1) {
      ReadSocial.log('failed to locate highlight in element');
      return;
    }
    var markid = 'mark'+(new Date()).getTime();
    var tagcount = 0;
    middle.replace(/<\/mark>/gi,function () {
	    tagcount++; // count as an end tag that must be pushed out
	    return '';
	  });

	  middle = [start,second].join(' ') + middle + [penul,end].join(' ');
    
    var fore = originalHTML.slice(0, s);
    
    console.log(fore);
    
    middle = ['<mark id="'+markid+'"><span>',middle, '</span></mark>'].join('');
	  for(var i=0; i<tagcount; i++) { // append end tags after highlight
	    middle += '</mark>';
	  }

    console.log(middle);

    var aft = originalHTML.slice(e);

    console.log(aft);

    var newhtml = [
        fore,
        middle,
        aft
      ].join('');

	  jQuery(currentParagraph).html(newhtml);
	  

	}
	*/
  return {
     
      init:_init,
      toggle: _toggleParagraph,
     /* showHighlighted: _showHighlighted,
      clearHighlighted: _restore,*/
      toggleSelectionColor: function () {

        // doesnt really seem to work:
        //cssApplier.toggleSelection();

      },
      getStoredRange: function () {
        return storedRange;
      },
      serializeSelection: function () {
        
        
        if(!window.getSelection().toString().length>0) return '';
      
        try {

         // var s = rangy.serializeSelection(
          //  null, /* use default selected */
           // true, /* omit checksum */
           // currentParagraph
          //);
        } catch (e) {
         // ReadSocial.log(e);
        }
//        ReadSocial.log('serialized selection:'+s);
  //      return s;
        return 'foo';
      },
      restoreSelection: function (s) {

        //rangy.deserializeSelection(s,currentParagraph);
        //ReadSocial.Sel.toggleSelectionColor();

      },/*
      rangy:rangy,*/
      toggleBySelector: _toggleBySelector,
      clearAll: _clearAll,
      getContext: _getSelectionContext,
      getHighlight: _getHighlight,
      showLauncher: _showCursor,
      getCurrentPara: function () {
        return currentParagraph;
      }
    
  };

})();


