Mood.SpaneTestRoute = Ember.Route.extend({
  // The code below is the default behavior, so if this is all you
  // need, you do not need to provide a setupController implementation
  // at all.
  setupController: function(controller,model) {
  	// pre-set up for spane test
    controller.set('startIndex',0);
    controller.set('scores',[5,5,5,5,5,5,5,5,5,5,5,5]);
    controller.set('imgUrl','assets/spane_photos/0.jpg')
  }
});