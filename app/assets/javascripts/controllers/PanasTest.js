/*************************
* PANAS test page logic
**************************/
Mood.PanasTestController = Ember.ObjectController.extend({
  //initial value
  startIndex : 0,
  imgRootUrl : "assets/panas_photos/",
  imgUrl : "assets/panas_photos/0.jpg", 
  // chosen words for panas
  tags : ['Upset','Hostile','Alert','Ashamed','Inspired','Nervous','Determined','Attentive','Afraid','Active'],
  // default score for 10 items
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
    // handleing how to change page
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

    // submit action handling
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

    // changes the photo's brightness when the slider is changed
    changeBrightness : function(isFromTemplate){
      var value;
      var per;
      if(isFromTemplate == 'yes'){
        value = $('#sl1').slider('getValue');
        per = value/5 + 0.5;
      }else{
        value = this.scores[this.startIndex];
        per = value/5 + 0.5;
      }

      if (this.startIndex == 0 || this.startIndex == 3) {
        per = 1.6 - value/5;
      };

      // tested on chrome
      $('#testPic').css("-webkit-filter","brightness(" + per + ")");
    }
  }

});
