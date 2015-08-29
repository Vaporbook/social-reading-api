/*var socketio = require("socket.io");*/
var model = require('../model/model.js').model;
var auth = require('./auth.js');
var sys = require('util');
var util = require('../util.js');
var http = require('http');
/*var redis = require('redis');*/
var domains = ['twitter', 'facebook', 'google'];

var oa; // oauth settings, network specific

exports.ALWAYSAUTH = false;

var getStatus;
exports.getStatus = getStatus = function(req)
{
  
  if(typeof req.session == 'undefined') return {authed:false};
  if(typeof req.session.network == 'undefined') return {authed:false};

  var notauthed = {
    authed: false,
    net_id: req.session.network.rid,
    user: null,
    udoms: [],
    profiles: []
  };

  if(typeof req.session.auth == 'undefined') return notauthed;
  
  var u,udom;
  
  var robj = {
    authed: req.session.auth.loggedIn,
    net_id: req.session.network.rid,
    user: _getUfromAuth(req),
    udoms: [],
    profiles: []
  }

  if(typeof req.session.auth !== 'undefined') {

    for(var i=0; i < domains.length; i++) {
      var d = domains[i];
      if(typeof req.session.auth[d] !== 'undefined') {
        robj.profiles.push(req.session.auth[d].user);
        robj.udoms.push(d);
      }  
    }

  }

  return robj;
}

function _getUfromNote(req,u,n)
{

  if(typeof req.readsocial !== 'undefined') {
    if(typeof req.readsocial.auth !== 'undefined') {
      if(req.readsocial.auth.appLoggedIn) {

        // if SSO, trust for user deets

        // grab user details from note itself
        u.uid = n.uid;
        u.uname = n.uname;
        u.uimg =  n.uimg;
        u.udom = n.udom;

      }
    }
  }
  return u;
}

function _getUfromAuth(req)
{
  
  var u = {
    uid:null,
    uimg:null,
    udom:null,
    uname:null
  };

  if(typeof req.session== 'undefined') return u;
  if(typeof req.session.auth == 'undefined') return u; 
  var auth = req.session.auth;
  
  if(typeof auth.twitter != 'undefined') {
    if(typeof auth.twitter.user  != 'undefined') {
      u.uid = auth.twitter.user.id+"";
      u.uname = auth.twitter.user.screen_name;
      u.uimg = auth.twitter.user.profile_image_url_https;
      u.ulink = 'http://twitter.com/'+auth.twitter.user.screen_name;
      u.udom = 'twitter.com';        
    }
  } else if(typeof auth.facebook != 'undefined') {
    if(typeof auth.facebook.user  != 'undefined') {
      u.uid = auth.facebook.user.id+"";
      u.uname = auth.facebook.user.name;
      u.uimg = 'https://graph.facebook.com/'+auth.facebook.user.id+'/picture';
      u.ulink = auth.facebook.user.link;
      u.udom = 'facebook.com';        
    }
  } else if(typeof auth.google != 'undefined') {
    if(typeof auth.google.user  != 'undefined') {
      u.uid = auth.google.user.id+"";
      u.uname = auth.google.user.name;
      u.uimg = auth.google.user.picture;
      u.udom = 'google.com';
    }
  } else if(typeof auth.tumblr != 'undefined') {
    if(typeof auth.tumblr.user  != 'undefined') {
      console.log(auth.tumblr.user);
      u.uid = auth.tumblr.user.name+"";
      u.uname = auth.tumblr.user.name;
      u.uimg = 'https://api.readsocial.net/images/tumblr-avatar.png';
      u.udom = 'tumblr.com';
    }
  }

  
  return u;

}

function successScript(url,req) {
  
  var s = getStatus(req);
  
  var statjson = JSON.stringify(s).replace(/\n/g, "");

  var ss = '<html><head><title>ReadSocial: Logged In</title></head><body><script type="text/javascript">\
  window._RS_AUTH_SUCCESS = 1;\
  window._RS_AUTH_STAT = '+statjson+';\
  if(typeof window.opener != "undefined") {\
    if(window.opener != null) {\
      if(typeof window.opener.callback === "function") {\
        window.opener.callback(_RS_AUTH_STAT);\
      } else if(typeof window.opener.ReadSocial !== "undefined") {\
        window.opener.ReadSocial.API.oauthCallback(_RS_AUTH_STAT);\
      }\
    }\
  }\
  if(!(window.navigator.userAgent.indexOf("MSIE")>-1)) {\
    window.close();\
  } else {\
    window.blur();\
  }\
  setTimeout(function () {document.write("You can close this window or return to the action you wanted to access.")},5000);\
  </script></body></html>';
  
  return ss;
}


