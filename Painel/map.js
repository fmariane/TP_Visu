var Year = [2009, 2010, 2011, 2012, 2013];
var idYear = 0;
var global_reg = 0;

// Define map size on screen 
var width = 400,
    height = 400;

var tooltip = d3.select("#squareOne").append("div").attr("class", "tooltip hidden");

var svg = d3.select("#squareOne").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");

// Align center of Brazil to center of map
var projection = d3.geo.mercator()
  .scale(350)
  .center([-52, -15])
  .translate([width / 2, height / 2]);

var path = d3.geo.path()
  .projection(projection);

// Load data (asynchronously)
d3_queue.queue()
    .defer(d3.json, "./br_states.json")
    .await(ready);

function ready(error, shp) {
  if (error) throw error;

  // Extracting polygons and contours
  var states = topojson.feature(shp, shp.objects.estados);
  var states_contour = topojson.mesh(shp, shp.objects.estados);
  var subunitChecked = 0;
  var colorsChecked = ["#29A03C", "#D2282B", "#FF800A", "#9562BE", "#2978B3"];

  // Draw states
  g.selectAll(".estado")
      .data(states.features)
      .enter()
      .append("path")
      .attr("class", function(d) { //POR ENQUANTO ISSO É INÚTIL PORQUE AS CORES SÃO AS MESMAS
        if (d.id == 'AC' || d.id == 'AM' || d.id == 'AP'|| d.id == 'PA' || d.id == 'RO' || d.id == 'RR' || d.id == 'TO') {
          return "subunitNorte";
        } 
        else if (d.id == 'AL' || d.id == 'BA' || d.id == 'CE' || d.id == 'MA' || d.id == 'PB' || d.id == 'PE' || d.id == 'PI'|| d.id == 'RN'|| d.id == 'SE') {
          return "subunitNordeste";
        }
        else if (d.id == 'DF' || d.id == 'GO' || d.id == 'MS' || d.id == 'MT') {
          return "subunitCentroOeste";
        }
        else if (d.id == 'ES' || d.id == 'MG' || d.id == 'RJ'|| d.id == 'SP') {
          return "subunitSudeste";
        }
        else if (d.id == 'PR' || d.id == 'RS' || d.id == 'SC') {
          return "subunitSul";
        }})
      
	  .style("opacity", function(d) {
        if (d.id == 'AC' || d.id == 'AM' || d.id == 'AP'|| d.id == 'PA' || d.id == 'RO' || d.id == 'RR' || d.id == 'TO') {
          //transfer (YEAR, 'Norte');
          return 0.2+transferNorte[idYear]/transferSum[idYear];
        } 
        else if (d.id == 'AL' || d.id == 'BA' || d.id == 'CE' || d.id == 'MA' || d.id == 'PB' || d.id == 'PE' || d.id == 'PI'|| d.id == 'RN'|| d.id == 'SE') {
          //transfer (YEAR, 'Nordeste');
          return 0.2+transferNordeste[idYear]/transferSum[idYear];
        }
        else if (d.id == 'DF' || d.id == 'GO' || d.id == 'MS' || d.id == 'MT') {
          //transfer (YEAR, 'Centro-Oeste');
          return 0.2+transferCentroOeste[idYear]/transferSum[idYear];
        }
        else if (d.id == 'ES' || d.id == 'MG' || d.id == 'RJ'|| d.id == 'SP') {
          //transfer (YEAR, 'Sudeste');
          return 0.2+transferSudeste[idYear]/transferSum[idYear];
        }
        else if (d.id == 'PR' || d.id == 'RS' || d.id == 'SC') {
          //transfer (YEAR, 'Sul');
          return 0.2+transferSul[idYear]/transferSum[idYear];
        }})
      
	   .on("mouseover", function(d,i) {
			var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
			var subunitOver;
			var transfer;
			if (d.id == 'AC' || d.id == 'AM' || d.id == 'AP'|| d.id == 'PA' || d.id == 'RO' || d.id == 'RR' || d.id == 'TO') {
				subunitOver = "Norte";
				transfer = transferNorteSubtitle[idYear];
			} 
			else if (d.id == 'AL' || d.id == 'BA' || d.id == 'CE' || d.id == 'MA' || d.id == 'PB' || d.id == 'PE' || d.id == 'PI'|| d.id == 'RN'|| d.id == 'SE') {
				subunitOver = "Nordeste";
				transfer = transferNordesteSubtitle[idYear];
			}
			else if (d.id == 'DF' || d.id == 'GO' || d.id == 'MS' || d.id == 'MT') {
				subunitOver =  "Centro-Oeste";
				transfer = transferCentroOesteSubtitle[idYear];
			}
			else if (d.id == 'ES' || d.id == 'MG' || d.id == 'RJ'|| d.id == 'SP') {
				subunitOver = "Sudeste";
				transfer = transferSudesteSubtitle[idYear];
			}
			else if (d.id == 'PR' || d.id == 'RS' || d.id == 'SC') {
				subunitOver = "Sul";
				transfer = transferSulSubtitle[idYear];
			}
      
		tooltip
			.classed("hidden", false)
			.attr("style", "left:"+(d3.event.pageX - 300)+"px;top:"+(d3.event.pageY - 60)+"px")
			.html("<strong>Year: "+Year[idYear]+"<br/>"+"</strong>"+"<strong>Subunit: "+subunitOver+"<br/>"+"</strong>"+"<strong>Transfer: R$"+transfer+"<br/>"+"</strong>")
		})
		.on("mouseout",  function(d,i) {
			tooltip.classed("hidden", true)
		})
		.on("click", function(d){
			if (d.id == 'AC' || d.id == 'AM' || d.id == 'AP'|| d.id == 'PA' || d.id == 'RO' || d.id == 'RR' || d.id == 'TO') {
				if (subunitChecked == 1){
					d3.selectAll(".subunitNorte").style("fill", "#000000");
					d3.selectAll(".subunitNordeste").style("fill", "#000000");
					d3.selectAll(".subunitCentroOeste").style("fill", "#000000");
					d3.selectAll(".subunitSudeste").style("fill", "#000000");
					d3.selectAll(".subunitSul").style("fill", "#000000");
				}
					d3.selectAll(".subunitNorte").style("fill", colorsChecked[0]);
					subunitChecked = 1;
					reload_bars(idYear,0);
					reload_donut(idYear,0);
					reload_words(idYear, 0);
					global_reg = 0;
					//ano, norte			
				}
			else if (d.id == 'AL' || d.id == 'BA' || d.id == 'CE' || d.id == 'MA' || d.id == 'PB' || d.id == 'PE' || d.id == 'PI'|| d.id == 'RN'|| d.id == 'SE') {
				if (subunitChecked == 1){
					d3.selectAll(".subunitNorte").style("fill", "#000000");
					d3.selectAll(".subunitNordeste").style("fill", "#000000");
					d3.selectAll(".subunitCentroOeste").style("fill", "#000000");
					d3.selectAll(".subunitSudeste").style("fill", "#000000");
					d3.selectAll(".subunitSul").style("fill", "#000000");
				}
				d3.selectAll(".subunitNordeste").style("fill", colorsChecked[1]);
					subunitChecked = 1;
					reload_bars(idYear,1);
					reload_donut(idYear,1);
					reload_words(idYear, 1);
					global_reg = 1;
				}
			else if (d.id == 'DF' || d.id == 'GO' || d.id == 'MS' || d.id == 'MT') {
				if (subunitChecked == 1){
					d3.selectAll(".subunitNorte").style("fill", "#000000");
					d3.selectAll(".subunitNordeste").style("fill", "#000000");
					d3.selectAll(".subunitCentroOeste").style("fill", "#000000");
					d3.selectAll(".subunitSudeste").style("fill", "#000000");
					d3.selectAll(".subunitSul").style("fill", "#000000");
				}
					d3.selectAll(".subunitCentroOeste").style("fill", colorsChecked[2]);
					subunitChecked = 1;
					reload_bars(idYear,2);
					reload_donut(idYear,2);
					reload_words(idYear, 2);
					global_reg = 2;
				}
			else if (d.id == 'ES' || d.id == 'MG' || d.id == 'RJ'|| d.id == 'SP') {
				if (subunitChecked == 1){
					d3.selectAll(".subunitNorte").style("fill", "#000000");
					d3.selectAll(".subunitNordeste").style("fill", "#000000");
					d3.selectAll(".subunitCentroOeste").style("fill", "#000000");
					d3.selectAll(".subunitSudeste").style("fill", "#000000");
					d3.selectAll(".subunitSul").style("fill", "#000000");
				}
					d3.selectAll(".subunitSudeste").style("fill", colorsChecked[3]);
					subunitChecked = 1;
					reload_bars(idYear,3);
					reload_donut(idYear,3);
					reload_words(idYear, 3);
					global_reg = 3;
			}
			else if (d.id == 'PR' || d.id == 'RS' || d.id == 'SC') {
				if (subunitChecked == 1){
				  d3.selectAll(".subunitNorte").style("fill", "#000000");
				  d3.selectAll(".subunitNordeste").style("fill", "#000000");
				  d3.selectAll(".subunitCentroOeste").style("fill", "#000000");
				  d3.selectAll(".subunitSudeste").style("fill", "#000000");
				  d3.selectAll(".subunitSul").style("fill", "#000000");
				}
				d3.selectAll(".subunitSul").style("fill", colorsChecked[4]);
				subunitChecked = 1;
				reload_bars(idYear,4);
				reload_donut(idYear,4);
				reload_words(idYear, 4);
				global_reg = 4;
			}})
		.attr("d", path);

		//Draw state contour
		g.append("path")
		.datum(states_contour)
		.attr("d", path)
		.attr("class", "state_contour");
		

		//ofsets plus width/height of transform, plsu 20 px of padding, plus 20 extra for tooltip offset off mouse
		var offsetL = document.getElementById('#squareOne').offsetLeft+(width/2);
		var offsetT =document.getElementById('#squareOne').offsetTop+(height/2);
}


