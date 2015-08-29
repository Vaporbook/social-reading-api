/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);//     Underscore.js 1.1.6
//     (c) 2011 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **CommonJS**, with backwards-compatibility
  // for the old `require()` API. If we're not in CommonJS, add `_` to the
  // global object.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = _;
    _._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.1.6';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects implementing `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (_.isNumber(obj.length)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = memo !== void 0;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial && index === 0) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError("Reduce of empty array with no initial value");
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return memo !== void 0 ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = (_.isArray(obj) ? obj.slice() : _.toArray(obj)).reverse();
    return _.reduce(reversed, iterator, memo, context);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result = iterator.call(context, value, index, list)) return breaker;
    });
    return result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    any(obj, function(value) {
      if (found = value === target) return true;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (method.call ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.max.apply(Math, obj);
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj)) return Math.min.apply(Math, obj);
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(iterable) {
    if (!iterable)                return [];
    if (iterable.toArray)         return iterable.toArray();
    if (_.isArray(iterable))      return iterable;
    if (_.isArguments(iterable))  return slice.call(iterable);
    return _.values(iterable);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.toArray(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head`. The **guard** check allows it to work
  // with `_.map`.
  _.first = _.head = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Get the last element of an array.
  _.last = function(array) {
    return array[array.length - 1];
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(_.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    var values = slice.call(arguments, 1);
    return _.filter(array, function(value){ return !_.include(values, value); });
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted) {
    return _.reduce(array, function(memo, el, i) {
      if (0 == i || (isSorted === true ? _.last(memo) != el : !_.include(memo, el))) memo[memo.length] = el;
      return memo;
    }, []);
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
    return -1;
  };


  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function(func, obj) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(obj, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return hasOwnProperty.call(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(func, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Internal function used to implement `_.throttle` and `_.debounce`.
  var limit = function(func, wait, debounce) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var throttler = function() {
        timeout = null;
        func.apply(context, args);
      };
      if (debounce) clearTimeout(timeout);
      if (debounce || !timeout) timeout = setTimeout(throttler, wait);
    };
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    return limit(func, wait, false);
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds.
  _.debounce = function(func, wait) {
    return limit(func, wait, true);
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = slice.call(arguments);
    return function() {
      var args = slice.call(arguments);
      for (var i=funcs.length-1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };


  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (hasOwnProperty.call(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    return _.filter(_.keys(obj), function(key){ return _.isFunction(obj[key]); }).sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    // Check object identity.
    if (a === b) return true;
    // Different types?
    var atype = typeof(a), btype = typeof(b);
    if (atype != btype) return false;
    // Basic equality test (watch out for coercions).
    if (a == b) return true;
    // One is falsy and the other truthy.
    if ((!a && b) || (a && !b)) return false;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // One of them implements an isEqual()?
    if (a.isEqual) return a.isEqual(b);
    // Check dates' integer values.
    if (_.isDate(a) && _.isDate(b)) return a.getTime() === b.getTime();
    // Both are NaN?
    if (_.isNaN(a) && _.isNaN(b)) return false;
    // Compare regular expressions.
    if (_.isRegExp(a) && _.isRegExp(b))
      return a.source     === b.source &&
             a.global     === b.global &&
             a.ignoreCase === b.ignoreCase &&
             a.multiline  === b.multiline;
    // If a is not an object by this point, we can't handle it.
    if (atype !== 'object') return false;
    // Check for different array lengths before comparing contents.
    if (a.length && (a.length !== b.length)) return false;
    // Nothing else worked, deep compare the contents.
    var aKeys = _.keys(a), bKeys = _.keys(b);
    // Different object sizes?
    if (aKeys.length != bKeys.length) return false;
    // Recursive comparison of contents.
    for (var key in a) if (!(key in b) || !_.isEqual(a[key], b[key])) return false;
    return true;
  };

  // Is a given array or object empty?
  _.isEmpty = function(obj) {
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (hasOwnProperty.call(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return !!(obj && hasOwnProperty.call(obj, 'callee'));
  };

  // Is a given value a function?
  _.isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
  };

  // Is the given value `NaN`? `NaN` happens to be the only value in JavaScript
  // that does not equal itself.
  _.isNaN = function(obj) {
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false;
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return !!(obj && obj.getTimezoneOffset && obj.setUTCFullYear);
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return !!(obj && obj.test && obj.exec && (obj.ignoreCase || obj.ignoreCase === false));
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(str, data) {
    var c  = _.templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.interpolate, function(match, code) {
           return "'," + code.replace(/\\'/g, "'") + ",'";
         })
         .replace(c.evaluate || null, function(match, code) {
           return "');" + code.replace(/\\'/g, "'")
                              .replace(/[\r\n\t]/g, ' ') + "__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', tmpl);
    return data ? func(data) : func;
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      method.apply(this._wrapped, arguments);
      return result(this._wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

})();

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

/*
String.prototype.splice = function( index, howManyToDelete, stringToInsert ) {
var characterArray = this.split( "" );
Array.prototype.splice.apply(characterArray,arguments);
return(characterArray.join( "" ));
};
*/

ReadSocial.Sel = (function () {
  

  
  //rangy.init();
  
  var launcherLoc = { left:0, top:0 };
  var pointerEvent = { x:0, y:0 };
  var contentdoc;
  var currentParagraph;
  var currentHighlight;
  var originalHTML;
  var originalBgColor;
  var hoverRestoreBG;

  var mouseIsDown = false;
  var appendToEl = document.body;
  var storedRange = null;
  var appendBox = {};
  var markid;
  var launcherHTML = '<div style="display:none;width: 109px; height: 46px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAAuCAYAAAAiNJeUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTVBRUUyRkMzODBDMTFFMTgxMThEM0FDRTM3RDQ1OTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTVBRUUyRkQzODBDMTFFMTgxMThEM0FDRTM3RDQ1OTAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMUY3MkM1NzM4MEMxMUUxODExOEQzQUNFMzdENDU5MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMUY3MkM1ODM4MEMxMUUxODExOEQzQUNFMzdENDU5MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqIiLqsAAAfmSURBVHja7FtpaBRJ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); -webkit-transition-property: top, bottom, left, right; -webkit-transition-duration: 0.5s; position:absolute; margin:0 auto; cursor:pointer; padding:0; z-index:100;" id="selui-launcher" class="launcher readsocial-buttonbox launcherButtonBox launcherButton">\
				</div>';
  var markTag = 'mark';
  var markClass= 'highlight';
//  var cssApplier = rangy.createCssClassApplier(markClass, {normalize: true, elementTagName: markTag });
  var launcher;





  function _init(config)
  {
    if(typeof config!== 'undefined') {
      if(typeof config.launcherHTML !== 'undefined') {
        launcherHTML = config.launcherHTML;
      }    
      if(typeof config.attachTo !== 'undefined') {
        appendToEl = config.attachTo;
      }
      if(typeof config.markTag !== 'undefined') {
        markTag = config.markTag;
      }
      if(typeof config.markClass !== 'undefined') {
        markClass = config.markClass;
      }
      
    }
         
    jQuery(window).resize(function (e) {
      _showCursor();
    });

    contentdoc = ReadSocial.API.getContentDoc();

    jQuery(contentdoc).bind('scroll',function (e) {
      _showCursor();
    });


    // support for ibooks buttons

    $('a.readsocial-epublink').each(function (i,n) {

      var button = $(n);

      var ch = ReadSocial.API.createGroupName(button.text());

      button.html('#'+ch);

      button.addClass('group-pill');
      button.attr('title', 'Use ReadSocial to discuss with the #'+ch+' group');

      var hashlabel = "readsocial-hashlabel-"+ch+'-'+(new Date()).getTime();

      var p = button.parent('p');

      button.click(function(e){

        ReadSocial.API.setGroupName(button.html().replace(/^#/,''));

        var eln = p[0];

        _clearAll();
   
        currentParagraph = eln;

        originalHTML = $(currentParagraph).html();

        ReadSocial.API.setContext(_getSelectionContext());

        ReadSocial.API.setNode(currentParagraph);

        var h = _getHighlight();

        storedRange = ReadSocial.Sel.serializeSelection();

        ReadSocial.API.setHighlight(h);

        ReadSocial.API.setLocator(storedRange);


        if(h) {
          ReadSocial.API.showPublisherModal({
            view:'post'
          });
        } else {
          ReadSocial.API.showPublisherModal({
            view:'list'
          });          
        }


      });
    });
    //ReadSocial.log('initialized selection mechanism');
  }
  
  function _toggleBySelector (sel) {
    
    jQuery(sel).trigger('mouseup');
    
  }

  function _attachLauncher () {
    
      var p = jQuery(currentParagraph);

      if(!p.size()>0) return false;

      var parents = p.parents();

      if(!parents.size()>0) return false;

      if(typeof appendToEl === 'undefined') {
        appendToEl = jQuery(p.parents()[0]);
        appendBox = {};
        appendBox.h = appendToEl.height();
        appendBox.w = appendToEl.width();
      }

      var jq = jQuery(appendToEl);

      if(jq.size()<1) {
        jq = jQuery('body');
      }

      jq.append(launcherHTML);

    	launcher = jQuery('#selui-launcher');

    	launcher.mousedown(function(e){

    		e.preventDefault();
    		e.stopPropagation();

        //_markSelection();

    	  ReadSocial.API.showPublisherModal({
          view:'post'
        });
    		//return false;

    	});


  }
  
  function _removeLauncher()
  {
    if(typeof launcher !=='undefined') {
      launcher.remove();
    }
  }
   
  function _toggleParagraph (e) {

    var p = e.target;

    if(p.nodeName.toLowerCase()=='p' && p !== currentParagraph) {

      if (e.type=='mouseover') {
        hoverRestoreBG = p.style.backgroundColor;
        p.style.backgroundColor = '#ececec';
        return;
      } else if (e.type=='mouseout') {
        p.style.backgroundColor = hoverRestoreBG;
        return;
      }
    }

    var el = jQuery(p);

    if(el[0].nodeName.toLowerCase()!='p') {
     el = el.parents('p');
    }
    if(!el.size()) {
      
      //ReadSocial.log('there is no paragraph here');
      el = el.parents('div');
      return false;
    } else {
      var eln = el[0];
    }

    var type = (e.type=='mouseup') ? 'selend' :
                  (e.type=='mousedown') ? 'selstart' :
                    'selmove';

    if(type=='selstart') {

      _handleSelStart(e,eln);

    } else if(type=='selend') {

       _handleSelEnd(e,eln);

    } else if(type=='selmove') {

    }
   
  }


 function _handleSelStart(e,eln) {

      _clearAll();
      mouseIsDown = true;
      currentParagraph = eln;

      originalHTML = $(currentParagraph).html();

      ReadSocial.API.setContext(_getSelectionContext());
 //     ReadSocial.API.setLocator(_getDOMLocation(eln));
      ReadSocial.API.setNode(currentParagraph);
      // highlight this item as selected
      var p = jQuery(currentParagraph);
      
      //p.addClass('bghilite');
      originalBgColor = hoverRestoreBG; //p.css('backgroundColor');
      p.css({backgroundColor:'#C6DAF5'});

      // capture mousedown location for pointer placement
      pointerEvent = e;
      
      if(typeof e.originalEvent !== 'undefined') { // only if this is a real click
      
        _attachLauncher();    
            
      }

  }

  function _handleSelEnd(e,eln) {

    mouseIsDown = false;
    
    _showCursor();

    if(eln==currentParagraph && _getHighlight().length<1) {
      
      alert('you clicked the same paragraph and there is no selection');
      
    }

    // before changing the paragraph's dom, store the range serialization:
    storedRange = ReadSocial.Sel.serializeSelection();
    ReadSocial.API.setHighlight(_getHighlight());
    ReadSocial.API.setLocator(storedRange);
                
    // now show highlight:
    ReadSocial.Sel.toggleSelectionColor();

  } 

  function _getSelector(el) {
    
	  var tag = (arguments.length>1) ? arguments[1] : 'p';
	  // generate a location string for this dom element
	  var tags = [];
	  var index = jQuery(el).prevAll(el.nodeName).size();
	  
	  jQuery(el).parents().each(function (i, n) {
	    
	    tags.unshift(n.nodeName.toLowerCase());
	    
	  });
	  
	  var sel = ('("'+tags.join(' > ') + ' > ' + tag + '")[' + index + ']');
 
	  return sel;
	  
  }
  

  function _getHighlight()
  {
    
    if(currentParagraph) {
      var s = window.getSelection();
      if(s.toString().length) {
        currentHighlight = s.toString();
        return s.toString();
      } else {
        var sc = _getSelectionContext();
        currentHighlight = sc;
        return sc;
      }
    } else {
      return '';
    }
    
  }
  
  
   function _getSelectionContext ()
   {
      var p = jQuery(currentParagraph).clone(true,true);
      $('a.readsocial-epublink',p).empty();
      return p.text().trim();
   }

  
  
   function _reposLauncher() {
      launcherLoc = { /* default */
        left:-7000,
        top:0
      };

      if(currentParagraph && typeof launcher !== 'undefined') {


        var p = jQuery(currentParagraph);
        
        
        // get relative event coords
         /*
         var totalOffsetX = 0;
         var totalOffsetY = 0;
         var elX = 0;
         var elY = 0;
         var currentElement = pointerEvent.target;

         do{
             totalOffsetX += currentElement.offsetLeft;
             totalOffsetY += currentElement.offsetTop;
         }
         while(currentElement = currentElement.offsetParent)

         elX = event.pageX - totalOffsetX;
         elY = event.pageY - totalOffsetY;

         var relco = {x:elX, y:elY}
         */

         // set adjustment offset for event
         
         //ReadSocial.log(pointerEvent);
         
         if(pointerEvent.offsetX>0) {
           //ReadSocial.log('setting pos from pointerEvent');
           var ox = pointerEvent.offsetX;/*-1 * relco.x - 20;//20;*/           
         } else {
           //ReadSocial.log('setting pos from p offset');
           var ox = p.offset().left;/*-1 * relco.x - 20;//20;*/
         }
       //  var ox = pointerEvent.offsetX;/*-1 * relco.x - 20;//20;*/
         var oy = p.offset().top;//pointerEvent.offsetY;/*-1 * relco.y + 40;//10;*/

         // get parent position

         var cpp = p.position();

         if(cpp) {

           // position based on parent pos and event offset

         // launcherLoc.left=cpp.left +p.width()-100/* - ox*/;
         //launcherLoc.top=cpp.top + p.height()-20/* - oy */;
          //launcherLoc.left=cpp.left + ox;// - 40;
          //launcherLoc.top=oy;//cpp.top + oy - 20;
          launcherLoc.top = pointerEvent.pageY - 40;
          launcherLoc.left = pointerEvent.pageX + 30;
          
           var cssblock = {
             top:launcherLoc.top+"px",
             left:launcherLoc.left+"px",
             position:"absolute !important",
             opacity:1
           };
           //ReadSocial.log(cssblock);

           launcher.css(cssblock);

         }
        
        
        
        launcher.show();
      }

   }

   function _clearAll () {

            
      var mh = jQuery(markTag+'.highlight');
      if(mh.size()>0) {
        mh.each(function (i,m) {
          
          jQuery(m.childNodes).unwrap();

        });
      }
      var p = jQuery(currentParagraph);
      p.removeClass('bghilite');
      p.css({backgroundColor:originalBgColor});

      //jQuery('p.bghilite').removeClass('bghilite');

      // remove selected status from selected items
      jQuery('p.readsocial-selected').removeClass('readsocial-selected');
      //_unmark();
      
      // use this instead of unmark
      //_restore();
      currentParagraph = null;
      currentHighlight = null;

      _removeLauncher();
      
   }
   
  function _showCursor() {

    _reposLauncher();

  }
    /*
  function _getCursorLocOld() {
        
    launcherLoc = {
         left:-7000,
         top:0
    };

    var p = jQuery(currentParagraph);
    
    var ox = -1 * pointerEvent.x - 20;//20;
    var oy = -1 * pointerEvent.y + 40;//10;

    var cpp = p.position();
    
    
    
    if(cpp) {
      launcherLoc.left=cpp.left-ox;
      launcherLoc.top=cpp.top-oy;      
    }
       
    ReadSocial.log('reporting cursor location:');
    ReadSocial.log(launcherLoc);
       
    return launcherLoc;

  }

*/


  function _markSelection()
  {

    //ReadSocial.log('markSelection');

    if(window.getSelection().toString().length>0) {
      
      var r = window.getSelection().getRangeAt(0);
      
      //ReadSocial.log(r);
      
      if(r.startContainer.nodeType==3) {
        var p = jQuery(r.startContainer).parent('p');
        if(p.size()) {
          var newh = _mark(p.html(), r);
          p.html(newh);
        }
      } else if(r.startContainer.nodeType==1) {
        
        
      }

    }
  }

  function _unmark() {
    
    var m = jQuery('#'+markid+' span');
    var s = jQuery('#'+markid+' span *');
    s.unwrap();
    m.unwrap();
    
  }
/*
  function _restore() {
    
    ReadSocial.log('restoring dom');
    jQuery(currentParagraph).html(originalHTML);
    ReadSocial.log('done');
  }
*/
/*
  function _mark(html,r)
  {
      if(!html) return "";
      originalHTML = html;
      markid = 'mark'+(new Date()).getTime();
      return [
          html.slice(0, r.startOffset),
          '<mark id="'+markid+'"><span>',
          html.slice(r.startOffset, r.endOffset),
          '</span></mark>',
          html.slice(r.endOffset)
        ].join('');
  }
  */
  

	function _getDOMLocation(p) {
	  
	  var tag = (arguments.length>1) ? arguments[1] : 'p';
	  // generate a location string for this dom element
	  var tags = [];
	  var index = jQuery(p).prevAll(tag).size();
	  jQuery(p).parents().each(function (i, n) {
	    
	    tags.unshift(n.nodeName.toLowerCase());
	    
	  });
	  
	  var sel = (tags.join(' > ')+' > '+tag+':nth-child('+(index+1)+')');
 
	  return sel;
	  
	}
	/*
	function _showHighlighted(str)
	{
	
    var words = str.split(' ');

    // only attempt this for longer highlights
    if(words.length<4) return;
        
    var d;

	  var start = words.shift(); // first frag
    var second = words.shift();
	  var end = words.pop(); // last frag
    var penul = words.pop();
    var middle = ' '+words.join(' ')+' ';


    // could fail
    var s = originalHTML.indexOf([start,second].join(' '));
    var e = originalHTML.indexOf([penul,end].join(' '))+[penul,end].join(' ').length;
    
    
    
    ReadSocial.log(s);
    ReadSocial.log(e);
    if(s == -1 || e == -1) {
      ReadSocial.log('failed to locate highlight in element');
      return;
    }
    var markid = 'mark'+(new Date()).getTime();
    var tagcount = 0;
    middle.replace(/<\/mark>/gi,function () {
	    tagcount++; // count as an end tag that must be pushed out
	    return '';
	  });

	  middle = [start,second].join(' ') + middle + [penul,end].join(' ');
    
    var fore = originalHTML.slice(0, s);
    
    console.log(fore);
    
    middle = ['<mark id="'+markid+'"><span>',middle, '</span></mark>'].join('');
	  for(var i=0; i<tagcount; i++) { // append end tags after highlight
	    middle += '</mark>';
	  }

    console.log(middle);

    var aft = originalHTML.slice(e);

    console.log(aft);

    var newhtml = [
        fore,
        middle,
        aft
      ].join('');

	  jQuery(currentParagraph).html(newhtml);
	  

	}
	*/
  return {
     
      init:_init,
      toggle: _toggleParagraph,
     /* showHighlighted: _showHighlighted,
      clearHighlighted: _restore,*/
      toggleSelectionColor: function () {

        // doesnt really seem to work:
        //cssApplier.toggleSelection();

      },
      getStoredRange: function () {
        return storedRange;
      },
      serializeSelection: function () {
        
        
        if(!window.getSelection().toString().length>0) return '';
      
        try {

         // var s = rangy.serializeSelection(
          //  null, /* use default selected */
           // true, /* omit checksum */
           // currentParagraph
          //);
        } catch (e) {
         // ReadSocial.log(e);
        }
//        ReadSocial.log('serialized selection:'+s);
  //      return s;
        return 'foo';
      },
      restoreSelection: function (s) {

        //rangy.deserializeSelection(s,currentParagraph);
        //ReadSocial.Sel.toggleSelectionColor();

      },/*
      rangy:rangy,*/
      toggleBySelector: _toggleBySelector,
      clearAll: _clearAll,
      getContext: _getSelectionContext,
      getHighlight: _getHighlight,
      showLauncher: _showCursor,
      getCurrentPara: function () {
        return currentParagraph;
      }
    
  };

})();



var _RS_UI = 'ui';

var _ReadSocial_UI_tmpl = {

  channelBar:'<div class="readsocial-channelBar"><div class="rs-channelList"></div></div><div class="rs-channelButton">#{{channel}}</div>',
  notification: '\
        <div id="id{{ time }}"\
        class="notification"\
        style="top:{{ top }}px;left:{{ left }}px;"\
        >\
        {{ count }}\
        </div>',
  login: '\
        <div id="rslogin{{ time }}"\
        class="accountaccess"\
        style="top:{{ top }}px;left:{{ left }}px;"\
        >\
        {{ count }}\
        </div>',
  join: '\
        <div id="rsjoin{{ time }}"\
        class="accountaccess"\
        style="top:{{ top }}px;left:{{ left }}px;"\
        >\
        {{ count }}\
        </div>',
  noteListItem: '\
        <li class="li-noteitem textnote {{clname}} newpost"><div class="readsocial-note-item"\
                 data-note_id="{{_id}}"\
                 data-created_at="{{crstamp}}">\
        <div class="readsocial-profile-img"><img src="{{ uimg }}"/></div>\
        <div class="readsocial-note-body">{{ body }}</div>\
        <div class="readsocial-username">{{ uname }} <span class="readsocial-auth-network"><i class="oauth-icon oauth-icon-{{ udom }}"></i></span>&nbsp;{{ friendly_stamp }}</div>\
        <div class="readsocial-group-name">#{{ gid }}</div>\
        <div class="readsocial-hilight-body">"...{{ hi_raw }}...</div>\
        <div class="readsocial-agentstring">{{ agent }}</div>\
        </div><i class="icon-chevron-right readsocial-notepointer"></i></li>',
  noteImageListItem: '\
        <li class="li-noteitem imagenote {{clname}} newpost"><div class="readsocial-note-item"\
                 data-note_id="{{_id}}"\
                 data-created_at="{{crstamp}}">\
        <div class="readsocial-profile-img"><img src="{{uimg}}"/></div>\
        <div class="readsocial-note-body"><div class="readsocial-listimage">\
        <div class="captioned"><img src="{{img_full_url}}" /><div class="caption">&nbsp;{{ body }}</div></div></div></div>\
        <div class="readsocial-username">{{ uname }} <span class="readsocial-auth-network"><i class="oauth-icon oauth-icon-{{ udom }}"></i></span>&nbsp;{{ friendly_stamp }}</div>\
        <div class="readsocial-group-name">#{{ gid }}</div>\
        <div class="readsocial-hilight-body">"...{{ hi_raw }}...</div>\
        <div class="readsocial-agentstring">{{ agent }}</div>\
        </div><i class="icon-chevron-right readsocial-notepointer"></i></li>',
  noteLinkListItem: '\
        <li class="li-noteitem linknote {{clname}} newpost"><div class="readsocial-note-item"\
                 data-note_id="{{_id}}"\
                 data-created_at="{{crstamp}}">\
        <div class="readsocial-profile-img"><img src="{{ uimg }}"/></div>\
        <div class="readsocial-note-body"><span class="readsocial-listlink"><a href="{{link}}" target="_new">{{ body }}</a></span></div>\
        <div class="readsocial-username">{{ uname }} <span class="readsocial-auth-network"><i class="oauth-icon oauth-icon-{{ udom }}"></i></span>&nbsp;{{ friendly_stamp }}</div>\
        <div class="readsocial-group-name">#{{ gid }}</div>\
        <div class="readsocial-hilight-body">"...{{ hi_raw }}...</div>\
        <div class="readsocial-agentstring">{{ agent }}</div>\
        </div><i class="icon-chevron-right readsocial-notepointer"></i></li>',
  noteListNoItems: '\
        <div class="readsocial-bigzero"><div class="bigzero-holder"><span class="bigzero">0</span><br/><span class="bigzero-sub">Comments here</span><br/><span class="bigzero-sub2">Drop some wisdom into this group discussion</span></div></div>',
  noteDetail:'\
      <div class="readsocial-note-item-detail texttype"\
           data-note_id="{{_id}}"\
           data-created_at="{{crstamp}}"\
           data-hi_raw="{{ hi_raw }}"\
           data-permalink="{{permalink}}"\
           >\
        <div class="readsocial-profile-img"><img src="{{ uimg }}"/></div>\
        <div class="readsocial-note-body">{{ body }}</div>\
        <div class="readsocial-username">{{ uname }} <span class="readsocial-auth-network"><i class="oauth-icon oauth-icon-{{ udom }}"></i></span></div>\
      </div>',
  linkDetail:'<div class="readsocial-note-item-detail linktype"\
           data-note_id="{{_id}}"\
           data-created_at="{{crstamp}}"\
           data-hi_raw="{{ hi_raw }}"\
           data-permalink="{{permalink}}"\
           >\
          <div class="readsocial-profile-img"><img src="{{ uimg }}"/></div>\
          <div class="readsocial-note-body"><a href="{{link}}" target="_new">{{ body }}</a></div>\
          <div class="readsocial-username">{{ uname }} <span class="readsocial-auth-network"><i class="oauth-icon oauth-icon-{{ udom }}"></i></span></div>',
  imgDetail:'<div class="readsocial-note-item-detail imgtype"\
           data-note_id="{{_id}}"\
           data-created_at="{{crstamp}}"\
           data-hi_raw="{{ hi_raw }}"\
           data-permalink="{{permalink}}"\
           >\
          <div class="readsocial-profile-img"><img src="{{ uimg }}"/></div>\
          <div class="readsocial-note-body"><div class="readsocial-listimage">\
          <div class="captioned"><a href="{{ img_full_url }}" target="_new"><img src="{{img_thumbnail}}" /></a><div class="caption">&nbsp;{{ body }}</div></div></div></div>\
          <div class="readsocial-username">{{ uname }} <span class="readsocial-auth-network"><i class="oauth-icon oauth-icon-{{ udom }}"></i></span></div>',
  respondButton: '<div class="readsocial-buttonContainer"><a href="#" class="btn btn-primary pull-right readsocial-respondButton readsocial-button">Respond</a></div>',
  replyForm: '<div class="readsocial-responseFormSubview rssubview">\
        <div class="readsocial-textentryarea postfield">\
            <textarea placeholder="[leave your mark here]" class="readsocial-magnifier readsocial-response" name="response" rows="2" cols="70"></textarea><div class="readsocial-reply-button-div"><button class="btn btn-primary pull-right readsocial-reply-button">Reply</button></div>\
        </div>\
      </div>\
      <div class="readsocial-responseListSubview rssubview">\
        <div class="readsocial-responsethrobber"></div>\
        <div class="readsocial-responselist"><ul></ul></div>\
      </div>',
  responseListItem: '\
      <li class="li-responseitem newpost"><div class="readsocial-response-item"\
               data-note_id="{{note_id}}"\
               data-response_id="{{_id}}"\
               data-created_at="{{crstamp}}">\
        <div class="readsocial-profile-img"><img src="{{ uimg }}"/></div>\
        <div class="readsocial-note-body">{{ body }}</div>\
        <div class="readsocial-username">{{ uname }} <span class="readsocial-auth-network"><i class="oauth-icon oauth-icon-{{ udom }}"></i></span></div>\
      </div></li>',
  hashList: '<div id="readsocial_hashlist" class="dropSelector titleItem titleSelector" style=""><ul></ul></div>',
  hashItem: '<li val="queue" class="selected"><a data-name="{{ data }}">{{ name }}</a></li>',
  noteListNoItemsImg: '\
        <div class="readsocial-background-nocomments"><img class="rs-nocomments-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdsAAABnCAYAAABIBeiOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAA3mxJREFUeNrsvXec5XV97%2F%2F89nJ6mbozOzPbD%2BwusCwsvSyIICiK2FESUZNYL8aoQdPuVWPEmBvM9d6okZiAP9MsiV1AkCZld4FdmIWts9PLmdPLt%2F%2F%2BOGVndmaRGDWi8348zmN2z%2Fmebzvfz%2Bf1eb3eTQiCgJ%2FFBEFgxVZsxVbshU4ZgAgogLzgrwxIzZfYfAnNF0DQfPnNl9d8uc2Xs%2BCv39x2xV4E9rNiz4vV5JWffMVW7MVnw8PDv9Lnl8lkREAFtNbrsssu6zn77LM39fT0DMVisb5IJNJlmmZa07SEruthRVFCiqLokiQpkiRJAF7DHMdx6o7jVOr1etmyrFy1Wp0rlUrThUJhbHJy8sijjz66%2F%2B67754ErAUve3h42P8VvT8rD%2FFv2mpzhdmu2IqtgO3PCVxlwACMdevWJV%2F%2F%2BtfvGBgYOC2dTm9MJBJDsVhsla7r4V%2FE8ev1erlQKIzncrkjc3Nzz46MjDz51a9%2B9ZGDBw%2FOA7Xmy%2F1VAd8VsP3NY7YrYLtiK7YCtv8VgFWaABt%2B73vfu%2F3UU089v7u7%2B4yOjo6NiUSi77%2Fz%2FHK53Njs7OyzU1NTe55%2B%2BukHb7vttseBchN4nf9O4F0B2xWwXQHbFVuxFbB9PpAQaPhXDSDy%2Fve%2Ff8fmzZt39vb27uju7j5F07TQr%2BL9siyrMjU19czExMQj%2B%2Fbtu%2Bczn%2FnMI0CpCbze8PBw8Eu%2BjytguwK2K2C7Yiu2ArYnZbGhnTt3Dlx33XXXDg4OXtLT03OGaZrRF9O9q1arxcnJyT1Hjx6992tf%2B9o377nnnhGg8stkuytguwK2K2C7Yiu2ArYngqwKRN%2F73veec9ZZZ72iv7%2F%2Foq6urvU%2Fy%2F5UVUWSZAxDR1EUJElClmXsehXHruN7HlatgihJCJKCa9WwvQCCAFnV0HUD13UpF4souo4kK3iuh%2Bt5P9P1TU9PHxgdHf3xY4899u%2B33XbbT4Aiv4TAqhWwXQHbFbBdsRVbAduFIBv78Ic%2FfOkZZ5zxqoGBgYtisVj3f2I2RRQFfNdCU2SiiRTJdCeCIC4PfJPj5Oaz9Pf3USqVKBfzBEGAZTmYpgaBQDTVQaVYxK7X6Ojtw7bq1GoVNCOEIAi4jotlOziO%2B5%2BazAuFwtTIyMiP9%2BzZ8%2FVPfvKTPwIKv0jQXQHbFbBdAdsVW7HfYLBt%2BmQVIPbBD37wwm3btr1uzZo1OyORSPqFfF%2BSJBRFBt%2BllM8TioSJxuLMz80iBh6qrpFMdxOOJRd9z3VdvvA3f0Wqo4N0Zzdnn3020xOj%2BIKIgEg8olOrWwiqQTGbJdXZharpFHI5FE3BsR1EUcQMhZBkGd%2F3cV2Pet3Csmz8FzjPlUqlucOHD9%2Bze%2Ffuf%2FrUpz51fxN0nZ%2B3T3cFbFfybFdsxVbsN9QymYwMhG644YatL33pS29cu3btlYlEYtULYbCarhEJGQiiiCiK1CsVXF1GU1Vq1SqhSBRdN6iWi0yOjWDMz5Ls7MEMNdy9jz%2FyEAEBiWSKtevWN8BYlHBsi3K5SC5fIhJPUC4V0QwDzTCplEtIskQoHMH3faxajXKxiKwoGKFQA%2FQDH6uUwwsgFIljWfbzVr2IRCLp00477bWrV68%2Bf8uWLd%2F7%2Fve%2F%2F%2BU77rjjqUwmUxkeHnZXnpIVW2G2K7ZiK8z2ZwVZkUbhifTnPve5t23cuPHVvb29p%2F607xl6FioVpOgpmKZG4HsIgoDn%2BxTn51A0DcMMUymXiMWTBIGPIIpNn2sez64RicZJd%2FXxr%2F%2F0%2F9HR2Un%2F6gH6B4dwbJv%2F%2BPq%2Fomk6V7zsGgQ8rHqdmalJ0t29SKJEPjdPNBZDFEWC1pwUQLVSxrUdYqkkpdw8nudQqVkYukEsouEFIvlSnYCfPodNTEw8%2Feyzz%2F7bO9%2F5zi8Cc4D185CWV5jtioy8ArYrtmK%2FQWDbZLPRW2655fLt27e%2FdcOGDZe3qjedlP2FpujqegIrazBbOJ94Vw%2Be5yIKAoIoUsrnEAKHAAnXCzBME1XX25OrIAgIgoBjO1SKORy7Tqqzm31795FMdbDl9G08vfcJntn7JL7n0rd6DSNHDnH5VVehKyqO61Ct1tqysR80YDMARFGkVi4TAKFIhEIuS8hQCIIAz%2FMxTKMBsUFAtW5RLFv4PO%2Fl4nme99xzz931%2BOOPf%2BkTn%2FjEXUDxv8pyV8B2RUZesRVbsd8Aa%2FpmNSD9%2Bc9%2F%2Fr2ZTOa16XR64PlBdoLu9FNIskXgiMxlM1QBMT9PJBqnVqvgOg66EaJeK%2BPZVWwX4snkIp9pEAQEQYCqqbhmmECQyGWzrBlaTTTRcA0fOXSQYyNH2Zg5ldmZSUKRCBPjE0QjMRLJOAQ%2Bsqw0JWGBoMlTXcfFcmxi8QSWZSEGPpqmQRAcB%2BXmuZi6hmN76KEo5WoNy7KXvW5JkqRMJvPSjo6OTYODg%2F%2F8jne847ZMJtNiuSu1mFdshdmu2IqtMNtlgVaiUfHp3IsvvvhdmzZtukoUxZPSu3Boiq7UXhS51nhDdKnM9JOrnc1Mdh5FVVFVFV3XKRZyxJNJAh9c18EMh1FVbXkWEwQU8wViiQSCIFAplyjms%2BiahmaGqNZt5mbncOw6x0aOUirk6ejsQtN0Xn7da5ifm8Ku15FVDUGUEUWBUiGPrGqYhoHrOJSLORRFQhAE6pZLyNQxDA0BsB2HfL5KoqOjxWApl6tYtnPSe%2Bf7vrd%2F%2F%2F7v3nffff%2FntttuexgoDw8Pez%2FDb7DCbFdk5BWwXbEV%2B3UF26ZsnLj11lvfePrpp7%2B1r69v68m21XWB7tSP0LUC7SY8QoBbkyjmLqbsxSiXy4RCIVRNp16r4XsW8XiUXK6AZkQwQyFEScL3F7s5RVGkXC4hiSK6ESII%2FIbv1Q%2FIZmdx6lU60p04ns%2FTT%2B%2FDdhx0VSGfz%2BN5HmeceTbrN51CuVSgVi0jiSKW7WBZFrF4HMdxcOp1zEiE2alJPM%2Blo7uXuclxNFUlFDExdI1SqYLtBZihCIqqAlDIl3DsGt7zyMtjY2NPPfHEE1%2F6gz%2F4g68Auf%2BsrLwCtisy8oqt2Ir9GlpTNpaBji984Qu%2Fv2XLljfFYrGuky2kE4k4nYkfQpClkQnUmiFdaoVBULuo5ubRNA3fD5BlBU2H2Zk84XCYrq40Vt2inJ9HVDSMJugGTdB1XRfPdgjFEwSB32KNCAioqkIi2U9xPku9WmXbtjPwApFn9u2lf2CI8dER4okEruvy71%2F%2FNyDg4ksvQ9dkfE%2BAIKBSKuHYFo7romoaoUgnVrUKgoARTVCrFjFMnUg0jGXZVCtFrJqMrBlgW3SHn6ImR8gVhgiCpaDb19e3NRKJ%2FOEXvvCF1W9%2F%2B9v%2FMpPJzNJodLAiK6%2FYsiau3IIVW7HfCKDVtm%2Ffvu7OO%2B%2B8dceOHe8%2BGdAahsHQ0BCd6TkIRhasxwUQPFw7RcXZgOM5CEGj9WzNqpPLZbHqNUwjxFw2z9TULACJZARV8qnk56lVKo1JRxCpV2tohnGcMAtCI2WoVkUSZSRJQlQUUj29zOfy5GanOeWUU1i%2FYSPrN55CR1cPx44eJplKMjg4xMGDB5jLFogn0li1Cr7nouoGpWIBRVGQZYlCbp5YMo1rW2iaQqlQol6toesqiUQETRWwK2V0eR4zPk5n5zADXXdjaLll72ssFuvasWPHu%2B%2B8885bt2%2Ffvg7Qmvd6xVZsBWxXbMV%2BA4HWvPHGG8%2B65ZZbPr1t27Y3KoqiLrux76IIPp6VBf8BjvdyB%2FAhADn0UhK9pyKKMrVqmVwui2Nb1Ot1SqUSumEQBAHhWArLEcjlGrmwyWQUp1ZqSs0uVr1K4zQEREGgXq1Qr1ZxLBsjFKJaLiPLCqqq0tnVg6ob5PM5srNTrOrrBWDvE7sRERg9NsL4sRHGRo4SisTp7Fnd8O0qEqFwGCMcIT8%2Fh6TIKIqGiIdjO1iuQM32mZvLYdVtDNMkGjEImweRTIfsjMWBg2P0dd5LMnFw2VumKIq6bdu2N95yyy2fvvHGG88CzBXAXbHlbEVGXrEV%2B%2FUFWhEw3%2FOe91z40pe%2B9ENr1669eLntBEGgWswRiydwahVc6T4wss3poaWKOiCcAsIQmg4dvQMY4RjF%2FCyOVadQLFOt1nBdh1A4gmGa%2BEGA5xhUqyXqdRvP9wlsi1qlgiT41Er5psQcBgQqpRJmOIwAOLZNJBaHIMC264iSSGe6F8eymZ2dYXZ6irPOOZen9z5FuqOTfG6ey668usEgJIloIo0ZjlLMz1OvlLDrNZKd3Vj1CuDhuB7RRBJJlqiWK1RqFpbtYwrjmOkpEGSycwVEMUBSRDpi%2BwgqEQpuN74fLHevX6aqaigajf7FZz%2F72fszmUz1V7Vx%2FYqtgO2KrdiK%2FZyB9gMf%2BMDlO3fu%2FODQ0NC5y20nigKqJOFrGrIoY0pjhBPTsCg4KADBAPmCRd8NR%2BOEo3HKhSyKOks2C7W6QzQaxfd9giBAlESi8ST5XA61GTBVKhYoF6vEIhKK5FHOz6FoJoqqoJsm1VIJVdeQJJFatcL8%2FDwdnV34vo%2BsKoTCEeq1GrVqmS1btyIrKtVqbenkpqgkO7qx6lVURcWp17HrZXzfRzUiSM3ALTMUwvNN8lNjJDufRTQC7IqHJEqsOyUBUkBtPoWs9dER0ZgvVHHcpTi6du3ai6%2B66ipV07RPffrTn75rBXBXbNFYW7kFK7Ziv3ZAK7SA9rLLLvvDkwEtgUfE1JnPzmKYYUSvQiRyEEH1wV%2BghAouTn0AP%2BhY9PVCsUy9bhGOpejuX0dPbx%2FdXZ0o6vGAKgHwXI8gCDBDIQQEYvEEnT2rcH2Res3CMBSsagFZVfE9D9dzMQyTAPA8H03TUVSVIAjw%2FYD83CyqohJPdeB4PsXcPJoiYdWry16mppuku%2FuIJ9Ooqo4gSOiGSdBi7QJUS2XC6gRGLA%2BBxMx0jWRCRdRE%2FLpArb4RWTMRhYB0zCCkK8sea2ho6NzLLrvsDz%2FwgQ9czoqkvGIrYLtiK%2FbrDbTvec97Lty5c%2BcHBwcHz15uO1mCWDSCbdvohoGIgKkeQ4vOg7%2BA1QoQOCrZ8TiTx45QKeXbH%2FnAcyPjjE7OULM80t39dPcNEPguVq0CfoAgStSqFVRFRRAaxSd830eWZeKpNKoZpVxxsB0fVdPxPR%2Ff87Esq1H1yXWJxRMNliyKVIp5ZFkmEo1RyDYk7ERHJ54fMHb0EJOjR3Gd5YtTGOEoqwY30NXTj2fXset1BEHAtl3capZk%2BhjIPvgByaRBImmC51DNdyFqqwGvfU%2BiYZV4RFv2OIODg2fv3Lnzg%2B95z3suXAHcFVsB2xVbsV9PoNVuvPHGbS996Us%2FdDJGq0oCeB6aplEqFNDNEJKXJxI7DJIAogitPHrBozzfTcntRNF1ysU8M%2BMj1KtlEtEwm9cP4rsO9z%2Bym5HJGVTNoKN7NdFYEs%2BpU6%2BWcB0HwzQX5VU2WKqPqmnEkmkiiRTlUhHbsYlEo9hWnXx2DkmWkWWpUQHK8yiXisRSaSyrjiyCJAr4foCiqoSicWq1Koefe4a56fF2mtGJFoo2gqgMQ8eqVSjNZ4kbY6iRIvgiBGBGJJB8vJqC5WQQVQ1OaGFgaDKJqH5ShvvSl770QzfeeOM2VqKUV2wFbFdsxX6tTN6%2BffvQtdde%2B%2BGTBUMFrkWlXCQaj5PPzSMpCmIQEDEPo4QrEEjMz9TxXQ%2BkAK%2BmkyusxvJ8qtUKoqwhaRq5%2BRmyM%2BP4nstA%2FypO25xBleU2wIUiMTp6V2OaIRRFxHPtFilcfD5BQNAsqRhPJKmWi1RKJaLxBOFoDCMUIggCBFGkWMihqCqaZmDVqgSAboYh8Cnl5yhkZ4glU5iRGFPj4xx57mny87NLQBIaQVSxZCcdXX0kE2EiqfHFs6EfQOBTzvcj6L0NVrtMBq2uSiRPArhr1669%2BNprr%2F3w9u3bh1iJj1kB25VbsGIr9mvBamWg4%2Babb%2F5oJpN52XLbJBNROju7CIUjVCplSsUiphFC9aYJJ8ZAkcnnLAqlOqIsge9TyQ9QcaKEQyaGaVApFamWK4iyih%2FA3NQYudlJetJxejqSCOLxKUUQRGLJTnr6htB1A0UW8X3vOGs%2BwWzbIvA9dNPE930kRWmDs%2Bd61CsVDDNEvVYlcG1ESUXVG5WrZFEkEk%2FiuS75%2BTl6%2BlcjaTrTkxOMHT1IpVRYfnWiKCS7HRSzyWrbM2OAU9Fx%2FI1ISuNeLF0pNF7a8wBuJpN52c033%2FxRoKP5G63YCtiu2Iqt2IsUaCUg0awMdf1y2%2Biq1Ogx67mkOzupV%2BvougmuTSR0BNGwsIo2s7NVenpDIPnYxSiFygCxVArN1LFqVTzPxfNs7LpFvVajbrtMT00yPX6YcnF%2B2fObn8%2Fx1Tv%2BgX179xEE4Fq1BgMWhAX4JVAt5lEVDVU3IAggaIYwCQLVUpGOjiSS6FOvFkFosFrf9XDtGoHQKPtYzM%2Bj6XoD9L2Aju4eVN1kbnaaqdEjWLUTg6gccO9fetK%2BT6U4iGR0QrDMAiFonzYCAiIu8Who2evfsmXL9V%2F4whd%2BH0g0f6sVWwHbFVuxFXuRAa0AhG%2B99dY3btmy5U3LFaxw7Rr1ZqlCy6ozNzOD7TTAVhPGCaemAImRo0XqVQfdkMEJKBeH8OUoiioT%2BAGhUBQzHCHwhUbxCt%2BjmM%2BS6uxBUgymJ8YZP3qQWqW06Pj%2F8bV%2FRlIUqpUKdcuho7MHVZYIXKcd%2BGTVazi2jRmJNnv4NIikAHiOi2VZWLaNoal0pBLIikytUmow1sBH1UN4rotdq5FIdVApFVF0tc1eI7EEgiQxNzNOdnrseBCVtxeCCRapvKKPVQrhsx5REliiHwfB8ZMDgsDH8wI6Onvo6elZ8hspiqJu2bLlTbfeeusbgfCK%2F%2FY301ZkjZ9tgSI2750JGAv%2BKjTalsk0EhUXlN%2FBA1zAaiynqQHVBX%2Fd5nYreXkr9p8x7b3vfe%2B5p59%2B%2BluXK8GoawqC5FOp1SgVC2i6Tq1SwQzFwC4RTx9GUDzwJCJhhd5VJgge9UKKfLULJdQonZibm6PoO0RiCaLxOIVCHrtWJdXZhawo2PUaiBKWbVOYn6NaLpBId3P48CEsu865F1yMJEn0rx5ganKCJx7%2FCaefuR3Rcwl8GcuqIckKiqa3ayUHgCgIVMplIvE4CAKFYglFFgmHQ7huE4RdkBSV3NwMoWisnW4UikQXBGUFKJqOoum4tsXE6AjxCEQTj7Aop1gAvIBqeT2imWyw2jaqtv65gI8LArZtYUSSSLJMLBajXq%2BTyy0u8RiLxbpOP%2F30t773ve999rbbbrsXqK88uitg%2B6Kwn1fz7BfIHmRABcIdHR3JzZs3DyUSiaHNmzfv6Onp2ZRIJLrD4XDMNE1d13VZVVVRURSh1YPb8zwcxwls2%2Fbr9bpbrVbr5XK5kMvlpiYnJ%2Ffv27fvkVwud2Tfvn1HZmdn54EyYP9XG1T%2FlGtaefpf%2FKxWBtIXX3zxu5br3qPrOoODg42I22KOaqVMLpdHFGVkSUYXj6FHcxBIgEBPXwykAL8OhfxaBC1CgMfc7DSaYeI5NtVKGTMURlVkrKqPgEgQ%2BKi6jl8sEI5E0QwDx7aYnhghbOgMrlnL5MQ4l7%2B0UeHp3ru%2BTygU4siRI5x7%2FsXkszNIgoASCrGERwoCkiw1KkpFoyiKglWvk8uXMXSZaDSCZdmUizksu44RClMuFjFMcxF%2BBjSCsQRAkFRcK4egPQLkmmvkVs6tTzWXoOr0ExEb6Pq83WmCAD8QCEVi7be6urqoFcap%2B%2BaiTfv6%2BrZefPHF77rtttv2AVPNBfaK%2FYbYi7bF3i8abJsVeHQgsmXLlsEzzzxzx6ZNmy7p7%2B8%2FI51OdyYSCT0SifxcZPhSqeTncrn63NzczOjo6J79%2B%2Fffu2vXrkf27t17FCgB9Z93JZoVsP21UFjin%2F%2F85z98%2Fvnnv%2F%2FEfrSSJDE0NIQsH19PV8sFsrNT2I6H5BTp7XkUNVpt5tU25wHRozq7itnCmRjxBIqmUq9UyM1nEQSRjq4uCCA3O4UWCiOIEp7noqkajm0TjsUaoCYIFHI5TNPANE3mc3l6%2BwbIzs7w3f%2F4OtNTk1x6%2BZUcOvAsqY4OLrzkMhyr2mj4LsmIktRu%2BF4pFjFCIaxaFce2CEVjyIpKrVLGs%2BuEwiZB4FGpe2iKhuu5J7DaBVxUECjlShjBITr6nkBQFmhJAgROQG5mO7Y0hGtX0XQTw9QAAc9b2rbW81wCZFJd%2FQsA2MPdczNH9BvwxOii7X3f9x588MHPvOMd7%2FgkkP9NVrJW%2Btn%2BhoNtky2EgY4bb7xx56ZNm67atGnT%2Bel0Op5KpeRf9HUHQUA2m3Xn5uby%2B%2Ffvf3D%2F%2Fv3f%2FfKXv3wPMEujUbX7c7rOFbh6cZtxyy23vPyqq676VDqdHjjxw4GBAQzDWO4Jo5gv4pfuId49DMFCX2WAW1WYnz6XutRFOBZu%2BFQFEc9zKWRnUFQFx%2FYQRIilOhFFEddxyGWzxBJJFLURQVytVfE9j3Akiu95BL6LEAjUbZtdux4nHovx8AM%2FplIuc8XVL%2BfIoYOcdc759Pb2NLr2BAGuF1AplzFNA0XVcOsVTEMlV6gST3ciCAKe61KtlMB3gIAAmXgyjR%2F4xyfzZqCVIAjYloNVmKUz9QhG8oQCHqJHdbaTenApiq7jug6FfJHxyTmSiSir%2B3sa9Z2b%2BxUA27ZRzTjReGrB6vk52H0TNWUNI8k%2FXPILzM3NjXz3u9%2F94Cc%2B8Yn%2FoOFGWgHb3wBb8dkuBtko0PehD33ot0499dSrV69ePZhKpdSF7OAXvvoRBNLptJxOp9Pr1q279txzz73qsssuO%2Fr0009%2F%2By%2F%2B4i%2F%2BPpPJjAHFX6TEvGIvinGb3r59%2B1uXA1pNEXHqFXRNW5SK06Jv0bgJofnFeq1AI680N0CNZIPNtbAKqFbKxGIRNF2lVCxjOcEJmTA%2BnuuiqAoBYNUtYrEYge8jCAKCrOK6Lqoic%2BkllxBJpAlHouzZ9Sjzc3N09%2FTy1X%2F8Eq%2B74bfInLqlkW9bLiLHY6iaTqlYQBJ8qrVGQ3irVsGqVjCjMSKxOK7rkZubwvcdvLkZQEDXdRAEVFVtMGWgVq0S1cYwovNN%2BbxNO%2FDrEjVrI3LYwPccJEki3ZEimytw4MABXNdhdX8voiThex6IAp7roRsnRCFn7we%2FiuEeIVn9AfPmFYs%2BTqfTA9u3b38r8DAwyYqcvMJsfxOY7QImu%2FqWW2753W3btr2yv7%2B%2FKxqN%2FkpFaheLRX90dHR69%2B7d3%2FjEJz7x%2F4Bj%2FxWmu8JsX7xjFoh%2B7nOfe%2F9FF130EakVGNA0RZGJxyI4VhXfdYkluwhFFkuZeA%2BBdzeNWL4Wq%2FOx8jqF0iVUXJ1oPIEgiRAEOJaNUy8Ti0caDd4FqFUtanUbzQhhW3VMQ8FxHFwXAkFAlGTCkcb2J84bruMQuA6ypiOrOg%2Fceze%2B55Hu7GTs2AiveeONzGezDD%2F9JGvXrUMSIBAlHMvGcx2MUIRaKUc4rJMv1oglO6hXK9SqVYxwiNzcHKIoIokSgiQhSSLhcJRAELALE3R3PooaLTXAtjX%2FCR7F6X5c6SIkRTwecdw4aTzPY2xskmKxyNDgANFoGN%2F3seoW6Z41iJLYZtHs%2BR0oPgFiI%2Fd2JPFhasqaxT%2BB53k%2F%2FvGPP%2F7Od77zM0CRZUtmrDDbFbD9NQDbBT7ZVTfffPON55577o2Dg4OrIpHIC74wWZYxDANN05oNqhuRm5IkIYoiYpNV%2BL6P7%2Ft4nofnebiui%2BM4WJZFrVbDdV84XpZKpeDo0aPjDz%2F88Jf%2F6q%2F%2B6svAOD%2BDT3cFbH%2FhgCjRiLxRmy%2B5%2BWpFsy9IHiHgeCR6K2rdAezmX4d2CQXUG264Ycdv%2F%2FZv%2F9%2Fe3t5TTzxwOhlDkqTGDj2P%2BdkZIpEQiY5udCMMQRGc20GxG6fheI3dCiKl7LlU7R4CXGzbR1J19FCIciEHvossy4RMHUmSQADP9alUqo1awdEIBAF1q052vkxn7yqEps91uZsjiCKlQh5FlpGaXXueeXovGzZmWLdhE9%2F593%2BjVCwQiye59PIrKBVyuK6Dqhk4jkOtVECRJQRFQ5IVpiYn6OjsQhQEHNshFI2Qn8%2Biqjqe51AqlQgbEaLKPpJ9z4EgYVccFF1CkMCtyORzF6FE%2BiBwF0QeH5%2FvJFGiWCpjWXUUWUI3dIJAIt2zQFyojsGu3wK%2FBoIEAdhyB0eSf0ogLG5eMDEx8fTtt9%2F%2Be3fccccjzd96BWx%2FzeWo3zhrstnUtm3bdrz73e%2F%2BXxs2bDg1mUxKL2QBYRgGhmGQSCRQFOUFHa8FwCfb3nEccrkctVqNWu35XTiRSETYvHlzX29v74e3bNny8r%2F5m7%2F5o927dz%2BSyWSyK9LyL18ZaT5PQnMsaTRTwd7whjesyWQymb6%2Bvk2xWGwgEon0apoW1zTNlGXZkCRJEUVRDIIg8H3fdV3Xtm275jhOqVwuzxaLxbG5ubkDIyMjz953333Du3btmqORLmK%2B5CUv%2Ba3lgNZzLLKzM8QTSVRdbzBNx0HXJArz01TFAonUkwhShYkDeRRVpmMwDXYFhLOJdF%2BAXClTLc0jCHU8z6KcqxH4HpKqIyoa%2BWIZXZExTB1JlojFIwQBTcYr4AeN6Pvi%2FDyaaaJpDTk6WEDcAgQ8x2nURtYNPNchFg1z1lk76Oju5Yldj2GaYQgg3dnJF%2F%2FvZ3nb772PwHco5LMEgUAolsCqW%2Bi6yez0JOFwGEVVyc3Nkm624yMAM2SSy%2BUIfBHRzRLtGgVBYORICcty2LApAYFLtTiEZPQ0U31gUVi00GCsnucSCZtEwia1eq3hTw7FF%2F8ItRFwyyDJbXla9WZJ1O5l3nzJok17e3tPfelLX3rjHXfcsR%2FIspL2twK2v0Yg22Kzqz%2F2sY%2Fdsm3btlcODQ1Fftr3dF3HMAw6Ozt%2FIYxeURQ6Ozvbq72ZmRlqtRr1ev2kqkIqlZLOPffcrd3d3Xfs3r37Gx%2F96Ec%2FkclkjvELiFxesZMCrNQE18grX%2FnKofPPP%2F%2BCNWvWnNfZ2bk5Go32qKpq%2FFeP4%2Fu%2B%2F%2FrXv34%2Bl8sdOXbs2JPPPvts2TCMl%2BXzeQzDQFEURFFEkWViEZP8%2FDxTExP0DQw0omcFsB0PXQ%2FhFJ5E6NjH6IF5fvi13UiyxPlXZli3eQOBcC4CYITCGKEwlWKeaimHLLvUagG6GUGWJVRNo16tUihWEAjwgXDIQFUVAj%2FA0DQS8TDZbB6rXkfRNMKRCHJzodkIuIJKpYKmmw31R9Vwm0FUudlJ0h1php%2FZh2PbVMpl1q7bgKbrgI5mhCkV5qmUiqiagiiJSLJCrVojlkhimGEqlTKO7aAbBpIsY1sWMpCIjiKHqgSeyPxcmVQqBGKAXTBx%2FI3IstgA2%2BAE3QGoVOu4ftC4Rl1B1w0EQUBWT%2Bj8U3oWAqspZtDeSWf5X6iqG6jLi13sa9euvfKDH%2Fzgdz71qU99h5Xc2xWw%2FTUC2ug555yz461vfesnTzvttK3P55cVBIFwOEx3dzcnuMV%2BsfqjINDV1ahN4HkeU1NTlMvlk0ouQ0NDkVQq9abOzs4tX%2FrSlz78k5%2F85JFMJlNcAdxf6HOkApFLL7108JWvfOVVGzZseGlXV9dmwzCiP%2B%2FjiaIoRiKRdCQSSa9evfqs888%2FPygUCkI%2BnyebzRIKhQiHw%2FR0d6AbBolkkvn5LACmaSLLMnNzc3TGLCKxQ%2FiBj111qFUt0t0xpo7Nsm7rjQgsPvVQNI4ZjlIqzuM48%2FiujS9qCIKAGQ7j2Cr5XI5oPE65WkGu1jHMBugKgkC6qxvX8aiWS%2BRsC03TCTVB17FtQEDTtbbMLIoigqpjOza6prDzsstAkHn4gfvYecXLFo2PaDxFKBylVJinVikTjUWZtepMjo0SicbQdB0%2FAE3XqZYrlIplehMuofgoiBL5bJ2OjjB9g1FwbaqlIUSjo8lqg0ZpxgUychAE2I6HZobxXAfHsdF1jcAPkE8s2FU50pCP296B44DbXbqDo4mPLNo8kUis2rZt2%2BuAB5tS8sq4XQHbF79sfNNNN73pZS972YcymUzn8zFUwzDo6%2Bv7pYLsyeTnVatWNYMzxk4qMUejUfGCCy44PZVK%2FcN3vvOdv%2Fi7v%2Fu7O1dk5V%2BYKhJ%2F97vffc5FF130pqGhoYvC4XD6l3kegiAI8XiceDyO7%2Ftks1nm5uYg8Eilkji1OpForFF3WBRxHRchAFU4iB4vEQQS46NZLnzpZjwCMqeuo1LoxowGS1QbQRSJxtOEIwmK%2BSy1arld5cmq1wlHwmiahqqq2HWLYrmCKlu4rkcgChC4mIaCh4zruOTm5jDCIeq1GpqqNfNxxQUVowIURSUgQAwcwOO8iy5a1Iy%2BPTZkhXiqCzNcp1yYJxoJMTs7R24%2Bi6wodHR2US6XGB0ZIR6JkowfQdRtPEtgZrbO0GAURJdaLorHRhQpaMZKCQvxsQ3woiCgKCqu4%2BA5bjN420eSFk6hLlQPgSCzWItugK5uHyVs76Osbl50LWvWrNn54Q9%2F%2BNJPfvKT31hhtytg%2B2IH2lUf%2BchHPnDJJZfc1NfXZzwfyJqmSUdHx6%2FUNUiSxMDAALOzs1Sr1WVBVxAETjnllM5oNPqx7u7uoY9%2F%2FOOfzmQy4yuA%2B3ORi3Ug8aEPfejyCy%2B88KbBwcFzJElS%2F7vPTRRFOjo66OjooFwuc%2FjwEQLfoyOVxrZt4okEhUKRuOEQS4%2BBrLD7%2FgPksxUOD0%2FylvdfTm1uiIpTo1I%2BQiiaWlQJqX0cSSKe6iQcjVPMZ6mWCthWnXi4o9kiL0DTNVRdw6rVCbwqvlsnEY9SrVtNf2kAkkipUEDTZHRVpJybR9ENdMNsFJQIjgOTrGiNpgIKzIwfIRLvwAwvFQ5UTSfZ2YsRiiBJMqViAdv1yc7MULfqhEJRUuESRnQSkAgCn9W9BqohEdge9ep6JDNG4LtLu%2FosGFuS3Cj84XkeahP8g%2BZv0LbaFNjzTWZ7ohbduK6uyj8tAdtIJJI%2B44wzXgXcs8JuV8D2xTQ5LhqLQP8nPvGJj1944YWvTqfTy16v3Kxp%2BosC2bm5OXzfb%2Ftlf1Zrnd%2Fs7CyFQmHZKOa%2Bvj7jyiuv%2FN1QKNRxyy23fCSTyYzSKP248rT%2F50FWBuLveMc7zn%2F5y1%2F%2BvqGhoQul%2F4TcYdeL2NUcXR0JdFVgdmYSx7Ho7enG8xwIAiRJplqtMZ%2FLN7q4iTI%2BEqISwginEOTQCzpWOBwmHA5TKpWYnJ4mVq%2FheT74HonwMcbHD%2BO6Aj1dUaIhjapVo5qVsdz1SJqGLPlUirNUy3kisVSjT%2ByJ40RRSXb0YFs1Svl57FoFWdWRJLktB2uG3gDdeo1CqYpIo0h%2FPB7Ctl2qgk8iEUOWZVRVoVqtUSzU0I0wqqY1%2BaBAvV5DFgN0wyCfr%2BCTpVopEU%2BmkRVt6UI5FGFVKEK5kCOXnUEQJQwnBI5NPP4UguaCLyErIrKqQ%2BBSyycJ5DWIot%2BAtxMikNsWBDiOjRoEaKpKvVpCFKuIooSwkNl6VfBtllDj1v8DD0WyiEjPUfI2LPp0YGDgove%2B973n3Hbbbd%2BnUT99xVbA9kVjKjBw6623%2FuUFF1xwdTweF%2F%2B7JGPXdZmfn6ezsxPHcRo5gP%2BF43V0dJBMJk8qLafTafnSSy99za233mr%2BwR%2F8we8DI%2FwGphb8FyXj0Jlnnrnm5ptv%2Fv0tW7a8WlVV86d9z3Nq2LUcUcPF1ET27H8cXddZ17cNXdfJCTbVeglV7qbueo0AGwlURSARM6lUKoBDENi4dgmpXkTTdKZm5smVBTp7BzEjz78gjEQiRCIR8vkczx08TG%2FERl43ysHHJynO1cjPl0n3xrn4qlPBylC2dKqFLJGQjmlqiBIU5ycpF3WiiTSqZizDJg1SXauo1yrUq2UEUcBxPQShkZ8qAIYRQtV0rFoNkRqu62MYGqGQcTx6WRSIREI4rku1WsGqVTFCDdC1rBpRU6daqaIaIQwzhG3XOXroORLJFPFU5wkSbnPREUtgRqKU8vMUcnl0ZRw9loVAPE4whQDfEqjXNyKFw41Un0Xgehwri8UKgiRiWTZCqYQoy6hmBMeuoKkKi6pkelajkpUgnBy5NYlu5QdLwDYWi3WfddZZrwAeaI7VYGUk%2FnrZr2uLPRno%2F%2FSnP%2F2XF1100UmBNplMMjAw8IKAz2mmKpxoy723ZHxpGjMzMxw6dIj5%2Bfmfq7ScTCaX%2FTwej4sXXXTR1Z%2F%2B9Kf%2FEuhfaVz9goFWATr%2B9E%2F%2F9M1%2F%2Fdd%2F%2FY0zzzzzzT8NaE3FpjS1m%2BzIgxSm9iFjtVNIBEFY5AttPS%2BqqiJJEn6z%2FJ8oiu18bUVRGlWPRBEIcO0KB%2Fb9mJFn7uHA7q%2Fz7FMPMD1x9HmvIx5PsGbNGqq%2BzdGJWbZddCqe55PojHLVG89HCToo1QapWxYCAcgalZpLqVRr5IyLPvNTx5geHzneju4E040Q%2BWKZ4X37UBQFz7UbDFcQ8AMfURAwwmFCkSR1OyA7XyJfKDX8yM174gcBsiQTjYYJmSpWpUguO4csBgQEOF6znV8Q4DouCBJWvcb0%2BAjlwvyygYOiKBFLdtDdN0CicxpB8iBYCHwelUIXqIPHFVthMQltdi7A8wOMcAxND6FqGr7vo6laY2GBiCQuM7UELA%2B0ggiiiuQWMNyxJR%2F39%2FdftHPnzgEWtSFasRWw%2FdUG2lV%2F%2Fud%2F%2Fonzzz%2F%2F6uUijgVBYGBgYImsGwQBtm0vO4BLpRKHDh1qFyOfn5%2Fn0KFDTTby%2FBaNRrFtm4ceeohIJPKCWe0LKXbR2dnJwMDAsilJ0WhUPP%2F886%2F%2B8z%2F%2F808Aq1YA9%2Fll40wmYySTycGvfOUrn77%2B%2Buv%2FOpVKDZ70C75Dce4wkeAIKbOCZ5cRRRFZlhv5pr7fLmyiqmr7%2BWrlWu%2FZs6f97DiOswSYRVFEEBodZ3zfR1EU6vU6%2B%2FY%2BxQ%2B%2F9Q%2F830%2B%2Fn%2F%2F98Xexf%2B%2BjJx%2Fcoki653Tmsxdz4LDI2S%2FZjCyJ1IsVKuUN2OhopokZiaCoKkYojKKFKJYt6paND1SrNUYOPUt2emzJwtJ1Hb7%2BT3cyPT3NTx54kFAoSuDaeC1wFoRGuUZRIByNEkumUbQwpXKdUrGM7zVycwMafl9VVYjFwoRNhbBpUipWMcIxBAF836NarRKNx9DMMJKskc%2FnmB4%2FSq1SXF7aUmdQzNklZRm9moxlb0JSteNgu7BiVBMxBUHAcWxyc1nqtRquY6MoCkHg4%2FsBQeAvLofplsC3GqC6GHmblaoEkHR82ybiTy85366urvXXXXfdtTTSyVZsRUb%2BlZf%2FUh%2F5yEc%2BcMEFF1y3HKNtMcLWBHgi2M7Pz6MoCslkchGAGYbBzMwMjuMQDofZt28f%2Ff39jaR9Gmk6JwNRQRCwLItEIoFp%2FlQ1knK5zPj4eFsu%2FmlmGAZDQ0OMjIws6UwSj8fFCy644LqPfOQjMx%2F%2F%2BMc%2FlslkZlkJwDjRty8C4euvv3777%2F7u73561apVZ5xUURB8TNWB%2BgRT8wc5UpQ544wz2p1uWgDbYqstl0ELMD3PY3Z2ltHRUe666y4uuugiuru7CYfDbYBugXVr0ed5HkEQ8MwzzzA%2BPs7U1BT1ep2ZmRkOPvsBYvE0r3zDuznr3J3Ls9zEAFY9zbMHf0Tm3DXU8wkCeYh6pUo0nkQ3DFzXxXNdJFlEN8NkZyYxTINEugvbsshl5yjMz5Hs7CGe7ARB4PFdjxFJphAVhe0XXkwoEqNWq1OtFDHNRoELUZYboNuUl1VNa8jEtYZPV1UkQqaBIB5vZaepaqOmsaZQKxUQIjGseh1JUVAUtXEvVRVBFPB8n%2Fm5GdRSgViiA1XTW6shcB84IeeVRgu9Qh%2BStopGsa6W4iucOGhBENBVhXrdhiDAjERxLIuZyUlkRUDXTwgmC%2FyTS9Kt3asiFH0EI4aHiHTCUBwcHLwE%2BDxQ%2BXUfp7%2FIKoS%2FitWpft2YbfSmm256%2FSWXXHLTcsFQsiwzNDS0LNC2mABALpdbsoo3DIOtW7cyPj7Ol770JeLxOJs2bWrva35%2BnvHx8fb2%2BXyeUqkEQKFQoFarsWXLlp%2F6UMzOzvLII4%2FgeR6RSGTRduVyGdu2T7KKV5e0VGtZOp2WL7nkkptuuumm1wNRVmwRfgLxD3zgA6%2F8wAc%2BcOfzAa0uVVm%2F8RRW9a%2FB8zy2bNlCIpFY9JsIgoAkSW1W2mKyLQAdHR3l%2F%2Fyf%2F8P%2B%2FfsJh8OMjIwwOztLpVKhXq8vUjNak1G1WmVkZITR0VEOHTpELpdjZm6embl5bNtmdmaC2z55M%2B%2F%2FvVcz%2FMxTy567pofo6buGsbEMI6Mp6p5AtVqlXCxiW%2FVGYQxVRZZVSqUituOgaiZBECArCqmuXvRIgtmpSY4c2k%2BpVODAt7%2FJhvERwj%2F5MaP%2FcidHh5%2Fm%2Bz%2F8Ho88%2FDBWswxk4Dm4toWAQNDsDRsEAbppYoQilMp1CoUytVq9gUmC0O49G4mYhEMapUKWcrlIJBJpL2ocx6ZUzGNbFopq4DguM5OjzM9O4LpAcBCCQzQqZrYGeIBT0XC8TYiKzPO6RQMI%2FIBYPEp3TwdmSMf3fVzPwzAUYpEwgnhCSpJXO0E%2BDhb4b5sAroDthvGUFFV%2F6Vjt6ek54%2F3vf%2F%2BOxSe%2BYivM9leLqejpdPrUq6%2B%2B%2BiOrVq0ylmO0g4ODy4JRC1gFQSASiZDL5SiVSsTj8UXbRSIR6vU6XV1dnHHGGYvKL4ZCIZ566ikOHTpEJpNhbGyMwcGGCjk3N9f2Dy8Ez6NHj9LV1YVpmliWxcGDB%2Fmnf%2FonOjs7Of3007Esi2q12gbyVCrF2rVrT%2F5jyjKDg4McOXJkCcNdtWqVcfXVV3%2Fkm9%2F85uNzc3O7%2BPnm8y2sBaw1qYTC8VrArbV9K7djYQ1gm0b0pd38%2Fy9zSSoByU984hO%2F9bKXvexPNU1bVnaoFGfpCNeZn5nEintoHWcRDjeidTVNa7PXIAjaz1cLNFsst%2FVqvffbv%2F3bHDp0iMnJSSzLwvMaAVOu67aZcKuW9pEjR6hUKliWRaVSIRaLUa%2FXyVcC3GwRUxMxDIORw8P84ftez9vf%2BSGuftWNy15wqvMcpicnyD93iFA4RL1ew5m1MMwwge9TqVQQRIFEMo0RCrfHRkAjMtgIhSgXizz2F3%2FKRbkZetJJ1IjK7PDj7Ln7O5RPOYPImvUcOvAsB54d5upXvIqQaVAuFZEVDVFREILG81%2BrlEmkUoiSRK1cxrLKGIbaLvHoewGqphLxfSams9SrVcxQCFGSqJbLhMNRbMvGdmxC4QhWvcbY6ATd1Tk6uh5uNlIQFg50qoVBBKP7OKuF5SOQhcWLYakZCCXJMrquoxsarnfCF93SAoa8MEBKaB0eq%2BqCGMZXEpTLAZoqoIrHH3nTNKObN2%2FeCfyIn29UcqsYi958tep1Cyypl3WiBk7QvGGtet215rn9ssfrCtj%2BCgCtDKz%2B5Cc%2FeduGDRs6liTnN320J2uVZ1kW09PTeJ5HoVBg165dJBIJrrnmmkabrqY999xzjI2NcfXVVy%2FpFWqaJlu3buWRRx7h85%2F%2FPEEQ8Ja3vIVEIsGTTz5JOr249kE%2Bn2dsbIx0Os2TTz7Jrl27iEajXH311QRBwN69e9tg3mJO4XD4p9ZjlmWZgYEBjhw5srh5tiCwYcOGjk9%2B8pO3ve1tb3sDcPi%2F0DGolRbTGrzmq171qsHTTz998%2BrVq7emUql1kUikR9f1mCzLpizLiiAIEuC7ruu4rlu3LKtYKpVm8vn84fHx8X379%2B%2Ffe%2Fvtt%2B8Hqs2FgAU4w8PDwS%2FomZGA5Gc%2B85l3XnHFFbecLG%2F2R9%2F%2FZ6zCUbZv385HPvIRbr75Zl75lrOQJAlZlonH423WurAGtuu6bR9s63ewbZt6vc6VV15JR0cHtm3j%2B37bz9ta%2BLW%2BEwQB1WqVYrGI67rk83kkScIwDFRVJeRZVOoQDcltF4YmB3z17z%2FD%2Ffd8k3d94C%2FoH1i%2F5Jq6enqZn59vstcmCFXKlEtlRElElhWU%2BHFG3uoHGwQBoqww%2FYPvsH52nP7MRo5MzXLP0we56cKzuDwW5et7HiG05XRO2XoGz%2B0fplqtEY7E6OkfIp%2BdwbZqSIpKrVJrFMhQFIIgIByP4zoO1UqJer2EaejtYha27aDKCvn5eUrFAtF4nFAkTK1SxfM9ouEE0FB%2BNFXHkJ9EkOYgWMhqfeqFMA4bUSWBwF9KQhFOlvsDfuDjex6yLFOreyyvUgacWDXq%2BAAMGM9K5Ooe6xIhfEHCRSZveXQai3fW29u7g0YnsuLJpOSflsq3oNJZCDAB4w%2F%2B4A%2FOPuWUU87v6ek5LRwO95qmmZBlWRNFURIbsp7Qeg6bz58fBIHveZ5jWVa5UqnMZrPZg6Ojo7t%2F8IMf3Pvd7353rAm8ZaD2y8zpfzE2UnnRd%2F1pPlTpj33sY7deccUVN0QikSXSeCqVet4c2lZqTrFYbDVv5%2F7778c0Td7whjeQTCbxPI8777yTUCjEtddeu0giPFEWfuyxx9izZw%2FVapWBgQEeeeQRXv%2F613PGGccVyoMHD%2FL0008DsHfvXs444wyuuuqqtpRdKpXakllLTq7Vau3uQj%2FNZmdnyWazS94vlUr%2BD37wgzs%2B%2BtGP%2FgEw958p69i81xoQe%2FnLX752586dF3Z2dm7u6uramk6n12iaFvpZf0%2FXde18Pj86OTn51MzMzNNPPPHEQ1%2F84hefAgrNgez9goD2o9IyOSTlUp4v3PZRnn16NxdeeCFvf%2Fvbeec738lll13Gy1%2F%2Bcg4ePEg2myUcDvOSl7yk%2FVvKskxfXx%2B1Wo0DBw6QSCTIZDJ4nse%2BZtRuX18fruu2F3kNyTTS9tm2gNP3fe6%2B%2B26eeeYZqtUqY2NjOI5DLBZjfn4e13UpVR3ChoztuDgeREwVRWmUTPQ8jze%2F%2FcPsvPI1y96H7NwcguDT092FXbew6lUikRC6pgECluOhm6GmH7QhidZLJcY%2B%2FWec3ZmAkMlXH3mSR0Yn%2BOAl59CTTjA7Nsm96QGkTRkEx6VWqxFLxFnVtxpF0%2Bns6EAWA0rFAmY03k6dKRULyJJMKBzGsizq1QqS6BMKmQgI1Kp16raL4%2FnUa1V0TScSi6HqjS5EVr3GzFSW7liJVNfDiGpwnNUKgO%2BRn9oK5hmIokfQqKKxFCuF5ee6cqlCsVwjQEBXJRKJCF4gk%2BpcdXzDw%2F8XRr4I0jLDQPA5MGtQMTvYkFxDoftGHp9RyFd9zuq0T1z8V770pS%2FdcNttt32Hk6TsLQe2zUWw1gTq6Dvf%2Bc4zL7roouv6%2BvrOjcVi3bIsqyddTfwnzfd9z7Ks8tzc3HPDw8Pf%2FZ%2F%2F83%2F%2BSzabnQdKQPXnOV5%2FFrD9VfTZ%2FjowW33btm3nbNu27brlgNYwjJ9arEKWZTo7O9vRyevXr2dgYIAvf%2FnL3H777bz1rW9FEAQef%2FxxTj%2F9dA4cOEAkEmHVqlUsx6LPPvtszj77bD7%2F%2Bc%2FzD%2F%2FwD1x99dWccsopi7Z76KGH%2BMlPfsKOHTu44YYb2pJza5LVdX0JmJ%2FIpp%2FPOjo6lq02FYlExG3btl23bdu2f9u9e%2FddTSb5QlisCcQ%2F%2BMEPXnLBBRfc0NfXd%2FbPsxawLMtqOp1em06n1wKvuvjii63Xvva1ex9%2F%2FPH%2F79Zbb%2F1WJpOZa66g%2F0tst7lgiH384x%2B%2Fsclol4yB6ckRPvsXH2By%2FGgDlLJZHnnkEVRVZf%2F%2B%2FQwODrJ7924cx8FxHM444wxkWcayrLZs3AqYazFU27ap1Wrour7IxxsOh9u5157ntWVbURTZtWsX3%2F72t%2Bno6KBUKrWjlltSczgcxvOyjbS0JrDIsozv%2B9RqNSRJ4guf%2FVMOH3yat737T5dKyuk0MzPTjI6OsnbdenRVIpmKt59jzbapVMpY9SqGGUELmdRyOSSrDqpCMV%2FkviOj9EVC%2FPu%2B5%2FidS88F36M%2FGSey6RSyU5OAQKlUpJDP8ZMH7%2Bf3b%2FlTPNclly8iCSJWvYaqGQgIzGdnG511YnEUVcWq1SnkiySTMUJhAztfRhVlBHQ8z2dudgbdMIjFExTyBUKaRCTyHKLmgb8gWFH0qM0n8KX1iEKA6zQaNIiiiICwDMNdCryapqLbjUIkuqE3lYwTcCvwoAXiy8jJobBCJCrgCGEQFSwXHF%2Bg7gnoUrDgWFro1FNPPb8pJdsv4JmWWuPzDW94w9brr7%2F%2BbYODgxcZhpEQfkGsSBRFyTCMWH9%2F%2F1n9%2Ff1nXXbZZR%2BenZ09%2BMQTT%2FzTzTff%2FNVMJjPfZOa%2FMHVqRUb%2B5crHIrDqXe961%2F8cGhpaUvJG1%2FVFftLWiqcl3z0fePX09PCe97yHr371q9xxxx10dnYSiUTYsmUL4XCYWCyGIAjtSTQcDrcZieM4SJLEq1%2F9avbu3dvIzWtGLfu%2Bzw9%2B8AO%2B9a1vcd111%2FGKV7xiSYSy67ocPny47WdejkG3Jt7nk5UHBgY4evToku5BQ0ND4Xe9613%2F86abbhrOZDKHTsZum4M4fOqpp67%2BwAc%2B8I6BgYGd3d3dGeGXIGvIsqz19%2Fdv7%2B%2Fv337RRRe9d2xs7MF%2F%2BZd%2F%2BeK%2F%2Fdu%2FPZXJZIqA%2B58dxM2FQ%2FgDH%2FjA1VdfffWfLScdV0tZ%2FteHfwtVkejo6GBiYgLLspifn0cURY4cOYJpmoRCIRRFoVqtMjExgSRJ7ajhliLRCpbyPI9SqUS1WiUWi2FZ1sJJa1H0cUvZePrpp3nooYca7LVUavt0W%2F7dZDJJrVbDa0qbqii2%2ByS3pNlK3UOV4Qff%2FmdGx%2Bf4sz%2F%2FmyX3pLOzi6nJCQ7sH2bThrXtY1TKVcLhEPFYBMu2qVYKOLZF1apj%2B41yS3cfOEqHoTPYkeTxo%2BOUiiVc20YwTZKJGB3JBKFInLu%2F9y1GR0Z4%2BSuvR5ZlfvidbzIxPsG6jZu44MKLmJkaRzc0JKkDSZbbkcsIArIiI4oipXIFz4OQKSOLAYoZJfA8ivkcE6PHkGSddDKLHjkx1Qd8S6Ba3YQSiVCqlPB8gSDwUWWxWWQjWKr8CovnDEWRSaUTbfh0LGvRYYBmgBQnRDYLbcz1rYCoaFETIzi%2BhON7CEDRFtGNxUSwu7v7DBopQIWf4j4LAelPfvKT119wwQVvTyQSQ6Io%2FtIDXyVJUru7u0%2B58sor%2F%2BzSSy%2F94OHDh%2B%2F5zGc%2Bc%2BsDDzxwIJPJ5AHrNx10X%2BzRyNH3vve9b964cePm5dhqf3%2F%2FspKQbdscPnyYxx9%2FnCeffJIHHniA73%2F%2F%2B%2BzZs4eDBw%2Fy5JNP8vTTT%2BP7PjfccAOapvEf%2F%2FEfnHPOOZx11ln09%2Fe3pd2JiQmq1WobaLPZLM8%2B%2ByyVSoVUKsVll13Gnj17GBtrJLE%2F%2B%2Byz%2FOM%2F%2FiMveclLeO1rX7sIaEulEjMzM438yHSaiYkJnnzyySVgWS6Xee65535q71uA%2Fv7%2BZWXnjRs3bn7ve9%2F7ZpaJTs5kMlImk4kAq%2F%2F3%2F%2F7fN%2F%2Ft3%2F7tt84555x39%2FT0nCL8N%2FgPUqnUwGmnnfbGW2655Wt%2F%2F%2Fd%2F%2F4lMJnMKEPsZ8ob1V7%2F61We%2B9rWv%2FfRywVDlwiyP%2FugrKLJIIpGgo6ODwcFBJEkiFouRTCaZmZkhCALWrVuH67ps3LiRer1OvV7HcZw2O12YZ%2Bs4TjunNhQKNaJaXbcdxLYwgKrV6Wnv3r1MT0%2FjOA7T09PU6%2FU20LaYcC6Xa1ShkmUMwyAUCrWLr5imidTsDe8H8OjD9%2FDB9%2F%2Fusjelu6cXD4mjIyOUS2UqlTqyESFXqOC6HqqqEo9HkAUXsyONcMrpzI%2BNU7BsPnjhmbxpx1Zesm6AI%2BMTzAQiXWedh%2BsFTE2Oc%2BzwATaespn%2BoTWcsvV0Djw7TCgSZUMmgySLfO873yaZ7kbXdCSpUfAfwHYcSsV5ImGzIbnbHrIsIojgCxKKqqLqOh3dPXR0ryIRkQmFnm3Qh4VTuuBRzXcjaIMg%2BDiOix4Ko%2BgGfuCfXFNtuV%2BDoNmPl%2FbvGpyskI1Xfz5dk1BEQdFlEEysQMZxG7m9U1VpOWVq47p165InmaPF5vgc%2BJu%2F%2BZsPP%2FbYYw9fe%2B21n0ylUmv%2FO4D2RNM0LZTJZF7%2B%2F%2F7f%2F7vnu9%2F97r9cc801FwAdmUxG%2FU0G2xcts81kMnJ3d%2FeaCy644LdTqZS0HDM9Wd5rOBymq6uLI0eOMDo6iiRJFItF7r77bgYHB9sBRtlslnQ6zfbt2ymXyxSLxUX5tOPj4%2FzHf%2FwHmzZtQpZlDhw4wO7du%2Bnv7yeVShGJRLjyyivZtWsXe%2Ffupa%2Bvj4cffpienh6uu%2B46qtUqlmWRSqXaFaZWr16NLMuk02nOOOMM9u3bx%2BTkJENDQ21G%2B9RTT5FOp4lGf7qKK0kSPT09jI6Onghg0gUXXPDb%2F%2FzP%2F%2FyNTCbz1PDwsNtkfiqQ%2Bou%2F%2BIs3nnfeeb%2FblHVfkKmqimmabQlclmWEJnMTBQHL9rhv%2FwzD0zm6kgZ2vojoVFjdEaUnqv3U%2FZumGd%2BxY8c7vvzlL1%2B7d%2B%2Fer950001%2F1cwb%2Fqk9fDOZjNLd3d33e7%2F3e5%2BJRCJLilTnshN8%2F2v%2FB891Oeecc%2FA8D9d16ejoIJfLUS6XGRgYYGRkhFKpRDqdplQqEYvF2r50x3EWLZ5arNV1XSYmJgiFQu3AqZZc3ALnFvjWajWOHTvGsWPH2pO74zjU63UURWkHYs3NzbXveSuITxRF%2FKARiCVJEpoiUrN9HBckEZ7a9WP%2B6EPv5H%2F9xeeWKjm9qxgfPcbkTI54PIahKHiqhCRLBH4DFBRVQXZsOl%2F2Kob%2F70Fev64PXdegWOZlmwYZPjpG8fKXIQQBxcNHqNZq1Gs1BCGgI93B%2FNwM1WqVXDZLtVJB0zUsy0IzTDTDxIzEKebmcOpVSsUiYUNDVhTy%2BTyeF6CbIlbdRQ9HwfeP46EPIfUwWrQAC9NphACv2ihgIUc0CFxkSUKWZOqVCmLgN9vpnYRwCZzUxSmIAr4fnLiSbwPropSfJngnEhAgghjBQ8DxAiRRoOoKeAEsVKUTiUTf61%2F%2F%2Bh0f%2B9jHDnM8c6Dlk%2B342Mc%2B9porrrjiQ8s9y89nM1WfmarP0aJH1Q1w%2FQA%2FaEZhLXM5ogCSIKBKEFYEVoUlukyRtCG%2BkLlHHhwcvOCTn%2Fzk937nd37n7t%2F6rd%2F6g2bP7fJvYoOUF7OMHH3LW95y4%2BDg4KoTPwiFQoRCJ4%2FVEQSBdDpNMpnEtm00TWNycpJ6vc7ZZ5%2FNunXryGazHDlyhGeffZbvf%2F%2F7zMzMtAE3HA6zf%2F9%2BvvGNb%2BC6Lk8%2F%2FTQjIyOIosjg4CBdXV2USiVSqRS6rrN9%2B3aOHj3K008%2Fzfe%2F%2F30uv%2FxyUqkUx44d48iRI4RCIZ544gnOO%2B88Vq06fjnRaJRoNNruW5rNZnn44YfJZrO84Q1vaEuGP81a9%2BPEaleDg4Or3vKWt9z4qU996s%2BaUk%2FkDW94w7brrrvuf5xyyinX%2FLRVsiRJhEIhYrEYqqahLJdWFQRttmIaEhdu6eHZssvug5PEwirYGg%2FvGkeQBK684Aw6ZRvTt9E4%2BViMRCJd55133vu%2B973v7fjhD3%2F413%2F5l3%2F5w0wmUzjZAG66G5Kf%2Bcxn%2FnjVqlWnn%2Fi5XS8xN%2FIop23d2lYRWiBn23b7d1y%2Ffj3PPPNM%2B%2FlpBTW1FmAtX3srZaflEmhJwalUirGxMTo7O9v%2B3Na2rf2MjY3hui59fX1ks9kGgPo%2B9Xodo1m2sPVqMdkWO26lGxWrPn7gI4lgqOCL4FgNhrvr0Xv504%2B%2Bnz%2F92GdO9MHR0dnF3MwUoZBJPptFVRrStNyUdiVJwtQlHE0m%2Frq3sOv%2F%2FTXnayqoKmOj4wyvWk9gRJm59z7K5QqWbbW%2Fl4hNUCzkOCWTQdmwEdcPeGr341z%2FxjcvUKOUZqODRt6v71o4to0oySiy04A9SWkvOgShETjllY4R7jsMonRC7K5HpTCEaKxCwEMQhUZxp8BHliXwXDy38f7yQMsSv%2BvxjxuVrxaZElsAugujkoPWYMADAj2K5fgLvh1QskXimn%2BiG%2Bg04GvDw8P1pooTe8lLXrL1lltuua27u%2FtUXkCw00zVZ6bm89Ssg%2Bv%2F5%2FJ0gqDxzLgEWB6U7IDJSjOmQIC4JrIuLtFpiqR08fnmCWndunVX3HPPPRf%2B5Cc%2F%2Bfzv%2FM7v%2FO9MJjPdXCQHK2D7K37e3d3dg2efffZrIpHIkgeuu7v7hWnoooiu6wRBwNzcHENDQ2zcuBFRFOnu7qa7u5u%2Bvj7%2B9V%2F%2FlWPHjjE8PMxdd91FPp%2FnwQcf5Mwzz%2BSGG25AkiTK5TLxeBzTNNsSIjTSitavX88PfvADHnroIeLxeDsqWVVVHnroIZLJJBdccMGSCLtqtcozzzzDgw8%2ByJo1a9qNDOLxOHfddRe9vb2sXr2aVatWLSqAsaxU2N3NoUOHTgQt4eyzz35NV1fXHdPT02Mf%2FehHr33FK17xp5FIpOt5tVhdJxQK0dHRgWU3BvHJgHbhj1P1AnbnLBB8RifmsLsSqJJMX0cSX9HwZI0pNBADtMCmiyqhwH4%2Bn%2FQ5N95442lDQ0O3vfvd7%2F6bTCYzwwkBGU22HvqjP%2Fqja7du3fqGJefo2RSnnyIWDdMI4qStXLT%2BBkHAj3%2F843Zu7d69e%2Bnt7W1P%2BAtzbF3XZXp6GkmS0HUdWZbJ5XK4rtvuQTsxMUE6nW4HS7WelxZo1%2Bv1NmPN5%2FPtY7SemVakcatiValUQpIkbNtGAHRVoFCBut%2BYMGUJVBnKtcb%2Fn9n1Pe774flc%2FJJXL%2F5dDQPNCGE5Lul0uuFPLFdQJDANHVlW0FQNXQBt0yaKOy5g%2FIkH6enqYG%2FJ4tn%2BENXHHsOxrEVFYURRJBKJkO7qxfMDTF0hEosTv%2BxydH25Rgc6HT2rcepV8rk5JBH0sEGpbBGORRsyriDgez52pUw6fgwlXD8hKMrHLpo4wabmvakDAo5lIwhVJFmm7jgUy5Xmb38SKbnFbpeJVF4iJ6udJ2rYx%2F8KQN3GlWT8SIyq7S%2F6PLcM2KbT6Y2AlslkdKD7S1%2F60gfPOuusm5pRxSe12VqDve6adn5hSbB%2BAPN1n0enGuec0kU2JCTWxmUk4aTKl3HRRRe974EHHrj6z%2F7sz97xwx%2F%2B8IlMJlP6TWG5L1awDb%2F5zW9%2BQ39%2F%2FxJQiEajL4jttdjLwijQNWvWLOpP6TgOIyMj7Ny5kze%2F%2Bc185zvf4Uc%2F%2BhGxWIyrr76aVCpFEARtBrpwcimXyzz11FNMTk5SLpeZn59ncHCQLVu2sGHD8Y4flmVx0UUXLQHaQ4cOcc8995DP57n00ks57bTT6Ovra8uVY2NjjI%2BPMzc3RzweJxwOP286lqIoRKNRisXiiXJ715VXXnnTueeeK59%2F%2Fvk3yLKsPR9D7u7uXnR%2FVVVGcHxc12uwhfaqOGhUvGtOKBU34L5Zi0Njs9SnZnn9jk18b%2FgwFhIFT2DLpjSCJCB6DXJSETT2VQW%2B8w%2Ff4xXnrOHMrYMnuy7jsssu%2B9DXv%2F71Uz%2Fzmc985P77738uk8ksDMaQt27dOnTVVVd9ZLn2eLvu%2FxrZmWPIstzOk23dx9a%2FRVHEsiympqbQdZ1sNsv4%2BDiyLC%2Bqh9zy0bZ85JZltf2preet1YCg5aJo3SvHcahWq6TTaY4ePcrRo0fbTQnqTtBIV2myxIXBWJIkoaoq1VodURBwPHA9MDWwHKhaoCkNwJVEGOjWOfvsszm6%2FyE2nXIGXavWLPYVdnYyOTGOaYaIx2Pt0orFUhVNdTBNnSAQ0GSBwZdcwfQTj2DM5zhqRJgp5PDrdSRZabxEEcM0WNXby%2BZTT6W3txtN0%2FFcj1Ixj%2B86TI%2BPkOrsQVbUBeMyIF%2BuoqkKHT2rqVVK5OenKFcqyHrDTSGJIsViBV2YIZwYP97Vp01qA6qlNchmB7ZdpWp5SJKCF4ggCDi2hRmOUK8UT4geZmmJxWXUZEEU8G3nBGdlRxNrFyJz89%2BCCF6VIBAQ5RD1qrdou5q7dOzGYrEhINnV1dX7z%2F%2F8z3d0dnae%2Bnzz2dGix%2FC8y0z1l1%2FlMVv3eXjS5%2FFph9M7FFZHJcKKcLIYjHWf%2Bcxnvnvvvff%2B5Xve857%2Fm8lkZoaHh%2B0VsP3VMxHo2LJlyyuWazLQ1dX1gnd05MgRisUiW7duJZPJoKoqc3NzCIJAKpVqrS7p6%2BsjHA6zY8cO7rnnHt7whjdw4YUXcvfdd3Po0KEl9Yuz2SwPPfQQ%2BXyeTZs2YRgGBw4cIJlMcskll7SBOZVKMTQ0xJEjR9pgW61Weeyxx%2FjKV75CrVbjj%2F%2F4j1m3bh3QCIw6duwYnZ2dDA0NMTQ01GY4LyRuqaurqw22CyZ48aqrrnrTaaedFj6pDKRq9PX2YCwo8NF28QSgKhKO62E7LqoiL5LaANwAnirYzM8XefDBJ3nreRs5e2Mvdz9zmLLvgi%2FQkY4hBgE%2BAV4QoAoiU4UK%2Bdl57vj2FN%2F%2B4eNcd9XZbD5l9bLnuGnTpmv%2B5E%2F%2BpPd%2F%2FI%2F%2F8bZ9%2B%2FY9l8lkWilN8Q9%2B8IO%2Fn0gklnxx7PAeKsUZVFVty7iO47Tl3XZATDMPdmZmhnq9jm3bPPnkk21QbUUR27aNbdvtHNpqtcqaNWvYtGlTu%2FqY7%2FtYlsW9995LoVDg4osvZmBggFqthm3bOI7D1NQUtm1TLBZRFIWQLrd9yIqiNPyxzQ40rWApx2tIe4rUYB1WEwcc97hLUmimuxSLRXp7e5k68hOi8RRGaHGN30QyxfTMDKZpoKkqumEiqypz01MUi2VisQiGqBPu6Sa3epD5557GGTgV1Q3wZQkv8AiHoqxdu47169fT091NOBxq%2B6oFUSCWTOE6LsX8PIXC06TSXe22eYIgMD45w%2FRsljM2byAVj2KEIpjhLNmZCSrFHLoRIbAqxBKH271q26goetRzUTxxfeN%2BWEEjoErVCVwXz%2FcImsVEEJaXkBcWd1iW8S7bPi8FkrEYbBfiru%2BDYIIo4fmLVZ%2FaCdyuOa773v72t7%2Fune985%2B%2Fruh55Pqn44UmbvPXfr8g6Pjw27bBrxuHMToW1cQltGaory7J2%2BeWX%2F%2BG3vvWts6%2B55prfy2QyY8PDw%2FUVsP3VMv1Nb3rTJQMDA0MnfmAYxk%2FtqGPbdjvgZd%2B%2Bfdx777286lWv4rzzzmt%2Ftm%2FfPrZv305%2Ffz%2Fr169vs91wOExfXx%2BFQoEgCFi7du2ydZYVRWHr1q0kEok2sA4NDTExMdEG5lZh%2Bp07d%2FK1r32NPXv20N3dzZ133sn3vvc9tm7dytDQED%2F84Q8b1YJCIe65554lBToWXm8rMOZk96BVfaharWLbNjMzDaA5GdAKgoAajvLD0YDX90jozZSW43POcX%2BsIkt4vk%2Bl7mCoMmLTDxYAIzWPQ7MVHnvyWaxylXufGuOZ8RyyKkO9yqkbNxAyFDw%2FaLRo8wI8OWDvvucQvSqKKFKu1PmHr97DurVxXv3ynaSSS4PDVq1ate0LX%2FjCN%2F%2Fu7%2F7u9774xS%2F%2BGPBuuummc7du3fraE7etV3JYhaOsWrWqnRu7UPFoTbQLSyz29vZy99134zgOPT097QhgURQpFAptmbdWq1Gr1ahWq5imydTUFMlksh0pfNdddzE1NUWtVuO5555jYGCAarWK53lomtaObm7UAHbaqUSt82il9rT8uYIgoMlQd2i0pgsENKXBcJ3mSxSgN0X7fNauXYvvOVSzz2GEzlriJijkcxQKBVKpFLIsUquUCUeiIIjM53Oo1SrxdAop3UF2v0C4swv36Cgd6RRbt2xm3dohNM1AVjR000QQxUWyayPQSyTV2U2pkKeUn8Nz6uhmlEgsSWbdAN3pOPlCkflcjr6eLmKJFLFEknx2luzsHGFpAiM6u5jVCgG%2BDZXyRqRIHAIPQYDcXLa9Okx1dCJpBrVKBd%2FzoL1YDdq9doPAJ%2FADpAXVvRYyXiE4LiW3O%2F%2FIERAN8KtNgA1O9FngiyoIYtOTKywAKYGaK2DIDd97c44Kve997%2FtjSZKWdYgW7YBjRY9dM86v3CTtBw3QfTrrsrVDZmNiWagR1q5de%2FkDDzzwvWuvvfZVmUzmEI0CNsEK2P5qWGTLli3XxOPxJVrxC%2BmoU6%2FXyefzqKrKtm3bCIfDfOtb3%2BKBBx5o%2B2sfffRR7r%2F%2Ffl7xileQyWTaxS5isRiqqvLYY49x6aWXsnr1aoIgaDccaDGgE2Vl13WJxWIcPXqU%2B%2B%2B%2Fn7Vr17ZTSfr7%2Bzn11FP56le%2FSjqdZnp6mje%2F%2Bc1cffXVCILA97%2F%2Ffb72ta8xMjLC0NAQV155Zdt32DpmsVhsp6T09PQ8r%2F%2FWNE3y%2BTwzMzPIsnxSJUDTNVb19aPKMperFR4dLXHhUAxNkRbMO4tXrJIooipgux6a0pBgvSDgYL7KM8%2BOcGz%2FCOF4lAoCB7JVRASiiklvZxLfD5o1cwUkSWA%2BW2biyafQNRHH9xv5D6LD8N6D%2FKO2ite9%2Bnx6lKXKUzwe77%2Fxxhs%2FK4ri%2Bz%2F%2F%2Bc%2Fve%2BUrX3mzoij6Er%2FWsccXdehpycAtEGuB7MLSialUis7OTkZGRhb1oB0eHubxxx%2Bns7OTl7zkJY2812ZktuM4lMvltluiUqkwPT3d9uFu2bIFy7KwbRvP84hGowRBQL1ep1gstgO2TNNcJFP7vt%2Fw0Tb9t5IkEdgetidguw0ZWRQa0nEQQDICnt%2Bo5Tw4ONiOGq%2BVZ9m35342n3HhYn9hRycTY6OETBPDNBFFGd%2FzkGRIpDooFYtYdkBNDzPlQb5WZ%2FOpm7jwvHPo7u5qs9h6vU65MI8kqWihUCOPdgHoOo6N7zrE4428dauap1YtEook6Ugl6EglKBSKeK7Xpp3xVCfReAdedTeC7C4uyyh41AsdoA4hCA2pXVUUkvEICOA6LrKiEAQwNzNNKGQ03D6VKr7n47l%2BA2BFEd8PkF0L02zm4goszqMOGgvO9ihQ4iAbYJdplN0%2BUYf2wW%2F8noGwlE5XXQEFh7m5Oer1ekvRWhZoh%2Bdddk07eL%2FisFR1A34y6TBS9DinRyWqCsvJymu%2F%2F%2F3v33PzzTe%2F6v77738ik8lUfh0B98WWZytu2bJlcOPGjeedyCg1TVtSKSoIAvL5%2FKIo3FAoxNDQEIODg%2FT393P22WczNDREKBRi3bp19Pb2snPnTjZu3MiPf%2FxjPvvZz3LXXXe1g1Y6OjrYu3cvR44caU9%2BExMT1Ot1Jicn2bt3LyMjI%2B3C8S150m8WeR8eHm5XEmqtmBOJBIODg5RKJYaGhrj%2B%2ButJp9OkUile%2F%2FrXs3PnTnp7eymXyzz44IPcc8897N%2B%2Fn9HRUR544AH27duH67qkUqmfuuCIx%2BMUCgVUVaWnp2fZbRrnM4TalEmH0iZTRYuRbBVvwUQpLKOuKZKIpkjYjocbBDxXttm7f5qjTx5ElE2MqNnIcVAUar5LR08nEUNpJjIGzdxHgeG9R6A2D9goDkh%2BQ2eTFI3B007jQE3nmfLycSLpdHrorW996%2Beuv%2F761%2FX29l54ohRYnDuCa1fb8nsLwFqlElspOwsLU7SAt5W%2B04pUfuaZZ9i3bx%2B1Wo1CodBWDRRFQdd1xsbGkCSJfD6P67ptJqqqKtdccw3hcLhdEcq2bcrlMvV6nVqt1o4EVlW1LW23%2FOWyLCPLMqZpomlao1iL25CRXQ%2FqNtgupKOgq41XKh5uy9WthcLc3Bz3fe8r2FZtqQoSilLIzZOfm8aqVRFlifnsHLPTk6iaQjSexOztY7RcYWDdel5x9ZX09HS3I6MbxVxUEvEIqgLV4jzVcrlZ%2BVEASaJWLaPrElJT0lVUFU0RqZfnmB0%2FQq1aIhaLEg4vzi4QxREUYwICedFs5tVl6tYpyLrZ1s8FQSQcNolEQo0gNq9RlCOVjJJOJ3AcB8tyUM0YkqKhGCHMSAwjHGmn99i2Q75QplS2KJfrze5E%2FuKGH0qsUaox8I%2BPiIWDRJQQnalmGz5hCfOt2o32i47jLKoot4gseAH3jtk8OvWrD7QLbbLi8%2B%2BH6if1J4dCofRtt9327euuu%2B58INQMbFxhtv%2BdEvLmzZvPTKfT8eUk5CVShu8zNTVFIpFopwItlFlb%2BY2vec1riMfji4o%2FBEFALpfjvvvu49%2F%2F%2Fd85cuQIq1evZnZ2FlVV%2Bfa3v82qVavagTN9fX2YpsnY2BjT09M8%2B%2ByzDA0NsX79ekqlErt37yaVSvHqV796UXqP7%2FtMTk62S0B2dnYuGsCiKLJ161a2bt3K%2Ffffz3333Udvby8HDhygXq%2BzY8cOMpnMkg5Fy1krUtbzvJMCbUdHJ4lEfPGaXBB47WmdfGt4hkRIIR3WlviIg4V8VxBQFYkns1XuO5jlycefxhIhkQqjKAKuH%2BB5DiFDY93q7kbRgCDAw0cSoGY5TB7ej6jpiI6LpbhojoPj%2BoR7e4h0xnF8l2lHwvFkTo26yMKS4JKe3%2F3d3%2F3DbDYrdXV1teV%2Bz7XITe5rg%2BxC9tr63U9kua3foQW2lmWxf%2F9%2BzjzzzLZLQhRFqtUqc3NzbXBs3euOjg5mZmbwPI9wOMwVV1zRaDPX9IG7rtsG%2Bnw%2B305tkWWZYrFINBolFApRq9Xaz6goikSj0TZwAuTKBSRRwNQC6jYYGsTCOiHdxjAMYrEYQ0NDRKPRRtELSeLgwYP4vsve3T%2FmzHNfuvgexuPU63W6U904VhnPtTHNEJ7v41gWtVKBxObTufyPP4GeSjE9M4%2BmqkQiZqO%2BsnDc56kbOpquUavWKBXmUTUDzTApFQo4qowsNQpVzM7NIwgSity4n%2FO5HB0dHYSiSTSjBbgeOA%2FSaEKzgNUGNpX8AILe3yyduFDWDBD8440VBEHCa6bZVqt1zFAUSRIRJBGrWsV1HALPbzS4BzzXQ1YNZFXFqVWazRmEhgzdOgVBagRJVQ8tPwAFETGoE9RzGEqc43lKAZ7rMTUzR7fmLluMB2Cu5vPAuE3BfnGSPi%2BA7x61OLNT4ZSUzIkZV7quR%2F%2F4j%2F%2F4X%2Br1%2Bqu%2B853v%2FCSTyVR%2FnRjui43Zhk877bTLE4mlDoDl5NBWsYo9e%2FYs6QMbBAETExPtIKjlqiyJosjatWvp6%2BvjwIEDPPbYY4iiyDXXXINlWdx555186UtfYnZ2tp3LunHjxnZ7vGeeeaaxqpucZN%2B%2BffT29i4CWmhErO7atYsjR45w9dVXc9111xGNRikUCkvOed26dWzbto1XvvKVXHXVVdi2TaFQQBAEZmdnF5UBXG7hkcvlGB0dPSnQrlq1imQqgeV6SxL2VUXijFVRvjk8R91Zvsb4Qlm5FgQ8m7UYfvIQ5XKFcCREJKygegJyIOBbNXo60xim0mDLQUPmFEWRw6PTFCdHUWjkiCr4%2BJKPWK%2FQtf5UZEVqRy3PWCKP5RT8YNnrCYmiyPz8fHsBUytOtDvzLGSsLZWiFQHcerVAsPXvaDSKIAh0dHS0865byko4HG43hh8fH2%2F7%2BFu%2B21wu126RtzBHt7Xoa0UZt%2Fz6rdQhURTbro%2BFiwFFUUgkEm2pORFuMHRTEwnpDSbb3d1NV1cXhmHQ2dnJ2rVr2bRpE729vRw%2BfBhFURrBefUJXLu65PmvVKq4fkD3qiHiyQ7CYYNYLIphmMzPTuMCUiyOIIikOrqQVZ35fIlsNodt2Us6H4VCJvFYCCGwyU5PIooSRjhGvlRjanoWUVbRdJNKzUbRQ9Qtm1q1RGFuguz0GLbtgb8fgqOLgRaXwO%2FB5kw8v1HDuP08LpjUJVnCdR1c10FsB2xJyM1yqoqqISsykigiyRKyJLb9tJIkIQkijl1vFGvBJ%2FBPGAtKsslsFwZJHc%2B5lYQqgjWLIErtJarveZQK82h%2B7aRAO1P1%2BfYR60ULtAtt14zDj8dtrGWouaZpkY997GP%2FumHDhk00OoqtMNv%2FjoXB6tWr0%2F39%2FWecGAC0UJJdCKajo6M888wzPPHEE1iWxRlnnNFOk7Esi4cffph169aRSCQWBaG0vl%2BpVOjs7OSd73wnIyMj5PN59uzZw9e%2F%2FnX6%2B%2FvbxTBmZ2dZt24dp59%2BejtI5pRTTuHb3%2F42%2B%2FfvZ%2B%2FevTiOc1JfaqstXiaTQZIkDhw4wNjYWDvIqsVcYrEYW7ZsIR6Pk0wmOffcc%2Fnxj3%2FcjmKNRCKcddZZJBKJJfeiXC5z9OjRk1ad6uvvJ2Q2OqwYqoJlu8iyiCSKbbFrMBliW8lh32SJ03qjqIv8twv8obbPrtkqe%2FYeJD86jhE1qVWK5D2HcCoMjk9INxjq60LyGk0xHXxkESpli333P4CiiPiI4IPoi%2BD4aIkkG7ZsRfAatYPcwIdAoOj4PJ5X2GzWMLXFj3Rvby9HjhyhUChg6gpP77qrfU9aqT2tiOPWa2GA1MLaxYIgkMvl2qUS4%2FE45XIZSZJYs2YNoVCIXC5HrVbDMAwURcE0zXZhi3A4TKlUar8vy3Lbn9sCXUmSSKVS7YVT67cUBIF4PI5lWQiCgGmaVCqVdt3tluTcYsQ9PR2oqkoikaCzs7Ot8KiqimEYZLNZDMOgv7%2F%2FeHpTZQZZHTzB7RBr92MOx5KYkRi1cgnbsbEdl%2Fx8FlmRqVUdyuUSsXiceCJFvVolO19CVSXCYRNd1wiaAXCCIBAJh7AsG0WLoigqsqzg2DayolAuldANA9e2kWUF2xNxPZuwqpEf30VH96MIsri04pF6EalV6ynmZ6mV8iiKiKJqS4LfcnPzIEA41PCDEwSNQKdm3IFkmICA5zp4btPBGoDv%2BaCArMiNtLamv3wxWnSwpH9fq8hFICAGNUQr20h8RiDwfaqVEoYzz9ZThpYdm%2Fvm3F%2FJIKj%2Fio0UPRwfzu1RlqQIGYYR%2F8d%2F%2FMd%2F37Fjx85MJnPk1yUt6EUFtgMDA6vT6XTnTwuMyufzHDlyhLGxMQYGBjjttNOYmJjgrrvuYmRkhE2bNqHrOo899lg7xcd13XZ0brVaJZ%2FPY5omq1evRtM0uru72zmTO3bsYPXq1TzzzDOsXr0ay7L427%2F9W0477TSuvfZaenp6GBoa4oorruCb3%2FwmDz%2F8MJs3b17UYm%2Bhr7m%2Fv5%2BpqSmeeeYZyuUy2WyWnp4eJicnMU2zLZGbptkOugmCgPPOO48NGza0039mZmbYv38%2FGzZsaF9Xw99kMzY2tojNLbTu7u6GzB4cF4MVRcKyHXRVaURrNhnC6atj%2FMvuSVIhhcFkqB113LKCG7ArW2f%2FwSkOPHcEJW5iajrj03mqSCjVOooik8lswNQVXK%2BRbygGAaIsMXp0kurkKIomg2Pj4%2BLgIzkWgxe%2FHC2q4dgeBAFi4OM32rdwLFflgX%2B%2Fl%2FffePniCbjZy%2FjIkSNMlSeZnp5e1FmnBbAtoGpF%2BC5sDNCSeVvRwaIoMjMzQzQapbOzE0VRsCyrHdBULpep1Wps2LCBzs7OReAtyzKHDh1ienqaZDK5KL%2B6dVxFUYjFYhSLRSKRCNlsFlVVsSyLUqnE5ZdfzvT0NKVSqc225%2Bbm2ufc3d3N6aefTiqVIpfL0dPTg67rRCIRkslk%2BzuGYaDrevv8KtmDmLFVCOJxxqgoSpuRq6qKKErkCwV2P%2FoTTj3tdAzTQJFVbMfGsizKpRKB5xFPpdF0nbnZWYrFMtFIiFg8giLLBEDdsnB9gVCTrRMEqJqGY9XxA5%2FACzAME0VWsB0Hu14nFo6ga88gyIUTgqIcEDeDsB4BiCU6CIVjFHKz1KpVVE1BEhtVsFRVpaszhSA0FrkBIAoN0KMVVRw0FnOiKGEHAZ7vIUkintcssRkIzM8XCZkKnncCDqipBcx2Ia0Wjqso7iSB3xjDllXDKUyzc9vAspPeQxM2B%2FIev442UfZ4YDzg3F6V2AmBU9FotPfuu%2B%2F%2BymWXXfbqTCYzPjw8%2FKJfbcjP7t%2Ff%2BvfXgfuA%2F%2F2req6ZTOasRCJhLBfQs9Av2eozeskll7RTMzZv3sxzzz3HzMwM4XAY0zTp6enhO9%2F5Dh0dHe2o0HvuuYdsNssFF1xAMplsg9PExAT%2F8i%2F%2Fwvbt27nxxhuRZZnDhw9z%2B%2B23k8%2FnOeuss%2FjmN7%2FJnj17%2BNjHPkZHRwebNm3ic5%2F7HBMTE1x77bWsXbu2zXIaE5fYlqrvuece7rzzTnbu3Mnll1%2FeDpw5MRBsfHycyclJMpkMoVBokXze09PD%2BPg4hUKBWCyGLDfyM7PZLPl8fkk%2BcOvexePxBui07qEfIAlgaOoy0rrANad28MWfjPGmsxVSptpWBBwf9hUdxsazPPrIHvAl4vEwiiSTdjqwfBd86Eim6ElHcJuFGQQ%2FQEIkX6nzxE8eQWqyU19qMFsFD8wQ%2FesH8ZrSkx%2F4%2BD6Ivo8sihx65hAP3vcQa7vCXHvlOUvcCYl4nIce%2BzodHZ2I4nFps3XurQVLC%2FBa4NiaIFvMVhAEnnvuubbca9t2O2e5FX0biUTaQNk6fntFPzLCrl272gy0u7sb0zTbTLu7uxvP89iyZQuPPfYYlUqlLWW39qkoClu2bGkHOLW6TCmKgqZpDAwMsHr16nYltdZ4aFWtai0sWqystX9JkrArs2iR3sX4oartZ0oURb72T%2F8fq%2FpW8ewzT3P%2BxTtx6hUkWUQUJYLAp16rUZifRxBF0p2d7cIxU1NzGLpKItEoPKNIdQqFHIYZaoCwH1Cr15BkGateQ9d0wtEoE2OjxOMJAusIRsf0Yo4gQOCK2N4mtAUJbLKikupcRb1aplSYw3VqqKqGJIlIhtYG1cBf8Dsvij9oFK6oWw6u1%2FDPBkGA5%2FvoRhjHqoEg4rsnJMgafSDpSwtltN26EpI1jhJYeK5DfnaCK7b2slxl1H1z7n8ZaA1NoTMeYWR6vqFgdcQplGuUatZ%2FyySeijb87tliI2h1uurzk0mbi1apGCcEXvT29m674447%2FucNN9zwgUwm85%2Fqvb0A15az3wL%2BHvgr4OZfNrNtRddc%2Bzxge3rz7xMA%2B4eH4833ntiUyeT3Dw8PAvnWe63vbMpk7m1uf3rz8%2FimTOaJ1v83ZTJHX8D%2Bjm7KZIqZTOaacDi85AleWNFIFEX6%2BvraZe0WOeg9j9e97nXttntnnHEGn%2FrUp%2FjiF7%2FIxz72MdasWcPhw4cJgqANZi3Gkc%2Fnufzyyzn33HPbx1u7di2%2F%2F%2Fu%2Fz2c%2F%2B1keffRRXvrSl%2FLkk0%2Fy93%2F%2F97z61a%2FmW9%2F6FseOHePUU09l586dTE1NMTY2Rn9%2FfzudyLZtKpUKXV1dDA4Octlll7Un6ROBdmRkhN27d3PKKae0g2sWsiLP81i1alWbfUGjSMb4%2BPiyAVS6rrfBOmgGkciCgOD7BILAyequhQyFV2%2Ft5D8OznP9pjQRrXE%2FKr7P6FyZvXsP4rs%2BqVSCpKZR8z3i0Si%2BU0OPqGxau7odMOAFQSNp0Q%2FY85NdOPPjIIv4rg%2B4iFj4VoXe7RchR0x830MMguOVk0Wo1OocfPgxFAXu%2FLcfkVnby4b1i2tYpNJpegZPZ37iaUKmvqBm%2FHHZeKF%2FsQXEJ%2FambUXx5nK5NhNu1SlutGJT2u%2FF43EURWnXLPY8r91NqhVNPDMzQzKZpLOzk1Ao1M61jcfjrFu3rn3MDRs2UC6XKRQKVCoVXNdldHSUNWvWIAhC%2B3nQdb1dhKVVrSqVSrXPKZ%2FPEwqF0DStnTqkNxuwC4JAvTCyBGxN02RmZoru7m72PrGbeDJJKBIlc8oWItE4WdtiamqMVb29WLaNrhsIokitUqFaLhFNJFBVjSCZBARy%2BQrhkEYqFcOq28znipihCAEBgSDiOQ7hUBirXsf3AyRZIqyLaPJ%2BRNVfXJZR8KgVUhSqHlptkkgshbJg3OhmGN0MUy7mqBSySJKAoiqLoNV1fTRBWKbQooDnuRjhCKIo4TZLa0qiiCdK%2BL6H550AtuZAIyLZry8IiQlaqwKgjmKNoflVSvkc2wfCmPrxom2VQGHaMwnbOXbNOPQ088kn54s%2FM7i1MggkUaQzHmEyW%2BS%2Fy1R5qbI2VfF5eNLhgl4F9YQ5Z9u2bTd85CMfefjjH%2F%2F4PwJlAQZpvBbiytEmhg228KaFGyf8%2B2jz3%2B9rfv%2FLCw61aL8LvtPCs%2Fwyl3PJgv3GF7yeeL4AqVcC32x%2BaXCZ7W4HbgT%2BBPgfzRP4OnAx8KMmMN7Y3O7i5md%2FBVy7f3j4rxYw5%2FcBf7J%2FePjrTWC%2Fff%2Fw8GDzht2%2BzP7ax3jve96zIZFIrDkRQE%2BMQm5NhssBbavyUotRJpNJ3vWud2GaJvfcc087l%2FLUU09dBGb1er1d07jVJNx13Xawy2te8xoOHjwIwDve8Q6OHDnC2972Np5%2B%2BmlWrVrFdddd1%2B4YMzo6imma7fObnp7moYceor%2B%2Fn0suuYRIJEKlUmFubq69fSul5NFHHyWZTLJx48ZFbKlarbJr1y6mpqYWTfie5zE3N9e%2B3hP01UXBWoIgIAmtBuQnLwzSmpBWJU2MqsNdI0Usx8UJAnbPVXli3yHGJqeJxkxCEQULEBEQJRdEj60b1xMJK%2Fh%2Bo1pUYxIQmJwrMLZrF4osIro%2BIn4j2NQHxQix4cyz8YVmBHngN7LmfQ9RFBifzlKYG0WSNEQc%2FuzP%2F55Dh8eWnPspW8%2BlUnMaFYSW8c%2B2%2FKYLP1tYPKJdQELTcByn3cGnBcqtZ0%2FX9bZPtrXvFnsyTbMN3oODg4iiSH9%2FP11dXe26yC3ZurOzs52O1tvby0UXXcRVV13FmjVrUBSFrq4uPM9DFEW2bdvG5s2b2bp1Kz09Pe2FWqvtXxAE1Go1ZmZmGBkZYWZmpi0Pl8vlNjMncHHqhSVSfLlYZGL0SMP3GgSsHhiie1UfjmPznf%2F4Bvuf3kc2l8d1PQzTQMAnmU4jSRKzU1Pkc1kMM4RpmkTiSaqWx3yu0PB9igJi89pbgU3VahVNNyjm8yRicWTvAEZs%2FgSgDfAskXp9I6FYglI%2By9jRgxTmp5fULQ5HE6R7BpHVEJLUWIS02KckCUsqRbXjEAIozufIz2dxbAu1ObcEfoAoiPjNZ%2Bk4unc1KkktioYWGu339DSkL8XoOJOYaNGlVOnrWqw25XyNui%2FyRFFDVWTCpk7Y1NuMsCcZbYNmZzyCtGBcq4rc3q5lEUNvs8iIqZEv1zA1hUiT3auK3Ab0Fji39tOqBhcxtEX7bW3%2FQrZ5vkVATzLaPo%2FRksdPJpcqxYIgCNdff%2F1n%2F%2FiP%2FuhV5VLpbU0Munb%2F8PCPmpv8VRM7BoH3NbGjhVkAe5oY8ldNnDu9BczN91pM96%2BamLRwvye%2BxwJy%2BqPmfm9fsN8fNXHreZntjcBfN8H2lSew2xajvXnBif0J8NubMpmj%2B4eHn2x%2BB%2BDLmzKZb%2BwfHr4EuLnJUFsnmt%2BUydzc%2FOzaTZnMn%2B0fHm6tKN63YDXwxIIT%2Fuvm%2Fujo6Fhrmqb%2F0%2Fy1JzNd15dtUNCKDP32t7%2FdDni64IILFoGZpmlkMhkURaFWqzE6Osr09DTj4%2BOcd955ZDIZ3vGOd3DrrbeiqioXX3xxO09WFEV27tzZDDaJt4v4t6xUKnH06FESiQSKorSDqnK5HKVSqc1CPM%2Bjt7eXl73sZUv9Og89RLlcZtOmTYvKzJXLZaanp5dltTlfQ5TlxSv5EwLEfD9YVAlqkQdKELj%2BrFXc%2BdgI3wl8REXg0GiWeL3GFZvX8cxcvpnY4KIgUHfqbFq3jnQs3JSCfUSvsZ9i1eLRH97TYLquCNjgiCi%2BQ72cp%2FfiK4nEwrjNDjd2AKLnIwpgOR7P3PcIChYeChKgOBJf%2Brtv8PGPv3vxsxIKs2bTDsYPPUrI1BYFQJ24OFvYBm%2FhZ6IoLgp6UhSlDWatzxVFQVXVRZWeWmB%2B7rnn8sgjj5BMJtmxY0e7ElU%2BnyeXy5HP59vRyZqmIctyO%2Be25RfO5%2FP09fUxODjI3NxcuxNVpVJpgFkk0l4s1uv1doP5Wq3WDujK5%2FPEYjFc18UwDHzfp6Ojg0KhQMk%2BRN%2FabYvVjHCUfL7AwOp%2Bki95CdlcIzp65MghfM%2BjajvYtsXuxx5l3YaNbN16GoV8FkmWSHU0imDMTIyRSHeiahrRWALXdZidm0HVdDzXbdR2dh1EQURV1WbHHxFdstHMAwiK2AhW8lv1hj0quT7QBvE8m7rjE08mKJdLFHI50t29mKHjk74ky8TT3Tyx61ESyQTJWBjPaxwjCBrML2i27hMEAc%2F3URQZgQDXcdENA103mJmaxLYterrT%2BM3WiO1sBlEFYwAqRxas9OuQ3MGT5uv5x7ExCnaF5OyDvOWMS5eMS89n2SjdNoilYoRNnXK1jqGppKIhho9NLc8iFRlJFKg1a3fGQgaFSg1VkUlGQ5TGZoiHDHpSMfKVGjXLoa8jzvCxacKGhipLTM4X6YhHiJga2WIFQ1NIRUNMzhdf0DbLWWciQtVyKFfrrOlNMzabJ1uscKTokcy6bE7JJ87d0tk7drytXC6nDMP4V1mWgyarvaS5yW8vUENfuX94%2BN4FePLbC3Z1GvBnTXy5t4ljNPHnjAUguxDz8suA7W81WfHfN3Hz9ubfbzyfLC0uYLKnLZCST0Txowv%2B%2F0RTCl74Xqu4aptqb2q0bFsUt3SSf7eOcV%2Fz9c3m30XbFQoFzTTNJX3zliuXeDJrFQ1oTYzz8%2FM88cQTpNNpNE3j9ttv57nnnmPPnj1MTU0t8vm1pOOW9CpJEocPH2b37t0AXHPNNZxyyincfvvtqKpKOBzmzjvvZM2aNWiaxq5duxgeHmZ2dnZRBON9993X9tP97d%2F%2BLXfccQd79uwhn8%2BzatUqTj%2F9dNasWcPs7CwHDx5kfHx80TXdf%2F%2F9HDhwgHPPPXdRtPPCgK8lQVm6zjFLbSb3L2%2BSJGK7XrtnKCdEHAc00igy%2FXEe3n%2BMQ6OzPP7YXk4dSHHupm58x0MLQPEFHKvGqlW9rO7vxG6Ihfg%2BjTrIAux57AmKo8dQcJFwkRwfHwsHGyXaxdrNp9PK7fEDEAnwBZAlmZGjY0wfeBJRUpCat7WuOBydnOTe%2Bx9fcl2nnnYugWjief4itn8i4LYidBc2JmhFn7YWP9VqtV0EoyXlLwTlVipP6%2F1WC77LLruMl73sZaxfv77dMcpxnHYzgomJCarVKtVqtQ3YrebxrWjnUCjE2rVrWb9%2BPfF4nLm5OWRZXtTAvhWQJQhCG6hzuRwzMzOUSiWmpqYYHx9v%2B%2FknJiY4fPgwT%2B%2F50VLXQThEtVbH8QM0TaOnK025kCOXy1IqFenu7SUWS5JMppibmaZQKtPZs5pwOEq9WkbTVJIdne0c4iDwEaVGlSXTMKlWK40azJJMJBrFMEOUyyUS0RiKsB8tWsa1YGqs3AiQk3zcqorjbEJSVQRAlhqpT0YohuO5lHPTzE%2BPLirYceDZYZ58YjcT4xN4gookNxc01SKVUgHXbSycHNumUsxjGjrpjhSJVJwgoAnAEulUDEVpBF25zgn%2BT3NVUzIOGgxXS%2FK0eT0f3rubWiXLd5%2F4Meeu2rBssOLofIWa4zE5X8R2XMrVOuVqvc1OAWbzJSbnixyenMP1%2FTajtB130XbxkEG%2Bcvza42GDfNNfazZdP4amUKpZRAwdVZGxnUaN83LNasdsmJpC1XIwNAVTU9v7fCHbLGdVy%2BHA2EzjGibmFrHgXdPOsoUv1qxZc%2BFcNhsaGxv7SRMfvtzCpQVY840mkN7YxJFLmoB6MVB4HmhYDo84iXTcwruj%2F4nt28z2lQtQeaF23dpZawXwZPOk88A39w8P39684D8BXvV89PkF2Jeb32%2Ftb8nqoG5ZcigUWlKicbn82CAI2sA6OTlJMpmkt7fhh5qcnKSjo4N4PI6maWzYsIEdO3YwMzPDQw89RK1W48knn%2BSRRx7hiiuuYGhoiFQq1Q60EgSBaDTKeeedR39%2FP3%2F913%2FNzMwMb3zjG3n%2F%2B9%2FPn%2FzJnzA6Okq5XCYajbajTePxOLlcjt27d7NhwwZWr17NV77yFX70ox%2Fxute9junpaSYmJjjvvPO44IIL2qUBW23YrrzySr7xjW%2Fwuc99jpe%2F%2FOVs376dZ599lqeeeopLLrmk7XttpYP4vs%2F8%2FDyxWGzJ%2FQmHQhhFh5LloZ1EMhaaEcgtH1XbNxxAwfGYtnyyNYeDBQtVhGK%2BguJ7fG%2FfQWRdJ2TKyIKM7VlEEmk2relvTj4%2BXtAozYgkceTYBEcffQhNUXGo4uMj%2BiCKPn61zJbXvI5wMoJru01pMGjI0oi4nsv%2BR59A8WUUwKGG4ykgWYiewz%2Fd8W0uOPf0Rc%2BIrCgMrD%2BDkf0PEDL148x9gRR4os92YSCV7%2FtEIpF2Qf%2Benp724qm17YkgvTDq2bZtdF0nnU6386hbHYdalaxaTQcWBllVq1UqlQr5fL79HBcKBYrFItVqlSAIqFar7dQeVVXbwFsqlRgdHWVycpJSqdSu7qSqars1ZIuRt4KtSvkZIvHOBeOskZJj2zZqOEwxV8aqW%2FT19PDm37qJJ3bv4kv%2F77O86bffzjN7n%2BTHd%2F%2BAzaefydr1G5BUjXqliO86eIKAJCuN6PmJCXRdw7YtFFXFcWwURUWRFfKFApqmYUhF9PARkGWmx6ocHKtxQbcJvke1sAbR7IHARZQkBBqBapquI6s6pUoVVbbJ53Ik012Eogn2PP4oGzZuon9gkHgixf6n9yIIsKq3i3qtQqVcaC5QAkKGgqYdb1LhB80FmCKjN%2F2soijgWHV0YwEPMNeD0JyqAhfMfr45m8MLSlwT244QL7CpZ2lDjUbHHpFu4%2Fkny3z5OJCVq%2FVl%2FaAtqXZyvtAGWtvx8Hwfz%2FexHQ%2BjKSePTM%2BTbPp2S7V6%2Bxh9HXFURcZyPcrVOqamEjY0Ck0gfSHbLGfl6vF%2BA6Watah5CcCDEzZXD2mL%2FLeCIAj9%2Ff0dB5577rzu7u4ndF3%2FkwWY1SZ4%2B4eHjzZB9uamy%2FPeJji%2FbwEYxk9wl%2Bab2y787p88z0%2FwzSabvXkBbr2gAKn8CSf91wuQmgVU%2FMYm4P79Aip98QI5%2Bb4FAP3lE4B04d%2BFK4L7msFP9zZv0sVN%2BfnepsTc2va%2Bffv2pd74xjdKSxnY0getVTrRtm127drF9PQ027ZtQ1EUstksfX19nH322YuazPf39%2FO6172OI0eO8NRTTzEzM8P3vvc9PM9jw4YNbNq0Cdu2qVardHZ20t%2Ffz8TEBPF4nIcffphK5f9n77%2BjJDmvM0%2F4Fy69L2%2B6qqt9tUcbNAwBNEA4kuAQNBJFIxKiNFpqv9FwqE8Sd6TVSPyOZnZnR0OK0nxrhnOWlChDUTQARYqkABAN02gQQFsA7bu6qrq8SZ%2BR4WP%2FCNOZVdUASJGieHbec%2Fp0VmRkZGRk5Pu8997nPk8D0zRDIC2VSoyOjhKPx5FlmY0bN9Lf38%2BVK1d47LHHsG2b8fFx3vve93Lq1CmuXbvGe9%2F7Xh588MEwNa5pGk899RSZTCb0zv3Od77Do48%2BypEjR%2Bju7uaee%2B5h%2B%2Fbt4WdfWlpiZmamraVjZY27q6uLrVaFK0sqncnImjVZAU%2FIolXcomE5vFo1manq6E2N85PTzM0tomsmA7kORob6uTo1QQ4ZYjITi4s8%2F%2BQk%2F%2Bv%2F9iFkScR2PMazY0NEFlgq1Xjh208g2eBgeQVax%2FZafepNcpv3MjgyjG2ZCHjKUzIumguiJHDxlXFmL54lITpeksaBGCq2LQEOTbPBU%2F%2FwLPe9vT1dN7xhlEuvPkeSdneXlQzl1gg3qPuDJ%2Fkpy3JoFtAKtAFoBwse0zTDlG5w7IGBgdBHOchCyLJMPp%2Bn0WiE7OZWXWVVVUNf3Ewmw%2BLiIlevXqWnp4ddu3Zh2zaNRoNqtRq2hrXeR7quY9t22JMd1Gt7enrC2r2u62G9v7g41Qa2AJFYnEathlarkkinSaaz2JZJs1Fnx66d9PX1UatW6O3rp1Iu8fyz3%2Bf8a2eYnprkkV%2F9%2F5CMJ6iUl3BcB62po%2BlNCoUC1WqFRDKJqqpkMhksy6Sp1unu6EAWn0dJGmDJGIbNjo1ZJMXFqCQx3W3IsuiZDQDRqIKmNtC1JrZlY1gu8USKZDaGbuo45SW2bd%2BB2tTo7RuguLzM5YsXSGXSiLJMMh4jk0mA4yBHFN%2BUwEUQ%2FUyFK%2Fp1XCGslYuiiGWsiGyTIyAqfguRAI7GQDTJRHWZc%2FpVPrBG%2BrhmuJxYMIlHoz9UlNLakrQyhRxRpBCYs8l4W9Rba2rkknF0y6bW1Bn2a8cBSAaA3JFOeNF1U6eQSZKOR5laLL%2Fpfd7w%2FEWxTQIWPIOFi2V7VTo5m80mHdfdWa1W5VgsdrcPriuB7nMtQPrHLRyjX%2FIBt3WfP2vBt0f8be9%2BHQxrze5%2B0serx3z8XP9mwPaLaxxo5Rj3c92tq4gvrvj7yFrPBY9b%2Fh9vCf%2BPrHj9kRsc7whwZyQSEd8M2CqKQm9vL5Ik0dPTw9jYGBMTE5RKJV555RXS6TRbtmwJa5kB8cWyLK5cucJdd93Fnj170DSNM2fOcOrUKZrNZijPGChD1Wo1Nm3axNatW8OJ95ZbbiGRSHDq1ClmZmZ4%2BeWXeec73xkC3cDAAB%2F%2F%2BMfp6uric5%2F7HEtLS8zOzvJrv%2FZrHDhwIPw81WqVr371q0QiEW6%2B%2Bebw9Q8%2F%2FDCyLHPp0iU2bNjAiRMnuHjxYjhhPvfccywuLjI8PMydd9656tr09%2FfjAn25GJfHyyERZE0Lz6AVRnCpu3ByqcnYbJmFYpGxK5Oo5TpDXV0ULYuS2qAnl6Avk2W%2BWgPJYXq6wgd%2B7UFicRnL8pzMHddFFMCwHF48%2BiJaeYaYJCOaXluQiYWDl6rbcec9SKKAY%2FvFLMByQEagUqtx%2FIknvFqtJCLaOlIQFWODZuMoCn%2F9l%2F%2FAXQ8cblslpzM5Ovs2UV%2B%2BQiIebVM4WjkCxnEQoQalhGg0SrPZbJN5DDSBWwHbMIyQFRyQ9Pr7%2BymXy6FKWDweD%2Bt%2BmUwGx3FYXFwM77FYLEa9Xg9TwrZthwb1ruuGoipDQ0NUq1UMw2B2dpapqSkSiQSapjE3N8fy8rLXC1uvs7BcY9vmYQ4cONAW0QZa0JNjrzK8ub1uG4vHKZeK5LMZZFkBPFecet3CFQR6envoclyUSIzjL71MV2c3iXSa9ZFNpFJpXv7B84xdvsz%2BgwfJZNJg25RKy1i255wTj8WRJJlieZlYLEHEnSeenQFJYn5aBRE6%2ByJgWDSqm5CSnX661rt%2Fo5EItWKVbC6Pq%2FgZBVwEUUSJxDANk66uDiLRKLZlcnXsEvPzM%2BQLOzF1nZdfOcM7%2FsW7KS3PYeuevrXgN5iLoki1WKZSrmDbFqlEp9frLUlY9gpiT6zbcwCyal6EW7%2FKw%2BuaPJffw9jyAm%2FPrOZQTFRtLB9z5BVkxpWmP925NAvlGpIokkvGuTK7tOp46Xi0LQJOx6NtNdR6U2ewMxcCsG7Zq0Cy1tToyCSZmC%2BGgGw7bhs4vpl91oq4F8p1bD8FXlNXtyEdnzfpjot0J9o%2F%2B44dO%2B44cODAbwHXXg%2BH%2FGCNFfyjAMO%2BuEYaeWUXzhdv8JiWjO%2BRFRg5%2FmZaf34WhqQoq92I1%2BpPC9oqAnLT%2Fv372b9%2FPwAXL17kC1%2F4An%2F3d3%2FHBz%2F4QTRN49VXXw3Vm%2Fr7%2BxkeHg4j3m3btiFJEl%2F5yldCEklnZyeFQoFcLsf09DRPPfUU9XqdAwcOYJomZ86cIZvN0tHRwX%2F5L%2F%2BFvXv3sm7dOpaXlzl%2B%2FDjvf%2F%2F7ufvuu7lw4QLT09P81m%2F9FsPDw2Ev48LCAn%2F7t3%2FLK6%2B8wr%2F%2F9%2F%2BeZDIZTvqiKHLo0CEGBwfZunUrly5dQlVVTNPk2LFjmKbJPffcE0YoK0liSF60GlFkSg0D03aISOIqUwHHBUeABcvh5akqVc3gwmsTzM0uUqosgKjQ25Fhd0%2Bao1MNVKPBYtWlq5CDchGHPB%2F7xQdJJyNYpu1Neo5HEnAEOHbkBWZOH%2FdS1LaDjg44SKKDU2%2By492%2FSEd3B7ZfN3ZwkN3rTIMLJ8%2BgFieRYlEkzQQHbBsU0cEGSDvYtQrdN9%2FLYhMGVpgIju66hWe%2Bd55oRGkT5lipIhbUcoNIJri%2F4vE4tVqtrf82aPEJjpFIJFheXg4BOeijPXnyJK%2B99lqofey6LplMhv7%2BfnK5XNhTqygK6XQ6BPFKpRIeM4iybdvm9OnTbNu2DdM0uXLlCrVajUKhwNLSEvV6nXq9zszMDIZhhEz6%2FXu3s3PnzjCKDgwPggVENL5a7SwajVFaKtHd24Ou616bTzSK0WwQi3WAKGNbOpWFGW7at4epqRmOHX2GX%2FzYr6I1m1wbHyOfz3Hh4gX2HzjExi2jzE6P02zUaaoNr5cWF13X6C6kiURfQ4rbYMvIIgz2xcGxaZZzuPJmRNEJUzFBfVqWREzTRIlGEEUByzJD7e1INEK9oiJh0XAM%2Bvt7icXuRPQZ07quc%2Bzosxy85XYMo4ll6ti6iqLISJJIOhn374Mooui1ComiiG3oOLbt16ABOev121bPgBgD1yY987%2Fz27n7qay7a9V1XVCdUCFK1U0kUWDf5nWcuHSNelNnQ38n8WiES1MLIVhlU3ESUYVyvRkSoNLxKL0dWS5NLZBNxinWGmFd1nZcDPN6m1JN9dK3db%2FftqkbQKQNJOtNne5cOuzJtR2Xcr1d0vPN7BN8lmDols3oUA%2B6ZZOIKpybnF9zwn9p3uQdI%2B2RfjKZ7PzMZz7zi7%2FxG7%2FxGaD6M4RfP1sKUmtFsWuB7euNLVu28KEPfYg%2F%2BZM%2FwTRNurq6EASBPXv2EIvF2lKywSgUCrzjHe%2FgzjvvJJlMhlZ7Qe2s2WyyuLjIa6%2B9xosvvsiBAwd46KGHOH36NI899hh%2F%2Fud%2Fzs%2F93M%2FxpS99CYDf%2Fu3f5siRI5TLZR555BHWr1%2FP6dOnqVarVKtVFhcXaTQabNy4kZdeeonOzk4SiQS9vb3h43q9jm3boUQkwObNm8Noae0UciJs74mIIp0JmZJm0pOMhtGB7ULJdFg0HUq6yeWpChOzC7z6yllqCxUSqTTRRIJMJkVEkTk6MweyRNSyMdUGdQdGNm1hdMMGYokIjmsj4mI4LhIgSQJnz17lxW%2F9PdlsHCWu%2BJKMFo4oYtabdG3extCm9bi25TGaXRdcsAQHURCZnp7n7AtHiUkpMHVERwFbR5FMPAwSwbZxpBjbbjnEq8s2A6n2W72zu49YogPLqiHLUpvmcKvjTyvxKVjwBHKJy8vLYfvPytpu0HvrRUceWHd0dDA7O8u3vvUtduzYwc6dOykWiywsLDA7O8vk5CQjIyOkUikMw6DZbBKNRpEkybPDazZDk%2FqgLhz8BoJ2odbWJdu2KRaLjI%2BPh4utkZGRUMYxcJ8K7uVKpUI8HvfeU1hLtzaCaXo2dPlCDl3XqJaLRBQv4m6qKk1VJRpLUi6XSafi%2FPwHPkQ0GuPYs0%2FT0dVNqViku7eXL3%2Fp%2F%2BYTv%2FW7pHN5KsVFFudmqJSLFIvQ3dVNVLhGPLPktfq4Lh09XiHT0R2azW2IqTQ4VltaRpJEREnAtCwi0aj3vYk%2Bq9w3RVCiMWyrSUyWkCTIrOtncbmEKEsUujrJ5vI88d2%2Fo1qt8a73%2FjyOrAAOtqmRSidD39ugvCIAgutgmgZRyS%2B2igrEB6By0js5QUatlVhePk5u%2F%2Bpugh%2FMmS1sZIdXx2fbapqnr7STIs9NzpGOR9Etux1Amzo1H5DHWqLdpm6uYizbjtMGgGulfcv1Zts%2Ba7Ge38w%2Brc%2FPFqtQrBJRZKKyhKqbN4yCl5oOV6s2I5n2ef%2F222%2F%2FVT%2FarHPdzeG%2Fg%2B1PcwS9ksGkFPQS7ty5k1%2F4hV%2Fgr%2F%2F6rwH41Kc%2BtUokIhhzc3M8%2FvjjHD58eJXtVa1W49SpU7z1rW9ldHSUixcv8u%2F%2B3b9jYWGBZ599lkQiwa233soXvvAFvvWtb3HgwAHuvfde%2FvRP%2FxRVVfnN3%2FxN%2Bvv7Q9Wrp59%2Bmlwux%2F3338%2B6deuoVqt86Utfolqt8q53vYtSqRSakAeiBW3pJZ9Qdfr06VV2g15KvaUGJ8Ce3hQvT1Z4x6i3vWq7jDVsZmoapXKdMxfGmTx7mYXFCnZUZKCzQEchh6x4E5iFhCwqODiYuJhGk8RAP7u2jiCLEqZjIznealdwvdaLV169yPf%2B%2FItMzM4zLOXoU3KAiGQ76GadVFcfN7%2F93YiiiGk7OPi9sIKL4oqousWz3%2Fw2jtogRtQzR8dEAkQ7ioOOgkqtrrPnoQ%2FT299LRWsyVxfoTbX%2FaNP5HirzJUTxukLUygVcAGDBNQweB7KZhmGEvbPB%2FRa83jTN0DwgHo%2BTSCR45plnEASBD3%2F4w6Fq1dLSEpVKhUuXLvH0008zNDREJpNhfHycVCoVlihkWQ59b4P7Osi2XLhwIVwYptNp6vU66XSaSCTC0NAQ3d3d5HI5LMtCVVV0XQ%2FvH8tvXwnazDKZDIoi06gtk0x3tJGkIlEFWbCol5ZAUhBwkSNRRFGiUSmCIJFIJKiWTaKJBKXlZSrFZTZs2siLLxyjqalcPHeW977%2Fw%2BGNmC10k851UCkuUFpaIiboxOIXPY6R46OpA4g2jXJf6FXb1rfmA25EUdBNB0PX%2FT7dEslECtFPuSuKgmaoYURsmRqFXIpCYSeSEuPV06dpNlSGRzaQSKb4u6%2F%2FPZlcnoM3H0BXawj4TlAtguCiKGIa3vtdJ0lt8U1rvYVYqQ7K8PtXzS9XqzZF7YfHi5%2BWAtSPaxim1bZQuNF4bclaBbaZTKb3N3%2FzN%2B%2F5oz%2F6o78BGq%2Fz8r03KIv%2BOEfwHsH%2FAfkq2DYeELNuBLavJ2O11%2F%2F3xZ%2FU2fsiF3tX5OOdQAxgZU1trYg3GAGpJJVKMT4%2BTq1W49Zbb%2BWee%2B5h48aNfOELX%2BDy5cts3LhxVa%2Fl7Owszz33HIcOHfImEN%2FurF6vs7i4SDab5eDBg6EO8ZYtW%2FiDP%2FgDfvmXf5mvfvWrfOITn%2BAd73gH27Zto6Ojg%2F3793P06FF6e3vp6uqi2WyGqcDz589Tq9X4yEc%2BwsaNG4ObioceeojnnnuO9evX09HREbJh11KRmp2dZWxsbLU4OuBG4kxUNGxcOuIREooEisIPLl%2FhpuEcpiAwXje5NLXM1OQcF6%2BMUVqqeRF1XwfL1TpgEo9K2I6NIwqIto0jOGDYKILA9t17GRnoRgAsx9Mvth3P01MUBV67cJWTTzxBXypKatsQiuLVaBUTTFFFdBQOvO19JBIxbNMC0UW0nHCutQU4feI09bkJEnisXRObhO2AY2KKEHXA1EwS3cNsPbQPzTCIOSJXq84qsO0dGGF%2B4jSyJOK6TltEu9I8vlVBKrDHcxyHZrMZyi0G2slBbTVw4wkm5EqlwtjYGJ%2F61Kfo6OigUqmEJvKB2bxhGLzyyivkcjmaugfmAemptae81f4vlUpRLpeZnp4mFouxe%2Fdu%2Bvv7ue2228IIudlscvXq1dDCLyBEBaAb2PgFbGhBEFCrC21gG%2FAhlEiEbCbF8nKZWDJDLJGkXikhCJDIZNG0JqLsCXwo0Si2aWHoqsdnSGU4%2B%2BorDA4Nr8hQSeQ7%2B0hnumhWjhFJl9r1j0UXW5XRja0oqWhYq20lG3ia3jKmbZLN5dH0ZvgdCAi4npEubeV5QcB1HbA0dENlZMN6BMFl%2F6HbuXT%2BLEokgus4HH3uOQ4eug2zWcV1TU84x3%2B9KAir239SI2HfumG5LDfTJDo2rfpdXixZP9TcOLtc4f9NY1lzWFCdlbVb4YEHHvi1P%2FqjP%2Fr7NwDbzwJ3%2F4RPMXiPAGy%2F4JOmgud%2BqRVscz4TK%2BvvlMNrBwqYx48Awz5z%2BIjP6FrvNw6X%2FecBvuizwx7xt69vef34ttHRR30gPeyzuJ72WceH%2Ff3fBZz29wvfo6Wf1zZN041E2hWrV4LtxMQElmWxfv16JEkimUxy6dIlLl%2B%2BzLVr10JFpkgkwuDgIIcOHeLo0aPs2LGjzd7KsiyOHj1KMpnkwQcfZGpqimaziW3bPP744x5%2FPJdj48aNYUpueXmZbdu28f73v5%2BvfOUr1Go1br75Zu666y4EQeC%2F%2Fbf%2FRnd3Nx%2F%2F%2BMc5evQoMzMzbNy4keXlZUzT5IEHHmDjxo1tLSQ7duygVCoxMTFBT09PmHIcHR0NiTTLy8tcuHCBV199ld7e3jVT4U%2FNaSxOzGDhkIlH6UhHURsamDpfPjOFJIosTlzjzLnLSJaLEkvQPdBNJhXF1Azq5RLNuki13iQZi5KMewIflmESSyQZHd1GTzYJjhOmfQWfDCWIImfOjnH87x8lLoqQiJK2bWzLQDIdTNHGblrc%2FJ5fpHewF800Pa9LnzHi4KIIEmNj1zj33e%2BhiCIaFg42iqkj4mCKIKIBCnVN57a3P0wsqqDpBoYIi43V0cPA4AZetoVQBahVA7mV9LQSfAOAFASBWq22KosQ2OUFSmbB4md6epru7m527dqFpmkkEolQCjSXy5FIJNi1axfpdJqvf%2F3r2A5hJNqaGg7APyBgBedl23bYwnbgwAE2btxIt69NHCzeLl%2B%2BTL1eD9tZgrajgMQVRPCCIKDWV0%2FsluWwXCwS89PbsuyZW8hKBN20UJQIlXKJtE%2F0QhAwDA3TtHAdgVptmuHhIbRmo71dJoieIwLpjkmwfPQMi7IOjcowUmwQsNsZfYEaousSURRq9SaWbSOJEql0xotq8b7HQDxj5RBEEUs3qKkNto5uQ1erLC8t4uLSaNRQGw0i0RjZXIFqaYlmo0xElpAjEURZXg22sV6QUuCa1Js2Wv5%2BYkJ7yWux6TDX%2BOGi2h9VtvFneawBtvT29u6%2B9957N%2FzH%2F%2Fgfb9%2B%2Ff%2F%2FXfGx5ZCVhqgW%2FPteCSx%2FF67sN9n245fG%2F8clSIU6tIELhY%2BQngIkV2w%2F7oPtYC%2FM52P8R2UfiP%2FNPJOgdKvso%2FYj%2Fhn%2FG9T6l0y0Mrs%2B2APQXfNp0EBVn8ZQ3PoknozXuf9A9%2Fgf4hM8Yu8s%2FyU8Dn%2FX3a32P8HduGIaTTCbbwhPbttu0kW3b5ty5c1y4cIGbb76Zzs5Otm3bFrqwLCwsUC6XqVarvPjiixSLRRYXF3nxxRfJ5XJtfY2FQoFdu3YhiiJDQ0PYts3Vq1dDO7zJyUlefvllnnzySarVKps3b2Z4eJj777%2BfJ598krm5OZJJr351%2FPhxxsfH%2BcAHPoAsy2GKL6iVBdKKf%2F%2F3fx%2Fq2W7ZsoVMJsPu3bu5ePEi5XIZURSZnp4mnU5z%2BvRplpaWSKfTJJNJBgYGuHr1KgcOHFh1w14eu4ZmQEQSmTE8EUVREsnEElw8e56r41M8sH0zf%2FgL9%2FHZ75wgkY4SUQQcXJKRKNm%2BHqJI4Lgc%2FdoTTJgit929l3tv309XRw5FlnBsGwcX0fGiBVkUsB2Xl46dZuzYs8RFGQcHbBPRAtE2MUULs15n91t%2FnuHRrWiWgYiA49pInpSPJxdYb3Ls29%2FGxERxTCTbQTFNHEDFRnG8WlmlvMDG%2B36eTds3ebVrPFlIzXSo6Qrp6PUfbSKZIpXtwdAW%2FOjWbQPbIGUsy%2FKqlp5A3alWq7XJO7YSqVrBK1gUBiIViqKE6k6GYZDL5cKWnT179lCr1Xjt%2FGUMw0CWZRqNRvj%2BgXtTcK5Bi5GiKGFL0gsvvEBvby%2B33npruO%2F69euJx%2BMsLCxQLBbDlqDg87Wmz70WIW0N4oSCpjsUKw1iURHbVKnpTUAgmc2hNVUUJYIkyR7ZSWv65xbBsR0y%2BQLV4iKuo9OIJMjkOlEiLSQY6wzYYyC0bBMdtEoUw95GJCHjutYK2nwY7nuGCALYpoES9YhMtmUjKzKiIKJbFqIkeFFnEOIGHTquiyDK2I6AWq6wYdN6LHOYsbEx9h28lUBTJ1voIp3NUyku0FQbRCIKjmX62RH%2FGka7INqJq05RqdvEN9%2B26lrOqw7%2FfbzxOL5gMpiWyEWFVhJs5F3vetc7TMO4E%2Fiarx5114qM614fuyotUeY3uM5KDjDrE%2F7r9vr49HArTrWwj4PxDa63Dx32t320JYoN0sltOCn7BwwahH%2BJ66LLp7gusHyXf%2BCcvz3rn9hhrvcXBUydU9tGR78YSGn50etdLauBYAUQHBfg0%2F5%2Bj7a%2BxwoVKl3TNAtYBbatY2RkhP7%2Bfh577DE%2B%2F%2FnPh%2F6uvb29DAwM0N3dHU6OL774IidOnOCOO%2B5gdnaWxx57jI0bN4bm7V1dXSExJZgoN23axKZNXjpo586dbN68mZMnT%2FLkk09y4sQJDh48SDqdRtM0kskkmUyGhYUFLMvilltuCVt0%2Bvr6wgm8Uqlw5coVXNflpptuIpFIEI1GQzDO5XLs2bOHaDTKyy%2B%2FzMLCAjMzMxSLRQ4ePMitt95KPB5HVVVOnjy5Si96oaoxdnUaCYjHFN550w5enZ3hxOQsysAgzaaOaEG5qTI%2Bt0giKfutMl4rjSO6dGYS4IpYpsZMoh9FzHD40M0M9OcRrMBb1jMIkFwHQRTQdYuTJ1%2FhwjNPkFBkdCDqNMER0UUL0bYwm3W23vI2Rg8dBMvyvA9cB%2Fyv1cEj5Lzw1DPUZ6dRFNuzF3IcwEQ0JZBAsiVUs4aUzrLr1luxbNsTnXJAdgVEx2GhYbeBLUC%2Bs5%2B58dk2sA3Svq2gu5KVHIhHNJvNMPJtNSYIFoGtEWjwHQUSmqqqEo1GEUWRer0eRpdLS0vceeedfP%2F732dubs4TavD1mIPjBtsCIA34CEEaGDynqgBMg9pz4Hg1ODgYyjfWajUajUZ4jsH9vkYAiKzI5PJ5Uuk09WqJfDZGVBRYWq4ST6bQNJV0OoPjOqFXLL4CVjyRQK3XSGeSxCIRTEOnOD9BJJYmXehBllywXwKh9Sfu%2BcA60l1YUh60Bkr0Bu1agoAgiMiyhGGaRGIxFN%2BaUBAEmkYD2zRIxFeoqgkeUEciCo2mt6iJJpKUluZIJ2Ps2DGKEom38DhmKVZVNq4fIpXJUy7Oe4sKXScS1G3lNMT60MtjVKxeYomO1cSheY8YtaHLo8qPLdZ%2FqqAWUyRu39TF1aV6eC63b%2BpGMy2OTxR%2Fquc227DJrfCq3rlz58NLS0tH%2FbLj4Zb0bTBOtYBvIIsW9MfmWgDxiA%2Bwd62ISltx6kjLtiNc16ZoVVwcXwG2bTgZiFrc5G9YWasN8s9HWC10UQYe3TY6%2Bkk%2FhP83b%2BKalbmuY7l3BeC%2B0TBVVdWA6MqUXfvvzWOU9vb2hvWqsbExqtUq%2B%2FbtC8FQEATS6TRvectb2L17N5OTk5w7d46jR49SrVZJJpPhhBZEDFu2bGFwcJC%2Bvj4ymUyYKrzlllvYuXMnf%2FiHf8gf%2FMEfsGPHjnDSmpqaYnx8nJdeeom3ve1tYcqxq6sLWZa5cOECL774Ivfccw8PPPAAqVRqzQ8f2Kk9%2BeSTdHZ2MjIyQmdnJxcvXsR1XQ4fPhyyVFetoBsmvd15TARM22RDXwYXnSvLVXTTIJdNU6oscLFUYuKkTiqTwMFFthwM0UU0HRzbRZRksoUe%2Fu0n9jDQnUESvLSiFQCNP%2FfJkkippvHsdx6nOnWBhCJjOw5R00HHQaTp9dQ2q4zsuYPdbz3sTc7BF%2B3YiC44IoiSzMsvn%2BHisaeIKXEwdU8VwzYxA5awqIMp0tB0HvhXv02mkMFqGjiiF60AWLjM1Ew2FtpFyLp7Bxk%2F%2FzwRRQoXb629swGABSAaAG8AtgErvDXN21reCMAv8FJNp9NcuXKFgwcPYhhG%2BH2Xy2X6%2B%2FuJRCKUy2WKxSI7duzAcRwSiURoOqBpGrVaDdu2w%2FprAPKKotBoNML7cnZ2lsuXL4dtQcEiIfjNpNNp0uk069atwzCMsKd3eXmZfD6PJax9LzquQzwRJxaPUVpapKOQplDIUCkuIEdiYQuMR%2BZyME0LWXRwLQ0Bh2gkhuO6SIqCrCgYZpPl6QnyubNE4kvgyi0oqIOwh0RuP7GMQ7W8hNaoIsuCV08N9UTdMFqNRBS0kLEtUy0VEV0DRZaIJ6JIPvu8leTk%2BhkMAQdT1zEMDReJhmbSEbNQq0voWoNs3otqz44vYHONob4euvrWUykuerXf1pHcSkN7Gi19K%2FEVK5cF1QkFZP7lHZsB%2BLdfP3nDye%2Bh3QP0ZRN868wUs5XmDbf9Y8b%2B4Q7uHe3jf%2Fvua15AkI3z0O4Bvnp84qce3V4s2YwW2sG2o6Nj4zcfe%2Bx3169f%2F29kWR7eNjr6RvXZvX5g%2BWkfGAOzgiBzu5frqlBBlLp3BfaVaRewyL0JzHsU%2BKTcEhYHaDzeUosd98PpPf4bBMh%2F2D%2FB9b6rz3reoKHXH58DvuHXex%2FxC8t33eAED%2FvqIIf9PHyzXq9Xua7D3FazWkkUWl5e5uGHHw69RZ955hm%2B8IUv8Morr%2FDRj36UXC7H8PBw%2BPqhoSGGhobYvn078%2FPzZLNZ5ufn%2BcpXvoJt2%2BRyOSYmJlBVlUOHDnHzzTcTj8fJZDJEo1Hq9TqqqvK9732PU6dOsXv3bmKxGLlcjoMHD%2FLtb3%2BbV155hfe9730heC8vL%2FPEE08gCMLrAq2u60xOTvLNb36Tzs5OPvzhDxONRmk0Grz88sv8xV%2F8BQCDg4NrXo9l1USUJBQcFDHK%2F%2Fn0Kc8LNuKZdSdjaWJyDBybaNQG18QxXQzbIyals2l6uvvI5TLkUzFkUUB3HFzH0zj2JBg9E25JgItXrvHas8%2BhF%2Be99J0O2Do2FqJvjmfXGwzddD%2F77rvXJ5I4HuBaIDpepIEocu7sRc589zsoShTMhqcwZUuIjoNjm4hOjagZo1IsseVffIB1I5swdA0kF9H2%2Bno1xzOnV63V7SypdBbLsttSskFdNli4tUa7gZtSQGgK6u3BQq9VR3ml3rJpmgwPDzM%2FP49t2yFByXVd5ubmQm%2FbICsSuAcFRgGSJJFKpULpz9dee42enp7wfUzTDB8HIH%2FixImQkdxKfpIkKYyGg8%2BZz%2BdDoI7FYlgk17gbWz6PYRKLej2okhQlGlFoqBrV4hKReBJdV4mIAhEZsplMyAgOA1IvaEWJJBD1S0jCmRWcTRuIg3RbeP1zhW6sdJ5qaRFVbRBRvHpxcEzHdYnFIiwtLWAYJk1VJZmIkM2mvHad4P1XKrj4fyqyTLVSJpVOea1wlonj2MTiMUxdY2l2gmSmwOGbd9E0TK7NLNKo1%2Bnv61l9qVLrUTWb6Lr9q%2BuQzR8uhdyXTbChK0U8Ir3utn%2FMuH1TF2OLdUqq0RLV2rw289MnZVX01ddLluVoPJHoNAzjJlmWT7zJYC8oXb5rDebwqVac8oPMR1aQrE5x3TEo9ybA9pQP8J8NFKQCoA2KyJ%2F0%2F%2F4i1z37yi0n9mk8F593%2BxEq20ZHT7WE6bSkoYOVQ9mPaIMP9rkWua3yGvt9uiUkB1BLpdIssK71k6iquurTxeNxLMvi%2FPnzoSpTNpvlne98J1euXOG%2F%2Ftf%2Fykc%2B8pE2FyBN06jX66xbty4kSo2MjGCaJkNDQ%2BTz%2BdD4%2B8KFCzQaDWRZ5sSJE8RisXCC%2Fp3f%2BR1isRivvPIKqVQq9BDt7u7m%2BPHj%2FOmf%2FinveMc7UFWVJ554gmg0yoMPPoiiKFy7do1CoRAKariuy6VLlzh27BiXL19maWmJe%2B%2B9l2q1Guo179q1i127dvH888%2BTzWbZvXv3qutR1Uwc1%2FGiSREQJERsFMdBt2wwLaJRifpyhaaq4WSyJDvydGUK9Pd2kcukkBUJyZevMx0H0Z%2B4cDxLtIgk0GianDl%2BkskXX0QUDSRRBtsA28F2JMBAcUx0vcnm%2FXew8977EEXJi1RdAU%2B63UtHS4rCwtIyR7%2F%2BVWyzioTiT78OomN6QIsDikS9XCG7cS%2B3HL4Lw5fOc4KQx3GRbXAQsNYA20g05l2blrJEQEBqBdoghdyaTo7H42Fqd2VpI1CMCpSZgv%2BDdLCu6zSbzVCoItBDDo4ZRKLBsYIUc6tTUVBucBwn7K0O%2Bm%2BDKNwwDJ5%2F%2FnlmZmbYsmUL%2BXw%2BNCxo7dUNRGCC3lvXdbEch5Vi5I7jSSO6joOu1Uknoz7QeZFlKuV9lnq9QUyRyaRTWC2R%2F2rcFrF1lWj0IlKc9q5JwQZpPwidbSxsWVEodPdj6Bq10iJNXxNaaqk9ZzIJVFUjm06QzabbJQ3Xtmn22MyyjG44mJaDZZiIkohh2sQkGSUSRY646GoJTa2QznWxbcMghmmunQGIj6CaSaLp1W5jZxbNNSLLAg%2FtHiSmSJydqfC3xyfQTJuHdg%2FQn4v70ewgRy8v0JeNr9p2fKIYRsknJpfDYx2fKPKtM1Nopv06YB4nn4jw5LnrPb47%2BrO8NlNhQ1eKvmw8TC%2F3ZeNs789SVg2OTxTD9LNmOowt1tZ8DuDJc3MhiMcUkRMTRfYNF274XEk12N6fpS8b5%2BxMZRVRShAEbrrpprfV6%2FWpRCLxuTU%2B1idXPB73I9b1PpDubcGeX2p5fKQFgD%2FHaoOBu1tw8XMr3mst%2FHs3sFdueYIVuWfWKAwH%2Bx3Z5gvst4Bs299%2BvbXsPx5veb5Muyzj%2BA0eH1nxns3p6emzruve3BotBO0zK9IL3HzzzVSrVZrNZmieHtRm%2F%2FiP%2F5j%2F9J%2F%2BE4888gi7du0KJ5vx8XGq1SobNmwII5Gg7Qe8Hsbdu3dz7Ngx%2FsN%2F%2BA%2FhpNnd3c327du59957MU2TZDIZAna5XOby5cvEYjEymQyPP%2F44Tz%2F9dNin2dvb6xOA6pTLZaLRKNu2baNQKKCqKlNTU1QqFe6%2F%2F34GBwep1%2BvMzc2FEbWiKHzoQx8K68%2Bt9n3BKGo6tmXjuA6ODaJl07S8aNSyDJpmks5CLwO5PjKFTjq7cuTTcWKKhCsKnjqTL5bguC6u1%2FaKiCckYFkOZ8%2BOcenlF2kuzRJVZLBlcAzAxMFCEi1Ex8bU62y%2F491sO3QICwHTNRHx5aoQwAZFkphdKvHEV%2F4WsVbHVEAyPR9ayTT9eq6O5IioNRs7meee%2F%2BER5KiIpVsEmXTDr%2FoGJBvTWZ1iV5SoX1a87l%2FbWpoI0rRBrXZl%2B0%2BgSRyYx7eCSnCsoK4a1A4DT2RZlkO2cXAvN5vNEOAjkUgI7gEwBint7u5u7r%2F%2F%2FnBf27ZDdrFlWcRiMUzTRNO0sO1tenqaQqHA0NAQhUIhvK%2BD8w0AOIiS65pKfoUtqWkY1Co1ZElCFl0UORWm6nHB9ftQ87kMzabG3MIi2UyaaCTi3TutgBsQ4MwJEl2L4LZ8P4KLY8rUlntIFIzQEF7XDSanZ%2BjsyFPI5ejoXUezUadWXsQ0NSIRBUGUyOWy5HPZ8G1uJMfZdi54rUOC6JGddEMjnkhiW94CI0j8RqIxHNumWpyjWiqS6%2ByBVcsSMKRuGpEtJJTVPfzWGoHtW0f7eO7yAjv6c2zvz3J7pSsEoTc7gvpvfy4eHmv%2FcIG4IvGlF8bCtPWGrhSff%2FbSitrs9Sh2%2F3CBmCJxYnKZfCLCvaN9nJ2pMLZYZ3t%2FlntH%2Byj5gNqfi4fPn50pc%2B9oH5pptz0HhAD60O4BNNPmyXNz7B%2FuIJ%2BIcHamwmylyUO7PU5LANa3b%2BxmQ1dqTbD1uS931%2Bv189tGR0%2FfIKpc%2BXi8Bd9O3WDfIAo%2B8jqX%2BsgN3utUy%2BtbQfrUz5KohXr27NmX6vX6R9LpdNsVD5iYwQiMuYMJaHBwMCQN9fX18dBDD%2FEnf%2FIn%2FN7v%2FR7vfve7eeihh8LI8umnn%2Bbuu%2B9m165dq4hGwcQUpKlHRkZ4z3veE9bRxsfHQ2u%2BgK0aGL3fdNNNPPjgg5w6dYq5uTkGBgaIx%2BOIoki5XEaWZW6%2B%2BWamp6eZmJjgpZdeotFooCgKH%2FvYx0K5Sdd1Q8F48HosBUFg%2B%2FbtPPbYY6t6hb190oiRBOCZdIuySC4WQ5SiKAmZeCxOOhbx0oGhhoBXixWd68Bhuz4vCVAkAdNymJ8vcval4yxePIsogqyI2LaF5FiAjY3jEZj0Oo4YZe87H2FodDuWY%2BM6DhJg20JIpEESqWoGTz%2F2d9QmL4EUBdMEExxMsDVP38ABzTTRTJPDP%2FcxMtk0hqYhi3jFXlxEV8BB8ByEBAFBWJ1ukyQJWZJDM4CVtddW%2B7xWIhQQOioVi0WSyWRby1AAsK11X0mSMAyDYrEYAltgEBBEs7OzsyH41mq1Nqu%2B4LiBtGJw75dKpVCDuVUgP5BidBwHVVWRZZliscjY2BiZTIbBwUH6%2B%2FspFApIkhT684qi6DGVTXmt1B2pdIJsLk%2BjWroOtCsiRtuxqTZUBCnGcrGGIgnkcmlkf%2FHiax1ia01ikcsIEb9I38pArvZSqUCpcp5soYtMvpNYLMq6gX5mF5e4Mj5NPp9l0%2FAg8WSKRq1Co7qM4BpEIlHwJRVbGcetddqVUbaLi6zI4NgkEkkc20aRFTStQSoVb5sDRFFEiURYXCpTLpcpdHTQ0d2P0MKZ0CwZPXUTCW5cr20dXzo2xmylyWylyS%2FesoENnWmeZI5vnZkOU8bfOjMVAuRa24Lxt8cnODtT4ejlRX7%2FnbvZ3p8lpkhrRrcxRQqj2OD5fUMdlFSDscU6%2BYR3r%2FX5kfSGzjSaaZNPRIgpEiOdHsCfnS1TUg1KqkE%2BESGfiDDSmUIzbWKKRF8uTt43PglAfWyxzv7hAv25eJgO10ybvmw8XDyUVIPZSpOSJLCzU14xt6Vif%2Fqnf%2Fo7PnHW%2BucMYD9LYGstLi6OlUolLZ1OtznGl0oluru7V6OzqoZSdevWrSOXy1GpVDh%2F%2Fjxbt25FURR0XecHP%2FgBS0tLRCIRRFHka1%2F7GlNTU%2FT19TEyMkKhUMCyLE6fPs2Xv%2FxlGo0Gv%2FqrvxpqHSeTSfr6%2Bpifn0fXdS5cuEAsFmNwcJCJiQluuukm0ul0aBiwadOmUJIx0NlNJpNMT09jWRY9PT3k83nm5uZ45ZVXQueXIHUSiFm0qhVpmsbBgwfXFPjYsXUjBgIiAoIoILpeys9B8KJKXC%2BqcG1sR%2FBFe7ztQYZVcMEVBA9kbYeZmSKnf%2FAi5fELYBlEZU9X1XEsFMcG20GUQLYtdKtMrjDMzrf9HLnODg%2FIAhD39Bi9liFBoNrUePwr32T27KsosSgSTSQTcDREW%2FJMChwPZCrLRe785f%2BJHft2oje99hPLcQEL2XXDjKTjR4ZVtQ6kVhDqROLxOK5rtJkJBNc10NxtnWRb08iyLId9sAHQtbKYg6g4YPoGJY5ApELX9dBJKuiTjUQioWmAoighqzkAT0mSwtSyruthzTiImIPUcrA4CFLRoiiGC1NVVTl79izT09NhK1MymeTgwYO4rkulUiFWGFx1LzXqDbaPbqFZqxCLyr76Vjt0iIJAra4SiSaQlQjleh3TAqdcJxKRyKTTCCK4rgjmJLHuIrhSW1Tr6iL1xgjFmoEsuajNSeq1ErlCF6lsBxvWDSC4DqW6iqppJGIxkuksiWQaTa3jOgam4ek8i0IL6AqvH92KkogoevdXvqOTSrlEs6nhtlNFEASBRl0lV%2BhEFEVmpiYpFpcYHNpAIpUJf5NCavPqeu0NWn4CktPrpXvf7Djrg5lm2owt1tnQlaI%2FF2dssc7nn73UPj%2F4QHz0sif1mE9EfBD3ZCIDsOvLetmu%2Flyc4xPL3L6pm%2F5cnP5soo1NfXamzO2buunznxtbrNOXi9OXjaOZ3me%2FulQLAXr%2FcME%2FthxG133ZRAi4wXE126Wiu2RbWoCi0Wh8586do3%2FzN3%2Fzg%2F9Xg%2B0Nmox%2F1OFMTExMLi0tLQwNDa1%2Fo7ptMPl0d3dz5swZzpw5w8GDB3n22WeZnJzkYx%2F7GBs2bMA0zbDX1jRNRkZGeOaZZ5icnOTkyZOIosi2bdtC9Z9cLkdPTw9HjhxhdHSUu%2B66i%2B3btzMwMECxWAxlF7%2FxjW%2BQyWTI5%2FOsX7%2BedevWcezYMa5evdoG5KIocvXqVZ599lm2bNnCfffdx%2FLyMv%2FwD%2F%2FA5s2bedvb3sZf%2FuVfUq1Wuffee0OHmLGxMeLxOIODg2EkvWnTphv4%2B3qG64JXzMR0vfSqiIAdrvSD%2B9QBW0AQQHHxlKIEAUSXckVldmqO8fFLFC%2BeRdQtHMWfnJwmomkhSiI2FooEjm2C1WTDTfew8cDtJBIpTMsgaCmy8c3gXZBEgeV6jSe%2F%2BT2%2B%2F3dfI5aOUcjmwdFJR6OINjiOhoiNikOjprLr4V9i1y27aZoaCF4ka4kecOPYiJaI108soBoa106fgH1vX5U9jMZiGJrZFrk4jhOmgIMoMVjIBEIXiqIQi8VCBnDr6wNAtiwrbOMKgM%2ByLIrFItu2bQst9XK5HIuLi8zNzbFx40ampqZWpY%2BDiLq1zSdQqwqY%2BYZhYBgGyWSSRCLRRooK2OrBcQODi8BUPpFIhJ9pbOwq7%2F2l%2B1bUax1qtQpnTp%2FhzsP3UCsvodbrRKLRsF4KYNk2mmGRyqRo1GoUurtpqg0c10XTbSrlabq6u1Bch1j8EmLU9eTBQiRz0Kr9lBoZojGJQmcXjVqVWrVOo36VTGaZbEcPI0PrGFkZoIoic%2FPzvHTsKLfcfjvJRBTLMYgokRaNDP%2BmF9bgfrku0YiCoWskUklkSSKTSraExZ4alWGauIKMrulomkq%2BoxvT0imXlkOwNQwDOb665We8av%2BzAoHbN3WHgBoQpQLQDMbYYo2%2BbJz9wx1eTXm2wv7hDkY6U2zoSnmRp0%2BsGluqc%2FumbjZ0pujzgbk1Il4Z2XoRbJqZcpOZshfZ7x8usKErHQLydWKZTXZFC9DAwMBOv0vljSjZh3kT7jw%2Fq5HtqR%2FjsZzJycmla9eundyzZ8%2F61slN07RVPqQBUSoej3Pffffxmc98hj%2F6oz8KvWyHh4fDmlxPT09ovh70sKqqSq1WY3Z2loWFBbZs2UJnZyfz8%2FN8%2F%2FvfZ9OmTfyrf%2FWvyGSuF7WC4%2FT19XHs2DGWl5e59957yefzYT%2Fu5OQkH%2FzgB9vs73Rd51vf%2BhaiKHLXXXeF7OjPf%2F7zbNq0ie7ubr785S8zNzfH3r17MU2TarXK%2BvXrw%2Bh2YGCAer2%2BZm1KcN0wWhUdL5o1%2FTYJ0S%2BX2i4ovvi8ILpIgojjek4h5VKVs5cuc%2BXFH3D13Cn6%2Brop5LKIUTAdvYXUYoEtouDg6FXERJKtd36AjTt3YrsutmniCk4Q1GJ5dixEZYlStcHjX%2F5bJs%2Bdo6erAFGRhqqSTgCmHqavTSSWF0tsveU%2B3vIvHsSyLT8t6dsB%2BhOi4zORvYgZrp2%2FBIvXWGsl0lqzDIhGQUTbykwOI7cW958AbFcKYgTgtzLiDaLNa9eusXPnTubn58P07qlTp%2Bjv70eSpLCEoChKKAfZGlW1gnlgSh%2BckxSyft1QTzkQu4hEIkQikdAgIWBEB%2B1Mk5OTzMzMoOmrg4Rms4naUJk3dZRIlEL3AFqzQa28hNFUiUSiKIpMvd5AEGVMTSeeSKL45CVD02hYdVxBplbTySqTxDtL7eljwcXRZWr19TR0i4HBbkxDA1yS2TyGoVMqV2nU66RzebL5LuLJ9sLyY1%2F7a0Y2bObsa69x%2B513I7oWltHEdSwESXrd8NZ1vVq5WmngOg6RaJSmoa0CZVXVkZQYmq6TyuS8th8hQrPZCMUtLMsiEk2szrhZ7k98Ys8nIiH4BUSqUsNYc7%2B%2BbDyMYgG29%2Bc4O1MJX%2B8BXoXbN3Wz3yc0jS3WmSk32dGfI6ZIjC3WVkXVG7rS5BMRri55gPqWTd00TZvZSjME3dbI2wPhMrMVNawbtwIywHLTZfMK%2Fu%2FAwMAvsMIC9gbjrjU4SU%2Fxk5d0DMH2Ef9x4Dg%2FzHW3%2BoCRFbjWf9rf9vD5c%2BcCRalPbxsdPeW3AOHv%2F0mfKPVRYM3nfNGL3w8Aedvo6CfPnzv3%2B60sr1by1flz5%2Faqqvq5548di5TLZbejo6PtFzM%2FPx%2Byi4O65rVr11hYWAgnmTvuuIN9%2B%2Fbx6quv8uKLL3LzzTe3RSRBX%2By%2Bffvo6upicnKSJ598kuXlZZaXl1lcXGTjxo3cdtttIYlkraHrejjxBqbgr7zyCn%2F5l3%2FJ%2Ffffv8pnNtBubtXYPXDgAI1GgyeeeIKPfOQjjI%2BP81d%2F9Vd85zvfYXBwkI997GOhtGOwaEgmk1Sr1TXrzC6ejZ4guLiuB7Su4KVYJQHPDcj1gKVaazI3O8%2FMxCSNhVnUhRkc08TUGySiCRxkMMGSLKKmV5v1kQ3HUTH1JkM7b2XLWx4gnUli2oHFnseqEh0wXRBdF1GRGJua5%2FnHvkVxcoJsKkFKgbpZJ51QUADH1LElG2woFktsuOU%2BDn%2F4Q%2BA6OK6N49NXZNfxU5oODmAJLiISYxPX0K%2B8Qmc2snohIoBj2%2BzatQtFUUIbOk3TQvBtNps0Gg0ajQbNpqe3K4oig4ODRCKRNinPoO4b1Fkty2JhYYHe3t4QkCORCAsLC5w8eZLp6WlUVeXChQtUKhXuvvtuXnvttfB7DXpjA2ZyKztakqTwXpMkKVSkCnp6dV0P67fB%2FkGEGiwugoWqKIohU9qyLLL5zjXBtl4t8Yv%2F%2Bjeu1%2FviSWLxJGq9Sq2yhG2aaJqOqpkkEwkU10FTGx5fQBCwTAtFVlBcg3T2KoIckON8DBQc9OoAy7Uk6awH1I1alWQ6i641EQWXdK6T5YV54kmD0tIMy0sLdHT1Ek%2BkOPr09xlYN0wqnWHz1m2kM1kmx68yOz3Jtm1bsS0NURAQJJG2wqlfWnFxPZKUcJ1V7oAn8%2BjLWOqagSDK6JqGpCg4pkk0HodolHq5jKlrRGIJ%2F7rKa5CjfnSw3TfUsQqA1tr2vv3DPHl%2Bln1DHT4YXm%2FpaSVIbe%2Fz0uNB9Lm9P0s%2BEeFbZ6ba3vd6nTgePh5bqoXkp7OzlVX7rxTruHe0j5gi8UQL4zk4TsB4bq9Je%2B%2FVmlavm6uvXTwWy%2F71X%2F3VB2%2B66aYv%2Bi05632W8KNcVzcMxtMtjz%2FrY9Ij%2Fr4rX9s6WrHpk1xXj7prDTYzLbgZdPk8KvvgmvPR%2FaR%2FoKDPKJCy%2BqWWk74br0cpcLT%2Fhr%2FtEf%2F%2FP6NdnJmVz50%2Fd%2B7d%2Fom82z%2Fpp86fO%2FcYsH7b6OjdfjvRuwIgPn%2FuXA74bLlcfvfY2Njbh4aGDgXi%2FzdiJQf1TlEUw8j0%2FvvvD1f%2F58%2BfZ2Zmpk0PORKJtAn8B%2FXaQInnV37lV9i7dy%2FT09P85%2F%2F8n7l48SK33nrrqi9%2FamqKS5cusW3btjCFGNTK%2Bvv7V533%2BfPnQ4JL4NYCcODAAc6dO8fly5d529veRmdnJ%2BfPn%2Bf48eN897vfZWBggK6urrCNJHCEWZUSsEx0V%2FIiStdBtl1MX%2FHJtEwMw6RRU5mem6U8M0llZh69WUMRHaIiSMigiGTFJKkBBQkR0dHQAVE0ES0Fx1ERzSbxjiFGb76f4e3bvLnMtH2xCt9n1nZDUo0kikxOzPD9r%2FwV9dIyUUXB9H9YCTuFKameiIVkI9lQXqwzOLqfd3z4Q8hRGQwLGdEX1XD9RLi3aBBxQYLK4jLLx58jJzrEpNVg6zg2W7duoa%2BvJ5RRbI1CA%2BJSUHcNrnOj0UDTNG6%2B%2BWZ6enrI5XIhQAeAF4BZkEJuTVFLksQLL7zA1q1bGRkZYX5%2BnoWFhbCWn0wmQ1C3LAvLskIv2lbhjAB4V6abg17gwGigtT1tJWAHIB6JRFBVFUVRuOnm1Yt917G5%2Bda3rMkLSKQyJFIZ6pUiatPE0D395Vg0Si5fIBqPo9br2LUq8ViKtHKOWLrkWei1RrVahKXiAJrtENV1LMMgmcqgNRtIkie5aBoaLlApe56%2FmXwns1Pj5HIF8oUC41fH6OrpZWDdepqqyjNPPU4ymSaZyqDIMt3dHZhNFSWiIIpSaFAQZi4kEUnyFgbxZAJRkjFNi5gsAy5NzUCUPXa14ms%2FG6ZBNB5DVVVPwjEE29UM%2BB8Fa09MLtOfi7N%2FuEBJ1RlbrK%2B5LeSxqEbYBlRSjVXgGYz9wx0cnyiGgLbfJ0adXaO39uxMhe392TDyDCLWIDpt23e2EqaXVy4EVh777EwlBO2ZcrMNrFeCuLZGVkBWFPMDH%2Fzg1%2FygLmgZ%2FYKPH8G2ca6rSNHSprMXr8U1kBYe53qPbQCe61sw8mEfE5%2F2g8kA%2Bz6xIrp%2BV0twejIAW7guc7WS7rzXR%2B9vrCw7%2BNtaw%2FFTQSTqax7zOs%2FtxWsfKvuR7ylfrvGj58%2Bde4r2%2FqVw%2F3ve%2BtYi8Pj20dHi8PBwR6vFnK7rLC4uhv60mqbR3d3N3r17w1RwEDVu3bqVzs7OcMIqFouoqkpPTw%2BxWIxSqYRt20xPT1Or1ejs7OQ973lPmHoeHBzkne98Jy%2B%2F%2FDIjIyNt%2FboAi4uLWJbFHXfcwfDwMKZpUqvVwvahlXWwwcFBBgcHeeGFF5iYmGDnzp3eBJZI0N%2Ffz%2FPPP8%2FevXvZt28f%2B%2Fbt4%2FDhwzz%2F%2FPN87WtfCxWtZFkO%2FU5XcdQf%2Fy7j05Uw04tpYKKB4yCaFlg6JobXvCBDggiSDCIOjiPi0EBxJF9B0cYGRMckhYhpOljWInKyi21veQ%2FDe3aQCMlSdpi%2Bdn2hCst1kAUBRxI5%2FvKrnHjsaziYKKIXwTqOjWnqiNiIHjoj2rBUrDC4%2Fw7e8cuPeO0thgUIyI6LKPjpY9tFDCJaUURrqMyePEoOA0WRSa5Zz3YRWlp6Wtt8AhBrBctoNEoikWhLCQep2oBh%2FOKLL3Lt2rUwMsrn86s0l5vNJps3b%2Bahhx7Ctm3WrVvHyy%2B%2FzJkzZ0ilUuH3GCwWg4i5lXTV2ncbsJ%2BD8w0i14BRbxhGmGkJUtBBujzo2W0F4w2bd61OfzYa5Hu7KC3Nk%2B%2Fsvq4DHDKQHVLZAsl0jlRugfmZGZpqA0EQyUsSaqOBpESJCnXShSmQhBVupA6lxT7syCD9HQmKS4vMTE2RyqQ98RHT8FMRDoNDQzSbTaqlEgtzcyQSUQQMBvu76ey4n2KpgiRJzE5fw7ItSqUlRFHg9KmTDK4b4pbbbmNpfhowiUYi4T2ALywViShUy0Vsx6ZSqSJmkyQSIg21gSgr6M0mcjSKY1lk8wUaagPLNJFlEdtvHVurtOWzItrGSuWoscX6qm3HJ4qrJBPX2haMrx6f4OjlBeIRaRUQthKkPv13Z9oZ0X570Fpj5XNrnWcwjl5eCAlXN%2FqcrcSwlc%2BtJHGFWYE1ymSSJIk%2BG%2FlhVqs75VrKmY%2B%2BybLnkQBzWnAx5wNyecXxgr9XijOd9oF%2BPDinN3JeH%2FcPdLcfhY774Lvel8b6ND%2FaKAcn4Eete%2F1o9nTLcT%2B74jwOA%2FzBH%2FyBFI1GKZfL5lrs4wB4Lcti3bp1pFIpOjo6cF23Lfrt6Oho216pVHjttdf47ne%2Fy7e%2F%2FW2%2B973v8YMf%2FIBSqcRb3%2FrWEGhD9N%2B7l2KxyHe%2B8x0WFxdZyY7O5XKMjIwwODhIKpViYWEhTOm1RQSJBNlslpmZGUZGRli3bl0YuQiCwKZNm5AkKWwpAujv7%2BeBBx4gHo9z%2BfJlFhYW6O%2Fvp7%2B%2Ff03T%2BIhaozZ%2BHnXyNdT5y6jFSczyHHa9AroOokVCFImJEHM8shOOgeSYgOXdJA6AiuR4dnaO3USvF8l0Fdh2x3u468O%2FztaD%2B4iJHiHHwbneV2l7AOG4DlFRpN5o8sx3nuDlx76MhCdCYTomtqmBrSNiAiqOo6LaUKyojOy%2BmXf80iPIMQXLtvxJy8HC8QrOroMjOFi4iMg4msn4yy%2BhNBcgCcgWQmKNH6%2FpAXHQvyqKYlj3DP4JghAauQcyna0KUQF7OZlMcu7cOV577bUwaxG0nwUgFvTw3nrrrdx3331omhZGk%2Fv27WPPnj1tRgZBS04AlPF4nHw%2BT39%2FP%2BvWraOnx4vIG41GSIQK3jNYdAa6xwHABvXaIGoPAFzX9bA9qad%2FZHW6LpkgW%2BigVikzfvk81dJy26LxwpUJXjjxCrppUOjsZeuO3fQNDKLrDSbHr9LUNGJKhFRsAiVV92q1ARiJLlY9QaU2TCLjmXT09PXT1dODYejMzU6Hi5lYPE4kGiWTzdK3bh2pTJp6XWV6ZpF6vUZEduntzlGrLKNpGo5ls35kE45jk0olqZSLXJuaoqt%2FPalslydg0aIChuMSi0VRGzWW5ueJyCKJRBzbsdB0i3gyhao2aDbq2I53re2QJe6x%2Bl93%2FORLtiGI%2FbT1ln%2Fcw16DyC1JUqAHdgp4t48hp1pAMtcStL3eyK0gUgUjiGTvZrX%2B8o1GkLlts9h7I7B92kf0IPd8Cvh9PwI9AuQCFak3O%2Fyabfn8uXMn%2FRMp%2B9s%2B4R831wrk20ZHx8%2BfO3fk%2FLlzJx3HGb98%2BfLCxMTEcnd395aVKdlgkhkcHAwFHnK5HP39%2Fei63uYJGkxo%2Ff399PX1oWka69evxzRNXnjhBaanp0M3nZXDMAy2bNnC5s2buXjxIrqu09%2FfjyAIlMtl4vE41WqV48ePk06nyWQy5HK5NtAMftyqqhKLxRgeHl51fgMDA6RSKR599FEcx2Hr1q2k0%2BlQL7evr4%2Fu7m6mpqbo6upaE2w39HfzwunTmAC2RULyJgPJcbyUsGcC5EWykgi2gtdvA6ADEraog26hmQ0Skky8q4%2BNNz%2FAui2bScSiYHtqVKLj%2BiIVjqcu5YCJS1SQsAWX8auTPPut71BZmPT8bG0H21S9ei86tmOCbYOjYJoq5eUiW2%2B%2Bj7f%2Fyi8jCxKWYXr1P8cjP1mOi%2By6iA5hGtmybS6fOYlYHCMejyI6IhIWqXh61bUxDY1oJBqyuFtbd4KFWKBhHESSAdi21lUVReHxxx%2FnqaeeQlVVhoeHkSSJZrPZ1oMbtHa95S1vCdPMQQo3uId0Xefq1athPXXLli1Eo9HwvYL3DSQfg0VCNBptU60K2oCCz9YaWbcqUgXM6oBU1Tcwsma9NhGLEovHkVNpDENncXGO0vICnT0DJNMZhvp7uDppM3ZtlnwmRXdnJz39QxQ6u5mfmaLRUJHtZVK5Kbzen6BW6v1fWuxFjPegKFJ4HydSKeLJJNVymUqpiO24ZHM5lJiJ4i%2BQZEkik8%2BhaQYLi2UEHLo6C8Qsk56uHO%2F7hQ9y4vhxvvblv%2BLDv%2FQvOXPqBC88%2BzSLC%2FOsH9mIFElhmRq2piPJApLsyakODw%2B2fd9eCt%2FTTpYkCUmWSWVz1GtVHMsinkh57kauHeLpWpHtT2MoskQiGqHSaP7E3ysR9cRYGpq3kM4m4zQN802Zxb%2FRWGudIgiC%2BF%2F%2Fr%2F%2FrfT5mfMMP4I74%2BPXploi0fAOAfcQvcT7Vkt1tBdvH%2FLR0UNp8ZEXt90ZR8jdaAtZHhDVSvm8WMH%2FkC%2BZfjJwPojngG29CRLrtAv3Wb%2F3W777vfe%2F7jUwm0xYqZjKZVXXRYIJpbd94vdFsNvnmN7%2FJ6OgopVIJx3G4%2B%2B6729jPzz33HJIkcfjwYarVKlevXmXjxo2k02k%2B%2F%2FnP88QTT%2FCpT32K6elpBEEglUrxmc98hoceeohf%2FdVfbZ%2Fw%2FegiUAxaOV544QW%2B%2FvWvMzo6ylve8hY2bNiAJEmcOnWKarXK%2Fv37uXr1qkcgqNfJ5drpeuPTs%2Fz%2FPvt%2FIwGi6GndKJKII4oogC2BIipIoulrF0cxJR3FBsnx2MA1RyTd0cO6nbeyfssouXyaSCyGazsIjoMdWNC5LmJAVPKLU4oosVSrcfL5Fxn%2FwdPoZh1FTGE6KrZtgumZCkiYiL6pj66ZLKuL3PL2R7jj%2FgcRZBnTMb10sesi2i4GvmEBnoyk6Lo4gsyVUy%2FiTJwlHpWRRLyuAKXB4TvuYtfedjnLq5dOkRRL5LLpsM2nFWiDFGvA%2Bg0izAA4g5aaJ554gmPHjjE5OUlPT0%2B48BIEgUKhQDQaDQlIHR0d%2FMIv%2FEKYpg5ITuA5QNXrda5cuYKqqmG7ThA9tzKjA6bzwsJC2OPdev9EIpEwfR0YwwccgiDaDsA6mUwiiiJLS0u89R0fZdvudku42elpenu76OzqRJLkkM%2FUbKqo1QqxRJK%2BgSEkJYJl20zPzpNMxOhsKZs0Gxpm7QiZwnEQlOszp%2Bhg1hJcmzpIqmcDstTu6COKIvVqmURUpqnrFJcrIIhkC3lwXBq1CulMDllRiMRilEsliksLJJMJ4rEIriOQTKVpaBrFpWVcYGFuloX5Gbp6%2Brl88Tz%2F8n%2F8NySTCUpLCwiY2LYn8BGoYl2vWzuoqkaxVCGT7yCby3mZKEGgVq3SrJXo6CjQ0bOeK2NX1uRQ%2FPnZ5j9VcHv9XlBkMokoS5XGGz7XmU1SVfUfGRy7cilqqo5mmIiCQG8hw1yx2i6A8iOOpCLwvs3tilyNRqN04MCB%2FcDVFoz5ZxeV%2FzRFLb7gX5Dcivrsmxn1L33pS3996NChD%2B3YsaOv9YlqtUpXV1ebolTwg32z49KlSzQaDYaHhxkYGODUqVOUSiXy%2BTzgtQc1Gg3uuOMOBEEgm82ybdu2cKLL5XI0Gg0EQeDgwYNcunSJpaUlms0mc3NzoVpRuOpUlBuei%2BM4DA0N8a%2F%2F9b%2BmUqlw7NgxFhcXOXToEBs3bgzlIXfu3Imqqly%2BfDms5wVj%2FUAfiYiIaTSRHNmb3GyfFoyCIoo4YhMJE9UxkVS%2FvpvtJtrRTaZjHbu37aJ%2FsI9YIuaDnYNtGn77kOClml3XS%2FMETGNRwrQtro5N8vQ%2FfIfK%2BBixqIgixrGdOtgmkmljOyaSbSICpilR0WrYJtz%2B0K9wx0Nvw7YsD5R9AQ7RdTFwAE9QwQFk18ZC4srZs%2BgTZ8knQURHdsARHRzbpm%2Bgb3UaWasR74iFqdVWFnE2mw1rpdFodJWoRTQaRVVV%2FuZv%2FoYLFy4wOzvL4OAg2Ww2jIZs26ZSqaAoSqj2deedd5JIJMI6fqtBfeAWFRDfggi10WhQq9VWtSMJgsDGjRtDudHAgi9wCAoAPUgtBwuKVqei1nvFMAw2bNmzOpNj6pi6hlqreq0uftSWSKQAgcX5WRqNGvlCJ51dfQwP9q%2BRho4Qj8577GO3nTFUXupHSvagyF7dPBR7EgS0ZhPRtXAckVQyTiwSYXp6juWFBa89JxLBFfAYwX6JKJlKMTF2BUmUSOcK6KaJ6DoMDvaTSOcw%2FesXi8XYvXcfyVSK5597mrFLF9i77wAbNqynVlkmoii%2BS1AQRYlks17aenF%2BDse2yGRzSJJEaXmJeET2%2FHQt43Xrtj%2BtIYkiiVgE23ZQdcOPRBUkUSSdiKGblrdPVPG%2Fd4t0IkajqROPelyApm60kRyjihweSxQEZFFEM8wQyDXDJBZR0E0L23GIKDKyKIavSSdi1FSNRDTyhvuIwppzpPVPl5z%2FGQNbnxj1j%2Bltsubm5sZffPHFvx0aGvr1dDotrGQit7KMf5jRbDZ59tlnWbduHdlsNpTTe%2FXVVzl06FBok3bo0KE2slPAYAZPraparXLkyBHe%2F%2F73s27dOq5evRo6xbg%2FxApPEAQ6OjqIRqNhavzKlSuh5GPbZBaPk81mWVxcXOUg1FeIcOnaHCIKCjYSDrYu4sWTgKKQSuTId20js3eEwfUjdHT3EkvKKLKC7ApYro1jWri42AhIuNeFKXyhCsEFUQBHkplaWOLEke8zd%2FqE%2F6OWcRwL29Y9opUJEg6KR5FCN02KagXRtnno1z%2FNpu2b0DXDs4YR%2FIjWcTACj1NcZJ94IApRxs%2BfwDl%2FmlQm4jsMRUA0QHKIRmQ6fXvD6xkFAwmdZCKDLMuhRZ0gCORyuTYHn5V9rqlUKnSFOn36NKVSid7eXvL5fFvNtZUdXCwW2bp1K1u3bg2t%2BVoNDxRFwbIs5ubmqNfrIbkpaB9LJBIsLS2F0WhQMpFlmdtuu43e3l7Onj3L0tJSeMxYLIZlWWiaFp5LsGAwDCNc6AVSjbv33UYk1q6vrWsaqUQCwbGJxpPMzczQ3dfnuSS5Lk1VJZcvoGkaS0tLVEolunp6yBa62khUjnEKkWtAQGwUQLTQluPUtGHSvSncQFmMMLuM0VRJxCPUVQO30SSXTdLV1UGt1sRxXY%2FEVCqB66WdRUXBNk1SqTSdPX2UlpcodHXjOg71aplq%2BSq7dm5nZmaeEy%2F%2FgJ%2F%2F0COUS0WKC3P09PYxPT2FrEQYGBhEb1Q8zeVoBFGQcAWPTR%2BLx1guligulWjU6igRBUvXyXV34Lgulm3dEGRbfev%2FqYG2kEmgGRbJuCfPWlO1N3xdOh4lqkjopo0iiSRiSRbLa9eCYxGFpmG2%2FC2jGRYRRQrfLxWLhADtpbcVaqr2pvaR17imtm0b%2Fx1sf7Kj%2Bud%2F%2Fud%2FduDAgffs2rVrcEVaIWyf%2BKEQ3LI4deoUoihy8OBBwNOnzeVybYzjIMK9YRqlq4t4PM6VK1e4evUqoihSq9XIZDJ0d3e%2FbiS7FtgG9TqA9evXk8%2Fn1zRgCFKea9nsvfWBh7Ffeg1kESkiExfjEIugRFKkU2kyHQWyhSyJeMwjCAkuWF562LVsmjiIruDPFJ73bBDRWo7X1uOIAjKwuFhi7OIlTh99Cq1SRBFFr4Zrmp5WsqN5souAg4ppK6iOSa1SonNwM3d%2B%2BBE2jGxE13QsPPay6HrvY%2BE5BPnTN6IIlu0y9tor6FdfIZmJ4FnTOsi2128rYjPcv3H1DVRaJJOOEo16rTHVapVIJEIqlQojv2DCbM2MRKNRJicn%2BepXv8rJkydZWFhg%2Ffr1dHR0hDZ9K8E5iHLK5TLz8%2FOhwUFQLw0M4K9cuUK1Wg2jzYBQZRiGZ8Aej4dRcfA%2Bge7xrl27GBoa4uLFi4yNjbG0tBS2lLVKUQap6aC%2BG4%2FHQ1A%2BdMdDq65TqbSM6Npk8n3UKhWisRiKLHtAZ5lUK56vbk9vH7KiUKtUmZ2eplxcprO7l2S2gODWEdyjK4zhHSCGKd6NHE%2BCY4KsICCGSKupKpGIiK6bJNNZREmkXqtiWyaSIlPIF6jXqlQqZZYW54lWq2RzOUrFIp1dXciRCJIo0ajViMXixBJpbBuW5udJxhTe8c53Ikkir545jRKNodZrZPJ5Hv%2FO3%2FHr%2F99%2FSzqbo1GrUK8uIbomET%2FDkculkWWRSrWB2vC00fO5NMlUHLXRRJaVG0a2ovCjtf%2F8Y4coCCyW6ziui2kppOIRaoCqm8gtwGs7DqreXmOtN40wWu3MJklEI6i64e9rtIGrql8H23hEodrQwueC%2BrFp2yiyhCJJaIZ%2Fj5v2G%2B6zlpugYRh1fHuSn0WwDdhY4z%2BpN%2FbN5h9tdfppee6GMo8%2BGWuvC18cHR0de%2B65577Q39%2F%2FOx0dHW1fw%2BzsLCMjI2%2BqRhvUOpeXl0kmk7zrXe%2Bir89LOSaTSbZv335Dr9m1RjabDQ0IlpaWyGQyodBGawT8o45sNhv24q5aWcZia37mPTs2I23YEwYUDl7nBYiIrt8D65OaLNPEwkVxPWk6148eQ0JLsDjxq1mKJGG6NrVKjVdPvMq5F46ilZaRog4Ktt87a%2BL4v0HFcUA0cSQbUzUpmyaUNbYcvIu7P%2FAhkpk0uqaBCxE8UwHL8VPHtn%2FTui6WBIYtMv7aSewrJ8kko4g4yLb%2FuQAFG8Q4Ixu3rromy4tTJETV641sNkPFpsBjNog6g7aaoA568eJFvvGNb3Du3DkWFhYYGRkhm82GQNtqXxdsC5jFrb2zQYQaAPPs7CyLi4ttrTsBO7her5NIJEKiViaTQdM0yuVymDIWRZF0Os3%2B%2FfvZuHEjly9f5ty5cyEYty4Egqg6YCmbpkmuo4dUbnWqXcSht6cT17bRmw26%2BgZ8IIFGrUJXR45ytcb01DV6%2B%2FvJFgqIkkRxcYGmppNOlujtO4usVMCJtgQhBq57E%2BmuPcSyOtXSIlqjRrlcJpXOkspksU0NOSJhChKy4qX007k89XoNu1FlfmaaTDZP%2F8A6GvUatWqV2ZlpopEIpmlQr1YQRAHTMHBsG0PXyXd1ed%2BF2mRhfo7iwhzbRrdy8uQJYvEE41eu8IGPfOx6nTCd9YwOKiXURhlJBCUSJZNJkUzEqdVVarUGnV2ehrooR1Ai0fB6ryxhSYLgqaf9Ew%2FTtsP07w9bP9VaolXdtD3W9RpgHosolOvNMMq1HK8rQTNMsskYkihiO44fJUtElOtA%2Bmb2icvCWtnIEqt1kR9pwbDxHwPGPeITp9bz%2Bm5ANxqHbwS24zdgbv24gPYwniH9F1%2BHyXWj8VmuewZW%2F%2BRP%2FuRLe%2Fbs%2BRe33XbbnpVR6rVr11i%2Ffv0bM9z8ibVQKDA4ONgGVms5%2F7zRSKVSdHd3c%2F78eVRVZc%2BePVy9ehXLslhcXFzzB%2FhDr1Jv8PpAUH5l3TYuOiQEk5ItekQiPBao6IpoeO47jp%2B8MxFQXD9FjNe76tguouh47RqSNwUjCji6wdi1KU6dOsHUlSs4S%2FOIksfC0hwbxfbkHCXbxkYHySNo6Y6JqWrUVJVYLMstH%2FkEe267CUf0FHocwWM1WzhYFogIRBwBCwfDFRAlwHYZP%2FkS9ux5UskoSDIRLF8%2FSgcUZDGOblts2r5l1bWamrhMLmFTrZRIpVLEYrHwfpmfn2%2BTAe3u7iYejzM9Pc3Xv%2F51zp8%2Fz%2FLyMps3bw7dm0zTDNWbYrFYeExFUchkMvT29obtNkEGIgBbwzBYWFhoM7EP%2Bnfr9XpoJh9Eyp55gktnZ2dozddazkin09x0001s2LCBV199ldnZWZrNZmjpF7Q6Bd61oiiy5%2BADq65RrVohn03S3dXpAV06RqNZwzB0XBeiEYlsNo0sS5SqKmqjjih66UAlouA6IopzGdF9FdxIC9A6QAJB9jJISiRKR88gmtrAsS0WF%2BdQ63VyuQS6bpFI58KFnus4uKaBokRIZgpUymWq1TL5QoG%2B%2FkFKxSWvLOATwVw%2FveziC1b4KfZoPEY03kdTrVMtLbFnxw5S%2BQ4unj9PZ1fPit%2BbRDrfSSKTp1ZeotmooCgSSiRKNpMmk06CX19OZbvDMoJpmqv0yiMS6P%2Fs47DXj5DXAutYREEzzPC5WERG9TXHHd8fORGLoJs2ummRiCpEFTmMfN%2FMPist9rzMS%2BkqsLIV9KMtoLgWoN71Os%2BtNT7q73vXjwi2d62Uaxz3geywD3inuC5TdYTr7Ti%2F7wPmkW2jo5%2F2o81Q0nGlx22LDOORbaOjQQ9tjutm9Gt9sFUyj%2F7%2Fe1ue%2Fz1VVe954oknzl69enXjyMhIW%2FipaRoTExOremTXSr%2F%2BKKB6w9qIb1YfTHzFYpGenh56e3u5cOECtVottGf7cQ9FUcjn80xNTa16jwHFpGJEkPBNBgQXS7A9U3j87KxrI9ueF5AjuriOi%2BOCi4AoeEipGxb1epVrkzOc%2FP4RlsYvoSgiiBJIIoqtY2KjmKYX0TqSR4aSwHY0VE1B1Uxsx6RnaAd3f%2FBX6BsawGiaYFn%2BIsAvbDnexOw4Er61PKIgYGgaC6%2BegIUrJBIyIg6WqOE4ICIjiQoiIg29yaE771r9Ay0ucey5x4lFIKIooY720NAQHR0dpFIp0uk0sVgsFPwPNIxPnDhBpVJhZGSEVCpFLpcjm82GaeRGo0EkEiEej4dtQ7Ish0Iq58%2BfZ926daGblCAIlEqlsN82mKANwwifD5SjFEUJ24QCpmugzx0wm4O0pSRJJJNJ9u%2FfT7VaZWpqitnZWWq1WrjADKLcvv4hBtZvXzOFvGG4z1tAARISuUgETdMwDItE3FvYNVQNRfFStlaguuUKJESNfH4MMbJCwEKwQDoEQntJJpZIMjiylXxXH%2FNTE5SWS%2BQ6e5BkxTOuF0V0VcUwPEnERCJJPJGg2WhQWlpCkATyhU5AQFW970EQBSLRCOVikWw2F4KB6ztbxZMpYvEk5aU5wGJkZB1qrUIinV3zt53r6MFI56iXF2mqTb9P2zs%2FBIm4b0QQ1OBXLcYVgZrxz6vEuDrV3f53Mhaloel%2B9CpTrK02f2mNQAGiikxNbbSQ7GwSUYVSvYlhWuRTcRzXbQPuN9qnZw2wjcViNz3%2B%2BOP33XfffV9%2BnY%2B4Fo69y98e4N56rkssPgb88Zu4dDlWyzx%2B1g9WJ1oDykCucS%2FXZac%2B2xJe%2Fz5eP9Gn%2FceP%2BPtXfFnFb%2FhAu5akYyvQBvt%2F9vy5cw%2F7H%2ByulaDcMva2hO6hzKN%2FjI%2B26ChX9u3ff%2Ff3vvvd%2F%2BPc%2BfMvdXR0HM5kMsJKwlOgLPVPNVzXpVgsYhhGaO0XOKvkcrk1f4A%2Fzh9NNpvlwoULq8A2pziAg22DKXpuO4Lr2buLjosVOgB5lGIZLxUqCp6e63K5wsTVaS69epKla%2BPMjI%2BzuFiiUMiSTqdIKoBpY2OHQhiO5zyPg41qOqA5qOYSEOPOh3%2BZPYffgizKGKrh1XP9mrDjWuAIiLaNiIiD7RGjJJF6tcb4y89y8dl%2FYGhokHxHgaikEI3aOLaCKDlEgEqzSVWts2HjhlXX6fTxo3TkM8Sicig20Ww2mZiY4MqVK6EAhCRJYdtOV1cX5XKZQ4cOhfXR7u5ustlsCKiGYXDixAmOHj1Ks9kMU9CxWIxisUgsFiMSiTA%2BPu6ZrOfzISmq1d4vmPwCB5%2BgjzZIRbfu18qiDlSmgok%2BiJC7u7vp7e0NbScD68nBwUGWl5fZfejtq66RqjaIRqNUqiqyWCSdSfvuOS6yJOPI3v1iGCaCKJPN5dGaTQTfD9d1XPLZOSLpsi%2FL6HOMRRdHj1Fr9JHqsNcseyRTGTZs20W1vIxar2JoKnIkius4GFoTQzcRJYtKuUgsnkBWFPrWraNRr7O8OE8sFifX0UlDbWCaFpVyiUg0iihJbZO7IAgIgGFoxGIR4ok4lmVQb9Ro1Mqkcx3EEqtLSJFIlEL3IIbWpFpeRGs2sR2bdK4n%2FO4ikciav%2FWBlMRsw%2FlnA7SWZSMKAv0dWWaWKzR1i0I6Qa2ph3XcREwhHpVRJImmYWJatg%2Bw19uGWuuziiz55DWnJf1skYxFwlqwl15uvz6vt48sQiEmruTZGEePHv30L374w28DWsH27hVAW%2FG3fRZPaSoAylbcW%2B%2Fj2HjL3%2BMrjrcyqv0Gq2Ue97JaX%2FnTQX4jaL35YkuEG%2BS1D7dErX%2Fm%2F303wLbR0Xf7Ee5hVks6hrnqlh7ax%2Fww%2FOk3eR%2B8ngTkYRfuPnfuHE1V%2FZuZmZmHL5w%2Fv23f%2Fv19K3%2B8xWKRbDZLq7zjT5S55UcRiUSCzs5O0ul0myrUTxJsg9W34ziUy%2BVVPbcbYxYXGpIHrqKA4ngRkSO5yL7tmOO4mIZJva5SrlQpLS8zNT7G7KWL1EolFNFEkmLkslkS0QS66VmvxdJpJGwfYG2QTBzbxNYlTDRsAxyzxsiOwxx86D0MrB%2FE0E0My%2FBSfD74B62JfgmZwO9WFkQWFxeYPXGMpcuvokkxKo6NWW6ypUvxarSS19pUqldRGyYbtmwkl29fdOi6zoVXjpFKxolGI22m7EFEEolEyGQydHR0UCgUwug1n88Tzw2DIINVxTGqYQSqad5Ec%2BDAAYaGhnjhhRcwDIN8Pk8ulwv9b4M%2B13K5HKYaA8JTPB4P08iapoXEpYDQFMguWpYVZk6CPu1AXKPVcL7ZbIaLhgCM8%2Fl8%2BNmy2Sy1psvg%2BtV98%2BVyiUI2QyaTwkGgVKoTjUgkkwnqjSaCFMWsquhaE9MGx3ZIZ7JUSsuYpk1C1kjnJnxGEG3EqOrCINPFBvLCK3T19FLo6l3zXs7kOkimMtQqRbRmA9OyUdUakWicju4e9GaTZr2O7TiIkkgikaSnf5Di0iIIAul0hkQ8ia6pxOKJNqAVBYGmqmJZJrZlksskvH5tUSSWSGBbFuXlGeRqnGy%2BCyW6mm8RicXp7B2i2ahRr1VItkTD8Xh8zYXEWqnQn%2FQwTIulirXm347rMl%2B67trT0PRQkCIYi%2BU6EUXGtp02AG09zmzxugmKadmrGMuaYTKzXGk75lq14Rvts1a9VtM04S233%2F4xSZL%2Bj9erl7aA5WMtKeQ%2FW4F7n%2Ba6acFjP0SK%2BVQLEAeB4qM3IkitX1E0bq3dBqpRj%2Fih8XiA%2BH50%2BbQPiu8ODANW1n%2FPnzu31wfNu%2FzQ%2BscxxgWPKHUqkUjcsWPHjjPPPPts8tKlS%2B%2FZunVrrjUt4rouExMTjIyMrOn3%2BuNfKXrkl1wuR7FYDEU2Ojs70XV9Tbbwj%2FO9p6amSKfTVCqVVWDbE3O4qkteHdS2MRwXS7Nomjr1Wp1Sscz87DSlqavML8xi1peQTDBEiCEhiVGvZGtqiLZDTLGJSA6ikkAyTUzRRHRAsjV0EwzHwdFMMGukO%2Fu55f2fZNvO3UREMHQdHBcbEcmxcUUwHb9R1wHwtZX9uvHk%2BCWarz1HRrHo2LCO3qbu9c92pBAdT18ZHIrlBqap48gi9799dcRWLBbZtH0fV159BsPQwwgxk8lw991309XVRX9%2FP%2FFML8gt9m22ClYFV5sP2b1BjbWVDGUYBoVCgbe%2F%2Fe1Uq9W27zwgMwUkp2azSalUCmUiA0AM%2Fg4i1xCm%2FIkuIGIFkWvQBhROdr78YFCXDbYFFoK5XI5MJoNhmPSN3LoGYbCGIgl0dnVhGTrJTAZRkNDUBotLJZKpNOlsFsu2EJUIerHI7PQU0VjMa%2FexTDq6ppCTjRazAdcXsIhzbb6HrqFewGFxfp7i0iI9fQOkc4XVi0dZIdfRg2XoVMvLNBt1XKBaqRCLxcgUCl7ZwzRpql7dOFsoIAp%2Bz64oEE%2Blve4x3BYFLgdNrZFMxBD9rEFgd%2BviIkqSJ2himixMXyWRzpLJdyOtMYfEk2niyfQq%2FkRQW2%2F9brri4k%2BNkfyPBeyf5liXktb6LR%2F%2F4p%2F92a%2F%2Fr%2F%2FL%2F%2FLl1wn4xn0QbMWgIKN7pAX3AoOdsg%2B6h99kfTbnv%2BZwC4BzI7D9qP8PP4wOHrfWV%2FFP5BSeJBZ%2BDfbI%2BXPn9rbILK4UqPgcnoBFGU%2BW8dN%2BNPyPHZ8DviD4MlzpTObT%2B266aePTzzzzF6lU6pcHBwfbirC2bTM%2BPs769et%2F4oCbTqcZHBwMxehlWcY0TZrNJrqus7S09CP3Ab8R0AbCBolEguXl5TA6aqtxLE3wF3%2F%2FPKbuoOrLmPUmds3E1Ms4poaBg6RAjASOKCGKEMEEE2xUbMlBMj2ik42NaAKYvnCCg%2BEAtumRQHSVbKGH29%2F7CTbu2EY8HsOxLAzb9SJgAUTbxcXFsb3Q1nK8%2FllLdBAFmXpDZe7sGVgaI5VwEMU4oiPSJUI8KnoNJKJCxapTLTVwHIiKIoff9jbyhY410qMqt931TsoLV6hXlkKd4KCuunHHHR7IGotgVT2tW0Hy%2F5cRJBAcKwTalWS1oC%2FXcRzS6XSYaQjYx4FARqD%2BFLgNtUagwb%2FWSDVQegpqrkG2JDC5D0A3ANoAiIMFZwC00Wg0rA2nOrchR1aLRpeLi%2FT6pu%2BRaBRZ9uQc46kUmm85qERiRKIRYvEEqaSJJEuUKhX0pkp3ukm2Y5JV8usulJd6UVJ9RGNeVqG7vx%2B92WRmapxEcZGe%2FsFVvb4AciRKobufVDbP%2FMw19GYDy9CRlUiol6yqDU%2BDOxZvky51HYdapYIoSyQSKQRRABHiyQyq1iCfSa7mB%2FsbbMdBNxyM4jJqrUom30EyW0AUX7%2FTQZbl0PZy5W9wX7fCy%2FPmzwTI1pr6P4vz2NGxet7WdX3D%2F%2FSpT%2F0t8LU3wgquSzYGZdG7fIANsG091yUbg0i1lZC71ng9mcf2eaElOv2hGFb%2FGLnGH8c4t4Yc1%2BjoqAh0%2Fe7v%2Fu7%2F%2FOCDD368s7NTXivFOjw8%2FBNPKf%2FxH%2F8xL7%2F8Mr%2F3e7%2BHYRjMzc3x6KOPUq%2FX%2BfjHP76mNd8%2FatVpGExMTIQTsOu6VCoVSqUSIyOrtW4%2F9Yf%2Ff85cvojiG8wqiEiSx%2BAFBcU28TpUHXDAFE2koJxre4xkERXJjmE6JoZtYpoiYCKZDqapke4bYuNNt3L7vfeTTqewLAfHdpEdGwuP9GDjG9g7Lo7rvZflC2NYosDy4hLF88dRGovEo0lEGn7vrIgiWkSQcURoGDrlahVsBUVySMTjfOzXfo3YCuLb%2FLwXlXZ3d1NenuVbf%2FPZsBUnGo3S3d3N7t272b17N9mBQz7YWtfF5R1%2F4nEtsLVQxL9VQzcwtjBNk8XFRfL5PNlsNvSbbTabXLhwgVKpRCKRIJ1Oh%2B1CAREqOJ9WQA8Uj4IyhKqqiKJIIpEIwTmY5ININlDGEkURwzBCI3lFUejo2UCmd7W7T6VSobOjQCquoDUbxJJZlIjXstNs1FFrFaSI1%2B8bjSdo1KreeaRSGKZFaXaGgc5XSfVM%2B1Gt6xGiRAet2MnM%2FEFSnQPIshiqROnNJqXiskdmkiCdLVDo6kVWoje85zW1Tq28jNbUsF0XSVaolJfp6unzztf1WtNEUaLZaGBZ3oLA0A1isRjReBzXhXpliVw2vZJ44dWYBSiXa6RyHRi6Tr1SQhIForEouUI3iXTudRWiXnvtNZaWlujpaWc3LzYd%2Fv6qzn8fb24UYiLv3LD6XvjUpz519ze%2F%2Bc2jrGAj%2F3OUa%2Fx%2FBgAr0lyHONsvnAAAAABJRU5ErkJggg%3D%3D" /></div>',
  throbber:'<div class="readsocial-throbber"><img src="data:image/gif;base64,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"/></div>',
  throbberSmall:'<img src="data:image/gif;base64,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"/>',
  domainIcons: {
    'readsocial.net':'<img src="https://www.readsocial.net/favicon.ico" />',
    'twitter.com':'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAK8AAACvABQqw0mAAAAAd0SU1FB9oFBRYXCn2yWOEAAAJtSURBVDjLpZXPThNBHMc/v5n9X5poWgIeQAIXH4ATD8DdN8CbPIDxCjdMvHok+ga8SC9eTDy0IsSI1KIGWrad2R0PhZV224LpJJPd/WV+n/nOb74zKwCNRmMH2AOeMl/7Cuxtbm5+kEajsVOr1d4vLi5SqVTmona7XdrtNp1O54UC9uv1OkmS4JybqydJQr1eB9j3gNU4jsnzvJjZOUfP5mROyAFFTiAQehoRmak6jmOAVQ+YDBVdxHIUqYNsYIgeAAfwALIsKwLGGKzyEIGXTY9WKjyv5ewuZwxMhstztNYoHGrGBCXFxhgkjgBopcPE5s1TghAL2NvBmSVwOVrJ/WBrLXps0FUGH7ujycsBLPkefWsIrEUpNRvsnCvN3kqFV8feSKyi4eiZAe0x6PUIgmA2+O77TM/ebIuIYKzF87z/B1c0bET/VrKgHNuPh9+D6x4uz0t5DwJvRI63a7YUt8Zw2WmzUElKeeoWdrePt2YqhTNGVPk+YZwwzpiq2JoBnh+w5Dt+GKGbwW7TGynN9qOht8OFKvbqz/2KnXOkvR4Au0/yqRt31Bnayw8jrLUlxSWwiHDZOceaAVvVnL3VjCW/bMH1m80cpNcTwaVSiAhaKb4ft1heW2erGrBVnW7BtNvFOTe5FFmWFd05h+/7aIGTz5/4/bPNoN8vAa97XS7Oz/h1/p1xxkTFt6rDMATg4uwbZydfivoXq9KaMAyJ4xgRmejjU2vtyvhZFxGCIEBrTRRFpaOulEJrjda6uOjviDz1gIN+v//O9/3SRQIUydPaONQYA3DgAYfGGDHGvBaRlXn+ec65U+ANcPgX5+m56vUt4FsAAAAASUVORK5CYII="/>',
    'facebook.com':'<img src="data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBggGBQkIBwgKCQkKDRYODQwMDRoTFBAWHxwhIB8c Hh4jJzIqIyUvJR4eKzssLzM1RDg4ISpJQTwqQTI3ODUBCQoKDQsMDQ4OGSkkHyQ1NSwpNTU1NTU1 LjU1KTU1NSw1NTU1NSk1KTU1NTUpNTU1NTU1NTUpNTU1NTU1NTU1Nf/AABEIABIAEgMBIgACEQED EQH/xAAZAAACAwEAAAAAAAAAAAAAAAAAAQIEBQb/xAAqEAACAQQBAwALAQAAAAAAAAABAgMABAYR BRMUIRU0QVFUYXOSobHhEv/EABUBAQEAAAAAAAAAAAAAAAAAAAUA/8QAHREAAgAHAQAAAAAAAAAA AAAAAAIBAxESITGRcf/aAAwDAQACEQMRAD8As5jmPMcVk89pY3EUUEUcWgbaJvLRKxJLKTvZPtqU uQc1a4hbczc87As12z9rZ+jYm6oRwrEuF0uvJ1+fdlZ7ZmXMrt+tDFuODQkfRI6Kf2tTKMlvuWwf i7Z+Xtbie463fRKyFn/zIDH4A2DoeNa386YVFskUWGd88B2dr59WjjXTvLt2S8mVGKqsjAAHQA3R SvfX5/qN+6VDjBJ7u4R2VJ5VUHQAcgAUu9ufiJvvNFFRFpEV0VnUMzDZJGyTRRRUR//Z"/>',
    'google.com':'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ bWFnZVJlYWR5ccllPAAADUBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp bj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6 eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMi4yLWMwNjMgNTMu MzUyNjI0LCAyMDA4LzA3LzMwLTE4OjA1OjQxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRm PSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRl c2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9l bGVtZW50cy8xLjEvIgogICAgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hh cC8xLjAvcmlnaHRzLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9w aG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0 ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIKICAgeG1wUmlnaHRzOk1hcmtlZD0iRmFsc2UiCiAg IHhtcFJpZ2h0czpXZWJTdGF0ZW1lbnQ9IiIKICAgcGhvdG9zaG9wOkF1dGhvcnNQb3NpdGlvbj0i Ij4KICAgPGRjOnJpZ2h0cz4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9Ingt ZGVmYXVsdCIvPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnJpZ2h0cz4KICAgPGRjOmNyZWF0b3I+ CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpLz4KICAgIDwvcmRmOlNlcT4KICAgPC9kYzpjcmVh dG9yPgogICA8ZGM6dGl0bGU+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4 LWRlZmF1bHQiLz4KICAgIDwvcmRmOkFsdD4KICAgPC9kYzp0aXRsZT4KICAgPHhtcFJpZ2h0czpV c2FnZVRlcm1zPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0 Ii8+CiAgICA8L3JkZjpBbHQ+CiAgIDwveG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgIDxJcHRjNHht cENvcmU6Q3JlYXRvckNvbnRhY3RJbmZvCiAgICBJcHRjNHhtcENvcmU6Q2lBZHJFeHRhZHI9IiIK ICAgIElwdGM0eG1wQ29yZTpDaUFkckNpdHk9IiIKICAgIElwdGM0eG1wQ29yZTpDaUFkclJlZ2lv bj0iIgogICAgSXB0YzR4bXBDb3JlOkNpQWRyUGNvZGU9IiIKICAgIElwdGM0eG1wQ29yZTpDaUFk ckN0cnk9IiIKICAgIElwdGM0eG1wQ29yZTpDaVRlbFdvcms9IiIKICAgIElwdGM0eG1wQ29yZTpD aUVtYWlsV29yaz0iIgogICAgSXB0YzR4bXBDb3JlOkNpVXJsV29yaz0iIi8+CiAgPC9yZGY6RGVz Y3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg ICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz6E0RvlAAAD dUlEQVR42qyU709bVRzGP7f3lkJbSgNNJwKDAUU3bbYsODNe+AJ0msjii5lpTGY00fjGaKZGF31L NBH1vYnzxVyIizNTR4jxx5yZ89e2sBWByJgdOCaDQVtK2/v7eu4tafkDdpLnvDj3nOc8z/P93iM5 jsOdGJJL9NS7n7f3dsW+SrRsaf95Xke3JR5LhGmOhVg8eRKmJoh2teJTFNz97tW51TV+m14anVeV F46dOaorLtuD3bHvXxrsS5wYzxCMQUTxcWWlxKO9d7Pr1Rf5+50jxNRlIvf3UHYgIe24i55G6dAn P91wKZ71iPbt7u4OBYOc/ecac0WZgCKRyRUYSDSwN9GEFWwkMzaCv7AEfj/YDpIkEWtoYGeDud/l 8LlTqC7o+fRbJsX1Eo5qoKom4/MZbz2wtQ3LkrDy+TLW85j5Ncwb/6JomrfHU1R2DXvaQpy4PEtb LMrc0iq5UthbX/3xHKGcgX49gyOUeAqEBEVEYBfqnQrRqYuLvN6yhecf6uSbS3OMpWZpiQbYn2zj 4x+O8V39JPc+GcfvK5OIoAjkbUJ5k+WAr6roeOo2Rs1VDj3QzOnX+rl0bZnWphCnZkZ5b/Iojz8T IRAR0dgbPAIlMeUsUdCpaJWoRpHFoXU+u3iBbWGH0cP9YtVm5MszNNabJOp8GJonZFPjQFiICWyw e7pKBRVLs5jPaYxN3CSVXvE+DT/yCoFSB+fnzHLYor9MawOmCxnDkKpEmVyO+5okPhrczi9vPCzy qcEyTPZ2Jvni4IdIxSSTCyaaKglQgaHJ6DpVa8MHkjzdtxX1ygjazK/ol5dZtGuJ9L1Fe+cehva9 yeHTLxOvK4jAfV5GbqUd2Ye+WdHubVHyf36A8d9xgnGVxp448Q4Z7cIRCunzbG/poKtxBytruugv qQJd86EZVImKa1nRWOPUt4bw12rIUgZ/0CTWamDOjXghF0qal4cqQvcgrOm6q2iTNVOuk+zgTkoz w9Q2BJB8ilc1NVsgcs8Bfk/PMn1ziu64n6JWrpItrNWJ44ZqyxWiP/66Wtz1xNtBVWkmv/AtspVF 9tdT0znAdHiAoa/fJxayxeZa9zfzRlAJkMsqZFdJV4jOptLPiffk097kYMjp7KdYzLGQvU0qNc+5 iSGcmrzopyi3stU2Mgyb67eYVfXwwcp7dCfG/wIMAHtxjIJQBICYAAAAAElFTkSuQmCC"/>'
  },
  sprites: {
    publishIcons: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAVCAYAAACAEFoRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExOUM0M0UwNEY4MzNBNjQ2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMzI4N0VFNjM3MDAxMUUxQjBCM0UwNUUwN0ZDQkFFNSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMzI4N0VFNTM3MDAxMUUxQjBCM0UwNUUwN0ZDQkFFNSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY5N0YxMTc0MDcyMDY4MTE5QzQzRTA0RjgzM0E2NDY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY3N0YxMTc0MDcyMDY4MTE5QzQzRTA0RjgzM0E2NDY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bldjqwAABjZJREFUeNrsWWtMVEcU/nZZFXnIYwVrWUEQFUR8AdpWKZgstU0rpCW0f0xqQtqgSfsHoVETjSmWNrWkxmr6g4b+0GBtKTZVWh6ppsEqllh5yquAguCKIkgX2AWhZ65Du132ce9yd4mpX/LlztyZ+93HmTlz5lyFVqu9ACARM8dEeXm5Gyscrjgim+Z+7R5BMzY2dpgO82XQRHV1tYId3ztYKpvmsUPbBM2kpKRJBy430Ldzt9ZYlZrqkOamoiKrmiriWsgDpUnZGZrMQD8TP+N19jHGednNrK81bCEedLImTLTsQcGP90V+D9k0meFHiH6QF87QZOgkVpjUvflxSOT1Kjk1aZYzr6Gy0ryfTVYblzNv8w0xWML7y6apEnM3jUaDnTt3IiEhQagPDAwgPz8fpaWlDlvQ38MPicu2IHLRSqGuNw7jQtuvqOmpt3XZHBNPkEPcy+uf8vIjO7f1cJEmg5YYYeO6RIlGl1XTritTqVRIS0vD5s2bce7cOeTl5WFoaAgZGRlYu9Yxj65UKPFcSBxWBi7Htds1ON9YitGxUWiXJyLEb4kYCWasbJN6lgxrtdyad4gdNqiYTU2bM16pVCI8PBwNDQ2g4EM4Tk5Oor+/Hzk5OUhOTkZNTY2kJ1coFHjGexG6B26jrrcB3YM9guZfRj3eWvcGYpasx80HXWKXEy9eHpVxiZJLkxmp3Ub7buKXxKDZ0LRqeLVajfT0dMTHx8NgMKClpQUFBQVobW2Fl9fjb8POS4H3PC9sDY9HROAKjE2Mo/fhHVxsq8SdIR3cVfOEPuOPxsRIGYnvEz/idRZc6c36+PAZy/r2z4LmC8QwG+3PEgMkDibZNC0a3sfHB5mZmYiLi0NZWRmGh4exYcMGhISEYGJiArt27UJXVxfOnDkj+ok95nrg1VXbsEwdilqa6YZxA0L9QxDgpaZQdRJJK7bi/nA/Lnf+Lja6LeC0hO3Ej4mriN3EN4mXXax5ifiHjXY2sOZKNLxsmtMM7+vri6ysLMHobIY3NTUJA6GiogIBAQE4cOAAjEYjjh49is7OTlFP60lG3x71imD0i39WomewlwbCfNT3NmKBuzdS1yRjfOIRfrpRjj79vZm66xTi1+xVpmJT4lfE9SICNUmaFNHb0tTwpcMa2DNlSpz1smlOM3xKSgo2btyIkydPorCwEPv27ROi+ba2NgQFBUGv1yM3Nxd1dXWinzZGs14wemXHZVzquILXo19DZOBKcvF3ofb0wyjN/h/qz+PWg24pgdiHfPaxtbiIeIXvqY9zl2yKSGKCHcPLrcm2s4vtvMc8iQNQNs1pho+JiYFOp0NxcbEQdJ04cUJY39n59vZ2nD17VhgEUhCmXorB0Ye4euuaUC9r/oXWd53g6m/o+lDddU0YBCLAkisLiN8SXzI5n8aN5W7j2gxivos0YaYlF2TTnGb4vr4+hIWFISIiArW1tQgODhZcfUlJCSorK4U1XioeGoYQ6LUQQT6LhYh9oadacPXXe+rQdLdFGGAicZ/PSBZ0fWeSyZrKsk3YmIFtVpIyztCUCjcnDBI3SYZnMzo6OhrZ2dlobm4W9uojIyOor693yOgMbEYH+2qwfdXL6KFIfql/MAV3RnTRlk6C0adGPHMNJQ4O8nddoHmdqCM+IK4m1hIXca/SQFxH7OEDLZL3X23nPrJrTjM8W7vZHn3Hjh2IiopCVVUVTp8+LWzjHAVbu7+v+xHxoc9jiW8QWu+147eOKmEbJwG3ibGccsEZmmyvO8aja09uID+e4VvM2/1521T7XFdrWtzOMRfPZrycuEUu/pS4xIxlr1FdrZHbFx47tE3jBBcbblYPNSlHWOgTyhMzLtVU2gleHIUzNJ8kGESeG58tTWb4Rie8eOP/3PB5xA9M6mN8f11sln7dzddmd1drMlf/NjHOQtsaPP5RMcfs/FX+EOYwTWE6Q/NJQSExl0f7y3jwt5fnAlhbCE+7pvOAcpCYLEZzU1HRUFVq6j+aVD9O9f9o0rkSOmdXU6HVam21MyN9gn//+lzlqcqbljqzHzkMhyuOzEhzv3YPnsK5sPdblv2T/pyXWVrtHWtGlwBnaD7FTBM4FvAF8UW+ltTKdF9naD6FBPwtwACfiGJd+vt1SQAAAABJRU5ErkJggg=='
  },
  logoutLink: '<a href="#" onclick="ReadSocial.API.endSession(ReadSocial.UI.updateAuthStatus);return false;">Sign out</a>'
        
 
  

}

/**





ReadSocial Universal Annotation

Javascript API v1.2

Copyright (c) ReadSocial, Inc.

**Requires LAB.js for loading, jQuery, and jQuery UI for optional UI components

**Browser requirements: IE 10+, Safari 5+, Chrome and Firefox 7+

**MIT Licensed**

*/



var _RS_DEBUG = (window.location.protocol=='https:') ? false : true;
var _RS_PROXY_SIZE_LIMIT = 512000;
var _RS_ROOT = '';
var _RS_API_ROOT = '';
if(typeof window.console == 'undefined')
	window.console = { log: function () {} };

if (typeof ReadSocial == 'undefined')
	ReadSocial = {};


	
ReadSocial.API = (function () {
	


  var engine = null;
  if (window.navigator.appName == "Microsoft Internet Explorer")
  {
     // This is an IE browser. What mode is the engine in?
     if (document.documentMode) // IE8 or later
        engine = document.documentMode;
     else // IE 5-7
     {
        engine = 5; // Assume quirks mode unless proven otherwise
        if (document.compatMode)
        {
           if (document.compatMode == "CSS1Compat")
              engine = 7; // standards mode
        }
        // There is no test for IE6 standards mode because that mode  
        // was replaced by IE7 standards mode; there is no emulation.
     }
     // the engine variable now contains the document compatibility mode.
  }


  var log = function (m) {
    if(_RS_DEBUG) {
      
      if(window.navigator.userAgent.indexOf('MSIE')!==false) { // dumbass IE
        try {
          m = JSON.stringify(m);
        } catch (e) {
          ;
        }
      }
      console.log(m);

    }
  }

  ReadSocial.log = log;
  // use socket.io from local env or from rs service
  if(document.location.search.match(/uselocalio/)) {
    var urlio = "http://localhost:8088";
  } else {
    var urlio = "https://api.readsocial.net/io";
  }

  var config;
	// switch on dev environment
	var dev = (document.location.search == '?dev=1' || document.location.search == '?stage=1');
	var hash = ''; // ??
  var enabledSelector = 'p';
  var hashgroups = []; // list of preset hash groups
	var excerpt = ''; // excerpted text 
	var channel = ''; // group name (hash tag)
	var highlight = ''; // highlighted text
	var beforedate = null; // parameter for fetching prior notes
	var partnerId; // the network id on readsocial's service
  var usingSSO = false;  // using SSO for auth or not
	var useUI = true; // whether UI will be active
	var debugging = true;
	var xdframe; // xd messaging frame (deprecated)
  var uiframe; // iframe containing the UI
  var uiproxy; // proxy window object
  var iframeUI = false; // whether to launch the UI in an iframe or not
	var isXD = false; // whether xd messaging is to be used for posting notes
	var appKey = '*';
	var appToken = '*';
	var appHeaders = {
     'X-ReadSocial-App':appKey,
     'X-ReadSocial-AppToken':appToken
  };
  var scrolltop, scrollbot;
  var enableGroupSelect = false;
  var groupMenuShowing = false;
	var proxy;
	var socket;
	var authstatus;
	var session;
	var xcontentdoc, content, node, locator, thumbprint, loadCallback;
	var authed = false;
	var SID;

  // added a XD proxy channel which is only used
  // when the host domain (origin) for the UI
  // differs from the domain that delivers the
  // service - will be used for privileged ajax
  // calls such as authentication and posting

  var proxycallbacks = {};	// proxy callbacks container

  // a proxy callback reaper will clear out timed-out
  // proxied requests. if no response has been rcvd,
  // the requests are removed from the proxy container

  var proxy_cb_ttl = 200000; // time to live before getting reaped
  var proxy_cb_reap_interval = 100000; // reaper runs at this interval
	
  // LESS-like replacements

  var nfbr = '7px'; //border radius on note count
  var nfbs = '-3px 3px 5px rgba(64,64,64,.4)'; // box shadow on note count
  var nfc1 = '#333333'; // 100 % color stop
  var nfc2 = '#999999'; // 0 % color stop

  var olbr = '7px'; //border radius on overlay
  var olbs = '-3px 3px 5px rgba(64,64,64,.4)'; // box shadow on overlay
  var css_text = '.rs-text { color:white; padding:4px 8px; text-align:left; font-family:sans-serif; font-size:12px;\
   cursor:pointer; }';
  var css_group_pill =   '.group-pill { display:inline-block; \
    font-family:sans-serif; font-size:.8em; font-weight:normal;color:white; text-align:center;\
    cursor:pointer;opacity:.85; padding:1px 8px 3px 8px; margin-right:-40px;\
   border-top-left-radius:@nfbr; border-bottom-left-radius:@nfbr;\
   border-top-right-radius:@nfbr; border-bottom-right-radius:@nfbr;\
    -moz-border-top-left-radius:@nfbr;-webkit-border-top-left-radius:@nfbr;\
    -moz-border-bottom-left-radius:@nfbr;-webkit-border-bottom-left-radius:@nfbr;\
    -moz-border-top-right-radius:@nfbr;-webkit-border-top-right-radius:@nfbr;\
    -moz-border-bottom-right-radius:@nfbr;-webkit-border-bottom-right-radius:@nfbr;\
     -moz-box-shadow: @nfbs;-webkit-box-shadow: @nfbs;box-shadow:  @nfbs;\
       background: -moz-linear-gradient(top, @nfc2 0%, @nfc1 100%) !important;\
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,@nfc2), color-stop(100%,@nfc1)) !important;\
         filter:  progid:DXImageTransform.Microsoft.gradient(startColorStr='+"'"+'@nfc1'+"'"+', EndColorStr='+"'"+'@nfc2'+"'"+');\
          -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='+"'"+'@nfc1'+"'"+', EndColorStr='+"'"+'@nfc2'+"'"+')"; }';
  var css_noteflag =   '.note-flag {display:none; text-align:center; opacity:.55; margin-right:-40px;\
   border-top-left-radius:@nfbr; border-bottom-left-radius:@nfbr;\
   border-top-right-radius:@nfbr; border-bottom-right-radius:@nfbr;\
    -moz-border-top-left-radius:@nfbr;-webkit-border-top-left-radius:@nfbr;\
    -moz-border-bottom-left-radius:@nfbr;-webkit-border-bottom-left-radius:@nfbr;\
    -moz-border-top-right-radius:@nfbr;-webkit-border-top-right-radius:@nfbr;\
    -moz-border-bottom-right-radius:@nfbr;-webkit-border-bottom-right-radius:@nfbr;\
     -moz-box-shadow: @nfbs;-webkit-box-shadow: @nfbs;box-shadow:  @nfbs;\
       background: -moz-linear-gradient(top, @nfc2 0%, @nfc1 100%) !important;\
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,@nfc2), color-stop(100%,@nfc1)) !important;\
         filter:  progid:DXImageTransform.Microsoft.gradient(startColorStr='+"'"+'@nfc1'+"'"+', EndColorStr='+"'"+'@nfc2'+"'"+');\
          -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='+"'"+'@nfc1'+"'"+', EndColorStr='+"'"+'@nfc2'+"'"+')"; }';
  var css_overlay =       '#readsocial_hashlist { position:absolute; top:0; right:0;  }';
   var css_overlay_pill =  '#rs-group-pill, #readsocial_hashlist ul, .rs-poweredby {\
        border-top-left-radius:@olbr; border-bottom-left-radius:@olbr;\
   border-top-right-radius:@olbr; border-bottom-right-radius:@olbr;\
    -moz-border-top-left-radius:@olbr;-webkit-border-top-left-radius:@olbr;\
    -moz-border-bottom-left-radius:@olbr;-webkit-border-bottom-left-radius:@olbr;\
    -moz-border-top-right-radius:@olbr;-webkit-border-top-right-radius:@olbr;\
    -moz-border-bottom-right-radius:@olbr;-webkit-border-bottom-right-radius:@olbr;\
     -moz-box-shadow: @olbs;-webkit-box-shadow: @olbs;box-shadow:  @olbs;\
       background: -moz-linear-gradient(top, @nfc2 0%, @nfc1 100%) !important;\
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,@nfc2), color-stop(100%,@nfc1)) !important;\
         filter:  progid:DXImageTransform.Microsoft.gradient(startColorStr='+"'"+'@nfc1'+"'"+', EndColorStr='+"'"+'@nfc2'+"'"+');\
          -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='+"'"+'@nfc1'+"'"+', EndColorStr='+"'"+'@nfc2'+"'"+')"; }';

  var css_overlay_menu =   '#readsocial_hashlist ul { display:none; padding:5px 8px; width:120px; position:absolute; right:0; margin:10px 0 0 4px; list-style-type:none !important; }\
   #readsocial_hashlist ul li {\
    text-align:left !important;  }';

  var logo = 'data:image/png;base64,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';
  
  var css_logo = '.rs-poweredby { display:inline-block;vertical-align:middle;padding:6px 18px 0 16px;float:right;font-size:10px;margin:2px;background-color:#333 } .rs-logo {display:inline-block;padding:3px 2px;vertical-align:middle;height:20px;width:121px; background: transparent url('+logo+') top left no-repeat;}';

  var styles = [
      css_text,
      css_noteflag.replace(
            /@nfbr/g, nfbr).replace(
            /@nfbs/g, nfbs).replace(
            /@nfc1/g, nfc1).replace(
            /@nfc2/g, nfc2),
      css_group_pill.replace(
          /@nfbr/g, nfbr).replace(
          /@nfbs/g, nfbs).replace(
          /@nfc1/g, nfc1).replace(
          /@nfc2/g, nfc2),
      css_overlay,
      css_overlay_pill.replace(
            /@olbr/g, olbr).replace(
            /@olbs/g, olbs).replace(
            /@nfc1/g, nfc1).replace(
            /@nfc2/g, nfc2),
      css_overlay_menu,
      css_logo
  ];

  function _setContentDoc(c)
  {

    /*
      Sets the container for the active content (usually a div
      containing a set of paragraph elements to make selectable)
    */

    if(typeof c == 'undefined') throw ('Undefined content doc!');
    if(typeof c.css == 'function') { // jQuery
      xcontentdoc = c;
    } else if (jQuery(c).size()>0) { // selector
      xcontentdoc = jQuery(c);
    } else { // assume its a string ID
      document.getElementById(c);
  		if(!xcontentdoc) {
  			xcontentdoc = document.getElementsByTagName('body').item(0);
  			if(!xcontentdoc) {
  				xcontentdoc = document;
  			}
  		}
  		xcontentdoc = jQuery(xcontentdoc);
  	}

		if(typeof xcontentdoc == 'undefined') {
			//ReadSocial.log('Error: content doc area undefined');
			throw ('Content doc area undefined');
		}
		content = jQuery('p', xcontentdoc);

		return xcontentdoc;
  }

  function _initPassive(configObj,cb) {
    
    /*
      
      Passive init, must be called when using this as a library for authenticated
      requests, ie Session Handlers on top of it.

    */


    config = configObj;

    var host_uri, api_uri, id, ch, c, cb, useUI;
    
   // host_uri = config.host_uri;
    host_uri = config.base;
    api_uri = config.api_base;
    id = config.partner_id;
    ch = config.group_id;
    thumbprint = config.par_hash;
    _RS_API_ROOT = config.api_base;
    _RS_ROOT = config.base;
    var pre = _RS_ROOT;   

    if(typeof id != 'number') id = parseInt(id);
    
    if(typeof ch != 'string') throw "Group id must a character string.";

    //ReadSocial.log(config);

    channel = _createChannelName(ch);
    partnerId = id;

    var afterHashLoad = function () {
        if(typeof config.par_body !== 'undefined') {
          

          //ReadSocial.log('setting context...');


          context = ReadSocial.hasher.normalize(config.par_body);
          thumbprint = ReadSocial.hasher.thumbprint(context);

          if(thumbprint !== config.par_hash) {
            throw "Wrong hash ID!";
          }

    
          ReadSocial.log('ReadSocial API PASSIVE init on host '+host_uri+' for partner id '+id+' with channel '+ch+' on API endpoint '+api_uri);
          
          cb();



        }
     };

     if(typeof ReadSocial.hasher !== 'undefined') {
        afterHashLoad();
     } else {
       $LAB.script(_formatLibUrl("js/readsocial/libRSHASH.js")).wait(afterHashLoad);
     }


  }

	function _init(configObj) {
		
    /*
      
      ReadSocial.API.init - called from main readsocial() bootstrapper 

      Do not call this if using this as a base library, eg for the UI in another frame

      Call this only when initing for non-authed access (no SSO or oAuth)

    */
    
    ReadSocial.log('init');

    config = configObj;

    ReadSocial.log(configObj);

    if(typeof config.use_iframe !== "undefined") {

      config.use_iframe = (config.use_iframe==="true"||config.use_iframe===true||config.use_iframe===1) ? true : false;

    } else {
      config.use_iframe = true; // default
    }


    enabledSelector = config.selector || enabledSelector;

    iframeUI = config.use_iframe;

    //setInterval(_reapProxyCallbacks, proxy_cb_reap_interval);
    

		var host_uri, api_uri, id, ch, c, cb, useUI;
		
   // host_uri = config.host_uri;
    _RS_ROOT = config.base;
    _RS_API_ROOT = config.api_base;


    host_uri = _RS_ROOT;
    api_uri = _RS_API_ROOT;
    id = config.partner_id;
    ch = config.group_id;
    c = config.container;
    usingSSO = config.use_sso || false;
    cb = config.load_handler;
    /*
    if(typeof config.session !=='undefined') {


      session = config.session;
      ReadSocial.log('session set:');
      ReadSocial.log(session);
      ReadSocial.API.authed = authed = session.authed;
      usingSSO = true;
      ssoConfig = config;
      ReadSocial.log('ssoConfig set');
      ReadSocial.log(ssoConfig);
      var d = {
        stat: session
      }
      _oauthCallback(d);
    }

    */


    /* default hash group list or from config */
    hashgroups = config.hashgroups || [{name: "partner-testing-channel"}, {name: "travis"}, {name: "aaron"}, {name: "memex"} ];
    ReadSocial.log('hashgroups set:');
    //ReadSocial.log(config.hashgroups);
    config.use_ui = (config.use_ui=="true"||config.use_ui==1) ? true : false;
		useUI = config.use_ui;
    if(typeof config.app_key !='undefined') { // application-level authentication
      appKey = config.app_key;
      appToken = '*'; // 
    }

		var pre = _RS_ROOT;		

		if(typeof id != 'number') id = parseInt(id);
    
		if(typeof ch != 'string') throw "Group id must a character string.";
		
		ReadSocial.log('ReadSocial API init on host '+host_uri+' for partner id '+id+' with channel '+ch+' on API endpoint '+api_uri);
		
		channel = _createChannelName(ch);
		partnerId = id;

		loadCallback = cb;
		
    //ReadSocial.log('xcontentdoc:'+config.container);
      
    xcontentdoc = _setContentDoc(config.container);

    /* load external dependencies */

    var loadedDeps = function () { 

               jQuery(document).ready(function () {/*
                 socket = io.connect(urlio, {resource: 'io'});
                 socket.on('message', function(data) {
                   ReadSocial.log('++++++incoming from socket:')
                   ReadSocial.log(data);
                 });*/
               });
             
              // mustache style templates
              _.templateSettings = {
                interpolate : /\{\{(.+?)\}\}/g
              };

           //   if(typeof document.location.origin == 'undefined') {
                isXD = false;
      //ReadSocial.log('go');

      if(typeof content == 'undefined') {
        ReadSocial.log('Error: content elements empty set -- no paragraphs in this document!');
      }

      ReadSocial.log('setting up...');    

      var w = jQuery(window);

      scrolltop = w.scrollTop();
      scrollbot = scrolltop + w.height();

      if(typeof xcontentdoc === 'undefined') throw "xcontentdoc not defined!";

      ReadSocial.log(xcontentdoc);

      xcontentdoc.prepend(['<style>',styles.join("\n\n"),'</style>'].join(''));

      xcontentdoc.append('<div class="rs-poweredby rs-text">Powered By <div id="rs-logolink" class="rs-logo"></div> in NYC</div>')

      $('#rs-logolink').wrap('<a href="https://www.readsocial.net"></a>');

      $(xcontentdoc).css({
        position:'relative'
      });

      var coll = jQuery(enabledSelector,xcontentdoc);
      
      ReadSocial.log(coll);

      // for figment, remove blocker img from flow
      jQuery('#scrollbox img').hide();
      
      // clobber existing handlers which might interfere
      //coll.unbind('click');
      //coll.unbind('mousedown');
     // coll.unbind('mouseup');
     // coll.unbind('mousemove');
      
      coll.mousedown(ReadSocial.Sel.toggle);
      coll.mouseup(ReadSocial.Sel.toggle);
      coll.mousemove(ReadSocial.Sel.toggle);
      coll.mouseout(ReadSocial.Sel.toggle);
      coll.mouseover(ReadSocial.Sel.toggle);
      
      jQuery(xcontentdoc).bind('scroll', _repositionNoteFlags);  
        
      coll.bind('count', _handleNoteCount);
      
      var w = jQuery(window);            

      _refreshNoteCounts();

      _setupChannelBar();

      w.bind('scroll',_countTrigger);
      w.bind('scroll', ReadSocial.Sel.clearAll);
      w.bind('resize',_countTrigger);
      if(typeof xcontentdoc == 'undefined') throw "xcontentdoc must be defined here!!!";
      xcontentdoc.bind('scroll',_countTrigger);
      xcontentdoc.bind('resize',_countTrigger);
      xcontentdoc.bind('mouseup',function (e) {
        ReadSocial.log(e);
        if(e.target.nodeName.toLowerCase()!='p') {
          ReadSocial.Sel.clearAll();            
        }

      });
      ReadSocial.log('bound');
      ReadSocial.Sel.init();
      ReadSocial.log('selection enabled');

      loadCallback();
    };

    if(typeof ReadSocial.Sel !=='undefined' && typeof ReadSocial.hasher != 'undefined') {

      loadedDeps();

    } else {

      $LAB
           .script(_formatLibUrl("js/readsocial/libRSSel.js")).wait()
           .script(_formatLibUrl("js/readsocial/libRSHASH.js"))/*
           .script(urlio+'/socket.io/socket.io.js')*/
           .wait(loadedDeps);
    
    }

  
	}
	

  function _setupChannelBar()
  {

    // only supprt this in iframe mode or when explicity enabled
    if(!iframeUI || !enableGroupSelect) return;

    var hashList = '<div id="readsocial_hashlist" class="rs-text dropSelector titleItem titleSelector" style=""><div id="rs-group-pill" class="rs-text">#{{channel}}</div><ul></ul></div>';
    var hashItem = '<li class="rs-text"><a data-name="{{ data }}">{{ name }}</a></li>';
     _renderUI = _.template(hashList);     

    jQuery(xcontentdoc).append(_renderUI({
      channel:channel
    }));

    //ReadSocial.log('rendering hashgroups');
    //ReadSocial.log(hashgroups);
    for(var i=0; i < hashgroups.length; i++) {

      var hashgroup = hashgroups[i];
      
      //ReadSocial.log(hashgroup);

      _renderUI = _.template(hashItem);
    
      jQuery('#readsocial_hashlist ul').append(_renderUI({
        name: '#'+hashgroup.name,
        data: hashgroup.name
      }));
      
    
    }

    jQuery('#rs-group-pill').click(function (e) {
      if(groupMenuShowing) {
        _hideGroupMenu();

      } else {
        _showGroupMenu();

      }
    });

    jQuery('#readsocial_hashlist ul a').click(function (e) {

      var newgroup = jQuery(this).attr('data-name');

      if(newgroup) {
        _changeGroup(newgroup);                  
      }
      
    });
  }

  function _changeGroup(groupname) {
      
       _setChannel(groupname);

       jQuery('#rs-group-pill').html('#'+_getChannel());

       _hideGroupMenu();

       // clear note count cache and recount
       _expireCount(jQuery('p',contentdoc)).trigger('count');

  }


  function _showGroupMenu() {
    jQuery('#readsocial_hashlist ul').css({
                                        opacity:0,
                                        position:'absolute',
                                        backgroundColor:'#333'
                                      })
                                      .show()
                                      .animate(
                                          {
                                            opacity:1
                                          }, 300, 'swing', function() {
                                            //ReadSocial.log('group menu shown');
                                                    groupMenuShowing = true;
                                          });
  }

  function _hideGroupMenu() {
    jQuery('#readsocial_hashlist ul').animate({
                                      opacity:0
                                    }, 300, 'swing', function (n) {
                                        //ReadSocial.log('group menu hidden');
                                        $(this).hide();
                                        groupMenuShowing = false;
                                    });
  }
/*
  function  _createProxyChannel(cb)
  { // requires porthole
    // set the ready callback and dont finish init until we get a ready event back:
    //ReadSocial.log('awaiting proxy channel...');
    _xdReadyCallback = cb;
    var xdAuthURL = _formatUrl(
                                  '/v1/{partnerId}/auth/sessionframe?rid={partnerId}&amp;s='+
                                  escape(window.location.href),
                                  [ partnerId, partnerId ]
                              );
    jQuery(document.body).append('<iframe scrolling="0" name="readsocial-xd-proxy" src="'+xdAuthURL+'" class="readsocial-xd" tabindex="-1" role="presentation" style="position:absolute;top:-9999px;overflow:none"></iframe>');
    xdframe = jQuery('iframe.readsocial-xd');
    proxy = new Porthole.WindowProxy(xdAuthURL, 'readsocial-xd-proxy');
    proxy.addEventListener(_handleProxyIncoming);
    
  }
*/

  function _initUI(o)
  {

    //ReadSocial.log('RSAPI - initUI config:');
    //ReadSocial.log(o);

    var h = ReadSocial.hasher.normalize(highlight);
    var c = ReadSocial.hasher.normalize(context);
    
    var g = [];

    for(var i=0; i < hashgroups.length; i++) {
      var hashgroup = hashgroups[i];
      g.push(_createChannelName(hashgroup.name));
    }

    var query = $.extend({
      rid:partnerId,
      base: _RS_ROOT,
      api: _RS_API_ROOT,
      s:window.location.href,
      par_body:c,
      par_hash:thumbprint,
      l:c.indexOf(h),
      r:c.indexOf(h)+h.length,
      g:g.join('|'),
      ch:channel,
      v:o.view,
      sso:usingSSO,
      iframe:iframeUI,
      debug:'true'
    },o);


    var url = _formatUrl(
                                  '/js/readsocial/ui.html?'+$.param(query),
                                  [ partnerId, partnerId ]
                              );



    if(iframeUI) {


      var proxytarget = 'readsocialUiProxy';
      
      if(typeof uiframe==='undefined') { // have not made it yet
        $(document.body).append('<iframe name="readsocialUiProxy" style="position:fixed;left:-9999px;z-index:10200;border:none;background:none transparent !important" allowtransparency="true" id="readsocial-ui"></iframe>');
        uiframe = $('#readsocial-ui');
        //ReadSocial.log('created ui iframe offstage left');
      }

      uiframe.css({
                          top:'0',
                          left:'0',
                          width:'100%',
                          height:'100%',
                          opacity:'0'
      });

      _uiReadyCallback = function () {

          ReadSocial.log('uiReadyCallback()');
          uiframe.css({      
                              opacity:'1'
            });
          uiproxy.postMessage({
              op: 'func',
              data: {
                call: 'launcherCallback',
                data: {
                  uri:_RS_ROOT,
                  session:session,
                  hashgroups:hashgroups
                }
              }
          });
      }
      
      uiframe[0].src = url;


      //ReadSocial.log('launching '+url+' in iframe');


    } else {

      var proxytarget = 'readsocialUiProxySeparate';

      //ReadSocial.log('launching '+url+' in new window');

      window.open(url, proxytarget);

    }

    //ReadSocial.log('From '+window.location.href+' Setting up UI proxy channel on '+url+'...');

    uiproxy = new Porthole.WindowProxy(url, proxytarget);

    uiproxy.addEventListener(_handleUIProxyIncoming);

  }


  function _popXdFrame(o)
  {
    xdframe.css(o);
  }
  
  function _getXdFrame(o)
  {
    return xdframe;
  }
  
  
  function _getEligibleContent()
  {
    return content;
  }

  function _getContentDoc()
  {
    return xcontentdoc;
  }
	
	
	function _getChannel(channelname)
	{
		return channel;
	}	
	
	function _setChannel(channelname)
	{
	  //ReadSocial.log('setChannel called');
		channel = _createChannelName(channelname);
		//ReadSocial.log('set channel to '+channel);
	}
	
	function _setContext(c)
	{
	  context = ReadSocial.hasher.normalize(c);
	  thumbprint = ReadSocial.hasher.thumbprint(context);
		//ReadSocial.log('set context to '+context);
		//ReadSocial.log('set thumbprint to '+thumbprint);	  
	}
	
  function _getContext()
  {
    return context;
  }

	function _setHighlight(h)
	{
    highlight = h;
    //ReadSocial.log('set highlight to '+highlight);
	}
	
	function _getHighlight()
	{
    return highlight;
	}

	function _getLocator(l)
	{
    return locator;
	}
	
	function _setLocator(l)
	{
    locator = l;
    //ReadSocial.log('set locator to '+locator);

	}

	function _setNode(n)
	{
    node = n;
    //ReadSocial.log('set node to '+node);
    
	}

	function _setBeforedate(t)
	{
	  beforedate = t;
	  //ReadSocial.log('set beforedate to '+beforedate);
  }

	/* Control methods/data routing */



  function _getCurrentPara()
  {
    if(typeof ReadSocial.Sel !=='undefined') {
      return ReadSocial.Sel.getCurrentPara();
    }
  }

	function _createChannelName(s)
	{
		var ss = s.replace(/[^A-Za-z0-9\- ]/g,'').toLowerCase();
    return ss.replace(/ /g, '-');
	}
	
  function _refreshNotes(cb)
  {
    // resets date and makes call to getNotes
    
		beforedate = null;
		_getNotes(cb);
		
  }
  
	function _getNotes(cb)
	{
	  // pass in a paragraph to get notes about that paragraph
	  if(typeof cb == 'undefined') throw "This function requires a callback function argument.";
    if(typeof thumbprint == 'undefined') throw "This function requires a thumbprint to be defined.";
    //ReadSocial.log('getting notes...');
	  var d = {};
	 
	  var url = (!beforedate) ?
	    _formatUrl('/v1/{partnerId}/{channel}/notes?par_hash={par_hash}',
	                      [partnerId, channel, thumbprint]) :
	    _formatUrl('/v1/{partnerId}/{channel}/notes?par_hash={par_hash}&before={beforedate}',
	                      [partnerId, channel, thumbprint,  beforedate]);
	                      
	  //ReadSocial.log('URL is '+url);
	  jQuery.ajax({
	    url: url,
			data: d,
			complete: function (s,d,x) {
				var d = jQuery.parseJSON(s.responseText);
  	    if(d.length) {
    	    var lastnote = d[d.length-1];
    	    if (typeof lastnote != 'undefined') {
    	      _setBeforedate(lastnote.crstamp);
    	    }
        }
  		  cb(d);
			}
		});
	}
	
	function _getResponses(note_id, cb)
	{

	  if(typeof cb == 'undefined') throw "This function requires a callback function argument.";
	  
    //ReadSocial.log('getting responses to note_id '+note_id+' ...');

	  var url = _formatUrl('/v1/{partnerId}/notes/{note_id}/responses', [partnerId,note_id]);
	                      
	  //ReadSocial.log('URL is '+url);
	  
	  jQuery.ajax({
	    url: url,
			complete: function (s,d,x) {
				var d = jQuery.parseJSON(s.responseText);
				//ReadSocial.log(d);
  		  cb(d);
			}
		});
	}
	
	function _getNoteDetail(noteId, cb)
  {
        

    if(typeof noteId=='undefined') {
      //ReadSocial.log('noteId must be defined to fetch a note detail');
      return;
    }

    jQuery.ajax({
      
      url: _formatUrl('/v1/{net_id}/notes/{note_id}', [

        partnerId,
        noteId

      ]),
      type: 'get',
      complete: function (s,d,x) {
        
        var d = jQuery.parseJSON(s.responseText);
        
        cb(d);
        
      }
    });

  }
  
	function _postNote(n, cb) {

    // pass in either a string n, as the note body, or
    // an object n, of the form:
    // { link: "", img: "", body: "" }
    // depending on which properties you set, the
    // content will be displayed as an image, link
    // or enhanced note

    if(
      typeof channel=='undefined' ||
       typeof context=='undefined'
    ) throw "Both channel (group) and context (paragraph text) must be defined before calling this.";
    
    var hi_raw =  highlight;
    var hi_nrml = ReadSocial.hasher.normalize(hi_raw);
    var hi_hash = ReadSocial.hasher.thumbprint(hi_nrml);
    var link, img, note;
    
	  
	  if(typeof n=='object') {
	    var link = n.link;
	    var img = n.img;
	    var note = n.body;
	    var mtype = n.mtype;
	  } else {
	    var note = n;
	    var mtype = 'text';
	  }
	  
		var d = {
			doc_url: window.location.href,
			doc_title: window.document.title,
			doc_view: window.location.search,
			lang: window.navigator.language,
			crstamp: (new Date()).getTime(),
	    note_body: note,
	    note_link: link,
	    note_img: img,
      hi_raw: highlight,
  	  hi_nrml: ReadSocial.hasher.normalize(highlight),
  	  hi_hash: ReadSocial.hasher.thumbprint(highlight),
  	  par_hash: thumbprint,
  	  par_body: context,
  	  sel: ReadSocial.API.getLocator()
		};

  	if(typeof channel == 'undefined' || typeof partnerId == 'undefined') throw ('must set a net id and group hashtag before creating notes');

    var url = _formatUrl('/v1/{partnerId}/{channel}/notes/create', [partnerId, channel]);
    
    d.channel = channel;

		var o = {
		  url:url,
			type: 'post',
			data: JSON.stringify(d),
			contentType: "application/json",
			error: function (r) {
			  if(r.status==401) {
			    //ReadSocial.log('401-Auth Required');
			    var d = jQuery.parseJSON(r.responseText);
          cb({auth:d.url});
			  }
			},
			success: function (s,d,x) {
			  cb(s);
				_callHandlers('postComplete', s);
			}
		};
		_smartRequest(o);
		
	}

	function _postResponse(note_id, response, cb) {

		var d = {
			crstamp: (new Date()).getTime(),
			resp_body: response,
			note_id: note_id
		};

  	if(typeof channel == 'undefined' || typeof partnerId == 'undefined') throw ('must set a net id and group hashtag before creating notes');
		
    var url = _formatUrl('/v1/{partnerId}/notes/{note_id}/responses/create', [partnerId,note_id]);

    var o = {
		  url:url,
			type: 'post',
			data: JSON.stringify(d),
			contentType: "application/json",
			error: function (r) {
			  if(r.status==401) {
			    //ReadSocial.log('401-Auth Required');
			    var d = jQuery.parseJSON(r.responseText);
          cb({auth:d.url});
			  }
			},
			success: function (s,d,x) {
			  cb(s);
				_callHandlers('responseComplete', s);
			}
		};
		_smartRequest(o);
		
	}

  function _reapProxyCallbacks()
  {
//    ReadSocial.log('the reaper is calling...');
    for(prop in proxycallbacks) {
  //    ReadSocial.log('checking proxy callback:'+prop);
      var s = /xdcb_(\d+?)_/.exec(prop);
      if(!s) throw "Bad xd callback signature. Something is b0rken!";
      var expired = ((new Date()).getTime()-proxy_cb_ttl) > s[1];
      if(expired) {
    //    ReadSocial.log('removing an expired proxy callback:'+prop);
        delete proxycallbacks[prop];
      }      
    }
//    ReadSocial.log('proxy callback object:');
//    ReadSocial.log(proxycallbacks);
  }
  
  function _runProxyCb(o)
  {
    var opid = o.opid;
    var cbname = o.cbname;
    var d = o.json;
    if(typeof proxycallbacks[opid] != 'undefined') {
      if(typeof proxycallbacks[opid][cbname] != 'undefined') {
        var cb = proxycallbacks[opid][cbname];
        // quite a hack here
        if(cbname=='success') {
          cb(d,cbname,{responseText:d});
        } else {
          cb({error:cbname});          
        }
        delete proxycallbacks[opid][cbname];
      } else {
        //ReadSocial.log('callback name '+cbname+' is undefined');
      }
    } else {
      //ReadSocial.log('callback operation id '+opid+' is undefined');      
    }
  }
  
  function _handleSocketIncoming(data)
  {

    //ReadSocial.log(data);
    //var div = $("<div></div>");
    //div.text(data);
    //$("#messages").prepend(div);
  
  }



  function _handleUIProxyIncoming (e)
  {
    // first time:
    var o = e.data;
    ReadSocial.log('incoming proxy');
    ReadSocial.log(e);
    if(typeof o != 'object') { // this will happen with IE 8 and 9
      // OR if there's some error happening
      // either way, we make one attempt to parse as JSON
      // and if we can't we fail by returning false
      //throw "Invalid data format from proxy channel!";
      ReadSocial.log("Type is "+typeof o);
      ReadSocial.log("Value is "+e.data);
      
      try {
        var o = jQuery.parseJSON(o);
      } catch (e) {
        return;
      }
    }
    switch(o.op) {

      case 'log':
        ReadSocial.log(o.d);
        break;
      case 'func': 
         if(typeof exports !== 'undefined') {
           if(typeof exports[o.d.name] !== 'undefined') {
             exports[o.d.name].apply(this,o.d.args);          
           }
         }
         break;
      case 'auth':
        ReadSocial.log('UI listener:got auth');
        ReadSocial.log(o.d);
      case 'ready':
        ReadSocial.log('UI listener:got ready signal');
        _uiReadyCallback();
        break;
      case 'hide':
        ReadSocial.log('UI listener:got hide event');
        uiframe.css({

          position:'absolute',
          left:'-9999px',
          width:'1px',
          zIndex:'-1',
          background:'none transparent'

        });
        uiframe.remove();
        uiframe = undefined;
        break;
      default:
      break;

    }
  }

  function _handleProxyIncoming(e)
  {
    var o = e.data;
    ReadSocial.log('Incoming from remote child frame');
    ReadSocial.log(e);
    if(typeof o != 'object') { // this will happen with IE 8 and 9
      // OR if there's some error happening
      // either way, we make one attempt to parse as JSON
      // and if we can't we fail by returning false
      //throw "Invalid data format from proxy channel!";
      ReadSocial.log("Type is "+typeof o);
      ReadSocial.log("Value is "+e.data);
      
      try {
        var o = jQuery.parseJSON(o);
      } catch (e) {
        return;
      }

    }
  
    switch(o.op) {
     case('func'):
       ReadSocial.log('Incoming proxy func event');
       if(typeof exports !== 'undefined') {
         if(typeof exports[o.d.name] !== 'undefined') {
           exports[o.d.name].apply(this,o.d.args);          
         }
       }
     case('cb'): /* when op='cb' we interpret as a proxied callback */
       ReadSocial.log('Incoming proxy callback event');
       ReadSocial.log(o);
       /* the .d property should hold the object data */
       /* opid - the corresponding proxied callback id */
       /* cbname - the name of this callback property, eg 'complete' 'error' etc */
       /* json - json representation of the payload */
       _runProxyCb(o);
       break;
     case('log'):
       ReadSocial.log('Incoming proxy log event:');
       ReadSocial.log(o.d.m);
       break;
     case('auth'):
       ReadSocial.log('Xd auth event:');
       _oauthCallback(o.d);
       break;
     case('ready'):
       ReadSocial.log('Xd ready event:');
       _xdReadyCallback();
       break;
     default:
       ReadSocial.log('unsupported proxy op');
       break; 
    }
    
    
  }
  
  function _xdReadyCallback() {;}
  function _uiReadyCallback() {;}
/*
  function _proxy(o)
  {

    // cross domain proxy for ajax requests
    // allows requests to retain headers from
    // readsocial domain, including cookies
    
    if (typeof o.data != 'undefined') {
      // if data contains a long string, stream it
      if(o.data.length > _RS_PROXY_SIZE_LIMIT) {
        _streamProxy(o);        
      }
    }

    // the id for this call
    var id = 'xdcb_'+(new Date()).getTime()+'_'+Math.round(Math.random()*1000000);
    var haul = {
      
      op:'ajax', 
      cbid:id, 
      d:{}
      
    };
    for(prop in o) {
      
      if(typeof o[prop] == 'function') {
        // cannot serialize functions in older browsers
        // store the function in a callback with an id
        // then store the id in the transport itself, to be
        // invoked when the transport container comes back
        if(typeof proxycallbacks[id] == 'undefined') proxycallbacks[id] = {};
        proxycallbacks[id][prop] = o[prop];
      
      } else { // add other data to the payload
   
        haul.d[prop] = o[prop];
   
      }
    }
    proxy.postMessage(haul);
    
  }
  */
  
  function _streamProxy(o)
  {
    /* A streaming x-domain proxy for large data objects */
    /* Takes a JSON serialization of a fat object */
    /* o.data contains a JSON string payload, a la jquery */
    

    // the id for this call
    
    var id = 'xdcb_'+(new Date()).getTime()+'_'+Math.round(Math.random()*1000000);

    var json = o.data;
  
    // chunk it up
    var chunks = [];
    var chunkSize = 4096 * 4;
    var numChunks = (json.length/chunkSize);
    //ReadSocial.log('numChunks is '+numChunks);

    for(var p=0; p < json.length; p = p + chunkSize) {
      //ReadSocial.log(p+'+'+chunkSize);
      chunks.push(json.substr(p,chunkSize));
    }
    ReadSocial.log('chunked into '+chunks.length+' parts');

    // load into an x-domain streamhauler
    var streamhaul = [];
    for(var c=0; c < chunks.length; c++) {
      var chunk = chunks[c];
      streamhaul.push({
        op:'streamhaul', /* indicate the operation type */
        cbid:id, /* identify the id for all callbacks */
        chunkid:c,
        totalnum:chunks.length,
        d:chunk
      });
    }

    var haul = {
      
      op:'stream', /* indicate the operation type */
      cbid:id, /* identify the id for all callbacks */
      d:{}
      
    };

    for(prop in o) {
        if(typeof o[prop] == 'function') {
          // cannot serialize functions 
          if(typeof proxycallbacks[id] == 'undefined') proxycallbacks[id] = {};
          proxycallbacks[id][prop] = o[prop];

        } else if (prop != 'data') {
          // 'data' prop goes to stream,
          // but add other prop values here
          
          haul.d[prop] = o[prop];
        }
    }
    
    // start the stream - no callback til complete:
    proxy.postMessage(haul);

    for(var i = 0; i < streamhaul.length; i++) {
      proxy.postMessage(streamhaul[i]);
    }

    
  }

  function _xdDom(sel,html)
  {
    if(isXD) {
      // inject some html in the xd frame dom
      proxy.postMessage({
        op:'dom',
        d:{
          sel:sel, 
          html:html
      }});
    }
 
  }
  
  function _smartRequest(o)
  {
      
      // XD func here is defunct and obsolete

/*    if(isXD) {
      ReadSocial.log('going to use XD channel for this request:');
      //ReadSocial.log(o);
      _proxy(o);
    
    } else {
      */
      o.xhrFields = {
           withCredentials: true
      };

      jQuery.ajax(o);

    //}
    
  }
  
  function _getAuthStatus(cb)
  {
    cb(session);
  }
  
/*
  function _getAuthStatus(cb)
  {
    ReadSocial.log('getting auth status');
    var u = _formatUrl('/v1/{partnerId}/auth/status', [partnerId]);
    ReadSocial.log(u);
    var transport = {
      url:u,
      error: function (jqXHR) {
        ReadSocial.log('error getting auth status');
			  cb({error:jqXHR.status});
			},
      success: function (data, textStatus, jqXHR) {
        
        ReadSocial.log('got auth status return call');
        ReadSocial.log(data);
        ReadSocial.log(textStatus);
        ReadSocial.log(jqXHR);
        
        var d = jQuery.parseJSON(jqXHR.responseText);
        ReadSocial.log(jqXHR);
        ReadSocial.API.authed = d.authed;
        cb(d);
      }
    };
    _smartRequest(transport);
  }
  */
  

  function _getNotesCount(phash, cb)
  {
    
    jQuery.ajax({
      url:_formatUrl('/v1/{partnerId}/{channel}/notes/count?par_hash={phash}', [partnerId,channel,phash]),
      error: function (jqXHR) {
			  if(jqXHR.status==502) {
          cb({count:0});
			  } else {
			    cb({count:0});
			  }
			},
      success: function (data, textStatus, jqXHR) {
        if(typeof jqXHR !== 'undefined') {
          var d = jQuery.parseJSON(jqXHR.responseText);
          cb(d);
        } else {
          cb({count:0});
        }
      }
    });
    
    
  }
  
  function _formatLibUrl(url)
 	{
// 	  if(window.location.pathname.match(/\.html?$/i)) { // static file load
 	//    return url;
 	//  } else {
 	    return _RS_ROOT + '/' +url
 	//  }
 	}
 	
  function _formatUrl(url, args)
  {
    //var base = (url.match(/^\/v1\//) || url.match(/auth\.html/)) ? _RS_API_ROOT : _RS_ROOT;
    // override the above with the below:
    var base = _RS_API_ROOT;
    
    if(typeof args=='undefined') return base + url;
    
    //ReadSocial.log(url);
    for(var i = 0; i < args.length; i++) {
  //    ReadSocial.log('URL argument:'+args[i]);
      url = url.replace(
        /\{[^\}]+?\}/, args[i]
      );
    }
    return base + url;
  }
  
  function setCookie(name,value,expires,path,domain,secure){var today=new Date();today.setTime(today.getTime());if(expires){expires=expires*1000*60*60*24}var expires_date=new Date(today.getTime()+(expires));document.cookie=name+"="+encodeURIComponent(value)+((expires)?";expires="+expires_date.toGMTString():"")+((path)?";path="+path:"")+((domain)?";domain="+domain:"")+((secure)?";secure":"")};  


  function _isXd() 
  {
    return isXD;
  }


  function _requestAuthXd()
  {
    if(arguments.length) {
      var e = arguments[1];
    }
    var haul = {
      op:'auth', /* indicate the operation type */
      d:{
       
      }
    };
    proxy.postMessage(haul);
  }

  function _oauthCallback(d)
  {
    ReadSocial.log('OAuth callback');

    // for some reason we have 2 diff obj structs
    // coming back in diff situations, like sso
    // versus xd oauth. so we check to see which one

    if(typeof d.stat !== 'undefined') {
      if(typeof session === 'undefined') {
        ReadSocial.API.authed = d.stat.authed;
        session = d.stat;
      }
    } else {
      ReadSocial.API.authed = d.authed;
      session = d;
    }

    if(typeof ReadSocial.Auth !== 'undefined') {
      ReadSocial.log('Auth is defined, sending message...');
      ReadSocial.Auth.setSession(session);
    }
  }

	/* Model getters */


	var dataHandlers = {};
	
	function _addHandler(type, cb)
	{
		if(typeof dataHandlers[type] == 'undefined') {
			dataHandlers[type] = [];
		}
		dataHandlers[type].push(cb);
	}
	
	function _callHandlers(type, payload)
	{
		if(typeof payload != 'array') {
			payload = [ payload ];
		}
		if(typeof dataHandlers[type] == 'undefined') {
			dataHandlers[type] = [];
		}
		for(var i = 0; i < dataHandlers[type].length; i++) {
			if(typeof dataHandlers[type][i] != 'undefined') {
			  dataHandlers[type][i].apply(this, payload);
		  }
		}
	}




// UI



         
function _invalidateContentHandlers() {

  var coll = content;
  coll.unbind('mousedown',ReadSocial.Sel.toggle);
  coll.unbind('mouseup',ReadSocial.Sel.toggle);
  coll.unbind('mousemove',ReadSocial.Sel.toggle);
  coll.unbind('mouseout',ReadSocial.Sel.toggle);
  coll.unbind('mouseover',ReadSocial.Sel.toggle);
  xcontentdoc.unbind('scroll', _repositionNoteFlags);
  coll.unbind('count', _handleNoteCount);
  jQuery('.note-flag').remove();
  
}

function _repositionNoteFlags(e) {
  jQuery('.note-flag', xcontentdoc).trigger('reposition');
};

function _refreshNoteCounts() { 
  jQuery('p', xcontentdoc).trigger('count');
}

function _countTrigger(e) {

  //_hideLogin();
  var w = jQuery(this);
  scrolltop = w.scrollTop();
  scrollbot = scrolltop + w.height();
  

  _refreshNoteCounts();
  
}

function _handleNoteCount(e)
{ // bound to 'count' event on paragraphs

    var pel = jQuery(this);
    var top = scrolltop;
    var bot = scrollbot;
    var pt = pel.offset().top;
    // last time checked
    var lastcheck = pel.attr('data-lastcheck');
    var maxage, expired;
    // maximum age of count to allow
    maxage = 1 * 60; // 1 minute
    expired = (typeof lastcheck == 'undefined') ?
                  true :
                  (new Date()).getTime() > (lastcheck + maxage);
    // if in view:
    if(pt > top && pt < bot) {
      var nf = _getNoteFlag(pel);
      var count = 0;
      if(expired) { // and never checked or expired
        
        // retrieve note count from server
        _countNotes(ReadSocial.hasher.hashElement(e.target), function (o) {
          count = o.count;
          // store count val and timestamp it
          pel.attr('data-notecount',o.count);
          pel.attr('data-lastcheck',(new Date()).getTime());
          // render visible or not
          _renderNoteFlag(nf,pel);
        });
      } else {
        // render visible or not
        _renderNoteFlag(nf,pel);          
      }
    }
}


function _renderNoteFlag(n,p) { /* n = jqueried noteflag div, p = jqueried paragraph */
  
   var alignRight = true; //false;
   var count = p.attr('data-notecount');
   var cssblock = {
     position:"absolute",
     opacity:1
   };
   var loc = (alignRight) ? { top:-7000, right:0 } : { top:-7000, left:0 };
   if(p.size() > 0) {
     var cpp = p.position();
     loc.top = cpp.top;
     loc.right = (alignRight) ? 0 : cpp.left;
   }
   if(count>0) {
     cssblock.display = 'inline-block';
     cssblock.opacity = 1;
   } else {
     cssblock.opacity = 0
   }
   cssblock.top = loc.top;/* + (p.height()/2) +"px"*/;
   cssblock.right = (alignRight) ? loc.right+"px" : loc.left+"px";
   _renderCountInNoteFlag(n,count);
   n.css(cssblock);
}

function _renderCountInNoteFlag(nf,count)
{
  nf.html(count);
}

function _expireCount(jq)
{
  return jq.attr('data-lastcheck',-9999999999);
}

function _countNotes(hash, cb)
 {
   /*
     Gets a count for the specified par hash
   */

   ReadSocial.API.getNotesCount(hash, function (o) {
     cb(o);
   });

 }

 function _parseQueryString(queryString) {




    var urlParams = {};
    (function () {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);

        while (match = search.exec(query))
           urlParams[decode(match[1])] = decode(match[2]);
    })();

    return urlParams;

    /*

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
            finalObject[parts[0]] = decodeURI(parts[1]).replace(/\+/g, ' ');
        }

        return finalObject;
    }
    */
}

function _getNoteFlag(p)
{
  // get this paragraph's own note flag
  var noteflag = p.next('div.note-flag');
  
  if(!noteflag.size()) { // if no, create
    
    //ReadSocial.log('creating note flag');
    
    p.after('<div class="note-flag rs-text" style="display:none">0</div>');
    //xcontentdoc.append('<div class="note-flag" style="display:none">0</div>');
    
    noteflag = p.next('div.note-flag');
    noteflag.click(function(e) {

      e.preventDefault();
      p.trigger('mousedown');
      p.trigger('mousemove');
      p.trigger('mouseup');
      ReadSocial.API.showPublisherModal({
        view:'list'
      });
      //return false;

    });

    // reposition - triggered by scroll event on xcontentdoc

    noteflag.bind('reposition', function (e) {

      _renderNoteFlag(noteflag,p);

    });
    
    
  }

  return noteflag;
}



/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);

/*! LAB.js (LABjs :: Loading And Blocking JavaScript)
    v2.0.3 (c) Kyle Simpson
    MIT License
*/
(function(o){var K=o.$LAB,y="UseLocalXHR",z="AlwaysPreserveOrder",u="AllowDuplicates",A="CacheBust",B="BasePath",C=/^[^?#]*\//.exec(location.href)[0],D=/^\w+\:\/\/\/?[^\/]+/.exec(C)[0],i=document.head||document.getElementsByTagName("head"),L=(o.opera&&Object.prototype.toString.call(o.opera)=="[object Opera]")||("MozAppearance"in document.documentElement.style),q=document.createElement("script"),E=typeof q.preload=="boolean",r=E||(q.readyState&&q.readyState=="uninitialized"),F=!r&&q.async===true,M=!r&&!F&&!L;function G(a){return Object.prototype.toString.call(a)=="[object Function]"}function H(a){return Object.prototype.toString.call(a)=="[object Array]"}function N(a,c){var b=/^\w+\:\/\//;if(/^\/\/\/?/.test(a)){a=location.protocol+a}else if(!b.test(a)&&a.charAt(0)!="/"){a=(c||"")+a}return b.test(a)?a:((a.charAt(0)=="/"?D:C)+a)}function s(a,c){for(var b in a){if(a.hasOwnProperty(b)){c[b]=a[b]}}return c}function O(a){var c=false;for(var b=0;b<a.scripts.length;b++){if(a.scripts[b].ready&&a.scripts[b].exec_trigger){c=true;a.scripts[b].exec_trigger();a.scripts[b].exec_trigger=null}}return c}function t(a,c,b,d){a.onload=a.onreadystatechange=function(){if((a.readyState&&a.readyState!="complete"&&a.readyState!="loaded")||c[b])return;a.onload=a.onreadystatechange=null;d()}}function I(a){a.ready=a.finished=true;for(var c=0;c<a.finished_listeners.length;c++){a.finished_listeners[c]()}a.ready_listeners=[];a.finished_listeners=[]}function P(d,f,e,g,h){setTimeout(function(){var a,c=f.real_src,b;if("item"in i){if(!i[0]){setTimeout(arguments.callee,25);return}i=i[0]}a=document.createElement("script");if(f.type)a.type=f.type;if(f.charset)a.charset=f.charset;if(h){if(r){e.elem=a;if(E){a.preload=true;a.onpreload=g}else{a.onreadystatechange=function(){if(a.readyState=="loaded")g()}}a.src=c}else if(h&&c.indexOf(D)==0&&d[y]){b=new XMLHttpRequest();b.onreadystatechange=function(){if(b.readyState==4){b.onreadystatechange=function(){};e.text=b.responseText+"\n//@ sourceURL="+c;g()}};b.open("GET",c);b.send()}else{a.type="text/cache-script";t(a,e,"ready",function(){i.removeChild(a);g()});a.src=c;i.insertBefore(a,i.firstChild)}}else if(F){a.async=false;t(a,e,"finished",g);a.src=c;i.insertBefore(a,i.firstChild)}else{t(a,e,"finished",g);a.src=c;i.insertBefore(a,i.firstChild)}},0)}function J(){var l={},Q=r||M,n=[],p={},m;l[y]=true;l[z]=false;l[u]=false;l[A]=false;l[B]="";function R(a,c,b){var d;function f(){if(d!=null){d=null;I(b)}}if(p[c.src].finished)return;if(!a[u])p[c.src].finished=true;d=b.elem||document.createElement("script");if(c.type)d.type=c.type;if(c.charset)d.charset=c.charset;t(d,b,"finished",f);if(b.elem){b.elem=null}else if(b.text){d.onload=d.onreadystatechange=null;d.text=b.text}else{d.src=c.real_src}i.insertBefore(d,i.firstChild);if(b.text){f()}}function S(c,b,d,f){var e,g,h=function(){b.ready_cb(b,function(){R(c,b,e)})},j=function(){b.finished_cb(b,d)};b.src=N(b.src,c[B]);b.real_src=b.src+(c[A]?((/\?.*$/.test(b.src)?"&_":"?_")+~~(Math.random()*1E9)+"="):"");if(!p[b.src])p[b.src]={items:[],finished:false};g=p[b.src].items;if(c[u]||g.length==0){e=g[g.length]={ready:false,finished:false,ready_listeners:[h],finished_listeners:[j]};P(c,b,e,((f)?function(){e.ready=true;for(var a=0;a<e.ready_listeners.length;a++){e.ready_listeners[a]()}e.ready_listeners=[]}:function(){I(e)}),f)}else{e=g[0];if(e.finished){j()}else{e.finished_listeners.push(j)}}}function v(){var e,g=s(l,{}),h=[],j=0,w=false,k;function T(a,c){a.ready=true;a.exec_trigger=c;x()}function U(a,c){a.ready=a.finished=true;a.exec_trigger=null;for(var b=0;b<c.scripts.length;b++){if(!c.scripts[b].finished)return}c.finished=true;x()}function x(){while(j<h.length){if(G(h[j])){try{h[j++]()}catch(err){}continue}else if(!h[j].finished){if(O(h[j]))continue;break}j++}if(j==h.length){w=false;k=false}}function V(){if(!k||!k.scripts){h.push(k={scripts:[],finished:true})}}e={script:function(){for(var f=0;f<arguments.length;f++){(function(a,c){var b;if(!H(a)){c=[a]}for(var d=0;d<c.length;d++){V();a=c[d];if(G(a))a=a();if(!a)continue;if(H(a)){b=[].slice.call(a);b.unshift(d,1);[].splice.apply(c,b);d--;continue}if(typeof a=="string")a={src:a};a=s(a,{ready:false,ready_cb:T,finished:false,finished_cb:U});k.finished=false;k.scripts.push(a);S(g,a,k,(Q&&w));w=true;if(g[z])e.wait()}})(arguments[f],arguments[f])}return e},wait:function(){if(arguments.length>0){for(var a=0;a<arguments.length;a++){h.push(arguments[a])}k=h[h.length-1]}else k=false;x();return e}};return{script:e.script,wait:e.wait,setOptions:function(a){s(a,g);return e}}}m={setGlobalDefaults:function(a){s(a,l);return m},setOptions:function(){return v().setOptions.apply(null,arguments)},script:function(){return v().script.apply(null,arguments)},wait:function(){return v().wait.apply(null,arguments)},queueScript:function(){n[n.length]={type:"script",args:[].slice.call(arguments)};return m},queueWait:function(){n[n.length]={type:"wait",args:[].slice.call(arguments)};return m},runQueue:function(){var a=m,c=n.length,b=c,d;for(;--b>=0;){d=n.shift();a=a[d.type].apply(null,d.args)}return a},noConflict:function(){o.$LAB=K;return m},sandbox:function(){return J()}};return m}o.$LAB=J();(function(a,c,b){if(document.readyState==null&&document[a]){document.readyState="loading";document[a](c,b=function(){document.removeEventListener(c,b,false);document.readyState="complete"},false)}})("addEventListener","DOMContentLoaded")})(this);

// Underscore.js 1.3.3
// (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Underscore is freely distributable under the MIT license.
// Portions of Underscore are inspired or borrowed from Prototype,
// Oliver Steele's Functional, and John Resig's Micro-Templating.
// For all details and documentation:
// http://documentcloud.github.com/underscore
(function(){function r(a,c,d){if(a===c)return 0!==a||1/a==1/c;if(null==a||null==c)return a===c;a._chain&&(a=a._wrapped);c._chain&&(c=c._wrapped);if(a.isEqual&&b.isFunction(a.isEqual))return a.isEqual(c);if(c.isEqual&&b.isFunction(c.isEqual))return c.isEqual(a);var e=l.call(a);if(e!=l.call(c))return!1;switch(e){case "[object String]":return a==""+c;case "[object Number]":return a!=+a?c!=+c:0==a?1/a==1/c:a==+c;case "[object Date]":case "[object Boolean]":return+a==+c;case "[object RegExp]":return a.source==
c.source&&a.global==c.global&&a.multiline==c.multiline&&a.ignoreCase==c.ignoreCase}if("object"!=typeof a||"object"!=typeof c)return!1;for(var f=d.length;f--;)if(d[f]==a)return!0;d.push(a);var f=0,g=!0;if("[object Array]"==e){if(f=a.length,g=f==c.length)for(;f--&&(g=f in a==f in c&&r(a[f],c[f],d)););}else{if("constructor"in a!="constructor"in c||a.constructor!=c.constructor)return!1;for(var h in a)if(b.has(a,h)&&(f++,!(g=b.has(c,h)&&r(a[h],c[h],d))))break;if(g){for(h in c)if(b.has(c,h)&&!f--)break;
g=!f}}d.pop();return g}var s=this,I=s._,o={},k=Array.prototype,p=Object.prototype,i=k.slice,J=k.unshift,l=p.toString,K=p.hasOwnProperty,y=k.forEach,z=k.map,A=k.reduce,B=k.reduceRight,C=k.filter,D=k.every,E=k.some,q=k.indexOf,F=k.lastIndexOf,p=Array.isArray,L=Object.keys,t=Function.prototype.bind,b=function(a){return new m(a)};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=b),exports._=b):s._=b;b.VERSION="1.3.3";var j=b.each=b.forEach=function(a,
c,d){if(a!=null)if(y&&a.forEach===y)a.forEach(c,d);else if(a.length===+a.length)for(var e=0,f=a.length;e<f;e++){if(e in a&&c.call(d,a[e],e,a)===o)break}else for(e in a)if(b.has(a,e)&&c.call(d,a[e],e,a)===o)break};b.map=b.collect=function(a,c,b){var e=[];if(a==null)return e;if(z&&a.map===z)return a.map(c,b);j(a,function(a,g,h){e[e.length]=c.call(b,a,g,h)});if(a.length===+a.length)e.length=a.length;return e};b.reduce=b.foldl=b.inject=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(A&&
a.reduce===A){e&&(c=b.bind(c,e));return f?a.reduce(c,d):a.reduce(c)}j(a,function(a,b,i){if(f)d=c.call(e,d,a,b,i);else{d=a;f=true}});if(!f)throw new TypeError("Reduce of empty array with no initial value");return d};b.reduceRight=b.foldr=function(a,c,d,e){var f=arguments.length>2;a==null&&(a=[]);if(B&&a.reduceRight===B){e&&(c=b.bind(c,e));return f?a.reduceRight(c,d):a.reduceRight(c)}var g=b.toArray(a).reverse();e&&!f&&(c=b.bind(c,e));return f?b.reduce(g,c,d,e):b.reduce(g,c)};b.find=b.detect=function(a,
c,b){var e;G(a,function(a,g,h){if(c.call(b,a,g,h)){e=a;return true}});return e};b.filter=b.select=function(a,c,b){var e=[];if(a==null)return e;if(C&&a.filter===C)return a.filter(c,b);j(a,function(a,g,h){c.call(b,a,g,h)&&(e[e.length]=a)});return e};b.reject=function(a,c,b){var e=[];if(a==null)return e;j(a,function(a,g,h){c.call(b,a,g,h)||(e[e.length]=a)});return e};b.every=b.all=function(a,c,b){var e=true;if(a==null)return e;if(D&&a.every===D)return a.every(c,b);j(a,function(a,g,h){if(!(e=e&&c.call(b,
a,g,h)))return o});return!!e};var G=b.some=b.any=function(a,c,d){c||(c=b.identity);var e=false;if(a==null)return e;if(E&&a.some===E)return a.some(c,d);j(a,function(a,b,h){if(e||(e=c.call(d,a,b,h)))return o});return!!e};b.include=b.contains=function(a,c){var b=false;if(a==null)return b;if(q&&a.indexOf===q)return a.indexOf(c)!=-1;return b=G(a,function(a){return a===c})};b.invoke=function(a,c){var d=i.call(arguments,2);return b.map(a,function(a){return(b.isFunction(c)?c||a:a[c]).apply(a,d)})};b.pluck=
function(a,c){return b.map(a,function(a){return a[c]})};b.max=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.max.apply(Math,a);if(!c&&b.isEmpty(a))return-Infinity;var e={computed:-Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b>=e.computed&&(e={value:a,computed:b})});return e.value};b.min=function(a,c,d){if(!c&&b.isArray(a)&&a[0]===+a[0])return Math.min.apply(Math,a);if(!c&&b.isEmpty(a))return Infinity;var e={computed:Infinity};j(a,function(a,b,h){b=c?c.call(d,a,b,h):a;b<e.computed&&
(e={value:a,computed:b})});return e.value};b.shuffle=function(a){var b=[],d;j(a,function(a,f){d=Math.floor(Math.random()*(f+1));b[f]=b[d];b[d]=a});return b};b.sortBy=function(a,c,d){var e=b.isFunction(c)?c:function(a){return a[c]};return b.pluck(b.map(a,function(a,b,c){return{value:a,criteria:e.call(d,a,b,c)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c===void 0?1:d===void 0?-1:c<d?-1:c>d?1:0}),"value")};b.groupBy=function(a,c){var d={},e=b.isFunction(c)?c:function(a){return a[c]};
j(a,function(a,b){var c=e(a,b);(d[c]||(d[c]=[])).push(a)});return d};b.sortedIndex=function(a,c,d){d||(d=b.identity);for(var e=0,f=a.length;e<f;){var g=e+f>>1;d(a[g])<d(c)?e=g+1:f=g}return e};b.toArray=function(a){return!a?[]:b.isArray(a)||b.isArguments(a)?i.call(a):a.toArray&&b.isFunction(a.toArray)?a.toArray():b.values(a)};b.size=function(a){return b.isArray(a)?a.length:b.keys(a).length};b.first=b.head=b.take=function(a,b,d){return b!=null&&!d?i.call(a,0,b):a[0]};b.initial=function(a,b,d){return i.call(a,
0,a.length-(b==null||d?1:b))};b.last=function(a,b,d){return b!=null&&!d?i.call(a,Math.max(a.length-b,0)):a[a.length-1]};b.rest=b.tail=function(a,b,d){return i.call(a,b==null||d?1:b)};b.compact=function(a){return b.filter(a,function(a){return!!a})};b.flatten=function(a,c){return b.reduce(a,function(a,e){if(b.isArray(e))return a.concat(c?e:b.flatten(e));a[a.length]=e;return a},[])};b.without=function(a){return b.difference(a,i.call(arguments,1))};b.uniq=b.unique=function(a,c,d){var d=d?b.map(a,d):a,
e=[];a.length<3&&(c=true);b.reduce(d,function(d,g,h){if(c?b.last(d)!==g||!d.length:!b.include(d,g)){d.push(g);e.push(a[h])}return d},[]);return e};b.union=function(){return b.uniq(b.flatten(arguments,true))};b.intersection=b.intersect=function(a){var c=i.call(arguments,1);return b.filter(b.uniq(a),function(a){return b.every(c,function(c){return b.indexOf(c,a)>=0})})};b.difference=function(a){var c=b.flatten(i.call(arguments,1),true);return b.filter(a,function(a){return!b.include(c,a)})};b.zip=function(){for(var a=
i.call(arguments),c=b.max(b.pluck(a,"length")),d=Array(c),e=0;e<c;e++)d[e]=b.pluck(a,""+e);return d};b.indexOf=function(a,c,d){if(a==null)return-1;var e;if(d){d=b.sortedIndex(a,c);return a[d]===c?d:-1}if(q&&a.indexOf===q)return a.indexOf(c);d=0;for(e=a.length;d<e;d++)if(d in a&&a[d]===c)return d;return-1};b.lastIndexOf=function(a,b){if(a==null)return-1;if(F&&a.lastIndexOf===F)return a.lastIndexOf(b);for(var d=a.length;d--;)if(d in a&&a[d]===b)return d;return-1};b.range=function(a,b,d){if(arguments.length<=
1){b=a||0;a=0}for(var d=arguments[2]||1,e=Math.max(Math.ceil((b-a)/d),0),f=0,g=Array(e);f<e;){g[f++]=a;a=a+d}return g};var H=function(){};b.bind=function(a,c){var d,e;if(a.bind===t&&t)return t.apply(a,i.call(arguments,1));if(!b.isFunction(a))throw new TypeError;e=i.call(arguments,2);return d=function(){if(!(this instanceof d))return a.apply(c,e.concat(i.call(arguments)));H.prototype=a.prototype;var b=new H,g=a.apply(b,e.concat(i.call(arguments)));return Object(g)===g?g:b}};b.bindAll=function(a){var c=
i.call(arguments,1);c.length==0&&(c=b.functions(a));j(c,function(c){a[c]=b.bind(a[c],a)});return a};b.memoize=function(a,c){var d={};c||(c=b.identity);return function(){var e=c.apply(this,arguments);return b.has(d,e)?d[e]:d[e]=a.apply(this,arguments)}};b.delay=function(a,b){var d=i.call(arguments,2);return setTimeout(function(){return a.apply(null,d)},b)};b.defer=function(a){return b.delay.apply(b,[a,1].concat(i.call(arguments,1)))};b.throttle=function(a,c){var d,e,f,g,h,i,j=b.debounce(function(){h=
g=false},c);return function(){d=this;e=arguments;f||(f=setTimeout(function(){f=null;h&&a.apply(d,e);j()},c));g?h=true:i=a.apply(d,e);j();g=true;return i}};b.debounce=function(a,b,d){var e;return function(){var f=this,g=arguments;d&&!e&&a.apply(f,g);clearTimeout(e);e=setTimeout(function(){e=null;d||a.apply(f,g)},b)}};b.once=function(a){var b=false,d;return function(){if(b)return d;b=true;return d=a.apply(this,arguments)}};b.wrap=function(a,b){return function(){var d=[a].concat(i.call(arguments,0));
return b.apply(this,d)}};b.compose=function(){var a=arguments;return function(){for(var b=arguments,d=a.length-1;d>=0;d--)b=[a[d].apply(this,b)];return b[0]}};b.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}};b.keys=L||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var c=[],d;for(d in a)b.has(a,d)&&(c[c.length]=d);return c};b.values=function(a){return b.map(a,b.identity)};b.functions=b.methods=function(a){var c=[],d;for(d in a)b.isFunction(a[d])&&
c.push(d);return c.sort()};b.extend=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]=b[d]});return a};b.pick=function(a){var c={};j(b.flatten(i.call(arguments,1)),function(b){b in a&&(c[b]=a[b])});return c};b.defaults=function(a){j(i.call(arguments,1),function(b){for(var d in b)a[d]==null&&(a[d]=b[d])});return a};b.clone=function(a){return!b.isObject(a)?a:b.isArray(a)?a.slice():b.extend({},a)};b.tap=function(a,b){b(a);return a};b.isEqual=function(a,b){return r(a,b,[])};b.isEmpty=
function(a){if(a==null)return true;if(b.isArray(a)||b.isString(a))return a.length===0;for(var c in a)if(b.has(a,c))return false;return true};b.isElement=function(a){return!!(a&&a.nodeType==1)};b.isArray=p||function(a){return l.call(a)=="[object Array]"};b.isObject=function(a){return a===Object(a)};b.isArguments=function(a){return l.call(a)=="[object Arguments]"};b.isArguments(arguments)||(b.isArguments=function(a){return!(!a||!b.has(a,"callee"))});b.isFunction=function(a){return l.call(a)=="[object Function]"};
b.isString=function(a){return l.call(a)=="[object String]"};b.isNumber=function(a){return l.call(a)=="[object Number]"};b.isFinite=function(a){return b.isNumber(a)&&isFinite(a)};b.isNaN=function(a){return a!==a};b.isBoolean=function(a){return a===true||a===false||l.call(a)=="[object Boolean]"};b.isDate=function(a){return l.call(a)=="[object Date]"};b.isRegExp=function(a){return l.call(a)=="[object RegExp]"};b.isNull=function(a){return a===null};b.isUndefined=function(a){return a===void 0};b.has=function(a,
b){return K.call(a,b)};b.noConflict=function(){s._=I;return this};b.identity=function(a){return a};b.times=function(a,b,d){for(var e=0;e<a;e++)b.call(d,e)};b.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};b.result=function(a,c){if(a==null)return null;var d=a[c];return b.isFunction(d)?d.call(a):d};b.mixin=function(a){j(b.functions(a),function(c){M(c,b[c]=a[c])})};var N=0;b.uniqueId=
function(a){var b=N++;return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var u=/.^/,n={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:"\u2028",u2029:"\u2029"},v;for(v in n)n[n[v]]=v;var O=/\\|'|\r|\n|\t|\u2028|\u2029/g,P=/\\(\\|'|r|n|t|u2028|u2029)/g,w=function(a){return a.replace(P,function(a,b){return n[b]})};b.template=function(a,c,d){d=b.defaults(d||{},b.templateSettings);a="__p+='"+a.replace(O,function(a){return"\\"+n[a]}).replace(d.escape||
u,function(a,b){return"'+\n_.escape("+w(b)+")+\n'"}).replace(d.interpolate||u,function(a,b){return"'+\n("+w(b)+")+\n'"}).replace(d.evaluate||u,function(a,b){return"';\n"+w(b)+"\n;__p+='"})+"';\n";d.variable||(a="with(obj||{}){\n"+a+"}\n");var a="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+a+"return __p;\n",e=new Function(d.variable||"obj","_",a);if(c)return e(c,b);c=function(a){return e.call(this,a,b)};c.source="function("+(d.variable||"obj")+"){\n"+a+"}";return c};
b.chain=function(a){return b(a).chain()};var m=function(a){this._wrapped=a};b.prototype=m.prototype;var x=function(a,c){return c?b(a).chain():a},M=function(a,c){m.prototype[a]=function(){var a=i.call(arguments);J.call(a,this._wrapped);return x(c.apply(b,a),this._chain)}};b.mixin(b);j("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=k[a];m.prototype[a]=function(){var d=this._wrapped;b.apply(d,arguments);var e=d.length;(a=="shift"||a=="splice")&&e===0&&delete d[0];return x(d,
this._chain)}});j(["concat","join","slice"],function(a){var b=k[a];m.prototype[a]=function(){return x(b.apply(this._wrapped,arguments),this._chain)}});m.prototype.chain=function(){this._chain=true;return this};m.prototype.value=function(){return this._wrapped}}).call(this);


  // exported functions to XD proxy RPC

  var exports = {

    changeGroup: _changeGroup,
    expireCounts: function () {
      _expireCount(jQuery(ReadSocial.API.getCurrentPara())).trigger('count');
    }

  };

	return {
		
		load: _init,
    passive: _initPassive,
		postNote: _postNote,
		postResponse: _postResponse,
		refreshNotes: _refreshNotes,
		getNotes: _getNotes,
		getNotesCount: _getNotesCount,
		getResponses: _getResponses,
		setContext: _setContext,
		setHighlight: _setHighlight,
		getHighlight: _getHighlight,
		setLocator: _setLocator,
		getLocator: _getLocator,
		setNode: _setNode,
		getXdFrame: _getXdFrame,
		isXd: _isXd,
		formatUrl: _formatUrl,
    formatLibUrl: _formatLibUrl,
		requestAuthXd: _requestAuthXd,
		setGroupName: _setChannel,
		getGroupName: _getChannel,
    createGroupName: _createChannelName,
		getNoteDetail: _getNoteDetail,
		addHandler: _addHandler,
		getAuthStatus: _getAuthStatus,
		oauthCallback: _oauthCallback,
		getContent: _getEligibleContent,
		getContentDoc: _getContentDoc,
    getCurrentPara: _getCurrentPara,
    showPublisherModal: _initUI,
    parseQueryString: _parseQueryString,
		appendXd: _xdDom,
		authed: authed,
    log: log,
    uiproxy: function () {
      return uiproxy;
    },
    template:_.template,
    hashgroups: hashgroups,
		isAuthed: function () {
		  return authed;
		},
    getConfig: function () {
      return config;
    },
    testProxy: function(msg) {
      uiproxy.post(msg);
    }
		
	};
	
	
	
})();


// Porthole

//var Porthole=(typeof Porthole=="undefined")||!Porthole?{}:Porthole;Porthole={trace:function(a){try{console.log("Porthole: "+a)}catch(b){}},error:function(a){try{console.error("Porthole: "+a)}catch(b){}}};Porthole.WindowProxy=function(){};Porthole.WindowProxy.prototype={postMessage:function(){},addEventListener:function(a){},removeEventListener:function(a){}};Porthole.WindowProxyLegacy=function(a,b){if(b===undefined){b=""}this.targetWindowName=b;this.eventListeners=[];this.origin=window.location.protocol+"//"+window.location.host;if(a!==null){this.proxyIFrameName=this.targetWindowName+"ProxyIFrame";this.proxyIFrameLocation=a;this.proxyIFrameElement=this.createIFrameProxy()}else{this.proxyIFrameElement=null}};Porthole.WindowProxyLegacy.prototype={getTargetWindowName:function(){return this.targetWindowName},getOrigin:function(){return this.origin},createIFrameProxy:function(){var a=document.createElement("iframe");a.setAttribute("id",this.proxyIFrameName);a.setAttribute("name",this.proxyIFrameName);a.setAttribute("src",this.proxyIFrameLocation);a.setAttribute("frameBorder","1");a.setAttribute("scrolling","auto");a.setAttribute("width",30);a.setAttribute("height",30);a.setAttribute("style","position: absolute; left: -100px; top:0px;");if(a.style.setAttribute){a.style.setAttribute("cssText","position: absolute; left: -100px; top:0px;")}document.body.appendChild(a);return a},postMessage:function(b,a){if(a===undefined){a="*"}if(this.proxyIFrameElement===null){Porthole.error("Can't send message because no proxy url was passed in the constructor")}else{sourceWindowName=window.name;this.proxyIFrameElement.setAttribute("src",this.proxyIFrameLocation+"#"+b+"&sourceOrigin="+escape(this.getOrigin())+"&targetOrigin="+escape(a)+"&sourceWindowName="+sourceWindowName+"&targetWindowName="+this.targetWindowName);this.proxyIFrameElement.height=this.proxyIFrameElement.height>50?50:100}},addEventListener:function(a){this.eventListeners.push(a);return a},removeEventListener:function(b){try{var a=this.eventListeners.indexOf(b);this.eventListeners.splice(a,1)}catch(c){this.eventListeners=[];Porthole.error(c)}},dispatchEvent:function(c){for(var b=0;b<this.eventListeners.length;b++){try{this.eventListeners[b](c)}catch(a){Porthole.error("Exception trying to call back listener: "+a)}}}};Porthole.WindowProxyHTML5=function(a,b){if(b===undefined){b=""}this.targetWindowName=b};Porthole.WindowProxyHTML5.prototype={postMessage:function(b,a){if(a===undefined){a="*"}if(this.targetWindowName===""){targetWindow=top}else{targetWindow=parent.frames[this.targetWindowName]}targetWindow.postMessage(b,a)},addEventListener:function(a){window.addEventListener("message",a,false);return a},removeEventListener:function(a){window.removeEventListener("message",a,false)},dispatchEvent:function(b){var a=document.createEvent("MessageEvent");a.initMessageEvent("message",true,true,b.data,b.origin,1,window,null);window.dispatchEvent(a)}};if(typeof window.postMessage!="function"){Porthole.trace("Using legacy browser support");Porthole.WindowProxy=Porthole.WindowProxyLegacy;Porthole.WindowProxy.prototype=Porthole.WindowProxyLegacy.prototype}else{Porthole.trace("Using built-in browser support");Porthole.WindowProxy=Porthole.WindowProxyHTML5;Porthole.WindowProxy.prototype=Porthole.WindowProxyHTML5.prototype}Porthole.WindowProxy.splitMessageParameters=function(c){if(typeof c=="undefined"||c===null){return null}var e=[];var d=c.split(/&/);for(var b in d){var a=d[b].split("=");if(typeof(a[1])=="undefined"){e[a[0]]=""}else{e[a[0]]=a[1]}}return e};Porthole.MessageEvent=function MessageEvent(c,a,b){this.data=c;this.origin=a;this.source=b};Porthole.WindowProxyDispatcher={forwardMessageEvent:function(c){var b=document.location.hash;if(b.length>0){b=b.substr(1);m=Porthole.WindowProxyDispatcher.parseMessage(b);if(m.targetWindowName===""){targetWindow=top}else{targetWindow=parent.frames[m.targetWindowName]}var a=Porthole.WindowProxyDispatcher.findWindowProxyObjectInWindow(targetWindow,m.sourceWindowName);if(a){if(a.origin==m.targetOrigin||m.targetOrigin=="*"){c=new Porthole.MessageEvent(m.data,m.sourceOrigin,a);a.dispatchEvent(c)}else{Porthole.error("Target origin "+a.origin+" does not match desired target of "+m.targetOrigin)}}else{Porthole.error("Could not find window proxy object on the target window")}}},parseMessage:function(b){if(typeof b=="undefined"||b===null){return null}params=Porthole.WindowProxy.splitMessageParameters(b);var a={targetOrigin:"",sourceOrigin:"",sourceWindowName:"",data:""};a.targetOrigin=unescape(params.targetOrigin);a.sourceOrigin=unescape(params.sourceOrigin);a.sourceWindowName=unescape(params.sourceWindowName);a.targetWindowName=unescape(params.targetWindowName);var c=b.split(/&/);if(c.length>3){c.pop();c.pop();c.pop();c.pop();a.data=c.join("&")}return a},findWindowProxyObjectInWindow:function(a,c){if(a.RuntimeObject){a=a.RuntimeObject()}if(a){for(var b in a){try{if(a[b]!==null&&typeof a[b]=="object"&&a[b] instanceof a.Porthole.WindowProxy&&a[b].getTargetWindowName()==c){return a[b]}}catch(d){}}}return null},start:function(){if(window.addEventListener){window.addEventListener("resize",Porthole.WindowProxyDispatcher.forwardMessageEvent,false)}else{if(document.body.attachEvent){window.attachEvent("onresize",Porthole.WindowProxyDispatcher.forwardMessageEvent)}else{Porthole.error("Can't attach resize event")}}}};


/*
    Copyright (c) 2011-2012 Ternary Labs. All Rights Reserved.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
*/

/*
# Websequencediagrams.com
participant abc.com
participant "iFrame proxy xyz.com"
participant "iFrame proxy abc.com"
participant "iFrame xyz.com"
abc.com->iFrame proxy xyz.com: postMessage(data, targetOrigin)
note left of "iFrame proxy xyz.com": Set url fragment and change size
iFrame proxy xyz.com->iFrame proxy xyz.com: onResize Event
note right of "iFrame proxy xyz.com": read url fragment
iFrame proxy xyz.com->iFrame xyz.com: forwardMessageEvent(event)
iFrame xyz.com->iFrame proxy abc.com: postMessage(data, targetOrigin)
note right of "iFrame proxy abc.com": Set url fragment and change size
iFrame proxy abc.com->iFrame proxy abc.com: onResize Event
note right of "iFrame proxy abc.com": read url fragment
iFrame proxy abc.com->abc.com: forwardMessageEvent(event)
*/

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();

(function (window) {
    'use strict';

    /**
     * @overview Porthole, JavaScript Library for Secure Cross Domain iFrame Communication.
     * @author <a href="mailto:georges@ternarylabs.com">Georges Auberger</a>
     * @copyright 2011-2012 Ternary Labs, All Rights Reserved.
     *
     * Namespace for Porthole
     * @module Porthole
     */
    var Porthole = {
        /**
         * Utility function to trace to console
         * @private
         */
        trace: function(s) {
            if (window['console'] !== undefined) {
                window.console.log('Porthole: ' + s);
            }
        },

        /**
         * Utility function to send errors to console
         * @private
         */
        error: function(s) {
            if (window['console'] !== undefined) {
                window.console.error('Porthole: ' + s);
            }
        }
    };

    /**
     * @class
     * @classdesc Proxy window object to post message to target window
     * @param {string} proxyIFrameUrl - Fully qualified url to proxy iframe
     * @param {string} targetWindowName - Name of the proxy iframe window
     */
    Porthole.WindowProxy = function(){};

    Porthole.WindowProxy.prototype = {
        /**
         * Post a message to the target window only if the content comes from the target origin.
         * <code>targetOrigin</code> can be a url or *
         * @public
         * @param {Object} data - Payload
         * @param {String} targetOrigin
         */
        post: function(data, targetOrigin) {},
        /**
         * Add an event listener to receive messages.
         * @public
         * @param {Function} eventListenerCallback
         * @returns {Function} eventListenerCallback
         */
        addEventListener: function(f) {},
        /**
         * Remove an event listener.
         * @public
         * @param {Function} eventListenerCallback
         */
        removeEventListener: function(f) {}
    };

    Porthole.WindowProxyBase = Class.extend({
        init: function(targetWindowName) {
            if (targetWindowName === undefined) {
                targetWindowName = '';
            }
            this.targetWindowName = targetWindowName;
            this.origin = window.location.protocol + '//' + window.location.host;
            this.eventListeners = [];
        },

        getTargetWindowName: function() {
            return this.targetWindowName;
        },

        getOrigin: function() {
            return this.origin;
        },

        /**
         * Lookup window object based on target window name
         * @private
         * @return {string} targetWindow
         */
        getTargetWindow: function() {
            return Porthole.WindowProxy.getTargetWindow(this.targetWindowName);
        },

        post: function(data, targetOrigin) {
            if (targetOrigin === undefined) {
                targetOrigin = '*';
            }
            this.dispatchMessage({
                'data' : data,
                'sourceOrigin' : this.getOrigin(),
                'targetOrigin' : targetOrigin,
                'sourceWindowName' : window.name,
                'targetWindowName' : this.getTargetWindowName()
            });
        },

        addEventListener: function(f) {
            this.eventListeners.push(f);
            return f;
        },

        removeEventListener: function(f) {
            var index;
            try {
                index = this.eventListeners.indexOf(f);
                this.eventListeners.splice(index, 1);
            } catch(e) {
                this.eventListeners = [];
            }
        },

        dispatchEvent: function(event) {
            var i;
            for (i = 0; i < this.eventListeners.length; i++) {
                try {
                    this.eventListeners[i](event);
                } catch(e) {
                }
            }
        }
    });

    /**
     * Legacy browser implementation of proxy window object to post message to target window
     *
     * @private
     * @constructor
     * @param {string} proxyIFrameUrl - Fully qualified url to proxy iframe
     * @param {string} targetWindowName - Name of the proxy iframe window
     */
    Porthole.WindowProxyLegacy = Porthole.WindowProxyBase.extend({
        init: function(proxyIFrameUrl, targetWindowName) {
            this._super(targetWindowName);
            
            if (proxyIFrameUrl !== null) {
                this.proxyIFrameName = this.targetWindowName + 'ProxyIFrame';
                this.proxyIFrameLocation = proxyIFrameUrl;

                // Create the proxy iFrame and add to dom
                this.proxyIFrameElement = this.createIFrameProxy();
            } else {
                // Won't be able to send messages
                this.proxyIFrameElement = null;
                throw  new Error("proxyIFrameUrl can't be null");
            }
        },

        /**
         * Create an iframe and load the proxy
         *
         * @private
         * @returns iframe
         */
        createIFrameProxy: function() {
            var iframe = document.createElement('iframe');

            iframe.setAttribute('id', this.proxyIFrameName);
            iframe.setAttribute('name', this.proxyIFrameName);
            iframe.setAttribute('src', this.proxyIFrameLocation);
            // IE needs this otherwise resize event is not fired
            iframe.setAttribute('frameBorder', '1');
            iframe.setAttribute('scrolling', 'auto');
            // Need a certain size otherwise IE7 does not fire resize event
            iframe.setAttribute('width', 30);
            iframe.setAttribute('height', 30);
            iframe.setAttribute('style', 'position: absolute; left: -100px; top:0px;');
            // IE needs this because setting style attribute is broken. No really.
            if (iframe.style.setAttribute) {
                iframe.style.setAttribute('cssText', 'position: absolute; left: -100px; top:0px;');
            }
            document.body.appendChild(iframe);
            return iframe;
        },

        dispatchMessage: function(message) {
            var encode = window.encodeURIComponent;

            if (this.proxyIFrameElement) {
                var src = this.proxyIFrameLocation + '#' + encode(Porthole.WindowProxy.serialize(message));
                this.proxyIFrameElement.setAttribute('src', src);
                this.proxyIFrameElement.height = this.proxyIFrameElement.height > 50 ? 50 : 100;
            }
        }
    });

    /**
     * Implementation for modern browsers that supports it
     */
    Porthole.WindowProxyHTML5 = Porthole.WindowProxyBase.extend({
        init: function(proxyIFrameUrl, targetWindowName) {
            this._super(targetWindowName);
            this.eventListenerCallback = null;
        },

        dispatchMessage: function(message) {
            this.getTargetWindow().postMessage(Porthole.WindowProxy.serialize(message), message.targetOrigin);
        },

        addEventListener: function(f) {
            if (this.eventListeners.length === 0) {
                var self = this;
                this.eventListenerCallback = function(event) { self.eventListener(self, event); };
                window.addEventListener('message', this.eventListenerCallback, false);
            }
            return this._super(f);
        },

        removeEventListener: function(f) {
            this._super(f);

            if (this.eventListeners.length === 0) {
                window.removeEventListener('message', this.eventListenerCallback);
                this.eventListenerCallback = null;
            }
        },

        eventListener: function(self, nativeEvent) {
            var data = Porthole.WindowProxy.unserialize(nativeEvent.data);
            if (data && (self.targetWindowName == '' || data.sourceWindowName == self.targetWindowName)) {
                self.dispatchEvent(new Porthole.MessageEvent(data.data, nativeEvent.origin, self));
            }
        }
    });

    if (typeof window.postMessage !== 'function') {
        Porthole.trace('Using legacy browser support');
        Porthole.WindowProxy = Porthole.WindowProxyLegacy.extend({});
    } else {
        Porthole.trace('Using built-in browser support');
        Porthole.WindowProxy = Porthole.WindowProxyHTML5.extend({});
    }

    /**
     * Serialize an object using JSON.stringify
     *
     * @param {Object} obj The object to be serialized
     * @return {String}
     */
    Porthole.WindowProxy.serialize = function(obj) {
        if (typeof JSON === 'undefined') {
            throw new Error('Porthole serialization depends on JSON!');
        }

        return JSON.stringify(obj);
    };

    /**
     * Unserialize using JSON.parse
     *
     * @param {String} text Serialization
     * @return {Object}
     */
    Porthole.WindowProxy.unserialize =  function(text) {
        if (typeof JSON === 'undefined') {
            throw new Error('Porthole unserialization dependens on JSON!');
        }
        try {
            var json = JSON.parse(text);
        } catch (e) {
            return false;
        }
        return json;
    };

    Porthole.WindowProxy.getTargetWindow = function(targetWindowName) {
        if (targetWindowName === '') {
            return top;
        } else if (targetWindowName === 'top' || targetWindowName === 'parent') {
            return window[targetWindowName];
        } 
        return parent.frames[targetWindowName];
    };

    /**
     * @classdesc Event object to be passed to registered event handlers
     * @class
     * @param {String} data
     * @param {String} origin - url of window sending the message
     * @param {Object} source - window object sending the message
     */
    Porthole.MessageEvent = function MessageEvent(data, origin, source) {
        this.data = data;
        this.origin = origin;
        this.source = source;
    };

    /**
     * @classdesc Dispatcher object to relay messages.
     * @public
     * @constructor
     */
    Porthole.WindowProxyDispatcher = {
        /**
         * Forward a message event to the target window
         * @private
         */
        forwardMessageEvent: function(e) {
            var message,
                decode = window.decodeURIComponent,
                targetWindow,
                windowProxy;

            if (document.location.hash.length > 0) {
                // Eat the hash character
                message = Porthole.WindowProxy.unserialize(decode(document.location.hash.substr(1)));

                targetWindow = Porthole.WindowProxy.getTargetWindow(message.targetWindowName);

                windowProxy =
                    Porthole.WindowProxyDispatcher.findWindowProxyObjectInWindow(
                        targetWindow,
                        message.sourceWindowName
                    );

                if (windowProxy) {
                    if (windowProxy.origin === message.targetOrigin || message.targetOrigin === '*') {
                        windowProxy.dispatchEvent(
                          new Porthole.MessageEvent(message.data, message.sourceOrigin, windowProxy));
                    } else {
                        Porthole.error('Target origin ' +
                                       windowProxy.origin +
                                       ' does not match desired target of ' +
                                       message.targetOrigin);
                    }
                } else {
                    Porthole.error('Could not find window proxy object on the target window');
                }
            }
        },

        /**
         * Look for a window proxy object in the target window
         * @private
         */
        findWindowProxyObjectInWindow: function(w, sourceWindowName) {
            var i;

            // IE does not enumerate global objects on the window object
            if (w.RuntimeObject) {
                w = w.RuntimeObject();
            }
            if (w) {
                for (i in w) {
                    if (w.hasOwnProperty(i)) {
                        try {
                            // Ensure that we're finding the proxy object
                            // that is declared to be targetting the window that is calling us
                            if (w[i] !== null &&
                                typeof w[i] === 'object' &&
                                w[i] instanceof w.Porthole.WindowProxy &&
                                w[i].getTargetWindowName() === sourceWindowName) {
                                return w[i];
                            }
                        } catch(e) {
                            // Swallow exception in case we access an object we shouldn't
                        }
                    }
                }
            }
            return null;
        },

        /**
         * Start a proxy to relay messages.
         * @public
         */
        start: function() {
            if (window.addEventListener) {
                window.addEventListener('resize',
                                        Porthole.WindowProxyDispatcher.forwardMessageEvent,
                                        false);
            } else if (document.body.attachEvent) {
                window.attachEvent('onresize', Porthole.WindowProxyDispatcher.forwardMessageEvent);
            } else {
                // Should never happen
                Porthole.error('Cannot attach resize event');
            }
        }
    };

    // Support testing in node.js:
    if (typeof window.exports !== 'undefined') {
        window.exports.Porthole = Porthole;
    } else {
        window.Porthole = Porthole;
    }
})(this);





function readsocial(config) { /* readsocial bootstrapper */
  
  if(typeof document != 'undefined') {

   if(typeof document.body != 'undefined') {

     if(typeof config =='undefined') {
        config = {
          partner_id:8,
          group_id:'readsocial',
          container: 'body',
          load_handler: function () {;},
        };
     }
      if(typeof config.partner_id =='undefined') {
        config.partner_id = 8;
      }
      if(typeof config.group_id =='undefined') {
        config.group_id = 'readsocial';
      }
      if(typeof config.container =='undefined') {
        config.container = 'body';
      }
      if(typeof config.load_handler != 'function') config.load_handler = function(){;};

      if(typeof config.use_ui == 'undefined') config.use_ui = true;

      var alls = document.getElementsByTagName('script');
      var me = alls[alls.length-2];

      var base = config.base;
      var api_base = config.api_base;

      _RS_ROOT = base;
      _RS_API_ROOT = api_base;

      if(typeof ReadSocial!='undefined') {

         ReadSocial.API.load(config);

      } else {

         var s1 = document.createElement('SC'+'RIPT');
         s1.setAttribute('type', 'text/javascript');
         s1.onload=function() {
           if(typeof ReadSocial!='undefined') {

             ReadSocial.API.load(config);

           } else {
              throw('No ReadSocial API library detected');
           }
         };

         s1.src = base + '/js/readsocial/libRSAPI.js';
         document.body.appendChild(s1);

      }



       window.onload = function () {
        //ReadSocial.log('ReadSocial:starting WindowProxyDispatcher');
        Porthole.WindowProxyDispatcher.start();
       }


    }

  }

}
