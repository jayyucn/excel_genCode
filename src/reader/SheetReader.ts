import * as XLSX from 'xlsx';
import Sheet from '../data/Sheet';
import Row from '../data/Row';
import WorkSheet = XLSX.WorkSheet;

export default class SheetReader {

    /** 字段类型 */
    private static typeMap: Map<number,any> = new Map<number,any>();
    /** 字段描述 */
    private static desMap: Map<number,any> = new Map<number,any>();
    /** 字段名 */
    private static fieldMap: Map<number,any> = new Map<number,any>();
    
    public static Read(sheet: WorkSheet) {
        this.Reset();
        let st = new Sheet(sheet);
        let range = this._getContentRange(sheet["!ref"]);
        st.rowCount = range.lastRow;
        st.columnCount = range.lastColumn;
        //读表头
        for(let column = 1; column <= range.lastColumn; column++) {
            let rowType = this._convertNum2Code(Row.RowType)+column;
            sheet[rowType]

        }

        //遍历cell

        for(let row = range.firstRow; row <= range.lastColumn; row++) {
            
           
        }

    }

    private static Reset() {
        this.typeMap.clear();
        this.desMap.clear();
        this.fieldMap.clear();
    }
    
    /** 获取工作表的内容范围 */
    private static _getContentRange(ref: string): ContentRange
    {
        let list = ref.replace(":","").split(/([0-9]+)/);
        let range = <ContentRange> {};
        range.firstColunm = this._convertCode2Num(list[0]);
        range.firstRow = Number(list[1]);
        range.lastColumn = this._convertCode2Num(list[2]);
        range.lastRow = Number(list[3]);
        return range;
    }

    private static _convertCode2Num(str: string)
    {
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