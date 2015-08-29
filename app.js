
var readsocial = require('./readsocial.js'),
    http = require('http'),
    argv = require('optimist').argv,
    config = require('./config/server-config.js'),
    envblock = config[process.env.THUMBPRINTS_ENV],
    express = require('express'),
    sys = require('util'),
    /*staticfs = require("node-static"),*/
    staticroot = __dirname+'/www',
/*    file = new(staticfs.Server)(staticroot),*/
    network,
    controller = require('./controller/controller.js').controller;



/*

  When mongoose-auth bit the dust due to some kind of
  incompatibility with the newest versions of node
  and express, I had to remove it completely and
  remove any references to it. Additionally, I had
  to implement its functionality on my own using
  everyauth, and tearing out bits of mongoose-auth
  and repurposing them. This is part of that work:

*/



var everyauth = require('everyauth')
  , Promise = everyauth.Promise;

everyauth.debug = true;


everyauth.everymodule.findUserById( function (req, userId, callback) {


  /* ONLY if the correct findOrCreateUser methods
     exist will this method receive the correct
     userId, which MUST be a Mongo ObjectId string
     to do a unique lookup on the db.
     
     If this winds up being a facebook, twitter or
     other id, authentication via oauth will fail
  */
  
  console.log('everyauth findByUserId');
  console.log(userId);
 //req.session.user = controller.getUfromAuth(req);
 // req.session.user._id = req.session.auth.userId;
  
  console.log(req.session.auth);
  
  if(typeof req.session.auth.facebook !== 'undefined') {

    console.log('finding user for facebook domain');

    model.peers.User.findOne({'_id': userId}, callback);

  } else if (typeof req.session.auth.twitter !== 'undefined') {

    model.peers.User.findOne({'_id': userId}, callback);

  } else if (typeof req.session.auth.google !== 'undefined') {

    model.peers.User.findOne({'_id': userId}, callback);

  } else if (typeof req.session.auth.tumblr !== 'undefined') {

    model.peers.User.findOne({'_id': userId}, callback);

  }


});

var ENV = process.env.THUMBPRINTS_ENV;

if(envblock.facebook) {
  everyauth.facebook
    .mobile(true)
    .appId(envblock.facebook.everyauth.appId)
    .appSecret(envblock.facebook.everyauth.appSecret)
    .myHostname(envblock.facebook.everyauth.myHostname)
    .entryPath('/auth/facebook')
    .callbackPath('/auth/facebook/callback')
    .scope('email')          
    .fields('id,name,email,picture')
    .findOrCreateUser(function (sess, accessTok, accessTokExtra, fbUser) {
      var promise = this.Promise();
      console.log({'fb.id': fbUser.id});
      model.peers.User.findOne({'fb.id': fbUser.id}, function (err, foundUser) {
        if (foundUser) {
          console.log('FOUND USER');
          console.log(foundUser);
          return promise.fulfill(foundUser);
        }
        console.log("CREATING");
        model.peers.User.createWithFB(fbUser, accessTok, accessTokExtra.expires, function (err, createdUser) {
          if (err) return promise.fail(err);
          return promise.fulfill(createdUser);
        });
      });
      return promise;
    })
    .redirectPath(envblock.facebook.everyauth.redirectPath);
}

if(envblock.twitter) {

  everyauth.twitter
    .consumerKey(envblock.twitter.everyauth.consumerKey)
    .consumerSecret(envblock.twitter.everyauth.consumerSecret)
    .myHostname(envblock.twitter.everyauth.myHostname)
    .entryPath('/auth/twitter')
    .callbackPath('/auth/twitter/callback')
    .findOrCreateUser(function (sess, accessTok, accessTokSecret, twitterUser) {
      var promise = this.Promise();
      model.peers.User.findOne({'twit.id': twitterUser.id}, function (err, foundUser) {
        if (err) return promise.fail(err);
        if (foundUser) {
          return promise.fulfill(foundUser);
        }
        model.peers.User.createWithTwitter(twitterUser, accessTok, accessTokSecret, function (err, createdUser) {
          if (err) return promise.fail(err);
          return promise.fulfill(createdUser);
        });
      });
      return promise;
    })
    .redirectPath(envblock.twitter.everyauth.redirectPath);

}

