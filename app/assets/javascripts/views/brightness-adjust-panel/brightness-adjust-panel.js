Mood.BrightnessAdjustPanel = Ember.View.extend({
	templateName : 'brightness-adjust-panel/brightness-adjust-panel',

    // 
	didInsertElement: function(){ 
    	//enable boostrap slider and just the css params
        $('#sl1').slider();
    	$("#ex2Slider" + " .slider-selection").css("background", "#BABABA");

        //enable blurjs effect before loading brightness adjust panel
    	$('.panel').blurjs({
    		source: 'body',
			radius: 10
    	});
	},
});

 