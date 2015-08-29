/*

Chrome:

Thankfully, the contentDocument.documentElement property does exist. Through this I can set and get the contents of an IFRAME.


*/


if(typeof RSAPI === 'undefined') RSAPI = {};

// helpers
RSAPI.helpers = {};
RSAPI.helpers.loadCss = function (src) {
	var cb = (arguments.length>1) ?
		arguments[1] :
		function () { };
	var s = document.createElement('link');
	s.type = "text/css";
	s.rel = "stylesheet";
	s.href = src;
  document.getElementsByTagName('head')[0].appendChild(s);
	return void(0);
};
RSAPI.helpers.injectCss = function (str) {
	var cb = (arguments.length>1) ?
		arguments[1] :
		function () { };
	var s = document.createElement('style');
	s.type = "text/css";
	s.innerHTML = str;
  document.getElementsByTagName('head')[0].appendChild(s);
	return void(0);
};
RSAPI.helpers.loadScript = function (src) {
	var cb = (arguments.length>1) ?
		arguments[1] :
		function () { };
	var s = document.createElement('script');
	s.src = src;
	s.onload=function () {
		cb();
	};
  document.body.appendChild(s);
	return void(0);
};
RSAPI.helpers.requireScript = function (cond, url, cb)
{
	if(cond) {

		RSAPI.helpers.loadScript(url, cb);

	} else {
		
		cb();
		
	}
}
RSAPI.helpers.clipString = function (str)
{
  if(!str) return str;
	var s = jQuery.trim(str.substring(0,700));
	if(s.substring(s.length-1)=='.'||s.substring(s.length-1)==' ') {

	} else {
		var ss = s.split(' ');
		var popped = ss.pop();
		if(ss[ss.length-1].toLowerCase()=='a') {
			var popped2 = ss.pop();			
		}
		var s = ss.join(' ')+'...';
	}
	return s;
}







// UI

RSAPI.makeMask = function () {
	var t = (new Date()).getTime();
	if(document.body) {
		document.body.style['overflow']='hidden';
		document.body.innerHTML += '<div style="height:100%; width:100%; position:absolute; top:0; left:0; opacity:.5;z-index:1000000" id="div'+t+'"></div>';
	}
}
RSAPI.popUI = function (e) {

	// called from trigger event

	RSAPI.uiActive = true;
	document.body.style.overflow = 'hidden';
	
	jQuery('#easyXDM_default0_provider').css({
		left:0,
		top:0,
		position:'fixed',
		width:'100%',
		height:'100%',
		zIndex:10000000,
		visibility:'hidden'
	});
	try {
	RSAPI.remote.go(
		{
			loc:window.location.href,
			link:RSAPI.canvas,
		  sel:RSAPI.sel,
		  bookid:RSAPI.bookid,
		  isbn:RSAPI.isbn,
		  author:RSAPI.authorname,
			pos:RSAPI.pos,
			title:document.title,
			ex:e.clientX,
			ey:e.clientY,
			cb: function(result){
        //alert('result of remote API call:'+result);
    	}
	  });
	} catch (e) {
		;
	}
	jQuery('#easyXDM_default0_provider').css({

		visibility:'visible'
	
	});
	
}; // popUI
RSAPI.notify = function (o) {
	
	var id = (new Date()).getTime();

	jQuery('body').append('<div class="notification'+id+'"></div>');
	
	jQuery('.notification'+id).html(o.html);
	
  jQuery('.notification'+id).dialog({
		
		title: o.title,
		modal:true,
		resizable:false,
		height:200,
		width:300,
		position:'center',
		draggable:false,
		show:"scale"
	
	});
	
	setTimeout(
	'(function () { jQuery(".notification'+id+'").dialog("destroy");	})()',
	4000);
	
}
RSAPI.uiBreakdown = function(msg) {

	// teardown for UI called from close or post
		
	RSAPI.console.log('releasing iframe');
	jQuery('#easyXDM_default0_provider').css({
		left:'-2000px',
		position: 'absolute',
		top:'0',
		width:'1px',
		height:'1px',
		zIndex:-1
	});
	document.body.style.overflow = 'auto';
	RSAPI.uiActive = false;
	RSAPI.console.log('released');
	
	
};
RSAPI.uiSelStat = function (str)
{
		jQuery('#rs_sel_stat').html(str);
}
RSAPI.uiStateStat = function (str)
{
		jQuery('#rs_appstate_stat').html(str);
}
RSAPI.uiLocStat = function (str)
{
		jQuery("#rs_loc_stat").html(str);
}




