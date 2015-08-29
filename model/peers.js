var sys = require('util');
var util = require('./../util.js');
var db;

exports.setPeers = function (p) {
  // i use this to set the reference
  // to the completed peers object. otherwise
  // the complete object will not be available
  // at the time its called. surely there's a
  // less retarded way of accomplishing this
  db = p;
} 

function dbCallback(cb, err, n, successHook) {
	if(err||typeof n=='undefined') {
	  cb(err);      			  
	} else {
	  if(n==null) { // fucked
	    cb(new Error("Database returned null doc with no error!"));
	  }
	  if(typeof successHook=='function') {
	    successHook(n);
	  }
	  cb(null,n);
	}  
}

exports.NetworkPeer = {
  
  storeNew: function (o, cb) {
    var net = new model.factories.Network({
        name:o.name,
        rid:parseInt(o.rid),
        is_private:false,
        company:o.company
    });
  	db.Network.create(net, function(err, n) {
      dbCallback(cb, err, n);
  	});
  },
  updateDoc: function (o, cb) {
    var q = {
      rid: parseInt(o.rid)
    }
    db.Network.update(q, o, function (err, n) {
      dbCallback(cb, err, n);
  	});
  },
  updateReadCount: function (id, cb) {
    db.Network.update({ rid: id }, {$inc:{reads:1}}, cb);
  },
  updateWriteCount: function (id, cb) {
    db.Network.update({ rid: id }, {$inc:{writes:1}}, cb);
  },
  refreshKeysById: function (id, cb) {

    var k = util.randomString(40);
    var s = util.randomString(40);
    
    db.Network.collection.update(
      { rid: id }, {$set:{admin_key:k, admin_secret:s}},
      cb
    );
    
  },
  countGroupPosts: function (id, cb) {
    db.Network.findById(id, function (e, n) {
      if(e) cb(e,null);
      var coll = {};
      db.Note.find({ // find all notes for network
        rid:n.rid
      }).select('gid').each(function (e,d) { // select only gid field
        if(e) cb(e);
        //TODO use map-reduce for this??        
        if(d==null) {
          cb(null,coll);
        } else {
          if(!coll[d.gid]) {
            coll[d.gid] = 0;
          }
          coll[d.gid]++;
        }
      });
    });
  },
  getOne: function (id, cb) {
    //TODO check for valid object id before proceeding
    
  	db.Network.findById(id, function (err, n) {
      dbCallback(cb, err, n);
  	});
  },
  removeOne: function (id, cb) {
  	db.Network.findById( id , function (err, n) {
  	  console.log('model:found note, calling back...');
  	  dbCallback(cb, err, n, function (n) {
  	    console.log('model:db callback complete');
  	    n.remove();
  	  });
  	});
  },
  getByRemoteId: function (id, cb) {
    var q = (id) ? { rid: parseInt(id) } : {};
  	db.Network.find(q, cb);
  }
};

exports.NotePeer = {
  
  get: function (crit, cb) {
    console.log(crit);
    if(typeof crit == 'undefined') throw ("Criteria cannot be undefined!");
  	db.Note.find(crit).sort('-_id').sort('-crstamp').limit(20).exec(cb);
  },
  updateFlagCount: function (id, cb) {
    db.Note.update({ _id: id }, {$inc:{flags:1}}, cb);
  },
  getActivity: function (crit, cb) { // meant for admin use only
    if(typeof crit == 'undefined') throw ("Criteria cannot be undefined!");
    
  	db.Note.find(crit).sort('-_id').limit(20).sort('-crstamp').exec(cb);
  },
  removeOne: function (id, cb) {
  	db.Note.findById( id , function (err, n) {
  	  dbCallback(cb, err, n, function (n) {
  	    n.remove();
  	  });
  	});
  },
  getOne: function (id, cb) {
    db.Note.findById(id, cb);
  },

  storeNew: function (note, cb) {
  	var q = { name: db.Note.gid };
    db.Group.update( q, { $inc: { notes: 1 } }, { upsert:true }, function(err){
      if(err) {
        (err, null);
      } else {
        note.crstamp = (new Date()).getTime();
      	var post = new db.Note(note);
      	post.save(cb);
      }
    }); // upsert=true: insert if not there

  }
};

exports.ResponsePeer = {

  get: function (crit, cb) {

    if(typeof crit == 'undefined') throw ("Criteria cannot be undefined!");
  	db.Response.find(crit).sort('-crstamp').limit(20).exec(cb);
  },
  storeNew: function (resp, cb) {

  	resp.crstamp = (new Date()).getTime();
  	var response = new db.Response(resp);
  	response.save(cb);
  	
  }
};

exports.FlyleafPeer = {

  getOne: function (id, cb) {
    db.Flyleaf.findById(id, cb);
  }

};



exports.ThumbprintPeer = {

  findOneByParHash: function (par_hash, cb) {
    
  	db.Thumbprint.findOne({
  	  par_hash: par_hash
  	}, function (err,doc) {
  	  console.log('back from db');
  	  console.log(err);
  	  console.log(doc);
  	  if(!doc && !err) {
  	    console.log('not found');
  	  }
  	  cb(err,doc);
  	});
  },
  /* Temporary convenience -- when called from note create, this allows anyone to modify a publisher's content */
  storeNew: function (crit, cb) {
  	db.Thumbprint.update({ par_hash: crit.par_hash }, crit, {upsert:true}, function (err, d) {
  	  if(err) return cb(err);
  	  cb(null,d);
  	});
  }
};


exports.ImagePeer = {
  getOne: function (name, cb) {
  	db.Image.findOne({name:name}, cb);
  },
  storeNew: function (o, cb) {
  	var img = new db.Image(o);
  	img.save(cb);
  }
};

