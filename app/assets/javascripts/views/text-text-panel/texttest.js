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

		var that = this.get('controller');
		$('#submit').click(function(){
			mail_addr = getCookie('email');
			var score = 0;
			
			for(var i=1;i<=10;i++){
				var id = '#sl'+i;
				var mark = $(id).slider('getValue');

				if(i==3 || i==5 || i==8 || i==7 || i==10)
					score = score + mark * 100;
				else
					score += mark
			}
			
			$.post('/data_update/panas',{total_score:score,email:mail_addr})
				.done(function(){
					alert('result submit successfully');
					that.transitionToRoute('submit_success');
			});
		});

	}
});