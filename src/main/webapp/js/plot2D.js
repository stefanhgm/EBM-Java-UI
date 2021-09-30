// Space for 2d risk function legend.
const widthOffsetRight = 150; //200

// Took values from https://www.kennethmoreland.com/color-maps/CoolWarmUChar257.csv .
const rgbColors = ['rgb(59,76,192)', 'rgb(60,78,194)', 'rgb(61,80,195)', 'rgb(62,81,197)', 'rgb(63,83,198)', 'rgb(64,85,200)', 'rgb(66,87,201)', 'rgb(67,88,203)', 'rgb(68,90,204)', 'rgb(69,92,206)', 'rgb(70,93,207)', 'rgb(71,95,209)', 'rgb(73,97,210)', 'rgb(74,99,211)', 'rgb(75,100,213)', 'rgb(76,102,214)', 'rgb(77,104,215)', 'rgb(79,105,217)', 'rgb(80,107,218)', 'rgb(81,109,219)', 'rgb(82,110,221)', 'rgb(84,112,222)', 'rgb(85,114,223)', 'rgb(86,115,224)', 'rgb(87,117,225)', 'rgb(89,119,226)', 'rgb(90,120,228)', 'rgb(91,122,229)', 'rgb(93,123,230)', 'rgb(94,125,231)', 'rgb(95,127,232)', 'rgb(96,128,233)', 'rgb(98,130,234)', 'rgb(99,131,235)', 'rgb(100,133,236)', 'rgb(102,135,237)', 'rgb(103,136,238)', 'rgb(104,138,239)', 'rgb(106,139,239)', 'rgb(107,141,240)', 'rgb(108,142,241)', 'rgb(110,144,242)', 'rgb(111,145,243)', 'rgb(112,147,243)', 'rgb(114,148,244)', 'rgb(115,150,245)', 'rgb(116,151,246)', 'rgb(118,153,246)', 'rgb(119,154,247)', 'rgb(120,156,247)', 'rgb(122,157,248)', 'rgb(123,158,249)', 'rgb(124,160,249)', 'rgb(126,161,250)', 'rgb(127,163,250)', 'rgb(129,164,251)', 'rgb(130,165,251)', 'rgb(131,167,252)', 'rgb(133,168,252)', 'rgb(134,169,252)', 'rgb(135,171,253)', 'rgb(137,172,253)', 'rgb(138,173,253)', 'rgb(140,174,254)', 'rgb(141,176,254)', 'rgb(142,177,254)', 'rgb(144,178,254)', 'rgb(145,179,254)', 'rgb(147,181,255)', 'rgb(148,182,255)', 'rgb(149,183,255)', 'rgb(151,184,255)', 'rgb(152,185,255)', 'rgb(153,186,255)', 'rgb(155,187,255)', 'rgb(156,188,255)', 'rgb(158,190,255)', 'rgb(159,191,255)', 'rgb(160,192,255)', 'rgb(162,193,255)', 'rgb(163,194,255)', 'rgb(164,195,254)', 'rgb(166,196,254)', 'rgb(167,197,254)', 'rgb(168,198,254)', 'rgb(170,199,253)', 'rgb(171,199,253)', 'rgb(172,200,253)', 'rgb(174,201,253)', 'rgb(175,202,252)', 'rgb(176,203,252)', 'rgb(178,204,251)', 'rgb(179,205,251)', 'rgb(180,205,251)', 'rgb(182,206,250)', 'rgb(183,207,250)', 'rgb(184,208,249)', 'rgb(185,208,248)', 'rgb(187,209,248)', 'rgb(188,210,247)', 'rgb(189,210,247)', 'rgb(190,211,246)', 'rgb(192,212,245)', 'rgb(193,212,245)', 'rgb(194,213,244)', 'rgb(195,213,243)', 'rgb(197,214,243)', 'rgb(198,214,242)', 'rgb(199,215,241)', 'rgb(200,215,240)', 'rgb(201,216,239)', 'rgb(203,216,238)', 'rgb(204,217,238)', 'rgb(205,217,237)', 'rgb(206,217,236)', 'rgb(207,218,235)', 'rgb(208,218,234)', 'rgb(209,219,233)', 'rgb(210,219,232)', 'rgb(211,219,231)', 'rgb(213,219,230)', 'rgb(214,220,229)', 'rgb(215,220,228)', 'rgb(216,220,227)', 'rgb(217,220,225)', 'rgb(218,220,224)', 'rgb(219,220,223)', 'rgb(220,221,222)', 'rgb(221,221,221)', 'rgb(222,220,219)', 'rgb(223,220,218)', 'rgb(224,219,216)', 'rgb(225,219,215)', 'rgb(226,218,214)', 'rgb(227,218,212)', 'rgb(228,217,211)', 'rgb(229,216,209)', 'rgb(230,216,208)', 'rgb(231,215,206)', 'rgb(232,215,205)', 'rgb(232,214,203)', 'rgb(233,213,202)', 'rgb(234,212,200)', 'rgb(235,212,199)', 'rgb(236,211,197)', 'rgb(236,210,196)', 'rgb(237,209,194)', 'rgb(238,209,193)', 'rgb(238,208,191)', 'rgb(239,207,190)', 'rgb(240,206,188)', 'rgb(240,205,187)', 'rgb(241,204,185)', 'rgb(241,203,184)', 'rgb(242,202,182)', 'rgb(242,201,181)', 'rgb(243,200,179)', 'rgb(243,199,178)', 'rgb(244,198,176)', 'rgb(244,197,174)', 'rgb(245,196,173)', 'rgb(245,195,171)', 'rgb(245,194,170)', 'rgb(245,193,168)', 'rgb(246,192,167)', 'rgb(246,191,165)', 'rgb(246,190,163)', 'rgb(246,188,162)', 'rgb(247,187,160)', 'rgb(247,186,159)', 'rgb(247,185,157)', 'rgb(247,184,156)', 'rgb(247,182,154)', 'rgb(247,181,152)', 'rgb(247,180,151)', 'rgb(247,178,149)', 'rgb(247,177,148)', 'rgb(247,176,146)', 'rgb(247,174,145)', 'rgb(247,173,143)', 'rgb(247,172,141)', 'rgb(247,170,140)', 'rgb(247,169,138)', 'rgb(247,167,137)', 'rgb(247,166,135)', 'rgb(246,164,134)', 'rgb(246,163,132)', 'rgb(246,161,131)', 'rgb(246,160,129)', 'rgb(245,158,127)', 'rgb(245,157,126)', 'rgb(245,155,124)', 'rgb(244,154,123)', 'rgb(244,152,121)', 'rgb(244,151,120)', 'rgb(243,149,118)', 'rgb(243,147,117)', 'rgb(242,146,115)', 'rgb(242,144,114)', 'rgb(241,142,112)', 'rgb(241,141,111)', 'rgb(240,139,109)', 'rgb(240,137,108)', 'rgb(239,136,106)', 'rgb(238,134,105)', 'rgb(238,132,103)', 'rgb(237,130,102)', 'rgb(236,129,100)', 'rgb(236,127,99)', 'rgb(235,125,97)', 'rgb(234,123,96)', 'rgb(233,121,95)', 'rgb(233,120,93)', 'rgb(232,118,92)', 'rgb(231,116,90)', 'rgb(230,114,89)', 'rgb(229,112,88)', 'rgb(228,110,86)', 'rgb(227,108,85)', 'rgb(227,106,83)', 'rgb(226,104,82)', 'rgb(225,102,81)', 'rgb(224,100,79)', 'rgb(223,98,78)', 'rgb(222,96,77)', 'rgb(221,94,75)', 'rgb(220,92,74)', 'rgb(218,90,73)', 'rgb(217,88,71)', 'rgb(216,86,70)', 'rgb(215,84,69)', 'rgb(214,82,67)', 'rgb(213,80,66)', 'rgb(212,78,65)', 'rgb(210,75,64)', 'rgb(209,73,62)', 'rgb(208,71,61)', 'rgb(207,69,60)', 'rgb(205,66,59)', 'rgb(204,64,57)', 'rgb(203,62,56)', 'rgb(202,59,55)', 'rgb(200,57,54)', 'rgb(199,54,53)', 'rgb(198,51,52)', 'rgb(196,49,50)', 'rgb(195,46,49)', 'rgb(193,43,48)', 'rgb(192,40,47)', 'rgb(190,37,46)', 'rgb(189,34,45)', 'rgb(188,30,44)', 'rgb(186,26,43)', 'rgb(185,22,41)', 'rgb(183,17,40)', 'rgb(181,11,39)', 'rgb(180,4,38)'];
const scalar = [0, 0.00390625, 0.0078125, 0.01171875, 0.015625, 0.01953125, 0.0234375, 0.02734375, 0.03125, 0.03515625, 0.0390625, 0.04296875, 0.046875, 0.05078125, 0.0546875, 0.05859375, 0.0625, 0.06640625, 0.0703125, 0.07421875, 0.078125, 0.08203125, 0.0859375, 0.08984375, 0.09375, 0.09765625, 0.1015625, 0.10546875, 0.109375, 0.11328125, 0.1171875, 0.12109375, 0.125, 0.12890625, 0.1328125, 0.13671875, 0.140625, 0.14453125, 0.1484375, 0.15234375, 0.15625, 0.16015625, 0.1640625, 0.16796875, 0.171875, 0.17578125, 0.1796875, 0.18359375, 0.1875, 0.19140625, 0.1953125, 0.19921875, 0.203125, 0.20703125, 0.2109375, 0.21484375, 0.21875, 0.22265625, 0.2265625, 0.23046875, 0.234375, 0.23828125, 0.2421875, 0.24609375, 0.25, 0.25390625, 0.2578125, 0.26171875, 0.265625, 0.26953125, 0.2734375, 0.27734375, 0.28125, 0.28515625, 0.2890625, 0.29296875, 0.296875, 0.30078125, 0.3046875, 0.30859375, 0.3125, 0.31640625, 0.3203125, 0.32421875, 0.328125, 0.33203125, 0.3359375, 0.33984375, 0.34375, 0.34765625, 0.3515625, 0.35546875, 0.359375, 0.36328125, 0.3671875, 0.37109375, 0.375, 0.37890625, 0.3828125, 0.38671875, 0.390625, 0.39453125, 0.3984375, 0.40234375, 0.40625, 0.41015625, 0.4140625, 0.41796875, 0.421875, 0.42578125, 0.4296875, 0.43359375, 0.4375, 0.44140625, 0.4453125, 0.44921875, 0.453125, 0.45703125, 0.4609375, 0.46484375, 0.46875, 0.47265625, 0.4765625, 0.48046875, 0.484375, 0.48828125, 0.4921875, 0.49609375, 0.5, 0.50390625, 0.5078125, 0.51171875, 0.515625, 0.51953125, 0.5234375, 0.52734375, 0.53125, 0.53515625, 0.5390625, 0.54296875, 0.546875, 0.55078125, 0.5546875, 0.55859375, 0.5625, 0.56640625, 0.5703125, 0.57421875, 0.578125, 0.58203125, 0.5859375, 0.58984375, 0.59375, 0.59765625, 0.6015625, 0.60546875, 0.609375, 0.61328125, 0.6171875, 0.62109375, 0.625, 0.62890625, 0.6328125, 0.63671875, 0.640625, 0.64453125, 0.6484375, 0.65234375, 0.65625, 0.66015625, 0.6640625, 0.66796875, 0.671875, 0.67578125, 0.6796875, 0.68359375, 0.6875, 0.69140625, 0.6953125, 0.69921875, 0.703125, 0.70703125, 0.7109375, 0.71484375, 0.71875, 0.72265625, 0.7265625, 0.73046875, 0.734375, 0.73828125, 0.7421875, 0.74609375, 0.75, 0.75390625, 0.7578125, 0.76171875, 0.765625, 0.76953125, 0.7734375, 0.77734375, 0.78125, 0.78515625, 0.7890625, 0.79296875, 0.796875, 0.80078125, 0.8046875, 0.80859375, 0.8125, 0.81640625, 0.8203125, 0.82421875, 0.828125, 0.83203125, 0.8359375, 0.83984375, 0.84375, 0.84765625, 0.8515625, 0.85546875, 0.859375, 0.86328125, 0.8671875, 0.87109375, 0.875, 0.87890625, 0.8828125, 0.88671875, 0.890625, 0.89453125, 0.8984375, 0.90234375, 0.90625, 0.91015625, 0.9140625, 0.91796875, 0.921875, 0.92578125, 0.9296875, 0.93359375, 0.9375, 0.94140625, 0.9453125, 0.94921875, 0.953125, 0.95703125, 0.9609375, 0.96484375, 0.96875, 0.97265625, 0.9765625, 0.98046875, 0.984375, 0.98828125, 0.9921875, 0.99609375, 1];


