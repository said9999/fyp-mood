Mood.GammaTestView = Ember.View.extend({
	templateName : 'GammaTestView/gammatest',

	//drawChart:function(){
	//	drawChart();
	//}.on("didInsertElement"),

	didInsertElement: function(){ 
	   	$('.intro-gamma').blurjs({
		source : 'body',
		overlay: 'rgba(149, 165, 166,0.7)'
	});
	},


});