// LZW-compress a string
function lzw_encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}


exports.THUMBPRINT_VIEW_ACTION = function(req, res, next) {
  
  console.log('seeking thumbprint:'+req.param('par_hash'));
  
  try {
    var xdata_str = req.query.x;
    var xdata = JSON.parse(xdata_str);
  } catch (e) {
    var xdata_str = 'bad data:'+e.message;
    var xdata = {};
  }
    
  model.peers.Thumbprint.findOneByParHash(req.param('par_hash'), function (err, doc) {
    
    console.log('returned from thumbprint find');
    
    if(err) return next(err);
    
    if(!doc) {
      doc = {};
      doc.par_body = '';
    }
    
    console.log('rendering...');
    
    res.render('templates/publisher',
      			{
      			 title: 'ReadSocial',
      			 session: req.session,
      			 layout: 'layouts/layout',
      			 partner_id:req.param('net_id'),
      			 par_hash:req.param('par_hash'),
      			 group_id:req.param('group_id'),
      			 par_body: doc.par_body,
      			 x:xdata,
      			 x_str:xdata_str
      		 });
  });

}







// app auth (SSO) methods

exports.NETWORK_GROUPS_ACTION = function(req, res, next) {
    
    model.peers.Group.getIdList({
      
      rid:req.network.rid
       
    }, function (err,list) {

      if(!err) {
  
        res.send(list, 200);
        
      } else {
        console.log(err);
        next(err);
      }

    });
}

exports.NETWORK_GROUPS_COUNT_ACTION = function(req, res, next) {
  res.send(400);
}

exports.NETWORK_GROUP_NOTES_ACTION = function(req, res, next) {
  var crit = {
    rid: parseInt(req.network.rid),
    gid: req.param('group_name')
  };
  if(req.query.par_hash) {
    crit.par_hash = req.query.par_hash;
  }
  model.peers.Note.getActivity(crit, function (err, list) {
    if(err) return next(err);
    res.send(list, 200);
    
  });
}

exports.NETWORK_NOTE_DETAIL_ACTION = function(req, res, next) {

  model.peers.Note.getOne(req.param('note_id', null), function (err, note) {
    if(!err) {
      res.json(note,200);
    } else {
      console.log(err);
      next(err);
    } 
  });
}


exports.NETWORK_GROUP_NOTES_COUNT_ACTION = function(req, res, next) {

  var crit = {
    rid: req.network.rid,
    gid: req.param('group_name')
  };
  if(req.query.par_hash) {
    crit.par_hash = req.query.par_hash;
  }
  model.peers.Note.count(crit, function (err,doc) {
    if(err) return next(err);
    res.json({count:doc});
  });

}

exports.NETWORK_NOTE_COUNT_ACTION = function(req, res, next) {
  var crit = {
     rid: req.network.rid
   };
   if(req.query.par_hash) {
     crit.par_hash = req.query.par_hash;
   }
   model.peers.Note.count(crit, function (err,doc) {
     if(err) return next(err);
     res.json({count:doc});
   });
}

exports.NETWORK_NOTE_RESPONSES_ACTION = function(req, res, next) {
  
  var q = req.query;
  var t = (new Date()).getTime();
  
  // always filter by paragraph and group
  var noteId = req.param('note_id');
  
  if(typeof noteId=='undefined') next(new Error("note_id must be defined"));
  
  var crit = { note_id: noteId };
  
  if(typeof q.before != 'undefined') {
    crit.crstamp = { $lt: parseInt(q.before) }
  } else {
    crit.crstamp = { $lt: (new Date()).getTime() }
  }
  
  model.peers.Response.get(crit, function (err,list) {

    if(!err) {
      res.send(list, 200);
    } else {
      next(err);
    }

  });
}

