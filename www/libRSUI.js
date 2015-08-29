

var _RS_UI = 'ui';

/**
Requires: ReadSocial Selection Lib, ReadSocial Template Lib, LAB.js
Required by: ReadSocial API Lib
*/

ReadSocial.UI = (function () {
  

  var partnerId;
  // set your own list of suggested hashgroups here
  var hashgroups = [];
  var debugging = false;
  var authstatus, authnav;
  var u, ui, uil, contentdoc, content;
  var modal,xdframe,notelist,authstatus,authedas,attach,respond,excerpt,backNav,groupNav,newGroup,groupText,groupHint,groupEdit,loggedin,loggedout,logoutlink;
  var modalShowing = false;
  var highlight;
  var scrolltop;
  var scrollbot;
  var notescroller;
  var activeView;
  var showChannelBar = true;
  var cbarW = jQuery('.rs-channelName').width();
  var cbarH = jQuery('.rs-channelName').height();
  var session;
  var usingSSO = false;
  var authwindow;
  var authwindowInterval;
  var dropzone;
  var isIE = window.navigator.userAgent.match(/MSIE/);
  // kind of lame to do this, but no time for anything but a workaround:
  var uploadsSupported = (navigator.userAgent.match(/Chrome/)||navigator.userAgent.match(/Firefox/));
  var launcherLoc;
  var fileList;
  var config;
  var fileDataUrl;
  var selectionAnchorPoint, modalAnchorPoint;
  var docOverflowRestore, bodyOverflowRestore;
  var authed = false;
  var posttype = 1;
  var mtypes = ['text', 'link','image'];
  var mtype = mtypes[posttype-1];
  var domainIcons = _ReadSocial_UI_tmpl.domainIcons;
  var _deferredAuthCallback = function () {};
  
  var /* function */ _renderUI;
  
  function _init() {
    
    config = arguments[0];
    
    if(typeof config == 'undefined') config = {};
    
    ReadSocial.log('UI init config:');
    ReadSocial.log(config);
        
    config.uri = window.location.protocol + "//" + window.location.host;

    config.host = config.uri.split('//')[1].split('/')[0];

    if(typeof config.debug != 'undefined') debugging = config.debug;

    if(typeof config.partnerId === 'undefined') throw "partnerId not defined";
    partnerId = config.partnerId;

    if(typeof config.session !== 'undefined') {
      session = config.session;
      usingSSO = true;
      _updateAuthStatus(session);
    }

    if(typeof config.showChannels !== 'undefined') {
      showChannelBar = true;
    }

    if(typeof config.hashgroups !== 'undefined') {
      hashgroups = config.hashgroups;
    }

    if(typeof ReadSocial.API==='undefined') throw ('ReadSocial.API must be loaded first!');
    if(typeof jQuery==='undefined') throw ('jQuery is required!');

    uil = jQuery('#'+_RS_UI+'-launcher');
    // the modal container must be created
    // and defined by the API core
    modal = jQuery('.readsocial-uipane');

    authstatus = jQuery('.readsocial-authstatus');
    notelist = jQuery('.readsocial-notelist');
    excerpt = jQuery('.readsocial-selfield', modal);
    attach = jQuery('.readsocial-buttonContainer a.readsocial-attachButton');

    groupNav = jQuery('button.readsocial-groupNav');
    newGroup = jQuery('#readsocial-newgroup');
    groupHint = jQuery('button.readsocial-groupNav, .readsocial-groupbutton-hint');
    groupEdit = jQuery('.readsocial-groupEdit');
    groupText = jQuery('.readsocial-groupbutton-text');

    authedas = jQuery('.readsocial-postidentity');
    
    loggedin = jQuery('.readsocial-authstatus .logged-in');
    loggedout = jQuery('.readsocial-authstatus .logged-out');
    logoutlink = ReadSocial.UI.tmpl.logoutLink;
    
    _setupGroupControl();

    _setupUIHandlers();

    backNav = jQuery('button.readsocial-backNav');

    ReadSocial.log('dialog props applied');

    jQuery('button.readsocial-makeCommentNav').button().mousedown(_showNoteCreate);

    ReadSocial.log('bound make comment click');              

     if(jQuery('.readsocial-tabgroup button').size()<1) {
       throw ("no publisher panel!");
     }

    ReadSocial.log('navs hooked up');
   
    _setupPostForm();
    
    ReadSocial.log('publisher form set up');

    backNav.button({

       icons: {
           primary: "ui-icon-readsocial-list"
       },
       text: true
       }).click(function () {


         _refreshNotes(function () {
           _showView('.readsocial-noteListView');
           ReadSocial.log('notes refreshed after backNav click');
         });

    });
    backNav.css({visibility:'hidden'});

    ReadSocial.log('back nav set up');

    var authnavEl = document.createElement("DIV");
    authnavEl.setAttribute('class', 'readsocial-authnav-box');
    jQuery('.readsocial-responseAuthSubview').append(authnavEl);
    authnav = jQuery('.readsocial-responseAuthSubview .readsocial-authnav-box');

    var authHTML = '\
    Log in via&nbsp;<a class="readsocial-twitter-auth" href="javascript:void(0);" onclick="ReadSocial.UI.popAuthWindow(\'twitter\');return false">'+domainIcons['twitter.com']+'</a>\
    <a class="readsocial-facebook-auth" href="javascript:void(0);" onclick="ReadSocial.UI.popAuthWindow(\'facebook\');return false">'+domainIcons['facebook.com']+'</a>\
    <a class="readsocial-google-auth" href="javascript:void(0);" onclick="ReadSocial.UI.popAuthWindow(\'google\');return false">'+domainIcons['google.com']+'</a>\
    ';

    //authnav.append(authHTML);

    ReadSocial.log('authnav done');


    if(showChannelBar) {

      _renderUI = _.template(ReadSocial.UI.tmpl.channelBar);

      jQuery(/*document.body*/contentdoc).prepend(_renderUI({
        channel:ReadSocial.API.getGroupName()
      }));
      
    }

    _renderUI = _.template(ReadSocial.UI.tmpl.noteListNoItems);     
    
    jQuery('.readsocial-posts').append(
      _renderUI()
    );
    
    jQuery('.readsocial-noteListView').append(ReadSocial.UI.tmpl.noteListNoItemsImg);
    // send authHTML to remote frame for xd auth (if in XD mode)
    //ReadSocial.API.appendXd('.loginPane', authHTML.replace(/ReadSocial\.UI\./g,''));
     
    _renderUI = _.template(ReadSocial.UI.tmpl.hashList);     

    jQuery('.rs-channelList').append(_renderUI());

    ReadSocial.log('rendering hashgroups');
    ReadSocial.log(hashgroups);
    
    for(var i=0; i < hashgroups.length; i++) {

      var hashgroup = hashgroups[i];
      
      ReadSocial.log(hashgroup);

      _renderUI = _.template(ReadSocial.UI.tmpl.hashItem);
    
      jQuery('.rs-channelList ul').append(_renderUI({
        name: '#'+hashgroup.name,
        data: hashgroup.name
      }));
      
    
    }
               
    jQuery('.rs-channelList ul a').click(function (e) {

      var newgroup = jQuery(this).attr('data-name');

      if(newgroup) {
        ReadSocial.UI.changeGroup(newgroup);                  
      }
      
    });
    
    ReadSocial.log('initUI done');

  }

  function _setupUIHandlers() {
    

    var w = jQuery(window);
    
    
    // Buttons
    ReadSocial.log('setting up buttons');
    
    attach.button({icon:false}).click(_handleAttachButtonClick);
    
    ReadSocial.log('setting up group hashtag controls');
    _connectHashtagDropdown(_handleHashtagDropdownChange);

    // Load More Posts...
    ReadSocial.log('setting up load more button');
    _connectLoadMoreButton(_handleLoadMoreClick);
    
    // hide load more throbber container and fill it out
    
    jQuery('.readsocial-loadmore-throbber').hide();
    _renderUI = _.template(ReadSocial.UI.tmpl.throbberSmall);
    jQuery('.readsocial-loadmore-throbber').html(_renderUI());
    
  }
  

  function _popLogin() {
    
    if(!ReadSocial.API.authed) {
      ReadSocial.log('popping auth options');
      if(typeof attach !='undefined') {
        attach.hide();
      }
      jQuery('.readsocial-buttonContainer, .readsocial-responseFormSubview').hide();
      var f = jQuery('.readsocial-responseAuthSubview');
      uipane = jQuery('.readsocial-uipane');
      var a = uipane.offset();
      
      // calculate the absolute position for the div
      // accounting for vertical scrolling. key off
      // of the modal window.
      
      var uipanebottom = window.innerHeight - (a.top+uipane.height()) + jQuery(window).scrollTop();
      var uipaneright = window.innerWidth - (a.left+uipane.width());
      
      //console.log(uipanebottom + ' ' + uipaneright)
      
      if(ReadSocial.API.isXd() && !usingSSO) {


        ReadSocial.log('using xd frame');

        xdframe.css({
              position:'fixed',
              top:'auto',
              left:'auto',
              bottom:uipanebottom+'px',
              right:uipaneright+'px',
              height:'100px',
              width:'453px',
              border:'none',
              padding:0,
              margin:0,
              zIndex:10000,
              opacity:1,
              visibility:'visible'
        });
      
      } else {
         
         ReadSocial.log('not XD');
            
         f.css({
           opacity:1
         }).show();

         authnav.show();

      }
    }
  }
  
  function _popAuthWindow(provider)
  {
    ReadSocial.log('popping auth window for '+provider);
    var url = ReadSocial.API.formatUrl('/v1/{partnerId}/auth/login/{provider}',[partnerId,provider]);
    ReadSocial.log(url);
    authwindow = window.open(
      url,
      (isIE ? '' : 'ReadSocial Authorization'),
      'height=500,width=600,resizable=no,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no');

  	if(typeof authwindow=='undefined') throw "Pop up windows must be enabled.";
  	authwindow.focus();
  	
  }
  
  function _hideLogin() {
    if(ReadSocial.API.isXd()) {
      
      jQuery('.readsocial-buttonContainer').show();
      if(typeof attach != 'undefined') {      

        attach.show();
      }
      if(typeof respond != 'undefined') {

        respond.show();      
      }
      if(typeof xdframe !== 'undefined') {
        xdframe.css({
              position:'absolute',
              top:'-9999px',
              left:'0px',
              height:'1px',
              width:'1px',
              zIndex:-1,
              visibility:'hidden'
        });
              
      }
      jQuery('.readsocial-responseAuthSubview').hide();
      if(typeof authnav !== 'undefined') {

        authnav.hide();
      }
      
    }

  }

  function _setupGroupControl () {

    groupText.html(ReadSocial.API.getGroupName());
   
    groupNav.click(function () {

         var w = groupNav.width();

         groupHint.hide();

         groupEdit.css({display:'block',opacity:0,width:w});
         newGroup.val('[new or known group]');
         groupEdit.fadeTo(300,1,function () {
           newGroup.focus();
           newGroup.select();
         });
         
     });

     newGroup.focus(function () {

     });

     newGroup.blur(function () {
       groupEdit.hide();
       groupHint.fadeTo(300,1,function () {
          
       });
     });

     newGroup.keypress(function (e) {
       

       if(e.keyCode==13) {
         
         _setNewGroup();
         
       }
    
     
     });
  }

  function _setNewGroup()
  {
    if(
       newGroup.val()!=ReadSocial.API.getGroupName() &&
       jQuery.trim(newGroup.val()).length > 0
     ) {
       
       ReadSocial.UI.changeGroup(newGroup.val());

     }
     
  }

  function _setupPostForm () {
    
     function _userFormShow(which) {

       var userfields = jQuery('.postfield');
       userfields.hide();
       jQuery(which).show();

     }
     
     // set up sprites on publisher buttons
     jQuery('.readsocial-tabgroup button').css({
      backgroundImage: ['url(',
      ReadSocial.UI.tmpl.sprites.publishIcons
      ,')'].join(''),
      height:'21px',
      width:'21px'
     });

     var msgbut =  jQuery('.readsocial-tabbutton-msg');
     var linkbut = jQuery('.readsocial-tabbutton-link');
     var filebut = jQuery('.readsocial-tabbutton-file');
     dropzone = jQuery('.readsocial-filedropzone');
     
    // order is link image note, disabled.enabled
    
     var linkdis = { backgroundPosition: '0 0'};
     var linken = { backgroundPosition: '-21px 0'};
     var notedis = { backgroundPosition: '-84px 0'};
     var noteen = { backgroundPosition: '-105px 0'};     
     msgbut.css(notedis);
     linkbut.css(linkdis);
     

     var filedis = { backgroundPosition: '-42px 0'};
     var fileen = { backgroundPosition: '-63px 0'};
     
     if(uploadsSupported) {
       filebut.css(filedis);
     } else {
       filebut.hide();
     }

     jQuery('.readsocial-textentryarea textarea, .readsocial-linkentryarea input').bind('mousedown', function (e) {
       var v = jQuery(e.target).val();
       if(v.match(/^\[\[.+?\]\]/)) { // if placeholder text
         jQuery(e.target).val("");
       }
     });
       
     msgbut.click(function (e) {
       e.preventDefault();
       msgbut.css(noteen);
       linkbut.css(linkdis);
       filebut.css(filedis);
       _userFormShow(".readsocial-textentryarea");
       var fld = jQuery('.readsocial-textentryarea textarea');
       fld.html('enter a note');
       fld.focus();
       fld.select();
       posttype = 1;
     });
     linkbut.click(function (e) {
       e.preventDefault();
       msgbut.css(notedis);
       linkbut.css(linken);
       filebut.css(filedis);
        _userFormShow(".readsocial-linkentryarea");
        var fld = jQuery('.readsocial-linkentryarea input[name="link"]');
        fld.val('http://');
        fld.focus();
        fld.select();
        var fld2 = jQuery('.readsocial-linkentryarea input[name="link_note"]');
        fld2.val('title of link');
        posttype = 2;
     });
     
     if(uploadsSupported) {
     
       filebut.click(function (e) {
         msgbut.css(notedis);
         linkbut.css(linkdis);
         filebut.css(fileen);
         e.preventDefault();
         _userFormShow(".readsocial-fileentryarea");
         var fld = jQuery('.readsocial-fileentryarea input[name="img_note"]');
         fld.val('image caption');
         posttype = 3;
       });
       
       var ignoreDrag = function(e) {
           var event = typeof e.originalEvent != 'undefined' ? e.originalEvent : e;
           if (event.stopPropagation) {
           	event.stopPropagation();
           }
           if (event.preventDefault) {
           	event.preventDefault();
           }
        };
        dropzone.bind('dragover', ignoreDrag).bind('dragenter', ignoreDrag).bind('drop', function (e) {

          /*

          For Safari 5, maybe inject the following in an iframe???
          No way to get a files data otherwise

                        <form enctype="multipart/form-data" method="post" class="legacy_image_post"><input type="file" name="img" onchange="ReadSocial.UI.handleFiles(this.files);" /></form><br/>\


          */

          e = (e&&e.originalEvent?e.originalEvent:window.event) || e;

          ignoreDrag(e);

          var files = (e.files || e.dataTransfer.files);

          var s = "";


          _handleFiles(files);

          return false;

        });
       
       
     }

     

     
   }
   
   function _showNoteCreate() {

       _showView('.readsocial-noteCreateView');

       jQuery('.readsocial-tabbutton-msg').trigger("click");

   }

  function _showPublisherModal()
  {

    var mode = (arguments[0]);

    var sel = (mode=='post') ? '.readsocial-noteCreateView' : '.readsocial-noteListView';
    
    excerpt.html('&ldquo;&nbsp;'+_shortHighlight(ReadSocial.API.getHighlight()));

    groupText.html(ReadSocial.API.getGroupName());
    //modal.dialog("open");
    jQuery('button').blur();
    if(mode=='post') {
      _showNoteCreate();
    } else {
      _refreshNotes(function () {
        _showView(sel);
        ReadSocial.log('notes refreshed after publisher modal');
      });      
    }
    
    ReadSocial.log('modal launched, going to pass in session');
    ReadSocial.log(session);
    
    ReadSocial.UI.updateAuthStatus(session);

    modalShowing = true;

  }
  
  function _refreshNotes(cb)
  {
    /*
      Used to completely refresh a note list based on current ReadSocial API state
    */

    ReadSocial.API.refreshNotes(function (o) {
      _updateNoteList(o,true);
      cb();
    });
    
    //alpha:
    //ReadSocial.Sel.clearHighlighted();
    
  }

 
  function _appendNotes(cb)
  {
    /*
      Used to append page of new results to a note list
    */

    ReadSocial.API.getNotes(function (o) {
      _updateNoteList(o,false);
      cb();
    });
  }

  function _hideUI(immediate)
  {
    ReadSocial.log('hideUI');

    ReadSocial.Sel.clearAll();
    //_restoreOverflow();
    if(immediate) {
      uil.hide();
    } else {
      uil.fadeTo(500, 0, function () {
        uil.hide();
      });
    }
  }


  function _syncContentDocNotes()
  { 
    content.each(function (i, n) {
          
    });
  }
  


  
  
  

  function _requestAuth(url, cb) {
    
    _deferredAuthCallback = cb;
    if(authwindow == null || typeof(authwindow) == "undefined") {
       alert("You will need to enable popups for this page in order to use the login features. Please follow your browser instructions for enabling popups on this page. Thanks."); 
    } else {
      authwindow.location.href = config.uri + url;
      ReadSocial.log('auth window:');
      ReadSocial.log(authwindow);       
    }
  }

  function _updateAuthStatus(s) {

    ReadSocial.log('auth status update');
    ReadSocial.log(s);

    if(typeof session === 'undefined') {
      session = s;
    }

    if(typeof session === 'undefined') {
      _handleLogoutEvent();
      ReadSocial.log('returning from updateAuthStatus due to session undefined');
      return;
    }


    if(session.authed) {
      _handleLoginEvent(session);
    } else {
      _handleLogoutEvent();
    }
  }
  
  function _showView(sel) {

    if(typeof selectedView != 'undefined') {
      jQuery(selectedView).hide(); 
    }
    
    selectedView = sel;
    
    var n = jQuery(sel);

    n.show();
    
    if(n.show().hasClass('viewlevel0')) {
      backNav.css({visibility:'hidden'});
    } else {
      backNav.css({visibility:'visible'});
    }

  }
  
  function _updateNoteList(notes) {
    
    var replace = true;
    if(arguments.length>1) {
      replace = arguments[1];
    }

    if(typeof notes == 'undefined') return;
    
    if(replace) {
      _clearView('.readsocial-posts ul');
    }
    
    if(notes.length==0) {
      ReadSocial.log('no notes here');

      jQuery('.readsocial-loadmore').hide();
      jQuery('.readsocial-bigzero').show();
      jQuery('.readsocial-background-nocomments').show();

      return;
    }
    
    ReadSocial.log(notes);
    
    jQuery('.readsocial-bigzero').hide();
    jQuery('.readsocial-background-nocomments').hide(); 
    jQuery('.readsocial-loadmore').show();
    // TODO use clear view here, but only conditionally
    //_clearViewjQuery('.readsocial-posts ul');
    
    // clear the newpost status
    jQuery('.readsocial-posts ul li').removeClass('newpost');
        
    for(var i=0; i < notes.length; i++) {
      var note = notes[i];
      
      ReadSocial.log(note);
      
      if(typeof note.uimg =='undefined') {
        note.uimg = 'https://www.readsocial.net/images/demo-avatar.png';
      }
      if(typeof note.uname =='undefined') {
        note.uname = 'Anonymous';
      }
      if(typeof note.udom =='undefined') {
        note.udom = 'readsocial.net';
      }
      if(typeof note.uid =='undefined') {
        note.uid = 8;
      }
      
      
      if(typeof note.body == 'undefined') {
        note.body = '';
      } else {
        note.body = _shorten(note.body,50);
      }
     
      if(note.img) {
        if(typeof note.img_small == 'undefined') {
          note.img_small = '#';
        }
        note.img_full_url = 
 ReadSocial.API.formatUrl('/v1/'+note.rid+'/images/'+note.img_small,[]);
        _renderUI = _.template(ReadSocial.UI.tmpl.noteImageListItem);           
      } else if(note.link) {
        _renderUI = _.template(ReadSocial.UI.tmpl.noteLinkListItem);   
      } else {
        _renderUI = _.template(ReadSocial.UI.tmpl.noteListItem);        
      }

      
      
/* TODO will this clobber handlers too? */
      var cl = ((i+1)%2==0) ?
        'noteitem-even':
        'noteitem-odd';
      note.clname = cl;
      if(typeof note.hi_raw == 'undefined') note.hi_raw = "";
      jQuery('.readsocial-posts ul').append(
        _renderUI(note)
      );
      
    }

    // add a newpost status to add handler only to new ones
    
    jQuery('.readsocial-posts ul li.li-noteitem').addClass('newpost'); 

    jQuery('.readsocial-posts ul li.newpost'/* div.readsocial-note-item'*/).click(_handleNoteDetail);
    
    jQuery('.readsocial-loadmore').show();
    
    if(typeof notescroller == 'undefined') {
      
      //notescroller = jQuery(".readsocial-posts").touchScroll();
      
    }
  }
  
  
  function _updateResponseList(responses) {

    ReadSocial.log('updating responses list');

    if(typeof responses == 'undefined') return;
    
    jQuery('.readsocial-responseListSubview .readsocial-responsethrobber').hide();
    
    _clearView('.readsocial-responseListSubview ul');
    
    var rl = jQuery('.readsocial-responseListSubview ul');
    
    if(responses.length==0) {
      
      ReadSocial.log('no responses here');
      
      rl.append('<div>No responses to this. Add one by clicking the "Reply" button above.</div>');

      return;
    }

    jQuery('li',rl).removeClass('newpost');
        
    for(var i=0; i < responses.length; i++) {
      var response = responses[i];
      ReadSocial.log(response);
      _renderUI = _.template(ReadSocial.UI.tmpl.responseListItem);
      rl.append(
        _renderUI(response)
      );
    }

    jQuery('li.li-responseitem', rl).addClass('newpost'); 

    _showResponseListSubview();
    
    if(typeof responsescroller == 'undefined') {
      
    //  responsescroller = jQuery(".readsocial-posts").touchScroll();
      
    }
  }
  
  
  function _clearView(sel) {
    jQuery(sel).empty();
  }
  
  function _handleNoteDetail(e) {
    
    var n = jQuery(e.target);
    if (!n.hasClass('.readsocial-note-item')) {
      ReadSocial.log('does not have class');
      ReadSocial.log(n);
      var n = jQuery(e.target).parents('.li-noteitem'); 
      ReadSocial.log(n);
    }

    var noteId = jQuery('.readsocial-note-item',n).attr('data-note_id');
    
    if(typeof noteId == 'undefined') return;
    
    e.preventDefault();
    e.stopPropagation();
    
    _clearView('.readsocial-magnifier .readsocial-note');
    _showView('.readsocial-noteDetailView');

    ReadSocial.log('getting note '+noteId);
    _clearView('.readsocial-noteDetailView');

    jQuery('.readsocial-noteDetailView').append(ReadSocial.UI.tmpl.throbber);
    
    ReadSocial.API.getNoteDetail(noteId, function (o) {
      

      ReadSocial.log('got note detail');

      _clearView('.readsocial-noteDetailView');

      
      if (typeof o.link !== 'undefined') { // link
           _renderUI = _.template(ReadSocial.UI.tmpl.linkDetail+ReadSocial.UI.tmpl.replyForm);
      } else if (typeof o.img != 'undefined') { // image
            o.img_full_url = 
          ReadSocial.API.formatUrl('/v1/'+o.rid+'/images/'+o.img_small,[]);
           _renderUI = _.template(ReadSocial.UI.tmpl.imgDetail+ReadSocial.UI.tmpl.replyForm);
      } else { // just note
           _renderUI = _.template(ReadSocial.UI.tmpl.noteDetail+ReadSocial.UI.tmpl.replyForm);
      }
 
      o.uimg = (typeof o.uimg !='undefined') ? o.uimg : "https://www.readsocial.net/images/demo-avatar.png";
 
      
      o.hi_raw = (typeof o.hi_raw !='undefined') ? _shortHighlight(o.hi_raw) :"";

      o.permalink = ReadSocial.API.formatUrl('/v1/{rid}/{group_id}/thumbprints/{par_hash}',[o.rid,o.gid,o.par_hash]);

      jQuery('.readsocial-noteDetailView').append(_renderUI(o));
      
      ReadSocial.log('showing highlight');
      
      // in alpha:
      //ReadSocial.Sel.showHighlighted(o.hi_nrml);
      
      // not working, really:
      //ReadSocial.Sel.restoreSelection(o.sel);
      
      jQuery('.readsocial-reply-button').attr('data-note_id', o._id);

    //  jQuery('.readsocial-noteDetailView').append(ReadSocial.UI.tmpl.responseFormSubview);

    //  jQuery('.readsocial-noteDetailView').append(ReadSocial.UI.tmpl.responseListSubview);

      respond = jQuery('.readsocial-buttonContainer a.readsocial-respondButton');

      respond.button(
        {
          text:true,
          icons: { primary: "ui-icon-comment" },
          label: (ReadSocial.API.authed) ? 'Post It!' : 'Login to Post'
      }).click(_handleRespondButtonClick);

      // hook up toggle button
      jQuery('.readsocial-reply-button').button({
           icons: { primary: "ui-icon-comment" },
           text: true
       }).toggle( _showResponseFormSubview, _showResponseListSubview );
       

       
      // add throbber for loading
      _renderUI = _.template(ReadSocial.UI.tmpl.throbberSmall);
      jQuery('.readsocial-responseListSubview .readsocial-responsethrobber').html(_renderUI());
       
      ReadSocial.API.getResponses(noteId, function (rlist) {
        _updateResponseList(rlist);
      });

    });
    
  }

  function _showResponseFormSubview () {
        // reveal subview for list
        // show form
        var rb = jQuery('.readsocial-reply-button');
        if(rb.size()>0) { // HACk - dont know why, sometimes has no button method
          jQuery('.readsocial-reply-button').button({label:'Cancel',icons:{ primary: "ui-icon-cancel" }});
        }
        if(ReadSocial.API.authed) {
          ReadSocial.log('is authed');
          jQuery('.readsocial-responseListSubview, .readsocial-responseAuthSubview').fadeTo(200, 0, function () {
            
          }).hide();
          jQuery('.readsocial-responseFormSubview').fadeTo(200, 1, function () {

          }).show();
        } else {
          jQuery('.readsocial-responseListSubview, .readsocial-responseAuthSubview').fadeTo(200, 0, function () {
            _popLogin();
            jQuery('.readsocial-responseAuthSubview').css({opacity:1}).show();
            jQuery('.readsocial-authnav-box').show();
          }).hide();          
        }
        

  }
    
  function _showResponseListSubview() {
        // hide form, reveal subview for form
        
        
        if(ReadSocial.API.authed) {
          
          
        } else {
          
          
        }
        
        var sel1 = (ReadSocial.API.authed) ? '.readsocial-responseFormSubview' : '.readsocial-responseAuthSubview';
        jQuery('.readsocial-reply-button').button(
          {
            label:'Reply',
            icons: { primary: "ui-icon-comment" }
          });
        jQuery(sel1).fadeTo(200, 0, function () {
          jQuery('.readsocial-responseListSubview').fadeTo(200, 1, function () {
          }).show();
        }).hide();
  }
  
  function _handleHashtagDropdownChange(e) {
    ReadSocial.API.changeChannel(jQuery(this).val());
  }

  function _connectHashtagDropdown(f){
    jQuery('.readsocial-hashtag').change(f);
  }


  
  function _connectLoadMoreButton (f) {
    jQuery('.readsocial-loadmore button').click(f);
  }
  
  function _handleLoadMoreClick() {
    
    jQuery('.readsocial-loadmore button').hide();
    jQuery('.readsocial-loadmore-throbber').show();
  
    //var last = jQuery('.readsocial-posts ul li.newpost::last-child div')[0];
    
    //var olderthan = last.dataset.crstamp;
    
    //ReadSocial.log('will retrieve posts older than '+olderthan);
    
    _appendNotes(function (o) {

      jQuery('.readsocial-loadmore-throbber').hide();
      jQuery('.readsocial-loadmore button').show();
          
    });
    
  }
        
  function _handleLoginEvent(sess) {
    _hideLogin();
    
    //console.log(arguments.callee.caller.toString());
    
    ReadSocial.log('login event');
    ReadSocial.log(sess);

    if(typeof session === 'undefined') {
      session = sess;
    }

    if(!session.authed) return;
    
    if(typeof attach !=='undefined') {
    
      attach.html('Attach It!');
      attach.show();
      
    }

    if(typeof respond !== 'undefined') {
      respond.button({label:'Post It!'});   
    }

    if(typeof loggedin !== 'undefined') {


      ReadSocial.log('+++++++++++++++');
      ReadSocial.log(session);


      loggedin.html('<div class="icon">'+domainIcons[session.user.udom]+'</div><div class="link">'+logoutlink+'</div><div class="username">'+session.user.uname+'</div>');
      loggedout.hide();
      loggedin.show();
    }
    
    jQuery('.readsocial-screen-name',authedas).html('<div class="vc">Posting as  '+session.user.uname.toUpperCase()+'</div>&nbsp;&nbsp;'+domainIcons[session.user.udom]);
    jQuery('.readsocial-responseAuthSubview').hide();
    _showResponseFormSubview();
    jQuery('.readsocial-buttonContainer, .readsocial-buttonContainer a').show();

  }

  function _handleLogoutEvent() {
    ReadSocial.log('logout event');
    session = undefined;
    if(typeof attach !== 'undefined') {
      attach.html(ReadSocial.UI.messaging.LOGIN_TO_POST);
      attach.show();
    }
    jQuery('.readsocial-buttonContainer, .readsocial-buttonContainer a').show();
    if(typeof loggedout !== 'undefined') {
      loggedout.html(ReadSocial.UI.messaging.NOT_LOGGED_IN);
      loggedout.show();
      loggedin.hide();
    }
    jQuery('.readsocial-screen-name').html('Not logged in');
    ReadSocial.log('logout event 6');
  }
  



  function _getNoteForPostType() {
    var n = jQuery('.readsocial-note').val();

    if (posttype==1) { // note
      // clear link and image fields
      jQuery('.readsocial-linkentryarea input[name="link_note"]').val('');
      jQuery('.readsocial-linkentryarea input[name="link"]').val('');
    } else if (posttype==2) { // link
      // clear note and img fields
      jQuery('.readsocial-note').val('');
      jQuery('.readsocial-fileentryarea input[name="img_note"]').val('');
      n = {
        body: jQuery('.readsocial-linkentryarea input[name="link_note"]').val(),
        link: jQuery('.readsocial-linkentryarea input[name="link"]').val(),
        img:null
      }
    } else if (posttype==3) { // image
      // clear note and link fields
      jQuery('.readsocial-note').val('');
      jQuery('.readsocial-linkentryarea input[name="link_note"]').val('');
      jQuery('.readsocial-linkentryarea input[name="link"]').val('');
      n = {
        body: jQuery('.readsocial-fileentryarea input[name="img_note"]').val(),
        img: fileDataUrl,
        link: null
      }
      
    }
    n.mtype = mtype = mtypes[posttype-1];
    return n;
  }
  
   function _handleFiles(files)
   {
     // on file control change event


     fileDataUrl = null;
     
     if(typeof files == 'undefined') return false;
     if(!files.length) return false;
     
     var file = files[0];


     if(file.size > 2000000) { // stub for validation
       alert("Images must be under 2Mb.");
       return false;
     }

     if(!file.type.match(/^image\/(png|jpe?g|gif)/i)) { // stub for validation
       alert("Only png, jpg or gif images are allowed.");
       return false;
     }

     var reader = new FileReader();  
     reader.onload = function(e) {
       ReadSocial.log(e);
         fileDataUrl = e.target.result;
         dropzone.html(file.name);
     };
     reader.onerror = function(e) {
         ReadSocial.log(e);
     };
     reader.readAsDataURL(file);
  
   }

  function _shortHighlight(h)
  {
    var max = 180;
    return _shorten(h,max);
  }
  
  function _formatLibUrl(url)
 	{
 	//  if(window.location.pathname.match(/\.html?$/i)) { // static file load
 	  //  return url;
 	//  } else {
 	    return _RS_ROOT + '/' +url
 	//  }
 	}
  
  function _shorten(h,max)
  {
    var ol = h.length;
    if(ol<=max) return h;
    var words = h.substr(0,max).split(' ');
    words.pop();
    var mod = words.join(' ');
    if(mod.length<ol) {
      mod += '...';
    }
    return mod;
  }
  
  function _handleContentDocRefresh() {
    
    
    
  }
  
  function _handleAttachButtonClick(e) {
  
    ReadSocial.log('attach button click handler');

    e.preventDefault();
    e.stopPropagation();

    if(!ReadSocial.API.authed) {
      
        _popAuthWindow();

    } else {
      
        var n = _getNoteForPostType();
        ReadSocial.API.postNote( n, _returnFromPost );
      
    }
    return false;
  }
  

  function _handleRespondButtonClick(e) {
    
    ReadSocial.log('respond button click handler');
    
    e.preventDefault();
    e.stopPropagation();
    
    var noteId = jQuery('.readsocial-note-item-detail').attr('data-note_id');
    
    if(!ReadSocial.API.authed) {
      
      _popLogin();
      
    } else {
      
        ReadSocial.API.postResponse(
          noteId,
          jQuery('.readsocial-response').val(),
          function (d) {
            if(typeof d.auth != 'undefined') {
              
              _popLogin();
      
            } else {
              _returnFromResponse(d);
            }
          });    
    }
    
    return false;
  }
  
  function _returnFromPost(d) {

    _showView('.readsocial-noteListView');
    _refreshNotes(function () {
      _expireCount(jQuery(ReadSocial.API.getCurrentPara())).trigger('count');
    });

  }
  
  function _returnFromResponse(d) {
    
    var o = (typeof d !== 'object') ? jQuery.parseJSON(d) : d;
    ReadSocial.API.getResponses(o.note_id, function (rlist) {
      _updateResponseList(rlist);
    });
  }

  /**
  
    API
  
    Most JS events are handled internally in the UI library, but a few methods are useful for added external control.
    
    For single-page apps loading dynamic pages via ajax, the most important methods are the clearPage and refreshPage methods:
    
    BEFORE an ajax call is made to refresh paragraphs in the content container or doc, clearPage should be called. This will properly break down event handling and remove note counts and other UI elements from the page view. AFTER an ajax call has completed successfully, and the DOM updating is complete, the refreshPage method should be called. This will reinstate event handling and decorate the page view again with UI. 
    
    The other useful method are showPublisherModal and hidePublisherModal, which do what their names indicate (the publisher modal is the pop up window with lists of notes and the note/response composer forms).
  
  */
  
  
  return {
    
    clearPage: function() {  /* Call before ajax refresh begins */
      _invalidateContentHandlers();
      contentdoc = ReadSocial.API.getContentDoc();
      content = ReadSocial.API.getContent();
      ReadSocial.Sel.clearAll();
    },
    
    refreshPage: function () { /* Call after ajax refresh complete */ 
      _setupContentDoc(); 
      jQuery('p', contentdoc).trigger('count');
      //ReadSocial.Sel.positionLauncher();
    },
    
    requestAuth: _requestAuth,
    
    changeGroup: function (groupname) {
      
      ReadSocial.API.setGroupName(groupname);
       _refreshNotes(function () {
         ReadSocial.log('notes refreshed after group change');
       });

       // clear note count cache and recount
       _expireCount(jQuery('p',contentdoc)).trigger('count');
       var newname = ReadSocial.API.getGroupName();      

        jQuery('.readsocial-groupNav').html(newname);
        groupEdit.hide();
        groupHint.fadeTo(300,1,function () {

        });
      
    },
    
    updateAuthStatus: _updateAuthStatus,
    
    syncContentDocNotes: _syncContentDocNotes,
    
    updateNoteList: _updateNoteList,
    
    handleFiles: _handleFiles,
    
    getCurrentParagraph: ReadSocial.API.getCurrentPara,
    
    showPublisherModal: _showPublisherModal,
    
    popAuthWindow: _popAuthWindow,

    init: _init,

    messaging: {
      
      LOGIN_TO_POST: 'Log in to post',
      NOT_LOGGED_IN: 'NOT LOGGED IN'
      
    },
    
    inlineStyles: {
      
      noteflag: 'float: right; position: relative; right: -3em; top: -3em; padding: .5em; background-color: yellow; border: 1px solid gray;'  
      
    },
    tmpl:  _ReadSocial_UI_tmpl
    
  };
  
  
})();





