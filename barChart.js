function barChart(data) {  /* if you are making more than one bar chart, you will need to change the function name */
    var ndx = crossfilter(data)
    var barDIM = ndx.dimension(dc.pluck(" REPLACE ")); /* Lets make a dimension! */
    var barMix = barDIM.group().reduceSum(dc.pluck("count"))
    dc.barChart("# id of the DIV")
        .width(1550)
        .height(550)
        .margins({top: 20, right: 50, bottom: 100, left: 80})
        .dimension(barDIM)
        .group(barMix)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel(" X Axis ") /* Lets give the X-Axis a label! */
        .yAxisLabel(" Y Axis ") /* Lets give the Y-Axis a label! */
        .yAxis().ticks(20);
}

/* Sample Bar Charts */

function barChart(data) {
    var ndx = crossfilter(data)
    var barDIM = ndx.dimension(dc.pluck("decision")); /* Lets make a dimension! */
    var barMix = barDIM.group().reduceSum(dc.pluck("count"))
    dc.barChart("#testBarChart")
        .width(1550)
        .height(550)
        .margins({top: 20, right: 50, bottom: 100, left: 80})
        .dimension(barDIM)
        .group(barMix)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Year")
        .yAxisLabel("Total Asylum Descisions made")
        .yAxis().ticks(20);
}

function barChart(data) {
    var ndx = crossfilter(data)
    var barDIM = ndx.dimension(dc.pluck("decision")); /* Lets make a dimension! */
    var barMix = barDIM.group().reduceSum(dc.pluck("count"))
    dc.barChart("#testBarChart")
        .width(1550)
        .height(550)
        .margins({top: 20, right: 50, bottom: 100, left: 80})
        .dimension(barDIM)
        .group(barMix)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Year")
        .yAxisLabel("Total Asylum Descisions made")
        .yAxis().ticks(20);
}
