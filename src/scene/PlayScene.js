//Background Layer (Background&Ground)
var PlaySceneBgLayer = cc.Layer.extend({

    background: null,
    ground: null,
    anwser: null,

    ctor: function () {
        this._super();

        this.background = new cc.Sprite(i_BGPlaying);
        this.ground = new cc.Sprite('#Ms_Ground.png');

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

// trees
var TreesAniLayer = cc.Layer.extend({
    trees: null,
    ctor: function () {
        this._super();
        this.trees = new Trees()

    },
    init: function () {
        var size = cc.director.getWinSize();
        this._super();
        // trees
        this.trees.setAnchorPoint(0, 0);
        this.trees.setPosition(size.width - 1200, 0);
        this.addChild(this.trees, 0);
        this.trees.init();
    },

    update: function (dt) {
        this.trees.update(dt)
    }
});

// Animation Layer (Animation elements)
var PlaySceneAniLayer = cc.Layer.extend({

    _ground: null,

    building: null,
    role: null,
    obstacle: null,

    ctor: function (ground) {
        this._super();

        this._ground = ground;

        this.building = new Building();
        this.trees = new Trees()
        this.role = new Role();
        this.obstacle = new Obstacle(this.role, function (obstacle, role) {
            //TODO on collided
            //role.die()

        });
    },

    init: function () {
        this._super();

        var groundHeight = this._ground.getContentSize().height;

        // building
        this.building.setAnchorPoint(0, 0);
        this.building.setPosition(0, groundHeight);
        this.addChild(this.building, 0);
        this.building.init();


        // 修正角色Y轴有效像素
        var rolePosY = groundHeight - 10;

        this.role.setAnchorPoint(0, 0);
        this.role.setPosition(300, rolePosY);
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
        this.trees.update(dt)

    }
});

// UI Layer (Button, Label)
var PlaySceneUILayer;
PlaySceneUILayer = cc.Layer.extend({

    _role: null,

    backBtn: null,
    gradeBtn: null,
    gradeLabel: null,
    leftBtn: null,
    rightBtn: null,
    leapBtn: null,
    anwser:null,
    title:null,
    correct:null,


    ctor: function (role) {
        this._super();

        this._role = role;
        this.backBtn = new Button(
            'get back_UI.png', 'get back_UI_Hit.png',
            function () {

            }, function () {
                var nextScene = new HomeScene();
                cc.director.runScene(nextScene);
            });

        this.gradeBtn = new Button('grade.png', 'grade_UI.png');
        this.gradeLabel = new cc.LabelTTF(v_PlayDistance, "Arial Bold", 68);

        var self = this;
        this.leftBtn = new Button(
            'left_UI.png', 'left_UI_Hit.png',
            function () {
                v_PlayState = c_PLAY_STATE_LEFT;
                self._role.left();

                v_PlaySpeed = 5
                cc.audioEngine.playEffect(e_move,false);

            }, function () {
                //v_PlayState = c_PLAY_STATE_IDLE;
                //self._role.idle();

                v_PlaySpeed = 8
            });

        this.rightBtn = new Button(
            'right_UI.png', 'right_UI_Hit.png',
            function () {
                v_PlayState = c_PLAY_STATE_RIGHT;
                self._role.right();
                v_PlaySpeed = 12
                cc.audioEngine.playEffect(e_move,false)
            }, function () {
                //v_PlayState = c_PLAY_STATE_IDLE;
                //self._role.idle();
                v_PlaySpeed = 8
            });

        this.leapBtn = new Button(
            'leap_UI.png', 'leap_UI_Hit.png',
            function () {
                cc.audioEngine.playEffect(e_leap,false)
            }, function () {
                self._role.leap();
            });

    },

    init: function () {
        var size = cc.director.getWinSize();

        this.backBtn.setAnchorPoint(0, 1);
        this.backBtn.setPosition(0, size.height);
        this.addChild(this.backBtn);

        this.gradeBtn.setAnchorPoint(1, 1);
        this.gradeBtn.setPosition(size.width, size.height);
        this.addChild(this.gradeBtn);

        this.gradeLabel.setAnchorPoint(1, 1);
        this.gradeLabel.setPosition(size.width, size.height);
        this.addChild(this.gradeLabel);

        this.leftBtn.setAnchorPoint(0.5, 0.5);
        this.leftBtn.setPosition(120, 80);
        this.addChild(this.leftBtn);

        this.rightBtn.setAnchorPoint(0.5, 0.5);
        this.rightBtn.setPosition(300, 80);
        this.addChild(this.rightBtn);

        this.leapBtn.setAnchorPoint(0.5, 0.5);
        this.leapBtn.setPosition(size.width - 120, 80);
        this.addChild(this.leapBtn);

    },

    update: function () {
        this.gradeLabel.setString(v_PlayGrade);
        if(v_PlayDistance % 3000 ===0 && v_PlayDistance !==0){
            v_PlaySpeed++
        }
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {

    }

});

PlayScene = cc.Scene.extend({

    _ground: null,
    _role: null,

    bgLayer: null,
    aniLayer: null,
    uiLayer: null,
    question: null,

    ctor: function () {
        this._super();

        this.bgLayer = new PlaySceneBgLayer();
        this._ground = this.bgLayer.ground;

        this.aniLayer = new PlaySceneAniLayer(this._ground);
        this._role = this.aniLayer.role;

        this.uiLayer = new PlaySceneUILayer(this._role);

        this.question = new Question(this._role);

        this.treesLayer = new TreesAniLayer()

        this.init();

    },

    init: function () {
        v_PlayState = 0;
        v_PlaySpeed = 5;
        v_PlayDistance = 0;
        v_PlayGrade = 0;

    },

    onEnter: function () {
        this._super();

        this.addChild(this.bgLayer, c_ZORDER_BOTTOM);
        this.addChild(this.aniLayer, c_ZORDER_MID);
        this.addChild(this.uiLayer, c_ZORDER_TOP);
        this.addChild(this.question, c_ZORDER_TOP);
        this.addChild(this.treesLayer, c_ZORDER_TOP)

        this.bgLayer.init();
        this.aniLayer.init();
        this.uiLayer.init();
        this.question.init();
        this.treesLayer.init();

        this.bgLayer.bake();

        this.scheduleUpdate();
    },

    onExit: function () {

    },

    update: function (dt) {
        var delta = v_PlaySpeed * v_PlayState;
        v_PlayDistance += delta;
        v_PlayGrade += Math.floor(delta / 10);

        this.aniLayer.update(dt);
        this.uiLayer.update(dt);
        this.treesLayer.update(dt);

    }
});
