"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sheet_1 = __importDefault(require("../data/Sheet"));
const Row_1 = __importDefault(require("../data/Row"));
const Logger_1 = __importDefault(require("../Logger"));
class SheetReader {
    static Read(sheet) {
        this.Reset();
        let st = new Sheet_1.default(sheet);
        let range = this._getContentRange(sheet["!ref"]);
        st.rowCount = range.lastRow;
        st.columnCount = range.lastColumn;
        //读表头
        for (let column = 1; column <= range.lastColumn; column++) {
            let columnChar = this._convertNum2Code(column);
            let rowType = columnChar + Row_1.default.RowType;
            if (!sheet[rowType]) {
                Logger_1.default.Error(`${sheet.sheetName}表 ${Row_1.default.RowType}行，${columnChar}列，类型字段错误`);
            }
            this.typeMap.set(column, sheet[rowType].v);
            let rowDes = columnChar + Row_1.default.RowDes;
            this.desMap.set(column, sheet[rowDes].v);
            let filed = columnChar + Row_1.default.RowField;
            this.fieldMap.set(column, sheet[filed].v);
        }
        console.log("-------aaa-------", this.typeMap.values());
        //遍历cell
        for (let row = range.firstRow; row <= range.lastColumn; row++) {
        }
    }
    static Reset() {
        this.typeMap.clear();
        this.desMap.clear();
        this.fieldMap.clear();
    }
    /** 获取工作表的内容范围 */
    static _getContentRange(ref) {
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
exports.default = SheetReader;
/** 字段类型 */
SheetReader.typeMap = new Map();
/** 字段描述 */
SheetReader.desMap = new Map();
/** 字段名 */
SheetReader.fieldMap = new Map();
