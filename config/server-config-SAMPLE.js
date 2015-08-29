
exports.dev={
    host:'localhost',
    port:8124,
    uid: 'www',
    gid: 'www',
    db:{
      host:'localhost',
      port:27017,
      name:'thumbprints-dev'
    },
    facebook: {
            everyauth: {
                myHostname: 'http://localhost:8124',
                appId: process.env.THUMBPRINTS_FACEBOOK_APPID,
                appSecret: process.env.THUMBPRINTS_FACEBOOK_APPSECRET,
                redirectPath: '/auth/complete'
            }
    },
    twitter: {
            everyauth: {
                myHostname: 'http://localhost:8124',
                consumerKey: process.env.THUMBPRINTS_TWITTER_APPKEY,
                consumerSecret: process.env.THUMBPRINTS_TWITTER_APPSECRET,
                redirectPath: '/auth/complete'
            }
    },
    google: {
           everyauth: {
               myHostname: 'http://localhost:8124',
               appId: process.env.THUMBPRINTS_GOOGLE_APPID,
               appSecret: process.env.THUMBPRINTS_GOOGLE_APPSECRET,
               redirectPath: '/auth/complete',
               scope: 'https://www.googleapis.com/auth/userinfo.profile'
           }
    }
}

