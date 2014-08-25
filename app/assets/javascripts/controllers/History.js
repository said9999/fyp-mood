Mood.GraphController = Ember.ObjectController.extend({
  test_type : "",
  graph_type : "",

  actions : {
  	getGraph : function(){
  		this.set('test_type',$('#test').val());
  		this.set('graph_type',$('#graph').val());
  		alert(this.test_type);
  		alert(this.graph_type);
  	},

  	displayLineChart : function(){
  		//alert('line chart');
  		//google.load("visualization", "1", {packages:["corechart"]});
		//drawLineChart();
		dataLoad(drawLineChart)
  	},

  	displayPieChart : function(){
  		//alert('pie chart');
  		drawPieChart();
  	}
  }	
});

function dataLoad(drawChart){
	$.post("data_access/panas",{email:"jyx@gmail.com"})
		.done(function(data){
			//alert(data['history']);
			drawChart(data['history']);
		});
}

function drawLineChart(data) {
	//alert(this.test-type);
	//alert(data[0]['score']);
	var arrayData = [];
	arrayData.push(['Time','Scores']);

	for(var i=0;i<data.length;i++){
		row = data[i];
		time = row['time'];
		score = row['score'];

		arrayData.push([time,score]);
	}

	var data = google.visualization.arrayToDataTable(arrayData);

	var options = {
	  title: 'PANAS History Records'
	};

	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	chart.draw(data, options);
};

function drawPieChart(){
	var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

    var options = {
      title: 'My Daily Activities'
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
};