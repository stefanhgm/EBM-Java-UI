// Space for histogram and label.
const showHistograms = true;

// Split heightOffset and widthOffsetLeft between histograms and labels.
const histogramSvgSizeMultiplier = showHistograms ? 0.75 : 0;
const widthOffsetLeft = showHistograms ? 180 : 180 * (1 - histogramSvgSizeMultiplier);
const heightOffset = showHistograms ? 180 : 180 * (1 - histogramSvgSizeMultiplier);
const labelSvgSizeMultiplier = showHistograms ? 1 - histogramSvgSizeMultiplier : 1;

const lineSize = 1;

/**
 * Plot 1DArray risk function.
 */
function plotArray1D(plotId, element, plotData, min1D, max1D, overlay) {
    const margin = {top: 20, right: 20, bottom: 30, left: 80};
    const width = element.node().getBoundingClientRect().width - margin.left - margin.right
    const svgHeight = width * (3 / 4)//element.node().getBoundingClientRect().height //- element.childNodes[1].childNodes[1].getBoundingClientRect().height;
    const height = svgHeight - heightOffset - margin.top - margin.bottom;

    // Object to store everything needed for plotting and mousemove.
    let plot = {
        plotId: plotId,
        name: plotData["featureName"],
        type: plotData["featureTypes"]["0"],
        featureName: plotData["featureNames"]["0"],
        data: plotData["risks"],
        histogram: plotData["histogram"],
        confidence: plotData["confidenceIntervals"],
        bins: [],
        length: 0,
        unknown: undefined,
        unknownData: undefined,
        histogramUnknown: undefined,
        confidenceUnknown: undefined,
        xAxisData: {},
        yAxisData: {},
        min1D: min1D,
        max1D: max1D,
        dom: {
            width: width,
            height: height,
            svgHeight: svgHeight,
            margin: margin,
            textOffsetX: 35,
            textOffsetY: -85
        }
    }

    let dataset;

    // Collect data.
    getBins(plot, plotData);
    getUnknown(plot);

    // Build scales.
    buildScales(plot);
    // Data to draw plot.
    dataset = buildDataset(plot);

    addSvgs(plot);

    // Draw confidence interval first to have it in the background.
    confidenceInterval(plot, dataset);

    // Order of grid, axis, path is important.
    addGrid(plot);

    addXAxis(plot);
    addYAxis(plot);

    // Draw path.
    addPath(plot, dataset);

    if (showHistograms) {
        addHistogram(plot);
    }

    // Add axis labels.
    addXAxisLabel(plot);
    addYAxisLabel(plot);

    createMousemoveElements(plot, dataset);

    if (overlay) {
        let index = overlay.valueIndex - 1;
        if (plot.type === "continuous") {
            index -= 1;
        }
        drawPlotOverlay1D(plot, index, dataset)
    }
}

/**
 * Get bins for given plot.
 */
function getBins(plot, plotData) {
    if (plot.type === "categorical") {
        plot.length = plot.data.length + 1;
        let mapping = plotData["categorical_mapping"][0];
        // Needed to draw last class.
        mapping["NaN"] = "-1"

        // Add unknown class to better match the structure of continuous attributes.
        plot.bins.push('unknown')

        for (let i = 0; i < Object.keys(mapping).length; i++) {
            plot.bins.push(Object.keys(mapping)[i]);
        }
    } else {
        plot.length = plot.data.length;
        plot.bins = plotData["continuous_bins_lower_bounds"];

        // Add bins to draw start and end, with appropriate size.
        const min = plotData["min"][0]
        let firstBin = min

        const max = plotData["max"][0]
        let lastBin = max

        plot.bins = [0, firstBin].concat(plot.bins).concat(lastBin)
    }
}

/**
 * Get values for unknown bin.
 */
function getUnknown(plot) {
    plot.unknownData = plot.data[0];
    plot.histogramUnknown = plot.histogram["0"];
    plot.confidenceUnknown = plot.confidence[0];
}

/**
 * Add d3 scales to draw 1d risk function and histogram.
 */
