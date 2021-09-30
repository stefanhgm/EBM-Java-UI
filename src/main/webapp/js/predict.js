$(document).ready(function () {

    const modelOverviewPrediction = $("#modelOverviewPrediction");

    if (modelOverviewPrediction.length) {
        // get model hash
        let url = new URL(document.URL);
        let modelHash = url.searchParams.get("identifier");

        $.ajax({
            type: "GET",
            url: getAPIPath() + '/prediction-model',
            data: {
                'identifier': modelHash
            },
            success: function (predictionModelData) {
                const plotDataMap = collectPlotData(predictionModelData);
                createPredictionOverview(plotDataMap, predictionModelData);
            }
        });
    }


});

/**
 * Returns map with data of every component
 */
function collectPlotData(predictionModelData) {
    const plots = predictionModelData["componentBarPlotDtos"];

    let url = new URL(document.URL);
    let modelHash = url.searchParams.get("identifier");

    let plotDataMap = new Map();

    for (let i = 0; i < plots.length; i++) {
        const plot = plots[i];
        const id = plot["index"];
        $.ajax({
            type: "GET",
            url: getAPIPath() + '/component',
            async: false,
            data: {
                'identifier': modelHash,
                'index': id,

            },
            success: function (plotData) {
                let type = plotData["featureTypes"].length === 1 ? "1D" : "2D"
                if (type === "1D") {
                    let bins = plotData["continuous_bins_lower_bounds"]
                    const min = plotData["min"][0]
                    let firstBin = min

                    const max = plotData["max"][0]
                    let lastBin = max

                    bins = [0, firstBin].concat(bins).concat(lastBin)

                    plot.bins = [0, firstBin].concat(plot.bins).concat(lastBin)
                    if (plotData["featureTypes"][0] === "continuous") {
                        plotDataMap.set(plotData["featureGroup"][0], {
                            risk1D: plotData["risks"],
                            bins1D: bins,
                            name: plotData["featureName"],
                            type: "1D",
                            id: id,
                            index: i,
                            featureType: plotData["featureTypes"][0]
                        });
                    } else {
                        let bins = [];
                        let mapping = plotData["categorical_mapping"][0];
                        for (let i = 0; i < Object.keys(mapping).length; i++) {
                            bins.push(Object.keys(mapping)[i]);
                        }
                        plotDataMap.set(plotData["featureGroup"][0], {
                            risk1D: plotData["risks"],
                            bins1D: bins,
                            name: plotData["featureName"],
                            type: "1D",
                            id: id,
                            index: i,
                            featureType: plotData["featureTypes"][0]
                        });
                    }
                } else if (type === "2D") {
                    let binsAtt1;
                    let binsAtt2;
                    if (plotData["featureTypes"][0] === "continuous") {
                        binsAtt1 = plotData["continuous_bins_lower_bounds"][0];

                        const min = plotData["min"][0][0]
                        let firstBin = min

                        const max = plotData["max"][0][0]
                        let lastBin = max

                        binsAtt1 = [0, firstBin].concat(binsAtt1).concat(lastBin)
                    } else {
                        binsAtt1 = [];
                        let mapping = plotData["categorical_mapping"][0];
                        for (let i = 0; i < Object.keys(mapping).length; i++) {
                            binsAtt1.push(Object.keys(mapping)[i]);
                        }
                    }
                    if (plotData["featureTypes"][1] === "continuous") {
                        binsAtt2 = plotData["continuous_bins_lower_bounds"][1];
                        const min = plotData["min"][1][0]
                        let firstBin = min

                        const max = plotData["max"][1][0]
                        let lastBin = max

                        binsAtt2 = [0, firstBin].concat(binsAtt2).concat(lastBin)
                    } else {
                        binsAtt2 = [];
                        let mapping = plotData["categorical_mapping"][1];
                        for (let i = 0; i < Object.keys(mapping).length; i++) {
                            binsAtt2.push(Object.keys(mapping)[i]);
                        }
                    }

                    plotDataMap.set(plotData["featureGroup"][0] + "," + plotData["featureGroup"][1], {
                        risk2D: plotData["risks"],
                        binsAtt1: binsAtt1,
                        binsAtt2: binsAtt2,
                        name: plotData["featureName"],
                        type: "2D",
                        id: id,
                        index: i,
                        featureTypeAtt1: plotData["featureTypes"][0],
                        featureTypeAtt2: plotData["featureTypes"][1]
                    });
                }
            }
        });
    }
    return plotDataMap;
}

