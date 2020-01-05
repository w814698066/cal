
/**
 * 所有关卡配置
 */
export class LevelsConfig {
    protected cPath: string;
    public json: JSON;
    constructor(path: string) {
        this.cPath = path;
        Laya.loader.load(this.cPath, Laya.Handler.create(this, this.onLoaded));
    }
    protected onLoaded(): void {
        this.json = Laya.loader.getRes(this.cPath);
    }
}
