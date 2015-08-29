;(function(){var sMap=null;if((sMap||(typeof djConfig!="undefined"&&djConfig.scopeMap))&&(typeof window!="undefined")){var scopeDef="",scopePrefix="",scopeSuffix="",scopeMap={},scopeMapRev={};sMap=sMap||djConfig.scopeMap;for(var i=0;i<sMap.length;i++){var newScope=sMap[i];scopeDef+="var "+newScope[0]+" = {}; "+newScope[1]+" = "+newScope[0]+";"+newScope[1]+"._scopeName = '"+newScope[1]+"';";scopePrefix+=(i==0?"":",")+newScope[0];scopeSuffix+=(i==0?"":",")+newScope[1];scopeMap[newScope[0]]=newScope[1];scopeMapRev[newScope[1]]=newScope[0];}
eval(scopeDef+"dojo._scopeArgs = ["+scopeSuffix+"];");dojo._scopePrefixArgs=scopePrefix;dojo._scopePrefix="(function("+scopePrefix+"){";dojo._scopeSuffix="})("+scopeSuffix+")";dojo._scopeMap=scopeMap;dojo._scopeMapRev=scopeMapRev;}
(function(){if(typeof this["loadFirebugConsole"]=="function"){this["loadFirebugConsole"]();}else{this.console=this.console||{};var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];var i=0,tn;while((tn=cn[i++])){if(!console[tn]){(function(){var tcn=tn+"";console[tcn]=('log'in console)?function(){var a=Array.apply({},arguments);a.unshift(tcn+":");console["log"](a.join(" "));}:function(){}})();}}}
if(typeof dojo=="undefined"){this.dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};}
var d=dojo;if(typeof dijit=="undefined"){this.dijit={_scopeName:"dijit"};}
if(typeof dojox=="undefined"){this.dojox={_scopeName:"dojox"};}
if(!d._scopeArgs){d._scopeArgs=[dojo,dijit,dojox];}
d.global=this;d.config={isDebug:false,debugAtAllCosts:false};if(typeof djConfig!="undefined"){for(var opt in djConfig){d.config[opt]=djConfig[opt];}}
dojo.locale=d.config.locale;var rev="$Rev: 17136 $".match(/\d+/);dojo.version={major:1,minor:3,patch:0,flag:"",revision:rev?+rev[0]:NaN,toString:function(){with(d.version){return major+"."+minor+"."+patch+flag+" ("+revision+")";}}}
if(typeof OpenAjax!="undefined"){OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());}
var tobj={};dojo._mixin=function(obj,props){for(var x in props){if(tobj[x]===undefined||tobj[x]!=props[x]){obj[x]=props[x];}}
if(d.isIE&&props){var p=props.toString;if(typeof p=="function"&&p!=obj.toString&&p!=tobj.toString&&p!="\nfunction toString() {\n    [native code]\n}\n"){obj.toString=props.toString;}}
return obj;}
dojo.mixin=function(obj,props){if(!obj){obj={};}
for(var i=1,l=arguments.length;i<l;i++){d._mixin(obj,arguments[i]);}
return obj;}
dojo._getProp=function(parts,create,context){var obj=context||d.global;for(var i=0,p;obj&&(p=parts[i]);i++){if(i==0&&this._scopeMap[p]){p=this._scopeMap[p];}
obj=(p in obj?obj[p]:(create?obj[p]={}:undefined));}
return obj;}
dojo.setObject=function(name,value,context){var parts=name.split("."),p=parts.pop(),obj=d._getProp(parts,true,context);return obj&&p?(obj[p]=value):undefined;}
dojo.getObject=function(name,create,context){return d._getProp(name.split("."),create,context);}
dojo.exists=function(name,obj){return!!d.getObject(name,false,obj);}
dojo["eval"]=function(scriptFragment){return d.global.eval?d.global.eval(scriptFragment):eval(scriptFragment);}
d.deprecated=d.experimental=function(){};})();(function(){var d=dojo;d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(module){var mp=this._modulePrefixes;return!!(mp[module]&&mp[module].value);},_getModulePrefix:function(module){var mp=this._modulePrefixes;if(this._moduleHasPrefix(module)){return mp[module].value;}
return module;},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});dojo._loadPath=function(relpath,module,cb){var uri=((relpath.charAt(0)=='/'||relpath.match(/^\w+:/))?"":this.baseUrl)+relpath;try{return!module?this._loadUri(uri,cb):this._loadUriAndCheck(uri,module,cb);}catch(e){console.error(e);return false;}}
dojo._loadUri=function(uri,cb){if(this._loadedUrls[uri]){return true;}
var contents=this._getText(uri,true);if(!contents){return false;}
this._loadedUrls[uri]=true;this._loadedUrls.push(uri);if(cb){contents='('+contents+')';}else{contents=this._scopePrefix+contents+this._scopeSuffix;}
if(d.isMoz){contents+="\r\n//@ sourceURL="+uri;}
var value=d["eval"](contents);if(cb){cb(value);}
return true;}
dojo._loadUriAndCheck=function(uri,moduleName,cb){var ok=false;try{ok=this._loadUri(uri,cb);}catch(e){console.error("failed loading "+uri+" with error: "+e);}
return!!(ok&&this._loadedModules[moduleName]);}
dojo.loaded=function(){this._loadNotifying=true;this._postLoad=true;var mll=d._loaders;this._loaders=[];for(var x=0;x<mll.length;x++){mll[x]();}
this._loadNotifying=false;if(d._postLoad&&d._inFlightCount==0&&mll.length){d._callLoaded();}}
dojo.unloaded=function(){var mll=d._unloaders;while(mll.length){(mll.pop())();}}
d._onto=function(arr,obj,fn){if(!fn){arr.push(obj);}else if(fn){var func=(typeof fn=="string")?obj[fn]:fn;arr.push(function(){func.call(obj);});}}
dojo.addOnLoad=function(obj,functionName){d._onto(d._loaders,obj,functionName);if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){d._callLoaded();}}
var dca=d.config.addOnLoad;if(dca){d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);}
dojo._modulesLoaded=function(){if(d._postLoad){return;}
if(d._inFlightCount>0){console.warn("files still in flight!");return;}
d._callLoaded();}
dojo._callLoaded=function(){if(typeof setTimeout=="object"||(dojo.config.useXDomain&&d.isOpera)){if(dojo.isAIR){setTimeout(function(){dojo.loaded();},0);}else{setTimeout(dojo._scopeName+".loaded();",0);}}else{d.loaded();}}
dojo._getModuleSymbols=function(modulename){var syms=modulename.split(".");for(var i=syms.length;i>0;i--){var parentModule=syms.slice(0,i).join(".");if((i==1)&&!this._moduleHasPrefix(parentModule)){syms[0]="../"+syms[0];}else{var parentModulePath=this._getModulePrefix(parentModule);if(parentModulePath!=parentModule){syms.splice(0,i,parentModulePath);break;}}}
return syms;}
dojo._global_omit_module_check=false;dojo.loadInit=function(init){init();}
dojo._loadModule=dojo.require=function(moduleName,omitModuleCheck){omitModuleCheck=this._global_omit_module_check||omitModuleCheck;var module=this._loadedModules[moduleName];if(module){return module;}
var relpath=this._getModuleSymbols(moduleName).join("/")+'.js';var modArg=(!omitModuleCheck)?moduleName:null;var ok=this._loadPath(relpath,modArg);if(!ok&&!omitModuleCheck){throw new Error("Could not load '"+moduleName+"'; last tried '"+relpath+"'");}
if(!omitModuleCheck&&!this._isXDomain){module=this._loadedModules[moduleName];if(!module){throw new Error("symbol '"+moduleName+"' is not defined after loading '"+relpath+"'");}}
return module;}
dojo.provide=function(resourceName){resourceName=resourceName+"";return(d._loadedModules[resourceName]=d.getObject(resourceName,true));}
dojo.platformRequire=function(modMap){var common=modMap.common||[];var result=common.concat(modMap[d._name]||modMap["default"]||[]);for(var x=0;x<result.length;x++){var curr=result[x];if(curr.constructor==Array){d._loadModule.apply(d,curr);}else{d._loadModule(curr);}}}
dojo.requireIf=function(condition,resourceName){if(condition===true){var args=[];for(var i=1;i<arguments.length;i++){args.push(arguments[i]);}
d.require.apply(d,args);}}
dojo.requireAfterIf=d.requireIf;dojo.registerModulePath=function(module,prefix){d._modulePrefixes[module]={name:module,value:prefix};}
dojo.requireLocalization=function(moduleName,bundleName,locale,availableFlatLocales){d.require("dojo.i18n");d.i18n._requireLocalization.apply(d.hostenv,arguments);};var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$");var ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");dojo._Url=function(){var n=null;var _a=arguments;var uri=[_a[0]];for(var i=1;i<_a.length;i++){if(!_a[i]){continue;}
var relobj=new d._Url(_a[i]+"");var uriobj=new d._Url(uri[0]+"");if(relobj.path==""&&!relobj.scheme&&!relobj.authority&&!relobj.query){if(relobj.fragment!=n){uriobj.fragment=relobj.fragment;}
relobj=uriobj;}else if(!relobj.scheme){relobj.scheme=uriobj.scheme;if(!relobj.authority){relobj.authority=uriobj.authority;if(relobj.path.charAt(0)!="/"){var path=uriobj.path.substring(0,uriobj.path.lastIndexOf("/")+1)+relobj.path;var segs=path.split("/");for(var j=0;j<segs.length;j++){if(segs[j]=="."){if(j==segs.length-1){segs[j]="";}else{segs.splice(j,1);j--;}}else if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){if(j==(segs.length-1)){segs.splice(j,1);segs[j-1]="";}else{segs.splice(j-1,2);j-=2;}}}
relobj.path=segs.join("/");}}}
uri=[];if(relobj.scheme){uri.push(relobj.scheme,":");}
if(relobj.authority){uri.push("//",relobj.authority);}
uri.push(relobj.path);if(relobj.query){uri.push("?",relobj.query);}
if(relobj.fragment){uri.push("#",relobj.fragment);}}
this.uri=uri.join("");var r=this.uri.match(ore);this.scheme=r[2]||(r[1]?"":n);this.authority=r[4]||(r[3]?"":n);this.path=r[5];this.query=r[7]||(r[6]?"":n);this.fragment=r[9]||(r[8]?"":n);if(this.authority!=n){r=this.authority.match(ire);this.user=r[3]||n;this.password=r[4]||n;this.host=r[6]||r[7];this.port=r[9]||n;}}
dojo._Url.prototype.toString=function(){return this.uri;};dojo.moduleUrl=function(module,url){var loc=d._getModuleSymbols(module).join('/');if(!loc){return null;}
if(loc.lastIndexOf("/")!=loc.length-1){loc+="/";}
var colonIndex=loc.indexOf(":");if(loc.charAt(0)!="/"&&(colonIndex==-1||colonIndex>loc.indexOf("/"))){loc=d.baseUrl+loc;}
return new d._Url(loc,url);}})();if(typeof window!='undefined'){dojo.isBrowser=true;dojo._name="browser";(function(){var d=dojo;if(document&&document.getElementsByTagName){var scripts=document.getElementsByTagName("script");var rePkg=/dojo(\.xd)?\.js(\W|$)/i;for(var i=0;i<scripts.length;i++){var src=scripts[i].getAttribute("src");if(!src){continue;}
var m=src.match(rePkg);if(m){if(!d.config.baseUrl){d.config.baseUrl=src.substring(0,m.index);}
var cfg=scripts[i].getAttribute("djConfig");if(cfg){var cfgo=eval("({ "+cfg+" })");for(var x in cfgo){dojo.config[x]=cfgo[x];}}
break;}}}
d.baseUrl=d.config.baseUrl;var n=navigator;var dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);if(dua.indexOf("Opera")>=0){d.isOpera=tv;}
if(dua.indexOf("AdobeAIR")>=0){d.isAIR=1;}
d.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:0;d.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;d.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;var index=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);if(index&&!dojo.isChrome){d.isSafari=parseFloat(dav.split("Version/")[1]);if(!d.isSafari||parseFloat(dav.substr(index+7))<=419.3){d.isSafari=2;}}
if(dua.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){d.isMozilla=d.isMoz=tv;}
if(d.isMoz){d.isFF=parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1]||dua.split("Shiretoko/")[1])||undefined;}
if(document.all&&!d.isOpera){d.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;if(d.isIE>=8&&document.documentMode!=5){d.isIE=document.documentMode;}}
if(dojo.isIE&&window.location.protocol==="file:"){dojo.config.ieForceActiveXXhr=true;}
var cm=document.compatMode;d.isQuirks=cm=="BackCompat"||cm=="QuirksMode"||d.isIE<6;d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();d._XMLHTTP_PROGIDS=['Msxml2.XMLHTTP','Microsoft.XMLHTTP','Msxml2.XMLHTTP.4.0'];d._xhrObj=function(){var http,last_e;if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){try{http=new XMLHttpRequest();}catch(e){}}
if(!http){for(var i=0;i<3;++i){var progid=d._XMLHTTP_PROGIDS[i];try{http=new ActiveXObject(progid);}catch(e){last_e=e;}
if(http){d._XMLHTTP_PROGIDS=[progid];break;}}}
if(!http){throw new Error("XMLHTTP not available: "+last_e);}
return http;}
d._isDocumentOk=function(http){var stat=http.status||0;return(stat>=200&&stat<300)||stat==304||stat==1223||(!stat&&(location.protocol=="file:"||location.protocol=="chrome:"));}
var owloc=window.location+"";var base=document.getElementsByTagName("base");var hasBase=(base&&base.length>0);d._getText=function(uri,fail_ok){var http=this._xhrObj();if(!hasBase&&dojo._Url){uri=(new dojo._Url(owloc,uri)).toString();}
if(d.config.cacheBust){uri+="";uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");}
http.open('GET',uri,false);try{http.send(null);if(!d._isDocumentOk(http)){var err=Error("Unable to load "+uri+" status:"+http.status);err.status=http.status;err.responseText=http.responseText;throw err;}}catch(e){if(fail_ok){return null;}
throw e;}
return http.responseText;}
var _w=window;var _handleNodeEvent=function(evtName,fp){var oldHandler=_w[evtName]||function(){};_w[evtName]=function(){fp.apply(_w,arguments);oldHandler.apply(_w,arguments);};};d._windowUnloaders=[];d.windowUnloaded=function(){var mll=d._windowUnloaders;while(mll.length){(mll.pop())();}};var _onWindowUnloadAttached=0;d.addOnWindowUnload=function(obj,functionName){d._onto(d._windowUnloaders,obj,functionName);if(!_onWindowUnloadAttached){_onWindowUnloadAttached=1;_handleNodeEvent("onunload",d.windowUnloaded);}};var _onUnloadAttached=0;d.addOnUnload=function(obj,functionName){d._onto(d._unloaders,obj,functionName);if(!_onUnloadAttached){_onUnloadAttached=1;_handleNodeEvent("onbeforeunload",dojo.unloaded);}};})();dojo._initFired=false;dojo._loadInit=function(e){dojo._initFired=true;var type=e&&e.type?e.type.toLowerCase():"load";if(arguments.callee.initialized||(type!="domcontentloaded"&&type!="load")){return;}
arguments.callee.initialized=true;if("_khtmlTimer"in dojo){clearInterval(dojo._khtmlTimer);delete dojo._khtmlTimer;}
if(dojo._inFlightCount==0){dojo._modulesLoaded();}}
if(!dojo.config.afterOnLoad){if(document.addEventListener){if(dojo.isWebKit>525||dojo.isOpera||dojo.isFF>=3||(dojo.isMoz&&dojo.config.enableMozDomContentLoaded===true)){document.addEventListener("DOMContentLoaded",dojo._loadInit,null);}
window.addEventListener("load",dojo._loadInit,null);}
if(dojo.isAIR){window.addEventListener("load",dojo._loadInit,null);}else if((dojo.isWebKit<525)||dojo.isKhtml){dojo._khtmlTimer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){dojo._loadInit();}},10);}}
if(dojo.isIE){if(!dojo.config.afterOnLoad){document.write('<scr'+'ipt defer src="//:" '
+'onreadystatechange="if(this.readyState==\'complete\'){'+dojo._scopeName+'._loadInit();}">'
+'</scr'+'ipt>');}
try{document.namespaces.add("v","urn:schemas-microsoft-com:vml");document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML);  display:inline-block");}catch(e){}}}
(function(){var mp=dojo.config["modulePaths"];if(mp){for(var param in mp){dojo.registerModulePath(param,mp[param]);}}})();if(dojo.config.isDebug){dojo.require("dojo._firebug.firebug");}
if(dojo.config.debugAtAllCosts){dojo.config.useXDomain=true;dojo.require("dojo._base._loader.loader_xd");dojo.require("dojo._base._loader.loader_debug");dojo.require("dojo.i18n");}
if(!dojo._hasResource["dojo._base.lang"]){dojo._hasResource["dojo._base.lang"]=true;dojo.provide("dojo._base.lang");dojo.isString=function(it){return!!arguments.length&&it!=null&&(typeof it=="string"||it instanceof String);}
dojo.isArray=function(it){return it&&(it instanceof Array||typeof it=="array");}
dojo.isFunction=(function(){var _isFunction=function(it){var t=typeof it;return it&&(t=="function"||it instanceof Function);};return dojo.isSafari?function(it){if(typeof it=="function"&&it=="[object NodeList]"){return false;}
return _isFunction(it);}:_isFunction;})();dojo.isObject=function(it){return it!==undefined&&(it===null||typeof it=="object"||dojo.isArray(it)||dojo.isFunction(it));}
dojo.isArrayLike=function(it){var d=dojo;return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=='form')&&(d.isArray(it)||isFinite(it.length));}
dojo.isAlien=function(it){return it&&!dojo.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));}
dojo.extend=function(constructor,props){for(var i=1,l=arguments.length;i<l;i++){dojo._mixin(constructor.prototype,arguments[i]);}
return constructor;}
dojo._hitchArgs=function(scope,method){var pre=dojo._toArray(arguments,2);var named=dojo.isString(method);return function(){var args=dojo._toArray(arguments);var f=named?(scope||dojo.global)[method]:method;return f&&f.apply(scope||this,pre.concat(args));}}
dojo.hitch=function(scope,method){if(arguments.length>2){return dojo._hitchArgs.apply(dojo,arguments);}
if(!method){method=scope;scope=null;}
if(dojo.isString(method)){scope=scope||dojo.global;if(!scope[method]){throw(['dojo.hitch: scope["',method,'"] is null (scope="',scope,'")'].join(''));}
return function(){return scope[method].apply(scope,arguments||[]);};}
return!scope?method:function(){return method.apply(scope,arguments||[]);};}
dojo.delegate=dojo._delegate=(function(){function TMP(){}
return function(obj,props){TMP.prototype=obj;var tmp=new TMP();if(props){dojo._mixin(tmp,props);}
return tmp;}})();(function(){var efficient=function(obj,offset,startWith){return(startWith||[]).concat(Array.prototype.slice.call(obj,offset||0));};var slow=function(obj,offset,startWith){var arr=startWith||[];for(var x=offset||0;x<obj.length;x++){arr.push(obj[x]);}
return arr;};dojo._toArray=dojo.isIE?function(obj){return((obj.item)?slow:efficient).apply(this,arguments);}:efficient;})();dojo.partial=function(method){var arr=[null];return dojo.hitch.apply(dojo,arr.concat(dojo._toArray(arguments)));}
dojo.clone=function(o){if(!o){return o;}
if(dojo.isArray(o)){var r=[];for(var i=0;i<o.length;++i){r.push(dojo.clone(o[i]));}
return r;}
if(!dojo.isObject(o)){return o;}
if(o.nodeType&&o.cloneNode){return o.cloneNode(true);}
if(o instanceof Date){return new Date(o.getTime());}
r=new o.constructor();for(i in o){if(!(i in r)||r[i]!=o[i]){r[i]=dojo.clone(o[i]);}}
return r;}
dojo.trim=String.prototype.trim?function(str){return str.trim();}:function(str){return str.replace(/^\s\s*/,'').replace(/\s\s*$/,'');};}
if(!dojo._hasResource["dojo._base.declare"]){dojo._hasResource["dojo._base.declare"]=true;dojo.provide("dojo._base.declare");dojo.declare=function(className,superclass,props){var dd=arguments.callee,mixins;if(dojo.isArray(superclass)){mixins=superclass;superclass=mixins.shift();}
if(mixins){dojo.forEach(mixins,function(m,i){if(!m){throw(className+": mixin #"+i+" is null");}
superclass=dd._delegate(superclass,m);});}
var ctor=dd._delegate(superclass);props=props||{};ctor.extend(props);dojo.extend(ctor,{declaredClass:className,_constructor:props.constructor});ctor.prototype.constructor=ctor;return dojo.setObject(className,ctor);};dojo.mixin(dojo.declare,{_delegate:function(base,mixin){var bp=(base||0).prototype,mp=(mixin||0).prototype,dd=dojo.declare;var ctor=dd._makeCtor();dojo.mixin(ctor,{superclass:bp,mixin:mp,extend:dd._extend});if(base){ctor.prototype=dojo._delegate(bp);}
dojo.extend(ctor,dd._core,mp||0,{_constructor:null,preamble:null});ctor.prototype.constructor=ctor;ctor.prototype.declaredClass=(bp||0).declaredClass+'_'+(mp||0).declaredClass;return ctor;},_extend:function(props){var i,fn;for(i in props){if(dojo.isFunction(fn=props[i])&&!0[i]){fn.nom=i;fn.ctor=this;}}
dojo.extend(this,props);},_makeCtor:function(){return function(){this._construct(arguments);};},_core:{_construct:function(args){var c=args.callee,s=c.superclass,ct=s&&s.constructor,m=c.mixin,mct=m&&m.constructor,a=args,ii,fn;if(a[0]){if(((fn=a[0].preamble))){a=fn.apply(this,a)||a;}}
if((fn=c.prototype.preamble)){a=fn.apply(this,a)||a;}
if(ct&&ct.apply){ct.apply(this,a);}
if(mct&&mct.apply){mct.apply(this,a);}
if((ii=c.prototype._constructor)){ii.apply(this,args);}
if(this.constructor.prototype==c.prototype&&(ct=this.postscript)){ct.apply(this,args);}},_findMixin:function(mixin){var c=this.constructor,p,m;while(c){p=c.superclass;m=c.mixin;if(m==mixin||(m instanceof mixin.constructor)){return p;}
if(m&&m._findMixin&&(m=m._findMixin(mixin))){return m;}
c=p&&p.constructor;}},_findMethod:function(name,method,ptype,has){var p=ptype,c,m,f;do{c=p.constructor;m=c.mixin;if(m&&(m=this._findMethod(name,method,m,has))){return m;}
if((f=p[name])&&(has==(f==method))){return p;}
p=c.superclass;}while(p);return!has&&(p=this._findMixin(ptype))&&this._findMethod(name,method,p,has);},inherited:function(name,args,newArgs){var a=arguments;if(!dojo.isString(a[0])){newArgs=args;args=name;name=args.callee.nom;}
a=newArgs||args;var c=args.callee,p=this.constructor.prototype,fn,mp;if(this[name]!=c||p[name]==c){mp=(c.ctor||0).superclass||this._findMethod(name,c,p,true);if(!mp){throw(this.declaredClass+': inherited method "'+name+'" mismatch');}
p=this._findMethod(name,c,mp,false);}
fn=p&&p[name];if(!fn){throw(mp.declaredClass+': inherited method "'+name+'" not found');}
return fn.apply(this,a);}}});}
if(!dojo._hasResource["dojo._base.connect"]){dojo._hasResource["dojo._base.connect"]=true;dojo.provide("dojo._base.connect");dojo._listener={getDispatcher:function(){return function(){var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target;var r=t&&t.apply(this,arguments);var lls;lls=[].concat(ls);for(var i in lls){if(!(i in ap)){lls[i].apply(this,arguments);}}
return r;}},add:function(source,method,listener){source=source||dojo.global;var f=source[method];if(!f||!f._listeners){var d=dojo._listener.getDispatcher();d.target=f;d._listeners=[];f=source[method]=d;}
return f._listeners.push(listener);},remove:function(source,method,handle){var f=(source||dojo.global)[method];if(f&&f._listeners&&handle--){delete f._listeners[handle];}}};dojo.connect=function(obj,event,context,method,dontFix){var a=arguments,args=[],i=0;args.push(dojo.isString(a[0])?null:a[i++],a[i++]);var a1=a[i+1];args.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);for(var l=a.length;i<l;i++){args.push(a[i]);}
return dojo._connect.apply(this,args);}
dojo._connect=function(obj,event,context,method){var l=dojo._listener,h=l.add(obj,event,dojo.hitch(context,method));return[obj,event,h,l];}
dojo.disconnect=function(handle){if(handle&&handle[0]!==undefined){dojo._disconnect.apply(this,handle);delete handle[0];}}
dojo._disconnect=function(obj,event,handle,listener){listener.remove(obj,event,handle);}
dojo._topics={};dojo.subscribe=function(topic,context,method){return[topic,dojo._listener.add(dojo._topics,topic,dojo.hitch(context,method))];}
dojo.unsubscribe=function(handle){if(handle){dojo._listener.remove(dojo._topics,handle[0],handle[1]);}}
dojo.publish=function(topic,args){var f=dojo._topics[topic];if(f){f.apply(this,args||[]);}}
dojo.connectPublisher=function(topic,obj,event){var pf=function(){dojo.publish(topic,arguments);}
return(event)?dojo.connect(obj,event,pf):dojo.connect(obj,pf);};}
if(!dojo._hasResource["dojo._base.Deferred"]){dojo._hasResource["dojo._base.Deferred"]=true;dojo.provide("dojo._base.Deferred");dojo.Deferred=function(canceller){this.chain=[];this.id=this._nextId();this.fired=-1;this.paused=0;this.results=[null,null];this.canceller=canceller;this.silentlyCancelled=false;};dojo.extend(dojo.Deferred,{_nextId:(function(){var n=1;return function(){return n++;};})(),cancel:function(){var err;if(this.fired==-1){if(this.canceller){err=this.canceller(this);}else{this.silentlyCancelled=true;}
if(this.fired==-1){if(!(err instanceof Error)){var res=err;var msg="Deferred Cancelled";if(err&&err.toString){msg+=": "+err.toString();}
err=new Error(msg);err.dojoType="cancel";err.cancelResult=res;}
this.errback(err);}}else if((this.fired==0)&&(this.results[0]instanceof dojo.Deferred)){this.results[0].cancel();}},_resback:function(res){this.fired=((res instanceof Error)?1:0);this.results[this.fired]=res;this._fire();},_check:function(){if(this.fired!=-1){if(!this.silentlyCancelled){throw new Error("already called!");}
this.silentlyCancelled=false;return;}},callback:function(res){this._check();this._resback(res);},errback:function(res){this._check();if(!(res instanceof Error)){res=new Error(res);}
this._resback(res);},addBoth:function(cb,cbfn){var enclosed=dojo.hitch.apply(dojo,arguments);return this.addCallbacks(enclosed,enclosed);},addCallback:function(cb,cbfn){return this.addCallbacks(dojo.hitch.apply(dojo,arguments));},addErrback:function(cb,cbfn){return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));},addCallbacks:function(cb,eb){this.chain.push([cb,eb])
if(this.fired>=0){this._fire();}
return this;},_fire:function(){var chain=this.chain;var fired=this.fired;var res=this.results[fired];var self=this;var cb=null;while((chain.length>0)&&(this.paused==0)){var f=chain.shift()[fired];if(!f){continue;}
var func=function(){var ret=f(res);if(typeof ret!="undefined"){res=ret;}
fired=((res instanceof Error)?1:0);if(res instanceof dojo.Deferred){cb=function(res){self._resback(res);self.paused--;if((self.paused==0)&&(self.fired>=0)){self._fire();}}
this.paused++;}};if(dojo.config.debugAtAllCosts){func.call(this);}else{try{func.call(this);}catch(err){fired=1;res=err;}}}
this.fired=fired;this.results[fired]=res;if((cb)&&(this.paused)){res.addBoth(cb);}}});}
if(!dojo._hasResource["dojo._base.json"]){dojo._hasResource["dojo._base.json"]=true;dojo.provide("dojo._base.json");dojo.fromJson=function(json){return eval("("+json+")");}
dojo._escapeString=function(str){return('"'+str.replace(/(["\\])/g,'\\$1')+'"').replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");}
dojo.toJsonIndentStr="\t";dojo.toJson=function(it,prettyPrint,_indentStr){if(it===undefined){return"undefined";}
var objtype=typeof it;if(objtype=="number"||objtype=="boolean"){return it+"";}
if(it===null){return"null";}
if(dojo.isString(it)){return dojo._escapeString(it);}
var recurse=arguments.callee;var newObj;_indentStr=_indentStr||"";var nextIndent=prettyPrint?_indentStr+dojo.toJsonIndentStr:"";var tf=it.__json__||it.json;if(dojo.isFunction(tf)){newObj=tf.call(it);if(it!==newObj){return recurse(newObj,prettyPrint,nextIndent);}}
if(it.nodeType&&it.cloneNode){throw new Error("Can't serialize DOM nodes");}
var sep=prettyPrint?" ":"";var newLine=prettyPrint?"\n":"";if(dojo.isArray(it)){var res=dojo.map(it,function(obj){var val=recurse(obj,prettyPrint,nextIndent);if(typeof val!="string"){val="undefined";}
return newLine+nextIndent+val;});return"["+res.join(","+sep)+newLine+_indentStr+"]";}
if(objtype=="function"){return null;}
var output=[],key;for(key in it){var keyStr,val;if(typeof key=="number"){keyStr='"'+key+'"';}else if(typeof key=="string"){keyStr=dojo._escapeString(key);}else{continue;}
val=recurse(it[key],prettyPrint,nextIndent);if(typeof val!="string"){continue;}
output.push(newLine+nextIndent+keyStr+":"+sep+val);}
return"{"+output.join(","+sep)+newLine+_indentStr+"}";}}
if(!dojo._hasResource["dojo._base.array"]){dojo._hasResource["dojo._base.array"]=true;dojo.provide("dojo._base.array");(function(){var _getParts=function(arr,obj,cb){return[dojo.isString(arr)?arr.split(""):arr,obj||dojo.global,dojo.isString(cb)?new Function("item","index","array",cb):cb];};dojo.mixin(dojo,{indexOf:function(array,value,fromIndex,findLast){var step=1,end=array.length||0,i=0;if(findLast){i=end-1;step=end=-1;}
if(fromIndex!=undefined){i=fromIndex;}
if((findLast&&i>end)||i<end){for(;i!=end;i+=step){if(array[i]==value){return i;}}}
return-1;},lastIndexOf:function(array,value,fromIndex){return dojo.indexOf(array,value,fromIndex,true);},forEach:function(arr,callback,thisObject){if(!arr||!arr.length){return;}
var _p=_getParts(arr,thisObject,callback);arr=_p[0];for(var i=0,l=arr.length;i<l;++i){_p[2].call(_p[1],arr[i],i,arr);}},_everyOrSome:function(every,arr,callback,thisObject){var _p=_getParts(arr,thisObject,callback);arr=_p[0];for(var i=0,l=arr.length;i<l;++i){var result=!!_p[2].call(_p[1],arr[i],i,arr);if(every^result){return result;}}
return every;},every:function(arr,callback,thisObject){return this._everyOrSome(true,arr,callback,thisObject);},some:function(arr,callback,thisObject){return this._everyOrSome(false,arr,callback,thisObject);},map:function(arr,callback,thisObject){var _p=_getParts(arr,thisObject,callback);arr=_p[0];var outArr=(arguments[3]?(new arguments[3]()):[]);for(var i=0,l=arr.length;i<l;++i){outArr.push(_p[2].call(_p[1],arr[i],i,arr));}
return outArr;},filter:function(arr,callback,thisObject){var _p=_getParts(arr,thisObject,callback);arr=_p[0];var outArr=[];for(var i=0,l=arr.length;i<l;++i){if(_p[2].call(_p[1],arr[i],i,arr)){outArr.push(arr[i]);}}
return outArr;}});})();}
if(!dojo._hasResource["dojo._base.Color"]){dojo._hasResource["dojo._base.Color"]=true;dojo.provide("dojo._base.Color");(function(){var d=dojo;dojo.Color=function(color){if(color){this.setColor(color);}};dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){var t=this;t.r=r;t.g=g;t.b=b;t.a=a;},setColor:function(color){if(d.isString(color)){d.colorFromString(color,this);}else if(d.isArray(color)){d.colorFromArray(color,this);}else{this._set(color.r,color.g,color.b,color.a);if(!(color instanceof d.Color)){this.sanitize();}}
return this;},sanitize:function(){return this;},toRgb:function(){var t=this;return[t.r,t.g,t.b];},toRgba:function(){var t=this;return[t.r,t.g,t.b,t.a];},toHex:function(){var arr=d.map(["r","g","b"],function(x){var s=this[x].toString(16);return s.length<2?"0"+s:s;},this);return"#"+arr.join("");},toCss:function(includeAlpha){var t=this,rgb=t.r+", "+t.g+", "+t.b;return(includeAlpha?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";},toString:function(){return this.toCss(true);}});dojo.blendColors=function(start,end,weight,obj){var t=obj||new d.Color();d.forEach(["r","g","b","a"],function(x){t[x]=start[x]+(end[x]-start[x])*weight;if(x!="a"){t[x]=Math.round(t[x]);}});return t.sanitize();};dojo.colorFromRgb=function(color,obj){var m=color.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);};dojo.colorFromHex=function(color,obj){var t=obj||new d.Color(),bits=(color.length==4)?4:8,mask=(1<<bits)-1;color=Number("0x"+color.substr(1));if(isNaN(color)){return null;}
d.forEach(["b","g","r"],function(x){var c=color&mask;color>>=bits;t[x]=bits==4?17*c:c;});t.a=1;return t;};dojo.colorFromArray=function(a,obj){var t=obj||new d.Color();t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));if(isNaN(t.a)){t.a=1;}
return t.sanitize();};dojo.colorFromString=function(str,obj){var a=d.Color.named[str];return a&&d.colorFromArray(a,obj)||d.colorFromRgb(str,obj)||d.colorFromHex(str,obj);};})();}
if(!dojo._hasResource["dojo._base"]){dojo._hasResource["dojo._base"]=true;dojo.provide("dojo._base");}
if(!dojo._hasResource["dojo._base.window"]){dojo._hasResource["dojo._base.window"]=true;dojo.provide("dojo._base.window");dojo.doc=window["document"]||null;dojo.body=function(){return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];}
dojo.setContext=function(globalObject,globalDocument){dojo.global=globalObject;dojo.doc=globalDocument;};dojo.withGlobal=function(globalObject,callback,thisObject,cbArguments){var oldGlob=dojo.global;try{dojo.global=globalObject;return dojo.withDoc.call(null,globalObject.document,callback,thisObject,cbArguments);}finally{dojo.global=oldGlob;}}
dojo.withDoc=function(documentObject,callback,thisObject,cbArguments){var oldDoc=dojo.doc,oldLtr=dojo._bodyLtr;try{dojo.doc=documentObject;delete dojo._bodyLtr;if(thisObject&&dojo.isString(callback)){callback=thisObject[callback];}
return callback.apply(thisObject,cbArguments||[]);}finally{dojo.doc=oldDoc;if(oldLtr!==undefined){dojo._bodyLtr=oldLtr;}}};}
if(!dojo._hasResource["dojo._base.event"]){dojo._hasResource["dojo._base.event"]=true;dojo.provide("dojo._base.event");(function(){var del=(dojo._event_listener={add:function(node,name,fp){if(!node){return;}
name=del._normalizeEventName(name);fp=del._fixCallback(name,fp);var oname=name;if(!dojo.isIE&&(name=="mouseenter"||name=="mouseleave")){var ofp=fp;name=(name=="mouseenter")?"mouseover":"mouseout";fp=function(e){if(dojo.isFF<=2){try{e.relatedTarget.tagName;}catch(e2){return;}}
if(!dojo.isDescendant(e.relatedTarget,node)){return ofp.call(this,e);}}}
node.addEventListener(name,fp,false);return fp;},remove:function(node,event,handle){if(node){event=del._normalizeEventName(event);if(!dojo.isIE&&(event=="mouseenter"||event=="mouseleave")){event=(event=="mouseenter")?"mouseover":"mouseout";}
node.removeEventListener(event,handle,false);}},_normalizeEventName:function(name){return name.slice(0,2)=="on"?name.slice(2):name;},_fixCallback:function(name,fp){return name!="keypress"?fp:function(e){return fp.call(this,del._fixEvent(e,this));};},_fixEvent:function(evt,sender){switch(evt.type){case"keypress":del._setKeyChar(evt);break;}
return evt;},_setKeyChar:function(evt){evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):'';evt.charOrCode=evt.keyChar||evt.keyCode;},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});dojo.fixEvent=function(evt,sender){return del._fixEvent(evt,sender);}
dojo.stopEvent=function(evt){evt.preventDefault();evt.stopPropagation();}
var node_listener=dojo._listener;dojo._connect=function(obj,event,context,method,dontFix){var isNode=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);var lid=isNode?(dontFix?2:1):0,l=[dojo._listener,del,node_listener][lid];var h=l.add(obj,event,dojo.hitch(context,method));return[obj,event,h,lid];}
dojo._disconnect=function(obj,event,handle,listener){([dojo._listener,del,node_listener][listener]).remove(obj,event,handle);}
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};if(dojo.isIE){var _trySetKeyCode=function(e,code){try{return(e.keyCode=code);}catch(e){return 0;}}
var iel=dojo._listener;var listenersName=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");if(!dojo.config._allow_leaks){node_listener=iel=dojo._ie_listener={handlers:[],add:function(source,method,listener){source=source||dojo.global;var f=source[method];if(!f||!f[listenersName]){var d=dojo._getIeDispatcher();d.target=f&&(ieh.push(f)-1);d[listenersName]=[];f=source[method]=d;}
return f[listenersName].push(ieh.push(listener)-1);},remove:function(source,method,handle){var f=(source||dojo.global)[method],l=f&&f[listenersName];if(f&&l&&handle--){delete ieh[l[handle]];delete l[handle];}}};var ieh=iel.handlers;}
dojo.mixin(del,{add:function(node,event,fp){if(!node){return;}
event=del._normalizeEventName(event);if(event=="onkeypress"){var kd=node.onkeydown;if(!kd||!kd[listenersName]||!kd._stealthKeydownHandle){var h=del.add(node,"onkeydown",del._stealthKeyDown);kd=node.onkeydown;kd._stealthKeydownHandle=h;kd._stealthKeydownRefs=1;}else{kd._stealthKeydownRefs++;}}
return iel.add(node,event,del._fixCallback(fp));},remove:function(node,event,handle){event=del._normalizeEventName(event);iel.remove(node,event,handle);if(event=="onkeypress"){var kd=node.onkeydown;if(--kd._stealthKeydownRefs<=0){iel.remove(node,"onkeydown",kd._stealthKeydownHandle);delete kd._stealthKeydownHandle;}}},_normalizeEventName:function(eventName){return eventName.slice(0,2)!="on"?"on"+eventName:eventName;},_nop:function(){},_fixEvent:function(evt,sender){if(!evt){var w=sender&&(sender.ownerDocument||sender.document||sender).parentWindow||window;evt=w.event;}
if(!evt){return(evt);}
evt.target=evt.srcElement;evt.currentTarget=(sender||evt.srcElement);evt.layerX=evt.offsetX;evt.layerY=evt.offsetY;var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;var docBody=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;var offset=dojo._getIeDocumentElementOffset();evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(docBody.scrollLeft||0)-offset.x;evt.pageY=evt.clientY+(docBody.scrollTop||0)-offset.y;if(evt.type=="mouseover"){evt.relatedTarget=evt.fromElement;}
if(evt.type=="mouseout"){evt.relatedTarget=evt.toElement;}
evt.stopPropagation=del._stopPropagation;evt.preventDefault=del._preventDefault;return del._fixKeys(evt);},_fixKeys:function(evt){switch(evt.type){case"keypress":var c=("charCode"in evt?evt.charCode:evt.keyCode);if(c==10){c=0;evt.keyCode=13;}else if(c==13||c==27){c=0;}else if(c==3){c=99;}
evt.charCode=c;del._setKeyChar(evt);break;}
return evt;},_stealthKeyDown:function(evt){var kp=evt.currentTarget.onkeypress;if(!kp||!kp[listenersName]){return;}
var k=evt.keyCode;var unprintable=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(unprintable||evt.ctrlKey){var c=unprintable?0:k;if(evt.ctrlKey){if(k==3||k==13){return;}else if(c>95&&c<106){c-=48;}else if((!evt.shiftKey)&&(c>=65&&c<=90)){c+=32;}else{c=del._punctMap[c]||c;}}
var faux=del._synthesizeEvent(evt,{type:'keypress',faux:true,charCode:c});kp.call(evt.currentTarget,faux);evt.cancelBubble=faux.cancelBubble;evt.returnValue=faux.returnValue;_trySetKeyCode(evt,faux.keyCode);}},_stopPropagation:function(){this.cancelBubble=true;},_preventDefault:function(){this.bubbledKeyCode=this.keyCode;if(this.ctrlKey){_trySetKeyCode(this,0);}
this.returnValue=false;}});dojo.stopEvent=function(evt){evt=evt||window.event;del._stopPropagation.call(evt);del._preventDefault.call(evt);}}
del._synthesizeEvent=function(evt,props){var faux=dojo.mixin({},evt,props);del._setKeyChar(faux);faux.preventDefault=function(){evt.preventDefault();};faux.stopPropagation=function(){evt.stopPropagation();};return faux;}
if(dojo.isOpera){dojo.mixin(del,{_fixEvent:function(evt,sender){switch(evt.type){case"keypress":var c=evt.which;if(c==3){c=99;}
c=c<41&&!evt.shiftKey?0:c;if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){c+=32;}
return del._synthesizeEvent(evt,{charCode:c});}
return evt;}});}
if(dojo.isWebKit){del._add=del.add;del._remove=del.remove;dojo.mixin(del,{add:function(node,event,fp){if(!node){return;}
var handle=del._add(node,event,fp);if(del._normalizeEventName(event)=="keypress"){handle._stealthKeyDownHandle=del._add(node,"keydown",function(evt){var k=evt.keyCode;var unprintable=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(unprintable||evt.ctrlKey){var c=unprintable?0:k;if(evt.ctrlKey){if(k==3||k==13){return;}else if(c>95&&c<106){c-=48;}else if(!evt.shiftKey&&c>=65&&c<=90){c+=32;}else{c=del._punctMap[c]||c;}}
var faux=del._synthesizeEvent(evt,{type:'keypress',faux:true,charCode:c});fp.call(evt.currentTarget,faux);}});}
return handle;},remove:function(node,event,handle){if(node){if(handle._stealthKeyDownHandle){del._remove(node,"keydown",handle._stealthKeyDownHandle);}
del._remove(node,event,handle);}},_fixEvent:function(evt,sender){switch(evt.type){case"keypress":if(evt.faux){return evt;}
var c=evt.charCode;c=c>=32?c:0;return del._synthesizeEvent(evt,{charCode:c,faux:true});}
return evt;}});}})();if(dojo.isIE){dojo._ieDispatcher=function(args,sender){var ap=Array.prototype,h=dojo._ie_listener.handlers,c=args.callee,ls=c[dojo._ieListenersName],t=h[c.target];var r=t&&t.apply(sender,args);var lls=[].concat(ls);for(var i in lls){if(!(i in ap)){h[lls[i]].apply(sender,args);}}
return r;}
dojo._getIeDispatcher=function(){return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");}
dojo._event_listener._fixCallback=function(fp){var f=dojo._event_listener._fixEvent;return function(e){return fp.call(this,f(e,this));};}}}
if(!dojo._hasResource["dojo._base.html"]){dojo._hasResource["dojo._base.html"]=true;dojo.provide("dojo._base.html");try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}
if(dojo.isIE||dojo.isOpera){dojo.byId=function(id,doc){if(dojo.isString(id)){var _d=doc||dojo.doc;var te=_d.getElementById(id);if(te&&(te.attributes.id.value==id||te.id==id)){return te;}else{var eles=_d.all[id];if(!eles||eles.nodeName){eles=[eles];}
var i=0;while((te=eles[i++])){if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){return te;}}}}else{return id;}};}else{dojo.byId=function(id,doc){return dojo.isString(id)?(doc||dojo.doc).getElementById(id):id;};}
(function(){var d=dojo;var _destroyContainer=null;d.addOnWindowUnload(function(){_destroyContainer=null;});dojo._destroyElement=dojo.destroy=function(node){node=d.byId(node);try{if(!_destroyContainer||_destroyContainer.ownerDocument!=node.ownerDocument){_destroyContainer=node.ownerDocument.createElement("div");}
_destroyContainer.appendChild(node.parentNode?node.parentNode.removeChild(node):node);_destroyContainer.innerHTML="";}catch(e){}};dojo.isDescendant=function(node,ancestor){try{node=d.byId(node);ancestor=d.byId(ancestor);while(node){if(node===ancestor){return true;}
node=node.parentNode;}}catch(e){}
return false;};dojo.setSelectable=function(node,selectable){node=d.byId(node);if(d.isMozilla){node.style.MozUserSelect=selectable?"":"none";}else if(d.isKhtml||d.isWebKit){node.style.KhtmlUserSelect=selectable?"auto":"none";}else if(d.isIE){var v=(node.unselectable=selectable?"":"on");d.query("*",node).forEach("item.unselectable = '"+v+"'");}};var _insertBefore=function(node,ref){var parent=ref.parentNode;if(parent){parent.insertBefore(node,ref);}}
var _insertAfter=function(node,ref){var parent=ref.parentNode;if(parent){if(parent.lastChild==ref){parent.appendChild(node);}else{parent.insertBefore(node,ref.nextSibling);}}}
dojo.place=function(node,refNode,position){refNode=d.byId(refNode);if(d.isString(node)){node=node.charAt(0)=="<"?d._toDom(node,refNode.ownerDocument):d.byId(node);}
if(typeof position=="number"){var cn=refNode.childNodes;if(!cn.length||cn.length<=position){refNode.appendChild(node);}else{_insertBefore(node,cn[position<0?0:position]);}}else{switch(position){case"before":_insertBefore(node,refNode);break;case"after":_insertAfter(node,refNode);break;case"replace":refNode.parentNode.replaceChild(node,refNode);break;case"only":d.empty(refNode);refNode.appendChild(node);break;case"first":if(refNode.firstChild){_insertBefore(node,refNode.firstChild);break;}
default:refNode.appendChild(node);}}
return node;}
dojo.boxModel="content-box";if(d.isIE){var _dcm=document.compatMode;d.boxModel=_dcm=="BackCompat"||_dcm=="QuirksMode"||d.isIE<6?"border-box":"content-box";}
var gcs;if(d.isWebKit){gcs=function(node){var s;if(node instanceof HTMLElement){var dv=node.ownerDocument.defaultView;s=dv.getComputedStyle(node,null);if(!s&&node.style){node.style.display="";s=dv.getComputedStyle(node,null);}}
return s||{};};}else if(d.isIE){gcs=function(node){return node.nodeType==1?node.currentStyle:{};};}else{gcs=function(node){return node instanceof HTMLElement?node.ownerDocument.defaultView.getComputedStyle(node,null):{};};}
dojo.getComputedStyle=gcs;if(!d.isIE){d._toPixelValue=function(element,value){return parseFloat(value)||0;};}else{d._toPixelValue=function(element,avalue){if(!avalue){return 0;}
if(avalue=="medium"){return 4;}
if(avalue.slice&&avalue.slice(-2)=='px'){return parseFloat(avalue);}
with(element){var sLeft=style.left;var rsLeft=runtimeStyle.left;runtimeStyle.left=currentStyle.left;try{style.left=avalue;avalue=style.pixelLeft;}catch(e){avalue=0;}
style.left=sLeft;runtimeStyle.left=rsLeft;}
return avalue;}}
var px=d._toPixelValue;var astr="DXImageTransform.Microsoft.Alpha";var af=function(n,f){try{return n.filters.item(astr);}catch(e){return f?{}:null;}}
dojo._getOpacity=d.isIE?function(node){try{return af(node).Opacity/100;}catch(e){return 1;}}:function(node){return gcs(node).opacity;};dojo._setOpacity=d.isIE?function(node,opacity){var ov=opacity*100;node.style.zoom=1.0;af(node,1).Enabled=!(opacity==1);if(!af(node)){node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";}else{af(node,1).Opacity=ov;}
if(node.nodeName.toLowerCase()=="tr"){d.query("> td",node).forEach(function(i){d._setOpacity(i,opacity);});}
return opacity;}:function(node,opacity){return node.style.opacity=opacity;};var _pixelNamesCache={left:true,top:true};var _pixelRegExp=/margin|padding|width|height|max|min|offset/;var _toStyleValue=function(node,type,value){type=type.toLowerCase();if(d.isIE){if(value=="auto"){if(type=="height"){return node.offsetHeight;}
if(type=="width"){return node.offsetWidth;}}
if(type=="fontweight"){switch(value){case 700:return"bold";case 400:default:return"normal";}}}
if(!(type in _pixelNamesCache)){_pixelNamesCache[type]=_pixelRegExp.test(type);}
return _pixelNamesCache[type]?px(node,value):value;}
var _floatStyle=d.isIE?"styleFloat":"cssFloat",_floatAliases={"cssFloat":_floatStyle,"styleFloat":_floatStyle,"float":_floatStyle};dojo.style=function(node,style,value){var n=d.byId(node),args=arguments.length,op=(style=="opacity");style=_floatAliases[style]||style;if(args==3){return op?d._setOpacity(n,value):n.style[style]=value;}
if(args==2&&op){return d._getOpacity(n);}
var s=gcs(n);if(args==2&&!d.isString(style)){for(var x in style){d.style(node,x,style[x]);}
return s;}
return(args==1)?s:_toStyleValue(n,style,s[style]||n.style[style]);}
dojo._getPadExtents=function(n,computedStyle){var
s=computedStyle||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);return{l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};}
dojo._getBorderExtents=function(n,computedStyle){var
ne="none",s=computedStyle||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);return{l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};}
dojo._getPadBorderExtents=function(n,computedStyle){var
s=computedStyle||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);return{l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};}
dojo._getMarginExtents=function(n,computedStyle){var
s=computedStyle||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);if(d.isWebKit&&(s.position!="absolute")){r=l;}
return{l:l,t:t,w:l+r,h:t+b};}
dojo._getMarginBox=function(node,computedStyle){var s=computedStyle||gcs(node),me=d._getMarginExtents(node,s);var l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode;if(d.isMoz){var sl=parseFloat(s.left),st=parseFloat(s.top);if(!isNaN(sl)&&!isNaN(st)){l=sl,t=st;}else{if(p&&p.style){var pcs=gcs(p);if(pcs.overflow!="visible"){var be=d._getBorderExtents(p,pcs);l+=be.l,t+=be.t;}}}}else if(d.isOpera||(d.isIE>7&&!d.isQuirks)){if(p){be=d._getBorderExtents(p);l-=be.l;t-=be.t;}}
return{l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};}
dojo._getContentBox=function(node,computedStyle){var s=computedStyle||gcs(node),pe=d._getPadExtents(node,s),be=d._getBorderExtents(node,s),w=node.clientWidth,h;if(!w){w=node.offsetWidth,h=node.offsetHeight;}else{h=node.clientHeight,be.w=be.h=0;}
if(d.isOpera){pe.l+=be.l;pe.t+=be.t;};return{l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};}
dojo._getBorderBox=function(node,computedStyle){var s=computedStyle||gcs(node),pe=d._getPadExtents(node,s),cb=d._getContentBox(node,s);return{l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};}
dojo._setBox=function(node,l,t,w,h,u){u=u||"px";var s=node.style;if(!isNaN(l)){s.left=l+u;}
if(!isNaN(t)){s.top=t+u;}
if(w>=0){s.width=w+u;}
if(h>=0){s.height=h+u;}}
dojo._isButtonTag=function(node){return node.tagName=="BUTTON"||node.tagName=="INPUT"&&node.getAttribute("type").toUpperCase()=="BUTTON";}
dojo._usesBorderBox=function(node){var n=node.tagName;return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(node);}
dojo._setContentSize=function(node,widthPx,heightPx,computedStyle){if(d._usesBorderBox(node)){var pb=d._getPadBorderExtents(node,computedStyle);if(widthPx>=0){widthPx+=pb.w;}
if(heightPx>=0){heightPx+=pb.h;}}
d._setBox(node,NaN,NaN,widthPx,heightPx);}
dojo._setMarginBox=function(node,leftPx,topPx,widthPx,heightPx,computedStyle){var s=computedStyle||gcs(node),bb=d._usesBorderBox(node),pb=bb?_nilExtents:d._getPadBorderExtents(node,s);if(d.isWebKit){if(d._isButtonTag(node)){var ns=node.style;if(widthPx>=0&&!ns.width){ns.width="4px";}
if(heightPx>=0&&!ns.height){ns.height="4px";}}}
var mb=d._getMarginExtents(node,s);if(widthPx>=0){widthPx=Math.max(widthPx-pb.w-mb.w,0);}
if(heightPx>=0){heightPx=Math.max(heightPx-pb.h-mb.h,0);}
d._setBox(node,leftPx,topPx,widthPx,heightPx);}
var _nilExtents={l:0,t:0,w:0,h:0};dojo.marginBox=function(node,box){var n=d.byId(node),s=gcs(n),b=box;return!b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);}
dojo.contentBox=function(node,box){var n=d.byId(node),s=gcs(n),b=box;return!b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);}
var _sumAncestorProperties=function(node,prop){if(!(node=(node||0).parentNode)){return 0}
var val,retVal=0,_b=d.body();while(node&&node.style){if(gcs(node).position=="fixed"){return 0;}
val=node[prop];if(val){retVal+=val-0;if(node==_b){break;}}
node=node.parentNode;}
return retVal;}
dojo._docScroll=function(){var
_b=d.body(),_w=d.global,de=d.doc.documentElement;return{y:(_w.pageYOffset||de.scrollTop||_b.scrollTop||0),x:(_w.pageXOffset||d._fixIeBiDiScrollLeft(de.scrollLeft)||_b.scrollLeft||0)};};dojo._isBodyLtr=function(){return("_bodyLtr"in d)?d._bodyLtr:d._bodyLtr=gcs(d.body()).direction=="ltr";}
dojo._getIeDocumentElementOffset=function(){var de=d.doc.documentElement;if(d.isIE<7){return{x:d._isBodyLtr()||window.parent==window?de.clientLeft:de.offsetWidth-de.clientWidth-de.clientLeft,y:de.clientTop};}else if(d.isIE<8){return{x:de.getBoundingClientRect().left,y:de.getBoundingClientRect().top};}else{return{x:0,y:0};}};dojo._fixIeBiDiScrollLeft=function(scrollLeft){var dd=d.doc;if(d.isIE<8&&!d._isBodyLtr()){var de=dd.compatMode=="BackCompat"?dd.body:dd.documentElement;return scrollLeft+de.clientWidth-de.scrollWidth;}
return scrollLeft;}
dojo._abs=function(node,includeScroll){var db=d.body(),dh=d.body().parentNode,ret;if(node["getBoundingClientRect"]){var client=node.getBoundingClientRect();ret={x:client.left,y:client.top};if(d.isFF>=3){var cs=gcs(dh);ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);}
if(d.isIE){var offset=d._getIeDocumentElementOffset();ret.x-=offset.x+(d.isQuirks?db.clientLeft:0);ret.y-=offset.y+(d.isQuirks?db.clientTop:0);}}else{ret={x:0,y:0};if(node["offsetParent"]){ret.x-=_sumAncestorProperties(node,"scrollLeft");ret.y-=_sumAncestorProperties(node,"scrollTop");var curnode=node;do{var n=curnode.offsetLeft,t=curnode.offsetTop;ret.x+=isNaN(n)?0:n;ret.y+=isNaN(t)?0:t;cs=gcs(curnode);if(curnode!=node){if(d.isFF){ret.x+=2*px(curnode,cs.borderLeftWidth);ret.y+=2*px(curnode,cs.borderTopWidth);}else{ret.x+=px(curnode,cs.borderLeftWidth);ret.y+=px(curnode,cs.borderTopWidth);}}
if(d.isFF&&cs.position=="static"){var parent=curnode.parentNode;while(parent!=curnode.offsetParent){var pcs=gcs(parent);if(pcs.position=="static"){ret.x+=px(curnode,pcs.borderLeftWidth);ret.y+=px(curnode,pcs.borderTopWidth);}
parent=parent.parentNode;}}
curnode=curnode.offsetParent;}while((curnode!=dh)&&curnode);}else if(node.x&&node.y){ret.x+=isNaN(node.x)?0:node.x;ret.y+=isNaN(node.y)?0:node.y;}}
if(includeScroll){var scroll=d._docScroll();ret.x+=scroll.x;ret.y+=scroll.y;}
return ret;}
dojo.coords=function(node,includeScroll){var n=d.byId(node),s=gcs(n),mb=d._getMarginBox(n,s);var abs=d._abs(n,includeScroll);mb.x=abs.x;mb.y=abs.y;return mb;}
var ieLT8=d.isIE<8;var _fixAttrName=function(name){switch(name.toLowerCase()){case"tabindex":return ieLT8?"tabIndex":"tabindex";case"readonly":return"readOnly";case"class":return"className";case"for":case"htmlfor":return ieLT8?"htmlFor":"for";default:return name;}}
var _attrProps={colspan:"colSpan",enctype:"enctype",frameborder:"frameborder",method:"method",rowspan:"rowSpan",scrolling:"scrolling",shape:"shape",span:"span",type:"type",valuetype:"valueType",classname:"className",innerhtml:"innerHTML"}
dojo.hasAttr=function(node,name){node=d.byId(node);var fixName=_fixAttrName(name);fixName=fixName=="htmlFor"?"for":fixName;var attr=node.getAttributeNode&&node.getAttributeNode(fixName);return attr?attr.specified:false;}
var _evtHdlrMap={},_ctr=0,_attrId=dojo._scopeName+"attrid",_roInnerHtml={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};dojo.attr=function(node,name,value){node=d.byId(node);var args=arguments.length;if(args==2&&!d.isString(name)){for(var x in name){d.attr(node,x,name[x]);}
return;}
name=_fixAttrName(name);if(args==3){if(d.isFunction(value)){var attrId=d.attr(node,_attrId);if(!attrId){attrId=_ctr++;d.attr(node,_attrId,attrId);}
if(!_evtHdlrMap[attrId]){_evtHdlrMap[attrId]={};}
var h=_evtHdlrMap[attrId][name];if(h){d.disconnect(h);}else{try{delete node[name];}catch(e){}}
_evtHdlrMap[attrId][name]=d.connect(node,name,value);}else if(typeof value=="boolean"){node[name]=value;}else if(name==="style"&&!d.isString(value)){d.style(node,value);}else if(name=="className"){node.className=value;}else if(name==="innerHTML"){if(d.isIE&&node.tagName.toLowerCase()in _roInnerHtml){d.empty(node);node.appendChild(d._toDom(value,node.ownerDocument));}else{node[name]=value;}}else{node.setAttribute(name,value);}}else{var prop=_attrProps[name.toLowerCase()];if(prop){return node[prop];}
var attrValue=node[name];return(typeof attrValue=='boolean'||typeof attrValue=='function')?attrValue:(d.hasAttr(node,name)?node.getAttribute(name):null);}}
dojo.removeAttr=function(node,name){d.byId(node).removeAttribute(_fixAttrName(name));}
dojo.create=function(tag,attrs,refNode,pos){var doc=d.doc;if(refNode){refNode=d.byId(refNode);doc=refNode.ownerDocument;}
if(d.isString(tag)){tag=doc.createElement(tag);}
if(attrs){d.attr(tag,attrs);}
if(refNode){d.place(tag,refNode,pos);}
return tag;}
d.empty=d.isIE?function(node){node=d.byId(node);for(var c;c=node.lastChild;){d.destroy(c);}}:function(node){d.byId(node).innerHTML="";};var tagWrap={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},reTag=/<\s*([\w\:]+)/,masterNode={},masterNum=0,masterName="__"+d._scopeName+"ToDomId";for(var param in tagWrap){var tw=tagWrap[param];tw.pre=param=="option"?'<select multiple="multiple">':"<"+tw.join("><")+">";tw.post="</"+tw.reverse().join("></")+">";}
d._toDom=function(frag,doc){doc=doc||d.doc;var masterId=doc[masterName];if(!masterId){doc[masterName]=masterId=++masterNum+"";masterNode[masterId]=doc.createElement("div");}
frag+="";var match=frag.match(reTag),tag=match?match[1].toLowerCase():"",master=masterNode[masterId],wrap,i,fc,df;if(match&&tagWrap[tag]){wrap=tagWrap[tag];master.innerHTML=wrap.pre+frag+wrap.post;for(i=wrap.length;i;--i){master=master.firstChild;}}else{master.innerHTML=frag;}
if(master.childNodes.length==1){return master.removeChild(master.firstChild);}
df=doc.createDocumentFragment();while(fc=master.firstChild){df.appendChild(fc);}
return df;}
var _className="className";dojo.hasClass=function(node,classStr){return((" "+d.byId(node)[_className]+" ").indexOf(" "+classStr+" ")>=0);};dojo.addClass=function(node,classStr){node=d.byId(node);var cls=node[_className];if((" "+cls+" ").indexOf(" "+classStr+" ")<0){node[_className]=cls+(cls?' ':'')+classStr;}};dojo.removeClass=function(node,classStr){node=d.byId(node);var t=d.trim((" "+node[_className]+" ").replace(" "+classStr+" "," "));if(node[_className]!=t){node[_className]=t;}};dojo.toggleClass=function(node,classStr,condition){if(condition===undefined){condition=!d.hasClass(node,classStr);}
d[condition?"addClass":"removeClass"](node,classStr);};})();}
if(!dojo._hasResource["dojo._base.NodeList"]){dojo._hasResource["dojo._base.NodeList"]=true;dojo.provide("dojo._base.NodeList");(function(){var d=dojo;var ap=Array.prototype,aps=ap.slice,apc=ap.concat;var tnl=function(a){a.constructor=d.NodeList;dojo._mixin(a,d.NodeList.prototype);return a;};var loopBody=function(f,a,o){a=[0].concat(aps.call(a,0));o=o||d.global;return function(node){a[0]=node;return f.apply(o,a);};};var adaptAsForEach=function(f,o){return function(){this.forEach(loopBody(f,arguments,o));return this;};};var adaptAsMap=function(f,o){return function(){return this.map(loopBody(f,arguments,o));};};var adaptAsFilter=function(f,o){return function(){return this.filter(loopBody(f,arguments,o));};};var adaptWithCondition=function(f,g,o){return function(){var a=arguments,body=loopBody(f,a,o);if(g.call(o||d.global,a)){return this.map(body);}
this.forEach(body);return this;};};var magicGuard=function(a){return a.length==1&&d.isString(a[0])};var orphan=function(node){var p=node.parentNode;if(p){p.removeChild(node);}};dojo.NodeList=function(){return tnl(Array.apply(null,arguments));};var nl=d.NodeList,nlp=nl.prototype;nl._wrap=tnl;nl._adaptAsMap=adaptAsMap;nl._adaptAsForEach=adaptAsForEach;nl._adaptAsFilter=adaptAsFilter;nl._adaptWithCondition=adaptWithCondition;d.forEach(["slice","splice"],function(name){var f=ap[name];nlp[name]=function(){return tnl(f.apply(this,arguments));};});d.forEach(["indexOf","lastIndexOf","every","some"],function(name){var f=d[name];nlp[name]=function(){return f.apply(d,[this].concat(aps.call(arguments,0)));};});d.forEach(["attr","style"],function(name){nlp[name]=adaptWithCondition(d[name],magicGuard);});d.forEach(["connect","addClass","removeClass","toggleClass","empty"],function(name){nlp[name]=adaptAsForEach(d[name]);});dojo.extend(dojo.NodeList,{concat:function(item){var t=d.isArray(this)?this:aps.call(this,0),m=d.map(arguments,function(a){return a&&!d.isArray(a)&&(a.constructor===NodeList||a.constructor==nl)?aps.call(a,0):a;});return tnl(apc.apply(t,m));},map:function(func,obj){return tnl(d.map(this,func,obj));},forEach:function(callback,thisObj){d.forEach(this,callback,thisObj);return this;},coords:adaptAsMap(d.coords),place:function(queryOrNode,position){var item=d.query(queryOrNode)[0];return this.forEach(function(node){d.place(node,item,position);});},orphan:function(simpleFilter){return(simpleFilter?d._filterQueryResult(this,simpleFilter):this).forEach(orphan);},adopt:function(queryOrListOrNode,position){return d.query(queryOrListOrNode).place(item[0],position);},query:function(queryStr){if(!queryStr){return this;}
var ret=this.map(function(node){return d.query(queryStr,node).filter(function(subNode){return subNode!==undefined;});});return tnl(apc.apply([],ret));},filter:function(simpleFilter){var a=arguments,items=this,start=0;if(d.isString(simpleFilter)){items=d._filterQueryResult(this,a[0]);if(a.length==1){return items;}
start=1;}
return tnl(d.filter(items,a[start],a[start+1]));},addContent:function(content,position){var c=d.isString(content)?d._toDom(content,this[0]&&this[0].ownerDocument):content,i,l=this.length-1;for(i=0;i<l;++i){d.place(c.cloneNode(true),this[i],position);}
if(l>=0){d.place(c,this[l],position);}
return this;},instantiate:function(declaredClass,properties){var c=d.isFunction(declaredClass)?declaredClass:d.getObject(declaredClass);properties=properties||{};return this.forEach(function(node){new c(properties,node);});},at:function(){var t=new dojo.NodeList();d.forEach(arguments,function(i){if(this[i]){t.push(this[i]);}},this);return t;}});d.forEach(["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"],function(evt){var _oe="on"+evt;nlp[_oe]=function(a,b){return this.connect(_oe,a,b);}});})();}
if(!dojo._hasResource["dojo._base.query"]){dojo._hasResource["dojo._base.query"]=true;if(typeof dojo!="undefined"){dojo.provide("dojo._base.query");};(function(d){var trim=d.trim;var each=d.forEach;var qlc=d._queryListCtor=d.NodeList;var isString=d.isString;var getDoc=function(){return d.doc;};var cssCaseBug=(d.isWebKit&&((getDoc().compatMode)=="BackCompat"));var childNodesName=!!getDoc().firstChild["children"]?"children":"childNodes";var specials=">~+";var caseSensitive=false;var yesman=function(){return true;};var getQueryParts=function(query){if(specials.indexOf(query.slice(-1))>=0){query+=" * "}else{query+=" ";}
var ts=function(s,e){return trim(query.slice(s,e));}
var queryParts=[];var inBrackets=-1,inParens=-1,inMatchFor=-1,inPseudo=-1,inClass=-1,inId=-1,inTag=-1,lc="",cc="",pStart;var x=0,ql=query.length,currentPart=null,_cp=null;var endTag=function(){if(inTag>=0){var tv=(inTag==x)?null:ts(inTag,x);currentPart[(specials.indexOf(tv)<0)?"tag":"oper"]=tv;inTag=-1;}}
var endId=function(){if(inId>=0){currentPart.id=ts(inId,x).replace(/\\/g,"");inId=-1;}}
var endClass=function(){if(inClass>=0){currentPart.classes.push(ts(inClass+1,x).replace(/\\/g,""));inClass=-1;}}
var endAll=function(){endId();endTag();endClass();}
var endPart=function(){endAll();if(inPseudo>=0){currentPart.pseudos.push({name:ts(inPseudo+1,x)});}
currentPart.loops=(currentPart.pseudos.length||currentPart.attrs.length||currentPart.classes.length);currentPart.oquery=currentPart.query=ts(pStart,x);currentPart.otag=currentPart.tag=(currentPart["oper"])?null:(currentPart.tag||"*");if(currentPart.tag){currentPart.tag=currentPart.tag.toUpperCase();}
if(queryParts.length&&(queryParts[queryParts.length-1].oper)){currentPart.infixOper=queryParts.pop();currentPart.query=currentPart.infixOper.query+" "+currentPart.query;}
queryParts.push(currentPart);currentPart=null;}
for(;lc=cc,cc=query.charAt(x),x<ql;x++){if(lc=="\\"){continue;}
if(!currentPart){pStart=x;currentPart={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){return(caseSensitive)?this.otag:this.tag;}};inTag=x;}
if(inBrackets>=0){if(cc=="]"){if(!_cp.attr){_cp.attr=ts(inBrackets+1,x);}else{_cp.matchFor=ts((inMatchFor||inBrackets+1),x);}
var cmf=_cp.matchFor;if(cmf){if((cmf.charAt(0)=='"')||(cmf.charAt(0)=="'")){_cp.matchFor=cmf.slice(1,-1);}}
currentPart.attrs.push(_cp);_cp=null;inBrackets=inMatchFor=-1;}else if(cc=="="){var addToCc=("|~^$*".indexOf(lc)>=0)?lc:"";_cp.type=addToCc+cc;_cp.attr=ts(inBrackets+1,x-addToCc.length);inMatchFor=x+1;}}else if(inParens>=0){if(cc==")"){if(inPseudo>=0){_cp.value=ts(inParens+1,x);}
inPseudo=inParens=-1;}}else if(cc=="#"){endAll();inId=x+1;}else if(cc=="."){endAll();inClass=x;}else if(cc==":"){endAll();inPseudo=x;}else if(cc=="["){endAll();inBrackets=x;_cp={};}else if(cc=="("){if(inPseudo>=0){_cp={name:ts(inPseudo+1,x),value:null}
currentPart.pseudos.push(_cp);}
inParens=x;}else if((cc==" ")&&(lc!=cc)){endPart();}}
return queryParts;};var agree=function(first,second){if(!first){return second;}
if(!second){return first;}
return function(){return first.apply(window,arguments)&&second.apply(window,arguments);}};var getArr=function(i,arr){var r=arr||[];if(i){r.push(i);}
return r;};var _isElement=function(n){return(1==n.nodeType);};var blank="";var _getAttr=function(elem,attr){if(!elem){return blank;}
if(attr=="class"){return elem.className||blank;}
if(attr=="for"){return elem.htmlFor||blank;}
if(attr=="style"){return elem.style.cssText||blank;}
return(caseSensitive?elem.getAttribute(attr):elem.getAttribute(attr,2))||blank;};var attrs={"*=":function(attr,value){return function(elem){return(_getAttr(elem,attr).indexOf(value)>=0);}},"^=":function(attr,value){return function(elem){return(_getAttr(elem,attr).indexOf(value)==0);}},"$=":function(attr,value){var tval=" "+value;return function(elem){var ea=" "+_getAttr(elem,attr);return(ea.lastIndexOf(value)==(ea.length-value.length));}},"~=":function(attr,value){var tval=" "+value+" ";return function(elem){var ea=" "+_getAttr(elem,attr)+" ";return(ea.indexOf(tval)>=0);}},"|=":function(attr,value){var valueDash=" "+value+"-";return function(elem){var ea=" "+_getAttr(elem,attr);return((ea==value)||(ea.indexOf(valueDash)==0));}},"=":function(attr,value){return function(elem){return(_getAttr(elem,attr)==value);}}};var _noNES=(typeof getDoc().firstChild.nextElementSibling=="undefined");var _ns=!_noNES?"nextElementSibling":"nextSibling";var _ps=!_noNES?"previousElementSibling":"previousSibling";var _simpleNodeTest=(_noNES?_isElement:yesman);var _lookLeft=function(node){while(node=node[_ps]){if(_simpleNodeTest(node)){return false;}}
return true;};var _lookRight=function(node){while(node=node[_ns]){if(_simpleNodeTest(node)){return false;}}
return true;};var getNodeIndex=function(node){var root=node.parentNode;var i=0,tret=root[childNodesName],ci=(node["_i"]||-1),cl=(root["_l"]||-1);if(!tret){return-1;}
var l=tret.length;if(cl==l&&ci>=0&&cl>=0){return ci;}
root["_l"]=l;ci=-1;for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_ns]){if(_simpleNodeTest(te)){te["_i"]=++i;if(node===te){ci=i;}}}
return ci;};var isEven=function(elem){return!((getNodeIndex(elem))%2);};var isOdd=function(elem){return((getNodeIndex(elem))%2);};var pseudos={"checked":function(name,condition){return function(elem){return!!d.attr(elem,"checked");}},"first-child":function(){return _lookLeft;},"last-child":function(){return _lookRight;},"only-child":function(name,condition){return function(node){if(!_lookLeft(node)){return false;}
if(!_lookRight(node)){return false;}
return true;};},"empty":function(name,condition){return function(elem){var cn=elem.childNodes;var cnl=elem.childNodes.length;for(var x=cnl-1;x>=0;x--){var nt=cn[x].nodeType;if((nt===1)||(nt==3)){return false;}}
return true;}},"contains":function(name,condition){var cz=condition.charAt(0);if(cz=='"'||cz=="'"){condition=condition.slice(1,-1);}
return function(elem){return(elem.innerHTML.indexOf(condition)>=0);}},"not":function(name,condition){var p=getQueryParts(condition)[0];var ignores={el:1};if(p.tag!="*"){ignores.tag=1;}
if(!p.classes.length){ignores.classes=1;}
var ntf=getSimpleFilterFunc(p,ignores);return function(elem){return(!ntf(elem));}},"nth-child":function(name,condition){var pi=parseInt;if(condition=="odd"){return isOdd;}else if(condition=="even"){return isEven;}
if(condition.indexOf("n")!=-1){var tparts=condition.split("n",2);var pred=tparts[0]?((tparts[0]=='-')?-1:pi(tparts[0])):1;var idx=tparts[1]?pi(tparts[1]):0;var lb=0,ub=-1;if(pred>0){if(idx<0){idx=(idx%pred)&&(pred+(idx%pred));}else if(idx>0){if(idx>=pred){lb=idx-idx%pred;}
idx=idx%pred;}}else if(pred<0){pred*=-1;if(idx>0){ub=idx;idx=idx%pred;}}
if(pred>0){return function(elem){var i=getNodeIndex(elem);return(i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);}}else{condition=idx;}}
var ncount=pi(condition);return function(elem){return(getNodeIndex(elem)==ncount);}}};var defaultGetter=(d.isIE)?function(cond){var clc=cond.toLowerCase();if(clc=="class"){cond="className";}
return function(elem){return(caseSensitive?elem.getAttribute(cond):elem[cond]||elem[clc]);}}:function(cond){return function(elem){return(elem&&elem.getAttribute&&elem.hasAttribute(cond));}};var getSimpleFilterFunc=function(query,ignores){if(!query){return yesman;}
ignores=ignores||{};var ff=null;if(!("el"in ignores)){ff=agree(ff,_isElement);}
if(!("tag"in ignores)){if(query.tag!="*"){ff=agree(ff,function(elem){return(elem&&(elem.tagName==query.getTag()));});}}
if(!("classes"in ignores)){each(query.classes,function(cname,idx,arr){var re=new RegExp("(?:^|\\s)"+cname+"(?:\\s|$)");ff=agree(ff,function(elem){return re.test(elem.className);});ff.count=idx;});}
if(!("pseudos"in ignores)){each(query.pseudos,function(pseudo){var pn=pseudo.name;if(pseudos[pn]){ff=agree(ff,pseudos[pn](pn,pseudo.value));}});}
if(!("attrs"in ignores)){each(query.attrs,function(attr){var matcher;var a=attr.attr;if(attr.type&&attrs[attr.type]){matcher=attrs[attr.type](a,attr.matchFor);}else if(a.length){matcher=defaultGetter(a);}
if(matcher){ff=agree(ff,matcher);}});}
if(!("id"in ignores)){if(query.id){ff=agree(ff,function(elem){return(!!elem&&(elem.id==query.id));});}}
if(!ff){if(!("default"in ignores)){ff=yesman;}}
return ff;};var _nextSibling=function(filterFunc){return function(node,ret,bag){while(node=node[_ns]){if(_noNES&&(!_isElement(node))){continue;}
if((!bag||_isUnique(node,bag))&&filterFunc(node)){ret.push(node);}
break;}
return ret;}};var _nextSiblings=function(filterFunc){return function(root,ret,bag){var te=root[_ns];while(te){if(_simpleNodeTest(te)){if(bag&&!_isUnique(te,bag)){break;}
if(filterFunc(te)){ret.push(te);}}
te=te[_ns];}
return ret;}};var _childElements=function(filterFunc){filterFunc=filterFunc||yesman;return function(root,ret,bag){var te,x=0,tret=root[childNodesName];while(te=tret[x++]){if(_simpleNodeTest(te)&&(!bag||_isUnique(te,bag))&&(filterFunc(te,x))){ret.push(te);}}
return ret;};};var _isDescendant=function(node,root){var pn=node.parentNode;while(pn){if(pn==root){break;}
pn=pn.parentNode;}
return!!pn;};var _getElementsFuncCache={};var getElementsFunc=function(query){var retFunc=_getElementsFuncCache[query.query];if(retFunc){return retFunc;}
var io=query.infixOper;var oper=(io?io.oper:"");var filterFunc=getSimpleFilterFunc(query,{el:1});var qt=query.tag;var wildcardTag=("*"==qt);var ecs=getDoc()["getElementsByClassName"];if(!oper){if(query.id){filterFunc=(!query.loops&&wildcardTag)?yesman:getSimpleFilterFunc(query,{el:1,id:1});retFunc=function(root,arr){var te=d.byId(query.id,(root.ownerDocument||root));if(!te||!filterFunc(te)){return;}
if(9==root.nodeType){return getArr(te,arr);}else{if(_isDescendant(te,root)){return getArr(te,arr);}}}}else if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&query.classes.length&&!cssCaseBug){filterFunc=getSimpleFilterFunc(query,{el:1,classes:1,id:1});var classesString=query.classes.join(" ");retFunc=function(root,arr){var ret=getArr(0,arr),te,x=0;var tret=root.getElementsByClassName(classesString);while((te=tret[x++])){if(filterFunc(te,root)){ret.push(te);}}
return ret;};}else if(!wildcardTag&&!query.loops){retFunc=function(root,arr){var ret=getArr(0,arr),te,x=0;var tret=root.getElementsByTagName(query.getTag());while((te=tret[x++])){ret.push(te);}
return ret;};}else{filterFunc=getSimpleFilterFunc(query,{el:1,tag:1,id:1});retFunc=function(root,arr){var ret=getArr(0,arr),te,x=0;var tret=root.getElementsByTagName(query.getTag());while((te=tret[x++])){if(filterFunc(te,root)){ret.push(te);}}
return ret;};}}else{var skipFilters={el:1};if(wildcardTag){skipFilters.tag=1;}
filterFunc=getSimpleFilterFunc(query,skipFilters);if("+"==oper){retFunc=_nextSibling(filterFunc);}else if("~"==oper){retFunc=_nextSiblings(filterFunc);}else if(">"==oper){retFunc=_childElements(filterFunc);}}
return _getElementsFuncCache[query.query]=retFunc;};var filterDown=function(root,queryParts){var candidates=getArr(root),qp,x,te,qpl=queryParts.length,bag,ret;for(var i=0;i<qpl;i++){ret=[];qp=queryParts[i];x=candidates.length-1;if(x>0){bag={};ret.nozip=true;}
var gef=getElementsFunc(qp);while(te=candidates[x--]){gef(te,ret,bag);}
if(!ret.length){break;}
candidates=ret;}
return ret;};var _queryFuncCacheDOM={},_queryFuncCacheQSA={};var getStepQueryFunc=function(query){var qparts=getQueryParts(trim(query));if(qparts.length==1){var tef=getElementsFunc(qparts[0]);return function(root){var r=tef(root,new qlc());if(r){r.nozip=true;}
return r;}}
return function(root){return filterDown(root,qparts);}};var nua=navigator.userAgent;var wk="WebKit/";var is525=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));var noZip=d.isIE?"commentStrip":"nozip";var qsa="querySelectorAll";var qsaAvail=(!!getDoc()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||is525));var getQueryFunc=function(query,forceDOM){if(qsaAvail){var qsaCached=_queryFuncCacheQSA[query];if(qsaCached&&!forceDOM){return qsaCached;}}
var domCached=_queryFuncCacheDOM[query];if(domCached){return domCached;}
var qcz=query.charAt(0);var nospace=(-1==query.indexOf(" "));if((query.indexOf("#")>=0)&&(nospace)){forceDOM=true;}
var useQSA=(qsaAvail&&(!forceDOM)&&(specials.indexOf(qcz)==-1)&&(!d.isIE||(query.indexOf(":")==-1))&&(!(cssCaseBug&&(query.indexOf(".")>=0)))&&(query.indexOf(":contains")==-1)&&(query.indexOf("|=")==-1));if(useQSA){var tq=(specials.indexOf(query.charAt(query.length-1))>=0)?(query+" *"):query;return _queryFuncCacheQSA[query]=function(root){try{if(!((9==root.nodeType)||nospace)){throw"";}
var r=root[qsa](tq);r[noZip]=true;return r;}catch(e){return getQueryFunc(query,true)(root);}}}else{var parts=query.split(/\s*,\s*/);return _queryFuncCacheDOM[query]=((parts.length<2)?getStepQueryFunc(query):function(root){var pindex=0,ret=[],tp;while((tp=parts[pindex++])){ret=ret.concat(getStepQueryFunc(tp)(root));}
return ret;});}};var _zipIdx=0;var _nodeUID=d.isIE?function(node){if(caseSensitive){return(node.getAttribute("_uid")||node.setAttribute("_uid",++_zipIdx)||_zipIdx);}else{return node.uniqueID;}}:function(node){return(node._uid||(node._uid=++_zipIdx));};var _isUnique=function(node,bag){if(!bag){return 1;}
var id=_nodeUID(node);if(!bag[id]){return bag[id]=1;}
return 0;};var _zipIdxName="_zipIdx";var _zip=function(arr){if(arr&&arr.nozip){return(qlc._wrap)?qlc._wrap(arr):arr;}
var ret=new qlc();if(!arr||!arr.length){return ret;}
if(arr[0]){ret.push(arr[0]);}
if(arr.length<2){return ret;}
_zipIdx++;if(d.isIE&&caseSensitive){var szidx=_zipIdx+"";arr[0].setAttribute(_zipIdxName,szidx);for(var x=1,te;te=arr[x];x++){if(arr[x].getAttribute(_zipIdxName)!=szidx){ret.push(te);}
te.setAttribute(_zipIdxName,szidx);}}else if(d.isIE&&arr.commentStrip){try{for(var x=1,te;te=arr[x];x++){if(_isElement(te)){ret.push(te);}}}catch(e){}}else{if(arr[0]){arr[0][_zipIdxName]=_zipIdx;}
for(var x=1,te;te=arr[x];x++){if(arr[x][_zipIdxName]!=_zipIdx){ret.push(te);}
te[_zipIdxName]=_zipIdx;}}
return ret;};d.query=function(query,root){qlc=d._queryListCtor;if(!query){return new qlc();}
if(query.constructor==qlc){return query;}
if(!isString(query)){return new qlc(query);}
if(isString(root)){root=d.byId(root);if(!root){return new qlc();}}
root=root||getDoc();var od=root.ownerDocument||root.documentElement;caseSensitive=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&(root.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));var r=getQueryFunc(query)(root);if(r&&r.nozip&&!qlc._wrap){return r;}
return _zip(r);}
d.query.pseudos=pseudos;d._filterQueryResult=function(nodeList,simpleFilter){var tmpNodeList=new d._queryListCtor();var filterFunc=getSimpleFilterFunc(getQueryParts(simpleFilter)[0]);for(var x=0,te;te=nodeList[x];x++){if(filterFunc(te)){tmpNodeList.push(te);}}
return tmpNodeList;}})(this["queryPortability"]||this["acme"]||dojo);}
if(!dojo._hasResource["dojo._base.xhr"]){dojo._hasResource["dojo._base.xhr"]=true;dojo.provide("dojo._base.xhr");(function(){var _d=dojo;function setValue(obj,name,value){var val=obj[name];if(_d.isString(val)){obj[name]=[val,value];}else if(_d.isArray(val)){val.push(value);}else{obj[name]=value;}}
dojo.formToObject=function(formNode){var ret={};var exclude="file|submit|image|reset|button|";_d.forEach(dojo.byId(formNode).elements,function(item){var _in=item.name;var type=(item.type||"").toLowerCase();if(_in&&type&&exclude.indexOf(type)==-1&&!item.disabled){if(type=="radio"||type=="checkbox"){if(item.checked){setValue(ret,_in,item.value);}}else if(item.multiple){ret[_in]=[];_d.query("option",item).forEach(function(opt){if(opt.selected){setValue(ret,_in,opt.value);}});}else{setValue(ret,_in,item.value);if(type=="image"){ret[_in+".x"]=ret[_in+".y"]=ret[_in].x=ret[_in].y=0;}}}});return ret;}
dojo.objectToQuery=function(map){var enc=encodeURIComponent;var pairs=[];var backstop={};for(var name in map){var value=map[name];if(value!=backstop[name]){var assign=enc(name)+"=";if(_d.isArray(value)){for(var i=0;i<value.length;i++){pairs.push(assign+enc(value[i]));}}else{pairs.push(assign+enc(value));}}}
return pairs.join("&");}
dojo.formToQuery=function(formNode){return _d.objectToQuery(_d.formToObject(formNode));}
dojo.formToJson=function(formNode,prettyPrint){return _d.toJson(_d.formToObject(formNode),prettyPrint);}
dojo.queryToObject=function(str){var ret={};var qp=str.split("&");var dec=decodeURIComponent;_d.forEach(qp,function(item){if(item.length){var parts=item.split("=");var name=dec(parts.shift());var val=dec(parts.join("="));if(_d.isString(ret[name])){ret[name]=[ret[name]];}
if(_d.isArray(ret[name])){ret[name].push(val);}else{ret[name]=val;}}});return ret;}
dojo._blockAsync=false;dojo._contentHandlers={text:function(xhr){return xhr.responseText;},json:function(xhr){return _d.fromJson(xhr.responseText||null);},"json-comment-filtered":function(xhr){if(!dojo.config.useCommentedJson){console.warn("Consider using the standard mimetype:application/json."
+" json-commenting can introduce security issues. To"
+" decrease the chances of hijacking, use the standard the 'json' handler and"
+" prefix your json with: {}&&\n"
+"Use djConfig.useCommentedJson=true to turn off this message.");}
var value=xhr.responseText;var cStartIdx=value.indexOf("\/*");var cEndIdx=value.lastIndexOf("*\/");if(cStartIdx==-1||cEndIdx==-1){throw new Error("JSON was not comment filtered");}
return _d.fromJson(value.substring(cStartIdx+2,cEndIdx));},javascript:function(xhr){return _d.eval(xhr.responseText);},xml:function(xhr){var result=xhr.responseXML;if(_d.isIE&&(!result||!result.documentElement)){var ms=function(n){return"MSXML"+n+".DOMDocument";}
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];_d.some(dp,function(p){try{var dom=new ActiveXObject(p);dom.async=false;dom.loadXML(xhr.responseText);result=dom;}catch(e){return false;}
return true;});}
return result;}};dojo._contentHandlers["json-comment-optional"]=function(xhr){var handlers=_d._contentHandlers;if(xhr.responseText&&xhr.responseText.indexOf("\/*")!=-1){return handlers["json-comment-filtered"](xhr);}else{return handlers["json"](xhr);}};dojo._ioSetArgs=function(args,canceller,okHandler,errHandler){var ioArgs={args:args,url:args.url};var formObject=null;if(args.form){var form=_d.byId(args.form);var actnNode=form.getAttributeNode("action");ioArgs.url=ioArgs.url||(actnNode?actnNode.value:null);formObject=_d.formToObject(form);}
var miArgs=[{}];if(formObject){miArgs.push(formObject);}
if(args.content){miArgs.push(args.content);}
if(args.preventCache){miArgs.push({"dojo.preventCache":new Date().valueOf()});}
ioArgs.query=_d.objectToQuery(_d.mixin.apply(null,miArgs));ioArgs.handleAs=args.handleAs||"text";var d=new _d.Deferred(canceller);d.addCallbacks(okHandler,function(error){return errHandler(error,d);});var ld=args.load;if(ld&&_d.isFunction(ld)){d.addCallback(function(value){return ld.call(args,value,ioArgs);});}
var err=args.error;if(err&&_d.isFunction(err)){d.addErrback(function(value){return err.call(args,value,ioArgs);});}
var handle=args.handle;if(handle&&_d.isFunction(handle)){d.addBoth(function(value){return handle.call(args,value,ioArgs);});}
d.ioArgs=ioArgs;return d;}
var _deferredCancel=function(dfd){dfd.canceled=true;var xhr=dfd.ioArgs.xhr;var _at=typeof xhr.abort;if(_at=="function"||_at=="object"||_at=="unknown"){xhr.abort();}
var err=dfd.ioArgs.error;if(!err){err=new Error("xhr cancelled");err.dojoType="cancel";}
return err;}
var _deferredOk=function(dfd){var ret=_d._contentHandlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);return ret===undefined?null:ret;}
var _deferError=function(error,dfd){console.error(error);return error;}
var _inFlightIntvl=null;var _inFlight=[];var _watchInFlight=function(){var now=(new Date()).getTime();if(!_d._blockAsync){for(var i=0,tif;i<_inFlight.length&&(tif=_inFlight[i]);i++){var dfd=tif.dfd;var func=function(){if(!dfd||dfd.canceled||!tif.validCheck(dfd)){_inFlight.splice(i--,1);}else if(tif.ioCheck(dfd)){_inFlight.splice(i--,1);tif.resHandle(dfd);}else if(dfd.startTime){if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){_inFlight.splice(i--,1);var err=new Error("timeout exceeded");err.dojoType="timeout";dfd.errback(err);dfd.cancel();}}};if(dojo.config.debugAtAllCosts){func.call(this);}else{try{func.call(this);}catch(e){dfd.errback(e);}}}}
if(!_inFlight.length){clearInterval(_inFlightIntvl);_inFlightIntvl=null;return;}}
dojo._ioCancelAll=function(){try{_d.forEach(_inFlight,function(i){try{i.dfd.cancel();}catch(e){}});}catch(e){}}
if(_d.isIE){_d.addOnWindowUnload(_d._ioCancelAll);}
_d._ioWatch=function(dfd,validCheck,ioCheck,resHandle){var args=dfd.ioArgs.args;if(args.timeout){dfd.startTime=(new Date()).getTime();}
_inFlight.push({dfd:dfd,validCheck:validCheck,ioCheck:ioCheck,resHandle:resHandle});if(!_inFlightIntvl){_inFlightIntvl=setInterval(_watchInFlight,50);}
if(args.sync){_watchInFlight();}}
var _defaultContentType="application/x-www-form-urlencoded";var _validCheck=function(dfd){return dfd.ioArgs.xhr.readyState;}
var _ioCheck=function(dfd){return 4==dfd.ioArgs.xhr.readyState;}
var _resHandle=function(dfd){var xhr=dfd.ioArgs.xhr;if(_d._isDocumentOk(xhr)){dfd.callback(dfd);}else{var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);err.status=xhr.status;err.responseText=xhr.responseText;dfd.errback(err);}}
dojo._ioAddQueryToUrl=function(ioArgs){if(ioArgs.query.length){ioArgs.url+=(ioArgs.url.indexOf("?")==-1?"?":"&")+ioArgs.query;ioArgs.query=null;}}
dojo.xhr=function(method,args,hasBody){var dfd=_d._ioSetArgs(args,_deferredCancel,_deferredOk,_deferError);dfd.ioArgs.xhr=_d._xhrObj(dfd.ioArgs.args);if(hasBody){if("postData"in args){dfd.ioArgs.query=args.postData;}else if("putData"in args){dfd.ioArgs.query=args.putData;}}else{_d._ioAddQueryToUrl(dfd.ioArgs);}
var ioArgs=dfd.ioArgs;var xhr=ioArgs.xhr;xhr.open(method,ioArgs.url,args.sync!==true,args.user||undefined,args.password||undefined);if(args.headers){for(var hdr in args.headers){if(hdr.toLowerCase()==="content-type"&&!args.contentType){args.contentType=args.headers[hdr];}else{xhr.setRequestHeader(hdr,args.headers[hdr]);}}}
xhr.setRequestHeader("Content-Type",args.contentType||_defaultContentType);if(!args.headers||!args.headers["X-Requested-With"]){xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");}
if(dojo.config.debugAtAllCosts){xhr.send(ioArgs.query);}else{try{xhr.send(ioArgs.query);}catch(e){dfd.ioArgs.error=e;dfd.cancel();}}
_d._ioWatch(dfd,_validCheck,_ioCheck,_resHandle);xhr=null;return dfd;}
dojo.xhrGet=function(args){return _d.xhr("GET",args);}
dojo.rawXhrPost=dojo.xhrPost=function(args){return _d.xhr("POST",args,true);}
dojo.rawXhrPut=dojo.xhrPut=function(args){return _d.xhr("PUT",args,true);}
dojo.xhrDelete=function(args){return _d.xhr("DELETE",args);}})();}
if(!dojo._hasResource["dojo._base.fx"]){dojo._hasResource["dojo._base.fx"]=true;dojo.provide("dojo._base.fx");(function(){var d=dojo;var _mixin=d.mixin;dojo._Line=function(start,end){this.start=start;this.end=end;}
dojo._Line.prototype.getValue=function(n){return((this.end-this.start)*n)+this.start;}
d.declare("dojo._Animation",null,{constructor:function(args){_mixin(this,args);if(d.isArray(this.curve)){this.curve=new d._Line(this.curve[0],this.curve[1]);}},duration:350,repeat:0,rate:10,_percent:0,_startRepeatCount:0,_fire:function(evt,args){if(this[evt]){if(dojo.config.debugAtAllCosts){this[evt].apply(this,args||[]);}else{try{this[evt].apply(this,args||[]);}catch(e){console.error("exception in animation handler for:",evt);console.error(e);}}}
return this;},play:function(delay,gotoStart){var _t=this;if(_t._delayTimer){_t._clearTimer();}
if(gotoStart){_t._stopTimer();_t._active=_t._paused=false;_t._percent=0;}else if(_t._active&&!_t._paused){return _t;}
_t._fire("beforeBegin");var de=delay||_t.delay,_p=dojo.hitch(_t,"_play",gotoStart);if(de>0){_t._delayTimer=setTimeout(_p,de);return _t;}
_p();return _t;},_play:function(gotoStart){var _t=this;if(_t._delayTimer){_t._clearTimer();}
_t._startTime=new Date().valueOf();if(_t._paused){_t._startTime-=_t.duration*_t._percent;}
_t._endTime=_t._startTime+_t.duration;_t._active=true;_t._paused=false;var value=_t.curve.getValue(_t._percent);if(!_t._percent){if(!_t._startRepeatCount){_t._startRepeatCount=_t.repeat;}
_t._fire("onBegin",[value]);}
_t._fire("onPlay",[value]);_t._cycle();return _t;},pause:function(){var _t=this;if(_t._delayTimer){_t._clearTimer();}
_t._stopTimer();if(!_t._active){return _t;}
_t._paused=true;_t._fire("onPause",[_t.curve.getValue(_t._percent)]);return _t;},gotoPercent:function(percent,andPlay){var _t=this;_t._stopTimer();_t._active=_t._paused=true;_t._percent=percent;if(andPlay){_t.play();}
return _t;},stop:function(gotoEnd){var _t=this;if(_t._delayTimer){_t._clearTimer();}
if(!_t._timer){return _t;}
_t._stopTimer();if(gotoEnd){_t._percent=1;}
_t._fire("onStop",[_t.curve.getValue(_t._percent)]);_t._active=_t._paused=false;return _t;},status:function(){if(this._active){return this._paused?"paused":"playing";}
return"stopped";},_cycle:function(){var _t=this;if(_t._active){var curr=new Date().valueOf();var step=(curr-_t._startTime)/(_t._endTime-_t._startTime);if(step>=1){step=1;}
_t._percent=step;if(_t.easing){step=_t.easing(step);}
_t._fire("onAnimate",[_t.curve.getValue(step)]);if(_t._percent<1){_t._startTimer();}else{_t._active=false;if(_t.repeat>0){_t.repeat--;_t.play(null,true);}else if(_t.repeat==-1){_t.play(null,true);}else{if(_t._startRepeatCount){_t.repeat=_t._startRepeatCount;_t._startRepeatCount=0;}}
_t._percent=0;_t._fire("onEnd");_t._stopTimer();}}
return _t;},_clearTimer:function(){clearTimeout(this._delayTimer);delete this._delayTimer;}});var ctr=0,_globalTimerList=[],timer=null,runner={run:function(){}};dojo._Animation.prototype._startTimer=function(){if(!this._timer){this._timer=d.connect(runner,"run",this,"_cycle");ctr++;}
if(!timer){timer=setInterval(d.hitch(runner,"run"),this.rate);}};dojo._Animation.prototype._stopTimer=function(){if(this._timer){d.disconnect(this._timer);this._timer=null;ctr--;}
if(ctr<=0){clearInterval(timer);timer=null;ctr=0;}};var _makeFadeable=d.isIE?function(node){var ns=node.style;if(!ns.width.length&&d.style(node,"width")=="auto"){ns.width="auto";}}:function(){};dojo._fade=function(args){args.node=d.byId(args.node);var fArgs=_mixin({properties:{}},args),props=(fArgs.properties.opacity={});props.start=!("start"in fArgs)?function(){return+d.style(fArgs.node,"opacity")||0;}:fArgs.start;props.end=fArgs.end;var anim=d.animateProperty(fArgs);d.connect(anim,"beforeBegin",d.partial(_makeFadeable,fArgs.node));return anim;}
dojo.fadeIn=function(args){return d._fade(_mixin({end:1},args));}
dojo.fadeOut=function(args){return d._fade(_mixin({end:0},args));}
dojo._defaultEasing=function(n){return 0.5+((Math.sin((n+1.5)*Math.PI))/2);}
var PropLine=function(properties){this._properties=properties;for(var p in properties){var prop=properties[p];if(prop.start instanceof d.Color){prop.tempColor=new d.Color();}}}
PropLine.prototype.getValue=function(r){var ret={};for(var p in this._properties){var prop=this._properties[p],start=prop.start;if(start instanceof d.Color){ret[p]=d.blendColors(start,prop.end,r,prop.tempColor).toCss();}else if(!d.isArray(start)){ret[p]=((prop.end-start)*r)+start+(p!="opacity"?prop.units||"px":0);}}
return ret;}
dojo.animateProperty=function(args){args.node=d.byId(args.node);if(!args.easing){args.easing=d._defaultEasing;}
var anim=new d._Animation(args);d.connect(anim,"beforeBegin",anim,function(){var pm={};for(var p in this.properties){if(p=="width"||p=="height"){this.node.display="block";}
var prop=this.properties[p];prop=pm[p]=_mixin({},(d.isObject(prop)?prop:{end:prop}));if(d.isFunction(prop.start)){prop.start=prop.start();}
if(d.isFunction(prop.end)){prop.end=prop.end();}
var isColor=(p.toLowerCase().indexOf("color")>=0);function getStyle(node,p){var v={height:node.offsetHeight,width:node.offsetWidth}[p];if(v!==undefined){return v;}
v=d.style(node,p);return(p=="opacity")?+v:(isColor?v:parseFloat(v));}
if(!("end"in prop)){prop.end=getStyle(this.node,p);}else if(!("start"in prop)){prop.start=getStyle(this.node,p);}
if(isColor){prop.start=new d.Color(prop.start);prop.end=new d.Color(prop.end);}else{prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);}}
this.curve=new PropLine(pm);});d.connect(anim,"onAnimate",d.hitch(d,"style",anim.node));return anim;}
dojo.anim=function(node,properties,duration,easing,onEnd,delay){return d.animateProperty({node:node,duration:duration||d._Animation.prototype.duration,properties:properties,easing:easing,onEnd:onEnd}).play(delay||0);}})();}
if(!dojo._hasResource["dojo._base.browser"]){dojo._hasResource["dojo._base.browser"]=true;dojo.provide("dojo._base.browser");dojo.forEach(dojo.config.require,function(i){dojo["require"](i);});}
if(dojo.config.afterOnLoad&&dojo.isBrowser){window.setTimeout(dojo._loadInit,1000);}})();if(!dojo._hasResource["dojo.io.iframe"]){dojo._hasResource["dojo.io.iframe"]=true;dojo.provide("dojo.io.iframe");dojo.io.iframe={create:function(_1,_2,_3){if(window[_1]){return window[_1];}
if(window.frames[_1]){return window.frames[_1];}
var _4=null;var _5=_3;if(!_5){if(dojo.config["useXDomain"]&&!dojo.config["dojoBlankHtmlUrl"]){console.warn("dojo.io.iframe.create: When using cross-domain Dojo builds,"+" please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl"+" to the path on your domain to blank.html");}
_5=(dojo.config["dojoBlankHtmlUrl"]||dojo.moduleUrl("dojo","resources/blank.html"));}
var _6=dojo.isIE?"<iframe name=\""+_1+"\" src=\""+_5+"\" onload=\""+_2+"\">":"iframe";_4=dojo.doc.createElement(_6);with(_4){name=_1;setAttribute("name",_1);id=_1;}
dojo.body().appendChild(_4);window[_1]=_4;with(_4.style){if(!(dojo.isSafari<3)){position="absolute";}
left=top="1px";height=width="1px";visibility="hidden";}
if(!dojo.isIE){this.setSrc(_4,_5,true);_4.onload=new Function(_2);}
return _4;},setSrc:function(_7,_8,_9){try{if(!_9){if(dojo.isWebKit){_7.location=_8;}else{frames[_7.name].location=_8;}}else{var _a;if(dojo.isIE||dojo.isWebKit>521){_a=_7.contentWindow.document;}else{if(dojo.isSafari){_a=_7.document;}else{_a=_7.contentWindow;}}
if(!_a){_7.location=_8;return;}else{_a.location.replace(_8);}}}
catch(e){}},doc:function(_b){var _c=_b.contentDocument||(((_b.name)&&(_b.document)&&(document.getElementsByTagName("iframe")[_b.name].contentWindow)&&(document.getElementsByTagName("iframe")[_b.name].contentWindow.document)))||((_b.name)&&(document.frames[_b.name])&&(document.frames[_b.name].document))||null;return _c;},send:function(_d){if(!this["_frame"]){this._frame=this.create(this._iframeName,dojo._scopeName+".io.iframe._iframeOnload();");}
var _e=dojo._ioSetArgs(_d,function(_f){_f.canceled=true;_f.ioArgs._callNext();},function(dfd){var _11=null;try{var _12=dfd.ioArgs;var dii=dojo.io.iframe;var ifd=dii.doc(dii._frame);var _15=_12.handleAs;_11=ifd;if(_15!="html"){if(_15=="xml"){if(dojo.isIE){dojo.query("a",dii._frame.contentWindow.document.documentElement).orphan();var _16=(dii._frame.contentWindow.document).documentElement.innerText;_16=_16.replace(/>\s+</g,"><");_16=dojo.trim(_16);var _17={responseText:_16};_11=dojo._contentHandlers["xml"](_17);}}else{_11=ifd.getElementsByTagName("textarea")[0].value;if(_15=="json"){_11=dojo.fromJson(_11);}else{if(_15=="javascript"){_11=dojo.eval(_11);}}}}}
catch(e){_11=e;}
finally{_12._callNext();}
return _11;},function(_18,dfd){dfd.ioArgs._hasError=true;dfd.ioArgs._callNext();return _18;});_e.ioArgs._callNext=function(){if(!this["_calledNext"]){this._calledNext=true;dojo.io.iframe._currentDfd=null;dojo.io.iframe._fireNextRequest();}};this._dfdQueue.push(_e);this._fireNextRequest();dojo._ioWatch(_e,function(dfd){return!dfd.ioArgs["_hasError"];},function(dfd){return(!!dfd.ioArgs["_finished"]);},function(dfd){if(dfd.ioArgs._finished){dfd.callback(dfd);}else{dfd.errback(new Error("Invalid dojo.io.iframe request state"));}});return _e;},_currentDfd:null,_dfdQueue:[],_iframeName:dojo._scopeName+"IoIframe",_fireNextRequest:function(){try{if((this._currentDfd)||(this._dfdQueue.length==0)){return;}
var dfd=this._currentDfd=this._dfdQueue.shift();var _1e=dfd.ioArgs;var _1f=_1e.args;_1e._contentToClean=[];var fn=dojo.byId(_1f["form"]);var _21=_1f["content"]||{};if(fn){if(_21){var _22=function(_23,_24){var tn;if(dojo.isIE){tn=dojo.doc.createElement("<input type='hidden' name='"+_23+"'>");}else{tn=dojo.doc.createElement("input");tn.type="hidden";tn.name=_23;}
tn.value=_24;fn.appendChild(tn);_1e._contentToClean.push(_23);};for(var x in _21){var val=_21[x];if(dojo.isArray(val)&&val.length>1){var i;for(i=0;i<val.length;i++){_22(x,val[i]);}}else{if(!fn[x]){_22(x,val);}else{fn[x].value=val;}}}}
var _29=fn.getAttributeNode("action");var _2a=fn.getAttributeNode("method");var _2b=fn.getAttributeNode("target");if(_1f["url"]){_1e._originalAction=_29?_29.value:null;if(_29){_29.value=_1f.url;}else{fn.setAttribute("action",_1f.url);}}
if(!_2a||!_2a.value){if(_2a){_2a.value=(_1f["method"])?_1f["method"]:"post";}else{fn.setAttribute("method",(_1f["method"])?_1f["method"]:"post");}}
_1e._originalTarget=_2b?_2b.value:null;if(_2b){_2b.value=this._iframeName;}else{fn.setAttribute("target",this._iframeName);}
fn.target=this._iframeName;fn.submit();}else{var _2c=_1f.url+(_1f.url.indexOf("?")>-1?"&":"?")+_1e.query;this.setSrc(this._frame,_2c,true);}}
catch(e){dfd.errback(e);}},_iframeOnload:function(){var dfd=this._currentDfd;if(!dfd){this._fireNextRequest();return;}
var _2e=dfd.ioArgs;var _2f=_2e.args;var _30=dojo.byId(_2f.form);if(_30){var _31=_2e._contentToClean;for(var i=0;i<_31.length;i++){var key=_31[i];if(dojo.isSafari<3){for(var j=0;j<_30.childNodes.length;j++){var _35=_30.childNodes[j];if(_35.name==key){dojo.destroy(_35);break;}}}else{dojo.destroy(_30[key]);_30[key]=null;}}
if(_2e["_originalAction"]){_30.setAttribute("action",_2e._originalAction);}
if(_2e["_originalTarget"]){_30.setAttribute("target",_2e._originalTarget);_30.target=_2e._originalTarget;}}
_2e._finished=true;}};};function getSfUrl(module,action){var host=window.location.host;var pathname=window.location.pathname;var controller='/';var url='http://';var parts=pathname.split('/');var isphp=parts[1].indexOf('.php');if(parts.length>0&&isphp!=-1){controller='/'+parts[1]+'/';}else{controller='/';}
var sfurl=url+host+controller+module+'/'+action;return sfurl;}
function getImgTag(imgfile){var sfurl='http://'+window.location.host+'/images/'+imgfile;var sftag='<img src="'+sfurl+'" />';return sftag;}
function linkTo(text,link,classy){return'<a href="'+link+'" '+classy+'>'+text+'</a>';}
function $RF(el,radioGroup){if($(el).type=='radio'){var el=$(el).form;var radioGroup=$(el).name;}else if($(el).tagName.toLowerCase()!='form'){return false;}
return $F($(el).getInputs('radio',radioGroup).find(function(re){return re.checked;}));}
function textCounter(field,countfield,maxlimit){if(field.value.length>maxlimit){field.value=field.value.substring(0,maxlimit);}else{countfield.innerHTML=''+(maxlimit-field.value.length)+' ';}}
UbrUserMsg=function(noderef){this.offTop=0;this.offLeft=0;this.interval;this.ref=noderef;this.ticks=0;this.area=dojo.html.getViewport();this.centerx=this.area.width/2;this.centery=this.area.height/2;this.set=function(m)
{this.msg=m;this.ref.innerHTML=m;}
this.popup=function()
{var box=dojo.html.getBorderBox(this.ref);dojo.html.placeOnScreen(this.ref,this.centerx-(box.width/2)+this.offLeft,this.centery-(box.height/2)+this.offTop,0,true,'TL');dojo.html.setStyle(this.ref,'display','block');}
this.rePos=function()
{var box=dojo.html.getBorderBox(this.ref);dojo.html.placeOnScreen(this.ref,this.centerx-(box.width/2)+this.offLeft,this.centery-(box.height/2)+this.offTop,0,true,'TL');}
this.clear=function()
{clearInterval(this.interval);this.ref.innerHTML='';dojo.html.setStyle(this.ref,'display','none');}
this.append=function(txt)
{this.ref.innerHTML+=txt;this.rePos();}
this.update=function(msg)
{this.ref.innerHTML=msg;this.ticks=0;var box=dojo.html.getBorderBox(this.ref);dojo.html.placeOnScreen(this.ref,this.centerx-(box.width/2)+this.offLeft,this.centery-(box.height/2)+this.offTop,0,true,'TL');}
this.animateProgress=function()
{this.ref.innerHTML+="<br/>";this.interval=setInterval(ubr.ellipsIt,300);}
this.freeze=function()
{clearInterval(this.interval);}
this.ellipsIt=function()
{if(this.ref){var times=this.ticks;var msg=this.ref.innerHTML;if(times<10){msg+='.';}else{this.ticks=0;msg=msg.substr(0,msg.length-times);}
this.ticks++;this.ref.innerHTML=msg;}}
this.prompttokill=function()
{clearInterval(this.interval);this.append('<a href="#" id="UbrUserMsgKillbox">[x]</a>');var selfy=this;dojo.event.connect(dojo.byId("UbrUserMsgKillbox"),'onclick',function(evt){clearInterval(selfy.interval);dojo.html.setStyle(selfy.ref,'display','none');selfy.set('');delete(selfy);});}
this.kill=function()
{clearInterval(this.interval);dojo.html.setStyle(this.ref,'display','none');this.set('');}}
ubr={init:function(){ubr.bootstrap.init();},setDebugging:function(debug,level){ubr.debugging=debug;window.Debug={level:0,debug:false,log:function(){},start:function(){}};window.ChatDebug=window.Debug;if(debug){window.Debug={level:level,debug:debug,log:function(msg){console.log(msg);},start:function(){}};}},setCatalogURI:function(uri){ubr.globalCatalogURI=uri;},setFeedProxyURI:function(uri){ubr.feedProxyURI=uri;},setBookBaseURI:function(uri){ubr.bookBaseURI=uri;},setUser:function(uobj){ubr.userModel.setUser(uobj);},getUser:function(){return ubr.userModel.getUser();},clearUser:function(){ubr.userModel.clearUser();},setPanelStates:function(pobj){ubr.stateModel.setPanelStates(pobj);},setCustomSizeProfile:function(name,pobj){ubr.stateModel.setCustomSizeProfile(name,pobj);},getConfig:function(cb){ubr.restCtl.getConfig(cb);},deActivatePlugins:function(){ubr.pluginCtl.deActivatePlugins();},getPluginByName:function(name){return ubr.pluginCtl.getPluginByName(name);},registerPlugin:function(P){return ubr.pluginCtl.registerPlugin(P);},activatePlugins:function(){ubr.pluginCtl.activatePlugins();},makeItFit:function(){ubr.uiView.makeItFit();},initUI:function(){ubr.uiView.initUI();},setUserBoxHTML:function()
{ubr.uiView.setUserBoxHTML();},toggleCat:function()
{ubr.uiView.toggleCat();},buildGroupSelect:function()
{ubr.uiView.buildGroupSelect();},toggleLinearMode:function(){ubr.linearMode=!ubr.linearMode;if(!ubr.linearMode){ubr.cacheLinears();}else{ubr.restoreLinears();}},extendFeednav:function()
{ubr.uiView.extendFeednav();},retractFeednav:function()
{ubr.uiView.retractFeednav();},createFeedNav:function()
{ubr.uiView.createFeedNav();},loadEpub:function(url)
{ubr.feedCtl.loadEpub(url);},nextFeed:function(url)
{ubr.feedCtl.nextFeed(url);},atomxml2obj:function(xml)
{return ubr.feedModel.atomxml2obj(xml);},atomToHTML:function(data)
{return ubr.feedView.atomToHtml(data);},fetchAtom:function(url)
{ubr.feedCtl.fetchAtom(url);},backAtom:function()
{ubr.feedCtl.backAtom();},suspendUI:function()
{ubr.uiView.suspendUI();},authUser:function()
{ubr.authCtl.authUser();},sendLogin:function(user,pass,cb)
{ubr.authCtl.sendLogin(user,pass,cb);},sendLogout:function(cb)
{ubr.authCtl.sendLogout(cb);},createAccount:function(name,user,news,pass,passbis,cb)
{ubr.authCtl.createAccount(name,user,news,pass,passbis,cb);},xdauth:function(form,content,cb)
{ubr.authCtl.xdauth(form,content,cb);},getWidget:function()
{ubr.uiView.getWidget();},loadWidgetCode:function(size)
{ubr.uiView.loadWidgetCode(size);},readyUI:function()
{ubr.uiView.readyUI();},webSearch:function(q,handleWith)
{dojo.xhrGet({url:getSfUrl('reader','feedbooksSearch'),content:{q:q},encoding:'utf-8',load:handleWith});},handleSearchKey:function()
{},autoScale:function(){ubr.uiView.autoScale();},scaleLayout:function(type)
{ubr.uiView.scaleLayout(type);},placeOnScreen:function(obj,x,y)
{ubr.uiView.placeOnScreen(obj,x,y);},progFollow:function(evt)
{ubr.progMeterView.progFollow(evt);},progPageNumFlash:function()
{var num=(arguments.length>0)?arguments[0]:ubr.pagePointer;var fadein=(arguments.length>0)?arguments[1]:true;var fadeout=(arguments.length>1)?arguments[2]:true;ubr.progMeterView.progPageNumFlash(num,fadein,fadeout);},progStop:function(evt)
{ubr.progMeterView.progStop();},progUpdateFromMouse:function(evt)
{ubr.progMeterView.progUpdateFromMouse(evt);},progUpdatePageFromMouse:function(evt)
{ubr.progMeterView.progUpdatePageFromMouse(evt);},setProgMeter:function(percent)
{ubr.progMeterView.setProgMeter(percent);},enablePageControls:function()
{ubr.uiView.enablePageControls();},hidePageControls:function(cb,cbargs)
{ubr.uiView.hidePageControls(cb,cbargs);},showPageControlsDisabled:function()
{ubr.uiView.showPageControlsDisabled();},showProgMeterDisabled:function()
{ubr.progMeterView.showProgMeterDisabled();},showSectionControlsDisabled:function()
{ubr.uiView.showSectionControlsDisabled();},fadePageControls:function(start,end){ubr.uiView.fadePageControls(start,end);},fadeSectionControls:function(start,end){ubr.uiView.fadeSectionControls(start,end);},hideControls:function(){ubr.uiView.hideControls();},showControls:function(){ubr.uiView.showControls();},fadeProgMeter:function(start,end)
{ubr.progMeterView.fadeProgMeter(start,end);},toggleFontSize:function(){ubr.pageCtl.toggleFontSize();},setFontSize:function(){ubr.pageCtl.setFontSize();},destroyPageSpace:function()
{ubr.pageView.destroyPageSpace();},initPageSpace:function()
{ubr.pageView.initPageSpace();},isPaginating:function(){return ubr.pageModel.isPaginating();},invalidatePageCache:function()
{ubr.pageModel.invalidatePageCache();},clearPageCache:function(sectionNum)
{ubr.pageModel.clearPageCache();},getPages:function()
{ubr.pageCtl.getPages();},handlePage:function()
{ubr.pageModel.handlePage(arguments[0]);},handlePagesDone:function(time,err)
{ubr.pageModel.handlePagesDone(time,err);},getViewport:function(){return ubr.uiView.getViewport();},close:function(redir)
{ubr.APPCLOSED=true;ubr.deActivatePlugins();ubr.saveMark();if(redir)document.location.href=redir;},logout:function()
{ubr.sendLogout(dojo.hitch(this,function(){window.location.reload();}));},getSection:function()
{return ubr.navCtl.getSection();},setMark:function()
{return ubr.navCtl.setMark();},getMark:function(){return ubr.navCtl.getMark();},saveMark:function(){ubr.navCtl.saveMark();},fadePanelSocket:function(slot)
{ubr.panelView.fadePanelSocket(slot);},panelSlide:function(loc,pos,set){ubr.panelView.panelSlide(loc,pos,set);},clearLoadCheck:function(){ubr.asyncImgLoader.clearLoadCheck();},handleHrefClick:function(evt){ubr.navCtl.handleHrefClick(evt);},jumpToHref:function(url){ubr.navCtl.jumpToHref(url);},changeGroupContext:function(id){if(!id)return false;var bookid=ubr.bookId;var groupid=id;var url=(id==0)?getSfUrl('reader','unbound')+'?group_id=0&id='+bookid+'&view=ub':getSfUrl('reader','unbound')+'?group_id='+groupid+'&id='+bookid+'&view=ub';document.location.replace(url);},jumpToFrag:function(){ubr.navCtl.jumpToFrag();},setPageFromPara:function()
{ubr.navCtl.setPageFromPara();},getParaFromPage:function()
{return ubr.pageView.getParaFromPage();},updatePageView:function()
{ubr.pageCtl.updatePageView();},unloadPageView:function(){ubr.pageCtl.unloadPageView();},updateProgMeter:function()
{ubr.progMeterView.updateProgMeter();},updateSectionStat:function()
{ubr.uiView.updateSectionStat();},getSelectionTransport:function(node)
{return ubr.selectionCtl.getSelectionTransport(node);},selectPara:function(event)
{ubr.selectionCtl.selectPara(event);},selectParaById:function(id)
{ubr.selectionCtl.selectParaById(id);},selectAsNode:function(node)
{ubr.selectionCtl.selectAsNode(node);},setSelection:function(node)
{ubr.selectionCtl.selectAsNode(node);},clearSelections:function()
{Debug.log('api clearSelections');ubr.selectionCtl.selectAsNode(null);},showParaNumbering:function(e){ubr.pageView.showParaNumbering(e);},hideParaNumbering:function(e){ubr.pageView.hideParaNumbering(e);},hide:function(id)
{dojo.style(id,'visibility','hidden');},show:function(id)
{dojo.style(id,'visibility','visible');},nextPressed:function()
{ubr.navCtl.nextPage();},prevPressed:function()
{ubr.navCtl.previousPage();},jumpToSection:function(newsection)
{ubr.navCtl.jumpToSection(newsection);},getNewSectionObj:function(href,label)
{return{href:href,text:label,cache:{itemString:undefined,itemImages:undefined,pageNodes:undefined}};},restfulConnect:function(obj,cb)
{ubr.restCtl.init(obj,cb);},getOPS:function(cb){ubr.restCtl.getOPS(cb);},getNcx:function(cb){ubr.restCtl.getNcx(cb);},getOpf:function(cb){ubr.restCtl.getOpf(cb);},buildToc:function(){ubr.tocView.buildToc();},setTocHTML:function(html){ubr.tocView.setTocHTML(html);},getTocEntryHTML:function(i,secobj){return ubr.tocView.getTocEntryHTML(i,secobj);},markTocSelection:function()
{ubr.tocView.markTocSelection();},getItem:function(cb){ubr.navCtl.getItem(cb);},handleOpf:function(opfdata,xobj,cb){ubr.responseCtl.handleOpf(opfdata,xobj,cb);},handleNcx:function(ncxdata,xobj,cb){ubr.responseCtl.handleNcx(ncxdata,xobj,cb);},purchaseBook:function()
{var id=ubr.bookId;var newurl=getSfUrl('store','purchase')+'?buyid='+id;ubr.close(newurl);},handlePurchaseResponse:function(data,xobj)
{},unloadAndGet:function()
{ubr.pageCtl.unloadAndGet();},muc:function()
{return ubr.getPluginByName('chat');},note:function()
{return ubr.getPluginByName('note');}}
ubr.bootstrap={init:function(){$=dojo.byId;dojo.addOnUnload(ubr.close);if(dojo.isIE){alert("You're using Internet Explorer. Some parts of this book may be inaccessible. Try Firefox.");}
window.STAGE=new Stage();ubr.isXD=false;ubr.debugging=false;ubr.bookId=0;ubr.APPCLOSED=false;ubr.UIready=false;ubr.safariResizeEventFlag=true;ubr.imageLoadCheckIterations=0;ubr.imageLoadCheckFadeInc=.005;ubr.imageLoadCheckFadeOpac=1.0;ubr.imageLoadCheckMaxIterations=2000;ubr.proxyImages=false;ubr.itemStem=undefined;ubr.proxyImagesAsDataUrls=false;ubr.plugins=[];ubr.sizeProfiles={'handheld':{h:342,w:364,l:-182,rw:352,rh:372},'mini':{h:442,w:764,l:-382,rw:864,rh:612},'m2':{h:542,w:864,l:-432,rw:864,rh:612},'laptop':{h:742,w:1064,l:-532,rw:1164,rh:892},'full':{h:842,w:1264,l:-632,rw:1334,rh:982},'iphone':{h:356,w:640,l:-320,rw:0,rh:0}};ubr.pageDims={position:'absolute',visibility:'hidden',height:'80%',left:'29%',overflow:'hidden',paddingTop:'0em',paddingBottom:'0em',top:'8%',width:'42%',backgroundColor:'#ffffff',border:'none'};ubr.customSizeProfile=undefined;ubr.panelStates={T:1,R:1,B:1,L:1};ubr.stateList=undefined;ubr.panelLimits={T:80,R:100,B:80,L:100};ubr.panelNodes={T:undefined,R:STAGE.note,B:STAGE.sectionMenu,L:STAGE.chat};ubr.socketNodes={T:undefined,R:dojo.byId('rightSocket'),B:STAGE.sectionMenu,L:dojo.byId('leftSocket')};ubr.panelProps={T:'top',R:'right',B:'height',L:'left'};ubr.percentProgress=0;ubr.navPointCounter=0;ubr.pagePointer=0;ubr.fontScaled=0;ubr.sections=[];ubr.files=[];ubr.filecache=[];ubr.pageNodes=[];ubr.chapterFile=undefined;ubr.chapterTitle=undefined;ubr.pagePointer=0;ubr.paragraphPointer=0;ubr.paragraphCount=0;ubr.paginationPointer=0;ubr.paginationMaxLimit=500;ubr.pageRendered=false;ubr.progFollowing=false;ubr.paginationTimers=[];ubr.helpShowing=false;ubr.toLastPage=false;ubr.pageControlsShowing=false;ubr.navShowing=true;ubr.navTimeout=null;ubr.doubleClickDelay=500;ubr.usingNav=false;ubr.navShowInterval=10000;ubr.mouseIdleTimeout=null;ubr.mouseIdleInterval=12000;ubr.pageControlsEnabled=false;ubr.pageControlsFadeLevel=0;ubr.sectionControlsFadeLevel=0;ubr.progMeterFadeLevel=0;ubr.sectionOpened=false;ubr.ajaxTimeout=10;ubr.clearedEls=new Array();ubr.loadedPageIsMarked=false;ubr.profileId=undefined;ubr.idLookup=undefined;ubr.profileImg=undefined;ubr.profileNick=undefined;ubr.isLogged=undefined;ubr.bookBaseURI=undefined;ubr.mustrefresh=0;ubr.allowKeynav=true;ubr.showbuylink=false;ubr.iphonemode=false;ubr.isAmznKiller=false;ubr.killIEResizeEvent=false;ubr.atomHistory=[];ubr.currentUrl=undefined;ubr.linearMode=true;ubr.restEndpoint=undefined;ubr.mark=undefined;ubr.user=undefined;ubr.bookGroup=0;ubr.globalCatalogURI='http://www.bookglutton.com/api/stanza';ubr.feedProxyUrl='/reader/atom2json';ubr.catalogShowing=false;ubr.readingFrom=undefined;ubr.fragPattern=/^bookgluttonid\((\d+)\)\s*?xpointer\(doc\(([^\)]+?)\)\)\/\/p\[(\d+?)\]\)/;ubr.fragTemplate='bookgluttonid(###BOOKID###)xpointer(doc(###DOCNAME###))//p[###PARA###])';ubr.mark=null;ubr.remoteUser={id:null};ubr.epubId=null;var matches;if(matches=window.location.href.match(/group_id=(\d+?)&/)){ubr.bookGroup=parseInt(matches[1]);}
if(window.location.href.match('view=ubxd')){ubr.isXD=true;}
if(window.ubrConfig){var cfg=window.ubrConfig;var vp=ubr.getViewport();if(cfg.app){ubr.forcePreview=cfg.app.forcepreview;ubr.setDebugging(cfg.app.debug,cfg.app.debuglvl);for(plugin in cfg.app.plugins){ubr.registerPlugin({name:plugin,constructor:eval('('+cfg.app.plugins[plugin]+')')});}
ubr.setCatalogURI(cfg.app.catalog);ubr.setFeedProxyURI(cfg.app.feedproxy);ubr.restEndpoint=cfg.app.rest;}else{throw('Configuration directive "cfg.app" is required');}
if(cfg.user){var uobj=ubr.userModel.initUser(cfg.user,cfg.xmpp);ubr.setUser(uobj);}else{throw('Configuration directive "cfg.user" is required');}
ubr.initUI();Debug.log('UI inited');if(ubr.debugging){ubr.authCtl.scheme='http';}
if(cfg.book&&cfg.mark){var book=cfg.book;var mark=cfg.mark;ubr.setBookBaseURI(book.base);ubr.bookDetailLink=book.link;ubr.bookId=book.id;ubr.epubId=book.epubid;ubr.navCtl.setFileList(book.files);ubr.navCtl.setSectionList(book.sections);ubr.tocView.buildToc();if(window.location.href.indexOf('#')>-1){ubr.navCtl.loadFromHash();}else{if(mark.href){ubr.navCtl.loadHref(mark.href);}else{ubr.navCtl.loadHref(ubr.currentHref);}}
ubr.bookTitle=book.title;ubr.bookPrice=book.price;ubr.bookAuthor=book.author;ubr.bookIdentifier=ubr.epubId;ubr.uiView.setBookMetaHTML();}else{ubr.readyUI();}}else{;}}}
Stage=function()
{this.userMsgs=new Array();this.loadanim=dojo.byId("loadprogress");this.dims=dojo.coords(dojo.byId('ubReader'));this.view=dojo.byId('pageView');this.book=undefined;this.layout=undefined;this.chat=dojo.byId('leftPanel');this.note=dojo.byId('rightPanel');this.chatPaneButton=dojo.byId('chatPaneButton');this.notePaneButton=dojo.byId('notePaneButton');this.rangeSelect=dojo.byId('rangeSelect');this.profileImg=dojo.byId('profileImg');this.chatLog=dojo.byId('chatLog');this.chatSubmit=dojo.byId('chatSubmit');this.chatInput=dojo.byId('chatInput');this.chatForm=dojo.byId('chatForm');this.talktics=dojo.byId('talktics');this.talkflourish=dojo.byId('talkflourish');this.chatPaneChildren=[this.profileImg,this.rangeSelect,this.chatLog,this.chatInput,this.chatForm,this.chatSubmit,this.talktics,this.talkflourish];this.pageTop=dojo.byId('pageTop');this.pageBottom=dojo.byId('pageBottom');this.rightStrip=dojo.byId('rightStrip');this.leftStrip=dojo.byId('leftStrip');this.navigateNext=dojo.byId('navigateNext');this.navigatePrev=dojo.byId('navigatePrevious');this.sectionMenu=dojo.byId('sectionMenu');this.sectionTab=dojo.byId('sectionTab');this.sectionMenuBG=dojo.byId('sectionMenuBG');this.tocitems=dojo.byId('tocitems');this.progMeter=dojo.byId('progressMeter');this.progFill=dojo.byId('progressFill');this.progLeft=dojo.byId('progressLeft');this.progRight=dojo.byId('progressRight');this.progRightFull=dojo.byId('progressRightFull');this.catButton=dojo.byId('navigateCatalog');this.saveButton=dojo.byId('saveButton');this.loginButton=dojo.byId('loginButton');this.fontButton=dojo.byId('fontButton');this.helpButton=dojo.byId('helpButton');this.pageProg=dojo.byId('pageProg');this.showCodeButton=dojo.byId('showCodeButton');this.titleBar=dojo.byId('titleBar');this.authorBar=dojo.byId('authorBar');this.noteContent=dojo.byId('noteContent');this.pNotice=dojo.byId('pleaseWait');this.helpBox=dojo.byId('helpBox');this.stats=dojo.byId('statDisplay');this.pageNumFlashOffset=0;}
ubr.authCtl={scheme:'https',suspendUI:function()
{ubr.UIready=false;ubr.showPageControlsDisabled();ubr.showProgMeterDisabled();},authUser:function()
{if(ubr.user.isLogged)return true;var thisloc=document.location.href;document.location.href=getSfUrl('portal','signin')+'?next='+escape(thisloc);return true;ubr.suspendUI();if(ubr.isLogged){dojo.style("bookgluttonAuth","display","block");dojo.style("bookgluttonLoggedIn","display","block");}else{dojo.style("bookgluttonAuth","display","block");if(arguments[0]){dojo.style("bookgluttonSignup","display","block");}else{dojo.style("bookgluttonLogin","display","block");}}},sendLogin:function(user,pass,cb)
{var form=dojo.query("#bookgluttonLoginForm form")[0];ubr.xdauth(form,{rpcmethod:'login',username:user,password:pass},cb);},sendLogout:function(cb)
{var form=dojo.query("#bookgluttonLogoutForm form")[0];ubr.xdauth(form,{rpcmethod:'logout'},cb);},createAccount:function(name,user,news,pass,passbis,cb)
{var form=dojo.query("#bookgluttonSignupForm form")[0];ubr.xdauth(form,{rpcmethod:'signup',nickname:name,username:user,newsletter:news,password:pass,password_bis:passbis},cb);},xdauth:function(form,content,cb)
{var ioargs={url:this.scheme+'://'+document.location.host+'/api/xdauth',handleAs:'json',content:content,load:cb};if(form)ioargs['form']=form;dojo.io.iframe.send(ioargs);}}
ubr.pageModel={idToPageMap:[],initPageVars:function(){ubr.pageNodes=[];ubr.pageClone=undefined;ubr.paragraphCount=0;ubr.itemString="";ubr.paginationPointer=0;ubr.paginationStart=0;ubr.paginationEnd=0;ubr.selectedParagraph=undefined;ubr.selectedNode=undefined;},isPaginating:function(){return(PubSubP8n.getActive());},invalidatePageCache:function()
{for(var i=0;i<ubr.files.length;i++){if(ubr.files[i].pageNodes){ubr.files[i].pageNodes=undefined;}}},setItemString:function(itemString)
{ubr.itemString=itemString;ubr.files[ubr.filePointer].itemString=itemString;dojo.byId('itemCache').innerHTML=ubr.pageModel.filterForDisplay(ubr.files[ubr.filePointer].itemString);},getItemString:function()
{return ubr.pageModel.filterForDisplay(ubr.files[ubr.filePointer].itemString);},filterForDisplay:function(str)
{str=str.replace(/<img([^>]+?)src\s*?=\s*?"data\:[^"]+?"[^>]*?>/gm,"");str=str.replace(/<svg:image[^>]+?xlink:href\s*?=\s*?"([^"]+?)"[^>]*?>/gm,'<img src="'+"$1"+'"/>');str=str.replace(/<\/svg:image>/,'');ubr.imgTagExp=/<img([^>]+?)src\s*=\s*"([^"]+?\.(png|jpe?g|svg|gif))"/gmi;str=str.replace(ubr.imgTagExp,function(whole,firstmatch,secondmatch,extmatch,offset,stringthing){if(secondmatch.match(/^http:\/\//)){var url=secondmatch;}else{var url=ubr.bookBaseURI+ubr.itemStem+secondmatch;}
return'<img'+firstmatch+'src="'+url+'"';});str=str.replace(/<object(.+?)data="([^"]+?)\.swf"/gmi,function(whole,first,second){if(second.match(/^http:\/\//)){var url=second;}else{var url=ubr.bookBaseURI+ubr.itemStem+second;}
return'<object'+first+'data="'+url+'.swf"';});str=str.replace(/<param(.+?)value="([^"]+?)\.swf"/gmi,function(whole,first,second){if(second.match(/^http:\/\//)){var url=second;}else{var url=ubr.bookBaseURI+ubr.itemStem+second;}
return'<param'+first+'value="'+url+'.swf"';});str=str.replace(/<h\d\s*?\/>/gm,'');ubr.paragraphCount=0;str=str.replace(/<p([^>]*?)>/gm,dojo.hitch(ubr,function(match,par){if(match=='<p>'||match.match(/^<p\s/)){var html='<p'+par+' ubrid="'+ubr.paragraphCount+'">';ubr.paragraphCount++;return html;}else{return match;}}));return str;},findPageForPara:function(id){var found=-1;id=parseInt(id,10)+1;var pgs=ubr.files[ubr.filePointer].pageNodes;for(var i=0;i<pgs.length;i++)
{var f=pgs[i].indexOf('ubrid="'+id+'"');if(f>-1){found=i;break;}}
return found;},clearPageCache:function(fileNum)
{if(!fileNum)fileNum=ubr.filePointer;if(!ubr.files[fileNum])Debug.log('clearPageCache: no file defined at that index!');ubr.files[fileNum].pageNodes=[];ubr.files[fileNum].itemString=undefined;},handlePage:function(pagetext)
{if(typeof ubr.paginationPointer!='number')throw("The pagination pointer must be a valid number");if(ubr.paginationPointer>ubr.paginationMaxLimit){dojo.publish('ubr/events/paginationDone',[{time:(new Date()).getTime()}]);throw("Hit maximum number of pages we can handle for a given file");}
var pagetext=arguments[0];pagetext.replace(/id=["']([A-za-z]\S+?)["']/g,function(match,sub1){ubr.pageModel.idToPageMap[sub1]=ubr.paginationPointer;if(sub1==ubr.postJumpFragId){if(ubr.postJumpFragId){Debug.log('MATCHED OUR POST JUMP FRAG ID ON THIS PAGE');dojo.publish('ubr/events/postJumpFragLoaded',[ubr.paginationPointer]);}}
return match;});ubr.pageModel.storePage(pagetext);if(ubr.postJumpParaId){var re=new RegExp('ubrid="'+ubr.postJumpParaId+'"');if(pagetext.match(re)){Debug.log('MATCHED OUR POST JUMP ID ON THIS PAGE');dojo.publish('ubr/events/postJumpParaLoaded',[ubr.paginationPointer,ubr.postJumpParaId]);}}
ubr.paginationPointer++;ubr.progPageNumFlash(ubr.paginationPointer,false);ubr.setProgMeter(Math.ceil(((ubr.itemString.length-arguments[1])/ubr.itemString.length)*100));},storePage:function(pagetext)
{ubr.pageNodes[ubr.paginationPointer]=pagetext;},firstUbrid:function()
{var matches;return(matches=/ubrid="(\d+)"/.exec(ubr.pageModel.getPage()))?matches[1]:-1;},getPage:function()
{return ubr.pageNodes[ubr.pagePointer];},cacheAllPages:function()
{ubr.files[ubr.filePointer].pageNodes=ubr.pageNodes;},handlePagesDone:function(time,err)
{Debug.log('rcvd pageDone signal:'+time);if(err){console.log('error paginating item string');Debug.log('Exception in pagination:'+err);ubr.pageModel.cacheAllPages();dojo.publish('ubr/events/paginationDone',[{time:0}]);Debug.log('handlePagesDone exited with errors');}else{Debug.log('caching all pages');ubr.pageModel.cacheAllPages();var tm=(new Date()).getTime();dojo.publish('ubr/events/paginationDone',[{time:0}]);Debug.log('handlePagesDone exited normally');}},processItemString:function(html)
{html=data.replace(/^\s\s*/,'').replace(/\s\s*$/,'');var linkref=/<a(.+?)href\s*?=\s*?"(.*?)"([^>]*?)>/gm;var linkreplace='<a$1href="#"$3 onclick="ubr.handleHrefClick('+"'$2'"+'); return false;">';var preexp=/<pre([^<]+?)<\/pre>/ig;var prereplace='<pre style="max-height:80%; width:90%; overflow:auto" $1</pre>';html=html.replace(/<\s*?\?xml[^\?]+\?>/,'');html=html.replace(/<meta[^>]+?>/g,'');html=html.replace(/<title>[^<]*?<\/title>/ig,'');if(ubr.isAmznKiller){html=html.replace(/<object.+?<\/object>/ig,'');}
html=html.replace(/<\s*?!DOCTYPE[^>]+?>/,'');html=html.replace(/<html[^>]*?>/,'');html=html.replace(/<\/html[^>]*?>/,'');html=html.replace(/<body[^>]*?>/,'');html=html.replace(/<\/body[^>]*?>/,'');html=html.replace(/<head[^>]*?>/,'');html=html.replace(/<\/head[^>]*?>/,'');var linkels=[];html=html.replace(/<link[^>]*?>/g,function(linkel){linkels.push(linkel);return'';});for(var i=0;i<linkels.length;i++){if(linkels[i].match(/purchase/)){ubr.showbuylink=true;}}
html=html.replace(/<script[^>]*?>/g,'');html=html.replace(/<\/script[^>]*?>/g,'');if(ubr.showbuylink){html+='<div class="purchase-button"><a href="#" onclick="ubr.purchaseBook(); return false;">Read the whole book</a><span class="purchase-message"> for just </span></div>';}
html=html.replace(/font-size\s*?:\s*?\d+?(px|pt)/g,'');ubr.imgTagExp=/<img([^>]+?)src\s*=\s*"([^"]+?\.(png|jpe?g|svg|gif))"/gmi;html=html.replace(ubr.imgTagExp,function(whole,firstmatch,secondmatch,extmatch,offset,stringthing){if(secondmatch.match(/^http:\/\//)){var url=secondmatch;}else{var url=ubr.bookBaseURI+ubr.itemStem+secondmatch;}
return'<img'+firstmatch+'src="'+url+'"';});return html;}}
ubr.navCtl={sectionMap:{},setFileList:function(list){if(!list){alert('There were no files found for this book. Something is wrong with it.');return;}
if(list.length==0){alert('There were no files found for this book. Something is wrong with it.');return;}
ubr.files=list;for(var i=0;i<ubr.files.length;i++){ubr.files[i].itemString=undefined;ubr.files[i].pageNodes=undefined;}
ubr.currentHref=ubr.files[0].href+'#!0p:0';ubr.currentFile=ubr.files[0].href;ubr.filePointer=0;if(dojo.isSafari){ubr.itemStem=(matches=ubr.currentFile.match(/^(.*?\/)[^\/]+?/))?matches[1]:'';}else{ubr.itemStem=(matches=ubr.currentFile.match(/^(.*\/)[^\/]+?$/))?matches[1]:'';}
if(!ubr.itemStem.match(/\/$/)){ubr.itemStem+='/';}},handleParagraphSelect:function(){Debug.log('navCtl: para selected');ubr.paragraphPointer=ubr.selectedParagraph;ubr.currentHref=ubr.currentFile+'#!'+ubr.paragraphPointer+'p:0';ubr.navCtl.setUriFrag();},handleParagraphDeSelect:function(){Debug.log('navCtl: para deselect');if(ubr.fbLikeFrame){ubr.navCtl.hideFb();}
ubr.navCtl.setUriFrag();},hideFb:function(){dojo.attr(ubr.fbLikeFrame,'src','');dojo.style(ubr.fbLikeFrame,'display','none');dojo.style(ubr.fbclose,'display','none');},setSectionList:function(list){ubr.sections=list;},setUriFrag:function(){window.location.replace('#href('+ubr.currentHref+')');},loadHref:function(href){ubr.currentHref=href;ubr.paragraphPointer=0;ubr.pagePointer=0;ubr.panelSlide('B',4);if(ubr.postJumpNoteId){}
ubr.unloadPageView();if(ubr.currentHref.indexOf('#')<ubr.currentHref.indexOf('%23')){ubr.currentHref=ubr.currentHref.replace('%23','#');}
ubr.postJumpFragId=(ubr.currentHref.indexOf('#')!=-1)?ubr.currentHref.split('#')[1]:'';Debug.log('postJumpFragId is '+ubr.postJumpFragId);if(ubr.postJumpFragId.match(/^!\d+p/)){ubr.postJumpParaId=ubr.navCtl.getParaFromFragId(ubr.postJumpFragId);ubr.paragraphPointer=parseInt(ubr.postJumpParaId,10);Debug.log('set paragraph pointer from frag id to '+ubr.paragraphPointer);}
ubr.navCtl.getItem();},getParaFromFragId:function(f){return f.substr(f.indexOf('!')+1,f.indexOf('p')-1);},loadFromHash:function(){var cmd=window.location.href.substr(window.location.href.indexOf('#')+1);Debug.log('got command from URL fragment: '+cmd);ubr.navCtl.runCommand(cmd);},runCommand:function(cmd){var name,args;cmd.replace(/^(href|note)\(([^\)]+?)\)/,function(match,m1,m2){name=m1;args=m2;});if(name=='href'){ubr.navCtl.loadHref(args);}else if(name=='note'){var note_id;if(args.match(/^(\d+)$/)){ubr.navCtl.loadNoteById(args);}else{ubr.navCtl.loadNotesByHref(args);}}else{ubr.navCtl.loadHref(ubr.currentHref);}},loadNoteById:function(id){ubr.postJumpNoteId=id;dojo.xhrGet({url:'/note/href',content:{id:id,book_id:ubr.bookId},load:function(href,xhr){if(xhr.xhr.status==200){if(href){if(href.indexOf('#')>-1){if(href.indexOf('#!')>-1){var par=ubr.navCtl.getParaFromFragId(href.split('#')[1]);ubr.postJumpSelectionId=parseInt(par,10);}else{ubr.postJumpSelectionId=-1;}
ubr.note().setPostJumpNoteId(id);ubr.navCtl.loadHref(href);}else{ubr.navCtl.loadHref(href);}}else{alert("This note has been orphaned. Cannot display it.");ubr.navCtl.loadHref(ubr.currentHref);}}else if(xhr.xhr.status==401){alert('you are not authorized, bub!');ubr.navCtl.loadHref(ubr.currentHref);}}});},loadNotesByHref:function(href){ubr.note().loadHref(href);},getItem:function(){ubr.unloadPageView();var h=ubr.currentHref;ubr.currentFile=(h.indexOf('#')>-1)?ubr.currentHref.split('#')[0]:ubr.currentHref;var valid=false;dojo.map(ubr.files,function(f){if(f.href==ubr.currentFile){valid=true;ubr.filePointer=arguments[1];}});if(!valid){if(ubr.files.length>0){ubr.filePointer=0;ubr.currentFile=ubr.files[0];ubr.currentHref=ubr.currentFile;}else{Debug.log('invalid href');return;}}
if(arguments.length){var cb=arguments[0];}else{var cb=ubr.pageCtl.getPages;}
if(ubr.filePointer==undefined){Debug.log('filePointer is undefined');return;}
Debug.log('getting file at index '+ubr.filePointer);ubr.pageModel.initPageVars();if(!ubr.files[ubr.filePointer].itemString){ubr.uiView.showLoadAnim();dojo.xhrGet({url:ubr.restEndpoint.getItem.url,content:{book_id:ubr.bookId,group_id:ubr.user.groupId,html:ubr.currentFile,forcesample:ubr.forcePreview},encoding:'utf-8',load:dojo.hitch(this,function(data,xhr){var itemString=(data=='AUTH')?'<p>Sorry, but this is a personal library item, not viewable without owner permission.</p>':data;ubr.pageModel.setItemString(itemString);dojo.publish('ubr/events/sectionView',[ubr.tocView.getLabelForSection(ubr.currentHref),ubr.currentHref]);if(cb){setTimeout(cb,1000);}})});}else{ubr.itemString=ubr.files[ubr.filePointer].itemString;var page;if(ubr.postJumpParaId){if((page=ubr.pageModel.findPageForPara(ubr.postJumpParaId))>-1){Debug.log('found postJumpParaId in cached item');dojo.publish('ubr/events/postJumpParaLoaded',[page,ubr.postJumpParaId]);}}else if(ubr.postJumpFragId){if(page=ubr.pageModel.idToPageMap[ubr.postJumpFragId]){Debug.log('found postJumpFragId in cached item');dojo.publish('ubr/events/postJumpFragLoaded',[page]);}}
ubr.postJumpParaId=null;ubr.postJumpFragId=null;dojo.publish('ubr/events/sectionView',[ubr.tocView.getLabelForSection(ubr.currentHref),ubr.currentHref]);if(cb){cb();}}},handlePagesDone:function(){Debug.log('navCtl.handlePagesDone');ubr.paginationPointer=0;ubr.paragraphCount=0;ubr.percentProgress=100;ubr.setProgMeter(100);ubr.readyUI();Debug.log('UI Ready');},handleTocClick:function(e){if(e.currentTarget.hash.match(/^#/)){var frag=e.currentTarget.hash.substr(1);}
ubr.navCtl.runCommand(frag);e.preventDefault();e.stopPropagation();},nextPage:function(){Debug.log('navCtl.nextPage');if(!ubr.pageNodes||!ubr.UIready)return;if(ubr.isPaginating()){return;if(ubr.pagePointer>=ubr.paginationPointer){return;}}
if(ubr.pagePointer==ubr.pageNodes.length-1){Debug.log('at last page already!');if(ubr.filePointer<ubr.files.length-1){ubr.lastSection=ubr.filePointer;ubr.filePointer++;ubr.currentFile=ubr.files[ubr.filePointer].href;ubr.currentHref=ubr.currentFile;ubr.suspendUI();ubr.unloadPageView();ubr.pageModel.initPageVars();ubr.paragraphPointer=0;ubr.pagePointer=0;ubr.uiView.showLoadAnim();ubr.navCtl.loadHref(ubr.currentHref);}else{Debug.log('at last page of last file');}}else if(ubr.pagePointer<ubr.pageNodes.length-1){ubr.pagePointer++;var par=ubr.pageModel.firstUbrid();if(par>-1){ubr.currentHref=ubr.currentFile+'#!'+par+'p:0';}else{ubr.currentHref=ubr.currentFile;}
ubr.unloadPageView();ubr.updatePageView();ubr.progPageNumFlash(ubr.pagePointer,true,true);ubr.updateProgMeter();}},previousPage:function(){if(ubr.isPaginating()||!ubr.UIready){return;}else{if(ubr.pagePointer==0){if(ubr.filePointer>0){ubr.toLastPage=true;ubr.lastSection=ubr.filePointer;ubr.filePointer--;ubr.currentFile=ubr.files[ubr.filePointer].href;ubr.currentHref=ubr.currentFile;ubr.suspendUI();ubr.unloadPageView();ubr.pageModel.initPageVars();ubr.paragraphPointer=-1;ubr.pagePointer=-1;ubr.uiView.showLoadAnim();ubr.navCtl.loadHref(ubr.currentHref);}else{Debug.log('at last page of last file');}}else if(ubr.pagePointer>0){ubr.pagePointer--;var par=ubr.pageModel.firstUbrid();if(par>-1){ubr.currentHref=ubr.currentFile+'#!'+par+'p:0';}else{ubr.currentHref=ubr.currentFile;}
ubr.unloadPageView();ubr.updatePageView();ubr.progPageNumFlash(ubr.pagePointer,true,true);ubr.updateProgMeter();}}},handleHrefClick:function(evt){var url=evt.currentTarget.getAttribute('href');if(!url)return;if(!dojo.hasClass(evt.currentTarget,"ubrdirectlink")){evt.preventDefault();evt.stopPropagation();if(url.match(/^http:\/\/(www\.)?feedbooks\.com\/book\/stanza\/\d+\/?/)||url.match(/^http:\/\/(www\.)?feedbooks\.com\/book\/\d+?\.epub$/i)){if(confirm("This replaces your current read with a book from feedbooks.com and adds it to your reading history. Sounds like a good idea. Ready?")){var rdr=getSfUrl('book','importnew')+'?url='+dojo.toJson(url);document.location.href=rdr;return false;}}
if(url.match(/^http:\/\/(.*?)$/)){window.open(url);}else{var stem=(ubr.itemStem.substr(0,1)=='/')?'':ubr.itemStem;Debug.log('trying to jump to '+stem+url);ubr.navCtl.loadHref(stem+url);}}else{}},getCurrentFile:function(){return ubr.files[ubr.filePointer];},getMark:function(){return ubr.setMark();},saveMark:function(){var mark=ubr.setMark();dojo.xhrPost({url:ubr.restEndpoint.close.url,encoding:'utf-8',sync:true,content:ubr.getMark()});},setMark:function()
{return{filePointer:ubr.filePointer,currentFile:ubr.currentFile,currentHref:ubr.currentHref,itemStem:ubr.itemStem,bookId:ubr.bookId,epubId:ubr.epubId,bookBaseURI:ubr.bookBaseURI,bookid:ubr.bookId,sectionPointer:ubr.sectionPointer,paragraphPointer:ubr.paragraphPointer,panelStates:ubr.panelStates,fontScaled:ubr.fontScaled,bookGroup:ubr.bookGroup,documentHref:ubr.currentHref,noteOpened:false,chatOpened:false,selectedParagraph:ubr.selectedParagraph,selectedNode:ubr.selectedNode};},initPositionVars:function(){ubr.sectionPointer=0;ubr.paragraphPointer=0;ubr.selectedParagraph=null;ubr.chapterFile=ubr.mark.currentFile;ubr.sectionPointer=ubr.mark.sectionPointer;ubr.paragraphPointer=ubr.mark.paragraphPointer;ubr.selectedParagraph=ubr.mark.selectedParagraph;},handlePageView:function(){Debug.log('pageView caught by navCtl');ubr.navCtl.setUriFrag();var msg=arguments[0];if(ubr.postJumpSelectionId!=undefined){dojo.query('p',STAGE.book).forEach(function(p){if(p.getAttribute('ubrid')==ubr.postJumpSelectionId){ubr.selectionCtl.selectParaById(ubr.postJumpSelectionId);ubr.postJumpSelectionId=undefined;}});}else if(ubr.bookSelection!=undefined){ubr.selectParaById(ubr.selectedParagraph);}},handlePostJumpParaLoaded:function(){if(ubr.postJumpParaId){Debug.log('caught postJumpParaLoaded');Debug.log(arguments);ubr.pagePointer=parseInt(arguments[0],10);ubr.paragraphPointer=parseInt(arguments[1],10);Debug.log('updating our page at '+ubr.pagePointer+' because our paragraph '+ubr.paragraphPointer+' is on it:');ubr.pageCtl.updatePageView();ubr.uiView.hideLoadAnim();ubr.postJumpParaId=null;ubr.postJumpFragId=null;}},handlePostJumpFragLoaded:function(){if(ubr.postJumpFragId){Debug.log('caught postJumpFragLoaded');Debug.log(arguments);ubr.pagePointer=arguments[0];ubr.updatePageView();ubr.progPageNumFlash(ubr.pagePointer,true,true);ubr.updateProgMeter();}}}
dojo.subscribe('ubr/events/pageView',this,ubr.navCtl.handlePageView);dojo.subscribe('ubr/events/paginationDone',this,ubr.navCtl.handlePagesDone);dojo.subscribe('ubr/events/paragraphSelect',this,ubr.navCtl.handleParagraphSelect);dojo.subscribe('ubr/events/paragraphSwitchSelect',this,ubr.navCtl.handleParagraphSelect);dojo.subscribe('ubr/events/paragraphDeSelect',this,ubr.navCtl.handleParagraphDeSelect);dojo.subscribe('ubr/events/postJumpParaLoaded',this,ubr.navCtl.handlePostJumpParaLoaded);dojo.subscribe('ubr/events/postJumpFragLoaded',this,ubr.navCtl.handlePostJumpFragLoaded);ubr.pageCtl={getPages:function()
{ubr.getPagesCalledAt=(new Date()).getTime();dojo.publish('ubr/events/paginationStarted',[{time:ubr.getPagesCalledAt}]);if(ubr.files[ubr.filePointer].pageNodes!=undefined){ubr.pageNodes=ubr.files[ubr.filePointer].pageNodes;ubr.handlePagesDone();}else{ubr.suspendUI();ubr.itemString=ubr.pageModel.getItemString();if(ubr.itemString){}else{}
ubr.setProgMeter(0);if(ubr.itemString){try{var pid=PubSubP8n.loadRefs(ubr.itemString,STAGE.layout,dojo.coords(STAGE.layout).h);var topic='p8n/'+pid+'/pagedata';dojo.subscribe(topic,ubr,ubr.pageModel.handlePage);dojo.subscribe('p8n/'+pid+'/complete',ubr,ubr.pageModel.handlePagesDone);}catch(e){Debug.log(e);ubr.itemString='';ubr.readyUI();}}else{Debug.log('no item string! halting...');ubr.itemString='';ubr.readyUI();}}},unloadPageView:function(){ubr.pageRendered=false;ubr.paragraphPointer=undefined;ubr.pageView.hideOverflow();dojo.publish('ubr/events/pageUnload',[{time:(new Date()).getTime()}]);},renderPage:function(){Debug.log('rendering page');ubr.pageView.showOverflow();ubr.pageView.setContent();var pnids=[];var pns=[];dojo.query('p',STAGE.book).forEach(function(pnode){dojo.connect(pnode,"onclick",null,ubr.selectPara);dojo.connect(pnode,"onmouseup",null,function(e){e.preventDefault();e.stopPropagation();});dojo.connect(pnode,"onmousedown",null,function(e){e.preventDefault();e.stopPropagation();});dojo.connect(pnode,"onmouseover",null,ubr.showParaNumbering);dojo.connect(pnode,"onmouseout",null,ubr.hideParaNumbering);var ubrid=pnode.getAttribute('ubrid');pnids.push(parseInt(ubrid));pns.push(pnode);});if(!(ubr.paragraphPointer>=0)){Debug.log('null ass pp, going to set from first in list');var first=pnids[0];if(pns.length>1){if(dojo.hasClass(pns[0],'fragment')){var first=pnids[1];}}
ubr.paragraphPointer=(first)?first:0;}
ubr.pageRendered=true;var pl=dojo.query('input[id="ubrPurchaseLink"]',STAGE.book);if(pl[0]){var input=pl[0];if(input){ubr.buyitLink=input.value;ubr.uiView.showPurchasePrompt();}}else{ubr.uiView.hidePurchasePrompt();}
var msg={time:(new Date()).getTime(),user:ubr.user,mark:ubr.getMark(),pageNum:(ubr.pagePointer),pageTotal:ubr.pageNodes.length,pNodes:pns,pNodeIds:pnids,pageContent:ubr.pageNodes[ubr.pagePointer]};dojo.query('a',STAGE.book).forEach(function(a){dojo.connect(a,"onclick",null,ubr.handleHrefClick);});dojo.publish('ubr/events/pageView',[msg]);Debug.log('done rendering');},updatePageView:function()
{Debug.log('pageCtl.updatePageView');if(!ubr.pageNodes.length||!(ubr.sections.length>0))return;var d=new Date();ubr.lastPageUpdate=d.getTime();var lastindex=ubr.pageNodes.length-1;if(ubr.pageRendered==false){Debug.log('page has not been rendered yet');if(ubr.toLastPage==true){ubr.toLastPage=false;ubr.pagePointer=lastindex;}
if(ubr.pagePointer<0||(ubr.pagePointer>(lastindex))){ubr.pagePointer=(ubr.pagePointer<0)?0:lastindex;}
ubr.pageCtl.renderPage();}else{Debug.log('page is already rendered:'+ubr.pageRendered);}
dojo.style(STAGE.book,'visibility','visible');},toggleFontSize:function(){if(ubr.pageControlsEnabled&&!ubr.isPaginating()){ubr.fontScaled++;ubr.fontScaled=(ubr.fontScaled>2)?0:ubr.fontScaled;ubr.setFontSize();ubr.pageView.resetPageView(true);}},setFontSize:function(){dojo.forEach([STAGE.book,STAGE.layout],function(div){dojo.attr(div,'class',(ubr.fontScaled==0)?'':(ubr.fontScaled==1)?'larger':'largest');});}}
ubr.pageView={destroyPageSpace:function()
{if(STAGE.layout)STAGE.view.parentNode.removeChild(STAGE.layout);if(STAGE.book)STAGE.view.parentNode.removeChild(STAGE.book);STAGE.book=undefined;STAGE.layout=undefined;},initPageSpace:function()
{var stobj=ubr.pageDims;var adjustTo='82%';if(ubr.isAmznKiller){stobj.position='absolute';stobj.height='90%';stobj.width='90%';stobj.left='5%';stobj.top='5%';adjustTo='92%';}
var layout=dojo.doc.createElement('DIV');layout.id='pageLayout';dojo.style(layout,stobj);STAGE.view.parentNode.insertBefore(layout,STAGE.view.nextSibling);STAGE.layout=layout;var master=dojo.doc.createElement('DIV');master.id='pageMaster';dojo.style(master,stobj);STAGE.layout.parentNode.insertBefore(master,STAGE.layout.nextSibling);STAGE.book=master;var cache=dojo.byId('itemCache');dojo.style(cache,stobj);dojo.style(cache,{height:'auto'});dojo.style(STAGE.book,'height',adjustTo);ubr.setFontSize();},getParaFromPage:function()
{var pp=0;for(var i=ubr.pagePointer;i>0;i--)
{if(f=ubr.pageNodes[i].match(/ubrid="(\d+?)"/)){pp=f[1];break;}}
return pp;},showParaNumbering:function(e){ubr.killIEResizeEvent=true;if(e.target.nodeName.toLowerCase()!='p')return;var ubrid=e.target.getAttribute('ubrid');if(dojo.byId('paragraph-numbering')){var attached=dojo.byId('paragraph-numbering');}else{var div=dojo.doc.createElement('div');dojo.attr(div,'class','paragraph-number');dojo.style(div,'visibility','hidden');dojo.style(div,'color','#999999');dojo.style(div,'font-size','small');dojo.style(div,'font-family','sans-serif');div.id='paragraph-numbering';var attached=dojo.body().appendChild(div);}
attached.innerHTML=parseInt(ubrid)+1;var pos=dojo.coords(e.target);var nt=(pos.x+pos.w)+5;var nl=pos.y;dojo.style(attached,'position','absolute');dojo.style(attached,'top',nl+'px');dojo.style(attached,'left',nt+'px');dojo.style(attached,'visibility','visible');},hideParaNumbering:function(e){ubr.killIEResizeEvent=false;if(e.target.nodeName.toLowerCase()!='p')return;var num=e.target.getAttribute('ubrid');var ind='paragraph-numbering';dojo.style(dojo.byId(ind),'visibility','hidden');},resetPageView:function()
{if(arguments[0]==true){var donotdestroy=true;}
ubr.invalidatePageCache();ubr.unloadPageView();if(!donotdestroy){ubr.destroyPageSpace();ubr.initPageSpace();}
ubr.pageModel.initPageVars();ubr.itemString=ubr.pageModel.getItemString();ubr.getPages();},loadItem:function()
{ubr.markTocSelection();dojo.publish('ubr/events/sectionView',[{mark:ubr.mark,time:(new Date()).getTime(),user:ubr.user,sectionNum:ubr.sectionPointer,sectionTitle:ubr.sections[ubr.sectionPointer].text,sectionFirstPara:''}]);ubr.getPages();},hideOverflow:function()
{if(!ubr.preserveMasterHeight)return;dojo.style(STAGE.book,'height',ubr.preserveMasterHeight);},showOverflow:function()
{ubr.preserveMasterHeight=dojo.style(STAGE.book,'height');dojo.style(STAGE.book,'height','auto');},setContent:function()
{if(arguments.length){var html=arguments[0];}else{var html=ubr.pageNodes[ubr.pagePointer];}
STAGE.book.innerHTML=html;},getContent:function()
{return STAGE.book.innerHTML;}}
ubr.panelView={fadePanelSocket:function(slot)
{var opac=(ubr.panelStates[slot]==4)?0:1;var plug=ubr.plugins[slot];if(!plug)return;if(opac==0){var beginfunc=function(){dojo.publish('ubr/plugins/'+plug.id+'/nodefadeOutStart',[true]);};var endfunc=function(){dojo.style(ubr.plugins[slot].attachPoint,'display','none');ubr.panelSlide(slot);dojo.publish('ubr/plugins/'+plug.id+'/nodefadeOutEnd',[true]);};}else{var beginfunc=function(){dojo.style(ubr.plugins[slot].attachPoint,'display','');ubr.panelSlide(slot);dojo.publish('ubr/plugins/'+plug.id+'/nodefadeInStart',[true]);};var endfunc=function(){dojo.publish('ubr/plugins/'+plug.id+'/nodefadeInEnd',[true]);}}
dojo.animateProperty({node:plug.attachPoint,duration:200,properties:{opacity:{end:opac}},beforeBegin:beginfunc,onEnd:endfunc}).play();},panelSlide:function(loc,pos,set){var setonly=(arguments.length>2)?set:false;ubr.panelStates[loc]=(!pos)?ubr.panelStates[loc]<<1:pos;if(ubr.panelStates[loc]>4)ubr.panelStates[loc]=(!pos)?2:1;var props={};var scale=ubr.panelLimits[loc]/100;var vc=dojo.coords(STAGE.view);var pc=dojo.coords(STAGE.sectionTab);var poiseadj=(loc!='B')?36:-46-pc.h;var bottadj=(loc!='B')?0:pc.h;var rcw=dojo.style(dojo.byId('ubReader'),'width');var limit=(loc!='B')?((rcw-vc.w)/2)*scale:(vc.h*scale);var end=(ubr.panelStates[loc]==1)?limit:(ubr.panelStates[loc]==2)?limit-poiseadj:0+bottadj;if(end<0){end=(end*-1)-(2*poiseadj);}
if(!setonly){var bb=function(){};var oe=function(){};if(loc=='B'){if(ubr.panelStates[loc]==2){dojo.style(ubr.panelNodes[loc],'width','92%');}else{oe=function(){dojo.style(ubr.panelNodes[loc],'width','32px');}}}
props[ubr.panelProps[loc]]={end:end,unit:'%'};dojo.animateProperty({node:ubr.panelNodes[loc],duration:200,onEnd:oe,beforeBegin:bb,properties:props}).play();}else{if(loc=='B'){dojo.style(ubr.panelNodes[loc],'width',(pos==4)?'32px':'92%');}
var opac=(ubr.panelStates[loc]==4)?1:0;dojo.style(ubr.panelNodes[loc],ubr.panelProps[loc],end+'px');if(ubr.plugins[loc]){dojo.style(ubr.plugins[loc].attachPoint,'opacity',opac);if(opac==1){dojo.publish('ubr/plugins/'+ubr.plugins[loc].id+'/nodefadeInStart',[true]);dojo.publish('ubr/plugins/'+ubr.plugins[loc].id+'/nodefadeInEnd',[true]);}else if(opac==0){dojo.publish('ubr/plugins/'+ubr.plugins[loc].id+'/nodefadeOutStart',[true]);dojo.publish('ubr/plugins/'+ubr.plugins[loc].id+'/nodefadeOutEnd',[true]);}}}}}
ubr.pluginCtl={deActivatePlugins:function(){var cb=undefined;if(ubr.user.isLogged){if(ubr.muc()){if(ubr.muc().con){ubr.muc().logout();ubr.muc().con.disconnect();}}
if(cb){cb();}}},getPluginByName:function(name){var ret=undefined;for(slot in ubr.plugins){if(ubr.plugins[slot].P.name==name){ret=ubr.plugins[slot].instance;}}
return ret;},registerPlugin:function(P){var l=ubr.plugins.length;var slot=(l==0)?'L':(l==1)?'R':P.name+'_'+(new Date()).getTime();var n=(ubr.socketNodes[slot])?ubr.socketNodes[slot]:undefined;if(!n){var newdiv=dojo.doc.createElement('div');newdiv.id='dydiv'+slot;dojo.body().appendChild(newdiv);ubr.socketNodes[slot]=dojo.byId('dydiv'+slot);n=ubr.socketNodes[slot];}
ubr.plugins[slot]={P:P,id:undefined,attachPoint:n,instance:undefined}
ubr.plugins.length++;return slot;},activatePlugins:function(){for(slot in ubr.plugins){if(ubr.plugins[slot].P){var id=(new Date()).getTime().toString();ubr.plugins[slot].id=id;ubr.plugins[slot].instance=new ubr.plugins[slot].P.constructor(id);if(ubr.plugins[slot].attachPoint){dojo.publish('ubr/plugins/'+id+'/nodeready',[ubr.plugins[slot].attachPoint]);}}}}}
ubr.progMeterView={progFollow:function(evt)
{if(ubr.isPaginating()){ubr.progStop();return;}else{ubr.progFollowing=true;if(dojo.style(STAGE.book,'opacity')==1){dojo.animateProperty({node:STAGE.book,duration:100,properties:{opacity:{start:'1.0',end:(dojo.isIE)?'1.0':'0.5'}}}).play();}
ubr.progUpdateFromMouse(evt);}},progPageNumFlash:function(num,fadein,fadeout)
{STAGE.pageProg.innerHTML=num+1+'';if(dojo.style(STAGE.pageProg,'opacity')==0){if(fadein){var step1=dojo.fadeIn({node:STAGE.pageProg,duratiion:200,onEnd:(fadeout)?function(){dojo.fadeOut({node:STAGE.pageProg,duration:200}).play();}:function(){}});step1.play();}else{dojo.style(STAGE.pageProg,'opacity','1.0');}}},progStop:function(evt)
{if(ubr.progFollowing==true){ubr.progFollowing=false;var step1=dojo.fadeOut({node:STAGE.pageProg,duration:400});var fadelevel=(dojo.isIE)?1.0:0.5;var step2=dojo.fadeIn({node:STAGE.book,duration:300,onEnd:function(){if(dojo.isIE){}
ubr.progFollowing=false;}});step1.play();step2.play();ubr.progUpdatePageFromMouse(evt);}},progUpdateFromMouse:function(evt)
{if(!evt)return;if(ubr.progFollowing==true){var cl=(evt.clientX-dojo.coords(STAGE.progMeter).x);var w=dojo.coords(STAGE.progMeter).w;ubr.percentProgress=(cl/w)*100;ubr.pagePointer=(ubr.pagePointer>(ubr.pageNodes.length-1)/2)?Math.ceil((ubr.pageNodes.length-1)*(ubr.percentProgress/100)):Math.floor((ubr.pageNodes.length-1)*(ubr.percentProgress/100));if(ubr.pagePointer==ubr.pageNodes.length-1){ubr.percentProgress=100;}else if(ubr.pagePointer==0){ubr.percentProgress=0;}
ubr.setProgMeter(ubr.percentProgress);ubr.progPageNumFlash(ubr.pagePointer,false,false);ubr.progUpdatePageFromMouse(evt);}},progUpdatePageFromMouse:function(evt)
{if(!evt)return;ubr.unloadPageView();ubr.updatePageView();},setProgMeter:function(percent)
{if(percent>100)percent=100;if(percent<0)percent=0;if(percent==0){dojo.removeClass(STAGE.progLeft,'full');}else if(percent>0){dojo.addClass(STAGE.progLeft,'full');}
dojo.marginBox(STAGE.progFill,{h:dojo.marginBox(STAGE.progFill).h,w:Math.ceil(dojo.marginBox(STAGE.progMeter).w*(percent/100))});if(percent==100){dojo.addClass(STAGE.progRight,'full');}else{dojo.removeClass(STAGE.progRight,'full');}},showProgMeterDisabled:function()
{ubr.fadeProgMeter(ubr.progMeterFadeLevel,1.0);},fadeProgMeter:function(start,end)
{ubr.progMeterFadeLevel=end;dojo.forEach([STAGE.progLeft,STAGE.progMeter,STAGE.progFill,STAGE.progRight],function(node){dojo.animateProperty({node:node,duration:200,properties:{opacity:{start:start,end:end,unit:"px"}}}).play();});},updateProgMeter:function()
{if(!ubr.pageNodes)return;if(ubr.pageNodes.length<2){ubr.percentProgress=100;}else{ubr.percentProgress=Math.ceil(ubr.pagePointer/(ubr.pageNodes.length-1)*100);}
ubr.setProgMeter(ubr.percentProgress);ubr.updateSectionStat();}}
ubr.restCtl={}
ubr.userModel={initUser:function(user,xmpp){var uobj={id:user.id,nick:user.nick,link:user.link,icon:user.img,username:user.bglogin,isLogged:user.islogged,chatParams:ubr.userModel.setChatParams(user,xmpp),withGroup:(parseInt(user.groupid)>0)?true:false,bookGroup:parseInt(user.groupid),groupListForBook:user.groups,readingFrom:xmpp.remotenode};ubr.isLogged=uobj.isLogged;ubr.profileId=uobj.id;ubr.profileLink=uobj.link;ubr.profileImg=uobj.icon;ubr.profileNick=uobj.nick;ubr.username=uobj.username;ubr.uiView.buildUserChrome();if(uobj.chatParams){ubr.chatParams=uobj.chatParams;}
ubr.bookGroup=uobj.bookGroup;ubr.withGroup=uobj.withGroup;ubr.groupListForBook=uobj.groupListForBook;ubr.readingFrom=uobj.readingFrom;return uobj;},setUser:function(uobj)
{ubr.user=uobj;},setChatParams:function(user,xmpp){var myresource=xmpp.roomname+'pr'+user.id+':'+xmpp.remotedomain;ubr.chatParams={myJID:xmpp.username+'@'+xmpp.domain,myFullJID:xmpp.username+'@'+xmpp.domain+'/'+myresource,myRoomJID:xmpp.roomname+'@'+xmpp.roomserv,myNick:user.nick,myPass:xmpp.token,myResource:myresource,HTTPBASE:xmpp.httpbase,USERNAME:xmpp.username,XMPPDOMAIN:xmpp.domain};},getUser:function(){return{isLogged:ubr.isLogged,profileId:ubr.profileId,profileImg:ubr.profileImg,profileLink:ubr.profileLink,profileNick:ubr.myNick,username:ubr.username,chatParams:ubr.chatParams,withGroup:ubr.withGroup,bookGroup:ubr.bookGroup,groupListForBook:ubr.groupListForBook,readingFrom:ubr.readingFrom};},clearUser:function(){}}
ubr.stateModel={setPanelStates:function(pobj){ubr.panelStates=pobj;},setCustomSizeProfile:function(name,pobj){var newp=dojo.mixin(pobj,{l:-1*(pobj.w/2),rw:0,rh:0});ubr.sizeProfiles[name]=newp;ubr.customSizeProfile=name;},setHash:function(mark){Debug.log('setHash stub called');}}
ubr.epubModel={epub:null,loadOpf:function(x){var meta=x.getElementsByTagName('metadata')[0];var spine=x.getElementsByTagName('spine')[0];var manifest=x.getElementsByTagName('manifest')[0];if(!meta||!spine||!manifest)throw("Malformed EPUB");var epub=this.getEpubObj();epub.spine.ncx=spine.getAttribute('toc');epub.spine.itemrefs=[];var ind=0;dojo.forEach(x.getElementsByTagName('itemref'),function(item){var si={};si.linear=item.getAttribute('linear');si.idref=item.getAttribute('idref');si.ind=ind;epub.spine.itemrefs[si.idref]=si;ind++;});epub.manifest.items=[];var ind=0;dojo.forEach(x.getElementsByTagName('item'),function(item){var i={};i.id=item.getAttribute('id');i.href=item.getAttribute('href');i.mediaType=item.getAttribute('media-type');i.ind=ind;epub.manifest.items[i.id]=i;ind++;});this.epub=epub;try{this.harvestMetas(meta);}catch(e){Debug.log(e);}
return this.epub;},harvestMetas:function(meta)
{dojo.forEach(meta.childNodes,dojo.hitch(this,function(child){if(child.nodeName=='dc-metadata'){this.harvestMetas(child);}else{if(child.nodeName.match(/title$/)){this.epub.bookTitle=dojo.trim(dojox.xml.parser.textContent(child));}else if(child.nodeName.match(/creator$/)){this.epub.bookAuthor=dojo.trim(dojox.xml.parser.textContent(child));}else if(child.nodeName.match(/identifier$/)){this.epub.bookIdentifier=dojo.trim(dojox.xml.parser.textContent(child));}else if(child.nodeName.match(/language$/)){this.epub.bookLanguage=dojo.trim(dojox.xml.parser.textContent(child));}else if(child.nodeName.match(/publisher$/)){this.epub.bookPublisher=dojo.trim(dojox.xml.parser.textContent(child));}else if(child.nodeName.match(/date$/)){this.epub.bookDate=dojo.trim(dojox.xml.parser.textContent(child));}else if(child.nodeName.match(/description$/)){this.epub.bookDescription=dojo.trim(dojox.xml.parser.textContent(child));}}}));},loadNcx:function(x){var useNS=false;var navpoints=x.getElementsByTagName('navPoint');if(!navpoints.length){var navpoints=x.getElementsByTagName('ncx:navPoint');useNS=true;}
var sections=[];var toc='';var i=0;dojo.forEach(navpoints,function(np){if(!useNS){var href=np.getElementsByTagName('content')[0].getAttribute('src');var label=dojo.trim(dojox.xml.parser.textContent(np.getElementsByTagName('navLabel')[0]));}else{var href=np.getElementsByTagName('ncx:content')[0].getAttribute('src');var label=dojo.trim(dojox.xml.parser.textContent(np.getElementsByTagName('ncx:navLabel')[0]));}
sections.push(ubr.getNewSectionObj(href,label));toc+=ubr.getTocEntryHTML(i,sections[sections.length-1]);i++;});var linears=[];for(prop in this.epub.spine.itemrefs){var itemref=this.epub.spine.itemrefs[prop];if(itemref.linear=='yes'||!itemref.linear){linears.push(itemref);}}
var notin=[];dojo.forEach(linears,dojo.hitch(this,function(spineref){var inncx=false;dojo.forEach(sections,dojo.hitch(this,function(section){if(this.epub.manifest.items[spineref.idref].href==section.href.split('#')[0]){inncx=true;}}));if(!inncx){notin.push(spineref);}}));dojo.forEach(notin,dojo.hitch(this,function(ni){var href=this.epub.manifest.items[ni.idref].href;var label=this.epub.bookTitle;sections.push(ubr.getNewSectionObj(href,label));}));this.epub.sections=sections;return sections;},loadJson:function(strdata){this.epub=dojo.fromJson(strdata);return this.epub;},getEpubObj:function(){if(this.epub){return this.epub;}else{return{bookTitle:null,bookAuthor:null,bookIdentifier:null,bookPublisher:null,bookLanguage:null,bookDate:null,bookDescription:null,metadata:{},spine:{itemrefs:{}},manifest:{items:{}},guide:{references:{}},sections:{}}}}}
ubr.selectionCtl={getSelectedHref:function()
{},getSelectionTransport:function(node)
{return{user:ubr.user,mark:ubr.getMark(),data:{text:node.textContent,html:node.innerHTML,bookSelection:ubr.bookSelection}};},selectAsNode:function(node)
{ubr.postJumpSelectionId=null;if(ubr.selectedNode==node){return false;}
var clearedOne=false;var selectedOne=false;if(ubr.bookSelection!=undefined){clearedOne=true;if(ubr.bookSelection){Debug.log(ubr.bookSelection);}
dojo.removeClass(ubr.bookSelection,'bookSelection');ubr.bookSelection=undefined;ubr.selectedNode=undefined;ubr.selectedParagraph=undefined;}
if(clearedOne&&!node){dojo.publish('ubr/events/paragraphDeSelect',[]);return;}
if(!node)return;if(node.nodeType){if(node.getAttribute('ubrid')){var selectedOne=true;ubr.bookSelection=node;ubr.selectedParagraph=parseInt(node.getAttribute('ubrid'),10);dojo.addClass(node,'bookSelection');ubr.selectedNode=node;if(clearedOne){dojo.publish('ubr/events/paragraphSwitchSelect',[ubr.getSelectionTransport(node),node]);}else{dojo.publish('ubr/events/paragraphSelect',[ubr.getSelectionTransport(node),node]);}}}},selectPara:function(event)
{if(event.target.nodeName.toLowerCase()!='p'){var node=event.target.parentNode;var safety=0;while(node.nodeType!=1){safety++;if(safety>10)break;node=node.parentNode;}
if(node.nodeType==1){var selection=node;}}else{var selection=event.target;}
if(!selection)return;if(selection==ubr.selectedNode){ubr.selectAsNode(null);}else{ubr.selectAsNode(selection);}},selectParaById:function(id)
{var nodes=STAGE.book.getElementsByTagName('p');for(var i=0;i<nodes.length;i++){if(nodes[i].getAttribute('ubrid')==(""+id)){ubr.selectAsNode(nodes[i]);break;}}}}
ubr.tocView={buildToc:function(){var toc='No book loaded';if(ubr.sections){if(ubr.sections.length>0){toc='<ul>';for(var i=0;i<ubr.sections.length;i++){toc+=ubr.getTocEntryHTML(i,ubr.sections[i]);}
toc+='</ul>';}
ubr.setTocHTML(toc);dojo.query('.reader-tocitem',STAGE.tocitems).forEach(function(node,index,nodeList){dojo.connect(node,'onmouseover',function(evt){dojo.addClass(node,'reader-section-item-hilite');evt.stopPropagation();});dojo.connect(node,'onmouseout',function(evt){dojo.removeClass(node,'reader-section-item-hilite');evt.stopPropagation();});});dojo.query('.reader-tocsection',STAGE.tocitems).forEach(function(node,index,nodeList){dojo.connect(node,'onmouseover',function(evt){dojo.addClass(node,'reader-section-hilite');evt.stopPropagation();});dojo.connect(node,'onmouseout',function(evt){dojo.removeClass(node,'reader-section-hilite');evt.stopPropagation();});});dojo.query('a',STAGE.tocitems).forEach(function(node){dojo.connect(node,'onclick',function(evt){ubr.navCtl.handleTocClick(evt);});});}else{throw new Exception('sections variable not defined');}},setTocHTML:function(html){STAGE.tocitems.innerHTML=html;},getTocEntryHTML:function(i,secobj){if(secobj.navPoints.length==0){return'<li id="tocitem'+(secobj.playOrder-1)+'" class="reader-tocitem"><a title="Section '+i+'" href="#href('+secobj.src+')">'+secobj.label+'</a></li>';}else{var list='<li class="reader-section-wrap"><span id="tocitem'+(secobj.playOrder-1)+'" class="reader-tocitem reader-tocheading"><a title="Section '+i+'" href="#href('+secobj.src+')">'+secobj.label+'</a></span><ul>';for(var ii=0;ii<secobj.navPoints.length;ii++){list+=this.getTocEntryHTML(i+'-'+ii,secobj.navPoints[ii]);}
return list+'</ul></li>';}},markHrefSelected:function(href){Debug.log('markHrefSelected');if(href.indexOf('#!')){href=href.split('#')[0];}
var qstr='.reader-tocitem a[href="#href('+href+')"]';var nodes=dojo.query(qstr);if(nodes.length>0){var count=0;var up=nodes[0].parentNode;while(up.nodeName.toLowerCase()!='li'){if(count++>10){throw('Something is wrong with the page structure');}
up=up.parentNode;}
ubr.tocView.markTocSelectionByNode(up);return true;}else{return false;}},markTocSelection:function()
{if(!ubr.sectionPointer)ubr.sectionPointer=0;dojo.query('.reader-tocselected',STAGE.tocitems).removeClass('reader-tocselected');dojo.addClass(dojo.byId('tocitem'+ubr.sectionPointer),'reader-tocselected');},markTocSelectionByNode:function(node)
{if(!node)Debug.log('no node to highlight!-->'+node);if(!node)return false;dojo.query('.reader-tocselected',STAGE.tocitems).removeClass('reader-tocselected');dojo.addClass(node,'reader-tocselected');},getLabelForSection:function(href)
{var qstr='.reader-tocitem a[href="#href('+href+')"]';var nodes=dojo.query(qstr);if(nodes.length>0){var count=0;var up=nodes[0].parentNode;while(up.nodeName.toLowerCase()!='li'){if(count++>10){throw('Something is wrong with the page structure');}
up=up.parentNode;}
return up.firstChild.innerHTML;}else{return'not found';}}}
ubr.uiView={makeItFit:function(){console.log('making a better fit for your comfort');if(ubr.resizePending==true){console.log('looks like we already have a resize pending!');}
dojo.style('sizeWarning','display','none');ubr.suspendUI();ubr.autoScale();ubr.panelSlide('L',ubr.panelStates['L'],true);ubr.panelSlide('R',ubr.panelStates['R'],true);ubr.pageView.resetPageView(true);ubr.resizePending=false;},placeOnScreen:function(obj,x,y)
{dojo.style(obj,'position','absolute');dojo.style(obj,'left',x+'px');dojo.style(obj,'top',y+'px');},buildUserChrome:function()
{if(ubr.isLogged){dojo.addClass(STAGE.loginButton,'logout');dojo.connect(STAGE.loginButton,'onclick',ubr.logout);var profilelink=dojo.create('a',{href:ubr.profileLink,target:'_new',title:'Your profile details page (will open a new window)'},dojo.byId('loginPic'));dojo.create('img',{src:ubr.profileImg,alt:ubr.profileNick,height:'18',width:'18',title:'Logged in as '+ubr.profileNick,style:'height:18px;width:18px;border:1px solid #333;padding:1px !important;margin-right:2px !important'},profilelink);}},showPurchasePrompt:function()
{dojo.byId('bookPurchasePromptMsg').innerHTML='You can purchase this for '+ubr.bookPrice;dojo.style(dojo.byId('purchaseThisBook'),'display','block');},hidePurchasePrompt:function()
{dojo.style(dojo.byId('purchaseThisBook'),'display','none');},initUI:function(cb){if(ubr.minimalUI){var hides=[STAGE.loginButton,STAGE.showCodeButton,STAGE.saveButton,dojo.byId('loginPic'),dojo.byId('rightPanel'),dojo.byId('leftPanel'),dojo.byId('authorBar'),dojo.byId('titleBar'),dojo.byId('logo'),dojo.byId('pageTop'),dojo.byId('pageBottom'),dojo.byId('rightStrip'),dojo.byId('leftStrip'),dojo.byId('pageView'),dojo.byId('sectionMenu'),dojo.byId('helpButton')];dojo.forEach(hides,function(hide){dojo.style(hide,'display','none');});ubr.pageDims={position:'absolute',visibility:'hidden',height:'90%',left:'0',overflow:'hidden',paddingTop:'0em',paddingBottom:'0em',top:'0',width:'100%',backgroundColor:'#ffffff',border:'none'};dojo.style(dojo.byId('navWrapInner'),{'width':'100%','left':'0'});}else{dojo.style(STAGE.loginButton,'display','block');dojo.style(STAGE.saveButton,'display','block');dojo.style(STAGE.showCodeButton,'display','block');dojo.connect(dojo.byId("logo"),'onclick',function(e){if(ubr.isXD){e.preventDefault();e.stopPropagation();window.open('http://'+window.location.host);}else{window.location.href='http://'+window.location.host;}});dojo.connect(STAGE.loginButton,'onclick',function(){ubr.authUser();});dojo.connect(STAGE.saveButton,'onclick',function(evt){if(ubr.isXD){evt.stopPropagation();evt.preventDefault();return false;}else{if(ubr.bookId==0){window.history.back();}else{if(ubr.bookGroup>0){window.location.href='http://www.bookglutton.com/bookgroup/show?id='+ubr.bookGroup;}else{window.location.href=ubr.bookDetailLink;return true;}}}});ubr.buildGroupSelect();}
ubr.autoScale();ubr.suspendUI();ubr.initPageSpace();ubr.buildToc();Debug.log('built toc');ubr.uiView.startMouseIdleTimeout();dojo.connect(STAGE.view,'onclick',function(e){ubr.uiView.startMouseIdleTimeout();ubr.showControls();});dojo.subscribe('ubr/events/mouseidle',ubr,function(){ubr.hideControls();});var globalKeyHandler=function(e)
{var k=e.charCode;if(k==63){}else if(k==32){ubr.nextPressed();}
if(e.altKey==true){}
var k=e.keyCode;if(k==e.KEY_RIGHT_ARROW||k==e.KEY_PAGE_DOWN){ubr.nextPressed();}else if(k==e.KEY_LEFT_ARROW||k==e.KEY_PAGE_UP){ubr.prevPressed();}};var disableKeynav=function()
{ubr.allowKeynav=false;}
var enableKeynav=function()
{ubr.allowKeynav=true;}
dojo.connect(STAGE.chat,'onfocus',disableKeynav);dojo.connect(STAGE.note,'onfocus',disableKeynav);dojo.connect(STAGE.chat,'onblur',enableKeynav);dojo.connect(STAGE.note,'onblur',enableKeynav);dojo.connect(dojo.doc,'onkeypress',globalKeyHandler);var getSelText=function(e)
{Debug.log('onmouseup');if(ubr.selectedParagraph)return;var txt='';if(window.getSelection)
{txt=window.getSelection();}
else if(document.getSelection)
{txt=document.getSelection();}
else if(document.selection)
{txt=document.selection.createRange().text;}else return;Debug.log(txt);Debug.log(ubr.paragraphPointer);ubr.lastSelectedText=txt;dojo.publish('ubr/events/rangeSelect',[{user:ubr.getUser(),selection:txt}]);}
if(!ubr.minimalUI){dojo.connect(STAGE.book,'onmouseup',getSelText);dojo.connect(STAGE.notePaneButton,'onclick',function(){ubr.fadePanelSocket('R');ubr.noteOpened=!ubr.noteOpened;});dojo.connect(STAGE.chatPaneButton,'onclick',function(){ubr.fadePanelSocket('L');ubr.chatOpened=!ubr.chatOpened;});dojo.connect(STAGE.sectionTab,'onclick',dojo.hitch(ubr,function(){if(!ubr.isPaginating()&&ubr.UIready){if(ubr.catalogShowing){ubr.uiView.toggleCat();}
ubr.panelSlide('B');ubr.sectionOpened=!ubr.sectionOpened;}}));dojo.connect(STAGE.progMeter,'onmousedown',ubr.progFollow);dojo.connect(STAGE.progMeter,'onmouseup',ubr.progStop);dojo.connect(STAGE.progMeter,'onmousemove',ubr.progUpdateFromMouse);dojo.connect(STAGE.navigatePrev,'onclick',ubr.prevPressed);dojo.connect(STAGE.navigateNext,'onclick',ubr.nextPressed);dojo.connect(STAGE.navigatePrev,'onmouseover',function(){if(!ubr.isPaginating()){dojo.addClass(STAGE.navigatePrev,'ro');}});dojo.connect(STAGE.navigatePrev,'onmouseout',function(){if(!ubr.isPaginating()){dojo.removeClass(STAGE.navigatePrev,'ro');}});dojo.connect(STAGE.navigateNext,'onmouseover',function(){if(!ubr.isPaginating()){dojo.addClass(STAGE.navigateNext,'ro');}});dojo.connect(STAGE.navigateNext,'onmouseout',function(){if(!ubr.isPaginating()){dojo.removeClass(STAGE.navigateNext,'ro');}});dojo.connect(window,'onresize',function(){STAGE.lastBookCoords=dojo.coords(STAGE.book);STAGE.lastViewport=ubr.getViewport();if(!ubr.iphonemode&&!ubr.killIEResizeEvent){ubr.pageView.hideOverflow();ubr.resizePending=setTimeout('ubr.makeItFit()',500);}});}else{window.addEventListener('touchmove',function(e){e.preventDefault();},true);dojo.byId('ubReader').addEventListener('touchmove',function(e){e.preventDefault();if(e.touches.length==1){if(ubr.UIready){if(e.touches[0].pageX>200){ubr.nextPressed();}else if(e.touches[0].pageX<100){ubr.prevPressed();}}}},false);}
dojo.connect(STAGE.catButton,'onclick',function(){ubr.toggleCat();});dojo.connect(STAGE.fontButton,'onclick',ubr.toggleFontSize);ubr.activatePlugins();dojo.connect(STAGE.helpButton,'onclick',function(){var helpwin=window.open(getSfUrl('portal','help'),'readerHelp');helpwin.focus();});if(!ubr.user){}
if(ubr.isLogged){ubr.setUserBoxHTML();dojo.publish('ubr/events/userLoggedIn',[{time:(new Date()).getTime(),user:ubr.getUser()}]);}
dojo.connect(dojo.byId("bookgluttonUserbox"),'onclick',function(){ubr.authUser();});dojo.connect(dojo.byId("showCodeButton"),'onclick',function(){ubr.getWidget();});dojo.query("#codeForThisBook a.cancelwidget").onclick(function(){dojo.style("codeForThisBook","display","none");});dojo.query("#purchaseThisBook a.cancelwidget").onclick(function(){dojo.style("purchaseThisBook","display","none");});dojo.query("#codeForThisBook a.choosewide").onclick(function(){ubr.loadWidgetCode('wide');});dojo.query("#codeForThisBook a.choosenarrow").onclick(function(){ubr.loadWidgetCode('narrow');});if(ubr.panelStates['L']<2){ubr.panelStates['L']=2;}
if(ubr.panelStates['R']<2){ubr.panelStates['R']=2;}
if(ubr.panelStates['L']==2){dojo.style(dojo.byId('leftSocket'),'display','none');}
if(ubr.panelStates['R']==2){dojo.style(dojo.byId('rightSocket'),'display','none');}
Debug.log('panel state of R at UI init is '+ubr.panelStates.R);if(!ubr.isAmznKiller){ubr.panelSlide('L',ubr.panelStates['L'],true);ubr.panelSlide('R',ubr.panelStates['R'],true);}
STAGE.lastBookCoords=dojo.coords(STAGE.book);STAGE.lastViewport=ubr.getViewport();dojo.query("#loginsubmit").onclick(dojo.hitch(this,function(evt){evt.preventDefault();dojo.style(dojo.byId("loginformcontrols"),"display","none");dojo.style(dojo.query("#bookgluttonLogin .bookgluttonFormWorking")[0],"display","block");var handler=dojo.hitch(this,function(data,xobj){if(data.result=='success'){window.location.reload();}else{var working=dojo.query("#bookgluttonLogin .bookgluttonFormWorking")[0];dojo.style(working,"display","none");dojo.style(dojo.byId("loginformcontrols"),"display","block");var errblocs=dojo.query("#bookgluttonLogin .bookgluttonFormError");errblocs.style('display','block');errblocs[0].innerHTML=data.message;}});ubr.sendLogin(dojo.byId("bgloginemail").value,dojo.byId("bgloginpassword").value,handler);return false;}));dojo.query("#logoutsubmit").onclick(function(evt){evt.preventDefault();ubr.sendLogout(dojo.hitch(this,function(){window.location.reload();}));dojo.style(dojo.byId("logoutformcontrols"),"display","none");dojo.style(dojo.query("#bookgluttonLoggedIn .bookgluttonFormWorking")[0],"display","block");});dojo.query("#signupsubmit").onclick(dojo.hitch(this,function(evt){evt.preventDefault();dojo.style(dojo.byId("signupformcontrols"),"display","none");dojo.style(dojo.query("#bookgluttonSignup .bookgluttonFormWorking")[0],"display","block");var handler=dojo.hitch(this,function(data,xobj){if(data.result=='success'){window.location.reload();}else{var working=dojo.query("#bookgluttonSignup .bookgluttonFormWorking")[0];dojo.style(working,"display","none");dojo.style(dojo.byId("signupformcontrols"),"display","block");var errblocs=dojo.query("#bookgluttonSignup .bookgluttonFormError");errblocs.style('display','block');errblocs[0].innerHTML=data.message;}});ubr.createAccount(dojo.byId("bgsignupname").value,dojo.byId("bgsignupemail").value,dojo.byId("bgsignupnews").value,dojo.byId("bgsignuppassword").value,dojo.byId("bgsignuppasswordbis").value,handler);return false;}));dojo.query('#bookgluttonAuth input').onkeypress(function(e){e.stopPropagation();});dojo.query("#bookgluttonAuth a.togglesignup").onclick(function(){dojo.style("bookgluttonLogin","display","none");dojo.style("bookgluttonSignup","display","block");});dojo.query("#bookgluttonAuth a.cancelauth").onclick(function(){dojo.style("bookgluttonLogin","display","none");dojo.style("bookgluttonSignup","display","none");dojo.style("bookgluttonAuth","display","none");ubr.readyUI();});dojo.connect(dojo.byId("navWrap"),'onmouseover',function(){ubr.usingNav=true;});dojo.connect(dojo.byId("navWrap"),'onmouseout',function(){ubr.usingNav=false;});if(cb){cb();}},startMouseIdleTimeout:function()
{if(ubr.mouseIdleTimeout){ubr.uiView.clearMouseIdleTimeout();}
ubr.mouseIdleTimeout=setTimeout(ubr.uiView.fireMouseIdle,ubr.mouseIdleInterval);},fireMouseIdle:function()
{dojo.publish('ubr/events/mouseidle',[{limitReached:ubr.mouseIdleInterval}]);},clearMouseIdleTimeout:function()
{clearTimeout(ubr.mouseIdleTimeout);},msgNotAuthed:function()
{alert("Looks like this is someone else's book. Try logging in first, if they've shared it with you. If that doesn't work, you can request access from the book detail page");ubr.uiView.hideLoadAnim();ubr.enablePageControls();ubr.UIready=true;},msgNoAccess:function()
{alert("Looks like you're logged in but can't see this book because the owner hasn't shared it with you yet. Save and exit the reader and request a share.");},setUserBoxHTML:function()
{var html='';var profhtml='';if(arguments.length>0){html=arguments[0];}else{if(ubr.isLogged){profhtml+='<img src="'+ubr.profileImg+'" alt="'+ubr.profileNick+'"/>'+ubr.profileNick;html+='Logged in as '+ubr.profileNick;}else{html='Log In';}}
dojo.query('#bookgluttonAuth .bgprofile')[0].innerHTML=profhtml;dojo.byId("bookgluttonUserbox").innerHTML=html;},toggleCat:function()
{if(!ubr.UIready)return;if(ubr.catalogShowing){ubr.catalogShowing=false;dojo.removeClass(STAGE.catButton,'selected');ubr.retractFeednav();}else{if(!ubr.globalCatalogURI)return;ubr.catalogShowing=true;var url=ubr.globalCatalogURI;dojo.addClass(STAGE.catButton,'selected');ubr.createFeedNav();ubr.extendFeednav();ubr.nextFeed(url);}},buildGroupSelect:function()
{var selected=0;if(ubr.withGroup){selected=ubr.bookGroup;console.log('sel:'+selected);}else{console.log('not with group');}
var groups=ubr.user.groupListForBook;var ops=[{value:0,label:'Public'}];dojo.forEach(groups,function(group){var newop={value:group.id,label:group.label};ops.push(newop);});var inp=dojo.create('select',{id:"group_id",name:"group_id"},dojo.byId('groupNav'));dojo.forEach(ops,function(op){var opobj={value:op.value,innerHTML:op.label};if(parseInt(op.value)==parseInt(selected)){opobj.selected="selected";}
dojo.create('option',opobj,inp);});dojo.connect(inp,'onchange',function(evt){ubr.changeGroupContext(evt.target.value);return false;});},setBookMetaHTML:function()
{var fleft=dojo.byId('titleText').innerHTML;var fright=dojo.byId('authorText').innerHTML;dojo.byId('titleText').innerHTML=fleft+ubr.bookTitle;dojo.byId('authorText').innerHTML=ubr.bookAuthor+fright;},extendFeednav:function()
{dojo.style(STAGE.feednav,'visibility','visible');dojo.animateProperty({node:STAGE.feednav,duration:200,properties:{height:{end:90,units:'%'}}}).play();},retractFeednav:function()
{dojo.animateProperty({node:STAGE.feednav,duration:200,properties:{height:{end:0}},onEnd:function(){dojo.style(STAGE.feednav,'visibility','hidden');}}).play();},createFeedNav:function()
{if(STAGE.feednav)return;var stobj={position:'absolute',overflow:'hidden',height:'0',width:'46%',left:'27%',top:'0'}
var navtmpl='<div class="atomfeedlist"></div>';var n=dojo.create('div',{innerHTML:'',style:stobj});n.id='feednav';n.appendChild(dojo.create('div',{innerHTML:navtmpl}));dojo.body().appendChild(n);STAGE.feednav=n;},hideLoadAnim:function()
{dojo.style(STAGE.loadanim,"display","none");},showLoadAnim:function()
{dojo.style(STAGE.loadanim,"display","block");},suspendUI:function()
{ubr.UIready=false;ubr.showPageControlsDisabled();ubr.showProgMeterDisabled();},readyUI:function()
{ubr.UIready=false;ubr.updatePageView();ubr.enablePageControls();ubr.updateProgMeter();ubr.uiView.hideLoadAnim();dojo.style(STAGE.pageProg,'opacity','0.0');ubr.UIready=true;},autoScale:function(){if(ubr.customSizeProfile){ubr.scaleLayout(ubr.customSizeProfile);}else{if(ubr.iphonemode){ubr.scaleLayout('iphone');}else{ubr.scaleLayout('current');}}},scaleLayout:function(type)
{if(ubr.isPaginating())return false;var so=ubr.sizeProfiles;var rdr=dojo.byId('ubReader');rdr.setAttribute('style','');if(type=='current'){var c=dojo.coords(rdr);var stobj={height:c.h,width:c.w,left:-1*(c.w/2),marginLeft:'50%'};var st=['height:',c.h,'px;width:',c.w,'px;left:',-1*(c.w/2),'px; margin-left:','50%'];rdr.setAttribute('style',st.join(''));}else if(so[type]){var stobj={height:so[type].h,width:so[type].w,left:so[type].l,marginLeft:'50%'};var st=['height:',so[type].h,'px;width:',so[type].w,'px;left:',so[type].l,'px;margin-left:','50%'];rdr.setAttribute('style',st.join(''));}},enablePageControls:function()
{var oldfadelevel=ubr.pageControlsFadeLevel;ubr.pageControlsShowing=true;ubr.pageControlsEnabled=true;ubr.pageControlsFadeLevel=1.0;ubr.fadePageControls(oldfadelevel,ubr.pageControlsFadeLevel);},hidePageControls:function(cb,cbargs)
{if(!cbargs){var cbargs=[]};var oldfadelevel=ubr.pageControlsFadeLevel;ubr.pageControlsShowing=false;ubr.pageControlsFadeLevel=0.0;ubr.pageControlsEnabled=false;ubr.fadePageControls(oldfadelevel,ubr.pageControlsFadeLevel);if(cb)cb(cbargs);},showPageControlsDisabled:function()
{var oldfadelevel=ubr.pageControlsFadeLevel;ubr.pageControlsShowing=true;ubr.pageControlsFadeLevel=0.5;ubr.pageControlsEnabled=false;dojo.removeClass(STAGE.navigatePrev,'ro');dojo.removeClass(STAGE.navigateNext,'ro');ubr.fadePageControls(oldfadelevel,ubr.pageControlsFadeLevel);},showSectionControlsDisabled:function()
{ubr.fadeSectionControls(ubr.sectionControlsFadeLevel,1.0);},updateSectionStat:function()
{if(!ubr.sectionPointer){dojo.byId('reader-tocheader').innerHTML='';}else{dojo.byId('reader-tocheader').innerHTML='Table of Contents [on  '+(parseInt(ubr.sectionPointer)+1)+'<span class="s-of-s-italic">&nbsp;of&nbsp;</span>'+dojo.query('.reader-tocitem').length+']';}},fadePageControls:function(start,end){ubr.pageControlsFadeLevel=end;if(!ubr.linearMode){dojo.forEach([STAGE.navigateNext,STAGE.catButton,STAGE.navigatePrev,'fontButton','helpButton'],function(node){dojo.animateProperty({node:node,duration:200,properties:{opacity:{start:start,end:end,unit:"px"}}}).play();});}else{dojo.forEach([STAGE.sectionTab,STAGE.catButton,STAGE.navigateNext,STAGE.navigatePrev,'fontButton','helpButton'],function(node){dojo.animateProperty({node:node,duration:200,properties:{opacity:{start:start,end:end,unit:"px"}}}).play();});}},fadeSectionControls:function(start,end){ubr.sectionControlsFadeLevel=end;dojo.forEach([STAGE.sectionTab],function(node){dojo.animateProperty({node:node,duration:200,properties:{opacity:{start:start,end:end,unit:"px"}}}).play();});},hideControls:function(){if(ubr.navShowing&&!ubr.usingNav){dojo.forEach([dojo.byId("navWrap")],function(node){dojo.animateProperty({node:node,duration:200,properties:{bottom:{start:0,end:-41,unit:"px"}}}).play();});ubr.navShowing=false;}},showControls:function(){if(!ubr.navShowing){dojo.forEach([dojo.byId("navWrap")],function(node){dojo.animateProperty({node:node,duration:200,properties:{bottom:{start:-41,end:0,unit:"px"}}}).play();});ubr.navShowing=true;}},getViewport:function(){var _window=dojo.global;var _document=dojo.doc;var w=0,h=0;var de=_document.documentElement;var dew=de.clientWidth,deh=de.clientHeight;if(dojo.isMozilla){var minw,minh,maxw,maxh;var dbw=_document.body.clientWidth;if(dbw>dew){minw=dew;maxw=dbw;}else{maxw=dew;minw=dbw;}
var dbh=_document.body.clientHeight;if(dbh>deh){minh=deh;maxh=dbh;}else{maxh=deh;minh=dbh;}
w=(maxw>_window.innerWidth)?minw:maxw;h=(maxh>_window.innerHeight)?minh:maxh;}else if(!dojo.isOpera&&_window.innerWidth){w=_window.innerWidth;h=_window.innerHeight;}else if(dojo.isIE&&de&&deh){w=dew;h=deh;}else if(dojo.body().clientWidth){w=dojo.body().clientWidth;h=dojo.body().clientHeight;}
var scroll=dojo._docScroll();return{w:w,h:h,l:scroll.x,t:scroll.y};},getWidget:function()
{dojo.query("#codeForThisBook .codebox textarea")[0].innerHTML="[click the size you would like to embed and the code will appear here]";dojo.style("codeForThisBook","display","block");},loadWidgetCode:function(size)
{dojo.style(dojo.query("#codeForThisBook .codebox")[0],"display","none");dojo.style(dojo.query("#codeForThisBook .bookgluttonFormWorking")[0],"display","block");dojo.xhrGet({url:getSfUrl('api','widgetcode')+'?id='+ubr.bookId,load:dojo.hitch(this,function(data,xobj){dojo.style(dojo.query("#codeForThisBook .bookgluttonFormWorking")[0],"display","none");dojo.style(dojo.query("#codeForThisBook .codebox")[0],"display","block");dojo.query("#codeForThisBook .codebox textarea")[0].value=data;})});}}
ubr.feedCtl={loadEpub:function(url)
{var matches=url.match(/(\d+?)\.epub$/i);var bookid=0;if(matches){bookid=matches[1];}
var view=(ubr.isXD)?'ubxd':'ub';var rdr=getSfUrl('reader','unbound')+'?id='+bookid+'&group_id=0&view='+view;if(confirm("You are about to leave this book and open another one. You Sure?")){ubr.close(rdr);}},fetchAtom:function(url)
{ubr.atomHistory.push(ubr.currentUrl);ubr.nextFeed(url);},backAtom:function()
{if(ubr.atomHistory.length==0){return;}
var url=ubr.atomHistory.pop();ubr.nextFeed(url);},nextFeed:function(url)
{var proxy=ubr.feedCtl.getProxyUrl(url);ubr.currentUrl=url;ubr.uiView.showLoadAnim();dojo.xhrGet({url:proxy,load:dojo.hitch(this,function(data,xobj){ubr.uiView.hideLoadAnim();var obj=dojo.fromJson(data);ubr.feedView.makeFeednav(obj);})});},getProxyUrl:function(url)
{return ubr.feedProxyURI+'?url('+url+')';}}
ubr.feedModel={atomxml2obj:function(xml)
{var af={};try{var dom=dojox.xml.parser.parse(xml);af.title=dojox.xml.parser.textContent(dom.getElementsByTagName('title')[0]);af.subtitle=dojox.xml.parser.textContent(dom.getElementsByTagName('subtitle')[0]);af.logo=dojox.xml.parser.textContent(dom.getElementsByTagName('logo')[0]);af.id=dom.getElementsByTagName('id')[0].nodeValue;af.links=[];var linkrels=dom.getElementsByTagName('link');for(var i=0;i<linkrels.length;i++){var link=linkrels[i];try{link.rel=link.getAttribute('rel');link.type=link.getAttribute('type');link.href=link.getAttribute('href');}catch(e){;}
af.links.push(link);}
af.entries=[];var entries=dom.getElementsByTagName('entry');for(var i=0;i<entries.length;i++){var e=entries[i];var eo={};eo.links=[];eo.title=dojox.xml.parser.textContent(e.getElementsByTagName('title').item(0));eo.content={value:""};eo.summary={value:""};try{eo.content.value=dojox.xml.parser.innerXML(e.getElementsByTagName('content')[0]);}catch(ex){eo.summary.value=dojox.xml.parser.innerXML(e.getElementsByTagName('summary')[0]);}
var links=e.getElementsByTagName('link');for(var ii=0;ii<links.length;ii++){var lo={};var link=links[ii];lo.rel=link.getAttribute('rel');lo.type=link.getAttribute('type');lo.href=link.getAttribute('href');eo.links.push(lo);}
af.entries.push(eo);}}catch(e){Debug.log('Exception caught');Debug.log(e.message);}
return af;}}
ubr.feedView={atomToHTML:function(data)
{var isepublink;var isatomlink;var nexthtml='',prevhtml='';var fillTmpl=function(f){var e=['<ul class="atomentries">'];for(var l=0;l<f.links.length;l++){if(f.links[l].rel=='next'){var nextlink="ubr.fetchAtom('"+f.links[l].href+"');return false";nexthtml=['<li class="atomentry" onclick="',nextlink,'"> <div class="atomheader"><a class="atomlink" href="#" onclick="',nextlink,'">More entries</a><br /></div> <div class="atomsummary">More results from this feed</div> </li>'].join('');}else if(f.links[l].rel=='prev'){var prevlink="ubr.fetchAtom('"+f.links[l].href+"');return false";prevhtml=['<li class="atomentry" onclick="',prevlink,'"> <div class="atomheader"><a class="atomlink" href="#" onclick="',prevlink,'">Previous entries</a><br /></div> <div class="atomsummary">Previously viewed results from this feed</div> </li>'].join('');}}
e.push(prevhtml);for(var ii=0;ii<f.entries.length;ii++){var entry=f.entries[ii];var tnimg='';var epublink='';var otherlinks='';var atomlink='';entry.description='Feed Link';if(entry.content){entry.description=entry.content.value;}else if(entry.summary){entry.description=entry.summary.value;}
for(var i=0;i<entry.links.length;i++){var l=entry.links[i];if(l.type=='application/epub+zip'){epublink=ubr.feedView.getEpubLinkHtml(entry,l);}else if(l.type=='application/atom+xml'){atomlink=ubr.feedView.getAtomLinkHtml(entry,l);atomlink=ubr.feedView.getAtomLinkHtml(entry,l);}else if(l.type.match(/^image\//)){tnimg=ubr.feedView.getImageLinkHtml(entry,l);}else if(l.type=='text/html'){}}
if([tnimg,epublink,atomlink,otherlinks].join('').length>0){e.push(['<li class="atomentry">',tnimg,epublink,atomlink,otherlinks,'</li>'].join(''));}}
e.push(nexthtml);e.push(' </ul> ');return['<div class="ubrsection"><br />',e.join(''),'</div>'].join('');}
var res=fillTmpl(data);return res;},getEpubLinkHtml:function(entry,l)
{var link="ubr.loadEpub('"+l.href+"');return false";return['<div class="atomheader"><a class="epublink" href="#" onclick="',link,'">',entry.title,'</a><br /></div> <div class="atomsummary">',entry.description,'</div>'].join('');},getAtomLinkHtml:function(entry,l)
{var link="ubr.fetchAtom('"+l.href+"');return false";return['<a class="atomlink" href="#" onclick="',link,'">',entry.title,'</a> <div class="atomsummary">',entry.description,'</div>'].join('');},getImageLinkHtml:function(entry,l)
{if(l.rel=='x-stanza-cover-image-thumbnail'){return'<img src="'+l.href+'" alt="icon" style="" />';}else if(l.rel=='http://opds-spec.org/thumbnail'){return'<img src="'+l.href+'" alt="icon" style="" />';}else{return'<img src="'+l.href+'" alt="icon" style="" />';}},getHtmlLinkHtml:function(entry,l)
{var link=l.href;return['<a href="',link,'" target="_new">',entry.title,'</a> <div class="atomsummary">',entry.description,'</div>'].join('');},makeFeednav:function(obj){var logo='';if(obj.logo){logo='<img class="atomlogo" src="'+obj.logo+'" alt="logo" />';}
if(obj.title){var title=obj.title;}else{var title='Untitled';}
STAGE.feednav.innerHTML=['<div class="atomfeed"> <div class="ubrheader" style="text-align:left"><a title="Close the feed navigator" href="#" onclick="ubr.toggleCat();return false;"><img src="https://api.readsocial.net/ubrx/default/images/reader-button-blind-up.png" alt="Close this" style="float:right" /></a>',logo,' <span class="feed-heading-lg">Catalogs</span><div class="feedtitle"><div class="backlink"><a title="Back to previously loaded feed" href="#" onclick="ubr.backAtom();return false;"><img src="https://api.readsocial.net/ubrx/default/images/catalogicon-back.png" alt="Back to previous feed" /></a></div><div class="atom-cat-title">',title,'</div></div></div><div class="atomfeedlist"></div></div>'].join('');dojo.query(".atomfeed .atomfeedlist")[0].innerHTML=ubr.feedView.atomToHTML(obj);if(ubr.atomHistory.length==0){dojo.query(".atomfeed .backlink").style('visibility','hidden');}else{dojo.query(".atomfeed .backlink").style('visibility','visible');}}}
String.prototype.htmlDec=function(){var str=this.replace(/&amp;/g,"&");str=str.replace(/&lt;/g,"<");str=str.replace(/&gt;/g,">");str=str.replace(/&quot;/g,"\"");return str;};UbrAnno=function(id)
{this.loadedPageIsMarked=false;this.firstCallForPaginationMade=false;this.noteIndex;this.maxNoteBodyChars=900;this.currentRange='';this.currentSelection=null;this.maxResponseBodyChars=500;this.currentFeed=getSfUrl('note','list');this.feedGetCriteria={};this.feedPostCriteria={};this.pNodes=[];this.pNodeIds=[];this.notesById={};this.feedContext='all'
this.noteDisplayedContainer=null;Debug.log('anno plugin instantiated with id '+id);this.pluginId=id;this.attachPoint=null;dojo.subscribe('ubr/plugins/'+id+'/nodeready',this,function(){Debug.log('anno plugin received publication with args');Debug.log('attachPoint:'+arguments[0].id);if(!arguments[0])throw'Cannot initialize anno plugin';this.attachPoint=arguments[0];arguments[0].innerHTML='<div id="feedContext"> <label>Filter By:</label> <select id="feedContextVal">  </select> </div><div id="selectionContext"><div><label>Range:</label>&nbsp;<span id="selectionContextVal"><b>Whole Book</b><i>(select a paragraph to comment)</i></span>&nbsp;</div></div><div id="noteContent" class="noteView"></div><!-- noteLoginRequired -->  <div id="noteLoginRequired"  class="noteView"> <br /> <p>To make notes on this paragraph, you need to be logged in. <a href="#login" onclick="ubr.authUser();return false;">Log in now</a>, or <a href="#signup" onclick="ubr.authUser(true);return false;">sign up</a>. It'+"'"+'s quick and easy, and totally free. <br /><br /> Once you'+"'"+'re logged in, you'+"'"+'ll be able to annotate (make comments), chat with other readers, and bookmark your place in the text.</p><br /> </div><!-- noteDownload --> <div id="noteDownload"  class="noteView"><p>Waiting on note data...</p></div><!-- waitOnPaginate --> <div id="waitOnPaginate"  class="noteView"><p>Waiting on pagination...</p></div><!-- waitOnNoteData --> <div id="waitOnNoteData"  class="noteView"><p>Waiting on note data...</p></div><!-- noteMakeComment --> <div id="noteMakeComment"  class="noteView"> <div id="noteMakeCommentHead"> <strong>MAKE A COMMENT</strong>&nbsp;<img alt="Reader-rr-flourish" src="https://api.readsocial.net/ubrx/default/images/reader-rr-flourish.png" /></div> <br /> <p>Leave a comment on this paragraph. Readers can respond to your post as they come across it.</p><br/> <div id="noteMakeCommentPostName"> <br/> <strong>TITLE OF YOUR COMMENT?</strong> <br/> <textarea id="newNoteTitle"></textarea><br /> <br/> <strong>WHAT ARE YOU THINKING?</strong><br /> <textarea id="newNoteBody" style="height:90px;margin-bottom:10px"></textarea> </div> <div id="noteMakeCommentChrlimit"> <span id="read-response-chrcount" class="read-response-chrlimit">900</span> <span class="read-response-chrtext">CHARACTERS LEFT</span> </div> <br/> <div id="noteMakeCommentWho"> </div> <div id="noteMakeCommentButton"><input id="noteButtonSubmitComment" type="image" src="https://api.readsocial.net/ubrx/default/images/reader-note-markit-button.png" /></div> <div id="noteMakeCommentSkipit"> <p>Or skip it and read other comments:</p> <input id="noteButtonSkipIt" type="image" src="https://api.readsocial.net/ubrx/default/images/reader-note-readothers-button.png" /> </div> </div><!-- noteReadComment --><div id="noteReadComment" class="noteView"> <div id="noteReadCommentHelp"><strong>READ A COMMENT</strong>&nbsp;<img alt="Reader-rr-flourish" src="https://api.readsocial.net/ubrx/default/images/reader-rr-flourish.png" /><br /><p>Select a comment. Respond. Repeat.</p></div><div id="noteReadCommentList"></div><div id="noteReadCommentSkipit"> <input id="noteButtonSkipAndMake" type="image" src="https://api.readsocial.net/ubrx/default/images/reader-note-makecomment.png"/> </div></div><!-- noteReadRespond --><div id="noteReadRespond"  class="noteView">   <div id="noteReadRespondCRContainer">      <div>      <strong>READ</strong>&nbsp;<img alt="Reader-rr-flourish" src="https://api.readsocial.net/ubrx/default/images/reader-rr-flourish.png"/>      </div>      <div id="noteReadRespondComment"> </div>       <div id="noteReadRespondResponses"></div>    </div>      <div style="max-height:20%;min-height:3em;">      <div>      <p><strong>RESPOND</strong></p> <textarea id="ReadRespondResponse" style="height:inherit;margin-bottom:10px"></textarea>      </div>      <div id="noteReadResponseChrlimit"> <span id="response-chrcount" class="read-response-chrlimit">500</span> <span class="read-response-chrtext">CHARACTERS LEFT</span> </div>            <div id="noteReadResponseButtons"> <input id="noteButtonResponseBack" type="image" class="noteButtonLeft" alt="Reader-note-back-button" src="https://api.readsocial.net/ubrx/default/images/reader-note-back-button.png" /> <input id="noteButtonResponsePost" type="image" class="noteButtonRight" alt="Reader-note-respond-button" src="https://api.readsocial.net/ubrx/default/images/reader-note-respond-button.png"/> </div>   </div>   </div><!-- noteNoComment --> <div id="noteNoComment"  class="noteView"> <strong>NO COMMENTS YET</strong>&nbsp;<img alt="Reader-rr-flourish" src="https://api.readsocial.net/ubrx/default/images/reader-rr-flourish.png" /> <br/> <p>There are no comments on this yet...</p><br/> <p>You can say something about any paragraph right now and kick off a discussion.</p><br/> <p>What are your thoughts on this part of the book? Tell us what you <em>really</em> think.</p><br/><input id="noteButtonMakeComment" type="image" src="https://api.readsocial.net/ubrx/default/images/reader-note-makecomment.png" /></div><!-- noteSummary --> <div id="noteSummary" class="noteView"><div><strong>ANNOTATIONS (NOTES)</strong> <img alt="Reader-rr-flourish" src="https://api.readsocial.net/ubrx/default/images/reader-rr-flourish.png"/> <br/> </div><div id="noteCountPane"><div id="noteTotals"> </div><div id="noteCounts"> </div><div><p>You can add your own notes by selecting a paragraph and typing them in here.</p></div></div></div>';this.init();});this.withGroup=false;this.viewActive=true;this.connectUI=function(){if(ubr.withGroup){this.withGroup=1;this.feedContext="group";var optiongroup=dojo.byId('feedContextVal').appendChild(dojo.doc.createElement('option'));dojo.attr(optiongroup,"value","group");optiongroup.innerHTML='Group Notes';var optionmine=dojo.byId('feedContextVal').appendChild(dojo.doc.createElement('option'));dojo.attr(optionmine,"value","private");optionmine.innerHTML='Private Notes';}else{this.withGroup=0;this.feedContext="all";var optionall=dojo.byId('feedContextVal').appendChild(dojo.doc.createElement('option'));dojo.attr(optionall,"value","all");optionall.innerHTML='Public Notes';var optionmine=dojo.byId('feedContextVal').appendChild(dojo.doc.createElement('option'));dojo.attr(optionmine,"value","private");optionmine.innerHTML='Private Notes';}
dojo.connect(dojo.byId('noteButtonResponseBack'),'onclick',dojo.hitch(this,function(){this.setNoteState("noteReadComment");}));dojo.connect(dojo.byId('feedContextVal'),'onchange',dojo.hitch(this,function(){this.feedContext=dojo.byId('feedContextVal').value;Debug.log('changed feed context to '+this.feedContext);this.hideMarks();this.getList();}));dojo.connect(dojo.byId('noteButtonResponsePost'),'onclick',dojo.hitch(this,function(){this.addResponse();}));dojo.forEach(['onchange','onkeyup','onkeydown','onmouseout'],function(evt){dojo.connect(dojo.byId('newNoteBody'),evt,dojo.hitch(this,function(){textCounter(dojo.byId('newNoteBody'),dojo.byId('read-response-chrcount'),900);}));});dojo.forEach(['onchange','onkeyup','onkeydown','onmouseout'],function(evt){dojo.connect(dojo.byId('ReadRespondResponse'),evt,dojo.hitch(this,function(){textCounter(dojo.byId('ReadRespondResponse'),dojo.byId('response-chrcount'),500);}));});dojo.forEach([dojo.byId('noteButtonMakeComment'),dojo.byId('noteButtonSkipAndMake')],dojo.hitch(this,function(div){dojo.connect(div,'onclick',dojo.hitch(this,function(){if(this.currentSelection){if(this.currentSelection.user.isLogged){this.setNoteState('noteMakeComment');}else{this.setNoteState('noteLoginRequired');}}else{alert('Notes are always attached to paragraphs. Select any paragraph to comment on it.');}}));}));dojo.connect(dojo.byId('noteButtonSubmitComment'),'onclick',dojo.hitch(this,function(){if(this.currentSelection.user.isLogged){this.submitNote();}else{this.setNoteState('noteLoginRequired');}}));dojo.connect(dojo.byId('noteButtonSkipIt'),'onclick',dojo.hitch(this,function(){this.setNoteState('noteReadComment');}));dojo.query("textarea",this.attachPoint).connect('onkeypress',function(evt){if(evt.charCode==32){evt.stopPropagation();}});}
this.connectSubscribers=function(){dojo.subscribe('ubr/events/pageView',this,function(){this.pNodes=dojo.query('p',STAGE.book);Debug.log('pageView event caught by anno, calling markAnnotatedParas');this.markAnnotatedParas();});dojo.subscribe('ubr/events/pageUnload',this,function(){this.hideMarks();this.currentSelection=null;});dojo.subscribe('ubr/events/paragraphSelect',this,function(){if(ubr.panelStates['R']<4){ubr.fadePanelSocket('R');}
Debug.log('paragraphSelect');this.currentSelection=arguments[0];dojo.byId('selectionContextVal').innerHTML='<b>Selected Passage</b><i>(deselect for whole book)</i>';this.selectedHref=this.currentSelection.mark.currentFile+'#!'+this.currentSelection.mark.selectedParagraph+'p:0';this.feedGetCriteria={};this.feedPostCriteria={};this.getList();});dojo.subscribe('ubr/events/paragraphSwitchSelect',this,function(){Debug.log('paragraph Switch');this.currentSelection=arguments[0];this.selectedHref=this.currentSelection.mark.currentFile+'#!'+this.currentSelection.mark.selectedParagraph+'p:0';dojo.byId('selectionContextVal').innerHTML='<b>Selected Passage</b><i>(deselect for whole book)</i>';this.feedGetCriteria={};this.feedPostCriteria={};if(!ubr.isPaginating()){this.getList();}});dojo.subscribe('ubr/events/paragraphDeSelect',this,function(){Debug.log('paragraphDeSelect');dojo.byId('selectionContextVal').innerHTML='<b>Whole Book</b><i>(select a paragraph to comment)</i>';this.currentSelection=null;this.selectedHref=null;if(!ubr.isPaginating()){this.setNoteState('waitOnNoteData');this.getList();}});dojo.subscribe('ubr/events/sectionView',this,function(){});dojo.subscribe('ubr/plugins/'+this.pluginId+'/nodefadeOutStart',this,function(){});dojo.subscribe('ubr/plugins/'+this.pluginId+'/nodefadeInStart',this,function(){});dojo.subscribe('ubr/plugins/'+this.pluginId+'/nodefadeInEnd',this,function(){if(!ubr.isPaginating()){this.getList();}else{this.setNoteState('waitOnPaginate');}});}
this.init=dojo.hitch(this,function(){this.feedContext=dojo.byId('feedContextVal').value;this.connectUI();this.connectSubscribers();Debug.log('note pane UI initialized');});this.getFeedUrl=function()
{return this.currentFeed+'?'+dojo.objectToQuery(this.feedGetCriteria);}
this.showPage=function(url)
{var plug=ubr.getPluginByName('note');plug.currentFeed=url.split('?')[0];plug.feedGetCriteria=dojo.queryToObject(url.split('?')[1]);plug.getList();}
this.submitNote=function()
{if(dojo.byId('newNoteTitle').value==''){alert('You must provide a title for the comment');return;}
if(dojo.byId('newNoteBody').value==''){alert('You must provide a comment');return;}
var withgroup=this.currentSelection.user.bookGroup;var who=(dojo.byId('newNoteWho').checked)?'private':(withgroup)?'group':'everyone';var note=this.feedGetCriteria;note.epub_id=ubr.epubId;note.hrefs=undefined;if(this.currentSelection){note.href=this.selectedHref;Debug.log('selected href for transport is '+note.href);}else{note.href=undefined;}
if(this.feedContext=='private'){note.by='private';}else if(this.feedContext=='group'){note.by='group';note.group_id=ubr.bookGroup;}else{note.by=undefined;note.group_id=undefined;}
note.fmt='json';var content=note;content.pselection=ubr.selectedParagraph;content.title=dojo.byId('newNoteTitle').value;content.body=dojo.byId('newNoteBody').value;if(withgroup){content.grouponly=1;}else{content.grouponly=0;}
if(who=='private'){content.isprivate=1;}else{content.isprivate=0;}
content.rangeLeft=0;content.rangeRight=0;var postIt=dojo.hitch(this,function(){this.setNoteState('waitOnNoteData');dojo.xhrPost({url:getSfUrl('note','add'),content:content,encoding:'utf-8',load:dojo.hitch(this,function(data,evt)
{Debug.log(data);Debug.log(evt);this.currentFeed=getSfUrl('note','list');this.feedGetCriteria={};this.feedPostCriteria={};this.hideMarks();this.setNoteState('waitOnNoteData');this.getList();})});dojo.byId('newNoteTitle').value='';dojo.byId('newNoteBody').value='';});if(!content.isprivate&&this.feedContext=='all'){if(confirm('You are about to make this note public. It will be visible to everyone who comes to the site. If you do not want to do this, cancel now.')){postIt();}}else{postIt();}}
this.getList=function(){if(this.noteDisplayedContainer!='noteReadRespond'){this.setNoteState('noteReadComment');this.selectedNoteId=null;}
var url=this.currentFeed;var note=this.feedGetCriteria;if(!this.postJumpNoteId){note.note_id=undefined;}
note.epub_id=ubr.epubId;note.hrefs=undefined;if(this.currentSelection){note.href=this.selectedHref;Debug.log('selected href for transport is '+note.href);}else{note.href=undefined;}
if(this.feedContext=='private'){note.by='private';}else if(this.feedContext=='group'){note.by='group';note.group_id=ubr.bookGroup;}else{note.by=undefined;note.group_id=undefined;}
note.fmt='json';var content=note;dojo.xhrGet({url:url,content:content,encoding:'utf-8',load:dojo.hitch(this,function(data,evt){this.notesLoaded=true;if(this.noteHandlerWrapper(data,evt)){var entrycount=0;var entrycount=this.notesHolder.entries.length;if(entrycount>0){var html='';dojo.forEach(this.notesHolder.entries,dojo.hitch(this,function(entry){html+='<div class="noteItem">';entry.href='';entry.responses='';var handler='';dojo.forEach(entry.links,function(link){if(link.rel=='alternate'){entry.href=link.href;entry.note_id=entry.href.split('note_id=')[1].split('&')[0];handler='onclick="ubr.note().showNote(this,'+"'"+entry.href+"'"+');return false;"';}else if(link.rel=='related'){if(link.title){entry.responses=link.title;}
handler='onclick="ubr.note().showNote(this,'+"'"+entry.href+"'"+');return false;"';}});html+='<div><a href="#" '+handler+'>';html+=entry.title+'</a><br/>&nbsp;&nbsp;&nbsp;['+entry.responses+']&nbsp;</div>';html+='</div>';this.notesById[entry.note_id]=entry;}));dojo.forEach(this.notesHolder.links,function(link){if(link.rel=='previous'){html+='<p><a href="#" onclick="ubr.note().showPage(\''+link.href+'\');return false;">'+link.title+'</a></p>';}else if(link.rel=='next'){html+='<p><a href="#" onclick="ubr.note().showPage(\''+link.href+'\');return false">'+link.title+'</a></p>';}});dojo.byId('noteReadCommentList').innerHTML=html;if(ubr.postJumpNoteId){this.displayId(ubr.postJumpNoteId);ubr.postJumpNoteId=null;}else{if(this.noteDisplayedContainer!='noteReadRespond'){this.setNoteState('noteReadComment');}
this.markAnnotatedParas();}}else{this.setNoteState('noteNoComment');}
this.postJumpNoteId=null;this.postJumpShowNotes=false;}else{Debug.log('ERROR: noteHandlerWrapper returned false');}}),timeoutSeconds:ubr.ajaxTimeout,timeout:function(data,evt){alert('Error:timed out waiting for server. Slow connection?');}});}
this.setPostJumpNoteId=function(id)
{this.postJumpNoteId=id;this.postJumpShowNotes=true;}
this.showNote=function(el,href)
{var id=href.split('note_id=')[1].split('&')[0];this.displayId(id);if(!this.currentSelection){this.loadHrefForShownNote();}}
this.loadHrefForShownNote=function()
{var h=dojo.query('a.ubrnote-balloon-hreflink',dojo.byId('noteReadRespond'))[0].getAttribute('href');var cmd=h.substr(h.indexOf('#')+1);if(cmd.indexOf('#')>-1){var par=ubr.navCtl.getParaFromFragId(cmd.split('#')[1]);ubr.postJumpSelectionId=parseInt(par,10);ubr.navCtl.runCommand(cmd);}}
this.displayId=function(id)
{this.selectedNote=id;this.selectedNoteId=id;html='';html+='<div class="noteDetailBanner"><span class="giantAsterisk"><img src="https://api.readsocial.net/ubrx/default/images/giant-asterisk.gif" border="0" width="18" height="16" /></span>';html+='<span class="noteDetailHead"></span></div>';html+='<div class="noteDetailBody">'+this.notesById[id].content.htmlDec()+'</div>';html+='<div class="noteDetailPoster"></div>';dojo.byId('noteReadRespondComment').innerHTML=html;dojo.query('a.ubrnote-balloon-hreflink',dojo.byId('noteReadRespond')).connect('onclick',this,function(e){e.preventDefault();e.stopPropagation();var hash=e.target.hash.substr(1);ubr.navCtl.runCommand(hash);});this.setNoteState('noteReadRespond');this.retrieveResponses();}
this.addResponse=function()
{var plugin=ubr.getPluginByName('note');if(!ubr.getUser().isLogged){plugin.setNoteState('noteLoginRequired');}
var note=this.feedGetCriteria;note.epub_id=ubr.epubId;note.hrefs=undefined;if(this.currentSelection){note.href=this.selectedHref;Debug.log('selected href for transport is '+note.href);}else{note.href=undefined;}
if(this.feedContext=='private'){note.by='private';}else if(this.feedContext=='group'){note.by='group';note.group_id=ubr.bookGroup;}else{note.by=undefined;note.group_id=undefined;}
note.fmt='json';var content=note;content.note_id=plugin.selectedNoteId;Debug.log('selected note id is '+content.note_id);content.body=dojo.byId('ReadRespondResponse').value;dojo.byId('ReadRespondResponse').value='';dojo.xhrPost({url:getSfUrl('note','respond'),content:content,encoding:'utf-8',load:dojo.hitch(this,this.handleResponsesResult)});}
this.retrieveResponses=function()
{var plugin=ubr.getPluginByName('note');var note=this.feedGetCriteria;note.epub_id=ubr.epubId;note.hrefs=undefined;note.href=undefined;note.by=undefined;note.group_id=undefined;note.fmt='json';var content=note;content.note_id=plugin.selectedNoteId;dojo.xhrGet({url:getSfUrl('note','responses'),content:content,encoding:'utf-8',load:dojo.hitch(this,this.handleResponsesResult)});}
this.handleResponsesResult=function(data,evt)
{var plug=ubr.getPluginByName('note');if(plug.responseHandlerWrapper(data,evt)){var responsedata=dojo.fromJson(data);var html='';var respcount=0;dojo.forEach(responsedata.responses,function(response){html+=plug.makeResponseDetail(response);respcount++;});if(respcount>0){dojo.byId('noteReadRespondResponses').innerHTML=html;}else{dojo.byId('noteReadRespondResponses').innerHTML='no responses';}}}
this.responseHandlerWrapper=function(data,evt)
{if(evt.xhr.status!=200){alert('Error getting note or note response data:'+evt.status);return false;}else{return true;}}
this.noteHandlerWrapper=function(data,evt)
{if(evt.xhr.status!=200){alert('Error getting note or note response data:'+evt.status);return false;}else{try{this.notesHolder=dojo.fromJson(data);}catch(e){alert('Error with data received. Please try again later. ('+e.message+')');return false;}
return true;}}
this.makeResponseDetail=function(response)
{var html='';html+='<div class="noteDetailResponseBody">';html+=response['body']+'</div>';html+='<div class="noteDetailResponsePoster">';html+='&mdash;'+response['poster']+'</div>';return html;}
this.setNoteState=function(state)
{if(!dojo.byId(state)){return false;}
var dc=dojo.byId(this.noteDisplayedContainer);this.noteDisplayedContainer=state;dojo.query('.noteView',this.attachPoint).style({opacity:'1.0',display:'none',visibility:'hidden'});if(dc){if(state=='noteMakeComment'){var whodiv=dojo.byId('noteMakeCommentWho');var withgroup=this.currentSelection.user.withGroup;var whoviews=(!withgroup)?'the public':'your group';var checked=(this.feedContext=='private')?'checked="checked"':'';whodiv.innerHTML='<input id="newNoteWho" type="checkbox"'+checked+' />Keep Private (Use Private Filter above to get back to it - Private notes are not visible by '+whoviews+')';}
dojo.style(state,'display','block');dojo.style(state,'visibility','visible');dojo.style(state,'opacity','1.0');}}
this.markAnnotatedParas=function(){Debug.log('markAnnotatedParas');if(this.loadedPageIsMarked==false){this.getNoteCounts();this.loadedPageIsMarked=true;}else{Debug.log('page has already been marked or view not active');}}
this.getNoteCounts=function()
{Debug.log('getNoteCounts');var hrefs=[];this.pNodes.forEach(function(pnode){var h=ubr.currentFile+'#!'+pnode.getAttribute('ubrid')+'p:0';hrefs.push(h);});if(hrefs.length>0){var note=this.feedGetCriteria;note.epub_id=ubr.epubId;note.hrefs=undefined;if(this.currentSelection){note.href=this.selectedHref;Debug.log('selected href for transport is '+note.href);}else{note.href=undefined;}
if(this.feedContext=='private'){note.by='private';}else if(this.feedContext=='group'){note.by='group';note.group_id=ubr.bookGroup;}else{note.by=undefined;note.group_id=undefined;}
note.fmt='json';var content=note;content.hrefs=hrefs.join('###');dojo.xhrPost({url:getSfUrl('note','count'),content:content,load:dojo.hitch(this,function(data,e){this.markParas(dojo.fromJson(data));}),error:function(){}});}else{Debug.log('no hrefs to process');}}
this.markParas=function(counts){Debug.log(counts);this.pNodes.forEach(function(pnode){var ubrid=pnode.getAttribute('ubrid');var count=parseInt(counts[ubr.currentFile+'#!'+ubrid+'p:0'],10);if(count>0)
{var nc=dojo.coords(pnode);var x=nc.x+nc.w+10;var y=nc.y+10;if(!dojo.byId('asterisk'+ubrid)){var div=dojo.doc.createElement('div');div.id='asterisk'+ubrid;div.setAttribute('class','notemarker');div.innerHTML='*'+'<span class="notecount-small">'+count+'</span>';var ast=dojo.body().appendChild(div);}else{var ast=dojo.byId('asterisk'+ubrid);ast.innerHTML='*'+'<span class="notecount-small">'+count+'</span>';}
dojo.style(ast,{position:'absolute',top:y+'px',left:x+'px',visibility:'visible'});}});}
this.hideMarks=function(){Debug.log('hiding marks');var pMarks=dojo.query('.paragraph-number',dojo.doc);pMarks.forEach(function(node){dojo.style(node,'visibility','hidden');});Debug.log(this.pNodes.length+' found');dojo.forEach(this.pNodes,function(pnode){var ubrid=pnode.getAttribute('ubrid');if(dojo.byId('asterisk'+ubrid)){dojo.style(dojo.byId('asterisk'+ubrid),'visibility','hidden');}
if(dojo.byId('paragraph-numbering-'+ubrid)){dojo.style(dojo.byId('paragraph-numbering-'+ubrid),'visibility','hidden');}});this.loadedPageIsMarked=false;}}
var __BG_CHATNODE;UbrMuc=function(id)
{Debug.log('chat plugin instantiated with id '+id);dojo.subscribe('ubr/plugins/'+id+'/nodeready',this,function(){if(!arguments[0])throw'Cannot initialize chat plugin';__BG_CHATNODE=arguments[0];this.rosterShowing=true;});dojo.subscribe('ubr/events/userLoggedIn',this,function(a){var time=a.time;});dojo.subscribe('ubr/events/userLoggedOut',this,function(a){});this.UIinited=false;this.init=function(u){this.initSession();return true;if(!u){console.warn('no user is defined, cannot init chat');return;}
dojo.byId("profileImg").getElementsByTagName('img')[0].src=u.profileImg;var x=u.chatParams;this.isLogged=u.isLogged;this.readingFrom=u.readingFrom;this.myJID=x.myJID;this.myFullJID=x.myFullJID;this.myRoomJID=x.myRoomJID;this.myNick=x.myNick;this.myPass=x.myPass;this.myResource=x.myResource;this.HTTPBASE=x.HTTPBASE;this.USERNAME=x.USERNAME;this.XMPPDOMAIN=x.XMPPDOMAIN;this.initSession();}
this.initSession=function(){this.initUI();return false;this.connectionArg={oDbg:ChatDebug,allow_plain:true,httpbase:'/http-bind/',timerval:300};this.connectArg={domain:this.XMPPDOMAIN,username:this.USERNAME,resource:this.myResource,pass:this.myPass,register:false,authhost:this.XMPPDOMAIN,authtype:'sasl',port:5222,secure:true,wait:300};this.XMPPSUBDOMAIN='conference';this.XMPPROOM='testroom';this.XMPPME=this.USERNAME+'@'+this.XMPPDOMAIN+'/'+this.myResource;this.XMPPMEBARE=this.USERNAME+'@'+this.XMPPDOMAIN;this.XMPPROOMBARE=this.XMPPROOM+'@'+this.XMPPSUBDOMAIN+'.'+this.XMPPDOMAIN;this.myFullRoomJID=this.myRoomJID+'/'+this.myNick;this.room={};this.roomRoster={};this.roomMessages=[];this.offlineMessages=[];this.groupchatRcvd=false;if(!this.UIinited){this.initUI();}
if(this.isLogged){this.connect();}}
this.initUI=function(){return false;var emoticons=new Object();this.emoticons=emoticons;this.emoticonpath='/images/emoticons/rythmbox';this.localDebugOverride=false;if(ubr.Debug&&!this.localDebugOverride){Debug=new JSJaCConsoleLogger();}
JSJaCMessage.prototype.hasBodyXHTML=function(){return this.getChild('body','http://www.w3.org/1999/xhtml');}
JSJaCMessage.prototype.getBodyXHTML=function(){if(this.hasBodyXHTML){return this.getChild('body','http://www.w3.org/1999/xhtml');}};this.con=new JSJaCHttpBindingConnection(this.connectionArg);this.con.registerHandler('onconnect',dojo.hitch(this,this.handleConnect));this.con.registerHandler('ondisconnect',dojo.hitch(this,this.handleDisconnect));this.con.registerHandler('presence',dojo.hitch(this,this.handlePresence));this.con.registerHandler('message',dojo.hitch(this,this.handleMessage));this.con.registerHandler('iq',dojo.hitch(this,this.handleIq));this.con.registerHandler('onError',dojo.hitch(this,this.handleOnError));this.inRoom=false;this.context='book';this.presenceShow='offline';dojo.connect(dojo.byId("showRoster"),'onmouseover',function(){dojo.addClass(dojo.byId("showRoster"),'focused');});dojo.connect(dojo.byId("showRoster"),'onmouseout',dojo.hitch(this,function(){if(!this.rosterShowing){dojo.removeClass(dojo.byId("showRoster"),'focused');}}));dojo.connect(dojo.byId('reader-sayit'),'onmousedown',dojo.hitch(this,function(){this.submitClicked();}));dojo.connect(dojo.byId("chatInput"),'onfocus',function(){dojo.addClass(dojo.byId("chatInput"),'focused');});dojo.connect(dojo.byId("chatInput"),'onblur',function(){dojo.removeClass(dojo.byId("chatInput"),'focused');});dojo.connect(dojo.byId('showRoster'),'onclick',dojo.hitch(this,function(){if(this.rosterShowing){dojo.removeClass(dojo.byId("showRoster"),'focused');dojo.animateProperty({properties:{opacity:{start:'1.0',end:'0'}},duration:200,node:dojo.byId('roomRoster'),onEnd:function(){dojo.style(dojo.byId('chatLog'),'overflow','auto');dojo.style(dojo.byId('roomRoster'),'visibility','hidden');}}).play();this.rosterShowing=false;}else{dojo.addClass(dojo.byId("showRoster"),'focused');dojo.style(dojo.byId('chatLog'),'overflow','hidden');dojo.style(dojo.byId('roomRoster'),'top',dojo.coords(dojo.byId('chatLog')).t+'px');dojo.style(dojo.byId('roomRoster'),'opacity','1.0');dojo.style(dojo.byId('roomRoster'),'visibility','visible');this.rosterShowing=true;}}));dojo.connect(dojo.byId('chatInput'),'onclick',this.clearChatInput);dojo.connect(dojo.byId('chatInput'),'onkeypress',dojo.hitch(this,this.handleTypingEvent));dojo.connect(dojo.byId('range'),'onchange',dojo.hitch(this,this.changeContext));dojo.subscribe('ubr/events/pageView',this,function(){});dojo.subscribe('ubr/events/pageUnload',this,function(){});dojo.subscribe('ubr/events/paragraphSelect',this,function(){if(this.con.connected()&&this.inRoom){var arg=arguments[0];}});dojo.subscribe('ubr/events/paragraphDeSelect',this,function(){});dojo.subscribe('ubr/events/sectionView',this,function(){if(this.con.connected()&&this.groupchatRcvd){if(arguments.length>0){this.announceEvent('/me has gone to '+arguments[0]);}}});dojo.subscribe('ubr/events/paginationDone',this,function(){});dojo.subscribe('ubr/plugins/'+this.pluginId+'/nodefadeOutStart',this,function(){this.viewActive=false;});dojo.subscribe('ubr/plugins/'+this.pluginId+'/nodefadeInEnd',this,function(){this.viewActive=true;});this.refreshConnState();this.rosterShowing=false;this.UIinited=true;}
this.connect=function(){this.setContextFromForm();this.con.connect(this.connectArg);}
this.addToRoomRoster=function(robj){if(robj.nick){this.roomRoster[robj.nick]=robj;this.logSystemMsg('added '+robj.nick+' to the roster');this.refreshRoomRosterUI();}}
this.removeFromRoomRoster=function(nick){this.roomRoster[nick]=null;this.refreshRoomRosterUI();}
this.discoRoom=function()
{var q=new JSJaCIQ();q.setIQ(this.myRoomJID,'get','Disco3');q.setFrom(this.myFullJID);q.setQuery('http://jabber.org/protocol/disco#info');this.con.send(q,dojo.hitch(this,this.discoRoomResult));}
this.discoRoomResult=function(p)
{if(this.presenceShow=='offline')return;if(p.getType()=='error'){this.refreshConnMsg('Error.');return;}else if(p.getType()=='result'){if(p.getFrom()!=this.myRoomJID){this.refreshConnMsg('Chat not found.');return;}else{this.refreshConnMsg('Chat found.');this.room={};this.joinRoom();}}}
this.joinRoom=function(){this.sendPresenceMuc();}
this.handleOnError=function(e)
{}
this.handleIq=function(p)
{}
this.handleDisconnect=function()
{var m=ubr.muc();if(m){m.groupchatRcvd=false;}}
this.handleStatusChanged=function(status)
{}
this.handleConnect=function()
{dojo.byId("chatLog").innerHTML="Type here.";this.refreshConnMsg('Connected.');this.sendPresenceAvailable();this.refreshConnState();this.refreshConnMsg('Discovering chat...');setTimeout(dojo.hitch(this,this.discoRoom),1000);}
this.handlePresence=function(p)
{var presence=this.presenceToObj(p);if(presence.errorNode){var code=presence.errorNode.getAttribute('code');var type=presence.errorNode.getAttribute('type');switch(code){case'409':case'404':case'503':alert('The maximum number of users for this book chat has been reached. Please wait a bit and try refreshing this page to join the real-time discussion. In the meantime, you can still leave notes on the book.');break;default:}}
if(presence.from==this.myFullRoomJID){if(presence.xitem.status=='110'){this.inRoom=true;}}
if(presence.from.indexOf('/')!=-1){var rn=presence.from.split('/');var barejid=rn[0];var nick=rn[1];if(barejid==this.myRoomJID){if(presence.ptype=='unavailable'){this.logSystemMsg(nick+' is no longer available');if(nick==this.myNick){this.inRoom=false;this.refreshConnState();this.refreshConnMsg('left chat');}
this.removeFromRoomRoster(nick);return;}else{this.addToRoomRoster({nick:nick,role:presence.xitem.role,affiliation:presence.xitem.affiliation,show:presence.show,status:presence.status,jid:presence.xitem.jid,chatmsgs:[],position:presence.position});}}}}
this.handleMessage=function(p)
{dojo.addClass(dojo.byId('chatPaneButton'),'active');if(p.getType()=='error'){if(p._getAttribute('code')=='406'){alert('unacceptable--you are not in the chat anymore');this.inRoom=false;this.refreshConnState();}else if(p._getAttribute('code')=='401'){alert('authorization for chat failed');this.inRoom=false;this.refreshConnState();}
dojo.removeClass(dojo.byId('chatPaneButton'),'active');return;}
var from=p.getFrom();var type=p.getType();var x=p.getChild('x','http://jabber.org/protocol/muc#user');if(x){var status=x.getElementsByTagName('status');if(status){this.inRoom=true;if(status[0].getAttribute('code')=='100'){this.refreshConnState();this.refreshConnMsg('Active');}}}
var x=p.getChild('x','jabber:x:delay');if(x){var stamp=x.getAttribute('stamp');p.delaystamp=new Date(Date.UTC(stamp.substring(0,4),stamp.substring(4,6)-1,stamp.substring(6,8),stamp.substring(9,11),stamp.substring(12,14),stamp.substring(15,17)));}else{p.delaystamp=new Date();}
var delay=p.getChild('delay','urn:xmpp:delay');if(delay){var stamp=delay.getAttribute('stamp');p.delaystamp=stamp;}
var nick=nick=p.getFromJID().getResource();if(!nick){this.roomMessages.push(p);this.popRoomMsgs();}else{if(this.roomRoster[nick]){this.roomRoster[nick].chatmsgs.push(p);this.popRoomRosterMsgs(nick);}else{this.offlineMessages.push(p);this.popOfflineMsgs(p);}}}
this.popOfflineMsgs=function(){while(this.offlineMessages.length>0){this.logMsg(this.offlineMessages.shift());}
dojo.removeClass(dojo.byId('chatPaneButton'),'active');}
this.popRoomMsgs=function(){while(this.roomMessages.length>0){this.logSystemMsg(this.roomMessages.shift());}
dojo.removeClass(dojo.byId('chatPaneButton'),'active');}
this.popRoomRosterMsgs=function(nick){if(this.roomRoster[nick]){var cm=this.roomRoster[nick].chatmsgs;while(cm.length>0){this.logMsg(cm.shift());}}
dojo.removeClass(dojo.byId('chatPaneButton'),'active');}
this.getMsgTimes=function(msg)
{var timestamp;if(msg.delaystamp){timestamp=msg.delaystamp;}else{var timestamp=new Date();}
var mtime='';if(new Date()-timestamp>24*3600*1000){mtime+=timestamp.toLocaleDateString()+" ";}
mtime+=timestamp.toLocaleTimeString();return{timestamp:timestamp,mtime:mtime};}
this.submitClicked=function(){var body=dojo.byId('chatInput').value.htmlEnc();var to='';var aMessage=new JSJaCMessage();var doc=aMessage.getDoc();if(body=='')return false;var primg=dojo.byId('profileImg').getElementsByTagName('img')[0];var imgsrc=primg.getAttribute('src');var img=doc.createElement('img');img.setAttribute('src',imgsrc);img.setAttribute('height',"26");img.setAttribute('width',"26");img.setAttribute('style','padding-right:4px; margin-top:3px;');var div=doc.createElement('div');div.appendChild(img);var spanname=doc.createElement('span');spanname.setAttribute('class','chatUser');spanname.setAttribute('style','font-variant: small-caps; color: olive;');var spanel=div.appendChild(spanname);spanel.appendChild(doc.createTextNode(this.myNick));var spanrange=doc.createElement('span');spanrange.setAttribute('class','rangeImg');var spanrangeel=div.appendChild(spanrange);spanrangeel.appendChild(doc.createTextNode(' '));div.appendChild(doc.createElement('br'));msgcont=doc.createElement('span');msgcont.setAttribute('class','xhtml-msgbody');var msgcontel=div.appendChild(msgcont);msgcontel.appendChild(doc.createTextNode(body));var posind=doc.createElement('span');posind.setAttribute('class','chatposind');var posindel=div.appendChild(posind);posindel.appendChild(doc.createTextNode(this.getPositionString()));aMessage.setType('groupchat');aMessage.setTo(this.myRoomJID);aMessage.setBody(body);var html=aMessage.buildNode('html',{xmlns:"http://jabber.org/protocol/xhtml-im"});var xmlbody=aMessage.buildNode('body',{xmlns:"http://www.w3.org/1999/xhtml"});xmlbody.appendChild(div);html.appendChild(xmlbody);aMessage.appendNode(html);this.con.send(aMessage);dojo.byId('chatInput').value='';dojo.byId('chatInput').focus();return false;}
this.announceEvent=function(body){if(!body||body=='')return false;var to='';var aMessage=new JSJaCMessage();aMessage.setType('groupchat');aMessage.setTo(this.myRoomJID);aMessage.setBody(body+this.getPositionString());this.con.send(aMessage);return false;}
this.msgFormat=function(msg){if(!msg)
return null;if(enc){msg=msg.htmlEnc();}
var emoticons=this.emoticons;var emoticonpath=this.emoticonpath;if(typeof(emoticons)!='undefined'){for(var i in emoticons){var iq=i.replace(/\\/g,'');var emo=new Image();emo.src=emoticonpath+emoticons[i];if(emo.width>0&&emo.height>0)
msg=msg.replace(eval("/\(\\s\|\^\)"+i+"\(\\s|\$\)/g"),"$1<img src=\""+emo.src+"\" width='"+emo.width+"' height='"+emo.height+"' alt=\""+iq+"\" title=\""+iq+"\">$2");else
msg=msg.replace(eval("/\(\\s\|\^\)"+i+"\(\\s|\$\)/g"),"$1<img src=\""+emo.src+"\" alt=\""+iq+"\" title=\""+iq+"\">$2");}}
msg=msg.replace(/(\s|^)(https?:\/\/\S+)/gi,"$1<a href=\"$2\" target=\"_blank\">$2</a>");msg=msg.replace(/(\s|^)(ftp:\/\/\S+)/gi,"$1<a href=\"$2\" target=\"_blank\">$2</a>");msg=msg.replace(/(\s|^)(\w+\@\S+\.\S+)/g,"$1<a href=\"mailto:$2\">$2</a>");msg=msg.replace(/(\s|^)\*([^\*\r\n]+)\*/g,"$1<b>\$2\</b>");msg=msg.replace(/(\s|^)\_([^\*\r\n]+)\_/g,"$1<u>$2</u>");msg=msg.replace(/\n/g,"<br>");return msg;}
this.presenceToObj=function(p)
{var po={};po.from=p.getFrom();po.to=p.getTo();po.ptype=p.getType();po.errorNode=(po.ptype=='error')?p.getChild('error'):null;po.show=p.getShow();po.status=p.getStatus();po.priority=p.getPriority();var x=p.getChild('x','http://jabber.org/protocol/muc#user');if(x){var item=x.getElementsByTagName('item')[0];if(item){po.xitem={};po.xitem.role=item.getAttribute('role');po.xitem.affilation=item.getAttribute('affiliation');po.xitem.statuscodes=[];var status=item.getElementsByTagName('status');if(status.length>0){dojo.forEach(status,function(s){po.xitem.statuscodes.push(s.getAttribute('code'));});}
po.xitem.jid=item.getAttribute('jid');}}
po.position=this.getPositionData(po.status);return po;}
this.handleRoomDeparture=function(nick){this.removeFromRoomRoster(nick);}
this.handleRoomArrival=function(rosObj){this.addToRoomRoster(rosObj);}
this.handleRoomJoined=function(p)
{if(p.getType()=='error'){this.refreshConnMsg('Chat unavailable',false);return;}else{this.refreshConnMsg('Chat pending.');this.refreshConnState();}}
this.handleTypingEvent=function(evt){if(evt.keyCode==13&&ubr.user.isLogged){evt.preventDefault();this.submitClicked();}else if(evt.charCode==32){evt.stopPropagation();}}
this.clearChatInput=function()
{dojo.byId('chatInput').value='';}
this.setClass=function(id,name)
{dojo.attr(id,'class',name)}
this.refreshConnState=function()
{if(this.con.connected()&&this.inRoom){this.setClass(dojo.byId('connectionState'),'active');}else if(this.con.connected()&&!this.inRoom){this.setClass(dojo.byId('connectionState'),'busy');}else{this.setClass(dojo.byId('connectionState'),'offline');}}
this.refreshConnMsg=function(msg)
{dojo.byId('connectionMsgs').innerHTML=msg;}
this.toggleRoster=function(){}
this.refreshRoomRosterUI=function()
{var rr=dojo.byId('roomRoster');var ros='';var count=0;for(nick in this.roomRoster){if(this.roomRoster[nick]!=null){var pos=this.roomRoster[nick].position;var jid=this.roomRoster[nick].jid;var ih=(this.contextValidator(pos))?'<div class="roster-item-incontext">':'<div class="roster-item-outofcontext">';if(nick==this.myNick){ih+='<span style="color:#900;font-weight:bold">';ih+=nick;ih+='</span>';}else{ih+='<span style="font-weight:bold">';ih+=nick;ih+='</span>';if(this.contextValidator(pos)==false){}else{var rangefactor=this.getRangeFactor(pos);var range=this.getContextRange(rangefactor);var realrange=5-range;var rangeind='<span class="rangeimg">';for(var i=0;i<realrange;i++){rangeind+='<img src="https://api.readsocial.net/ubrx/default/images/reader-talkticmarks.gif" border="0" alt="|" />';}
rangeind+='</span>';ih+='&nbsp;'+rangeind;}}
var fromlink='<a href="http://www.bookglutton.com" target="_new" title="This user is reading this book on bookglutton.com">bookglutton.com</a>';var matches;if(matches=jid.match(/pr\d+?:(.+?)$/)){fromlink='<a href="http://'+matches[1]+'" title="This user is reading this book from this domain (will open in new window or tab)" target="_new">'+matches[1]+'</a>';}
ih+='<br /><span style="font-size:10px;rgb(128, 100, 80);">@'+fromlink+'</span>';ih+='</div>';ros+=ih;count++;}}
dojo.byId('rosterCount').innerHTML=count;rr.innerHTML=ros;}
this.logSystemMsg=function(msg)
{if(typeof(msg)=='string'){var mtime=(new Date()).toLocaleTimeString();var text=msg;this.appendHTML('<div class="event-announcement">*&nbsp;<span class="event-timestamp"> '+mtime+' </span>'+text+'</div>');return;}
var fullfrom=msg.getFrom();var from=msg.getFromJID().getResource();var mtime=this.getMsgTimes(msg).mtime;var text=msg.getBody();var position=this.getPositionData(msg.xml());if(position){if(this.roomRoster[from]){this.roomRoster[from].position=position;this.refreshRoomRosterUI();if(!this.contextValidator(position)){return;}}}
this.appendHTML('<div class="event-announcement">*&nbsp;<span class="event-timestamp"> '+mtime+' </span>'+text.htmlEnc()+'</div>');}
this.logMsg=function(msg)
{var fullfrom=msg.getFrom();var from=msg.getFromJID().getResource();var times=this.getMsgTimes(msg);var timestamp=times.timestamp;var mtime=times.mtime;if(!msg.getBody()||msg.getBody()==''){return;}
if(msg.getType()=='groupchat'){this.groupchatRcvd=true;var msgstr=msg.getBody();if(msgstr.match(/^\/me /)){msgstr=msgstr.replace(/^\/me /,from+' ');msg.setBody(msgstr);this.logSystemMsg(msg);return;}
var position=this.getPositionData(msg.xml());if(position){if(this.roomRoster[from]){this.roomRoster[from].position=position;this.refreshRoomRosterUI();if(!this.contextValidator(position)){return;}}}
var msgHTML=(msg.hasBodyXHTML())?msg.getBodyXHTML():msg.getBody();if(msgHTML.nodeName){if(dojo.isIE&&msgHTML.xml){msgHTML=msgHTML.xml;}else{msgHTML=msgHTML.innerHTML;}}
Debug.log(msgHTML);msgHTML=msgHTML.replace(/\[&lt;(href\([^\)]+?\))&gt;\]/,'<a href="#" onclick="ubr.navCtl.runCommand(\'$1\');return false;">[&nbsp;go here&nbsp;]</a>');this.appendHTML('<div class="chatmsg">'+msgHTML+'</div>');this.refreshRoomRosterUI();}}
this.appendHTML=function(msg)
{var m=msg;var cl=dojo.byId('chatLog');cl.innerHTML+=m+"\n";var os=cl.scrollHeight-cl.clientHeight;if(os>0)cl.scrollTop=os;}
this.sendPresenceAvailable=function()
{this.setPresence({show:'chat'});}
this.sendPresenceAway=function()
{this.setPresence({show:'away'});}
this.sendPresenceUnavailable=function()
{this.setPresence({type:'unavailable'});}
this.sendPresenceDnd=function()
{this.setPresence({show:'dnd'});}
this.sendPresenceXa=function()
{this.setPresence({show:'xa'});}
this.sendPresencePosition=function()
{this.setPresence({status:this.getPositionString()});}
this.sendPresenceMuc=function()
{var p=new JSJaCPresence();p.setFrom(this.myFullJID);p.setTo(this.myFullRoomJID);p.setStatus(this.getPositionString());var x=p.buildNode('x',{xmlns:'http://jabber.org/protocol/muc'});p.appendNode(x.appendChild(p.buildNode('history',{maxstanzas:'10'})));this.con.send(p);}
this.setPresence=function(pob)
{if(!this.con)return;if(!this.con.connected())return;var p=new JSJaCPresence();if(pob.to){p.setTo(pob.to);}
if(pob.from){p.setFrom(pob.from);}
if(pob.show){p.setShow(pob.show);this.presenceShow=pob.show;this.setShowIcon();}
if(pob.status){p.setStatus(pob.status);}
if(pob.ptype){p.setType(pob.ptype);if(pob.ptype=='unavailable'){this.presenceShow=='offline';}}
this.con.send(p);}
this.logout=function()
{if(this.inRoom){this.leaveRoom();}}
this.toggleRoomPresence=function()
{if(this.inRoom){this.leaveRoom();}else{this.sendPresenceMuc();}}
this.leaveRoom=function()
{var p=new JSJaCPresence();p.setFrom(this.myFullJID);p.setTo(this.myRoomJID+'/'+this.myNick);p.setType('unavailable');this.con.send(p);this.inRoom=false;this.refreshConnMsg('Left chat.');this.refreshConnState();}
this.setShowIcon=function()
{}
this.setContext=function(newcon)
{if(this.con.connected()==true){this.context=newcon;}else{return false;}}
this.refreshContextUI=function()
{this.announceEvent('/me has changed context to '+this.context);}
this.setContextFromForm=function()
{var el=dojo.byId('range');this.setContext((el.value==0)?'book':'section');}
this.changeContext=function()
{this.setContextFromForm();this.refreshContextUI();this.refreshRoomRosterUI();}
this.appendPosition=function(msgbody){msgbody+=' [<href('+ubr.currentHref+')>]';return msgbody;}
this.getPositionString=function()
{return'[<href('+ubr.currentHref+')>]';}
this.getPositionData=function(msg){if(matches=msg.match(/\[\D*?Section\D*?(\d+?)\D*?paragraph\D*?(\d+?)\D*?\]/)){return{section:parseInt(matches[1]-1),paragraph:parseInt(matches[2]-1)}}else{return null;}}
this.getRangeFactor=function(position)
{var range=new Object();if(position.section){range.book=this.getRangeFor(ubr.filePointer-position.section,ubr.files.length);range.section=this.getRangeFor(ubr.paragraphPointer-position.paragraph,ubr.paragraphCount);}
return range;}
this.getContextRange=function(rangefactor)
{var range;if(this.context=='book'){range=rangefactor.book;}else if(this.context=='section'){range=rangefactor.section;}
return range;}
this.getRangeFor=function(prox,len){range=Math.ceil(((prox/len)*100)/20);if(range<0)range*=-1;return range;}
this.contextValidator=function(position)
{if(!position){return false;}
var valid=false;if(this.context=='book'){valid=true;}else if(this.context=='section'){if(position.section!=ubr.filePointer){valid=false;}else{valid=true;}}else{}
return valid;}}
var JSJAC_HAVEKEYS=false;var JSJAC_NKEYS=16;var JSJAC_INACTIVITY=300;var JSJAC_ERR_COUNT=10;var JSJAC_ALLOW_PLAIN=true;var JSJAC_CHECKQUEUEINTERVAL=1;var JSJAC_CHECKINQUEUEINTERVAL=1;var JSJACHBC_BOSH_VERSION="1.6";var JSJACHBC_USE_BOSH_VER=false;var JSJACHBC_MAX_HOLD=1;var JSJACHBC_MAX_WAIT=300;var JSJACHBC_MAXPAUSE=120;String.prototype.htmlEnc=function(){var str=this.replace(/&/g,"&amp;");str=str.replace(/</g,"&lt;");str=str.replace(/>/g,"&gt;");str=str.replace(/\"/g,"&quot;");str=str.replace(/\n/g,"<br />");return str;};Date.jab2date=function(ts){var date=new Date(Date.UTC(ts.substr(0,4),ts.substr(5,2)-1,ts.substr(8,2),ts.substr(11,2),ts.substr(14,2),ts.substr(17,2)));if(ts.substr(ts.length-6,1)!='Z'){var offset=new Date();offset.setTime(0);offset.setUTCHours(ts.substr(ts.length-5,2));offset.setUTCMinutes(ts.substr(ts.length-2,2));if(ts.substr(ts.length-6,1)=='+')
date.setTime(date.getTime()-offset.getTime());else if(ts.substr(ts.length-6,1)=='-')
date.setTime(date.getTime()+offset.getTime());}
return date;};Date.hrTime=function(ts){return Date.jab2date(ts).toLocaleString();};Date.prototype.jabberDate=function(){var padZero=function(i){if(i<10)return"0"+i;return i;};var jDate=this.getUTCFullYear()+"-";jDate+=padZero(this.getUTCMonth()+1)+"-";jDate+=padZero(this.getUTCDate())+"T";jDate+=padZero(this.getUTCHours())+":";jDate+=padZero(this.getUTCMinutes())+":";jDate+=padZero(this.getUTCSeconds())+"Z";return jDate;};Number.max=function(A,B){return(A>B)?A:B;};var hexcase=0;var b64pad="=";var chrsz=8;function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length*chrsz));}
function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length*chrsz));}
function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length*chrsz));}
function hex_hmac_sha1(key,data){return binb2hex(core_hmac_sha1(key,data));}
function b64_hmac_sha1(key,data){return binb2b64(core_hmac_sha1(key,data));}
function str_hmac_sha1(key,data){return binb2str(core_hmac_sha1(key,data));}
function sha1_vm_test()
{return hex_sha1("abc")=="a9993e364706816aba3e25717850c26c9cd0d89d";}
function core_sha1(x,len)
{x[len>>5]|=0x80<<(24-len%32);x[((len+64>>9)<<4)+15]=len;var w=Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;for(var i=0;i<x.length;i+=16)
{var olda=a;var oldb=b;var oldc=c;var oldd=d;var olde=e;for(var j=0;j<80;j++)
{if(j<16)w[j]=x[i+j];else w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);var t=safe_add(safe_add(rol(a,5),sha1_ft(j,b,c,d)),safe_add(safe_add(e,w[j]),sha1_kt(j)));e=d;d=c;c=rol(b,30);b=a;a=t;}
a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);e=safe_add(e,olde);}
return Array(a,b,c,d,e);}
function sha1_ft(t,b,c,d)
{if(t<20)return(b&c)|((~b)&d);if(t<40)return b^c^d;if(t<60)return(b&c)|(b&d)|(c&d);return b^c^d;}
function sha1_kt(t)
{return(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;}
function core_hmac_sha1(key,data)
{var bkey=str2binb(key);if(bkey.length>16)bkey=core_sha1(bkey,key.length*chrsz);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++)
{ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}
var hash=core_sha1(ipad.concat(str2binb(data)),512+data.length*chrsz);return core_sha1(opad.concat(hash),512+160);}
function rol(num,cnt)
{return(num<<cnt)|(num>>>(32-cnt));}
function str2binb(str)
{var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)
bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(32-chrsz-i%32);return bin;}
function binb2str(bin)
{var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz)
str+=String.fromCharCode((bin[i>>5]>>>(32-chrsz-i%32))&mask);return str;}
function binb2hex(binarray)
{var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++)
{str+=hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8+4))&0xF)+
hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8))&0xF);}
return str;}
function binb2b64(binarray)
{var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";for(var i=0;i<binarray.length*4;i+=3)
{var triplet=(((binarray[i>>2]>>8*(3-i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*(3-(i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*(3-(i+2)%4))&0xFF);for(var j=0;j<4;j++)
{if(i*8+j*6>binarray.length*32)str+=b64pad;else str+=tab.charAt((triplet>>6*(3-j))&0x3F);}}
return str;}
function hex_md5(s){return binl2hex(core_md5(str2binl(s),s.length*chrsz));}
function b64_md5(s){return binl2b64(core_md5(str2binl(s),s.length*chrsz));}
function str_md5(s){return binl2str(core_md5(str2binl(s),s.length*chrsz));}
function hex_hmac_md5(key,data){return binl2hex(core_hmac_md5(key,data));}
function b64_hmac_md5(key,data){return binl2b64(core_hmac_md5(key,data));}
function str_hmac_md5(key,data){return binl2str(core_hmac_md5(key,data));}
function md5_vm_test()
{return hex_md5("abc")=="900150983cd24fb0d6963f7d28e17f72";}
function core_md5(x,len)
{x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16)
{var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}
return Array(a,b,c,d);}
function md5_cmn(q,a,b,x,s,t)
{return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}
function md5_ff(a,b,c,d,x,s,t)
{return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}
function md5_gg(a,b,c,d,x,s,t)
{return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}
function md5_hh(a,b,c,d,x,s,t)
{return md5_cmn(b^c^d,a,b,x,s,t);}
function md5_ii(a,b,c,d,x,s,t)
{return md5_cmn(c^(b|(~d)),a,b,x,s,t);}
function core_hmac_md5(key,data)
{var bkey=str2binl(key);if(bkey.length>16)bkey=core_md5(bkey,key.length*chrsz);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++)
{ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}
var hash=core_md5(ipad.concat(str2binl(data)),512+data.length*chrsz);return core_md5(opad.concat(hash),512+128);}
function safe_add(x,y)
{var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}
function bit_rol(num,cnt)
{return(num<<cnt)|(num>>>(32-cnt));}
function str2binl(str)
{var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)
bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(i%32);return bin;}
function binl2str(bin)
{var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz)
str+=String.fromCharCode((bin[i>>5]>>>(i%32))&mask);return str;}
function binl2hex(binarray)
{var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++)
{str+=hex_tab.charAt((binarray[i>>2]>>((i%4)*8+4))&0xF)+
hex_tab.charAt((binarray[i>>2]>>((i%4)*8))&0xF);}
return str;}
function binl2b64(binarray)
{var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";for(var i=0;i<binarray.length*4;i+=3)
{var triplet=(((binarray[i>>2]>>8*(i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*((i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*((i+2)%4))&0xFF);for(var j=0;j<4;j++)
{if(i*8+j*6>binarray.length*32)str+=b64pad;else str+=tab.charAt((triplet>>6*(3-j))&0x3F);}}
return str;}
function utf8t2d(t)
{t=t.replace(/\r\n/g,"\n");var d=new Array;var test=String.fromCharCode(237);if(test.charCodeAt(0)<0)
for(var n=0;n<t.length;n++)
{var c=t.charCodeAt(n);if(c>0)
d[d.length]=c;else{d[d.length]=(((256+c)>>6)|192);d[d.length]=(((256+c)&63)|128);}}
else
for(var n=0;n<t.length;n++)
{var c=t.charCodeAt(n);if(c<128)
d[d.length]=c;else if((c>127)&&(c<2048)){d[d.length]=((c>>6)|192);d[d.length]=((c&63)|128);}
else{d[d.length]=((c>>12)|224);d[d.length]=(((c>>6)&63)|128);d[d.length]=((c&63)|128);}}
return d;}
function utf8d2t(d)
{var r=new Array;var i=0;while(i<d.length)
{if(d[i]<128){r[r.length]=String.fromCharCode(d[i]);i++;}
else if((d[i]>191)&&(d[i]<224)){r[r.length]=String.fromCharCode(((d[i]&31)<<6)|(d[i+1]&63));i+=2;}
else{r[r.length]=String.fromCharCode(((d[i]&15)<<12)|((d[i+1]&63)<<6)|(d[i+2]&63));i+=3;}}
return r.join("");}
function b64arrays(){var b64s='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';b64=new Array();f64=new Array();for(var i=0;i<b64s.length;i++){b64[i]=b64s.charAt(i);f64[b64s.charAt(i)]=i;}}
function b64d2t(d){var r=new Array;var i=0;var dl=d.length;if((dl%3)==1){d[d.length]=0;d[d.length]=0;}
if((dl%3)==2)
d[d.length]=0;while(i<d.length)
{r[r.length]=b64[d[i]>>2];r[r.length]=b64[((d[i]&3)<<4)|(d[i+1]>>4)];r[r.length]=b64[((d[i+1]&15)<<2)|(d[i+2]>>6)];r[r.length]=b64[d[i+2]&63];i+=3;}
if((dl%3)==1)
r[r.length-1]=r[r.length-2]="=";if((dl%3)==2)
r[r.length-1]="=";var t=r.join("");return t;}
function b64t2d(t){var d=new Array;var i=0;t=t.replace(/\n|\r/g,"");t=t.replace(/\=/g,"");while(i<t.length)
{d[d.length]=(f64[t.charAt(i)]<<2)|(f64[t.charAt(i+1)]>>4);d[d.length]=(((f64[t.charAt(i+1)]&15)<<4)|(f64[t.charAt(i+2)]>>2));d[d.length]=(((f64[t.charAt(i+2)]&3)<<6)|(f64[t.charAt(i+3)]));i+=4;}
if(t.length%4==2)
d=d.slice(0,d.length-2);if(t.length%4==3)
d=d.slice(0,d.length-1);return d;}
if(typeof(atob)=='undefined'||typeof(btoa)=='undefined')
b64arrays();if(typeof(atob)=='undefined'){atob=function(s){return utf8d2t(b64t2d(s));}}
if(typeof(btoa)=='undefined'){btoa=function(s){return b64d2t(utf8t2d(s));}}
function cnonce(size){var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";var cnonce='';for(var i=0;i<size;i++){cnonce+=tab.charAt(Math.round(Math.random(new Date().getTime())*(tab.length-1)));}
return cnonce;}
function JSJaCJSON(){}
JSJaCJSON.toString=function(obj){var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},s={array:function(x){var a=['['],b,f,i,l=x.length,v;for(i=0;i<l;i+=1){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=',';}
a[a.length]=v;b=true;}}}
a[a.length]=']';return a.join('');},'boolean':function(x){return String(x);},'null':function(x){return"null";},number:function(x){return isFinite(x)?String(x):'null';},object:function(x){if(x){if(x instanceof Array){return s.array(x);}
var a=['{'],b,f,i,v;for(i in x){if(x.hasOwnProperty(i)){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=',';}
a.push(s.string(i),':',v);b=true;}}}}
a[a.length]='}';return a.join('');}
return'null';},string:function(x){if(/["\\\x00-\x1f]/.test(x)){x=x.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}
c=b.charCodeAt();return'\\u00'+
Math.floor(c/16).toString(16)+
(c%16).toString(16);});}
return'"'+x+'"';}};switch(typeof(obj)){case'object':return s.object(obj);case'array':return s.array(obj);}};JSJaCJSON.parse=function(str){try{return!(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(str.replace(/"(\\.|[^"\\])*"/g,'')))&&eval('('+str+')');}catch(e){return false;}};function XmlHttp(){}
XmlHttp.create=function(){try{if(window.XMLHttpRequest){var req=new XMLHttpRequest();if(req.readyState==null){req.readyState=1;req.addEventListener("load",function(){req.readyState=4;if(typeof req.onreadystatechange=="function")
req.onreadystatechange();},false);}
return req;}
if(window.ActiveXObject){return new ActiveXObject(XmlHttp.getPrefix()+".XmlHttp");}}
catch(ex){}
throw new Error("Your browser does not support XmlHttp objects");};XmlHttp.getPrefix=function(){if(XmlHttp.prefix)
return XmlHttp.prefix;var prefixes=["MSXML2","Microsoft","MSXML","MSXML3"];var o;for(var i=0;i<prefixes.length;i++){try{o=new ActiveXObject(prefixes[i]+".XmlHttp");return XmlHttp.prefix=prefixes[i];}
catch(ex){};}
throw new Error("Could not find an installed XML parser");};function XmlDocument(){}
XmlDocument.create=function(name,ns){name=name||'foo';ns=ns||'';try{var doc;if(document.implementation&&document.implementation.createDocument){doc=document.implementation.createDocument(ns,name,null);if(doc.readyState==null){doc.readyState=1;doc.addEventListener("load",function(){doc.readyState=4;if(typeof doc.onreadystatechange=="function")
doc.onreadystatechange();},false);}}else if(window.ActiveXObject){doc=new ActiveXObject(XmlDocument.getPrefix()+".DomDocument");}
if(!doc.documentElement||doc.documentElement.tagName!=name||(doc.documentElement.namespaceURI&&doc.documentElement.namespaceURI!=ns)){try{if(ns!='')
doc.appendChild(doc.createElement(name)).setAttribute('xmlns',ns);else
doc.appendChild(doc.createElement(name));}catch(dex){doc=document.implementation.createDocument(ns,name,null);if(doc.documentElement==null)
doc.appendChild(doc.createElement(name));if(ns!=''&&doc.documentElement.getAttribute('xmlns')!=ns){doc.documentElement.setAttribute('xmlns',ns);}}}
return doc;}
catch(ex){alert(ex.name+": "+ex.message);}
throw new Error("Your browser does not support XmlDocument objects");};XmlDocument.getPrefix=function(){if(XmlDocument.prefix)
return XmlDocument.prefix;var prefixes=["MSXML2","Microsoft","MSXML","MSXML3"];var o;for(var i=0;i<prefixes.length;i++){try{o=new ActiveXObject(prefixes[i]+".DomDocument");return XmlDocument.prefix=prefixes[i];}
catch(ex){};}
throw new Error("Could not find an installed XML parser");};if(typeof(Document)!='undefined'&&window.DOMParser){Document.prototype.loadXML=function(s){var doc2=(new DOMParser()).parseFromString(s,"text/xml");while(this.hasChildNodes())
this.removeChild(this.lastChild);for(var i=0;i<doc2.childNodes.length;i++){this.appendChild(this.importNode(doc2.childNodes[i],true));}};}
if(window.XMLSerializer&&window.Node&&Node.prototype&&Node.prototype.__defineGetter__){XMLDocument.prototype.__defineGetter__("xml",function(){return(new XMLSerializer()).serializeToString(this);});Document.prototype.__defineGetter__("xml",function(){return(new XMLSerializer()).serializeToString(this);});Node.prototype.__defineGetter__("xml",function(){return(new XMLSerializer()).serializeToString(this);});}
var JSJaCBuilder={buildNode:function(doc,elementName){var element;if(arguments[2])
if(JSJaCBuilder._isStringOrNumber(arguments[2])||(arguments[2]instanceof Array)){element=doc.createElement(elementName);JSJaCBuilder._children(doc,element,arguments[2]);}else{if(arguments[2]['xmlns']){try{element=doc.createElementNS(arguments[2]['xmlns'],elementName);}catch(e){element=doc.createElement(elementName);}}else
element=doc.createElement(elementName);for(attr in arguments[2]){if(arguments[2].hasOwnProperty(attr)){if(attr=='xmlns'&&element.namespaceURI==attr)
continue;element.setAttribute(attr,arguments[2][attr]);}}}
else
element=doc.createElement(elementName);if(arguments[3])
JSJaCBuilder._children(doc,element,arguments[3]);return element;},_text:function(doc,text){return doc.createTextNode(text);},_children:function(doc,element,children){if(typeof children=='object'){for(var i in children){if(children.hasOwnProperty(i)){var e=children[i];if(typeof e=='object'){if(e instanceof Array){var node=JSJaCBuilder.buildNode(doc,e[0],e[1],e[2]);element.appendChild(node);}else{element.appendChild(e);}}else{if(JSJaCBuilder._isStringOrNumber(e)){element.appendChild(JSJaCBuilder._text(doc,e));}}}}}else{if(JSJaCBuilder._isStringOrNumber(children)){element.appendChild(JSJaCBuilder._text(doc,children));}}},_attributes:function(attributes){var attrs=[];for(attribute in attributes)
if(attributes.hasOwnProperty(attribute))
attrs.push(attribute+'="'+attributes[attribute].toString().htmlEnc()+'"');return attrs.join(" ");},_isStringOrNumber:function(param){return(typeof param=='string'||typeof param=='number');}};var NS_DISCO_ITEMS="http://jabber.org/protocol/disco#items";var NS_DISCO_INFO="http://jabber.org/protocol/disco#info";var NS_VCARD="vcard-temp";var NS_AUTH="jabber:iq:auth";var NS_AUTH_ERROR="jabber:iq:auth:error";var NS_REGISTER="jabber:iq:register";var NS_SEARCH="jabber:iq:search";var NS_ROSTER="jabber:iq:roster";var NS_PRIVACY="jabber:iq:privacy";var NS_PRIVATE="jabber:iq:private";var NS_VERSION="jabber:iq:version";var NS_TIME="jabber:iq:time";var NS_LAST="jabber:iq:last";var NS_XDATA="jabber:x:data";var NS_IQDATA="jabber:iq:data";var NS_DELAY="jabber:x:delay";var NS_EXPIRE="jabber:x:expire";var NS_EVENT="jabber:x:event";var NS_XCONFERENCE="jabber:x:conference";var NS_STATS="http://jabber.org/protocol/stats";var NS_MUC="http://jabber.org/protocol/muc";var NS_MUC_USER="http://jabber.org/protocol/muc#user";var NS_MUC_ADMIN="http://jabber.org/protocol/muc#admin";var NS_MUC_OWNER="http://jabber.org/protocol/muc#owner";var NS_PUBSUB="http://jabber.org/protocol/pubsub";var NS_PUBSUB_EVENT="http://jabber.org/protocol/pubsub#event";var NS_PUBSUB_OWNER="http://jabber.org/protocol/pubsub#owner";var NS_PUBSUB_NMI="http://jabber.org/protocol/pubsub#node-meta-info";var NS_COMMANDS="http://jabber.org/protocol/commands";var NS_STREAM="http://etherx.jabber.org/streams";var NS_STANZAS="urn:ietf:params:xml:ns:xmpp-stanzas";var NS_STREAMS="urn:ietf:params:xml:ns:xmpp-streams";var NS_TLS="urn:ietf:params:xml:ns:xmpp-tls";var NS_SASL="urn:ietf:params:xml:ns:xmpp-sasl";var NS_SESSION="urn:ietf:params:xml:ns:xmpp-session";var NS_BIND="urn:ietf:params:xml:ns:xmpp-bind";var NS_FEATURE_IQAUTH="http://jabber.org/features/iq-auth";var NS_FEATURE_IQREGISTER="http://jabber.org/features/iq-register";var NS_FEATURE_COMPRESS="http://jabber.org/features/compress";var NS_COMPRESS="http://jabber.org/protocol/compress";function STANZA_ERROR(code,type,cond){if(window==this)
return new STANZA_ERROR(code,type,cond);this.code=code;this.type=type;this.cond=cond;}
var ERR_BAD_REQUEST=STANZA_ERROR("400","modify","bad-request");var ERR_CONFLICT=STANZA_ERROR("409","cancel","conflict");var ERR_FEATURE_NOT_IMPLEMENTED=STANZA_ERROR("501","cancel","feature-not-implemented");var ERR_FORBIDDEN=STANZA_ERROR("403","auth","forbidden");var ERR_GONE=STANZA_ERROR("302","modify","gone");var ERR_INTERNAL_SERVER_ERROR=STANZA_ERROR("500","wait","internal-server-error");var ERR_ITEM_NOT_FOUND=STANZA_ERROR("404","cancel","item-not-found");var ERR_JID_MALFORMED=STANZA_ERROR("400","modify","jid-malformed");var ERR_NOT_ACCEPTABLE=STANZA_ERROR("406","modify","not-acceptable");var ERR_NOT_ALLOWED=STANZA_ERROR("405","cancel","not-allowed");var ERR_NOT_AUTHORIZED=STANZA_ERROR("401","auth","not-authorized");var ERR_PAYMENT_REQUIRED=STANZA_ERROR("402","auth","payment-required");var ERR_RECIPIENT_UNAVAILABLE=STANZA_ERROR("404","wait","recipient-unavailable");var ERR_REDIRECT=STANZA_ERROR("302","modify","redirect");var ERR_REGISTRATION_REQUIRED=STANZA_ERROR("407","auth","registration-required");var ERR_REMOTE_SERVER_NOT_FOUND=STANZA_ERROR("404","cancel","remote-server-not-found");var ERR_REMOTE_SERVER_TIMEOUT=STANZA_ERROR("504","wait","remote-server-timeout");var ERR_RESOURCE_CONSTRAINT=STANZA_ERROR("500","wait","resource-constraint");var ERR_SERVICE_UNAVAILABLE=STANZA_ERROR("503","cancel","service-unavailable");var ERR_SUBSCRIPTION_REQUIRED=STANZA_ERROR("407","auth","subscription-required");var ERR_UNEXPECTED_REQUEST=STANZA_ERROR("400","wait","unexpected-request");function JSJaCConnection(oArg){if(oArg&&oArg.oDbg&&oArg.oDbg.log)
this.oDbg=oArg.oDbg;else{this.oDbg=new Object();this.oDbg.log=function(){};}
if(oArg&&oArg.httpbase)
this._httpbase=oArg.httpbase;if(oArg&&oArg.allow_plain)
this.allow_plain=oArg.allow_plain;else
this.allow_plain=JSJAC_ALLOW_PLAIN;this._connected=false;this._events=new Array();this._keys=null;this._ID=0;this._inQ=new Array();this._pQueue=new Array();this._regIDs=new Array();this._req=new Array();this._status='intialized';this._errcnt=0;this._inactivity=JSJAC_INACTIVITY;this._sendRawCallbacks=new Array();if(oArg&&oArg.timerval)
this.setPollInterval(oArg.timerval);}
JSJaCConnection.prototype.connect=function(oArg){this._setStatus('connecting');this.domain=oArg.domain||'localhost';this.username=oArg.username;this.resource=oArg.resource;this.pass=oArg.pass;this.register=oArg.register;this.authhost=oArg.authhost||this.domain;this.authtype=oArg.authtype||'sasl';if(oArg.xmllang&&oArg.xmllang!='')
this._xmllang=oArg.xmllang;this.host=oArg.host||this.domain;this.port=oArg.port||5222;if(oArg.secure)
this.secure='true';else
this.secure='false';if(oArg.wait)
this._wait=oArg.wait;this.jid=this.username+'@'+this.domain;this.fulljid=this.jid+'/'+this.resource;this._rid=Math.round(100000.5+(((900000.49999)-(100000.5))*Math.random()));var slot=this._getFreeSlot();this._req[slot]=this._setupRequest(true);var reqstr=this._getInitialRequestString();this.oDbg.log(reqstr,4);this._req[slot].r.onreadystatechange=JSJaC.bind(function(){if(this._req[slot].r.readyState==4){this.oDbg.log("async recv: "+this._req[slot].r.responseText,4);this._handleInitialResponse(slot);}},this);if(typeof(this._req[slot].r.onerror)!='undefined'){this._req[slot].r.onerror=JSJaC.bind(function(e){this.oDbg.log('XmlHttpRequest error',1);return false;},this);}
this._req[slot].r.send(reqstr);};JSJaCConnection.prototype.connected=function(){return this._connected;};JSJaCConnection.prototype.disconnect=function(){this._setStatus('disconnecting');if(!this.connected())
return;this._connected=false;clearInterval(this._interval);clearInterval(this._inQto);if(this._timeout)
clearTimeout(this._timeout);var slot=this._getFreeSlot();this._req[slot]=this._setupRequest(false);request=this._getRequestString(false,true);this.oDbg.log("Disconnecting: "+request,4);this._req[slot].r.send(request);try{JSJaCCookie.read('JSJaC_State').erase();}catch(e){}
this.oDbg.log("Disconnected: "+this._req[slot].r.responseText,2);this._handleEvent('ondisconnect');};JSJaCConnection.prototype.getPollInterval=function(){return this._timerval;};JSJaCConnection.prototype.registerHandler=function(event){event=event.toLowerCase();var eArg={handler:arguments[arguments.length-1],childName:'*',childNS:'*',type:'*'};if(arguments.length>2)
eArg.childName=arguments[1];if(arguments.length>3)
eArg.childNS=arguments[2];if(arguments.length>4)
eArg.type=arguments[3];if(!this._events[event])
this._events[event]=new Array(eArg);else
this._events[event]=this._events[event].concat(eArg);this._events[event]=this._events[event].sort(function(a,b){var aRank=0;var bRank=0;with(a){if(type=='*')
aRank++;if(childNS=='*')
aRank++;if(childName=='*')
aRank++;}
with(b){if(type=='*')
bRank++;if(childNS=='*')
bRank++;if(childName=='*')
bRank++;}
if(aRank>bRank)
return 1;if(aRank<bRank)
return-1;return 0;});this.oDbg.log("registered handler for event '"+event+"'",2);};JSJaCConnection.prototype.unregisterHandler=function(event,handler){event=event.toLowerCase();if(!this._events[event])
return;var arr=this._events[event],res=new Array();for(var i=0;i<arr.length;i++)
if(arr[i]!=handler)
res.push(arr[i]);if(arr.length!=res.length){this._events[event]=res;this.oDbg.log("unregistered handler for event '"+event+"'",2);}};JSJaCConnection.prototype.registerIQGet=function(childName,childNS,handler){this.registerHandler('iq',childName,childNS,'get',handler);};JSJaCConnection.prototype.registerIQSet=function(childName,childNS,handler){this.registerHandler('iq',childName,childNS,'set',handler);};JSJaCConnection.prototype.resume=function(){try{this._setStatus('resuming');var s=unescape(JSJaCCookie.read('JSJaC_State').getValue());this.oDbg.log('read cookie: '+s,2);var o=JSJaCJSON.parse(s);for(var i in o)
if(o.hasOwnProperty(i))
this[i]=o[i];if(this._keys){this._keys2=new JSJaCKeys();var u=this._keys2._getSuspendVars();for(var i=0;i<u.length;i++)
this._keys2[u[i]]=this._keys[u[i]];this._keys=this._keys2;}
try{JSJaCCookie.read('JSJaC_State').erase();}catch(e){}
if(this._connected){this._handleEvent('onresume');setTimeout(JSJaC.bind(this._resume,this),this.getPollInterval());this._interval=setInterval(JSJaC.bind(this._checkQueue,this),JSJAC_CHECKQUEUEINTERVAL);this._inQto=setInterval(JSJaC.bind(this._checkInQ,this),JSJAC_CHECKINQUEUEINTERVAL);}
return(this._connected===true);}catch(e){if(e.message)
this.oDbg.log("Resume failed: "+e.message,1);else
this.oDbg.log("Resume failed: "+e,1);return false;}};JSJaCConnection.prototype.send=function(packet,cb,arg){if(!packet||!packet.pType){this.oDbg.log("no packet: "+packet,1);return false;}
if(!this.connected())
return false;if(cb){if(!packet.getID())
packet.setID('JSJaCID_'+this._ID++);this._registerPID(packet.getID(),cb,arg);}
try{this._handleEvent(packet.pType()+'_out',packet);this._handleEvent("packet_out",packet);this._pQueue=this._pQueue.concat(packet.xml());}catch(e){this.oDbg.log(e.toString(),1);return false;}
return true;};JSJaCConnection.prototype.sendIQ=function(iq,handlers,arg){if(!iq||iq.pType()!='iq'){return false;}
handlers=handlers||{};var error_handler=handlers.error_handler||function(aIq){this.oDbg.log(iq.xml(),1);};var result_handler=handlers.result_handler||function(aIq){this.oDbg.log(aIq.xml(),2);};var default_handler=handlers.default_handler||function(aIq){this.oDbg.log(aIq.xml(),2);};var iqHandler=function(aIq,arg){switch(aIq.getType()){case'error':error_handler(aIq);break;case'result':result_handler(aIq,arg);break;default:default_handler(aIq,arg);}};return this.send(iq,iqHandler,arg);};JSJaCConnection.prototype.setPollInterval=function(timerval){if(timerval&&!isNaN(timerval))
this._timerval=timerval;return this._timerval;};JSJaCConnection.prototype.status=function(){return this._status;};JSJaCConnection.prototype.suspend=function(){clearTimeout(this._timeout);clearInterval(this._interval);clearInterval(this._inQto);this._suspend();var u=('_connected,_keys,_ID,_inQ,_pQueue,_regIDs,_errcnt,_inactivity,domain,username,resource,jid,fulljid,_sid,_httpbase,_timerval,_is_polling').split(',');u=u.concat(this._getSuspendVars());var s=new Object();for(var i=0;i<u.length;i++){if(!this[u[i]])continue;if(this[u[i]]._getSuspendVars){var uo=this[u[i]]._getSuspendVars();var o=new Object();for(var j=0;j<uo.length;j++)
o[uo[j]]=this[u[i]][uo[j]];}else
var o=this[u[i]];s[u[i]]=o;}
var c=new JSJaCCookie('JSJaC_State',escape(JSJaCJSON.toString(s)),this._inactivity);this.oDbg.log("writing cookie: "+unescape(c.value)+"\n(length:"+
unescape(c.value).length+")",2);c.write();try{var c2=JSJaCCookie.read('JSJaC_State');if(c.value!=c2.value){this.oDbg.log("Suspend failed writing cookie.\nRead: "+
unescape(JSJaCCookie.read('JSJaC_State')),1);c.erase();}
this._connected=false;this._setStatus('suspending');}catch(e){this.oDbg.log("Failed reading cookie 'JSJaC_State': "+e.message);}};JSJaCConnection.prototype._abort=function(){clearTimeout(this._timeout);clearInterval(this._inQto);clearInterval(this._interval);this._connected=false;this._setStatus('aborted');this.oDbg.log("Disconnected.",1);this._handleEvent('ondisconnect');this._handleEvent('onerror',JSJaCError('500','cancel','service-unavailable'));};JSJaCConnection.prototype._checkInQ=function(){for(var i=0;i<this._inQ.length&&i<10;i++){var item=this._inQ[0];this._inQ=this._inQ.slice(1,this._inQ.length);var packet=JSJaCPacket.wrapNode(item);if(!packet)
return;this._handleEvent("packet_in",packet);if(packet.pType&&!this._handlePID(packet)){this._handleEvent(packet.pType()+'_in',packet);this._handleEvent(packet.pType(),packet);}}};JSJaCConnection.prototype._checkQueue=function(){if(this._pQueue.length!=0)
this._process();return true;};JSJaCConnection.prototype._doAuth=function(){if(this.has_sasl&&this.authtype=='nonsasl')
this.oDbg.log("Warning: SASL present but not used",1);if(!this._doSASLAuth()&&!this._doLegacyAuth()){this.oDbg.log("Auth failed for authtype "+this.authtype,1);this.disconnect();return false;}
return true;};JSJaCConnection.prototype._doInBandReg=function(){if(this.authtype=='saslanon'||this.authtype=='anonymous')
return;var iq=new JSJaCIQ();iq.setType('set');iq.setID('reg1');iq.appendNode("query",{xmlns:"jabber:iq:register"},[["username",this.username],["password",this.pass]]);this.send(iq,this._doInBandRegDone);};JSJaCConnection.prototype._doInBandRegDone=function(iq){if(iq&&iq.getType()=='error'){this.oDbg.log("registration failed for "+this.username,0);this._handleEvent('onerror',iq.getChild('error'));return;}
this.oDbg.log(this.username+" registered succesfully",0);this._doAuth();};JSJaCConnection.prototype._doLegacyAuth=function(){if(this.authtype!='nonsasl'&&this.authtype!='anonymous')
return false;var iq=new JSJaCIQ();iq.setIQ(this.server,'get','auth1');iq.appendNode('query',{xmlns:'jabber:iq:auth'},[['username',this.username]]);this.send(iq,this._doLegacyAuth2);return true;};JSJaCConnection.prototype._doLegacyAuth2=function(iq){if(!iq||iq.getType()!='result'){if(iq&&iq.getType()=='error')
this._handleEvent('onerror',iq.getChild('error'));this.disconnect();return;}
var use_digest=(iq.getChild('digest')!=null);var iq=new JSJaCIQ();iq.setIQ(this.server,'set','auth2');query=iq.appendNode('query',{xmlns:'jabber:iq:auth'},[['username',this.username],['resource',this.resource]]);if(use_digest){query.appendChild(iq.buildNode('digest',hex_sha1(this.streamid+this.pass)));}else if(this.allow_plain){query.appendChild(iq.buildNode('password',this.pass));}else{this.oDbg.log("no valid login mechanism found",1);this.disconnect();return false;}
this.send(iq,this._doLegacyAuthDone);};JSJaCConnection.prototype._doLegacyAuthDone=function(iq){if(iq.getType()!='result'){if(iq.getType()=='error')
this._handleEvent('onerror',iq.getChild('error'));this.disconnect();}else
this._handleEvent('onconnect');};JSJaCConnection.prototype._doSASLAuth=function(){if(this.authtype=='nonsasl'||this.authtype=='anonymous')
return false;if(this.authtype=='saslanon'){if(this.mechs['ANONYMOUS']){this.oDbg.log("SASL using mechanism 'ANONYMOUS'",2);return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='ANONYMOUS'/>",this._doSASLAuthDone);}
this.oDbg.log("SASL ANONYMOUS requested but not supported",1);}else{if(this.mechs['DIGEST-MD5']){this.oDbg.log("SASL using mechanism 'DIGEST-MD5'",2);return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='DIGEST-MD5'/>",this._doSASLAuthDigestMd5S1);}else if(this.allow_plain&&this.mechs['PLAIN']){this.oDbg.log("SASL using mechanism 'PLAIN'",2);var authStr=this.username+'@'+
this.domain+String.fromCharCode(0)+
this.username+String.fromCharCode(0)+
this.pass;this.oDbg.log("authenticating with '"+authStr+"'",2);authStr=btoa(authStr);return this._sendRaw("<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='PLAIN'>"+authStr+"</auth>",this._doSASLAuthDone);}
this.oDbg.log("No SASL mechanism applied",1);this.authtype='nonsasl';}
return false;};JSJaCConnection.prototype._doSASLAuthDigestMd5S1=function(el){if(el.nodeName!="challenge"){this.oDbg.log("challenge missing",1);this._handleEvent('onerror',JSJaCError('401','auth','not-authorized'));this.disconnect();}else{var challenge=atob(el.firstChild.nodeValue);this.oDbg.log("got challenge: "+challenge,2);this._nonce=challenge.substring(challenge.indexOf("nonce=")+7);this._nonce=this._nonce.substring(0,this._nonce.indexOf("\""));this.oDbg.log("nonce: "+this._nonce,2);if(this._nonce==''||this._nonce.indexOf('\"')!=-1){this.oDbg.log("nonce not valid, aborting",1);this.disconnect();return;}
this._digest_uri="xmpp/";this._digest_uri+=this.domain;this._cnonce=cnonce(14);this._nc='00000001';var A1=str_md5(this.username+':'+this.domain+':'+this.pass)+':'+this._nonce+':'+this._cnonce;var A2='AUTHENTICATE:'+this._digest_uri;var response=hex_md5(hex_md5(A1)+':'+this._nonce+':'+this._nc+':'+
this._cnonce+':auth:'+hex_md5(A2));var rPlain='username="'+this.username+'",realm="'+this.domain+'",nonce="'+this._nonce+'",cnonce="'+this._cnonce+'",nc="'+this._nc+'",qop=auth,digest-uri="'+this._digest_uri+'",response="'+response+'",charset=utf-8';this.oDbg.log("response: "+rPlain,2);this.oDbg.log('plain text response length is '+rPlain.length,2);this._sendRaw("<response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'>"+binb2b64(str2binb(rPlain))+"</response>",this._doSASLAuthDigestMd5S2);}};JSJaCConnection.prototype._doSASLAuthDigestMd5S2=function(el){if(el.nodeName=='failure'){if(el.xml)
this.oDbg.log("auth error: "+el.xml,1);else
this.oDbg.log("auth error",1);this._handleEvent('onerror',JSJaCError('401','auth','not-authorized'));this.disconnect();return;}
var response=atob(el.firstChild.nodeValue);this.oDbg.log("response: "+response,2);var rspauth=response.substring(response.indexOf("rspauth=")+8);this.oDbg.log("rspauth: "+rspauth,2);var A1=str_md5(this.username+':'+this.domain+':'+this.pass)+':'+this._nonce+':'+this._cnonce;var A2=':'+this._digest_uri;var rsptest=hex_md5(hex_md5(A1)+':'+this._nonce+':'+this._nc+':'+
this._cnonce+':auth:'+hex_md5(A2));this.oDbg.log("rsptest: "+rsptest,2);if(rsptest!=rspauth){this.oDbg.log("SASL Digest-MD5: server repsonse with wrong rspauth",1);this.disconnect();return;}
if(el.nodeName=='success')
this._reInitStream(this.domain,this._doStreamBind);else
this._sendRaw("<response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'/>",this._doSASLAuthDone);};JSJaCConnection.prototype._doSASLAuthDone=function(el){if(el.nodeName!='success'){this.oDbg.log("auth failed",1);this._handleEvent('onerror',JSJaCError('401','auth','not-authorized'));this.disconnect();}else
this._reInitStream(this.domain,this._doStreamBind);};JSJaCConnection.prototype._doStreamBind=function(){var iq=new JSJaCIQ();iq.setIQ(this.domain,'set','bind_1');iq.appendNode("bind",{xmlns:"urn:ietf:params:xml:ns:xmpp-bind"},[["resource",this.resource]]);this.oDbg.log(iq.xml());this.send(iq,this._doXMPPSess);};JSJaCConnection.prototype._doXMPPSess=function(iq){if(iq.getType()!='result'||iq.getType()=='error'){this.disconnect();if(iq.getType()=='error')
this._handleEvent('onerror',iq.getChild('error'));return;}
this.fulljid=iq.getChildVal("jid");this.jid=this.fulljid.substring(0,this.fulljid.lastIndexOf('/'));iq=new JSJaCIQ();iq.setIQ(this.domain,'set','sess_1');iq.appendNode("session",{xmlns:"urn:ietf:params:xml:ns:xmpp-session"},[]);this.oDbg.log(iq.xml());this.send(iq,this._doXMPPSessDone);};JSJaCConnection.prototype._doXMPPSessDone=function(iq){if(iq.getType()!='result'||iq.getType()=='error'){this.disconnect();if(iq.getType()=='error')
this._handleEvent('onerror',iq.getChild('error'));return;}else
this._handleEvent('onconnect');};JSJaCConnection.prototype._handleEvent=function(event,arg){event=event.toLowerCase();this.oDbg.log("incoming event '"+event+"'",3);if(!this._events[event])
return;this.oDbg.log("handling event '"+event+"'",2);for(var i=0;i<this._events[event].length;i++){var aEvent=this._events[event][i];if(aEvent.handler){try{if(arg){if(arg.pType){if((!arg.getNode().hasChildNodes()&&aEvent.childName!='*')||(arg.getNode().hasChildNodes()&&!arg.getChild(aEvent.childName,aEvent.childNS)))
continue;if(aEvent.type!='*'&&arg.getType()!=aEvent.type)
continue;this.oDbg.log(aEvent.childName+"/"+aEvent.childNS+"/"+aEvent.type+" => match for handler "+aEvent.handler,3);}
if(aEvent.handler.call(this,arg))
break;}
else
if(aEvent.handler.call(this))
break;}catch(e){this.oDbg.log(aEvent.handler+"\n>>>"+e.name+": "+e.message,1);}}}};JSJaCConnection.prototype._handlePID=function(aJSJaCPacket){if(!aJSJaCPacket.getID())
return false;for(var i in this._regIDs){if(this._regIDs.hasOwnProperty(i)&&this._regIDs[i]&&i==aJSJaCPacket.getID()){var pID=aJSJaCPacket.getID();this.oDbg.log("handling "+pID,3);try{if(this._regIDs[i].cb.call(this,aJSJaCPacket,this._regIDs[i].arg)===false){return false;}else{this._unregisterPID(pID);return true;}}catch(e){this.oDbg.log(e.name+": "+e.message);this._unregisterPID(pID);return true;}}}
return false;};JSJaCConnection.prototype._handleResponse=function(req){var rootEl=this._parseResponse(req);if(!rootEl)
return;for(var i=0;i<rootEl.childNodes.length;i++){if(this._sendRawCallbacks.length){var cb=this._sendRawCallbacks[0];this._sendRawCallbacks=this._sendRawCallbacks.slice(1,this._sendRawCallbacks.length);cb.fn.call(this,rootEl.childNodes.item(i),cb.arg);continue;}
this._inQ=this._inQ.concat(rootEl.childNodes.item(i));}};JSJaCConnection.prototype._parseStreamFeatures=function(doc){if(!doc){this.oDbg.log("nothing to parse ... aborting",1);return false;}
var errorTag;if(doc.getElementsByTagNameNS)
errorTag=doc.getElementsByTagNameNS("http://etherx.jabber.org/streams","error").item(0);else{var errors=doc.getElementsByTagName("error");for(var i=0;i<errors.length;i++)
if(errors.item(i).namespaceURI=="http://etherx.jabber.org/streams"){errorTag=errors.item(i);break;}}
if(errorTag){this._setStatus("internal_server_error");clearTimeout(this._timeout);clearInterval(this._interval);clearInterval(this._inQto);this._handleEvent('onerror',JSJaCError('503','cancel','session-terminate'));this._connected=false;this.oDbg.log("Disconnected.",1);this._handleEvent('ondisconnect');return false;}
this.mechs=new Object();var lMec1=doc.getElementsByTagName("mechanisms");this.has_sasl=false;for(var i=0;i<lMec1.length;i++)
if(lMec1.item(i).getAttribute("xmlns")=="urn:ietf:params:xml:ns:xmpp-sasl"){this.has_sasl=true;var lMec2=lMec1.item(i).getElementsByTagName("mechanism");for(var j=0;j<lMec2.length;j++)
this.mechs[lMec2.item(j).firstChild.nodeValue]=true;break;}
if(this.has_sasl)
this.oDbg.log("SASL detected",2);else{this.authtype='nonsasl';this.oDbg.log("No support for SASL detected",2);}
return true;};JSJaCConnection.prototype._process=function(timerval){if(!this.connected()){this.oDbg.log("Connection lost ...",1);if(this._interval)
clearInterval(this._interval);return;}
this.setPollInterval(timerval);if(this._timeout)
clearTimeout(this._timeout);var slot=this._getFreeSlot();if(slot<0)
return;if(typeof(this._req[slot])!='undefined'&&typeof(this._req[slot].r)!='undefined'&&this._req[slot].r.readyState!=4){this.oDbg.log("Slot "+slot+" is not ready");return;}
if(!this.isPolling()&&this._pQueue.length==0&&this._req[(slot+1)%2]&&this._req[(slot+1)%2].r.readyState!=4){this.oDbg.log("all slots busy, standby ...",2);return;}
if(!this.isPolling())
this.oDbg.log("Found working slot at "+slot,2);this._req[slot]=this._setupRequest(true);this._req[slot].r.onreadystatechange=JSJaC.bind(function(){if(!this.connected())
return;if(this._req[slot].r.readyState==4){this._setStatus('processing');this.oDbg.log("async recv: "+this._req[slot].r.responseText,4);this._handleResponse(this._req[slot]);if(this._pQueue.length){this._timeout=setTimeout(JSJaC.bind(this._process,this),100);}else{this.oDbg.log("scheduling next poll in "+this.getPollInterval()+" msec",4);this._timeout=setTimeout(JSJaC.bind(this._process,this),this.getPollInterval());}}},this);try{this._req[slot].r.onerror=JSJaC.bind(function(){if(!this.connected())
return;this._errcnt++;this.oDbg.log('XmlHttpRequest error ('+this._errcnt+')',1);if(this._errcnt>JSJAC_ERR_COUNT){this._abort();return false;}
this._setStatus('onerror_fallback');setTimeout(JSJaC.bind(this._resume,this),this.getPollInterval());return false;},this);}catch(e){}
var reqstr=this._getRequestString();if(typeof(this._rid)!='undefined')
this._req[slot].rid=this._rid;this.oDbg.log("sending: "+reqstr,4);this._req[slot].r.send(reqstr);};JSJaCConnection.prototype._registerPID=function(pID,cb,arg){if(!pID||!cb)
return false;this._regIDs[pID]=new Object();this._regIDs[pID].cb=cb;if(arg)
this._regIDs[pID].arg=arg;this.oDbg.log("registered "+pID,3);return true;};JSJaCConnection.prototype._sendEmpty=function JSJaCSendEmpty(){var slot=this._getFreeSlot();this._req[slot]=this._setupRequest(true);this._req[slot].r.onreadystatechange=JSJaC.bind(function(){if(this._req[slot].r.readyState==4){this.oDbg.log("async recv: "+this._req[slot].r.responseText,4);this._getStreamID(slot);}},this);if(typeof(this._req[slot].r.onerror)!='undefined'){this._req[slot].r.onerror=JSJaC.bind(function(e){this.oDbg.log('XmlHttpRequest error',1);return false;},this);}
var reqstr=this._getRequestString();this.oDbg.log("sending: "+reqstr,4);this._req[slot].r.send(reqstr);};JSJaCConnection.prototype._sendRaw=function(xml,cb,arg){if(cb)
this._sendRawCallbacks.push({fn:cb,arg:arg});this._pQueue.push(xml);this._process();return true;};JSJaCConnection.prototype._setStatus=function(status){if(!status||status=='')
return;if(status!=this._status){this._status=status;this._handleEvent('onstatuschanged',status);this._handleEvent('status_changed',status);}};JSJaCConnection.prototype._unregisterPID=function(pID){if(!this._regIDs[pID])
return false;this._regIDs[pID]=null;this.oDbg.log("unregistered "+pID,3);return true;};function JSJaCConsoleLogger(level){this.level=level||4;this.start=function(){};this.log=function(msg,level){level=level||0;if(level>this.level)
return;if(typeof(console)=='undefined')
return;try{switch(level){case 0:console.warn(msg);break;case 1:console.error(msg);break;case 2:console.info(msg);break;case 4:console.debug(msg);break;default:Debug.log(msg);break;}}catch(e){try{Debug.log(msg)}catch(e){}}};this.setLevel=function(level){this.level=level;return this;};this.getLevel=function(){return this.level;};}
function JSJaCCookie(name,value,secs)
{if(window==this)
return new JSJaCCookie(name,value,secs);this.name=name;this.value=value;this.expires=secs;this.write=function(){if(this.secs){var date=new Date();date.setTime(date.getTime()+(this.secs*1000));var expires="; expires="+date.toGMTString();}else
var expires="";document.cookie=this.getName()+"="+this.getValue()+expires+"; path=/";};this.erase=function(){var c=new JSJaCCookie(this.getName(),"",-1);c.write();};this.getName=function(){return this.name;};this.setName=function(name){this.name=name;return this;};this.getValue=function(){return this.value;};this.setValue=function(value){this.value=value;return this;};}
JSJaCCookie.read=function(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return new JSJaCCookie(name,c.substring(nameEQ.length,c.length));}
throw new JSJaCCookieException("Cookie not found");};JSJaCCookie.get=function(name){return JSJaCCookie.read(name).getValue();};JSJaCCookie.remove=function(name){JSJaCCookie.read(name).erase();};function JSJaCCookieException(msg){this.message=msg;this.name="CookieException";}
function JSJaCError(code,type,condition){var xmldoc=XmlDocument.create("error","jsjac");xmldoc.documentElement.setAttribute('code',code);xmldoc.documentElement.setAttribute('type',type);xmldoc.documentElement.appendChild(xmldoc.createElement(condition)).setAttribute('xmlns','urn:ietf:params:xml:ns:xmpp-stanzas');return xmldoc.documentElement;}
var JSJACJID_FORBIDDEN=['"',' ','&','\'','/',':','<','>','@'];function JSJaCJID(jid){this._node='';this._domain='';this._resource='';if(typeof(jid)=='string'){if(jid.indexOf('@')!=-1){this.setNode(jid.substring(0,jid.indexOf('@')));jid=jid.substring(jid.indexOf('@')+1);}
if(jid.indexOf('/')!=-1){this.setResource(jid.substring(jid.indexOf('/')+1));jid=jid.substring(0,jid.indexOf('/'));}
this.setDomain(jid);}else{this.setNode(jid.node);this.setDomain(jid.domain);this.setResource(jid.resource);}}
JSJaCJID.prototype.getNode=function(){return this._node;};JSJaCJID.prototype.getDomain=function(){return this._domain;};JSJaCJID.prototype.getResource=function(){return this._resource;};JSJaCJID.prototype.setNode=function(node){JSJaCJID._checkNodeName(node);this._node=node||'';return this;};JSJaCJID.prototype.setDomain=function(domain){if(!domain||domain=='')
throw new JSJaCJIDInvalidException("domain name missing");JSJaCJID._checkNodeName(domain);this._domain=domain;return this;};JSJaCJID.prototype.setResource=function(resource){this._resource=resource||'';return this;};JSJaCJID.prototype.toString=function(){var jid='';if(this.getNode()&&this.getNode()!='')
jid=this.getNode()+'@';jid+=this.getDomain();if(this.getResource()&&this.getResource()!="")
jid+='/'+this.getResource();return jid;};JSJaCJID.prototype.removeResource=function(){return this.setResource();};JSJaCJID.prototype.clone=function(){return new JSJaCJID(this.toString());};JSJaCJID.prototype.isEntity=function(jid){if(typeof jid=='string')
jid=(new JSJaCJID(jid));jid.removeResource();return(this.clone().removeResource().toString()===jid.toString());};JSJaCJID._checkNodeName=function(nodeprep){if(!nodeprep||nodeprep=='')
return;for(var i=0;i<JSJACJID_FORBIDDEN.length;i++){if(nodeprep.indexOf(JSJACJID_FORBIDDEN[i])!=-1){throw new JSJaCJIDInvalidException("forbidden char in nodename: "+JSJACJID_FORBIDDEN[i]);}}};function JSJaCJIDInvalidException(message){this.message=message;this.name="JSJaCJIDInvalidException";}
function JSJaCKeys(func,oDbg){var seed=Math.random();this._k=new Array();this._k[0]=seed.toString();if(oDbg)
this.oDbg=oDbg;else{this.oDbg={};this.oDbg.log=function(){};}
if(func){for(var i=1;i<JSJAC_NKEYS;i++){this._k[i]=func(this._k[i-1]);oDbg.log(i+": "+this._k[i],4);}}
this._indexAt=JSJAC_NKEYS-1;this.getKey=function(){return this._k[this._indexAt--];};this.lastKey=function(){return(this._indexAt==0);};this.size=function(){return this._k.length;};this._getSuspendVars=function(){return('_k,_indexAt').split(',');}}
var JSJACPACKET_USE_XMLNS=true;function JSJaCPacket(name){this.name=name;if(typeof(JSJACPACKET_USE_XMLNS)!='undefined'&&JSJACPACKET_USE_XMLNS)
this.doc=XmlDocument.create(name,'jabber:client');else
this.doc=XmlDocument.create(name,'');}
JSJaCPacket.prototype.pType=function(){return this.name;};JSJaCPacket.prototype.getDoc=function(){return this.doc;};JSJaCPacket.prototype.getNode=function(){if(this.getDoc()&&this.getDoc().documentElement)
return this.getDoc().documentElement;else
return null;};JSJaCPacket.prototype.setTo=function(to){if(!to||to=='')
this.getNode().removeAttribute('to');else if(typeof(to)=='string')
this.getNode().setAttribute('to',to);else
this.getNode().setAttribute('to',to.toString());return this;};JSJaCPacket.prototype.setFrom=function(from){if(!from||from=='')
this.getNode().removeAttribute('from');else if(typeof(from)=='string')
this.getNode().setAttribute('from',from);else
this.getNode().setAttribute('from',from.toString());return this;};JSJaCPacket.prototype.setID=function(id){if(!id||id=='')
this.getNode().removeAttribute('id');else
this.getNode().setAttribute('id',id);return this;};JSJaCPacket.prototype.setType=function(type){if(!type||type=='')
this.getNode().removeAttribute('type');else
this.getNode().setAttribute('type',type);return this;};JSJaCPacket.prototype.setXMLLang=function(xmllang){if(!xmllang||xmllang=='')
this.getNode().removeAttribute('xml:lang');else
this.getNode().setAttribute('xml:lang',xmllang);return this;};JSJaCPacket.prototype.getTo=function(){return this.getNode().getAttribute('to');};JSJaCPacket.prototype.getFrom=function(){return this.getNode().getAttribute('from');};JSJaCPacket.prototype.getToJID=function(){return new JSJaCJID(this.getTo());};JSJaCPacket.prototype.getFromJID=function(){return new JSJaCJID(this.getFrom());};JSJaCPacket.prototype.getID=function(){return this.getNode().getAttribute('id');};JSJaCPacket.prototype.getType=function(){return this.getNode().getAttribute('type');};JSJaCPacket.prototype.getXMLLang=function(){return this.getNode().getAttribute('xml:lang');};JSJaCPacket.prototype.getXMLNS=function(){return this.getNode().namespaceURI;};JSJaCPacket.prototype.getChild=function(name,ns){if(!this.getNode()){return null;}
name=name||'*';ns=ns||'*';if(this.getNode().getElementsByTagNameNS){return this.getNode().getElementsByTagNameNS(ns,name).item(0);}
var nodes=this.getNode().getElementsByTagName(name);if(ns!='*'){for(var i=0;i<nodes.length;i++){if(nodes.item(i).namespaceURI==ns){return nodes.item(i);}}}else{return nodes.item(0);}
return null;}
JSJaCPacket.prototype.getChildVal=function(name,ns){var node=this.getChild(name,ns);if(node&&node.firstChild){return node.firstChild.nodeValue;}else{return'';}};JSJaCPacket.prototype.clone=function(){return JSJaCPacket.wrapNode(this.getNode());};JSJaCPacket.prototype.isError=function(){return(this.getType()=='error');};JSJaCPacket.prototype.errorReply=function(stanza_error){var rPacket=this.clone();rPacket.setTo(this.getFrom());rPacket.setFrom();rPacket.setType('error');rPacket.appendNode('error',{code:stanza_error.code,type:stanza_error.type},[[stanza_error.cond]]);return rPacket;};JSJaCPacket.prototype.xml=function(){if(this.getDoc().xml)
return this.getDoc().xml;var xml=(new XMLSerializer()).serializeToString(this.getNode());if(typeof(xml)!='undefined')
return xml;return(new XMLSerializer()).serializeToString(this.doc);};JSJaCPacket.prototype._getAttribute=function(attr){return this.getNode().getAttribute(attr);};JSJaCPacket.prototype._replaceNode=function(aNode){for(var i=0;i<aNode.attributes.length;i++)
if(aNode.attributes.item(i).nodeName!='xmlns')
this.getNode().setAttribute(aNode.attributes.item(i).nodeName,aNode.attributes.item(i).nodeValue);for(var i=0;i<aNode.childNodes.length;i++)
if(this.getDoc().importNode)
this.getNode().appendChild(this.getDoc().importNode(aNode.childNodes.item(i),true));else
this.getNode().appendChild(aNode.childNodes.item(i).cloneNode(true));};JSJaCPacket.prototype._setChildNode=function(nodeName,nodeValue){var aNode=this.getChild(nodeName);var tNode=this.getDoc().createTextNode(nodeValue);if(aNode)
try{aNode.replaceChild(tNode,aNode.firstChild);}catch(e){}
else{aNode=this.getNode().appendChild(this.getDoc().createElement(nodeName));aNode.appendChild(tNode);}
return aNode;};JSJaCPacket.prototype.buildNode=function(elementName){return JSJaCBuilder.buildNode(this.getDoc(),elementName,arguments[1],arguments[2]);};JSJaCPacket.prototype.appendNode=function(element){if(typeof element=='object'){return this.getNode().appendChild(element)}else{return this.getNode().appendChild(this.buildNode(element,arguments[1],arguments[2]));}};function JSJaCPresence(){this.base=JSJaCPacket;this.base('presence');}
JSJaCPresence.prototype=new JSJaCPacket;JSJaCPresence.prototype.setStatus=function(status){this._setChildNode("status",status);return this;};JSJaCPresence.prototype.setShow=function(show){if(show=='chat'||show=='away'||show=='xa'||show=='dnd')
this._setChildNode("show",show);return this;};JSJaCPresence.prototype.setPriority=function(prio){this._setChildNode("priority",prio);return this;};JSJaCPresence.prototype.setPresence=function(show,status,prio){if(show)
this.setShow(show);if(status)
this.setStatus(status);if(prio)
this.setPriority(prio);return this;};JSJaCPresence.prototype.getStatus=function(){return this.getChildVal('status');};JSJaCPresence.prototype.getShow=function(){return this.getChildVal('show');};JSJaCPresence.prototype.getPriority=function(){return this.getChildVal('priority');};function JSJaCIQ(){this.base=JSJaCPacket;this.base('iq');}
JSJaCIQ.prototype=new JSJaCPacket;JSJaCIQ.prototype.setIQ=function(to,type,id){if(to)
this.setTo(to);if(type)
this.setType(type);if(id)
this.setID(id);return this;};JSJaCIQ.prototype.setQuery=function(xmlns){var query;try{query=this.getDoc().createElementNS(xmlns,'query');}catch(e){query=this.getDoc().createElement('query');}
if(query&&query.getAttribute('xmlns')!=xmlns)
query.setAttribute('xmlns',xmlns);this.getNode().appendChild(query);return query;};JSJaCIQ.prototype.getQuery=function(){return this.getNode().getElementsByTagName('query').item(0);};JSJaCIQ.prototype.getQueryXMLNS=function(){if(this.getQuery())
return this.getQuery().namespaceURI;else
return null;};JSJaCIQ.prototype.reply=function(payload){var rIQ=this.clone();rIQ.setTo(this.getFrom());rIQ.setType('result');if(payload){if(typeof payload=='string')
rIQ.getChild.appendChild(rIQ.getDoc().loadXML(payload));else if(payload.constructor==Array){var node=rIQ.getChild();for(var i=0;i<payload.length;i++)
if(typeof payload[i]=='string')
node.appendChild(rIQ.getDoc().loadXML(payload[i]));else if(typeof payload[i]=='object')
node.appendChild(payload[i]);}
else if(typeof payload=='object')
rIQ.getChild().appendChild(payload);}
return rIQ;};function JSJaCMessage(){this.base=JSJaCPacket;this.base('message');}
JSJaCMessage.prototype=new JSJaCPacket;JSJaCMessage.prototype.setBody=function(body){this._setChildNode("body",body);return this;};JSJaCMessage.prototype.setSubject=function(subject){this._setChildNode("subject",subject);return this;};JSJaCMessage.prototype.setThread=function(thread){this._setChildNode("thread",thread);return this;};JSJaCMessage.prototype.getThread=function(){return this.getChildVal('thread');};JSJaCMessage.prototype.getBody=function(){return this.getChildVal('body');};JSJaCMessage.prototype.getSubject=function(){return this.getChildVal('subject')};JSJaCPacket.wrapNode=function(node){var aNode;switch(node.nodeName.toLowerCase()){case'presence':aNode=new JSJaCPresence();break;case'message':aNode=new JSJaCMessage();break;case'iq':aNode=new JSJaCIQ();break;default:return null;}
aNode._replaceNode(node);return aNode;};function JSJaCHttpBindingConnection(oArg){this.base=JSJaCConnection;this.base(oArg);this._hold=JSJACHBC_MAX_HOLD;this._inactivity=0;this._last_requests=new Object();this._last_rid=0;this._min_polling=0;this._pause=0;this._wait=JSJACHBC_MAX_WAIT;}
JSJaCHttpBindingConnection.prototype=new JSJaCConnection();JSJaCHttpBindingConnection.prototype.inherit=function(oArg){this.domain=oArg.domain||'localhost';this.username=oArg.username;this.resource=oArg.resource;this._sid=oArg.sid;this._rid=oArg.rid;this._min_polling=oArg.polling;this._inactivity=oArg.inactivity;this._setHold(oArg.requests-1);this.setPollInterval(this._timerval);if(oArg.wait)
this._wait=oArg.wait;this._connected=true;this._handleEvent('onconnect');this._interval=setInterval(JSJaC.bind(this._checkQueue,this),JSJAC_CHECKQUEUEINTERVAL);this._inQto=setInterval(JSJaC.bind(this._checkInQ,this),JSJAC_CHECKINQUEUEINTERVAL);this._timeout=setTimeout(JSJaC.bind(this._process,this),this.getPollInterval());};JSJaCHttpBindingConnection.prototype.setPollInterval=function(timerval){if(timerval&&!isNaN(timerval)){if(!this.isPolling())
this._timerval=100;else if(this._min_polling&&timerval<this._min_polling*1000)
this._timerval=this._min_polling*1000;else if(this._inactivity&&timerval>this._inactivity*1000)
this._timerval=this._inactivity*1000;else
this._timerval=timerval;}
return this._timerval;};JSJaCHttpBindingConnection.prototype.isPolling=function(){return(this._hold==0)};JSJaCHttpBindingConnection.prototype._getFreeSlot=function(){for(var i=0;i<this._hold+1;i++)
if(typeof(this._req[i])=='undefined'||typeof(this._req[i].r)=='undefined'||this._req[i].r.readyState==4)
return i;return-1;};JSJaCHttpBindingConnection.prototype._getHold=function(){return this._hold;};JSJaCHttpBindingConnection.prototype._getRequestString=function(raw,last){raw=raw||'';var reqstr='';if(this._rid<=this._last_rid&&typeof(this._last_requests[this._rid])!='undefined')
reqstr=this._last_requests[this._rid].xml;else{var xml='';while(this._pQueue.length){var curNode=this._pQueue[0];xml+=curNode;this._pQueue=this._pQueue.slice(1,this._pQueue.length);}
reqstr="<body rid='"+this._rid+"' sid='"+this._sid+"' xmlns='http://jabber.org/protocol/httpbind' ";if(JSJAC_HAVEKEYS){reqstr+="key='"+this._keys.getKey()+"' ";if(this._keys.lastKey()){this._keys=new JSJaCKeys(hex_sha1,this.oDbg);reqstr+="newkey='"+this._keys.getKey()+"' ";}}
if(last)
reqstr+="type='terminate' ";else if(this._reinit){if(JSJACHBC_USE_BOSH_VER)
reqstr+="xmpp:restart='true' ";this._reinit=false;}
if(xml!=''||raw!=''){reqstr+=">"+raw+xml+"</body>";}else{reqstr+="/>";}
this._last_requests[this._rid]=new Object();this._last_requests[this._rid].xml=reqstr;this._last_rid=this._rid;for(var i in this._last_requests)
if(this._last_requests.hasOwnProperty(i)&&i<this._rid-this._hold)
delete(this._last_requests[i]);}
return reqstr;};JSJaCHttpBindingConnection.prototype._getInitialRequestString=function(){var reqstr="<body hold='"+this._hold+"' xmlns='http://jabber.org/protocol/httpbind' to='"+this.authhost+"' wait='"+this._wait+"' rid='"+this._rid+"'";if(this.host||this.port)
reqstr+=" route='xmpp:"+this.host+":"+this.port+"'";if(this.secure)
reqstr+=" secure='"+this.secure+"'";if(JSJAC_HAVEKEYS){this._keys=new JSJaCKeys(hex_sha1,this.oDbg);key=this._keys.getKey();reqstr+=" newkey='"+key+"'";}
if(this._xmllang)
reqstr+=" xml:lang='"+this._xmllang+"'";if(JSJACHBC_USE_BOSH_VER){reqstr+=" ver='"+JSJACHBC_BOSH_VERSION+"'";reqstr+=" xmpp:xmlns='urn:xmpp:xbosh'";if(this.authtype=='sasl'||this.authtype=='saslanon')
reqstr+=" xmpp:version='1.0'";}
reqstr+="/>";return reqstr;};JSJaCHttpBindingConnection.prototype._getStreamID=function(slot){this.oDbg.log(this._req[slot].r.responseText,4);if(!this._req[slot].r.responseXML||!this._req[slot].r.responseXML.documentElement){this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));return;}
var body=this._req[slot].r.responseXML.documentElement;if(body.getAttribute('authid')){this.streamid=body.getAttribute('authid');this.oDbg.log("got streamid: "+this.streamid,2);}else{this._timeout=setTimeout(JSJaC.bind(this._sendEmpty,this),this.getPollInterval());return;}
this._timeout=setTimeout(JSJaC.bind(this._process,this),this.getPollInterval());if(!this._parseStreamFeatures(body))
return;if(this.register)
this._doInBandReg();else
this._doAuth();};JSJaCHttpBindingConnection.prototype._getSuspendVars=function(){return('host,port,secure,_rid,_last_rid,_wait,_min_polling,_inactivity,_hold,_last_requests,_pause').split(',');};JSJaCHttpBindingConnection.prototype._handleInitialResponse=function(slot){try{this.oDbg.log(this._req[slot].r.getAllResponseHeaders(),4);this.oDbg.log(this._req[slot].r.responseText,4);}catch(ex){this.oDbg.log("No response",4);}
if(this._req[slot].r.status!=200||!this._req[slot].r.responseXML){this.oDbg.log("initial response broken (status: "+this._req[slot].r.status+")",1);this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));return;}
var body=this._req[slot].r.responseXML.documentElement;if(!body||body.tagName!='body'||body.namespaceURI!='http://jabber.org/protocol/httpbind'){this.oDbg.log("no body element or incorrect body in initial response",1);this._handleEvent("onerror",JSJaCError("500","wait","internal-service-error"));return;}
if(body.getAttribute("type")=="terminate"){this.oDbg.log("invalid response:\n"+this._req[slot].r.responseText,1);clearTimeout(this._timeout);this._connected=false;this.oDbg.log("Disconnected.",1);this._handleEvent('ondisconnect');this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));return;}
this._sid=body.getAttribute('sid');this.oDbg.log("got sid: "+this._sid,2);if(body.getAttribute('polling'))
this._min_polling=body.getAttribute('polling');if(body.getAttribute('inactivity'))
this._inactivity=body.getAttribute('inactivity');if(body.getAttribute('requests'))
this._setHold(body.getAttribute('requests')-1);this.oDbg.log("set hold to "+this._getHold(),2);if(body.getAttribute('ver'))
this._bosh_version=body.getAttribute('ver');if(body.getAttribute('maxpause'))
this._pause=Number.max(body.getAttribute('maxpause'),JSJACHBC_MAXPAUSE);this.setPollInterval(this._timerval);this._connected=true;this._inQto=setInterval(JSJaC.bind(this._checkInQ,this),JSJAC_CHECKINQUEUEINTERVAL);this._interval=setInterval(JSJaC.bind(this._checkQueue,this),JSJAC_CHECKQUEUEINTERVAL);this._getStreamID(slot);};JSJaCHttpBindingConnection.prototype._parseResponse=function(req){if(!this.connected()||!req)
return null;var r=req.r;try{if(r.status==404||r.status==403){this._abort();return null;}
if(r.status!=200||!r.responseXML){this._errcnt++;var errmsg="invalid response ("+r.status+"):\n"+r.getAllResponseHeaders()+"\n"+r.responseText;if(!r.responseXML)
errmsg+="\nResponse failed to parse!";this.oDbg.log(errmsg,1);if(this._errcnt>JSJAC_ERR_COUNT){this._abort();return null;}
this.oDbg.log("repeating ("+this._errcnt+")",1);this._setStatus('proto_error_fallback');setTimeout(JSJaC.bind(this._resume,this),this.getPollInterval());return null;}}catch(e){this.oDbg.log("XMLHttpRequest error: status not available",1);this._errcnt++;if(this._errcnt>JSJAC_ERR_COUNT){this._abort();}else{this.oDbg.log("repeating ("+this._errcnt+")",1);this._setStatus('proto_error_fallback');setTimeout(JSJaC.bind(this._resume,this),this.getPollInterval());}
return null;}
var body=r.responseXML.documentElement;if(!body||body.tagName!='body'||body.namespaceURI!='http://jabber.org/protocol/httpbind'){this.oDbg.log("invalid response:\n"+r.responseText,1);clearTimeout(this._timeout);clearInterval(this._interval);clearInterval(this._inQto);this._connected=false;this.oDbg.log("Disconnected.",1);this._handleEvent('ondisconnect');this._setStatus('internal_server_error');this._handleEvent('onerror',JSJaCError('500','wait','internal-server-error'));return null;}
if(typeof(req.rid)!='undefined'&&this._last_requests[req.rid]){if(this._last_requests[req.rid].handled){this.oDbg.log("already handled "+req.rid,2);return null;}else
this._last_requests[req.rid].handled=true;}
if(body.getAttribute("type")=="terminate"){this.oDbg.log("session terminated:\n"+r.responseText,1);clearTimeout(this._timeout);clearInterval(this._interval);clearInterval(this._inQto);if(body.getAttribute("condition")=="remote-stream-error")
if(body.getElementsByTagName("conflict").length>0)
this._setStatus("session-terminate-conflict");this._handleEvent('onerror',JSJaCError('503','cancel',body.getAttribute('condition')));this._connected=false;this.oDbg.log("Disconnected.",1);this._handleEvent('ondisconnect');return null;}
this._errcnt=0;return r.responseXML.documentElement;};JSJaCHttpBindingConnection.prototype._reInitStream=function(to,cb,arg){this._reinit=true;cb.call(this,arg);};JSJaCHttpBindingConnection.prototype._resume=function(){if(this._pause==0&&this._rid>=this._last_rid)
this._rid=this._last_rid-1;this._process();};JSJaCHttpBindingConnection.prototype._setHold=function(hold){if(!hold||isNaN(hold)||hold<0)
hold=0;else if(hold>JSJACHBC_MAX_HOLD)
hold=JSJACHBC_MAX_HOLD;this._hold=hold;return this._hold;};JSJaCHttpBindingConnection.prototype._setupRequest=function(async){var req=new Object();var r=XmlHttp.create();try{r.open("POST",this._httpbase,async);r.setRequestHeader('Content-Type','text/xml; charset=utf-8');}catch(e){this.oDbg.log(e,1);}
req.r=r;this._rid++;req.rid=this._rid;return req;};JSJaCHttpBindingConnection.prototype._suspend=function(){if(this._pause==0)
return;var slot=this._getFreeSlot();this._req[slot]=this._setupRequest(false);var reqstr="<body pause='"+this._pause+"' xmlns='http://jabber.org/protocol/httpbind' sid='"+this._sid+"' rid='"+this._rid+"'";if(JSJAC_HAVEKEYS){reqstr+=" key='"+this._keys.getKey()+"'";if(this._keys.lastKey()){this._keys=new JSJaCKeys(hex_sha1,this.oDbg);reqstr+=" newkey='"+this._keys.getKey()+"'";}}
reqstr+=">";while(this._pQueue.length){var curNode=this._pQueue[0];reqstr+=curNode;this._pQueue=this._pQueue.slice(1,this._pQueue.length);}
reqstr+="</body>";this.oDbg.log("Disconnecting: "+reqstr,4);this._req[slot].r.send(reqstr);};function JSJaCHttpPollingConnection(oArg){this.base=JSJaCConnection;this.base(oArg);JSJACPACKET_USE_XMLNS=false;}
JSJaCHttpPollingConnection.prototype=new JSJaCConnection();JSJaCHttpPollingConnection.prototype.isPolling=function(){return true;};JSJaCHttpPollingConnection.prototype._getFreeSlot=function(){if(typeof(this._req[0])=='undefined'||typeof(this._req[0].r)=='undefined'||this._req[0].r.readyState==4)
return 0;else
return-1;};JSJaCHttpPollingConnection.prototype._getInitialRequestString=function(){var reqstr="0";if(JSJAC_HAVEKEYS){this._keys=new JSJaCKeys(b64_sha1,this.oDbg);key=this._keys.getKey();reqstr+=";"+key;}
var streamto=this.domain;if(this.authhost)
streamto=this.authhost;reqstr+=",<stream:stream to='"+streamto+"' xmlns='jabber:client' xmlns:stream='http://etherx.jabber.org/streams'";if(this.authtype=='sasl'||this.authtype=='saslanon')
reqstr+=" version='1.0'";reqstr+=">";return reqstr;};JSJaCHttpPollingConnection.prototype._getRequestString=function(raw,last){var reqstr=this._sid;if(JSJAC_HAVEKEYS){reqstr+=";"+this._keys.getKey();if(this._keys.lastKey()){this._keys=new JSJaCKeys(b64_sha1,this.oDbg);reqstr+=';'+this._keys.getKey();}}
reqstr+=',';if(raw)
reqstr+=raw;while(this._pQueue.length){reqstr+=this._pQueue[0];this._pQueue=this._pQueue.slice(1,this._pQueue.length);}
if(last)
reqstr+='</stream:stream>';return reqstr;};JSJaCHttpPollingConnection.prototype._getStreamID=function(){if(this._req[0].r.responseText==''){this.oDbg.log("waiting for stream id",2);this._timeout=setTimeout(JSJaC.bind(this._sendEmpty,this),1000);return;}
this.oDbg.log(this._req[0].r.responseText,4);if(this._req[0].r.responseText.match(/id=[\'\"]([^\'\"]+)[\'\"]/))
this.streamid=RegExp.$1;this.oDbg.log("got streamid: "+this.streamid,2);var doc;try{var response=this._req[0].r.responseText;if(!response.match(/<\/stream:stream>\s*$/))
response+='</stream:stream>';doc=XmlDocument.create("doc");doc.loadXML(response);if(!this._parseStreamFeatures(doc))
return;}catch(e){this.oDbg.log("loadXML: "+e.toString(),1);}
this._connected=true;if(this.register)
this._doInBandReg();else
this._doAuth();this._process(this._timerval);};JSJaCHttpPollingConnection.prototype._getSuspendVars=function(){return new Array();};JSJaCHttpPollingConnection.prototype._handleInitialResponse=function(){this.oDbg.log(this._req[0].r.getAllResponseHeaders(),4);var aPList=this._req[0].r.getResponseHeader('Set-Cookie');aPList=aPList.split(";");for(var i=0;i<aPList.length;i++){aArg=aPList[i].split("=");if(aArg[0]=='ID')
this._sid=aArg[1];}
this.oDbg.log("got sid: "+this._sid,2);this._connected=true;this._interval=setInterval(JSJaC.bind(this._checkQueue,this),JSJAC_CHECKQUEUEINTERVAL);this._inQto=setInterval(JSJaC.bind(this._checkInQ,this),JSJAC_CHECKINQUEUEINTERVAL);this._getStreamID();};JSJaCHttpPollingConnection.prototype._parseResponse=function(r){var req=r.r;if(!this.connected())
return null;if(req.status!=200){this.oDbg.log("invalid response ("+req.status+"):"+req.responseText+"\n"+req.getAllResponseHeaders(),1);this._setStatus('internal_server_error');clearTimeout(this._timeout);clearInterval(this._interval);clearInterval(this._inQto);this._connected=false;this.oDbg.log("Disconnected.",1);this._handleEvent('ondisconnect');this._handleEvent('onerror',JSJaCError('503','cancel','service-unavailable'));return null;}
this.oDbg.log(req.getAllResponseHeaders(),4);var sid,aPList=req.getResponseHeader('Set-Cookie');if(aPList==null)
sid="-1:0";else{aPList=aPList.split(";");var sid;for(var i=0;i<aPList.length;i++){var aArg=aPList[i].split("=");if(aArg[0]=='ID')
sid=aArg[1];}}
if(typeof(sid)!='undefined'&&sid.indexOf(':0')!=-1){switch(sid.substring(0,sid.indexOf(':0'))){case'0':this.oDbg.log("invalid response:"+req.responseText,1);break;case'-1':this.oDbg.log("Internal Server Error",1);break;case'-2':this.oDbg.log("Bad Request",1);break;case'-3':this.oDbg.log("Key Sequence Error",1);break;}
this._setStatus('internal_server_error');clearTimeout(this._timeout);clearInterval(this._interval);clearInterval(this._inQto);this._handleEvent('onerror',JSJaCError('500','wait','internal-server-error'));this._connected=false;this.oDbg.log("Disconnected.",1);this._handleEvent('ondisconnect');return null;}
if(!req.responseText||req.responseText=='')
return null;try{var response=req.responseText.replace(/\<\?xml.+\?\>/,"");if(response.match(/<stream:stream/))
response+="</stream:stream>";var doc=JSJaCHttpPollingConnection._parseTree("<body>"+response+"</body>");if(!doc||doc.tagName=='parsererror'){this.oDbg.log("parsererror",1);doc=JSJaCHttpPollingConnection._parseTree("<stream:stream xmlns:stream='http://etherx.jabber.org/streams'>"+req.responseText);if(doc&&doc.tagName!='parsererror'){this.oDbg.log("stream closed",1);if(doc.getElementsByTagName('conflict').length>0)
this._setStatus("session-terminate-conflict");clearTimeout(this._timeout);clearInterval(this._interval);clearInterval(this._inQto);this._handleEvent('onerror',JSJaCError('503','cancel','session-terminate'));this._connected=false;this.oDbg.log("Disconnected.",1);this._handleEvent('ondisconnect');}else
this.oDbg.log("parsererror:"+doc,1);return doc;}
return doc;}catch(e){this.oDbg.log("parse error:"+e.message,1);}
return null;;};JSJaCHttpPollingConnection.prototype._reInitStream=function(to,cb,arg){this._sendRaw("<stream:stream xmlns:stream='http://etherx.jabber.org/streams' xmlns='jabber:client' to='"+to+"' version='1.0'>",cb,arg);};JSJaCHttpPollingConnection.prototype._resume=function(){this._process(this._timerval);};JSJaCHttpPollingConnection.prototype._setupRequest=function(async){var r=XmlHttp.create();try{r.open("POST",this._httpbase,async);if(r.overrideMimeType)
r.overrideMimeType('text/plain; charset=utf-8');r.setRequestHeader('Content-Type','application/x-www-form-urlencoded');}catch(e){this.oDbg.log(e,1);}
var req=new Object();req.r=r;return req;};JSJaCHttpPollingConnection.prototype._suspend=function(){};JSJaCHttpPollingConnection._parseTree=function(s){try{var r=XmlDocument.create("body","foo");if(typeof(r.loadXML)!='undefined'){r.loadXML(s);return r.documentElement;}else if(window.DOMParser)
return(new DOMParser()).parseFromString(s,"text/xml").documentElement;}catch(e){}
return null;};var JSJaC={Version:'1.3',require:function(libraryName){document.write('<script type="text/javascript" src="'+libraryName+'"></script>');},load:function(){var includes=['xmlextras','jsextras','crypt','JSJaCConfig','JSJaCConstants','JSJaCCookie','JSJaCJSON','JSJaCJID','JSJaCBuilder','JSJaCPacket','JSJaCError','JSJaCKeys','JSJaCConnection','JSJaCHttpPollingConnection','JSJaCHttpBindingConnection','JSJaCConsoleLogger'];var scripts=document.getElementsByTagName("script");var path='./';for(var i=0;i<scripts.length;i++){if(scripts.item(i).src&&scripts.item(i).src.match(/JSJaC\.js$/)){path=scripts.item(i).src.replace(/JSJaC.js$/,'');break;}}
for(var i=0;i<includes.length;i++)
this.require(path+includes[i]+'.js');},bind:function(fn,obj,arg){return function(){if(arg)
fn.apply(obj,arg);else
fn.apply(obj);};}};if(typeof JSJaCConnection=='undefined')
JSJaC.load();JSJaCConnection.prototype._doSASLAuthDigestMd5S1=function(el){if(el.nodeName!="challenge"){this.oDbg.log("challenge missing",1);this._handleEvent('onerror',JSJaCError('401','auth','not-authorized'));this.disconnect();}else{var challenge=atob(el.firstChild.nodeValue);this.oDbg.log("got challenge: "+challenge,2);this._nonce=challenge.substring(challenge.indexOf("nonce=")+7);this._nonce=this._nonce.substring(0,this._nonce.indexOf("\""));this.oDbg.log("nonce: "+this._nonce,2);if(this._nonce==''||this._nonce.indexOf('\"')!=-1){this.oDbg.log("nonce not valid, aborting",1);this.disconnect();return;}
this._digest_uri="xmpp/";this._digest_uri+=this.domain;this._cnonce=cnonce(14);this._nc='00000001';var A1=str_md5(this.username+':'+this.domain+':'+this.pass)+':'+this._nonce+':'+this._cnonce;var A2='AUTHENTICATE:'+this._digest_uri;var response=hex_md5(hex_md5(A1)+':'+this._nonce+':'+this._nc+':'+
this._cnonce+':auth:'+hex_md5(A2));var rPlain='username="'+this.username+'",realm="'+this.domain+'",nonce="'+this._nonce+'",cnonce="'+this._cnonce+'",nc="'+this._nc+'",qop=auth,digest-uri="'+this._digest_uri+'",response="'+response+'",charset=utf-8';this.oDbg.log("response: "+rPlain,2);this.oDbg.log('plain text response length is '+rPlain.length,2);this._sendRaw("<response xmlns='urn:ietf:params:xml:ns:xmpp-sasl'>"+Base64.encode(rPlain)+"</response>",this._doSASLAuthDigestMd5S2);}};var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}
output=output+
this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+
this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);}
return output;},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}
if(enc4!=64){output=output+String.fromCharCode(chr3);}}
output=Base64._utf8_decode(output);return output;},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}
else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}
else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}
return utftext;},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}
else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}
else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}
return string;}}
PubSubP8n={active:false,refsQ:[],workers:{length:0,grid:{}},workerSpeed:10,maxheight:1,singletons:["br","img","hr","input","!--"],singletonre:new RegExp('/('+["br","img","hr","input","!--"].join('|')+')/',"i"),chop:["<BR>","<br>","<br/>","<br />","<p></p>","<P></P>"],hre:/height\s*?=\s*?"(\d+?%?)"/,wre:/width\s*?=\s*?"(\d+?%?)"/,minimgscaleratio:.30,ERR_NODE_NEGATIVE_HEIGHT:100,getActive:function(){return this.active;},loadRefs:function(str,refnode,maxheight){if(!str)throw'Cannot load a null as string';var ind=this.refsQ.push({str:str,refnode:refnode,maxheight:maxheight,lastlen:undefined});var id=ind+'_'+(new Date()).getTime();if(!this.active){this.activate(id);}else{}
return(id);},activate:function(id){if(this.refsQ.length>0){this.active=true;this.subscribe('p8n/'+id+'/complete',this,function(){this.removeWorker(id);this.refsQ.shift();this.active=false;});this.assignWorker(id);}},assignWorker:function(id){this.workers.grid[id]=setInterval(dojo.hitch(this,function(){var html=this.refsQ[0]['str'];var node=this.refsQ[0]['refnode'];var maxheight=this.refsQ[0]['maxheight'];if(maxheight<1){dojo.publish('p8n/'+id+'/complete',[(new Date()).getTime(),this.ERR_NODE_NEGATIVE_HEIGHT]);}
var i=0;var limit=html.length;var add=0;var doLoop=true;html=this.adjustFirstImage(node,html,maxheight);while(doLoop){add=Math.round((limit-i)/2);if(add<=1){doLoop=false;}
i+=add;if(html.substr(0,i).match(/<[^>]*?$/)){var poo=html.substr(i).indexOf('>');if(poo!=-1){i+=(poo+1);}}
node.innerHTML=html.substr(0,i);if(node.scrollHeight>maxheight){limit=i;i-=add;}}
var s=this.splitAndBalance(html,i);dojo.publish('p8n/'+id+'/pagedata',[s.page,s.remainder.length]);if(s.remainder.length>0){if(this.refsQ[0]['lastlen']==s.remainder.length){console.log('abnormal completion');dojo.publish('p8n/'+id+'/complete',[(new Date()).getTime(),'FAILED']);}else{this.refsQ[0]['lastlen']=s.remainder.length;this.refsQ[0]['str']=s.remainder;}}else{dojo.publish('p8n/'+id+'/complete',[(new Date()).getTime()]);}}),this.workerSpeed);this.workers.length++;},adjustFirstImage:function(node,html,maxheight){node.innerHTML=html;var imgnodes=dojo.query('img',node);if(imgnodes[0]){var lh=dojo.style(node,'lineHeight');var maxlines=(maxheight/lh);var imgcoords=dojo.coords(imgnodes[0]);var nodecoords=dojo.coords(node);var imgh=imgcoords.h;var imagetop=imgcoords.y;var imagebottom=imgh+imagetop;var pagebottom=nodecoords.y+maxheight;if(imagetop>pagebottom)return html;if(imagebottom>pagebottom){var hadjust=Math.floor(imagebottom-pagebottom);var newh=imgh-hadjust;if(newh>20){newh=newh-60;}
var ratio=(newh/imgh);var neww=Math.floor(ratio*imgcoords.w);html=html.replace(/<img\s([^>]+?)>/,function(tag,atts,offset){var prepend='';if(atts.match(this.hre)){atts=atts.replace(this.hre,'height="'+newh+'"');}else{prepend+='height="'+newh+'" ';}
if(atts.match(this.wre)){atts=atts.replace(this.wre,'width="'+neww+'"');}else{prepend+='width="'+neww+'" ';}
atts=prepend+atts;return'<img '+atts+'>';});}}
return html;},splitAndBalance:function(html,i){var str=html;var subby=str.substr(0,i);if(subby!=str){var lastSpace=subby.lastIndexOf(" ");var lastNewLine=subby.lastIndexOf("\n");var lastGreater=subby.lastIndexOf(">");var lastLess=subby.lastIndexOf("<");if(lastLess<=lastGreater&&lastNewLine==i-1){i=i;}else{if(lastSpace!=-1&&lastSpace>lastGreater&&lastGreater>lastLess){i=lastSpace+1;}else{if(lastLess>lastGreater){i=lastLess;}else{if(lastGreater!=-1){i=lastGreater+1;}}}}}
str=str.substr(0,i);var ret=html.substr(str.length);var openTags=[];var doPush=true;var tags=str.split("<");tags.shift();for(var j=0;j<tags.length;j++){var tagj=tags[j].split(">")[0];if(tagj.charAt(tagj.length-1)=="/"){continue;}
if(tagj.charAt(0)!="/"){if(!tagj.split(" ")[0].match(this.singletonre)){openTags.push(tagj);}}else{openTags.pop();}}
for(var j=openTags.length-1;j>=0;j--){var ot=openTags[j];var lastot=str.lastIndexOf(ot);if(lastot==(str.length-ot.length-1)){str=str.substring(0,lastot-1);Debug.log(str);ret=["<",ot,">",ret].join('');}else{if(ot.indexOf(" ")){str+=["</",ot.split(" ")[0],">"].join('');}else{str+=["</",ot,">"].join('');}
if(ret.length>0){if(openTags[j].search(/^p[^a-z]*?/)!=-1){if(ot.match(/class="([^"]*?)"/)){ot=ot.replace(/class="([^"]*?)"/,' class="$1 fragment"');}else{ot+=' class="fragment" ';}}
ret=["<",ot,">",ret].join('');}}}
return{page:str,remainder:ret};},removeWorker:function(id){clearInterval(this.workers.grid[id]);delete this.workers.grid[id];this.workers.length--;},publish:function(topic,arr){dojo.publish(topic,arr);},subscribe:function(topic,context,cb){dojo.subscribe(topic,context,cb);}}