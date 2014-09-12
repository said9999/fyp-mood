Mood.SamTestController = Ember.ObjectController.extend({
  img_base : 1,

  firstPage : function(){
  	if (this.img_base == 1) 
  		return true
  	
  	return false
  }.property('img_base'),

  lastPage : function(){
  	if (this.img_base == 3) 
  		return true
  	
  	return false
  }.property('img_base')
});
