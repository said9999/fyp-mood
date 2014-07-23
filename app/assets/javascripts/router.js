// For more information see: http://emberjs.com/guides/routing/
Mood.Router.reopen({
	location : 'auto',
	rootURL : '/'
})

Mood.Router.map(function() {
  // this.resource('posts');
  //alert('in the router.js');
  this.route('panas',{path:'/utility/panas'});
});
