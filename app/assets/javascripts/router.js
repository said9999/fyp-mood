// For more information see: http://emberjs.com/guides/routing/
Mood.Router.reopen({
	location : 'auto',
	rootURL : '/'
})

// single page routes. This is different from the default ruby routes. 
// The ruby route is in config/routes.rb
Mood.Router.map(function() {
  this.route('panas',{path : '/utility/panas'});
  this.route('spane',{path : '/utility/spane'});
  this.route('pam',{path : '/utility/pam'});
  this.route('sam',{path : '/utility/sam'});
  
  this.route('panas-test',{path :'/panas-test'});
  this.route('panas-text-test',{path : '/panas-text-test'});

  this.route('spane-test',{path : '/spane-test'});
  this.route('pam-test', {path : '/pam-test'});
  this.route('sam-test', {path : '/sam-test'});
  this.route('sam-human-male-test', {path : '/sam-human-male-test'});
  this.route('sam-human-female-test', {path : '/sam-human-female-test'});
  this.route('sam-female-test', {path : '/sam-female-test'});
  this.route('sam-male-test', {path : '/sam-male-test'});
  this.route('pad-test', {path : '/pad-test'});

  this.route('pam-keyword-test',{path : '/pam-keyword-test'});
  
  this.route('graph',{path : '/history'});

  this.route('gamma-test',{path : '/gamma-test'});
  
  this.route('submit_success',{path : '/submit_success'});

  this.route('',{path:'*path'})
});
