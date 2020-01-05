import { LevelsConfig } from "./LevelsConfig";

export class configMgr {
    private static _instance: configMgr = null;
    public static get instance(): configMgr {
        return configMgr._instance;
    }
    public _levels: LevelsConfig = null;
    private _cfgPath = [
        "res/data/001.json"
    ];

    constructor() {
        configMgr._instance = this;
        this._levels = new LevelsConfig(this._cfgPath[0]);
    }

    public getLevel(num: number): any {
        return this._levels.json[num.toString()];
    }


    // public getNum(num: number): number {
    //     return this._levels;
    // }
}