// unfinished app auth methods
/*
exports.NETWORK_GROUP_NOTES_UPDATE_ACTION = function(req, res, next) {
  res.send(400);
}

exports.NETWORK_NOTE_RESPONSES_COUNT_ACTION = function(req, res, next) {
  res.send(400);
}

exports.NETWORK_NOTE_DELETE_ACTION = function(req, res, next) {
  res.send(400);
}

exports.LOGIN_ACTION = function(req, res, next) {
  try {
    req.session.auth = {}; // clear auth
    return res.redirect('/auth/twitter');
  } catch(e) {
    console.log('Could not clear session due to exception: '+e.message);
  }
}
*/
/*
exports.SESSIONFRAME_ACTION = function(req,res,next) {
  res.send(_getSessionFrame(req));
}
*/
/*
function _getSessionFrame(req) {
  
  var s = getStatus(req);
  var rid = req.query.rid;
  var statjson = JSON.stringify(s).replace(/\n/g, "");


  var html = '<!DOCTYPE html>\
  <html>\
  <head>\
  	<script>\
  	var _RS_AUTH_STATUS = '+statjson+';\
  	</script>\
  	<script type="text/javascript" src="//ajax.microsoft.com/ajax/jquery/jquery-1.7.1.min.js"></script>\
  	<script type="text/javascript" src="/js/readsocial/lib/porthole.min.js"></script>\
  	<script type="text/javascript" src="/js/readsocial/libRSBridge.js"></script>\
  	<style type="text/css">\
  	body.xdauth { background-color: #EDEDED; overflow: hidden; margin: 0; padding: 9px 0; font-family: Helvetica,Verdana,Arial,sans-serif; font-size: 16px !important; line-height:20px; color:#333; }\
  	body.xdauth a#launchButton { }\
  	body.xdauth .rs-auth-message { text-align:center; font-size:1.3em; margin:1em; }\
  	body.xdauth .loginPane { position:absolute; text-align:center; height:100%; width:100%; } body.xdauth .launchLink { margin:0 auto; }</style>\
  </head>\
  <body class="xdauth">\
  	<div class="loginPane">\
  	</div>\
  	<script type="text/javascript">window.onload = handleLoad;</script>\
  	<script type="text/javascript"> var _gauges = _gauges || []; (function() { var t = document.createElement("script"); t.type = "text/javascript"; t.async = true; t.id = "gauges-tracker"; t.setAttribute("data-site-id", "4f55b560cb25bc25c000000d"); t.src = "//secure.gaug.es/track.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(t, s); })(); </script>\
  </body>\
  </html>\
';
  
  return html;
}

*/

exports.LOGIN_TWITTER_ACTION = function(req, res, next) {
  console.log('twiiter login requested');
  try {
    req.session.auth = {}; // clear auth
    return res.redirect('/auth/twitter');
  } catch(e) {
    console.log('Could not clear session due to exception: '+e.message);
  }

  
}
exports.LOGIN_FACEBOOK_ACTION = function(req, res, next) {

  try {
    req.session.auth = {}; // clear auth
    var r = res.redirect('/auth/facebook');
    return r;
  } catch(e) {
    console.log('Could not clear session due to exception: '+e.message);
  }

}
exports.LOGIN_GOOGLE_ACTION = function(req, res, next) {
  
  try {
    req.session.auth = {}; // clear auth
      return res.redirect('/auth/google');
  } catch(e) {
    console.log('Could not clear session due to exception: '+e.message);
  }

    
}
exports.LOGIN_TUMBLR_ACTION = function(req, res, next) {
  
  try {
    req.session.auth = {}; // clear auth
    return res.redirect('/auth/tumblr');
  } catch(e) {
    console.log('Could not clear session due to exception: '+e.message);
  }

    
}

exports.SESSION_STATUS_ACTION = function(req, res, next) {
   
   
   console.log('session status');
   console.log(req.session);

   var jsonp = req.query.jsonp;
   
    if(typeof req.session !== 'undefined') {

      if(typeof req.network == 'undefined') {
         return res.json({error: 'Network not defined'},400);
      }

      if(typeof req.session.auth !== 'undefined') {
        if(req.session.auth.loggedIn==true) {
           console.log('authed already');
           var robj = getStatus(req);
          if(jsonp) {
            // set header to JS content type?
             res.header('Content-Type' , 'text/javascript' );
             return res.send(jsonp + '('+JSON.stringify(robj)+');');
          } else {
             return res.json(robj,{ 'X-ReadSocial-iOS-Auth-Hint': 'Already-Authed' }, 200);            
          }



         }
      } else {
        console.log('auth is not defined on session');
      }
    }
    var s = {
         authed:false,
         sid:req.sessionID
    };
    console.log('not authed');
    if(jsonp) {
      // set header to JS content type?
      res.send(jsonp + '('+JSON.stringify(s)+');');
    } else {
      res.json(s,200);      
    }

    
};








