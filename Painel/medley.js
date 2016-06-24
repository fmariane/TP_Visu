 var width = 380,
     height = 280;

  var expScale = d3.scale.linear().range([5, 100]);
  var color = d3.scale.category20(); //escala de cor
  d3.tsv("word_cloud_data/exp2014sec_normalized.tsv", function(data) {
    var exp = data
        .filter(function(d) {return +d.Valor_Exportacao;})
        .map(function(d) {return {text: d.NomeSecaoProduto, size: +d.Valor_Exportacao}; })
        .sort(function(a,b) { return d3.descending(a.size, b.size); })
        //.slice(0,100); //pega soh parte da tabela
    
    expScale.domain([
      d3.min(exp, function(d) {return d.size;  }),
      d3.max(exp, function(d) {return d.size ; })
    ])

    d3.layout.cloud().size([width, height])
        .words(exp)
        .padding(0)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return expScale(d.size)/2; })
        .on("end", draw)
        .start();
  });

  function draw(words) {
    d3.select("#squareFive").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate("+(width/2)+","+(height/2)+")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return color(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }