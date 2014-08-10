Mood.PamGalleryView = Ember.View.extend({
	templateName : 'pamgalleryviews/pamgalleryviews',
	didInsertElement: function(){
		$('.galleryPic').css('z-index',0);
		$('.galleryPic').hover(function(e){
			$(this).animate({
				'width':'320px',
				'height':'auto',
				 'z-index':'1'

			},300);
			

		});

		$('.galleryPic').mouseout(function(e){
			$(this).animate({
				'width':'280px',
				'height':'auto',
				 'z-index':'0'
			},200);
		});
	}
});
