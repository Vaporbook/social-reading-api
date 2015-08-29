var session = require('express-session')

exports.init = function init()
{
  return function (req,res, next) {

    // define a convenient getHeaders function on every request
    res.getHeaders = function ()
    {
      return this.connection._httpMessage._headers;
    }

    
	  req.readsocial = {
      
      auth: {
        appLoggedIn: false,
        userLoggedIn: false
      }
      
    };
    
    next();
	}
}


exports.cacheControl = function cacheControl (req, res, next)
{
    return function (req,res,next) {

      res.header('cache-control','no-cache, no-store, must-revalidate, pre-check=0, post-check=0');
      res.header('pragma','no-cache');
      next();

    }

}

exports.networkAuth = function networkAuth()
{
  /**
  
    Required when we need to confirm or track the specific
    network relevant to a request. Operates by looking for
    either standard basic auth headers or simply an id
    in the path, retrieving the network by id or retrieving
    by key and secret, also effectively authenticating it
  
  */
  
  
  return function (req,res,next) {
    
      console.log('network auth');

      if(req.headers['authorization']) { // app based auth
        console.log('Found auth header:'+req.headers['authorization']);
        var creds = (new Buffer(
          req.headers['authorization'].replace('Basic ', ''),
           'base64')).toString('utf8').split(':');
        console.log(creds);
        model.peers.Network.findOne( {
          admin_key: creds[0], admin_secret: creds[1]
        } , function (e,d) {

          if(e) return next(e);
          if(d==null) return next();

          console.log('found network from credentials');
          req.readsocial.auth.appLoggedIn = true;
          res.header('X-ReadSocial-AppId',creds[0]);
          res.header('X-ReadSocial-NetId',d.rid);
          res.header('X-ReadSocial-Siloed',d.is_private);
          req.network = d;
          if(typeof req.session !== 'undefined') {
            req.session.network = req.network;
          }

          next();

        });


      } else {
        
        // app is not authenticated
        console.log('network not authed via header');
        try { // fall back on session based auth
          
          if(net_id=/\/v\d+\/(\d+)\//.exec(req.url)[1])
          {
            // network id is set

            console.log('A network ID is set on this request:'+net_id);

            model.peers.Network.findOne({
              rid:net_id
              }, function (err,n) {
              
              if(!n) return next(new Error("No network found"));
              
              if(err) {
                console.log('Error getting network:');
                return next(err);
              }
              console.log('Found net in db');
              res.header('X-ReadSocial-AppId',n.admin_key);
              res.header('X-ReadSocial-NetId',n.rid);
              res.header('X-ReadSocial-Siloed',n.is_private);
          
              req.network = n;
              if(typeof req.session !== 'undefined') {
                req.session.network = req.network;
              }

              next();

            });

          } else {
            
            res.redirect(404);
            
          }
          
        } catch (e) {


          console.log('caught error');
          console.log(e);

          res.redirect(500);
        }

      }
  };
}

exports.sessionFilter = function sessionFilter()
{
  
  /**
  
    Allows us to flag for routed URLs we want to exempt from sessions
    
  */
  
  return function (req,res,next) {
    console.log('sessionFilter');
    req.skipSession = (req.url.match(/\/notes\/count/)) ? true : false;
    next();
  }
}



exports.globalHeaders = function globalHeaders()
{
  return function (req, res, next) {
      
      //res.header("Content-Type", "application/json; charset=utf-8");
      
      var orgmap = [
        
        'http://local.readsocial.net:8124',
        'https://api.readsocial.net'
        
      ];
          console.log('globalHeaders');
      //var org = (typeof req.headers.referer !== 'undefined') ? req.headers.referer : '*';
      
      //var org = '*';
      //res.header('Access-Control-Allow-Origin', orgmap.join(' '));
      res.header('Access-Control-Allow-Origin', '*');      
      res.header('Access-Control-Allow-Credentials','true');
      res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, Authorization, Content-Type, Cookie, X-Requested-With');
      res.header('Access-Control-Max-Age', '86400');  // One day
      res.header('X-Powered-By','ReadSocial API Express Server');
      res.header('X-Readsocial-Version', '1.0');
      //console.log(res.connection._httpMessage._headers);

      next();
  }
}

// wrappers to allow us to bypass sessions for some calls:
// the way they work is to conditionally return the wrapped
// funtion, only if a session is required. Otherwise, they
// simply call next()

exports.cookieParser = function (express) {
  return function (req,res,next) {
    if(req.skipSession) {
      return next();
    } else {
      var f = express.cookieParser();
      return f(req,res,next);
    }
    
  }
}

exports.bodyParser = function (express) {
  return function (req,res,next) {
    //console.log(req);
    if(req.method != 'POST') {
      console.log('GET request - skipping body parsing');
      return next();
    } else {
      console.log('POST request - doing body parsing');
      var f = express.bodyParser();
      return f(req,res,next);
    }
    
  }
}

exports.session = function (express,sessionConfig) {
  
  return function (req,res,next) {
    if(req.skipSession) {
      next();
    } else {
      var f = session(sessionConfig); 
      return f(req,res,next);      
    }
  }

  
}


// this is for global criteria on requests

exports.criteriaBuilder = function criteriaBuilder()
{
  return function (req, res, next) {
    var q = req.query;
    if(typeof req.crit==='undefined') {
      req.crit = {};
    }
    var t = (new Date()).getTime();    
    if(typeof q.par_hash!='undefined') {
      req.crit.par_hash = q.par_hash;
    }
    // if private, limit to this network
    if(req.network.is_private) {
      req.crit.rid = req.network.rid;    
      req.crit.pvt = 1;
    }
    
    console.log(req.crit);
  }
}


/**

  Logging functions
  
*/

exports.logUri = function logUri()
{
  return function (req,res,next) {
    
    console.log('---------------');
    console.log(req.url);    
    console.log('---------------');    
    
    next();
  }
}


exports.logResHeaders = function logResHeaders()
{
  return function (req,res,next) {
    console.log('+');    console.log('+');    console.log('+');
    console.log('          --------++++++RESPONSE HEADERS++++++-------');
    console.log('+');    console.log('+');    console.log('+');
    console.log(res.getHeaders());
    console.log('*');
    console.log('*');
    next();
  }
}
exports.logReqHeaders = function logReqHeaders()
{
  return function (req,res,next) {
    console.log('+');    console.log('+');    console.log('+');
    console.log('[[[                        '+req.url+'                      ]]]');
    console.log('+');    console.log('+');    console.log('+');
    console.log('          --------++++++REQUEST HEADERS++++++-------AA');
    console.log(req.headers);
    console.log('+');
    console.log('+');
    next();
  };
}
