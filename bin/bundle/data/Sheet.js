"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportSheet = void 0;
class Sheet {
    constructor() {
        this.id = 0;
        this.sheetName = "";
    }
    static Create(workSheet, sheetName) {
        let sheet = new Sheet();
        sheet.sheetName = sheetName;
        workSheet["!ref"];
        Object.assign(sheet, workSheet);
        sheet._init();
        return sheet;
    }
    _init() {
        let ref = this['!ref'];
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
