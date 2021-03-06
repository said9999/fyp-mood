Mood.SamTestController = Ember.ObjectController.extend({
  img_base : 1,
  photoFileBase : null,
  suffix : null,

  scores : [3,3,3],

  firstPage : function(){
  	if (this.img_base == 1) 
  		return true
  	
  	return false
  }.property('img_base'),

  lastPage : function(){
  	if (this.img_base == 3) 
  		return true
  	
  	return false
  }.property('img_base'),

  actions : {
  	changePhotos : function(base){
  		for (var i=1;i<6;i++){
				var sam_root = '#sam-';
				var sam_id = sam_root+i;

				var img_src = this.get('photoFileBase')+ base + "-" + i + this.get('suffix');

				//alert(img_src);
				$(sam_id).attr('src',img_src);
		  }
  	},

  	highlightPhoto : function(base){
  		var list = this.get('scores');
		var score = list[base];

		$(".sam-img").removeClass('sam-highlight');
		$('#sam-'+score).addClass('sam-highlight');
  	},

  	updateScores : function(base){
  		var score = $('.sam-highlight')[0].id.split('-')[1];
		var list = this.get('scores');
				
		list[base] = score;
		this.set('scores',list);
  	},

  	clickView : function(event){
  		$(".sam-img").removeClass('sam-highlight');
		$(event).addClass('sam-highlight');
  	},

  	next : function(){
		var img_base = this.get('img_base');
		this.send('updateScores',(img_base-1));

		this.set('img_base',img_base+1);
		var img_base = this.get('img_base');

		this.send('changePhotos',img_base);
		this.send('highlightPhoto',(img_base-1));
  	},

  	back : function(){
  		var img_base = this.get('img_base');
		this.send('updateScores',(img_base-1));

		this.set('img_base',img_base-1);
		var img_base = this.get('img_base');

		this.send('changePhotos',img_base);
		this.send('highlightPhoto',(img_base-1));
  	},

  	submit : function(){
  	  var score = 0;
      for(var i=0;i<this.scores.length;i++){
        score+= this.scores[i]*Math.pow(10,i);

      }

      alert(score);

      mail_addr = getCookie('email');

      var that = this;
      $.post('/data_update/sam',{total_score:score,email:mail_addr})
        .done(function(){
           alert('result submit successfully');
           that.transitionToRoute('submit_success');
        });
  	}
  }
});
