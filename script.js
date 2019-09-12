var house="HousingDeprivation";
var asylum="AsylumDecisions";
var envi = "EnvironmentalIssues"

var topic = house;

const url = "https://script.google.com/macros/s/AKfycbytQHIRHVuI9dQugwZ8ZPpDpF4L_dDjKbq1gtAk8NWNgsXOS-x3/exec?topic="+topic; /* Which API are we using */

fetch(url).then(response =>
    response.json().then(data => ({
        data: data,
        status: response.status
    })
    ).then(res => {
        makeGraphs(res.data)
    })
);

function makeGraphs(data) {
    if (topic==house){
        console.log("Hello");
    }
    else{
        data = dataConversion(data);
    }
    barChart(data, "#AsylumDescisionPerYear");
    heatMap(data, "#AsylumDescisionHeatMap");
    lineChart(data, "#AsylumDescisionLine");
    /* Hint: Make sure that the chart ID is equivalent to the */


    dc.renderAll(); /* Finally we draw the Charts **/
}

function barChart(data, chartID) {  /* if you are making more than one bar chart, you will need to change the function name */
    var ndx = crossfilter(data);
    if (topic==house){
        var barDIM = ndx.dimension(dc.pluck("age"));
        var barMix = barDIM.group().reduceSum(dc.pluck("count"));
    }
    else{
         /* Lets make a dimension! Use a heading (key) from your Data */
        var barDIM = ndx.dimension(dc.pluck("country"));

        var barMix = barDIM.group().reduceSum(dc.pluck("count"));
    }

    dc.barChart(chartID) /* Where do we want the chart to be drawn */
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



function heatMap(data, chartID) {
    /*  Replace county and year to show other values, any field should work */
    var ndx    = crossfilter(data),
        runDim = ndx.dimension(function(d) {return [d.country, d.year]; }),
        runGroup = runDim.group().reduceSum(function(d) { return d.count });

    /* Replace "DIVID" with the location you want to place the Chart */
    var chart = dc.heatMap(chartID)
        .width(1800)
        .height(500)
        .dimension(runDim)
        .group(runGroup)
        .keyAccessor(function(d) {
            return d.key[0]; })
        .valueAccessor(function(d) { return d.key[1]; })
        .colorAccessor(function(d) { return +d.value; })
        .title(function(d) {
            return "Country:   " + d.key[0] + "\n" +
                "Year:  " + d.key[1] + "\n" +
                "Decisions: " + d.value})
        .colors(["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"])
        .calculateColorDomain();
}

function lineChart(data, chartID) {
    var ndx = crossfilter(data);
    var runDim = ndx.dimension(dc.pluck("year"));  /* Lets make a dimension! Use a heading from your Data */
    var runGroup = runDim.group().reduceSum(dc.pluck("count"));
    var chart = dc.lineChart(chartID)  /* The Div you want to Draw your graph in*/
        .width(1800)
        .height(500)
        .margins({top: 20, right: 50, bottom: 100, left: 80})
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .xAxisLabel('X-Axis')
        .yAxisLabel('Y-Axis')
        .dimension(runDim)
        .group(runGroup);
}


/*  This is a helper function created by our developers - No need to change anything Below */

function dataConversion(data) {
    var cleanData = [];
    for(let d in data) {
        var ageRangeObj  = {};
        var sortedKeys = Object.keys(data[d]).reverse();
        for(let v in sortedKeys) {
            var n = sortedKeys[v];
            if(Object.keys(ageRangeObj).length === 4 || Object.keys(ageRangeObj).length > 4){
                ageRangeObj['year'] = n;
                ageRangeObj['count'] = data[d][n];
                var dataPerYear = JSON.stringify(ageRangeObj);
                cleanData.push(JSON.parse(dataPerYear));
            } else {
                ageRangeObj[n] = data[d][n];
            }
        }
    }/*  You have gone exploring!  Either you must be curious about coding or a developer yourself - Either way, you have my respect! */
    return cleanData;
}