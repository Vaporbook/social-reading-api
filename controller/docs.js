var swagger = require('../swagger.js');

exports.SESSION_STATUS_DOC = {
    "method" : "GET",
    "description" : "Get a user's OAuth authentication status.",
    "path" : "/v1/{net_id}/auth/status",
    "notes" : "Requires a net_id, uses OAuth config for network",
    "summary" : "Get user authentication status",
    "params" : new Array(
      swagger.pathParam("net_id", "network ID user is associated with", "string")),
    "outputModel" : {
      "name" : "authstatus",
      "responseClass" : {
        "properties" : {
          "authed" : {
            "type" : "boolean",
            "description" : "Whether user is authenticated or not"
          },
          "user" : {
            "type" : "object",
            "description" : "A user object"
          }
        },
        "id" : "auth"
      }
    },
    "errorResponses" : new Array(
      swagger.error(400, "invalid id"),
      swagger.error(404, "Network not found")),
    "nickname" : "authstatus"
  };
exports.LOGIN_TWITTER_DOC = {
     "method" : "GET",
     "description" : "Direct a user to authenticate via Twitter OAuth.",
     "path" : "/v1/{net_id}/auth/login/twitter",
     "notes" : "Direct a user to authenticate via Twitter OAuth.",
     "summary" : "Direct a user to authenticate via Twitter OAuth.",
     "params" : new Array(
       swagger.pathParam("net_id", "network ID user is associated with", "string")),
     "outputModel" : {
       "name" : "authlogin",
       "responseClass" : {
         "properties" : {
           "authed" : {
             "type" : "boolean",
             "description" : "Whether user is authenticated or not"
           },
           "user" : {
             "type" : "object",
             "description" : "A user object"
           }
         },
         "id" : "login"
       }
     },
     "errorResponses" : new Array(
       swagger.error(400, "invalid id"),
       swagger.error(404, "Network not found")),
     "nickname" : "authlogin"
   };
exports.LOGIN_FACEBOOK_DOC = {
    "method" : "GET",
    "description" : "Direct a user to authenticate via Facebook OAuth.",
    "path" : "/v1/{net_id}/auth/login/facebook",
    "notes" : "Direct a user to authenticate via Facebook OAuth.",
    "summary" : "Direct a user to authenticate via Facebook OAuth.",
    "params" : new Array(
      swagger.pathParam("net_id", "network ID user is associated with", "string")),
    "outputModel" : {
      "name" : "authlogin",
      "responseClass" : {
        "properties" : {
          "authed" : {
            "type" : "boolean",
            "description" : "Whether user is authenticated or not"
          },
          "user" : {
            "type" : "object",
            "description" : "A user object"
          }
        },
        "id" : "login"
      }
    },
    "errorResponses" : new Array(
      swagger.error(400, "invalid id"),
      swagger.error(404, "Network not found")),
    "nickname" : "authlogin"
  };
exports.LOGIN_GOOGLE_DOC = {
    "method" : "GET",
    "description" : "Direct a user to authenticate via Google OAuth.",
    "path" : "/v1/{net_id}/auth/login/google",
    "notes" : "Direct a user to authenticate via Facebook OAuth.",
    "summary" : "Direct a user to authenticate via Facebook OAuth.",
    "params" : new Array(
      swagger.pathParam("net_id", "network ID user is associated with", "string")),
    "outputModel" : {
      "name" : "authlogin",
      "responseClass" : {
        "properties" : {
          "authed" : {
            "type" : "boolean",
            "description" : "Whether user is authenticated or not"
          },
          "user" : {
            "type" : "object",
            "description" : "A user object"
          }
        },
        "id" : "login"
      }
    },
    "errorResponses" : new Array(
      swagger.error(400, "invalid id"),
      swagger.error(404, "Network not found")),
    "nickname" : "authlogin"
  };

exports.LOGOUT_DOC = {
     "method" : "POST",
     "description" : "Clear a user's session and log them out.",
     "path" : "/v1/{net_id}/auth/logout",
     "notes" : "Clear a user's OAuth tokens and log them out.",
     "summary" : "Clear a user's OAuth tokens and log them out.",
     "params" : new Array(
       swagger.pathParam("net_id", "network ID user is associated with", "string")),
     "outputModel" : {
       "name" : "authlogout",
       "responseClass" : {
         "properties" : {
    
         },
         "id" : "logout"
       }
     },
     "errorResponses" : new Array(
       swagger.error(400, "invalid id"),
       swagger.error(404, "Network not found")),
     "nickname" : "authlogout"
   };

