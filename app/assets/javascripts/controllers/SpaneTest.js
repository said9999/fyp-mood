Mood.SpaneTestController = Ember.ObjectController.extend({
  //initial value
  startIndex : 0,
  imgRootUrl : "assets/spane_photos/",
  imgUrl : "assets/spane_photos/0.jpg", 
  tags : ['Positive','Negative','Good','Bad','Pleasant','Unpleasant','Happy','Sad','Afraid','Joyful','Angry','Contented'],
  scores : [5,5,5,5,5,5,5,5,5,5,5,5],
  
  progress_per : function(){
    per = (this.startIndex+1)/this.tags.length;
    per = per*100;
    per = per + "%";

    return ("width :" + per); 

  }.property("startIndex"),

  tag : function(){
    return this.tags[this.startIndex];
  }.property('tags','startIndex'),
  
  isFirstPage : function(){
    if (this.startIndex == 0) return true;
    
    return false;
  }.property('startIndex'),

  isLastPage : function(){
    if(this.startIndex == 11) return true;

    return false;
  }.property('startIndex'),

  actions: {
    changeTest : function(sign){
      var offset;
      
      if(sign == '+')
        offset = 1    //next page
      else 
        offset = -1   //pre page

      //save current score
      var score = $('#sl1').slider('getValue');
      this.scores[this.startIndex] = score;

      //set next page saved score
      this.set('startIndex',this.get('startIndex')+offset);
      $('#sl1').slider('setValue',this.scores[this.startIndex]);

      //change photos
      this.set('imgUrl',this.get('imgRootUrl')+this.get('startIndex')+".jpg");

      //change next page photo's brightness according to the score
      this.send('changeBrightness','no')
    },

    submitResult : function(){
      var score = 0;
      for(var i=0;i<this.scores.length;i++){
        score+= this.scores[i];
      }
      mail_addr = "jyx@gmail.com"

      var that=this;

      $.post('/data_update/spane',{total_score:score,email:mail_addr})
        .done(function(){
           alert('result submit successfully');
           that.transitionToRoute('submit_success');
        });

    },

    changeBrightness : function(isFromTemplate){
      //$('#sl1').slider();

      var value;
      var per;
      if(isFromTemplate == 'yes'){
        value = $('#sl1').slider('getValue');
        per = value/10 + 0.5;
      }else{
        value = this.scores[this.startIndex];
        per = value/10 + 0.5;
      }

      //alert(value);

      $('#testPic').css("-webkit-filter","brightness(" + per + ")");
      $('#testPic').css("filter","brightness(" + per + ")");
    }
  }

});
