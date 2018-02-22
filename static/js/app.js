buildPie('BB_940');
buildBubble('BB_940');

var e = document.getElementById("selDataset");
var sample = e.options[e.selectedIndex].value;
// I learned about this e method from https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript


function optionChanged(sampleid) {
    console.log("SAMPLE " + sampleid);
    buildPie(sampleid);
    buildMeta(sampleid);
    buildBubble(sampleid);
    buildGauge(sampleid);
    buildTable(sampleid);
}

function buildPie(sample) {
    /* data route */
    var url = "/pie/"+sample+"/";
    Plotly.d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        console.log(data);
        var layout = {
            title: "Top Ten Bacteria",
            showlegend: true,
            height: 600,
            // width: 980,
        };
        Plotly.newPlot("pie", data, layout);
    });
}

function buildTable(sample) {
    var url = '/metadata/<sample>/';
    Plotly.d3.json(url, function (error,data) {
        if (error) return console.warn(error);
        console.log(data);
        var layout = {
            height:500,
        };
        Plotly.newPlot("plotly_table",data)
    });
}

function buildMeta (sample) {
    var url = '/metadata/' + sample+ '/';
    Plotly.d3.json(url, function(error,data){
        console.log(sample);
        console.log(data);
    })
}

// Bubble Chart
function buildBubble(sample) {
    /* data route */
    var url = "/samples/"+sample+"/";
    Plotly.d3.json(url, function (error, data) {
        if (error) return console.warn(error);
        console.log(data);
        var layout = {
            title: "Bubble Chart: Sample Value vs the OTU ID",
            showlegend: true,
            height: 600,
            // width: 980,
        };
        Plotly.newPlot("bubble-target", data, layout);
    });
}

// Gauge
function buildGauge(){
    // Enter a speed between 0 and 180
    var level = 90;

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
    x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'speed',
        text: level,
        hoverinfo: 'text+name'},
    { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6',
                '4-5', '3-4', '2-3', '1-2','0-1'],
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                            'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                            'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                            'rgba(255, 255, 255, 0)']},
    labels: ['8-9', '7-8', '6-7', '5-6','4-5', '3-4', '2-3', '1-2','0-1',''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];

    var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
            color: '850000'
        }
        }],
    title: 'Belly Button Washing Frequency:\nScrubs per Week',
    Speed: 0-100,
    height: 500,
    width: 500,
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);

}

