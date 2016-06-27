var margin = { top: 0, right: 100, bottom: 100, left: 100 };
var width = 1100 - margin.left - margin.right;
var height = 450 - margin.top - margin.bottom;
var sizeGrid = Math.floor(width / 45);
var elementsSubtitle = 9;
var colors = ["#6060F7", "#8080F8", "#AAAAF9", "#CCCCFA", "#EEEEFB", "#FFEEEE", "#FFCCCC", "#FFAAAA", "#FF8080","#FF6060"];
var years = ["2008", "2009", "2010", "2011", "2012", "2013", "2014"];
var schoolLevel = ["Middle school 2", "Middle school 3", "Middle school 4", "Middle school 5", "Middle school 6", "Middle school 7", "Middle school 8", "Middle school 9", "High school 1", "High school 2", "High school 3"];
var dataBase = ["data/evasionNorth.tsv", "data/evasionNortheast.tsv", "data/evasionMidwest.tsv", "data/evasionSoutheast.tsv", "data/evasionSouth.tsv"];
var cor_ext =["#FF4040","#4040F6"];
 
var heatmapChart = function(tsvFile, container) {
  margin = { top: 5, right: 0, bottom: 50, left: 0 };
  var div = d3.select(container).append("div")
    .attr("class", "tooltip")      
    .style("opacity", 0);
  //////////////////////////////////////
  //// PRÉ PROCESSAMENTO DOS DADOS ////
  ////////////////////////////////////
  d3.tsv(tsvFile,
  function(d) {
     return {
      year: +d.year,
      schoolLevel: +d.schoolLevel,
      evasion: +d.evasion
    };
  });
 
  ////////////////////////////////////
  //// CRIAÇÃO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  var svg = d3.select(container).append("svg")
    .attr("width", 8*sizeGrid)
    .attr("height", 12.5*sizeGrid)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
       
  ////////////////////////////////////
  //// DESENHO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  d3.tsv(tsvFile,
  function(error, data) {
    var yearLabels = svg.selectAll(".yearLabel")
      .data(years)
      .enter().append("text")
        .text(function(d) { return d; })
        .attr("x", function(d, i) { return i*sizeGrid;})
        .attr("y", 11.8*sizeGrid)
        .attr("dy", ".35em")
        //.attr("transform", function(d, i) { return "translate(" +sizeGrid/2 + ", -6) rotate(" + 270 + ")"; })
        //.attr("transform", "translate(250, 0) rotate(45)")
        .style("text-anchor", "middle")
        .attr("transform", "translate(" +sizeGrid/2 + ", -6) rotate(90)")
        .attr("font-family", "Tahoma")
        .attr("font-size", "8px")
        .attr("fill", "#696969");
     
    var escalacolors = d3.scale.quantile()
        .domain([-100000, 100000])
        .range(colors);
 
    var cards = svg.selectAll(".year")
        .data(data, function(d) {return d.schoolLevel+':'+d.year;});
 
    cards.append("title");
 
    cards.enter().append("rect")
        .attr("x", function(d) { return (d.year-1)*sizeGrid; })
        .attr("y", function(d) { return (d.schoolLevel-1)*sizeGrid; })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "schoolLevel contour")
        .attr("width", sizeGrid)
        .attr("height", sizeGrid)
        .style("fill", function(d) {if(d.evasion > 100000){return cor_ext[0];} else { return colors[0];}})
        .on("mouseover", function(d,i) {    
           div.transition()    
               .duration(200)    
               .style("opacity", .9);    
           div .html("<strong>Year: "+years[d.year-1]+"<br/>"+"</strong>"+"<strong>School Level: "+schoolLevel[d.schoolLevel-1]+"<br/>"+"</strong>"+"<strong>School Evasion: "+d.evasion+"<br/>"+"</strong>")  
               .style("left", ((d.year) * sizeGrid)-100 + "px" )  
               .style("top", ((d.schoolLevel-1)*sizeGrid)-20 + "px" ) ;  
           })          
       .on("mouseout", function(d) {  
           div.transition()    
               .duration(500)    
               .style("opacity", 0);
       });
 
    cards.transition().duration(1000)
        .style("fill", function(d) {if(d.evasion > 100000){return cor_ext[0];}else if(d.evasion<-100000){ return cor_ext[1];} else { return escalacolors(d.evasion);}});
 
    cards.select("title").text(function(d) { return d.evasion; });
         
    cards.exit().remove();
 
  });  
};
 
var subtitleSchoolLevel = function(container) {
  ////////////////////////////////////
  //// CRIAÇÃO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  var svg = d3.select(container).append("svg")
    .attr("width", 5*sizeGrid+margin.left+margin.right)
    .attr("height", 13*sizeGrid)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
       
  ////////////////////////////////////
  //// DESENHO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  
  var schoolLevelLabels = svg.selectAll(".schoolLevelLabel")
    .data(schoolLevel)
    .enter().append("text")
      .text(function (d) { return d; })
      .attr("x", margin.left+margin.right)
      .attr("y", function (d, i) { return (2+i)*sizeGrid; })
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + sizeGrid / 1.5 + ")")
      .attr("font-family", "Tahoma")
      .attr("font-size", "10px")
      .attr("fill", "#696969") 
};
 
var subtitleScale = function(container) {
  var valuesRef = ["< -100000","< -65000","< -48750","< -32500","< -16250","0","> 16250","> 32500","> 48750","> 65000", "> 100000","1"];
  var sub_w = 50; 
  var sub_h = 10; 
  width = 1200;
  height = 30;
  var colors2 = ["#4040F6","#6060F7", "#8080F8", "#AAAAF9", "#CCCCFA", "#EEEEFB", "#FFEEEE", "#FFCCCC", "#FFAAAA", "#FF8080","#FF6060","#FF4040"];
     
  ////////////////////////////////////
  //// CRIAÇÃO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  var svg = d3.select(container)
  .append("svg")
  .attr("width", width)
  .attr("height", height);
 
  ////////////////////////////////////
  //// DESENHO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  svg.selectAll("rect")
  .data(valuesRef)
  .enter()
  .append("rect")
  .attr("x", function(d, i) { return 360+(i*sub_w);})
  .attr("y", 0)
  .attr("width", sub_w)
  .attr("height", function(d) { return sub_h;  })
  .attr("fill", function(d,i) { return colors2[i]; });
 
  svg.selectAll("text")
  .data(valuesRef)
  .enter()
  .append("text")
  .text(function(d) { return d; })
  .attr("x", function(d, i) {if(i<5) {return i*sub_w+370;} else{ return i*sub_w+410;}})
  .attr("y", 20)
  .attr("font-family", "Tahoma")
  .attr("font-size", "10px")
  .attr("fill", function(d,i) {if(i>10) {return "#F0F0F0";} else {return "#696969";}}) 
}
 
subtitleSchoolLevel ("#schoolLevel")
heatmapChart(dataBase[0], "#evasionNorth");
heatmapChart(dataBase[1], "#evasionNortheast");
heatmapChart(dataBase[2], "#evasionMidwest");
heatmapChart(dataBase[3], "#evasionSoutheast");
heatmapChart(dataBase[4], "#evasionSouth");
subtitleScale ("#evasion");