if(envblock.google) {

  everyauth.google
    .appId(envblock.google.everyauth.appId)
    .appSecret(envblock.google.everyauth.appSecret)
    .myHostname(envblock.google.everyauth.myHostname)
    .scope(envblock.google.everyauth.scope)
    .entryPath('/auth/google')
    .callbackPath('/auth/google/callback')
    .findOrCreateUser(function (sess, accessTok, accessTokSecret, googleUser) {
      var promise = this.Promise();
      model.peers.User.findOne({'google.email': googleUser.id}, function (err, foundUser) {
        if (err) return promise.fail(err);
        if (foundUser) {
          return promise.fulfill(foundUser);
        }
        model.peers.User.createWithGoogleOAuth(googleUser, accessTok, accessTokExtra, function (err, createdUser) {
          if (err) return promise.fail(err);
          return promise.fulfill(createdUser);
        });
      });
      return promise;
    })
    .redirectPath(envblock.google.everyauth.redirectPath);

}


if(envblock.tumblr) {


  everyauth.tumblr
    .consumerKey(envblock.tumblr.everyauth.consumerKey)
    .consumerSecret(envblock.tumblr.everyauth.consumerSecret)
    .findOrCreateUser( function (sess, accessToken, accessSecret, tumblrUser) {
      var promise = this.Promise();
      model.peers.User.findOne({'tumblr.id': tumblrUser.id}, function (err, foundUser) {
        if (err) return promise.fail(err);
        if (foundUser) {
          return promise.fulfill(foundUser);
        }
        model.peers.User.createWithTumblr(tumblrUser, accessTok, accessTokExtra, function (err, createdUser) {
          if (err) return promise.fail(err);
          return promise.fulfill(createdUser);
        });
      });
      return promise;
    })
    .redirectPath(envblock.tumblr.everyauth.redirectPath);

}

var model = require('./model/model.js').model;



var host = envblock.db.host,
    port = envblock.db.port,
    dbname = envblock.db.name,
    serverHost = envblock.host,
    serverPort = process.env.PORT || envblock.port,
    nodeUserGid = envblock.gid,
    nodeUserUid = envblock.uid,
    dburi = process.env.MONGOLAB_URI || 'mongodb://'+host+':'+port+'/'+dbname,
    sessionStore = new model.MongoSession({
      url: dburi
    }),
    sessionConfig = {
  	  key: 'readsocial',
  	  secret: 'thumbprints',
  	  cookie: { maxAge: 29 * 86400000, httpOnly: false, path: '/'  },
  	  store: sessionStore
  	},
    app = express(),
    swagger = require('./swagger.js');
/*    redis = require("redis");*/


                                  sys.log('');
                                  sys.log('.....................................');
                                  sys.log('     Read Social API (c) 2011-2015');
                                  sys.log('.....................................');
                                  sys.log('                             ');
                                  sys.log('started main server for environment '+argv.env);
                                  sys.log('using server config:');
                                  console.log(envblock);
                                  sys.log('app root is:'+__dirname);
                                  sys.log('static root is '+staticroot);


controller.ALWAYSAUTH = (argv.env=='test') ? 1 : 0;

try {
  model.connect(dburi);
} catch (e) {
  console.log(e);
}
global.model = model;

app.configure(function(){
  console.log('configuration');
});

app.enable("jsonp callback");

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(readsocial.init());

app.use(readsocial.logUri());

app.use(express.favicon(__dirname+'/www/favicon.ico'));

app.use(express.static(staticroot));

app.use(readsocial.sessionFilter());

app.use(readsocial.globalHeaders());

app.use(readsocial.bodyParser(express));

app.use(readsocial.cookieParser(express));

