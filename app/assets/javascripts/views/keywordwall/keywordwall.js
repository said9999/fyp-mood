Mood.KeywordView = Ember.View.extend({
	templateName : 'keywordview/keyword',

	didInsertElement: function(){ 
	 	var valueMap = {
	 		11:1,
	 		12:2,
	 		13:5,
	 		14:6,
	 		21:3,
	 		22:4,
	 		23:7,
	 		24:8,
	 		31:9,
	 		32:10,
	 		33:13,
	 		34:14,
	 		41:11,
	 		42:12,
	 		43:15,
	 		44:16
	 	};

	 	var that = this;
	 	$('#submit').on("click",function(){
	 		var arouse_val = $('#ex1').slider('getValue');
	 		var pleasure_val = $('#ex2').slider('getValue');
	 		var key = arouse_val + pleasure_val * 10;
	 		var email = getCookie('email');

	 		var score = valueMap[key];

	 		var controller = that.get('controller');
	 	 	$.post("data_update/pam",{email:email,total_score:score})
	 	 		.done(function(){
	 	 			controller.transitionToRoute('submit_success');
	 	 		});
	 	});

	 	$('#ex1').slider();
	 	$('#ex2').slider();   

	 	$("#ex1Slider" + " .slider-selection").css("background", "#BABABA");
	 	$("#ex2Slider" + " .slider-selection").css("background", "#BABABA");

	 	//PA NA
	 	var panas_array = ['Determined','Attentive','Inspired','Active','Afraid','Upset','Ashamed','Hostile'];
	 	var arouse_array = ['Astonished','Fearful/Excited','Happy/Angry','Distressed','Defeated','Relaxed','Uninterested','Bored'];

	 	//alert('click');
 		var arouse_val = $('#ex1').slider('getValue');
 		var pleasure_val = $('#ex2').slider('getValue');
 		//alert(arouse_val);
 		//alert(pleasure_val);

 		var a_pivot = 8 - arouse_val*2;
 		var p_pivot = 8 - pleasure_val*2;
 		var arouse_index = a_pivot;
 		var pleasure_index = p_pivot;
 		var result = [];
 		for(var i=0;i<8;i++){
 			arouse_index = arouse_index%8;
 			pleasure_index = pleasure_index%8;

 			result.push(panas_array[pleasure_index]);
 			result.push(arouse_array[arouse_index]);

 			//alert(panas_array[pleasure_index]);
 			//alert(arouse_array[arouse_index]);

 			var offset = 1;
 			if (i%2 != 0){
 				offset *= -1;	
 			}

 			offset = offset * Math.ceil((i+1)/2);

 			//alert(offset);

 			arouse_index = a_pivot +  offset;
 			pleasure_index = p_pivot + offset;
 		}

 		//alert(result);
 		

 		var word_array = [];
 		var weight = 32;
 		for(var i=0;i<16;i++){
 			var content = result[i];
 			word_array.push({text:content,weight:weight});
 			weight -= 2;
 		}

 		//alert(word_array);

 		$("#chart").empty();
 		var red = 'red';
 		var color_list = ["red","red","red","red","red","red","red","red","red","red"];
 		$("#chart").jQCloud(word_array,{
 			colors : color_list
 		});
 		
	 	$('.slider').on('click',function(){
	 		//alert('click');
	 		var arouse_val = $('#ex1').slider('getValue');
	 		var pleasure_val = $('#ex2').slider('getValue');
	 		//alert(arouse_val);
	 		//alert(pleasure_val);

	 		var a_pivot = 8 - arouse_val*2;
	 		var p_pivot = 8 - pleasure_val*2;
	 		var arouse_index = a_pivot;
	 		var pleasure_index = p_pivot;
	 		var result = [];
	 		for(var i=0;i<8;i++){
	 			arouse_index = arouse_index%8;
	 			pleasure_index = pleasure_index%8;

	 			result.push(panas_array[pleasure_index]);
	 			result.push(arouse_array[arouse_index]);

	 			//alert(panas_array[pleasure_index]);
	 			//alert(arouse_array[arouse_index]);

	 			var offset = 1;
	 			if (i%2 != 0){
	 				offset *= -1;	
	 			}

	 			offset = offset * Math.ceil((i+1)/2);

	 			//alert(offset);

	 			arouse_index = a_pivot +  offset;
	 			pleasure_index = p_pivot + offset;
	 		}

	 		//alert(result);
	 		

	 		var word_array = [];
	 		var weight = 32;
	 		for(var i=0;i<16;i++){
	 			var content = result[i];
	 			word_array.push({text:content,weight:weight});
	 			weight -= 2;
	 		}

	 		//alert(word_array);

	 		$("#chart").empty();
	 		var red = 'red';
	 		var color_list = ["red","red","red","red","red","red","red","red","red","red"];
	 		$("#chart").jQCloud(word_array,{
	 			colors : color_list
	 		});
	 	});
	}
});