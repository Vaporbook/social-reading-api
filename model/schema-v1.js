var mongoose = require('mongoose');
  
exports.NetworkSchema = {
  name:String,
  rid:{ type:String, index: true },
  is_private:Boolean,
  company:String,
  admin_key: { type:String, unique: true },
  admin_secret: String,
  oa_dom: String,
  oa_url: String,
  oa_turl: String,
  oa_aurl: String,
  oa_key: String,
  oa_sec: String,
  oa_ver: String,
  oa_cb: String,
  oa_alg: String,
  crstamp:Date,
  reads:Number,
  writes:Number
};

exports.FlyleafSchema = {

  gid: { type: String, index: true },
  body: String,
  md5: { type: String, unique: true, index: true },
  crstamp: { type: Date }

};

exports.NoteSchema = {
  uid: { type: String, index:true },
  uname: { type: String, lowercase: true },
  uimg: String,
  udom: { type: String, lowercase: true },
  rid: { type: Number, index:true },
  pvt: Number,
  gid: { type: String, index: true },
  mtype:  { type: String, lowercase: true },
  body: String,
  link: String,
  img: String,
  img_small: String,
  agent: String,
  sel: String,
  lang: String,
  hi_nrml: String,
  hi_hash: String,
  hi_raw: String,
  doc_url: String,
  doc_id: String,
  flags: Number,
  vec_id: String,
  metadata: String,
  par_hash: { type:String, index: true },
  par_body: String,
  crstamp: { type: Number }
};

exports.ResponseSchema = {
  uid: { type: String, index:true },
  uname: { type: String, lowercase: true },
  uimg: String,
  udom: { type: String, lowercase: true },
  note_id: { type:mongoose.Schema.ObjectId, index:true },
  body: String,
  crstamp: { type: Number }
};

exports.GroupSchema = {
 name: { type: String, lowercase: true },
 notes: Number,
 queries: Number
};

exports.ImageSchema = {
 name: { type: String, unique: true },
 type: String,
 data: Buffer
};

exports.UserSchema = {
  uid: { type: String, index:true },
  udom: { type: String, lowercase: true, index:true },
  rid: { type: Number, index:true },
  uname: { type: String, lowercase: true, index:true },
  uimg:String,
  oat:String,
  oats:String
};

exports.fb = {
      id: String
    , accessToken: String
    , expires: Date
    , name: {
          full: String
        , first: String
        , last: String
      }
    , fbAlias: String
    , gender: String
    , email: String
//      , email: Email // TODO Try to add Email type back in
                     //      Broken because of require behavior
    , timezone: String
    , locale: String
    , verified: Boolean
    , updatedTime: String
    , phone: String
};

exports.twit = {
      accessToken: String
    , accessTokenSecret: String
    , id: String
    , name: String
    , screenName: String
    , location: String
    , description: String
    , profileImageUrl: String
    , url: String // TODO Convert to URL from mongoose-types
    , 'protected': Boolean
    , followersCount: Number
    , profileBackgroundColor: String
    , profileTextColor: String
    , profileLinkColor: String
    , profileSidebarFillColor: String
    , profileSidebarBorderColor: String
    , friendsCount: Number
    , createdAt: Date
    , favouritesCount: Number
    , utcOffset: Number
    , timeZone: String
    , profileBackgroundImageUrl: String
    , profileBackgroundTile: Boolean
    , profileUseBackgroundImage: Boolean
//    , notifications: Boolean
    , geoEnabled: Boolean
    , verified: Boolean
//    , following: Boolean
    , statusesCount: Number
    , lang: String
    , contributorsEnabled: Boolean
//    , status: StatusSchema // only if public or you follow them + protected
}

exports.google = {
      accessToken: String
    , expires: Date
    , refreshToken: String 
    , email: String
}

exports.tumblr = {
      id: String
    , accessToken: String
    , accessTokenSecret: String
    , email: String
}



exports.ThumbprintSchema = {
  par_hash: { type:String, index: true, unique:true, required:true },
  par_body: String
}