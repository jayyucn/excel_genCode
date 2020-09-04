export declare enum LogLevel {
    Debug = 0,
    Info = 1,
    Warn = 2,
    Error = 3
}
export default class Logger {
    private static logLevel;
    static Debug(...args: any[]): void;
    static Info(...args: any[]): void;
    static Warn(...args: any[]): void;
    static Error(...args: any[]): void;
    static SetLogLevel(level: LogLevel): void;
    static GetLogLevel(): LogLevel;
}
