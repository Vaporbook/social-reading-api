
;


ubr = {
  
  init: function () {
    ubr.bootstrap.init();
  },

  setDebugging: function (debug, level) {
    ubr.debugging = debug;
 
    //Debug = console;
    window.Debug = {level:0,debug:false,log:function(){},start:function(){}};
    window.ChatDebug = window.Debug;
    if(debug) {
		window.Debug = {level:level,debug:debug,log:function(msg) {  console.log(msg);},start:function() {}};  
    }
    // uncomment for chat testing
    // window.ChatDebug = window.Debug;
  },
  
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

  getUser: function () {
    return ubr.userModel.getUser();
  },
  clearUser: function () {
     ubr.userModel.clearUser();
  },


/**********************************/
/*            PLUGINS             */
/*********************************/

 
   deActivatePlugins: function() {
      ubr.pluginCtl.deActivatePlugins();
	},
   getPluginByName: function (name) {
     return ubr.pluginCtl.getPluginByName(name);
   },
   registerPlugin: function (P) {
      return ubr.pluginCtl.registerPlugin(P);
   },



/**********************************/
/*            UI AND LAYOUT       */
/*********************************/


   makeItFit: function () {
     ubr.uiView.makeItFit();
   },
   initUI: function () {
     ubr.uiView.initUI();
   },
	setUserBoxHTML: function ()
	{
     ubr.uiView.setUserBoxHTML();
	},
  toggleCat: function ()
  { // uses nonlinear mode to display atom catalog
     ubr.uiView.toggleCat();
  },

  toggleLinearMode: function () {
    ubr.linearMode = !ubr.linearMode;
    if(!ubr.linearMode) { // toggled linear mode off
      ubr.cacheLinears();
    } else { // toggled back on
      ubr.restoreLinears();
    }
  },
  /*
  cacheLinears: function () {
    // stores linear content in a cache so
    // nonlinear content can be displayed in
    // book paging area
    ubr.linearContentCache = {
      sections:ubr.sections,
      pagePointer:ubr.pagePointer,
      sectionPointer:ubr.sectionPointer,
      chapterFile:ubr.chapterFile,
      mark:ubr.mark,
      selectedParagraph:ubr.selectedParagraph,
      pageNodes:ubr.pageNodes,
      itemString:ubr.itemString,
      tochtml:STAGE.tocitems.innerHTML
    };
    ubr.sections = [ubr.getNewSectionObj('#', 'Out of spine content')];
    ubr.pagePointer = 0;
    ubr.sectionPointer = 0;
    ubr.mark = undefined;
    ubr.selectedParagraph = undefined;
    ubr.pageNodes = [];
    ubr.itemString = "";
    ubr.buildToc();
  },
  
  restoreLinears: function () {
    // restores linear data from cache
    var c = ubr.linearContentCache;
    
    ubr.sections = c.sections;
    ubr.pagePointer = c.pagePointer;
    ubr.sectionPointer = c.sectionPointer;
    ubr.chapterFile = c.chapterFile;
    ubr.mark = c.mark;
    ubr.selectedParagraph = c.selectedParagraph;
    ubr.pageNodes = c.pageNodes;
    ubr.itemString = c.itemString;
    ubr.setTocHTML(c.tochtml);
    
    ubr.linearContentCache = undefined;
  },
  */
  
  extendFeednav: function()
  {
     ubr.uiView.extendFeednav();
  },
  
  retractFeednav: function()
  {
     ubr.uiView.retractFeednav();
  },
  
  createFeedNav: function()
  {
     ubr.uiView.createFeedNav();
  },
  
  loadEpub: function (url)
  {
     ubr.feedCtl.loadEpub(url);
  },

  nextFeed: function (url)
  {
     ubr.feedCtl.nextFeed(url);
  },
  
  atomxml2obj: function (xml)
  {
     return ubr.feedModel.atomxml2obj(xml);
  },

  atomToHTML: function (data)
  {
     return ubr.feedView.atomToHtml(data);
  },

  fetchAtom: function (url)
  {
     ubr.feedCtl.fetchAtom(url);
  },
  
  backAtom: function ()
  {
     ubr.feedCtl.backAtom();
  },

  suspendUI: function ()
	{
      ubr.uiView.suspendUI();
	},

  authUser: function()
  {
     ubr.authCtl.authUser();
  },
   
  sendLogin: function (user, pass, cb)
  {
     ubr.authCtl.sendLogin(user, pass, cb);
  },
  
  sendLogout: function (cb)
  {
     ubr.authCtl.sendLogout(cb);
  },
  
  createAccount: function (name, user, news, pass, passbis, cb)
  {
     ubr.authCtl.createAccount(name, user, news, pass, passbis, cb);
  },
  
  auth: function (form, content, cb)
  {
     ubr.authCtl.auth(form, content, cb);
  },

  getWidget: function ()
  { 
     ubr.uiView.getWidget();
  },

  loadWidgetCode: function (size) 
  {
     ubr.uiView.loadWidgetCode(size);
  },

	readyUI: function ()
	{
     ubr.uiView.readyUI();
	},
	
	webSearch: function(q, handleWith)
	{
	  $.ajax({
										url: ubr.getSfUrl('reader','feedbooksSearch'),
										data: { q: q },
										encoding: 'utf-8',
										complete: handleWith
               	});
	},
	

  handleSearchKey: function()
  {
     /*
    ubr.genericModal('<h2>Search</h2><p>Use this form to do a quick web search for a book you want.</p><form onsubmit="ubr.webSearch($(\'modalQuery\').value, ubr.handleFBResults);return false;"><input id="modalQuery" type="text" value="[type query here]" onfocus="this.value=\'\'"  /><input type="submit" /></form><div id="modalQueryResults"></div>');  
    */
  },

  autoScale: function() {
     ubr.uiView.autoScale();
  },

	progFollow: function(evt)
	{
      ubr.progMeterView.progFollow(evt);			
	},
	progPageNumFlash: function ()
	{
     var num = (arguments.length>0) ? arguments[0] : ubr.pagePointer;
	  var fadein = (arguments.length>0) ? arguments[1] : true;
	  var fadeout = (arguments.length>1) ? arguments[2] : true;
     ubr.progMeterView.progPageNumFlash(num,fadein,fadeout);
	},
	progStop: function (evt)
	{
      ubr.progMeterView.progStop();
	},
	progUpdateFromMouse: function (evt)
	{
      ubr.progMeterView.progUpdateFromMouse(evt);
	},
	progUpdatePageFromMouse: function (evt)
	{
      ubr.progMeterView.progUpdatePageFromMouse(evt);
	},
	setProgMeter: function (percent)
	{
      ubr.progMeterView.setProgMeter(percent);
	},
	
	enablePageControls: function()
	{
      ubr.uiView.enablePageControls();
	},
	
	hidePageControls: function (cb, cbargs)
	{
      ubr.uiView.hidePageControls(cb, cbargs);
	},
	
	showPageControlsDisabled: function ()
	{
      ubr.uiView.showPageControlsDisabled();
	},
   
	showProgMeterDisabled: function ()
	{
      ubr.progMeterView.showProgMeterDisabled();
	},
   
	showSectionControlsDisabled: function ()
	{
      ubr.uiView.showSectionControlsDisabled();
	},

	/***************** ANIMATIONS ********************/


	fadePageControls: function (start, end) {
      ubr.uiView.fadePageControls(start, end);
	},
	fadeSectionControls: function (start, end) {
      ubr.uiView.fadeSectionControls(start, end);
	},
   hideControls: function () {
      ubr.uiView.hideControls();
	},
   showControls: function () {
      ubr.uiView.showControls();
	},   
	fadeProgMeter: function (start, end)
	{
      ubr.progMeterView.fadeProgMeter(start, end);
	},




/*************** Font Sizing *********************/

  toggleFontSize: function () {
     ubr.pageCtl.toggleFontSize();
  },

  setFontSize: function () {
     ubr.pageCtl.setFontSize();
  },



	/**********************************************
	*
	*								PAGINATION CONTROLLER							
	*
	***********************************************/


	destroyPageSpace: function ()
	{
      ubr.pageView.destroyPageSpace();
	},
	initPageSpace: function ()
	{
      ubr.pageView.initPageSpace();
	},

	isPaginating: function () {
	  return ubr.pageModel.isPaginating();
	},
	invalidatePageCache: function ()
	{ // nullifys all page nodes for all sections
      ubr.pageModel.invalidatePageCache();
	},
  clearPageCache: function (sectionNum)
  {
     ubr.pageModel.clearPageCache();
  },
  getPages: function ()
  {
     ubr.pageCtl.getPages();
  },
  handlePage: function ()
  {
     ubr.pageModel.handlePage(arguments[0]);
  },
  handlePagesDone: function (time, err)
  { 
     ubr.pageModel.handlePagesDone(time, err);
  },


  /**********************************/
  /*            MISC                */
  /*********************************/


   getViewport: function () {
      return ubr.uiView.getViewport();
	},

	close: function(redir)
	{
		ubr.APPCLOSED = true;
		ubr.deActivatePlugins();
	   ubr.saveMark();
		if(redir) document.location.href = redir;
	},
	
	logout: function ()
	{
	  ubr.sendLogout(function (){
      window.location.reload();
    });
	},

   getSection: function()
   {
      // returns the current section object
      return ubr.navCtl.getSection();
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


    panelSlide: function (loc, pos, set) {
	
			Debug.log('panelSlide called');
			
			Debug.log(loc);
			Debug.log(pos);
			Debug.log(set);
	
      ubr.panelView.panelSlide(loc, pos, set);
    },
	 clearLoadCheck: function () {
         ubr.asyncImgLoader.clearLoadCheck();
	  },

	  handleHrefClick: function (evt) {
         ubr.navCtl.handleHrefClick(evt);
		},
		
		jumpToHref: function(url) {
         ubr.navCtl.jumpToHref(url);
		},

		changeGroupContext: function(id) {
		  if(!id) return false;
		  var bookid = ubr.bookId;
		  var groupid = id;
		  var url = (id==0) ? ubr.getSfUrl('reader', 'unbound2') + '?group_id=0&id=' + bookid + '&view=ub':
		  ubr.getSfUrl('reader', 'unbound2') + '?group_id=' + groupid + '&id=' + bookid + '&view=ub';
		  //Debug.log('new url for group context change will be '+url);
		  document.location.replace(url);
		},
		
		jumpToFrag: function() {
         ubr.navCtl.jumpToFrag();
		},
	
		setPageFromPara: function()
		{
         ubr.navCtl.setPageFromPara();
		},

		getParaFromPage: function()
		{
         return ubr.pageView.getParaFromPage();
		},

		updatePageView: function ()
		{
         ubr.pageCtl.updatePageView();
		},
		unloadPageView: function () {
         ubr.pageCtl.unloadPageView();
		},

		updateProgMeter: function ()
		{	
         ubr.progMeterView.updateProgMeter();
		},
		
		updateSectionStat: function ()
		{
         ubr.uiView.updateSectionStat();
		},



	/*////////////////SELECTION///////////////////*/
    
    getSelectionTransport: function (node)
    {
      return ubr.selectionCtl.getSelectionTransport(node);
    },
    
   selectPara: function (event)
   {
      ubr.selectionCtl.selectPara(event);
   },
   selectParaById: function (id)
   {
      ubr.selectionCtl.selectParaById(id);
   },
   
   selectAsNode: function (node)
   {
      ubr.selectionCtl.selectAsNode(node);
   },
   
   setSelection: function (node)
   {
     ubr.selectionCtl.selectAsNode(node);
   },
   
   clearSelections: function ()
   {
            // optionally pass a node cleared by direct click
     Debug.log('api clearSelections');
     ubr.selectionCtl.selectAsNode(null);
   },

   
   showParaNumbering: function (e) {
     ubr.pageView.showParaNumbering(e);
   },
   
   hideParaNumbering: function (e) {
     ubr.pageView.hideParaNumbering(e);
   },
		
    hide: function(id)
    {
      ubr.style(id, 'visibility', 'hidden');
    },

    show: function(id)
    {
      ubr.style(id, 'visibility', 'visible');
    },


	/*////////////////NAVIGATION///////////////////*/


      nextPressed: function ()
      {
         ubr.navCtl.nextPage();
      },
      prevPressed: function ()
      {
         ubr.navCtl.previousPage();
      },
      
      jumpToSection: function (newsection)
      {
         ubr.navCtl.jumpToSection(newsection);//section(newsection);
      },
      
      getNewSectionObj: function(href, label)
      {
         return { href: href,
                  text: label,
                  cache: { itemString: undefined, itemImages: undefined, pageNodes: undefined }
               };
      },
    restfulConnect:  function(obj, cb)
    {
       ubr.restCtl.init(obj,cb);
    },
    getOPS: function (cb) { // combines two ajax reqs into one
      ubr.restCtl.getOPS(cb);
    },
    getNcx: function (cb) {
      ubr.restCtl.getNcx(cb);
    },
    getOpf: function (cb) {
      ubr.restCtl.getOpf(cb);
    },
    buildToc: function () {
       ubr.tocView.buildToc();
    },
    setTocHTML: function (html) {
       ubr.tocView.setTocHTML(html);
    },
    getTocEntryHTML: function (i, secobj) {
      return ubr.tocView.getTocEntryHTML(i, secobj);
    },
  	markTocSelection: function ()
  	{
      ubr.tocView.markTocSelection();
  	},
   
  	getItem: function (cb) {
  	   ubr.navCtl.getItem(cb);       
  	},
   
   handleOpf: function (opfdata, xobj, cb) {
      ubr.responseCtl.handleOpf(opfdata, xobj, cb);
   },
   
   handleNcx: function (ncxdata, xobj, cb) {
      ubr.responseCtl.handleNcx(ncxdata, xobj, cb);
    },

 
    purchaseBook: function ()
    {

      var id = ubr.bookId;
      var newurl = ubr.getSfUrl('store','purchase')+'?buyid='+id;
      ubr.close(newurl);
      
    },
    
    handlePurchaseResponse: function (data, xobj)
    {
      //Debug.log(data);
    },
   
   unloadAndGet: function ()
   {
      ubr.pageCtl.unloadAndGet();
   },
   


	/*//////////////////////UTILITY//////////////////*/
		

    muc: function ()
    {
      // temp hack to be able to call the chat instance
      return ubr.getPluginByName('chat');
    },
    note: function ()
    {
      // temp hack to be able to call the note instance
      return ubr.getPluginByName('note');
    },

		style: function (n,p,v)
		{

			if(typeof p == 'object') {
				
				return $(n).css(p);
			} 
			
			if(v) {
				return $(n).css(p,v);
			} else {
				return $(n).css(p);
			}
		},
		
		subscribe: function (channel, context, handler)
		{
			if(typeof context != 'undefined') context = document;
			$(document).bind(channel, handler);
		},
		
		publish: function (channel, data)
		{
		
			$(document).trigger(channel, data);
			

		///	console.log(arguments);
			
		},
		
		coords: function (n)
		{
			
			if(!n) return null;
			
			var jn = $(n);

			var p = jn.position();

			
			if(!p) {
				p = {
					left:0,
					top:0
				}
			};
			
			return {
				h: jn.height(),
				w: jn.width(),
				l: p.left,
				t: p.top,
				x: p.left,
				y: p.top
			}
			
		},
		
		create: function (el, atts, n)
		{
			var a = '';
			for(prop in atts) {
				a += prop+'="'+atts[prop]+'"';
			};
			var html = ['<',el,' ',a,'></',el,'>'].join('');
			return n.append(html);
		},
		
		connect: function (n, e, f)
		{
			$(n).bind(e,f);
		},
		
		addClass: function (n, cl)
		{
			
			$(n).addClass(cl);
			
		},
		
		removeClass: function (n, cl)
		{
			
			$(n).removeClass(cl);
			
		},
		
		attr: function(n,name,val)
		{
			
			$(n).attr(name,val);
			
		},
		
		map: function (a, f)
		{
			return $.map(a, f);
		},
		
		body: function () {
			return $('body')[0];
		},
		
		getSfUrl: function (module, action) {
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

}

























if(typeof ubr == 'undefined') var ubr = {};

if (!Function.prototype.bind) { // check if native implementation available
  Function.prototype.bind = function(){ 
    var fn = this, args = Array.prototype.slice.call(arguments),
        object = args.shift(); 
    return function(){ 
      return fn.apply(object, 
        args.concat(Array.prototype.slice.call(arguments))); 
    }; 
  };
}

if(typeof window.console == 'undefined') window.console={
	log: function () {}
}

ubr.bootstrap = {

  
   init: function () {


      // SET UP DEFAULTS BEFORE LOADING CONFIG
      ubr.isXD = false;
			ubr.loaderImage = '/ubrx/unbound/images/loading.gif';
      ubr.debugging = false;
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
      ubr.pageDims = {
         position:'absolute',
         visibility:'hidden',
         height:'80%',
         left:'29%',
         overflow:'hidden',
         paddingTop:'0em',
         paddingBottom:'0em',
         top:'8%',
         width:'42%',
         backgroundColor:'#ffffff',
         border:'none'
      };
      ubr.customSizeProfile = undefined;
      ubr.panelStates = { }; // 1,2 or 4 (hidden, poised or extended)
      ubr.panelLimits = { }; // percentages to determine bounds of motion
      ubr.panelNodes = { };
      ubr.socketNodes = { };
      ubr.panelProps = { };
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
      ubr.toLastPage					= false; 											
      ubr.pageControlsShowing	= false;
      ubr.navShowing = true;
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
      ubr.loadedPageIsMarked = false;				
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
      ubr.killIEResizeEvent = false;
      ubr.atomHistory = [];
      ubr.currentUrl = undefined;
      ubr.linearMode = true;
      ubr.restEndpoint = undefined;
      ubr.mark = undefined;
      ubr.user = undefined;
      ubr.bookGroup = 0;
      ubr.globalCatalogURI = null;
      ubr.feedProxyUrl = '/feedme/getFeed';
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
      if(window.location.href.match('view=ubxd')) {
        ubr.isXD = true;
      }     
     


     if(window.ubrConfig) { // load configuration from config object
      
         var cfg = window.ubrConfig;
         var vp = ubr.getViewport();

         if(cfg.app) {
            ubr.forcePreview = cfg.app.forcepreview;
            //ubr.setDebugging(cfg.app.debug, cfg.app.debuglvl);
            ubr.setDebugging(true, 4);
						ubr.setCatalogURI(cfg.app.catalog);
            ubr.setFeedProxyURI(cfg.app.feedproxy);
            ubr.restEndpoint = cfg.app.rest;
         } else {
            throw ('Configuration directive "cfg.app" is required');
         }
			
				 if(cfg.user) {
				    var uobj = ubr.userModel.initUser(cfg.user, cfg.xmpp);
				    ubr.userModel.setUser(uobj);
				 } else {
				    throw ('Configuration directive "cfg.user" is required');
				 }
				
         ubr.initUI();



  			 if(!cfg.user.islogged) {
				
					 ubr.authCtl.authUser();
				
				 }
				
         if(ubr.debugging) { // if debugging on dev, no use ssl
            ubr.authCtl.scheme = 'http';
         }

         if(cfg.book && cfg.mark) {
            var book = cfg.book;
            var mark = cfg.mark;
            ubr.setBookBaseURI(book.base);
            ubr.bookDetailLink = book.link;
            ubr.bookId = book.id;
            ubr.epubId = book.epubid;
            ubr.navCtl.setFileList(book.files);
            ubr.navCtl.setSectionList(book.sections);
            ubr.tocView.buildToc();
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
         } else { // user mode, sets ready for user-driven loading
            ubr.readyUI();
         }
				 
      } else { 
         ;
      }
   }
}




ubr.authCtl = {

  suspendUI: function ()
	{
	  ubr.UIready = false;
	  ubr.showPageControlsDisabled();
		ubr.showProgMeterDisabled();
	},

  authUser: function()
  {
    if(ubr.user.isLogged) return true;
    
//    if(!ubr.isXD) { // old way, used to use for xd
      
      var thisloc = document.location.href;
      //document.location.href = ubr.getSfUrl('portal', 'signin')+'?next='+escape(thisloc);
      //return true;
//    } else {
      
      //ubr.style("bookgluttonAuthMask", "display", "block");
      ubr.suspendUI();

      if(ubr.isLogged) {
        ubr.style("bookgluttonAuth", "display", "block");      
        ubr.style("bookgluttonLoggedIn", "display", "block");
      } else {
        ubr.style("bookgluttonAuth", "display", "block");
        if(arguments[0]) {
          ubr.style("bookgluttonSignup", "display", "block");
        } else {
          ubr.style("bookgluttonLogin", "display", "block");        
        }
      }
         
//    }

  },
   
  sendLogin: function (user, pass, cb)
  {
    var form = $("#bookgluttonLoginForm form")[0];
    ubr.auth(form, {
      rpcmethod: 'login',
      username: user,
      password: pass
    }, cb);
  },
  
  sendLogout: function (cb)
  {
    var form = $("#bookgluttonLogoutForm form")[0];
    ubr.auth(form, {
      rpcmethod: 'logout'
    }, cb);
  },
  
  createAccount: function (name, user, news, pass, passbis, cb)
  {
    var form = $("#bookgluttonSignupForm form")[0];
    ubr.auth(form, {
      rpcmethod: 'signup',
      nickname: name,
      username: user,
      newsletter: news,
      password: pass,
      password_bis: passbis
    }, cb);
  },
  
  auth: function (form, content, cb)
  {
    var ioargs = {
      url:document.location.protocol+'//'+document.location.host+'/reader/auth',
      contentType: 'json',
      data: content,
      complete: cb
    };
    if(form) ioargs['form'] = form;
		$.ajax(ioargs);
  },

	loginResponderHandler: function (data, xobj) { // handler for response

          if(data.err==null) {
            
            var working = $("#bookgluttonLogin .bookgluttonFormWorking")[0];
            ubr.style(working, "display", "none"); // hide working animation
            ubr.style("bookgluttonLogin", "display", "none");
            ubr.style("bookgluttonSignup", "display", "none");
            ubr.style("bookgluttonAuth", "display", "none");
            ubr.style($("loginformcontrols"), "display", "block");
            ubr.isLogged = true;
            ubr.setUser(data.uobj);
            ubr.setUserBoxHTML();
            Debug.log('publishing log in event');
            ubr.publish('ubr/events/userLoggedIn', [{time:(new Date()).getTime(), user:ubr.getUser()}]);
            
            window.location.reload();
          } else {
            var working = $("#bookgluttonLogin .bookgluttonFormWorking")[0];
            ubr.style(working, "display", "none"); // hide working animation
            ubr.style($("loginformcontrols"), "display", "block");
            var errblocs = $("#bookgluttonLogin .bookgluttonFormError");
            errblocs.style('display', 'block'); // show error blocks
            errblocs[0].innerHTML = data.err;
          }
  },
	
	logoutResponder: function (){
    // on success:

    ubr.style("bookgluttonLoggedIn", "display", "none");
    ubr.style("bookgluttonAuth", "display", "none");                           
    ubr.style($("#bookgluttonLoggedIn .bookgluttonFormWorking")[0], "display", "none");
    ubr.style($("logoutformcontrols"), "display", "block");
    
    window.location.reload();
    
  
    ubr.clearUser();
    ubr.setUserBoxHTML();
    ubr.publish('ubr/events/userLoggedOut', [{time:(new Date()).getTime()}]);
   
  },

	loginResponder: function (evt) {
    evt.preventDefault();
    ubr.style($("loginformcontrols"), "display", "none"); // swap in working anim
    ubr.style($("#bookgluttonLogin .bookgluttonFormWorking")[0], "display", "block");
    var handler = ubr.authCtl.loginResponderHandler;

    // send form data

    ubr.sendLogin($("bgloginemail").value, $("bgloginpassword").value, handler);

    return false;

	},
	
	toggleSignup: function () {
	   ubr.style("bookgluttonLogin", "display", "none");
	   ubr.style("bookgluttonSignup", "display", "block");      
	 },
	
	cancelAuth: 	function () {
		   ubr.style("bookgluttonLogin", "display", "none");
		   ubr.style("bookgluttonSignup", "display", "none");
		   ubr.style("bookgluttonAuth", "display", "none");
		   ubr.readyUI();
  },
	
	logoutResponder: function (evt) {
		evt.preventDefault();
	   ubr.sendLogout(ubr.authCtl.logoutResponder);
	   $("#logoutformcontrols").css("display", "none");
	   $("#bookgluttonLoggedIn .bookgluttonFormWorking").css("display", "block");
	 },

	signupResponder: function (evt) {
    evt.preventDefault();
    ubr.style($("signupformcontrols"), "display", "none"); // swap in working anim
    ubr.style($("#bookgluttonSignup .bookgluttonFormWorking")[0], "display", "block");
    var handler = function (data, xobj) {

          if(data.result=='success') {
            window.location.reload();
          } else {
            var working = $("#bookgluttonSignup .bookgluttonFormWorking")[0];
            ubr.style(working, "display", "none"); // hide working animation
            ubr.style($("signupformcontrols"), "display", "block");
            var errblocs = $("#bookgluttonSignup .bookgluttonFormError");
            errblocs.style('display', 'block'); // show error blocks
            errblocs[0].innerHTML = data.message;
          }


    };
    ubr.createAccount($("bgsignupname").value,
                      $("bgsignupemail").value,
                      $("bgsignupnews").value,
                      $("bgsignuppassword").value,
                      $("bgsignuppasswordbis").value,
                      handler);
    return false;
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
         if(ubr.isSafari) {
            ubr.itemStem = (matches = ubr.currentFile.match(/^(.*?\/)[^\/]+?/)) ? matches[1] : '';
         } else {
           ubr.itemStem = (matches = ubr.currentFile.match(/^(.*\/)[^\/]+?$/)) ? matches[1] :'';
         }
         
         if(!ubr.itemStem.match(/\/$/)) {
            ubr.itemStem += '/';
         }
         
      },
      
      handleParagraphSelect: function () {
	
         Debug.log('navCtl: para selected');

         ubr.paragraphPointer = ubr.selectedParagraph;
         ubr.currentHref = ubr.currentFile+'#!'+ubr.paragraphPointer+'p:0';
         ubr.navCtl.setUriFrag();

      },
     
      handleParagraphDeSelect: function () {
         Debug.log('navCtl: para deselect');
         if(ubr.fbLikeFrame) {
            ubr.navCtl.hideFb();
         }
         ubr.navCtl.setUriFrag();     
      },
      
      hideFb: function () {
          ubr.attr(ubr.fbLikeFrame, 'src', '');
          ubr.style(ubr.fbLikeFrame, 'display','none');
          ubr.style(ubr.fbclose, 'display','none');
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

         ubr.currentHref = href;
         ubr.paragraphPointer = 0;
         ubr.pagePointer = 0;
         ubr.panelSlide('B', 4);
         

         ubr.unloadPageView();
         // fix url for agents that encode subsequent pound signs
         if(ubr.currentHref.indexOf('#') < ubr.currentHref.indexOf('%23')) {
            ubr.currentHref = ubr.currentHref.replace('%23', '#');
         }
         ubr.postJumpFragId = (ubr.currentHref.indexOf('#')!=-1) ? ubr.currentHref.split('#')[1] : '';
         Debug.log('postJumpFragId is '+ubr.postJumpFragId);
         if(ubr.postJumpFragId.match(/^!\d+p/)) { // postjumppara will override postjumpfrag
         
            ubr.postJumpParaId = ubr.navCtl.getParaFromFragId(ubr.postJumpFragId);
            ubr.paragraphPointer = parseInt(ubr.postJumpParaId,10);
            Debug.log('set paragraph pointer from frag id to '+ubr.paragraphPointer);
            
         }
         
     
         ubr.navCtl.getItem();
      },
      
      getParaFromFragId: function (f) {
         return f.substr(f.indexOf('!')+1,f.indexOf('p')-1);
      },
      
      loadFromHash: function () {

         var cmd = window.location.href.substr(window.location.href.indexOf('#')+1);
         Debug.log('got command from URL fragment: '+cmd);
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

            
      loadNoteById: function (id) {
      
         ubr.postJumpNoteId = id;
         $.ajax({
               url:'/note/href',
               data: { id: id, book_id: ubr.bookId },
               complete: function (href,xhr) {
                  if(xhr.xhr.status==200) {
                     if(href) {
                        if(href.indexOf('#') > -1) {
                           if(href.indexOf('#!') > -1) {
                              var par = ubr.navCtl.getParaFromFragId(href.split('#')[1]);
                              ubr.postJumpSelectionId = parseInt(par,10);
                           } else {
                              ubr.postJumpSelectionId = -1;
                           }
                           ubr.note().setPostJumpNoteId(id);
                           ubr.navCtl.loadHref(href);
                        } else { // just a filename
                           //ubr.postJumpSelectionId = -1;
                           ubr.navCtl.loadHref(href);
                        }
                     } else {
                        alert("This note has been orphaned. Cannot display it.");
                        ubr.navCtl.loadHref(ubr.currentHref);
                     }
                     
                  } else if (xhr.xhr.status==401) {
                     alert('you are not authorized, bub!');
                     ubr.navCtl.loadHref(ubr.currentHref);
                  }
               }
               
         });
         
      },
      
      loadNotesByHref: function (href) {
      
          ubr.note().loadHref(href);       

      },
  
      
     
      getItem: function () {
         
        ubr.unloadPageView();
        var h = ubr.currentHref;
        ubr.currentFile = (h.indexOf('#')>-1) ? ubr.currentHref.split('#')[0] : ubr.currentHref;
        var valid = false;
        ubr.map(ubr.files, function (f) {
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
        if(arguments.length) { // overrides internal callback
            var cb = arguments[0];
        } else { // default internal callback
           var cb = ubr.pageCtl.getPages;
        }

        if(ubr.filePointer==undefined) { // can happen when a package is screwed up
           Debug.log('filePointer is undefined');
           return;
        }
        Debug.log('getting file at index '+ubr.filePointer);
        
        ubr.pageModel.initPageVars();
        
  		  if(!ubr.files[ubr.filePointer].itemString) {

             ubr.uiView.showLoadAnim();
             $.ajax({
                   url: ubr.restEndpoint.getItem.url,
                   data: {
                     book_id: ubr.bookId,
                     group_id: ubr.user.groupId,
                     html: ubr.currentFile,
                     forcesample: ubr.forcePreview
                   },
                   encoding: 'utf-8',
                   complete: function (data, xhr) {
                     var itemString = (data.responseText=='AUTH') ?
                       '<p>Sorry, but this is a personal library item, not viewable without owner permission.</p>': data.responseText;
                     ubr.pageModel.setItemString(itemString); // handles image caching
                     ubr.publish('ubr/events/sectionView', [
                        
                        ubr.tocView.getLabelForSection(ubr.currentHref),
                        ubr.currentHref
                  
                     ]);
                     
                     if(cb) {
                      
                        setTimeout(cb,1000);
                     
                     }
                   }
            }); 
  			} else {
            
  			   ubr.itemString = ubr.files[ubr.filePointer].itemString;
            var page;
            if(ubr.postJumpParaId) {
               if((page = ubr.pageModel.findPageForPara(ubr.postJumpParaId)) > -1) {
                  Debug.log('found postJumpParaId in cached item');
                  ubr.publish('ubr/events/postJumpParaLoaded', [page, ubr.postJumpParaId]);             
               }
            } else if(ubr.postJumpFragId) {
               if(page = ubr.pageModel.idToPageMap[ubr.postJumpFragId]) {
                  Debug.log('found postJumpFragId in cached item');
                  ubr.publish('ubr/events/postJumpFragLoaded', [page]);        
               }
            }
            ubr.postJumpParaId = null;
            ubr.postJumpFragId = null;
            ubr.publish('ubr/events/sectionView', [
               
               ubr.tocView.getLabelForSection(ubr.currentHref),
               ubr.currentHref
         
            ]);
            if(cb) {cb(); }
  			}
      },
      
      handlePagesDone: function () {
   
         Debug.log('navCtl.handlePagesDone');
         ubr.paginationPointer = 0;
         ubr.paragraphCount = 0;
         ubr.percentProgress = 100;
         ubr.setProgMeter(100);
         ubr.readyUI();
         Debug.log('UI Ready');
      },

      handleTocClick: function(e) {
         if(e.currentTarget.hash.match(/^#/)) {
            var frag = e.currentTarget.hash.substr(1);
         }
         ubr.navCtl.runCommand(frag);
         e.preventDefault();
         e.stopPropagation();
      },

      nextPage: function () {
         
            Debug.log('navCtl.nextPage');
            if(!ubr.pageNodes || !ubr.UIready) return;
			   if(ubr.isPaginating()) { // not while paginating!
				   return;
				   if(ubr.pagePointer >= ubr.paginationPointer) {
				     return;
				   }
			   }
               
            if (ubr.pagePointer == ubr.pageNodes.length - 1) {   // next section/file
               
               Debug.log('at last page already!');
               
               
               if(ubr.filePointer < ubr.files.length-1) {
               
                  ubr.lastSection = ubr.filePointer;
                  ubr.filePointer++;
                  ubr.currentFile = ubr.files[ubr.filePointer].href;
                  ubr.currentHref = ubr.currentFile;

                  ubr.suspendUI();
                  ubr.unloadPageView();
                  ubr.pageModel.initPageVars();
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
               var par = ubr.pageModel.firstUbrid();
               if(par > -1) {
                    ubr.currentHref = ubr.currentFile + '#!'+par+'p:0';                  
               } else {
                    ubr.currentHref = ubr.currentFile;              
               }
   				ubr.unloadPageView();
   				ubr.updatePageView();
   				ubr.progPageNumFlash(ubr.pagePointer, true, true);
   				ubr.updateProgMeter();

 

            }
      },  

       previousPage: function () {
         if(ubr.isPaginating() || !ubr.UIready) { // not while paginating!
				   return;
			   } else {
				   if (ubr.pagePointer == 0) {
					   if (ubr.filePointer > 0) { // go to previous section

						   ubr.toLastPage = true; // flag it to validate negative values
						   
      
                     ubr.lastSection = ubr.filePointer;
                     ubr.filePointer--;
                     ubr.currentFile = ubr.files[ubr.filePointer].href;
                     ubr.currentHref = ubr.currentFile;
                     ubr.suspendUI();
                     ubr.unloadPageView();
                     ubr.pageModel.initPageVars();
                     ubr.paragraphPointer = -1; //determine after file load
                     ubr.pagePointer = -1; // determine after pagination
                     ubr.uiView.showLoadAnim();
                     ubr.navCtl.loadHref(ubr.currentHref);

                  
                     
					   } else {
                  
                     Debug.log('at last page of last file');
                  }
                     
                     
				   } else if (ubr.pagePointer > 0) { // previous page
                  
					   ubr.pagePointer--;
         
                  var par = ubr.pageModel.firstUbrid();
                  if(par > -1) {
                    ubr.currentHref = ubr.currentFile + '#!'+par+'p:0';                  
                  } else {
                    ubr.currentHref = ubr.currentFile;              
                  }

					   ubr.unloadPageView();
					   ubr.updatePageView();
					   ubr.progPageNumFlash(ubr.pagePointer, true, true);
					   ubr.updateProgMeter();
    
  

				   }				
			   }
      },
       handleHrefClick: function (evt) {
         
          
        //for (prop in evt.currentTarget) {
          //alert(prop+' = '+evt.currentTarget[prop]);
        //}

        var url = evt.currentTarget.getAttribute('href');
        
        
        if(!url) return;
        
        if(!ubr.hasClass(evt.currentTarget, "ubrdirectlink")) { /* bypass */
        
          evt.preventDefault();
          evt.stopPropagation();
        
          if(url.match(/^http:\/\/(www\.)?feedbooks\.com\/book\/stanza\/\d+\/?/) ||
                 url.match(/^http:\/\/(www\.)?feedbooks\.com\/book\/\d+?\.epub$/i)) {
                 // feedbooks urls to epubs
                 if(confirm("This replaces your current read with a book from feedbooks.com and adds it to your reading history. Sounds like a good idea. Ready?")) {
                   var rdr = ubr.getSfUrl('book', 'importnew')+'?url='+ubr.toJson(url);
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
              Debug.log('trying to jump to '+stem+url);
              ubr.navCtl.loadHref(stem+url);
           }           
        } else {
        
        }
      },

      
      getCurrentFile: function() {
         return ubr.files[ubr.filePointer];         
      },
      
      
              
      getMark: function () {

        return ubr.setMark();
      },
      
      saveMark: function() {
        var mark = ubr.setMark();
        ubr.xhrPost({
                                       url: ubr.restEndpoint.close.url,
                                       encoding: 'utf-8',
                                       sync: true,
                                       content: ubr.getMark()
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
  
       Debug.log('pageView caught by navCtl');
       ubr.navCtl.setUriFrag();
       var msg = arguments[0];

       if(ubr.postJumpSelectionId != undefined) {
          $('p',STAGE.book).each(
             function(p) {
                if(p.getAttribute('ubrid')==ubr.postJumpSelectionId) {
                  ubr.selectionCtl.selectParaById(ubr.postJumpSelectionId);
                  ubr.postJumpSelectionId = undefined;
                }
             }
          );
       } else if (ubr.bookSelection != undefined) {
          ubr.selectParaById(ubr.selectedParagraph);
       }
     },
     
     handlePostJumpParaLoaded: function() {
         
        if(ubr.postJumpParaId) {
           
            Debug.log('caught postJumpParaLoaded');
            Debug.log(arguments);
            
            ubr.pagePointer = parseInt(arguments[0],10);            
            ubr.paragraphPointer = parseInt(arguments[1],10);
            //ubr.postJumpParaId = undefined;

            Debug.log('updating our page at '+ubr.pagePointer+' because our paragraph '+ubr.paragraphPointer+' is on it:');
            ubr.pageCtl.updatePageView();
            ubr.uiView.hideLoadAnim();
            ubr.postJumpParaId = null;
            ubr.postJumpFragId = null;
            
        }
         
         // uncomment the following to allow navigation during pagination
         //ubr.enablePageControls();
     },
     
     
     handlePostJumpFragLoaded: function () {
         
        if(ubr.postJumpFragId) {
           
            Debug.log('caught postJumpFragLoaded');
            Debug.log(arguments);
   
            ubr.pagePointer = arguments[0];
            ubr.updatePageView();
            ubr.progPageNumFlash(ubr.pagePointer, true, true);
            ubr.updateProgMeter();

        }

      /*

 

        From spec:
        
         All OPS Content Documents that are part of the publication (i.e. are listed in the manifest) which are potentially reachable by any reference mechanism allowed in this specification must be included in the spine. Such reference mechanisms include, as a partial list, hypertext links within OPS Content Documents, and references by the NCX, Tours and Guide.

Should a Reading System encounter, by such reference, an OPS Content Document not listed in spine as required in this specification, the Reading System should add it to spine (the placement at the discretion of the Reading System) and assign the value of the linear attribute to no (see next.) 

           var newfile = {
              id:'auto'+(new Date()).getTime(),
              fallback: '',
              href: ubr.currentFile,
              itemString: undefined,
              linear: 'no',
              'media-type': 'application/xhtml+xml',
              pageNodes: undefined
           }
           ubr.files.splice(cfp+1,0,newfile);
           //console.log('added this file to list at current postition. new list:');
           //console.log(ubr.files);
           ubr.filePointer = cfp+1;
           
           console.log(ubr.currentFile+' should be at index '+ubr.filePointer);
           



*/
     }
     


}



ubr.pageCtl = {



     getPages: function ()
     {
        
       ubr.getPagesCalledAt = (new Date()).getTime();
   
       ubr.publish('ubr/events/paginationStarted', [{time:ubr.getPagesCalledAt}]);
       
       if(ubr.files[ubr.filePointer].pageNodes != undefined) { // already paginated??
            //Debug.log('we already have pages');
            ubr.pageNodes = ubr.files[ubr.filePointer].pageNodes;
            ubr.handlePagesDone();
        } else {
            //Debug.log('suspending UI and loading a layout with our item string');
            ubr.suspendUI();
            ubr.itemString = ubr.pageModel.getItemString(); // easy way to pull cached
            if(ubr.itemString) {
               //Debug.log('pulled an itemString of '+ubr.itemString.length+' bytes');
            } else {
               //Debug.log('no itemString defined');
            }
            ubr.setProgMeter(0);
   

            if(ubr.itemString) {
               try {
                     var pid = PubSubP8n.loadRefs(ubr.itemString, STAGE.layout[0],  ubr.coords(STAGE.layout).h);
                     var topic = 'p8n/'+pid+'/pagedata';
                     ubr.subscribe(topic, ubr, ubr.pageModel.handlePage);
                     ubr.subscribe('p8n/'+pid+'/complete', ubr, ubr.pageModel.handlePagesDone);
               } catch(e) {
                  Debug.log(e);
                     ubr.itemString = '';
                     ubr.readyUI();
               }
            } else { // an error occurred
                     Debug.log('no item string! halting...');
                     ubr.itemString = '';
                     ubr.readyUI();
            }
       }
     },

      unloadPageView: function () {

			ubr.pageRendered = false;
			ubr.paragraphPointer = undefined;
         ubr.pageView.hideOverflow();
			ubr.publish('ubr/events/pageUnload', [{time:(new Date()).getTime()}]);
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
         var pas = $('p', STAGE.book);
				 pas.click(ubr.selectPara);
         pas.mouseup(function(e) {
               e.preventDefault();
               e.stopPropagation();
         });
				 pas.mousedown(function(e) {
               e.preventDefault();
               e.stopPropagation();                  
         });
         pas.mouseover(ubr.showParaNumbering);
         pas.mouseout(ubr.hideParaNumbering);
				 pas.each(function (i,pnode) {
							var ubrid = pnode.getAttribute('ubrid');
	            pnids.push(parseInt(ubrid));
	            pns.push(pnode);
				 });

         if(!(ubr.paragraphPointer>=0)) { // set paragraph pointer
           Debug.log('null ass pp, going to set from first in list');
           var first = pnids[0];
           if(pns.length > 1) {
              if($(pns[0]).hasClass('fragment')) {
                 var first = pnids[1];
              }
           }
           ubr.paragraphPointer = (first) ? first : 0;
         }
  
         ubr.pageRendered = true;

         var pl = $('input[id="ubrPurchaseLink"]',STAGE.book);
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
         $('a', STAGE.book).click(ubr.handleHrefClick);
       
      

         ubr.publish('ubr/events/pageView', [  msg ]);
         Debug.log('done rendering');
      },
      updatePageView: function ()
		{
         Debug.log('pageCtl.updatePageView');
         if(!ubr.pageNodes.length || !(ubr.sections.length>0)) return;

         var d = new Date();
			ubr.lastPageUpdate = d.getTime();
         var lastindex = ubr.pageNodes.length-1;
			if(ubr.pageRendered==false) {
            Debug.log('page has not been rendered yet');
            if (ubr.toLastPage==true) { // set page to end of section if flagged for it
               //Debug.log('need to jump to last page and now resetting that flag');
               ubr.toLastPage = false;
               ubr.pagePointer = lastindex;
            }
            // bounds checking
            if(ubr.pagePointer < 0 || (ubr.pagePointer > (lastindex))) {
                //Debug.log('pp out of bounds, correcting');
                ubr.pagePointer = (ubr.pagePointer < 0) ? 0 : lastindex;
                //Debug.log('pp is now '+ubr.pagePointer);
            }
            ubr.pageCtl.renderPage();
			} else {
			  Debug.log('page is already rendered:'+ubr.pageRendered);
			}
			ubr.style(STAGE.book, 'visibility', 'visible');
		},
      toggleFontSize: function () {
         if(ubr.pageControlsEnabled && !ubr.isPaginating()) {
           ubr.fontScaled++;
            //Debug.log('temp inc to font scale '+ubr.fontScaled);
            ubr.fontScaled = (ubr.fontScaled > 2) ? 0: ubr.fontScaled ;
            //Debug.log('now font scaling is '+ubr.fontScaled);
            ubr.setFontSize();
            ubr.pageView.resetPageView(true);
         }
      },
      setFontSize: function () {

				 var sz = (ubr.fontScaled == 0) ? '':
											(ubr.fontScaled == 1) ? 'larger' : 'largest';
				 Debug.log(sz);
       	 $(STAGE.book).attr('class', sz);
			   $(STAGE.layout).attr('class', sz);
				 Debug.log('class set');			
   			 Debug.log('done with that');
      }
}

ubr.selectionCtl = {


    getSelectedHref: function ()
    {
      
      
    },
    getSelectionTransport: function (node)
    {
      return {
		     user: ubr.user,
			  mark: ubr.getMark(),
			  data: {
			     text:node.textContent,
			     html:node.innerHTML,
              bookSelection:ubr.bookSelection
			    }
		  };
    },

		selectAsNode: function (node)
		{
         // pass null as node to clear all selection
         // default will clear and select new node
         ubr.postJumpSelectionId = null;
         if(ubr.selectedNode == node) {
            return false;
         }
         var clearedOne = false;
         var selectedOne = false;
         
			//window.getSelection().selectAllChildren(event.target);
         if (ubr.bookSelection != undefined) { // something is selected already
            clearedOne = true;
            if(ubr.bookSelection) {
               Debug.log(ubr.bookSelection);
            }
            ubr.removeClass(ubr.bookSelection, 'bookSelection');
            //ubr.dom.removeNode($('selectionControlsClone'));
            ubr.bookSelection = undefined;
            ubr.selectedNode = undefined;
            ubr.selectedParagraph = undefined;
         }
         if(clearedOne && !node) {         
            ubr.publish('ubr/events/paragraphDeSelect', []);
            return;
         }
         if(!node) return;
         if(node.nodeType) { // something new should be selected
            
            if(node.getAttribute('ubrid')) {

               var selectedOne = true;
               ubr.bookSelection = node;
               
               ubr.selectedParagraph = parseInt(node.getAttribute('ubrid'),10);               

               ubr.addClass(node, 'bookSelection');

               ubr.selectedNode = node;
               
               

               
               if (clearedOne) {
                  ubr.publish('ubr/events/paragraphSwitchSelect', [
                     ubr.getSelectionTransport(node), node
                  ]);
               } else {
                    ubr.publish('ubr/events/paragraphSelect', [
                     ubr.getSelectionTransport(node), node
                  ]);
               }
             }
         }

         
			
		},

		selectPara: function (event)
		{


         if(event.target.nodeName.toLowerCase()!='p') { // if not a p el, step up until we find one
       
              var node = event.target.parentNode;
              var safety = 0;
              while(node.nodeType!=1) {
                safety++;
                if(safety>10) break;
                node = node.parentNode;
              }
              if(node.nodeType==1) {
                var selection = node;
              }
           } else {
             var selection = event.target;
         }
		   if(!selection) return;

			if(selection == ubr.selectedNode) { // clicking on same node will clear
				ubr.selectAsNode(null);
			} else { // clicking on different node will clear and select
				ubr.selectAsNode(selection);
			}
		},

		selectParaById: function (id)
		{
			var nodes = STAGE.book.getElementsByTagName('p');
			for (var i = 0; i < nodes.length; i++ ) {
				if ( nodes[i].getAttribute('ubrid') == ( "" + id) ) {
               ubr.selectAsNode(nodes[i]);
					break;
				}
			}
		}



}


ubr.feedCtl = {
 

  loadEpub: function (url)
  {
    //Debug.log(url);
    var matches = url.match(/(\d+?)\.epub$/i);
    var bookid = 0;
    if(matches) {
      bookid = matches[1];
    }
    var view = (ubr.isXD) ? 'ubxd' : 'ub';
    var rdr = ubr.getSfUrl('reader', 'unbound2')+'?id='+bookid+'&group_id=0&view='+view;
    //var rdr = ubr.getSfUrl('book', 'importnew')+'?url='+ubr.toJson(url);
    if(confirm("You are about to leave this book and open another one. You Sure?")) {
      ubr.close(rdr);
    }
  },
  
  fetchAtom: function (url)
  {
    // only called from a feed link, so store in history
    ubr.atomHistory.push(ubr.currentUrl);
    ubr.nextFeed(url);
  },
  
  backAtom: function ()
  {
    if(ubr.atomHistory.length==0) {
      return;
    }
    var url = ubr.atomHistory.pop();
    ubr.nextFeed(url);
  },
  
  nextFeed: function (url)
  {
    
    var proxy = ubr.feedCtl.getProxyUrl(url);

    ubr.currentUrl = url;
    
    ubr.uiView.showLoadAnim();
    

    $.ajax({
      url:proxy,
      complete: function (data, xobj) {
        // auto-detect
        ubr.uiView.hideLoadAnim();
        
        var obj = ubr.fromJson(data.responseText);

        //console.log(obj);        
        ubr.feedView.makeFeednav(obj);

      }
    });
  },
  
  getProxyUrl: function (url)
  {
     return ubr.feedProxyURI+'?feed='+url;
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
      $('itemCache').innerHTML =
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
      
      //return $('itemCache').innerHTML;
      
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
      str = str.replace(/<p([^>]*?)>/gm, function (match, par) {
            if(match=='<p>'||match.match(/^<p\s/)) {
               var html = '<p' + par + ' ubrid="'+ubr.paragraphCount + '">';
               ubr.paragraphCount++;
               return html;
            } else {
               return match;
            }
      });

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
  handlePage: function (e, pagetext, count)
  {
			Debug.log('handlePage');
      if(typeof ubr.paginationPointer!='number') throw ("The pagination pointer must be a valid number");
      if(ubr.paginationPointer > ubr.paginationMaxLimit) { // runaway pagination?
         ubr.publish('ubr/events/paginationDone', [{time:(new Date()).getTime()}]);
         throw ("Hit maximum number of pages we can handle for a given file");
      }

      // match all paragraph elements on this chunk and number them
      // if marked as fragments, don't increment number
      // if count reaches paragraph pointer value, show the page
      //var paragraphFound = false;
      //Debug.log('tagging paragraphs with internal ids...');
      /*
      if(pagetext.match(/(<p[^>]*?)>/gm)) { // found a paragraph
        // Debug.log('found a paragraph');
         pagetext = pagetext.replace(/(<p[^>]*?)>/gm, ubr.hitch(ubr, function (match, par) {
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
            ubr.publish('ubr/events/postJumpFragLoaded', [ubr.paginationPointer]);
            }
         }
         return match;
      });
      
      ubr.pageModel.storePage(pagetext);
      
      
      /*
      var re = new RegExp('id="'+ubr.postJumpFragId+'"');
      if(pagetext.match(re)) {
         Debug.log('MATCHED OUR POST JUMP FRAG ID ON THIS PAGE');
         ubr.publish('ubr/events/postJumpFragLoaded', []);
      }
      */
      if(ubr.postJumpParaId) {
         var re = new RegExp('ubrid="'+ubr.postJumpParaId+'"');
         if(pagetext.match(re)) {
            Debug.log('MATCHED OUR POST JUMP ID ON THIS PAGE');
            ubr.publish('ubr/events/postJumpParaLoaded', [ubr.paginationPointer,ubr.postJumpParaId]);
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
  handlePagesDone: function (o, time, err)
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
      ubr.publish('ubr/events/paginationDone', [{time:0}]);
      Debug.log('handlePagesDone exited with errors');
      
    } else {

      Debug.log('caching all pages');
      ubr.pageModel.cacheAllPages();


      //TODO: ideally this should be a plugins message allowing plugin initialization
      // so that plugin code doesnt interfere with pagination
      var tm = (new Date()).getTime();
      //Debug.log((tm-ubr.getPagesCalledAt)+' pagination time');

      ubr.publish('ubr/events/paginationDone', [{time:0}]);
      
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
    /*
    ubr.isLogged = false;
    ubr.profileId = undefined;
    ubr.profileImg = undefined;
    ubr.username = undefined;
    ubr.profileNick = undefined;
    ubr.user = undefined;
    ubr.withGroup = undefined;
    ubr.bookGroup = undefined;
    */
    // dont clear chatParams (for now)
    //ubr.chatParams = undefined;
  }

}


ubr.feedModel = {


  atomxml2obj: function (xml)
  {
     
    /* requires dojox.xml.parser */
    
    var af = {};
    try {   
      var dom =dojox.xml.parser.parse(xml);

      af.title = dojox.xml.parser.textContent(dom.getElementsByTagName('title')[0]);
      af.subtitle = dojox.xml.parser.textContent(dom.getElementsByTagName('subtitle')[0]);
 
      af.logo = dojox.xml.parser.textContent(dom.getElementsByTagName('logo')[0]);  

      af.id = dom.getElementsByTagName('id')[0].nodeValue;
    
      af.links = [];
      var linkrels = dom.getElementsByTagName('link');
      for(var i = 0; i < linkrels.length; i++) {
        var link = linkrels[i];
        // IE 7 is a real asshole here, and throws an exception
        // for some goddamn reason, so catch it and shove it up
        // the ass of Microsoft when we do
        try {
          link.rel = link.getAttribute('rel');    
          link.type = link.getAttribute('type');
          link.href = link.getAttribute('href');          
        } catch(e) {
          ;       
        }
        af.links.push(link);
      }
      af.entries = [];
      var entries = dom.getElementsByTagName('entry');
      for(var i = 0; i < entries.length; i++) {
        var e = entries[i];
        var eo = {};
        eo.links = [];
        eo.title = dojox.xml.parser.textContent(e.getElementsByTagName('title').item(0));
        eo.content = { value: ""};
        eo.summary = { value: ""};
        try {
          eo.content.value = dojox.xml.parser.innerXML(e.getElementsByTagName('content')[0]);
        } catch (ex) {
          eo.summary.value = dojox.xml.parser.innerXML(e.getElementsByTagName('summary')[0]);
        }
        var links = e.getElementsByTagName('link');
        for(var ii =0; ii < links.length; ii++) {
          var lo = {};
          var link = links[ii];
          lo.rel = link.getAttribute('rel');
          lo.type = link.getAttribute('type');
          lo.href = link.getAttribute('href');
          eo.links.push(lo);
        }
        af.entries.push(eo);
      }
    } catch (e) {
        Debug.log('Exception caught');
       //Debug.log(af);
      Debug.log(e.message);
    }
    return af;
  }


}
ubr.uiView = {


  makeItFit: function () {
    if(ubr.resizePending==true) {

    }
    ubr.suspendUI();
    ubr.autoScale();
 	  ubr.pageView.resetPageView(true);
    ubr.resizePending = false;
  },
  
   buildUserChrome: function ()
   { 
     if(ubr.isLogged) {
      STAGE.loginButton.addClass('logout');
      STAGE.loginButton.click(ubr.logout);
			$('#loginPic').append('<a id="profileBoxLink" href="+'+ubr.profileLink+' target="_new" title="Your profile details page (will open a new window)">');
			$('#profileBoxLink').append('<img src="'+ubr.profileImg+'" alt="'+ubr.profileNick+'" height="18" width="18" title="Logged in as '+ubr.profileNick+'" style="height:18px;width:18px;border:1px solid #333;padding:1px !important;margin-right:2px !important"/>');
			}
   },
   showPurchasePrompt: function ()
   {
      $('#bookPurchasePromptMsg').html('You can purchase this for '+ubr.bookPrice);
      $('#purchaseThisBook').css('display','block');
   },
   
   hidePurchasePrompt: function ()
   {
      $('#purchaseThisBook').css('display','none');
   },   
   
	initUI: function (cb) {
		
			var globalKeyHandler = function (e)
			{
				var k = e.charCode;
				if (k==32)  ubr.nextPressed();
				var k = e.keyCode;
				if( k==e.KEY_RIGHT_ARROW || k==e.KEY_PAGE_DOWN ) {
				 ubr.nextPressed();
				} else if (k==e.KEY_LEFT_ARROW || k==e.KEY_PAGE_UP ){
				 ubr.prevPressed();
				}
			};
			var disableKeynav = function () { ubr.allowKeynav = false; }
			var enableKeynav = function () { ubr.allowKeynav = true; }
			var getSelText = function(e)
			{
		     if(ubr.selectedParagraph) return;
		     var txt = '';
		     if (window.getSelection) {
		         txt = window.getSelection();
		     } else if (document.getSelection) {
		         txt = document.getSelection();
		     } else if (document.selection) {
		         txt = document.selection.createRange().text;
		     } else return;
		     ubr.lastSelectedText = txt;
		     ubr.publish('ubr/events/rangeSelect', [{ user:ubr.getUser(), selection:txt }]);
		  }
			var onMouseIdle = function () {
			    ubr.hideControls();
			};
			var onResizeWindow = function() {
		       STAGE.lastBookCoords = ubr.coords(STAGE.book);
		       STAGE.lastViewport = ubr.getViewport();
		       if(!ubr.iphonemode && !ubr.killIEResizeEvent) {
		          ubr.pageView.hideOverflow();
		          ubr.resizePending = setTimeout('ubr.makeItFit()',500);
		       }
		  };
		  var onViewClick = function (e) {
		       ubr.uiView.startMouseIdleTimeout();
		       ubr.showControls();
		  };
			var onLogoClick = function (e) {
		    if(ubr.isXD) {
		      e.preventDefault();
		      e.stopPropagation();
		      window.open('http://'+window.location.host);
		    } else {
		      window.location.href = 'http://'+window.location.host;
		    }
		  };
			var onSaveClick = function (evt) {
		     if(ubr.isXD) {  
		       evt.stopPropagation();
		       evt.preventDefault();
		       return false;
		     } else {
		         if(ubr.bookId==0) {
		             window.history.back();
		         } else {
					 if(ubr.bookGroup>0) {
					   window.location.href = 'http://www.bookglutton.com/bookgroup/show?id='+ubr.bookGroup;
					 } else {
		            	 window.location.href = ubr.bookDetailLink;
		            	 return true;
					 }
		         }
		     }
		 };
		 var onSectionTabClick = 	function() {
		   if(!ubr.isPaginating() && ubr.UIready) { 
		      if(ubr.catalogShowing) {
		         ubr.uiView.toggleCat();
		      }
		      ubr.panelSlide('B');
		      ubr.sectionOpened = !ubr.sectionOpened;
		   } else {
		 			Debug.log('we are paginating');
			 }
		 };
		 var onNavPrevMouseover = function() {
		    if(!ubr.isPaginating()) {ubr.addClass(STAGE.navigatePrev, 'ro');}
		  }
			var onNavPrevMouseout = function() {
			   if(!ubr.isPaginating()) {ubr.removeClass(STAGE.navigatePrev, 'ro');}
			};
			var onNavNextMouseover = function() {
			   if(!ubr.isPaginating()) {ubr.addClass(STAGE.navigateNext, 'ro');}
			};
			var onNavNextMouseout = function() {
			   if(!ubr.isPaginating()) {ubr.removeClass(STAGE.navigateNext, 'ro');}
			 }
			var onHelpClick = function () {
			  //ubr.getPluginByName('help').activateView();
			  var helpwin = window.open(ubr.getSfUrl('portal','help'), 'readerHelp');
			  helpwin.focus();
			};
			var onWidgetCancel = function () {
			  ubr.style("#codeForThisBook", "display", "none");
			  //ubr.style("bookgluttonCodeMask", "display", "none");
			};
			var onPurchaseCancel = function () {
			  ubr.style("#purchaseThisBook", "display", "none");
			  //ubr.style("bookgluttonCodeMask", "display", "none");
			};
			var onWidgetChoosewide = function () {
			  ubr.loadWidgetCode('wide');
			};
			var onWidgetChoosenarrow = function () {
			  ubr.loadWidgetCode('narrow');
			};
			var navwrapMouseover = function () {
			       ubr.usingNav = true;
			 };
			var navwrapMouseout = function () {
			       ubr.usingNav = false;
			 };
			var optionMouseover = function () {
			       ubr.usingNav = true;
			 };
			var optionMouseout = function () {
			       ubr.usingNav = false;
			 };
			var onAuthKeypress =  function (e) {
				e.stopPropagation();
			};
			var Stage = function ()
			{
				
				this.doc						= $(document);
				this.body						= $('body');
		    this.userMsgs       = new Array();
		    this.loadanim       = $("#loadprogress");
		    this.dims           = ubr.coords($('#ubReader'));
		    this.view           = $('#pageView');
		    this.book           = undefined; //initialized later, in initUI
		    this.layout         = undefined; //ditto 
		    this.chat           = $('#leftPanel');
		    this.note           = $('#rightPanel');

		    this.chatPaneButton = $('#chatPaneButton');
		    this.notePaneButton = $('#notePaneButton');        
		    this.rangeSelect    = $('#rangeSelect');
		    this.profileImg     = $('#profileImg');

		    this.chatLog        = $('#chatLog');
		    this.chatSubmit     = $('#chatSubmit');
		    this.chatInput      = $('#chatInput');
		    this.chatForm       = $('#chatForm');
		    this.talktics       = $('#talktics');
		    this.talkflourish   = $('#talkflourish');

				this.chatPaneChildren = [this.profileImg,
		                                    this.rangeSelect,
		                                    this.chatLog,
		                                    this.chatInput,
		                                    this.chatForm,
		                                    this.chatSubmit,
		                                    this.talktics,
		                                    this.talkflourish
																];
				this.pageTop			= $('#pageTop');
				this.pageBottom		= $('#pageBottom');
				this.rightStrip		= $('#rightStrip');
				this.leftStrip		= $('#leftStrip');

				this.navigateNext 	= $('#navigateNext');
				this.navigatePrev	= $('#navigatePrevious');

				this.sectionMenu		= $('#sectionMenu'); // holds tab stacked on menuBG
				this.sectionTab		= $('#sectionTab');
				this.sectionMenuBG	= $('#sectionMenuBG'); // holds item list
				this.tocitems		= $('#tocitems'); // holds items

				this.progMeter		= $('#progressMeter');
				this.progFill		= $('#progressFill');
				this.progLeft		= $('#progressLeft');
				this.progRight		= $('#progressRight');
				this.progRightFull	= $('#progressRightFull');

		    this.catButton       = $('#navigateCatalog');
		    this.saveButton      = $('#saveButton');
		    this.loginButton     = $('#loginButton');
				this.fontButton		= $('#fontButton');
				this.helpButton		= $('#helpButton');
				this.pageProg		= $('#pageProg');

				this.showCodeButton  = $('#showCodeButton');

				this.titleBar 		= $('#titleBar');
				this.authorBar 		= $('#authorBar');
				this.noteContent		= $('#noteContent'); 
				this.pNotice 		= $('#pleaseWait');
				this.helpBox			= $('#helpBox');
				this.stats			= $('#statDisplay');
				
				this.authProfile = $('#bookgluttonAuth .bgprofile');
				this.bgUserBox = $("#bookgluttonUserbox");
				this.showCode = $("#showCodeButton");
				this.cancelWidget = $("#codeForThisBook a.cancelwidget");
				this.chooseWide=$("#codeForThisBook a.choosewide");
				this.cancelPurchase = $("#purchaseThisBook a.cancelwidget");
				this.cancelAuth = $("#bookgluttonAuth a.cancelauth");
				this.toggleSignup = $("#bookgluttonAuth a.togglesignup");
				this.signupSubmit = $("#signupsubmit");
				this.logoutSubmit = $("#logoutsubmit");
				this.loginSubmit = $("#loginsubmit");
				this.chooseWide = $("#codeForThisBook a.choosenarrow");		
				this.navWrap = $("#navWrap");
				this.optionBar = $("#optionBar");
				
				this.pageNumFlashOffset = 0;
			}
		
    	window.STAGE = new Stage();

      ubr.panelStates = { T:1, R:1, B:1, L:1 }; // 1,2 or 4 (hidden, poised or extended)
      ubr.panelLimits = { T:80, R:100, B:80, L:100 }; // percentages to determine bounds of motion
   		ubr.panelNodes = { T:undefined, R:STAGE.note, B:STAGE.sectionMenu, L:STAGE.chat };
      ubr.socketNodes = { T:undefined, R:$('rightSocket'), B:STAGE.sectionMenu, L:$('leftSocket') };
      ubr.panelProps = { T:'top', R:'right', B:'height', L:'left'};
			ubr.uiView.buildUI();
			STAGE.lastBookCoords = ubr.coords(STAGE.book);
			STAGE.lastViewport = ubr.getViewport();
			ubr.suspendUI();
			ubr.autoScale();
			ubr.uiView.startMouseIdleTimeout();

			$.bind('unload',ubr.close);
			ubr.subscribe('ubr/events/pageView', ubr, ubr.navCtl.handlePageView);
			ubr.subscribe('ubr/events/paginationDone', ubr, ubr.navCtl.handlePagesDone);
			ubr.subscribe('ubr/events/paragraphSelect', ubr, ubr.navCtl.handleParagraphSelect);
			ubr.subscribe('ubr/events/paragraphSwitchSelect', ubr, ubr.navCtl.handleParagraphSelect);
			ubr.subscribe('ubr/events/paragraphDeSelect', ubr, ubr.navCtl.handleParagraphDeSelect);
			ubr.subscribe('ubr/events/postJumpParaLoaded', ubr, ubr.navCtl.handlePostJumpParaLoaded);
			ubr.subscribe('ubr/events/postJumpFragLoaded', ubr, ubr.navCtl.handlePostJumpFragLoaded);
			ubr.subscribe('ubr/events/mouseidle', ubr, onMouseIdle);
		  $(window).resize(onResizeWindow);
		  // mouse handlers
			STAGE.view.click(onViewClick);
			$("#logo").click(onLogoClick);
			STAGE.loginButton.click(ubr.authUser);
			STAGE.saveButton.click(onSaveClick);
			$(STAGE.book).mouseup(getSelText);
			STAGE.sectionTab.click(onSectionTabClick);
			
			STAGE.progMeter.mousedown(ubr.progFollow);
			STAGE.progMeter.mouseup(ubr.progStop);
			STAGE.progMeter.mousemove(ubr.progUpdateFromMouse);
			
			STAGE.navigatePrev.click(ubr.prevPressed);
			STAGE.navigateNext.click(ubr.nextPressed);
			STAGE.navigatePrev.mouseover(onNavPrevMouseover);
			STAGE.navigatePrev.mouseout(onNavPrevMouseout);
			STAGE.navigateNext.mouseover(onNavNextMouseover);
			STAGE.navigateNext.mouseout(onNavNextMouseout);
			STAGE.fontButton.click(ubr.toggleFontSize);
			STAGE.helpButton.click(onHelpClick);
			STAGE.catButton.click(ubr.toggleCat);
			STAGE.bgUserBox.click(ubr.authUser);
			STAGE.showCode.click(ubr.getWidget);
			STAGE.cancelWidget.click(onWidgetCancel);
			STAGE.cancelPurchase.click(onPurchaseCancel);
			STAGE.chooseWide.click(onWidgetChoosewide);
			STAGE.chooseWide.click(onWidgetChoosenarrow);
			STAGE.loginSubmit.click(ubr.authCtl.loginResponder);
			STAGE.logoutSubmit.click(ubr.authCtl.logoutResponder);
			STAGE.signupSubmit.click(ubr.authCtl.signupResponder);
			STAGE.toggleSignup.click(ubr.authCtl.toggleSignup);
			STAGE.cancelAuth.click(ubr.authCtl.cancelAuth);
			STAGE.navWrap.mouseover(navwrapMouseover);
			STAGE.navWrap.mouseout(navwrapMouseout);
			STAGE.optionBar.mouseover(optionMouseover);
			STAGE.optionBar.mouseout(optionMouseout);
			// key handlers
			$(document).bind('keypress', globalKeyHandler);
			$('#bookgluttonAuth input').keypress(onAuthKeypress);

			// optional callback
			if(cb) cb();    
			Debug.log('done with initUI');
			
	},

	
	buildUI: function () {

			STAGE.loadanim.css({
				position:'fixed', top:'40%',left:'0',height:'18px',width:'100%',zIndex:'100001',display:'none'
			});
			STAGE.loadanim.append('<img src="'+ubr.loaderImage+'" alt="Loading" />');
			STAGE.loginButton.css('display', 'block');
			STAGE.saveButton.css('display', 'block');
			STAGE.showCodeButton.css('display', 'block');
			if(ubr.isLogged) {
		    ubr.setUserBoxHTML();
		    ubr.publish('ubr/events/userLoggedIn', [{time:(new Date()).getTime(), user:ubr.getUser()}]);
		  }
			ubr.uiView.buildUserChrome();
			ubr.uiView.buildGroupSelect();
			ubr.initPageSpace();
			ubr.setFontSize();
			ubr.buildToc();
	},
   
   startMouseIdleTimeout: function ()
   {
      if(ubr.mouseIdleTimeout) {
         ubr.uiView.clearMouseIdleTimeout();
      }
      ubr.mouseIdleTimeout = setTimeout(ubr.uiView.fireMouseIdle, ubr.mouseIdleInterval);
   },
   
   fireMouseIdle: function ()
   {
      //Debug.log('mouse has been idle for limit of '+ubr.mouseIdleInterval);
      ubr.publish('ubr/events/mouseidle', [{limitReached:ubr.mouseIdleInterval}]);
   },
   
   clearMouseIdleTimeout: function ()
   {
      clearTimeout(ubr.mouseIdleTimeout);
   },
   
   msgNotAuthed: function ()
   {
      
        alert("Looks like this is someone else's book. Try logging in first, if they've shared it with you. If that doesn't work, you can request access from the book detail page");
        //ubr.style($("loadprogress"), 'display', 'none');
      ubr.uiView.hideLoadAnim();
		  ubr.enablePageControls();
		  ubr.UIready = true;
      
   },
   msgNoAccess: function ()
   {
               alert("Looks like you're logged in but can't see this book because the owner hasn't shared it with you yet. Save and exit the reader and request a share.");
   },
   setUserBoxHTML: function ()
	{
	  var html = '';
	  var profhtml = '';
	  if(arguments.length>0) {
	    html = arguments[0];
	  } else {
	    if(ubr.isLogged) {
	      profhtml += '<img src="'+ubr.profileImg+'" alt="'+ubr.profileNick+'"/>'+ubr.profileNick;
	      html += 'Logged in as '+ubr.profileNick;
      } else {
        html = 'Log In';
      }
	  }
	  STAGE.authProfile.html(profhtml);
	  STAGE.bgUserBox.html(html);
	},
	
  toggleCat: function ()
  { // uses nonlinear mode to display atom catalog
    //ubr.toggleLinearMode();
    if(!ubr.UIready) return;
    if(ubr.catalogShowing) { // toggled it off
      //Debug.log('catalog mode is off now');
      ubr.catalogShowing = false;
      ubr.removeClass(STAGE.catButton, 'selected');
      ubr.retractFeednav();
      //ubr.unloadAndGet();
    } else {
      if(!ubr.globalCatalogURI) return;
      ubr.catalogShowing = true;
       // toggled it off
      //Debug.log('catalog mode on');
      var url = ubr.globalCatalogURI;
      ubr.addClass(STAGE.catButton, 'selected');
      ubr.createFeedNav();
      ubr.extendFeednav();
      ubr.nextFeed(url);
    }
  },
   
  buildGroupSelect: function ()
	{
    //console.log('here');
    var selected = 0;

    if(ubr.withGroup) {
      selected = ubr.bookGroup;
    }
    var groups = ubr.user.groupListForBook;
    var ops = [
      {value:0, label:'Public'}
    ];
    $.each(groups, function (i, group) {
      var newop = {value:group.id, label:group.label};
      ops.push(newop);
    });
    $('#groupNav').append('<select id="group_id" name="group_id"></select>');
		var inp = $('#group_id');
    $.each(ops, function(i,op) {
      inp.append('<option value="'+op.value+'"'+((parseInt(op.value)==parseInt(selected))? ' selected ' : '') +'>'+op.label+'</option>');
    });
    inp.change(function (evt) {
      ubr.changeGroupContext(evt.target.value);
      return false;
    });
	},
   setBookMetaHTML: function ()
	{
	  var fleft = '<img src="/ubrx/unbound/images/reader-title-flourish-left.gif" />&nbsp;';
	  var fright = '&nbsp;<img src="/ubrx/unbound/images/reader-title-flourish-right.gif" />';
    $('titleText').innerHTML = fleft+ubr.bookTitle;
    $('authorText').innerHTML = ubr.bookAuthor+fright;
	},
   
  extendFeednav: function()
  {
    ubr.style(STAGE.feednav, 'visibility', 'visible');
    STAGE.feednav.animate({ height:'90%' },{ duration:200 });
  },
  
  retractFeednav: function()
  {
    STAGE.feednav.animate({ height: 0 }, { duration:200, complete: function() {
       ubr.style(STAGE.feednav, 'visibility', 'hidden');
		}});
	},

  
  createFeedNav: function()
  {
    if(STAGE.feednav) return;
    var stobj = {
     position: 'absolute',
     overflow: 'hidden',
     height: '0',
     width:'46%',
     left:'27%',
     top:'0'
    }

		$('body').append('<div id="feednav"><div class="atomfeedlist"></div></div>');
		$('#feednav').css(stobj);
    STAGE.feednav = $('#feednav');
  },
   
  hideLoadAnim: function ()
  {
     STAGE.loadanim.css("display", "none");
  },
  
  showLoadAnim: function ()
  {
     STAGE.loadanim.css("display", "block");  
  },
  
  suspendUI: function ()
	{
	  ubr.UIready = false;
	  ubr.showPageControlsDisabled();
	  ubr.showProgMeterDisabled();
	},
  readyUI: function ()
	{
	  ubr.UIready = false; // make sure
	  ubr.updatePageView();
	  ubr.enablePageControls();
	  ubr.updateProgMeter();
    ubr.uiView.hideLoadAnim();
	  STAGE.pageProg.css('opacity',0);
     //ubr.tocView.markTocSelection();
	  ubr.UIready = true;
	},
   
  autoScale: function() {
	
    if(ubr.isPaginating()) return false;

    var rdr = $('#ubReader');
    rdr.attr('style', '');
    var c = ubr.coords(rdr);
    var stobj = {
      height: c.h,
      width: c.w,
      left:  -1*(c.w/2),
      marginLeft: '50%'
    };
    var st = ['height:' , c.h, 'px;width:', c.w , 'px;left:', -1*(c.w/2), 'px; margin-left:','50%'];
    rdr.attr('style', st.join(''));
    //ubr.style(rdr, stobj);
    
  },


  enablePageControls: function()
	{

			//Debug.log('enabling page controls');
			var oldfadelevel = ubr.pageControlsFadeLevel;
			ubr.pageControlsShowing = true;
			ubr.pageControlsEnabled = true;
			ubr.pageControlsFadeLevel = 1.0;
			ubr.fadePageControls(oldfadelevel, ubr.pageControlsFadeLevel);
			//Debug.log('page controls enabled');

	},
	
	hidePageControls: function (cb, cbargs)
	{
         if(!cbargs) {var cbargs = []};
         var oldfadelevel = ubr.pageControlsFadeLevel;
			ubr.pageControlsShowing = false;
			ubr.pageControlsFadeLevel = 0.0;
			ubr.pageControlsEnabled = false;
			ubr.fadePageControls(oldfadelevel, ubr.pageControlsFadeLevel);
         

         if(cb) cb(cbargs);
	},
	
	showPageControlsDisabled: function ()
	{
			var oldfadelevel = ubr.pageControlsFadeLevel;
			ubr.pageControlsShowing = true;
			ubr.pageControlsFadeLevel = 0.5;
			ubr.pageControlsEnabled = false;
			ubr.removeClass(STAGE.navigatePrev, 'ro');
			ubr.removeClass(STAGE.navigateNext, 'ro');
			ubr.fadePageControls(oldfadelevel, ubr.pageControlsFadeLevel);
	},
	
   showSectionControlsDisabled: function ()
	{
		ubr.fadeSectionControls(ubr.sectionControlsFadeLevel, 1.0);	  
	},
   updateSectionStat: function ()
   {
     if(!ubr.sectionPointer) {
       $('#reader-tocheader').innerHTML = '';		    
     } else {
       $('#reader-tocheader').innerHTML = 'Table of Contents [on  '+(parseInt(ubr.sectionPointer)+1) + '<span class="s-of-s-italic">&nbsp;of&nbsp;</span>'+ $('.reader-tocitem').size() +']';
    }

   },
   
   fadePageControls: function (start, end) {
	
			Debug.log('fading page controls');
			var nodes = $('.pageControl');
			ubr.pageControlsFadeLevel = end;
			if(!ubr.linearMode) {

					nodes.css('opacity',start);
					nodes.animate({ opacity: end }, { duration: 200 });

			} else {

					nodes.css('opacity',start);
				  nodes.animate({ opacity: end }, { duration: 200 });

			}

	},

	fadeSectionControls: function (start, end) {
			
			Debug.log('fading section controls');
			ubr.sectionControlsFadeLevel = end;
			$.each( [STAGE.sectionTab], function(node) {
	
				$(node).css('opacity',start);
				$(node).animate({ opacity: end }, { duration: 200 });
	
      });
	},
   
   hideControls: function () {
      if(ubr.navShowing && !ubr.usingNav) {
			//	STAGE.navWrap.slideUp();
			//	STAGE.optionBar.slideUp();
			
				STAGE.navWrap.animate({
					bottom:'-35px',
					height:0
				},{
					duration:300
				});
			
				STAGE.optionBar.animate({
					top:'-35px',
					height:0
				},{
					duration:300
				});
			
        ubr.navShowing = false;
      }
	},
   showControls: function () {
      if(!ubr.navShowing) {
     		 //STAGE.navWrap.slideDown();  	 
				 //STAGE.optionBar.slideDown(); 
				STAGE.navWrap.animate({
					bottom:0,
					height:'35px'
				},{
					duration:300
				});

				STAGE.optionBar.animate({
					top:0,
					height:'35px'
				},{
					duration:300
				});

        ubr.navShowing = true;
      }
	},
   getViewport: function () {
    return { w: $(window).width(), h: $(window).height(), l: 0, t: 0 };	//	object
	},
   getWidget: function ()
  { 
    //ubr.style(ubr.query("#codeForThisBook .codebox")[0], "display", "none");
    $("#codeForThisBook .codebox textarea").html("[click the size you would like to embed and the code will appear here]");
    //ubr.style("bookgluttonCodeMask", "display", "block");
    $("#codeForThisBook").css("display", "block");
  },

  loadWidgetCode: function (size) 
  {

    $("#codeForThisBook .codebox").css("display", "none");
    $("#codeForThisBook .bookgluttonFormWorking").css( "display", "block");
    $.ajax({
      url: ubr.getSfUrl('api', 'widgetcode')+'?id='+ubr.bookId,
      complete: function (data, xobj) {
        //Debug.log(data);
        $("#codeForThisBook .bookgluttonFormWorking").css( "display", "none");        
        $("#codeForThisBook .codebox").css("display", "block");
        $("#codeForThisBook .codebox textarea").val(data.responseText);
      }
    });
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
		STAGE.view.after('<div id="pageLayout"></div>');
	  STAGE.layout = $('#pageLayout');
    STAGE.layout.css(stobj);
	  STAGE.layout.after('<div id="pageMaster"></div>');
	  STAGE.book = $('#pageMaster');
    STAGE.book.css(stobj);
    var cache = $('#itemCache');
		$(cache).css({position:'absolute',top:'0',left:'-3000px',width:'1px',height:'1px',overflow:'hidden'});
    $(cache).css(stobj);
    $(cache).css({ height:'auto' });

	  STAGE.book.css('height', adjustTo);
	  // uncomment to show pagination:
	  //ubr.style(STAGE.layout, 'visibility', 'visible');

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
      if($('paragraph-numbering')) {
        var attached = $('paragraph-numbering');
      } else {
        var div = ubr.doc.createElement('div');
        ubr.attr(div, 'class', 'paragraph-number');
        ubr.style(div, 'visibility', 'hidden');
        ubr.style(div, 'color', '#999999');
        ubr.style(div, 'font-size', 'small');
        ubr.style(div, 'font-family', 'sans-serif');
        div.id = 'paragraph-numbering';
        var attached = ubr.body().appendChild(div);
      }
      attached.innerHTML = parseInt(ubrid)+1;
      var pos = ubr.coords(e.target); // the para position on screen
      var nt = (pos.x+pos.w) + 5; // numbering								
      var nl = pos.y;
      ubr.style(attached, 'position', 'absolute');
      ubr.style(attached, 'top', nl+'px');
      ubr.style(attached, 'left', nt+'px');
      ubr.style(attached, 'visibility', 'visible');
   },
   hideParaNumbering: function (e) {

      ubr.killIEResizeEvent = false;
      if(e.target.nodeName.toLowerCase() != 'p') return;
      var num = e.target.getAttribute('ubrid');
      var ind = 'paragraph-numbering';
      ubr.style($(ind), 'visibility', 'hidden');
	},
   /*
   showParaNumbering: function (e) {
     ubr.killIEResizeEvent = true;
      if(e.target.nodeName.toLowerCase() != 'p') return;
      var ubrid = e.target.getAttribute('ubrid');
      if($('paragraph-numbering-'+ubrid)) {
        var attached = $('paragraph-numbering-'+ubrid);
      } else {
        var div = ubr.doc.createElement('div');
        ubr.attr(div, 'class', 'paragraph-number');
        ubr.style(div, 'visibility', 'hidden');
        ubr.style(div, 'color', '#999999');
        ubr.style(div, 'font-size', 'small');
        div.id = 'paragraph-numbering-'+ubrid;
        var attached = ubr.body().appendChild(div);
      }
      attached.innerHTML = parseInt(ubrid)+1;
      var pos = ubr.coords(e.target); // the para position on screen
      var nt = (pos.x+pos.w) + 5; // numbering								
      var nl = pos.y;
      ubr.style(attached, 'position', 'absolute');
      ubr.style(attached, 'top', nl+'px');
      ubr.style(attached, 'left', nt+'px');
      ubr.style(attached, 'visibility', 'visible');
   },
   hideParaNumbering: function (e) {

      ubr.killIEResizeEvent = false;
      if(e.target.nodeName.toLowerCase() != 'p') return;
      var num = e.target.getAttribute('ubrid');
      var ind = 'paragraph-numbering-'+num;
      ubr.style($(ind), 'visibility', 'hidden');
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
  		ubr.publish('ubr/events/sectionView', [{
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
     ubr.style(STAGE.book, 'height', ubr.preserveMasterHeight);
   },
   showOverflow: function ()
   { // sets height to auto to avoid clipping
      ubr.preserveMasterHeight = ubr.style(STAGE.book, 'height');
	   ubr.style(STAGE.book, 'height', 'auto');
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

			$(STAGE.book).html(html); // set page text in view		
   },
   getContent: function ()
   {
      return STAGE.book.innerHTML;
   }

}


ubr.panelView = {

    panelSlide: function (loc, pos, set) {
       

       
      // pos will be 1,2 or 4 (hidden, poised or extended)
      // if not specified, will toggle between 2 and 4
      // set set to true to skip animation and position immed.
      var setonly = (arguments.length > 2) ? set : false;
      //Debug.log('pos is '+pos);
      //Debug.log('setonly set to '+setonly);
      ubr.panelStates[loc] = (!pos) ? ubr.panelStates[loc]<<1 : pos;
      if(ubr.panelStates[loc]>4) ubr.panelStates[loc]=(!pos)?2:1;
      Debug.log('panel state for this loc is '+ubr.panelStates[loc]);
      var props = {};
      var scale = ubr.panelLimits[loc]/100;
      Debug.log('scale is '+scale);
      var vc = ubr.coords(STAGE.view);
      var pc = ubr.coords(STAGE.sectionTab);
      var poiseadj = (loc!='B') ? 36 : -76 - pc.h; // amount of peekout on tab
      var bottadj = (loc!='B') ? 0 : pc.h;
      var rcw = ubr.style($('ubReader'), 'width');
      var limit = (loc!='B') ? ((rcw-vc.w)/2)*scale : (vc.h*scale);
      Debug.log('limit is calced at '+limit);
		  Debug.log('this panels state is '+ubr.panelStates[loc]);
		  var end = (ubr.panelStates[loc]==1) ?
              limit :
                (ubr.panelStates[loc]==2) ?
                  limit - poiseadj :
                    0 + bottadj;
         // sometimes this will result in a negative value
         if(end < 0) { // adjust for IE wackiness if we adjusted the wrong way
            end = (end * -1) - (2 * poiseadj);
         }
      Debug.log('end for panel is '+end);
        // going up ??

		if(!setonly) {
		  Debug.log('will animate panel');
        var bb = function () { /* stub for beforeBegin callback */ };
        var oe = function () { /* stub for onEnd callback */ };
        if(loc=='B') { /* if this is B, bottom panel... */
          if(ubr.panelStates[loc]==2) { /* with B, only way to tell */
             //Debug.log('setting proper width on toc panel');
             ubr.style(ubr.panelNodes[loc],'width','92%');
           } else {
             oe = function () {
                //Debug.log('oe: setting width for hidden toc panel');
                ubr.style(ubr.panelNodes[loc],'width','32px');
             }
           }
        }        
        props[ubr.panelProps[loc]]={
  		        end: end+'px',
  		  };
  		  Debug.log(props);
				bb();
				$(ubr.panelNodes[loc]).animate(
					{
						height:props.height.end
					},
					{
						duration:200,
						complete: oe
					}
				);

	   } else {
	      //alert('setting position and state directly, no animation');
	      //alert('panel state for '+loc+' is '+ubr.panelStates[loc]);
         if(loc=='B') {
           ubr.style(ubr.panelNodes[loc],'width',(pos==4) ? '32px' : '92%');
         }
	      var opac = (ubr.panelStates[loc]==4) ? 1 : 0; // adjust opac
         


         //alert(end);
         //alert(ubr.panelProps[loc]);
         
         
	      ubr.style(ubr.panelNodes[loc], ubr.panelProps[loc], end+'px');
         if(ubr.plugins[loc]) {
            ubr.style(ubr.plugins[loc].attachPoint, 'opacity', opac);
            //alert('set opacity of '+loc+' to '+opac);
            // simulate the animation publication
            //Debug.log('ubr/plugins/'+ubr.plugins[loc].id+'/nodefadeStart');
            if(opac==1) {
            ubr.publish('ubr/plugins/'+ubr.plugins[loc].id+'/nodefadeInStart', [true] );
            ubr.publish('ubr/plugins/'+ubr.plugins[loc].id+'/nodefadeInEnd', [true] );
           } else if(opac==0) {
            ubr.publish('ubr/plugins/'+ubr.plugins[loc].id+'/nodefadeOutStart', [true] );
            ubr.publish('ubr/plugins/'+ubr.plugins[loc].id+'/nodefadeOutEnd', [true] );
           }
         }
        
	    }
    }
}


ubr.tocView = {

    buildToc: function () {
      var toc = 'No book loaded';
      if(ubr.sections) {
         if(ubr.sections.length > 0) {
           toc = '<ul>';
           for(var i = 0; i < ubr.sections.length; i++) {
             toc += ubr.getTocEntryHTML(i, ubr.sections[i]);
           }
           toc += '</ul>';
         }
         /*
         if(ubr.sections.length > 0) {
            if(ubr.sectionPointer != undefined) {
               if(ubr.sectionPointer > ubr.sections.length-1) { // bounds check
                  ubr.sectionPointer = ubr.sections.length-1;
               }
               if(ubr.sectionPointer < 0) ubr.sectionPointer=0;
               if(ubr.sections[ubr.sectionPointer]) {
                  ubr.chapterFile = ubr.sections[ubr.sectionPointer]['src'];
                  ubr.chapterTitle = ubr.sections[ubr.sectionPointer]['label'];      			
               }
            }
         }
         */
         ubr.setTocHTML(toc);
         $('.reader-tocitem', STAGE.tocitems).mouseover(	function (evt) {
					
                 ubr.addClass(this, 'reader-section-item-hilite');
                 evt.stopPropagation();
                
         });
         $('.reader-tocitem', STAGE.tocitems).mouseout(	function (evt) {

                 ubr.removeClass(this, 'reader-section-item-hilite');
                 evt.stopPropagation();
               
         });

         $('.reader-tocsection', STAGE.tocitems).mouseover( 	function (evt) {

                ubr.addClass(this, 'reader-section-hilite');
                evt.stopPropagation();
                
          });
					
					$('.reader-tocsection', STAGE.tocitems).mouseout( function (evt) {

               ubr.removeClass(this, 'reader-section-hilite');
               evt.stopPropagation();

				 });

         $('a', STAGE.tocitems).click(ubr.navCtl.handleTocClick);



      } else {
      
         throw new Exception('sections variable not defined');
      }
    },

    setTocHTML: function (html) {
      STAGE.tocitems.html(html);
    },
    
    getTocEntryHTML: function (i, secobj) {
       if(secobj.navPoints.length==0) {
          return '<li class="tocitem'+(secobj.playOrder-1)+' reader-tocitem"><a title="Section '+i+'" href="#href('+secobj.src+')">'+secobj.label+'</a></li>';   
       } else {
          var list = '<li class="reader-section-wrap"><span class="tocitem'+(secobj.playOrder-1)+' reader-tocitem reader-tocheading"><a title="Section '+i+'" href="#href('+secobj.src+')">'+secobj.label+'</a></span><ul>';
          for(var ii=0; ii < secobj.navPoints.length; ii++) {
             list += this.getTocEntryHTML(i+'-'+ii, secobj.navPoints[ii]);
          }
          return list + '</ul></li>';
       }
    },
    
    markHrefSelected: function (href) {
       Debug.log('markHrefSelected');
      if(href.indexOf('#!')) { // internal id system, ignore
         href = href.split('#')[0];
      }
      var qstr = '.reader-tocitem a[href="#href('+href+')"]';
      var nodes = $(qstr);
      if(nodes.length>0) {
         var count = 0;
         var up = nodes[0].parentNode;
         while(up.nodeName.toLowerCase()!='li') {
            if(count++>10) { throw ('Something is wrong with the page structure'); }
            up = up.parentNode;
         }
         ubr.tocView.markTocSelectionByNode(up);
         return true;
      } else {
         return false;
      }
    },
    
    markTocSelection: function ()
  	{
  	  if(!ubr.sectionPointer) ubr.sectionPointer = 0;
  	  $('.reader-tocselected', STAGE.tocitems).removeClass('reader-tocselected');
  	  $('.tocitem'+ubr.sectionPointer).addClass('reader-tocselected');
  	},
   
   markTocSelectionByNode: function (node)
   {
     if(!node) Debug.log('no node to highlight!-->'+node);
      if(!node) return false;
     
  	  $('.reader-tocselected', STAGE.tocitems).removeClass('reader-tocselected');      
  	  ubr.addClass(node, 'reader-tocselected');      
   },
   getLabelForSection: function (href)
   {
      var qstr = '.reader-tocitem a[href="#href('+href+')"]';
      var nodes = $(qstr);
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
      
   }

}


ubr.progMeterView = {

	progFollow: function(evt)
	{
		if(ubr.isPaginating()) { // not while paginating!
		  ubr.progStop();
			return;
		} else {
			ubr.progFollowing=true;
			if(ubr.style(STAGE.book, 'opacity')==1) {
				$(STAGE.book).animate({ opacity: .5 }, { duration: 100 });
      }
			ubr.progUpdateFromMouse(evt);
		}				
	},
	progPageNumFlash: function (num,fadein,fadeout)
	{
	  // accept a number to flash or show current pagenum
    // fade in and out or simply flash on (up to caller to turn off)
		STAGE.pageProg.html(num + 1 + '');

		if(!STAGE.pageProg.css('opacity')>0) {
  		if(fadein) {
				var cb = (fadeout) ? function () {
					STAGE.pageProg.fadeTo(200,0);
        } : function () {};
				STAGE.pageProg.fadeTo(200, .5, cb);
  	  } else {
  	    STAGE.pageProg.css('opacity',1);
  	  }
    }
	},
	
	progStop: function (evt)
	{
		if(ubr.progFollowing==true) {
			ubr.progFollowing=false;
			var fadelevel = (ubr.isIE) ? 1.0 : 0.5;		
			var step1 = STAGE.pageProg.fadeTo(400,fadelevel,
				function () {
					STAGE.book.fadeTo(300, 0, function() {
						ubr.progFollowing=false;
					});
				});			
			ubr.progUpdatePageFromMouse(evt);
		}
	},
	
	progUpdateFromMouse: function (evt)
	{
	  if(!evt) return;
		if(ubr.progFollowing==true) { // set percentage from position of click
		  var cl = ( evt.clientX - ubr.coords(STAGE.progMeter).x );
		  var w = ubr.coords(STAGE.progMeter).w;
			ubr.percentProgress = ( cl / w ) * 100;
			ubr.pagePointer = (ubr.pagePointer > (ubr.pageNodes.length-1)/2) ? Math.ceil((ubr.pageNodes.length-1)*(ubr.percentProgress/100)) : Math.floor((ubr.pageNodes.length-1)*(ubr.percentProgress/100));
			if(ubr.pagePointer==ubr.pageNodes.length-1) {
				ubr.percentProgress = 100;
			} else if(ubr.pagePointer==0) {
				ubr.percentProgress = 0;
			}
			ubr.setProgMeter(ubr.percentProgress);
			ubr.progPageNumFlash(ubr.pagePointer, false, false);
			ubr.progUpdatePageFromMouse(evt);
		}
	},
	progUpdatePageFromMouse: function (evt)
	{
	  if(!evt) return;
		Debug.log('page update called by progbar drag:'+ubr.pagePointer);
		ubr.unloadPageView();
		ubr.updatePageView();
	},
	setProgMeter: function (percent)
	{
		if(percent > 100) percent=100;
		if(percent < 0) percent=0;

		if(percent==0) {
			STAGE.progLeft.removeClass('full');			  
		} else if(percent>0) {
			STAGE.progLeft.addClass('full');				  
		}
		var o =  { h: $(STAGE.progFill).height(), w: Math.ceil($(STAGE.progMeter).width() * (percent/100)) };
		
		STAGE.progFill.height(o.h);
		STAGE.progFill.width(o.w);

		if(percent==100) {
			ubr.addClass(STAGE.progRight, 'full');				
		} else {
			ubr.removeClass(STAGE.progRight, 'full');
		}
	},
   showProgMeterDisabled: function ()
	{
		ubr.fadeProgMeter(ubr.progMeterFadeLevel, 1.0);
	},
  fadeProgMeter: function (start, end)
	{
		Debug.log('fading from '+start+' to '+end);
		ubr.progMeterFadeLevel = end;
   	var nodes = $('.progMeter');
		nodes.css('opacity',start);
		nodes.animate({ opacity: end }, { duration: 200 });
	},   
   updateProgMeter: function ()
   {	
     if(!ubr.pageNodes) return;
         if(ubr.pageNodes.length < 2) {
            ubr.percentProgress = 100;
         } else {
            ubr.percentProgress =  Math.ceil(ubr.pagePointer / (ubr.pageNodes.length - 1) * 100);						
         }
         ubr.setProgMeter(ubr.percentProgress);
         ubr.updateSectionStat();
   }
   

}


ubr.feedView = {



  atomToHTML: function (data)
  {

    var isepublink;
    var isatomlink;
    var nexthtml='', prevhtml='';
    var fillTmpl = function (f) {
			console.log(f);
      var e = ['<ul class="atomentries">'];
      // grab prev and nexts
  		if(typeof f.links == 'array') {
	      for(var l = 0; l < f.links.length; l++) {
	        if(f.links[l].rel=='next') {
	          var nextlink =  "ubr.fetchAtom('"+f.links[l].href+"');return false";
	          nexthtml = ['<li class="atomentry" onclick="',nextlink,'"> <div class="atomheader"><a class="atomlink" href="#" onclick="',nextlink,'">More entries</a><br /></div> <div class="atomsummary">More results from this feed</div> </li>'].join('');
	        } else if(f.links[l].rel=='prev') {
	          var prevlink = "ubr.fetchAtom('"+f.links[l].href+"');return false";
	          prevhtml = ['<li class="atomentry" onclick="',prevlink,'"> <div class="atomheader"><a class="atomlink" href="#" onclick="',prevlink,'">Previous entries</a><br /></div> <div class="atomsummary">Previously viewed results from this feed</div> </li>'].join('');
	        }
	      }
			}	else {
				if(f.next) {
          var nextlink =  "ubr.fetchAtom('"+f.next+"');return false";
          nexthtml = ['<li class="atomentry" onclick="',nextlink,'"> <div class="atomheader"><a class="atomlink" href="#" onclick="',nextlink,'">More entries</a><br /></div> <div class="atomsummary">More results from this feed</div> </li>'].join('');
        }
				if(f.prev) {
          var prevlink = "ubr.fetchAtom('"+f.prev+"');return false";
          prevhtml = ['<li class="atomentry" onclick="',prevlink,'"> <div class="atomheader"><a class="atomlink" href="#" onclick="',prevlink,'">Previous entries</a><br /></div> <div class="atomsummary">Previously viewed results from this feed</div> </li>'].join('');
        }
			}
      e.push(prevhtml);

      for(var ii = 0; ii < f.entries.length; ii++) {
        var entry = f.entries[ii];
        var tnimg = '';
        var epublink = '';
        var otherlinks = '';
        var atomlink = '';
        
        entry.description = 'Feed Link';
        if(entry.content) {
           entry.description = entry.content;
        } else if(entry.summary) {
           entry.description = entry.summary;          
        }

        for(var i = 0; i < entry.links.length; i++) {
           var l = entry.links[i];
           if(l.type=='application/epub+zip') { //epub
              epublink = ubr.feedView.getEpubLinkHtml(entry,l);
           } else if (l.type=='application/atom+xml') { //atom
              //if(!l.rel) {
                 atomlink = ubr.feedView.getAtomLinkHtml(entry,l);
              //} else if(l.rel=='self') {
                 atomlink = ubr.feedView.getAtomLinkHtml(entry,l);             
              //}
           } else if (l.type.match(/^image\//)) { //image
              tnimg = ubr.feedView.getImageLinkHtml(entry,l);
           } else if (l.type=='text/html') { //html
              //otherlinks += ubr.feedView.getHtmlLinkHtml(entry,l);              
           }
        }
        if([tnimg,epublink,atomlink,otherlinks].join('').length>0) {
           e.push(['<li class="atomentry">',tnimg,epublink,atomlink,otherlinks,'</li>'].join(''));
        }
      }
      
      e.push(nexthtml);
      
      e.push(' </ul> ');
      return ['<div class="ubrsection"><br />',e.join(''),'</div>'].join('');
    }
    var res = fillTmpl(data);
    return res;
  },
  

  getEpubLinkHtml: function(entry,l)
  {
     var link = "ubr.loadEpub('"+l.href+"');return false";
     return ['<div class="atomheader"><a class="epublink" href="#" onclick="',link,'">',entry.title,'</a><br /></div> <div class="atomsummary">',entry.description,'</div>'].join('');
  },

  getAtomLinkHtml: function(entry,l)
  {

        var link = "ubr.fetchAtom('"+l.href+"');return false";
        return ['<a class="atomlink" href="#" onclick="',link,'">',entry.title,'</a> <div class="atomsummary">',entry.description,'</div>'].join('');
     
  },

  getImageLinkHtml: function(entry,l)
  {
     if (l.rel=='x-stanza-cover-image-thumbnail') {
       return '<img src="'+l.href+'" alt="icon" style="" />';
     } else if (l.rel=='http://opds-spec.org/thumbnail') {
       return '<img src="'+l.href+'" alt="icon" style="" />';
     } else {
       return '<img src="'+l.href+'" alt="icon" style="" />';           
     }
  },    

  getHtmlLinkHtml: function(entry,l)
  {
     var link = l.href;

     return ['<a href="',link,'" target="_new">',entry.title,'</a> <div class="atomsummary">',entry.description,'</div>'].join('');
  }, 

  
  makeFeednav: function (obj) {
     var logo = '';
     if(obj.thumbnail) {
        logo = '<img class="atomlogo" src="'+obj.thumbnail+'" alt="logo" />';
     }
     if(obj.title) {
        var title = obj.title;
     } else {
        var title = 'Untitled';
     }
       
       STAGE.feednav.innerHTML = ['<div class="atomfeed"> <div class="ubrheader" style="text-align:left"><a title="Close the feed navigator" href="#" onclick="ubr.toggleCat();return false;"><img src="/ubrx/unbound/images/reader-button-blind-up.png" alt="Close this" style="float:right" /></a>',logo,' <span class="feed-heading-lg">Catalogs</span><div class="feedtitle"><div class="backlink"><a title="Back to previously loaded feed" href="#" onclick="ubr.backAtom();return false;"><img src="/ubrx/unbound/images/catalogicon-back.png" alt="Back to previous feed" /></a></div><div class="atom-cat-title">',title,'</div></div></div><div class="atomfeedlist"></div></div>'].join('');
       
       
    	//	ubr.itemString = ubr.atomToHTML(obj);
    	//	ubr.itemStringCopy = ubr.itemString; // make a copy for when we repaginate
    	//	ubr.getPages();
    	  $(".atomfeed .atomfeedlist")[0].innerHTML = ubr.feedView.atomToHTML(obj);
    	
    	  if(ubr.atomHistory.length==0) {
          $(".atomfeed .backlink").style('visibility', 'hidden');
        } else {
          $(".atomfeed .backlink").style('visibility', 'visible'); 
        }
        
  }
  
  
}

PubSubP8n = {
  
  /*
  
  Pubsub Pagination copyright(c) 2008 Aaron Miller, may only be reused under
  Gnu Public License (GPL). See http://www.gnu.org for full terms
  Parts of this were derived from a function in the Dojo 0.4.3 library
  
  */
  
  active:false,
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
  getActive:function() {
    return this.active;
  },
  loadRefs:function(str, refnode, maxheight){

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
    return (id); // index into array
  },
  activate:function(id) {
    //main processing loop
    if(this.refsQ.length > 0) {
      this.active = true;
      //console.log('id '+id+' now active');
      //var strdata = this.refsQ[0]['str'];
      //console.log('processing '+strdata.length+' bytes of data');
      //console.log('subscribing to completion event');
      this.subscribe('p8n/'+id+'/complete', this, (function() {
        /* on completion of task, we will: */
        this.removeWorker(id);
        //console.log(this.workers);
        this.refsQ.shift(); // get rid of empty string  
        this.active = false;
      }).bind(this));
      /* until then: */
      //console.log('calling worker to work');
      this.assignWorker(id); 
    }
  },
  assignWorker:function(id) {
     
    // main work loop -- splits and tests string against layout box
    
    //Debug.log('fitting '+this.refsQ[0]['str'].substr(0,20)+' into node '+this.refsQ[0]['refnode']);

		var workerTask = (function () {
	    Debug.log('worker '+id+' on interval '+ this.workers.grid[id] +' is working at '+this.workerSpeed+' ms pace ...');
	    // grab buffer

			  var html = this.refsQ[0]['str'];
			  var node = this.refsQ[0]['refnode'];
			//	ubr.style(node, 'height', 'auto');
				var maxheight = this.refsQ[0]['maxheight'];
				//console.log('this workers maxheight is '+maxheight);
			  if(maxheight < 1) {
			    ubr.publish('p8n/'+id+'/complete', [ (new Date()).getTime(), this.ERR_NODE_NEGATIVE_HEIGHT ]);
			  }
				var i = 0; var limit = html.length; var add = 0; var doLoop = true;

			   //asm 10-10-09 commented for testing

				html = this.adjustFirstImage(node, html, maxheight);

				while (doLoop) { 
					add = Math.round((limit - i) / 2); // take half of untested string
					//console.log(add);
			      if (add <= 1) { // if one or less, stop
						doLoop = false;
					}
					i += add; 

				  //console.log('before:'+node.scrollHeight);
			     //console.log(html.substr(0, i));

			    if(html.substr(0, i).match(/<[^>]*?$/)) {
			      //console.log('looks like a broken tag');
			      var poo = html.substr(i).indexOf('>');
			      if(poo!=-1) {
			        i += (poo+1);
			        //console.log('advanced i from '+i+' to '+(poo+i+1));
			        ///console.log(html.substr(0, (i+poo+1)));
			      }
			    }

			   /* TEST THIS FRAGMENT IN OUR BOX */
			   //console.log('** testing fragment of length '+html.substr(0, i).length+' **');
				node.innerHTML = html.substr(0, i); // test half of the string



				 // console.log('after:'+node.scrollHeight);
					if (node.scrollHeight > maxheight) { // too big for box?
					//	console.log('too big');
						limit = i;
						i -= add;
					}
				}
				var s = this.splitAndBalance( html, i );

				//s.page = this.adjustFirstImage(node, s.page, maxheight);

			  ubr.publish('p8n/'+id+'/pagedata', [ s.page, s.remainder.length ]);          
			  //node.innerHTML = ''; // clear to avoid id conflict
			  if(s.remainder.length > 0) {
			    if(this.refsQ[0]['lastlen'] == s.remainder.length) {
			          // this should NOT happen, but does
			          // usually when all the following pages fail to fit due to large 
			          // images overrunning the boundaries
			    //  console.log('abnormal completion');
			      ubr.publish('p8n/'+id+'/complete', [ (new Date()).getTime(), 'FAILED' ]);
			    } else {
			      this.refsQ[0]['lastlen'] = s.remainder.length;
			      this.refsQ[0]['str'] = s.remainder;
			    }
			  } else {
			    ubr.publish('p8n/'+id+'/complete', [ (new Date()).getTime() ]);
			  }


	  }).bind(this);
		Debug.log('bound worker to context');
    this.workers.grid[id] = setInterval(workerTask,this.workerSpeed);
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
  	var imgnodes = $('img', node); // quickly grab img els
  	if(imgnodes[0]) {

  	  var lh = ubr.style(node, 'lineHeight');
  	  //console.log('current line height is '+lh);
  	  var maxlines = (maxheight/lh);
  	  //console.log('max lines to fit on this page: '+maxlines);
  	  
  	  
  	  var imgcoords = ubr.coords(imgnodes[0]);
  	  var nodecoords = ubr.coords(node);
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
  					//console.log('middle of tag, adjusted index to start of next tag');
  				} else {
  					if (lastGreater != -1) { // there is at least one complete tag here
  						i = lastGreater + 1;
  						//console.log('adjusted index to just after first complete tag');
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
  			//console.log('popping:'+);
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
    ubr.publish(topic, arr);
  },
  subscribe: function(topic, context, cb) {
    ubr.subscribe(topic, context, cb);
  }
  
}
