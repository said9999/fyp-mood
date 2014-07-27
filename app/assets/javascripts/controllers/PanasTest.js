Mood.PanasTestController = Ember.ObjectController.extend({
  //initial value
  startIndex : 1,
  imgRootUrl : "assets/panas_photos/",
  imgUrl : "assets/panas_photos/1.jpg", 

  actions: {
  	nextTest : function(){
  		
  		alert('in nexttest');
  		this.set('startIndex',this.get('startIndex')+1);
  		this.set('imgUrl',this.get('imgRootUrl')+this.get('startIndex')+".jpg");
 
  	},

  	previousTest : function(){
  		alert('in previousTest');
  		this.set('startIndex',this.get('startIndex')-1);
  		this.set('imgUrl',this.get('imgRootUrl')+this.get('startIndex')+".jpg");
  	}
  }
});