function buildScales(plot) {
    if (plot.type === "categorical") {
        plot.xAxisData.xScale = d3.scalePoint().domain((plot.bins.slice(1, plot.bins.length)));
    } else {
        plot.xAxisData.xScale = d3.scaleLinear().domain([plot.bins[1], plot.bins[plot.bins.length - 1]]);
    }
    plot.xAxisData.xScaleUnknown = d3.scalePoint().domain([0]);
    plot.xAxisData.xScale.range([plot.dom.width * 0.1, plot.dom.width]);
    plot.xAxisData.xScaleUnknown.range([0, plot.dom.width * 0.1]);

    const absoluteHighest = Math.abs(plot.min1D) > Math.abs(plot.max1D) ? Math.abs(plot.min1D) : Math.abs(plot.max1D);

    plot.yAxisData.yScale = d3.scaleLinear()
        .domain([-absoluteHighest * 1.05, absoluteHighest * 1.05])
        .range([plot.dom.height, 0]);

    // Data to draw histogram.
    plot.histogramData = d3.range(1, plot.length).map(function (d) {
        return {
            "x": plot.bins[d], "y": plot.histogram[d]
        }
    });

    // Determine highest value of histogram.
    let maximum = d3.max(plot.histogramData, function (d) {
        return +d.y;
    });
    if (plot.histogramUnknown > maximum) {
        maximum = plot.histogramUnknown;
    }

    plot.histogramSum = Object.values(plot.histogram).reduce((a, b) => a + b);
    if (showHistograms) {
        plot.yAxisData.yScaleHistogram = d3.scaleLinear()
            .domain([0, maximum * 1.03])
            .range([(plot.dom.height - (plot.dom.svgHeight - heightOffset) + heightOffset * histogramSvgSizeMultiplier), 0]);
    }
}

/**
 * Build dataset with data needed to draw 1d risk function including confidence interval.
 */
function buildDataset(plot) {
    let dataset = d3.range(1, plot.bins.length).map(function (d) {
        return {
            "y": d < plot.data.length ? plot.data[d] : plot.data[d - 1],
            "x": plot.bins[d],
            "CI_right": d < plot.data.length ? plot.data[d] + plot.confidence[d] : plot.data[d - 1] + plot.confidence[d - 1],
            "CI_left": d < plot.data.length ? plot.data[d] - plot.confidence[d] : plot.data[d - 1] - plot.confidence[d - 1]
        };
    });
    return dataset;
}

/**
 * Add svg to draw the plot.
 */
function addSvgs(plot) {
    // Add wrapper svg for plot and histogram.
    plot.dom.outerSvg = d3.select("#plot" + plot.plotId)
        .append("svg")
        .attr("width", plot.dom.width + plot.dom.margin.left + plot.dom.margin.right)
        .attr("height", plot.dom.svgHeight)
        .attr("transform", "translate(0,10)");

    // 1. Add the SVG used to draw the plot to the page.
    plot.dom.svg = plot.dom.outerSvg.append("svg")
        .attr("width", plot.dom.width + plot.dom.margin.left + plot.dom.margin.right)
        .attr("height", plot.dom.svgHeight - heightOffset)
        .attr("class", plot.plotId)
        .append("g")
        .attr("transform", "translate(" + plot.dom.margin.left + "," + plot.dom.margin.top + ")");
}

/**
 * Draw confidence interval.
 */