function setYear(id){
  idYear = id;
  reload_bars(idYear,global_reg);
  reload_donut(idYear,global_reg);
  reload_words(idYear, global_reg);
  d3.selectAll(".subunitSul").style("opacity", function(){return 0.2+transferSul[idYear]/transferSum[idYear];});
  d3.selectAll(".subunitSudeste").style("opacity", function(){return 0.2+transferSudeste[idYear]/transferSum[idYear];});
  d3.selectAll(".subunitNorte").style("opacity", function(){return 0.2+transferNorte[idYear]/transferSum[idYear];});
  d3.selectAll(".subunitNordeste").style("opacity", function(){return 0.2+transferNordeste[idYear]/transferSum[idYear];});
  d3.selectAll(".subunitCentroOeste").style("opacity", function(){return 0.2+transferCentroOeste[idYear]/transferSum[idYear];});  
 
}

var transferNorte = [370159054.26, 390967669.56, 146380128.81, 7340075.00, 258300516.16];
var transferNordeste = [1363051601.39, 2549371606.36, 981307028.50, 105338747.12, 1162830459.74];
var transferCentroOeste = [1582992827.55, 693085249.17, 817229036.07, 79131410.09, 902410462.01];
var transferSudeste = [673591156.34, 2438929485.17, 926288675.64, 633480237.35, 2897810237.72];
var transferSul = [785852305.81, 1005582872.08, 493142364.54, 271151625.19, 798338778.34];
var transferSum = [4775646945.35, 7077936882.34, 3364347233.56, 1096442094.75, 6019690453.97];

var transferNorteSubtitle = ["370.16M", "390.97M", "146.38M", "7.34M", "258.30M"];
var transferNordesteSubtitle = ["1.36B", "2.55B", "981.31M", "105.34M", "1.16B"];
var transferCentroOesteSubtitle = ["1.58B", "693.09M", "817.23M", "79.13M", "902.41M"];
var transferSudesteSubtitle = ["673.59M", "2.44B", "926.29M", "633.48M", "2.90B"];
var transferSulSubtitle = ["785.85M", "1.01B", "493.14M", "271.15M", "798.34M"];