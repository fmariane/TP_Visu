var margin = { top: 20, right: 0, bottom: 100, left: 140 };
var width = 960 - margin.left - margin.right;
var height = 420 - margin.top - margin.bottom;
var sizeGrid = Math.floor(width / 30);
var sizeSubtitle = sizeGrid*1.28;
var elementsSubtitle = 9;
var colors = ["#6060F7", "#8080F8", "#AAAAF9", "#CCCCFA", "#EEEEFB", "#FFEEEE", "#FFCCCC", "#FFAAAA", "#FF8080","#FF6060"];
var years = ["2008", "2009", "2010", "2011", "2012", "2013", "2014"];
var schoolLevel = ["Middle school 2", "Middle school 3", "Middle school 4", "Middle school 5", "Middle school 6", "Middle school 7", "Middle school 8", "Middle school 9", "High school 1", "High school 2", "High school 3"];
var dataBase = ["data/evasaoNorte.tsv", "data/evasaoNordeste.tsv", "data/evasaoCentroOeste.tsv", "data/evasaoSudeste.tsv", "data/evasaoSul.tsv"];
var cor_ext =["#FF4040","#4040F6"];
 
var heatmapChart = function(tsvFile, container) {
  margin = { top: 20, right: 0, bottom: 50, left: 10 };
  var div = d3.select(container).append("div")
    .attr("class", "tooltip")      
    .style("opacity", 0);
  //////////////////////////////////////
  //// PRÉ PROCESSAMENTO DOS DADOS ////
  ////////////////////////////////////
  d3.tsv(tsvFile,
  function(d) {
     return {
      ano: +d.ano,
      nomeCurso: +d.nomeCurso,
      evasao: +d.evasao
    };
  });
 
 
  ////////////////////////////////////
  //// CRIAÇÃO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  var svg = d3.select(container).append("svg")
    .attr("width", 230 + margin.left + margin.right)
    .attr("height", 280 + margin.top + margin.bottom)
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
        .attr("x", function(d, i) { return i * sizeGrid; })
        .attr("y", 11.8*sizeGrid)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + sizeGrid / 2 + ", -6)")
        .attr("font-family", "Tahoma")
        .attr("font-size", "11px")
        .attr("fill", "#696969")
     
    var escalacolors = d3.scale.quantile()
        .domain([-100000, 100000])
        .range(colors);
 
    var cards = svg.selectAll(".ano")
        .data(data, function(d) {return d.nomeCurso+':'+d.ano;});
 
    cards.append("title");
 
    cards.enter().append("rect")
        .attr("x", function(d) { return (d.ano - 1) * sizeGrid; })
        .attr("y", function(d) { return (d.nomeCurso - 1) * sizeGrid; })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "nomeCurso contour")
        .attr("width", sizeGrid)
        .attr("height", sizeGrid)
        .style("fill", function(d) {if(d.evasao > 100000){return cor_ext[0];} else { return colors[0];}})
        .on("mouseover", function(d,i) {    
           div.transition()    
               .duration(200)    
               .style("opacity", .9);    
           div .html("<strong>Year: "+years[d.ano-1]+"<br/>"+"</strong>"+"<strong>School Level: "+schoolLevel[d.nomeCurso-1]+"<br/>"+"</strong>"+"<strong>School Evasion: "+d.evasao+"<br/>"+"</strong>")  
               .style("left", ((d.ano) * sizeGrid)-40 + "px" )  
               .style("top", ((d.nomeCurso - 1) * sizeGrid)-sizeGrid + 10 + "px" ) ;  
           })          
       .on("mouseout", function(d) {  
           div.transition()    
               .duration(500)    
               .style("opacity", 0);
       });
 
    cards.transition().duration(1000)
        .style("fill", function(d) {if(d.evasao > 100000){return cor_ext[0];}else if(d.evasao<-100000){ return cor_ext[1];} else { return escalacolors(d.evasao);}});
 
    cards.select("title").text(function(d) { return d.evasao; });
         
    cards.exit().remove();
 
  });  
};
 