function confidenceInterval(plot, dataset) {
    if (plot.type === "categorical") {
        for (let i = 0; i < dataset.length - 1; i++) {
            // Draw the confidence interval.
            plot.dom.svg.append("rect")
                .attr("fill", "#cce5df")
                .attr("stroke", "none")
                .attr("x", plot.xAxisData.xScale(dataset[i].x))
                .attr("y", plot.yAxisData.yScale(dataset[i].CI_right))
                .attr("width", (plot.dom.width * 0.9) / (plot.length - 2))
                .attr("height", plot.yAxisData.yScale(dataset[i].CI_left) - plot.yAxisData.yScale(dataset[i].CI_right));
        }
    } else {
        // Determine the path for the confidence interval.
        const area = d3.area()
            .x(function (d) {
                return plot.xAxisData.xScale(d.x)
            })
            .y0(function (d) {
                return plot.yAxisData.yScale(d.CI_right)
            })
            .y1(function (d) {
                return plot.yAxisData.yScale(d.CI_left)
            })
            .curve(d3.curveStepAfter);

        // Draw the confidence interval.
        plot.dom.svg.append("path")
            .datum(dataset)
            .attr("fill", "#cce5df")
            .attr("stroke", "none")
            .attr("d", area);
    }

    // Draw confidence interval for unknown.
    plot.dom.svg.append("rect")
        .attr("fill", "#cce5df")
        .attr("stroke", "none")
        .attr("x", 0)
        .attr("width", plot.dom.width * 0.1)
        .attr("y", plot.yAxisData.yScale(plot.unknownData + plot.confidenceUnknown))
        .attr("height", plot.yAxisData.yScale(plot.unknownData - plot.confidenceUnknown) - plot.yAxisData.yScale(plot.unknownData + plot.confidenceUnknown));

    // Draw confidence interval for last bin.
    let confidenceWidth;
    if (plot.type === "categorical") {
        confidenceWidth = (plot.dom.width * 0.9) / (plot.length - 2);

        plot.dom.svg.append("rect")
            .attr("fill", "#cce5df")
            .attr("stroke", "none")
            .attr("x", plot.xAxisData.xScale(plot.bins[plot.length - 2]))
            .attr("y", plot.yAxisData.yScale(dataset[plot.length - 3].CI_right))
            .attr("width", confidenceWidth)
            .attr("height", plot.yAxisData.yScale(dataset[plot.length - 3].CI_left) - plot.yAxisData.yScale(dataset[plot.length - 3].CI_right));
    } else {
        confidenceWidth = plot.xAxisData.xScale(plot.bins[plot.length]) - plot.xAxisData.xScale(plot.bins[plot.length - 1]);

        plot.dom.svg.append("rect")
            .attr("fill", "#cce5df")
            .attr("stroke", "none")
            .attr("x", plot.xAxisData.xScale(plot.bins[plot.length - 1]))
            .attr("y", plot.yAxisData.yScale(dataset[plot.length - 2].CI_right))
            .attr("width", confidenceWidth)
            .attr("height", plot.yAxisData.yScale(dataset[plot.length - 2].CI_left) - plot.yAxisData.yScale(dataset[plot.length - 2].CI_right));
    }
}

/**
 * Draw histogram.
 */
function addHistogram(plot) {
    // Add svg to draw the histogram plot.
    plot.dom.histogramSvg = plot.dom.outerSvg
        .append("svg")
        .attr("width", plot.dom.width + plot.dom.margin.left + plot.dom.margin.right)
        .attr("height", (heightOffset * histogramSvgSizeMultiplier))
        .attr("transform", "translate(" + 0 + "," + (plot.dom.svgHeight - heightOffset) + ")")
        .append("g")
        .attr("transform", "translate(" + plot.dom.margin.left + "," + (plot.dom.margin.top) + ")");

    // Draw line to visually separate unknown,
    plot.dom.histogramSvg.append("line")
        .attr("x1", plot.dom.width * 0.1 + lineSize / 2)
        .attr("x2", plot.dom.width * 0.1 + lineSize / 2)
        .attr("y1", 0)
        .attr("y2", heightOffset * histogramSvgSizeMultiplier - plot.dom.margin.top - plot.dom.margin.bottom)
        .attr("stroke", "black")
        .attr("stroke-width", lineSize + "px");

    // Add x-axis to histogram plot.
    plot.dom.histogramSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (plot.dom.height - (plot.dom.svgHeight - heightOffset) + heightOffset * histogramSvgSizeMultiplier) + ")")
        .call(d3.axisBottom(plot.xAxisData.xScale).ticks(0).tickFormat(""))
        .call(adjustTextLabels, plot);

    // Add x-axis for unknown.
    plot.dom.histogramSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (plot.dom.height - (plot.dom.svgHeight - heightOffset) + heightOffset * histogramSvgSizeMultiplier) + ")")
        .call(d3.axisBottom(plot.xAxisData.xScaleUnknown).tickSize(0).tickFormat(""));

    // Add y-axis.
    plot.dom.histogramSvg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(plot.yAxisData.yScaleHistogram).ticks(3));

    // Line to draw.
    const histogramLine = d3.line()
        .x(function (d) {
            return plot.xAxisData.xScale(d.x);
        }) // set the x values for the line generator
        .y(function (d) {
            return plot.yAxisData.yScaleHistogram(d.y);
        }) // set the y values for the line generator
        .curve(d3.curveStepAfter);

    // Draw histogram path.
    plot.dom.histogramSvg.append("path")
        .datum(plot.histogramData) // Binds data to the line
        .attr("class", "histogramLine") // Assign a class for styling
        .attr("cx", function (d, i) {
            return plot.xAxisData.xScale(i)
        })
        .attr("d", histogramLine);

    // Draw Unknown value.
    plot.dom.histogramSvg.append("line")
        .attr("class", "histogramLine")
        .attr("x1", 0)
        .attr("x2", plot.dom.width * 0.1)
        .attr("y1", plot.yAxisData.yScaleHistogram(plot.histogramUnknown))
        .attr("y2", plot.yAxisData.yScaleHistogram(plot.histogramUnknown));

    // Draw histogram for last bin.

    plot.dom.histogramSvg.append("line")
        .attr("class", "histogramLine")
        .attr("x1", plot.xAxisData.xScale(plot.bins[plot.length - 1]) ? plot.xAxisData.xScale(plot.bins[plot.length - 1]) : plot.dom.width*0.1)
        .attr("x2", plot.dom.width)
        .attr("y1", plot.yAxisData.yScaleHistogram(plot.histogramData[plot.histogramData.length - 1].y))
        .attr("y2", plot.yAxisData.yScaleHistogram(plot.histogramData[plot.histogramData.length - 1].y));
}

