Ember.TEMPLATES["panas"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Start");
  }

  data.buffer.push("\n<row>\n  <div class='col-md-10 col-md-offset-1'>\n  <div class=\"page-title\">\n    <h1 class=\"header\"> PANAS</h1>\n  </div>\n</row>\n\n<row>\n  <div class=\"intro\">");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-lg btn-danger")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "panas-test", options) : helperMissing.call(depth0, "link-to", "panas-test", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n</row>\n\n  \n");
  return buffer;
  
});
