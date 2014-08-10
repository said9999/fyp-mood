Mood.PamTestController = Ember.ObjectController.extend({
  test : [1,2,3,4,5,6,7,8],

  nextLine: function(id){
    alert(id);
    return true;
  }
});
