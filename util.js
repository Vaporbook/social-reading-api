exports.MergeRecursive = function (obj1, obj2) {

  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if ( obj2[p].constructor==Object ) {
        obj1[p] = exports.MergeRecursive(obj1[p], obj2[p]);

      } else {
        obj1[p] = obj2[p];

      }

    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];

    }
  }

  return obj1;
}

exports.randomString = function(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

exports.checkUrl = function(s){
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
}

exports.parseDataURI = function (uri) {
  var type = (uri.match(/^data:image\/png/)) ? 'image/png' :
                (uri.match(/^data:image\/gif/)) ? 'image/gif' :
                   (uri.match(/^data:image\/(jpeg|jpg)/)) ? 'image/jpeg' :
                            'application/octet-stream';

  return {
    type:type,
    buf:new Buffer(uri.replace(/^data\:[^\;]+?\;base64\,/,""),'base64')
  };
}

exports.bufferListToDataURI = function (/* BufferList */ bl, contenttype) {                                                                                                                                                          
  return "data:" + contenttype + ";base64," + new Buffer(bl.toString(), 'binary').toString('base64');
}


exports.merge = function(a, b){
  var keys = Object.keys(b);
  for (var i = 0, len = keys.length; i < len; ++i) {
    var key = keys[i];
    a[key] = b[key]
  }
  return a;
};

/**
 * Base64.
 */

exports.base64 = {
  
  /**
   * Base64 encode the given `str`.
   *
   * @param {String} str
   * @return {String}
   * @api private
   */
  
  encode: function(str){
    return new Buffer(str).toString('base64');
  },
  
  /**
   * Base64 decode the given `str`.
   *
   * @param {String} str
   * @return {String}
   * @api private
   */
  
  decode: function(str){
    return new Buffer(str, 'base64').toString();
  }
};



/*

app.get('/', function (req, res) {
    res.contentType('image/jpeg');
    res.sendfile('cabf735ce7b8b4471ef46ea54f71832d?s=32&d=identicon&r=PG');
});

app.get('/binary', function (req, res) {
    res.sendfile('cabf735ce7b8b4471ef46ea54f71832d?s=32&d=identicon&r=PG');
});

*/