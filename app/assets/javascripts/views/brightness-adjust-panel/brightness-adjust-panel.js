Mood.BrightnessAdjustPanel = Ember.View.extend({
	templateName : 'brightness-adjust-panel/brightness-adjust-panel',

	didInsertElement: function(){ 
    	$('#sl1').slider();

    	$("#ex2Slider" + " .slider-selection").css("background", "#BABABA");

    	$('.panel').blurjs({
    		source: 'body',
			radius: 10
    	});
	},


});

 