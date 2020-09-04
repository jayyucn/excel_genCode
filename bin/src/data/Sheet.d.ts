import XLSX from "xlsx";
export default class Sheet implements XLSX.WorkSheet {
    id: number;
    sheetName: string;
    static Create(workSheet: XLSX.WorkSheet, sheetName: string): Sheet;
    private _init;
}
export declare class ExportSheet extends Sheet {
    struct: string;
    structCN: string;
    field: string;
    type: string;
    cn: string;
    static Create(workSheet: XLSX.WorkSheet, sheetName: string): ExportSheet;
}
