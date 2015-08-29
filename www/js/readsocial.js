

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
