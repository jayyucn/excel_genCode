"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SheetData {
    constructor() {
        this.sheetName = "";
        this.filePath = "";
        this.cellMap = new Map();
        this.rowMap = new Map();
        this.columnMap = new Map();
    }
    AddCell(cell, bSort = false) {
        let row = cell.row;
        let col = cell.column;
        this.cellMap.set(`${row}-${col}`, cell);
        if (!this.rowMap.has(row)) {
            this.rowMap.set(row, []);
        }
        this.rowMap.get(row).push(cell);
        if (!this.columnMap.has(col)) {
            this.columnMap.set(col, []);
        }
        this.columnMap.get(col).push(cell);
        if (bSort) {
            this.rowMap.get(row).sort((a, b) => a.row - b.row);
            this.columnMap.get(col).sort((a, b) => a.column - b.column);
        }
    }
    getCellsByRow(row) {
        return this.rowMap.get(row);
    }
    getCellsByColumn(col) {
        return this.columnMap.get(col);
    }
    getCellValue(row, col) {
        return this.cellMap.get(`${row}-${col}`).value;
    }
    static Create(workSheet) {
        let data = new SheetData();
        data.sheetName = workSheet['sheetName'];
        data.filePath = workSheet['filePath'];
        return data;
    }
}
exports.default = SheetData;
