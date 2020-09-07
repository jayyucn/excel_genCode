"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Row {
    constructor() {
        this.id = 0;
        this.Cells = [];
    }
    AddCell(cell) {
        this.Cells.push(cell);
    }
}
exports.default = Row;
Row.RowType = 1;
Row.RowDes = 2;
Row.RowField = 3;
Row.RowUser = 4;