exports.GROUPS_LIST_DOC = {
    "method" : "GET",
    "description" : "Get a list of active groups. If the network is private, it will be specific to it. If a paragraph hash is specified, it will be specific to that paragraph.",
    "path" : "/v1/{net_id}/groups?par_hash={par_hash}",
    "notes" : "Get a list of active groups. If the network is private, it will be specific to it. If a paragraph hash is specified, it will be specific to that paragraph.",
    "summary" : "Get a list of active groups. If the network is private, it will be specific to it. If a paragraph hash is specified, it will be specific to that paragraph.",
    "params" : new Array(
      swagger.pathParam("net_id", "network ID user is associated with", "string"),
      swagger.queryParam("par_hash", "ID hash for context paragraph", "string")
      ),
    "outputModel" : {
      "name" : "groupslist",
      "responseClass" : {
        "properties" : {

        },
        "id" : "groupslist"
      }
    },
    "errorResponses" : [],
    "nickname" : "groupslist"
  };


exports.NOTES_LIST_DOC = {
     "method" : "GET",
     "description" : "Get a list of notes for the given group.",
     "path" : "/v1/{net_id}/{group_name}/notes?par_hash={par_hash}",
     "notes" : "Get a listing of note objects attached to a text fragment, for the given group.",
     "summary" : "Get a listing of note objects attached to a text fragment, for the given group.",
     "params" : new Array(
       swagger.pathParam("net_id", "network ID user is associated with", "string"),
       swagger.pathParam("group_name", "Group name content is associated with", "string"),
       swagger.queryParam("par_hash", "ID hash for context paragraph", "string"),
       swagger.queryParam("before", "Only get posts older than this Unix timestamp", "string", false)
       ),
     "outputModel" : {
       "name" : "notes",
       "responseClass" : {
         "properties" : {
           
         },
         "id" : "notes"
       }
     },
     "errorResponses" : [],
     "nickname" : "noteslist"
   };

