import XLSX from "xlsx"
export default class Sheet implements XLSX.WorkSheet
{
    id: number = 0;
    sheetName: string = "";
    static Create(workSheet: XLSX.WorkSheet,sheetName: string) {
        let sheet = new Sheet();
        sheet.sheetName = sheetName;
        workSheet["!ref"]
        Object.assign(sheet, workSheet);
        sheet._init()
        return sheet;
    }

    private _init() {
        let ref = this['!ref'];
    }

}

export class ExportSheet extends Sheet {
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