function plotArray2D(plotId, element, plotData, min2D, max2D, overlay) {
    // Set the dimensions and margins of the graph.
    const margin = {top: 20, right: 20, bottom: 20, outerLeft: 20, innerLeft: 60};
    const width = element.node().getBoundingClientRect().width - margin.innerLeft - margin.right;
    let cWidth = width - widthOffsetRight - widthOffsetLeft;
    const svgHeight = cWidth + heightOffset + margin.top + margin.bottom;//element.getBoundingClientRect().height - element.childNodes[6].childNodes[1].getBoundingClientRect().height;
    let height = cWidth//svgHeight - heightOffset - margin.top - margin.bottom;
    const svgWidth = cWidth + margin.innerLeft + margin.right + widthOffsetLeft;


    // Object to store everything needed for plotting and mousemove.
    let plot = {
        plotId: plotId,
        typeX: plotData["featureTypes"]["0"],
        typeY: plotData["featureTypes"]["1"],
        featureNameX: plotData["featureNames"]["0"],
        featureNameY: plotData["featureNames"]["1"],
        data: plotData["risks"],
        histogramX: plotData["histogram"]["0"],
        histogramY: plotData["histogram"]["1"],
        confidence: plotData["confidenceIntervals"],
        binsAtt1: [],
        binsAtt2: [],
        lengthAtt1: 0,
        lengthAtt2: 0,
        n: 0,
        m: 0,
        Att1Unknown: undefined,
        Att2Unknown: undefined,
        xAxisData: {},
        yAxisData: {},
        min2D: min2D,
        max2D: max2D,
        max: plotData["max"],
        min: plotData["min"],
        dom: {
            width: width,
            cWidth: cWidth,
            svgWidth: svgWidth,
            height: height,
            svgHeight: svgHeight,
            margin: margin,
            textOffsetX: 35,
            textOffsetY: -85
        },
        heatmap: {}
    }

    let datasetWrapper;

    // Collect data.
    getBins2D(plot, plotData);
    getUnknown2D(plot);

    // Build scales.
    buildScales2D(plot);

    // Add helper attributes to build dataset.
    plot.n = plot.lengthAtt1 - 1;
    plot.m = plot.lengthAtt2 - 1;

    plot.rangeAtt1 = Math.abs(plot.binsAtt1[plot.n] - plot.binsAtt1[1]);
    plot.rangeAtt2 = Math.abs(plot.binsAtt2[plot.m] - plot.binsAtt2[1]);

    if (plot.typeX !== "categorical") {
        plot.n += 1;
    }
    if (plot.typeY !== "categorical") {
        plot.m += 1;
    }

    // Add histogram value of every bin. Needed to calculate density in %.
    plot.histogramSumX = Object.values(plot.histogramX).reduce((a, b) => a + b);
    plot.histogramSumY = Object.values(plot.histogramY).reduce((a, b) => a + b);

    // Data to draw heatmap.
    datasetWrapper = buildDataset2D(plot);

    addCanvas2D(plot);

    // Order of y-axis label, y-axis histogram, main svg and color legend is important.
    addYAxisLabel2D(plot);

    if (showHistograms) {
        addYAxisHistogram2D(plot);
    }

    addSvgs2D(plot);
    addYAxis2D(plot);
    addXAxis2D(plot);

    addXAxisLabel2D(plot);

    plot.dom.gradientCanvasWidth = (widthOffsetRight - plot.dom.margin.outerLeft - plot.dom.margin.right) * 0.25;
    plot.dom.gradientCanvasHeight = plot.dom.height * 0.8;

    plot.legendOffset = 30;

    addLegend2D(plot);

    if (showHistograms) {
        addXAxisHistogram2D(plot);
    }

    // Values of rgbColors in hex.
    plot.heatmap.hexColors = rgbColors.map(function (d) {
        return rgbToHex(d)
    });

    plot.absoluteHighest = Math.abs(min2D) > Math.abs(max2D) ? Math.abs(min2D) : Math.abs(max2D);
    // Values of scalar, scaled to [Min,Max].
    plot.heatmap.domainData = scalar.map(function (d) {
        return (2 * plot.absoluteHighest * d) - plot.absoluteHighest;
    });

    // Draw plot in canvas.
    drawHeatmap(plot, datasetWrapper);
    drawLegend2D(plot);

    // Add mouse interactivity.
    createMousemoveElements2D(plot, datasetWrapper);

    if (overlay) {
        let index1 = overlay.valueIndexAtt1;
        let index2 = overlay.valueIndexAtt2;
        if (plot.typeX === "continuous") {
            index1 -= 1;
        }
        if (plot.typeY === "continuous") {
            index2 -= 1;
        }
        drawPlotOverlay2D(plot, index1, index2)
    }
}

/**
 * Get bins for given 2D plot.
 */
