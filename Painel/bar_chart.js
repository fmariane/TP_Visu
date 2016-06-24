var svgWidth = 100;
  var svgHeight = 100;
  var barPadding = 1;

  var sqr1 = d3.select("#squareThree")
  	.append("svg")     
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    sqr1.append("rect")

    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 30)
    .attr("height", 100)
    .attr("fill", "red")
    .on("click", reload_bars1);

	sqr1.append("rect")
	.attr("x", 40)
	.attr("y", 0)
	.attr("width", 30)
	.attr("height", 100)
	.attr("fill", "green")
	.on("click", reload_bars2);
	
	
	//fim dos controladores
	//grafico de barras
	bar_chart();

	function bar_chart()
	{
  		var dataset = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  		var svgWidth = 500;
    	var svgHeight = 100;
    	var barPadding = 1;


  		var sqr2 = d3.select("#squareTwo")
		  	.append("svg")     
		    .attr("width", svgWidth)
		    .attr("height", svgHeight);

		sqr2.selectAll("rect")
		    .data(dataset)
		    .enter()
		    .append("rect")
		    .attr("x", function(d, i) { return i * (svgWidth / dataset.length);})
		    .attr("y", function(d) { return svgHeight - d * 4;})
		    .attr("width", svgWidth / dataset.length - barPadding)
		    .attr("height", function(d) {
			    return d * 4;
			})
			.attr("fill", function(d) {
			    return "rgb(0, 0, " + (d * 50) + ")";
			});

	}

	bar_chart_horizontal();
		
	function bar_chart_horizontal(){
	
		
	
	}
	


    function reload_bars1() {


    	var dataset2 = [10,9,8,7,6,5,4,3,2,1];
    	var svgWidth = 500;
    	var svgHeight = 100;
    	var barPadding = 1;

    	var aux = d3.select("#squareTwo")
    		.datum(dataset2);

    	aux.selectAll("rect")
	      .data(dataset2)
	      .transition()
			.duration(750)
		  .attr("x", function(d, i) { return i * (svgWidth / dataset2.length);})
		    .attr("y", function(d) { return svgHeight - d * 4;})
		    .attr("width", svgWidth / dataset2.length - barPadding)
		    .attr("height", function(d) {
			    return d * 4;
			})
			.attr("fill", function(d) {
			    return "rgb(0, 0, " + (d * 50) + ")";
			});
    }
    function reload_bars2() {


    	var dataset2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    	var svgWidth = 500;
    	var svgHeight = 100;
    	var barPadding = 1;

    	var aux = d3.select("#squareTwo")
    		.datum(dataset2);

    	aux.selectAll("rect")
	      .data(dataset2)
	      .transition()
			.duration(750)
		  .attr("x", function(d, i) { return i * (svgWidth / dataset2.length);})
		    .attr("y", function(d) { return svgHeight - d * 4;})
		    .attr("width", svgWidth / dataset2.length - barPadding)
		    .attr("height", function(d) {
			    return d * 4;
			})
			.attr("fill", function(d) {
			    return "rgb(0, 0, " + (d * 50) + ")";
			});
    }