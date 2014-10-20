var TypeUrlMap = {'PANAS':'/data_access/panas','SPANE':'/data_access/spane','PAM':'/data_access/pam','SAM':'/data_access/sam'};
var GraphDrawMap = {'Line Chart':drawLineChart,'Pie Chart':drawPieChart};

Mood.GraphController = Ember.ObjectController.extend({
  test_type : "",
  graph_type : "",

  actions : {
  	getGraph : function(){
  		this.set('test_type',$('#test').val());
  		this.set('graph_type',$('#graph').val());

      var url = TypeUrlMap[$('#test').val()];
      var func = GraphDrawMap[$('#graph').val()];
      var email = getCookie('email');

      dataLoad($('#test').val(),url,func,email);
  	},

  	displayLineChart : function(){
		  dataLoad(drawLineChart)
  	},

  	displayPieChart : function(){
  		drawPieChart();
  	}
  }	
});

function dataLoad(type,url,drawChart,mail_addr){
	$.post(url,{email:mail_addr})
		.done(function(data){
			drawChart(type,data['history']);
		});
}

function drawLineChart(type,data) {
  var arrayData = [];
  var outdata;
  var options;

  if(type == 'PANAS'){
    arrayData.push(['Time','PA','NA']);
  	
    for(var i=0;i<data.length;i++){
  		row = data[i];
  		time = row['time'];
  		score = row['score'];

  		arrayData.push([time,Math.floor(score/100),score%100]);
  	}

    options = {
      title: 'PANAS History Records'
    };
  }else if(type == 'PAM'){
    arrayData.push(['Time','Score']);
    
    for(var i=0;i<data.length;i++){
      row = data[i];
      time = row['time'];
      score = row['score'];

      arrayData.push([time,score]);
    }

    options = {
      title: 'PAM History Records'
    };
  }

  outdata = google.visualization.arrayToDataTable(arrayData);
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(outdata, options);
	
};

function drawPieChart(data){
  var arrayData = [];
  arrayData.push(['Mood','frequency']);

  var mood_low = 0; // <20)
  var mood_normal = 0; //[20-30)
  var mood_good = 0; //[30-40)
  var mood_great = 0; //[40-50)
  for(var i=0;i<data.length;i++){
    row = data[i];
    score = row['score'];
    //alert(score);

    if(score < 20)
      mood_low++;
    else if (score>=20 && score<30)
      mood_normal++;
    else if (score>=30 && score<40)
      mood_good++;
    else if (score>=40)
      mood_great++;
  }

  arrayData.push(['Low',mood_low]);
  arrayData.push(['Normal',mood_normal]);
  arrayData.push(['Good',mood_good]);
  arrayData.push(['Great',mood_great]);

  //alert(arrayData);

	var data = google.visualization.arrayToDataTable(arrayData);

  var options = {
    title: 'My Daily Mood'
  };

  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
};