/**
 * dropfile.js
 * A free to use drop file polyfill which adds FileReader to sites which don't have the FileAPI
 *
 * @license MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * 
 * @author Andrew Dodson (drew81.com)
 * @since Dec/2010
 */


// Silverlightjs see http://code.msdn.microsoft.com/silverlightjs
//v4.0.50401.0
if (!window.Silverlight) window.Silverlight = {}; Silverlight._silverlightCount = 0; Silverlight.__onSilverlightInstalledCalled = false; Silverlight.fwlinkRoot = "http://go2.microsoft.com/fwlink/?LinkID="; Silverlight.__installationEventFired = false; Silverlight.onGetSilverlight = null; Silverlight.onSilverlightInstalled = function () { window.location.reload(false) }; Silverlight.isInstalled = function (b) { if (b == undefined) b = null; var a = false, m = null; try { var i = null, j = false; if (window.ActiveXObject) try { i = new ActiveXObject("AgControl.AgControl"); if (b === null) a = true; else if (i.IsVersionSupported(b)) a = true; i = null } catch (l) { j = true } else j = true; if (j) { var k = navigator.plugins["Silverlight Plug-In"]; if (k) if (b === null) a = true; else { var h = k.description; if (h === "1.0.30226.2") h = "2.0.30226.2"; var c = h.split("."); while (c.length > 3) c.pop(); while (c.length < 4) c.push(0); var e = b.split("."); while (e.length > 4) e.pop(); var d, g, f = 0; do { d = parseInt(e[f]); g = parseInt(c[f]); f++ } while (f < e.length && d === g); if (d <= g && !isNaN(d)) a = true } } } catch (l) { a = false } return a }; Silverlight.WaitForInstallCompletion = function () { if (!Silverlight.isBrowserRestartRequired && Silverlight.onSilverlightInstalled) { try { navigator.plugins.refresh() } catch (a) { } if (Silverlight.isInstalled(null) && !Silverlight.__onSilverlightInstalledCalled) { Silverlight.onSilverlightInstalled(); Silverlight.__onSilverlightInstalledCalled = true } else setTimeout(Silverlight.WaitForInstallCompletion, 3e3) } }; Silverlight.__startup = function () { navigator.plugins.refresh(); Silverlight.isBrowserRestartRequired = Silverlight.isInstalled(null); if (!Silverlight.isBrowserRestartRequired) { Silverlight.WaitForInstallCompletion(); if (!Silverlight.__installationEventFired) { Silverlight.onInstallRequired(); Silverlight.__installationEventFired = true } } else if (window.navigator.mimeTypes) { var b = navigator.mimeTypes["application/x-silverlight-2"], c = navigator.mimeTypes["application/x-silverlight-2-b2"], d = navigator.mimeTypes["application/x-silverlight-2-b1"], a = d; if (c) a = c; if (!b && (d || c)) { if (!Silverlight.__installationEventFired) { Silverlight.onUpgradeRequired(); Silverlight.__installationEventFired = true } } else if (b && a) if (b.enabledPlugin && a.enabledPlugin) if (b.enabledPlugin.description != a.enabledPlugin.description) if (!Silverlight.__installationEventFired) { Silverlight.onRestartRequired(); Silverlight.__installationEventFired = true } } if (!Silverlight.disableAutoStartup) if (window.removeEventListener) window.removeEventListener("load", Silverlight.__startup, false); else window.detachEvent("onload", Silverlight.__startup) }; if (!Silverlight.disableAutoStartup) if (window.addEventListener) window.addEventListener("load", Silverlight.__startup, false); else window.attachEvent("onload", Silverlight.__startup); Silverlight.createObject = function (m, f, e, k, l, h, j) { var d = {}, a = k, c = l; d.version = a.version; a.source = m; d.alt = a.alt; if (h) a.initParams = h; if (a.isWindowless && !a.windowless) a.windowless = a.isWindowless; if (a.framerate && !a.maxFramerate) a.maxFramerate = a.framerate; if (e && !a.id) a.id = e; delete a.ignoreBrowserVer; delete a.inplaceInstallPrompt; delete a.version; delete a.isWindowless; delete a.framerate; delete a.data; delete a.src; delete a.alt; if (Silverlight.isInstalled(d.version)) { for (var b in c) if (c[b]) { if (b == "onLoad" && typeof c[b] == "function" && c[b].length != 1) { var i = c[b]; c[b] = function (a) { return i(document.getElementById(e), j, a) } } var g = Silverlight.__getHandlerName(c[b]); if (g != null) { a[b] = g; c[b] = null } else throw "typeof events." + b + " must be 'function' or 'string'"; } slPluginHTML = Silverlight.buildHTML(a) } else slPluginHTML = Silverlight.buildPromptHTML(d); if (f) f.innerHTML = slPluginHTML; else return slPluginHTML }; Silverlight.buildHTML = function (a) { var b = []; b.push('<object type="application/x-silverlight" data="data:application/x-silverlight,"'); if (a.id != null) b.push(' id="' + Silverlight.HtmlAttributeEncode(a.id) + '"'); if (a.width != null) b.push(' width="' + a.width + '"'); if (a.height != null) b.push(' height="' + a.height + '"'); b.push(" >"); delete a.id; delete a.width; delete a.height; for (var c in a) if (a[c]) b.push('<param name="' + Silverlight.HtmlAttributeEncode(c) + '" value="' + Silverlight.HtmlAttributeEncode(a[c]) + '" />'); b.push("</object>"); return b.join("") }; Silverlight.createObjectEx = function (b) { var a = b, c = Silverlight.createObject(a.source, a.parentElement, a.id, a.properties, a.events, a.initParams, a.context); if (a.parentElement == null) return c }; Silverlight.buildPromptHTML = function (b) { var a = "", d = Silverlight.fwlinkRoot, c = b.version; if (b.alt) a = b.alt; else { if (!c) c = ""; a = "<a href='javascript:Silverlight.getSilverlight(\"{1}\");' style='text-decoration: none;'><img src='{2}' alt='Get Microsoft Silverlight' style='border-style: none'/></a>"; a = a.replace("{1}", c); a = a.replace("{2}", d + "108181") } return a }; Silverlight.getSilverlight = function (e) { if (Silverlight.onGetSilverlight) Silverlight.onGetSilverlight(); var b = "", a = String(e).split("."); if (a.length > 1) { var c = parseInt(a[0]); if (isNaN(c) || c < 2) b = "1.0"; else b = a[0] + "." + a[1] } var d = ""; if (b.match(/^\d+\056\d+$/)) d = "&v=" + b; Silverlight.followFWLink("149156" + d) }; Silverlight.followFWLink = function (a) { top.location = Silverlight.fwlinkRoot + String(a) }; Silverlight.HtmlAttributeEncode = function (c) { var a, b = ""; if (c == null) return null; for (var d = 0; d < c.length; d++) { a = c.charCodeAt(d); if (a > 96 && a < 123 || a > 64 && a < 91 || a > 43 && a < 58 && a != 47 || a == 95) b = b + String.fromCharCode(a); else b = b + "&#" + a + ";" } return b }; Silverlight.default_error_handler = function (e, b) { var d, c = b.ErrorType; d = b.ErrorCode; var a = "\nSilverlight error message     \n"; a += "ErrorCode: " + d + "\n"; a += "ErrorType: " + c + "       \n"; a += "Message: " + b.ErrorMessage + "     \n"; if (c == "ParserError") { a += "XamlFile: " + b.xamlFile + "     \n"; a += "Line: " + b.lineNumber + "     \n"; a += "Position: " + b.charPosition + "     \n" } else if (c == "RuntimeError") { if (b.lineNumber != 0) { a += "Line: " + b.lineNumber + "     \n"; a += "Position: " + b.charPosition + "     \n" } a += "MethodName: " + b.methodName + "     \n" } alert(a) }; Silverlight.__cleanup = function () { for (var a = Silverlight._silverlightCount - 1; a >= 0; a--) window["__slEvent" + a] = null; Silverlight._silverlightCount = 0; if (window.removeEventListener) window.removeEventListener("unload", Silverlight.__cleanup, false); else window.detachEvent("onunload", Silverlight.__cleanup) }; Silverlight.__getHandlerName = function (b) { var a = ""; if (typeof b == "string") a = b; else if (typeof b == "function") { if (Silverlight._silverlightCount == 0) if (window.addEventListener) window.addEventListener("unload", Silverlight.__cleanup, false); else window.attachEvent("onunload", Silverlight.__cleanup); var c = Silverlight._silverlightCount++; a = "__slEvent" + c; window[a] = b } else a = null; return a }; Silverlight.onRequiredVersionAvailable = function () { }; Silverlight.onRestartRequired = function () { }; Silverlight.onUpgradeRequired = function () { }; Silverlight.onInstallRequired = function () { }; Silverlight.IsVersionAvailableOnError = function (d, a) { var b = false; try { if (a.ErrorCode == 8001 && !Silverlight.__installationEventFired) { Silverlight.onUpgradeRequired(); Silverlight.__installationEventFired = true } else if (a.ErrorCode == 8002 && !Silverlight.__installationEventFired) { Silverlight.onRestartRequired(); Silverlight.__installationEventFired = true } else if (a.ErrorCode == 5014 || a.ErrorCode == 2106) { if (Silverlight.__verifySilverlight2UpgradeSuccess(a.getHost())) b = true } else b = true } catch (c) { } return b }; Silverlight.IsVersionAvailableOnLoad = function (b) { var a = false; try { if (Silverlight.__verifySilverlight2UpgradeSuccess(b.getHost())) a = true } catch (c) { } return a }; Silverlight.__verifySilverlight2UpgradeSuccess = function (d) { var c = false, b = "4.0.50401", a = null; try { if (d.IsVersionSupported(b + ".99")) { a = Silverlight.onRequiredVersionAvailable; c = true } else if (d.IsVersionSupported(b + ".0")) a = Silverlight.onRestartRequired; else a = Silverlight.onUpgradeRequired; if (a && !Silverlight.__installationEventFired) { a(); Silverlight.__installationEventFired = true } } catch (e) { } return c };






