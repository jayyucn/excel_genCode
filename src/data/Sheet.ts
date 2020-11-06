import XLSX from "xlsx"
export default class Sheet
{
    sheetName: string = "";
    rowCount: number = 0;
    columnCount: number = 0;
    
    
    constructor(workSheet: XLSX.WorkSheet) {
        this.sheetName = workSheet['sheetName'];
    }
    

}

export class ExportSheet implements XLSX.WorkSheet {
    sheetName: string = "";
    public struct: string = "";
    public structCN: string = "";
    public field: string =  "";
    public type: string  =  "";
    public cn: string  = "";

    static Create(workSheet: XLSX.WorkSheet,sheetName: string)
    {
        let sheet = new ExportSheet();
        sheet.sheetName = sheetName;
        Object.assign(sheet,workSheet);
        return sheet;
    }



    
}

