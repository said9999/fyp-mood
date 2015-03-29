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
//= require jqcloud-1.0.4.min
//= require blur
//= require jquery-ui-1.7.4
//= require jquery.jcoverflip

// for more details see: http://emberjs.com/guides/application/
Ember.FEATURES["query-params-new"] = true;
this.ENV = {FEATURES: {'query-params-new': true}};
Mood = Ember.Application.create();


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

