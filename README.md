


# thumbprints


To set up a dev environment:

```
cp config/server-config-SAMPLE.js config/server-config.js
export THUMBPRINTS_ENV=dev
```


To get your own network-level (app) authentication set up:

```
export THUMBPRINTS_OAUTH_KEY=[YOUR OAUTH KEY]
export THUMBPRINTS_OAUTH_SECRET=[YOUR OAUTH SECRET]
```



To get Facebook, Twitter and Google auth set up for users of your app:

```
export THUMBPRINTS_FACEBOOK_APPID=[YOUR_APP_ID]
export THUMBPRINTS_FACEBOOK_APPSECRET=[YOUR_APP_SECRET]
export THUMBPRINTS_TWITTER_APPKEY=[YOUR_APP_KEY]
export THUMBPRINTS_TWITTER_APPSECRET=[YOUR_APP_SECRET]
export THUMBPRINTS_GOOGLE_APPID=[YOUR_APP_ID]
export THUMBPRINTS_GOOGLE_APPSECRET=[YOUR_APP_SECRET]
```

For super admin endpoint auth (grants super admin endpoints R/W access):

```
export THUMBPRINTS_ADMIN_KEY=[basic auth username]
export THUMBPRINTS_ADMIN_SECRET=[basic auth password]
```






