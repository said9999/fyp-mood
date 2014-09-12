Mood.SAMView = Ember.View.extend({
	templateName : 'sam-test/sam-test',

	click : function(e){
		var id = $(e.target).attr('id');
		if (id != undefined && id.indexOf('sam-')>-1){
			//alert('right');
			var controller = this.get('controller');
			controller.send('clickView',e.target);
		}
	},
	
	didInsertElement: function(){
		//alert('here');
		var controller = this.get('controller');
		img_base = controller.get('img_base');

		controller.send('changePhotos',img_base);
		controller.send('highlightPhoto',(img_base-1));

		/*
		$(".sam-img").click(function(){
			$(".sam-img").removeClass('sam-highlight');
			$(this).addClass('sam-highlight');
		});*/

		/*
	
		$("#next").click(function(){
			img_base = controller.get('img_base');
			updateScores(img_base-1);

			controller.set('img_base',img_base+1);
			img_base = controller.get('img_base');

			changePhotos(img_base);
			highlightPhoto(img_base-1);
		});

		$("#back").click(function(){
			alert('back');
		});*/
	
	}
});



