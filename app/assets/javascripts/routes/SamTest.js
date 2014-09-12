Mood.SamTestRoute = Ember.Route.extend({
  // The code below is the default behavior, so if this is all you
  // need, you do not need to provide a setupController implementation
  // at all.
  setupController: function(controller,model) {
  	//alert('in setup controller')
    controller.set('img_base',1);
    controller.set('scores',[3,3,3]);
  }
});