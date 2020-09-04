import Cell from './Cell';

export default class Row {
    public static RowType: number = 1;
    public static RowDes: number = 2;
    public static RowField: number = 3;
    public static RowUser: number = 4;

    public id: number = 0;

    public Cells: Cell[] = [];


    public AddCell(cell: Cell) {
        this.Cells.push(cell);
    }
    
}