exports.VAPORBOOK_ACTION = function(req, res, next){ // auth/complete
  

       console.log('VAPORBOOK');
       console.log(req.session);

       var url = '/auth/status';
       res.send(successScript(url,req), 200);

/*
       res.send(successScript(url,req), {'Content-Type': 'text/html',
                                     'X-ReadSocial-iOS-Auth-Hint': 'Just-Authed',
                                     'X-ReadSocial-User': JSON.stringify(req.session.user)
                                     }, 200);
*/

  
}

exports.LOGOUT_ACTION = function(req, res, next) {

 // if(typeof req.session==='undefined') return res.json({success:"logged out"},200);

  console.log('logging out..');

  req.session.destroy(function () {
    console.log('destroy callback');
    res.json(getStatus(req),200);
  });

};


exports.WORDPRESS_ACTION = function (req, res, next) {
  
  
  var key = req.body.key;
  var secret = req.body.secret;

  var html ='\
  	<script type="text/javascript" src="https://api.readsocial.net/js/readsocial.js"></script>\
  	<script type="text/javascript">\
  	\
  			var _RS_OPS = {\
  				base: "https://api.readsocial.net/",\
  			  api_base: "https://api.readsocial.net/",\
  				partner_id: "'+req.param('net_id')+'",\
  				group_id:"wordpress-channel",\
  				container: "'+req.body.target_classname+'",\
  				load_handler: function () {},\
  				use_ui: true\
  			};\
  			\
  			setTimeout(function () {readsocial(_RS_OPS);},3000);\
  	</script>';

  res.send(html,200);

};


// notes


exports.NOTES_LIST_ACTION = function(req, res, next) {


    var q = req.query;
    var t = (new Date()).getTime();

    // always filter by paragraph and group
    
    var crit = { par_hash: q.par_hash, gid: req.group.name };
    
    if(typeof q.before != 'undefined') {
      crit.crstamp = { '$lt': parseInt(q.before) }
    } else {
      crit.crstamp = { '$lt': parseInt((new Date()).getTime()) }
    }
    
    // if private, limit to this network
    // otherwise filter out private notes
    
    if(req.network.is_private) {
      
      crit.rid = req.network.rid;
      crit.pvt = 1;
                
    } else {
      
      crit.pvt = 0;
      
    }

    console.log(crit);

    
    model.peers.Note.get(crit, function (err,list) {

      if(!err) {
        sys.log(t+':got note list');

        console.log(list);

        res.send(list, 200);
      } else {
        console.log(err);
        next(err);
      }

    });

};


exports.NOTE_RESPONSES_COUNT_ACTION = function(req, res, next) {

  var _id = req.param('note_id');

  model.peers.Response.count({
    note_id: _id
  }, function (err,doc) {
    if(err) next(err);
    res.json({count:doc});
  });
  

}

exports.NOTES_COUNT_ACTION = function(req, res, next) {

  var hash = req.query.par_hash;

  model.peers.Note.count({
    par_hash: hash,
    gid: req.group.name
  }, function (err,doc) {
    if(err) next(err);
    res.json({count:doc});
  });
  
}

exports.NOTES_FLAG_ACTION =  function(req, res, next) { // Session-based (not app-based) note creation
  
  model.peers.Note.updateFlagCount( req.param('note_id'), function (err, n) {
    if(err) next(err);
    sys.log('returned from query');
    res.json(n,200);
  });
  
}

exports.SSO_NOTE_CREATE_ACTION = function (req, res, next) {
  req.network = {};
  req.network.rid = 8;
  var n = req.body;
  req.group = {};
  req.group.name = n.channel;
  return exports.NOTES_CREATE_ACTION(req,res,next);  
}

exports.SSO_RESPONSE_CREATE_ACTION = function (req, res, next) {
  return exports.RESPONSES_CREATE_ACTION(req,res,next);  
}