exports.GroupPeer = {

  getOne: function (id, cb) {

    var q = { name:id };
    var g = { $inc: { queries: 1 } };
    
    db.Group.findOne(q, function (err, doc) {
      if(!doc) {
        db.Group.create({
         name:id.toLowerCase(),
         queries:0,
         notes:0 
        }, cb);
      } else {
        db.Group.update(q, g, function (e,d) {
          cb(err,doc);          
        });
      }
    });
    
  },
  getIdList: function (crit, cb) {
    
    db.Note.find(crit).select('gid').distinct('gid', function (e,d) {
      if(e) cb(e);
      cb(null,d);
    });
    
  }
  
  
};

exports.UserPeer = {
  
  getOne: function (id, cb) {
    var q = { name:id };
    var g = { $inc: { queries: 1 } };
    db.User.update(q, g, true, false);
    db.User.findOne(q, cb);
  },
  
  storeNew: function (user, cb) {
  
  	var q = {uid:db.User.uid,udom:db.User.udom};
  	db.User.update(q, user, {upsert:true}, function () {
  	  db.User.update(q, {$inc:{logins:1}},{upsert:true},cb);
  	});
  
  },

  findByDomainAndId: function (udom, id, cb) {
  
    var q = {uid:id,udom:udom};

    console.log(q);

    db.User.findOne(q, function (err, user) {


      console.log('returned from db');

      if(err) {
        console.log(err);
        return cb(err);
      }
      console.log(user);

      return cb(null,user);


    });
  
  },

  createWithFB: function (fbUserMeta, accessToken, expires, callback) {
    var expiresDate = new Date;
    expiresDate.setSeconds(expiresDate.getSeconds() + expires);

    var params =  {
      fb: {
          id: fbUserMeta.id
        , accessToken: accessToken
        , expires: expiresDate
        , name: {
              full: fbUserMeta.name
            , first: fbUserMeta.first_name
            , last: fbUserMeta.last_name
          }
        , alias: fbUserMeta.link.match(/^http:\/\/www.facebook\.com\/(.+)/)[1]
        , gender: fbUserMeta.gender
        , email: fbUserMeta.email
        , timezone: fbUserMeta.timezone
        , locale: fbUserMeta.locale
        , verified: fbUserMeta.verified
        , updatedTime: fbUserMeta.updated_time
      }
    };

    // TODO Only do this if password module is enabled
    //      Currently, this is not a valid way to check for enabled
    /*
    if (everyauth.password)
      params[everyauth.password.loginKey()] = "fb:" + fbUserMeta.id; // Hack because of way mongodb treate unique indexes
    */
    this.create(params, callback);
  },

  createWithTwitter: function (twitUserMeta, accessToken, accessTokenSecret, callback) {
      var params = {
        twit: {
            accessToken: accessToken
          , accessTokenSecret: accessTokenSecret
          , id: twitUserMeta.id
          , name: twitUserMeta.name
          , screenName: twitUserMeta.screen_name
          , location: twitUserMeta.location
          , description: twitUserMeta.description
          , profileImageUrl: twitUserMeta.profile_image_url
          , url: twitUserMeta.url
          , protected: twitUserMeta.protected
          , followersCount: twitUserMeta.followers_count
          , profileBackgroundColor: twitUserMeta.profile_background_color
          , profileTextColor: twitUserMeta.profile_text_color
          , profileLinkColor: twitUserMeta.profile_link_color
          , profileSidebarFillColor: twitUserMeta.profile_sidebar_fill_color
          , profileSiderbarBorderColor: twitUserMeta.profile_sidebar_border_color
          , friendsCount: twitUserMeta.friends_count
          , createdAt: twitUserMeta.created_at
          , favouritesCount: twitUserMeta.favourites_count
          , utcOffset: twitUserMeta.utc_offset
          , timeZone: twitUserMeta.time_zone
          , profileBackgroundImageUrl: twitUserMeta.profile_background_image_url
          , profileBackgroundTile: twitUserMeta.profile_background_tile
          , profileUseBackgroundImage: twitUserMeta.profile_use_background_image
          , geoEnabled: twitUserMeta.geo_enabled
          , verified: twitUserMeta.verified
          , statusesCount: twitUserMeta.statuses_count
          , lang: twitUserMeta.lang
          , contributorsEnabled: twitUserMeta.contributors_enabled
        }
      };

      // TODO Only do this if password module is enabled
      //      Currently, this is not a valid way to check for enabled
      /*if (everyauth.password)
        params[everyauth.password.loginKey()] = "twit:" + twitUserMeta.id; // Hack because of way mongodb treate unique indexes
      */
      this.create(params, callback);
    },


    createWithGoogleOAuth: function (googleUser, accessToken, accessTokenExtra, callback) {
      var expiresDate = new Date;
      expiresDate.setSeconds(expiresDate.getSeconds() + accessTokenExtra.expires_in);
      
      var params = {
        google: {
            email: googleUser.id
          , expires: expiresDate
          , accessToken: accessToken
          , refreshToken: accessTokenExtra.refresh_token
        }
      };

      this.create(params, callback);
    },


    createWithTumblr: function (tumblrUser, accessToken, accessTokenSecret, callback) {
      var expiresDate = new Date;
      expiresDate.setSeconds(expiresDate.getSeconds() + accessTokenExtra.expires_in);
      
      console.log(tumblrUser.user);

      var params = {
        tumblr: {
            id: tumblrUser.user.name
          , accessToken: accessToken
          , accessTokenSecret: accessTokenSecret
          , verifier: tumblrUser.verifier
        }
      };

      this.create(params, callback);
    }



};