exports.NOTE_FLAG_DOC = {
    "method" : "POST",
    "description" : "Increment a note's flag counter, to record a new abuse/review count. Privileged method, requires app authentication. Be mindful of security when using this, see the notes about key/secret authentication for the note creation method.",
    "path" : "/v1/{net_id}/notes/{note_id}/flag",
    "notes" : "",
    "summary" : "Increment the abuse/review flag counter by one.",
    "params" : new Array(
         swagger.pathParam("net_id", "network ID user is associated with", "string"),
         swagger.pathParam("note_id", "note (by _id property) to get", "string")
      ),
     "outputModel" : {
       "name" : "auth",
       "responseClass" : {
         "properties" : {

         },
         "id" : "auth"
       }
     },
     "errorResponses" : new Array(
       swagger.error(400, "invalid id"),
       swagger.error(404, "Network not found")),
     "nickname" : "noteflag"
};
    
        
exports.NOTES_CREATE_DOC = {
     "method" : "POST",
     "description" : "Post a new note to the user's group and network.",
     "path" : "/v1/{net_id}/{group_name}/notes/create",
     "notes" : "Requires a net_id, uses OAuth config or App Authentication for network. For OAuth, a valid user session is required on the ReadSocial server, via one of the supported auth providers. For App Auth, valid Basic Authentication credentials are required in the request (network owners, this is your API key and secret.). Remember that while all API traffic is encrypted via SSL, using Basic Auth via Ajax is inherently insecure. Instead, pass the body data to a proxy endpoint on your own server first, then call this endpoint from the back channel.",
     "summary" : "Adds a note created by the user's network.",
     "params" : [
         swagger.pathParam("net_id", "network ID user is associated with", "string"),
         swagger.pathParam("group_name", "Group name content is associated with", "string"),
         {
           "name" : "par_hash",
           "description" : "ID hash for context paragraph.",
           "dataType" : "string",
           "required" : true,
           "paramType" : "body"
         },
         {
           "name" : "par_body",
           "description" : "Body of containing (identified) paragraph. Useful when tracking changes (using the vec_id property below) across a single paragraph, as it will store a snapshot of the paragraph's body text. Can be HTML or plain text.",
           "dataType" : "string",
           "required" : true,
           "paramType" : "body"
         },
         {
           "name" : "sel",
           "description" : "Serialized text selection string, or DOM range locator",
           "dataType" : "string",
           "required" : true,
           "paramType" : "body"
         },
         {
           "name" : "mtype",
           "description" : "A mime or media type hint. Can be one of 'text', 'image' or 'link'. May be used to cue different display modes for the note_* data values.",
           "dataType" : "string",
           "required" : false,
            "paramType" : "body"
         },         
         {
           "name" : "note_body",
           "description" : "Note body content. Cannot contain HTML or other markup, or scripts.",
           "dataType" : "string",
           "required" : false,
           "paramType" : "body"
         },
         {
           "name" : "note_link",
           "description" : "A URL which will be the target of a link attachment. The note_body value may be used as the linked text.",
           "dataType" : "string",
           "required" : false,
           "paramType" : "body"
         },
         {
           "name" : "note_img",
           "description" : "A data: URI (base64-encoded data) for a gif, png, or jpeg image. Please see the data: URI scheme specification for exact format. Once submitted, this URI will be replaced with a URL to the final image resource. The URL for the final resource is relative. In order to de-reference it, see the documentation for the /v1/{net_id}/images call.",
           "dataType" : "string",
           "required" : false,
           "paramType" : "body"
         },    
         {
           "name" : "hi_raw",
           "description" : "Raw version of paragraph highlight",
           "dataType" : "string",
           "required" : false,
           "paramType" : "body"
         },
         {
           "name" : "hi_nrml",
           "description" : "Normalized version of paragraph highlight",
           "dataType" : "string",
           "required" : false,
           "paramType" : "body"
         },
         {
           "name" : "hi_hash",
           "description" : "ID hash for paragraph highlight",
           "dataType" : "string",
           "required" : false,
           "paramType" : "body"
         },
         {
           "name" : "doc_url",
           "description" : "URL of the document represented. Can refer to an actual retrievable resource, data source, or be used as an abstract identifier.",
           "dataType" : "string",
           "required" : false,
           "paramType" : "body"
         },
         {
           "name" : "doc_id",
           "description" : "Arbitrary identifier for the document. This can be used as a way of grouping paragraphs and attachments (as well as paragraph change sets) under a single doc, but is not necessary.",
           "dataType" : "string",
           "required" : false,
           "paramType" : "body"
         },
         {
           "name" : "flags",
           "description" : "Counter of flags for abuse or review. Any flag action will increment this.",
           "dataType" : "number",
           "required" : false,
           "paramType" : "body"
         },
         {
           "name" : "vec_id",
           "description" : "Vector id, aka change set id. For versioning, the hash of the canonical paragraph in this paragraph's vector chain. The vector chain is a graph of changes and attachments on a given canonical start paragraph, identified by the hash stored in the vec_id. To retrieve a vector chain, query all notes where {vec_id}={par_hash}. The note with no vec_id set is always the canonical paragraph.",
           "dataType" : "string",
           "required" : false,
           "paramType" : "body"
         },
         {
            "name" : "metadata",
            "description" : "JSON serialization of arbitrary metadata, maximum of 256 bytes long",
            "dataType" : "string",
            "required" : false,
            "paramType" : "body"
          }
         
       ],
     "outputModel" : {
       "name" : "auth",
       "responseClass" : {
         "properties" : {
           "authed" : {
             "type" : "boolean",
             "description" : "Whether user is authenticated or not"
           },
           "user" : {
             "type" : "object",
             "description" : "A user object"
           }
         },
         "id" : "auth"
       }
     },
     "errorResponses" : new Array(
       swagger.error(400, "invalid id"),
       swagger.error(404, "Network not found")),
     "nickname" : "notescreate"
   };

exports.IMAGE_DOC = {
   "method" : "GET",
   "description" : "Get an image stored for a network.",
   "path" : "/v1/{net_id}/images/{name}",
   "notes" : "Requires a net_id",
   "summary" : "Get image file. The name is prefixed with one of 'orig' 'small' or 'med', where the prefix indicates the representation to retrieve.",
   "params" : new Array(
     swagger.pathParam("net_id", "network ID user is associated with", "string"),
     swagger.pathParam("name", "name of image to get", "string")),
   "outputModel" : {
      "name" : "image",
      "responseClass" : {
        "properties" : {
          "authed" : {
            "type" : "boolean",
            "description" : "Whether user is authenticated or not"
          }
        },
        "id" : "auth"
      }
    },
   "errorResponses" : new Array(
     swagger.error(400, "invalid id"),
     swagger.error(404, "Network not found")),
   "nickname" : "imageget"
};