/**
 * Center axis labels of categorical attributes.
 */
function adjustTextLabels(selection, plot) {
    if (plot.type === "categorical") {
        selection.selectAll('.tick text')
            .attr('transform', 'translate(' + plot.dom.width * 0.9 / (plot.length - 2) / 2 + ',0)');
    }
}

/**
 * Draw path of plot.
 */
function addPath(plot, dataset) {

    // Draw horizontal line at y=0.
    plot.dom.svg.append("line")
        .attr("x1", 0)
        .attr("x2", plot.dom.width)
        .attr("y1", plot.dom.height * 0.5 + lineSize / 2)
        .attr("y2", plot.dom.height * 0.5 + lineSize / 2)
        .attr("stroke", "black")
        .attr("stroke-width", lineSize + "px");

    // Line to draw.
    const line = d3.line()
        .x(function (d) {
            return plot.xAxisData.xScale(d.x);
        }) // set the x values for the line generator
        .y(function (d) {
            return plot.yAxisData.yScale(d.y);
        }) // set the y values for the line generator
        .curve(d3.curveStepAfter);

    // Draw the path of the plot.
    plot.dom.svg.append("path")
        .datum(dataset) // Binds data to the line
        .attr("class", "line") // Assign a class for styling
        .attr("cx", function (d, i) {
            return plot.xAxisData.xScale(i)
        })
        .attr("d", line);

    // Draw Unknown value.
    plot.dom.svg.append("line")
        .attr("class", "line")
        .attr("x1", 0)
        .attr("x2", plot.dom.width * 0.1)
        .attr("y1", plot.yAxisData.yScale(plot.unknownData))
        .attr("y2", plot.yAxisData.yScale(plot.unknownData));

    // Draw last bin. It is not drawn when using d3.curveStepAfter. See https://github.com/d3/d3-shape#curveStepAfter .

    plot.dom.svg.append("line")
        .attr("class", "line")
        .attr("x1", plot.xAxisData.xScale(plot.bins[plot.length - 1]) ? plot.xAxisData.xScale(plot.bins[plot.length - 1]) : plot.dom.width*0.1)
        .attr("x2", plot.dom.width)
        .attr("y1", plot.yAxisData.yScale(dataset[plot.length - 2].y))
        .attr("y2", plot.yAxisData.yScale(dataset[plot.length - 2].y));

}

/**
 * Add label to y-axis.
 */
function addYAxisLabel(plot) {
    plot.dom.svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - plot.dom.margin.left)
        .attr("x", 0 - (plot.dom.height / 2))
        .attr("dy", "1em")
        .attr("class", "axisLabel")
        .text("Risk");

    plot.dom.svg.append("text")
        .attr("y", 0)
        .attr("x", 0 - plot.dom.margin.left / 2)
        .attr("class", "axisLabel")
        .text("log-odds");
}

/**
 * Add label to x-axis.
 */
function addXAxisLabel(plot) {
    plot.dom.xAxisLabelSvg = plot.dom.outerSvg
        .append("svg")
        .attr("width", plot.dom.width + plot.dom.margin.left + plot.dom.margin.right)
        .attr("height", (heightOffset * labelSvgSizeMultiplier))
        .attr("transform", "translate(" + 0 + "," + (plot.dom.svgHeight - heightOffset * labelSvgSizeMultiplier) + ")")
        .append("g")
        .attr("transform", "translate(" + plot.dom.margin.left + "," + (plot.dom.margin.top) + ")");

    // Add the label.
    let axisText = plot.dom.xAxisLabelSvg.append("text")
        .attr("transform",
            "translate(" + (plot.dom.width / 2) + " ," + 0 + ")")
        .attr("class", "axisLabel")
        .text(plot.featureName).attr("dy", "0.05em");

    wrap(axisText, plot.dom.width, "x")
}

