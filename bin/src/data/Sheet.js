"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportSheet = void 0;
class Sheet {
    constructor(workSheet) {
        this.sheetName = "";
        this.rowCount = 0;
        this.columnCount = 0;
        this.sheetName = workSheet['sheetName'];
    }
}
exports.default = Sheet;
class ExportSheet extends Sheet {
    constructor() {
        super(...arguments);
        this.struct = "";
        this.structCN = "";
        this.field = "";
        this.type = "";
        this.cn = "";
    }
    static Create(workSheet, sheetName) {
        let sheet = new ExportSheet();
        sheet.sheetName = sheetName;
        Object.assign(sheet, workSheet);
        return sheet;
    }
}
exports.ExportSheet = ExportSheet;
