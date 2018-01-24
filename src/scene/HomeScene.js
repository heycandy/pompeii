//Background Layer (Background&Ground)
var HomeSceneBgLayer = cc.Layer.extend({

    background: null,

    ctor: function () {
        this._super();

        this.background = new cc.Sprite(i_BGHome);
    },

    init: function () {
        this.background.setAnchorPoint(0, 0);
        this.background.setPosition(0, 0);
        this.addChild(this.background, 0);
    }

});

// Animation Layer (Animation elements)
var HomeSceneAniLayer = cc.Layer.extend({

    // volcano: null,
    role: null,

    ctor: function () {
        this._super();

        // this.volcano = new Volcano();
        this.role = new Role();
    },

    init: function () {
        this._super();

        var size = cc.director.getWinSize();

        // this.volcano.setAnchorPoint(0, 1);
        // this.volcano.setPosition(0, size.height);
        //this.addChild(this.volcano, 0);

        // this.volcano.init();

        this.role.setAnchorPoint(0, 0);
        this.role.setPosition(300, 0);
        this.addChild(this.role, 0);

        this.role.init();

    },

    update: function (dt) {

    }
});

// UI Layer (Button, Label)
var HomeSceneUILayer = cc.Layer.extend({

    nameLabel: null,
    startBtn: null,
    topBtn: null,
    roleBtn: null,

    ctor: function () {
        this._super();

        this.nameLabel = new cc.Sprite(i_GameName);
        this.startBtn = new Button(
            'Start game_ui.png', 'Start game_ui_Hit.png',
            function () {

            }, function () {
                var nextScene = new PlayScene();

                cc.director.runScene(nextScene);
            }
        );

        this.topBtn = new Button(
            'TOP_UI.png', 'TOP_UI_Hit.png',
            function () {

            }, function () {
                var rankingList = new RankingList();

                cc.director.runScene(rankingList)
            }
        );

        this.roleBtn = new Button(
            'Role_UI.png', 'Role_UI_Hit.png',
            function () {

            }, function () {
                var chooseRole = new ChooseRole();

                cc.director.runScene(chooseRole)
            }
        );
    },

    init: function () {
        var size = cc.director.getWinSize();
        this.nameLabel.setAnchorPoint(0, 0);
        this.nameLabel.setPosition(0, 0);
        this.addChild(this.nameLabel, 0);

        this.startBtn.setAnchorPoint(1, 1);
        this.startBtn.setPosition(size.width - 60, 500);
        this.addChild(this.startBtn, 0);

        this.topBtn.setAnchorPoint(1, 1);
        this.topBtn.setPosition(size.width - 60, 400);
        this.addChild(this.topBtn, 0);

        this.roleBtn.setAnchorPoint(1, 1);
        this.roleBtn.setPosition(size.width - 60, 300);
        this.addChild(this.roleBtn, 0);



    },

    update: function () {

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {

    }

});

var HomeScene = cc.Scene.extend({

    bgLayer: null,
    aniLayer: null,
    uiLayer: null,

    ctor: function () {
        this._super();

        this.bgLayer = new HomeSceneBgLayer();
        this.aniLayer = new HomeSceneAniLayer();
        this.uiLayer = new HomeSceneUILayer();

    },

    onEnter: function () {
        this._super();

        this.addChild(this.bgLayer, c_ZORDER_BOTTOM);
        this.addChild(this.aniLayer, c_ZORDER_MID);
        this.addChild(this.uiLayer, c_ZORDER_TOP);

        this.bgLayer.init();
        this.aniLayer.init();
        this.uiLayer.init();

        this.bgLayer.bake();
        this.aniLayer.bake();
    },

    update: function (dt) {

    }
});
