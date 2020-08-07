import nodeCmd from 'node-cmd';
import child_process from 'child_process';
import Logger from './Logger';

let exec = child_process.exec;

export enum EnumCmd {
    Pause = 'pause',
}


export default class Cmd {
    public static runCmd(cmd: string)
    {
        nodeCmd.get(
            cmd,
            function(err,data,stderr)
            {
                Logger.Info('[CMD]: \n',data);
            }
        );
        nodeCmd.run('ls');
    } 

    public static execute(cmd: string)
    {
        Logger.Info(`[CMD]: ${cmd}`);
        exec(cmd, (error,stdout,stdError)=>{
            Logger.Debug(`${stdout}`)
        }) 
    }

}
