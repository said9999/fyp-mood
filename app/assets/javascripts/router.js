// For more information see: http://emberjs.com/guides/routing/
Mood.Router.reopen({
	location : 'auto',
	rootURL : '/'
})

Mood.Router.map(function() {
  // this.resource('posts');
  //alert('in the router.js');
  this.route('panas',{path : '/utility/panas'});
  this.route('spane',{path : '/utility/spane'});
  this.route('pam',{path : '/utility/pam'});
  this.route('panas-test',{path :'/panas-test'});
  this.route('spane-test',{path : '/spane-test'});
  this.route('pam-test', {path : '/pam-test'})
});
