var 	formatAsPercentage = d3.format("%"),
		formatAsPercentage1Dec = d3.format(".1%"),
		formatAsInteger = d3.format(",");


function dsPieChart(){
	//centro oeste 2009
	var sum =   1582992827.55;
	var dataset = [
		  {category: "ADMINISTRACAO GERAL", measure: 737142894},
	      {category: "ASSISTENCIA HOSPITALAR E AMBULATORIAL", measure: 1595329.61},
	      {category: "DESENVOLVIMENTO CIENTIFICO", measure: 162073.14},
	      {category: "DIFUSAO CULTURAL", measure: 503969.4},
	      {category: "EDUCACAO BASICA", measure: 98589778.37},
	      {category: "EDUCACAO ESPECIAL", measure:915527.12 },
	      {category: "EDUCACAO INFANTIL", measure: 7381878.54},
		  {category: "ENSINO FUNDAMENTALL", measure:   2662693.30 },
		  {category: "ENSINO PROFISSIONAL", measure: 231979224.54},
	      {category: "ENSINO SUPERIOR", measure:94603713.31},
	      {category: "FORMACAO DE RECURSOS HUMANOS", measure: 5459796.44},
		  {category: "TECNOLOGIA DA INFORMACAO", measure:956282},
	      {category: "TRANSFERENCIAS PARA A EDUCACAO BASICA", measure: 401039667.78}
	      ];

	var width = 290,
		height = 290,
		outerRadius = Math.min(width, height) / 2.8,
	    innerRadius = outerRadius * .999,   
        // for animation
	    innerRadiusFinal = outerRadius * .6,
	    innerRadiusFinal3 = outerRadius* .65,
	    color = d3.scale.category20();   //builtin range of colors

	var tooltipDonut = d3.select("#squareThree").append("div").attr("class", "tooltipDonut hidden");
	    
	    
	var vis = d3.select("#squareThree")
	     .append("svg:svg")             
	     .data([dataset])                   
		 .attr("width", width)          
		 .attr("height", height)
		 .append("svg:g") 
		 .attr("transform", "translate(160,140)");   //move the center of the pie chart from 0, 0 to radius, radius
				
   var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        	.outerRadius(outerRadius).innerRadius(innerRadius);
   
   // for animation
   var arcFinal = d3.svg.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);
   var arcFinal3 = d3.svg.arc().innerRadius(innerRadiusFinal3).outerRadius(outerRadius);

   var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.measure; });    //we must tell it out to access the value of each element in our data array

   var  arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g")                    //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice");         //allow us to style things in the slices (like text) 	              
    				
    arcs.append("svg:path")
		.attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
		.attr("d", arc)     //this creates the actual SVG path using the associated data (pie) with the arc drawing function
		//.append("svg:title") //mouseover title showing the figures	
	
    d3.selectAll("g.slice").selectAll("path").transition()
		.duration(750)
		.delay(10)
		.attr("d", arcFinal);
		
	
	   
	// Computes the label angle of an arc, converting from radians to degrees.
	function angle(d) {
		var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
		return a > 90 ? a - 180 : a;
	}
		    
		
	// Pie chart title			
	vis.append("svg:text")
		.attr("dy", ".35em")
	    .attr("text-anchor", "middle")
	    .html("Educational Expenditure")
	    .attr("class","title");		    

	
	var legendRectSize = 10;
	var legendSpacing = 4;
	var legend = d3.select("#squareFour")
		.append("svg")
		.attr("width", 300)
		.attr("height",300);
		
	legend.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
		.attr("x", 10)
		.attr("y", function(d,i){ return i * 20;} )
		.attr("fill" , function(d,i){ return color(i);});
		
	legend.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.attr("x", 25)
		.attr("y", function(d,i){ return i * 20 + 8;} )
		.text(function(d,i){return d.category;})
		.attr("class", "legend");	
		
	arcs
		.on("mouseover",  function(d,i) {
			tooltipDonut.classed("hidden", false)
			.attr("style", "left:"+(d3.event.pageX-540)+"px;top:"+(d3.event.pageY-500)+"px")
			.html("<strong>Year: "+Year[idYear]+"<br/>"+"</strong>"+"<strong>Category: "+d.data.category+"<br/>"+"</strong>"+"<strong>Measure: R$"+d.data.measure+"<br/>"+"</strong>")
		})
		.on("mouseout",  function(d,i) {
			tooltipDonut.classed("hidden", true)
		});	
}

dsPieChart();

