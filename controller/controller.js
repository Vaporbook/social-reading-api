var sys = require('util'),
  util = require('./../util.js'),
  auth = require('./auth.js'),
  actions = require('./actions.js'),
  docs = require('./docs.js'),
  routes = require('./routes.js'),
  controller = (function () {

  var co = {
    setCORSHeaders:auth.setCORSHeaders,
    authenticate:auth.authenticate,
    setNetworkById:auth.setNetworkById,
    afterAuth:auth.afterAuth,
    requireAppAuth:auth.requireAppAuth,
    logout:auth.logout
  };  

  util.MergeRecursive(co,routes);

  util.MergeRecursive(co,actions);

  util.MergeRecursive(co,docs);
  
  return co;

})();

exports.controller = controller;
