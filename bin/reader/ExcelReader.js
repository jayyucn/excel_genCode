"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const XLSX = __importStar(require("xlsx"));
const Logger_1 = __importDefault(require("../Logger"));
const Path_1 = __importDefault(require("../Path"));
const SheetReader_1 = __importDefault(require("./SheetReader"));
const DataManager_1 = __importDefault(require("../DataManager"));
class ExcelReader {
    static readExcel(filePath) {
        Logger_1.default.Info(`reading...${filePath}`);
        let workbook = XLSX.readFile(filePath);
        for (let sheetName of workbook.SheetNames) {
            if (sheetName.startsWith('_'))
                continue;
            if (!this.isSheetNameCorrect(sheetName)) {
                Logger_1.default.Error(`${filePath}: ${sheetName}页签名错误`);
            }
            let tmpSheet = DataManager_1.default.GetSheet(sheetName);
            if (tmpSheet) {
                Logger_1.default.Error(`${filePath}: ${sheetName}页签名重复\n ${tmpSheet.filePath}: ${tmpSheet.sheetName}`);
            }
            let workSheet = workbook.Sheets[sheetName];
            sheetName = this.correctSheetNameCase(sheetName);
            Object.defineProperty(workSheet, 'sheetName', {
                value: sheetName,
                writable: false
            });
            Object.defineProperty(workSheet, 'filePath', {
                value: filePath,
                writable: false
            });
            let sheetData = SheetReader_1.default.Read(workSheet);
            DataManager_1.default.AddSheet(sheetData);
            // this.workSheetMap.set(sheetName, workSheet);
            // workSheet
            // let range = this.handleRef(workSheet["!ref"]);
            // for(let row = range.firstRow; row <= range.lastColumn; row++) {
            //     if(row == 1){
            //     }
            // }
            // let str = JSON.stringify(workSheet)
            // console.log('=================',str);
            // Path.WriteJson('./bin/test.json', str)
        }
        return [];
    }
    static readExportExcel(filePath) {
        if (!Path_1.default.IsFile(filePath)) {
            Logger_1.default.Error(`ExportSetting.xlsx 路径错误：${filePath}`);
            return null;
        }
        let workbook = XLSX.readFile(filePath);
        if (!workbook) {
            Logger_1.default.Error(`${__dirname}:: ${__filename}: file ${filePath} not exist!!!`);
            return null;
        }
        if (workbook && workbook.SheetNames && workbook.SheetNames.length > 0) {
            let sheetName = workbook.SheetNames[0];
            let workSheet = workbook.Sheets[sheetName];
            Object.defineProperty(workSheet, 'sheetName', {
                value: sheetName,
                writable: false
            });
            Object.defineProperty(workSheet, 'filePath', {
                value: filePath,
                writable: false
            });
            DataManager_1.default.setExportSheet(SheetReader_1.default.Read(workSheet));
        }
        Logger_1.default.Error(`${__dirname}:: ${__filename}: Read ${filePath} failed!!!`);
        return null;
    }
    static isSheetNameCorrect(sheetName) {
        let reg = /[a-zA-Z]*/g;
        if (sheetName.match(reg))
            return true;
        return false;
    }
    static correctSheetNameCase(sheetName) {
        return sheetName.substr(0, 1).toUpperCase() + sheetName.substring(1);
    }
    getCellValue(row, column) {
    }
    static handleRef(ref) {
        let list = ref.replace(":", "").split(/([0-9]+)/);
        let range = {};
        range.firstColunm = this._convertCode2Num(list[0]);
        range.firstRow = Number(list[1]);
        range.lastColumn = this._convertCode2Num(list[2]);
        range.lastRow = Number(list[3]);
        return range;
    }
    static _convertCode2Num(str) {
        let n = 0;
        var s = str.match(/./g); //求出字符数组
        var j = 0;
        for (var i = str.length - 1, j = 1; i >= 0; i--, j *= 26) {
            var c = s[i].toUpperCase();
            if (c < 'A' || c > 'Z')
                return 0;
            n += (c.charCodeAt(0) - 64) * j;
        }
        return n;
    }
    static _convertNum2Code(num) {
        var str = "";
        while (num > 0) {
            var m = num % 26;
            if (m == 0)
                m = 26;
            str = String.fromCharCode(m + 64) + str;
            num = (num - m) / 26;
        }
        return str;
    }
}
exports.default = ExcelReader;
ExcelReader.workSheetMap = new Map();
