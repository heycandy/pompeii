/**
 * Created by likenan on 2018/1/12.
 */
//Background Layer (Background&Ground)
var RankingListBgLayer = cc.Layer.extend({

    background: null,

    ctor: function () {
        this._super();

        this.background = new cc.Sprite(i_BGTop);
    },

    init: function () {
        this.background.setAnchorPoint(0, 0);
        this.background.setPosition(0, 0);
        this.addChild(this.background, 0);
    }

});

// Animation Layer (Animation elements)
var RankingListAniLayer = cc.Layer.extend({

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
var RankingListUILayer = cc.Layer.extend({

    nameLabel: null,
    startBtn: null,
    topBtn: null,
    roleBtn: null,
    backBtn:null,

    ctor: function () {
        this._super();

        this.nameLabel = new cc.Sprite('#Game name.png');

        this.backBtn = new Button(
            'get back_UI.png', 'get back_UI_Hit.png',
            function () {

            }, function () {
                var homeSene = new HomeScene()

                cc.director.runScene(homeSene)
            }
        )
    },

    init: function () {
        var size = cc.director.getWinSize();

        this.backBtn.setAnchorPoint(1, 0);
        this.backBtn.setPosition(size.width - 1800, size.height - 100);
        this.addChild(this.backBtn, 0);

    },

    update: function () {

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {

    }

});

var RankingList = cc.Scene.extend({

    bgLayer: null,
    aniLayer: null,
    uiLayer: null,

    ctor: function () {
        this._super();

        this.bgLayer = new RankingListBgLayer();
        this.aniLayer = new RankingListAniLayer();
        this.uiLayer = new RankingListUILayer();

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


