var margem = {top: 50, right: 0, bottom: 100, left: 240};
var largura = 1000 - margem.left - margem.right; 
var altura = 480 - margem.top - margem.bottom;
var grid = Math.floor(largura/24),
var larguraLegenda = grid*2,
var itensLegenda = 9,
var cores = ["#081D58", "#253494", "#225EA8", "#1D91C0", "#FFFFFF", "#E20000", "#FF6666", "#FF9999","#FFCBCB"], // alternatively colorbrewer.YlGnBu[9]
var anos = ["2008", "2009", "2010", "2011", "2012", "2013", "2014"],
var nomeCursos = ["Ensino Fundamental 2º Ano", "Ensino Fundamental 3º Ano", "Ensino Fundamental 4º Ano", "Ensino Fundamental 5º Ano", "Ensino Fundamental 6º Ano", "Ensino Fundamental 7º Ano", "Ensino Fundamental 8º Ano", "Ensino Fundamental 9º Ano", "Ensino Médio - 1ª Série", "Ensino Médio - 2ª Série", "Ensino Médio - 3ª Série"];
var dados = ["evasaoNorte.csv", "evasaoNordeste.csv", "evasaoCentroOeste.csv", "evasaoSudeste.csv", "evasaoSul.csv"];
  

//////////////////////////////////////
//// PRÉ PROCESSAMENTO DOS DADOS ////
////////////////////////////////////
d3.csv(dados[0], function(error, dado){
  
  if (error) 
    throw error;

  dado.forEach(function(d){
    d.ano = +d.ano; // Converte coluna para número
    d.nomeCurso = +d.nomeCurso; // Converte coluna para número
    d.evasao = +d.evasao; // Converte coluna para número    
  }); 
  
  Main(dado);
  
});


////////////////////////////////////
//// CRIAÇÃO DAS VISUALIZAÇÕES ////
//////////////////////////////////
function CriaHeatMap(dados, container) {
  
  var svg = d3.select(container).append("svg")
    .attr("width", largura + margem.left + margem.right)
    .attr("height", altura + margem.top + margem.bottom)
    .append("g")
    .attr("transform", "translate(" + margem.left + "," + margem.top  + ")");

}


////////////////////////////////////
//// DESENHO DAS VISUALIZAÇÕES ////
//////////////////////////////////
function DesenhaHeatMap(container) {
    var dados = d3.select(container)
    .selectAll("rect")
    .data();
    
  var svg = d3.select(container)
    .select("svg g");
    

  var anoLabels = svg.selectAll(".anoLabel")
    .data(anos)
    .enter().append("text");
    .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * grid; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + grid / 1.5 + ")")
        .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "anoLabel legenda axis eixoAno" : "anoLabel legenda axis"); });

  var nomeCursoLabels = svg.select(".nomeCursoLabel")
    .data(nomeCursos)
    .enter().append("text");
    .text(function(d) { return d; })
        .attr("x", function(d, i) { return i * grid; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + grid / 2 + ", -6)")
        .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "nomeCursoLabel legenda axis eixoNomeCurso" : "nomeCursoLabel legenda axis"); });

  var colorScale = d3.scale.quantile()
    .domain([0, itensLegenda-1, d3.max(dados, function(d){  return d.evasao;})])
    .range(cores);

  var cards = svg.selectAll(".nomeCurso")
    .data(dados, function(d) {return d.ano+':'+d.nomeCurso;});

  cards.append("title");

  cards.enter().append("rect")
    .attr("x", function(d) { return (d.nomeCurso - 1) * grid; })
    .attr("y", function(d) { return (d.ano - 1) * grid; })
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("class", "nomeCurso borda")
    .attr("largura", grid)
    .attr("altura", grid)
    .style("fill", cores[0]);  

  cards.transition().duration(1000)
    .style("fill", function(d) { return colorScale(d.evasao); });

  cards.select("title").text(function(d) { return d.evasao; });
  
  cards.exit().remove();

  var legend = svg.selectAll(".legend")
    .data([0].concat(colorScale.quantiles()), function(d) { return d; });

  legend.enter().append("g")
    .attr("class", "legend");

  legend.append("rect")
    .attr("x", function(d, i) { return larguraLegenda * i; })
    .attr("y", altura)
    .attr("largura", larguraLegenda)
    .attr("altura", grid / 2)
    .style("fill", function(d, i) { return colors[i]; });

  legend.append("text")
    .attr("class", "legenda")
    .text(function(d) { return "≥ " + Math.round(d); })
    .attr("x", function(d, i) { return larguraLegenda * i; })
    .attr("y", altura + grid);

  legend.exit().remove();        

}


function Main(dados) {
  var container = "#containerNorte";
  CriaHeatMap(dados, container);
  DesenhaHeatMap(container);
}
