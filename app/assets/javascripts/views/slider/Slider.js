Mood.SliderView = Ember.View.extend({
	templateName : 'slider/sliderview',
	didInsertElement: function(){
        // enable slider
		$('#sl1').slider();
	}
});
