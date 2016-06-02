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
  margem = { top: 20, right: 0, bottom: 100, left: 10 };
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
        .style("fill", cores[0]);

    cards.transition().duration(1000)
        .style("fill", function(d) { return escalaCores(d.evasao); });

    cards.select("title").text(function(d) { return d.evasao; });
          
    cards.exit().remove();

  });  
};

var firstHeatmapChart = function(tsvFile, container) {
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
        .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "nomeCursoLabel legenda axis eixoNomeCurso" : "nomeCursoLabel legenda axis"); });

  var anoLabels = svg.selectAll(".anoLabel")
      .data(anos)
      .enter().append("text")
        .text(function(d) { return d; })
        .attr("x", function(d, i) { return i * tamanhoGrid; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + tamanhoGrid / 2 + ", -6)")
        .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "anoLabel legenda axis eixoAno" : "anoLabel legenda axis"); });

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
        .style("fill", cores[0]);

    cards.transition().duration(1000)
        .style("fill", function(d) { return escalaCores(d.evasao); });

    cards.select("title").text(function(d) { return d.evasao; });
          
    cards.exit().remove();
  });  
};




firstHeatmapChart(basesDados[0], "#evasaoNorte");
heatmapChart(basesDados[1], "#evasaoNordeste");
heatmapChart(basesDados[2], "#evasaoCentroOeste");
heatmapChart(basesDados[3], "#evasaoSudeste");
heatmapChart(basesDados[4], "#evasaoSul");
