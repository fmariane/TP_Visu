var margem = { top: 20, right: 0, bottom: 100, left: 140 };
var largura = 960 - margem.left - margem.right;
var altura = 420 - margem.top - margem.bottom;
var tamanhoGrid = Math.floor(largura / 30);
var tamanhoLegenda = tamanhoGrid*1.28;
var elementosLegenda = 9;
var cores = ["#6060F7", "#8080F8", "#AAAAF9", "#CCCCFA", "#FFEDDE", "#FFCCCC", "#FFAAAA", "#FF8080","#FF6060"]; 
var anos = ["2008", "2009", "2010", "2011", "2012", "2013", "2014"];
var cursos = ["Ensino Fundamental 2", "Ensino Fundamental 3", "Ensino Fundamental 4", "Ensino Fundamental 5", "Ensino Fundamental 6", "Ensino Fundamental 7", "Ensino Fundamental 8", "Ensino Fundamental 9", "Ensino Médio 1", "Ensino Médio 2", "Ensino Médio 3"];
var basesDados = ["data/evasaoNorte.tsv", "data/evasaoNordeste.tsv", "data/evasaoCentroOeste.tsv", "data/evasaoSudeste.tsv", "data/evasaoSul.tsv"];


var heatmapChart = function(tsvFile, container) {
  margem = { top: 20, right: 0, bottom: 50, left: 10 };
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
    .attr("width", 230 + margem.left + margem.right)
    .attr("height", 250 + margem.top + margem.bottom)
    .append("g")
    .attr("transform", "translate(" + margem.left + "," + margem.top + ")");
        
  ////////////////////////////////////
  //// DESENHO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  d3.tsv(tsvFile,
  function(error, data) {
     
    var escalaCores = d3.scale.quantile()
        .domain([-65000, 65000])
        .range(cores);

    var cards = svg.selectAll(".ano")
        .data(data, function(d) {return d.nomeCurso+':'+d.ano;});

    cards.append("title");

    cards.enter().append("rect")
        .attr("x", function(d) { return (d.ano - 1) * tamanhoGrid; })
        .attr("y", function(d) { return (d.nomeCurso - 1) * tamanhoGrid; })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "nomeCurso borda")
        .attr("width", tamanhoGrid)
        .attr("height", tamanhoGrid)
        .style("fill", cores[0])
        .on("mouseover", function(d,i) {    
           div.transition()    
               .duration(200)    
               .style("opacity", .9);    
           div .html("<strong>Ano: "+anos[d.ano-1]+"<br/>"+"</strong>"+"<strong>Curso: "+cursos[d.nomeCurso-1]+"<br/>"+"</strong>"+"<strong>Evasão: "+d.evasao+"<br/>"+"</strong>")  
               .style("left", function(d) { return ((d.ano - 1) * tamanhoGrid)-10; } + "px")  
               .style("top", function(d) { return ((d.nomeCurso - 1) * tamanhoGrid)-tamanhoGrid+100; } + "px");  
           })          
       .on("mouseout", function(d) {  
           div.transition()    
               .duration(500)    
               .style("opacity", 0);
       });

    cards.transition().duration(1000)
        .style("fill", function(d) { return escalaCores(d.evasao); });

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
    .attr("width", 230 + margem.left + margem.right)
    .attr("height", 250 + margem.top + margem.bottom)
    .append("g")
    .attr("transform", "translate(" + margem.left + "," + margem.top + ")");
        
  ////////////////////////////////////
  //// DESENHO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  d3.tsv(tsvFile,
  function(error, data) {
     var nomeCursoLabels = svg.selectAll(".nomeCursoLabel")
      .data(cursos)
      .enter().append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * tamanhoGrid; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + tamanhoGrid / 1.5 + ")")
        .attr("font-family", "Tahoma")
        .attr("font-size", "12px")
        .attr("fill", "#696969")

  var anoLabels = svg.selectAll(".anoLabel")
      .data(anos)
      .enter().append("text")
        .text(function(d) { return d; })
        .attr("x", function(d, i) { return i * tamanhoGrid; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + tamanhoGrid / 2 + ", -6)")
        .attr("font-family", "Tahoma")
        .attr("font-size", "11px")
        .attr("fill", "#696969")

    var escalaCores = d3.scale.quantile()
        .domain([-65000, 65000])
        .range(cores);

    var cards = svg.selectAll(".ano")
        .data(data, function(d) {return d.nomeCurso+':'+d.ano;});

    cards.append("title");

    cards.enter().append("rect")
        .attr("x", function(d) { return (d.ano - 1) * tamanhoGrid; })
        .attr("y", function(d) { return (d.nomeCurso - 1) * tamanhoGrid; })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "nomeCurso borda")
        .attr("width", tamanhoGrid)
        .attr("height", tamanhoGrid)
        .style("fill", cores[0])
        .on("mouseover", function(d,i) {    
           div.transition()    
               .duration(200)    
               .style("opacity", .9);    
           div .html("<strong>Ano: "+anos[d.ano-1]+"<br/>"+"</strong>"+"<strong>Curso: "+cursos[d.nomeCurso-1]+"<br/>"+"</strong>"+"<strong>Evasão: "+d.evasao+"<br/>"+"</strong>")  
               .style("left", function(d) { return ((d.ano - 1) * tamanhoGrid)-10; } + "px")  
               .style("top", function(d) { return ((d.nomeCurso - 1) * tamanhoGrid)-tamanhoGrid+10; } + "px");  
           })          
       .on("mouseout", function(d) {  
           div.transition()    
               .duration(500)    
               .style("opacity", 0);
       });

    cards.transition().duration(1000)
        .style("fill", function(d) { return escalaCores(d.evasao); });

    cards.select("title").text(function(d) { return d.evasao; });
          
    cards.exit().remove();
  });  
};

var legendScale = function(container) {
  var valores_referencia = ["-65000","-48750","-32500","-16250","0","16250","32500","48750","65000"];
  var sub_w = 70; //largura dos blocos da legenda
  var sub_h = 20; //altura
  largura = 700;
  altura = 30;
        
  ////////////////////////////////////
  //// CRIAÇÃO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  var svg = d3.select(container)
  .append("svg")
  .attr("width", largura)
  .attr("height", altura);

  ////////////////////////////////////
  //// DESENHO DAS VISUALIZAÇÕES ////
  //////////////////////////////////
  svg.selectAll("rect")
  .data(valores_referencia)
  .enter()
  .append("rect")
  .attr("x", function(d, i) { return i * sub_w;})
  .attr("y", 0) 
  .attr("width", sub_w)
  .attr("height", function(d) { return sub_h;  })
  .attr("fill", function(d,i) { return cores[i]; });

  svg.selectAll("text")
  .data(valores_referencia)
  .enter()
  .append("text")
  .text(function(d) { return d; })
  .attr("x", function(d, i) {if(i<4) {return i* sub_w + 20;} else if (i>4){ return i*sub_w + 22} else{ return i *sub_w + 31}}) 
  .attr("y", function(d) { return 30;}) 
  .attr("font-family", "Tahoma")
  .attr("font-size", "10px")
  .attr("fill", "#696969")
      

}


firstHeatmapChart(basesDados[0], "#evasaoNorte");
heatmapChart(basesDados[1], "#evasaoNordeste");
heatmapChart(basesDados[2], "#evasaoCentroOeste");
heatmapChart(basesDados[3], "#evasaoSudeste");
heatmapChart(basesDados[4], "#evasaoSul");
legendScale ("#evasao");
