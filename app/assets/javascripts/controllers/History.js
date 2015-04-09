/*************************
* History page logic
**************************/

// route and measurement type hashmap
var TypeUrlMap = {'PANAS':'/data_access/panas','SPANE':'/data_access/spane','PAM':'/data_access/pam','SAM':'/data_access/sam', 'PAD':'/data_access/pad'};
// graph type and funciton map
var GraphDrawMap = {'Line Chart':drawLineChart,'Pie Chart':drawPieChart};
// score map for PAD, SAM
var PADScoreMap = {'+++':'Exuberant', '---':'Bord', '++-':'Dependent', '--+':'Disdianful', '+-+':'Relaxed', '-+-':'Anxious', '+--':'Docile', '-++':'Hostile'}
Mood.GraphController = Ember.ObjectController.extend({
  test_type : "",
  graph_type : "",

  actions : {
    // retrieve graph from server side
  	getGraph : function(){
  		this.set('test_type',$('#test').val());
  		this.set('graph_type',$('#graph').val());

      var url = TypeUrlMap[$('#test').val()];
      var func = GraphDrawMap[$('#graph').val()];
      var email = getCookie('email');
      var startDate = $('#start_time').val();
      var endDate = $('#end_time').val();

      dataLoad($('#test').val(),url,func,email,startDate,endDate);
  	},

    // download graph result for certain scale
    download : function(){
      var email = getCookie('email');
      var url = "/download/" + $("#test").val().toLowerCase();

      $.get(url, {email : email})
        .done(function(data){
          var ul = JSON.stringify(data['path']);
          document.location.href = ul.substring(8,ul.length-1)
        });
    },

    // draw line chart
  	displayLineChart : function(){
      alert('here');
		  dataLoad(drawLineChart)
  	},

    // draw pie chart
  	displayPieChart : function(){
  		drawPieChart();
  	}
  }	
});

function dataLoad(type, url, drawChart, mail_addr, startDate, endDate){
	$.post(url,{
    email: mail_addr,
    start: startDate,
    end: endDate
    })
		.done(function(data){
			drawChart(type,data['history']);
		});
}

// google chart used here
function drawLineChart(type,data) {
  var arrayData = [];
  var outdata;
  var options;

  // split one score into several dimensions according to different type
  if(type == 'PANAS'){
    arrayData.push(['Time','PA','NA']);
  	
    for(var i=0;i<data.length;i++){
  		row = data[i];
  		time = row['time'];
  		score = row['score'];

  		arrayData.push([time,Math.floor(score/100),score%100]);
  	}
  }else if(type == 'PAM'){
    arrayData.push(['Time','Score']);
    
    for(var i=0;i<data.length;i++){
      row = data[i];
      time = row['time'];
      score = row['score'];

      arrayData.push([time,score]);
    }
  }else if(type == 'SAM'){
    arrayData.push(['Time','Pleasure','Arousal','Dominance']);
    
    for(var i=0;i<data.length;i++){
      row = data[i];
      time = row['time'];
      score = row['score'];

      arrayData.push([time,Math.floor(score/100),Math.floor(score/10)%10,score%10]);
    }
  }else if(type == 'PAD'){
    arrayData.push(['Time','Pleasure','Arousal','Dominance']);
    
    for(var i=0;i<data.length;i++){
      row = data[i];
      time = row['time'];
      score = row['score'];
      
      arrayData.push([time,Math.floor(score%100),Math.floor(score/100)%100,Math.floor((score/10000)%100)]);
    }
  }

  title = type + " History Records";

  options = {
    title: title,
    curveType: 'function',
    vAxis: {title: 'Grade', viewWindowMode: "explicit", viewWindow:{ min: 0 }},
    hAxis: {title: 'Date'},
  };
  
  outdata = google.visualization.arrayToDataTable(arrayData);
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(outdata, options);
	
};

function drawPieChart(type, data){
  var arrayData = [];
  var status;
  arrayData.push(['Mood','frequency']);
  if (type == 'PAD' || type == 'SAM') {
      status = {'Exuberant':0, 'Bord':0, 'Dependent':0, 'Disdianful':0, 'Relaxed':0, 'Anxious':0, 'Docile':0, 'Hostile':0};
      for (var i = 0; i < data.length; i++) {
        var score = data[i]['score'];
        var mod = (type == 'PAD') ? 100 : 10;
        //alert(mod);
        var p = score % mod;
        var a = Math.floor(score / mod) % mod;
        var d = Math.floor(score / mod / mod) % mod;
        var hold = (type == 'PAD') ? 5 : 3;
        p = (p > hold) ? '+' : '-';
        a = (a > hold) ? '+' : '-';
        d = (d > hold) ? '+' : '-';

        var key = p + a + d;
        //alert(key);
        var _type = PADScoreMap[key];
        //alert(type);
        status[_type] = status[_type] + 1; 
      }
  } else if (type == 'PANAS' || type == 'PAM') {
      status = {'Well':0, 'Low PA':0, 'High NA':0, 'Low PA and High NA':0};
      for (var i = 0; i < data.length; i++) {
        var score = data[i]['score'];
        if (type == 'PANAS') {
          var pa = Math.floor(score / 100);
          var na = score % 100;
          if (pa >= 14 && na <= 9) {
            status['Well'] = status['Well'] + 1;
          } else if (pa < 14 && na > 9) {
            status['Low PA and High NA'] = status['Low PA and High NA'] + 1;
          } else if (pa < 14) {
            status['Low PA'] = status['Low PA'] + 1;
          } else {
            status['High NA'] = status['High NA'] + 1;
          }
        } else {
          if (score <= 4) {
            status['Low PA'] = status['Low PA'] + 1;
          } else if (score >= 13) {
            status['High NA'] = status['High NA'] + 1;
          } else if (score <= 8) {
            status['Low PA and High NA'] = status['Low PA and High NA'] + 1;
          } else {
            status['Well'] = status['Well'] + 1;
          }
        }
      }
  }
  
  for (var key in status) {
    if (status.hasOwnProperty(key)) {
      arrayData.push([key, status[key]]);
    }
  }

  var data = google.visualization.arrayToDataTable(arrayData);
  var options = {
    title: 'My Daily Mood'
  };

  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
};