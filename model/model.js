var sys = require('util'),
  argv = require('optimist').argv,
  config = require('./../config/server-config.js'),
  express = require('express'),
  mongoose = require('mongoose'),
  mongodb = require('mongodb'),
  crypto = require('crypto'),
  util = require('./../util.js'),
  TEMPLATE_NETWORK_ID = null,
  schema = require('./schema-v1.js'),
  factories = require('./factories.js'),
  db, dbnative;

var peers = require('./peers.js');

var MongoSession = require('./SessionStore.js')(express);

var user_schema = new mongoose.Schema(schema.UserSchema);


peers.Network = mongoose.model('networks', new mongoose.Schema(schema.NetworkSchema));
peers.Note = mongoose.model('posts', new mongoose.Schema(schema.NoteSchema));
peers.Group = mongoose.model('groups', new mongoose.Schema(schema.GroupSchema));
peers.User = mongoose.model('users', user_schema);
peers.Response = mongoose.model('responses', new mongoose.Schema(schema.ResponseSchema));
peers.Image = mongoose.model('images', new mongoose.Schema(schema.ImageSchema));
peers.Thumbprint = mongoose.model('thumbprints', new mongoose.Schema(schema.ThumbprintSchema));
peers.Flyleaf = mongoose.model('flyleafs', new mongoose.Schema(schema.FlyleafSchema));

util.MergeRecursive(peers.Network, peers.NetworkPeer);
util.MergeRecursive(peers.Note, peers.NotePeer);
util.MergeRecursive(peers.Group, peers.GroupPeer);
util.MergeRecursive(peers.User, peers.UserPeer);
util.MergeRecursive(peers.Response, peers.ResponsePeer);
util.MergeRecursive(peers.Image, peers.ImagePeer);
util.MergeRecursive(peers.Thumbprint, peers.ThumbprintPeer);
util.MergeRecursive(peers.Flyleaf, peers.FlyleafPeer);

var m = (function () {
  
  var _connect = function (uri) {
    
    sys.log('******Model Init******');
    
    console.log(uri);
    
    db = mongoose.createConnection(uri);

    peers.setPeers(peers);

    peers.Network.count({}, function (err, doc) {
      console.log('Networks:'+doc);
      
      if(parseInt(doc)<1) {
        
        // ensure at least one network exists
        // TODO only for test environment?
        
        var o = {
          name:'Test Network',
          company:'No Company',
          rid:1
        }
        
        var n = peers.Network.storeNew(o, function (e, n) {
         
         if(n) {
           console.log('Test network created:');
           console.log(n);
         } else {
           console.log('Error creating test network');
         }
          
        });

      }
          
    });
    peers.Note.count({}, function (err, doc) {
      console.log('Notes:'+doc);
    });
  
  };

  return {
    connect:_connect,
    factories:factories,
    peers:peers,
    MongoSession:MongoSession
  };
  
  
})();

exports.model = m;