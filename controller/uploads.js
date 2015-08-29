//var knox = require('knox');
var sys = require('util');
var fs = require('fs');
var im = require('imagemagick');

exports.processUpload = function(filename, type, buf, cb) {

     console.log('processing....');
 

     // create sizes as separate buffers
     var stat = 201;
     var sizes = { small:{height:70,width:100}, med:{height:400,width:600}, lg: {height:800,width:1000} };
     var urls = { orig:null, small:null,med:null,lg:null };
     var errs = { orig:null, small:null, med: null,lg:null };
     var sanitized = filename.replace(/\.\./,'').replace(/\//,'');
     
     
     var dir = __dirname + '/../uploads/';
     var origname = sanitized;
     var smallname = sanitized.replace(/^orig/,'small');
     var medname =  sanitized.replace(/^orig/,'med');
     var smallbuf,medbuff,lgbuf;

     fs.writeFile(dir + origname, buf, function (err) {
       console.log('file written:'+origname);
       if (err) throw err;
       
       console.log(dir + origname);
       console.log(dir + smallname);

       im.crop({ // crop original to small
          srcPath: dir + origname,
          dstPath: dir + smallname,
          width: sizes.small.width,
          height: sizes.small.height
        }, function(err, stdout, stderr){ // callback with data in stdout
          if (err) {
            console.log('error on resize/crop');
            console.log(err);
            throw err;
          }
          console.log('resized:'+smallname);

          fs.readFile(dir + smallname, function (err, data) {
            
            urls.small = smallname;
            smallbuf = data;
            console.log('Should have small image Buffer here:');
            console.log(data); // should be a Buffer object
            
            model.peers.Image.storeNew({
                	  name:smallname,
                	  type:type,
                	  data:smallbuf
                	}, function (err,d) { // successfully stored thumbnail
                    if(err) errs.small = err;
                    console.log('stored:'+smallname);                	  
                	  model.peers.Image.storeNew({
                        	  name:origname,
                        	  type:type,
                        	  data:buf
                        	}, function (err,d) { // successfully stored orig
                         	  if(err) errs.orig = err;
              	            console.log('stored:'+origname);

                            fs.unlinkSync(dir+origname);
                            fs.unlinkSync(dir+smallname);

                            urls.orig = d.name;
                            if(errs.orig||errs.small) {
                              stat = 500;
                              console.log(errs);
                            }
                            cb(stat,urls);               	  
                	  });
                	  
 
              }); // small img stored in db
          });
        }); // original resized to small
      }); // original file written to disk
    
     
     
     
}