function getBins2D(plot, plotData) {
    // Get data of x-axis attribute.
    if (plot.typeX === "categorical") {
        plot.lengthAtt1 = plot.data.length + 1;
        let mapping = plotData["categorical_mapping"][0];
        mapping["NaN"] = "-1"
        plot.binsAtt1.push('unknown')
        for (let i = 0; i < Object.keys(mapping).length; i++) {
            plot.binsAtt1.push(Object.keys(mapping)[i]);
        }
    } else {
        plot.binsAtt1 = plotData["continuous_bins_lower_bounds"][0];
        plot.lengthAtt1 = plot.data.length;
        const min = plotData["min"][0][0]//plot.binsAtt1[0] - Math.abs(plot.binsAtt1[plot.binsAtt1.length - 1] - plot.binsAtt1[0]) * 0.1;
        let firstBin = min//plot.binsAtt1[0] - (1 / plot.binsAtt1.length * Math.abs(plot.binsAtt1[plot.binsAtt1.length - 1] - plot.binsAtt1[0])) * 5
        //if (firstBin < min) {
        //    firstBin = min;
        //}
        //if (!(plot.lengthAtt1 - 1 === 1)) {
        const max = plotData["max"][0][0]//plot.binsAtt1[plot.binsAtt1.length - 1] + Math.abs(plot.binsAtt1[plot.binsAtt1.length - 1] - plot.binsAtt1[0]) * 0.1;
        let lastBin = max//plot.binsAtt1[plot.binsAtt1.length - 1] + (1 / plot.binsAtt1.length * Math.abs(plot.binsAtt1[plot.binsAtt1.length - 1] - plot.binsAtt1[0])) * 5;
            //if (lastBin > max) {
            //    lastBin = max;
           // }
        //} else {
           // lastBin = plot.binsAtt1[plot.lengthAtt1 - 1] + 1;
        //}
        plot.binsAtt1 = [0, firstBin].concat(plot.binsAtt1).concat(lastBin)
    }
    // Get data of y-axis attribute.
    if (plot.typeY === "categorical") {
        plot.lengthAtt2 = plot.data[0].length + 1;
        let mapping = plotData["categorical_mapping"][1];
        mapping["NaN"] = "-1"
        plot.binsAtt2.push('unknown')
        for (let i = 0; i < Object.keys(mapping).length; i++) {
            plot.binsAtt2.push(Object.keys(mapping)[i]);
        }
    } else {
        plot.binsAtt2 = plotData["continuous_bins_lower_bounds"][1];
        plot.lengthAtt2 = plot.data[0].length;
        const min = plotData["min"][1][0]//plot.binsAtt2[0] - Math.abs(plot.binsAtt2[plot.binsAtt2.length - 1] - plot.binsAtt2[0]) * 0.1;
        let firstBin = min//plot.binsAtt2[0] - (1 / plot.binsAtt2.length * Math.abs(plot.binsAtt2[plot.binsAtt2.length - 1] - plot.binsAtt2[0])) * 5
        //if (firstBin < min) {
        //    firstBin = min;
        //}
        //if (!(plot.lengthAtt2 - 1 === 1)) {
        const max = plotData["max"][1][0]//plot.binsAtt2[plot.binsAtt2.length - 1] + Math.abs(plot.binsAtt2[plot.binsAtt2.length - 1] - plot.binsAtt2[0]) * 0.1;
            let lastBin = max//plot.binsAtt2[plot.binsAtt2.length - 1] + (1 / plot.binsAtt2.length * Math.abs(plot.binsAtt2[plot.binsAtt2.length - 1] - plot.binsAtt2[0])) * 5;
            //if (lastBin > max) {
             //   lastBin = max;
            //}
        //} else {
            //lastBin = plot.binsAtt2[plot.lengthAtt2 - 1] + 1;
        //}
        plot.binsAtt2 = [0, firstBin].concat(plot.binsAtt2).concat(lastBin)
    }
}

/**
 * Get values for 2D unknown bin.
 */
function getUnknown2D(plot) {
    plot.xAxisHistogramUnknown = plot.histogramX[0];
    plot.yAxisHistogramUnknown = plot.histogramY[0];
}

/**
 * Add d3 scales to draw 2d risk function and histogram.
 */
function buildScales2D(plot) {
    if (plot.typeX === "categorical") {
        plot.xAxisData.xScaleUnknown = d3.scalePoint().domain([1]);
        plot.xAxisData.xAxisEnding = " ";
        plot.xAxisData.xScale = d3.scalePoint().domain(plot.binsAtt1.slice(1, plot.binsAtt1.length));
    } else {
        plot.xAxisData.xScale = d3.scaleLinear()
            .domain([plot.binsAtt1[1], plot.binsAtt1[plot.binsAtt1.length - 1]]);
        plot.xAxisData.xScaleUnknown = d3.scalePoint().domain([0]);
    }
    if (plot.typeY === "categorical") {
        plot.yAxisData.yScaleUnknown = d3.scalePoint().domain([1]);
        plot.yAxisData.yAxisEnding = " ";
        plot.yAxisData.yScale = d3.scalePoint().domain(plot.binsAtt2.slice(1, plot.binsAtt2.length));
    } else {
        plot.yAxisData.yScale = d3.scaleLinear()
            .domain([plot.binsAtt2[1], plot.binsAtt2[plot.binsAtt2.length - 1]]);
        plot.yAxisData.yScaleUnknown = d3.scalePoint().domain([0])

    }

    // Build X scales:
    plot.xAxisData.xScale.range([plot.dom.cWidth * 0.1, plot.dom.cWidth]);

    plot.xAxisData.xScaleUnknown.range([0, plot.dom.cWidth * 0.1]);
    plot.yAxisData.yScaleUnknown.range([plot.dom.height, plot.dom.height * 0.9]);

    // Build Y scales:
    plot.yAxisData.yScale.range([plot.dom.height * 0.9, 0]);

    // Construct dataset for histograms for x/y-Axis with step before the last bin and without unknown.
    plot.histogramDataAtt1 = d3.range(1, plot.lengthAtt1).map(function (d) {
        return {
            "x": plot.binsAtt1[d], "y": plot.histogramX[d]
        }
    });
    plot.histogramDataAtt2 = d3.range(1, plot.lengthAtt2).map(function (d) {
        return {
            "x": plot.binsAtt2[d], "y": plot.histogramY[d]
        }
    });

    plot.maximumAtt1 = d3.max(plot.histogramDataAtt1, function (d) {
        return +d.y;
    });
    plot.maximumAtt2 = d3.max(plot.histogramDataAtt2, function (d) {
        return +d.y;
    });

    if (plot.xAxisHistogramUnknown > plot.maximumAtt1) {
        plot.maximumAtt1 = plot.xAxisHistogramUnknown;
    }
    if (plot.yAxisHistogramUnknown > plot.maximumAtt2) {
        plot.maximumAtt2 = plot.yAxisHistogramUnknown;
    }

    plot.xAxisData.xScaleHistogram = d3.scaleLinear()
        .domain([0, plot.maximumAtt2 * 1.03])
        .range([0, widthOffsetLeft * histogramSvgSizeMultiplier - plot.dom.margin.outerLeft]);

    plot.yAxisData.yScaleHistogram = d3.scaleLinear()
        .domain([0, plot.maximumAtt1 * 1.03])
        .range([widthOffsetLeft * histogramSvgSizeMultiplier - plot.dom.margin.outerLeft, 0]);
}

/**
 * Build dataset with data needed to draw 2d risk function.
 */
function buildDataset2D(plot) {
    let dataset;
    let datasetUnknownX;
    let datasetUnknownY;
    let datasetUnknownXY;

    dataset = Array((plot.n) * (plot.m));
    datasetUnknownX = Array(plot.m);
    datasetUnknownY = Array(plot.n);
    datasetUnknownXY = Array(1);

    for (let i = 0; i <= plot.n; i++) {
        for (let j = 0; j <= plot.m; j++) {
            if (i === 0) {
                if (j === 0) {
                    datasetUnknownXY[j] = {
                        "att1": plot.binsAtt1[0],
                        "att2": plot.binsAtt2[0],
                        "value": plot.data[0][0],
                        "index": 0
                    };
                } else {
                    datasetUnknownX[j - 1] = {
                        "att1": plot.binsAtt1[0],
                        "att2": plot.binsAtt2[j],
                        "value": j < plot.data[0].length ? plot.data[0][j] : plot.data[0][j - 1],
                        "index": j
                    };
                }
            } else if (j === 0) {
                datasetUnknownY[i - 1] = {
                    "att1": plot.binsAtt1[i],
                    "att2": plot.binsAtt2[0],
                    "value": i < plot.data.length ? plot.data[i][0] : plot.data[i - 1][0],
                    "index": i * plot.m
                };
            } else {
                dataset[(i - 1) * (plot.m - 1) + j - 1] = {
                    "att1": plot.binsAtt1[i],
                    "att2": plot.binsAtt2[j],
                    "value": i < plot.data.length ? (j < plot.data[0].length ? plot.data[i][j] : plot.data[i][j - 1])
                        : (j < plot.data[0].length ? plot.data[i - 1][j] : plot.data[i - 1][j - 1]),
                    "index": i * plot.m + j
                };
            }
        }
    }
    return {
        dataset: dataset,
        datasetUnknownX: datasetUnknownX,
        datasetUnknownY: datasetUnknownY,
        datasetUnknownXY: datasetUnknownXY
    }
}

/**
 * Create elements needed to display risk value on mousemove.
 */
