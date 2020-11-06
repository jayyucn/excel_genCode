import * as XLSX from "xlsx"
import Cell from './Cell';
export interface ContentRange {
    minColunm: number
    minRow: number
    maxColumn: number
    maxRow: number
}

export default class SheetData {
    sheetName: string = "";
    filePath: string = "";
    
    range: ContentRange;

    private cellMap: Map<string,Cell> = new Map<string,Cell>();
    private rowMap: Map<number,Cell[]> = new Map<number,Cell[]>();
    private columnMap: Map<number,Cell[]> = new Map<number,Cell[]>();

    public AddCell(cell: Cell, bSort: boolean = false) {
        let row = cell.row;
        let col = cell.column;
        this.cellMap.set(`${row}-${col}`, cell);
        if(!this.rowMap.has(row)) {
            this.rowMap.set(row, []);
        }
        this.rowMap.get(row).push(cell);
        if(!this.columnMap.has(col)) {
            this.columnMap.set(col,[]);
        }
        this.columnMap.get(col).push(cell);

        if(bSort) {
            this.rowMap.get(row).sort((a,b) => a.row - b.row);
            this.columnMap.get(col).sort((a,b) => a.column - b.column);
        }
    }
    
    public getCellsByRow(row: number) {
        return this.rowMap.get(row);
    }

    public getCellsByColumn(col: number) {
        return this.columnMap.get(col);
    }

    public getCellValue(row: number, col: number) {
        return this.cellMap.get(`${row}-${col}`).value;
    }

    static Create(workSheet: XLSX.WorkSheet) {
        let data = new SheetData();
        data.sheetName = workSheet['sheetName'];
        data.filePath = workSheet['filePath'];
        return data;
    }
}
