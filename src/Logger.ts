export enum LogLevel
{
    Debug = 0,
    Info = 1,
    Warn = 2,
    Error = 3
}

export default class Logger
{
    private static logLevel: LogLevel = LogLevel.Debug;

    public static Debug(...args)
    {
        if(Logger.logLevel > LogLevel.Debug)
        {
            return;
        }
        console.log.apply(this,args);
    }

    public static Info(...args)
    {
        if(Logger.logLevel > LogLevel.Info)
        {
            return;
        }
        console.log.apply(this,args);
    }

    public static Warn(...args)
    {
        if(Logger.logLevel > LogLevel.Warn)
        {
            return;
        }
        console.warn.apply(this,args);
    }

    public static Error(...args)
    {
        console.error.apply(this,args);
    }

    public static SetLogLevel(level: LogLevel)
    {
        Logger.logLevel = level;
    }

    public static GetLogLevel(): LogLevel
    {
        return Logger.logLevel;
    }
}