Mood.SAMView = Ember.View.extend({
	templateName : 'sam-test/sam-test',
	
	didInsertElement: function(){
		var controller = this.get('controller');
		img_base = controller.get('img_base');
		changePhotos(img_base);

		$('#next').addClass("disabled");

		$(".sam-img").click(function(){
			$(".sam-img").css('border',"");
			$(this).css('border',"10px solid #ff4256");
			$('#next').removeClass("disabled");
		});

		$('#next').click(function()){
			
		}
		
	}
});

function changePhotos(base){
	for (var i=1;i<6;i++){
		var sam_root = '#sam-';
		var sam_id = sam_root+i;

		var img_src = "/assets/SAM/"+ base + "-" + i + ".jpg";

		//alert(img_src);
		$(sam_id).attr('src',img_src);
	}
}

