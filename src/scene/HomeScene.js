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

    volcano: null,

    ctor: function () {
        this._super();

        this.volcano = new Volcano();
    },

    init: function () {
        this._super();

        var size = cc.director.getWinSize();

        this.volcano.setAnchorPoint(0, 1);
        this.volcano.setPosition(0, size.height);
        this.addChild(this.volcano, 0);

        this.volcano.init();

    },

    update: function (dt) {

    }
});

// UI Layer (Button, Label)
var HomeSceneUILayer = cc.Layer.extend({

    touchListener: null,

    ctor: function () {
        this._super();

    },

    init: function () {
        var size = cc.director.getWinSize();

    },

    update: function () {

    },

    onEnter: function () {
        this._super();

        this.addTouchListener();
    },

    onExit: function () {
        this.removeTouchListener();
    },

    addTouchListener: function () {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function () {
                cc.log('onTouchBegan');

                return true;
            },
            onTouchMoved: function () {
                cc.log('onTouchMoved');

                return true;
            },
            onTouchEnded: function () {
                cc.log('onTouchEnded');

                var nextScene = new PlayScene();
                // var transScene = new cc.TransitionMoveInR.create(1, nextScene);

                cc.director.runScene(nextScene);

                return false;
            }
        });

        cc.eventManager.addListener(this.touchListener, this);

    },

    removeTouchListener: function () {
        cc.eventManager.removeListener(this.touchListener);
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
