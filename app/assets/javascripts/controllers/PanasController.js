/*************************
* PANAS utility page logic
**************************/
Mood.PanasController = Ember.ObjectController.extend({
	actions : {
		start : function(){
			var val = $('#select').val();

		  	if(val == 1)
		  		this.transitionToRoute('panas-text-test');
		  	else if(val == 2)
		  		this.transitionToRoute('panas-test');
	  	}
		
	}
});