// INTERACTION

RSAPI.disable = function () {
	
	RSAPI.selectables.removeClass('hilite');
					
	RSAPI.appActive = false;
	
	RSAPI.hoverel = null;

	jQuery('#readum_prompt').css("visibility", "hidden");

	RSAPI.uiStateStat('<div style="width:23px;height:16px"><a href="#" onclick="RSAPI.enable();return false"><img height="16" width="23" src="http://' + RSAPI.rhost +'/images/dot-red.png" /></a></div>');
	
	RSAPI.setSelection('');
	
}
RSAPI.enable = function () {

	RSAPI.appActive = true;
	RSAPI.uiStateStat('<div style="width:23px;height:16px"><a href="#" onclick="RSAPI.disable();return false"><img height="16" width="23" src="http://' + RSAPI.rhost +RSAPI.appVersion+'/images/green-red.png" /></a></div>');
	
}
RSAPI.handleHover = function () {};

RSAPI.assignHoverHandler = function (f) {
	RSAPI.handleHover = f;
}
RSAPI.assignTriggerHandler = function (f) {
	RSAPI.handleTrigger = f;
}
RSAPI.handleTrigger = function () {};
RSAPI.onOldFBAPI = function () { return (FB.Facebook && !typeof FB.login != 'function'); };
RSAPI.setSelection = function(sel) {
	RSAPI.sel = sel;
}










// APPLICATION

RSAPI.bootstrap = function (o) {

		if(typeof o !== 'object') throw "This requires a config object.";
    var appVersion = '/readum';
    RSAPI.appVersion = appVersion;
		RSAPI.rhost = o.rhost;
		RSAPI.canvas = o.canvas;
		RSAPI.defaultApp = o.defaultApp;
		RSAPI.theme = o.theme;
		
		RSAPI.isFBready = false;
		RSAPI.debug = false;
		RSAPI.sel = null;
		RSAPI.bookid = null;
		RSAPI.authorname = null;
		RSAPI.isbn = null;
		RSAPI.pos = null;
		RSAPI.metas = null;
		RSAPI.uiActive = false; 
		RSAPI.adhocFB = false;
		RSAPI.appActive = true;
		RSAPI.selectionLimit = 20;
		RSAPI.css = 'p.hilite,div.hilite,td.hilite { background-color:yellow; } p.hilite-sticky,div.hilite-sticky,td.hilite-sticky { background-color:red; } img { border:none }; img.hilite { border-color:2px solid yellow; margin:-2px 0 0 -2px; } .selectable .ui-selecting { background: #FECA40; } .selectable .ui-selected { background: #F39814; color: white; } .selectable { list-style-type: none; margin: 0; padding: 0; width: 60%; } .selectable li { margin: 3px; padding: 0.4em; font-size: 1.4em; height: 18px; }'; // to inject into main doc header
		RSAPI.jquicss = appVersion+'/js/themes/'+RSAPI.theme+'/css/custom-theme/jquery-ui-1.8.9.custom.css';
		RSAPI.jquijs = appVersion+'/js/themes/'+RSAPI.theme+'/js/jquery-ui-1.8.9.custom.min.js';
		RSAPI.jqjs = appVersion+'/js/themes/'+RSAPI.theme+'/js/jquery-1.4.4.min.js';
		RSAPI.jquiurl = "http://" + RSAPI.rhost + RSAPI.jquijs;
		RSAPI.jqurl = "http://" + RSAPI.rhost + RSAPI.jqjs;
		RSAPI.jqcssurl = "http://" + RSAPI.rhost + RSAPI.jquicss;
		RSAPI.maincssurl = "http://" + RSAPI.rhost +appVersion+'/js/rs.css';
		RSAPI.xdmjsurl = "http://" + RSAPI.rhost +appVersion+"/js/xdm/easyXDM.min.js";
		RSAPI.jsonjsurl = "http://" + RSAPI.rhost +appVersion+"/js/xdm/json2.js";
		RSAPI.remotexd = "http://" + RSAPI.rhost +appVersion+"/js/xhr.html"; // defines the doc where the xd-client API lives
		RSAPI.remotehelp = "http://" + RSAPI.rhost +appVersion+"/js/name.html";
		// console wrapper

		RSAPI.console = {
			log: function (str) {
				if(typeof console === 'undefined') {

				} else {
					if(RSAPI.debug) {
						console.log(str);
					}
				}
			}
		}

	  RSAPI.console.log('bootstrap');
		RSAPI.helpers.injectCss(RSAPI.css);
		RSAPI.helpers.loadCss(RSAPI.jqcssurl);
		RSAPI.helpers.requireScript((typeof easyXDM  === 'undefined'), RSAPI.xdmjsurl, function () {
			
		  RSAPI.console.log('XDM found');
			
			RSAPI.helpers.requireScript((typeof JSON  === 'undefined'), RSAPI.jsonjsurl, function () {
				
			  RSAPI.console.log('JSON found');
			
				RSAPI.helpers.requireScript((typeof jQuery  === 'undefined'), RSAPI.jqurl, function () {
			
		  		RSAPI.console.log('jQuery found');

					jQuery.noConflict();
					
					RSAPI.helpers.requireScript((typeof jQuery(document).dialog  === 'undefined'), RSAPI.jquiurl, function () {	

					  RSAPI.console.log('jQuery-UI found');

						RSAPI.init();
						/*
						if(!jQuery('#fb-root').size()>0) {
							jQuery('body').append('<div id="fb-root"></div>');
						}

						// FB Connected???
						var fbcb = function (a,b)
						{

								RSAPI.init();

						}


						jQuery.getScript('http://connect.facebook.net/en_US/all.js#appId=166838963362514&xfbml=1', fbcb);
				*/

					});
				});
			});
		});
}
RSAPI.initChain = {};
RSAPI.initChain.parseURL = function () {
	function getUrlVars()
	{
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}
	var d = getUrlVars();
	RSAPI.bookid = d.id;
	RSAPI.pos = d.pg;
}
RSAPI.initChain.locateFrag = function () {
	
	// hilite the chosen paragraph is we can find it

	var hel = jQuery('#'+RSAPI.pos);
	var hels;
	if(hel.size()>0) {
		if(hel[0].tagName.toLowerCase() === 'p') {
			hels = hel;
		} else if(hel.parents('p').size()>0){
			hels = hel.parents('p');
		} else {
			hels = hel.next('p');
		}
		hels.addClass('hilite-sticky');
	}
}

