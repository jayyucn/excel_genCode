import XLSX from 'xlsx'
import FS from 'fs'
import Sheet, {ExportSheet} from '../data/Sheet';
import Logger from '../Logger';
import Path from '../Path';
import * as OS from 'os'

export default class ExcelReader {

    static readExcel(filePath: string): Sheet[] {
        let workbook = XLSX.readFile(filePath);
        for(let sheetName of workbook.SheetNames) {
            if(sheetName.startsWith('_'))
                continue;
            let workSheet = workbook.Sheets[sheetName];
            let range = this.handleRef(workSheet["!ref"]);
            for(let row = range.firstRow; row <= range.lastColumn; row++) {
                if(row == 1){
                }
            }
            
            let str  = JSON.stringify(workSheet)
            console.log('=================',str);
            Path.WriteJson('./bin/test.json', str)
            
        }
        return [];
    }

    static readExportExcel(filePath: string) {
        let workbook = XLSX.readFile(filePath);
        if(!workbook)
            Logger.Error(`${__dirname}:: ${__filename}: file ${filePath} not exist!!!`);

        if(workbook && workbook.SheetNames && workbook.SheetNames.length > 0) {
            let sheetName = workbook.SheetNames[0];
            let workSheet = workbook.Sheets[sheetName];
            let sheet: ExportSheet = ExportSheet.Create(workSheet, sheetName);
            return sheet;
        }
        Logger.Error(`${__dirname}:: ${__filename}: Read ${filePath} failed!!!`);
        return null;
    }


    private static isSheetNameCorrect(sheetName: string): boolean {
        let reg = /([A-Z][a-z]+)+/g
        if(sheetName.match(reg))
            return true
        return false
    }

    private getCellValue(row: number, column: number) {

    }


    private static handleRef(ref: string): ContentRange {
        let list = ref.replace(":","").split(/([0 - 9] +) /);
        let range = <ContentRange>{};
        range.firstColunm = this._convertCode2Num(list[0]);
        range.firstRow = Number(list[1]);
        range.lastColumn = this._convertCode2Num(list[2]);
        range.lastRow = Number(list[3]);
        return range;
    }

    private static _convertCode2Num(str: string) {
        let n = 0;
        var s = str.match(/./g);//求出字符数组
        var j = 0;
        for(var i = str.length - 1,j = 1;i >= 0;i--,j *= 26)
        {
            var c = s[i].toUpperCase();
            if(c < 'A' || c > 'Z')
                return 0;
            n += (c.charCodeAt(0) - 64) * j;
        }
        return n;
    }

    private static _convertNum2Code(num: number)
    {
        var str = "";
        while(num > 0)
        {
            var m = num % 26;
            if(m == 0)
                m = 26;
            str = String.fromCharCode(m + 64) + str;
            num = (num - m) / 26;
        }
        return str;
    }

}

interface ContentRange
{
    firstColunm: number
    firstRow: number
    lastColumn: number
    lastRow: number
}