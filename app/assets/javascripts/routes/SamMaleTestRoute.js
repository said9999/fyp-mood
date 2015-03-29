Mood.SamMaleTestRoute = Ember.Route.extend({

	renderTemplate : function(){
		//alert('here');
		var controller = this.controllerFor('samTest');
		controller.set('photoFileBase','assets/SAM/SAM-MALE/');
		controller.set('img_base',1);
	    controller.set('scores',[3,3,3]);
	    controller.set('suffix','.png');

		this.render('sam-test', {
      		controller: controller
    	});

	}
});