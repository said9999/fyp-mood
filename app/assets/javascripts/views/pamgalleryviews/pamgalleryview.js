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
		 	var max=48;

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

	 	/********************
	 	    click and submit
	 	 ********************/
	 	 var that = this;
	 	 $('.galleryPic').click(function(){
	 	 	var src = $(this).attr('src');
	 	 	var photo_id = src.split("/")[2].split(".")[0]; //src = assets/photos/3.jpg
	 	 	
	 	 	var score = photo_id*2;
	 	 	var mail_addr = getCookie('email');

	 	 	var controller = that.get('controller');
	 	 	$.post("data_update/pam",{email:mail_addr,total_score:score})
	 	 		.done(function(){
	 	 			controller.transitionToRoute('submit_success');
	 	 		});
	 	 });
	}
});
