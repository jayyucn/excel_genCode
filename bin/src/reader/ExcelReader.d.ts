import Sheet, { ExportSheet } from '../data/Sheet';
export default class ExcelReader {
    static readExcel(filePath: string): Sheet[];
    private getWorkSheet;
    static readExportExcel(filePath: string): ExportSheet;
    private static isSheetNameCorrect;
    private getCellValue;
    private static handleRef;
    private static _convertCode2Num;
    private static _convertNum2Code;
}
