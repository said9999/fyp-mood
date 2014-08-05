Mood.PanasTestController = Ember.ObjectController.extend({
  //initial value
  startIndex : 1,
  imgRootUrl : "assets/panas_photos/",
  imgUrl : "assets/panas_photos/1.jpg", 
  scores : [1,5,5,5,5,5,5,5,5,5],

  actions: {
  	nextTest : function(){
  		//alert('in nexttest');
      var score = $('#sl1').slider('getValue');
      this.scores[this.startIndex-1] = score;

  		this.set('startIndex',this.get('startIndex')+1);
      $('#sl1').slider('setValue',this.scores[this.startIndex-1]);

  		this.set('imgUrl',this.get('imgRootUrl')+this.get('startIndex')+".jpg");
 
  	},

  	previousTest : function(){
  		//alert('in previousTest');

      var score = $('#sl1').slider('getValue');
      this.scores[this.startIndex-1] = score;

      alert(this.scores);

  		this.set('startIndex',this.get('startIndex')-1);
      $('#sl1').slider('setValue',this.scores[this.startIndex-1]);

  		this.set('imgUrl',this.get('imgRootUrl')+this.get('startIndex')+".jpg");
  	},

    changeBrightness : function(){
      var per = this.scores[this.startIndex-1]/10 + 0.5
      $('#testPic').css("-webkit-filter","brightness(" + per + ")");
      $('#testPic').css("filter","brightness(" + per + ")");
    }
  }
});