function createMousemoveElements2D(plot, datasetWrapper) {
    plot.dom.focus = plot.dom.svg.append("g")
        .attr("class", "focus")
        .style("display", "none"); // display "none" -> invisible;  display "null" -> visible

    plot.dom.textFocus = plot.dom.svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    if (showHistograms) {
        plot.dom.xAxisHistogramFocus = plot.dom.xAxisHistogramSvg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        plot.dom.yAxisHistogramFocus = plot.dom.yAxisHistogramSvg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        plot.dom.xAxisHistogramFocus.append("circle")
            .classed("circle", true)
            .attr("r", 4.5);

        plot.dom.yAxisHistogramFocus.append("circle")
            .classed("circle", true)
            .attr("r", 4.5);

        plot.dom.xAxisHistogramFocus.append("line")
            .classed("x", true);

        plot.dom.xAxisHistogramFocus.append("line")
            .classed("y", true);

        plot.dom.yAxisHistogramFocus.append("line")
            .classed("x", true);

        plot.dom.yAxisHistogramFocus.append("line")
            .classed("y", true);
    }

    plot.dom.rect = plot.dom.svg.append("rect")
        .attr("class", "overlay")
        .attr("width", plot.dom.cWidth)
        .attr("height", plot.dom.height)
        .attr("opacity", 0.0)
        .on("mouseover", function () {
            plot.dom.focus.style("display", null);
            plot.dom.textFocus.style("display", null);
            if (showHistograms) {
                plot.dom.xAxisHistogramFocus.style("display", null);
                plot.dom.yAxisHistogramFocus.style("display", null);
            }
        });

    let curX = 3;
    let curY = 0;

    plot.dom.rect.on("mouseout", function () {
        plot.dom.focus.style("display", "none");
        plot.dom.textFocus.style("display", "none");
        if (showHistograms) {
            plot.dom.xAxisHistogramFocus.style("display", "none");
            plot.dom.yAxisHistogramFocus.style("display", "none");
        }
    })
        .on("mousemove", mousemove2D.bind(plot.dom.rect.node(), plot, datasetWrapper, curX, curY));

    plot.dom.focus.append("circle")
        .classed("circle", true)
        .attr("r", 4.5);


    plot.dom.focus.append("line")
        .classed("x", true);

    plot.dom.focus.append("line")
        .classed("y", true);

    plot.dom.rect = plot.dom.textFocus.append("rect")
        .classed("rect", true)
        .attr("rx", 10)
        .attr("ry", 10);

    // Append text to show x and y values
    const textOffsetX = 5;
    const textOffsetY = -5;

    const textX = plot.dom.textFocus.append("text")
        .classed("text", true)
        .attr("x", textOffsetX)
        .attr("y", textOffsetY)
        .attr("dy", ".35em");

    const textY = plot.dom.textFocus.append("text")
        .classed("text", true)
        .attr("x", textOffsetX)
        .attr("dy", ".35em");

    const textRisk = plot.dom.textFocus.append("text")
        .classed("text", true)
        .attr("x", textOffsetX)
        .attr("dy", ".35em");

    const textDensityX = plot.dom.textFocus.append("text")
        .classed("text", true)
        .attr("x", textOffsetX)
        .attr("dy", ".35em");

    const textDensityY = plot.dom.textFocus.append("text")
        .classed("text", true)
        .attr("x", textOffsetX)
        .attr("dy", ".35em");

    plot.mousemoveData = {
        "x": textX, "y": textY, "risk": textRisk, "densityX": textDensityX, "densityY": textDensityY
    };
}

/**
 * Add Canvas to draw heatmap.
 */
function addCanvas2D(plot) {
    plot.dom.canvas = d3.select("#draw" + plot.plotId)
        .append("canvas")
        .attr("width", plot.dom.cWidth)
        .attr("height", plot.dom.height)
        .style("left", widthOffsetLeft + plot.dom.margin.innerLeft + "px")
        .style("top", (plot.dom.margin.top) + "px")
        .style("position", "absolute");
}

/**
 * Add label to y-axis.
 */
function addYAxisLabel2D(plot) {
    //add Svg for y-axis label
    const yAxisLabelSvg = d3.select("#draw" + plot.plotId)
        .append("svg")
        .attr("width", widthOffsetLeft * labelSvgSizeMultiplier)
        .attr("height", plot.dom.svgHeight)
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .append("g")
        .attr("transform", "translate(" + plot.dom.margin.outerLeft + "," + (plot.dom.margin.top) + ")");

    //add label
    let yAxisText = yAxisLabelSvg.append("text")
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(plot.featureNameY).attr("dy", "0.05em");
    wrap(yAxisText, plot.dom.height, "x")

    yAxisText.attr("transform", "rotate(-90)")
        //.attr("y", 0 - plot.dom.margin.outerLeft)
        //.attr("x", 0 - (plot.dom.height / 2));

    yAxisText.each(function () {
        d3.selectAll(this.getElementsByTagName("tspan")).each(function (){
            d3.select(this).attr("x", 0 - (plot.dom.height / 2));
        })
    });
}

/**
 * Draw y-axis histogram.
 */
function addYAxisHistogram2D(plot) {
    plot.dom.yAxisHistogramSvg = d3.select("#draw" + plot.plotId)
        .append("svg")
        .attr("width", widthOffsetLeft * histogramSvgSizeMultiplier)
        .attr("height", plot.dom.svgHeight)
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("class", "plot.dom.yAxisHistogramSvg")
        .style("overflow", "visible")
        .append("g")
        .attr("transform", "translate(" + plot.dom.margin.outerLeft + "," + (plot.dom.margin.top) + ")");

    //add x-axis
    plot.dom.yAxisHistogramSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + plot.dom.height + ")")
        .call(d3.axisBottom(plot.xAxisData.xScaleHistogram).ticks(3));

    //add y.axis
    plot.dom.yAxisHistogramSvg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(plot.yAxisData.yScale).tickSize(0).tickFormat(""))
        .call(adjustTextLabelsY2D, plot);

    plot.dom.yAxisHistogramSvg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(plot.yAxisData.yScaleUnknown).tickSize(0).tickFormat(""));// Create an axis component with d3.axisBottom

    //line to draw
    const yAxisHistogramLine = d3.line()
        .x(function (d) {
            return plot.xAxisData.xScaleHistogram(d.y);
        }) // set the x values for the line generator
        .y(function (d) {
            return plot.yAxisData.yScale(d.x);
        }) // set the y values for the line generator
        .curve(d3.curveStepBefore);

    //Draw yAxisHistogramLine
    plot.dom.yAxisHistogramSvg.append("path")
        .datum(plot.histogramDataAtt2) // Binds data to the line
        .attr("class", "histogramLine") // Assign a class for styling
        .attr("cx", function (d, i) {
            return plot.xAxisData.xScaleHistogram(i)
        })
        .attr("d", yAxisHistogramLine);

    //draw Unknown value
    plot.dom.yAxisHistogramSvg.append("line")
        .attr("class", "histogramLine")
        .attr("x1", plot.xAxisData.xScaleHistogram(plot.yAxisHistogramUnknown))
        .attr("x2", plot.xAxisData.xScaleHistogram(plot.yAxisHistogramUnknown))
        .attr("y1", plot.dom.height * 0.9)
        .attr("y2", plot.dom.height);

    // Draw histogram for last bin.
    plot.dom.yAxisHistogramSvg.append("line")
        .attr("class", "histogramLine")
        .attr("x1", plot.xAxisData.xScaleHistogram(plot.histogramDataAtt2[plot.lengthAtt2 - 1 - 1].y))
        .attr("x2", plot.xAxisData.xScaleHistogram(plot.histogramDataAtt2[plot.lengthAtt2 - 1 - 1].y))
        .attr("y1", 0)
        .attr("y2", plot.yAxisData.yScale(plot.binsAtt2[plot.lengthAtt2 - 1]));

    //add vertical line to yAxisHistogram
    plot.dom.yAxisHistogramSvg.append("line")
        .attr("x1", 0)
        .attr("x2", widthOffsetLeft * histogramSvgSizeMultiplier - plot.dom.margin.outerLeft)
        .attr("y1", plot.dom.height * 0.9 + lineSize / 2)
        .attr("y2", plot.dom.height * 0.9 + lineSize / 2)
        .attr("stroke", "black")
        .attr("stroke-width", lineSize + "px");
}

/**
 * Add svg to draw the plot.
 */
function addSvgs2D(plot) {
    //svg to group svg, plot.dom.xAxisHistogramSvg and xAxisLabelSvg
    plot.dom.outerSvg = d3.select("#draw" + plot.plotId)
        .append("svg")
        .attr("width", plot.dom.svgWidth - widthOffsetLeft)
        .attr("height", plot.dom.svgHeight)
        .attr("transform", "translate(" + 0 + "," + 0 + ")");

    //svg needed to show x and y-axis and interaction
    plot.dom.svg = plot.dom.outerSvg
        .append("svg")
        .attr("width", plot.dom.svgWidth - widthOffsetLeft)
        .attr("height", plot.dom.svgHeight - heightOffset)
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .style("overflow", "visible")
        .append("g")
        .attr("transform", "translate(" + plot.dom.margin.innerLeft + "," + (plot.dom.margin.top) + ")");
}

/**
 * Add x-axis.
 */
function addXAxis2D(plot) {
    //add x-axis
    plot.dom.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + plot.dom.height + ")")
        .call(d3.axisBottom(plot.xAxisData.xScale).tickFormat(function (d) {
            return d === "NaN" ? "" : d;
        }))
        .call(adjustTextLabelsX2D, plot)
        .selectAll(".tick text")
        .call(wrapTwoLines, (plot.dom.cWidth / plot.binsAtt1.length), "x", plot.typeX); // Create an axis component with d3.axisBottom

    plot.dom.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + plot.dom.height + ")")
        .call(d3.axisBottom(plot.xAxisData.xScaleUnknown).tickFormat(function (d) {
            return "unknown"
        }))
        .selectAll("text")
        .style("font-size", "9px")
        .attr('transform', 'translate(' + (-10) + ',0)');
}

/**
 * Center x-axis labels of nominal/categorical attributes.
 */
