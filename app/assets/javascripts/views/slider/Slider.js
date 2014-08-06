Mood.SliderView = Ember.View.extend({
	templateName : 'slider/sliderview',
	didInsertElement: function(){
		$('#sl1').slider();
	}
});
