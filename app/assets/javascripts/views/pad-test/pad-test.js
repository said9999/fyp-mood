Mood.PADTestView = Ember.View.extend({
  templateName : 'PadTestView/pad_test',
  
  didInsertElement: function(){ 
    // enable pleasure, arousal, dominance sliders
    $('#ex1').slider();
    $('#ex2').slider(); 
    $('#ex3').slider();

    // show pleasure tutorial/tab at first
    var active_obj = $('#pleasure');
    active_obj.addClass('active');

    // change tabs/tutorial
    $('#pleasure, #arousal, #dominance').on('click', function(){
      active_obj.removeClass('active');
      active_obj = $(this);
      active_obj.addClass('active');

      $('#display_image').attr('src', "/assets/pad/" + active_obj.attr("id") + ".jpg");
    });

    // introduction
    $('#introduction').html("The dimension of <b>Pleasure</b> refers to how you are good you are currently feeling.<br><br>For example, experiencing a <u>happy</u> or a <u>relaxed</u> event, or having received news that makes you <u>pleased</u>, <u>satisfied</u>, <u>contented</u> or <u>hopeful</u> reflect high levels of <b>Pleasure</b>.<br><br>This is in contrast to feeling <u>angry</u>, <u>disappointed</u> or <u>helpless</u>, which reflect low <b>Pleasure</b>        levels.");

    // introduction for pleasure
    $('#pleasure').on('click', function() {
      $('#introduction').html("The dimension of <b>Pleasure</b> refers to how you are good you are currently feeling.<br><br>For example, experiencing a <u>happy</u> or a <u>relaxed</u> event, or having received news that makes you <u>pleased</u>, <u>satisfied</u>, <u>contented</u> or <u>hopeful</u> reflect high levels of <b>Pleasure</b>.<br><br>This is in contrast to feeling <u>angry</u>, <u>disappointed</u> or <u>helpless</u>, which reflect low <b>Pleasure</b>        levels.");
    });

    // introudction for arousal
    $('#arousal').on('click', function() {
      $('#introduction').html("<b>Arousal</b> can be understood as the level of <u>stimulation</u>, <u>excitement</u> or <u>awakeness</u> that you are currently feeling. For example, if you just experienced an act of kindness from a stranger, you would probably feel high levels of pleasure, but perhaps low to medium on <b>Arousal</b>. <br><br>If, however, you have just received news that your good friend from a faraway country has returned, and will be coming over to visit you tonight, chances are you would be generally feel high levels of Pleasure, as well as high levels of <b>Arousal</b>.<br><br>If you are angry, then you would be having low levels of Pleasure coupled with high levels of <b>Arousal</b>. <br><br>Disappointment and sadness would lead to low levels of both pleasure and <b>Arousal</b>.");
    });

    // introduction for dominance
    $('#dominance').on('click', function() {
      $("#introduction").html("<b>Dominance</b> is the level of <u>control</u> or <u>influence</u> you feel that you possess over your current state of affairs, which include relationships with people, as well as the environment around you. <br><br>When you feel <b>dominant</b>, you feel in control of a majority of these factors at present. <br><br>The inverse of <b>Dominance</b> is <i><b>submission</b></i> - you have low levels of control when you feel <u>influenced</u>, <u>cared for</u> or <u>controlled</u> over your circumstances at the moment.");
    });

    var controller = this.get('controller');

    // handing submit result
    $('#submit').on('click', function(){
      var email = getCookie('email');
      var arouse_val = $('#ex2').slider('getValue');
      var pleasure_val = $('#ex1').slider('getValue');
      var dominance_val = $('#ex3').slider('getValue');
      // score is combined into a 6 digit number
      var score = pleasure_val + 100 * arouse_val + 10000 * dominance_val;
      
      $.post("data_update/pad",{email:email,total_score:score})
        .done(function(){
          controller.transitionToRoute('submit_success');
        });
    });
  },

});