export declare enum EnumCmd {
    Pause = "pause"
}
export default class Cmd {
    static runCmd(cmd: string): void;
    static execute(cmd: string): void;
}
