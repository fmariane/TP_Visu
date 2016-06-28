var 	formatAsPercentage = d3.format("%"),
		formatAsPercentage1Dec = d3.format(".1%"),
		formatAsInteger = d3.format(",");

var donut_bases_de_dados2009 = ["donut_data/north2009.tsv","donut_data/northeast2009.tsv", "donut_data/midwest2009.tsv", "donut_data/southeast2009.tsv", "donut_data/south2009.tsv"];
var donut_bases_de_dados2010 = ["donut_data/north2010.tsv","donut_data/northeast2010.tsv", "donut_data/midwest2010.tsv", "donut_data/southeast2010.tsv", "donut_data/south2010.tsv"];
var donut_bases_de_dados2011 = ["donut_data/north2011.tsv","donut_data/northeast2011.tsv", "donut_data/midwest2011.tsv", "donut_data/southeast2011.tsv", "donut_data/south2011.tsv"];
var donut_bases_de_dados2012 = ["donut_data/north2012.tsv","donut_data/northeast2012.tsv", "donut_data/midwest2012.tsv", "donut_data/southeast2012.tsv", "donut_data/south2012.tsv"];
var donut_bases_de_dados2013 = ["donut_data/north2013.tsv","donut_data/northeast2013.tsv", "donut_data/midwest2013.tsv", "donut_data/southeast2013.tsv", "donut_data/south2013.tsv"];

reload_donut(0,0);

function reload_donut(idYear, reg){
	
	var database = [];
	if(idYear == 0){
		database = donut_bases_de_dados2009[reg];
		
	}
	else if(idYear == 1){
		database = donut_bases_de_dados2010[reg];
	}
	else if(idYear == 2){
		database = donut_bases_de_dados2011[reg];
	}
	else if(idYear == 3){
		database = donut_bases_de_dados2012[reg];
	}
	else{
		database = donut_bases_de_dados2013[reg];
	}


	d3.select("#squareThree").remove();
		
	var div = document.createElement("div");
	div.id = "squareThree";

	document.body.appendChild(div);
	
	d3.tsv(database,
    function(error, data) {


	var width = 290,
		height = 290,
		outerRadius = Math.min(width, height) / 2.8,
	    innerRadius = outerRadius * .999,   
	    innerRadiusFinal = outerRadius * .6,
	    innerRadiusFinal3 = outerRadius* .65;
	
	var color = ["#2CA02C", "#AEC7E8", "#FF7F0E", "#FFBB78", "#1F77B4", "#98DF8A", "#D62728", "#FF9896", "#E57C7D", "#4AC2B6", "#9467BD", "#C5B0D5", "#8C564B", "#C49C94", "#E377C2", "#F7B6D2", "#7F7F7F", "#C7C7C7", "#BCBD22", "#DBDB8D", "#17BECF"];

	var tooltipDonut = d3.select("#squareThree").append("div").attr("class", "tooltipDonut hidden");
	    
	    
	var vis = d3.select("#squareThree")
	     .append("svg:svg")             
	     .data([data])                   
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
		.attr("fill", function(d, i) { return color[i]; } ) //set the color for each slice to be chosen from the color function defined above
		.attr("d", arc)     //this creates the actual SVG path using the associated data (pie) with the arc drawing function
		//.append("svg:title") //mouseover title showing the figures	
	
    d3.selectAll("g.slice").selectAll("path").transition()
		.duration(1000)
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

	d3.select("#squareFour").remove();
		
	var div = document.createElement("div");
	div.id = "squareFour";

	document.body.appendChild(div);


	var legend = d3.select("#squareFour")
		.append("svg")
		.attr("width", 300)
		.attr("height",300);
		
	legend.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
		.attr("x", 10)
		.attr("y", function(d,i){ return i * 20;} )
		.attr("fill" , function(d,i){ return color[i];});
		
	legend.selectAll("text")
		.data(data)
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

		});
}
