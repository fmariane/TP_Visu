	var bar_bases_de_dados2009 = ["bar_data/Norte2009.tsv", "bar_data/Nordeste2009.tsv" , "bar_data/CentOeste2009.tsv" ,"bar_data/Sudeste2009.tsv" ,"bar_data/Sul2009.tsv"];
	var bar_bases_de_dados2010 = ["bar_data/Norte2010.tsv", "bar_data/Nordeste2010.tsv" , "bar_data/CentOeste2010.tsv" ,"bar_data/Sudeste2010.tsv" ,"bar_data/Sul2010.tsv"];
	var bar_bases_de_dados2011 = ["bar_data/Norte2011.tsv", "bar_data/Nordeste2011.tsv" , "bar_data/CentOeste2011.tsv" ,"bar_data/Sudeste2011.tsv" ,"bar_data/Sul2011.tsv"];
	var bar_bases_de_dados2012 = ["bar_data/Norte2012.tsv", "bar_data/Nordeste2012.tsv" , "bar_data/CentOeste2012.tsv" ,"bar_data/Sudeste2012.tsv" ,"bar_data/Sul2012.tsv"];
	var bar_bases_de_dados2013 = ["bar_data/Norte2013.tsv", "bar_data/Nordeste2013.tsv" , "bar_data/CentOeste2013.tsv" ,"bar_data/Sudeste2013.tsv" ,"bar_data/Sul2013.tsv"];

	reload_bars(0,0);
	
    function reload_bars(idYear, reg) {
		var database = [];
		var colors = ["#29A03C", "#D2282B", "#FF800A", "#9562BE", "#2978B3"];
		var color_aux = 0;
		if(idYear == 0){
			database = bar_bases_de_dados2009[reg];
			colors_aux = colors[reg];
		}
		else if(idYear == 1){
			database = bar_bases_de_dados2010[reg];
		}
		else if(idYear == 2){
			database = bar_bases_de_dados2010[reg];
		}
		else if(idYear == 3){
			database = bar_bases_de_dados2010[reg];
		}
		else{
			database = bar_bases_de_dados2010[reg];	
		}
	
		d3.select("#squareTwo").remove();
		
		var div = document.createElement("div");
		div.id = "squareTwo";

		document.body.appendChild(div);
	
		d3.tsv(database,
        function(error, data) {
            callbackError = error;
            callbackData = data;		
			
		var chart = document.getElementById("squareTwo"),
			axisMargin = 20,
			margin = 20,
			valueMargin = 4,
			width = chart.offsetWidth,
			height = chart.offsetHeight,
			barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
			barPadding = (height-axisMargin-margin*2)*0.6/data.length,
			data, bar, svg, scale, xAxis, labelWidth = 0;
		
		
		var max = data[0].Enrolled;
		
	
		svg = d3.select(chart)
		  .append("svg")
		  .attr("width", width)
		  .attr("height", height);


		bar = svg.selectAll("g")
		  .data(data)
		  .enter()		  
		  .append("g");

		bar.attr("class", "bar")
		  .attr("cx",0)
		  .attr("transform", function(data, i) { 
			 return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
		  });

		bar.append("text")
		  .attr("class", "label")
		  .attr("y", barHeight / 2)
		  .attr("dy", ".35em") //vertical align middle
		  .text(function(data){
			return data.Major;
		  }).each(function() {
			labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
		  });

		scale = d3.scale.linear()
		  .domain([0, max])
		  .range([0, width - margin*2 - labelWidth - 15]);
		

		bar.append("rect")		  
		  .attr("transform", "translate("+labelWidth+", 0)")
		  .attr("height", barHeight)
		  .attr("width", 0);

		  bar.selectAll("rect")
		  .transition()
		  .duration(1000)		  
		  .attr("width", function(data){
			return scale(data.Enrolled)- 5;
		  })

		  .attr("fill", colors_aux);

		bar.append("text")

		  .attr("class", "value")
		  .attr("y", barHeight / 2)
		  .attr("dx", 35 + labelWidth) //margin right
		  .attr("dy", ".35em") //vertical align middle
		  .attr("text-anchor", "end")
		  .text(function(data){
			return data.Enrolled;
		  })
		 .attr("x", function(data){
			var width = this.getBBox().width;
			return Math.max(width + valueMargin, scale(data.Enrolled));
		  });
	
		xAxis = d3.svg.axis()
		  .scale(scale)
		  .tickSize(-height + 2*margin + axisMargin + 221)
		  .orient("bottom")
		  .ticks(4);
		  
		svg.insert("g",":first-child")
		 .attr("class", "axis")
		 .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
		 .call(xAxis);
		});
		
    }
	
