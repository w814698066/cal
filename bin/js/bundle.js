(function () {
	'use strict';

	var REG = Laya.ClassUtils.regClass;
	var ui;
	(function (ui) {
	    var test;
	    (function (test) {
	        class gameUI extends Laya.Scene {
	            constructor() { super(); }
	            createChildren() {
	                super.createChildren();
	                this.loadScene("test/game");
	            }
	        }
	        test.gameUI = gameUI;
	        REG("ui.test.gameUI", gameUI);
	    })(test = ui.test || (ui.test = {}));
	})(ui || (ui = {}));

	class LevelsConfig {
	    constructor(path) {
	        this.cPath = path;
	        Laya.loader.load(this.cPath, Laya.Handler.create(this, this.onLoaded));
	    }
	    onLoaded() {
	        this.json = Laya.loader.getRes(this.cPath);
	    }
	}

	class configMgr {
	    constructor() {
	        this._levels = null;
	        this._cfgPath = [
	            "res/data/001.json"
	        ];
	        configMgr._instance = this;
	        this._levels = new LevelsConfig(this._cfgPath[0]);
	    }
	    static get instance() {
	        return configMgr._instance;
	    }
	    getLevel(num) {
	        return this._levels.json[num.toString()];
	    }
	}
	configMgr._instance = null;

	class GameUI extends ui.test.gameUI {
	    constructor() {
	        super();
	        this.level = 1;
	    }
	    onEnable() {
	        console.log("ready");
	        console.log(configMgr.instance.getLevel(1));
	        this.gameStart();
	    }
	    gameStart() {
	        this.initTimu();
	    }
	    initTimu() {
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
	    checkchoose(ans) {
	        if (ans == this.answer) {
	            console.log("yes");
	            this.showTip("答对啦!");
	        }
	        else {
	            this.showTip("回答错误!!!");
	        }
	    }
	    showTip(a) {
	        this.tip.visible = true;
	        this.tiplab.text = a;
	        Laya.timer.once(1500, this, this.hhh);
	    }
	    hhh() {
	        Laya.Tween.to(this.tip, {
	            y: this.tip.y - 100,
	            alpha: 0
	        }, 1200, Laya.Ease.circOut, Laya.Handler.create(this, this.onMoveFinished));
	    }
	    onMoveFinished() {
	        this.tip.alpha = 1;
	        this.tip.y += 100;
	        this.tip.visible = false;
	        this.level++;
	        if (this.level > 10) {
	            this.level = 1;
	        }
	        this.initTimu();
	    }
	}

	class GameConfig {
	    constructor() {
	    }
	    static init() {
	        var reg = Laya.ClassUtils.regClass;
	        reg("script/GameUI.ts", GameUI);
	    }
	}
	GameConfig.width = 750;
	GameConfig.height = 1334;
	GameConfig.scaleMode = "fixedwidth";
	GameConfig.screenMode = "none";
	GameConfig.alignV = "middle";
	GameConfig.alignH = "center";
	GameConfig.startScene = "test/game.scene";
	GameConfig.sceneRoot = "";
	GameConfig.debug = false;
	GameConfig.stat = false;
	GameConfig.physicsDebug = false;
	GameConfig.exportSceneToJson = true;
	GameConfig.init();

	class Main {
	    constructor() {
	        if (window["Laya3D"])
	            Laya3D.init(GameConfig.width, GameConfig.height);
	        else
	            Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
	        Laya["Physics"] && Laya["Physics"].enable();
	        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
	        Laya.stage.scaleMode = GameConfig.scaleMode;
	        Laya.stage.screenMode = GameConfig.screenMode;
	        Laya.stage.alignV = GameConfig.alignV;
	        Laya.stage.alignH = GameConfig.alignH;
	        Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
	        if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
	            Laya.enableDebugPanel();
	        if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
	            Laya["PhysicsDebugDraw"].enable();
	        if (GameConfig.stat)
	            Laya.Stat.show();
	        Laya.alertGlobalError = true;
	        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	    }
	    onVersionLoaded() {
	        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	    }
	    onConfigLoaded() {
	        new configMgr();
	        GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
	    }
	}
	new Main();

}());
