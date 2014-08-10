Mood.PamGalleryView = Ember.View.extend({
	templateName : 'pamgalleryviews/pamgalleryviews',
	didInsertElement: function(){
		/*******************
			funcitons
		 *******************/
		Array.prototype.contains = function ( needle ) {
   			for (i in this) {
       			if (this[i] == needle) return true;
   			}

   			return false;
		};

		 function randomPhotos(){
		 	var mySet = [];
		 	var max=21;

		 	while(mySet.length < 9){
		 		var id = Math.random() * 10000 % max;
		 		id = Math.floor(id);

		 		if(!mySet.contains(id))
		 			mySet.push(id);
		 	}
		 	return mySet;
		 };

		 function replacePhotos(array){
		 	for(i=0;i<9;i++){
				var id = '#pic'+i;
				$(id).attr("src","assets/PAM/" + array[i] + ".jpg"); 
			}
		 };

		/********************
			insert photos
		*********************/
		var array = randomPhotos();
	 	replacePhotos(array);

		/*******************
			Brightness
		********************/
		$('.galleryPic').css('-webkit-filter','brightness(0.7)');
		$('.galleryPic').css('filter', 'brightness(0.7)');			


		$('.galleryPic').hover(function(e){
			$(this).css('-webkit-filter','brightness(1.0)');
			$(this).css('filter', 'brightness(1.0)');		
		});

		$('.galleryPic').mouseout(function(e){
			$(this).css('-webkit-filter','brightness(0.7)');
			$(this).css('filter', 'brightness(0.7)');		
		});

		/********************
		 	try other photos
		 ********************/
	 	$('.newset').click(function(){
	 		var array = randomPhotos();
	 		replacePhotos(array);
	 	});
	}
});
