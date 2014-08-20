Mood.HistoryView = Ember.View.extend({
	templateName : 'historyview/history',

	drawChart:function(){
		drawChart();
	}.on("didInsertElement"),

	didInsertElement: function(){ 
	 
   
	},


});

 function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ]);

    var options = {
      title: 'Company Performance'
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
};
