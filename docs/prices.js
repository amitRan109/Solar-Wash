let faucetsPrice = [0, 200, 1500, 1600, 1700, 1800, 1900, 2250, 2350]

let silipusPrice = 400
let conditionerPrice = 7200

let pipePrice = 
[  //0, 16,  20,  25,  32, 40, 50
    [0,  0,   0,   0,   0,  0, 0], // 0  
    [0,  0, 140, 170, 311,  0, 0], // 4
    [0,  0, 110, 229, 311,  0, 0], // 6
    [0,  0,   0,   0,   0,  0, 0]  // 10
]

diamOfPipe = [16, 20, 25, 32, 40, 50]

sizeOfFaucet = [1/4, 1/3, 1/3, 1, 2]

var connectorType = [
    {val : '', text: ''},
    {val : 'pipe', text: 'צינור'},
    {val : 'faucet', text: 'ברז'},
];

diamOfPipeForSelection = [
    {},
    {val : 1, text: 16},
    {val : 2, text: 20},
    {val : 3, text: 25},
    {val : 4, text: 32},
    {val : 5, text: 40},
    {val : 6, text: 50},
];

sizeOfFaucetForSelection = [
    {},
    {val : 1, text: "1/4"},
    {val : 2, text: "1/3"},
    {val : 3, text: "1/2"},
    {val : 4, text: "1"},
    {val : 5, text: "2"},
];

let ACPrice = [0, 800, 1500, 1600, 1700, 1800, 1900, 2250, 2350]
let DCPrice = [0, 600, 1500, 1600, 1700, 1800, 1900, 2250, 2350]

// var workbook = XLSX.read('https://docs.google.com/spreadsheets/d/18rfGolDFo9qMDF0NS9pzESEcacVvjwQoPN_Khsp2AMk/edit#gid=0', {type: 'binary'});
