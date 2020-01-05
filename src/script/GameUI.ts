import { ui } from "./../ui/layaMaxUI";
import { configMgr } from "./configMgr";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.gameUI {
    // private firnum: number;
    // private secnum: number;
    private answer: string;
    private chooseans: string;
    private level: number = 1;

    constructor() {
        super();
    }

    onEnable(): void {
        console.log("ready");
        console.log(configMgr.instance.getLevel(1));

        this.gameStart();
    }
    private gameStart() {
        this.initTimu();

    }

    private initTimu() {
        let a = configMgr.instance.getLevel(this.level);
        this.timu.text = a.name;
        this.num1.text = a.ans["A"];
        this.num2.text = a.ans["B"];
        this.num3.text = a.ans["C"];
        this.num4.text = a.ans["D"];
        this.answer = a.cre;

        this.ans1.off(Laya.Event.CLICK, this, this.checkchoose);
        this.ans2.off(Laya.Event.CLICK, this, this.checkchoose);
        this.ans3.off(Laya.Event.CLICK, this, this.checkchoose);
        this.ans4.off(Laya.Event.CLICK, this, this.checkchoose);
        this.ans1.on(Laya.Event.CLICK, this, this.checkchoose, ["A"]);
        this.ans2.on(Laya.Event.CLICK, this, this.checkchoose, ["B"]);
        this.ans3.on(Laya.Event.CLICK, this, this.checkchoose, ["C"]);
        this.ans4.on(Laya.Event.CLICK, this, this.checkchoose, ["D"]);
    }

    private checkchoose(ans: String) {
        if (ans == this.answer) {
            console.log("yes");
            this.showTip("答对啦!")
            
        }
        else {
            this.showTip("回答错误!!!")

        }
    }
    private showTip(a: string) {
        this.tip.visible = true;
        this.tiplab.text = a;
        Laya.timer.once(1500, this, this.hhh)
    }
    private hhh() {
        Laya.Tween.to(this.tip,
            {
                y: this.tip.y - 100,
                alpha: 0
            },
            1200,
            Laya.Ease.circOut,
            Laya.Handler.create(this, this.onMoveFinished));
    }
    private onMoveFinished() {
        this.tip.alpha = 1;
        this.tip.y += 100;
        this.tip.visible = false;


        this.level++;
        if(this.level>10){
            this.level=1;
        }

        this.initTimu();
    }

}