app.use(readsocial.session(express,sessionConfig));

app.use(everyauth.middleware());

app.use(function (req,res,next) {
        if(typeof req.session !== 'undefined') {
            console.log(req.session); 
        }
        next();
      });

app.use(express.errorHandler({ showStack: true, dumpExceptions: true }));


app.get('/', function (req,res,next) {
  res.redirect('/v1');
});

// app (SSO) authed methods:

app.get(controller.NETWORK_GROUPS = '/v1/network/groups',
        controller.requireAppAuth(),
        readsocial.criteriaBuilder(),
        controller.NETWORK_GROUPS_ACTION);

app.get(controller.NETWORK_GROUPS_COUNT = '/v1/network/groups/count',
        controller.requireAppAuth(),
        readsocial.criteriaBuilder(),
        controller.NETWORK_GROUPS_COUNT_ACTION);

app.get(controller.NETWORK_GROUP_NOTES = '/v1/network/:group_name/notes',
        controller.requireAppAuth(),
        readsocial.criteriaBuilder(),
        controller.NETWORK_GROUP_NOTES_ACTION);

app.get(controller.NETWORK_GROUP_NOTES_COUNT = '/v1/network/:group_name/notes/count',
        controller.requireAppAuth(),
        readsocial.criteriaBuilder(),
        controller.NETWORK_GROUP_NOTES_COUNT_ACTION);

app.post(controller.NETWORK_GROUP_NOTES_UPDATE = '/v1/network/:group_name/notes/update',
         controller.requireAppAuth(),
         readsocial.criteriaBuilder(),
         controller.NETWORK_GROUP_NOTES_UPDATE_ACTION);

app.get(controller.NETWORK_NOTE_COUNT = '/v1/network/notes/count',
        controller.requireAppAuth(),
        readsocial.criteriaBuilder(),
        controller.NETWORK_NOTE_COUNT_ACTION);

app.get(controller.NETWORK_NOTE_DETAIL = '/v1/network/notes/:note_id',
        controller.requireAppAuth(),
        readsocial.criteriaBuilder(),
        controller.NETWORK_NOTE_DETAIL_ACTION);

app.get(controller.NETWORK_NOTE_RESPONSES = '/v1/network/notes/:note_id/responses',
        controller.requireAppAuth(),
        readsocial.criteriaBuilder(),
        controller.NETWORK_NOTE_RESPONSES_ACTION);

app.get(controller.NETWORK_NOTE_RESPONSES_COUNT = '/v1/network/notes/:note_id/responses/count',
        controller.requireAppAuth(),
        readsocial.criteriaBuilder(),
        controller.NETWORK_NOTE_RESPONSES_COUNT_ACTION);

app.post(controller.NETWORK_NOTE_DELETE = '/v1/network/notes/:note_id/delete',
         controller.requireAppAuth(),
         readsocial.criteriaBuilder(),
         controller.NETWORK_NOTE_DELETE_ACTION);


// OAuth related methods (don't need these for single sign on)

app.get(controller.SESSIONFRAME,
	readsocial.logReqHeaders(),
  readsocial.networkAuth(),
  controller.SESSIONFRAME_ACTION);

app.get(controller.LOGIN_FACEBOOK,
	readsocial.logReqHeaders(),
	readsocial.networkAuth(),
  controller.LOGIN_FACEBOOK_ACTION);

// old route, goes to twitter by default now
app.get(controller.LOGIN,
  readsocial.logReqHeaders(),
  readsocial.networkAuth(),
  controller.LOGIN_TWITTER_ACTION);
    
app.get(controller.LOGIN_TWITTER,
  readsocial.logReqHeaders(),
  readsocial.networkAuth(),
  controller.LOGIN_TWITTER_ACTION);

app.get(controller.LOGIN_GOOGLE,
  readsocial.logReqHeaders(),
  readsocial.networkAuth(),
  controller.LOGIN_GOOGLE_ACTION);

