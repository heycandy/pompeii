/**
 * Created by likenan on 2018/1/12.
 */
/**
 * Created by likenan on 2018/1/12.
 */
//Background Layer (Background&Ground)
var ChooseRoleBgLayer = cc.Layer.extend({

    background: null,

    ctor: function () {
        this._super();

        this.background = new cc.Sprite(i_BGRole);
    },

    init: function () {
        this.background.setAnchorPoint(0, 0);
        this.background.setPosition(0, 0);
        this.addChild(this.background, 0);
    }

});

// Animation Layer (Animation elements)
var ChooseRoleAniLayer = cc.Layer.extend({

    volcano: null,
    role: null,

    ctor: function () {
        this._super();

        //this.volcano = new Volcano();
        //this.role = new Role();
    },

    init: function () {
        this._super();

        var size = cc.director.getWinSize();


    },

    update: function (dt) {

    }
});

// UI Layer (Button, Label)
var ChooseRoleUILayer = cc.Layer.extend({

    nameLabel: null,
    startBtn: null,
    topBtn: null,
    roleBtn: null,
    backBtn:null,

    ctor: function () {
        this._super();

        this.nameLabel = new cc.Sprite('#Game name.png');
        this.role1 = new cc.Sprite('#Role1.png');
        this.role2 = new cc.Sprite('#Role2.png');
        this.role3 = new cc.Sprite('#Role3.png');
        this.role4 = new cc.Sprite('#Role4.png');
        this.role5 = new cc.Sprite('#Role5.png');
        this.unlock = new cc.Sprite('#unlock.png');
        this.unlock1 = new cc.Sprite('#unlock.png');
        this.selected = new cc.Sprite('#Role pitch on.png');
        this.three = new cc.Sprite('#Three kilometers.png');

        this.backBtn = new Button(
            'get back_UI.png', 'get back_UI_Hit.png',
            function () {

            }, function () {
                var homeSene = new HomeScene()

                cc.director.runScene(homeSene)
            }
        );

        this.canUnlock = new Button(
            'Can unlock_UI.png', 'Can unlock_UI_Hit.png',
            function () {

            }, function () {
                cc.log('可解锁')
            }
        );
    },

    init: function () {
        var size = cc.director.getWinSize();

        this.backBtn.setAnchorPoint(1, 0);
        this.backBtn.setPosition(size.width - 1800, size.height - 100);
        this.addChild(this.backBtn, 0);

        this.role5.setAnchorPoint(1, 0);
        this.role5.setPosition(size.width - 20, size.height - 900);
        this.addChild(this.role5, 0);

        this.role2.setAnchorPoint(1, 0);
        this.role2.setPosition(size.width - 400, size.height - 900);
        this.addChild(this.role2, 0);

        this.role1.setAnchorPoint(1, 0);
        this.role1.setPosition(size.width - 800, size.height - 850);
        this.addChild(this.role1, 0);

        this.role3.setAnchorPoint(1, 0);
        this.role3.setPosition(size.width - 1200, size.height - 900);
        this.addChild(this.role3, 0);

        this.role4.setAnchorPoint(1, 0);
        this.role4.setPosition(size.width - 1600, size.height - 900);
        this.addChild(this.role4, 0);

        this.unlock.setAnchorPoint(1, 0);
        this.unlock.setPosition(size.width - 1650, size.height - 1000);
        this.addChild(this.unlock, 0);

        this.unlock1.setAnchorPoint(1, 0);
        this.unlock1.setPosition(size.width - 1250, size.height - 1000);
        this.addChild(this.unlock1, 0);

        this.selected.setAnchorPoint(1, 0);
        this.selected.setPosition(size.width - 860, size.height - 1000);
        this.addChild(this.selected, 0);

        this.canUnlock.setAnchorPoint(1, 0);
        this.canUnlock.setPosition(size.width - 420, size.height - 1050);
        this.addChild(this.canUnlock, 0);

        this.three.setAnchorPoint(1, 0);
        this.three.setPosition(size.width - 20, size.height - 1000);
        this.addChild(this.three, 0);

    },

    update: function () {

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {

    }

});

var ChooseRole = cc.Scene.extend({

    bgLayer: null,
    aniLayer: null,
    uiLayer: null,

    ctor: function () {
        this._super();

        this.bgLayer = new ChooseRoleBgLayer();
        this.aniLayer = new ChooseRoleAniLayer();
        this.uiLayer = new ChooseRoleUILayer();

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



