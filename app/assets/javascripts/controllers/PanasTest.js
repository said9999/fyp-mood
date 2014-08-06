Mood.PanasTestController = Ember.ObjectController.extend({
  //initial value
  startIndex : 1,
  imgRootUrl : "assets/panas_photos/",
  imgUrl : "assets/panas_photos/1.jpg", 
  scores : [5,5,5,5,5,5,5,5,5,5],
  tags : ['Upset','Hostile','Alert','Ashamed','Inspired','Nervous','Determined','Attentive','Afraid','Active'],
  tag : function(){
    return this.tags[this.startIndex-1];
  }.property('tags','startIndex'),
  
  isFirstPage : function(){
    if (this.startIndex == 1)
      return true;
    return false;
  }.property('startIndex'),

  isLastPage : function(){
    if(this.startIndex == 10){
      return true;
    }

    return false;
  }.property('startIndex'),

  actions: {
  	nextTest : function(){
  		//alert('in nexttest');
      //$('#sl1').slider();


      var score = $('#sl1').slider('getValue');
      this.scores[this.startIndex-1] = score;

  		this.set('startIndex',this.get('startIndex')+1);
      $('#sl1').slider('setValue',this.scores[this.startIndex-1]);

  		this.set('imgUrl',this.get('imgRootUrl')+this.get('startIndex')+".jpg");

      this.send('changeBrightness','no')
  	},

  	previousTest : function(){
  		//alert('in previousTest');
      //$('#sl1').slider();

      var score = $('#sl1').slider('getValue');
      this.scores[this.startIndex-1] = score;

      //alert(this.scores);

  		this.set('startIndex',this.get('startIndex')-1);
      $('#sl1').slider('setValue',this.scores[this.startIndex-1]);

  		this.set('imgUrl',this.get('imgRootUrl')+this.get('startIndex')+".jpg");

      this.send('changeBrightness','no');
  	},

    submitResult : function(){
      alert('result submit');
    },

    changeBrightness : function(isFromTemplate){
      //$('#sl1').slider();

      var value;
      var per;
      if(isFromTemplate == 'yes'){
        value = $('#sl1').slider('getValue');
        per = value/10 + 0.5;
      }else{
        value = this.scores[this.startIndex-1];
        per = value/10 + 0.5;
      }

      //alert(value);

      $('#testPic').css("-webkit-filter","brightness(" + per + ")");
      $('#testPic').css("filter","brightness(" + per + ")");
    }
  }

});
