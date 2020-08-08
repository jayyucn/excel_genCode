class Style
{
    begin: string;
    end: string;
}

class Color {
    static bold(txt: string): string{ return ""}
    static dim(txt: string): string{ return ""}
    static italic(txt: string): string{ return ""}
    static underline(txt: string): string{ return ""}
    static inverse(txt: string): string{ return ""}
    static hidden(txt: string): string{ return ""}
    static strikethrough(txt: string): string{ return ""}
    static black(txt: string): string{ return ""}
    static red(txt: string): string{ return ""}
    static green(txt: string): string{ return ""}
    static yellow(txt: string): string{ return ""}
    static blue(txt: string): string{ return ""}
    static magenta(txt: string): string{ return ""}
    static cyan(txt: string): string{ return ""}
    static white(txt: string): string{ return ""}
    static gray(txt: string): string{ return ""}
    static grey(txt: string): string{ return ""}
    static brightRed(txt: string): string{ return ""}
    static brightGreen(txt: string): string{ return ""}
    static brightYellow(txt: string): string{ return ""}
    static brightBlue(txt: string): string{ return ""}
    static brightMagenta(txt: string): string{ return ""}
    static brightCyan(txt: string): string{ return ""}
    static brightWhite(txt: string): string{ return ""}
    static bgBlack(txt: string): string{ return ""}
    static bgRed(txt: string): string{ return ""}
    static bgGreen(txt: string): string{ return ""}
    static bgYellow(txt: string): string{ return ""}
    static bgBlue(txt: string): string{ return ""}
    static bgMagenta(txt: string): string{ return ""}
    static bgCyan(txt: string): string{ return ""}
    static bgWhite(txt: string): string{ return ""}
    static bgGray(txt: string): string{ return ""}
    static bgGrey(txt: string): string{ return ""}
    static bgBrightRed(txt: string): string{ return ""}
    static bgBrightGreen(txt: string): string{ return ""}
    static bgBrightYellow(txt: string): string{ return ""}
    static bgBrightBlue(txt: string): string{ return ""}
    static bgBrightMagenta(txt: string): string{ return ""}
    static bgBrightCyan(txt: string): string{ return ""}
    static bgBrightWhite(txt: string): string{ return ""}
    static blackBG(txt: string): string{ return ""}
    static redBG(txt: string): string{ return ""}
    static greenBG(txt: string): string{ return ""}
    static yellowBG(txt: string): string{ return ""}
    static blueBG(txt: string): string{ return ""}
    static magentaBG(txt: string): string{ return ""}
    static cyanBG(txt: string): string{ return ""}
    static whiteBG(txt: string): string{ return ""}
}

/**@internal */
var codes = {
    reset: [0,0],

    bold: [1,22],
    dim: [2,22],
    italic: [3,23],
    underline: [4,24],
    inverse: [7,27],
    hidden: [8,28],
    strikethrough: [9,29],

    black: [30,39],
    red: [31,39],
    green: [32,39],
    yellow: [33,39],
    blue: [34,39],
    magenta: [35,39],
    cyan: [36,39],
    white: [37,39],
    gray: [90,39],
    grey: [90,39],

    brightRed: [91,39],
    brightGreen: [92,39],
    brightYellow: [93,39],
    brightBlue: [94,39],
    brightMagenta: [95,39],
    brightCyan: [96,39],
    brightWhite: [97,39],

    bgBlack: [40,49],
    bgRed: [41,49],
    bgGreen: [42,49],
    bgYellow: [43,49],
    bgBlue: [44,49],
    bgMagenta: [45,49],
    bgCyan: [46,49],
    bgWhite: [47,49],
    bgGray: [100,49],
    bgGrey: [100,49],

    bgBrightRed: [101,49],
    bgBrightGreen: [102,49],
    bgBrightYellow: [103,49],
    bgBrightBlue: [104,49],
    bgBrightMagenta: [105,49],
    bgBrightCyan: [106,49],
    bgBrightWhite: [107,49],

    // legacy styles for colors pre v1.0.0
    blackBG: [40,49],
    redBG: [41,49],
    greenBG: [42,49],
    yellowBG: [43,49],
    blueBG: [44,49],
    magentaBG: [45,49],
    cyanBG: [46,49],
    whiteBG: [47,49],

};

Object.keys(codes).forEach(function(key) {
    var val = codes[key];
    var style =  <Style>{};
    style.begin = '\u001b[' + val[0] + 'm';
    style.end = '\u001b[' + val[1] + 'm';
    Color[key]  = function (txt: string): string {
        return style.begin + txt + style.end;
    }
});
console.log(Color.red(Color.bgBlue("hello")))