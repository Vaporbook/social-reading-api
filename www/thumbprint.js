
(function($) {

  $.fn.thumbprint = function(config) {


    var _RS_DEBUG = true;
    var _RS_IBOOKS = false;
    var nodes = this;
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
      var cbarW = jQuery('.navigationItem').width();
      var session;
      var authwindow;
      var authwindowInterval;
      var dropzone;
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
                   
                    // mustache style templates
                    _.templateSettings = {
                      interpolate : /\{\{(.+?)\}\}/g
                    };

    this.options = $.extend(this.options || {
  		base: 'http://dev.readsocial.net',
   		api_base: 'http://dev.readsocial.net',
   		partner_id:8,
		  group_id:'testing-channel',
		  ui: '#comments-ui'
     }, config );
    this.options.container = this.context;
    _RS_ROOT = this.options.base;
    _RS_API_ROOT = this.options.api_base;
    var channel = _createChannelName(this.options.group_id);
    var partnerId = this.options.partner_id;
    var contentdoc = this.context;
    var context = ReadSocial.hasher.normalize(nodes.text().trim());
    var thumbprint = ReadSocial.hasher.thumbprint(context);
    var highlight = window.getSelection().toString();
    var node = nodes[0];
    var ui = $(this.options.ui);
    var beforedate = null;
    var tmpl = _ReadSocial_UI_tmpl;
    var hashgroups = [
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
      }
      
    ];


    nodes.bind('readsocial_auth', function (a,d) {

      console.log('auth event');
      console.log(a);
      console.log(d);
      authed = d.authed;
      session = d.user;
      if(authed) {
        $('.postbutton').show();
        $('.authbutton').hide();
        enablePostTab();
        $('.postview .avatar').append('<img src="'+session.uimg+'" />');
      }

    });

    $('.readsocial-attachButton').click(function (e) {
        posttype = 1;
        var n = _getNoteForPostType();
        _postNote( n, _returnFromPost );

    });

    $('.listbutton').click(function (e) {
      console.log('list button clicked');
      enableListTab();
    });

    $('a.loginlink').on('touchstart',function () {
      console.log('touchstart');
    });

    $('a.loginlink').on('click',function () {
      console.log('click');
    });

    $('.authbutton,.loginlink').click(function (e) {
      console.log('auth button clicked');
      enableAuthTab();
    });
    $('.postbutton').click(function (e) {
      console.log('post button clicked');
      enablePostTab();
    });

    _refreshNotes(function (o) {
      _updateNoteList(o,true);
    });



    if(!authed) {

      hidePostTab();
      //enableAuthTab();
    }

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

      console.log(_renderUI);
      
/* TODO will this clobber handlers too? */
      var cl = ((i+1)%2==0) ?
        'noteitem-even':
        'noteitem-odd';
      note.clname = cl;
      if(typeof note.hi_raw == 'undefined') note.hi_raw = "";

       console.log(_renderUI(note));


      jQuery('.readsocial-posts ul').append(
        _renderUI(note)
      );
      
    }

    // add a newpost status to add handler only to new ones
    
    jQuery('.readsocial-posts ul li.li-noteitem').addClass('newpost'); 

    jQuery('.readsocial-loadmore').show();

    enableListTab();
    
  }





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
          data: JSON.stringify(d),
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
          data: JSON.stringify(d),
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
            console.log(m);          
          } 

          
        }
      }



  };

})(jQuery);



