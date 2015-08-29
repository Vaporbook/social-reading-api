var sys = require('util');
var model = require('../model/model.js').model;

exports.authenticate = function(type) {
  

  var key = process.env.THUMBPRINTS_ADMIN_KEY;
  var sec = process.env.THUMBPRINTS_ADMIN_SECRET;
            
  if(type=='admin') {
  
      return function (req, res, next) {
  

        sys.log('checking admin authentication for user...');
        sys.log('admin login');
        
        model.peers.Network.getByRemoteId(req.param('remote_id', null), function (err, n) {

          if(err) {

            next(err);

          } else {

            if(typeof n.length != 'undefined') {
              var n = n[0];
            }
            
            // WHY WOULD N BE UNDEFINED HERE??? AND YET, WE ARE SEEING IT SO.
            if(typeof n=='undefined') {
              
              next(new Error('Yikes, n was undefined and it should not be!'));
              
            }
            if(typeof n.admin_key=='undefined') {
              
              next(new Error('admin_key was undefined and it should not be!'));
               
            }
            
            console.log('credentials are: '+req.param('key')+' and '+req.param('secret'));
            console.log('checking against: '+n.admin_key+' and '+n.admin_secret);
            if(n.admin_key==req.param('key',null) && n.admin_secret==req.param('secret', null)) {
              sys.log('Admin authentication good.');
              req.session.admin = {
                authed: true,
                network: n
              }
              next();

            } else {
        
              sys.log('Admin authentication invalid.');
              res.json({error:"Not authenticated for this"},401);
        
            }
          }
        });
      }
  } else if (type=='superadmin') {
    
    return function (req, res, next) {

       sys.log('checking super admin authentication for user...');
       console.log(req.body);
       console.log('credentials are: '+req.param('superkey')+' and '+req.param('supersecret'));
       console.log('checking against: '+key+' and '+sec);
       
       if(req.param('superkey',null)==key && req.param('supersecret', null)==sec) {
         sys.log('Admin authentication good.');
         req.session.superadmin = {
           authed: true
         }
         next();

       } else {

         sys.log('Admin authentication invalid.');
         res.json({error:"Not authenticated for this"},401);

       }

     }
    
  } else if (type=='read') {
    
    return function (req, res, next) {

      sys.log('checking read authentication for user...');

      if(!req.network) {
        next(new Error('network net_id not defined or network not found'));
      } else {
         model.peers.Network.updateReadCount(req.network.rid, function() {
           // auth all network requests...
           next();
         });
      }

    }
    
  } else if (type=='write') {
    
    return function (req, res, next) {

      sys.log('checking write authentication for user...');
      var appAuthed = (req.readsocial.auth.appLoggedIn) ? true: false;

      if(isAuthed(req)||module.ALWAYSAUTH||appAuthed) {

        sys.log('user or app authed, next...');

        model.peers.Network.updateWriteCount(req.session.network.rid, function () {
          console.log('write count updated...');
        });

        next();

      } else {

        sys.log('401:user is not authed');
        
        res.header('WWW-Authenticate','Basic realm="ReadSocial Apps"');
        
        //req.session.afterAuthURL = req.url;

        res.json({
          error:"auth",
          action:"User agent should redirect the user to the auth URL specified for the session domain, OR app should provide Basic authentication credentials for this network.",
          url:{
            'twitter.com':'/v1/'+req.network.rid+'/auth/login/twitter',
            'facebook.com':'/v1/'+req.network.rid+'/auth/login/facebook',
            'google.com':'/v1/'+req.network.rid+'/auth/login/google'
            }
          },401);

      }

    }
  }
}

function isAuthed(req)
{
    if(typeof req.session !== 'undefined') {
       
       if(typeof req.network == 'undefined') {
          return false;
       }
       
       if(typeof req.session.auth !== 'undefined') {
         if(req.session.auth.loggedIn==true) {
           return true;
         }
       }
    }
    return false;
}


exports.requireAppAuth = function ()
{
  return function (req,res,next) {
    if(req.readsocial.auth.appLoggedIn) {
      next();
    } else {
      console.log('no, not authed');
      res.header('WWW-Authenticate','Basic realm="ReadSocial Apps"');
      return res.send(401);
    }
  }
}

