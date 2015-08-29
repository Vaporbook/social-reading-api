

(function($) {

  $.fn.thumbprints = function(config) {

    /*

      ReadSocial API - <(Thumbprints)> jQuery Plugin
      copyright (c) 2012-2013 ReadSocial, Inc.

    */


    /*
      Default plugin options object
    */

    var defaultOptions = {
        base: 'http://dev.readsocial.net',
        api_base: 'http://dev.readsocial.net',
        session_base: 'http://dev.readsocial.net',
        partner_id:8,
        group_id:'testing-channel',
        app_id:'partner-apps',
        ui: '#comments-ui',
        par_hash:null,
        load_handler: function () {
          _log('ReadSocial Thumbprints plugin loaded!');
        },
        session: {
          authed:false,
          user: {
            uimg: null,
            uid: null,
            uname: null,
            ulink: null
          }
        },
        hashgroups: [
          {
            name: "partner-testing-channel"
          },
          {
            name: "travis"
          },
          {
            name: "aaron"
          },
          {
            name: "memex"
          }],
        viewtype: 'list',
        templates: null /* assigned below after looking at options */
    }

    this.options = $.extend(this.options || defaultOptions, config );
    this.options.container = this.context;

    var _RS_ROOT = this.options.base
    ,_RS_API_ROOT = this.options.api_base
    ,_RS_UI = 'ui'
    ,_RS_DEBUG = true
    ,_RS_IBOOKS = false
    ,_RS_ROOT, _RS_API_ROOT

    /*
      core data model 
    */
    ,content
    ,nodes = content = this
    ,highlight
    ,hi_raw, hi_nrmal, hi_hash
    ,session, user
    ,authed = false
    ,channel = _createChannelName(this.options.group_id)
    ,partnerId = this.options.partner_id
    ,contentdoc = this.context
    ,node, context, highlight
    ,thumbprint = this.options.par_hash
    ,beforedate = null
    ,hashgroups = this.options.hashgroups
    ,enforcesandbox = true
    /*
       whether or not this is a 
       single member set
     */
    ,show_paragraph_cursor = nodes.size()>1;
    /*
      custom template overrides
    */
    var tmpl = (this.options.templates) ? $.extend(_ReadSocial_UI_tmpl, this.options.templates) : _ReadSocial_UI_tmpl;
    /*
      ui model
    */
    var ui = $(this.options.ui)
    ,domainIcons = tmpl.domainIcons, u, uil
    ,endSelectionEvent = 'mouseup'
    ,beginSelectionEvent = 'mousedown'
    ,authnav,modal,xdframe,notelist,authstatus,authedas,attach,respond,excerpt,backNav,groupNav,newGroup,groupText,groupHint,groupEdit,loggedin,loggedout,logoutlink
    ,launcherButton, showingLauncher, launcherWrap, modalShowing = false
    ,scrolltop
    ,scrollbot
    ,pointerEvent
    ,notescroller
    ,activeView
    ,showChannelBar
    ,cbarW = $('.navigationItem').width()
    ,authwindow
    ,authwindowInterval
    ,dropzone
    ,uploadsSupported
    ,launcherLoc
    ,fileList
    ,fileDataUrl
    ,selectionAnchorPoint, modalAnchorPoint
    ,docOverflowRestore, bodyOverflowRestore
    ,posttype = 1
    ,viewtype = this.options.viewtype
    ,mtypes = ['text', 'link','image']
    ,mtype = mtypes[0]
    ,_deferredAuthCallback = function () {};
                   

    // mustache style templates
    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    };

    uploadsSupported = (navigator.userAgent.match(/Chrome/)||navigator.userAgent.match(/Firefox/));


    _.each(nodes, function (n,i) {

        if(this.options.par_hash && (thumbprint === this.options.par_hash)) {
          _log('setting node');
          _setNode(n);          
        }

    }, this);

  

    /* be strict about the par_hash param */
    
    if(this.options.par_hash) {
      if(show_paragraph_cursor) {
        throw "Collection size may not exceed one result if passing in a par_hash value";
      } else { // single node collection
        if(thumbprint !== this.options.par_hash) {
          throw "Paragraph hash passed in options does not match paragraph hash of collection member";
        }

      }      
    }

    // append main template

/*
    ui.append(
      _.template(tmpl.dialog)({
        partner_id:partnerId
      })
    );
*/

    _bindEvents();

    _bindUI();


/*
=====================================================================================================
*/
/*

  Initialization functions 

*/
/*
=====================================================================================================
*/
    function _bindEvents() {

      if(show_paragraph_cursor) {



        nodes.bind(beginSelectionEvent, function (e) {

          // store original event
          pointerEvent = e;

        });

        nodes.bind(endSelectionEvent, function (e) {

          // determine validity of this target and correct if necessary
          var el = _getValidTarget(e.target);
          var start_el = _getValidTarget(pointerEvent.target);

          if(el !== start_el) {

            _log('mousedown and mouseup not in common ancestor');
            nodes.blur();
            return false;
          }

          if(!el || typeof el == 'undefined') {
            _log('tried to get valid target but got undefined or null');
            return false;
          }

          if(el === node) {
            _log('got mouseup in currently selected element, doing nothing but resetting highlight');

            if(!window.getSelection().toString()) {
              _clear();
            }
//            _setHighlight();
            return false;
          }

          _log('calling attachLauncher');

          try {
            _attachLauncher(el);
            //_setHighlight();
          } catch(e) {
            _log(e.message);
          }

          e.preventDefault();
          e.stopPropagation();

        });


        $(window).scroll(function () {
          $.liteDialog('hide');
        });

        $(window).resize(function () {
          $.liteDialog('hide');
        });

      } else {


        _log('will not bind paragraph cursor interaction events');

      }

      $(window).bind('readsocial_auth', function (a,d) {

        _log('auth event');
        _log(a);
        _log(d);
        session = d;
        authed = d.authed;
        user = d.user;
        if(authed) {
          $('.postbutton').show();
          $('.authbutton').hide();
          enablePostTab();
          $('.postview .avatar').append('<img src="'+user.uimg+'" />');
        }

      });

      $(window).resize(_positionLauncherButton);

      $(window).resize(_setHighlight);

    }

    function _bindUI() {

      $('.readsocial-attachButton').click(function (e) {
          posttype = 1;
          var n = _getNoteForPostType();
          _postNote( n, _returnFromPost );
      });
      $('.listbutton').click(function (e) {
        _log('list button clicked');
        enableListTab();
      });

      $('a.loginlink').on('touchstart',function () {
        _log('touchstart');
      });

      $('a.loginlink').on('click',function () {
        _log('click');
      });

      $('.authbutton,.loginlink').click(function (e) {
        _log('auth button clicked');
        enableAuthTab();
      });
      $('.postbutton').click(function (e) {
        _log('post button clicked');
        enablePostTab();
      });
      if(!authed) {

        //hidePostTab();
        //enableAuthTab();

      }

    }

    function _go() {
      _refreshNotes(function (o) {
        _updateNoteList(o,true);
        if(o.length>0 && viewtype !== 'post') {
          _showListView();
        } else {
          _showPostView();
        }

      });
    }


/*
=====================================================================================================
*/
/*

  Selection UI

*/

/*
=====================================================================================================
*/


    function _setNode(n, cb)
    {

      node = n;
      _log('set node to '+node);
      thumbprint = _calcSig(n);
      _log('set thumbprint to '+thumbprint);

      try {
        $.ajax({
          url:_formatUrl('/v1/{partnerId}/{channel}/ping/{thumbprint}',
          [partnerId, channel, thumbprint]),
          complete: function (x,s) {


              // this should ping the paragraph id to register selection,
              // and then it should return a result, found or not found
              // to indicate whether the paragraph is stored.

              // if not stored, we should re-ping with the full paragraph
              // text to store along with its hash as well as the partner id


              var o = {};
              try {
                o = JSON.parse(x.responseText);
              } catch (e) {
                ;
              }

             _log(o);

             thumbprint_url = _formatUrl('/v1/{partnerId}/{channel}/thumbprints/{thumbprint}',
               [partnerId, channel, thumbprint]);
             
             cb();

          }
        });
      } catch (e) {
        // sandboxed or other problem
        thumbprint_url =
        _formatUrl('/v1/{partnerId}/{channel}/thumbprints/{thumbprint}?context={context}',
        [partnerId, channel, thumbprint, context]);
        cb();
      }

    }


    function _clearNode()
    {

      node = undefined;
      thumbprint = undefined;
      thumbprint_url = undefined;
      
    }



    function _setHighlight()
    {



      _clearHighlightOverlay();
      _log('cleared');

      if(window.getSelection().toString().length>0) {


        // remove previous


        highlight = window.getSelection().toString();
         _log('set highlight to '+highlight);

        hi_raw =  highlight;
        hi_nrml = ReadSocial.hasher.normalize(hi_raw);
        hi_hash = ReadSocial.hasher.thumbprint(hi_nrml);

        
        var r = window.getSelection().getRangeAt(0);

        _drawSelectionRectsChrome(r);
       
        // serialize it 

        var serialized = {
          collapsed: r.collapsed,
          ca_nodeType: r.commonAncestorContainer.nodeType,
          ca_nodeName: r.commonAncestorContainer.nodeName,
          ca_nodeValue: r.commonAncestorContainer.nodeValue,
          ca_selpath: _getSelectorFor(r.commonAncestorContainer),
          sc_nodeType: r.startContainer.nodeType,
          sc_nodeName: r.startContainer.nodeName,
          sc_nodeValue: r.startContainer.nodeValue,
          sc_startOffset: r.startOffset,
          sc_selpath: _getSelectorFor(r.startContainer),
          ec_nodeType: r.endContainer.nodeType,
          ec_nodeName: r.endContainer.nodeName,
          ec_nodeValue: r.endContainer.nodeValue,
          ec_endOffset: r.endOffset,
          ec_selpath: _getSelectorFor(r.endContainer)
        };

        _log(serialized);

      }

    }

    function _getSelectorFor(n) {
      var selpath = [];
      _.each($(n).parents(), function (p, i) {

        var precedingcount = $(p).prev(p.nodeName).size();
        selpath.unshift(p.nodeName+'['+precedingcount+']');

      });
      return selpath.join('>').toLowerCase();
    }

    function _clearHighlightOverlay() {

      $('.highlightoverlay').remove();

    }

    function _clear() {
      nodes.blur();
      _clearNode();
      _detachLauncher();
      _clearHighlightOverlay();
    }

    function _drawSelectionRectsChrome(r) {

      if(typeof launcherWrap === 'undefined') throw "launcherWrap is undefined";

      var n = launcherWrap[0];

      var offsetTop = n.style.paddingTop + n.style.marginTop + n.style.borderTop + parseInt(window.scrollY);
      var offsetLeft = n.style.paddingLeft + n.style.marginLeft + n.style.borderLeft + parseInt(window.scrollX);
      _.each(r.getClientRects(), function (rect,i) {
        _log(rect);
        var div = document.createElement('DIV');
        div.setAttribute('class', 'highlightoverlay');
        var appended = n.insertBefore(div,node);
        var stobj = {
          top:parseInt(rect.top) + parseInt(offsetTop) +'px',
          left:parseInt(rect.left) + parseInt(offsetLeft) +'px',
          width:rect.right - rect.left +'px',
          height:rect.bottom - rect.top +'px'
        };
        _log(stobj);
        $.extend(appended.style,stobj);
      });
    }


    function _detachLauncher() {
      // detach the launcher
      launcherWrap = $('.rs-selected-wrap');
      if(showingLauncher) {

        launcherButton = launcherButton.detach();
        if(launcherWrap.size()>0) {
         $('p', launcherWrap).unwrap();
        }
        showingLauncher = false;
      }
    }


    function _positionLauncherButton()
    {
      launcherWrap = $('.rs-selected-wrap'); 
      if(launcherWrap.size()>0) {
        var wrap = launcherWrap.position();
        var stobj = {
          top:parseInt(wrap.top) + 'px',
          left:parseInt(wrap.left) + launcherWrap.width() - launcherButton.width()/2 + 'px',
          opacity:1
        };
       _log(stobj); 
        $.extend(launcherButton[0].style,stobj);
      }
    }

            /*
    

                $.liteDialog({
                  html:tmpl.dialog,
                  width: '80%',
                  height: '80%',
                  modal:true,
                  left:e.clientX,
                  top:e.clientY,
                  shadowRadius: '20px',
                  background: '#eeeeee',
                  color: '#333',
                  padding: 0,
                  zIndex: 9000
                  });

  */

           

    function _attachLauncher(el) {


      _clear();

      _setNode(el, function () {


        $(el).wrap('<div class="rs-selected-wrap"></div>');
        launcherWrap = $('.rs-selected-wrap');

        if(typeof launcherButton == 'undefined') {
    
          launcherWrap = $('.rs-selected-wrap');        
          launcherWrap.append(tmpl.launcherHTML);
          launcherButton = $('.launcherButton', launcherWrap);
          launcherButton.attr('href', thumbprint_url);
          launcherButton.click(function (e) {
            if(
              typeof channel=='undefined' ||
               typeof context=='undefined' || 
               typeof channel == 'undefined' || typeof partnerId == 'undefined'
            ) {
              e.preventDefault();
              e.stopPropagation();
            }
          });
          launcherButton.show();

        } else {

          launcherWrap.append(launcherButton);

        }
        _positionLauncherButton();
        showingLauncher = true;




      });
    }

/*
=====================================================================================================
*/
/*

  Comments UI

*/
/*
=====================================================================================================
*/


    function hidePostTab() {
      $('.postbutton').hide();
    }
    function enableAuthTab() {
  
      $('.button').removeClass('selected');
      $('.authbutton').addClass('selected');
      $('.view').hide();
      $('.authview').show();

    }
    function enableListTab() {
  
      $('.button').removeClass('selected');
      $('.listbutton').addClass('selected');
      $('.view').hide();
      $('.listview').show();

    }
    function enablePostTab() {
  
      $('.button').removeClass('selected');
      $('.postbutton').addClass('selected');
      $('.view').hide();
      $('.postview').show();

    }

    function _popAuthWindow(provider)
    {
      _log('popping auth window for '+provider);
      
      authwindow = window.open(_formatUrl('/v1/{partnerId}/auth/login/{provider}',[partnerId,provider]),'ReadSocial Authorization', 'height=500,width=400,resizable=no,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no');
      if(typeof authwindow=='undefined') throw "Pop up windows must be enabled.";
      authwindow.focus();
      
    }

    function _returnFromPost(d) {

      _refreshNotes(function (o) {
        _updateNoteList(o,true);
        //_expireCount(jQuery(ReadSocial.Sel.getCurrentPara())).trigger('count');
      });

    }


   function _getValidTarget(p) {
      var el = $(p);
      var validNodesSelector = 'p,li';
      var validNodes = ['p','li'];
      var fallbackNodesSelector = 'div,blockquote';
      var isvalid = $.inArray(el[0].nodeName.toLowerCase(),validNodes);
      if(isvalid===-1) {
       _log(validNodes);
       _log(el[0].nodeName.toLowerCase()+' not a valid node target');
       el = el.parents(validNodesSelector);
      }
      if(!el.size()) {
       el = el.parents(fallbackNodesSelector);
      }
      _log(el[0]);
      return el[0];
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



   function _updateNoteList(notes) {
      
      var replace = true;
      if(arguments.length>1) {
        replace = arguments[1];
      }

      if(typeof notes == 'undefined') return;
      
      if(replace) {
        $('.readsocial-posts ul').empty();
      }
      
      if(notes.length==0) {
        _log('no notes here');
        $('.readsocial-posts ul').html('<li>No one has posted anything yet.</li>');
        enableListTab();
        jQuery('.readsocial-loadmore').hide();
        jQuery('.readsocial-bigzero').show();
        jQuery('.readsocial-background-nocomments').show();

        return;
      }
      
      _log(notes);
      
      jQuery('.readsocial-bigzero').hide();
      jQuery('.readsocial-background-nocomments').hide(); 
      jQuery('.readsocial-loadmore').show();
      // TODO use clear view here, but only conditionally
      //_clearViewjQuery('.readsocial-posts ul');
      
      // clear the newpost status
      jQuery('.readsocial-posts ul li').removeClass('newpost');
          
      for(var i=0; i < notes.length; i++) {
        var note = notes[i];
        
        _log(note);
        
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
   _formatUrl('/v1/'+note.rid+'/images/'+note.img_small,[]);
          _renderUI = _.template(tmpl.noteImageListItem);           
        } else if(note.link) {
          _renderUI = _.template(tmpl.noteLinkListItem);   
        } else {
          _renderUI = _.template(tmpl.noteListItem);        
        }

        _log(_renderUI);
        
  /* TODO will this clobber handlers too? */
        var cl = ((i+1)%2==0) ?
          'noteitem-even':
          'noteitem-odd';
        note.clname = cl;
        if(typeof note.hi_raw == 'undefined') note.hi_raw = "";

         _log(_renderUI(note));


        jQuery('.readsocial-posts ul').append(
          _renderUI(note)
        );
        
      }

      // add a newpost status to add handler only to new ones
      
      jQuery('.readsocial-posts ul li.li-noteitem').addClass('newpost'); 

      jQuery('.readsocial-loadmore').show();

      enableListTab();
      
  }

/*
=====================================================================================================
*/
/*

  Core API

*/
/*
=====================================================================================================
*/


  function _createChannelName(s)
  {
    return s.replace(/[^A-Za-z0-9\-]/g,'').toLowerCase();
  }
  function _formatLibUrl(url)
  {
      return _RS_ROOT + '/' +url;
  }
  function _formatUrl(url, args)
  {

      var base = _RS_API_ROOT;
      if(typeof args=='undefined') return base + url;
      _log(url);
      for(var i = 0; i < args.length; i++) {

      url = url.replace(
        /\{[^\}]+?\}/, args[i]
      );
      }
      return base + url;
  }

  function _getNotesCount(phash, cb)
  {

      jQuery.ajax({
      url:_formatUrl('/v1/{partnerId}/{channel}/notes/count?par_hash={phash}', [partnerId,channel,phash]),
      error: function (jqXHR) {
                    if(jqXHR.status==502) {
          cb({count:0});
                    } else {
                      cb({count:0});
                    }
                  },
      success: function (data, textStatus, jqXHR) {
        if(typeof jqXHR !== 'undefined') {
          var d = jQuery.parseJSON(jqXHR.responseText);
          cb(d);
        } else {
                            cb({count:0});
        }
      }
      });

  }


  function _setDataTransport()
  {

      var d = {
        doc_url: window.location.href,
        doc_id: window.location.href,
        doc_title: window.document.title,
        doc_view: window.location.search,
        lang: window.navigator.language,
        crstamp: (new Date()).getTime(),
        par_hash: thumbprint,
        par_body: context,
        sel: '#'+thumbprint
      };

      if(highlight) {
        d.hi_raw=highlight;
        d.hi_nrml=ReadSocial.hasher.normalize(highlight);
        d.hi_hash=ReadSocial.hasher.thumbprint(highlight);
      }

      data_transport = d;

  }


  function _postNote(n, cb) {

      // pass in either a string n, as the note body, or
      // an object n, of the form:
      // { link: "", img: "", body: "" }
      // depending on which properties you set, the
      // content will be displayed as an image, link
      // or enhanced note

      if(
        typeof channel=='undefined' ||
         typeof context=='undefined'
      ) throw "Both channel (group) and context (paragraph text) must be defined before calling this.";
      
      var hi_raw =  highlight;
      var hi_nrml = ReadSocial.hasher.normalize(hi_raw);
      var hi_hash = ReadSocial.hasher.thumbprint(hi_nrml);
      var link, img, note;
      
      
      if(typeof n=='object') {
        var link = n.link;
        var img = n.img;
        var note = n.body;
        var mtype = n.mtype;
      } else {
        var note = n;
        var mtype = 'text';
      }
      
      var d = {
        doc_url: window.location.href,
        doc_title: window.document.title,
        doc_view: window.location.search,
        lang: window.navigator.language,
        crstamp: (new Date()).getTime(),
        note_body: note,
        note_link: link,
        note_img: img,
        hi_raw: highlight,
        hi_nrml: ReadSocial.hasher.normalize(highlight),
        hi_hash: ReadSocial.hasher.thumbprint(highlight),
        par_hash: thumbprint,
        par_body: context,
        sel: ''
      };

      if(typeof channel == 'undefined' || typeof partnerId == 'undefined') throw ('must set a net id and group hashtag before creating notes');
   
      var o = {
        url:_formatUrl('/v1/{partnerId}/{channel}/notes/create', [partnerId, channel]),
        type: 'post',
        data: d,
        contentType: "application/json",
        error: function (r) {
          if(r.status==401) {
            _log('401-Auth Required');
            var d = jQuery.parseJSON(r.responseText);
            $.extend(d,{error:'auth'});
            cb(d);
          }
        },
        success: function (s,d,x) {
          cb(s);
          
        }
      };
      _smartRequest(o);
  
  }
  function _postResponse(note_id, response, cb) {

      var d = {
        crstamp: (new Date()).getTime(),
        resp_body: response,
        note_id: note_id
      };

      if(typeof channel == 'undefined' || typeof partnerId == 'undefined') throw ('must set a net id and group hashtag before creating notes');
      var o = {
        url:_formatUrl('/v1/{partnerId}/notes/{note_id}/responses/create', [partnerId,note_id]),
        type: 'post',
        data: d,
        contentType: "application/json",
        error: function (r) {
          if(r.status==401) {
            _log('401-Auth Required');
            var d = jQuery.parseJSON(r.responseText);
            cb({auth:d.url});
          }
        },
        success: function (s,d,x) {
          cb(s);
          _callHandlers('responseComplete', s);
        }
      };
      _smartRequest(o);
    
  }

  function _contextualize(c)
  {
    return ReadSocial.hasher.normalize(c); 
  }
  
  function _calcSig(n)
  {
    /* calc the signature (thumbprint) of a p node */
    var el = $(n);
    context = _contextualize(el.text().trim());
    _log('set context to '+context);
    return ReadSocial.hasher.thumbprint(context);
  }

  function _setBeforedate(t)
  {
    beforedate = t;
    _log('set beforedate to '+beforedate);
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


  function _refreshNotes(cb)
  {
    // resets date and makes call to getNotes
    
    beforedate = null;
    _getNotes(cb);
    
  }


  function _getNotes(cb)
  {
    // pass in a paragraph to get notes about that paragraph
    if(typeof cb == 'undefined') throw "This function requires a callback function argument.";
    _log('getting notes...');
    var d = {};
   
    var url = (!beforedate) ?
      _formatUrl('/v1/{partnerId}/{channel}/notes?par_hash={par_hash}',
                        [partnerId, channel, thumbprint]) :
      _formatUrl('/v1/{partnerId}/{channel}/notes?par_hash={par_hash}&before={beforedate}',
                        [partnerId, channel, thumbprint,  beforedate]);
                        
    _log('URL is '+url);
    jQuery.ajax({
      url: url,
      data: d,
      complete: function (s,d,x) {
        var d = jQuery.parseJSON(s.responseText);
        if(d.length) {
          var lastnote = d[d.length-1];
          if (typeof lastnote != 'undefined') {
            _setBeforedate(lastnote.crstamp);
          }
        }
        cb(d);
      }
    });
  }

  function _getResponses(note_id, cb)
  {

    if(typeof cb == 'undefined') throw "This function requires a callback function argument.";
    
    _log('getting responses to note_id '+note_id+' ...');

    var url = _formatUrl('/v1/{partnerId}/notes/{note_id}/responses', [partnerId,note_id]);
                        
    _log('URL is '+url);
    
    jQuery.ajax({
      url: url,
      complete: function (s,d,x) {
        var d = jQuery.parseJSON(s.responseText);
        _log(d);
        cb(d);
      }
    });
  }


  function _getNoteDetail(noteId, cb)
  {
        

    if(typeof noteId=='undefined') {
      _log('noteId must be defined to fetch a note detail');
      return;
    }

    jQuery.ajax({
      
      url: _formatUrl('/v1/{net_id}/notes/{note_id}', [

        partnerId,
        noteId

      ]),
      type: 'get',
      complete: function (s,d,x) {
        
        var d = jQuery.parseJSON(s.responseText);
        
        cb(d);
        
      }
    });

  }


  function _endSession(cb)
  {
      var o = {
        url: _formatUrl('/v1/{partnerId}/auth/logout', [partnerId]),
        type:'post',
        success:function (s,d,x) {
          _log('returned from logout successfully');
          _log(s);
          _oauthCallback({stat:s});
        },
        error:function(r) {
          _log('returned from logout with error');
          _log(r);
        }
      };
      _smartRequest(o);
    
  }


  function _smartRequest(o)
  {

      o.xhrFields = {
           withCredentials: true
      };
      jQuery.ajax(o);
    
  }

  function _log (m) {
      if(_RS_DEBUG) {
        if(_RS_IBOOKS) {
          
          var loggerEl = $('#rs-logger');

          var logButton = $('.logButton');

          var logPane = $('#rs-logger .logpane');
          
          if(loggerEl.size()<1) {
            
            $(document.body).append('<div id="rs-logger"><div class="logButton">Hide/Show Log</div><div class="logpane"></div></div>');

            var loggerEl = $('#rs-logger');

            var logButton = $('.logButton');

            var logPane = $('#rs-logger .logpane');

            logButton.css({
              
              fontWeight:'bold',
              cursor:'pointer',
              textAlign:'center',
              display:'inline-block',
              fontFamily:'sans-serif',
              clear:'both',
              border:'1px solid #222',
              background:'#444',
              padding:'.2em 1em',
                            webkitBorderRadius:'.5em',
              
            });

            loggerEl.css({
              position:'fixed',
              top:'0',
              left:'0',
              height:'auto',
              width:'auto',
              minWidth:'10em',
              minHeight:'1em',
              backgroundColor:'black',
              color:'white',
              padding:'.5em',
              opacity:'.8',
              overflow:'hidden',
              webkitBorderRadius:'10px',
              webkitTransition:'height .2s ease-in-out, width .2s ease-in-out'
            });

            logPane.css({

              height:'90%',
              width:'100%',
              color:'#0f0',
              display:'none',
              textAlign:'right',
              fontFamily:'monospace',
              overflow:'auto',
              paddingBottom:'1em'

            });
            
            logButton.toggle(
                function () {
                    loggerEl.css({
                      height:'60%',
                      width:'60%'
                    });
                    logPane.show();
                    logPane.scrollTop(logPane[0].scrollHeight);
                  },
                function () {
                      logPane.hide();
                      loggerEl.css({
                        height:'auto',
                        width:'auto'
                      });
                    });

            
          }
          m = m.toString();
          logPane.append('<div class="logline">'+m+'</div>');
          logPane.scrollTop(logPane[0].scrollHeight);

        } else {
          try {
            console.log(m); 
          } catch(e) {  // phonegap bug
            console.log('caught ex srlizng obj:'+e.message);
          }
        } 

        
      }
    }
  };





// Underscore.js 1.3.3
// (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){function r(a,c,d){if(a===c)return 0!==a||1/a==1/c;if(null==a||null==c)return a===c;a._chain&&(a=a._wrapped);c._chain&&(c=c._wrapped);if(a.isEqual&&b.isFunction(a.isEqual))return a.isEqual(c);if(c.isEqual&&b.isFunction(c.isEqual))return c.isEqual(a);var e=l.call(a);if(e!=l.call(c))return!1;switch(e){case "[object String]":return a==""+c;case "[object Number]":return a!=+a?c!=+c:0==a?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==
c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if("object"!=typeof a||"object"!=typeof c)return!1;for(var f=d.length;f--;)if(d[f]==a)return!0;d.push(a);var f=0,g=!0;if("[object Array]"==e){if(f=a.length,g=f==c.length)for(;f--&&(g=f in a==f in c&&r(a[f],c[f],d)););}else{if("constructor"in a!="constructor"in c||a.constructor!=c.constructor)return!1;for(var h in a)if(b.has(a,h)&&(f++,!(g=b.has(c,h)&&r(a[h],c[h],d))))break;if(g){for(h in c)if(b.has(c,h)&&!f--)break;
g=!f}}d.pop();return g}var s=this,I=s._,o={},k=Array.prototype,p=Object.prototype,i=k.slice,J=k.unshift,l=p.toString,K=p.hasOwnProperty,y=k.forEach,z=k.map,A=k.reduce,B=k.reduceRight,C=k.filter,D=k.every,E=k.some,q=k.indexOf,F=k.lastIndexOf,p=Array.isArray,L=Object.keys,t=Function.prototype.bind,b=function(a){return new m(a)};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=b),exports._=b):s._=b;b.VERSION="1.3.3";var j=b.each=b.forEach=function(a,
c,d){if(a!=null)if(y&&a.forEach===y)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(e in a&&c.call(d,a[e],e,a)===o)break}else for(e in a)if(b.has(a,e)&&c.call(d,a[e],e,a)===o)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(z&&a.map===z)return a.map(c,b);j(a,function(a,g,h){e[e.length]=c.call(b,a,g,h)});if(a.length===+a.length)e.length=a.length;return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(A&&
a.reduce===A){e&&(c=b.bind(c,e));return f?a.reduce(c,d):a.reduce(c)}j(a,function(a,b,i){if(f)d=c.call(e,d,a,b,i);else{d=a;f=true}});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(B&&a.reduceRight===B){e&&(c=b.bind(c,e));return f?a.reduceRight(c,d):a.reduceRight(c)}var g=b.toArray(a).reverse();e&&!f&&(c=b.bind(c,e));return f?b.reduce(g,c,d,e):b.reduce(g,c)};b.find=b.detect=function(a,
c,b){var e;G(a,function(a,g,h){if(c.call(b,a,g,h)){e=a;return true}});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(C&&a.filter===C)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,g,h){c.call(b,a,g,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(D&&a.every===D)return a.every(c,b);j(a,function(a,g,h){if(!(e=e&&c.call(b,
a,g,h)))return o});return!!e};var G=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(E&&a.some===E)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return o});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;if(q&&a.indexOf===q)return a.indexOf(c)!=-1;return b=G(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(b.isFunction(c)?c||a:a[c]).apply(a,d)})};b.pluck=
function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&
(e={value:a,computed:b})});return e.value};b.shuffle=function(a){var b=[],d;j(a,function(a,f){d=Math.floor(Math.random()*(f+1));b[f]=b[d];b[d]=a});return b};b.sortBy=function(a,c,d){var e=b.isFunction(c)?c:function(a){return a[c]};return b.pluck(b.map(a,function(a,b,c){return{value:a,criteria:e.call(d,a,b,c)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c===void 0?1:d===void 0?-1:c<d?-1:c>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};
j(a,function(a,b){var c=e(a,b);(d[c]||(d[c]=[])).push(a)});return d};b.sortedIndex=function(a,c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){return!a?[]:b.isArray(a)||b.isArguments(a)?i.call(a):a.toArray&&b.isFunction(a.toArray)?a.toArray():b.values(a)};b.size=function(a){return b.isArray(a)?a.length:b.keys(a).length};b.first=b.head=b.take=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,
0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,Math.max(a.length-b,0)):a[a.length-1]};b.rest=b.tail=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,
e=[];a.length<3&&(c=true);b.reduce(d,function(d,g,h){if(c?b.last(d)!==g||!d.length:!b.include(d,g)){d.push(g);e.push(a[h])}return d},[]);return e};b.union=function(){return b.uniq(b.flatten(arguments,true))};b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=b.flatten(i.call(arguments,1),true);return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=
i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e;if(d){d=b.sortedIndex(a,c);return a[d]===c?d:-1}if(q&&a.indexOf===q)return a.indexOf(c);d=0;for(e=a.length;d<e;d++)if(d in a&&a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(F&&a.lastIndexOf===F)return a.lastIndexOf(b);for(var d=a.length;d--;)if(d in a&&a[d]===b)return d;return-1};b.range=function(a,b,d){if(arguments.length<=
1){b=a||0;a=0}for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;){g[f++]=a;a=a+d}return g};var H=function(){};b.bind=function(a,c){var d,e;if(a.bind===t&&t)return t.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));H.prototype=a.prototype;var b=new H,g=a.apply(b,e.concat(i.call(arguments)));return Object(g)===g?g:b}};b.bindAll=function(a){var c=
i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(null,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,f,g,h,i,j=b.debounce(function(){h=
g=false},c);return function(){d=this;e=arguments;f||(f=setTimeout(function(){f=null;h&&a.apply(d,e);j()},c));g?h=true:i=a.apply(d,e);j();g=true;return i}};b.debounce=function(a,b,d){var e;return function(){var f=this,g=arguments;d&&!e&&a.apply(f,g);clearTimeout(e);e=setTimeout(function(){e=null;d||a.apply(f,g)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments,0));
return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};b.keys=L||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&(c[c.length]=d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&
c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]=b[d]});return a};b.pick=function(a){var c={};j(b.flatten(i.call(arguments,1)),function(b){b in a&&(c[b]=a[b])});return c};b.defaults=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return r(a,b,[])};b.isEmpty=
function(a){if(a==null)return true;if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=p||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};b.isArguments=function(a){return l.call(a)=="[object Arguments]"};b.isArguments(arguments)||(b.isArguments=function(a){return!(!a||!b.has(a,"callee"))});b.isFunction=function(a){return l.call(a)=="[object Function]"};
b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isFinite=function(a){return b.isNumber(a)&&isFinite(a)};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.has=function(a,
b){return K.call(a,b)};b.noConflict=function(){s._=I;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.result=function(a,c){if(a==null)return null;var d=a[c];return b.isFunction(d)?d.call(a):d};b.mixin=function(a){j(b.functions(a),function(c){M(c,b[c]=a[c])})};var N=0;b.uniqueId=
function(a){var b=N++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var u=/.^/,n={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:"\u2028",u2029:"\u2029"},v;for(v in n)n[n[v]]=v;var O=/\\|'|\r|\n|\t|\u2028|\u2029/g,P=/\\(\\|'|r|n|t|u2028|u2029)/g,w=function(a){return a.replace(P,function(a,b){return n[b]})};b.template=function(a,c,d){d=b.defaults(d||{},b.templateSettings);a="__p+='"+a.replace(O,function(a){return"\\"+n[a]}).replace(d.escape||
u,function(a,b){return"'+\n_.escape("+w(b)+")+\n'"}).replace(d.interpolate||u,function(a,b){return"'+\n("+w(b)+")+\n'"}).replace(d.evaluate||u,function(a,b){return"';\n"+w(b)+"\n;__p+='"})+"';\n";d.variable||(a="with(obj||{}){\n"+a+"}\n");var a="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+a+"return __p;\n",e=new Function(d.variable||"obj","_",a);if(c)return e(c,b);c=function(a){return e.call(this,a,b)};c.source="function("+(d.variable||"obj")+"){\n"+a+"}";return c};
b.chain=function(a){return b(a).chain()};var m=function(a){this._wrapped=a};b.prototype=m.prototype;var x=function(a,c){return c?b(a).chain():a},M=function(a,c){m.prototype[a]=function(){var a=i.call(arguments);J.call(a,this._wrapped);return x(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];m.prototype[a]=function(){var d=this._wrapped;b.apply(d,arguments);var e=d.length;(a=="shift"||a=="splice")&&e===0&&delete d[0];return x(d,
this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];m.prototype[a]=function(){return x(b.apply(this._wrapped,arguments),this._chain)}});m.prototype.chain=function(){this._chain=true;return this};m.prototype.value=function(){return this._wrapped}}).call(this);

/*
liteDialog https://raw.github.com/user24/jQuery-liteDialog/master/jquery.litedialog.min.js
*/

(function(a){var p="hyLite";function c(e){e.keyCode===27&&a.liteDialog("hide")}var d={init:function(e){var b={html:"",modal:!1,shadow:"#000",shadowRadius:"25px",background:"#FFF",color:"#000",width:"300px",padding:"10px",zIndex:9000};e&&a.extend(b,e);a("#"+p+"Shdw").length===0&&a("<div id='"+p+"Shdw' style='position:fixed;top:0;left:0;'>").hide().css({height:a(document).height(),width:a(document).width()}).appendTo(document.body);a("#"+p+"Dlg").length===0&&a("<div id='"+p+"Dlg' style='position:absolute;'>").hide().appendTo(document.body); a("#"+p+"Shdw").css({background:b.shadow,'z-index':b.zIndex}).fadeTo("fast",0.4);a("#"+p+"Dlg").html(b.html).width(b.width).css({"box-shadow":"0px 0px "+b.shadowRadius+" "+b.shadow,"-moz-box-shadow":"0px 0px "+b.shadowRadius+" "+b.shadow,"-webkit-box-shadow":"0px 0px "+b.shadowRadius+" "+b.shadow,color:b.color,background:b.background,padding:b.padding,top:(a(window).height()-a("#"+p+"Dlg").outerHeight())/2+a(window).scrollTop(),left:(a(window).width()-a("#"+p+"Dlg").outerWidth())/2+a(window).scrollLeft(),'z-index':b.zIndex}).fadeIn(); b.modal?(a("#"+p+"Shdw, #"+p+"Dlg").unbind(),a(document).unbind("keyup",c)):(a("#"+p+"Shdw, #"+p+"Dlg").click(function(){a.liteDialog("hide")}),a(document).keyup(c))},hide:function(){a("#"+p+"Shdw, #"+p+"Dlg").fadeOut()}};a.liteDialog=a.fn.liteDialog=function(a){return d[a]?d[a].apply(this,Array.prototype.slice.call(arguments,1)):typeof a==="object"||!a?d.init.apply(this,arguments):d.init.apply(this,[{html:a}])}})(jQuery);



/**
Required By: ReadSocial API Lib
*/

if(typeof ReadSocial === 'undefined') ReadSocial = {};

ReadSocial.hasher = (function() {
  
  /*
  
  Goal is to generate a cross browser identical MD5 hash of a long text part of an UTF-8 encoded xhtml document. Therefore I started looking at the .text() method. Unlucky not all not md5 output values were identical. I think that is not the fault of jQuery, f.e. start copying and pasting text from different browsers into a text editor and they are all different.

  Solution in this case was to use the .html() method instead, replace all (tags|space characters) by a space, replace the double spaces by a single space, trim it, and finally hash it.

  
  
  */
  
  return {

    normalize: function (s) {
      
      // trim begin and end whitespace
      s = jQuery.trim(s);
      // remove newlines
      var text = s.
                replace(/(\r\n|\n|\r|\t)/gm,' ').
      /* strip hyphens in case of faked word hyphenation */
                replace(/\-/gm, '').
      /* strip strings of spaces before words */
                replace(/\s\s+(\S)/gm,' $1');
      return text;
    },
    
    thumbprint: function (s) {
      
      // pass normalized text to this
      var hash = hex_md5(s);
      return hash;
      
    },
    
    hashElement: function (p) {

      // pass a paragraph element to this
      var t = jQuery(p).text();//[0].innerText;
      return this.thumbprint(this.normalize(t));
      
    },
    
    /**
     * Escape an xml string making it ascii compatible.
     * @param {String} str the xml string to escape.
     * @return {String} the escaped string.
     */

    encode : function(str) {
        return str.replace(/&([a-z]+);/gi, function(a, m) {
            if (xmlEntityMap[m = m.toLowerCase()])
                return '&#' + xmlEntityMap[m] + ';';
            return a;
        });
    },
    
    
    ent2char : function (str) {
      //To convert all numerical character entities in a string to their character equivalents
      return str.replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(n); })
    }
  
  
  };
  
})();