RSAPI.initChain.prepUI = function () {
	
	var red = ['width:23px; height:16px; background-image:url(',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAQCAYAAAD9L+QYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDNDIyQzEzOTE1MjA2ODExQjg0MEVDNjBDQTg1OERBNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MkM0REZBQTJFNjcxMUUwOTNBRDgyREI5NzcxNTM4NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MkM0REZBOTJFNjcxMUUwOTNBRDgyREI5NzcxNTM4NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM2MjJDMTM5MTUyMDY4MTFCODQwRUM2MENBODU4REE3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM0MjJDMTM5MTUyMDY4MTFCODQwRUM2MENBODU4REE3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HzNFcwAAAfpJREFUeNqck09LG0EYxmd2kzVb1wTUpA2hNEQKlYAgOfsFhJ7aUjz00vZSeum9t0KP/QAFFaQHv4DQU4/1ICiIXtRDgpAcWktWWTeb3e5Mn4F3dQuzYfGFh2',
	'xmht8z8/7hUkqmgnPOMiLZMOhXpqSNhFlg2aGgJjQFlSCLDCIogMb0LbIAhQlgBZ2B5qDZer3eMU1zxnXdI8/zzrH2B3KhERRrIZq0cLrlLGCPWq3WB8dxnj8xYnMamTiTBXYxDo/7/f4nGO3j3C/IT7/ghqmBq9dUoGa73f76wpadl8aIzfPb128Lm21GJa/X672BwS6WfkNhUoeEaWheU1TwZrP5atVmnffm9X9gFWswe10MnEaj8RF/q5CtS0smvFwuP3tqBJnVVgaPS4WlarW6TAU38sBVWqaQ7/stHrNJ8RD7tm0v0IV4HnjSw/FfNjlGkjMhhJ/V8zq4Yo7CMDzdE1YmWFXhQBYFCnpIxRR54Org5XA4/LYjSuxcmlr4ejzNfN//gZ7vUq/LvDe/HAwG33+61xtvo0qsTMaU0hP0+ZfYYduBcdTtdj9j6YKmVeYdIlXUMvSgVqutoCPeWZa1iDPFKIp6uO0OwFvY79OUBmn4pCFKG9yjgarQt0GgK4J66eHJC08MOLWZRWac0haRYl068sDvHAnznwADAK1G1ow3nJAWAAAAAElFTkSuQmCC',
	');'].join('');

	var green = ['width:23px; height:16px; background-image:url(',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAQCAYAAAD9L+QYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDNDIyQzEzOTE1MjA2ODExQjg0MEVDNjBDQTg1OERBNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5MkM0REZBRTJFNjcxMUUwOTNBRDgyREI5NzcxNTM4NiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MkM0REZBRDJFNjcxMUUwOTNBRDgyREI5NzcxNTM4NiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM2MjJDMTM5MTUyMDY4MTFCODQwRUM2MENBODU4REE3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM0MjJDMTM5MTUyMDY4MTFCODQwRUM2MENBODU4REE3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2U/nCgAAAf9JREFUeNqck89L22AYx983SdPGxpZWUu16WKkXJTCVIr1sh+GfoFdB8ORt990G+yN2HP4Lg512mggeRFx3mkiq2LJf0lbTJCZN3j0vPNkyeFOCD3xpmrx8vs/7/K',
	'CMMcKDUkpSIv4g4S9LSBgxUyHpwaEyKA8qgFQ0CEAe6AGfozSAMgPMofOgBVC1Xq+3ZVmeH41GXdu2r+HdLWgEckGhECIoC8UsqwB72mq1Xum6vhPWpzLLM6L8UIg/Dr72+/03YHQK536CnOQN/jIFcH6bMqhpmuY71ona7uaERPq/22snRVI40uxer7cPBsfw6hfIj/sQMyXBbXIc3mw2d8k6a09e3v8H5uF2JsR77uqNRuM1/DW4n6gsqfBSqbTtrbmp3eYGyhP5mWEYG9hwKQuclyUP9V4MjSmZFWElJJqmLWNCNAs8nuFQPAOJaQgoiaLISZt5EZyn6/q+/0218ulkwOWu1Agaeo7NjLLA+cHxcDg8LHzRiHwrXoXiZ504jvMJZt7CWWdZlohnPh4MBh+hnivlm8qes2XLD6ZHmAJz/j1HuCk9k7qX1sVbOPsbt5VlXSJuWgIt1Wq1FzARB6qqrsKZXBAEPcj2g2VZ7+F7H7fUS8JnLVHSYA4XqozPEoLuEGonlycrPDagOGYqmlEsW4AKReXIAn90xMw/AgwAIHXYA3HSpioAAAAASUVORK5CYII%3D',
	');'].join('');

  var readumsm = [
		'width:88px; height:2em; background:transparent url(',
		'data:image/png;base64,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%3D',
		') top left no-repeat'
	].join(''); 

	jQuery('body').append('<div class="rs_navbar" style="position:fixed;bottom:4px;height:16px;font-size:14px;line-height:12px;left:10px;width:700px"></div>');

	var nav = jQuery('.rs_navbar');

	nav.append('<div style="position:absolute;bottom:0;left:0;width:68px;height:14px;border:none; color:blue; font-weight:bold; overflow:hidden;"><img src="http://'+RSAPI.rhost+RSAPI.appVersion+'/images/readumlogo-bottom.png" height="14px" width="68px" /><span id="rs_appname_stat"></span></div>');

	nav.append('<div style="position:absolute;bottom:0;left:70px;height:14px;border:none; color:blue; width:23px;overflow:hidden"><span id="rs_appstate_stat"></span></div>');

	nav.append('<div style="position:absolute;bottom:0;left:98px;height:14px;border:none; width:300px;overflow:hidden"><span id="rs_loc_stat"></span></div>');

	nav.append('<div style="position:absolute;bottom:0;left:398px;height:14px;border:none; width:300px;overflow:hidden"><span id="rs_sel_stat"></span></div>');

	var tt = '<div style="position: fixed; left: 500px; bottom: 0px; display: none;" class="gb-slider-tooltip"><div class="gb-slider-tooltip-body"><div class="gb-slider-tooltip-line"><span id="rs_tooltip_stat"></span></div><div class="gb-slider-tooltip-pointer" style="left: 70px;"><div class="gb-slider-tooltip-pointer-outer"><div class="gb-slider-tooltip-pointer-inner"></div></div></div></div></div>';

	jQuery('body').append(tt);

	RSAPI.uiStateStat('<div style="width:23px;height:16px"><a href="#"><img height="16" width="23" src="http://' + RSAPI.rhost +RSAPI.appVersion+'/images/dot-red.png" /></a></div>');

	var ststr = ["visibility:visible; opacity: 1.0; width:89px; height:48px; position:fixed; top:0px; left:-2000px; background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAAAwCAYAAAB68NY9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFNUJGMzI1MTMyMjE2ODExOEI4NUU1NUNBODEyRjcyQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5OUQ3QTQ3NTI3M0QxMUUwOTY5QUQwNzA3QUQ4RkUwQyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5OUQ3QTQ3NDI3M0QxMUUwOTY5QUQwNzA3QUQ4RkUwQyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1QkYzMjUxMzIyMTY4MTE4Qjg1RTU1Q0E4MTJGNzJCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1QkYzMjUxMzIyMTY4MTE4Qjg1RTU1Q0E4MTJGNzJCIi8+IDwvcmRmOkRlc2NyaXB0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%3D);"].join('');

	jQuery('body').append(['<div id="readum_prompt" style="',ststr,'"></div>'].join(''));

	jQuery('#readum_prompt').css("visibility", "hidden");
	
	jQuery('.gb-layout .gb-layout-topbar *').css("visibility", "hidden");
	jQuery('.gb-layout .gb-layout-status *').css("visibility", "hidden");
 
}
RSAPI.initChain.assignHandlers = function () {
	
	
	var b = document.body;
	
	RSAPI.assignHoverHandler(function (e) {

			if(RSAPI.uiActive||!RSAPI.appActive) {
				RSAPI.console.log('UI active or app not acive');	
				return;
			}
			// since elements available in view change, this must happen every time hover does
			RSAPI.selectables = jQuery('p');

			var hel = null; // valid hover highlight element
			var et = e.target; // actual hover element
			
			// resolve validity of hover el as selectable
			
			if (!et.tagName.match(/^(TD|TR|DIV|TABLE|BODY|TBODY)$/)) {
				var p = jQuery(et).parent('p');
				if((p.size()>0)) {
					hel = p[0];
				} else if (et.tagName=='P') {
					hel = et;
				} else {
					;
				}
			} else {
				
				// handle divs with text content in them, exception for books without p tags
				// hopefully this will be fixed soon -- all books should have p tags to 
				// designate paragraphs and distinguish them semantically from other blocks of text
				// or block elements
				
				var d = jQuery(et).parents('div.gb-content');
				if((d.size()>0)) {
					
					RSAPI.selectables.push(d[0]);
					hel = d[0];
					d.addClass('hl-adhoc');
					
					// TODO see if we can extract a more precise bit of text
					// based on where the actual click/trigger event occurs
					// within this larger block
					
				} else {
					//RSAPI.console.log('not defining anything for '+et.tagName+' which is in exclusion list');					
				}
				
				
			}

			try {

				RSAPI.selectables.removeClass('hilite');

				e.stopPropagation();
				
				
				// if we got a suitable hover el from the event,
				
				if(hel) {

					// HOVER IN

					RSAPI.hoverel = hel;

					jQuery(hel).addClass('hilite');

					if(!jQuery('.readum_wrap', hel).size()>0) {

						jQuery(hel).wrapInner('<span class="readum_wrap"></span>');

					}
					
					jQuery('#readum_prompt').css("visibility", "visible");

				  var pos = '---';
				
					// set a sensible page position, defaulting to
					// what the UI says we're viewing if no ID is found
				
					var p = jQuery('input.gb-pagecontrol-input').val().split('-');
					pos = 'GBS.PA'+p[0];
					
					if(pos = RSAPI.hoverel.id) {

					} else {
						
						var as = jQuery(RSAPI.hoverel).find('a[id]');
						
						if(as.size()>0) {
							
								for(var i = 0; i < as.size(); i++) {
									
									if(as[i].id.match(/^GBS/)) {
										pos = as[i].id;
										break;
									}
									
								}

						}
						
						
					}
					RSAPI.pos = pos;
					RSAPI.uiLocStat(pos);



				} else {

					if(et.id!='readum_prompt') {

						// HOVER OUT

						RSAPI.hoverel = null;

						jQuery('#readum_prompt').css("visibility", "hidden");

						RSAPI.uiSelStat('');

			//			RSAPI.setSelection('');
						
						RSAPI.uiLocStat('---');	
						
					}

				}

	 		} catch (e) {
				RSAPI.console.log(e);
				;
			}

	});
	
	RSAPI.assignTriggerHandler(function (e) {


				if(!RSAPI.uiActive&&RSAPI.hoverel&&RSAPI.appActive) {

					RSAPI.console.log('caught trigger');
					
					try {
						
						e.stopPropagation();

						var r = document.createRange();

						r.selectNodeContents(e.target);

						RSAPI.console.log(r.toString());

						RSAPI.setSelection(RSAPI.helpers.clipString(r.toString()));

						RSAPI.console.log('calling popUI');

						RSAPI.popUI(e);

					} catch(ex) {
						;
					}
				} else {

					RSAPI.console.log('UI is already active or no hover element');

				}
				


	});

	jQuery(b).mousemove(function (e) {

		jQuery('#readum_prompt').css({

			left: e.clientX-15,
			top: e.clientY-50

		});
		
	});

	jQuery(b).mouseover(RSAPI.handleHover);

	function calcLoc(e) {
		var a1 = (e.offsetY*e.offsetX);
		var a2 = (e.target.offsetHeight*e.target.offsetWidth);
		var per = a1/a2;
		return Math.round(per*100);
	}

  jQuery(b).mousedown(function (e) {
	

		//RSAPI.console.log('start range at:'+e.target);
		//RSAPI.console.log(e);
		//RSAPI.console.log(calcLoc(e));
		//RSAPI.console.log(e.target.getClientRects());

	});

	jQuery(b).mouseup(function (e) {

		if(e.target.tagName!='A') {

			//RSAPI.console.log('end range at:'+e.target);		
			//RSAPI.console.log(e);
			//RSAPI.console.log(calcLoc(e));
		
			RSAPI.handleTrigger(e);			
		
		}
		
	});
}
RSAPI.init = function () {
	
	// called from bootstrap -- do not call before!

			
	RSAPI.console.log('init');
	
	/*
	 FB.init({appId:RSAPI.defaultApp});	


	 if(window.location.hash.length == 0)
   {


			RSAPI.console.log('no Facebook session');

			var gurl = window.location.pathname+window.location.search;
			var redir = 'http://readum.readsocial.net/main/gbook?url='+escape(gurl);
			RSAPI.ourl = 'https://www.facebook.com/dialog/oauth?response_type=token&client_id='+RSAPI.defaultApp+'&redirect_uri='+escape(redir);

			var rd = window.location.href;
			window.location.href = 'https://www.facebook.com/dialog/oauth?client_id='+RSAPI.defaultApp+'&redirect_uri='+redir+'&scope=read_stream,publish_stream,offline_access,user_groups';										


   } else {
	

   }
	*/
	/*
			
	 FB.getLoginStatus(function (r) { // TODO -- NOT WORKING!!


			RSAPI.console.log('got back from FB with response');

			if(r) {

				if(r.session) {

					RSAPI.console.log(r.session);
					RSAPI.init(r.session);

				}	else {

					window.location.href = RSAPI.ourl;												

				}							


			} else {

				window.location.href = RSAPI.ourl;

			}


	});

*/										
	
	
	// XD

	// define the remote procedure (XD) object
	RSAPI.rpcdef = {
	  local: document.location.href,
	  remote: RSAPI.remotexd,
	  remoteHelper: RSAPI.remotehelp,
	  onReady: function(){
	      RSAPI.remote.noOp();
	  }
	}
	// define the XD rpc interface
	// release method ties to uiBreakdown
	// and is called from the remote
	// close or finish actions
	RSAPI.rpcinterface = {
	    remote: {
	        go: {},
					noOp: {}
	    },
	    local: {
	        notify: function(o){
	          RSAPI.notify(o);
	        },
					release: function (o){
						RSAPI.uiBreakdown(o);
					},
					log: function (m) {
						RSAPI.console.log(m);
					}
	    }

	};

	try {
		RSAPI.remote = new easyXDM.Rpc(RSAPI.rpcdef, RSAPI.rpcinterface);
	} catch (e) {
		RSAPI.console.log(e);
	}
	
	RSAPI.initChain.parseURL();
	
	RSAPI.initChain.locateFrag();

 	RSAPI.initChain.prepUI();

	RSAPI.initChain.assignHandlers();

	RSAPI.console.log("added interaction handlers");

	RSAPI.enable();

}


