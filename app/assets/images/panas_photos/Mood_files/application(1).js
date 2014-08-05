Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("PANAS");
  }

  data.buffer.push("<div class=\"container-full\">\n	<row>\n		<div class=\"header_canvas\">\n			<h1>Mood Assessment</h1>\n		</div>\n	</row>\n	<row>\n		<div class=\"navbar navbar-default\">\n		  <row>\n	        <div class=\"navbar-collapse collapse navbar-inverse-collapse col-md-8 col-md-offset-1\">\n	          <ul class=\"nav navbar-nav\">\n	            <li><a href='#'>Home</a></li>\n	            <li class=\"dropdown\">\n                      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Utility <b class=\"caret\"></b></a>\n                      <ul class=\"dropdown-menu\">\n                        <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "panas", options) : helperMissing.call(depth0, "link-to", "panas", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n                        <li><a href=\"#\">SPANE</a></li>\n                        <li><a href=\"#\">PAM</a></li>\n                      </ul>\n                </li>\n\n	            <li><a href=\"#\">Link</a></li>\n	            <li><a href=\"#\">Link</a></li>\n	            </li>\n	          </ul>\n	        </div>\n	      </row>\n        </div>\n	</row>\n\n	<div class=\"container-full main-panel\">");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\n	\n</div>\n");
  return buffer;
  
});
