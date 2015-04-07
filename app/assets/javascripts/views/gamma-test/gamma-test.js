Mood.GammaTestView = Ember.View.extend({
	templateName : 'GammaTestView/gammatest',

	didInsertElement: function(){ 
	   	// enable blurjs effect before load gamma-test page
	   	$('.intro-gamma').blurjs({
			source : 'body',
			overlay: 'rgba(149, 165, 166,0.7)'
		});
	},


});