	var bases_de_dados2009 = ["bar_data/cur_sup_reg_1_2009.tsv","bar_data/cur_sup_reg_2_2009.tsv","bar_data/cur_sup_reg_3_2009.tsv","bar_data/cur_sup_reg_4_2009.tsv","bar_data/cur_sup_reg_5_2009.tsv"];
	var bases_de_dados2010 = ["bar_data/cur_sup_reg_1_2010.tsv","bar_data/cur_sup_reg_2_2010.tsv","bar_data/cur_sup_reg_3_2010.tsv","bar_data/cur_sup_reg_4_2010.tsv","bar_data/cur_sup_reg_5_2010.tsv"];
	var callbackError;
    var callbackData;
	
	
	bar_chart(bases_de_dados2009[0]);

	function bar_chart(bases_de_dados2009)
	{
		
		d3.tsv("bar_data/cur_sup_reg_1_2009.tsv",
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
		
		
		var max = data[0].total;
		
	
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
			return data.courses;
		  }).each(function() {
			labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
		  });

		scale = d3.scale.linear()
		  .domain([0, max])
		  .range([0, width - margin*2 - labelWidth - 15]);
		

		bar.append("rect")
		  .attr("transform", "translate("+labelWidth+", 0)")
		  .attr("height", barHeight)
		  .attr("width", function(data){
			return scale(data.total);
		  });

		bar.append("text")
		  .attr("class", "value")
		  .attr("y", barHeight / 2)
		  .attr("dx", 26 + labelWidth) //margin right
		  .attr("dy", ".35em") //vertical align middle
		  .attr("text-anchor", "end")
		  .text(function(data){
			return data.total;
		  })
		 .attr("x", function(data){
			var width = this.getBBox().width;
			return Math.max(width + valueMargin, scale(data.total));
		  });
	
		xAxis = d3.svg.axis()
		  .scale(scale)
		  .tickSize(-height + 2*margin + axisMargin + 259)
		  .orient("bottom");
		  
		svg.insert("g",":first-child")
		 .attr("class", "axis")
		 .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
		 .call(xAxis);
		});
	}

    function reload_bars(idYear, reg) {
		var database = [];
		if(idYear == 0)
		{
			//norte
			database = bases_de_dados2009[reg];
		}
		else if(idYear == 1)
		{
			
			database = bases_de_dados2010[reg];
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
		
		
		var max = data[0].total;
		
	
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
			return data.courses;
		  }).each(function() {
			labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
		  });

		scale = d3.scale.linear()
		  .domain([0, max])
		  .range([0, width - margin*2 - labelWidth - 15]);
		

		bar.append("rect")
		  .attr("transform", "translate("+labelWidth+", 0)")
		  .attr("height", barHeight)
		  .attr("width", function(data){
			return scale(data.total);
		  });

		bar.append("text")
		  .attr("class", "value")
		  .attr("y", barHeight / 2)
		  .attr("dx", 32 + labelWidth) //margin right
		  .attr("dy", ".35em") //vertical align middle
		  .attr("text-anchor", "end")
		  .text(function(data){
			return data.total;
		  })
		 .attr("x", function(data){
			var width = this.getBBox().width;
			return Math.max(width + valueMargin, scale(data.total));
		  });
	
		xAxis = d3.svg.axis()
		  .scale(scale)
		  .tickSize(-height + 2*margin + axisMargin + 259)
		  .ticks(5)

		  .orient("bottom");
		  
		svg.insert("g",":first-child")
		 .attr("class", "axis")
		 .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
		 .call(xAxis);
		});
		
    }
	
    function reload_bars2(bases_de_dados2) {

	
		d3.select("#squareTwo").remove();
		
		var div = document.createElement("div");
		div.id = "squareTwo";

		document.body.appendChild(div);
	
		d3.tsv("cur_sup_reg_1_2009.tsv",
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
		
		
		var max = data[0].total;
		
	
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
			return data.courses;
		  }).each(function() {
			labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
		  });

		scale = d3.scale.linear()
		  .domain([0, max])
		  .range([0, width - margin*2 - labelWidth - 15]);
		

		bar.append("rect")
		  .attr("transform", "translate("+labelWidth+", 0)")
		  .attr("height", barHeight)
		  .attr("width", function(data){
			return scale(data.total);
		  });

		bar.append("text")
		  .attr("class", "value")
		  .attr("y", barHeight / 2)
		  .attr("dx", 26 + labelWidth) //margin right
		  .attr("dy", ".35em") //vertical align middle
		  .attr("text-anchor", "end")
		  .text(function(data){
			return data.total;
		  })
		 .attr("x", function(data){
			var width = this.getBBox().width;
			return Math.max(width + valueMargin, scale(data.total));
		  });
	
		xAxis = d3.svg.axis()
		  .scale(scale)
		  .tickSize(-height + 2*margin + axisMargin + 259)
		  .orient("bottom");
		  
		svg.insert("g",":first-child")
		 .attr("class", "axis")
		 .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
		 .call(xAxis);
		});
			
    }