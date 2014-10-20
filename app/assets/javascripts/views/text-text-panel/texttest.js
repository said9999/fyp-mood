Mood.TextTestView = Ember.View.extend({
	templateName : 'text-test-view/text-test',

	didInsertElement: function(){
		for (var i=1;i<=10;i++){
			var id = "#sl" + i;
			$(id).slider();
			$(id).css("width","%50");
			$(id).css("margin","0 auto");

			var data_id = "#text-sl" + i;
			$(data_id + " .slider-selection").css("background", "#BABABA");


		}

		$('.slider-vertical').click(function(){
			var id = $(this).attr('id');
			id = id.split("-")[1];

			var mark_id = "#mark" + id.split('l')[1];

			//alert(mark_id);

			var mark = $("#"+id).slider('getValue');
			//alert(mark);

			$(mark_id).html("<u>"+ (6-mark) + "</u>");
		});
		
	}
});