function adjustTextLabelsX2D(selection, plot) {
    if (plot.typeX === "categorical") {
        selection.selectAll('.tick text')
            .attr('transform', 'translate(' + ((plot.dom.width - widthOffsetLeft - widthOffsetRight) * 0.9) / (plot.lengthAtt1 - 1 - 1) / 2 + ',0)')
    }
}

/**
 * Add y-axis.
 */
function addYAxis2D(plot) {
    plot.dom.svg.append("g")
        .attr("class", "y axis yaxis" + plot.typeY)
        .call(d3.axisLeft(plot.yAxisData.yScale))
        .call(adjustTextLabelsY2D, plot)
        .selectAll(".tick text")
        .call(wrapTwoLines, plot.dom.margin.innerLeft * 0.83, "y", plot.typeY); // Create an axis component with d3.axisBottom

    plot.dom.svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(plot.yAxisData.yScaleUnknown).tickFormat(function (d) {
            return "unknown"
        }))
        .selectAll("text")
        .style("font-size", "9px");


}

/**
 * Center y-axis labels of nominal/categorical attributes.
 */
function adjustTextLabelsY2D(selection, plot) {
    if (plot.typeY === "categorical") {
        selection.selectAll('.tick text')
            .attr('transform', 'translate(0,' + -plot.dom.height / (plot.lengthAtt2 - 1) / 2 + ')');
    }
}

/**
 * Remove tick text of given axis.
 */
function removeTextlabels2D(selection) {
    selection.selectAll('.tick text')
        .text("");
}

/**
 * Draw x-axis histogram.
 */
function addXAxisHistogram2D(plot) {
    plot.dom.xAxisHistogramSvg = plot.dom.outerSvg
        .append("svg")
        .attr("width", plot.dom.svgWidth - widthOffsetLeft)
        .attr("height", (heightOffset * histogramSvgSizeMultiplier))
        .attr("transform", "translate(" + 0 + "," + (plot.dom.svgHeight - heightOffset) + ")")
        .style("overflow", "visible")
        .append("g")
        .attr("transform", "translate(" + plot.dom.margin.innerLeft + "," + (plot.dom.margin.top) + ")");

    //add x-axis
    plot.dom.xAxisHistogramSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (widthOffsetLeft * histogramSvgSizeMultiplier - plot.dom.margin.outerLeft) + ")")
        .call(d3.axisBottom(plot.xAxisData.xScale).ticks(0).tickSize(0))
        .call(removeTextlabels2D);

    plot.dom.xAxisHistogramSvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (widthOffsetLeft * histogramSvgSizeMultiplier - plot.dom.margin.outerLeft) + ")")
        .call(d3.axisBottom(plot.xAxisData.xScaleUnknown).tickSize(0).tickFormat(""));// Create an axis component with d3.axisBottom


    //add y-axis
    plot.dom.xAxisHistogramSvg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(plot.yAxisData.yScaleHistogram).ticks(3));

    //line to draw
    const xAxisHistogramLine = d3.line()
        .x(function (d) {
            return plot.xAxisData.xScale(d.x);
        }) // set the x values for the line generator
        .y(function (d) {
            return plot.yAxisData.yScaleHistogram(d.y);
        }) // set the y values for the line generator
        .curve(d3.curveStepAfter);

    //draw line
    plot.dom.xAxisHistogramSvg.append("path")
        .datum(plot.histogramDataAtt1) // Binds data to the line
        .attr("class", "histogramLine") // Assign a class for styling
        .attr("cx", function (d, i) {
            return plot.xAxisData.xScale(i)
        })
        .attr("d", xAxisHistogramLine);

    //draw Unknown value
    plot.dom.xAxisHistogramSvg.append("line")
        .attr("class", "histogramLine")
        .attr("x1", 0)
        .attr("x2", plot.dom.cWidth * 0.1)
        .attr("y1", plot.yAxisData.yScaleHistogram(plot.xAxisHistogramUnknown))
        .attr("y2", plot.yAxisData.yScaleHistogram(plot.xAxisHistogramUnknown));


    // Draw histogram for last bin.
    plot.dom.xAxisHistogramSvg.append("line")
        .attr("class", "histogramLine")
        .attr("x1", plot.xAxisData.xScale(plot.binsAtt1[plot.lengthAtt1 - 1]))
        .attr("x2", plot.dom.cWidth)
        .attr("y1", plot.yAxisData.yScaleHistogram(plot.histogramDataAtt1[plot.lengthAtt1 - 1 - 1].y))
        .attr("y2", plot.yAxisData.yScaleHistogram(plot.histogramDataAtt1[plot.lengthAtt1 - 1 - 1].y));

    //add vertical line to xAxisHistogram
    plot.dom.xAxisHistogramSvg.append("line")
        .attr("x1", plot.dom.cWidth * 0.1 + lineSize / 2)
        .attr("x2", plot.dom.cWidth * 0.1 + lineSize / 2)
        .attr("y1", 0)
        .attr("y2", widthOffsetLeft * histogramSvgSizeMultiplier - plot.dom.margin.outerLeft)
        .attr("stroke", "black")
        .attr("stroke-width", lineSize + "px");
}

/**
 * Add x-axis label.
 */
function addXAxisLabel2D(plot) {
    // Svg for x-axis label below plot.dom.xAxisHistogramSvg.
    const xAxisLabelSvg = plot.dom.outerSvg
        .append("svg")
        .attr("width", plot.dom.svgWidth - widthOffsetLeft)
        .attr("height", heightOffset * labelSvgSizeMultiplier)
        .attr("transform", "translate(" + 0 + "," + (plot.dom.svgHeight - heightOffset * labelSvgSizeMultiplier) + ")")
        .append("g")
        .attr("transform", "translate(" + plot.dom.margin.innerLeft + "," + (plot.dom.margin.top) + ")");

    // Add label.
    let xAxisText = xAxisLabelSvg.append("text")
        .attr("transform",
            "translate(" + (plot.dom.cWidth / 2) + " ," +
            (0) + ")")
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text(plot.featureNameX).attr("dy", "0.05em");

    wrap(xAxisText, plot.dom.cWidth, "x", plot.typeX)
}

/**
 * Add color legend.
 */
function addLegend2D(plot) {
    plot.dom.gradientSvg = d3.select("#draw" + plot.plotId)
        .append("svg")
        .attr("width", widthOffsetRight - plot.dom.margin.outerLeft - plot.dom.margin.right)
        .attr("height", plot.dom.svgHeight)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + plot.dom.margin.top + ")");


    // Canvas to draw legend.
    plot.dom.gradientCanvas = d3.select("#draw" + plot.plotId)
        .append("canvas")
        .attr("width", plot.dom.gradientCanvasWidth)
        .attr("height", plot.dom.gradientCanvasHeight)
        .style("left", plot.dom.svgWidth + 1 + "px")
        .style("top", plot.dom.margin.top + 15 + plot.legendOffset + "px")
        .style("position", "absolute")
        .style("border", "1px solid black");
}

/**
 * Calculate and display data according to current mouse position.
 */
