function lineChart(data) { /* If you are using more then one graph, you need to rename the functions :) */
    var ndx = crossfilter(data)
    var yearDim = ndx.dimension(dc.pluck(" REPLACE ")); /* What are we looking to plot? Pick a heading from the API! */
    var yearGroup = yearDim.group().reduceSum(dc.pluck("count"))
    var chart = dc.lineChart("# TheDIV") /*what DIV are we placing the graph in? */
        .width(1800)
        .height(500)
        .margins({top: 20, right: 50, bottom: 100, left: 80})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('X-Axis') /* Lets give the X-Axis a label! */
        .yAxisLabel('Y-Axis') /* Lets give the Y-Axis a label! */
        .dimension(yearDim)
        .group(yearGroup)
}

/* Here is an example! */
function lineChart(data) {
    var ndx = crossfilter(data)
    var yearDim = ndx.dimension(dc.pluck("year"));
    var yearGroup = yearDim.group().reduceSum(dc.pluck("count"))
    var chart = dc.lineChart("#AsylumDescisionLine")
        .width(1800)
        .height(500)
        .margins({top: 20, right: 50, bottom: 100, left: 80})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('Year')
        .yAxisLabel('Total Asylum Decisions made')
        .dimension(yearDim)
        .group(yearGroup)
}

