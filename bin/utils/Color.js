class Style {
}
class Color {
    static bold(txt) { return ""; }
    static dim(txt) { return ""; }
    static italic(txt) { return ""; }
    static underline(txt) { return ""; }
    static inverse(txt) { return ""; }
    static hidden(txt) { return ""; }
    static strikethrough(txt) { return ""; }
    static black(txt) { return ""; }
    static red(txt) { return ""; }
    static green(txt) { return ""; }
    static yellow(txt) { return ""; }
    static blue(txt) { return ""; }
    static magenta(txt) { return ""; }
    static cyan(txt) { return ""; }
    static white(txt) { return ""; }
    static gray(txt) { return ""; }
    static grey(txt) { return ""; }
    static brightRed(txt) { return ""; }
    static brightGreen(txt) { return ""; }
    static brightYellow(txt) { return ""; }
    static brightBlue(txt) { return ""; }
    static brightMagenta(txt) { return ""; }
    static brightCyan(txt) { return ""; }
    static brightWhite(txt) { return ""; }
    static bgBlack(txt) { return ""; }
    static bgRed(txt) { return ""; }
    static bgGreen(txt) { return ""; }
    static bgYellow(txt) { return ""; }
    static bgBlue(txt) { return ""; }
    static bgMagenta(txt) { return ""; }
    static bgCyan(txt) { return ""; }
    static bgWhite(txt) { return ""; }
    static bgGray(txt) { return ""; }
    static bgGrey(txt) { return ""; }
    static bgBrightRed(txt) { return ""; }
    static bgBrightGreen(txt) { return ""; }
    static bgBrightYellow(txt) { return ""; }
    static bgBrightBlue(txt) { return ""; }
    static bgBrightMagenta(txt) { return ""; }
    static bgBrightCyan(txt) { return ""; }
    static bgBrightWhite(txt) { return ""; }
    static blackBG(txt) { return ""; }
    static redBG(txt) { return ""; }
    static greenBG(txt) { return ""; }
    static yellowBG(txt) { return ""; }
    static blueBG(txt) { return ""; }
    static magentaBG(txt) { return ""; }
    static cyanBG(txt) { return ""; }
    static whiteBG(txt) { return ""; }
}
/**@internal */
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
    var style = {};
    style.begin = '\u001b[' + val[0] + 'm';
    style.end = '\u001b[' + val[1] + 'm';
    Color[key] = function (txt) {
        return style.begin + txt + style.end;
    };
});
console.log(Color.red(Color.bgBlue("hello")));