function mousemove2D(plot, datasetWrapper, curX, curY) {
    let x0; // Value of x attribute, ignoring bins.
    let y0; // Value of y attribute, ignoring bins.
    let d; // Risk value.
    let i; // Index of x attribute.
    let j; // Index of y attribute.

    const unknownRangeX = d3.mouse(this)[0] < plot.dom.cWidth * 0.1;
    const unknownRangeY = d3.mouse(this)[1] >= plot.dom.height * 0.9;

    // Make overlay visible.
    plot.dom.focus.style("display", null);
    plot.dom.textFocus.style("display", null);
    if (showHistograms) {
        plot.dom.yAxisHistogramFocus.style("display", null);
        plot.dom.xAxisHistogramFocus.style("display", null);
    }

    let fromX; // Start of x-axis attribute bin.
    let toX; // End of y-axis attribute bin.
    let fromY; // Start of y-axis attribute bin.
    let toY; // End of y-axis attribute bin.
    let histogramPercentageX; // Percentage of values in current bin out of all bins combined for x-axis attribute.
    let histogramAbsoluteX; // Amount of values in current bin for x-axis attribute.
    let histogramPercentageY; // Percentage of values in current bin out of all bins combined for y-axis attribute.
    let histogramAbsoluteY; // Amount of values in current bin for y-axis attribute.

    // Heatmap is split into 4 parts. Each part requires distinct handling.
    if (unknownRangeX) {
        if (unknownRangeY) {
            // Disable overlay and end method if no unknown values exist.
            if (!plot.xAxisHistogramUnknown || !plot.yAxisHistogramUnknown) {
                plot.dom.focus.style("display", "none");
                plot.dom.textFocus.style("display", "none");
                if (showHistograms) {
                    plot.dom.yAxisHistogramFocus.style("display", "none");
                    plot.dom.xAxisHistogramFocus.style("display", "none");
                }
                return;
            }
            histogramPercentageX = (plot.xAxisHistogramUnknown / plot.histogramSumX * 100);
            histogramAbsoluteX = plot.xAxisHistogramUnknown;
            histogramPercentageY = (plot.yAxisHistogramUnknown / plot.histogramSumY * 100);
            histogramAbsoluteY = plot.yAxisHistogramUnknown;

            d = datasetWrapper.datasetUnknownXY[0].value;
        } else {
            // Disable overlay and end method if no unknown values exist.
            if (!plot.xAxisHistogramUnknown) {
                plot.dom.focus.style("display", "none");
                plot.dom.textFocus.style("display", "none");
                if (showHistograms) {
                    plot.dom.yAxisHistogramFocus.style("display", "none");
                    plot.dom.xAxisHistogramFocus.style("display", "none");
                }
                return;
            }
            if (plot.typeY === "categorical") {
                y0 = Math.floor(plot.m - 1 - (((plot.lengthAtt2 - 1 - 1) * d3.mouse(this)[1]) / (plot.dom.height * 0.9)));
                j = y0;
                histogramAbsoluteY = plot.histogramDataAtt2[j].y;
                d = datasetWrapper.datasetUnknownX[j].value;
            } else {
                y0 = plot.yAxisData.yScale.invert(d3.mouse(this)[1]);

                j = bisect(plot.binsAtt2, y0);
                if (j === 0) {
                    j = 1;
                }
                histogramAbsoluteY = plot.histogramDataAtt2[j - 1 - 1].y;
                d = datasetWrapper.datasetUnknownX[j - 1 - 1].value;
            }

            fromY = datasetWrapper.datasetUnknownX[j - 1 - 1];
            toY = datasetWrapper.datasetUnknownX[j - 1];

            histogramPercentageX = (plot.xAxisHistogramUnknown / plot.histogramSumX * 100);
            histogramAbsoluteX = plot.xAxisHistogramUnknown;

            histogramPercentageY = (histogramAbsoluteY / plot.histogramSumY * 100);

        }
    } else if (unknownRangeY) {
        // Disable overlay and end method if no unknown values exist.
        if (!plot.yAxisHistogramUnknown) {
            plot.dom.focus.style("display", "none");
            plot.dom.textFocus.style("display", "none");
            if (showHistograms) {
                plot.dom.yAxisHistogramFocus.style("display", "none");
                plot.dom.xAxisHistogramFocus.style("display", "none");
            }
            return;
        }
        if (plot.typeX === "categorical") {
            x0 = Math.floor(((plot.lengthAtt1 - 1 - 1) * (d3.mouse(this)[0] - plot.dom.cWidth * 0.1) / (plot.dom.cWidth * 0.9)));
            i = x0;
            histogramAbsoluteX = plot.histogramDataAtt1[i].y;
            d = datasetWrapper.datasetUnknownY[i].value;
        } else {
            x0 = plot.xAxisData.xScale.invert(d3.mouse(this)[0]);

            i = bisect(plot.binsAtt1, x0);
            if (i === 0) {
                i = 1;
            }
            histogramAbsoluteX = plot.histogramDataAtt1[i - 1 - 1].y;
            d = datasetWrapper.datasetUnknownY[i - 1 - 1].value;
        }

        fromX = datasetWrapper.dataset[(i - 1) * (plot.m - 1) - 1];
        toX = datasetWrapper.dataset[(i - 1) * (plot.m - 1)];

        histogramPercentageX = histogramAbsoluteX / plot.histogramSumX * 100;
        histogramPercentageY = (plot.yAxisHistogramUnknown / plot.histogramSumY * 100);
        histogramAbsoluteY = plot.yAxisHistogramUnknown;

    } else {
        if (plot.typeX === "categorical") {
            x0 = Math.floor(((plot.lengthAtt1 - 1 - 1) * (d3.mouse(this)[0] - plot.dom.cWidth * 0.1) / (plot.dom.cWidth * 0.9)));

            i = x0;

            if (plot.typeY === "categorical") {
                y0 = Math.floor(plot.m - 1 - (((plot.lengthAtt2 - 1 - 1) * d3.mouse(this)[1]) / (plot.dom.height * 0.9)));
                j = y0;

                histogramAbsoluteY = plot.histogramDataAtt2[j].y;
                histogramPercentageY = histogramAbsoluteY / plot.histogramSumY * 100;
                fromX = datasetWrapper.dataset[(i) * (plot.m - 1) + j];
                fromY = datasetWrapper.dataset[j - 1];
            } else {
                y0 = plot.yAxisData.yScale.invert(d3.mouse(this)[1]);
                j = bisect(plot.binsAtt2, y0);

                if (j === 0) {
                    j = 1;
                }

                if (j < plot.lengthAtt2) {
                    toY = datasetWrapper.dataset[j - 1];
                }

                histogramAbsoluteY = plot.histogramDataAtt2[j - 1 - 1].y;
                histogramPercentageY = histogramAbsoluteY / plot.histogramSumY * 100;
                fromX = datasetWrapper.dataset[(i) * (plot.m - 1) + j - 1 - 1];
                fromY = datasetWrapper.dataset[j - 1 - 1];
            }

            histogramAbsoluteX = plot.histogramDataAtt1[i].y;
            histogramPercentageX = histogramAbsoluteX / plot.histogramSumX * 100;

            d = fromX.value;
        } else if (plot.typeY === "categorical") {
            x0 = plot.xAxisData.xScale.invert(d3.mouse(this)[0]);
            y0 = Math.floor(plot.m - 1 - (((plot.lengthAtt2 - 1 - 1) * d3.mouse(this)[1]) / (plot.dom.height * 0.9)));
            i = bisect(plot.binsAtt1, x0);
            j = y0;

            if (i === 0) {
                i = 1;
            }

            fromY = datasetWrapper.dataset[j - 1];
            if (j < plot.lengthAtt2) {
                toY = datasetWrapper.dataset[j - 1];
            }

            fromX = datasetWrapper.dataset[(i - 1 - 1) * (plot.m - 1) + j];
            // Check if in added bin at the end
            if (i < plot.lengthAtt1) {
                toX = datasetWrapper.dataset[(i - 1) * (plot.m - 1) + j];
            }

            histogramAbsoluteX = plot.histogramDataAtt1[i - 1 - 1].y;
            histogramPercentageX = histogramAbsoluteX / plot.histogramSumX * 100;
            histogramAbsoluteY = plot.histogramDataAtt2[j].y;
            histogramPercentageY = histogramAbsoluteY / plot.histogramSumY * 100;

            d = fromX.value;
        } else {
            x0 = plot.xAxisData.xScale.invert(d3.mouse(this)[0]);
            y0 = plot.yAxisData.yScale.invert(d3.mouse(this)[1]);
            i = bisect(plot.binsAtt1, x0);
            j = bisect(plot.binsAtt2, y0);
            //i should never be 0
            if (i === 0) {
                i = 1;
            }
            if (j === 0) {
                j = 1;
            }

            fromX = datasetWrapper.dataset[(i - 1 - 1) * (plot.m - 1) + j - 1 - 1];
            // Check if in added bin at the end
            if (i < plot.lengthAtt1) {
                toX = datasetWrapper.dataset[(i - 1) * (plot.m - 1) + j - 1 - 1];
            }
            fromY = datasetWrapper.dataset[j - 1 - 1];
            if (j < plot.lengthAtt2) {
                toY = datasetWrapper.dataset[j - 1];
            }

            histogramAbsoluteX = plot.histogramDataAtt1[i - 1 - 1].y;
            histogramPercentageX = histogramAbsoluteX / plot.histogramSumX * 100;
            histogramAbsoluteY = plot.histogramDataAtt2[j - 1 - 1].y;
            histogramPercentageY = histogramAbsoluteY / plot.histogramSumY * 100;

            d = fromX.value;
        }
    }

    // Move dot to show current selected value.
    plot.dom.focus.attr("transform", "translate(" + d3.mouse(this)[0] + "," + d3.mouse(this)[1] + ")");
    if (showHistograms) {
        plot.dom.xAxisHistogramFocus.attr("transform", "translate(" + d3.mouse(this)[0] + "," + plot.yAxisData.yScaleHistogram(histogramAbsoluteX) + ")");
        plot.dom.yAxisHistogramFocus.attr("transform", "translate(" + plot.xAxisData.xScaleHistogram(histogramAbsoluteY) + "," + d3.mouse(this)[1] + ")");
    }

    // Move line to x-axis.
    plot.dom.focus.select("line.x")
        .attr("x1", 0)
        .attr("x2", -d3.mouse(this)[0])
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke", "black");

    // Move line to y-axis.
    plot.dom.focus.select("line.y")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", plot.dom.height - d3.mouse(this)[1])
        .attr("stroke", "black");

    if (showHistograms) {
        // Move line to x-axis on x-axis histogram.
        plot.dom.xAxisHistogramFocus.select("line.x")
            .attr("x1", 0)
            .attr("x2", -d3.mouse(this)[0])
            .attr("y1", 0)
            .attr("y2", 0)
            .attr("stroke", "black");

        // Move line to y-axis on x-axis histogram.
        plot.dom.xAxisHistogramFocus.select("line.y")
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", -plot.yAxisData.yScaleHistogram(histogramAbsoluteX))
            .attr("stroke", "black");

        // Move line to x-axis on y-axis histogram.
        plot.dom.yAxisHistogramFocus.select("line.x")
            .attr("x1", 0)
            .attr("x2", plot.xAxisData.xScaleHistogram(plot.maximumAtt2 * 1.03) - plot.xAxisData.xScaleHistogram(histogramAbsoluteY))
            .attr("y1", 0)
            .attr("y2", 0)
            .attr("stroke", "black");


        // Move line to y-axis on y-axis histogram.
        plot.dom.yAxisHistogramFocus.select("line.y")
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", plot.dom.height - d3.mouse(this)[1])
            .attr("stroke", "black");
    }

    // 4 different Types of Heatmaps exist. categorical x categorical, categorical x continuous, continuous x categorical, continuous x continuous.
    let featureNameX = plot.featureNameX.substring(0,70);
    let featureNameY = plot.featureNameY.substring(0,70);

    if (plot.typeX === "categorical") {
        if (unknownRangeX) {
            plot.mousemoveData.x.text(featureNameX + ": unknown");
        } else {
            plot.mousemoveData.x.text(featureNameX + ": " + datasetWrapper.dataset[(i * plot.m)].att1);
        }
        if (plot.typeY === "categorical") {
            if (unknownRangeY) {
                plot.mousemoveData.y.text(featureNameY + ": unknown");
            } else {
                plot.mousemoveData.y.text(featureNameY + ": " + datasetWrapper.dataset[j].att2);
            }
        } else {
            if (unknownRangeY) {
                plot.mousemoveData.y.text(featureNameY + ": unknown");
            } else {
                if (toY) {
                    plot.mousemoveData.y.text(featureNameY + ": [" + fromY.att2.toFixed(3) + ", " + toY.att2.toFixed(3) + ")");
                } else {
                    let value = plot.binsAtt2[plot.binsAtt2.length - 1]
                    plot.mousemoveData.y.text(featureNameY + ": [" + fromY.att2.toFixed(3) + ", " + value.toFixed(3) + "]");
                }
            }
        }
        plot.mousemoveData.risk.text("Risk: " + d.toFixed(3));
    } else if (plot.typeY === "categorical") {
        if (unknownRangeX) {
            plot.mousemoveData.x.text(featureNameX + ": unknown");
        } else {
            if (toX) {
                plot.mousemoveData.x.text(featureNameX + ": [" + fromX.att1.toFixed(3) + ", " + toX.att1.toFixed(3) + ")");
            } else {
                let value = plot.binsAtt1[plot.binsAtt1.length - 1]
                plot.mousemoveData.x.text(featureNameX + ": [" + fromX.att1.toFixed(3) + ", " + value.toFixed(3) + "]");
            }
        }
        if (unknownRangeY) {
            plot.mousemoveData.y.text(featureNameY + ": unknown");
        } else {
            plot.mousemoveData.y.text(featureNameY + ": " + datasetWrapper.dataset[j].att2);
        }
        plot.mousemoveData.risk.text("Risk: " + d.toFixed(3));
    } else {
        if (unknownRangeX) {
            plot.mousemoveData.x.text(featureNameX + ": unknown");
        } else {
            if (toX) {
                plot.mousemoveData.x.text(featureNameX + ": [" + fromX.att1.toFixed(3) + ", " + toX.att1.toFixed(3) + ")");
            } else {
                let value = plot.binsAtt1[plot.binsAtt1.length - 1]
                plot.mousemoveData.x.text(featureNameX + ": [" + fromX.att1.toFixed(3) + ", " + value.toFixed(3) + "]");
            }
        }
        if (unknownRangeY) {
            plot.mousemoveData.y.text(featureNameY + ": unknown");
        } else {
            if (toY) {
                plot.mousemoveData.y.text(featureNameY + ": [" + fromY.att2.toFixed(3) + ", " + toY.att2.toFixed(3) + ")");
            } else {
                let value = plot.binsAtt2[plot.binsAtt2.length - 1]
                plot.mousemoveData.y.text(featureNameY + ": [" + fromY.att2.toFixed(3) + ", " + value.toFixed(3) + "]");
            }
        }
        plot.mousemoveData.risk.text("Risk: " + d.toFixed(3));
    }
    if (showHistograms) {
        plot.mousemoveData.densityX.text("Density: " + histogramPercentageX.toFixed(2) + "% " + "(n=" + histogramAbsoluteX + ")");
        plot.mousemoveData.densityY.text("Density: " + histogramPercentageY.toFixed(2) + "% " + "(m=" + histogramAbsoluteY + ")");
    }

    // Change text position.
    let bbox = plot.mousemoveData.x.node().getBBox();
    let bbox2 = plot.mousemoveData.y.node().getBBox();
    let bbox3 = plot.mousemoveData.risk.node().getBBox();
    let bbox4;
    let bbox5;

    if (showHistograms) {
        bbox4 = plot.mousemoveData.densityX.node().getBBox();
        bbox5 = plot.mousemoveData.densityY.node().getBBox();
    } else {
        bbox4 = {width: 0, height: 0};
        bbox5 = {width: 0, height: 0};
    }

    const boxWidth = Math.max(bbox.width, bbox2.width, bbox3.width, bbox4.width, bbox5.width);

    // change text position if too far right
    const posX = d3.mouse(this)[0];
    let moveX;
    let moveY;
    if (posX > plot.dom.cWidth / 2 * 1.2) {
        moveX = 3;
    } else if (posX < plot.dom.cWidth / 2 * 0.8) {
        moveX = plot.dom.cWidth - boxWidth - 14;
    } else {
        moveX = curX;
    }
    curX = moveX;

    const boxHeight = bbox.height + bbox2.height + bbox3.height + bbox4.height + bbox5.height;
    // change text position if too high
    const posY = d3.mouse(this)[1];
    if (curY === 0) {
        if (posY < plot.dom.height / 2) {
            moveY = plot.dom.height - boxHeight - plot.dom.margin.bottom + 3;
        } else {
            moveY = 3;
        }
    } else {
        if (posY < plot.dom.height / 2 * 0.8) {
            moveY = plot.dom.height - boxHeight - plot.dom.margin.bottom + 3;

        } else if (posY > plot.dom.height / 2 * 1.2) {
            moveY = 3;
        } else {
            moveY = curY;
        }
    }
    curY = moveY;

    plot.mousemoveData.x.attr("y", bbox.height);
    plot.mousemoveData.densityX.attr("y", bbox4.height + bbox.height);
    plot.mousemoveData.y.attr("y", bbox3.height + bbox4.height + bbox.height);
    plot.mousemoveData.densityY.attr("y", bbox5.height + bbox3.height + bbox4.height + bbox.height);
    plot.mousemoveData.risk.attr("y", bbox5.height + bbox4.height + bbox3.height + bbox2.height + bbox.height);

    plot.dom.textFocus.transition()
        .ease(d3.easeLinear)
        .duration(50).attr("transform", "translate(" + moveX + "," + moveY + ")");

    bbox = plot.mousemoveData.x.node().getBBox();

    plot.dom.rect
        .attr("x", bbox.x - 3)
        .attr("y", bbox.y - 3)
        .attr("width", Math.max(bbox.width, bbox2.width, bbox3.width, bbox4.width, bbox5.width) + 6)
        .attr("height", boxHeight + 6);

}

