export default class Path {
    static ReadTxt(path: string): string;
    static WriteTxt(path: string, content: string): void;
    static WriteJson(path: string, jsonString: any): void;
    static ReaddirSync(url: string): string[];
    static GetFGUIResList(resPath: string): string[];
    static Exists(path: string): boolean;
    static CreateDirectory(path: string): void;
    static GetDirectoryPath(path: string): string;
    static GetFileNameWithoutExtension(name: string): string;
    static GetExtension(name: string): string;
    static IsFile(path: string): boolean;
    static IsDirectory(path: string): boolean;
    static CheckPath(path: string, isFile?: boolean): void;
}
