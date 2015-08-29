


if(typeof ReadSocial === 'undefined') {
  ReadSocial = {
  }
}

if(typeof ReadSocial.brigder === 'undefined') {
  ReadSocial.bridger = {};	
}


ReadSocial.bridger.popAuthWindow = function (rid, provider) {
  var authwindow;
  authwindow = window.open(window.location.protocol + "//" + window.location.host+'/v1/'+rid+'/auth/login/'+provider,'ReadSocial Authorization', 'height=500,width=400,resizable=no,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no');
	if(typeof authwindow=='undefined') throw "Pop up windows must be enabled.";
	authwindow.focus();
  return authwindow;
}



var streams = {};

var conf, rid, l, payload, source, authwindow, proxy;

function handleLoad()
{

  	conf = {};
  	payload = document.location.search.replace(/^\?/,'').split(/(&amp;|&)/);
  	for(var p=0; p<payload.length; p++) {
  		var keyval = payload[p].split('=');
  		conf[keyval[0]]=unescape(keyval[1]);
  	}
  	if(typeof conf.rid==='undefined') {
  		conf.rid = 8;
  	}
  	source = conf.s;
  	rid = conf.rid;
    proxy = new Porthole.WindowProxy(source);
    proxy.addEventListener(_handleIncoming);
  	logit('ReadSocial XD Coupling Complete!');
  	logit(conf.rid);
  	
  	_postObject({
  		op:'ready',
  		d:{
  			url:conf.rid,
  			m:'Callback from XD, getting XD auth status'
  		}
  	});
  	
  	if(typeof _RS_AUTH_STATUS !== 'undefined') {

	  	callback(_RS_AUTH_STATUS);
  	}


}

function _handleIncoming(evt)
{

	//logit('Incoming proxy request from host window...');

	var o = evt.data;
	if(!typeof o.op) {
		logit('Error, op is not defined.');		
	}
  	logit('op is '+o.op); 
	switch(o.op) {

		case 'dom':

			$(o.d.sel).html(o.d.html);
			break;

		case 'stream':
			/* remote ajax stream operation */
			_defineStream(o.opid);
			var args = 'jqXHR, textStatus';
			var f = _getCompleter(args,o.cbid);
			o.d.complete = eval(f);
			streams[o.opid].jqTransport = o.d;
			logit('Awaiting stream for:'+o.d.url);
			break;

		case 'streamhaul':

			streams[o.opid].chunks[o.chunkid]=o.d;
			streams[o.opid].chunktotal++;
			if(streams[o.opid].chunktotal == o.totalnum) {
				// load up our data on the haul
				var t = streams[o.opid].jqTransport;
				t.data = {};
				for(var i = 0; i < streams[o.opid].chunktotal; i++) {
					t.data += streams[o.opid].chunks[i];
				}
				// clear out this stream:
				_undefineStream(o.opid);
			  // now send it:
				$.ajax(t);
			}
			break;

		case 'ajax':
			/* remote ajax operation */
			var args = 'jqXHR, textStatus';
			var f = _getCompleter(args,o.cbid);
			o.d.complete = eval(f);
			logit(o.d.url);
			logit("Making new ajax call from origin "+window.location.protocol + "//" + window.location.host);
	/*
			o.d.xhrFields = {
           withCredentials: true
      };
*/	
			//logit(o);
			jQuery.ajax(o.d);
			break;
		case 'func':
			exports[o.d.call].apply(this, o.d.args);
		default:
			break;


	}

}

function _undefineStream(opid)
{
	streams[opid] = {};
	// undefine it
	delete streams[opid];
}

function _defineStream(opid, prop)
{
	if(typeof streams[opid]=='undefined') {
		streams[opid] = {
			chunktotal: 0
		};
	}
	if(typeof streams[opid].jqTransport=='undefined') {
		streams[opid].jqTransport = {};
		streams[opid].chunks = {};
	}


}

function parseQueryString(queryString) {
    if(queryString == 'undefined' || queryString == '') {
        return false;
    } else {
        // Get rid of a leading '?' so that you can pass 'location.search' to this function
        if(queryString.substr(0, 1) == '?') { queryString = queryString.substr(1); }

        // Split up the querystring
        var components = queryString.split('&');

        // Assign each variable of the querystring to a new property of the final object
        var finalObject = new Object();
        var parts;
        for (var i = 0; i < components.length; i++) {
            parts = components[i].split('=');
            finalObject[parts[0]] = decodeURI(parts[1]);
        }

        return finalObject;
    }
}

function _getCompleter(args,cbid)
{
	return '(function ('+args+') {\
		_postObject({\
			op:"cb",\
			cbname:textStatus,\
			opid:"'+cbid+'",\
			json: jqXHR.responseText\
		});\
	})';	
}

function popAuthWindow(provider) {

	authwindow = ReadSocial.bridger.popAuthWindow(rid,provider);

}

function callback(stat) {

  logit('Logging value of stat:');
  logit(stat);

	_postObject({
		op:'log',
		d:{
			m:'Callback from auth event'
		}
	});

	_postObject({
		op:'auth',
		d:{
			stat:stat
		}
	});	

}

function logit(m) {
	var o = {
		op:'log',
		d:{
			m: m
		}
	};
	_postObject(o);
}

function _postObject(o)
{
  // wrap the method to handle IE 9 shittiness
	if(window.navigator.appName=='Microsoft Internet Explorer') {
	  var d = JSON.stringify(o);
	} else {
	  var d = o;
	}
  proxy.postMessage(d);
}


var JSON;if(!JSON){JSON={}}(function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];if(i&&typeof i==="object"&&typeof i.toJSON==="function"){i=i.toJSON(a)}if(typeof rep==="function"){i=rep.call(b,a,i)}switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i){return"null"}gap+=indent;h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1){h[c]=str(c,i)||"null"}e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]";gap=g;return e}if(rep&&typeof rep==="object"){f=rep.length;for(c=0;c<f;c+=1){if(typeof rep[c]==="string"){d=rep[c];e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}else{for(d in i){if(Object.prototype.hasOwnProperty.call(i,d)){e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}";gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict";if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(a,b,c){var d;gap="";indent="";if(typeof c==="number"){for(d=0;d<c;d+=1){indent+=" "}}else if(typeof c==="string"){indent=c}rep=b;if(b&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":a})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e==="object"){for(c in e){if(Object.prototype.hasOwnProperty.call(e,c)){d=walk(e,c);if(d!==undefined){e[c]=d}else{delete e[c]}}}}return reviver.call(a,b,e)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()


