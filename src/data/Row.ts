import Cell from './Cell';

export default class Row {

    public id: number = 0;

    public Cells: Cell[] = [];


    public AddCell(cell: Cell) {
        this.Cells.push(cell);
    }
    
}