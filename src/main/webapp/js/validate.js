$(document).ready(function () {

    const modelOverview = $("#modelOverview");

    if (modelOverview.length) {
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
                createModelOverview(predictionModelData);
            }
        });
    }
});

/**
 * Generates the model overview list.
 */
function createModelOverview(predictionModelData) {
    const plots = predictionModelData["componentBarPlotDtos"];

    d3.select("#intercept").append("text").text(predictionModelData["intercept"].toFixed(3) + " (odds: "+Math.exp(predictionModelData["intercept"]).toFixed(3)+")")

    for (let i = 0; i < plots.length; i++) {
        const plot = plots[i];
        const id = plot["index"];

        const styleClass = predictionModelData["validated"] ? "" : "deactivated";
        // Add model overview entry's.

        const div = d3.select("#modelOverview").append("div").attr("id", id).attr("class", "plotselection " + styleClass);

        div.append("text").style("font-size", "0.95em").text(plot["name"]);

        const width = (plot["importance"]) / (plots[0]["importance"]) * (div.node().getBoundingClientRect().width) * 0.8;
        const height = 20;

        const importanceDiv = div.append("div");
        importanceDiv.append("svg").attr("width", width).attr("height", height).attr("class", "overviewBar").append("rect").attr("class", "overlay").attr("width", width)
            .attr("height", height);
        importanceDiv.append("text").text((plot["importance"] * 100).toFixed(2) + "%").style("color","black");

        // Add div to draw Plot.
        const drawdiv = d3.select("#plots").append("div").attr("id", "plot" + id).attr("drawn", "false").style("display", "none")
        drawdiv.append("div").style("font-size", "1.6em").text(plot["name"]);
        drawdiv.append("div").attr("id", "draw" + id).style("position", "relative");

        // Add onclick functionality.
        div.on("click", function () {
            // Draw plot if not drawn yet.
            if (d3.select("#plot" + id).attr("drawn") === "false") {
                drawPlot(id, predictionModelData);
                d3.select("#plot" + id).attr("drawn", "true");
            }
            swapPlot(id);
        });
    }
}

function swapPlot(id) {
    const plots = $("#plots");
    const selected = plots.prop("selected");
    plots.prop("selected", id);

    if (selected !== undefined) {
        $("#plot" + selected).hide();
        $("#" + selected).toggleClass("selected")
    }
    $("#plot" + id).show();

    $("#" + id).toggleClass("selected")


}

function drawPlot(index, predictionModelData, overlay) {
    let url = new URL(document.URL);
    let modelHash = url.searchParams.get("identifier");
    let plot = "";

    $.ajax({
        type: "GET",
        url: getAPIPath() + '/component',
        data: {
            'identifier': modelHash,
            'index': index
        },
        success: function (plotData) {
            const element = d3.select("#plot" + index);
            let type = plotData["featureTypes"].length === 1 ? "1D" : "2D"
            if (type === "1D") {
                let maxX1D = predictionModelData["maxAbsRisk1D"];
                let minX1D = -maxX1D;

                plotArray1D(index, element, plotData, minX1D, maxX1D, overlay);
            } else if (type === "2D") {
                let maxX2D = predictionModelData["maxAbsRisk2D"];
                let minX2D = -maxX2D;

                plotArray2D(index, element, plotData, minX2D, maxX2D, overlay);
            }

            if (!predictionModelData["validated"] && $("#modelOverview").length) {
                const field = element.append("fieldset").style("padding-top","10px")

                field.append("button").attr("class", "btn btn-danger float-left").attr("type", "submit").text(document.getElementById("exclude").textContent).on("click", function () {
                    document.getElementById("selection-index-" + index).checked = false;
                    document.getElementById(index).classList.remove("activated");
                    document.getElementById(index).classList.add("deactivated");

                });
                field.append("button").attr("class", "btn btn-success ml-5").attr("type", "submit").text(document.getElementById("include").textContent).on("click", function () {
                    document.getElementById("selection-index-" + index).checked = true;
                    document.getElementById(index).classList.remove("deactivated");
                    document.getElementById(index).classList.add("activated");
                });
            }

        }
    });
}
