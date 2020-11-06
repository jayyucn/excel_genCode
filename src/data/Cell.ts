export default class Cell {
    public row: number;
    public column: number;

    public type: any;

    public value: any;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }
}