var xmlEntityMap = {
    "quot": "34", "amp": "38", "apos": "39", "lt": "60", "gt": "62",
    "nbsp": "160", "iexcl": "161", "cent": "162", "pound": "163", "curren": "164",
    "yen": "165", "brvbar": "166", "sect": "167", "uml": "168", "copy": "169",
    "ordf": "170", "laquo": "171", "not": "172", "shy": "173", "reg": "174",
    "macr": "175", "deg": "176", "plusmn": "177", "sup2": "178", "sup3": "179",
    "acute": "180", "micro": "181", "para": "182", "middot": "183", "cedil": "184",
    "sup1": "185", "ordm": "186", "raquo": "187", "frac14": "188", "frac12": "189",
    "frac34": "190", "iquest": "191", "agrave": "192", "aacute": "193",
    "acirc": "194", "atilde": "195", "auml": "196", "aring": "197", "aelig": "198",
    "ccedil": "199", "egrave": "200", "eacute": "201", "ecirc": "202",
    "euml": "203", "igrave": "204", "iacute": "205", "icirc": "206", "iuml": "207",
    "eth": "208", "ntilde": "209", "ograve": "210", "oacute": "211", "ocirc": "212",
    "otilde": "213", "ouml": "214", "times": "215", "oslash": "216", "ugrave": "217",
    "uacute": "218", "ucirc": "219", "uuml": "220", "yacute": "221", "thorn": "222",
    "szlig": "223", "agrave": "224", "aacute": "225", "acirc": "226", "atilde": "227",
    "auml": "228", "aring": "229", "aelig": "230", "ccedil": "231", "egrave": "232",
    "eacute": "233", "ecirc": "234", "euml": "235", "igrave": "236", "iacute": "237",
    "icirc": "238", "iuml": "239", "eth": "240", "ntilde": "241", "ograve": "242",
    "oacute": "243", "ocirc": "244", "otilde": "245", "ouml": "246", "divide": "247",
    "oslash": "248", "ugrave": "249", "uacute": "250", "ucirc": "251", "uuml": "252",
    "yacute": "253", "thorn": "254", "yuml": "255", "oelig": "338", "oelig": "339",
    "scaron": "352", "scaron": "353", "yuml": "376", "fnof": "402", "circ": "710",
    "tilde": "732", "alpha": "913", "beta": "914", "gamma": "915", "delta": "916",
    "epsilon": "917", "zeta": "918", "eta": "919", "theta": "920", "iota": "921",
    "kappa": "922", "lambda": "923", "mu": "924", "nu": "925", "xi": "926",
    "omicron": "927", "pi": "928", "rho": "929", "sigma": "931", "tau": "932",
    "upsilon": "933", "phi": "934", "chi": "935", "psi": "936", "omega": "937",
    "alpha": "945", "beta": "946", "gamma": "947", "delta": "948", "epsilon": "949",
    "zeta": "950", "eta": "951", "theta": "952", "iota": "953", "kappa": "954",
    "lambda": "955", "mu": "956", "nu": "957", "xi": "958", "omicron": "959",
    "pi": "960", "rho": "961", "sigmaf": "962", "sigma": "963", "tau": "964",
    "upsilon": "965", "phi": "966", "chi": "967", "psi": "968", "omega": "969",
    "thetasym": "977", "upsih": "978", "piv": "982", "ensp": "8194", "emsp": "8195",
    "thinsp": "8201", "zwnj": "8204", "zwj": "8205", "lrm": "8206", "rlm": "8207",
    "ndash": "8211", "mdash": "8212", "lsquo": "8216", "rsquo": "8217",
    "sbquo": "8218", "ldquo": "8220", "rdquo": "8221", "bdquo": "8222",
    "dagger": "8224", "dagger": "8225", "bull": "8226", "hellip": "8230",
    "permil": "8240", "prime": "8242", "prime": "8243", "lsaquo": "8249",
    "rsaquo": "8250", "oline": "8254", "frasl": "8260", "euro": "8364",
    "image": "8465", "weierp": "8472", "real": "8476", "trade": "8482",
    "alefsym": "8501", "larr": "8592", "uarr": "8593", "rarr": "8594",
    "darr": "8595", "harr": "8596", "crarr": "8629", "larr": "8656", "uarr": "8657",
    "rarr": "8658", "darr": "8659", "harr": "8660", "forall": "8704", "part": "8706",
    "exist": "8707", "empty": "8709", "nabla": "8711", "isin": "8712",
    "notin": "8713", "ni": "8715", "prod": "8719", "sum": "8721", "minus": "8722",
    "lowast": "8727", "radic": "8730", "prop": "8733", "infin": "8734",
    "ang": "8736", "and": "8743", "or": "8744", "cap": "8745", "cup": "8746",
    "int": "8747", "there4": "8756", "sim": "8764", "cong": "8773", "asymp": "8776",
    "ne": "8800", "equiv": "8801", "le": "8804", "ge": "8805", "sub": "8834",
    "sup": "8835", "nsub": "8836", "sube": "8838", "supe": "8839", "oplus": "8853",
    "otimes": "8855", "perp": "8869", "sdot": "8901", "lceil": "8968",
    "rceil": "8969", "lfloor": "8970", "rfloor": "8971", "lang": "9001",
    "rang": "9002", "loz": "9674", "spades": "9824", "clubs": "9827",
    "hearts": "9829", "diams": "9830"
};

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
var hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};






/*

  The following are default values -- you don't need to modify anything
  below this line. Rather, see the index.html file for instructions on 
  how to override these, as well as a full list of template properties

*/

