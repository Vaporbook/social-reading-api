var util = require('./../util.js');

exports.Note = function (o) {

  return o;

};

exports.Group = function (o) {

  return o;

};

exports.Image = function (o) {

  return o;

};

exports.Thumbprint = function (o) {

  return o;

};

exports.Flyleaf = function (o) {

  return o;

};

exports.User = function (o) {

  return o;

};

exports.Response = function (o) {

  return o;

};

exports.Network = function (o) {

  var t = (new Date()).getTime();
  
  var key = util.randomString(40);
  var secret = util.randomString(40);

  var o2 = 
  {
      admin_key: key,
      admin_secret: secret,
      oa_dom:"twitter.com",
      oa_url:"https://twitter.com/oauth/authenticate",
      oa_turl:"https://api.twitter.com/oauth/request_token",
      oa_aurl:"https://api.twitter.com/oauth/access_token",
      oa_key:process.env.THUMBPRINTS_OAUTH_KEY,
      oa_sec:process.env.THUMBPRINTS_OAUTH_SECRET,
      oa_ver:"1.0",
      oa_cb:"http://api.readsocial.net:8124/v1/vaporbook",
      oa_alg:"HMAC-SHA1",
      crstamp:t,
      reads:0,
      writes:0
  }

  // where's this being created, use a different twiiter
  // app depending on env

  var ox = util.MergeRecursive(o,o2);
  return ox;

};
