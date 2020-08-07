const { default: ExcelReader } = require('./bundle/reader/ExcelReader');
const { runCmd, default: Cmd } = require('./bundle/Cmd');
require('./bundle/Cmd');
// ExcelReader.readExcel('test/Menu.xlsx');
// Cmd.execute('ls');
// runCmd('pause')

// console.log("This is %cMy stylish message", "color: yellow; font-style: italic; background-color: blue;padding: 2px");
// console.log('\u001b[31m\u001b[1m  Check \u001b[32mhttps://amitkumargupta.work \u001b[31m\u001b[1mfor more projects and contribution.\u001b[0m\n');



var styles = {};
module['exports'] = styles;

var codes = {
    reset: [0, 0],

    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],

    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    grey: [90, 39],

    brightRed: [91, 39],
    brightGreen: [92, 39],
    brightYellow: [93, 39],
    brightBlue: [94, 39],
    brightMagenta: [95, 39],
    brightCyan: [96, 39],
    brightWhite: [97, 39],

    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    bgGray: [100, 49],
    bgGrey: [100, 49],

    bgBrightRed: [101, 49],
    bgBrightGreen: [102, 49],
    bgBrightYellow: [103, 49],
    bgBrightBlue: [104, 49],
    bgBrightMagenta: [105, 49],
    bgBrightCyan: [106, 49],
    bgBrightWhite: [107, 49],

    // legacy styles for colors pre v1.0.0
    blackBG: [40, 49],
    redBG: [41, 49],
    greenBG: [42, 49],
    yellowBG: [43, 49],
    blueBG: [44, 49],
    magentaBG: [45, 49],
    cyanBG: [46, 49],
    whiteBG: [47, 49],

};

Object.keys(codes).forEach(function (key) {
    var val = codes[key];
    var style = styles[key] = [];
    style.open = '\u001b[' + val[0] + 'm';
    style.close = '\u001b[' + val[1] + 'm';
});
let style = styles.bgBlue;
console.log(style.open + 'hello' + style.close)