/**
 * Add gridlines to plot
 */
function addGrid(plot) {
    // Add the X gridlines.
    plot.dom.svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + plot.dom.height + ")")
        .call(make_x_gridlines(plot)
            .tickSize(-plot.dom.height)
            .tickFormat("")
        );

    // Add the Y gridlines.
    plot.dom.svg.append("g")
        .attr("class", "grid")
        .call(make_y_gridlines(plot)
            .tickSize(-plot.dom.width)
            .tickFormat("")
        );
}

// Gridlines in x axis function.
function make_x_gridlines(plot) {
    return d3.axisBottom(plot.xAxisData.xScale)
        .ticks(5)
}

// Gridlines in y axis function.
function make_y_gridlines(plot) {
    return d3.axisLeft(plot.yAxisData.yScale)
        .ticks(5)
}

/**
 * Add x-axis to plot.
 */
function addXAxis(plot) {
    plot.dom.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + plot.dom.height + ")")
        .call(d3.axisBottom(plot.xAxisData.xScale))
        .call(adjustTextLabels, plot)
        .selectAll(".tick text")
        .call(wrapTwoLines, plot.dom.width / plot.bins.length, "x", plot.type); // Create an axis component with d3.axisBottom

    // Add x-axis for unknown.
    plot.dom.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + plot.dom.height + ")")
        .call(d3.axisBottom(plot.xAxisData.xScaleUnknown).tickFormat(function (d) {
            return "unknown"
        }));// Create an axis component with d3.axisBottom
}

/**
 * Add y-axis to plot.
 */
function addYAxis(plot) {
    plot.dom.svg.append("g")
        .attr("class", "y axis yaxis" + plot.type)
        .call(d3.axisLeft(plot.yAxisData.yScale));// Create an axis component with d3.axisLeft
}

/**
 * Create elements needed to display risk value on mousemove.
 */
function createMousemoveElements(plot, dataset) {
    plot.dom.focus = plot.dom.svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    if (showHistograms) {
        plot.dom.histogramFocus = plot.dom.histogramSvg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        plot.dom.histogramFocus.append("circle")
            .classed("circle", true)
            .attr("r", 4.5);

        plot.dom.histogramFocus.append("line")
            .classed("x", true);

        plot.dom.histogramFocus.append("line")
            .classed("y", true);
    }

    // Append transparent rectangle used to get position of users mouse.
    plot.dom.rect = plot.dom.svg.append("rect")
        .attr("class", "overlay")
        .attr("width", plot.dom.width)
        .attr("height", plot.dom.height)
        .attr("opacity", 0.0);

    plot.dom.rect.on("mouseover", function () {
        plot.dom.focus.style("display", null);
        if (showHistograms) {
            plot.dom.histogramFocus.style("display", null);
        }
    })
        .on("mouseout", function () {
            plot.dom.focus.style("display", "none");
            if (showHistograms) {
                plot.dom.histogramFocus.style("display", "none");
            }
        })
        .on("mousemove", mousemove.bind(plot.dom.rect.node(), plot, dataset));

    // Append Circle and lines to show current position.
    plot.dom.focus.append("circle")
        .classed("circle", true)
        .attr("r", 4.5);

    plot.dom.focus.append("line")
        .classed("x", true);

    plot.dom.focus.append("line")
        .classed("y", true);

    plot.dom.rect = plot.dom.focus.append("rect")
        .classed("rect", true)
        .attr("rx", 10)
        .attr("ry", 10);

    // Append text to show x and y values.
    const textX = plot.dom.focus.append("text")
        .classed("text", true)
        .attr("x", plot.dom.textOffsetX)
        .attr("y", plot.dom.textOffsetY)
        .attr("dy", ".35em");

    const textY = plot.dom.focus.append("text")
        .classed("text", true)
        .attr("x", plot.dom.textOffsetX)
        .attr("dy", ".35em");

    const textDensity = plot.dom.focus.append("text")
        .classed("text", true)
        .attr("x", plot.dom.textOffsetX)
        .attr("dy", ".35em");

    plot.mousemoveElements = {
        "x": textX, "risk": textY, "density": textDensity
    };
}