var firstHeatmapChart = function(tsvFile, container) {
 
  var div = d3.select(container).append("div")
    .attr("class", "tooltip")      
    .style("opacity", 0);
 
  //////////////////////////////////////
  //// PRÉ PROCESSAMENTO DOS DADOS ////
  ////////////////////////////////////
  d3.tsv(tsvFile,
  function(d) {
     return {
      ano: +d.ano,
      nomeCurso: +d.nomeCurso,
      evasao: +d.evasao
    };
  });
 
  ////////////////////////////////////
  //// CRIAÇÃO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  var svg = d3.select(container).append("svg")
    .attr("width", 230 + margin.left + margin.right)
    .attr("height", 280 + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
       
  ////////////////////////////////////
  //// DESENHO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  d3.tsv(tsvFile,
  function(error, data) {
     var schoolLevelLabels = svg.selectAll(".schoolLevelLabel")
      .data(schoolLevel)
      .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * sizeGrid; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + sizeGrid / 1.5 + ")")
        .attr("font-family", "Tahoma")
        .attr("font-size", "12px")
        .attr("fill", "#696969")
 
  var yearLabels = svg.selectAll(".yearLabel")
      .data(years)
      .enter().append("text")
        .text(function(d) { return d; })
        .attr("x", function(d, i) { return i * sizeGrid; })
        .attr("y", 11.8*sizeGrid)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + sizeGrid / 2 + ", -6)")
        .attr("font-family", "Tahoma")
        .attr("font-size", "11px")
        .attr("fill", "#696969")
 
    var escalacolors = d3.scale.quantile()
        .domain([-100000, 100000])
        .range(colors);
 
    var cards = svg.selectAll(".ano")
        .data(data, function(d) {return d.nomeCurso+':'+d.ano;});
 
    cards.append("title");
 
    cards.enter().append("rect")
        .attr("x", function(d) { return (d.ano - 1) * sizeGrid; })
        .attr("y", function(d) { return (d.nomeCurso - 1) * sizeGrid; })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "nomeCurso contour")
        .attr("width", sizeGrid)
        .attr("height", sizeGrid)
        .style("fill", function(d) {if(d.evasao > 100000){return cor_ext[0];} else { return colors[0];}})
        .on("mouseover", function(d,i) {    
           div.transition()    
               .duration(200)    
               .style("opacity", .9);    
           div .html("<strong>Year: "+years[d.ano-1]+"<br/>"+"</strong>"+"<strong>School Level: "+schoolLevel[d.nomeCurso-1]+"<br/>"+"</strong>"+"<strong>School Evasion: "+d.evasao+"<br/>"+"</strong>")  
               .style("left", ((d.ano) * sizeGrid)+ 90  + "px")  
               .style("top", ((d.nomeCurso - 1) * sizeGrid)-sizeGrid+10 + "px");  
           })          
       .on("mouseout", function(d) {  
           div.transition()    
               .duration(500)    
               .style("opacity", 0);
       });
 
    cards.transition().duration(1000)
        .style("fill", function(d) {if(d.evasao > 100000){return cor_ext[0];} else { return escalacolors(d.evasao);}});
 
    cards.select("title").text(function(d) { return d.evasao; });
         
    cards.exit().remove();
  });  
};
 
var legendScale = function(container) {
  var valuesRef = ["< -100000","< -65000","< -48750","< -32500","< -16250","0","> 16250","> 32500","> 48750","> 65000", "> 100000","1"];
  var sub_w = 60; //width dos blocos da legenda
  var sub_h = 20; //height
  width = 800;
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
  .attr("x", function(d, i) { return i * sub_w;})
  .attr("y", 0)
  .attr("width", sub_w)
  .attr("height", function(d) { return sub_h;  })
  .attr("fill", function(d,i) { return colors2[i]; });
 
  svg.selectAll("text")
  .data(valuesRef)
  .enter()
  .append("text")
  .text(function(d) { return d; })
  .attr("x", function(d, i) {if(i<5) {return i* sub_w + 40;} else if (i>5){ return i*sub_w + 70} else{ return i *sub_w + 70}})
  .attr("y", function(d) { return 30;})
  .attr("font-family", "Tahoma")
  .attr("font-size", "10px")
  .attr("fill", function(d,i) {if(i> 10) {return "#F0F0F0";} else {return "#696969";}})
     
 
}
 
 
firstHeatmapChart(dataBase[0], "#evasaoNorte");
heatmapChart(dataBase[1], "#evasaoNordeste");
heatmapChart(dataBase[2], "#evasaoCentroOeste");
heatmapChart(dataBase[3], "#evasaoSudeste");
heatmapChart(dataBase[4], "#evasaoSul");
legendScale ("#evasao");