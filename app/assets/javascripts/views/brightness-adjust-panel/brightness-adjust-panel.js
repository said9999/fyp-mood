Mood.BrightnessAdjustPanel = Ember.View.extend({
	templateName : 'brightness-adjust-panel/brightness-adjust-panel',

	didInsertElement: function(){ 
    	$('#sl1').slider();

    	$('.panel').blurjs({
    		source: 'body',
			radius: 3
    	});
	},


});

 