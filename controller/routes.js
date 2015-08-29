
exports.TESTURL = '/v1/:net_id([0-9]+)/auth/secret';

exports.SESSIONFRAME = '/v1/:net_id([0-9]+)/auth/sessionframe';
exports.LOGIN = '/v1/:net_id([0-9]+)/auth/login';
exports.LOGIN_TWITTER = '/v1/:net_id([0-9]+)/auth/login/twitter';
exports.LOGIN_FACEBOOK = '/v1/:net_id([0-9]+)/auth/login/facebook';
exports.LOGIN_GOOGLE = '/v1/:net_id([0-9]+)/auth/login/google';
exports.LOGIN_TUMBLR = '/v1/:net_id([0-9]+)/auth/login/tumblr';
exports.LOGOUT = '/v1/:net_id([0-9]+)/auth/logout';
exports.SESSION_STATUS = '/v1/:net_id([0-9]+)/auth/status';
exports.VAPORBOOK = '/auth/complete';
exports.WORDPRESS = '/v1/:net_id([0-9]+)/auth/wordpress';


exports.THUMBPRINT_VIEW = '/v1/:net_id([0-9]+)/:group_id/thumbprints/:par_hash';


exports.NOTES_LIST = '/v1/:net_id([0-9]+)/:group_name/notes';
exports.NOTES_COUNT = '/v1/:net_id([0-9]+)/:group_name/notes/count';
exports.NOTES_CREATE = '/v1/:net_id([0-9]+)/:group_name/notes/create';
exports.NOTE_DETAIL = '/v1/:net_id/notes/:note_id';
exports.NOTE_FLAG = '/v1/:net_id/notes/:note_id/flag';
exports.NOTE_RESPONSES = '/v1/:net_id/notes/:note_id/responses';
exports.NOTE_RESPONSES_COUNT = '/v1/:net_id/notes/:note_id/responses/count';
exports.NOTE_RESPONSES_CREATE = '/v1/:net_id/notes/:note_id/responses/create';

exports.IMAGE = '/v1/:net_id/images/:filename';
// list of groups on a net
exports.GROUPS_LIST = '/v1/:net_id/groups';

// readum legacy
exports.READUM_UPDATE = '/main/readumUpdate';

// app authed methods (SSO)

exports.NETWORK_GROUPS = '/v1/network/groups';
exports.NETWORK_GROUPS_COUNT = '/v1/network/groups/count';
exports.NETWORK_GROUP_NOTES = '/v1/network/:group_name/notes';
exports.NETWORK_GROUP_NOTES_COUNT = '/v1/network/:group_name/notes/count';
exports.NETWORK_GROUP_NOTES_UPDATE = '/v1/network/:group_name/notes/create';
exports.NETWORK_NOTE_COUNT = '/v1/network/notes/count';
exports.NETWORK_NOTE_DETAIL = '/v1/network/notes/:note_id';
exports.NETWORK_NOTE_RESPONSES = '/v1/network/notes/:note_id/responses';
exports.NETWORK_NOTE_RESPONSES_COUNT = '/v1/network/notes/:note_id/responses/count';
exports.NETWORK_NOTE_DELETE = '/v1/network/notes/:note_id/delete';
exports.NETWORK_NOTE_UPDATE = '/v1/network/notes/:note_id/update';
exports.NETWORK_GROUPS_DIST = '/v1/network/groups/distribution';
exports.NETWORK_ACTIVITY = '/v1/network/activity';

// sso demo

exports.SSO_NOTE_CREATE = '/sso/note/create';
exports.SSO_RESPONSE_CREATE = '/sso/response/create';

// super admin

exports.SUPERADMIN_CREATE_NETWORK = '/superadmin/network/create';
exports.SUPERADMIN_GET_NETWORKS = '/superadmin/networks/get';
exports.SUPERADMIN_NETWORK_DETAILS = '/superadmin/network/details';
exports.SUPERADMIN_NETWORK_GROUPS = '/superadmin/network/groups';
exports.SUPERADMIN_NETWORK_ACTIVITY = '/superadmin/network/activity';
exports.SUPERADMIN_NETWORK_DELETE = '/superadmin/network/delete';
exports.SUPERADMIN_NETWORK_UPDATE = '/superadmin/network/update';
exports.SUPERADMIN_NETWORK_REKEY = '/superadmin/network/rekey';
exports.SUPERADMIN_NOTE_DELETE = '/superadmin/note/delete';
exports.SUPERADMIN_NETWORK_DIST = '/superadmin/network/distribution';

// undocumented API methods

exports.ADMIN_NETWORK_USAGE = '/admin/network/usage';
exports.ADMIN_NETWORK_DETAILS = '/admin/network/details';
exports.ADMIN_UPDATE_NETWORK = '/admin/network/update';
exports.ADMIN_DELETE_NETWORK = '/admin/network/delete';
exports.ADMIN_NETWORK_REKEY = '/admin/network/rekey';



exports.UPLOAD_VIEW = '/readsocial/flyleaf';
exports.FLYLEAF_CREATE = '/readsocial/flyleaf/create';
exports.FLYLEAF_VIEW = '/readsocial/flyleaf/:id/join';
exports.FLYLEAF_HELP = '/readsocial/flyleaf/about';
