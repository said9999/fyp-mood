Mood.PamTestController = Ember.ObjectController.extend({
  test : [1,2,3,4,5,6,7,8],
  imgUrl : "assets/panas_photos/0.jpg", 

  nextLine: function(id){
    alert(id);
    return true;
  }
});
