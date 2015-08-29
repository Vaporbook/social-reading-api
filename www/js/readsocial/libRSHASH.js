
/**
Required By: ReadSocial API Lib
*/

if(typeof ReadSocial === 'undefined') ReadSocial = {};

ReadSocial.hasher = (function() {
  
  /*
  
  Goal is to generate a cross browser identical MD5 hash of a long text part of an UTF-8 encoded xhtml document. Therefore I started looking at the .text() method. Unlucky not all not md5 output values were identical. I think that is not the fault of jQuery, f.e. start copying and pasting text from different browsers into a text editor and they are all different.

  Solution in this case was to use the .html() method instead, replace all (tags|space characters) by a space, replace the double spaces by a single space, trim it, and finally hash it.

  
  
  */
	
  return {

    normalize: function (s) {
      
      // trim begin and end whitespace
      s = jQuery.trim(s);
      // remove newlines
      var text = s.
                replace(/(\r\n|\n|\r|\t)/gm,' ').
      /* strip hyphens in case of faked word hyphenation */
                replace(/\-/gm, '').
      /* strip strings of spaces before words */
                replace(/\s\s+(\S)/gm,' $1');
  		return text;
    },
    
    thumbprint: function (s) {
      
      // pass normalized text to this
    	var hash = hex_md5(s);
    	return hash;
    	
    },
    
    hashElement: function (p) {

      // pass a paragraph element to this
      var t = jQuery(p).text();//[0].innerText;
      return this.thumbprint(this.normalize(t));
      
    },
    
    /**
     * Escape an xml string making it ascii compatible.
     * @param {String} str the xml string to escape.
     * @return {String} the escaped string.
     */

    encode : function(str) {
        return str.replace(/&([a-z]+);/gi, function(a, m) {
            if (xmlEntityMap[m = m.toLowerCase()])
                return '&#' + xmlEntityMap[m] + ';';
            return a;
        });
    },
    
    
    ent2char : function (str) {
      //To convert all numerical character entities in a string to their character equivalents
      return str.replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(n); })
    }
  
  
  };
  
})();






var xmlEntityMap = {
    "quot": "34", "amp": "38", "apos": "39", "lt": "60", "gt": "62",
    "nbsp": "160", "iexcl": "161", "cent": "162", "pound": "163", "curren": "164",
    "yen": "165", "brvbar": "166", "sect": "167", "uml": "168", "copy": "169",
    "ordf": "170", "laquo": "171", "not": "172", "shy": "173", "reg": "174",
    "macr": "175", "deg": "176", "plusmn": "177", "sup2": "178", "sup3": "179",
    "acute": "180", "micro": "181", "para": "182", "middot": "183", "cedil": "184",
    "sup1": "185", "ordm": "186", "raquo": "187", "frac14": "188", "frac12": "189",
    "frac34": "190", "iquest": "191", "agrave": "192", "aacute": "193",
    "acirc": "194", "atilde": "195", "auml": "196", "aring": "197", "aelig": "198",
    "ccedil": "199", "egrave": "200", "eacute": "201", "ecirc": "202",
    "euml": "203", "igrave": "204", "iacute": "205", "icirc": "206", "iuml": "207",
    "eth": "208", "ntilde": "209", "ograve": "210", "oacute": "211", "ocirc": "212",
    "otilde": "213", "ouml": "214", "times": "215", "oslash": "216", "ugrave": "217",
    "uacute": "218", "ucirc": "219", "uuml": "220", "yacute": "221", "thorn": "222",
    "szlig": "223", "agrave": "224", "aacute": "225", "acirc": "226", "atilde": "227",
    "auml": "228", "aring": "229", "aelig": "230", "ccedil": "231", "egrave": "232",
    "eacute": "233", "ecirc": "234", "euml": "235", "igrave": "236", "iacute": "237",
    "icirc": "238", "iuml": "239", "eth": "240", "ntilde": "241", "ograve": "242",
    "oacute": "243", "ocirc": "244", "otilde": "245", "ouml": "246", "divide": "247",
    "oslash": "248", "ugrave": "249", "uacute": "250", "ucirc": "251", "uuml": "252",
    "yacute": "253", "thorn": "254", "yuml": "255", "oelig": "338", "oelig": "339",
    "scaron": "352", "scaron": "353", "yuml": "376", "fnof": "402", "circ": "710",
    "tilde": "732", "alpha": "913", "beta": "914", "gamma": "915", "delta": "916",
    "epsilon": "917", "zeta": "918", "eta": "919", "theta": "920", "iota": "921",
    "kappa": "922", "lambda": "923", "mu": "924", "nu": "925", "xi": "926",
    "omicron": "927", "pi": "928", "rho": "929", "sigma": "931", "tau": "932",
    "upsilon": "933", "phi": "934", "chi": "935", "psi": "936", "omega": "937",
    "alpha": "945", "beta": "946", "gamma": "947", "delta": "948", "epsilon": "949",
    "zeta": "950", "eta": "951", "theta": "952", "iota": "953", "kappa": "954",
    "lambda": "955", "mu": "956", "nu": "957", "xi": "958", "omicron": "959",
    "pi": "960", "rho": "961", "sigmaf": "962", "sigma": "963", "tau": "964",
    "upsilon": "965", "phi": "966", "chi": "967", "psi": "968", "omega": "969",
    "thetasym": "977", "upsih": "978", "piv": "982", "ensp": "8194", "emsp": "8195",
    "thinsp": "8201", "zwnj": "8204", "zwj": "8205", "lrm": "8206", "rlm": "8207",
    "ndash": "8211", "mdash": "8212", "lsquo": "8216", "rsquo": "8217",
    "sbquo": "8218", "ldquo": "8220", "rdquo": "8221", "bdquo": "8222",
    "dagger": "8224", "dagger": "8225", "bull": "8226", "hellip": "8230",
    "permil": "8240", "prime": "8242", "prime": "8243", "lsaquo": "8249",
    "rsaquo": "8250", "oline": "8254", "frasl": "8260", "euro": "8364",
    "image": "8465", "weierp": "8472", "real": "8476", "trade": "8482",
    "alefsym": "8501", "larr": "8592", "uarr": "8593", "rarr": "8594",
    "darr": "8595", "harr": "8596", "crarr": "8629", "larr": "8656", "uarr": "8657",
    "rarr": "8658", "darr": "8659", "harr": "8660", "forall": "8704", "part": "8706",
    "exist": "8707", "empty": "8709", "nabla": "8711", "isin": "8712",
    "notin": "8713", "ni": "8715", "prod": "8719", "sum": "8721", "minus": "8722",
    "lowast": "8727", "radic": "8730", "prop": "8733", "infin": "8734",
    "ang": "8736", "and": "8743", "or": "8744", "cap": "8745", "cup": "8746",
    "int": "8747", "there4": "8756", "sim": "8764", "cong": "8773", "asymp": "8776",
    "ne": "8800", "equiv": "8801", "le": "8804", "ge": "8805", "sub": "8834",
    "sup": "8835", "nsub": "8836", "sube": "8838", "supe": "8839", "oplus": "8853",
    "otimes": "8855", "perp": "8869", "sdot": "8901", "lceil": "8968",
    "rceil": "8969", "lfloor": "8970", "rfloor": "8971", "lang": "9001",
    "rang": "9002", "loz": "9674", "spades": "9824", "clubs": "9827",
    "hearts": "9829", "diams": "9830"
};

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
var hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};

