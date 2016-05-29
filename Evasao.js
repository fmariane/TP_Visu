///////////////////////////////////
////Pré processamento de dados////
///////////////////////////////////

d3.csv("data/evasao.xlsx", function(error, data) {
  console.log(data);

  data.forEach(function(d)) {
    //Conversão de tipo +
    d.evasao = +d.evasao;
    console.log(d);
  });

  var maximo = d3.max(data, function(d) { return d.evasao; });
  var minimo = d3.min(data, function(d) { return d.evasao; });
  var dominio = d3.extent(data, function(d) { return d.evasao; });
  console.log(maximo);
  console.log(minimo);
  console.log(dominio);

  //Ordenar em ordem crescente, a-b e em ordem decrescente, b-a
  data.sort(function(a, b) { return a.evasao - b.evasao;  });
  console.log(data);

  //O container é o id da div no HTML onde a visualização ficará
  CriaHeatMap(data, "container")

});

//////////////////////////////////
////Criação das visualizações////
//////////////////////////////////

function CriaHeatMap(dados, container){
  var svg = d3.select(container).append("svg")
    .attr ("width", 640)
    .attr ("height", 480)
    .style("background-color", "#383838");

  //Criação dos retângulos
  svg.selectAll("rect")
    .data(dados)
    .enter()
    .append("rect")
    .attr("width", 30)
    //Para não começar no zero zero (esquerda em cima)
    .attr("height", function(d) { return 480 - d.matriculas; })
    .attr("x", function(d, i) { return i*30; })
    .attr("y", function(d) { return d.matriculas; })
    .style ("fill", "#00DEF2");

}


//////////////////////////////////
////Desenho das visualizações////
//////////////////////////////////

/*

(function(){
  //UI configuration
  var itemSize = 18,
    cellSize = itemSize-1,
    width = 800,
    height = 800,
    margin = {top:20,right:20,bottom:20,left:25};

  //formats
  var hourFormat = d3.time.format('%H'),
    dayFormat = d3.time.format('%j'),
    timeFormat = d3.time.format('%Y-%m-%dT%X'),
    monthDayFormat = d3.time.format('%m.%d');

  //data vars for rendering
  var dateExtent = null,
    data = null,
    dayOffset = 0,
    colorCalibration = ['#f6faaa','#FEE08B','#FDAE61','#F46D43','#D53E4F','#9E0142'],
    dailyValueExtent = {};

  //axises and scales
  var axisWidth = 0 ,
    axisHeight = itemSize*24,
    xAxisScale = d3.time.scale(),
    xAxis = d3.svg.axis()
      .orient('top')
      .ticks(d3.time.days,3)
      .tickFormat(monthDayFormat),
    yAxisScale = d3.scale.linear()
      .range([0,axisHeight])
      .domain([0,24]),
    yAxis = d3.svg.axis()
      .orient('left')
      .ticks(5)
      .tickFormat(d3.format('02d'))
      .scale(yAxisScale);

  initCalibration();

  var svg = d3.select('[role="heatmap"]');
  var heatmap = svg
    .attr('width',width)
    .attr('height',height)
  .append('g')
    .attr('width',width-margin.left-margin.right)
    .attr('height',height-margin.top-margin.bottom)
    .attr('transform','translate('+margin.left+','+margin.top+')');
  var rect = null;


  function initCalibration(){
    d3.select('[role="calibration"] [role="example"]').select('svg')
      .selectAll('rect').data(colorCalibration).enter()
    .append('rect')
      .attr('width',cellSize)
      .attr('height',cellSize)
      .attr('x',function(d,i){
        return i*itemSize;
      })
      .attr('fill',function(d){
        return d;
      });

    //bind click event
    d3.selectAll('[role="calibration"] [name="displayType"]').on('click',function(){
      renderColor();
    });
  }

  function renderColor(){
    var renderByCount = document.getElementsByName('displayType')[0].checked;

    rect
      .filter(function(d){
        return (d.value['PM2.5']>=0);
      })
      .transition()
      .delay(function(d){      
        return (dayFormat(d.date)-dayOffset)*15;
      })
      .duration(500)
      .attrTween('fill',function(d,i,a){
        //choose color dynamicly      
        var colorIndex = d3.scale.quantize()
          .range([0,1,2,3,4,5])
          .domain((renderByCount?[0,500]:dailyValueExtent[d.day]));

        return d3.interpolate(a,colorCalibration[colorIndex(d.value['PM2.5'])]);
      });
  }
  
  //extend frame height in `http://bl.ocks.org/`
  d3.select(self.frameElement).style("height", "600px");  
})();
*/