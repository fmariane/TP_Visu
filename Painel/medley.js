 
 
	var width = 380,
        height = 280;

    var expScale = d3.scale.linear().range([5, 100]);
    var color = d3.scale.category20(); //escala de cor
	
	var cloud_bases_de_dados2009 = ["Norte2009.tsv", "Nordeste2009.tsv" , "CenOeste2009.tsv" ,"Sudeste2009.tsv" ,"Sul2009.tsv"];
	var cloud_bases_de_dados2010 = ["Norte2010.tsv", "Nordeste2010.tsv" , "CenOeste2010.tsv" ,"Sudeste2010.tsv" ,"Sul2010.tsv"];
	var cloud_bases_de_dados2011 = ["Norte2011.tsv", "Nordeste2011.tsv" , "CenOeste2011.tsv" ,"Sudeste2011.tsv" ,"Sul2011.tsv"];
	var cloud_bases_de_dados2012 = ["Norte2012.tsv", "Nordeste2012.tsv" , "CenOeste2012.tsv" ,"Sudeste2012.tsv" ,"Sul2012.tsv"];
	var cloud_bases_de_dados2013 = ["Norte2013.tsv", "Nordeste2013.tsv" , "CenOeste2013.tsv" ,"Sudeste2013.tsv" ,"Sul2013.tsv"];
	
	reload_words(0,0);
 
	function reload_words(idYear, reg){	

    var database = [];
	if(idYear == 0)
	{
		//norte
		database = cloud_bases_de_dados2009[reg];
		
	}
	else if(idYear == 1)
	{
		//nordeste
		database = cloud_bases_de_dados2010[reg];
	}
	else if(idYear == 2)
	{
		//nordeste
		database = cloud_bases_de_dados2011[reg];
	}
	else if(idYear == 3)
	{
		//nordeste
		database = cloud_bases_de_dados2012[reg];
	}
	else if(idYear == 4)
	{
		//nordeste
		database = cloud_bases_de_dados2013[reg];
	}
  
  
    d3.tsv("word_cloud_data/Norte2009.tsv", function(database) {
    var exp = database
        .filter(function(d) {return +d.Exports;})
        .map(function(d) {return {text: d.ExpSection, size: +d.Exports}; })
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
  
}

  function draw(words) {
	  
	d3.select("#squareFive").remove();
		
	var div = document.createElement("div");
	div.id = "squareFive";

	document.body.appendChild(div);
	  
	  
	  
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