exports.NOTE_DETAIL_DOC = {
     "method" : "GET",
     "description" : "Get more details for a specific note.",
     "path" : "/v1/{net_id}/notes/{note_id}",
     "notes" : "Requires a net_id, uses OAuth config for network",
     "summary" : "Get note details",
     "params" : new Array(
       swagger.pathParam("net_id", "network ID user is associated with", "string"),
       swagger.pathParam("note_id", "note (by _id property) to get", "string")),
     "outputModel" : {
       "name" : "auth",
       "responseClass" : {
         "properties" : {
           "authed" : {
             "type" : "boolean",
             "description" : "Whether user is authenticated or not"
           },
           "user" : {
             "type" : "object",
             "description" : "A user object"
           }
         },
         "id" : "auth"
       }
     },
     "errorResponses" : new Array(
       swagger.error(400, "invalid id"),
       swagger.error(404, "Network not found")),
     "nickname" : "notedetail"
   };

exports.NOTE_RESPONSES_DOC = {
     "method" : "GET",
     "description" : "Get responses for the note.",
     "path" : "/v1/{net_id}/notes/{note_id}/responses",
     "notes" : "Requires a net_id, uses OAuth config for network",
     "summary" : "Get responses.",
     "params" : new Array(
         swagger.pathParam("net_id", "network ID user is associated with", "string"),
         swagger.pathParam("note_id", "note (by _id property) to get", "string"),
         swagger.queryParam("before", "Only get posts older than this Unix timestamp", "string", false)
      ),
     "outputModel" : {
       "name" : "auth",
       "responseClass" : {
         "properties" : {
           "authed" : {
             "type" : "boolean",
             "description" : "Whether user is authenticated or not"
           },
           "user" : {
             "type" : "object",
             "description" : "A user object"
           }
         },
         "id" : "auth"
       }
     },
     "errorResponses" : new Array(
       swagger.error(400, "invalid id"),
       swagger.error(404, "Network not found")),
     "nickname" : "noteresponses"
   };

exports.NOTE_RESPONSES_CREATE_DOC = {
     "method" : "POST",
     "description" : "Create a response to this note.",
     "path" : "/v1/{net_id}/notes/{note_id}/responses/create",
     "notes" : "Requires a net_id, uses OAuth config or App Auth for network. See notes on the note/create doc above for important usage information.",
     "summary" : "Create and attach a response to the note.",
     "params" : new Array(
       swagger.pathParam("net_id", "network ID user is associated with", "string"),
       swagger.pathParam("note_id", "note (by _id property) to get", "string"),
       swagger.postParam("body of response content", "resp_body", "string")
      ),
     "outputModel" : {
       "name" : "auth",
       "responseClass" : {
         "properties" : {
           "authed" : {
             "type" : "boolean",
             "description" : "Whether user is authenticated or not"
           },
           "user" : {
             "type" : "object",
             "description" : "A user object"
           }
         },
         "id" : "auth"
       }
     },
     "errorResponses" : new Array(
       swagger.error(400, "invalid id"),
       swagger.error(404, "Network not found")),
     "nickname" : "noteresponsecreate"
   };

exports.NOTES_COUNT_DOC = {
    "method" : "GET",
    "description" : "Count notes in a group, for a particular paragraph hash.",
    "path" :  "/v1/{net_id}/{group_name}/notes?par_hash={par_hash}",
    "notes" : "Requires a net_id",
    "summary" : "Count the notes on a paragraph.",
    "params" : new Array(
      swagger.pathParam("net_id", "network ID user is associated with", "string"),
      swagger.pathParam("group_name", "name of group", "string"),
      swagger.queryParam("par_hash", "Paragraph hash to count for", "string", true)),
    "outputModel" : {
      "name" : "count",
      "responseClass" : {
        "properties" : {
          "count" : {
            "type" : "integer",
            "description" : "Count result"
          }
        }
      }
    },
    "errorResponses" : new Array(
      swagger.error(400, "invalid id"),
      swagger.error(404, "Network not found")),
    "nickname" : "notecount"
  };
  
exports.NOTE_RESPONSES_COUNT_DOC = {
    "method" : "GET",
    "description" : "Count all responses to a note, by note_id.",
    "path" :  "/v1/{net_id}/notes/{note_id}/responses/count",
    "notes" : "Requires a net_id",
    "summary" : "Count the responses to a note.",
    "params" : new Array(
      swagger.pathParam("net_id", "network ID user is associated with", "string"),
      swagger.pathParam("note_id", "note (by _id property) to count responses on", "string")),
    "outputModel" : {
      "name" : "count",
      "responseClass" : {
        "properties" : {
          "count" : {
            "type" : "integer",
            "description" : "Count result"
          }
        }
      }
    },
    "errorResponses" : new Array(
      swagger.error(400, "invalid id"),
      swagger.error(404, "Network not found")),
    "nickname" : "noteresponsecount"
  };