app.get(controller.LOGIN_TUMBLR,
  readsocial.logReqHeaders(),
  readsocial.networkAuth(),
  controller.LOGIN_TUMBLR_ACTION);

app.get(controller.SESSION_STATUS,
  readsocial.logReqHeaders(),
  readsocial.networkAuth(),
	readsocial.logResHeaders(),
  controller.SESSION_STATUS_ACTION);

app.get(controller.VAPORBOOK,
  readsocial.logReqHeaders(),
	readsocial.logResHeaders(),
  controller.VAPORBOOK_ACTION);

app.post(controller.LOGOUT,
  readsocial.logReqHeaders(),
  controller.LOGOUT_ACTION);

app.post(controller.WORDPRESS,
  readsocial.logReqHeaders(),
  readsocial.networkAuth(),
  controller.WORDPRESS_ACTION);


/**

  Note and response creation requires both network
  and write access authentication for session- or app-based access

*/

app.post(controller.NOTES_CREATE,
  readsocial.logReqHeaders(),
  readsocial.networkAuth(),
  controller.authenticate('write'),
  readsocial.logResHeaders(),
  controller.NOTES_CREATE_ACTION);

app.post(controller.NOTE_RESPONSES_CREATE,
  readsocial.logReqHeaders(),
  readsocial.networkAuth(),
  controller.authenticate('write'),
  readsocial.logResHeaders(),
  controller.NOTE_RESPONSES_CREATE_ACTION);

app.post(controller.NOTE_FLAG,
  readsocial.logReqHeaders(),
  readsocial.networkAuth(),
  controller.authenticate('write'),
  readsocial.logResHeaders(),
  controller.NOTE_FLAG_ACTION);


/**

  SSO

*/

app.post(controller.SSO_NOTE_CREATE,
  controller.SSO_NOTE_CREATE_ACTION);

app.post(controller.SSO_RESPONSE_CREATE,
  controller.SSO_RESPONSE_CREATE_ACTION);

  
/**

  Note list, list responses and details, must
  have network auth for private net restrictions

*/


app.get(controller.NOTES_LIST,
    readsocial.logReqHeaders(),
  readsocial.networkAuth(),
  readsocial.cacheControl(),
    readsocial.logResHeaders(),
  controller.NOTES_LIST_ACTION);

app.get(controller.NOTE_RESPONSES,
    readsocial.logReqHeaders(),
  readsocial.networkAuth(),
  readsocial.cacheControl(),
    readsocial.logResHeaders(),
  controller.NOTE_RESPONSES_ACTION);

app.get(controller.NOTE_DETAIL,
  readsocial.networkAuth(),
  controller.NOTE_DETAIL_ACTION);

app.get(controller.IMAGE,
  readsocial.networkAuth(),
  controller.IMAGE_ACTION);



  /**

    Counts are public, and do not require sessions or auth

  */


app.get(controller.NOTES_COUNT,
  controller.NOTES_COUNT_ACTION);

app.get(controller.NOTE_RESPONSES_COUNT,
  controller.NOTE_RESPONSES_COUNT_ACTION);
  
app.get(controller.GROUPS_LIST,
  controller.GROUPS_LIST_ACTION);


/**

  Views

*/


app.get(controller.THUMBPRINT_VIEW,
  readsocial.networkAuth(),
  controller.THUMBPRINT_VIEW_ACTION);

app.get(controller.UPLOAD_VIEW,
  controller.UPLOAD_VIEW_ACTION);

app.get(controller.FLYLEAF_VIEW,
  controller.FLYLEAF_VIEW_ACTION);

app.get(controller.FLYLEAF_HELP,
  controller.FLYLEAF_HELP_ACTION);

app.post(controller.FLYLEAF_CREATE,
  controller.FLYLEAF_CREATE_ACTION);

//admin routes - network level access

app.post(controller.ADMIN_NETWORK_USAGE, controller.authenticate('admin'),  controller.ADMIN_NETWORK_USAGE_ACTION);

