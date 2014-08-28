// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs

//= require jquery
//= require handlebars
//= require ember
//= require ember-data
//= require_self
//= require ./mood
//= require bootstrap.min

//= require_tree .
//= require bootstrap-slider




// for more details see: http://emberjs.com/guides/application/
Mood = Ember.Application.create();

Handlebars.registerHelper('mod',function(v0,options){
		alert(v0);
		var v1 = Handlebars.Utils.escapeExpression(v0);

		alert(v1);
		v1=1;
		if (v1%3==0)
			return options.fn(this);
		else
			return options.inverse(this);
});