var _ReadSocial_UI_tmpl = {
  launcherHTML: '<div class="launcher readsocial-buttonbox launcherButtonBox launcherButton" style=""></div>',
  dialog:'<div class="readsocial-topnav">\
      <div class="readsocial-groupbutton-hint">#</div>\
      <button class="readsocial-groupNav"><span class="readsocial-groupbutton-text">ReadSocial</span></button>\
      <div class="readsocial-groupEdit" style="display:none"><input type="text" id="readsocial-newgroup" /></div>\
      <div class="readsocial-groupbutton-hint">Group</div>\
      <div class="readsocial-authstatus">\
        <div class="logged-in" style="display:none"></div>\
        <div class="logged-out" style="display:none"></div>\
        <div class="authbutton" style="display:none"></div>\
      </div>\
      <button class="readsocial-makeCommentNav"></button>\
    </div>\
    <div class="rule">\
    </div>\
    <div class="readsocial-viewContainer">\
    </div>\
    <div class="readsocial-noteListView rsview viewlevel0">\
      <div class="readsocial-posts">\
        <ul>\
        </ul>\
        <div class="readsocial-loadmore"><button>Load Older Posts...</button>\
        <div class="readsocial-loadmore-throbber"></div></div>\
      </div>\
    </div>\
    <div class="readsocial-noteDetailView rsview viewlevel1">\
    </div>\
    <div class="readsocial-noteCreateView rsview viewlevel1">\
      <div>\
        <div class="readsocial-selection readsocial-selfield readsocial-magnifier">[your grab]</div>\
      </div>\
      <div class="readsocial-publisher">\
        <div class="readsocial-formholder">\
          <div class="readsocial-postcontrols">\
            <div class="readsocial-tabgroup">\
              <button class="readsocial-tabbutton-msg postbut noattach">\
              </button>\
              <button class="readsocial-tabbutton-link postbut noattach">\
              </button>\
              <button class="readsocial-tabbutton-file postbut noattach">\
              </button>\
            </div>\
            <div class="readsocial-postidentity">\
              <div class="readsocial-screen-name">\
              </div>\
            </div>\
          </div>\
          <div class="readsocial-textentryarea postfield">\
              <textarea preview="[leave your mark here]" class="readsocial-magnifier readsocial-note" name="note" rows="3" cols="70"></textarea>\
          </div>\
          <div class="readsocial-linkentryarea postfield">\
              <input type="text" preview="[attach a link]" name="link" /><br/>\
              <input type="text" preview="[title of link]" name="link_note" />\
          </div>\
          <div class="readsocial-fileentryarea postfield">\
              <div class="readsocial-filedropzone">Drag and drop a file here.</div>\
              <input type="text" preview="[image caption]" name="img_note" />\
          </div>\
          <div class="readsocial-buttonContainer">\
            <a href="#" class="readsocial-attachButton readsocial-button"> </a>\
          </div>\
        </div><!--endformholder-->\
      </div>\
    </div>\
    <div class="readsocial-responseCreateView rsview viewlevel2">\
    </div>\
    <div class="readsocial-responseAuthSubview rssubview"></div>',
  channelBar:'<div class="navigationItem readsocial-channelBar"><a class="queue">Overlays</a>\
  </div>',
  notification: '\
        <div id="id{{ time }}"\
        class="notification"\
        style="top:{{ top }}px;left:{{ left }}px;"\
        >\
        {{ count }}\
        </div>',
  login: '\
        <div id="rslogin{{ time }}"\
        class="accountaccess"\
        style="top:{{ top }}px;left:{{ left }}px;"\
        >\
        {{ count }}\
        </div>',
  join: '\
        <div id="rsjoin{{ time }}"\
        class="accountaccess"\
        style="top:{{ top }}px;left:{{ left }}px;"\
        >\
        {{ count }}\
        </div>',
  noteListItem: '\
        <li class="li-noteitem textnote {{clname}} newpost"><div class="readsocial-note-item"\
                 data-note_id="{{_id}}"\
                 data-created_at="{{crstamp}}">\
        <div class="readsocial-profile-img-twitter"><img src="{{ uimg }}"/></div>\
        <div class="readsocial-notepointer"></div><div class="readsocial-note-body">{{ body }}</div>\
        <div class="readsocial-username">{{ uname }} <span class="readsocial-auth-network"> via {{ udom }}</span></div>\
        <div class="readsocial-group-name">#{{ gid }}</div>\
        <div class="readsocial-hilight-body">"...{{ hi_raw }}...</div>\
        <div class="readsocial-agentstring">{{ agent }}</div>\
        </div></li>',
  noteImageListItem: '\
        <li class="li-noteitem imagenote {{clname}} newpost"><div class="readsocial-note-item"\
                 data-note_id="{{_id}}"\
                 data-created_at="{{crstamp}}">\
        <div class="readsocial-profile-img-twitter"><img src="{{uimg}}"/></div>\
        <div class="readsocial-note-body"><div class="readsocial-listimage"><img src="{{img_full_url}}" /></div>&nbsp;{{ body }}</div>\
        <div class="readsocial-username">{{ uname }} <span class="readsocial-auth-network"> via {{ udom }}</span></div>\
        <div class="readsocial-group-name">#{{ gid }}</div>\
        <div class="readsocial-hilight-body">"...{{ hi_raw }}...</div>\
        <div class="readsocial-agentstring">{{ agent }}</div>\
        </div></li>',
  noteLinkListItem: '\
        <li class="li-noteitem linknote {{clname}} newpost"><div class="readsocial-note-item"\
                 data-note_id="{{_id}}"\
                 data-created_at="{{crstamp}}">\
        <div class="readsocial-profile-img-twitter"><img src="{{ uimg }}"/></div>\
        <div class="readsocial-note-body"><div class="readsocial-listlink"><a href="{{link}}" target="_new">{{ body }}</a></div></div>\
        <div class="readsocial-username">{{ uname }}</div>\
        <span class="readsocial-auth-network">via {{ udom }}</span>\
        <div class="readsocial-group-name">#{{ gid }}</div>\
        <div class="readsocial-hilight-body">"...{{ hi_raw }}...</div>\
        <div class="readsocial-agentstring">{{ agent }}</div>\
        </div></li>',
  noteListNoItems: '\
        <div class="readsocial-bigzero"><div class="bigzero-holder"><span class="bigzero">0</span><br/><span class="bigzero-sub">Comments here</span><br/><span class="bigzero-sub2">Drop some wisdom into this group discussion</span></div></div>',
  noteDetail:'\
      <div class="readsocial-note-item-detail texttype"\
           data-note_id="{{_id}}"\
           data-created_at="{{crstamp}}">\
        <div class="readsocial-note-detail-hilight-body">{{ hi_raw }}<span style="display:none">&nbsp;[&nbsp;<a href="{{permalink}}" target="_new">Permalink</a>&nbsp;]</span></div>\
        <div class="readsocial-profile-img-twitter"><img src="{{ uimg }}"/></div>\
        <div class="readsocial-note-detail-body">{{ body }}</div>\
        <div class="readsocial-note-detail-username">{{ uname }}<span class="readsocial-note-detail-auth-network"> via {{ udom }}</span></div>\
      </div>\
      <div class="readsocial-reply-button-div"><button class="readsocial-reply-button">Reply</button></div>',
  replyForm: '<div class="readsocial-responseFormSubview rssubview">\
        <div class="readsocial-textentryarea postfield">\
            <textarea preview="[leave your mark here]" class="readsocial-magnifier readsocial-response" name="response" rows="3" cols="70"></textarea>\
        </div>\
        <div class="readsocial-buttonContainer"><a href="#" class="readsocial-respondButton readsocial-button"> </a></div>\
      </div>\
      <div class="readsocial-responseListSubview rssubview">\
        <div class="readsocial-responsethrobber"></div>\
        <div class="readsocial-responselist"><ul></ul></div>\
      </div>',
  responseListItem: '\
      <li class="li-responseitem newpost"><div class="readsocial-response-item"\
               data-note_id="{{note_id}}"\
               data-response_id="{{_id}}"\
               data-created_at="{{crstamp}}">\
        <div class="readsocial-profile-img-twitter"><img src="{{ uimg }}"/></div>\
        <div class="readsocial-response-body">{{ body }}</div>\
        <div class="readsocial-username">{{ uname }}</div>\
        <span class="readsocial-auth-network">via {{ udom }}</span>\
      </div></li>',
  hashList: '<div id="readsocial_hashlist" class="dropSelector titleItem titleSelector" style=""><ul></ul></div>',
  hashItem: '<li val="queue" class="selected"><a data-name="{{ data }}">{{ name }}</a></li>',
  linkDetail:'<div class="readsocial-note-item-detail linktype"\
           data-note_id="{{_id}}"\
           data-created_at="{{crstamp}}">\
          <div class="readsocial-note-detail-hilight-body">{{ hi_raw }}</div>\
          <div class="readsocial-profile-img-twitter"><img src="{{ uimg }}"/></div>\
          <div class="readsocial-note-detail-body"><a href="{{link}}" target="_new">{{ body }}</a></div>\
          <div class="readsocial-note-detail-username">{{ uname }}<span class="readsocial-note-detail-auth-network">via {{ udom }}</span></div>\
          </div><div class="readsocial-reply-button-div"><button class="readsocial-reply-button">Reply</button>\
          </div>',
  imgDetail:'<div class="readsocial-note-item-detail imgtype"\
           data-note_id="{{_id}}"\
           data-created_at="{{crstamp}}">\
          <div class="readsocial-note-detail-hilight-body">{{ hi_raw }}</div>\
          <div class="readsocial-profile-img-twitter"><img src="{{ uimg }}"/></div>\
          <div class="readsocial-note-detail-body"><div class="bodytext">{{ body }}</div> {{ uname }} via {{ udom }}<a href="{{ img_full_url }}" target="_new"><img src="{{ img_full_url }}" /></a></span></div></div>\
          <div class="readsocial-reply-button-div"><button class="readsocial-reply-button">Reply</button></div>',
  noteListNoItemsImg: '\
        <div class="readsocial-background-nocomments"><img class="rs-nocomments-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdsAAABnCAYAAABIBeiOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAA3mxJREFUeNrsvXec5XV97%2F%2F89nJ6mbozOzPbD%2BwusCwsvSyIICiK2FESUZNYL8aoQdPuVWPEmBvM9d6okZiAP9MsiV1AkCZld4FdmIWts9PLmdPLt%2F%2F%2BOGVndmaRGDWi8348zmN2z%2Fmebzvfz%2Bf1eb3eTQiCgJ%2FFBEFgxVZsxVbshU4ZgAgogLzgrwxIzZfYfAnNF0DQfPnNl9d8uc2Xs%2BCv39x2xV4E9rNiz4vV5JWffMVW7MVnw8PDv9Lnl8lkREAFtNbrsssu6zn77LM39fT0DMVisb5IJNJlmmZa07SEruthRVFCiqLokiQpkiRJAF7DHMdx6o7jVOr1etmyrFy1Wp0rlUrThUJhbHJy8sijjz66%2F%2B67754ErAUve3h42P8VvT8rD%2FFv2mpzhdmu2IqtgO3PCVxlwACMdevWJV%2F%2F%2BtfvGBgYOC2dTm9MJBJDsVhsla7r4V%2FE8ev1erlQKIzncrkjc3Nzz46MjDz51a9%2B9ZGDBw%2FOA7Xmy%2F1VAd8VsP3NY7YrYLtiK7YCtv8VgFWaABt%2B73vfu%2F3UU089v7u7%2B4yOjo6NiUSi77%2Fz%2FHK53Njs7OyzU1NTe55%2B%2BukHb7vttseBchN4nf9O4F0B2xWwXQHbFVuxFbB9PpAQaPhXDSDy%2Fve%2Ff8fmzZt39vb27uju7j5F07TQr%2BL9siyrMjU19czExMQj%2B%2Fbtu%2Bczn%2FnMI0CpCbze8PBw8Eu%2BjytguwK2K2C7Yiu2ArYnZbGhnTt3Dlx33XXXDg4OXtLT03OGaZrRF9O9q1arxcnJyT1Hjx6992tf%2B9o377nnnhGg8stkuytguwK2K2C7Yiu2ArYngqwKRN%2F73veec9ZZZ72iv7%2F%2Foq6urvU%2Fy%2F5UVUWSZAxDR1EUJElClmXsehXHruN7HlatgihJCJKCa9WwvQCCAFnV0HUD13UpF4souo4kK3iuh%2Bt5P9P1TU9PHxgdHf3xY4899u%2B33XbbT4Aiv4TAqhWwXQHbFbBdsRVbAduFIBv78Ic%2FfOkZZ5zxqoGBgYtisVj3f2I2RRQFfNdCU2SiiRTJdCeCIC4PfJPj5Oaz9Pf3USqVKBfzBEGAZTmYpgaBQDTVQaVYxK7X6Ojtw7bq1GoVNCOEIAi4jotlOziO%2B5%2BazAuFwtTIyMiP9%2BzZ8%2FVPfvKTPwIKv0jQXQHbFbBdAdsVW7HfYLBt%2BmQVIPbBD37wwm3btr1uzZo1OyORSPqFfF%2BSJBRFBt%2BllM8TioSJxuLMz80iBh6qrpFMdxOOJRd9z3VdvvA3f0Wqo4N0Zzdnn3020xOj%2BIKIgEg8olOrWwiqQTGbJdXZharpFHI5FE3BsR1EUcQMhZBkGd%2F3cV2Pet3Csmz8FzjPlUqlucOHD9%2Bze%2Ffuf%2FrUpz51fxN0nZ%2B3T3cFbFfybFdsxVbsN9QymYwMhG644YatL33pS29cu3btlYlEYtULYbCarhEJGQiiiCiK1CsVXF1GU1Vq1SqhSBRdN6iWi0yOjWDMz5Ls7MEMNdy9jz%2FyEAEBiWSKtevWN8BYlHBsi3K5SC5fIhJPUC4V0QwDzTCplEtIskQoHMH3faxajXKxiKwoGKFQA%2FQDH6uUwwsgFIljWfbzVr2IRCLp00477bWrV68%2Bf8uWLd%2F7%2Fve%2F%2F%2BU77rjjqUwmUxkeHnZXnpIVW2G2K7ZiK8z2ZwVZkUbhifTnPve5t23cuPHVvb29p%2F607xl6FioVpOgpmKZG4HsIgoDn%2BxTn51A0DcMMUymXiMWTBIGPIIpNn2sez64RicZJd%2FXxr%2F%2F0%2F9HR2Un%2F6gH6B4dwbJv%2F%2BPq%2Fomk6V7zsGgQ8rHqdmalJ0t29SKJEPjdPNBZDFEWC1pwUQLVSxrUdYqkkpdw8nudQqVkYukEsouEFIvlSnYCfPodNTEw8%2Feyzz%2F7bO9%2F5zi8Cc4D185CWV5jtioy8ArYrtmK%2FQWDbZLPRW2655fLt27e%2FdcOGDZe3qjedlP2FpujqegIrazBbOJ94Vw%2Be5yIKAoIoUsrnEAKHAAnXCzBME1XX25OrIAgIgoBjO1SKORy7Tqqzm31795FMdbDl9G08vfcJntn7JL7n0rd6DSNHDnH5VVehKyqO61Ct1tqysR80YDMARFGkVi4TAKFIhEIuS8hQCIIAz%2FMxTKMBsUFAtW5RLFv4PO%2Fl4nme99xzz931%2BOOPf%2BkTn%2FjEXUDxv8pyV8B2RUZesRVbsd8Aa%2FpmNSD9%2Bc9%2F%2Fr2ZTOa16XR64PlBdoLu9FNIskXgiMxlM1QBMT9PJBqnVqvgOg66EaJeK%2BPZVWwX4snkIp9pEAQEQYCqqbhmmECQyGWzrBlaTTTRcA0fOXSQYyNH2Zg5ldmZSUKRCBPjE0QjMRLJOAQ%2Bsqw0JWGBoMlTXcfFcmxi8QSWZSEGPpqmQRAcB%2BXmuZi6hmN76KEo5WoNy7KXvW5JkqRMJvPSjo6OTYODg%2F%2F8jne847ZMJtNiuSu1mFdshdmu2IqtMNtlgVaiUfHp3IsvvvhdmzZtukoUxZPSu3Boiq7UXhS51nhDdKnM9JOrnc1Mdh5FVVFVFV3XKRZyxJNJAh9c18EMh1FVbXkWEwQU8wViiQSCIFAplyjms%2BiahmaGqNZt5mbncOw6x0aOUirk6ejsQtN0Xn7da5ifm8Ku15FVDUGUEUWBUiGPrGqYhoHrOJSLORRFQhAE6pZLyNQxDA0BsB2HfL5KoqOjxWApl6tYtnPSe%2Bf7vrd%2F%2F%2F7v3nffff%2FntttuexgoDw8Pez%2FDb7DCbFdk5BWwXbEV%2B3UF26ZsnLj11lvfePrpp7%2B1r69v68m21XWB7tSP0LUC7SY8QoBbkyjmLqbsxSiXy4RCIVRNp16r4XsW8XiUXK6AZkQwQyFEScL3F7s5RVGkXC4hiSK6ESII%2FIbv1Q%2FIZmdx6lU60p04ns%2FTT%2B%2FDdhx0VSGfz%2BN5HmeceTbrN51CuVSgVi0jiSKW7WBZFrF4HMdxcOp1zEiE2alJPM%2Blo7uXuclxNFUlFDExdI1SqYLtBZihCIqqAlDIl3DsGt7zyMtjY2NPPfHEE1%2F6gz%2F4g68Auf%2BsrLwCtisy8oqt2Ir9GlpTNpaBji984Qu%2Fv2XLljfFYrGuky2kE4k4nYkfQpClkQnUmiFdaoVBULuo5ubRNA3fD5BlBU2H2Zk84XCYrq40Vt2inJ9HVDSMJugGTdB1XRfPdgjFEwSB32KNCAioqkIi2U9xPku9WmXbtjPwApFn9u2lf2CI8dER4okEruvy71%2F%2FNyDg4ksvQ9dkfE%2BAIKBSKuHYFo7romoaoUgnVrUKgoARTVCrFjFMnUg0jGXZVCtFrJqMrBlgW3SHn6ImR8gVhgiCpaDb19e3NRKJ%2FOEXvvCF1W9%2F%2B9v%2FMpPJzNJodLAiK6%2FYsiau3IIVW7HfCKDVtm%2Ffvu7OO%2B%2B8dceOHe8%2BGdAahsHQ0BCd6TkIRhasxwUQPFw7RcXZgOM5CEGj9WzNqpPLZbHqNUwjxFw2z9TULACJZARV8qnk56lVKo1JRxCpV2tohnGcMAtCI2WoVkUSZSRJQlQUUj29zOfy5GanOeWUU1i%2FYSPrN55CR1cPx44eJplKMjg4xMGDB5jLFogn0li1Cr7nouoGpWIBRVGQZYlCbp5YMo1rW2iaQqlQol6toesqiUQETRWwK2V0eR4zPk5n5zADXXdjaLll72ssFuvasWPHu%2B%2B8885bt2%2Ffvg7Qmvd6xVZsBWxXbMV%2BA4HWvPHGG8%2B65ZZbPr1t27Y3KoqiLrux76IIPp6VBf8BjvdyB%2FAhADn0UhK9pyKKMrVqmVwui2Nb1Ot1SqUSumEQBAHhWArLEcjlGrmwyWQUp1ZqSs0uVr1K4zQEREGgXq1Qr1ZxLBsjFKJaLiPLCqqq0tnVg6ob5PM5srNTrOrrBWDvE7sRERg9NsL4sRHGRo4SisTp7Fnd8O0qEqFwGCMcIT8%2Fh6TIKIqGiIdjO1iuQM32mZvLYdVtDNMkGjEImweRTIfsjMWBg2P0dd5LMnFw2VumKIq6bdu2N95yyy2fvvHGG88CzBXAXbHlbEVGXrEV%2B%2FUFWhEw3%2FOe91z40pe%2B9ENr1669eLntBEGgWswRiydwahVc6T4wss3poaWKOiCcAsIQmg4dvQMY4RjF%2FCyOVadQLFOt1nBdh1A4gmGa%2BEGA5xhUqyXqdRvP9wlsi1qlgiT41Er5psQcBgQqpRJmOIwAOLZNJBaHIMC264iSSGe6F8eymZ2dYXZ6irPOOZen9z5FuqOTfG6ey668usEgJIloIo0ZjlLMz1OvlLDrNZKd3Vj1CuDhuB7RRBJJlqiWK1RqFpbtYwrjmOkpEGSycwVEMUBSRDpi%2BwgqEQpuN74fLHevX6aqaigajf7FZz%2F72fszmUz1V7Vx%2FYqtgO2KrdiK%2FZyB9gMf%2BMDlO3fu%2FODQ0NC5y20nigKqJOFrGrIoY0pjhBPTsCg4KADBAPmCRd8NR%2BOEo3HKhSyKOks2C7W6QzQaxfd9giBAlESi8ST5XA61GTBVKhYoF6vEIhKK5FHOz6FoJoqqoJsm1VIJVdeQJJFatcL8%2FDwdnV34vo%2BsKoTCEeq1GrVqmS1btyIrKtVqbenkpqgkO7qx6lVURcWp17HrZXzfRzUiSM3ALTMUwvNN8lNjJDufRTQC7IqHJEqsOyUBUkBtPoWs9dER0ZgvVHHcpTi6du3ai6%2B66ipV07RPffrTn75rBXBXbNFYW7kFK7Ziv3ZAK7SA9rLLLvvDkwEtgUfE1JnPzmKYYUSvQiRyEEH1wV%2BghAouTn0AP%2BhY9PVCsUy9bhGOpejuX0dPbx%2FdXZ0o6vGAKgHwXI8gCDBDIQQEYvEEnT2rcH2Res3CMBSsagFZVfE9D9dzMQyTAPA8H03TUVSVIAjw%2FYD83CyqohJPdeB4PsXcPJoiYdWry16mppuku%2FuIJ9Ooqo4gSOiGSdBi7QJUS2XC6gRGLA%2BBxMx0jWRCRdRE%2FLpArb4RWTMRhYB0zCCkK8sea2ho6NzLLrvsDz%2FwgQ9czoqkvGIrYLtiK%2FbrDbTvec97Lty5c%2BcHBwcHz15uO1mCWDSCbdvohoGIgKkeQ4vOg7%2BA1QoQOCrZ8TiTx45QKeXbH%2FnAcyPjjE7OULM80t39dPcNEPguVq0CfoAgStSqFVRFRRAaxSd830eWZeKpNKoZpVxxsB0fVdPxPR%2Ff87Esq1H1yXWJxRMNliyKVIp5ZFkmEo1RyDYk7ERHJ54fMHb0EJOjR3Gd5YtTGOEoqwY30NXTj2fXset1BEHAtl3capZk%2BhjIPvgByaRBImmC51DNdyFqqwGvfU%2BiYZV4RFv2OIODg2fv3Lnzg%2B95z3suXAHcFVsB2xVbsV9PoNVuvPHGbS996Us%2FdDJGq0oCeB6aplEqFNDNEJKXJxI7DJIAogitPHrBozzfTcntRNF1ysU8M%2BMj1KtlEtEwm9cP4rsO9z%2Bym5HJGVTNoKN7NdFYEs%2BpU6%2BWcB0HwzQX5VU2WKqPqmnEkmkiiRTlUhHbsYlEo9hWnXx2DkmWkWWpUQHK8yiXisRSaSyrjiyCJAr4foCiqoSicWq1Koefe4a56fF2mtGJFoo2gqgMQ8eqVSjNZ4kbY6iRIvgiBGBGJJB8vJqC5WQQVQ1OaGFgaDKJqH5ShvvSl770QzfeeOM2VqKUV2wFbFdsxX6tTN6%2BffvQtdde%2B%2BGTBUMFrkWlXCQaj5PPzSMpCmIQEDEPo4QrEEjMz9TxXQ%2BkAK%2BmkyusxvJ8qtUKoqwhaRq5%2BRmyM%2BP4nstA%2FypO25xBleU2wIUiMTp6V2OaIRRFxHPtFilcfD5BQNAsqRhPJKmWi1RKJaLxBOFoDCMUIggCBFGkWMihqCqaZmDVqgSAboYh8Cnl5yhkZ4glU5iRGFPj4xx57mny87NLQBIaQVSxZCcdXX0kE2EiqfHFs6EfQOBTzvcj6L0NVrtMBq2uSiRPArhr1669%2BNprr%2F3w9u3bh1iJj1kB25VbsGIr9mvBamWg4%2Babb%2F5oJpN52XLbJBNROju7CIUjVCplSsUiphFC9aYJJ8ZAkcnnLAqlOqIsge9TyQ9QcaKEQyaGaVApFamWK4iyih%2FA3NQYudlJetJxejqSCOLxKUUQRGLJTnr6htB1A0UW8X3vOGs%2BwWzbIvA9dNPE930kRWmDs%2Bd61CsVDDNEvVYlcG1ESUXVG5WrZFEkEk%2FiuS75%2BTl6%2BlcjaTrTkxOMHT1IpVRYfnWiKCS7HRSzyWrbM2OAU9Fx%2FI1ISuNeLF0pNF7a8wBuJpN52c033%2FxRoKP5G63YCtiu2Iqt2IsUaCUg0awMdf1y2%2Biq1Ogx67mkOzupV%2BvougmuTSR0BNGwsIo2s7NVenpDIPnYxSiFygCxVArN1LFqVTzPxfNs7LpFvVajbrtMT00yPX6YcnF%2B2fObn8%2Fx1Tv%2BgX179xEE4Fq1BgMWhAX4JVAt5lEVDVU3IAggaIYwCQLVUpGOjiSS6FOvFkFosFrf9XDtGoHQKPtYzM%2Bj6XoD9L2Aju4eVN1kbnaaqdEjWLUTg6gccO9fetK%2BT6U4iGR0QrDMAiFonzYCAiIu8Who2evfsmXL9V%2F4whd%2BH0g0f6sVWwHbFVuxFXuRAa0AhG%2B99dY3btmy5U3LFaxw7Rr1ZqlCy6ozNzOD7TTAVhPGCaemAImRo0XqVQfdkMEJKBeH8OUoiioT%2BAGhUBQzHCHwhUbxCt%2BjmM%2BS6uxBUgymJ8YZP3qQWqW06Pj%2F8bV%2FRlIUqpUKdcuho7MHVZYIXKcd%2BGTVazi2jRmJNnv4NIikAHiOi2VZWLaNoal0pBLIikytUmow1sBH1UN4rotdq5FIdVApFVF0tc1eI7EEgiQxNzNOdnrseBCVtxeCCRapvKKPVQrhsx5REliiHwfB8ZMDgsDH8wI6Onvo6elZ8hspiqJu2bLlTbfeeusbgfCK%2F%2FY301ZkjZ9tgSI2750JGAv%2BKjTalsk0EhUXlN%2FBA1zAaiynqQHVBX%2Fd5nYreXkr9p8x7b3vfe%2B5p59%2B%2BluXK8GoawqC5FOp1SgVC2i6Tq1SwQzFwC4RTx9GUDzwJCJhhd5VJgge9UKKfLULJdQonZibm6PoO0RiCaLxOIVCHrtWJdXZhawo2PUaiBKWbVOYn6NaLpBId3P48CEsu865F1yMJEn0rx5ganKCJx7%2FCaefuR3Rcwl8GcuqIckKiqa3ayUHgCgIVMplIvE4CAKFYglFFgmHQ7huE4RdkBSV3NwMoWisnW4UikQXBGUFKJqOoum4tsXE6AjxCEQTj7Aop1gAvIBqeT2imWyw2jaqtv65gI8LArZtYUSSSLJMLBajXq%2BTyy0u8RiLxbpOP%2F30t773ve999rbbbrsXqK88uitg%2B6Kwn1fz7BfIHmRABcIdHR3JzZs3DyUSiaHNmzfv6Onp2ZRIJLrD4XDMNE1d13VZVVVRURSh1YPb8zwcxwls2%2Fbr9bpbrVbr5XK5kMvlpiYnJ%2Ffv27fvkVwud2Tfvn1HZmdn54EyYP9XG1T%2FlGtaefpf%2FKxWBtIXX3zxu5br3qPrOoODg42I22KOaqVMLpdHFGVkSUYXj6FHcxBIgEBPXwykAL8OhfxaBC1CgMfc7DSaYeI5NtVKGTMURlVkrKqPgEgQ%2BKi6jl8sEI5E0QwDx7aYnhghbOgMrlnL5MQ4l7%2B0UeHp3ru%2BTygU4siRI5x7%2FsXkszNIgoASCrGERwoCkiw1KkpFoyiKglWvk8uXMXSZaDSCZdmUizksu44RClMuFjFMcxF%2BBjSCsQRAkFRcK4egPQLkmmvkVs6tTzWXoOr0ExEb6Pq83WmCAD8QCEVi7be6urqoFcap%2B%2BaiTfv6%2BrZefPHF77rtttv2AVPNBfaK%2FYbYi7bF3i8abJsVeHQgsmXLlsEzzzxzx6ZNmy7p7%2B8%2FI51OdyYSCT0SifxcZPhSqeTncrn63NzczOjo6J79%2B%2Fffu2vXrkf27t17FCgB9Z93JZoVsP21UFjin%2F%2F85z98%2Fvnnv%2F%2FEfrSSJDE0NIQsH19PV8sFsrNT2I6H5BTp7XkUNVpt5tU25wHRozq7itnCmRjxBIqmUq9UyM1nEQSRjq4uCCA3O4UWCiOIEp7noqkajm0TjsUaoCYIFHI5TNPANE3mc3l6%2BwbIzs7w3f%2F4OtNTk1x6%2BZUcOvAsqY4OLrzkMhyr2mj4LsmIktRu%2BF4pFjFCIaxaFce2CEVjyIpKrVLGs%2BuEwiZB4FGpe2iKhuu5J7DaBVxUECjlShjBITr6nkBQFmhJAgROQG5mO7Y0hGtX0XQTw9QAAc9b2rbW81wCZFJd%2FQsA2MPdczNH9BvwxOii7X3f9x588MHPvOMd7%2FgkkP9NVrJW%2Btn%2BhoNtky2EgY4bb7xx56ZNm67atGnT%2Bel0Op5KpeRf9HUHQUA2m3Xn5uby%2B%2Ffvf3D%2F%2Fv3f%2FfKXv3wPMEujUbX7c7rOFbh6cZtxyy23vPyqq676VDqdHjjxw4GBAQzDWO4Jo5gv4pfuId49DMFCX2WAW1WYnz6XutRFOBZu%2BFQFEc9zKWRnUFQFx%2FYQRIilOhFFEddxyGWzxBJJFLURQVytVfE9j3Akiu95BL6LEAjUbZtdux4nHovx8AM%2FplIuc8XVL%2BfIoYOcdc759Pb2NLr2BAGuF1AplzFNA0XVcOsVTEMlV6gST3ciCAKe61KtlMB3gIAAmXgyjR%2F4xyfzZqCVIAjYloNVmKUz9QhG8oQCHqJHdbaTenApiq7jug6FfJHxyTmSiSir%2B3sa9Z2b%2BxUA27ZRzTjReGrB6vk52H0TNWUNI8k%2FXPILzM3NjXz3u9%2F94Cc%2B8Yn%2FoOFGWgHb3wBb8dkuBtko0PehD33ot0499dSrV69ePZhKpdSF7OAXvvoRBNLptJxOp9Pr1q279txzz73qsssuO%2Fr0009%2F%2By%2F%2B4i%2F%2BPpPJjAHFX6TEvGIvinGb3r59%2B1uXA1pNEXHqFXRNW5SK06Jv0bgJofnFeq1AI680N0CNZIPNtbAKqFbKxGIRNF2lVCxjOcEJmTA%2BnuuiqAoBYNUtYrEYge8jCAKCrOK6Lqoic%2BkllxBJpAlHouzZ9Sjzc3N09%2FTy1X%2F8Eq%2B74bfInLqlkW9bLiLHY6iaTqlYQBJ8qrVGQ3irVsGqVjCjMSKxOK7rkZubwvcdvLkZQEDXdRAEVFVtMGWgVq0S1cYwovNN%2BbxNO%2FDrEjVrI3LYwPccJEki3ZEimytw4MABXNdhdX8voiThex6IAp7roRsnRCFn7we%2FiuEeIVn9AfPmFYs%2BTqfTA9u3b38r8DAwyYqcvMJsfxOY7QImu%2FqWW2753W3btr2yv7%2B%2FKxqN%2FkpFaheLRX90dHR69%2B7d3%2FjEJz7x%2F4Bj%2FxWmu8JsX7xjFoh%2B7nOfe%2F9FF130EakVGNA0RZGJxyI4VhXfdYkluwhFFkuZeA%2BBdzeNWL4Wq%2FOx8jqF0iVUXJ1oPIEgiRAEOJaNUy8Ti0caDd4FqFUtanUbzQhhW3VMQ8FxHFwXAkFAlGTCkcb2J84bruMQuA6ypiOrOg%2Fceze%2B55Hu7GTs2AiveeONzGezDD%2F9JGvXrUMSIBAlHMvGcx2MUIRaKUc4rJMv1oglO6hXK9SqVYxwiNzcHKIoIokSgiQhSSLhcJRAELALE3R3PooaLTXAtjX%2FCR7F6X5c6SIkRTwecdw4aTzPY2xskmKxyNDgANFoGN%2F3seoW6Z41iJLYZtHs%2BR0oPgFiI%2Fd2JPFhasqaxT%2BB53k%2F%2FvGPP%2F7Od77zM0CRZUtmrDDbFbD9NQDbBT7ZVTfffPON55577o2Dg4OrIpHIC74wWZYxDANN05oNqhuRm5IkIYoiYpNV%2BL6P7%2Ft4nofnebiui%2BM4WJZFrVbDdV84XpZKpeDo0aPjDz%2F88Jf%2F6q%2F%2B6svAOD%2BDT3cFbH%2FhgCjRiLxRmy%2B5%2BWpFsy9IHiHgeCR6K2rdAezmX4d2CQXUG264Ycdv%2F%2FZv%2F9%2Fe3t5TTzxwOhlDkqTGDj2P%2BdkZIpEQiY5udCMMQRGc20GxG6fheI3dCiKl7LlU7R4CXGzbR1J19FCIciEHvossy4RMHUmSQADP9alUqo1awdEIBAF1q052vkxn7yqEps91uZsjiCKlQh5FlpGaXXueeXovGzZmWLdhE9%2F593%2BjVCwQiye59PIrKBVyuK6Dqhk4jkOtVECRJQRFQ5IVpiYn6OjsQhQEHNshFI2Qn8%2Biqjqe51AqlQgbEaLKPpJ9z4EgYVccFF1CkMCtyORzF6FE%2BiBwF0QeH5%2FvJFGiWCpjWXUUWUI3dIJAIt2zQFyojsGu3wK%2FBoIEAdhyB0eSf0ogLG5eMDEx8fTtt9%2F%2Be3fccccjzd96BWx%2FzeWo3zhrstnUtm3bdrz73e%2F%2BXxs2bDg1mUxKL2QBYRgGhmGQSCRQFOUFHa8FwCfb3nEccrkctVqNWu35XTiRSETYvHlzX29v74e3bNny8r%2F5m7%2F5o927dz%2BSyWSyK9LyL18ZaT5PQnMsaTRTwd7whjesyWQymb6%2Bvk2xWGwgEon0apoW1zTNlGXZkCRJEUVRDIIg8H3fdV3Xtm275jhOqVwuzxaLxbG5ubkDIyMjz953333Du3btmqORLmK%2B5CUv%2Ba3lgNZzLLKzM8QTSVRdbzBNx0HXJArz01TFAonUkwhShYkDeRRVpmMwDXYFhLOJdF%2BAXClTLc0jCHU8z6KcqxH4HpKqIyoa%2BWIZXZExTB1JlojFIwQBTcYr4AeN6Pvi%2FDyaaaJpDTk6WEDcAgQ8x2nURtYNPNchFg1z1lk76Oju5Yldj2GaYQgg3dnJF%2F%2FvZ3nb772PwHco5LMEgUAolsCqW%2Bi6yez0JOFwGEVVyc3Nkm624yMAM2SSy%2BUIfBHRzRLtGgVBYORICcty2LApAYFLtTiEZPQ0U31gUVi00GCsnucSCZtEwia1eq3hTw7FF%2F8ItRFwyyDJbXla9WZJ1O5l3nzJok17e3tPfelLX3rjHXfcsR%2FIspL2twK2v0Yg22Kzqz%2F2sY%2Fdsm3btlcODQ1Fftr3dF3HMAw6Ozt%2FIYxeURQ6Ozvbq72ZmRlqtRr1ev2kqkIqlZLOPffcrd3d3Xfs3r37Gx%2F96Ec%2FkclkjvELiFxesZMCrNQE18grX%2FnKofPPP%2F%2BCNWvWnNfZ2bk5Go32qKpq%2FFeP4%2Fu%2B%2F%2FrXv34%2Bl8sdOXbs2JPPPvts2TCMl%2BXzeQzDQFEURFFEkWViEZP8%2FDxTExP0DQw0omcFsB0PXQ%2FhFJ5E6NjH6IF5fvi13UiyxPlXZli3eQOBcC4CYITCGKEwlWKeaimHLLvUagG6GUGWJVRNo16tUihWEAjwgXDIQFUVAj%2FA0DQS8TDZbB6rXkfRNMKRCHJzodkIuIJKpYKmmw31R9Vwm0FUudlJ0h1php%2FZh2PbVMpl1q7bgKbrgI5mhCkV5qmUiqiagiiJSLJCrVojlkhimGEqlTKO7aAbBpIsY1sWMpCIjiKHqgSeyPxcmVQqBGKAXTBx%2FI3IstgA2%2BAE3QGoVOu4ftC4Rl1B1w0EQUBWT%2Bj8U3oWAqspZtDeSWf5X6iqG6jLi13sa9euvfKDH%2Fzgdz71qU99h5Xc2xWw%2FTUC2ug555yz461vfesnTzvttK3P55cVBIFwOEx3dzcnuMV%2BsfqjINDV1ahN4HkeU1NTlMvlk0ouQ0NDkVQq9abOzs4tX%2FrSlz78k5%2F85JFMJlNcAdxf6HOkApFLL7108JWvfOVVGzZseGlXV9dmwzCiP%2B%2FjiaIoRiKRdCQSSa9evfqs888%2FPygUCkI%2BnyebzRIKhQiHw%2FR0d6AbBolkkvn5LACmaSLLMnNzc3TGLCKxQ%2FiBj111qFUt0t0xpo7Nsm7rjQgsPvVQNI4ZjlIqzuM48%2FiujS9qCIKAGQ7j2Cr5XI5oPE65WkGu1jHMBugKgkC6qxvX8aiWS%2BRsC03TCTVB17FtQEDTtbbMLIoigqpjOza6prDzsstAkHn4gfvYecXLFo2PaDxFKBylVJinVikTjUWZtepMjo0SicbQdB0%2FAE3XqZYrlIplehMuofgoiBL5bJ2OjjB9g1FwbaqlIUSjo8lqg0ZpxgUychAE2I6HZobxXAfHsdF1jcAPkE8s2FU50pCP296B44DbXbqDo4mPLNo8kUis2rZt2%2BuAB5tS8sq4XQHbF79sfNNNN73pZS972YcymUzn8zFUwzDo6%2Bv7pYLsyeTnVatWNYMzxk4qMUejUfGCCy44PZVK%2FcN3vvOdv%2Fi7v%2Fu7O1dk5V%2BYKhJ%2F97vffc5FF130pqGhoYvC4XD6l3kegiAI8XiceDyO7%2Ftks1nm5uYg8Eilkji1OpForFF3WBRxHRchAFU4iB4vEQQS46NZLnzpZjwCMqeuo1LoxowGS1QbQRSJxtOEIwmK%2BSy1arld5cmq1wlHwmiahqqq2HWLYrmCKlu4rkcgChC4mIaCh4zruOTm5jDCIeq1GpqqNfNxxQUVowIURSUgQAwcwOO8iy5a1Iy%2BPTZkhXiqCzNcp1yYJxoJMTs7R24%2Bi6wodHR2US6XGB0ZIR6JkowfQdRtPEtgZrbO0GAURJdaLorHRhQpaMZKCQvxsQ3woiCgKCqu4%2BA5bjN420eSFk6hLlQPgSCzWItugK5uHyVs76Osbl50LWvWrNn54Q9%2F%2BNJPfvKT31hhtytg%2B2IH2lUf%2BchHPnDJJZfc1NfXZzwfyJqmSUdHx6%2FUNUiSxMDAALOzs1Sr1WVBVxAETjnllM5oNPqx7u7uoY9%2F%2FOOfzmQy4yuA%2B3ORi3Ug8aEPfejyCy%2B88KbBwcFzJElS%2F7vPTRRFOjo66OjooFwuc%2FjwEQLfoyOVxrZt4okEhUKRuOEQS4%2BBrLD7%2FgPksxUOD0%2FylvdfTm1uiIpTo1I%2BQiiaWlQJqX0cSSKe6iQcjVPMZ6mWCthWnXi4o9kiL0DTNVRdw6rVCbwqvlsnEY9SrVtNf2kAkkipUEDTZHRVpJybR9ENdMNsFJQIjgOTrGiNpgIKzIwfIRLvwAwvFQ5UTSfZ2YsRiiBJMqViAdv1yc7MULfqhEJRUuESRnQSkAgCn9W9BqohEdge9ep6JDNG4LtLu%2FosGFuS3Cj84XkeahP8g%2BZv0LbaFNjzTWZ7ohbduK6uyj8tAdtIJJI%2B44wzXgXcs8JuV8D2xTQ5LhqLQP8nPvGJj1944YWvTqfTy16v3Kxp%2BosC2bm5OXzfb%2Ftlf1Zrnd%2Fs7CyFQmHZKOa%2Bvj7jyiuv%2FN1QKNRxyy23fCSTyYzSKP248rT%2F50FWBuLveMc7zn%2F5y1%2F%2BvqGhoQul%2F4TcYdeL2NUcXR0JdFVgdmYSx7Ho7enG8xwIAiRJplqtMZ%2FLN7q4iTI%2BEqISwginEOTQCzpWOBwmHA5TKpWYnJ4mVq%2FheT74HonwMcbHD%2BO6Aj1dUaIhjapVo5qVsdz1SJqGLPlUirNUy3kisVSjT%2ByJ40RRSXb0YFs1Svl57FoFWdWRJLktB2uG3gDdeo1CqYpIo0h%2FPB7Ctl2qgk8iEUOWZVRVoVqtUSzU0I0wqqY1%2BaBAvV5DFgN0wyCfr%2BCTpVopEU%2BmkRVt6UI5FGFVKEK5kCOXnUEQJQwnBI5NPP4UguaCLyErIrKqQ%2BBSyycJ5DWIot%2BAtxMikNsWBDiOjRoEaKpKvVpCFKuIooSwkNl6VfBtllDj1v8DD0WyiEjPUfI2LPp0YGDgove%2B973n3Hbbbd%2BnUT99xVbA9kVjKjBw6623%2FuUFF1xwdTweF%2F%2B7JGPXdZmfn6ezsxPHcRo5gP%2BF43V0dJBMJk8qLafTafnSSy99za233mr%2BwR%2F8we8DI%2FwGphb8FyXj0Jlnnrnm5ptv%2Fv0tW7a8WlVV86d9z3Nq2LUcUcPF1ET27H8cXddZ17cNXdfJCTbVeglV7qbueo0AGwlURSARM6lUKoBDENi4dgmpXkTTdKZm5smVBTp7BzEjz78gjEQiRCIR8vkczx08TG%2FERl43ysHHJynO1cjPl0n3xrn4qlPBylC2dKqFLJGQjmlqiBIU5ycpF3WiiTSqZizDJg1SXauo1yrUq2UEUcBxPQShkZ8qAIYRQtV0rFoNkRqu62MYGqGQcTx6WRSIREI4rku1WsGqVTFCDdC1rBpRU6daqaIaIQwzhG3XOXroORLJFPFU5wkSbnPREUtgRqKU8vMUcnl0ZRw9loVAPE4whQDfEqjXNyKFw41Un0Xgehwri8UKgiRiWTZCqYQoy6hmBMeuoKkKi6pkelajkpUgnBy5NYlu5QdLwDYWi3WfddZZrwAeaI7VYGUk%2FnrZr2uLPRno%2F%2FSnP%2F2XF1100UmBNplMMjAw8IKAz2mmKpxoy723ZHxpGjMzMxw6dIj5%2Bfmfq7ScTCaX%2FTwej4sXXXTR1Z%2F%2B9Kf%2FEuhfaVz9goFWATr%2B9E%2F%2F9M1%2F%2Fdd%2F%2FY0zzzzzzT8NaE3FpjS1m%2BzIgxSm9iFjtVNIBEFY5AttPS%2BqqiJJEn6z%2FJ8oiu18bUVRGlWPRBEIcO0KB%2Fb9mJFn7uHA7q%2Fz7FMPMD1x9HmvIx5PsGbNGqq%2BzdGJWbZddCqe55PojHLVG89HCToo1QapWxYCAcgalZpLqVRr5IyLPvNTx5geHzneju4E040Q%2BWKZ4X37UBQFz7UbDFcQ8AMfURAwwmFCkSR1OyA7XyJfKDX8yM174gcBsiQTjYYJmSpWpUguO4csBgQEOF6znV8Q4DouCBJWvcb0%2BAjlwvyygYOiKBFLdtDdN0CicxpB8iBYCHwelUIXqIPHFVthMQltdi7A8wOMcAxND6FqGr7vo6laY2GBiCQuM7UELA%2B0ggiiiuQWMNyxJR%2F39%2FdftHPnzgEWtSFasRWw%2FdUG2lV%2F%2Fud%2F%2Fonzzz%2F%2F6uUijgVBYGBgYImsGwQBtm0vO4BLpRKHDh1qFyOfn5%2Fn0KFDTTby%2FBaNRrFtm4ceeohIJPKCWe0LKXbR2dnJwMDAsilJ0WhUPP%2F886%2F%2B8z%2F%2F808Aq1YA9%2Fll40wmYySTycGvfOUrn77%2B%2Buv%2FOpVKDZ70C75Dce4wkeAIKbOCZ5cRRRFZlhv5pr7fLmyiqmr7%2BWrlWu%2FZs6f97DiOswSYRVFEEBodZ3zfR1EU6vU6%2B%2FY%2BxQ%2B%2F9Q%2F830%2B%2Fn%2F%2F98Xexf%2B%2BjJx%2Fcoki653Tmsxdz4LDI2S%2FZjCyJ1IsVKuUN2OhopokZiaCoKkYojKKFKJYt6paND1SrNUYOPUt2emzJwtJ1Hb7%2BT3cyPT3NTx54kFAoSuDaeC1wFoRGuUZRIByNEkumUbQwpXKdUrGM7zVycwMafl9VVYjFwoRNhbBpUipWMcIxBAF836NarRKNx9DMMJKskc%2FnmB4%2FSq1SXF7aUmdQzNklZRm9moxlb0JSteNgu7BiVBMxBUHAcWxyc1nqtRquY6MoCkHg4%2FsBQeAvLofplsC3GqC6GHmblaoEkHR82ybiTy85366urvXXXXfdtTTSyVZsRUb%2BlZf%2FUh%2F5yEc%2BcMEFF1y3HKNtMcLWBHgi2M7Pz6MoCslkchGAGYbBzMwMjuMQDofZt28f%2Ff39jaR9Gmk6JwNRQRCwLItEIoFp%2FlQ1knK5zPj4eFsu%2FmlmGAZDQ0OMjIws6UwSj8fFCy644LqPfOQjMx%2F%2F%2BMc%2FlslkZlkJwDjRty8C4euvv3777%2F7u73561apVZ5xUURB8TNWB%2BgRT8wc5UpQ544wz2p1uWgDbYqstl0ELMD3PY3Z2ltHRUe666y4uuugiuru7CYfDbYBugXVr0ed5HkEQ8MwzzzA%2BPs7U1BT1ep2ZmRkOPvsBYvE0r3zDuznr3J3Ls9zEAFY9zbMHf0Tm3DXU8wkCeYh6pUo0nkQ3DFzXxXNdJFlEN8NkZyYxTINEugvbsshl5yjMz5Hs7CGe7ARB4PFdjxFJphAVhe0XXkwoEqNWq1OtFDHNRoELUZYboNuUl1VNa8jEtYZPV1UkQqaBIB5vZaepaqOmsaZQKxUQIjGseh1JUVAUtXEvVRVBFPB8n%2Fm5GdRSgViiA1XTW6shcB84IeeVRgu9Qh%2BStopGsa6W4iucOGhBENBVhXrdhiDAjERxLIuZyUlkRUDXTwgmC%2FyTS9Kt3asiFH0EI4aHiHTCUBwcHLwE%2BDxQ%2BXUfp7%2FIKoS%2FitWpft2YbfSmm256%2FSWXXHLTcsFQsiwzNDS0LNC2mABALpdbsoo3DIOtW7cyPj7Ol770JeLxOJs2bWrva35%2BnvHx8fb2%2BXyeUqkEQKFQoFarsWXLlp%2F6UMzOzvLII4%2FgeR6RSGTRduVyGdu2T7KKV5e0VGtZOp2WL7nkkptuuumm1wNRVmwRfgLxD3zgA6%2F8wAc%2BcOfzAa0uVVm%2F8RRW9a%2FB8zy2bNlCIpFY9JsIgoAkSW1W2mKyLQAdHR3l%2F%2Fyf%2F8P%2B%2FfsJh8OMjIwwOztLpVKhXq8vUjNak1G1WmVkZITR0VEOHTpELpdjZm6embl5bNtmdmaC2z55M%2B%2F%2FvVcz%2FMxTy567pofo6buGsbEMI6Mp6p5AtVqlXCxiW%2FVGYQxVRZZVSqUituOgaiZBECArCqmuXvRIgtmpSY4c2k%2BpVODAt7%2FJhvERwj%2F5MaP%2FcidHh5%2Fm%2Bz%2F8Ho88%2FDBWswxk4Dm4toWAQNDsDRsEAbppYoQilMp1CoUytVq9gUmC0O49G4mYhEMapUKWcrlIJBJpL2ocx6ZUzGNbFopq4DguM5OjzM9O4LpAcBCCQzQqZrYGeIBT0XC8TYiKzPO6RQMI%2FIBYPEp3TwdmSMf3fVzPwzAUYpEwgnhCSpJXO0E%2BDhb4b5sAroDthvGUFFV%2F6Vjt6ek54%2F3vf%2F%2BOxSe%2BYivM9leLqejpdPrUq6%2B%2B%2BiOrVq0ylmO0g4ODy4JRC1gFQSASiZDL5SiVSsTj8UXbRSIR6vU6XV1dnHHGGYvKL4ZCIZ566ikOHTpEJpNhbGyMwcGGCjk3N9f2Dy8Ez6NHj9LV1YVpmliWxcGDB%2Fmnf%2FonOjs7Of3007Esi2q12gbyVCrF2rVrT%2F5jyjKDg4McOXJkCcNdtWqVcfXVV3%2Fkm9%2F85uNzc3O7%2BPnm8y2sBaw1qYTC8VrArbV9K7djYQ1gm0b0pd38%2Fy9zSSoByU984hO%2F9bKXvexPNU1bVnaoFGfpCNeZn5nEintoHWcRDjeidTVNa7PXIAjaz1cLNFsst%2FVqvffbv%2F3bHDp0iMnJSSzLwvMaAVOu67aZcKuW9pEjR6hUKliWRaVSIRaLUa%2FXyVcC3GwRUxMxDIORw8P84ftez9vf%2BSGuftWNy15wqvMcpicnyD93iFA4RL1ew5m1MMwwge9TqVQQRIFEMo0RCrfHRkAjMtgIhSgXizz2F3%2FKRbkZetJJ1IjK7PDj7Ln7O5RPOYPImvUcOvAsB54d5upXvIqQaVAuFZEVDVFREILG81%2BrlEmkUoiSRK1cxrLKGIbaLvHoewGqphLxfSams9SrVcxQCFGSqJbLhMNRbMvGdmxC4QhWvcbY6ATd1Tk6uh5uNlIQFg50qoVBBKP7OKuF5SOQhcWLYakZCCXJMrquoxsarnfCF93SAoa8MEBKaB0eq%2BqCGMZXEpTLAZoqoIrHH3nTNKObN2%2FeCfyIn29UcqsYi958tep1Cyypl3WiBk7QvGGtet215rn9ssfrCtj%2BCgCtDKz%2B5Cc%2FeduGDRs6liTnN320J2uVZ1kW09PTeJ5HoVBg165dJBIJrrnmmkabrqY999xzjI2NcfXVVy%2FpFWqaJlu3buWRRx7h85%2F%2FPEEQ8Ja3vIVEIsGTTz5JOr249kE%2Bn2dsbIx0Os2TTz7Jrl27iEajXH311QRBwN69e9tg3mJO4XD4p9ZjlmWZgYEBjhw5srh5tiCwYcOGjk9%2B8pO3ve1tb3sDcPi%2F0DGolRbTGrzmq171qsHTTz998%2BrVq7emUql1kUikR9f1mCzLpizLiiAIEuC7ruu4rlu3LKtYKpVm8vn84fHx8X379%2B%2Ffe%2Fvtt%2B8Hqs2FgAU4w8PDwS%2FomZGA5Gc%2B85l3XnHFFbecLG%2F2R9%2F%2FZ6zCUbZv385HPvIRbr75Zl75lrOQJAlZlonH423WurAGtuu6bR9s63ewbZt6vc6VV15JR0cHtm3j%2B37bz9ta%2BLW%2BEwQB1WqVYrGI67rk83kkScIwDFRVJeRZVOoQDcltF4YmB3z17z%2FD%2Ffd8k3d94C%2FoH1i%2F5Jq6enqZn59vstcmCFXKlEtlRElElhWU%2BHFG3uoHGwQBoqww%2FYPvsH52nP7MRo5MzXLP0we56cKzuDwW5et7HiG05XRO2XoGz%2B0fplqtEY7E6OkfIp%2BdwbZqSIpKrVJrFMhQFIIgIByP4zoO1UqJer2EaejtYha27aDKCvn5eUrFAtF4nFAkTK1SxfM9ouEE0FB%2BNFXHkJ9EkOYgWMhqfeqFMA4bUSWBwF9KQhFOlvsDfuDjex6yLFOreyyvUgacWDXq%2BAAMGM9K5Ooe6xIhfEHCRSZveXQai3fW29u7g0YnsuLJpOSflsq3oNJZCDAB4w%2F%2B4A%2FOPuWUU87v6ek5LRwO95qmmZBlWRNFURIbsp7Qeg6bz58fBIHveZ5jWVa5UqnMZrPZg6Ojo7t%2F8IMf3Pvd7353rAm8ZaD2y8zpfzE2UnnRd%2F1pPlTpj33sY7deccUVN0QikSXSeCqVet4c2lZqTrFYbDVv5%2F7778c0Td7whjeQTCbxPI8777yTUCjEtddeu0giPFEWfuyxx9izZw%2FVapWBgQEeeeQRXv%2F613PGGccVyoMHD%2FL0008DsHfvXs444wyuuuqqtpRdKpXakllLTq7Vau3uQj%2FNZmdnyWazS94vlUr%2BD37wgzs%2B%2BtGP%2FgEw958p69i81xoQe%2FnLX752586dF3Z2dm7u6uramk6n12iaFvpZf0%2FXde18Pj86OTn51MzMzNNPPPHEQ1%2F84hefAgrNgez9goD2o9IyOSTlUp4v3PZRnn16NxdeeCFvf%2Fvbeec738lll13Gy1%2F%2Bcg4ePEg2myUcDvOSl7yk%2FVvKskxfXx%2B1Wo0DBw6QSCTIZDJ4nse%2BZtRuX18fruu2F3kNyTTS9tm2gNP3fe6%2B%2B26eeeYZqtUqY2NjOI5DLBZjfn4e13UpVR3ChoztuDgeREwVRWmUTPQ8jze%2F%2FcPsvPI1y96H7NwcguDT092FXbew6lUikRC6pgECluOhm6GmH7QhidZLJcY%2B%2FWec3ZmAkMlXH3mSR0Yn%2BOAl59CTTjA7Nsm96QGkTRkEx6VWqxFLxFnVtxpF0%2Bns6EAWA0rFAmY03k6dKRULyJJMKBzGsizq1QqS6BMKmQgI1Kp16raL4%2FnUa1V0TScSi6HqjS5EVr3GzFSW7liJVNfDiGpwnNUKgO%2BRn9oK5hmIokfQqKKxFCuF5ee6cqlCsVwjQEBXJRKJCF4gk%2BpcdXzDw%2F8XRr4I0jLDQPA5MGtQMTvYkFxDoftGHp9RyFd9zuq0T1z8V770pS%2FdcNttt32Hk6TsLQe2zUWw1gTq6Dvf%2Bc4zL7roouv6%2BvrOjcVi3bIsqyddTfwnzfd9z7Ks8tzc3HPDw8Pf%2FZ%2F%2F83%2F%2BSzabnQdKQPXnOV5%2FFrD9VfTZ%2FjowW33btm3nbNu27brlgNYwjJ9arEKWZTo7O9vRyevXr2dgYIAvf%2FnL3H777bz1rW9FEAQef%2FxxTj%2F9dA4cOEAkEmHVqlUsx6LPPvtszj77bD7%2F%2Bc%2FzD%2F%2FwD1x99dWccsopi7Z76KGH%2BMlPfsKOHTu44YYb2pJza5LVdX0JmJ%2FIpp%2FPOjo6lq02FYlExG3btl23bdu2f9u9e%2FddTSb5QlisCcQ%2F%2BMEPXnLBBRfc0NfXd%2FbPsxawLMtqOp1em06n1wKvuvjii63Xvva1ex9%2F%2FPH%2F79Zbb%2F1WJpOZa66g%2F0tst7lgiH384x%2B%2Fsclol4yB6ckRPvsXH2By%2FGgDlLJZHnnkEVRVZf%2F%2B%2FQwODrJ7924cx8FxHM444wxkWcayrLZs3AqYazFU27ap1Wrour7IxxsOh9u5157ntWVbURTZtWsX3%2F72t%2Bno6KBUKrWjlltSczgcxvOyjbS0JrDIsozv%2B9RqNSRJ4guf%2FVMOH3yat737T5dKyuk0MzPTjI6OsnbdenRVIpmKt59jzbapVMpY9SqGGUELmdRyOSSrDqpCMV%2FkviOj9EVC%2FPu%2B5%2FidS88F36M%2FGSey6RSyU5OAQKlUpJDP8ZMH7%2Bf3b%2FlTPNclly8iCSJWvYaqGQgIzGdnG511YnEUVcWq1SnkiySTMUJhAztfRhVlBHQ8z2dudgbdMIjFExTyBUKaRCTyHKLmgb8gWFH0qM0n8KX1iEKA6zQaNIiiiICwDMNdCryapqLbjUIkuqE3lYwTcCvwoAXiy8jJobBCJCrgCGEQFSwXHF%2Bg7gnoUrDgWFro1FNPPb8pJdsv4JmWWuPzDW94w9brr7%2F%2BbYODgxcZhpEQfkGsSBRFyTCMWH9%2F%2F1n9%2Ff1nXXbZZR%2BenZ09%2BMQTT%2FzTzTff%2FNVMJjPfZOa%2FMHVqRUb%2B5crHIrDqXe961%2F8cGhpaUvJG1%2FVFftLWiqcl3z0fePX09PCe97yHr371q9xxxx10dnYSiUTYsmUL4XCYWCyGIAjtSTQcDrcZieM4SJLEq1%2F9avbu3dvIzWtGLfu%2Bzw9%2B8AO%2B9a1vcd111%2FGKV7xiSYSy67ocPny47WdejkG3Jt7nk5UHBgY4evToku5BQ0ND4Xe9613%2F86abbhrOZDKHTsZum4M4fOqpp67%2BwAc%2B8I6BgYGd3d3dGeGXIGvIsqz19%2Fdv7%2B%2Fv337RRRe9d2xs7MF%2F%2BZd%2F%2BeK%2F%2Fdu%2FPZXJZIqA%2B58dxM2FQ%2FgDH%2FjA1VdfffWfLScdV0tZ%2FteHfwtVkejo6GBiYgLLspifn0cURY4cOYJpmoRCIRRFoVqtMjExgSRJ7ajhliLRCpbyPI9SqUS1WiUWi2FZ1sJJa1H0cUvZePrpp3nooYca7LVUavt0W%2F7dZDJJrVbDa0qbqii2%2ByS3pNlK3UOV4Qff%2FmdGx%2Bf4sz%2F%2FmyX3pLOzi6nJCQ7sH2bThrXtY1TKVcLhEPFYBMu2qVYKOLZF1apj%2B41yS3cfOEqHoTPYkeTxo%2BOUiiVc20YwTZKJGB3JBKFInLu%2F9y1GR0Z4%2BSuvR5ZlfvidbzIxPsG6jZu44MKLmJkaRzc0JKkDSZbbkcsIArIiI4oipXIFz4OQKSOLAYoZJfA8ivkcE6PHkGSddDKLHjkx1Qd8S6Ba3YQSiVCqlPB8gSDwUWWxWWQjWKr8CovnDEWRSaUTbfh0LGvRYYBmgBQnRDYLbcz1rYCoaFETIzi%2BhON7CEDRFtGNxUSwu7v7DBopQIWf4j4LAelPfvKT119wwQVvTyQSQ6Io%2FtIDXyVJUru7u0%2B58sor%2F%2BzSSy%2F94OHDh%2B%2F5zGc%2Bc%2BsDDzxwIJPJ5AHrNx10X%2BzRyNH3vve9b964cePm5dhqf3%2F%2FspKQbdscPnyYxx9%2FnCeffJIHHniA73%2F%2F%2B%2BzZs4eDBw%2Fy5JNP8vTTT%2BP7PjfccAOapvEf%2F%2FEfnHPOOZx11ln09%2Fe3pd2JiQmq1WobaLPZLM8%2B%2ByyVSoVUKsVll13Gnj17GBtrJLE%2F%2B%2Byz%2FOM%2F%2FiMveclLeO1rX7sIaEulEjMzM438yHSaiYkJnnzyySVgWS6Xee65535q71uA%2Fv7%2BZWXnjRs3bn7ve9%2F7ZpaJTs5kMlImk4kAq%2F%2F3%2F%2F7fN%2F%2Ft3%2F7tt84555x39%2FT0nCL8N%2FgPUqnUwGmnnfbGW2655Wt%2F%2F%2Fd%2F%2F4lMJnMKEPsZ8ob1V7%2F61We%2B9rWv%2FfRywVDlwiyP%2FugrKLJIIpGgo6ODwcFBJEkiFouRTCaZmZkhCALWrVuH67ps3LiRer1OvV7HcZw2O12YZ%2Bs4TjunNhQKNaJaXbcdxLYwgKrV6Wnv3r1MT0%2FjOA7T09PU6%2FU20LaYcC6Xa1ShkmUMwyAUCrWLr5imidTsDe8H8OjD9%2FDB9%2F%2Fusjelu6cXD4mjIyOUS2UqlTqyESFXqOC6HqqqEo9HkAUXsyONcMrpzI%2BNU7BsPnjhmbxpx1Zesm6AI%2BMTzAQiXWedh%2BsFTE2Oc%2BzwATaespn%2BoTWcsvV0Djw7TCgSZUMmgySLfO873yaZ7kbXdCSpUfAfwHYcSsV5ImGzIbnbHrIsIojgCxKKqqLqOh3dPXR0ryIRkQmFnm3Qh4VTuuBRzXcjaIMg%2BDiOix4Ko%2BgGfuCfXFNtuV%2BDoNmPl%2FbvGpyskI1Xfz5dk1BEQdFlEEysQMZxG7m9U1VpOWVq47p165InmaPF5vgc%2BJu%2F%2BZsPP%2FbYYw9fe%2B21n0ylUmv%2FO4D2RNM0LZTJZF7%2B%2F%2F7f%2F7vnu9%2F97r9cc801FwAdmUxG%2FU0G2xcts81kMnJ3d%2FeaCy644LdTqZS0HDM9Wd5rOBymq6uLI0eOMDo6iiRJFItF7r77bgYHB9sBRtlslnQ6zfbt2ymXyxSLxUX5tOPj4%2FzHf%2FwHmzZtQpZlDhw4wO7du%2Bnv7yeVShGJRLjyyivZtWsXe%2Ffupa%2Bvj4cffpienh6uu%2B46qtUqlmWRSqXaFaZWr16NLMuk02nOOOMM9u3bx%2BTkJENDQ21G%2B9RTT5FOp4lGf7qKK0kSPT09jI6Onghg0gUXXPDb%2F%2FzP%2F%2FyNTCbz1PDwsNtkfiqQ%2Bou%2F%2BIs3nnfeeb%2FblHVfkKmqimmabQlclmWEJnMTBQHL9rhv%2FwzD0zm6kgZ2vojoVFjdEaUnqv3U%2FZumGd%2BxY8c7vvzlL1%2B7d%2B%2Fer950001%2F1cwb%2Fqk9fDOZjNLd3d33e7%2F3e5%2BJRCJLilTnshN8%2F2v%2FB891Oeecc%2FA8D9d16ejoIJfLUS6XGRgYYGRkhFKpRDqdplQqEYvF2r50x3EWLZ5arNV1XSYmJgiFQu3AqZZc3ALnFvjWajWOHTvGsWPH2pO74zjU63UURWkHYs3NzbXveSuITxRF%2FKARiCVJEpoiUrN9HBckEZ7a9WP%2B6EPv5H%2F9xeeWKjm9qxgfPcbkTI54PIahKHiqhCRLBH4DFBRVQXZsOl%2F2Kob%2F70Fev64PXdegWOZlmwYZPjpG8fKXIQQBxcNHqNZq1Gs1BCGgI93B%2FNwM1WqVXDZLtVJB0zUsy0IzTDTDxIzEKebmcOpVSsUiYUNDVhTy%2BTyeF6CbIlbdRQ9HwfeP46EPIfUwWrQAC9NphACv2ihgIUc0CFxkSUKWZOqVCmLgN9vpnYRwCZzUxSmIAr4fnLiSbwPropSfJngnEhAgghjBQ8DxAiRRoOoKeAEsVKUTiUTf61%2F%2F%2Bh0f%2B9jHDnM8c6Dlk%2B342Mc%2B9porrrjiQ8s9y89nM1WfmarP0aJH1Q1w%2FQA%2FaEZhLXM5ogCSIKBKEFYEVoUlukyRtCG%2BkLlHHhwcvOCTn%2Fzk937nd37n7t%2F6rd%2F6g2bP7fJvYoOUF7OMHH3LW95y4%2BDg4KoTPwiFQoRCJ4%2FVEQSBdDpNMpnEtm00TWNycpJ6vc7ZZ5%2FNunXryGazHDlyhGeffZbvf%2F%2F7zMzMtAE3HA6zf%2F9%2BvvGNb%2BC6Lk8%2F%2FTQjIyOIosjg4CBdXV2USiVSqRS6rrN9%2B3aOHj3K008%2Fzfe%2F%2F30uv%2FxyUqkUx44d48iRI4RCIZ544gnOO%2B88Vq06fjnRaJRoNNruW5rNZnn44YfJZrO84Q1vaEuGP81a9%2BPEaleDg4Or3vKWt9z4qU996s%2BaUk%2FkDW94w7brrrvuf5xyyinX%2FLRVsiRJhEIhYrEYqqahLJdWFQRttmIaEhdu6eHZssvug5PEwirYGg%2FvGkeQBK684Aw6ZRvTt9E4%2BViMRCJd55133vu%2B973v7fjhD3%2F413%2F5l3%2F5w0wmUzjZAG66G5Kf%2Bcxn%2FnjVqlWnn%2Fi5XS8xN%2FIop23d2lYRWiBn23b7d1y%2Ffj3PPPNM%2B%2FlpBTW1FmAtX3srZaflEmhJwalUirGxMTo7O9v%2B3Na2rf2MjY3hui59fX1ks9kGgPo%2B9Xodo1m2sPVqMdkWO26lGxWrPn7gI4lgqOCL4FgNhrvr0Xv504%2B%2Bnz%2F92GdO9MHR0dnF3MwUoZBJPptFVRrStNyUdiVJwtQlHE0m%2Frq3sOv%2F%2FTXnayqoKmOj4wyvWk9gRJm59z7K5QqWbbW%2Fl4hNUCzkOCWTQdmwEdcPeGr341z%2FxjcvUKOUZqODRt6v71o4to0oySiy04A9SWkvOgShETjllY4R7jsMonRC7K5HpTCEaKxCwEMQhUZxp8BHliXwXDy38f7yQMsSv%2BvxjxuVrxaZElsAugujkoPWYMADAj2K5fgLvh1QskXimn%2BiG%2Bg04GvDw8P1pooTe8lLXrL1lltuua27u%2FtUXkCw00zVZ6bm89Ssg%2Bv%2F5%2FJ0gqDxzLgEWB6U7IDJSjOmQIC4JrIuLtFpiqR08fnmCWndunVX3HPPPRf%2B5Cc%2F%2Bfzv%2FM7v%2FO9MJjPdXCQHK2D7K37e3d3dg2efffZrIpHIkgeuu7v7hWnoooiu6wRBwNzcHENDQ2zcuBFRFOnu7qa7u5u%2Bvj7%2B9V%2F%2FlWPHjjE8PMxdd91FPp%2FnwQcf5Mwzz%2BSGG25AkiTK5TLxeBzTNNsSIjTSitavX88PfvADHnroIeLxeDsqWVVVHnroIZLJJBdccMGSCLtqtcozzzzDgw8%2ByJo1a9qNDOLxOHfddRe9vb2sXr2aVatWLSqAsaxU2N3NoUOHTgQt4eyzz35NV1fXHdPT02Mf%2FehHr33FK17xp5FIpOt5tVhdJxQK0dHRgWU3BvHJgHbhj1P1AnbnLBB8RifmsLsSqJJMX0cSX9HwZI0pNBADtMCmiyqhwH4%2Bn%2FQ5N95442lDQ0O3vfvd7%2F6bTCYzwwkBGU22HvqjP%2Fqja7du3fqGJefo2RSnnyIWDdMI4qStXLT%2BBkHAj3%2F843Zu7d69e%2Bnt7W1P%2BAtzbF3XZXp6GkmS0HUdWZbJ5XK4rtvuQTsxMUE6nW4HS7WelxZo1%2Bv1NmPN5%2FPtY7SemVakcatiValUQpIkbNtGAHRVoFCBut%2BYMGUJVBnKtcb%2Fn9n1Pe774flc%2FJJXL%2F5dDQPNCGE5Lul0uuFPLFdQJDANHVlW0FQNXQBt0yaKOy5g%2FIkH6enqYG%2FJ4tn%2BENXHHsOxrEVFYURRJBKJkO7qxfMDTF0hEosTv%2BxydH25Rgc6HT2rcepV8rk5JBH0sEGpbBGORRsyriDgez52pUw6fgwlXD8hKMrHLpo4wabmvakDAo5lIwhVJFmm7jgUy5Xmb38SKbnFbpeJVF4iJ6udJ2rYx%2F8KQN3GlWT8SIyq7S%2F6PLcM2KbT6Y2AlslkdKD7S1%2F60gfPOuusm5pRxSe12VqDve6adn5hSbB%2BAPN1n0enGuec0kU2JCTWxmUk4aTKl3HRRRe974EHHrj6z%2F7sz97xwx%2F%2B8IlMJlP6TWG5L1awDb%2F5zW9%2BQ39%2F%2FxJQiEajL4jttdjLwijQNWvWLOpP6TgOIyMj7Ny5kze%2F%2Bc185zvf4Uc%2F%2BhGxWIyrr76aVCpFEARtBrpwcimXyzz11FNMTk5SLpeZn59ncHCQLVu2sGHD8Y4flmVx0UUXLQHaQ4cOcc8995DP57n00ks57bTT6Ovra8uVY2NjjI%2BPMzc3RzweJxwOP286lqIoRKNRisXiiXJ715VXXnnTueeeK59%2F%2Fvk3yLKsPR9D7u7uXnR%2FVVVGcHxc12uwhfaqOGhUvGtOKBU34L5Zi0Njs9SnZnn9jk18b%2FgwFhIFT2DLpjSCJCB6DXJSETT2VQW%2B8w%2Ff4xXnrOHMrYMnuy7jsssu%2B9DXv%2F71Uz%2Fzmc985P77738uk8ksDMaQt27dOnTVVVd9ZLn2eLvu%2FxrZmWPIstzOk23dx9a%2FRVHEsiympqbQdZ1sNsv4%2BDiyLC%2Bqh9zy0bZ85JZltf2preet1YCg5aJo3SvHcahWq6TTaY4ePcrRo0fbTQnqTtBIV2myxIXBWJIkoaoq1VodURBwPHA9MDWwHKhaoCkNwJVEGOjWOfvsszm6%2FyE2nXIGXavWLPYVdnYyOTGOaYaIx2Pt0orFUhVNdTBNnSAQ0GSBwZdcwfQTj2DM5zhqRJgp5PDrdSRZabxEEcM0WNXby%2BZTT6W3txtN0%2FFcj1Ixj%2B86TI%2BPkOrsQVbUBeMyIF%2BuoqkKHT2rqVVK5OenKFcqyHrDTSGJIsViBV2YIZwYP97Vp01qA6qlNchmB7ZdpWp5SJKCF4ggCDi2hRmOUK8UT4geZmmJxWXUZEEU8G3nBGdlRxNrFyJz89%2BCCF6VIBAQ5RD1qrdou5q7dOzGYrEhINnV1dX7z%2F%2F8z3d0dnae%2Bnzz2dGix%2FC8y0z1l1%2FlMVv3eXjS5%2FFph9M7FFZHJcKKcLIYjHWf%2Bcxnvnvvvff%2B5Xve857%2Fm8lkZoaHh%2B0VsP3VMxHo2LJlyyuWazLQ1dX1gnd05MgRisUiW7duJZPJoKoqc3NzCIJAKpVqrS7p6%2BsjHA6zY8cO7rnnHt7whjdw4YUXcvfdd3Po0KEl9Yuz2SwPPfQQ%2BXyeTZs2YRgGBw4cIJlMcskll7SBOZVKMTQ0xJEjR9pgW61Weeyxx%2FjKV75CrVbjj%2F%2F4j1m3bh3QCIw6duwYnZ2dDA0NMTQ01GY4LyRuqaurqw22CyZ48aqrrnrTaaedFj6pDKRq9PX2YCwo8NF28QSgKhKO62E7LqoiL5LaANwAnirYzM8XefDBJ3nreRs5e2Mvdz9zmLLvgi%2FQkY4hBgE%2BAV4QoAoiU4UK%2Bdl57vj2FN%2F%2B4eNcd9XZbD5l9bLnuGnTpmv%2B5E%2F%2BpPd%2F%2FI%2F%2F8bZ9%2B%2FY9l8lkWilN8Q9%2B8IO%2Fn0gklnxx7PAeKsUZVFVty7iO47Tl3XZATDMPdmZmhnq9jm3bPPnkk21QbUUR27aNbdvtHNpqtcqaNWvYtGlTu%2FqY7%2FtYlsW9995LoVDg4osvZmBggFqthm3bOI7D1NQUtm1TLBZRFIWQLrd9yIqiNPyxzQ40rWApx2tIe4rUYB1WEwcc97hLUmimuxSLRXp7e5k68hOi8RRGaHGN30QyxfTMDKZpoKkqumEiqypz01MUi2VisQiGqBPu6Sa3epD5557GGTgV1Q3wZQkv8AiHoqxdu47169fT091NOBxq%2B6oFUSCWTOE6LsX8PIXC06TSXe22eYIgMD45w%2FRsljM2byAVj2KEIpjhLNmZCSrFHLoRIbAqxBKH271q26goetRzUTxxfeN%2BWEEjoErVCVwXz%2FcImsVEEJaXkBcWd1iW8S7bPi8FkrEYbBfiru%2BDYIIo4fmLVZ%2FaCdyuOa773v72t7%2Fune985%2B%2Fruh55Pqn44UmbvPXfr8g6Pjw27bBrxuHMToW1cQltGaory7J2%2BeWX%2F%2BG3vvWts6%2B55prfy2QyY8PDw%2FUVsP3VMv1Nb3rTJQMDA0MnfmAYxk%2FtqGPbdjvgZd%2B%2Bfdx777286lWv4rzzzmt%2Ftm%2FfPrZv305%2Ffz%2Fr169vs91wOExfXx%2BFQoEgCFi7du2ydZYVRWHr1q0kEok2sA4NDTExMdEG5lZh%2Bp07d%2FK1r32NPXv20N3dzZ133sn3vvc9tm7dytDQED%2F84Q8b1YJCIe65554lBToWXm8rMOZk96BVfaharWLbNjMzDaA5GdAKgoAajvLD0YDX90jozZSW43POcX%2BsIkt4vk%2Bl7mCoMmLTDxYAIzWPQ7MVHnvyWaxylXufGuOZ8RyyKkO9yqkbNxAyFDw%2FaLRo8wI8OWDvvucQvSqKKFKu1PmHr97DurVxXv3ynaSSS4PDVq1ate0LX%2FjCN%2F%2Fu7%2F7u9774xS%2F%2BGPBuuummc7du3fraE7etV3JYhaOsWrWqnRu7UPFoTbQLSyz29vZy99134zgOPT097QhgURQpFAptmbdWq1Gr1ahWq5imydTUFMlksh0pfNdddzE1NUWtVuO5555jYGCAarWK53lomtaObm7UAHbaqUSt82il9rT8uYIgoMlQd2i0pgsENKXBcJ3mSxSgN0X7fNauXYvvOVSzz2GEzlriJijkcxQKBVKpFLIsUquUCUeiIIjM53Oo1SrxdAop3UF2v0C4swv36Cgd6RRbt2xm3dohNM1AVjR000QQxUWyayPQSyTV2U2pkKeUn8Nz6uhmlEgsSWbdAN3pOPlCkflcjr6eLmKJFLFEknx2luzsHGFpAiM6u5jVCgG%2BDZXyRqRIHAIPQYDcXLa9Okx1dCJpBrVKBd%2FzoL1YDdq9doPAJ%2FADpAXVvRYyXiE4LiW3O%2F%2FIERAN8KtNgA1O9FngiyoIYtOTKywAKYGaK2DIDd97c44Kve997%2FtjSZKWdYgW7YBjRY9dM86v3CTtBw3QfTrrsrVDZmNiWagR1q5de%2FkDDzzwvWuvvfZVmUzmEI0CNsEK2P5qWGTLli3XxOPxJVrxC%2BmoU6%2FXyefzqKrKtm3bCIfDfOtb3%2BKBBx5o%2B2sfffRR7r%2F%2Ffl7xileQyWTaxS5isRiqqvLYY49x6aWXsnr1aoIgaDccaDGgE2Vl13WJxWIcPXqU%2B%2B%2B%2Fn7Vr17ZTSfr7%2Bzn11FP56le%2FSjqdZnp6mje%2F%2Bc1cffXVCILA97%2F%2Ffb72ta8xMjLC0NAQV155Zdt32DpmsVhsp6T09PQ8r%2F%2FWNE3y%2BTwzMzPIsnxSJUDTNVb19aPKMperFR4dLXHhUAxNkRbMO4tXrJIooipgux6a0pBgvSDgYL7KM8%2BOcGz%2FCOF4lAoCB7JVRASiiklvZxLfD5o1cwUkSWA%2BW2biyafQNRHH9xv5D6LD8N6D%2FKO2ite9%2Bnx6lKXKUzwe77%2Fxxhs%2FK4ri%2Bz%2F%2F%2Bc%2Fve%2BUrX3mzoij6Er%2FWsccXdehpycAtEGuB7MLSialUis7OTkZGRhb1oB0eHubxxx%2Bns7OTl7zkJY2812ZktuM4lMvltluiUqkwPT3d9uFu2bIFy7KwbRvP84hGowRBQL1ep1gstgO2TNNcJFP7vt%2Fw0Tb9t5IkEdgetidguw0ZWRQa0nEQQDICnt%2Bo5Tw4ONiOGq%2BVZ9m35342n3HhYn9hRycTY6OETBPDNBFFGd%2FzkGRIpDooFYtYdkBNDzPlQb5WZ%2FOpm7jwvHPo7u5qs9h6vU65MI8kqWihUCOPdgHoOo6N7zrE4428dauap1YtEook6Ugl6EglKBSKeK7Xpp3xVCfReAdedTeC7C4uyyh41AsdoA4hCA2pXVUUkvEICOA6LrKiEAQwNzNNKGQ03D6VKr7n47l%2BA2BFEd8PkF0L02zm4goszqMOGgvO9ihQ4iAbYJdplN0%2BUYf2wW%2F8noGwlE5XXQEFh7m5Oer1ekvRWhZoh%2Bdddk07eL%2FisFR1A34y6TBS9DinRyWqCsvJymu%2F%2F%2F3v33PzzTe%2F6v77738ik8lUfh0B98WWZytu2bJlcOPGjeedyCg1TVtSKSoIAvL5%2FKIo3FAoxNDQEIODg%2FT393P22WczNDREKBRi3bp19Pb2snPnTjZu3MiPf%2FxjPvvZz3LXXXe1g1Y6OjrYu3cvR44caU9%2BExMT1Ot1Jicn2bt3LyMjI%2B3C8S150m8WeR8eHm5XEmqtmBOJBIODg5RKJYaGhrj%2B%2ButJp9OkUile%2F%2FrXs3PnTnp7eymXyzz44IPcc8897N%2B%2Fn9HRUR544AH27duH67qkUqmfuuCIx%2BMUCgVUVaWnp2fZbRrnM4TalEmH0iZTRYuRbBVvwUQpLKOuKZKIpkjYjocbBDxXttm7f5qjTx5ElE2MqNnIcVAUar5LR08nEUNpJjIGzdxHgeG9R6A2D9goDkh%2BQ2eTFI3B007jQE3nmfLycSLpdHrorW996%2Beuv%2F761%2FX29l54ohRYnDuCa1fb8nsLwFqlElspOwsLU7SAt5W%2B04pUfuaZZ9i3bx%2B1Wo1CodBWDRRFQdd1xsbGkCSJfD6P67ptJqqqKtdccw3hcLhdEcq2bcrlMvV6nVqt1o4EVlW1LW23%2FOWyLCPLMqZpomlao1iL25CRXQ%2FqNtgupKOgq41XKh5uy9WthcLc3Bz3fe8r2FZtqQoSilLIzZOfm8aqVRFlifnsHLPTk6iaQjSexOztY7RcYWDdel5x9ZX09HS3I6MbxVxUEvEIqgLV4jzVcrlZ%2BVEASaJWLaPrElJT0lVUFU0RqZfnmB0%2FQq1aIhaLEg4vzi4QxREUYwICedFs5tVl6tYpyLrZ1s8FQSQcNolEQo0gNq9RlCOVjJJOJ3AcB8tyUM0YkqKhGCHMSAwjHGmn99i2Q75QplS2KJfrze5E%2FuKGH0qsUaox8I%2BPiIWDRJQQnalmGz5hCfOt2o32i47jLKoot4gseAH3jtk8OvWrD7QLbbLi8%2B%2BH6if1J4dCofRtt9327euuu%2B58INQMbFxhtv%2BdEvLmzZvPTKfT8eUk5CVShu8zNTVFIpFopwItlFlb%2BY2vec1riMfji4o%2FBEFALpfjvvvu49%2F%2F%2Fd85cuQIq1evZnZ2FlVV%2Bfa3v82qVavagTN9fX2YpsnY2BjT09M8%2B%2ByzDA0NsX79ekqlErt37yaVSvHqV796UXqP7%2FtMTk62S0B2dnYuGsCiKLJ161a2bt3K%2Ffffz3333Udvby8HDhygXq%2BzY8cOMpnMkg5Fy1krUtbzvJMCbUdHJ4lEfPGaXBB47WmdfGt4hkRIIR3WlviIg4V8VxBQFYkns1XuO5jlycefxhIhkQqjKAKuH%2BB5DiFDY93q7kbRgCDAw0cSoGY5TB7ej6jpiI6LpbhojoPj%2BoR7e4h0xnF8l2lHwvFkTo26yMKS4JKe3%2F3d3%2F3DbDYrdXV1teV%2Bz7XITe5rg%2BxC9tr63U9kua3foQW2lmWxf%2F9%2BzjzzzLZLQhRFqtUqc3NzbXBs3euOjg5mZmbwPI9wOMwVV1zRaDPX9IG7rtsG%2Bnw%2B305tkWWZYrFINBolFApRq9Xaz6goikSj0TZwAuTKBSRRwNQC6jYYGsTCOiHdxjAMYrEYQ0NDRKPRRtELSeLgwYP4vsve3T%2FmzHNfuvgexuPU63W6U904VhnPtTHNEJ7v41gWtVKBxObTufyPP4GeSjE9M4%2BmqkQiZqO%2BsnDc56kbOpquUavWKBXmUTUDzTApFQo4qowsNQpVzM7NIwgSity4n%2FO5HB0dHYSiSTSjBbgeOA%2FSaEKzgNUGNpX8AILe3yyduFDWDBD8440VBEHCa6bZVqt1zFAUSRIRJBGrWsV1HALPbzS4BzzXQ1YNZFXFqVWazRmEhgzdOgVBagRJVQ8tPwAFETGoE9RzGEqc43lKAZ7rMTUzR7fmLluMB2Cu5vPAuE3BfnGSPi%2BA7x61OLNT4ZSUzIkZV7quR%2F%2F4j%2F%2F4X%2Br1%2Bqu%2B853v%2FCSTyVR%2FnRjui43Zhk877bTLE4mlDoDl5NBWsYo9e%2FYs6QMbBAETExPtIKjlqiyJosjatWvp6%2BvjwIEDPPbYY4iiyDXXXINlWdx555186UtfYnZ2tp3LunHjxnZ7vGeeeaaxqpucZN%2B%2BffT29i4CWmhErO7atYsjR45w9dVXc9111xGNRikUCkvOed26dWzbto1XvvKVXHXVVdi2TaFQQBAEZmdnF5UBXG7hkcvlGB0dPSnQrlq1imQqgeV6SxL2VUXijFVRvjk8R91Zvsb4Qlm5FgQ8m7UYfvIQ5XKFcCREJKygegJyIOBbNXo60xim0mDLQUPmFEWRw6PTFCdHUWjkiCr4%2BJKPWK%2FQtf5UZEVqRy3PWCKP5RT8YNnrCYmiyPz8fHsBUytOtDvzLGSsLZWiFQHcerVAsPXvaDSKIAh0dHS0865byko4HG43hh8fH2%2F7%2BFu%2B21wu126RtzBHt7Xoa0UZt%2Fz6rdQhURTbro%2BFiwFFUUgkEm2pORFuMHRTEwnpDSbb3d1NV1cXhmHQ2dnJ2rVr2bRpE729vRw%2BfBhFURrBefUJXLu65PmvVKq4fkD3qiHiyQ7CYYNYLIphmMzPTuMCUiyOIIikOrqQVZ35fIlsNodt2Us6H4VCJvFYCCGwyU5PIooSRjhGvlRjanoWUVbRdJNKzUbRQ9Qtm1q1RGFuguz0GLbtgb8fgqOLgRaXwO%2FB5kw8v1HDuP08LpjUJVnCdR1c10FsB2xJyM1yqoqqISsykigiyRKyJLb9tJIkIQkijl1vFGvBJ%2FBPGAtKsslsFwZJHc%2B5lYQqgjWLIErtJarveZQK82h%2B7aRAO1P1%2BfYR60ULtAtt14zDj8dtrGWouaZpkY997GP%2FumHDhk00OoqtMNv%2FjoXB6tWr0%2F39%2FWecGAC0UJJdCKajo6M888wzPPHEE1iWxRlnnNFOk7Esi4cffph169aRSCQWBaG0vl%2BpVOjs7OSd73wnIyMj5PN59uzZw9e%2F%2FnX6%2B%2FvbxTBmZ2dZt24dp59%2BejtI5pRTTuHb3%2F42%2B%2FfvZ%2B%2FevTiOc1JfaqstXiaTQZIkDhw4wNjYWDvIqsVcYrEYW7ZsIR6Pk0wmOffcc%2Fnxj3%2FcjmKNRCKcddZZJBKJJfeiXC5z9OjRk1ad6uvvJ2Q2OqwYqoJlu8iyiCSKbbFrMBliW8lh32SJ03qjqIv8twv8obbPrtkqe%2FYeJD86jhE1qVWK5D2HcCoMjk9INxjq60LyGk0xHXxkESpli333P4CiiPiI4IPoi%2BD4aIkkG7ZsRfAatYPcwIdAoOj4PJ5X2GzWMLXFj3Rvby9HjhyhUChg6gpP77qrfU9aqT2tiOPWa2GA1MLaxYIgkMvl2qUS4%2FE45XIZSZJYs2YNoVCIXC5HrVbDMAwURcE0zXZhi3A4TKlUar8vy3Lbn9sCXUmSSKVS7YVT67cUBIF4PI5lWQiCgGmaVCqVdt3tluTcYsQ9PR2oqkoikaCzs7Ot8KiqimEYZLNZDMOgv7%2F%2FeHpTZQZZHTzB7RBr92MOx5KYkRi1cgnbsbEdl%2Fx8FlmRqVUdyuUSsXiceCJFvVolO19CVSXCYRNd1wiaAXCCIBAJh7AsG0WLoigqsqzg2DayolAuldANA9e2kWUF2xNxPZuwqpEf30VH96MIsri04pF6EalV6ynmZ6mV8iiKiKJqS4LfcnPzIEA41PCDEwSNQKdm3IFkmICA5zp4btPBGoDv%2BaCArMiNtLamv3wxWnSwpH9fq8hFICAGNUQr20h8RiDwfaqVEoYzz9ZThpYdm%2Fvm3F%2FJIKj%2Fio0UPRwfzu1RlqQIGYYR%2F8d%2F%2FMd%2F37Fjx85MJnPk1yUt6EUFtgMDA6vT6XTnTwuMyufzHDlyhLGxMQYGBjjttNOYmJjgrrvuYmRkhE2bNqHrOo899lg7xcd13XZ0brVaJZ%2FPY5omq1evRtM0uru72zmTO3bsYPXq1TzzzDOsXr0ay7L427%2F9W0477TSuvfZaenp6GBoa4oorruCb3%2FwmDz%2F8MJs3b17UYm%2Bhr7m%2Fv5%2BpqSmeeeYZyuUy2WyWnp4eJicnMU2zLZGbptkOugmCgPPOO48NGza0039mZmbYv38%2FGzZsaF9Xw99kMzY2tojNLbTu7u6GzB4cF4MVRcKyHXRVaURrNhnC6atj%2FMvuSVIhhcFkqB113LKCG7ArW2f%2FwSkOPHcEJW5iajrj03mqSCjVOooik8lswNQVXK%2BRbygGAaIsMXp0kurkKIomg2Pj4%2BLgIzkWgxe%2FHC2q4dgeBAFi4OM32rdwLFflgX%2B%2Fl%2FffePniCbjZy%2FjIkSNMlSeZnp5e1FmnBbAtoGpF%2BC5sDNCSeVvRwaIoMjMzQzQapbOzE0VRsCyrHdBULpep1Wps2LCBzs7OReAtyzKHDh1ienqaZDK5KL%2B6dVxFUYjFYhSLRSKRCNlsFlVVsSyLUqnE5ZdfzvT0NKVSqc225%2Bbm2ufc3d3N6aefTiqVIpfL0dPTg67rRCIRkslk%2BzuGYaDrevv8KtmDmLFVCOJxxqgoSpuRq6qKKErkCwV2P%2FoTTj3tdAzTQJFVbMfGsizKpRKB5xFPpdF0nbnZWYrFMtFIiFg8giLLBEDdsnB9gVCTrRMEqJqGY9XxA5%2FACzAME0VWsB0Hu14nFo6ga88gyIUTgqIcEDeDsB4BiCU6CIVjFHKz1KpVVE1BEhtVsFRVpaszhSA0FrkBIAoN0KMVVRw0FnOiKGEHAZ7vIUkintcssRkIzM8XCZkKnncCDqipBcx2Ia0Wjqso7iSB3xjDllXDKUyzc9vAspPeQxM2B%2FIev442UfZ4YDzg3F6V2AmBU9FotPfuu%2B%2F%2BymWXXfbqTCYzPjw8%2FKJfbcjP7t%2Ff%2BvfXgfuA%2F%2F2req6ZTOasRCJhLBfQs9Av2eozeskll7RTMzZv3sxzzz3HzMwM4XAY0zTp6enhO9%2F5Dh0dHe2o0HvuuYdsNssFF1xAMplsg9PExAT%2F8i%2F%2Fwvbt27nxxhuRZZnDhw9z%2B%2B23k8%2FnOeuss%2FjmN7%2FJnj17%2BNjHPkZHRwebNm3ic5%2F7HBMTE1x77bWsXbu2zXIaE5fYlqrvuece7rzzTnbu3Mnll1%2FeDpw5MRBsfHycyclJMpkMoVBokXze09PD%2BPg4hUKBWCyGLDfyM7PZLPl8fkk%2BcOvexePxBui07qEfIAlgaOoy0rrANad28MWfjPGmsxVSptpWBBwf9hUdxsazPPrIHvAl4vEwiiSTdjqwfBd86Eim6ElHcJuFGQQ%2FQEIkX6nzxE8eQWqyU19qMFsFD8wQ%2FesH8ZrSkx%2F4%2BD6Ivo8sihx65hAP3vcQa7vCXHvlOUvcCYl4nIce%2BzodHZ2I4nFps3XurQVLC%2FBa4NiaIFvMVhAEnnvuubbca9t2O2e5FX0biUTaQNk6fntFPzLCrl272gy0u7sb0zTbTLu7uxvP89iyZQuPPfYYlUqlLWW39qkoClu2bGkHOLW6TCmKgqZpDAwMsHr16nYltdZ4aFWtai0sWqystX9JkrArs2iR3sX4oartZ0oURb72T%2F8fq%2FpW8ewzT3P%2BxTtx6hUkWUQUJYLAp16rUZifRxBF0p2d7cIxU1NzGLpKItEoPKNIdQqFHIYZaoCwH1Cr15BkGateQ9d0wtEoE2OjxOMJAusIRsf0Yo4gQOCK2N4mtAUJbLKikupcRb1aplSYw3VqqKqGJIlIhtYG1cBf8Dsvij9oFK6oWw6u1%2FDPBkGA5%2FvoRhjHqoEg4rsnJMgafSDpSwtltN26EpI1jhJYeK5DfnaCK7b2slxl1H1z7n8ZaA1NoTMeYWR6vqFgdcQplGuUatZ%2FyySeijb87tliI2h1uurzk0mbi1apGCcEXvT29m674447%2FucNN9zwgUwm85%2Fqvb0A15az3wL%2BHvgr4OZfNrNtRddc%2Bzxge3rz7xMA%2B4eH4833ntiUyeT3Dw8PAvnWe63vbMpk7m1uf3rz8%2FimTOaJ1v83ZTJHX8D%2Bjm7KZIqZTOaacDi85AleWNFIFEX6%2BvraZe0WOeg9j9e97nXttntnnHEGn%2FrUp%2FjiF7%2FIxz72MdasWcPhw4cJgqANZi3Gkc%2Fnufzyyzn33HPbx1u7di2%2F%2F%2Fu%2Fz2c%2F%2B1keffRRXvrSl%2FLkk0%2Fy93%2F%2F97z61a%2FmW9%2F6FseOHePUU09l586dTE1NMTY2Rn9%2FfzudyLZtKpUKXV1dDA4Octlll7Un6ROBdmRkhN27d3PKKae0g2sWsiLP81i1alWbfUGjSMb4%2BPiyAVS6rrfBOmgGkciCgOD7BILAyequhQyFV2%2Ft5D8OznP9pjQRrXE%2FKr7P6FyZvXsP4rs%2BqVSCpKZR8z3i0Si%2BU0OPqGxau7odMOAFQSNp0Q%2FY85NdOPPjIIv4rg%2B4iFj4VoXe7RchR0x830MMguOVk0Wo1OocfPgxFAXu%2FLcfkVnby4b1i2tYpNJpegZPZ37iaUKmvqBm%2FHHZeKF%2FsQXEJ%2FambUXx5nK5NhNu1SlutGJT2u%2FF43EURWnXLPY8r91NqhVNPDMzQzKZpLOzk1Ao1M61jcfjrFu3rn3MDRs2UC6XKRQKVCoVXNdldHSUNWvWIAhC%2B3nQdb1dhKVVrSqVSrXPKZ%2FPEwqF0DStnTqkNxuwC4JAvTCyBGxN02RmZoru7m72PrGbeDJJKBIlc8oWItE4WdtiamqMVb29WLaNrhsIokitUqFaLhFNJFBVjSCZBARy%2BQrhkEYqFcOq28znipihCAEBgSDiOQ7hUBirXsf3AyRZIqyLaPJ%2BRNVfXJZR8KgVUhSqHlptkkgshbJg3OhmGN0MUy7mqBSySJKAoiqLoNV1fTRBWKbQooDnuRjhCKIo4TZLa0qiiCdK%2BL6H550AtuZAIyLZry8IiQlaqwKgjmKNoflVSvkc2wfCmPrxom2VQGHaMwnbOXbNOPQ088kn54s%2FM7i1MggkUaQzHmEyW%2BS%2Fy1R5qbI2VfF5eNLhgl4F9YQ5Z9u2bTd85CMfefjjH%2F%2F4PwJlAQZpvBbiytEmhg228KaFGyf8%2B2jz3%2B9rfv%2FLCw61aL8LvtPCs%2Fwyl3PJgv3GF7yeeL4AqVcC32x%2BaXCZ7W4HbgT%2BBPgfzRP4OnAx8KMmMN7Y3O7i5md%2FBVy7f3j4rxYw5%2FcBf7J%2FePjrTWC%2Fff%2Fw8GDzht2%2BzP7ax3jve96zIZFIrDkRQE%2BMQm5NhssBbavyUotRJpNJ3vWud2GaJvfcc087l%2FLUU09dBGb1er1d07jVJNx13Xawy2te8xoOHjwIwDve8Q6OHDnC2972Np5%2B%2BmlWrVrFdddd1%2B4YMzo6imma7fObnp7moYceor%2B%2Fn0suuYRIJEKlUmFubq69fSul5NFHHyWZTLJx48ZFbKlarbJr1y6mpqYWTfie5zE3N9e%2B3hP01UXBWoIgIAmtBuQnLwzSmpBWJU2MqsNdI0Usx8UJAnbPVXli3yHGJqeJxkxCEQULEBEQJRdEj60b1xMJK%2Fh%2Bo1pUYxIQmJwrMLZrF4osIro%2BIn4j2NQHxQix4cyz8YVmBHngN7LmfQ9RFBifzlKYG0WSNEQc%2FuzP%2F55Dh8eWnPspW8%2BlUnMaFYSW8c%2B2%2FKYLP1tYPKJdQELTcByn3cGnBcqtZ0%2FX9bZPtrXvFnsyTbMN3oODg4iiSH9%2FP11dXe26yC3ZurOzs52O1tvby0UXXcRVV13FmjVrUBSFrq4uPM9DFEW2bdvG5s2b2bp1Kz09Pe2FWqvtXxAE1Go1ZmZmGBkZYWZmpi0Pl8vlNjMncHHqhSVSfLlYZGL0SMP3GgSsHhiie1UfjmPznf%2F4Bvuf3kc2l8d1PQzTQMAnmU4jSRKzU1Pkc1kMM4RpmkTiSaqWx3yu0PB9igJi89pbgU3VahVNNyjm8yRicWTvAEZs%2FgSgDfAskXp9I6FYglI%2By9jRgxTmp5fULQ5HE6R7BpHVEJLUWIS02KckCUsqRbXjEAIozufIz2dxbAu1ObcEfoAoiPjNZ%2Bk4unc1KkktioYWGu339DSkL8XoOJOYaNGlVOnrWqw25XyNui%2FyRFFDVWTCpk7Y1NuMsCcZbYNmZzyCtGBcq4rc3q5lEUNvs8iIqZEv1zA1hUiT3auK3Ab0Fji39tOqBhcxtEX7bW3%2FQrZ5vkVATzLaPo%2FRksdPJpcqxYIgCNdff%2F1n%2F%2FiP%2FuhV5VLpbU0Munb%2F8PCPmpv8VRM7BoH3NbGjhVkAe5oY8ldNnDu9BczN91pM96%2BamLRwvye%2BxwJy%2BqPmfm9fsN8fNXHreZntjcBfN8H2lSew2xajvXnBif0J8NubMpmj%2B4eHn2x%2BB%2BDLmzKZb%2BwfHr4EuLnJUFsnmt%2BUydzc%2FOzaTZnMn%2B0fHm6tKN63YDXwxIIT%2Fuvm%2Fujo6Fhrmqb%2F0%2Fy1JzNd15dtUNCKDP32t7%2FdDni64IILFoGZpmlkMhkURaFWqzE6Osr09DTj4%2BOcd955ZDIZ3vGOd3DrrbeiqioXX3xxO09WFEV27tzZDDaJt4v4t6xUKnH06FESiQSKorSDqnK5HKVSqc1CPM%2Bjt7eXl73sZUv9Og89RLlcZtOmTYvKzJXLZaanp5dltTlfQ5TlxSv5EwLEfD9YVAlqkQdKELj%2BrFXc%2BdgI3wl8REXg0GiWeL3GFZvX8cxcvpnY4KIgUHfqbFq3jnQs3JSCfUSvsZ9i1eLRH97TYLquCNjgiCi%2BQ72cp%2FfiK4nEwrjNDjd2AKLnIwpgOR7P3PcIChYeChKgOBJf%2Brtv8PGPv3vxsxIKs2bTDsYPPUrI1BYFQJ24OFvYBm%2FhZ6IoLgp6UhSlDWatzxVFQVXVRZWeWmB%2B7rnn8sgjj5BMJtmxY0e7ElU%2BnyeXy5HP59vRyZqmIctyO%2Be25RfO5%2FP09fUxODjI3NxcuxNVpVJpgFkk0l4s1uv1doP5Wq3WDujK5%2FPEYjFc18UwDHzfp6Ojg0KhQMk%2BRN%2FabYvVjHCUfL7AwOp%2Bki95CdlcIzp65MghfM%2BjajvYtsXuxx5l3YaNbN16GoV8FkmWSHU0imDMTIyRSHeiahrRWALXdZidm0HVdDzXbdR2dh1EQURV1WbHHxFdstHMAwiK2AhW8lv1hj0quT7QBvE8m7rjE08mKJdLFHI50t29mKHjk74ky8TT3Tyx61ESyQTJWBjPaxwjCBrML2i27hMEAc%2F3URQZgQDXcdENA103mJmaxLYterrT%2BM3WiO1sBlEFYwAqRxas9OuQ3MGT5uv5x7ExCnaF5OyDvOWMS5eMS89n2SjdNoilYoRNnXK1jqGppKIhho9NLc8iFRlJFKg1a3fGQgaFSg1VkUlGQ5TGZoiHDHpSMfKVGjXLoa8jzvCxacKGhipLTM4X6YhHiJga2WIFQ1NIRUNMzhdf0DbLWWciQtVyKFfrrOlNMzabJ1uscKTokcy6bE7JJ87d0tk7drytXC6nDMP4V1mWgyarvaS5yW8vUENfuX94%2BN4FePLbC3Z1GvBnTXy5t4ljNPHnjAUguxDz8suA7W81WfHfN3Hz9ubfbzyfLC0uYLKnLZCST0Txowv%2B%2F0RTCl74Xqu4aptqb2q0bFsUt3SSf7eOcV%2Fz9c3m30XbFQoFzTTNJX3zliuXeDJrFQ1oTYzz8%2FM88cQTpNNpNE3j9ttv57nnnmPPnj1MTU0t8vm1pOOW9CpJEocPH2b37t0AXHPNNZxyyincfvvtqKpKOBzmzjvvZM2aNWiaxq5duxgeHmZ2dnZRBON9993X9tP97d%2F%2BLXfccQd79uwhn8%2BzatUqTj%2F9dNasWcPs7CwHDx5kfHx80TXdf%2F%2F9HDhwgHPPPXdRtPPCgK8lQVm6zjFLbSb3L2%2BSJGK7XrtnKCdEHAc00igy%2FXEe3n%2BMQ6OzPP7YXk4dSHHupm58x0MLQPEFHKvGqlW9rO7vxG6Ihfg%2BjTrIAux57AmKo8dQcJFwkRwfHwsHGyXaxdrNp9PK7fEDEAnwBZAlmZGjY0wfeBJRUpCat7WuOBydnOTe%2Bx9fcl2nnnYugWjief4itn8i4LYidBc2JmhFn7YWP9VqtV0EoyXlLwTlVipP6%2F1WC77LLruMl73sZaxfv77dMcpxnHYzgomJCarVKtVqtQ3YrebxrWjnUCjE2rVrWb9%2BPfF4nLm5OWRZXtTAvhWQJQhCG6hzuRwzMzOUSiWmpqYYHx9v%2B%2FknJiY4fPgwT%2B%2F50VLXQThEtVbH8QM0TaOnK025kCOXy1IqFenu7SUWS5JMppibmaZQKtPZs5pwOEq9WkbTVJIdne0c4iDwEaVGlSXTMKlWK40azJJMJBrFMEOUyyUS0RiKsB8tWsa1YGqs3AiQk3zcqorjbEJSVQRAlhqpT0YohuO5lHPTzE%2BPLirYceDZYZ58YjcT4xN4gookNxc01SKVUgHXbSycHNumUsxjGjrpjhSJVJwgoAnAEulUDEVpBF25zgn%2BT3NVUzIOGgxXS%2FK0eT0f3rubWiXLd5%2F4Meeu2rBssOLofIWa4zE5X8R2XMrVOuVqvc1OAWbzJSbnixyenMP1%2FTajtB130XbxkEG%2Bcvza42GDfNNfazZdP4amUKpZRAwdVZGxnUaN83LNasdsmJpC1XIwNAVTU9v7fCHbLGdVy%2BHA2EzjGibmFrHgXdPOsoUv1qxZc%2BFcNhsaGxv7SRMfvtzCpQVY840mkN7YxJFLmoB6MVB4HmhYDo84iXTcwruj%2F4nt28z2lQtQeaF23dpZawXwZPOk88A39w8P39684D8BXvV89PkF2Jeb32%2Ftb8nqoG5ZcigUWlKicbn82CAI2sA6OTlJMpmkt7fhh5qcnKSjo4N4PI6maWzYsIEdO3YwMzPDQw89RK1W48knn%2BSRRx7hiiuuYGhoiFQq1Q60EgSBaDTKeeedR39%2FP3%2F913%2FNzMwMb3zjG3n%2F%2B9%2FPn%2FzJnzA6Okq5XCYajbajTePxOLlcjt27d7NhwwZWr17NV77yFX70ox%2Fxute9junpaSYmJjjvvPO44IIL2qUBW23YrrzySr7xjW%2Fwuc99jpe%2F%2FOVs376dZ599lqeeeopLLrmk7XttpYP4vs%2F8%2FDyxWGzJ%2FQmHQhhFh5LloZ1EMhaaEcgtH1XbNxxAwfGYtnyyNYeDBQtVhGK%2BguJ7fG%2FfQWRdJ2TKyIKM7VlEEmk2relvTj4%2BXtAozYgkceTYBEcffQhNUXGo4uMj%2BiCKPn61zJbXvI5wMoJru01pMGjI0oi4nsv%2BR59A8WUUwKGG4ykgWYiewz%2Fd8W0uOPf0Rc%2BIrCgMrD%2BDkf0PEDL148x9gRR4os92YSCV7%2FtEIpF2Qf%2Benp724qm17YkgvTDq2bZtdF0nnU6386hbHYdalaxaTQcWBllVq1UqlQr5fL79HBcKBYrFItVqlSAIqFar7dQeVVXbwFsqlRgdHWVycpJSqdSu7qSqars1ZIuRt4KtSvkZIvHOBeOskZJj2zZqOEwxV8aqW%2FT19PDm37qJJ3bv4kv%2F77O86bffzjN7n%2BTHd%2F%2BAzaefydr1G5BUjXqliO86eIKAJCuN6PmJCXRdw7YtFFXFcWwURUWRFfKFApqmYUhF9PARkGWmx6ocHKtxQbcJvke1sAbR7IHARZQkBBqBapquI6s6pUoVVbbJ53Ik012Eogn2PP4oGzZuon9gkHgixf6n9yIIsKq3i3qtQqVcaC5QAkKGgqYdb1LhB80FmCKjN%2F2soijgWHV0YwEPMNeD0JyqAhfMfr45m8MLSlwT244QL7CpZ2lDjUbHHpFu4%2Fkny3z5OJCVq%2FVl%2FaAtqXZyvtAGWtvx8Hwfz%2FexHQ%2BjKSePTM%2BTbPp2S7V6%2Bxh9HXFURcZyPcrVOqamEjY0Ck0gfSHbLGfl6vF%2BA6Watah5CcCDEzZXD2mL%2FLeCIAj9%2Ff0dB5577rzu7u4ndF3%2FkwWY1SZ4%2B4eHjzZB9uamy%2FPeJji%2FbwEYxk9wl%2Bab2y787p88z0%2FwzSabvXkBbr2gAKn8CSf91wuQmgVU%2FMYm4P79Aip98QI5%2Bb4FAP3lE4B04d%2BFK4L7msFP9zZv0sVN%2BfnepsTc2va%2Bffv2pd74xjdKSxnY0getVTrRtm127drF9PQ027ZtQ1EUstksfX19nH322YuazPf39%2FO6172OI0eO8NRTTzEzM8P3vvc9PM9jw4YNbNq0Cdu2qVardHZ20t%2Ffz8TEBPF4nIcffphK5f9n77%2BjJDmvM0%2F4Fy69L2%2B6qqt9tUcbNAwBNEA4kuAQNBJFIxKiNFpqv9FwqE8Sd6TVSPyOZnZnR0OK0nxrhnOWlChDUTQARYqkABAN02gQQFsA7bu6qrq8SZ%2BR4WP%2FCNOZVdUASJGieHbec%2Fp0VmRkZGRk5Pu8997nPk8D0zRDIC2VSoyOjhKPx5FlmY0bN9Lf38%2BVK1d47LHHsG2b8fFx3vve93Lq1CmuXbvGe9%2F7Xh588MEwNa5pGk899RSZTCb0zv3Od77Do48%2BypEjR%2Bju7uaee%2B5h%2B%2Fbt4WdfWlpiZmamraVjZY27q6uLrVaFK0sqncnImjVZAU%2FIolXcomE5vFo1manq6E2N85PTzM0tomsmA7kORob6uTo1QQ4ZYjITi4s8%2F%2BQk%2F%2Bv%2F9iFkScR2PMazY0NEFlgq1Xjh208g2eBgeQVax%2FZafepNcpv3MjgyjG2ZCHjKUzIumguiJHDxlXFmL54lITpeksaBGCq2LQEOTbPBU%2F%2FwLPe9vT1dN7xhlEuvPkeSdneXlQzl1gg3qPuDJ%2Fkpy3JoFtAKtAFoBwse0zTDlG5w7IGBgdBHOchCyLJMPp%2Bn0WiE7OZWXWVVVUNf3Ewmw%2BLiIlevXqWnp4ddu3Zh2zaNRoNqtRq2hrXeR7quY9t22JMd1Gt7enrC2r2u62G9v7g41Qa2AJFYnEathlarkkinSaaz2JZJs1Fnx66d9PX1UatW6O3rp1Iu8fyz3%2Bf8a2eYnprkkV%2F9%2F5CMJ6iUl3BcB62po%2BlNCoUC1WqFRDKJqqpkMhksy6Sp1unu6EAWn0dJGmDJGIbNjo1ZJMXFqCQx3W3IsuiZDQDRqIKmNtC1JrZlY1gu8USKZDaGbuo45SW2bd%2BB2tTo7RuguLzM5YsXSGXSiLJMMh4jk0mA4yBHFN%2BUwEUQ%2FUyFK%2Fp1XCGslYuiiGWsiGyTIyAqfguRAI7GQDTJRHWZc%2FpVPrBG%2BrhmuJxYMIlHoz9UlNLakrQyhRxRpBCYs8l4W9Rba2rkknF0y6bW1Bn2a8cBSAaA3JFOeNF1U6eQSZKOR5laLL%2Fpfd7w%2FEWxTQIWPIOFi2V7VTo5m80mHdfdWa1W5VgsdrcPriuB7nMtQPrHLRyjX%2FIBt3WfP2vBt0f8be9%2BHQxrze5%2B0serx3z8XP9mwPaLaxxo5Rj3c92tq4gvrvj7yFrPBY9b%2Fh9vCf%2BPrHj9kRsc7whwZyQSEd8M2CqKQm9vL5Ik0dPTw9jYGBMTE5RKJV555RXS6TRbtmwJa5kB8cWyLK5cucJdd93Fnj170DSNM2fOcOrUKZrNZijPGChD1Wo1Nm3axNatW8OJ95ZbbiGRSHDq1ClmZmZ4%2BeWXeec73xkC3cDAAB%2F%2F%2BMfp6uric5%2F7HEtLS8zOzvJrv%2FZrHDhwIPw81WqVr371q0QiEW6%2B%2Bebw9Q8%2F%2FDCyLHPp0iU2bNjAiRMnuHjxYjhhPvfccywuLjI8PMydd9656tr09%2FfjAn25GJfHyyERZE0Lz6AVRnCpu3ByqcnYbJmFYpGxK5Oo5TpDXV0ULYuS2qAnl6Avk2W%2BWgPJYXq6wgd%2B7UFicRnL8pzMHddFFMCwHF48%2BiJaeYaYJCOaXluQiYWDl6rbcec9SKKAY%2FvFLMByQEagUqtx%2FIknvFqtJCLaOlIQFWODZuMoCn%2F9l%2F%2FAXQ8cblslpzM5Ovs2UV%2B%2BQiIebVM4WjkCxnEQoQalhGg0SrPZbJN5DDSBWwHbMIyQFRyQ9Pr7%2BymXy6FKWDweD%2Bt%2BmUwGx3FYXFwM77FYLEa9Xg9TwrZthwb1ruuGoipDQ0NUq1UMw2B2dpapqSkSiQSapjE3N8fy8rLXC1uvs7BcY9vmYQ4cONAW0QZa0JNjrzK8ub1uG4vHKZeK5LMZZFkBPFecet3CFQR6envoclyUSIzjL71MV2c3iXSa9ZFNpFJpXv7B84xdvsz%2BgwfJZNJg25RKy1i255wTj8WRJJlieZlYLEHEnSeenQFJYn5aBRE6%2ByJgWDSqm5CSnX661rt%2Fo5EItWKVbC6Pq%2FgZBVwEUUSJxDANk66uDiLRKLZlcnXsEvPzM%2BQLOzF1nZdfOcM7%2FsW7KS3PYeuevrXgN5iLoki1WKZSrmDbFqlEp9frLUlY9gpiT6zbcwCyal6EW7%2FKw%2BuaPJffw9jyAm%2FPrOZQTFRtLB9z5BVkxpWmP925NAvlGpIokkvGuTK7tOp46Xi0LQJOx6NtNdR6U2ewMxcCsG7Zq0Cy1tToyCSZmC%2BGgGw7bhs4vpl91oq4F8p1bD8FXlNXtyEdnzfpjot0J9o%2F%2B44dO%2B44cODAbwHXXg%2BH%2FGCNFfyjAMO%2BuEYaeWUXzhdv8JiWjO%2BRFRg5%2FmZaf34WhqQoq92I1%2BpPC9oqAnLT%2Fv372b9%2FPwAXL17kC1%2F4An%2F3d3%2FHBz%2F4QTRN49VXXw3Vm%2Fr7%2BxkeHg4j3m3btiFJEl%2F5yldCEklnZyeFQoFcLsf09DRPPfUU9XqdAwcOYJomZ86cIZvN0tHRwX%2F5L%2F%2BFvXv3sm7dOpaXlzl%2B%2FDjvf%2F%2F7ufvuu7lw4QLT09P81m%2F9FsPDw2Ev48LCAn%2F7t3%2FLK6%2B8wr%2F%2F9%2F%2BeZDIZTvqiKHLo0CEGBwfZunUrly5dQlVVTNPk2LFjmKbJPffcE0YoK0liSF60GlFkSg0D03aISOIqUwHHBUeABcvh5akqVc3gwmsTzM0uUqosgKjQ25Fhd0%2Bao1MNVKPBYtWlq5CDchGHPB%2F7xQdJJyNYpu1Neo5HEnAEOHbkBWZOH%2FdS1LaDjg44SKKDU2%2By492%2FSEd3B7ZfN3ZwkN3rTIMLJ8%2BgFieRYlEkzQQHbBsU0cEGSDvYtQrdN9%2FLYhMGVpgIju66hWe%2Bd55oRGkT5lipIhbUcoNIJri%2F4vE4tVqtrf82aPEJjpFIJFheXg4BOeijPXnyJK%2B99lqofey6LplMhv7%2BfnK5XNhTqygK6XQ6BPFKpRIeM4iybdvm9OnTbNu2DdM0uXLlCrVajUKhwNLSEvV6nXq9zszMDIZhhEz6%2FXu3s3PnzjCKDgwPggVENL5a7SwajVFaKtHd24Ou616bTzSK0WwQi3WAKGNbOpWFGW7at4epqRmOHX2GX%2FzYr6I1m1wbHyOfz3Hh4gX2HzjExi2jzE6P02zUaaoNr5cWF13X6C6kiURfQ4rbYMvIIgz2xcGxaZZzuPJmRNEJUzFBfVqWREzTRIlGEEUByzJD7e1INEK9oiJh0XAM%2Bvt7icXuRPQZ07quc%2Bzosxy85XYMo4ll6ti6iqLISJJIOhn374Mooui1ComiiG3oOLbt16ABOev121bPgBgD1yY987%2Fz27n7qay7a9V1XVCdUCFK1U0kUWDf5nWcuHSNelNnQ38n8WiES1MLIVhlU3ESUYVyvRkSoNLxKL0dWS5NLZBNxinWGmFd1nZcDPN6m1JN9dK3db%2FftqkbQKQNJOtNne5cOuzJtR2Xcr1d0vPN7BN8lmDols3oUA%2B6ZZOIKpybnF9zwn9p3uQdI%2B2RfjKZ7PzMZz7zi7%2FxG7%2FxGaD6M4RfP1sKUmtFsWuB7euNLVu28KEPfYg%2F%2BZM%2FwTRNurq6EASBPXv2EIvF2lKywSgUCrzjHe%2FgzjvvJJlMhlZ7Qe2s2WyyuLjIa6%2B9xosvvsiBAwd46KGHOH36NI899hh%2F%2Fud%2Fzs%2F93M%2FxpS99CYDf%2Fu3f5siRI5TLZR555BHWr1%2FP6dOnqVarVKtVFhcXaTQabNy4kZdeeonOzk4SiQS9vb3h43q9jm3boUQkwObNm8Noae0UciJs74mIIp0JmZJm0pOMhtGB7ULJdFg0HUq6yeWpChOzC7z6yllqCxUSqTTRRIJMJkVEkTk6MweyRNSyMdUGdQdGNm1hdMMGYokIjmsj4mI4LhIgSQJnz17lxW%2F9PdlsHCWu%2BJKMFo4oYtabdG3extCm9bi25TGaXRdcsAQHURCZnp7n7AtHiUkpMHVERwFbR5FMPAwSwbZxpBjbbjnEq8s2A6n2W72zu49YogPLqiHLUpvmcKvjTyvxKVjwBHKJy8vLYfvPytpu0HvrRUceWHd0dDA7O8u3vvUtduzYwc6dOykWiywsLDA7O8vk5CQjIyOkUikMw6DZbBKNRpEkybPDazZDk%2FqgLhz8BoJ2odbWJdu2KRaLjI%2BPh4utkZGRUMYxcJ8K7uVKpUI8HvfeU1hLtzaCaXo2dPlCDl3XqJaLRBQv4m6qKk1VJRpLUi6XSafi%2FPwHPkQ0GuPYs0%2FT0dVNqViku7eXL3%2Fp%2F%2BYTv%2FW7pHN5KsVFFudmqJSLFIvQ3dVNVLhGPLPktfq4Lh09XiHT0R2azW2IqTQ4VltaRpJEREnAtCwi0aj3vYk%2Bq9w3RVCiMWyrSUyWkCTIrOtncbmEKEsUujrJ5vI88d2%2Fo1qt8a73%2FjyOrAAOtqmRSidD39ugvCIAgutgmgZRyS%2B2igrEB6By0js5QUatlVhePk5u%2F%2Bpugh%2FMmS1sZIdXx2fbapqnr7STIs9NzpGOR9Etux1Amzo1H5DHWqLdpm6uYizbjtMGgGulfcv1Zts%2Ba7Ge38w%2Brc%2FPFqtQrBJRZKKyhKqbN4yCl5oOV6s2I5n2ef%2F222%2F%2FVT%2FarHPdzeG%2Fg%2B1PcwS9ksGkFPQS7ty5k1%2F4hV%2Fgr%2F%2F6rwH41Kc%2BtUokIhhzc3M8%2FvjjHD58eJXtVa1W49SpU7z1rW9ldHSUixcv8u%2F%2B3b9jYWGBZ599lkQiwa233soXvvAFvvWtb3HgwAHuvfde%2FvRP%2FxRVVfnN3%2FxN%2Bvv7Q9Wrp59%2Bmlwux%2F3338%2B6deuoVqt86Utfolqt8q53vYtSqRSakAeiBW3pJZ9Qdfr06VV2g15KvaUGJ8Ce3hQvT1Z4x6i3vWq7jDVsZmoapXKdMxfGmTx7mYXFCnZUZKCzQEchh6x4E5iFhCwqODiYuJhGk8RAP7u2jiCLEqZjIznealdwvdaLV169yPf%2B%2FItMzM4zLOXoU3KAiGQ76GadVFcfN7%2F93YiiiGk7OPi9sIKL4oqousWz3%2Fw2jtogRtQzR8dEAkQ7ioOOgkqtrrPnoQ%2FT299LRWsyVxfoTbX%2FaNP5HirzJUTxukLUygVcAGDBNQweB7KZhmGEvbPB%2FRa83jTN0DwgHo%2BTSCR45plnEASBD3%2F4w6Fq1dLSEpVKhUuXLvH0008zNDREJpNhfHycVCoVlihkWQ59b4P7Osi2XLhwIVwYptNp6vU66XSaSCTC0NAQ3d3d5HI5LMtCVVV0XQ%2FvH8tvXwnazDKZDIoi06gtk0x3tJGkIlEFWbCol5ZAUhBwkSNRRFGiUSmCIJFIJKiWTaKJBKXlZSrFZTZs2siLLxyjqalcPHeW977%2Fw%2BGNmC10k851UCkuUFpaIiboxOIXPY6R46OpA4g2jXJf6FXb1rfmA25EUdBNB0PX%2FT7dEslECtFPuSuKgmaoYURsmRqFXIpCYSeSEuPV06dpNlSGRzaQSKb4u6%2F%2FPZlcnoM3H0BXawj4TlAtguCiKGIa3vtdJ0lt8U1rvYVYqQ7K8PtXzS9XqzZF7YfHi5%2BWAtSPaxim1bZQuNF4bclaBbaZTKb3N3%2FzN%2B%2F5oz%2F6o78BGq%2Fz8r03KIv%2BOEfwHsH%2FAfkq2DYeELNuBLavJ2O11%2F%2F3xZ%2FU2fsiF3tX5OOdQAxgZU1trYg3GAGpJJVKMT4%2BTq1W49Zbb%2BWee%2B5h48aNfOELX%2BDy5cts3LhxVa%2Fl7Owszz33HIcOHfImEN%2FurF6vs7i4SDab5eDBg6EO8ZYtW%2FiDP%2FgDfvmXf5mvfvWrfOITn%2BAd73gH27Zto6Ojg%2F3793P06FF6e3vp6uqi2WyGqcDz589Tq9X4yEc%2BwsaNG4ObioceeojnnnuO9evX09HREbJh11KRmp2dZWxsbLU4OuBG4kxUNGxcOuIREooEisIPLl%2FhpuEcpiAwXje5NLXM1OQcF6%2BMUVqqeRF1XwfL1TpgEo9K2I6NIwqIto0jOGDYKILA9t17GRnoRgAsx9Mvth3P01MUBV67cJWTTzxBXypKatsQiuLVaBUTTFFFdBQOvO19JBIxbNMC0UW0nHCutQU4feI09bkJEnisXRObhO2AY2KKEHXA1EwS3cNsPbQPzTCIOSJXq84qsO0dGGF%2B4jSyJOK6TltEu9I8vlVBKrDHcxyHZrMZyi0G2slBbTVw4wkm5EqlwtjYGJ%2F61Kfo6OigUqmEJvKB2bxhGLzyyivkcjmaugfmAemptae81f4vlUpRLpeZnp4mFouxe%2Fdu%2Bvv7ue2228IIudlscvXq1dDCLyBEBaAb2PgFbGhBEFCrC21gG%2FAhlEiEbCbF8nKZWDJDLJGkXikhCJDIZNG0JqLsCXwo0Si2aWHoqsdnSGU4%2B%2BorDA4Nr8hQSeQ7%2B0hnumhWjhFJl9r1j0UXW5XRja0oqWhYq20lG3ia3jKmbZLN5dH0ZvgdCAi4npEubeV5QcB1HbA0dENlZMN6BMFl%2F6HbuXT%2BLEokgus4HH3uOQ4eug2zWcV1TU84x3%2B9KAir239SI2HfumG5LDfTJDo2rfpdXixZP9TcOLtc4f9NY1lzWFCdlbVb4YEHHvi1P%2FqjP%2Fr7NwDbzwJ3%2F4RPMXiPAGy%2F4JOmgud%2BqRVscz4TK%2BvvlMNrBwqYx48Awz5z%2BIjP6FrvNw6X%2FecBvuizwx7xt69vef34ttHRR30gPeyzuJ72WceH%2Ff3fBZz29wvfo6Wf1zZN041E2hWrV4LtxMQElmWxfv16JEkimUxy6dIlLl%2B%2BzLVr10JFpkgkwuDgIIcOHeLo0aPs2LGjzd7KsiyOHj1KMpnkwQcfZGpqimaziW3bPP744x5%2FPJdj48aNYUpueXmZbdu28f73v5%2BvfOUr1Go1br75Zu666y4EQeC%2F%2Fbf%2FRnd3Nx%2F%2F%2BMc5evQoMzMzbNy4keXlZUzT5IEHHmDjxo1tLSQ7duygVCoxMTFBT09PmHIcHR0NiTTLy8tcuHCBV199ld7e3jVT4U%2FNaSxOzGDhkIlH6UhHURsamDpfPjOFJIosTlzjzLnLSJaLEkvQPdBNJhXF1Azq5RLNuki13iQZi5KMewIflmESSyQZHd1GTzYJjhOmfQWfDCWIImfOjnH87x8lLoqQiJK2bWzLQDIdTNHGblrc%2FJ5fpHewF800Pa9LnzHi4KIIEmNj1zj33e%2BhiCIaFg42iqkj4mCKIKIBCnVN57a3P0wsqqDpBoYIi43V0cPA4AZetoVQBahVA7mV9LQSfAOAFASBWq22KosQ2OUFSmbB4md6epru7m527dqFpmkkEolQCjSXy5FIJNi1axfpdJqvf%2F3r2A5hJNqaGg7APyBgBedl23bYwnbgwAE2btxIt69NHCzeLl%2B%2BTL1eD9tZgrajgMQVRPCCIKDWV0%2FsluWwXCwS89PbsuyZW8hKBN20UJQIlXKJtE%2F0QhAwDA3TtHAdgVptmuHhIbRmo71dJoieIwLpjkmwfPQMi7IOjcowUmwQsNsZfYEaousSURRq9SaWbSOJEql0xotq8b7HQDxj5RBEEUs3qKkNto5uQ1erLC8t4uLSaNRQGw0i0RjZXIFqaYlmo0xElpAjEURZXg22sV6QUuCa1Js2Wv5%2BYkJ7yWux6TDX%2BOGi2h9VtvFneawBtvT29u6%2B9957N%2FzH%2F%2Fgfb9%2B%2Ff%2F%2FXfGx5ZCVhqgW%2FPteCSx%2FF67sN9n245fG%2F8clSIU6tIELhY%2BQngIkV2w%2F7oPtYC%2FM52P8R2UfiP%2FNPJOgdKvso%2FYj%2Fhn%2FG9T6l0y0Mrs%2B2APQXfNp0EBVn8ZQ3PoknozXuf9A9%2Fgf4hM8Yu8s%2FyU8Dn%2FX3a32P8HduGIaTTCbbwhPbttu0kW3b5ty5c1y4cIGbb76Zzs5Otm3bFrqwLCwsUC6XqVarvPjiixSLRRYXF3nxxRfJ5XJtfY2FQoFdu3YhiiJDQ0PYts3Vq1dDO7zJyUlefvllnnzySarVKps3b2Z4eJj777%2BfJ598krm5OZJJr351%2FPhxxsfH%2BcAHPoAsy2GKL6iVBdKKf%2F%2F3fx%2Fq2W7ZsoVMJsPu3bu5ePEi5XIZURSZnp4mnU5z%2BvRplpaWSKfTJJNJBgYGuHr1KgcOHFh1w14eu4ZmQEQSmTE8EUVREsnEElw8e56r41M8sH0zf%2FgL9%2FHZ75wgkY4SUQQcXJKRKNm%2BHqJI4Lgc%2FdoTTJgit929l3tv309XRw5FlnBsGwcX0fGiBVkUsB2Xl46dZuzYs8RFGQcHbBPRAtE2MUULs15n91t%2FnuHRrWiWgYiA49pInpSPJxdYb3Ls29%2FGxERxTCTbQTFNHEDFRnG8WlmlvMDG%2B36eTds3ebVrPFlIzXSo6Qrp6PUfbSKZIpXtwdAW%2FOjWbQPbIGUsy%2FKqlp5A3alWq7XJO7YSqVrBK1gUBiIViqKE6k6GYZDL5cKWnT179lCr1Xjt%2FGUMw0CWZRqNRvj%2BgXtTcK5Bi5GiKGFL0gsvvEBvby%2B33npruO%2F69euJx%2BMsLCxQLBbDlqDg87Wmz70WIW0N4oSCpjsUKw1iURHbVKnpTUAgmc2hNVUUJYIkyR7ZSWv65xbBsR0y%2BQLV4iKuo9OIJMjkOlEiLSQY6wzYYyC0bBMdtEoUw95GJCHjutYK2nwY7nuGCALYpoES9YhMtmUjKzKiIKJbFqIkeFFnEOIGHTquiyDK2I6AWq6wYdN6LHOYsbEx9h28lUBTJ1voIp3NUyku0FQbRCIKjmX62RH%2FGka7INqJq05RqdvEN9%2B26lrOqw7%2FfbzxOL5gMpiWyEWFVhJs5F3vetc7TMO4E%2Fiarx5114qM614fuyotUeY3uM5KDjDrE%2F7r9vr49HArTrWwj4PxDa63Dx32t320JYoN0sltOCn7BwwahH%2BJ66LLp7gusHyXf%2BCcvz3rn9hhrvcXBUydU9tGR78YSGn50etdLauBYAUQHBfg0%2F5%2Bj7a%2BxwoVKl3TNAtYBbatY2RkhP7%2Bfh577DE%2B%2F%2FnPh%2F6uvb29DAwM0N3dHU6OL774IidOnOCOO%2B5gdnaWxx57jI0bN4bm7V1dXSExJZgoN23axKZNXjpo586dbN68mZMnT%2FLkk09y4sQJDh48SDqdRtM0kskkmUyGhYUFLMvilltuCVt0%2Bvr6wgm8Uqlw5coVXNflpptuIpFIEI1GQzDO5XLs2bOHaDTKyy%2B%2FzMLCAjMzMxSLRQ4ePMitt95KPB5HVVVOnjy5Si96oaoxdnUaCYjHFN550w5enZ3hxOQsysAgzaaOaEG5qTI%2Bt0giKfutMl4rjSO6dGYS4IpYpsZMoh9FzHD40M0M9OcRrMBb1jMIkFwHQRTQdYuTJ1%2FhwjNPkFBkdCDqNMER0UUL0bYwm3W23vI2Rg8dBMvyvA9cB%2Fyv1cEj5Lzw1DPUZ6dRFNuzF3IcwEQ0JZBAsiVUs4aUzrLr1luxbNsTnXJAdgVEx2GhYbeBLUC%2Bs5%2B58dk2sA3Svq2gu5KVHIhHNJvNMPJtNSYIFoGtEWjwHQUSmqqqEo1GEUWRer0eRpdLS0vceeedfP%2F732dubs4TavD1mIPjBtsCIA34CEEaGDynqgBMg9pz4Hg1ODgYyjfWajUajUZ4jsH9vkYAiKzI5PJ5Uuk09WqJfDZGVBRYWq4ST6bQNJV0OoPjOqFXLL4CVjyRQK3XSGeSxCIRTEOnOD9BJJYmXehBllywXwKh9Sfu%2BcA60l1YUh60Bkr0Bu1agoAgiMiyhGGaRGIxFN%2BaUBAEmkYD2zRIxFeoqgkeUEciCo2mt6iJJpKUluZIJ2Ps2DGKEom38DhmKVZVNq4fIpXJUy7Oe4sKXScS1G3lNMT60MtjVKxeYomO1cSheY8YtaHLo8qPLdZ%2FqqAWUyRu39TF1aV6eC63b%2BpGMy2OTxR%2Fquc227DJrfCq3rlz58NLS0tH%2FbLj4Zb0bTBOtYBvIIsW9MfmWgDxiA%2Bwd62ISltx6kjLtiNc16ZoVVwcXwG2bTgZiFrc5G9YWasN8s9HWC10UQYe3TY6%2Bkk%2FhP83b%2BKalbmuY7l3BeC%2B0TBVVdWA6MqUXfvvzWOU9vb2hvWqsbExqtUq%2B%2FbtC8FQEATS6TRvectb2L17N5OTk5w7d46jR49SrVZJJpPhhBZEDFu2bGFwcJC%2Bvj4ymUyYKrzlllvYuXMnf%2FiHf8gf%2FMEfsGPHjnDSmpqaYnx8nJdeeom3ve1tYcqxq6sLWZa5cOECL774Ivfccw8PPPAAqVRqzQ8f2Kk9%2BeSTdHZ2MjIyQmdnJxcvXsR1XQ4fPhyyVFetoBsmvd15TARM22RDXwYXnSvLVXTTIJdNU6oscLFUYuKkTiqTwMFFthwM0UU0HRzbRZRksoUe%2Fu0n9jDQnUESvLSiFQCNP%2FfJkkippvHsdx6nOnWBhCJjOw5R00HHQaTp9dQ2q4zsuYPdbz3sTc7BF%2B3YiC44IoiSzMsvn%2BHisaeIKXEwdU8VwzYxA5awqIMp0tB0HvhXv02mkMFqGjiiF60AWLjM1Ew2FtpFyLp7Bxk%2F%2FzwRRQoXb629swGABSAaAG8AtgErvDXN21reCMAv8FJNp9NcuXKFgwcPYhhG%2BH2Xy2X6%2B%2FuJRCKUy2WKxSI7duzAcRwSiURoOqBpGrVaDdu2w%2FprAPKKotBoNML7cnZ2lsuXL4dtQcEiIfjNpNNp0uk069atwzCMsKd3eXmZfD6PJax9LzquQzwRJxaPUVpapKOQplDIUCkuIEdiYQuMR%2BZyME0LWXRwLQ0Bh2gkhuO6SIqCrCgYZpPl6QnyubNE4kvgyi0oqIOwh0RuP7GMQ7W8hNaoIsuCV08N9UTdMFqNRBS0kLEtUy0VEV0DRZaIJ6JIPvu8leTk%2BhkMAQdT1zEMDReJhmbSEbNQq0voWoNs3otqz44vYHONob4euvrWUykuerXf1pHcSkN7Gi19K%2FEVK5cF1QkFZP7lHZsB%2BLdfP3nDye%2Bh3QP0ZRN868wUs5XmDbf9Y8b%2B4Q7uHe3jf%2Fvua15AkI3z0O4Bvnp84qce3V4s2YwW2sG2o6Nj4zcfe%2Bx3169f%2F29kWR7eNjr6RvXZvX5g%2BWkfGAOzgiBzu5frqlBBlLp3BfaVaRewyL0JzHsU%2BKTcEhYHaDzeUosd98PpPf4bBMh%2F2D%2FB9b6rz3reoKHXH58DvuHXex%2FxC8t33eAED%2FvqIIf9PHyzXq9Xua7D3FazWkkUWl5e5uGHHw69RZ955hm%2B8IUv8Morr%2FDRj36UXC7H8PBw%2BPqhoSGGhobYvn078%2FPzZLNZ5ufn%2BcpXvoJt2%2BRyOSYmJlBVlUOHDnHzzTcTj8fJZDJEo1Hq9TqqqvK9732PU6dOsXv3bmKxGLlcjoMHD%2FLtb3%2BbV155hfe9730heC8vL%2FPEE08gCMLrAq2u60xOTvLNb36Tzs5OPvzhDxONRmk0Grz88sv8xV%2F8BQCDg4NrXo9l1USUJBQcFDHK%2F%2Fn0Kc8LNuKZdSdjaWJyDBybaNQG18QxXQzbIyals2l6uvvI5TLkUzFkUUB3HFzH0zj2JBg9E25JgItXrvHas8%2BhF%2Be99J0O2Do2FqJvjmfXGwzddD%2F77rvXJ5I4HuBaIDpepIEocu7sRc589zsoShTMhqcwZUuIjoNjm4hOjagZo1IsseVffIB1I5swdA0kF9H2%2Bno1xzOnV63V7SypdBbLsttSskFdNli4tUa7gZtSQGgK6u3BQq9VR3ml3rJpmgwPDzM%2FP49t2yFByXVd5ubmQm%2FbICsSuAcFRgGSJJFKpULpz9dee42enp7wfUzTDB8HIH%2FixImQkdxKfpIkKYyGg8%2BZz%2BdDoI7FYlgk17gbWz6PYRKLej2okhQlGlFoqBrV4hKReBJdV4mIAhEZsplMyAgOA1IvaEWJJBD1S0jCmRWcTRuIg3RbeP1zhW6sdJ5qaRFVbRBRvHpxcEzHdYnFIiwtLWAYJk1VJZmIkM2mvHad4P1XKrj4fyqyTLVSJpVOea1wlonj2MTiMUxdY2l2gmSmwOGbd9E0TK7NLNKo1%2Bnv61l9qVLrUTWb6Lr9q%2BuQzR8uhdyXTbChK0U8Ir3utn%2FMuH1TF2OLdUqq0RLV2rw289MnZVX01ddLluVoPJHoNAzjJlmWT7zJYC8oXb5rDebwqVac8oPMR1aQrE5x3TEo9ybA9pQP8J8NFKQCoA2KyJ%2F0%2F%2F4i1z37yi0n9mk8F593%2BxEq20ZHT7WE6bSkoYOVQ9mPaIMP9rkWua3yGvt9uiUkB1BLpdIssK71k6iquurTxeNxLMvi%2FPnzoSpTNpvlne98J1euXOG%2F%2Ftf%2Fykc%2B8pE2FyBN06jX66xbty4kSo2MjGCaJkNDQ%2BTz%2BdD4%2B8KFCzQaDWRZ5sSJE8RisXCC%2Fp3f%2BR1isRivvPIKqVQq9BDt7u7m%2BPHj%2FOmf%2FinveMc7UFWVJ554gmg0yoMPPoiiKFy7do1CoRAKariuy6VLlzh27BiXL19maWmJe%2B%2B9l2q1Guo179q1i127dvH888%2BTzWbZvXv3qutR1Uwc1%2FGiSREQJERsFMdBt2wwLaJRifpyhaaq4WSyJDvydGUK9Pd2kcukkBUJyZevMx0H0Z%2B4cDxLtIgk0GianDl%2BkskXX0QUDSRRBtsA28F2JMBAcUx0vcnm%2FXew8977EEXJi1RdAU%2B63UtHS4rCwtIyR7%2F%2BVWyzioTiT78OomN6QIsDikS9XCG7cS%2B3HL4Lw5fOc4KQx3GRbXAQsNYA20g05l2blrJEQEBqBdoghdyaTo7H42Fqd2VpI1CMCpSZgv%2BDdLCu6zSbzVCoItBDDo4ZRKLBsYIUc6tTUVBucBwn7K0O%2Bm%2BDKNwwDJ5%2F%2FnlmZmbYsmUL%2BXw%2BNCxo7dUNRGCC3lvXdbEch5Vi5I7jSSO6joOu1Uknoz7QeZFlKuV9lnq9QUyRyaRTWC2R%2F2rcFrF1lWj0IlKc9q5JwQZpPwidbSxsWVEodPdj6Bq10iJNXxNaaqk9ZzIJVFUjm06QzabbJQ3Xtmn22MyyjG44mJaDZZiIkohh2sQkGSUSRY646GoJTa2QznWxbcMghmmunQGIj6CaSaLp1W5jZxbNNSLLAg%2FtHiSmSJydqfC3xyfQTJuHdg%2FQn4v70ewgRy8v0JeNr9p2fKIYRsknJpfDYx2fKPKtM1Nopv06YB4nn4jw5LnrPb47%2BrO8NlNhQ1eKvmw8TC%2F3ZeNs789SVg2OTxTD9LNmOowt1tZ8DuDJc3MhiMcUkRMTRfYNF274XEk12N6fpS8b5%2BxMZRVRShAEbrrpprfV6%2FWpRCLxuTU%2B1idXPB73I9b1PpDubcGeX2p5fKQFgD%2FHaoOBu1tw8XMr3mst%2FHs3sFdueYIVuWfWKAwH%2Bx3Z5gvst4Bs299%2BvbXsPx5veb5Muyzj%2BA0eH1nxns3p6emzruve3BotBO0zK9IL3HzzzVSrVZrNZmieHtRm%2F%2FiP%2F5j%2F9J%2F%2BE4888gi7du0KJ5vx8XGq1SobNmwII5Gg7Qe8Hsbdu3dz7Ngx%2FsN%2F%2BA%2FhpNnd3c327du59957MU2TZDIZAna5XOby5cvEYjEymQyPP%2F44Tz%2F9dNin2dvb6xOA6pTLZaLRKNu2baNQKKCqKlNTU1QqFe6%2F%2F34GBwep1%2BvMzc2FEbWiKHzoQx8K68%2Bt9n3BKGo6tmXjuA6ODaJl07S8aNSyDJpmks5CLwO5PjKFTjq7cuTTcWKKhCsKnjqTL5bguC6u1%2FaKiCckYFkOZ8%2BOcenlF2kuzRJVZLBlcAzAxMFCEi1Ex8bU62y%2F491sO3QICwHTNRHx5aoQwAZFkphdKvHEV%2F4WsVbHVEAyPR9ayTT9eq6O5IioNRs7meee%2F%2BER5KiIpVsEmXTDr%2FoGJBvTWZ1iV5SoX1a87l%2FbWpoI0rRBrXZl%2B0%2BgSRyYx7eCSnCsoK4a1A4DT2RZlkO2cXAvN5vNEOAjkUgI7gEwBint7u5u7r%2F%2F%2FnBf27ZDdrFlWcRiMUzTRNO0sO1tenqaQqHA0NAQhUIhvK%2BD8w0AOIiS65pKfoUtqWkY1Co1ZElCFl0UORWm6nHB9ftQ87kMzabG3MIi2UyaaCTi3TutgBsQ4MwJEl2L4LZ8P4KLY8rUlntIFIzQEF7XDSanZ%2BjsyFPI5ejoXUezUadWXsQ0NSIRBUGUyOWy5HPZ8G1uJMfZdi54rUOC6JGddEMjnkhiW94CI0j8RqIxHNumWpyjWiqS6%2ByBVcsSMKRuGpEtJJTVPfzWGoHtW0f7eO7yAjv6c2zvz3J7pSsEoTc7gvpvfy4eHmv%2FcIG4IvGlF8bCtPWGrhSff%2FbSitrs9Sh2%2F3CBmCJxYnKZfCLCvaN9nJ2pMLZYZ3t%2FlntH%2Byj5gNqfi4fPn50pc%2B9oH5pptz0HhAD60O4BNNPmyXNz7B%2FuIJ%2BIcHamwmylyUO7PU5LANa3b%2BxmQ1dqTbD1uS931%2Bv189tGR0%2FfIKpc%2BXi8Bd9O3WDfIAo%2B8jqX%2BsgN3utUy%2BtbQfrUz5KohXr27NmX6vX6R9LpdNsVD5iYwQiMuYMJaHBwMCQN9fX18dBDD%2FEnf%2FIn%2FN7v%2FR7vfve7eeihh8LI8umnn%2Bbuu%2B9m165dq4hGwcQUpKlHRkZ4z3veE9bRxsfHQ2u%2BgK0aGL3fdNNNPPjgg5w6dYq5uTkGBgaIx%2BOIoki5XEaWZW6%2B%2BWamp6eZmJjgpZdeotFooCgKH%2FvYx0K5Sdd1Q8F48HosBUFg%2B%2FbtPPbYY6t6hb190oiRBOCZdIuySC4WQ5SiKAmZeCxOOhbx0oGhhoBXixWd68Bhuz4vCVAkAdNymJ8vcval4yxePIsogqyI2LaF5FiAjY3jEZj0Oo4YZe87H2FodDuWY%2BM6DhJg20JIpEESqWoGTz%2F2d9QmL4EUBdMEExxMsDVP38ABzTTRTJPDP%2FcxMtk0hqYhi3jFXlxEV8BB8ByEBAFBWJ1ukyQJWZJDM4CVtddW%2B7xWIhQQOioVi0WSyWRby1AAsK11X0mSMAyDYrEYAltgEBBEs7OzsyH41mq1Nqu%2B4LiBtGJw75dKpVCDuVUgP5BidBwHVVWRZZliscjY2BiZTIbBwUH6%2B%2FspFApIkhT684qi6DGVTXmt1B2pdIJsLk%2BjWroOtCsiRtuxqTZUBCnGcrGGIgnkcmlkf%2FHiax1ia01ikcsIEb9I38pArvZSqUCpcp5soYtMvpNYLMq6gX5mF5e4Mj5NPp9l0%2FAg8WSKRq1Co7qM4BpEIlHwJRVbGcetddqVUbaLi6zI4NgkEkkc20aRFTStQSoVb5sDRFFEiURYXCpTLpcpdHTQ0d2P0MKZ0CwZPXUTCW5cr20dXzo2xmylyWylyS%2FesoENnWmeZI5vnZkOU8bfOjMVAuRa24Lxt8cnODtT4ejlRX7%2FnbvZ3p8lpkhrRrcxRQqj2OD5fUMdlFSDscU6%2BYR3r%2FX5kfSGzjSaaZNPRIgpEiOdHsCfnS1TUg1KqkE%2BESGfiDDSmUIzbWKKRF8uTt43PglAfWyxzv7hAv25eJgO10ybvmw8XDyUVIPZSpOSJLCzU14xt6Vif%2Fqnf%2Fo7PnHW%2BucMYD9LYGstLi6OlUolLZ1OtznGl0oluru7V6OzqoZSdevWrSOXy1GpVDh%2F%2Fjxbt25FURR0XecHP%2FgBS0tLRCIRRFHka1%2F7GlNTU%2FT19TEyMkKhUMCyLE6fPs2Xv%2FxlGo0Gv%2FqrvxpqHSeTSfr6%2Bpifn0fXdS5cuEAsFmNwcJCJiQluuukm0ul0aBiwadOmUJIx0NlNJpNMT09jWRY9PT3k83nm5uZ45ZVXQueXIHUSiFm0qhVpmsbBgwfXFPjYsXUjBgIiAoIoILpeys9B8KJKXC%2BqcG1sR%2FBFe7ztQYZVcMEVBA9kbYeZmSKnf%2FAi5fELYBlEZU9X1XEsFMcG20GUQLYtdKtMrjDMzrf9HLnODg%2FIAhD39Bi9liFBoNrUePwr32T27KsosSgSTSQTcDREW%2FJMChwPZCrLRe785f%2BJHft2oje99hPLcQEL2XXDjKTjR4ZVtQ6kVhDqROLxOK5rtJkJBNc10NxtnWRb08iyLId9sAHQtbKYg6g4YPoGJY5ApELX9dBJKuiTjUQioWmAoighqzkAT0mSwtSyruthzTiImIPUcrA4CFLRoiiGC1NVVTl79izT09NhK1MymeTgwYO4rkulUiFWGFx1LzXqDbaPbqFZqxCLyr76Vjt0iIJAra4SiSaQlQjleh3TAqdcJxKRyKTTCCK4rgjmJLHuIrhSW1Tr6iL1xgjFmoEsuajNSeq1ErlCF6lsBxvWDSC4DqW6iqppJGIxkuksiWQaTa3jOgam4ek8i0IL6AqvH92KkogoevdXvqOTSrlEs6nhtlNFEASBRl0lV%2BhEFEVmpiYpFpcYHNpAIpUJf5NCavPqeu0NWn4CktPrpXvf7Djrg5lm2owt1tnQlaI%2FF2dssc7nn73UPj%2F4QHz0sif1mE9EfBD3ZCIDsOvLetmu%2Flyc4xPL3L6pm%2F5cnP5soo1NfXamzO2buunznxtbrNOXi9OXjaOZ3me%2FulQLAXr%2FcME%2FthxG133ZRAi4wXE126Wiu2RbWoCi0Wh8586do3%2FzN3%2Fzg%2F9Xg%2B0Nmox%2F1OFMTExMLi0tLQwNDa1%2Fo7ptMPl0d3dz5swZzpw5w8GDB3n22WeZnJzkYx%2F7GBs2bMA0zbDX1jRNRkZGeOaZZ5icnOTkyZOIosi2bdtC9Z9cLkdPTw9HjhxhdHSUu%2B66i%2B3btzMwMECxWAxlF7%2FxjW%2BQyWTI5%2FOsX7%2BedevWcezYMa5evdoG5KIocvXqVZ599lm2bNnCfffdx%2FLyMv%2FwD%2F%2FA5s2bedvb3sZf%2FuVfUq1Wuffee0OHmLGxMeLxOIODg2EkvWnTphv4%2B3qG64JXzMR0vfSqiIAdrvSD%2B9QBW0AQQHHxlKIEAUSXckVldmqO8fFLFC%2BeRdQtHMWfnJwmomkhSiI2FooEjm2C1WTDTfew8cDtJBIpTMsgaCmy8c3gXZBEgeV6jSe%2F%2BT2%2B%2F3dfI5aOUcjmwdFJR6OINjiOhoiNikOjprLr4V9i1y27aZoaCF4ka4kecOPYiJaI108soBoa106fgH1vX5U9jMZiGJrZFrk4jhOmgIMoMVjIBEIXiqIQi8VCBnDr6wNAtiwrbOMKgM%2ByLIrFItu2bQst9XK5HIuLi8zNzbFx40ampqZWpY%2BDiLq1zSdQqwqY%2BYZhYBgGyWSSRCLRRooK2OrBcQODi8BUPpFIhJ9pbOwq7%2F2l%2B1bUax1qtQpnTp%2FhzsP3UCsvodbrRKLRsF4KYNk2mmGRyqRo1GoUurtpqg0c10XTbSrlabq6u1Bch1j8EmLU9eTBQiRz0Kr9lBoZojGJQmcXjVqVWrVOo36VTGaZbEcPI0PrGFkZoIoic%2FPzvHTsKLfcfjvJRBTLMYgokRaNDP%2BmF9bgfrku0YiCoWskUklkSSKTSraExZ4alWGauIKMrulomkq%2BoxvT0imXlkOwNQwDOb665We8av%2BzAoHbN3WHgBoQpQLQDMbYYo2%2BbJz9wx1eTXm2wv7hDkY6U2zoSnmRp0%2BsGluqc%2FumbjZ0pujzgbk1Il4Z2XoRbJqZcpOZshfZ7x8usKErHQLydWKZTXZFC9DAwMBOv0vljSjZh3kT7jw%2Fq5HtqR%2FjsZzJycmla9eundyzZ8%2F61slN07RVPqQBUSoej3Pffffxmc98hj%2F6oz8KvWyHh4fDmlxPT09ovh70sKqqSq1WY3Z2loWFBbZs2UJnZyfz8%2FN8%2F%2FvfZ9OmTfyrf%2FWvyGSuF7WC4%2FT19XHs2DGWl5e59957yefzYT%2Fu5OQkH%2FzgB9vs73Rd51vf%2BhaiKHLXXXeF7OjPf%2F7zbNq0ie7ubr785S8zNzfH3r17MU2TarXK%2BvXrw%2Bh2YGCAer2%2BZm1KcN0wWhUdL5o1%2FTYJ0S%2BX2i4ovvi8ILpIgojjek4h5VKVs5cuc%2BXFH3D13Cn6%2Brop5LKIUTAdvYXUYoEtouDg6FXERJKtd36AjTt3YrsutmniCk4Q1GJ5dixEZYlStcHjX%2F5bJs%2Bdo6erAFGRhqqSTgCmHqavTSSWF0tsveU%2B3vIvHsSyLT8t6dsB%2BhOi4zORvYgZrp2%2FBIvXWGsl0lqzDIhGQUTbykwOI7cW958AbFcKYgTgtzLiDaLNa9eusXPnTubn58P07qlTp%2Bjv70eSpLCEoChKKAfZGlW1gnlgSh%2BckxSyft1QTzkQu4hEIkQikdAgIWBEB%2B1Mk5OTzMzMoOmrg4Rms4naUJk3dZRIlEL3AFqzQa28hNFUiUSiKIpMvd5AEGVMTSeeSKL45CVD02hYdVxBplbTySqTxDtL7eljwcXRZWr19TR0i4HBbkxDA1yS2TyGoVMqV2nU66RzebL5LuLJ9sLyY1%2F7a0Y2bObsa69x%2B513I7oWltHEdSwESXrd8NZ1vVq5WmngOg6RaJSmoa0CZVXVkZQYmq6TyuS8th8hQrPZCMUtLMsiEk2szrhZ7k98Ys8nIiH4BUSqUsNYc7%2B%2BbDyMYgG29%2Bc4O1MJX%2B8BXoXbN3Wz3yc0jS3WmSk32dGfI6ZIjC3WVkXVG7rS5BMRri55gPqWTd00TZvZSjME3dbI2wPhMrMVNawbtwIywHLTZfMK%2Fu%2FAwMAvsMIC9gbjrjU4SU%2Fxk5d0DMH2Ef9x4Dg%2FzHW3%2BoCRFbjWf9rf9vD5c%2BcCRalPbxsdPeW3AOHv%2F0mfKPVRYM3nfNGL3w8Aedvo6CfPnzv3%2B60sr1by1flz5%2Faqqvq5548di5TLZbejo6PtFzM%2FPx%2Byi4O65rVr11hYWAgnmTvuuIN9%2B%2Fbx6quv8uKLL3LzzTe3RSRBX%2By%2Bffvo6upicnKSJ598kuXlZZaXl1lcXGTjxo3cdtttIYlkraHrejjxBqbgr7zyCn%2F5l3%2FJ%2Ffffv8pnNtBubtXYPXDgAI1GgyeeeIKPfOQjjI%2BP81d%2F9Vd85zvfYXBwkI997GOhtGOwaEgmk1Sr1TXrzC6ejZ4guLiuB7Su4KVYJQHPDcj1gKVaazI3O8%2FMxCSNhVnUhRkc08TUGySiCRxkMMGSLKKmV5v1kQ3HUTH1JkM7b2XLWx4gnUli2oHFnseqEh0wXRBdF1GRGJua5%2FnHvkVxcoJsKkFKgbpZJ51QUADH1LElG2woFktsuOU%2BDn%2F4Q%2BA6OK6N49NXZNfxU5oODmAJLiISYxPX0K%2B8Qmc2snohIoBj2%2BzatQtFUUIbOk3TQvBtNps0Gg0ajQbNpqe3K4oig4ODRCKRNinPoO4b1Fkty2JhYYHe3t4QkCORCAsLC5w8eZLp6WlUVeXChQtUKhXuvvtuXnvttfB7DXpjA2ZyKztakqTwXpMkKVSkCnp6dV0P67fB%2FkGEGiwugoWqKIohU9qyLLL5zjXBtl4t8Yv%2F%2Bjeu1%2FviSWLxJGq9Sq2yhG2aaJqOqpkkEwkU10FTGx5fQBCwTAtFVlBcg3T2KoIckON8DBQc9OoAy7Uk6awH1I1alWQ6i641EQWXdK6T5YV54kmD0tIMy0sLdHT1Ek%2BkOPr09xlYN0wqnWHz1m2kM1kmx68yOz3Jtm1bsS0NURAQJJG2wqlfWnFxPZKUcJ1V7oAn8%2BjLWOqagSDK6JqGpCg4pkk0HodolHq5jKlrRGIJ%2F7rKa5CjfnSw3TfUsQqA1tr2vv3DPHl%2Bln1DHT4YXm%2FpaSVIbe%2Fz0uNB9Lm9P0s%2BEeFbZ6ba3vd6nTgePh5bqoXkp7OzlVX7rxTruHe0j5gi8UQL4zk4TsB4bq9Je%2B%2FVmlavm6uvXTwWy%2F71X%2F3VB2%2B66aYv%2Bi05632W8KNcVzcMxtMtjz%2FrY9Ij%2Fr4rX9s6WrHpk1xXj7prDTYzLbgZdPk8KvvgmvPR%2FaR%2FoKDPKJCy%2BqWWk74br0cpcLT%2Fhr%2FtEf%2F%2FP6NdnJmVz50%2Fd%2B7d%2Fom82z%2Fpp86fO%2FcYsH7b6OjdfjvRuwIgPn%2FuXA74bLlcfvfY2Njbh4aGDgXi%2FzdiJQf1TlEUw8j0%2FvvvD1f%2F58%2BfZ2Zmpk0PORKJtAn8B%2FXaQInnV37lV9i7dy%2FT09P85%2F%2F8n7l48SK33nrrqi9%2FamqKS5cusW3btjCFGNTK%2Bvv7V533%2BfPnQ4JL4NYCcODAAc6dO8fly5d529veRmdnJ%2BfPn%2Bf48eN897vfZWBggK6urrCNJHCEWZUSsEx0V%2FIiStdBtl1MX%2FHJtEwMw6RRU5mem6U8M0llZh69WUMRHaIiSMigiGTFJKkBBQkR0dHQAVE0ES0Fx1ERzSbxjiFGb76f4e3bvLnMtH2xCt9n1nZDUo0kikxOzPD9r%2FwV9dIyUUXB9H9YCTuFKameiIVkI9lQXqwzOLqfd3z4Q8hRGQwLGdEX1XD9RLi3aBBxQYLK4jLLx58jJzrEpNVg6zg2W7duoa%2BvJ5RRbI1CA%2BJSUHcNrnOj0UDTNG6%2B%2BWZ6enrI5XIhQAeAF4BZkEJuTVFLksQLL7zA1q1bGRkZYX5%2BnoWFhbCWn0wmQ1C3LAvLskIv2lbhjAB4V6abg17gwGigtT1tJWAHIB6JRFBVFUVRuOnm1Yt917G5%2Bda3rMkLSKQyJFIZ6pUiatPE0D395Vg0Si5fIBqPo9br2LUq8ViKtHKOWLrkWei1RrVahKXiAJrtENV1LMMgmcqgNRtIkie5aBoaLlApe56%2FmXwns1Pj5HIF8oUC41fH6OrpZWDdepqqyjNPPU4ymSaZyqDIMt3dHZhNFSWiIIpSaFAQZi4kEUnyFgbxZAJRkjFNi5gsAy5NzUCUPXa14ms%2FG6ZBNB5DVVVPwjEE29UM%2BB8Fa09MLtOfi7N%2FuEBJ1RlbrK%2B5LeSxqEbYBlRSjVXgGYz9wx0cnyiGgLbfJ0adXaO39uxMhe392TDyDCLWIDpt23e2EqaXVy4EVh777EwlBO2ZcrMNrFeCuLZGVkBWFPMDH%2Fzg1%2FygLmgZ%2FYKPH8G2ca6rSNHSprMXr8U1kBYe53qPbQCe61sw8mEfE5%2F2g8kA%2Bz6xIrp%2BV0twejIAW7guc7WS7rzXR%2B9vrCw7%2BNtaw%2FFTQSTqax7zOs%2FtxWsfKvuR7ylfrvGj58%2Bde4r2%2FqVw%2F3ve%2BtYi8Pj20dHi8PBwR6vFnK7rLC4uhv60mqbR3d3N3r17w1RwEDVu3bqVzs7OcMIqFouoqkpPTw%2BxWIxSqYRt20xPT1Or1ejs7OQ973lPmHoeHBzkne98Jy%2B%2F%2FDIjIyNt%2FboAi4uLWJbFHXfcwfDwMKZpUqvVwvahlXWwwcFBBgcHeeGFF5iYmGDnzp3eBJZI0N%2Ffz%2FPPP8%2FevXvZt28f%2B%2Fbt4%2FDhwzz%2F%2FPN87WtfCxWtZFkO%2FU5XcdQf%2Fy7j05Uw04tpYKKB4yCaFlg6JobXvCBDggiSDCIOjiPi0EBxJF9B0cYGRMckhYhpOljWInKyi21veQ%2FDe3aQCMlSdpi%2Bdn2hCst1kAUBRxI5%2FvKrnHjsaziYKKIXwTqOjWnqiNiIHjoj2rBUrDC4%2Fw7e8cuPeO0thgUIyI6LKPjpY9tFDCJaUURrqMyePEoOA0WRSa5Zz3YRWlp6Wtt8AhBrBctoNEoikWhLCQep2oBh%2FOKLL3Lt2rUwMsrn86s0l5vNJps3b%2Bahhx7Ctm3WrVvHyy%2B%2FzJkzZ0ilUuH3GCwWg4i5lXTV2ncbsJ%2BD8w0i14BRbxhGmGkJUtBBujzo2W0F4w2bd61OfzYa5Hu7KC3Nk%2B%2Fsvq4DHDKQHVLZAsl0jlRugfmZGZpqA0EQyUsSaqOBpESJCnXShSmQhBVupA6lxT7syCD9HQmKS4vMTE2RyqQ98RHT8FMRDoNDQzSbTaqlEgtzcyQSUQQMBvu76ey4n2KpgiRJzE5fw7ItSqUlRFHg9KmTDK4b4pbbbmNpfhowiUYi4T2ALywViShUy0Vsx6ZSqSJmkyQSIg21gSgr6M0mcjSKY1lk8wUaagPLNJFlEdtvHVurtOWzItrGSuWoscX6qm3HJ4qrJBPX2haMrx6f4OjlBeIRaRUQthKkPv13Z9oZ0X570Fpj5XNrnWcwjl5eCAlXN%2FqcrcSwlc%2BtJHGFWYE1ymSSJIk%2BG%2FlhVqs75VrKmY%2B%2BybLnkQBzWnAx5wNyecXxgr9XijOd9oF%2BPDinN3JeH%2FcPdLcfhY774Lvel8b6ND%2FaKAcn4Eete%2F1o9nTLcT%2B74jwOA%2FzBH%2FyBFI1GKZfL5lrs4wB4Lcti3bp1pFIpOjo6cF23Lfrt6Oho216pVHjttdf47ne%2Fy7e%2F%2FW2%2B973v8YMf%2FIBSqcRb3%2FrWEGhD9N%2B7l2KxyHe%2B8x0WFxdZyY7O5XKMjIwwODhIKpViYWEhTOm1RQSJBNlslpmZGUZGRli3bl0YuQiCwKZNm5AkKWwpAujv7%2BeBBx4gHo9z%2BfJlFhYW6O%2Fvp7%2B%2Ff03T%2BIhaozZ%2BHnXyNdT5y6jFSczyHHa9AroOokVCFImJEHM8shOOgeSYgOXdJA6AiuR4dnaO3USvF8l0Fdh2x3u468O%2FztaD%2B4iJHiHHwbneV2l7AOG4DlFRpN5o8sx3nuDlx76MhCdCYTomtqmBrSNiAiqOo6LaUKyojOy%2BmXf80iPIMQXLtvxJy8HC8QrOroMjOFi4iMg4msn4yy%2BhNBcgCcgWQmKNH6%2FpAXHQvyqKYlj3DP4JghAauQcyna0KUQF7OZlMcu7cOV577bUwaxG0nwUgFvTw3nrrrdx3331omhZGk%2Fv27WPPnj1tRgZBS04AlPF4nHw%2BT39%2FP%2BvWraOnx4vIG41GSIQK3jNYdAa6xwHABvXaIGoPAFzX9bA9qad%2FZHW6LpkgW%2BigVikzfvk81dJy26LxwpUJXjjxCrppUOjsZeuO3fQNDKLrDSbHr9LUNGJKhFRsAiVV92q1ARiJLlY9QaU2TCLjmXT09PXT1dODYejMzU6Hi5lYPE4kGiWTzdK3bh2pTJp6XWV6ZpF6vUZEduntzlGrLKNpGo5ls35kE45jk0olqZSLXJuaoqt%2FPalslydg0aIChuMSi0VRGzWW5ueJyCKJRBzbsdB0i3gyhao2aDbq2I53re2QJe6x%2Bl93%2FORLtiGI%2FbT1ln%2Fcw16DyC1JUqAHdgp4t48hp1pAMtcStL3eyK0gUgUjiGTvZrX%2B8o1GkLlts9h7I7B92kf0IPd8Cvh9PwI9AuQCFak3O%2Fyabfn8uXMn%2FRMp%2B9s%2B4R831wrk20ZHx8%2BfO3fk%2FLlzJx3HGb98%2BfLCxMTEcnd395aVKdlgkhkcHAwFHnK5HP39%2Fei63uYJGkxo%2Ff399PX1oWka69evxzRNXnjhBaanp0M3nZXDMAy2bNnC5s2buXjxIrqu09%2FfjyAIlMtl4vE41WqV48ePk06nyWQy5HK5NtAMftyqqhKLxRgeHl51fgMDA6RSKR599FEcx2Hr1q2k0%2BlQL7evr4%2Fu7m6mpqbo6upaE2w39HfzwunTmAC2RULyJgPJcbyUsGcC5EWykgi2gtdvA6ADEraog26hmQ0Skky8q4%2BNNz%2FAui2bScSiYHtqVKLj%2BiIVjqcu5YCJS1SQsAWX8auTPPut71BZmPT8bG0H21S9ei86tmOCbYOjYJoq5eUiW2%2B%2Bj7f%2Fyi8jCxKWYXr1P8cjP1mOi%2By6iA5hGtmybS6fOYlYHCMejyI6IhIWqXh61bUxDY1oJBqyuFtbd4KFWKBhHESSAdi21lUVReHxxx%2FnqaeeQlVVhoeHkSSJZrPZ1oMbtHa95S1vCdPMQQo3uId0Xefq1athPXXLli1Eo9HwvYL3DSQfg0VCNBptU60K2oCCz9YaWbcqUgXM6oBU1Tcwsma9NhGLEovHkVNpDENncXGO0vICnT0DJNMZhvp7uDppM3ZtlnwmRXdnJz39QxQ6u5mfmaLRUJHtZVK5Kbzen6BW6v1fWuxFjPegKFJ4HydSKeLJJNVymUqpiO24ZHM5lJiJ4i%2BQZEkik8%2BhaQYLi2UEHLo6C8Qsk56uHO%2F7hQ9y4vhxvvblv%2BLDv%2FQvOXPqBC88%2BzSLC%2FOsH9mIFElhmRq2piPJApLsyakODw%2B2fd9eCt%2FTTpYkCUmWSWVz1GtVHMsinkh57kauHeLpWpHtT2MoskQiGqHSaP7E3ysR9cRYGpq3kM4m4zQN802Zxb%2FRWGudIgiC%2BF%2F%2Fr%2F%2FrfT5mfMMP4I74%2BPXploi0fAOAfcQvcT7Vkt1tBdvH%2FLR0UNp8ZEXt90ZR8jdaAtZHhDVSvm8WMH%2FkC%2BZfjJwPojngG29CRLrtAv3Wb%2F3W777vfe%2F7jUwm0xYqZjKZVXXRYIJpbd94vdFsNvnmN7%2FJ6OgopVIJx3G4%2B%2B6729jPzz33HJIkcfjwYarVKlevXmXjxo2k02k%2B%2F%2FnP88QTT%2FCpT32K6elpBEEglUrxmc98hoceeohf%2FdVfbZ%2Fw%2FegiUAxaOV544QW%2B%2FvWvMzo6ylve8hY2bNiAJEmcOnWKarXK%2Fv37uXr1qkcgqNfJ5drpeuPTs%2Fz%2FPvt%2FIwGi6GndKJKII4oogC2BIipIoulrF0cxJR3FBsnx2MA1RyTd0cO6nbeyfssouXyaSCyGazsIjoMdWNC5LmJAVPKLU4oosVSrcfL5Fxn%2FwdPoZh1FTGE6KrZtgumZCkiYiL6pj66ZLKuL3PL2R7jj%2FgcRZBnTMb10sesi2i4GvmEBnoyk6Lo4gsyVUy%2FiTJwlHpWRRLyuAKXB4TvuYtfedjnLq5dOkRRL5LLpsM2nFWiDFGvA%2Bg0izAA4g5aaJ554gmPHjjE5OUlPT0%2B48BIEgUKhQDQaDQlIHR0d%2FMIv%2FEKYpg5ITuA5QNXrda5cuYKqqmG7ThA9tzKjA6bzwsJC2OPdev9EIpEwfR0YwwccgiDaDsA6mUwiiiJLS0u89R0fZdvudku42elpenu76OzqRJLkkM%2FUbKqo1QqxRJK%2BgSEkJYJl20zPzpNMxOhsKZs0Gxpm7QiZwnEQlOszp%2Bhg1hJcmzpIqmcDstTu6COKIvVqmURUpqnrFJcrIIhkC3lwXBq1CulMDllRiMRilEsliksLJJMJ4rEIriOQTKVpaBrFpWVcYGFuloX5Gbp6%2Brl88Tz%2F8n%2F8NySTCUpLCwiY2LYn8BGoYl2vWzuoqkaxVCGT7yCby3mZKEGgVq3SrJXo6CjQ0bOeK2NX1uRQ%2FPnZ5j9VcHv9XlBkMokoS5XGGz7XmU1SVfUfGRy7cilqqo5mmIiCQG8hw1yx2i6A8iOOpCLwvs3tilyNRqN04MCB%2FcDVFoz5ZxeV%2FzRFLb7gX5Dcivrsmxn1L33pS3996NChD%2B3YsaOv9YlqtUpXV1ebolTwg32z49KlSzQaDYaHhxkYGODUqVOUSiXy%2BTzgtQc1Gg3uuOMOBEEgm82ybdu2cKLL5XI0Gg0EQeDgwYNcunSJpaUlms0mc3NzoVpRuOpUlBuei%2BM4DA0N8a%2F%2F9b%2BmUqlw7NgxFhcXOXToEBs3bgzlIXfu3Imqqly%2BfDms5wVj%2FUAfiYiIaTSRHNmb3GyfFoyCIoo4YhMJE9UxkVS%2FvpvtJtrRTaZjHbu37aJ%2FsI9YIuaDnYNtGn77kOClml3XS%2FMETGNRwrQtro5N8vQ%2FfIfK%2BBixqIgixrGdOtgmkmljOyaSbSICpilR0WrYJtz%2B0K9wx0Nvw7YsD5R9AQ7RdTFwAE9QwQFk18ZC4srZs%2BgTZ8knQURHdsARHRzbpm%2Bgb3UaWasR74iFqdVWFnE2mw1rpdFodJWoRTQaRVVV%2FuZv%2FoYLFy4wOzvL4OAg2Ww2jIZs26ZSqaAoSqj2deedd5JIJMI6fqtBfeAWFRDfggi10WhQq9VWtSMJgsDGjRtDudHAgi9wCAoAPUgtBwuKVqei1nvFMAw2bNmzOpNj6pi6hlqreq0uftSWSKQAgcX5WRqNGvlCJ51dfQwP9q%2BRho4Qj8577GO3nTFUXupHSvagyF7dPBR7EgS0ZhPRtXAckVQyTiwSYXp6juWFBa89JxLBFfAYwX6JKJlKMTF2BUmUSOcK6KaJ6DoMDvaTSOcw%2FesXi8XYvXcfyVSK5597mrFLF9i77wAbNqynVlkmoii%2BS1AQRYlks17aenF%2BDse2yGRzSJJEaXmJeET2%2FHQt43Xrtj%2BtIYkiiVgE23ZQdcOPRBUkUSSdiKGblrdPVPG%2Fd4t0IkajqROPelyApm60kRyjihweSxQEZFFEM8wQyDXDJBZR0E0L23GIKDKyKIavSSdi1FSNRDTyhvuIwppzpPVPl5z%2FGQNbnxj1j%2Bltsubm5sZffPHFvx0aGvr1dDotrGQit7KMf5jRbDZ59tlnWbduHdlsNpTTe%2FXVVzl06FBok3bo0KE2slPAYAZPraparXLkyBHe%2F%2F73s27dOq5evRo6xbg%2FxApPEAQ6OjqIRqNhavzKlSuh5GPbZBaPk81mWVxcXOUg1FeIcOnaHCIKCjYSDrYu4sWTgKKQSuTId20js3eEwfUjdHT3EkvKKLKC7ApYro1jWri42AhIuNeFKXyhCsEFUQBHkplaWOLEke8zd%2FqE%2F6OWcRwL29Y9opUJEg6KR5FCN02KagXRtnno1z%2FNpu2b0DXDs4YR%2FIjWcTACj1NcZJ94IApRxs%2BfwDl%2FmlQm4jsMRUA0QHKIRmQ6fXvD6xkFAwmdZCKDLMuhRZ0gCORyuTYHn5V9rqlUKnSFOn36NKVSid7eXvL5fFvNtZUdXCwW2bp1K1u3bg2t%2BVoNDxRFwbIs5ubmqNfrIbkpaB9LJBIsLS2F0WhQMpFlmdtuu43e3l7Onj3L0tJSeMxYLIZlWWiaFp5LsGAwDCNc6AVSjbv33UYk1q6vrWsaqUQCwbGJxpPMzczQ3dfnuSS5Lk1VJZcvoGkaS0tLVEolunp6yBa62khUjnEKkWtAQGwUQLTQluPUtGHSvSncQFmMMLuM0VRJxCPUVQO30SSXTdLV1UGt1sRxXY%2FEVCqB66WdRUXBNk1SqTSdPX2UlpcodHXjOg71aplq%2BSq7dm5nZmaeEy%2F%2FgJ%2F%2F0COUS0WKC3P09PYxPT2FrEQYGBhEb1Q8zeVoBFGQcAWPTR%2BLx1guligulWjU6igRBUvXyXV34Lgulm3dEGRbfev%2FqYG2kEmgGRbJuCfPWlO1N3xdOh4lqkjopo0iiSRiSRbLa9eCYxGFpmG2%2FC2jGRYRRQrfLxWLhADtpbcVaqr2pvaR17imtm0b%2Fx1sf7Kj%2Bud%2F%2Fud%2FduDAgffs2rVrcEVaIWyf%2BKEQ3LI4deoUoihy8OBBwNOnzeVybYzjIMK9YRqlq4t4PM6VK1e4evUqoihSq9XIZDJ0d3e%2FbiS7FtgG9TqA9evXk8%2Fn1zRgCFKea9nsvfWBh7Ffeg1kESkiExfjEIugRFKkU2kyHQWyhSyJeMwjCAkuWF562LVsmjiIruDPFJ73bBDRWo7X1uOIAjKwuFhi7OIlTh99Cq1SRBFFr4Zrmp5WsqN5souAg4ppK6iOSa1SonNwM3d%2B%2BBE2jGxE13QsPPay6HrvY%2BE5BPnTN6IIlu0y9tor6FdfIZmJ4FnTOsi2128rYjPcv3H1DVRaJJOOEo16rTHVapVIJEIqlQojv2DCbM2MRKNRJicn%2BepXv8rJkydZWFhg%2Ffr1dHR0hDZ9K8E5iHLK5TLz8%2FOhwUFQLw0M4K9cuUK1Wg2jzYBQZRiGZ8Aej4dRcfA%2Bge7xrl27GBoa4uLFi4yNjbG0tBS2lLVKUQap6aC%2BG4%2FHQ1A%2BdMdDq65TqbSM6Npk8n3UKhWisRiKLHtAZ5lUK56vbk9vH7KiUKtUmZ2eplxcprO7l2S2gODWEdyjK4zhHSCGKd6NHE%2BCY4KsICCGSKupKpGIiK6bJNNZREmkXqtiWyaSIlPIF6jXqlQqZZYW54lWq2RzOUrFIp1dXciRCJIo0ajViMXixBJpbBuW5udJxhTe8c53Ikkir545jRKNodZrZPJ5Hv%2FO3%2FHr%2F99%2FSzqbo1GrUK8uIbomET%2FDkculkWWRSrWB2vC00fO5NMlUHLXRRJaVG0a2ovCjtf%2F8Y4coCCyW6ziui2kppOIRaoCqm8gtwGs7DqreXmOtN40wWu3MJklEI6i64e9rtIGrql8H23hEodrQwueC%2BrFp2yiyhCJJaIZ%2Fj5v2G%2B6zlpugYRh1fHuSn0WwDdhY4z%2BpN%2FbN5h9tdfppee6GMo8%2BGWuvC18cHR0de%2B65577Q39%2F%2FOx0dHW1fw%2BzsLCMjI2%2BqRhvUOpeXl0kmk7zrXe%2Bir89LOSaTSbZv335Dr9m1RjabDQ0IlpaWyGQyodBGawT8o45sNhv24q5aWcZia37mPTs2I23YEwYUDl7nBYiIrt8D65OaLNPEwkVxPWk6148eQ0JLsDjxq1mKJGG6NrVKjVdPvMq5F46ilZaRog4Ktt87a%2BL4v0HFcUA0cSQbUzUpmyaUNbYcvIu7P%2FAhkpk0uqaBCxE8UwHL8VPHtn%2FTui6WBIYtMv7aSewrJ8kko4g4yLb%2FuQAFG8Q4Ixu3rromy4tTJETV641sNkPFpsBjNog6g7aaoA568eJFvvGNb3Du3DkWFhYYGRkhm82GQNtqXxdsC5jFrb2zQYQaAPPs7CyLi4ttrTsBO7her5NIJEKiViaTQdM0yuVymDIWRZF0Os3%2B%2FfvZuHEjly9f5ty5cyEYty4Egqg6YCmbpkmuo4dUbnWqXcSht6cT17bRmw26%2BgZ8IIFGrUJXR45ytcb01DV6%2B%2FvJFgqIkkRxcYGmppNOlujtO4usVMCJtgQhBq57E%2BmuPcSyOtXSIlqjRrlcJpXOkspksU0NOSJhChKy4qX007k89XoNu1FlfmaaTDZP%2F8A6GvUatWqV2ZlpopEIpmlQr1YQRAHTMHBsG0PXyXd1ed%2BF2mRhfo7iwhzbRrdy8uQJYvEE41eu8IGPfOx6nTCd9YwOKiXURhlJBCUSJZNJkUzEqdVVarUGnV2ehrooR1Ai0fB6ryxhSYLgqaf9Ew%2FTtsP07w9bP9VaolXdtD3W9RpgHosolOvNMMq1HK8rQTNMsskYkihiO44fJUtElOtA%2Bmb2icvCWtnIEqt1kR9pwbDxHwPGPeITp9bz%2Bm5ANxqHbwS24zdgbv24gPYwniH9F1%2BHyXWj8VmuewZW%2F%2BRP%2FuRLe%2Fbs%2BRe33XbbnpVR6rVr11i%2Ffv0bM9z8ibVQKDA4ONgGVms5%2F7zRSKVSdHd3c%2F78eVRVZc%2BePVy9ehXLslhcXFzzB%2FhDr1Jv8PpAUH5l3TYuOiQEk5ItekQiPBao6IpoeO47jp%2B8MxFQXD9FjNe76tguouh47RqSNwUjCji6wdi1KU6dOsHUlSs4S%2FOIksfC0hwbxfbkHCXbxkYHySNo6Y6JqWrUVJVYLMstH%2FkEe267CUf0FHocwWM1WzhYFogIRBwBCwfDFRAlwHYZP%2FkS9ux5UskoSDIRLF8%2FSgcUZDGOblts2r5l1bWamrhMLmFTrZRIpVLEYrHwfpmfn2%2BTAe3u7iYejzM9Pc3Xv%2F51zp8%2Fz%2FLyMps3bw7dm0zTDNWbYrFYeExFUchkMvT29obtNkEGIgBbwzBYWFhoM7EP%2Bnfr9XpoJh9Eyp55gktnZ2dozddazkin09x0001s2LCBV199ldnZWZrNZmjpF7Q6Bd61oiiy5%2BADq65RrVohn03S3dXpAV06RqNZwzB0XBeiEYlsNo0sS5SqKmqjjih66UAlouA6IopzGdF9FdxIC9A6QAJB9jJISiRKR88gmtrAsS0WF%2BdQ63VyuQS6bpFI58KFnus4uKaBokRIZgpUymWq1TL5QoG%2B%2FkFKxSWvLOATwVw%2FveziC1b4KfZoPEY03kdTrVMtLbFnxw5S%2BQ4unj9PZ1fPit%2BbRDrfSSKTp1ZeotmooCgSSiRKNpMmk06CX19OZbvDMoJpmqv0yiMS6P%2Fs47DXj5DXAutYREEzzPC5WERG9TXHHd8fORGLoJs2ummRiCpEFTmMfN%2FMPist9rzMS%2BkqsLIV9KMtoLgWoN71Os%2BtNT7q73vXjwi2d62Uaxz3geywD3inuC5TdYTr7Ti%2F7wPmkW2jo5%2F2o81Q0nGlx22LDOORbaOjQQ9tjutm9Gt9sFUyj%2F7%2Fe1ue%2Fz1VVe954oknzl69enXjyMhIW%2FipaRoTExOremTXSr%2F%2BKKB6w9qIb1YfTHzFYpGenh56e3u5cOECtVottGf7cQ9FUcjn80xNTa16jwHFpGJEkPBNBgQXS7A9U3j87KxrI9ueF5AjuriOi%2BOCi4AoeEipGxb1epVrkzOc%2FP4RlsYvoSgiiBJIIoqtY2KjmKYX0TqSR4aSwHY0VE1B1Uxsx6RnaAd3f%2FBX6BsawGiaYFn%2BIsAvbDnexOw4Er61PKIgYGgaC6%2BegIUrJBIyIg6WqOE4ICIjiQoiIg29yaE771r9Ay0ucey5x4lFIKIooY720NAQHR0dpFIp0uk0sVgsFPwPNIxPnDhBpVJhZGSEVCpFLpcjm82GaeRGo0EkEiEej4dtQ7Ish0Iq58%2BfZ926daGblCAIlEqlsN82mKANwwifD5SjFEUJ24QCpmugzx0wm4O0pSRJJJNJ9u%2FfT7VaZWpqitnZWWq1WrjADKLcvv4hBtZvXzOFvGG4z1tAARISuUgETdMwDItE3FvYNVQNRfFStlaguuUKJESNfH4MMbJCwEKwQDoEQntJJpZIMjiylXxXH%2FNTE5SWS%2BQ6e5BkxTOuF0V0VcUwPEnERCJJPJGg2WhQWlpCkATyhU5AQFW970EQBSLRCOVikWw2F4KB6ztbxZMpYvEk5aU5wGJkZB1qrUIinV3zt53r6MFI56iXF2mqTb9P2zs%2FBIm4b0QQ1OBXLcYVgZrxz6vEuDrV3f53Mhaloel%2B9CpTrK02f2mNQAGiikxNbbSQ7GwSUYVSvYlhWuRTcRzXbQPuN9qnZw2wjcViNz3%2B%2BOP33XfffV9%2BnY%2B4Fo69y98e4N56rkssPgb88Zu4dDlWyzx%2B1g9WJ1oDykCucS%2FXZac%2B2xJe%2Fz5eP9Gn%2FceP%2BPtXfFnFb%2FhAu5akYyvQBvt%2F9vy5cw%2F7H%2ByulaDcMva2hO6hzKN%2FjI%2B26ChX9u3ff%2Ff3vvvd%2F%2BPc%2BfMvdXR0HM5kMsJKwlOgLPVPNVzXpVgsYhhGaO0XOKvkcrk1f4A%2Fzh9NNpvlwoULq8A2pziAg22DKXpuO4Lr2buLjosVOgB5lGIZLxUqCp6e63K5wsTVaS69epKla%2BPMjI%2BzuFiiUMiSTqdIKoBpY2OHQhiO5zyPg41qOqA5qOYSEOPOh3%2BZPYffgizKGKrh1XP9mrDjWuAIiLaNiIiD7RGjJJF6tcb4y89y8dl%2FYGhokHxHgaikEI3aOLaCKDlEgEqzSVWts2HjhlXX6fTxo3TkM8Sicig20Ww2mZiY4MqVK6EAhCRJYdtOV1cX5XKZQ4cOhfXR7u5ustlsCKiGYXDixAmOHj1Ks9kMU9CxWIxisUgsFiMSiTA%2BPu6ZrOfzISmq1d4vmPwCB5%2BgjzZIRbfu18qiDlSmgok%2BiJC7u7vp7e0NbScD68nBwUGWl5fZfejtq66RqjaIRqNUqiqyWCSdSfvuOS6yJOPI3v1iGCaCKJPN5dGaTQTfD9d1XPLZOSLpsi%2FL6HOMRRdHj1Fr9JHqsNcseyRTGTZs20W1vIxar2JoKnIkius4GFoTQzcRJYtKuUgsnkBWFPrWraNRr7O8OE8sFifX0UlDbWCaFpVyiUg0iihJbZO7IAgIgGFoxGIR4ok4lmVQb9Ro1Mqkcx3EEqtLSJFIlEL3IIbWpFpeRGs2sR2bdK4n%2FO4ikciav%2FWBlMRsw%2FlnA7SWZSMKAv0dWWaWKzR1i0I6Qa2ph3XcREwhHpVRJImmYWJatg%2Bw19uGWuuziiz55DWnJf1skYxFwlqwl15uvz6vt48sQiEmruTZGEePHv30L374w28DWsH27hVAW%2FG3fRZPaSoAylbcW%2B%2Fj2HjL3%2BMrjrcyqv0Gq2Ue97JaX%2FnTQX4jaL35YkuEG%2BS1D7dErX%2Fm%2F303wLbR0Xf7Ee5hVks6hrnqlh7ax%2Fww%2FOk3eR%2B8ngTkYRfuPnfuHE1V%2FZuZmZmHL5w%2Fv23f%2Fv19K3%2B8xWKRbDZLq7zjT5S55UcRiUSCzs5O0ul0myrUTxJsg9W34ziUy%2BVVPbcbYxYXGpIHrqKA4ngRkSO5yL7tmOO4mIZJva5SrlQpLS8zNT7G7KWL1EolFNFEkmLkslkS0QS66VmvxdJpJGwfYG2QTBzbxNYlTDRsAxyzxsiOwxx86D0MrB%2FE0E0My%2FBSfD74B62JfgmZwO9WFkQWFxeYPXGMpcuvokkxKo6NWW6ypUvxarSS19pUqldRGyYbtmwkl29fdOi6zoVXjpFKxolGI22m7EFEEolEyGQydHR0UCgUwug1n88Tzw2DIINVxTGqYQSqad5Ec%2BDAAYaGhnjhhRcwDIN8Pk8ulwv9b4M%2B13K5HKYaA8JTPB4P08iapoXEpYDQFMguWpYVZk6CPu1AXKPVcL7ZbIaLhgCM8%2Fl8%2BNmy2Sy1psvg%2BtV98%2BVyiUI2QyaTwkGgVKoTjUgkkwnqjSaCFMWsquhaE9MGx3ZIZ7JUSsuYpk1C1kjnJnxGEG3EqOrCINPFBvLCK3T19FLo6l3zXs7kOkimMtQqRbRmA9OyUdUakWicju4e9GaTZr2O7TiIkkgikaSnf5Di0iIIAul0hkQ8ia6pxOKJNqAVBYGmqmJZJrZlksskvH5tUSSWSGBbFuXlGeRqnGy%2BCyW6mm8RicXp7B2i2ahRr1VItkTD8Xh8zYXEWqnQn%2FQwTIulirXm347rMl%2B67trT0PRQkCIYi%2BU6EUXGtp02AG09zmzxugmKadmrGMuaYTKzXGk75lq14Rvts1a9VtM04S233%2F4xSZL%2Bj9erl7aA5WMtKeQ%2FW4F7n%2Ba6acFjP0SK%2BVQLEAeB4qM3IkitX1E0bq3dBqpRj%2Fih8XiA%2BH50%2BbQPiu8ODANW1n%2FPnzu31wfNu%2FzQ%2BscxxgWPKHUqkUjcsWPHjjPPPPts8tKlS%2B%2FZunVrrjUt4rouExMTjIyMrOn3%2BuNfKXrkl1wuR7FYDEU2Ojs70XV9Tbbwj%2FO9p6amSKfTVCqVVWDbE3O4qkteHdS2MRwXS7Nomjr1Wp1Sscz87DSlqavML8xi1peQTDBEiCEhiVGvZGtqiLZDTLGJSA6ikkAyTUzRRHRAsjV0EwzHwdFMMGukO%2Fu55f2fZNvO3UREMHQdHBcbEcmxcUUwHb9R1wHwtZX9uvHk%2BCWarz1HRrHo2LCO3qbu9c92pBAdT18ZHIrlBqap48gi9799dcRWLBbZtH0fV159BsPQwwgxk8lw991309XVRX9%2FP%2FFML8gt9m22ClYFV5sP2b1BjbWVDGUYBoVCgbe%2F%2Fe1Uq9W27zwgMwUkp2azSalUCmUiA0AM%2Fg4i1xCm%2FIkuIGIFkWvQBhROdr78YFCXDbYFFoK5XI5MJoNhmPSN3LoGYbCGIgl0dnVhGTrJTAZRkNDUBotLJZKpNOlsFsu2EJUIerHI7PQU0VjMa%2FexTDq6ppCTjRazAdcXsIhzbb6HrqFewGFxfp7i0iI9fQOkc4XVi0dZIdfRg2XoVMvLNBt1XKBaqRCLxcgUCl7ZwzRpql7dOFsoIAp%2Bz64oEE%2Blve4x3BYFLgdNrZFMxBD9rEFgd%2BviIkqSJ2himixMXyWRzpLJdyOtMYfEk2niyfQq%2FkRQW2%2F9brri4k%2BNkfyPBeyf5liXktb6LR%2F%2F4p%2F92a%2F%2Fr%2F%2FL%2F%2FLl1wn4xn0QbMWgIKN7pAX3AoOdsg%2B6h99kfTbnv%2BZwC4BzI7D9qP8PP4wOHrfWV%2FFP5BSeJBZ%2BDfbI%2BXPn9rbILK4UqPgcnoBFGU%2BW8dN%2BNPyPHZ8DviD4MlzpTObT%2B266aePTzzzzF6lU6pcHBwfbirC2bTM%2BPs769et%2F4oCbTqcZHBwMxehlWcY0TZrNJrqus7S09CP3Ab8R0AbCBolEguXl5TA6aqtxLE3wF3%2F%2FPKbuoOrLmPUmds3E1Ms4poaBg6RAjASOKCGKEMEEE2xUbMlBMj2ik42NaAKYvnCCg%2BEAtumRQHSVbKGH29%2F7CTbu2EY8HsOxLAzb9SJgAUTbxcXFsb3Q1nK8%2FllLdBAFmXpDZe7sGVgaI5VwEMU4oiPSJUI8KnoNJKJCxapTLTVwHIiKIoff9jbyhY410qMqt931TsoLV6hXlkKd4KCuunHHHR7IGotgVT2tW0Hy%2F5cRJBAcKwTalWS1oC%2FXcRzS6XSYaQjYx4FARqD%2BFLgNtUagwb%2FWSDVQegpqrkG2JDC5D0A3ANoAiIMFZwC00Wg0rA2nOrchR1aLRpeLi%2FT6pu%2BRaBRZ9uQc46kUmm85qERiRKIRYvEEqaSJJEuUKhX0pkp3ukm2Y5JV8usulJd6UVJ9RGNeVqG7vx%2B92WRmapxEcZGe%2FsFVvb4AciRKobufVDbP%2FMw19GYDy9CRlUiol6yqDU%2BDOxZvky51HYdapYIoSyQSKQRRABHiyQyq1iCfSa7mB%2FsbbMdBNxyM4jJqrUom30EyW0AUX7%2FTQZbl0PZy5W9wX7fCy%2FPmzwTI1pr6P4vz2NGxet7WdX3D%2F%2FSpT%2F0t8LU3wgquSzYGZdG7fIANsG091yUbg0i1lZC71ng9mcf2eaElOv2hGFb%2FGLnGH8c4t4Yc1%2BjoqAh0%2Fe7v%2Fu7%2F%2FOCDD368s7NTXivFOjw8%2FBNPKf%2FxH%2F8xL7%2F8Mr%2F3e7%2BHYRjMzc3x6KOPUq%2FX%2BfjHP76mNd8%2FatVpGExMTIQTsOu6VCoVSqUSIyOrtW4%2F9Yf%2Ff85cvojiG8wqiEiSx%2BAFBcU28TpUHXDAFE2koJxre4xkERXJjmE6JoZtYpoiYCKZDqapke4bYuNNt3L7vfeTTqewLAfHdpEdGwuP9GDjG9g7Lo7rvZflC2NYosDy4hLF88dRGovEo0lEGn7vrIgiWkSQcURoGDrlahVsBUVySMTjfOzXfo3YCuLb%2FLwXlXZ3d1NenuVbf%2FPZsBUnGo3S3d3N7t272b17N9mBQz7YWtfF5R1%2F4nEtsLVQxL9VQzcwtjBNk8XFRfL5PNlsNvSbbTabXLhwgVKpRCKRIJ1Oh%2B1CAREqOJ9WQA8Uj4IyhKqqiKJIIpEIwTmY5ININlDGEkURwzBCI3lFUejo2UCmd7W7T6VSobOjQCquoDUbxJJZlIjXstNs1FFrFaSI1%2B8bjSdo1KreeaRSGKZFaXaGgc5XSfVM%2B1Gt6xGiRAet2MnM%2FEFSnQPIshiqROnNJqXiskdmkiCdLVDo6kVWoje85zW1Tq28jNbUsF0XSVaolJfp6unzztf1WtNEUaLZaGBZ3oLA0A1isRjReBzXhXpliVw2vZJ44dWYBSiXa6RyHRi6Tr1SQhIForEouUI3iXTudRWiXnvtNZaWlujpaWc3LzYd%2Fv6qzn8fb24UYiLv3LD6XvjUpz519ze%2F%2Bc2jrGAj%2F3OUa%2Fx%2FBgAr0lyHONsvnAAAAABJRU5ErkJggg%3D%3D" /></div>',
  throbber:'<div class="readsocial-throbber"><img src="data:image/gif;base64,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"/></div>',
  throbberSmall:'<img src="data:image/gif;base64,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"/>',
  domainIcons: {
    'twitter.com':'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAK8AAACvABQqw0mAAAAAd0SU1FB9oFBRYXCn2yWOEAAAJtSURBVDjLpZXPThNBHMc/v5n9X5poWgIeQAIXH4ATD8DdN8CbPIDxCjdMvHok+ga8SC9eTDy0IsSI1KIGWrad2R0PhZV224LpJJPd/WV+n/nOb74zKwCNRmMH2AOeMl/7Cuxtbm5+kEajsVOr1d4vLi5SqVTmona7XdrtNp1O54UC9uv1OkmS4JybqydJQr1eB9j3gNU4jsnzvJjZOUfP5mROyAFFTiAQehoRmak6jmOAVQ+YDBVdxHIUqYNsYIgeAAfwALIsKwLGGKzyEIGXTY9WKjyv5ewuZwxMhstztNYoHGrGBCXFxhgkjgBopcPE5s1TghAL2NvBmSVwOVrJ/WBrLXps0FUGH7ujycsBLPkefWsIrEUpNRvsnCvN3kqFV8feSKyi4eiZAe0x6PUIgmA2+O77TM/ebIuIYKzF87z/B1c0bET/VrKgHNuPh9+D6x4uz0t5DwJvRI63a7YUt8Zw2WmzUElKeeoWdrePt2YqhTNGVPk+YZwwzpiq2JoBnh+w5Dt+GKGbwW7TGynN9qOht8OFKvbqz/2KnXOkvR4Au0/yqRt31Bnayw8jrLUlxSWwiHDZOceaAVvVnL3VjCW/bMH1m80cpNcTwaVSiAhaKb4ft1heW2erGrBVnW7BtNvFOTe5FFmWFd05h+/7aIGTz5/4/bPNoN8vAa97XS7Oz/h1/p1xxkTFt6rDMATg4uwbZydfivoXq9KaMAyJ4xgRmejjU2vtyvhZFxGCIEBrTRRFpaOulEJrjda6uOjviDz1gIN+v//O9/3SRQIUydPaONQYA3DgAYfGGDHGvBaRlXn+ec65U+ANcPgX5+m56vUt4FsAAAAASUVORK5CYII="/>',
    'facebook.com':'<img src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBggGBQkIBwgKCQkKDRYODQwMDRoTFBAWHxwhIB8c Hh4jJzIqIyUvJR4eKzssLzM1RDg4ISpJQTwqQTI3ODUBCQoKDQsMDQ4OGSkkHyQ1NSwpNTU1NTU1 LjU1KTU1NSw1NTU1NSk1KTU1NTUpNTU1NTU1NTUpNTU1NTU1NTU1Nf/AABEIABIAEgMBIgACEQED EQH/xAAZAAACAwEAAAAAAAAAAAAAAAAAAQIEBQb/xAAqEAACAQQBAwALAQAAAAAAAAABAgMABAYR BRMUIRU0QVFUYXOSobHhEv/EABUBAQEAAAAAAAAAAAAAAAAAAAUA/8QAHREAAgAHAQAAAAAAAAAA AAAAAAIBAxESITGRcf/aAAwDAQACEQMRAD8As5jmPMcVk89pY3EUUEUcWgbaJvLRKxJLKTvZPtqU uQc1a4hbczc87As12z9rZ+jYm6oRwrEuF0uvJ1+fdlZ7ZmXMrt+tDFuODQkfRI6Kf2tTKMlvuWwf i7Z+Xtbie463fRKyFn/zIDH4A2DoeNa386YVFskUWGd88B2dr59WjjXTvLt2S8mVGKqsjAAHQA3R SvfX5/qN+6VDjBJ7u4R2VJ5VUHQAcgAUu9ufiJvvNFFRFpEV0VnUMzDZJGyTRRRUR//Z"/>',
    'google.com':'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ bWFnZVJlYWR5ccllPAAADUBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6 eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMu MzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRm PSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRl c2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9l bGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hh cC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9w aG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0 ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOk1hcmtlZD0iRmFsc2UiCiAg IHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9IiIKICAgcGhvdG9zaG9wOkF1dGhvcnNQb3NpdGlvbj0i Ij4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9Ingt ZGVmYXVsdCIvPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnJpZ2h0cz4KICAgPGRjOmNyZWF0b3I+ CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpLz4KICAgIDwvcmRmOlNlcT4KICAgPC9kYzpjcmVh dG9yPgogICA8ZGM6dGl0bGU+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4 LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzp0aXRsZT4KICAgPHhtcFJpZ2h0czpV c2FnZVRlcm1zPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0 Ii8+CiAgICA8L3JkZjpBbHQ+CiAgIDwveG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgIDxJcHRjNHht cENvcmU6Q3JlYXRvckNvbnRhY3RJbmZvCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJFeHRhZHI9IiIK ICAgIElwdGM0eG1wQ29yZTpDaUFkckNpdHk9IiIKICAgIElwdGM0eG1wQ29yZTpDaUFkclJlZ2lv bj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUGNvZGU9IiIKICAgIElwdGM0eG1wQ29yZTpDaUFk ckN0cnk9IiIKICAgIElwdGM0eG1wQ29yZTpDaVRlbFdvcms9IiIKICAgIElwdGM0eG1wQ29yZTpD aUVtYWlsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpVXJsV29yaz0iIi8+CiAgPC9yZGY6RGVz Y3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz6E0RvlAAAD dUlEQVR42qyU709bVRzGP7f3lkJbSgNNJwKDAUU3bbYsODNe+AJ0msjii5lpTGY00fjGaKZGF31L NBH1vYnzxVyIizNTR4jxx5yZ89e2sBWByJgdOCaDQVtK2/v7eu4tafkDdpLnvDj3nOc8z/P93iM5 jsOdGJJL9NS7n7f3dsW+SrRsaf95Xke3JR5LhGmOhVg8eRKmJoh2teJTFNz97tW51TV+m14anVeV F46dOaorLtuD3bHvXxrsS5wYzxCMQUTxcWWlxKO9d7Pr1Rf5+50jxNRlIvf3UHYgIe24i55G6dAn P91wKZ71iPbt7u4OBYOc/ecac0WZgCKRyRUYSDSwN9GEFWwkMzaCv7AEfj/YDpIkEWtoYGeDud/l 8LlTqC7o+fRbJsX1Eo5qoKom4/MZbz2wtQ3LkrDy+TLW85j5Ncwb/6JomrfHU1R2DXvaQpy4PEtb LMrc0iq5UthbX/3xHKGcgX49gyOUeAqEBEVEYBfqnQrRqYuLvN6yhecf6uSbS3OMpWZpiQbYn2zj 4x+O8V39JPc+GcfvK5OIoAjkbUJ5k+WAr6roeOo2Rs1VDj3QzOnX+rl0bZnWphCnZkZ5b/Iojz8T IRAR0dgbPAIlMeUsUdCpaJWoRpHFoXU+u3iBbWGH0cP9YtVm5MszNNabJOp8GJonZFPjQFiICWyw e7pKBRVLs5jPaYxN3CSVXvE+DT/yCoFSB+fnzHLYor9MawOmCxnDkKpEmVyO+5okPhrczi9vPCzy qcEyTPZ2Jvni4IdIxSSTCyaaKglQgaHJ6DpVa8MHkjzdtxX1ygjazK/ol5dZtGuJ9L1Fe+cehva9 yeHTLxOvK4jAfV5GbqUd2Ye+WdHubVHyf36A8d9xgnGVxp448Q4Z7cIRCunzbG/poKtxBytruugv qQJd86EZVImKa1nRWOPUt4bw12rIUgZ/0CTWamDOjXghF0qal4cqQvcgrOm6q2iTNVOuk+zgTkoz w9Q2BJB8ilc1NVsgcs8Bfk/PMn1ziu64n6JWrpItrNWJ44ZqyxWiP/66Wtz1xNtBVWkmv/AtspVF 9tdT0znAdHiAoa/fJxayxeZa9zfzRlAJkMsqZFdJV4jOptLPiffk097kYMjp7KdYzLGQvU0qNc+5 iSGcmrzopyi3stU2Mgyb67eYVfXwwcp7dCfG/wIMAHtxjIJQBICYAAAAAElFTkSuQmCC"/>'
  },
  sprites: {
    publishIcons: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAVCAYAAACAEFoRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExOUM0M0UwNEY4MzNBNjQ2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMzI4N0VFNjM3MDAxMUUxQjBCM0UwNUUwN0ZDQkFFNSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMzI4N0VFNTM3MDAxMUUxQjBCM0UwNUUwN0ZDQkFFNSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY5N0YxMTc0MDcyMDY4MTE5QzQzRTA0RjgzM0E2NDY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY3N0YxMTc0MDcyMDY4MTE5QzQzRTA0RjgzM0E2NDY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bldjqwAABjZJREFUeNrsWWtMVEcU/nZZFXnIYwVrWUEQFUR8AdpWKZgstU0rpCW0f0xqQtqgSfsHoVETjSmWNrWkxmr6g4b+0GBtKTZVWh6ppsEqllh5yquAguCKIkgX2AWhZ65Du132ce9yd4mpX/LlztyZ+93HmTlz5lyFVqu9ACARM8dEeXm5Gyscrjgim+Z+7R5BMzY2dpgO82XQRHV1tYId3ztYKpvmsUPbBM2kpKRJBy430Ldzt9ZYlZrqkOamoiKrmiriWsgDpUnZGZrMQD8TP+N19jHGednNrK81bCEedLImTLTsQcGP90V+D9k0meFHiH6QF87QZOgkVpjUvflxSOT1Kjk1aZYzr6Gy0ryfTVYblzNv8w0xWML7y6apEnM3jUaDnTt3IiEhQagPDAwgPz8fpaWlDlvQ38MPicu2IHLRSqGuNw7jQtuvqOmpt3XZHBNPkEPcy+uf8vIjO7f1cJEmg5YYYeO6RIlGl1XTritTqVRIS0vD5s2bce7cOeTl5WFoaAgZGRlYu9Yxj65UKPFcSBxWBi7Htds1ON9YitGxUWiXJyLEb4kYCWasbJN6lgxrtdyad4gdNqiYTU2bM16pVCI8PBwNDQ2g4EM4Tk5Oor+/Hzk5OUhOTkZNTY2kJ1coFHjGexG6B26jrrcB3YM9guZfRj3eWvcGYpasx80HXWKXEy9eHpVxiZJLkxmp3Ub7buKXxKDZ0LRqeLVajfT0dMTHx8NgMKClpQUFBQVobW2Fl9fjb8POS4H3PC9sDY9HROAKjE2Mo/fhHVxsq8SdIR3cVfOEPuOPxsRIGYnvEz/idRZc6c36+PAZy/r2z4LmC8QwG+3PEgMkDibZNC0a3sfHB5mZmYiLi0NZWRmGh4exYcMGhISEYGJiArt27UJXVxfOnDkj+ok95nrg1VXbsEwdilqa6YZxA0L9QxDgpaZQdRJJK7bi/nA/Lnf+Lja6LeC0hO3Ej4mriN3EN4mXXax5ifiHjXY2sOZKNLxsmtMM7+vri6ysLMHobIY3NTUJA6GiogIBAQE4cOAAjEYjjh49is7OTlFP60lG3x71imD0i39WomewlwbCfNT3NmKBuzdS1yRjfOIRfrpRjj79vZm66xTi1+xVpmJT4lfE9SICNUmaFNHb0tTwpcMa2DNlSpz1smlOM3xKSgo2btyIkydPorCwEPv27ROi+ba2NgQFBUGv1yM3Nxd1dXWinzZGs14wemXHZVzquILXo19DZOBKcvF3ofb0wyjN/h/qz+PWg24pgdiHfPaxtbiIeIXvqY9zl2yKSGKCHcPLrcm2s4vtvMc8iQNQNs1pho+JiYFOp0NxcbEQdJ04cUJY39n59vZ2nD17VhgEUhCmXorB0Ye4euuaUC9r/oXWd53g6m/o+lDddU0YBCLAkisLiN8SXzI5n8aN5W7j2gxivos0YaYlF2TTnGb4vr4+hIWFISIiArW1tQgODhZcfUlJCSorK4U1XioeGoYQ6LUQQT6LhYh9oadacPXXe+rQdLdFGGAicZ/PSBZ0fWeSyZrKsk3YmIFtVpIyztCUCjcnDBI3SYZnMzo6OhrZ2dlobm4W9uojIyOor693yOgMbEYH+2qwfdXL6KFIfql/MAV3RnTRlk6C0adGPHMNJQ4O8nddoHmdqCM+IK4m1hIXca/SQFxH7OEDLZL3X23nPrJrTjM8W7vZHn3Hjh2IiopCVVUVTp8+LWzjHAVbu7+v+xHxoc9jiW8QWu+147eOKmEbJwG3ibGccsEZmmyvO8aja09uID+e4VvM2/1521T7XFdrWtzOMRfPZrycuEUu/pS4xIxlr1FdrZHbFx47tE3jBBcbblYPNSlHWOgTyhMzLtVU2gleHIUzNJ8kGESeG58tTWb4Rie8eOP/3PB5xA9M6mN8f11sln7dzddmd1drMlf/NjHOQtsaPP5RMcfs/FX+EOYwTWE6Q/NJQSExl0f7y3jwt5fnAlhbCE+7pvOAcpCYLEZzU1HRUFVq6j+aVD9O9f9o0rkSOmdXU6HVam21MyN9gn//+lzlqcqbljqzHzkMhyuOzEhzv3YPnsK5sPdblv2T/pyXWVrtHWtGlwBnaD7FTBM4FvAF8UW+ltTKdF9naD6FBPwtwACfiGJd+vt1SQAAAABJRU5ErkJggg=='
  }
        
  

}








})(jQuery);








/*

  OAuth session callout and callback

*/

function popWindow(url)
{

  var authwindow = window.open(url,'ReadSocial Authorization', 'height=500,width=400,resizable=no,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no');
  if(typeof authwindow=='undefined') throw "Pop up windows must be enabled.";
  authwindow.focus();
  
}
function callback(stat) {

  $(window).trigger('readsocial_auth',[stat]);


}