/**
 * Calculate and display data according to current mouse position.
 */
function mousemove(plot, dataset) {
    const mousemoveData = getMousemoveData(this, plot, dataset);
    if (mousemoveData) {
        updateMousemoveElements(mousemoveData, plot, dataset);
    }
}

// Returns amount of values smaller than d in an array.
const bisect = d3.bisector(function (d) {
    return d;
}).left;

/**
 * Calculate data according to current mouse position.
 */
function getMousemoveData(object, plot, dataset) {
    let index;
    let riskValue;
    let density;
    const pos = d3.mouse(object)[0];
    const unknownRange = pos < plot.dom.width * 0.1;
    plot.dom.focus.style("display", null);
    if (showHistograms) {
        plot.dom.histogramFocus.style("display", null);
    }
    if (unknownRange) {
        index = 0;
        riskValue = plot.unknownData;
        if (!riskValue) {
            plot.dom.focus.style("display", "none");
            if (showHistograms) {
                plot.dom.histogramFocus.style("display", "none");
            }
            return;
        }
        density = plot.histogramUnknown;
    } else if (plot.type === "categorical") {
        index = Math.floor(((plot.length - 2) * (pos - plot.dom.width * 0.1)) / (plot.dom.width * 0.9));
        riskValue = dataset[index].y;
        density = plot.histogramData[index].y;
    } else {
        index = bisect(plot.bins, plot.xAxisData.xScale.invert(pos));
        // Index should never be less or equal to 1.
        if (index <= 1) {
            index = 1 + 1;
        }

        riskValue = dataset[index - 2].y;
        density = plot.histogramData[index - 2].y;
    }

    return {
        "index": index,
        "riskValue": riskValue,
        "density": density,
        "pos": pos,
        "unknownRange": unknownRange
    };
}

/**
 * Display mousemoveData.
 */
function updateMousemoveElements(mousemoveData, plot, dataset) {
    moveMarker(mousemoveData.pos, mousemoveData.riskValue, mousemoveData.density, plot);
    updateText(mousemoveData.unknownRange, mousemoveData.riskValue, mousemoveData.density, mousemoveData.index, plot, dataset);
    moveTextbox(mousemoveData.pos, mousemoveData.riskValue, plot);
}

/**
 * Helper function to display mousemoveData.
 */
function moveMarker(pos, risk, density, plot) {
    // Move line to y-axis.
    plot.dom.focus.attr("transform", "translate(" + pos + "," + plot.yAxisData.yScale(risk) + ")");
    if (showHistograms) {
        plot.dom.histogramFocus.attr("transform", "translate(" + pos + "," + plot.yAxisData.yScaleHistogram(density) + ")");
    }

    plot.dom.focus.select("line.x")
        .attr("x1", 0)
        .attr("x2", -pos)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke", "black");

    // Move line to x-axis.
    plot.dom.focus.select("line.y")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", plot.dom.height - plot.yAxisData.yScale(risk))
        .attr("stroke", "black");

    if (showHistograms) {
        plot.dom.histogramFocus.select("line.x")
            .attr("x1", 0)
            .attr("x2", -pos)
            .attr("y1", 0)
            .attr("y2", 0)
            .attr("stroke", "black");

        // Move line to histogram x-axis.
        plot.dom.histogramFocus.select("line.y")
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", -heightOffset * histogramSvgSizeMultiplier)
            .attr("stroke", "black");
    }
}

/**
 * Helper function to display mousemoveData.
 */