/**
 * Converts color in rgb format into hex format.
 */
function rgbToHex(str) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = str;
    return ctx.fillStyle;
}

/**
 * Returns color closest to d.
 */
function getColor(d, plot) {
    const i = bisect(plot.heatmap.domainData, d);
    const difLeft = Math.abs(d) - Math.abs(plot.heatmap.domainData[i - 1]);
    const difRight = Math.abs(plot.heatmap.domainData[i]) - Math.abs(d);
    return difLeft < difRight ? plot.heatmap.hexColors[i - 1] : plot.heatmap.hexColors[i];
}

/**
 * Function to draw the heatmap.
 */
function drawHeatmap(plot, datasetWrapper) {
    const ctx = plot.dom.canvas.node().getContext("2d");
    ctx.clearRect(0, 0, plot.dom.cWidth, plot.dom.height);
    // Draw nodes of dataset (without unknown).
    datasetWrapper.dataset.forEach(function (d) {
        const rectHeight = RectHeight(d, plot);
        const posX = plot.xAxisData.xScale(d.att1);
        const posY = plot.yAxisData.yScale(d.att2) - rectHeight;
        const fill = getColor(d.value, plot);
        ctx.beginPath();
        ctx.rect(posX, posY, RectWidth(d, plot), rectHeight);
        ctx.fillStyle = fill;
        ctx.strokeStyle = fill;
        ctx.stroke();
        ctx.fill();
    });
    // Draw nodes of dataset with unknown y-value.
    datasetWrapper.datasetUnknownY.forEach(function (d) {
        const rectHeight = plot.dom.height * 0.1;
        const posX = plot.xAxisData.xScale(d.att1);
        const posY = plot.dom.height * 0.9;
        const fill = getColor(d.value, plot);
        ctx.beginPath();
        ctx.rect(posX, posY, RectWidth(d, plot), rectHeight);
        ctx.fillStyle = fill;
        ctx.strokeStyle = fill;
        ctx.stroke();
        ctx.fill();
    });
    // Draw nodes of dataset with unknown x-value.
    datasetWrapper.datasetUnknownX.forEach(function (d) {
        const rectHeight = RectHeight(d, plot);
        const posX = 0;
        const posY = plot.yAxisData.yScale(d.att2) - rectHeight;
        const fill = getColor(d.value, plot);
        ctx.beginPath();
        ctx.rect(posX, posY, plot.dom.cWidth * 0.1, rectHeight);
        ctx.fillStyle = fill;
        ctx.strokeStyle = fill;
        ctx.stroke();
        ctx.fill();
    });

    // Draw nodes of dataset with unknown x and y value.
    datasetWrapper.datasetUnknownXY.forEach(function (d) {
        const rectHeight = plot.dom.height * 0.1;
        const posX = 0;
        const posY = plot.dom.height * 0.9;
        const fill = getColor(d.value, plot);
        ctx.beginPath();
        ctx.rect(posX, posY, plot.dom.cWidth * 0.1, rectHeight);
        ctx.fillStyle = fill;
        ctx.strokeStyle = fill;
        ctx.stroke();
        ctx.fill();
    });

    // Draw line between unknown/not unknown values.
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.moveTo(plot.dom.cWidth * 0.1, 0);
    ctx.lineTo(plot.dom.cWidth * 0.1, plot.dom.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, plot.dom.height * 0.9);
    ctx.lineTo(plot.dom.cWidth, plot.dom.height * 0.9);
    ctx.stroke();
}

