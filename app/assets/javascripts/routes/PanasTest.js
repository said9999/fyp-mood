Mood.PanasTestRoute = Ember.Route.extend({
  // The code below is the default behavior, so if this is all you
  // need, you do not need to provide a setupController implementation
  // at all.
  setupController: function(controller,model) {
  	alert('in setup controller')
    controller.set('startIndex',1);
    controller.set('imgUrl','assets/panas_photos/1.jpg');
  }
});