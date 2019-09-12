function heatMap(data) {  /* if you are making more than one heat Map chart, you will need to change the function name */
    console.log(data)
    var ndx    = crossfilter(data),
        runDim = ndx.dimension(function(d) {return [d.("something"), d.("something else")]; }), /* Replace the strings and the brackets with an API Header */
        runGroup = runDim.group().reduceSum(function(d) { return d.count });
    console.log(runGroup.all())
    var chart = dc.heatMap("# id of the DIV ") /* Here we select where we want to draw the graph */
        .width(1800)
        .height(500)
        .dimension(runDim)
        .group(runGroup)
        .keyAccessor(function(d) {
            console.log(d)
            return d.key[0]; })
        .valueAccessor(function(d) { return d.key[1]; })
        .colorAccessor(function(d) { return +d.value; })
        .title(function(d) {
            return "Run:   " + d.key[0] + "\n" +
                "Expt:  " + d.key[1] + "\n" +
                "Speed: " + d.value})
        .colors(["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"])
        .calculateColorDomain();
}

function heatMap(data) {
    console.log(data)
    var ndx = crossfilter(data),
        runDim = ndx.dimension(function(d) {return [d.country, d.year]; }),
        runGroup = runDim.group().reduceSum(function(d) { return d.count });
    console.log(runGroup.all())
    var chart = dc.heatMap("#AsylumDescisionHeatMap")
        .width(1800)
        .height(500)
        .dimension(runDim)
        .group(runGroup)
        .keyAccessor(function(d) {
            console.log(d)
            return d.key[0]; })
        .valueAccessor(function(d) { return d.key[1]; })
        .colorAccessor(function(d) { return +d.value; })
        .title(function(d) {
            return "Run:   " + d.key[0] + "\n" +
                "Expt:  " + d.key[1] + "\n" +
                "Speed: " + d.value})
        .colors(["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"])
        .calculateColorDomain();
}