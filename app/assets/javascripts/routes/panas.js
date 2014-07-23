alert('in panas file');

Mood.PanasRoute = Ember.Route.extend({

	model: function(){
		alert('in panas route');
		return ['hehe'];
	}
})