import Sheet from './data/Sheet';
import { ExportSheet } from './data/Sheet';
export default class ExcelManager {
    static configDir: string;
    static sheetList: Sheet[];
    static exportSheet: ExportSheet;
    static ReadExcels(path: string): void;
    static ExportJson(): void;
    static ExportTs(): void;
    static ExportPb(): void;
    static Copy2Client(fromPath: string, toPath: string): void;
}