function updateText(unknownRange, risk, density, i, plot, dataset) {
    // Set text.
    let featureName = plot.featureName.substring(0,100);
    if (unknownRange) {
        plot.mousemoveElements.x.text(featureName + ": unknown");
        if (risk) {
            plot.mousemoveElements.risk.text("Risk: " + risk.toFixed(3));
            if (showHistograms) {
                plot.mousemoveElements.density.text("Density: " + (density / plot.histogramSum * 100).toFixed(2) + "% " + "(n=" + density + ")");
            }
            // .toFixed(20).match(/^-?\d*\.?0*\d{0,2}/)[0] <- show first two not 0 values
        } else {
            plot.mousemoveElements.risk.text("Risk: -");
            if (showHistograms) {
                plot.mousemoveElements.risk.text("Density: 0% (n=0)");
            }

        }
    } else if (plot.type === "categorical") {
        plot.mousemoveElements.x.text(featureName + ": " + dataset[i].x);
        plot.mousemoveElements.risk.text("Risk: " + risk.toFixed(3));
        if (showHistograms) {
            plot.mousemoveElements.density.text("Density: " + (density / plot.histogramSum * 100).toFixed(2) + "% " + "(n=" + density + ")");
        }
    } else {
        let textSecondBin = dataset[i - 1].x.toFixed(3);
        if (dataset.length === i){
            plot.mousemoveElements.x.text(featureName + ": [" + dataset[i - 2].x.toFixed(3) + ", " + textSecondBin + "]");
        }
        else{
            plot.mousemoveElements.x.text(featureName + ": [" + dataset[i - 2].x.toFixed(3) + ", " + textSecondBin + ")");
        }
        plot.mousemoveElements.risk.text("Risk: " + risk.toFixed(3));
        if (showHistograms) {
            plot.mousemoveElements.density.text("Density: " + (density / plot.histogramSum * 100).toFixed(2) + "% " + "(n=" + density + ")");
        }

        /*
        if(plot.mousemoveElements.x.node().getComputedTextLength() > plot.dom.width){
            plot.mousemoveElements.x.text(plot.mousemoveElements.x.text().substring(0, Math.floor(plot.mousemoveElements.x.text().length * (plot.dom.width / plot.mousemoveElements.x.node().getComputedTextLength()))));
        }
        */
    }
}

/**
 * Helper function to display mousemoveData.
 */
function moveTextbox(pos, risk, plot) {
    // Set position of textbox.
    let bbox = plot.mousemoveElements.x.node().getBBox();
    let bbox2 = plot.mousemoveElements.risk.node().getBBox();


    let bbox3;
    if (showHistograms) {
        bbox3 = plot.mousemoveElements.density.node().getBBox();
    } else {
        bbox3 = {width: 0, height: 0};
    }

    const boxWidth = Math.max(bbox.width, bbox2.width, bbox3.width);

    // Change text position if too far right.
    if (plot.dom.width - pos < (boxWidth + plot.dom.textOffsetX)) {
        if (pos - boxWidth - plot.dom.textOffsetX > 5) {
            plot.mousemoveElements.x.attr("x", -boxWidth - plot.dom.textOffsetX);
            plot.mousemoveElements.risk.attr("x", -boxWidth - plot.dom.textOffsetX);
            plot.mousemoveElements.density.attr("x", -boxWidth - plot.dom.textOffsetX);
        } else {
            plot.mousemoveElements.x.attr("x", -pos + 5);
            plot.mousemoveElements.risk.attr("x", -pos + 5);
            plot.mousemoveElements.density.attr("x", -pos + 5);
        }
        bbox = plot.mousemoveElements.x.node().getBBox();
        bbox2 = plot.mousemoveElements.risk.node().getBBox();
        if (showHistograms) {
            bbox3 = plot.mousemoveElements.density.node().getBBox();
        }
    } else if (bbox.x !== plot.dom.textOffsetX) {
        plot.mousemoveElements.x.attr("x", plot.dom.textOffsetX);
        plot.mousemoveElements.risk.attr("x", plot.dom.textOffsetX);
        plot.mousemoveElements.density.attr("x", plot.dom.textOffsetX);
        bbox = plot.mousemoveElements.x.node().getBBox();
        bbox2 = plot.mousemoveElements.risk.node().getBBox();
        if (showHistograms) {
            bbox3 = plot.mousemoveElements.density.node().getBBox();
        }
    }

    // Change text position if too high.
    if ((plot.dom.height - plot.yAxisData.yScale(risk) - plot.dom.textOffsetY) > plot.dom.height) {
        plot.mousemoveElements.x.attr("y", -plot.dom.textOffsetY - bbox.height);
        plot.mousemoveElements.density.attr("y", -plot.dom.textOffsetY);
        plot.mousemoveElements.risk.attr("y", -plot.dom.textOffsetY + bbox3.height);
        bbox = plot.mousemoveElements.x.node().getBBox();
        bbox2 = plot.mousemoveElements.risk.node().getBBox();
        if (showHistograms) {
            bbox3 = plot.mousemoveElements.density.node().getBBox();
        }
    } else {
        plot.mousemoveElements.x.attr("y", plot.dom.textOffsetY);
        plot.mousemoveElements.density.attr("y", plot.dom.textOffsetY + bbox.height);
        plot.mousemoveElements.risk.attr("y", plot.dom.textOffsetY + bbox.height + bbox3.height);
        bbox = plot.mousemoveElements.x.node().getBBox();
        bbox2 = plot.mousemoveElements.risk.node().getBBox();
        if (showHistograms) {
            bbox3 = plot.mousemoveElements.density.node().getBBox();
        }
    }

    const boxHeight = bbox.height + bbox2.height + bbox3.height;

    plot.dom.rect
        .attr("x", bbox.x - 3)
        .attr("y", bbox.y - 3)
        .attr("width", Math.max(bbox.width, bbox2.width, bbox3.width) + 6)
        .attr("height", boxHeight + 6);
}

