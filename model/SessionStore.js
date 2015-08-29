var mongoose = require('mongoose');
var oneDay = 8640000;
var SessionSchema = new mongoose.Schema({
  sid:  { type: String, unique:true },
  sess: { type: String }
});

module.exports = function(connect){

  var Store = connect.session.Store;
  
  function MongooseSession(options) {
    console.log('mongoose session handler connecting...');
    options = options || {};
    Store.call(this, options);
    this.prefix = null == options.prefix
      ? 'sess:'
      : options.prefix;
    this.client = mongoose.connect(options.url);
  };

  MongooseSession.prototype.__proto__ = Store.prototype;
     
  MongooseSession.prototype.get = function(sid, fn) {

    console.log('getting session:'+this.prefix + sid);
    var Sess = this.client.model('sessions', SessionSchema);
    Sess.findOne({sid:this.prefix + sid}, function (err, data) {

      try {
        if (!data) return fn();
        console.log(data.sess);
        fn(null, JSON.parse(data.sess.toString()));
      } catch (err) {
        fn(err);
      }

    });
    
    
  }  
  
  MongooseSession.prototype.set = function(sid, sess, fn) {
    
    
    console.log('setting session:'+this.prefix + sid);
    
 
    
    sid = this.prefix + sid;

    try {
      
      var sess = JSON.stringify(sess);
      
      var Sess = this.client.model('sessions', SessionSchema);
      
      Sess.update({ sid:sid }, {sess:sess}, { upsert: true }, function(){
        fn && fn.apply(this, arguments);
      });

    } catch (err) {
      fn && fn(err);
    }
  }
    
  MongooseSession.prototype.destroy = function(sid, fn) {
    console.log('destroying session...');
    console.log('...'+this.prefix + sid);
    
    sid = this.prefix + sid;
 
    var Sess = this.client.model('sessions', SessionSchema);
    
    Sess.findOne({ sid: sid }, function (err, n) {
      if(n) {
        n.remove(fn);
      } else {
        fn(err,n);
      }
  	});

    
  }
  
  return MongooseSession;

}