/**
* Does the browser not have the FileReader already
*/
function HACK_dropfilepath()
{

      var p = document.createElement('script');
      p.setAttribute("src","/js/dropfile.js");
      return (p.src?p.src:p.getAttribute('src')).match(/(.*\/)/)[0] || "";

}
(function(){

  // Do we have the ability to drop files?
  window.dropfile = true;

    if (("FileReader" in window)){
        return;
    }

  // Does browser support Silverlight?
  if(!Silverlight.isInstalled()){
    // nope set
    window.dropfile = false;
    return;
  }
    // haxored to return something valid when used dynamically
    var path = HACK_dropfilepath();

    /**
     * Create the Silverlight Overlay, this will be moved into position once drop occurs
     */
    var sl = document.createElement('div');
    Silverlight.createObjectEx({
        source: path + "dropfile.xap",
        parentElement: sl,
        id: "SilverlightControl",
        properties: {
            width: "100%",
            height: "100%",
            version: "2.0",
            background: "#FFFFFF"
            //   isWindowless:"True",
            //   background: "#00FFFFFF"
        }
    });

    // Position the silverlight container iniitally
    sl.style.display = 'block';
    sl.style.position = 'absolute';
    sl.style.width = sl.style.height = "10px";

  
    var attach = function(){
      if(document.getElementsByTagName('body').length===1){
        document.getElementsByTagName('body')[0].appendChild(sl);
        return true;
      }
      return false;
    };
    if(!attach()){
      window.onload = attach;
    };

    hide();

    function hide(e) {
        sl.style.left = sl.style.top = "-10000px";
    }
  /**
   * Add eventlistner
   */
  function addEvent(el,name,func){
    if(el.addEventListener){
        el.removeEventListener(name, func, false);
        el.addEventListener(name, func, false);
    }
    else {
        el.detachEvent('on'+name, func);
        el.attachEvent('on'+name, func);
    }
  }

    /**
    * DragEnter + Event delegation,
    * When a drag enter event occurs if the current target is a drop zone overlay element with the Silverlight app.
    */
   addEvent( (document.body||document), "dragenter", function(event) {
        //IE doesn't pass in the event object
        event = event || window.event;

        //IE uses srcElement as the target
        var el = event.target || event.srcElement;

        // Use the dragover events to keep the silver light widget under the mouse cursor
        addEvent( el, "dragover", function (e) {
            e = e || window.event;
            // Define pageX and pageY if the window doesn't already have them defined.
            if (!("pageX" in e)) {
                e.pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                e.pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            // Update the position of the silverlight widget
            sl.style.top = (e.pageY - 7) + "px";
            sl.style.left = (e.pageX - 7) + "px";
        });


        /**
        * Add Callback which will be triggered via silverlight
        */
        window.dropfile = function () {
            // Instantly hide the SilverLight Application
            hide(true);
            // Drop the file
            // We are trying to recreate an event here... 
            // this is very hacky and means we have to recreate everything in a typical event otherwise we can break code
            var dataTransfer = { files: [] };

            for (var i = 0; i < arguments.length; i++) {
                     // filename
                var name = arguments[i].split(',')[0],
                    // data
                    base64 = arguments[i].split(',')[1],
                    // mime type based upon extension
                    mime = { png: "image/png",
                        jpg: "image/jpeg",
                        jpeg: "image/jpeg",
                        gif: "image/gif"
                    }[name.toLowerCase().match(/[^\.]*$/)[0]] || "";

                dataTransfer.files[i] = { name: name, size: base64.length, data: base64, type : mime }
            }

            // dispatch events
            try {
                // IE9,FF3<>FF3.5
                var dropEvent = document.createEvent("DragEvent");
                dropEvent.initDragEvent("drop", true, true, window, 0,
                                          0, 0, 0, 0,
                //event.screenX, event.screenY, event.clientX, event.clientY, 
                                          false, false, false, false,
                //event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 
                                          0, null, dataTransfer);
                el.dispatchEvent(dropEvent);
            }
            catch (e) {
                // <=IE8, <FF3
                var dropEvent = document.createEventObject();
                dropEvent.files = dataTransfer.files;

                if (el.fireEvent) {
                    el.fireEvent('ondrop', dropEvent);
                } else if (el.dispatchEvent) {
                    el.dispatchEvent(dropEvent);
                } else throw ("Whoops could not trigger the drop event");
            }
        };
    return false;
    });
  

    /**
    * Add FileReader to the window object
    */
    window.FileReader = function () {
      
        this.onload;
        this.result;
        this.readAsDataURL = function (file) {
            // Use the extension from the filename to determine the MIME-TYPE
            this.read("data:" + file.type + ";base64," + file.data);
        };
        this.readAsBinaryString = function(file){
            this.read(atob(file.data));
        };
        this.readAsText = function(file, encoding){
            this.read(atob(file.data));
        };
        this.readAsArrayBuffer = function(file){
          throw("Whoops FileReader.readAsArrayBuffer is unimplemented");
        }

        // Generic response
        // Passes a fake ProgressEvent
        this.read = function(result,opt){
            this.result = result;
            if (this.onload) {
                this.onload({
                    target: { result: result }
                });
            }
            else throw ("Please define the onload event handler first");
        };
    };


})();


/**
 * Base64 Encoding as documented at...
 * http://www.webtoolkit.info/javascript-base64.html
 */
/*
 * base64.js - Base64 encoding and decoding functions
 *
 * See: http://developer.mozilla.org/en/docs/DOM:window.btoa
 *      http://developer.mozilla.org/en/docs/DOM:window.atob
 *
 * Copyright (c) 2007, David Lindquist <david.lindquist@gmail.com>
 * Released under the MIT license
 * 
 * Modified by Andrew Dodson
 */
if(!('btoa' in window)){
  function btoa(s) {
    var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      e = [],
      i = 0, 
      b,
      buf;

    while(i<s.length){
      b = [s.charCodeAt(i++),s.charCodeAt(i++),s.charCodeAt(i++)];
      buf = (b[0] << 16) + ((b[1] || 0) << 8) + (b[2] || 0);
      e.push(
        c.charAt((buf & (63 << 18)) >> 18),
        c.charAt((buf & (63 << 12)) >> 12),
        c.charAt(isNaN(b[1]) ? 64 : (buf & (63 << 6)) >> 6),
        c.charAt(isNaN(b[2]) ? 64 : (buf & 63))
      );
    }
    return e.join('');
  }
}

if(!('atob' in window)) {
  function atob(s) {
    var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', 
      buf,
      a = b = d = [],
      j = i = 0;
    
    if ((s.length % 4 != 0) || (new RegExp('[^' + c + ']').test(s)) || (/=/.test(s) && (/=[^=]/.test(s) || /={3}/.test(s))))
      throw new Error('Invalid base64 data');
    
    while(i<s.length){
      j=i;
      a=[];
      for(;i<j+4;i++)
        a.push(c.indexOf(s.charAt(i)));
      
      buf = (a[0] << 18) + (a[1] << 12) + ((a[2] & 63) << 6) + (a[3] & 63);
      b = [((buf & (255 << 16)) >> 16), ((a[2] == 64) ? -1 : (buf & (255 << 8)) >> 8),((a[3] == 64) ? -1 : (buf & 255))];
      
      for(j=0;j<3;j++)
        if (b[j] >= 0||j===0)
          d.push(String.fromCharCode(b[j]));
    }
    return d.join('');
  }
}
