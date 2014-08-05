Ember.TEMPLATES["panas-test"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<row>\n	<div class=\"panas-test-panel col-md-6 col-md-offset-3\">\n		<div class=\"panel panel-default\" align=\"center\" class=\"overlay\">\n			<div class='overlay'>\n				<img id='testPic' ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("imgUrl")
  },hashTypes:{'src': "STRING"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"img-circle test-photos\">\n			</div>\n\n\n            <div style=\"width: 250px;\" class=\"slider slider-horizontal\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "adjustBrightness", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n            	<div class=\"slider-track\">\n            		<div style=\"left: 0%; width: 50%;\" class=\"slider-selection\"></div>\n            		<div style=\"left: 50%;\" class=\"slider-handle round\"></div>\n            		<div style=\"left: 0%;\" class=\"slider-handle round hide\"></div>\n            	</div>\n\n            	<div style=\"top: -40px; left: 23px;\" class=\"tooltip top\">\n            		<div class=\"tooltip-arrow\"></div><div class=\"tooltip-inner\">Current value: 5</div>\n            	</div>\n\n            	<input style=\"\" class=\"span2\" value=\"4\" id=\"sl1\" type=\"text\">\n            </div>\n\n            <div class=\"button-group\">\n            	<row>\n            		<div>\n            			<button id=\"preBtn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "previousTest", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"control-btn btn btn-default\">Back</button>\n            			<button id=\"nextBtn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "nextTest", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"control-btn btn btn-default\">Next</button>\n            		</div>\n            	</row>\n            </div>\n		</div>\n	</div>\n</row>\n\n\n<!--###########################\n####    front end javascript\n###############################-->\n\n<script type=\"text/javascript\">\n     $('#sl1').slider();\n</script>\n");
  return buffer;
  
});
