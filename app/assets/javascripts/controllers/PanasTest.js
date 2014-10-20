Mood.PanasTestController = Ember.ObjectController.extend({
  //initial value
  startIndex : 0,
  imgRootUrl : "assets/panas_photos/",
  imgUrl : "assets/panas_photos/0.jpg", 
  tags : ['Upset','Hostile','Alert','Ashamed','Inspired','Nervous','Determined','Attentive','Afraid','Active'],
  scores : [3,3,3,3,3,3,3,3,3,3],
  
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
    if(this.startIndex == 9) return true;

    return false;
  }.property('startIndex'),

  actions: {
    changeTest : function(sign){
      //alert(sign);
      //alert(this.startIndex);

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
        if(i==2 || i==4 || i==7 || i==6 || i==9){
          score = score + this.scores[i] * 100;
        }else{
          score+= this.scores[i];
        }
      }

      mail_addr = getCookie('email');

      var that = this;
      $.post('/data_update/panas',{total_score:score,email:mail_addr})
        .done(function(){
           alert('result submit successfully');
           that.transitionToRoute('submit_success');
        });
    },

    changeBrightness : function(isFromTemplate){
      //$('#sl1').slider();
      //alert('here');
      var value;
      var per;
      if(isFromTemplate == 'yes'){
        value = $('#sl1').slider('getValue');
        per = value/5 + 0.5;
      }else{
        value = this.scores[this.startIndex];
        per = value/5 + 0.5;
      }

      //alert(value);

      $('#testPic').css("-webkit-filter","brightness(" + per + ")");
     // $('#testPic').css("filter","brightness(" + per + ")");
    }
  }

});
