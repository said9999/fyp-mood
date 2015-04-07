/*************************
* Application logic for main page
**************************/
Mood.ApplicationController = Ember.ObjectController.extend({
	actions: {
        // log out handling
		logout : function(){
			setCookie('email','',1);
			setCookie('access_key','',1);

			var domain = window.location.href.split('//')[1].split('/')[0];
			window.location.replace('http://'+domain);
		}
	}

});