


if(typeof ReadSocial === 'undefined') {
  ReadSocial = {
  }
}
ReadSocial.log('AuthLib');
ReadSocial.Auth = (function () {



      if(typeof _ === 'undefined') throw 'no underscore found';

      // mustache style templates
      _.templateSettings = {
        interpolate : /\{\{(.+?)\}\}/g
      };

      var _tmpl = _ReadSocial_UI_tmpl;
      var _RS_ROOT = null;
      var _RS_API_ROOT = null;
      var _RS_SSO = false;
      var _RS_SSO_SESSION_URL = "/sso-demo.json?jsonp=ReadSocial.Auth.setSession";
      var posts = 0;
      var isIE = window.navigator.userAgent.indexOf('MSIE');
      var proxy;
      var iframeUI = false;
      var streams = {};
      var uipane, conf, rid, partnerId, l, payload, source, authwindow, session, proxy, IEsession;
      var hashgroups, channel;
      var contextExpanded = false;
      var mtypes = ['text', 'link','image'];
      var uploadsSupported = (navigator.userAgent.match(/Chrome/)||navigator.userAgent.match(/Firefox/));
      var fileDataUrl;

      if(typeof String.splice === 'undefined') {

        String.prototype.splice = function(
            index,
            howManyToDelete,
            stringToInsert /* [, ... N-1, N] */
            ){
        
            var characterArray = this.split( "" );
             
            Array.prototype.splice.apply(
              characterArray,
              arguments
            );
             
            return(
            characterArray.join( "" )
            );
             
            };
      }


      ReadSocial.log(window.location.search);

      var config = ReadSocial.API.parseQueryString(window.location.search);

      ReadSocial.log('AuthLib-->config from URL:');
      ReadSocial.log(config);
      
      if(typeof config.g =='undefined') config.g = 'ReadSocial';

     // config.hashgroups = config.hashgroups || 'ReadSocial';
      config.hashgroups = config.g.split('|') || [];
      config.channel = config.ch || 'ReadSocial';
      if(typeof config.sso != "undefined") {
        if(config.sso=="true"||config.sso==1) {
          _RS_SSO =true;    
        } else {
          _RS_SSO=false;
        }
      }

      ReadSocial.log('AuthLib-->RSAPI Auth Lib loaded from UI page, waiting for document ready');
  
      $(document).ready(function () {
        
        uipane = $('#maincontent');

        uipane.modal({
            show:false,
            backdrop:"static"
        });

        uipane.on('show', function () {

          if(iframeUI) {
            postObject({
              op:'show',
              d:{
                m:'Callback from uipane show event'
              }
            });
          }

        });
        uipane.on('shown', function () {

        });
        uipane.on('hide', function () {

        });        
        uipane.on('hidden', function () {

          if(iframeUI) {
            postObject({
              op:'hide',
              d:{
                m:'Callback from auth event'
              }
            });
          }

        });
        
        uipane.modal('show');

        _setHighlightArea(config.par_body, config.l, config.r);
        
        if(typeof config.rid==='undefined') {
          config.rid = 8; // ReadSocial.net
        }
      
        _RS_ROOT = config.api || window.location.protocol+'//'+window.location.host;
        _RS_API_ROOT = config.api || window.location.protocol+'//'+window.location.host;
        if(typeof config.s == 'undefined') {
          config.s = window.location.protocol+'//'+window.location.host;
        }
        source = config.s;
        hashgroups = config.hashgroups;
        channel = config.ch;
        rid = partnerId = config.rid || 8;

        if(typeof config.par_body == 'undefined') {
          config.par_body = channel;
          config.par_hash = null;
        }

        iframeUI = (config.iframe=="true"||config.iframe==1) ? true : false;
        config.iframe = iframeUI;

        ReadSocial.log('AuthLib-->setting up proxy from '+window.location.href+' for '+source);

        proxy = new Porthole.WindowProxy(source);

        proxy.addEventListener(_handleIncoming);

        ReadSocial.log(proxy);

        ReadSocial.log('AuthLib-->initPassive on doc ready');

        ReadSocial.API.passive({

          base: _RS_ROOT,

          api_base: _RS_API_ROOT,

          partner_id: rid,
      
          group_id: config.channel,

          par_body: config.par_body,

          par_hash: config.par_hash

        }, function () {



          // get existing session
          // for OAuth or SSO:

          var authurl = (!_RS_SSO) ?
           ReadSocial.API.formatUrl("/v1/"+rid+"/auth/status?jsonp=ReadSocial.Auth.setSession") :
           window.location.protocol+'//'+window.location.host+_RS_SSO_SESSION_URL;
          
          $.getScript(authurl, afterJSONP);

          renderHashgroups();

          ReadSocial.log('AuthLib-->awaiting session...');

        });

      });

      function callback(stat) { // for legacy back end reasons, this is still called 'callback'

        IEsession = session = stat;

        if(typeof session=='undefined') throw "No session!";
        /*
        if(typeof session.user=='undefined') throw "No session user!";
        if(typeof session.user.uid=='undefined') throw "No session user id!";
        if(typeof session.user.uid==null) throw "Authentication service was not recognized!";
*/
        refreshAuthUI();


          if(!iframeUI) { // for ibooks launched frame, replace close button

            var cb = $('.modal-footer .closeButton');
            cb.click(function (e) {
              e.preventDefault();
              e.stopPropagation();

              window.location.href = source;

            });
            cb.html('Back to Book');
            cb.attr('href', source);

        }
 
        //connectMainUI();

      }


      function refreshAuthUI() {

          var stat = session;

          // TODO either show UDOMS in menu or one SSO dom
          if(_RS_SSO) {
            
            $('ul.authmenu').empty();

          } else {
            
            $('ul.authmenu li a.authLink').click(function (e) {
              var service = $(e.target).attr('data-provider');
              authwindow = _popAuthWindow(rid, service);
            });

          }

          if(session.authed) {

            if($('.logoutChoice').size()==0) {
              $('ul.authmenu').append('<li class="divider"></li>');   
              if(_RS_SSO) {
                $('ul.authmenu').append('<li class="logoutChoice"><a href="/readsocial/logout">Log Out</a></li>');
              } else {
                $('ul.authmenu').append('<li class="logoutChoice"><a href="javascript:void(0)" onclick="ReadSocial.Auth.endSession();return false">Log Out</a></li>');                  
              }
            }

            var doms = {
                'facebook.com':'facebook',
                'twitter.com':'twitter',
                'google.com':'google',
                'tumblr.com':'tumblr'
             };
             if(!session.user.udom) {
                return;
             }
             var img = $('ul.authmenu li a[data-provider='+session.user.udom.replace(/\..{2,3}?$/,'')+'] img').clone();

             $('.login-status img').remove();
             $('.login-status .uname').before(img);
             $('.login-status .uname').html(session.user.uname);
             $('.readsocial-screen-name').html('Posting as '+session.user.uname);

          } else {
            if($('.logoutChoice').size()==0) {
              if(_RS_SSO) {
                 $('ul.authmenu').append('<li class="divider"></li>');   
                 $('ul.authmenu').append('<li class="logoutChoice"><a href="/readsocial/login">Log Out</a></li>');
              }
            }
             $('.login-status img').remove();
             $('.login-status .uname').html('Not Logged In');
             $('.readsocial-screen-name').html('');

          }
      }


      function afterJSONP(data, textStatus, jqxhr) {

          // this guarantees that the JSONP script has loaded, but not necessarily that the
          // calback has fired.
          // TODO we should make sure 200 status


          //ReadSocial.log('AuthLib-->loaded our JSONP script');

          connectMainUI();

      } // end afterAuth



      function showPublisher() {
        $('.rsview').hide();
        $('#selected-context-text').show();
        $('.readsocial-noteCreateView').show();
      }

      function showListing() {

        $('.rsview').hide();
        $('#selected-context-text').hide();
        $('.readsocial-noteListView').show();
        _refreshNotes(function () {
            console.log('done with refresh');
        });
        jQuery('.readsocial-loadmore-throbber').hide();
        var _renderUI = _.template(_tmpl.throbberSmall);
        //console.log(_renderUI);
        console.log(jQuery('.readsocial-loadmore-throbber'));
        jQuery('.readsocial-loadmore-throbber').html(_renderUI());

        $('.readsocial-loadmore button').click(function (e) {

          $('.readsocial-loadmore').hide();
          $('.readsocial-loadmore-throbber').show();

          //var last = jQuery('.readsocial-posts ul li.newpost::last-child div')[0];
          
          //var olderthan = last.dataset.crstamp;
          
          //ReadSocial.log('AuthLib-->will retrieve posts older than '+olderthan);
          
          _appendNotes(function (o) {

            jQuery('.readsocial-loadmore-throbber').hide();
            jQuery('.readsocial-loadmore').show();
                
          });

        });

      }

      function customGroupHandler() {

              $('.rs-channelList').css({
                visibility:'hidden'
              });
              $('.readsocial-groupEdit').css({display:'inline-block'});
              $('.readsocial-groupEdit input[type=text]').val('[group name]');
              $('.readsocial-groupEdit input[type=text]').focus();
              $('.readsocial-groupEdit input[type=text]').select();
              $('.readsocial-groupEdit input[type=text]').blur(function () {
                 
                 $('.readsocial-groupEdit').hide();
                 $('.rs-channelList').css({
                    visibility:'visible'
                 });
                 
                 $('.readsocial-groupNav').show();

              });

              $('.readsocial-groupEdit input[type=text]').keypress(function (e) {
                  if ( e.which == 13 ) {

                    e.preventDefault();
                    // add custom group from input
                    ReadSocial.API.setGroupName($('#readsocial-newgroup').val());

                    var newgroup =  ReadSocial.API.getGroupName();

                    if(!_.contains(hashgroups,newgroup)) {        
                      hashgroups.push(newgroup);
                    }

                    $('.readsocial-groupEdit input[type=text]').trigger('blur');

                    renderHashgroups();

                    // This will bridge the event loop

                    postObject({
                      op:'func',
                      d:{
                        name: 'changeGroup',
                        args: [newgroup]
                      }
                    });

                    $('.rs-channelList .button-label').html(newgroup);

                    showListing();

                  }
              });

           
      }

      function connectMainUI() {

           ReadSocial.log('AuthLib-->connecting main UI');


           if(iframeUI) { 
              $('.readsocial-groupNav').click(customGroupHandler);
           }
           $('.readsocial-backNav').click(function(e) {
              //console.log(e);
              //$('.readsocial-makeCommentNav').removeClass('readsocial-activeButton');
              //$('.readsocial-backNav').addClass('readsocial-activeButton');
              showListing();
            });
            $('.readsocial-makeCommentNav').click(function(e) {
              //console.log(e);
              //$('.readsocial-backNav').removeClass('readsocial-activeButton');
              //$('.readsocial-makeCommentNav').addClass('readsocial-activeButton');
              showPublisher();
            });

            if(uploadsSupported) {

              ReadSocial.log('AuthLib-->file uploads are supported in this browser');

              var fc = $('.readsocial-fileentryarea input[name="img_note"]');

              var ignoreDrag = function(e) {
                 var event = typeof e.originalEvent != 'undefined' ? e.originalEvent : e;
                 if (event.stopPropagation) {
                  event.stopPropagation();
                 }
                 if (event.preventDefault) {
                  event.preventDefault();
                 }
              };

              $('.readsocial-filedropzone').bind('dragover', ignoreDrag).bind('dragenter', ignoreDrag).bind('drop', function (e) {

                  e = (e&&e.originalEvent?e.originalEvent:window.event) || e;

                  ignoreDrag(e);

                  var files = (e.files || e.dataTransfer.files);

                  var s = "";
                  _handleFiles(files);
                  return false;

              });

              $('#img_file').change(function (e) {

               // ReadSocial.log(e);

                 var files = (this.files || e.dataTransfer.files);

                 var s = "";
                 _handleFiles(files);
                 return false;

              });

              ReadSocial.log('AuthLib-->bound file handler');
                
            } else {



              $('#publish-tab3').hide();
              $('#post-type-selection li[data-posttype=3]').hide();


            } // end if uploadsSupprted

            $('.readsocial-cancelPostButton').click(function (e) {

              showListing();

            });

            $('.readsocial-attachButton').click(function (e) {
                ReadSocial.log('AuthLib-->attach button click handler');

                e.preventDefault();
                e.stopPropagation();


                if(!IEsession.authed) {
            
                    _popAuthWindow();

                } else {

                    var n = jQuery('.readsocial-note').val();
                    var posttype = parseInt($('#post-type-selection li.active').attr('data-posttype'));

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

                    ReadSocial.API.postNote( n, _returnFromPost );
                }
            }); // end attach button handler

            ReadSocial.log('AuthLib-->showing selected view:'+config.view);

            if(config.view=='list') {
              showListing();
            } else {
              showPublisher();
            }

            // signal to the caller that the UI is now ready


            postObject({
                op:'ready',
                d:{ }
            });




      }


      function showDetail(noteId) {
        $('.rsview').hide();
        $('#selected-context-text').show();
        $('.readsocial-noteDetailView').show();


        //ReadSocial.log('AuthLib-->getting note '+noteId);
        _clearView('.readsocial-noteDetailView');

          jQuery('.readsocial-noteDetailView').append(_tmpl.throbber);

          ReadSocial.API.getNoteDetail(noteId, function (o) {
            

            //ReadSocial.log('AuthLib-->got note detail');

            //ReadSocial.log(o);
            _clearView('.readsocial-noteDetailView');



            
            if (typeof o.link !== 'undefined' &&
                (typeof o.img === 'undefined' || o.img === null)
            ) { // link
                 _renderUI = _.template(_tmpl.linkDetail+_tmpl.replyForm);
            } else if (typeof o.img != 'undefined') { // image
                  o.img_full_url = 
                ReadSocial.API.formatUrl('/v1/'+o.rid+'/images/'+o.img,[]);
                  o.img_thumbnail = 
                ReadSocial.API.formatUrl('/v1/'+o.rid+'/images/'+o.img_small,[]);
                 _renderUI = _.template(_tmpl.imgDetail+_tmpl.replyForm);
            } else { // just note
                 _renderUI = _.template(_tmpl.noteDetail+_tmpl.replyForm);
            }
       
            o.uimg = (typeof o.uimg !='undefined') ? o.uimg : "https://www.readsocial.net/images/demo-avatar.png";
       
            o.udom = o.udom.replace(/\./g,'-');
          
            o.hi_raw = (typeof o.hi_raw !='undefined') ? o.hi_raw :"";

            highlightArea(o.hi_raw);

            o.permalink = ReadSocial.API.formatUrl('/v1/{rid}/{group_id}/thumbprints/{par_hash}',[o.rid,o.gid,o.par_hash]);

            $('.readsocial-noteDetailView').append(_renderUI(o));
            
            //ReadSocial.log('AuthLib-->showing highlight');
            
            // in alpha:
            //ReadSocial.Sel.showHighlighted(o.hi_nrml);
            
            // not working, really:
            //ReadSocial.Sel.restoreSelection(o.sel);
            
            $('.readsocial-reply-button').attr('data-note_id', o._id);

          //  jQuery('.readsocial-noteDetailView').append(_tmpl.responseFormSubview);

          //  jQuery('.readsocial-noteDetailView').append(_tmpl.responseListSubview);

            respond = jQuery('.readsocial-buttonContainer a.readsocial-respondButton');
/*
            respond.button(
              {
                text:true,
                icons: { primary: "ui-icon-comment" },
                label: (ReadSocial.API.authed) ? 'Post It!' : 'Login to Post'
            }).click(_handleRespondButtonClick);
*/

            // hook up toggle button
            jQuery('.readsocial-reply-button').click(
              function(e) {
                //ReadSocial.log('AuthLib-->respond button click handler');
        
                e.preventDefault();
                e.stopPropagation();
                
                var noteId = jQuery('.readsocial-note-item-detail').attr('data-note_id');
                
                if(!session.authed) {
                  
                  _popAuthWindow();
                  
                } else {
                  
                    ReadSocial.API.postResponse(
                      noteId,
                      jQuery('.readsocial-response').val(),
                      function (d) {
                        if(typeof d.auth != 'undefined') {
                          
                          _popAuthWindow();
                  
                        } else {
                          _returnFromResponse(d);
                        }
                      });    
                }
                
                return false;
              }
            );
             
            // add throbber for loading
            _renderUI = _.template(_tmpl.throbberSmall);
            jQuery('.readsocial-responseListSubview .readsocial-responsethrobber').html(_renderUI());
            
            if(typeof $('#selected-context-text mark')[0] !=='undefined') {
              $('#selected-context-text mark')[0].scrollIntoView();  
            }

            ReadSocial.API.getResponses(noteId, function (rlist) {
              _updateResponseList(rlist);
            });

          });




      }

      function _returnFromPost(d) {

        ReadSocial.log('AuthLib: return from post');
        ReadSocial.log(d);

        showListing();

        postObject({
          op:'func',
          d:{
            name: 'expireCounts',
            args: []
          }
        });

        /*
        _refreshNotes(function () {

          // TODO XD
          //_expireCount(jQuery(ReadSocial.API.getCurrentPara())).trigger('count');
        });
*/

      }

      function _handleFiles(files)
      {
         // on file control change event



         fileDataUrl = null;
         
         if(typeof files == 'undefined') return false;
         if(!files.length) return false;
         
         var file = files[0];

                  //ReadSocial.log(file);


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
             fileDataUrl = e.target.result;
             $('.readsocial-filedropzone').html(file.name);
         };
         reader.onerror = function(e) {
             //ReadSocial.log(e);
         };
         reader.readAsDataURL(file);
         
      
      }


      function _returnFromResponse(d) {
        
        var o = (typeof d !== 'object') ? jQuery.parseJSON(d) : d;
        ReadSocial.API.getResponses(o.note_id, function (rlist) {
          _updateResponseList(rlist);
        });
      }

      

      function _handleIncoming(evt)
      {

        var o = evt.data;
        //ReadSocial.log('AuthLib-->Incoming from parent frame or window');
        //ReadSocial.log(evt);

        if(!typeof o.op) {
          ReadSocial.log('AuthLib-->Error, op is not defined.');   
        }
//        ReadSocial.log('AuthLib-->op is '+o.op);

        switch(o.op) {

          case 'log':

            //ReadSocial.log(o.d.m);
            break;

          case 'dom':

            $(o.d.sel).html(o.d.html);
            break;

          case 'stream':

      
            _defineStream(o.opid);
            var args = 'jqXHR, textStatus';
            var f = getCompleter(args,o.cbid);
            o.d.complete = eval(f);
            streams[o.opid].jqTransport = o.d;
            //ReadSocial.log('AuthLib-->Awaiting stream for:'+o.d.url);
            break;

          case 'streamhaul':

            streams[o.opid].chunks[o.chunkid]=o.d;
            streams[o.opid].chunktotal++;
            if(streams[o.opid].chunktotal == o.totalnum) {
              // load up our data on the haul
              var t = streams[o.opid].jqTransport;
              t.data = {};
              for(var i = 0; i < streams[o.opid].chunktotal; i++) {
                t.data += streams[o.opid].chunks[i];
              }
              // clear out this stream:
              _undefineStream(o.opid);
              // now send it:
              $.ajax(t);
            }
            break;

          case 'ajax':
  
            var args = 'jqXHR, textStatus';
            var f = getCompleter(args,o.cbid);
            o.d.complete = eval(f);
            //ReadSocial.log(o.d.url);
            //ReadSocial.log("Making new ajax call from origin "+window.location.protocol + "//" + window.location.host);
        
      //      o.d.xhrFields = {
        //         withCredentials: true
         //   };
        
            //ReadSocial.log(o);
            jQuery.ajax(o.d);
            break;
          case 'func':
            
            exports[o.d.call].apply(this, o.d.args);

          default:
            break;


        }

      }




      function _undefineStream(opid)
      {
        streams[opid] = {};
        // undefine it
        delete streams[opid];
      }

      function _defineStream(opid, prop)
      {
        if(typeof streams[opid]=='undefined') {
          streams[opid] = {
            chunktotal: 0
          };
        }
        if(typeof streams[opid].jqTransport=='undefined') {
          streams[opid].jqTransport = {};
          streams[opid].chunks = {};
        }


      }

      function getCompleter(args,cbid)
      {
        return '(function ('+args+') {\
          postObject({\
            op:"cb",\
            cbname:textStatus,\
            opid:"'+cbid+'",\
            json: jqXHR.responseText\
          });\
        })';  
      }

      function logout()
      {
          var o = {
            url: ReadSocial.API.formatUrl('/v1/{partnerId}/auth/logout', [partnerId]),
            type:'post',
            success:function (s,d,x) {
              callback(s);
            },
            error:function(r) {
              //ReadSocial.log('AuthLib-->returned from logout with error');
              //ReadSocial.log(r);
            }
          };
          $.ajax(o);
        
      }

      function postObject(o)
      {

        posts++;
        if(posts>100) throw ('too many posts');
        
        // wrap the method to handle IE 9 shittiness
        if(window.navigator.appName=='Microsoft Internet Explorer') {
          var d = JSON.stringify(o);
        } else {
          //ReadSocial.log(o);
          var d = o;
        }

        if(typeof proxy !== 'undefined') {
          try {
            //ReadSocial.log('AuthLib-->proxy.postMessage');
            //ReadSocial.log(d);
            //console.log(proxy);
            proxy.post(d);
          } catch(e) {
            //ReadSocial.log('AuthLib-->Exception caught posting x-d:');
            //ReadSocial.log(e);
            //ReadSocial.log(proxy);
          }
        } else {
          ReadSocial.log( "Error:proxy is not defined!" );
        }
        //ReadSocial.log('AuthLib-->postObject called');
        
      }

      function expandContext() {
          var cspans = $('#selected-context-text .context-before, #selected-context-text .context-after');


           cspans.animate({

              opacity:'0',
               height:'1em'

           },300, function () {
             cspans.css({
               display:'none',
               height:'1em'
             });
             contextExpanded = false;
           });     
      }

      function retractContext() {
         var cspans = $('#selected-context-text .context-before, #selected-context-text .context-after');

         cspans.css({
           display:'block',
           height:'auto'
         });

         cspans.animate({

            opacity:'1'

         },300, function () {
            contextExpanded = true;
         });
      }

      function hideModal(o) {
        uipane.modal('hide');
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

      function highlightArea(txt)
      {

        //console.log('seeking txt '+txt);

        var bod = ReadSocial.hasher.normalize($('#selected-context-text').text());
        var l = bod.indexOf(txt);
        var r = l + txt.length;
        if(l < 0) {
          //console.log(txt+' NOT FOUND');
        }


        if(!txt.length || l < 0) {
          _setHighlightArea(bod, 0, bod.length);
        }

        _setHighlightArea(bod, l, r);

      }

   
      function _setHighlightArea(bod, l, r) {

        if(typeof bod == 'undefined') return;

        $('#selected-context-text').empty();
        
        var phtml = unescape(bod).replace(/\+/g, ' ');

        if(r<bod.length && l > 0) {
          phtml = '<span class="context-before">'+phtml.splice(parseInt(l),0,'</span><mark>');
          phtml = phtml.splice(parseInt(r)+6+7+29,0,'</mark><span class="context-after">')+'</span>';
        } else {
          phtml = bod;
        }

        $('#selected-context-text').html(
          phtml
        );
        $('#selected-context-text mark').on('click', function() {

           //ReadSocial.log('AuthLib-->click');

           if(contextExpanded) {

              expandContext();       

           } else {

              retractContext();            
           }

        });
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
          //ReadSocial.log('AuthLib-->no notes here');

          jQuery('.readsocial-loadmore').hide();

          if($('.readsocial-posts ul li').size()==0) { // if no notes already in view

            jQuery('.readsocial-bigzero').empty().show().append(_tmpl.noteListNoItems).append(_tmpl.noteListNoItemsImg);
            //jQuery('.readsocial-background-nocomments').show();
          
          }
  
          return;
        }
        
        //ReadSocial.log(notes);
        
        jQuery('.readsocial-bigzero').hide();
        jQuery('.readsocial-background-nocomments').hide(); 
        jQuery('.readsocial-loadmore').show();
        // TODO use clear view here, but only conditionally
        //_clearViewjQuery('.readsocial-posts ul');
        
        // clear the newpost status
        jQuery('.readsocial-posts ul li').removeClass('newpost');
            
        for(var i=0; i < notes.length; i++) {
          var note = notes[i];
          
          //ReadSocial.log(note);
          
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

          note.udom = note.udom.replace(/\./g,'-');

          //var timenow = moment.utc(new Date());

          //var timethen = moment.utc(parseInt(note.crstamp));
         
          //note.friendly_stamp = moment.unix(Math.floor(parseInt(note.crstamp)/1000)).fromNow();
          
          note.friendly_stamp = moment.unix(Math.floor(parseInt(note.crstamp)/1000)).format("ddd, MMM Do YYYY, h:mm a");

          //note.friendly_stamp = timenow.diff(timethen) + ' ago';


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
            _renderUI = _.template(_tmpl.noteImageListItem);           
          } else if(note.link) {
            _renderUI = _.template(_tmpl.noteLinkListItem);   
          } else {
            _renderUI = _.template(_tmpl.noteListItem);        
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

        jQuery('.readsocial-posts ul li.newpost'/* div.readsocial-note-item'*/).click(

            function (e) {
                
                var n = jQuery(e.target);
                if (!n.hasClass('.readsocial-note-item')) {
                  //ReadSocial.log('AuthLib-->does not have class');
                  //ReadSocial.log(n);
                  var n = jQuery(e.target).parents('.li-noteitem'); 
                  //ReadSocial.log(n);
                }

                var noteId = jQuery('.readsocial-note-item',n).attr('data-note_id');
                
                if(typeof noteId == 'undefined') return;
                
                e.preventDefault();
                e.stopPropagation();
                
               // _clearView('.readsocial-magnifier .readsocial-note');
                showDetail(noteId);
                    
            }
        );
        
        jQuery('.readsocial-loadmore').show();
        
        if(typeof notescroller == 'undefined') {
          
          //notescroller = jQuery(".readsocial-posts").touchScroll();
          
        }
      }


      function _updateResponseList(responses) {

        //ReadSocial.log('AuthLib-->updating responses list');

        if(typeof responses == 'undefined') return;
        
        jQuery('.readsocial-responseListSubview .readsocial-responsethrobber').hide();
        
        _clearView('.readsocial-responseListSubview ul');
        
        var rl = jQuery('.readsocial-responseListSubview ul');
        
        if(responses.length==0) {
          
          //ReadSocial.log('AuthLib-->no responses here');
          
          rl.append('<div>No responses to this. Add one by clicking the "Reply" button above.</div>');

          return;
        }

        jQuery('li',rl).removeClass('newpost');
            
        for(var i=0; i < responses.length; i++) {
          var response = responses[i];
          response.udom = response.udom.replace(/\./g,'-');
          
          //ReadSocial.log(response);
          _renderUI = _.template(_tmpl.responseListItem);
          rl.append(
            _renderUI(response)
          );
        }

        jQuery('li.li-responseitem', rl).addClass('newpost'); 
        
        jQuery('.readsocial-responseListSubview').show();
        
        if(typeof responsescroller == 'undefined') {
          
        //  responsescroller = jQuery(".readsocial-posts").touchScroll();
          
        }
      }



      function _popAuthWindow(rid, provider) {
        if(typeof rid=='undefined') {
          alert('You must log in before you do that. Use the drop down login menu at the top to log in.');
        } else {

          var authwindow;
          authwindow = window.open(window.location.protocol + "//" + window.location.host+'/v1/'+rid+'/auth/login/'+provider,'ReadSocialAuthorization', 'height=500,width=500,resizable=no,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no');
          if(typeof authwindow=='undefined') throw "Pop up windows must be enabled.";
          authwindow.focus();
          return authwindow;
        }

      }


      function renderHashgroups()
      {

          var lb = $(".rs-channelList .button-label").html(channel);
          var ul = $(".rs-channelList .dropdown-menu");
          ul.empty();

          if(iframeUI) { 
            for(var i=0; i < hashgroups.length; i++) {

              var hashgroup = hashgroups[i];
              
              //ReadSocial.log(hashgroup);

              _renderUI = _.template(_tmpl.hashItem);
            
              ul.append(_renderUI({
                name: '#'+hashgroup,
                data: hashgroup
              }));
              
            }
            $('a',ul).click(handleGroupItemClick);


            ul.append('<li class="divider"></li>');   
            ul.append('<li class="pagination-centered"><button class="btn custom-group-btn">Other Group ...</button></li>');

            $('.custom-group-btn').click(customGroupHandler);

          } else {


            /*
                            <button class="btn btn-success readsocial-groupNav"><span 
                              class="readsocial-groupbutton-text"><div class="readsocial-groupbutton-hint ib pull-left">#</div><span class="button-label">ReadSocial</span></span></button>

                            <button class="btn btn-success dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>
                            <ul class="dropdown-menu">
                            </ul>
            */

            $('.rs-channelList').removeClass('btn-group');
            $('.rs-channelList .dropdown-toggle').hide();
            $('.rs-channelList .dropdown-menu').hide();



          }

      }

      function handleGroupItemClick(e) {

          var ul = $(".rs-channelList .dropdown-menu");

          var newgroup = $(e.target).attr('data-name');
          if(newgroup) {
            //ReadSocial.UI.changeGroup(newgroup);     

            //TODO how to bridge this - needs to change it in parent frame as well?

            addCurrentGroupToList();
 
            ReadSocial.API.setGroupName(newgroup);

            //ReadSocial.log('AuthLib-->posting change event to parent frame');


            // This will bridge the event loop

            postObject({
              op:'func',
              d:{
                name: 'changeGroup',
                args: [newgroup]
              }
            });

            $('.rs-channelList .button-label').html(newgroup);

            showListing();

          }
          
      }


  
      function addCurrentGroupToList() {
        var g = ReadSocial.API.getGroupName();
        if(!_.contains(hashgroups,g)) {        
          hashgroups.push(g);
        }
        renderHashgroups();
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

      function _shortHighlight(h)
      {
        var max = 180;
        return _shorten(h,max);
      }

      function _clearView(sel) {
        jQuery(sel).empty();
      }
       
    

      return {

        hideModal: hideModal,
        setSession: function (session) {
          // called via jsonp loaded script from handleLoad, after network id is known
          // wraps around the callback which is also used as a callback from auth actions
          callback(session);
        },
        endSession: logout
      };


})();


// moment.js
// version : 1.7.0
// author : Tim Wood
// license : MIT
// momentjs.com
(function(a,b){function G(a,b,c){this._d=a,this._isUTC=!!b,this._a=a._a||null,a._a=null,this._lang=c||!1}function H(a){var b=this._data={},c=a.years||a.y||0,d=a.months||a.M||0,e=a.weeks||a.w||0,f=a.days||a.d||0,g=a.hours||a.h||0,h=a.minutes||a.m||0,i=a.seconds||a.s||0,j=a.milliseconds||a.ms||0;this._milliseconds=j+i*1e3+h*6e4+g*36e5,this._days=f+e*7,this._months=d+c*12,b.milliseconds=j%1e3,i+=I(j/1e3),b.seconds=i%60,h+=I(i/60),b.minutes=h%60,g+=I(h/60),b.hours=g%24,f+=I(g/24),f+=e*7,b.days=f%30,d+=I(f/30),b.months=d%12,c+=I(d/12),b.years=c,this._lang=!1}function I(a){return a<0?Math.ceil(a):Math.floor(a)}function J(a,b){var c=a+"";while(c.length<b)c="0"+c;return c}function K(a,b,c){var d=b._milliseconds,e=b._days,f=b._months,g;d&&a._d.setTime(+a+d*c),e&&a.date(a.date()+e*c),f&&(g=a.date(),a.date(1).month(a.month()+f*c).date(Math.min(g,a.daysInMonth())))}function L(a){return Object.prototype.toString.call(a)==="[object Array]"}function M(a,b){var c=Math.min(a.length,b.length),d=Math.abs(a.length-b.length),e=0,f;for(f=0;f<c;f++)~~a[f]!==~~b[f]&&e++;return e+d}function N(b,c){var d,e;for(d=1;d<7;d++)b[d]=b[d]==null?d===2?1:0:b[d];return b[7]=c,e=new a(0),c?(e.setUTCFullYear(b[0],b[1],b[2]),e.setUTCHours(b[3],b[4],b[5],b[6])):(e.setFullYear(b[0],b[1],b[2]),e.setHours(b[3],b[4],b[5],b[6])),e._a=b,e}function O(a,b){var d,e,f=[];!b&&i&&(b=require("./lang/"+a));for(d=0;d<j.length;d++)b[j[d]]=b[j[d]]||g.en[j[d]];for(d=0;d<12;d++)e=c([2e3,d]),f[d]=new RegExp("^"+(b.months[d]||b.months(e,""))+"|^"+(b.monthsShort[d]||b.monthsShort(e,"")).replace(".",""),"i");return b.monthsParse=b.monthsParse||f,g[a]=b,b}function P(a){var b=typeof a=="string"&&a||a&&a._lang||null;return b?g[b]||O(b):c}function Q(a){return D[a]?"'+("+D[a]+")+'":a.replace(n,"").replace(/\\?'/g,"\\'")}function R(a){return P().longDateFormat[a]||a}function S(a){var b="var a,b;return '"+a.replace(l,Q)+"';",c=Function;return new c("t","v","o","p","m",b)}function T(a){return C[a]||(C[a]=S(a)),C[a]}function U(a,b){function d(d,e){return c[d].call?c[d](a,b):c[d][e]}var c=P(a);while(m.test(b))b=b.replace(m,R);return C[b]||(C[b]=S(b)),C[b](a,d,c.ordinal,J,c.meridiem)}function V(a){switch(a){case"DDDD":return r;case"YYYY":return s;case"S":case"SS":case"SSS":case"DDD":return q;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":case"a":case"A":return t;case"Z":case"ZZ":return u;case"T":return v;case"MM":case"DD":case"YY":case"HH":case"hh":case"mm":case"ss":case"M":case"D":case"d":case"H":case"h":case"m":case"s":return p;default:return new RegExp(a.replace("\\",""))}}function W(a,b,c,d){var e;switch(a){case"M":case"MM":c[1]=b==null?0:~~b-1;break;case"MMM":case"MMMM":for(e=0;e<12;e++)if(P().monthsParse[e].test(b)){c[1]=e;break}break;case"D":case"DD":case"DDD":case"DDDD":b!=null&&(c[2]=~~b);break;case"YY":b=~~b,c[0]=b+(b>70?1900:2e3);break;case"YYYY":c[0]=~~Math.abs(b);break;case"a":case"A":d.isPm=(b+"").toLowerCase()==="pm";break;case"H":case"HH":case"h":case"hh":c[3]=~~b;break;case"m":case"mm":c[4]=~~b;break;case"s":case"ss":c[5]=~~b;break;case"S":case"SS":case"SSS":c[6]=~~(("0."+b)*1e3);break;case"Z":case"ZZ":d.isUTC=!0,e=(b+"").match(z),e&&e[1]&&(d.tzh=~~e[1]),e&&e[2]&&(d.tzm=~~e[2]),e&&e[0]==="+"&&(d.tzh=-d.tzh,d.tzm=-d.tzm)}}function X(a,b){var c=[0,0,1,0,0,0,0],d={tzh:0,tzm:0},e=b.match(l),f,g;for(f=0;f<e.length;f++)g=(V(e[f]).exec(a)||[])[0],a=a.replace(V(e[f]),""),W(e[f],g,c,d);return d.isPm&&c[3]<12&&(c[3]+=12),d.isPm===!1&&c[3]===12&&(c[3]=0),c[3]+=d.tzh,c[4]+=d.tzm,N(c,d.isUTC)}function Y(a,b){var c,d=a.match(o)||[],e,f=99,g,h,i;for(g=0;g<b.length;g++)h=X(a,b[g]),e=U(new G(h),b[g]).match(o)||[],i=M(d,e),i<f&&(f=i,c=h);return c}function Z(b){var c="YYYY-MM-DDT",d;if(w.exec(b)){for(d=0;d<4;d++)if(y[d][1].exec(b)){c+=y[d][0];break}return u.exec(b)?X(b,c+" Z"):X(b,c)}return new a(b)}function $(a,b,c,d,e){var f=e.relativeTime[a];return typeof f=="function"?f(b||1,!!c,a,d):f.replace(/%d/i,b||1)}function _(a,b,c){var d=e(Math.abs(a)/1e3),f=e(d/60),g=e(f/60),h=e(g/24),i=e(h/365),j=d<45&&["s",d]||f===1&&["m"]||f<45&&["mm",f]||g===1&&["h"]||g<22&&["hh",g]||h===1&&["d"]||h<=25&&["dd",h]||h<=45&&["M"]||h<345&&["MM",e(h/30)]||i===1&&["y"]||["yy",i];return j[2]=b,j[3]=a>0,j[4]=c,$.apply({},j)}function ab(a,b){c.fn[a]=function(a){var c=this._isUTC?"UTC":"";return a!=null?(this._d["set"+c+b](a),this):this._d["get"+c+b]()}}function bb(a){c.duration.fn[a]=function(){return this._data[a]}}function cb(a,b){c.duration.fn["as"+a]=function(){return+this/b}}var c,d="1.7.0",e=Math.round,f,g={},h="en",i=typeof module!="undefined"&&module.exports,j="months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"),k=/^\/?Date\((\-?\d+)/i,l=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?)/g,m=/(LT|LL?L?L?)/g,n=/(^\[)|(\\)|\]$/g,o=/([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi,p=/\d\d?/,q=/\d{1,3}/,r=/\d{3}/,s=/\d{1,4}/,t=/[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i,u=/Z|[\+\-]\d\d:?\d\d/i,v=/T/i,w=/^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,x="YYYY-MM-DDTHH:mm:ssZ",y=[["HH:mm:ss.S",/T\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/T\d\d:\d\d:\d\d/],["HH:mm",/T\d\d:\d\d/],["HH",/T\d\d/]],z=/([\+\-]|\d\d)/gi,A="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),B={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},C={},D={M:"(a=t.month()+1)",MMM:'v("monthsShort",t.month())',MMMM:'v("months",t.month())',D:"(a=t.date())",DDD:"(a=new Date(t.year(),t.month(),t.date()),b=new Date(t.year(),0,1),a=~~(((a-b)/864e5)+1.5))",d:"(a=t.day())",dd:'v("weekdaysMin",t.day())',ddd:'v("weekdaysShort",t.day())',dddd:'v("weekdays",t.day())',w:"(a=new Date(t.year(),t.month(),t.date()-t.day()+5),b=new Date(a.getFullYear(),0,4),a=~~((a-b)/864e5/7+1.5))",YY:"p(t.year()%100,2)",YYYY:"p(t.year(),4)",a:"m(t.hours(),t.minutes(),!0)",A:"m(t.hours(),t.minutes(),!1)",H:"t.hours()",h:"t.hours()%12||12",m:"t.minutes()",s:"t.seconds()",S:"~~(t.milliseconds()/100)",SS:"p(~~(t.milliseconds()/10),2)",SSS:"p(t.milliseconds(),3)",Z:'((a=-t.zone())<0?((a=-a),"-"):"+")+p(~~(a/60),2)+":"+p(~~a%60,2)',ZZ:'((a=-t.zone())<0?((a=-a),"-"):"+")+p(~~(10*a/6),4)'},E="DDD w M D d".split(" "),F="M D H h m s w".split(" ");while(E.length)f=E.pop(),D[f+"o"]=D[f]+"+o(a)";while(F.length)f=F.pop(),D[f+f]="p("+D[f]+",2)";D.DDDD="p("+D.DDD+",3)",c=function(d,e){if(d===null||d==="")return null;var f,g;return c.isMoment(d)?new G(new a(+d._d),d._isUTC,d._lang):(e?L(e)?f=Y(d,e):f=X(d,e):(g=k.exec(d),f=d===b?new a:g?new a(+g[1]):d instanceof a?d:L(d)?N(d):typeof d=="string"?Z(d):new a(d)),new G(f))},c.utc=function(a,b){return L(a)?new G(N(a,!0),!0):(typeof a=="string"&&!u.exec(a)&&(a+=" +0000",b&&(b+=" Z")),c(a,b).utc())},c.unix=function(a){return c(a*1e3)},c.duration=function(a,b){var d=c.isDuration(a),e=typeof a=="number",f=d?a._data:e?{}:a,g;return e&&(b?f[b]=a:f.milliseconds=a),g=new H(f),d&&(g._lang=a._lang),g},c.humanizeDuration=function(a,b,d){return c.duration(a,b===!0?null:b).humanize(b===!0?!0:d)},c.version=d,c.defaultFormat=x,c.lang=function(a,b){var d;if(!a)return h;(b||!g[a])&&O(a,b);if(g[a]){for(d=0;d<j.length;d++)c[j[d]]=g[a][j[d]];c.monthsParse=g[a].monthsParse,h=a}},c.langData=P,c.isMoment=function(a){return a instanceof G},c.isDuration=function(a){return a instanceof H},c.lang("en",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[last] dddd [at] LT",sameElse:"L"},relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(a){var b=a%10;return~~(a%100/10)===1?"th":b===1?"st":b===2?"nd":b===3?"rd":"th"}}),c.fn=G.prototype={clone:function(){return c(this)},valueOf:function(){return+this._d},unix:function(){return Math.floor(+this._d/1e3)},toString:function(){return this._d.toString()},toDate:function(){return this._d},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds(),!!this._isUTC]},isValid:function(){return this._a?!M(this._a,(this._a[7]?c.utc(this):this).toArray()):!isNaN(this._d.getTime())},utc:function(){return this._isUTC=!0,this},local:function(){return this._isUTC=!1,this},format:function(a){return U(this,a?a:c.defaultFormat)},add:function(a,b){var d=b?c.duration(+b,a):c.duration(a);return K(this,d,1),this},subtract:function(a,b){var d=b?c.duration(+b,a):c.duration(a);return K(this,d,-1),this},diff:function(a,b,d){var f=this._isUTC?c(a).utc():c(a).local(),g=(this.zone()-f.zone())*6e4,h=this._d-f._d-g,i=this.year()-f.year(),j=this.month()-f.month(),k=this.date()-f.date(),l;return b==="months"?l=i*12+j+k/30:b==="years"?l=i+(j+k/30)/12:l=b==="seconds"?h/1e3:b==="minutes"?h/6e4:b==="hours"?h/36e5:b==="days"?h/864e5:b==="weeks"?h/6048e5:h,d?l:e(l)},from:function(a,b){return c.duration(this.diff(a)).lang(this._lang).humanize(!b)},fromNow:function(a){return this.from(c(),a)},calendar:function(){var a=this.diff(c().sod(),"days",!0),b=this.lang().calendar,d=b.sameElse,e=a<-6?d:a<-1?b.lastWeek:a<0?b.lastDay:a<1?b.sameDay:a<2?b.nextDay:a<7?b.nextWeek:d;return this.format(typeof e=="function"?e.apply(this):e)},isLeapYear:function(){var a=this.year();return a%4===0&&a%100!==0||a%400===0},isDST:function(){return this.zone()<c([this.year()]).zone()||this.zone()<c([this.year(),5]).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return a==null?b:this.add({d:a-b})},startOf:function(a){switch(a.replace(/s$/,"")){case"year":this.month(0);case"month":this.date(1);case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return this},endOf:function(a){return this.startOf(a).add(a.replace(/s?$/,"s"),1).subtract("ms",1)},sod:function(){return this.clone().startOf("day")},eod:function(){return this.clone().endOf("day")},zone:function(){return this._isUTC?0:this._d.getTimezoneOffset()},daysInMonth:function(){return c.utc([this.year(),this.month()+1,0]).date()},lang:function(a){return a===b?P(this):(this._lang=a,this)}};for(f=0;f<A.length;f++)ab(A[f].toLowerCase(),A[f]);ab("year","FullYear"),c.duration.fn=H.prototype={weeks:function(){return I(this.days()/7)},valueOf:function(){return this._milliseconds+this._days*864e5+this._months*2592e6},humanize:function(a){var b=+this,c=this.lang().relativeTime,d=_(b,!a,this.lang());return a&&(d=(b<=0?c.past:c.future).replace(/%s/i,d)),d},lang:c.fn.lang};for(f in B)B.hasOwnProperty(f)&&(cb(f,B[f]),bb(f.toLowerCase()));cb("Weeks",6048e5),i&&(module.exports=c),typeof ender=="undefined"&&(this.moment=c),typeof define=="function"&&define.amd&&define("moment",[],function(){return c})}).call(this,Date);