/*************************
* Pam utility page logic
**************************/
Mood.PamController = Ember.ObjectController.extend({
  actions : {
  	start : function(){
  	var val = $('#select').val();

  	if(val == 1)
  		this.transitionToRoute('pam-test');
  	else if(val == 2)
  		this.transitionToRoute('pam-keyword-test');
  	}
  }
});