exports.NOTES_CREATE_ACTION =  function(req, res, next) { // Session-based (not app-based) note creation

   var agent = (typeof req.headers['user-agent'] != 'undefined') ?
                             req.headers['user-agent'] :
                                'Unknown Agent';


   
   var n = req.body;

   var u = _getUfromAuth(req);

   u = _getUfromNote(req,u,n); // will override with SSO if authed for it


   var note = new model.factories.Note({
    uid: u.uid,
    uname: u.uname,
    uimg: u.uimg,
    udom: u.udom,
    rid: req.network.rid,
    pvt: (req.network.is_private) ? 1 : 0,
    gid: req.group.name,
    body: n.note_body,
    link: n.note_link,
    img: n.note_img,
    agent: agent,
    sel: n.sel,
    lang: n.lang,
    hi_nrml: n.hi_nrml,
    hi_hash: n.hi_hash,
    hi_raw: n.hi_raw,
    doc_url: n.doc_url,
    doc_id: n.doc_id,
    flags:0,
    vec_id: n.vec_id,
    metadata: n.metadata,
    par_hash: n.par_hash,
    par_body: n.par_body
   });
   
   if(n.par_body) {
     
     /* secuirty risk TODO require key and secret */ 
     
     model.peers.Thumbprint.storeNew({
       par_hash:n.par_hash,
       par_body:n.par_body
     }, function (e, d) {

     });
     
   }
   
   
   if(note.img) {

     var img = note.img;
     var dat = util.parseDataURI(img);

     var buf = dat.buf;
     var ext = dat.type.replace(/^image\//,'.');
     var id = 'orig_n'+note.rid+'_'+note.uid+'_'+note.gid+'_'+(new Date()).getTime()+ext;
     var mtype = dat.type;

     var s3res = require('./uploads.js').processUpload(
       id,
       mtype,
       buf,
       function (statusCode, urls) {

         if(statusCode==200||statusCode==201) { // set image URLs in data to store
           note.img = urls.orig;
           note.img_small = urls.small;
         }
         model.peers.Note.storeNew(note, function (err,n) {
           if(!err) {
            // redis2.publish('#'+req.group.name, JSON.stringify(n), function (e,s) {
//
           //  });
             res.json(n,201);
           } else {
             sys.log('An error occurred storing note');
             next(err);
           }
         });
       });
       
   } else {


    console.log('storing new note');
    console.log(note);


     model.peers.Note.storeNew(note, function (err,n) {
       if(!err) {
        // redis2.publish("alpha_channel", JSON.stringify(n), function (e,s) {
//
        // });
         res.json(n,201);
       } else {
         sys.log('An error occurred storing note');
         next(err);
       }
     });     
   }


};

exports.IMAGE_ACTION = function (req, res, next) {
  if(!req.param('filename')) return res.send(404);
  model.peers.Image.getOne(req.param('filename'), function (err,o) {
    if(o==null) return res.send(404);
    if(err) return next(err);
    res.header('Content-Type',o.type);
    res.header('Content-Length',o.data.length);
    res.send(o.data);
  });
}

exports.GROUPS_LIST_ACTION = function(req, res, next) {
    model.peers.Group.getIdList(req.crit, function (err,list) {
      if(err) return next(err);
      res.send(list, 200);
    });
};

exports.READUM_UPDATE_ACTION = function(req, res, next) {
  var x = req.param('x');
  res.redirect('http://www.readum.com/main/readumUpdate?x='+x);
};

exports.MEDIA_CREATE_ACTION = function(req, res, next) {

};

exports.NOTE_DETAIL_ACTION = function(req, res, next){
  if(req.xhr) {
    sys.log('XHR req');
  }
  model.peers.Note.getOne(req.param('note_id', null), function (err, note) {
    if(!err) {
      res.json(note,200);
    } else {
      console.log(err);
      next(err);
    } 
  });
};

exports.NOTE_RESPONSES_ACTION = function(req, res, next){

  var q = req.query;
  var t = (new Date()).getTime();
  sys.log(t+':incoming note response list query:');
  console.log(q);
  
  // always filter by paragraph and group
  var noteId = req.param('note_id');
  
  if(typeof noteId=='undefined') next(new Error("note_id must be defined"));
  
  var ObjectId = require('mongoose').Types.ObjectId;

  var crit = { note_id: new ObjectId(noteId) };
  
  if(typeof q.before != 'undefined') {
    crit.crstamp = { $lt: parseInt(q.before) }
  } else {
    crit.crstamp = { $lt: (new Date()).getTime() }
  }
  
  // if private, limit to this network
  // otherwise filter out private notes
  
  if(req.network.is_private) {
    
    crit.rid = req.network.rid;
    crit.pvt = 1;
              
  }
  
  model.peers.Response.get(crit, function (err,list) {

    if(!err) {
      res.send(list, 200);
    } else {
      console.log(err);
      next(err);
    }

  });
  
};   

exports.NOTE_RESPONSES_CREATE_ACTION = function(req, res, next){

   var r = req.body;

   if(!r) next(Error("Must define a body for the response"));

   var u = _getUfromAuth(req);

   u = _getUfromNote(req,u,r);

   var resp = new model.factories.Response({

    uid: u.uid,

    uname: u.uname,

    uimg: u.uimg,

    udom: u.udom,

    rid: req.network.rid,
    
    pvt: (req.network.is_private) ? 1 : 0,

    note_id: r.note_id,

    body: r.resp_body

   });

   model.peers.Response.storeNew(resp, function (err,o) {
     if(!err) {
       sys.log('stored response');
        console.log(o);
       res.json(o,201);
     } else {
       sys.log('An error occurred storing note');
       next(err);
     }
   });

};



exports.ADMIN_NETWORK_USAGE_ACTION = function(req, res, next) {
  
var network = new model.Network(req.session.admin.network);
model.peers.Note.count(network._id, function (err,c) {
  
  var o = {
    note_count: c
  };
  o.network = req.session.admin.network;
  res.json(o, 200);
  
});

}

exports.ADMIN_NETWORK_DETAILS_ACTION = function(req, res, next) {

var o = {};
o.network = req.session.admin.network;
model.peers.Note.count({rid:req.param('remote_id')}, function (err, doc) {
  if(err) next(err);
  o.notes = doc;
  model.peers.User.count({rid:req.param('remote_id')}, function (err, doc) {
    if(err) next(err);
    o.users = doc;
    res.json(o,200);
  });
});

}

exports.ADMIN_UPDATE_NETWORK_ACTION = function(req, res, next) {

}



exports.ADMIN_DELETE_NETWORK_ACTION = function(req, res, next) {

}




exports.ADMIN_NETWORK_REKEY_ACTION = function(req, res, next) {

var remote_id = req.param('remote_id',null);
   
model.peers.Network.refreshKeysById(remote_id, function (err, o) {
  if(err) {
    res.json(err,500);
  } else {
    res.json(o,200);
  }
});

}


// SUPER ADMIN FUNCTIONS - RS APPLICATION AUTHORIZATION ONLY



exports.SUPERADMIN_CREATE_NETWORK_ACTION = function(req, res, next) {

var remote_id = req.param('remote_id',null);

model.peers.Network.storeNew(req.param('account'), function (err, n) {
  if(err) {
    next(err);
  } else {
    res.json(n,201);
  }  
});


}


exports.SUPERADMIN_GET_NETWORKS_ACTION = function(req, res, next) {

var remote_id = req.param('remote_id',null);
model.peers.Network.getByRemoteId(remote_id, function (err, n) {
  sys.log('returned from query');
  if(err) next(err);
  res.json(n,200);

});

}    

exports.SUPERADMIN_NETWORK_DETAILS_ACTION = function(req, res, next) {

console.log('super admin looking up network details');

var _id = req.param('_id',null);

model.peers.Network.getOne(_id, function (err, n) {
  if(n==null) {
    res.json(404);
    //next(new Error("Get network "+_id+" returned null"));
  } else {
    if(err||typeof n=='undefined'||n==null) {
      next(err);
    } else {
      if(n.length==0) next(new Error('network details returned a zero length list'));
      model.peers.User.count({rid:n.rid}, function (err, user_count) {


        if(err) next(err);

        sys.log('returned from query:'+user_count);

        n.users = user_count;

        res.json(n,200);

      });      
    }
  }

});

}


exports.SUPERADMIN_NETWORK_GROUPS_ACTION = function(req, res, next) {

  var q = req.query;
  var t = (new Date()).getTime();
  sys.log(t+':incoming group list query:');

  model.peers.Network.getOne(q._id, function (err, doc) {
    
    if(err) {
      console.log(err);
    }
    if(doc==null) {
      next(new Error("doc was null!"),null);
    }
    if(!err) {
      
      // why the hell would doc be null here?
      
      model.peers.Group.getIdList({
        rid: doc.rid
      }, function (err,list) {

        if(!err) {
 

          res.send(list, 200);
        } else {
          console.log(err);
          next(err);
        }

      });
      
    }
    
  });
  



}

exports.SUPERADMIN_NETWORK_ACTIVITY_ACTION = function(req, res, next) {

  var q = req.query;
  var c = q.crit;
  var t = (new Date()).getTime();

  model.peers.Network.getOne(q._id, function (err, doc) {
  
  

  
    if(!err) {   
      var crit = {
        rid: parseInt(doc.rid) 
      };
      
      if(typeof c.filter != 'undefined') {
        if(typeof c.filter.group != 'undefined') {
          crit.gid = c.filter.group;
        }
      }
      if(typeof c.query != 'undefined') {
        //
      }

      if(typeof c.before != 'undefined') {
        crit.crstamp = { '$lt': parseInt(c.before) }
      } else {
        crit.crstamp = { '$lt': parseInt((new Date()).getTime()) }
      }

      console.log(crit);

      model.peers.Note.getActivity(crit, function (err, list) {
        if(err) next(err);
        res.send(list, 200);
        
      });
    }
    
  });
  
  

}

exports.SUPERADMIN_NOTE_DELETE_ACTION = function(req, res, next) {

var _id = req.param('_id',null);
model.peers.Note.removeOne(_id, function (err, r) {
  
  if(err) {
    console.log(err);
    return res.json(err,500);
  } else {
    console.log('successfully removed note');
  }
  sys.log('returned from query');
  res.json(r,200);

});

}

exports.SUPERADMIN_NETWORK_DIST_ACTION = function(req, res, next) {

// count notes by group

var _id = req.param('_id',null);

model.peers.Network.countGroupPosts(_id, function (err, r) {
  
  if(err) res.json(err,500);
  sys.log('returned from query');
  res.json(r,200);

});


}


exports.SUPERADMIN_NETWORK_DELETE_ACTION = function(req, res, next) {

var _id = req.param('_id',null);
model.peers.Network.removeOne(_id, function (err, r) {
  
  sys.log('returned from query');
  res.json(r,200);

});

}

exports.SUPERADMIN_NETWORK_UPDATE_ACTION = function(req, res, next) {

var network = req.param('network',null);
var o = JSON.parse(network);

if(typeof o != 'object') {
  next(new Error('JSON is not valid'));
}

model.peers.Network.updateDoc(o, function (err, n) {
  if(err) next(err);
  sys.log('returned from query');
  res.json(n,200);

});

}


exports.SUPERADMIN_NETWORK_REKEY_ACTION = function(req, res, next) {

var remote_id = req.param('remote_id',null);
   
model.peers.Network.refreshKeysById(remote_id, function (err, o) {
  if(err) {
    res.json(err,500);
  } else {
    res.json(o,200);
  }
});

}

exports.FLYLEAF_HELP_ACTION = function (req, res, next) {
    res.render('templates/flyleaf-help',
            {
             title: 'ReadSocial Flyleaf',
             session: req.session,
             layout: 'layouts/layout',
             section: 'about'
           });
}

exports.UPLOAD_VIEW_ACTION = function (req, res, next) {
    res.render('templates/upload',
            {
             title: 'ReadSocial',
             session: getStatus(req),
             layout: 'layouts/layout',
             section: 'create'
           });
}

exports.FLYLEAF_CREATE_ACTION = function (req, res, next) {
    
  var group = req.body.groupname;
  var body = req.body.body;
  var md5 = hex_md5(body);
  var cr = (new Date()).getTime();

  var fl = new model.peers.Flyleaf({
      md5: md5,
      gid: group,
      body: body,
      crdate: cr
  });
  fl.save(function (err, doc) {
    if(err) return next(err);
    res.redirect('/readsocial/flyleaf/'+doc._id+'/join');
  });

}

exports.FLYLEAF_VIEW_ACTION = function (req, res, next) {

  var id = req.param('id');

  if(typeof id === 'undefined') return next (new Error('None found') );


  model.peers.Flyleaf.getOne(id, function (err,doc) {

        if(!doc && !err) {
          console.log('not found');
          next(new Error('nothing found'));
        }

        var newbod = doc.body.replace(/\r\n/g, "\n");
        newbod = newbod.replace(/\n\n+/g, "\n\n");
        newbod = newbod.replace(/\n\n/g,"</p>\n\n<p>");

        doc.body = '<p class="first">'+newbod+'</p>';

        res.render(
          'templates/flyleaf',
          {
          layout: 'layouts/layout',
          title: doc.gid,
          doc: doc,
          sharelink: 'http://'+req.headers.host+'/readsocial/flyleaf/'+doc._id+'/join',
          session: getStatus(req),
          section: 'view'
          });
  });

}

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
var hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};