/**
 * Modify tick labels to fit into two lines.
 */
function wrapTwoLines(text, width, axis, type) {
    if (type === "categorical") {
        text.attr("dy", "0.05em");
        // For each tick.
        text.each(function () {
            wrap(d3.select(this), width, axis)
        });
    }
}

function wrap(text, width, axis) {
    let words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", -2).attr("y", y).attr("dy", dy + "em");

    // While less than 3 lines and words left.
    while ((lineNumber < 2) && (word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        // If text in current line is too long.
        if (tspan.node().getComputedTextLength() > width) {
            // If first line, remove text overflow and add it to next line
            if (lineNumber === 0) {
                if (axis === "y") {
                    tspan.attr("class", "ta-initial").attr("x", -width)
                }
                let remainingText = tspan.text().substring(Math.floor(tspan.text().length * (width / tspan.node().getComputedTextLength())), tspan.text().length);
                tspan.text(tspan.text().substring(0, Math.floor(tspan.text().length * (width / tspan.node().getComputedTextLength()))));
                // If first line ends with whitespace, add - at end of string.
                if (tspan.text().charAt(tspan.text().length - 1) !== " ") {
                    remainingText = tspan.text().charAt(tspan.text().length - 1) + remainingText;
                    tspan.text(tspan.text().slice(0, -1) + "-")
                }
                tspan = text.append("tspan").attr("x", axis === "x" ? 0 : -width).attr("y", y).attr("dy", lineHeight + dy + "em").attr("class", "ta-initial").text(remainingText);
                line = [remainingText];
            }
            // If second line, replace ending with ...
            if (lineNumber === 1) {
                tspan.text(tspan.text().substring(0, Math.floor(tspan.text().length * ((width / tspan.node().getComputedTextLength()) * 0.9)) - 1) + "...");
            }
            // Go to next line.
            lineNumber++;
        }
    }
}

/**
 * Function used to draw an overlay to show current value of data to predict. (Not used at the moment)
 */
function drawPlotOverlay1D(plot, valueIndex, dataset) {

    let position;

    // Test if input is unknown.
    if (dataset[0].x !== 0 && valueIndex === "unknown") {
        position = plot.dom.width * 0.05;
    } else {
        // Test if value is in range.
        if (valueIndex < 0) {
            position = (plot.xAxisData.xScale(dataset[0].x) + plot.xAxisData.xScale(dataset[1].x)) / 2;
        }
        else if(valueIndex >= dataset.length-1){
            position = (plot.xAxisData.xScale(dataset[dataset.length-2].x) + plot.xAxisData.xScale(dataset[dataset.length-1].x)) / 2;
        }
        else {
            position = (plot.xAxisData.xScale(dataset[valueIndex].x) + plot.xAxisData.xScale(dataset[valueIndex + 1].x)) / 2;
        }
    }

    plot.dom.svg.append("line")
        .attr("class", "line overlay-line" + valueIndex)
        .attr("id", plot.plotId)
        .attr("x1", position)
        .attr("x2", position)
        .attr("y1", plot.dom.height)
        .attr("y2", 0)
        .attr("type", "1D")
        .attr("plotId", plot.plotId)
        .style("pointer-events", "none");

    if (showHistograms) {
        plot.dom.histogramSvg.append("line")
            .attr("class", "line overlay-line" + valueIndex)
            .attr("id", "histogram" + plot.plotId)
            .attr("x1", position)
            .attr("x2", position)
            .attr("y1", (heightOffset * histogramSvgSizeMultiplier - plot.dom.margin.top - plot.dom.margin.bottom)) // 40 = margin.top + margin.bottom
            .attr("y2", 0)
            .attr("type", "1D")
            .attr("plotId", plot.plotId)
            .style("pointer-events", "none");
    }
}
