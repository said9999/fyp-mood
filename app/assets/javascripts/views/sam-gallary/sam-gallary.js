Mood.SAMView = Ember.View.extend({
	templateName : 'sam-test/sam-test',
	// action after clicking a SAM manikin
	click : function(e){
		var id = $(e.target).attr('id');
		if (id != undefined && id.indexOf('sam-')>-1){
			var controller = this.get('controller');
			controller.send('clickView',e.target);
		}
	},
	
	didInsertElement: function(){
		var controller = this.get('controller');
		img_base = controller.get('img_base');

		//refresh photos
		controller.send('changePhotos',img_base);
		controller.send('highlightPhoto',(img_base-1));	
	}
});



