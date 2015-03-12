Mood.PADTestView = Ember.View.extend({
  templateName : 'PadTestView/pad_test',
  
  didInsertElement: function(){ 
    $('#ex1').slider();
    $('#ex2').slider(); 
    $('#ex3').slider();

    var active_obj = $('#pleasure');
    active_obj.addClass('active');


    $('#pleasure, #arousal, #dominance').on('click', function(){
      active_obj.removeClass('active');
      active_obj = $(this);
      active_obj.addClass('active');

      $('#display_image').attr('src', "/assets/pad/" + active_obj.attr("id") + ".jpg");
    });

    var controller = this.get('controller');

    $('#submit').on('click', function(){
      var email = getCookie('email');
      var arouse_val = $('#ex2').slider('getValue');
      var pleasure_val = $('#ex1').slider('getValue');
      var dominance_val = $('#ex3').slider('getValue');
      var score = pleasure_val + 100 * arouse_val + 10000 * dominance_val;
      
      $.post("data_update/pad",{email:email,total_score:score})
        .done(function(){
          controller.transitionToRoute('submit_success');
        });
    });
  },

});