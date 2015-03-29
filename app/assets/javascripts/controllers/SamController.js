Mood.SamController = Ember.ObjectController.extend({
	actions : {
		start : function(){
			 var type = $('input:radio[name = "optionsRadios"]:checked').val();
 			
 			if(type == 1){
 				this.transitionToRoute('sam-test');
 			}else{
 				var category = $("#manikin").val();
 				var gender = $("#gender").val();

 				//alert(category);
 				//alert(gender);

 				if(category == 1)
 					if (gender == 1)
 						this.transitionToRoute('sam-human-male-test');
 					else
 						this.transitionToRoute('sam-human-female-test');
 				else
 					if (gender == 1)
 						this.transitionToRoute('sam-male-test');
 					else
 						this.transitionToRoute('sam-female-test');
 			}

		}
	}
});