//Background Layer (Background&Ground)
var PlaySceneBgLayer = cc.Layer.extend({

    background: null,
    ground: null,

    ctor: function () {
        this._super();

        this.background = new cc.Sprite(i_BGPlaying);
        this.ground = new cc.Sprite('#MS_ground.png');
    },

    init: function () {
        this.background.setAnchorPoint(0, 0);
        this.background.setPosition(0, 0);
        this.addChild(this.background, 0);

        this.ground.setAnchorPoint(0, 0);
        this.ground.setPosition(0, 0);
        this.addChild(this.ground, 0);
    }
});

// Animation Layer (Animation elements)
var PlaySceneAniLayer = cc.Layer.extend({

    ground: null,

    building: null,
    role: null,
    obstacle: null,

    ctor: function (ground) {
        this._super();

        this.ground = ground;
        this.building = new Building();
        this.role = new Role();
        this.obstacle = new Obstacle();
    },

    init: function () {
        this._super();

        var size = cc.director.getWinSize();
        var width2 = Math.floor(size.width / 2);
        var height2 = Math.floor(size.height / 2);
        var groundHeight = this.ground.getContentSize().height;

        this.building.setAnchorPoint(0, 0);
        this.building.setPosition(0, groundHeight);
        this.addChild(this.building, 0);

        this.building.init();

        var rolePosX = width2 - 100;
        // 修正角色Y轴有效像素
        var rolePosY = groundHeight - 10;

        this.role.setAnchorPoint(0, 0);
        this.role.setPosition(rolePosX, rolePosY);
        this.addChild(this.role, 0);

        this.role.init();

        this.obstacle.setAnchorPoint(0, 0);
        this.obstacle.setPosition(0, 0);
        this.addChild(this.obstacle, 0);

        this.obstacle.init();

    },

    update: function (dt) {
        this.building.update(dt);
        this.role.update(dt);
        this.obstacle.update(dt);

    }
});

// UI Layer (Button, Label)
var PlaySceneUILayer = cc.Layer.extend({

    role: null,
    grade: null,

    touchListener: null,

    ctor: function (role) {
        this._super();


        this.role = role;
        this.grade = new cc.LabelTTF(v_PlayDistance, "Impact", 38);

    },

    init: function () {
        var size = cc.director.getWinSize();

        this.grade.setAnchorPoint(1, 1);
        this.grade.setPosition(size.width, size.height);
        this.addChild(this.grade, 0);

    },

    update: function () {
        this.grade.setString(v_Grade);
    },

    onEnter: function () {
        this._super();

        this.addTouchListener();
    },

    onExit: function () {
        this.removeTouchListener();
    },

    addTouchListener: function () {
        var self = this;
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

                v_PlayState = 1;

                self.role.run();

                return false;
            }
        });

        cc.eventManager.addListener(this.touchListener, this);

    },

    removeTouchListener: function () {
        cc.eventManager.removeListener(this.touchListener);
    }

});

var PlayScene = cc.Scene.extend({

    bgLayer: null,
    aniLayer: null,
    uiLayer: null,

    ctor: function () {
        this._super();

        this.bgLayer = new PlaySceneBgLayer();
        this.aniLayer = new PlaySceneAniLayer(this.bgLayer.ground);
        this.uiLayer = new PlaySceneUILayer(this.aniLayer.role);

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

        this.scheduleUpdate();
    },

    onExit: function () {

    },

    update: function (dt) {
        if (v_PlayState) {
            v_PlayDistance = v_PlayDistance + v_PlaySpeed;
            v_Grade = Math.floor(v_PlayDistance / 10);

            this.aniLayer.update(dt);
            this.uiLayer.update(dt);
        } else {

        }

    }
});
