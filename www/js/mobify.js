
var parser = require('htmlparser');
var fs = require('fs');
var sys = require('sys');

var html = fs.readFileSync(process.argv[2]);

var jsdom = require("jsdom").jsdom;

jsdom.env(
	html.toString(),
	['./readsocial/lib/jquery-1.7.2.min.js', './readsocial/libRSAPI.js', './readsocial/libRSHash.js'],
	function (errors, window) {

		window.$('a.readsocial-epublink').attr('href', 'javascript:void(0)');

		window.$('a.readsocial-epublink').each(function (i,n) {
			
			var partnerId = 8;
			var button = window.$(n);
			var ReadSocial = window.ReadSocial;
			var $ = window.$;

			var ch = ReadSocial.API.createGroupName(button.text());
//			console.log(ch);

		    button.html('#'+ch);
			button.attr('title', 'Use ReadSocial to discuss with the #'+ch+' group');

		    var hashlabel = "readsocial-hashlabel-"+ch+'-'+(new Date()).getTime();
	 	    var p = button.parent('p');

		    var h = ReadSocial.hasher.normalize('');


		    var pc = $(p).clone(true,true);
		    $('a.readsocial-epublink',pc).empty();

		    var c = ReadSocial.hasher.normalize(pc.text().trim());

			var thumbprint = ReadSocial.hasher.thumbprint(c);

		    var g = [];

		    g.push(ch);
		    
		    var query = {
		      rid:partnerId,
		      base: 'https://api.readsocial.net',
		      api: 'https://api.readsocial.net',
		      s:'https://api.readsocial.net',
		      par_body:c,
		      par_hash:thumbprint,
		      l:c.indexOf(h),
		      r:c.indexOf(h)+h.length,
		      g:g.join('|'),
		      ch:ch,
		      v:'list',
		      sso:0,
		      iframe:0,
		      debug:'false'
		    };


		    var url = query.base+'/js/readsocial/ui.html?partnerId='+partnerId+'&'+$.param(query);

		    button.attr('href', url);

		    $('script').remove();
		    $('html')[0].removeAttribute('style');

		});


	 	console.log(window.document.innerHTML);



	}
);