function createPredictionOverview(plotDataMap, predictionModelData) {
    let url = new URL(document.URL);

    const bisect = d3.bisector(function (d) {
        return d;
    }).left;

    let risksArray = new Array(plotDataMap.length);
    plotDataMap.forEach(function (value, key) {

        if (value["type"] === "1D") {
            let valueIndex;
            let risk;
            if (value["featureType"] === "continuous") {
                valueIndex = bisect(value["bins1D"], url.searchParams.get(key));
                if(valueIndex > value["risk1D"].length){
                    valueIndex = value["risk1D"].length
                }
                else if(url.searchParams.get(key) === value["bins1D"][valueIndex].toString()){
                    valueIndex += 1
                }
            } else {
                valueIndex = value["bins1D"].indexOf(url.searchParams.get(key));
            }

            if (valueIndex <= 1) {
                risk = value["risk1D"][1];
            }
            else if(valueIndex >= value["risk1D"].length){
                risk = value["risk1D"][value["risk1D"].length-1]
            }
            else{
                risk = value["risk1D"][valueIndex-1]
            }
            risksArray[value["index"]] = {
                risk: risk,
                key: key,
                name: value["name"],
                id: value["id"],
                valueIndex: valueIndex
            };
        } else {
            let valueIndexAtt1;
            let valueIndexAtt2;
            let risk;
            key = key.split(",")
            if (value["featureTypeAtt1"] === "continuous") {
                valueIndexAtt1 = bisect(value["binsAtt1"], url.searchParams.get(key[0]));
                if(valueIndexAtt1 > value["risk2D"].length){
                    valueIndexAtt1 = value["risk2D"].length
                }
                else if(url.searchParams.get(key[0]) === value["binsAtt1"][valueIndexAtt1].toString()){
                    valueIndexAtt1 += 1
                }
            } else {
                valueIndexAtt1 = value["binsAtt1"].indexOf(url.searchParams.get(key[0]));
            }
            if (value["featureTypeAtt2"] === "continuous") {
                valueIndexAtt2 = bisect(value["binsAtt2"], url.searchParams.get(key[1]));
                if(valueIndexAtt2 > value["risk2D"][0].length){
                    valueIndexAtt2 = value["risk2D"][0].length
                }
                else if(url.searchParams.get(key[1]) === value["binsAtt2"][valueIndexAtt2].toString()){
                    valueIndexAtt2 += 1
                }
            } else {
                valueIndexAtt2 = value["binsAtt2"].indexOf(url.searchParams.get(key[1]));
            }
            let riskIndex1
            let riskIndex2

            if (valueIndexAtt1 <= 1) {
                riskIndex1 = 1;
            }
            else if(valueIndexAtt1 >= value["risk2D"].length){
                riskIndex1 = value["risk2D"].length-1
            }
            else{
                riskIndex1 = valueIndexAtt1
            }

            if (valueIndexAtt2 <= 1) {
                riskIndex2 = 1;
            }
            else if(valueIndexAtt2 >= value["risk2D"][0].length){
                riskIndex2 = value["risk2D"][0].length-1
            }
            else{
                riskIndex2 = valueIndexAtt2
            }

            console.log(riskIndex1, riskIndex2, value["risk2D"])
            risk = value["risk2D"][riskIndex1][riskIndex2];

            risksArray[value["index"]] = {
                risk: risk,
                key: key,
                name: value["name"],
                id: value["id"],
                valueIndexAtt1: valueIndexAtt1,
                valueIndexAtt2: valueIndexAtt2
            };
        }
    });

    risksArray = risksArray.sort(compareByRisk);

    const intercept = predictionModelData["intercept"];

    let maxRisk;
    if (Math.abs(risksArray[0].risk) > Math.abs(intercept)) {
        maxRisk = Math.abs(risksArray[0].risk);
    } else {
        maxRisk = Math.abs(intercept);
    }

    let risk = 0;

    const interceptEntry = {risk: intercept, name: "Intercept", key: "intercept", id: "intercept"};

    risksArray.splice(0, 0, interceptEntry);

    for (let i = 0; i < risksArray.length; i++) {
        risk += risksArray[i]["risk"];
        let value = risksArray[i];

        const div = d3.select("#modelOverviewPrediction").append("div").attr("id", value["id"]).attr("class", "plotselectionPrediction" + i);
        div.append("text").attr("class", "ellipsisTwoLines").style("font-size", "12px").style("width", "30%").style("padding-bottom", "5px").text(value["name"])

        if (risksArray[i]["risk"] > 0) {
            div.append("div").style("width", "35%")//.attr("class","lineRight");
        }
        //const innerDiv = div.append("div").style("width", "50%");
        //innerDiv.append("text").style("font-size", "0.90em").text(value["name"])

        const width = (Math.abs(risksArray[i]["risk"])) / maxRisk * (div.node().getBoundingClientRect().width * 0.35) * 0.8;
        const height = 20;

        if (risksArray[i]["risk"] > 0) {
            //innerDiv.attr("class", "lineLeft");
            div.append("div").style("width", "1px").style("background-color", "black");
            const riskDiv = div.append("div").attr("class", "bardivRight");

            riskDiv.append("svg").attr("width", width).attr("height", height).attr("class", "overviewBar bar" + i).append("rect").attr("class", "overlay").attr("width", width)
                .attr("height", height);
            riskDiv.append("text").text((risksArray[i]["risk"]).toFixed(3));
        } else {
            //innerDiv.style("text-align","right").attr("class","lineRight");
            const riskDiv = div.append("div").attr("class", "bardivLeft")//.attr("class","lineRight");

            riskDiv.append("text").text((risksArray[i]["risk"]).toFixed(3));
            riskDiv.append("svg").attr("width", width).attr("height", height).attr("class", "negativeBar bar" + i).append("rect").attr("class", "overlay").attr("width", width)
                .attr("height", height);

            div.append("div").style("width", "1px").style("background-color", "black");

            div.append("div").style("width", "35%")//.attr("class","lineLeft");
        }

        if (i > 0) {
            // Add div to draw Plot.
            const drawdiv = d3.select("#plots").append("div").attr("id", "plot" + value.id).attr("drawn", "false").style("display", "none")
            drawdiv.append("div").style("font-size", "1.6em").text(value.name);
            drawdiv.append("div").attr("id", "draw" + value.id).style("position", "relative");

            div.on("click", function () {
                // Draw plot if not drawn yet.
                if (d3.select("#plot" + value.id).attr("drawn") === "false") {
                    let overlay

                    if (Number.isInteger(value.key)) {
                        overlay = {valueIndex: value.valueIndex, risk: value.risk}
                    } else {
                        overlay = {
                            valueIndexAtt1: value.valueIndexAtt1,
                            valueIndexAtt2: value.valueIndexAtt2,
                            risk: value.risk
                        }
                    }

                    drawPlot(value.id, predictionModelData, overlay);
                    d3.select("#plot" + value.id).attr("drawn", "true");
                }
                swapPlot(value.id);
            });
        }
    }


    const svgWidth = d3.select("#modelOverviewPrediction").node().getBoundingClientRect().width * 0.7;
    //const height = div.node().parentNode.getBoundingClientRect().height;
    const svgHeight = 30;

    const svg = d3.select("#modelOverviewPrediction").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .style("transform", "translateX(" + ((svgWidth / 0.7 * 0.3)) + "px)");

    let range;
    if (Math.abs(risksArray[0].risk) > Math.abs(intercept)) {
        range = Math.abs(risksArray[0].risk);
    } else {
        range = Math.abs(intercept);
    }

    const x = d3.scaleLinear()
        .domain([-range, range])
        .rangeRound([svgWidth * 0.1, svgWidth * 0.9])

    const xAxis = g => g
        .attr("transform", "translate(0," + (0) + ")")
        .call(d3.axisBottom(x).tickValues(x.ticks(10).concat(x.domain())))
        .call(g => g.select(".domain").remove());

    svg.append("g")
        .call(xAxis);

    $("#risk").text(risk);

}

function compareByRisk(a, b) {
    if (Math.abs(a["risk"]) > Math.abs(b["risk"])) return -1;
    if (Math.abs(b["risk"]) > Math.abs(a["risk"])) return 1;

    return 0;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