/**
 * Calculates Width of a data point.
 */
function RectWidth(d, plot) {
    if (plot.typeX === "categorical") {
        return plot.dom.width / (plot.lengthAtt1 - 1 - 1);
    }
    const index = Math.floor(d.index / plot.m);
    let dif;
    if (index < plot.binsAtt1.length - 1) {
        dif = Math.abs(plot.binsAtt1[index + 1] - plot.binsAtt1[index]);
    } else {
        dif = (1 / plot.lengthAtt1 * Math.abs(plot.binsAtt1[plot.lengthAtt1 - 1] - plot.binsAtt1[1])) * 5;
    }
    return (dif / plot.rangeAtt1 * plot.dom.cWidth) * 0.9;
}

/**
 * Calculates Height of a data point
 */
function RectHeight(d, plot) {
    if (plot.typeY === "categorical") {
        return plot.dom.height / (plot.lengthAtt2 - 1 - 1);
    }
    let dif;
    const index = d.index % plot.m;
    if (index < plot.binsAtt2.length - 1) {
        dif = Math.abs(plot.binsAtt2[(index + 1)] - plot.binsAtt2[(index)]);
    } else {
        dif = (1 / plot.lengthAtt2 * Math.abs(plot.binsAtt2[plot.lengthAtt2 - 1] - plot.binsAtt2[1])) * 5;
    }
    return (dif / plot.rangeAtt2 * plot.dom.height) * 0.9;
}

/**
 * Function to draw the legend.
 */
function drawLegend2D(plot) {
    const ctx = plot.dom.gradientCanvas.node().getContext("2d");
    // var k = d3.event ? d3.event.transform.k : 1;
    ctx.clearRect(0, 0, plot.dom.cWidth, plot.dom.height);

    plot.heatmap.hexColors.forEach(function (d, i) {
        const posX = 0;
        const posY = (plot.dom.gradientCanvasHeight / (plot.heatmap.hexColors.length - 1)) * ((plot.heatmap.hexColors.length - 1) - i);
        const fill = d;
        ctx.beginPath();
        ctx.rect(posX, posY, plot.dom.gradientCanvasWidth, plot.dom.gradientCanvasHeight / (plot.heatmap.hexColors.length - 1));
        ctx.fillStyle = fill;
        ctx.strokeStyle = fill;
        ctx.stroke();
        ctx.fill();
    });

    addLegendAxis2D(plot);
}

/**
 * Add axis to color legend.
 */
function addLegendAxis2D(plot) {
    let legendAxis = d3.scaleLinear()
        .domain([-plot.absoluteHighest, plot.absoluteHighest]);
    legendAxis.range([plot.dom.gradientCanvasHeight, 0]);

    plot.dom.gradientSvg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (plot.dom.gradientCanvasWidth / 2 + 15) + "," + (15 + plot.legendOffset) + ")")
        .call(d3.axisRight(legendAxis)
            .tickValues(
                legendAxis.ticks(9)
                    .concat(legendAxis.domain())
                    .filter(function (d, i) {
                        return (Math.abs(d) == plot.absoluteHighest || Math.abs(d) * 1.1 < plot.absoluteHighest);
                    }))
            .tickFormat(d3.format(",.2f")));


    plot.dom.gradientSvg.append("text")
        .classed("text", true)
        .attr("x", 0)
        .attr("y", plot.legendOffset / 2)
        .attr("dy", ".35em")
        .text("Risk");

    plot.dom.gradientSvg.append("text")
        .classed("text", true)
        .attr("x", 0)
        .attr("y", plot.legendOffset)
        .attr("dy", ".35em")
        .text("(log-odds)");
}

function drawPlotOverlay2D(plot, valueIndexAtt1, valueIndexAtt2) {


    let datasetAtt1 = d3.range(plot.lengthAtt1).map(function (d) {
        return {
            "att1": plot.binsAtt1[d],
        };
    });

    datasetAtt1 = datasetAtt1.slice(1).concat({"att1": plot.max[0][0]})

    let datasetAtt2 = d3.range(plot.lengthAtt2).map(function (d) {
        return {
            "att2": plot.binsAtt2[d],
        };
    });

    datasetAtt2 = datasetAtt2.slice(1).concat({"att2": plot.max[1][0]})

    let positionAtt1;

    // Test if input is unknown.
    if (datasetAtt1[0].x !== 0 && valueIndexAtt1 === "unknown") {
        positionAtt1 = plot.dom.cWidth * 0.05;
    } else {
        if (valueIndexAtt1 < 0) {
            console.log(1)
            positionAtt1 = (plot.xAxisData.xScale(datasetAtt1[0].att1) + plot.xAxisData.xScale(datasetAtt1[1].att1)) / 2;
        }
        else if (valueIndexAtt1 >= datasetAtt1.length - 1) {
            console.log(2)
            positionAtt1 = (plot.xAxisData.xScale(datasetAtt1[datasetAtt1.length-2].att1) + plot.xAxisData.xScale(datasetAtt1[datasetAtt1.length-1].att1)) / 2;
        } else {
            console.log(valueIndexAtt1, datasetAtt1[valueIndexAtt1], datasetAtt1[valueIndexAtt1+1])
            positionAtt1 = (plot.xAxisData.xScale(datasetAtt1[valueIndexAtt1].att1) + plot.xAxisData.xScale(datasetAtt1[valueIndexAtt1+1].att1)) / 2;
        }
    }


    let positionAtt2;
    if (datasetAtt2[0].x !== 0 && valueIndexAtt2 === "unknown") {
        positionAtt2 = plot.dom.height * 0.95;
    } else {
        if (valueIndexAtt2 < 0) {
            positionAtt2 = (plot.yAxisData.yScale(datasetAtt2[0].att2) + plot.yAxisData.yScale(datasetAtt2[1].att2)) / 2;
        } else if (valueIndexAtt2 >= datasetAtt2.length - 1) {
            positionAtt2 = (plot.yAxisData.yScale(datasetAtt2[datasetAtt2.length-2].att2) + plot.yAxisData.yScale(datasetAtt2[datasetAtt2.length-1].att2)) / 2;
        } else {
            positionAtt2 = (plot.yAxisData.yScale(datasetAtt2[valueIndexAtt2].att2) + plot.yAxisData.yScale(datasetAtt2[valueIndexAtt2+1].att2)) / 2;
        }
    }
    //console.log(datasetAtt2, valueIndexAtt2)

    plot.dom.svg.append("line")
        .attr("class", "line overlay-line" + valueIndexAtt1)
        .attr("id", plot.plotId + " x")
        .attr("x1", positionAtt1)
        .attr("x2", positionAtt1)
        .attr("y1", plot.dom.height)
        .attr("y2", 0)
        .attr("type", "2D")
        .attr("axis", "x")
        .attr("plotId", plot.plotId)
        .style("pointer-events", "none");

    plot.dom.svg.append("line")
        .attr("class", "line overlay-line" + valueIndexAtt2)
        .attr("id", plot.plotId + " y")
        .attr("x1", 0)
        .attr("x2", plot.dom.cWidth)
        .attr("y1", positionAtt2)
        .attr("y2", positionAtt2)
        .attr("plotId", plot.plotId)
        .attr("type", "2D")
        .attr("axis", "y")
        .style("pointer-events", "none");

    if (showHistograms) {
        plot.dom.xAxisHistogramSvg.append("line")
            .attr("class", "line overlay-line" + valueIndexAtt1)
            .attr("id", "histogram" + plot.plotId + " x")
            .attr("x1", positionAtt1)
            .attr("x2", positionAtt1)
            .attr("y1", (widthOffsetLeft * histogramSvgSizeMultiplier) - plot.dom.margin.outerLeft) // 40 = margin.top + margin.bottom
            .attr("y2", 0)
            .attr("type", "2D")
            .attr("axis", "x")
            .attr("plotId", plot.plotId)
            .style("pointer-events", "none");

        plot.dom.yAxisHistogramSvg.append("line")
            .attr("class", "line overlay-line" + valueIndexAtt2)
            .attr("id", "histogram" + plot.plotId + " y")
            .attr("x1", 0)
            .attr("x2", widthOffsetLeft * histogramSvgSizeMultiplier - plot.dom.margin.outerLeft)
            .attr("y1", positionAtt2)
            .attr("y2", positionAtt2)
            .attr("plotId", plot.plotId)
            .attr("type", "2D")
            .attr("axis", "y")
            .style("pointer-events", "none");
    }
}