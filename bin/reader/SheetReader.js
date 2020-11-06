"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = __importDefault(require("../data/Cell"));
const SheetData_1 = __importDefault(require("../data/SheetData"));
var EnumSheetHead;
(function (EnumSheetHead) {
    EnumSheetHead[EnumSheetHead["TYPE"] = 1] = "TYPE";
    EnumSheetHead[EnumSheetHead["DES"] = 2] = "DES";
    EnumSheetHead[EnumSheetHead["FIELD"] = 3] = "FIELD";
    EnumSheetHead[EnumSheetHead["USER"] = 4] = "USER";
})(EnumSheetHead || (EnumSheetHead = {}));
class SheetReader {
    // /** 字段类型 */
    // private static typeMap: Map<number,any> = new Map<number,any>();
    // /** 字段描述 */
    // private static desMap: Map<number,any> = new Map<number,any>();
    // /** 字段名 */
    // private static fieldMap: Map<number,any> = new Map<number,any>();
    static Read(sheet) {
        // this.Reset();
        let st = SheetData_1.default.Create(sheet);
        let range = this._getContentRange(sheet["!ref"]);
        st.range = range;
        //读表头
        //遍历cell
        for (let row = range.minRow; row <= range.maxRow; row++) {
            for (let column = range.minColunm; column <= range.maxColumn; column++) {
                let cellKey = this._convertNum2Code(column) + row;
                let cell = new Cell_1.default(row, column);
                let rawCell = sheet[cellKey];
                cell.value = rawCell ? rawCell.v : 0;
                // if(st.sheetName.indexOf("Global") != -1) {
                // }
                // if(row <= 4) {
                //     let columnChar = this._convertNum2Code(column);
                //     let rowType = columnChar + EnumSheetHead.TYPE;
                //     if(!sheet[rowType]) {
                //         Logger.Error(`${sheet.sheetName}表 ${EnumSheetHead.TYPE}行，${columnChar}列，类型字段错误`);
                //     }
                //     if(EnumSheetHead.TYPE == row) {
                //         this.typeMap.set(column,cell.value);
                //     } else if(EnumSheetHead.DES == row) {
                //         this.desMap.set(column,cell.value);
                //     } else if(EnumSheetHead.FIELD == row) {
                //         this.fieldMap.set(column,cell.value);
                //     }
                // }else {
                //     cell.type = this.typeMap.get(column);
                // }
                let bSort = row == range.maxRow && column == range.maxColumn;
                st.AddCell(cell, bSort);
            }
        }
        return st;
    }
    static Reset() {
        // this.typeMap.clear();
        // this.desMap.clear();
        // this.fieldMap.clear();
    }
    /** 获取工作表的内容范围 */
    static _getContentRange(ref) {
        let list = ref.replace(":", "").split(/([0-9]+)/);
        let range = {};
        range.minColunm = this._convertCode2Num(list[0]);
        range.minRow = Number(list[1]);
        range.maxColumn = this._convertCode2Num(list[2]);
        range.maxRow = Number(list[3]);
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