app.post(controller.ADMIN_NETWORK_DETAILS, controller.authenticate('admin'), controller.ADMIN_NETWORK_DETAILS_ACTION);

app.post(controller.ADMIN_NETWORK_REKEY,  controller.authenticate('admin'), controller.ADMIN_NETWORK_REKEY_ACTION);



// super admin routes - only dashboard access

app.get(controller.SUPERADMIN_GET_NETWORKS, 
  controller.authenticate('superadmin'), controller.SUPERADMIN_GET_NETWORKS_ACTION);

app.post(controller.SUPERADMIN_CREATE_NETWORK,
	controller.authenticate('superadmin'), controller.SUPERADMIN_CREATE_NETWORK_ACTION);

app.get(controller.SUPERADMIN_NETWORK_DETAILS,
	controller.authenticate('superadmin'), controller.SUPERADMIN_NETWORK_DETAILS_ACTION);

app.get(controller.SUPERADMIN_NETWORK_GROUPS, 
	controller.authenticate('superadmin'), controller.SUPERADMIN_NETWORK_GROUPS_ACTION);

app.get(controller.SUPERADMIN_NETWORK_ACTIVITY, 
	controller.authenticate('superadmin'), controller.SUPERADMIN_NETWORK_ACTIVITY_ACTION);

app.post(controller.SUPERADMIN_NETWORK_UPDATE,
	controller.authenticate('superadmin'), controller.SUPERADMIN_NETWORK_UPDATE_ACTION);

app.post(controller.SUPERADMIN_NETWORK_REKEY, 
	controller.authenticate('superadmin'), controller.SUPERADMIN_NETWORK_REKEY_ACTION);

app.post(controller.SUPERADMIN_NETWORK_DELETE,
	controller.authenticate('superadmin'), controller.SUPERADMIN_NETWORK_DELETE_ACTION);

app.post(controller.SUPERADMIN_NOTE_DELETE, 
	controller.authenticate('superadmin'), controller.SUPERADMIN_NOTE_DELETE_ACTION);

app.get(controller.SUPERADMIN_NETWORK_DIST,
	controller.authenticate('superadmin'), controller.SUPERADMIN_NETWORK_DIST_ACTION);

// legacy routes to support

app.get(controller.READUM_UPDATE, controller.READUM_UPDATE_ACTION);



swagger.addDoc(controller.LOGOUT_DOC);

swagger.addDoc(controller.LOGIN_TWITTER_DOC);

swagger.addDoc(controller.LOGIN_FACEBOOK_DOC);

swagger.addDoc(controller.LOGIN_GOOGLE_DOC);

swagger.addDoc(controller.SESSION_STATUS_DOC);

swagger.addDoc(controller.NOTES_LIST_DOC);

swagger.addDoc(controller.NOTES_CREATE_DOC);

swagger.addDoc(controller.IMAGE_DOC);

swagger.addDoc(controller.NOTES_COUNT_DOC);

swagger.addDoc(controller.NOTE_DETAIL_DOC);

swagger.addDoc(controller.NOTE_FLAG_DOC);

swagger.addDoc(controller.NOTE_RESPONSES_DOC);

swagger.addDoc(controller.NOTE_RESPONSES_CREATE_DOC);

swagger.addDoc(controller.NOTE_RESPONSES_COUNT_DOC);

swagger.addDoc(controller.GROUPS_LIST_DOC);

app.param('net_id', function(req, res, next, id) {
  next();
});

app.param('group_name', function(req, res, next, name){
  model.peers.Group.getOne(name, function(err, group){
    if (err) return next(err);
    if (!group) return next(new Error('failed to find group'));
    req.group = group;
    next();
  });
});



//  configures the app for swagger
swagger.configure(app, "http://"+serverHost+":"+serverPort, "0.1");

app.listen(serverPort, function () {
  //process.setgid(nodeUserGid);
  //process.setuid(nodeUserUid);
});

sys.log('server created');


