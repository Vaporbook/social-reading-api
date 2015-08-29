var gdata;

function appreq(msg,data) {

FB.ui({
	method: 'apprequests',
	message: msg,
	data: data
	});
return false;

}


jQuery(document).ready(function () {
		
		

	

	jQuery.getScript('http://connect.facebook.net/en_US/all.js#appId=166838963362514&amp;xfbml=1', function (a,b) {


			jQuery('.headingbox.installcheck').hide();
			jQuery('.cblock.installcheck').hide();
			
			var attempts = 0;
			var detector = setInterval(function () {
			  if(jQuery('span#ReadumExtensionChrome').size()) {
					jQuery('.cblock.installed-chrome').fadeTo(1400,1);
					clearInterval(detector);
				} else if (jQuery('span#ReadumExtensionFF').size()) {
					jQuery('.cblock.installed-ff').fadeTo(1400,1);
					clearInterval(detector);
				}
				attempts++;
				if(attempts > 50) {
					jQuery('.headingbox.uninstalled').fadeTo(1500,1);
					jQuery('.cblock.uninstalled').fadeTo(1500,1);
					clearInterval(detector);
				}
			},100);
			
			/*
			
				
			if(jQuery('span#ReadumExtensionChrome').size()) {
		

				//jQuery('.headingbox.installed-chrome').show();
				jQuery('.cblock.installed-chrome').show();
			
		
			} else if(jQuery('span#ReadumExtensionFF').size()) {
		
				//jQuery('.headingbox.installed-ff').show();
				jQuery('.cblock.installed-ff').show();
		
		
			} else {

				jQuery('.headingbox.uninstalled').show();
				jQuery('.cblock.uninstalled').show();

			}

*/

			FB.init({appId:166838963362514});
			FB.Canvas.setAutoResize();
			
			FB.getLoginStatus(function (r) {

				if(r.session) {

				} else { // check for an access_token in URL
/*
					if(window.location.hash.length == 0) { //if not, redirect

					     var url = "https://www.facebook.com/dialog/oauth?client_id=" + 
					              '<?php echo $appid ?>'  + "&redirect_uri=" + window.location +
					              "&response_type=token";
					     window.location = url;

					} else { 
/*
					     var accessToken = window.location.hash.substring(1);
					     var graphUrl = "<?php echo $graphurl; ?>?" + accessToken +
					                 "&callback=displayData";
						  jQuery.getScript(graphUrl, function () {});
						*/

				//	}
				}
			});
	});
});

