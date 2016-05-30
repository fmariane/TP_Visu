var margem = {top: 50, right: 0, bottom: 100, left: 240};
var largura = 1000 - margem.left - margem.right; 
var altura = 480 - margem.top - margem.bottom;
var grid = Math.floor(largura/24),
var larguraLegenda = grid*2,
var itensLegenda = 9,
var cores = ["#E20000", "#FF6666", "#FF9999","#FFCBCB","#FFFFFF","#1D91C0","#225EA8","#253494","#081D58"], // alternatively colorbrewer.YlGnBu[9]
var nomeCursos = ["Ensino Fundamental 2º Ano", "Ensino Fundamental 3º Ano", "Ensino Fundamental 4º Ano", "Ensino Fundamental 5º Ano", "Ensino Fundamental 6º Ano", "Ensino Fundamental 7º Ano", "Ensino Fundamental 8º Ano", "Ensino Fundamental 9º Ano", "Ensino Médio - 1ª Série", "Ensino Médio - 2ª Série", "Ensino Médio - 3ª Série"];
var dados = ["evasaoNorte.csv", "evasaoNordeste.csv", "evasaoCentroOeste.csv", "evasaoSudeste.csv", "evasaoSul.csv"];
  

//////////////////////////////////////
//// PRÉ PROCESSAMENTO DOS DADOS ////
////////////////////////////////////
d3.csv("data/evasaoNorte.csv", function(error, data){
  
  if (error) 
    throw error;

  data.forEach(function(d){
    d.ano = +d.ano; // Converte coluna para número
    d.nomeCurso = +d.nomeCurso; // Converte coluna para número
    d.evasao = +d.evasao; // Converte coluna para número    
  }); 
  
  Main(data);
  
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
    
  var anoLabels = svg.selectAll(".anoLabel")
    .data(anos)
    .enter()
    .append(".anoLabel");

  var nomeCursoLabels = svg.select(".nomeCursoLabel")
    .data(nomeCursos)
    .enter()
    .append(".nomeCursoLabel");

  var colorScale = d3.scale.quantile()
    .domain([0, itensLegenda-1, d3.max(dados, function(d){  return d.evasao;})])
    .range(cores);

  var cards = svg.selectAll(".nomeCurso")
    .data(data, function(d) {return d.ano+':'+d.nomeCurso;});

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
    
  var valorMaximo = d3.max(dados, function(d){ return d.evasao; });
  
  // Mapeia os dados e obtém um vetor com o domínio de X (Anos)
  // Domínio X = ["2009", "2010", "2011", "2012", "2013"]
  var dominioAnos = dados.map(function(d) { return d.ano; }); 
  
  // Define as escalas do gráfico
  var x = d3.scale.ordinal()
    .domain(dominioAnos)
    .rangeRoundBands([0, largura], .3);
  
  var y = d3.scale.linear()
    .domain([0, valorMaximo])
    .range([altura, 0]);
  
      
  // Define os eixos do gráfico
  var eixoX = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
  var eixoY = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);
    
  
  // Insere os eixos no gráfico
  svg.append("g")
      .attr("class", "x eixo")
      .attr("transform", "translate(0," + altura + ")")
      .call(eixoX); 
  
  svg.append("g")
      .attr("class", "y eixo")
      .call(eixoY); 
    
    
  svg.selectAll("rect")
    .attr("class", "barra")
    .attr("x", function(d) { return x(d.ano); })
    .attr("width", x.rangeBand())
    .attr("y", function(d){ return y(d.evasao); })
    .attr("height", function(d){return altura - y(d.evasao); })
    .style("fill", "#00DEF2");

}


function Main(dados) {
  var container = "#containerNorte";
  CriaHeatMap(dados, container);
  DesenhaHeatMap(container);
}
