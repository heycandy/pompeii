//Background Layer (Background&Ground)
var PlaySceneBgLayer = cc.Layer.extend({

    background: null,
    ground: null,
    anwser:null,

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

    _ground: null,

    building: null,
    role: null,
    obstacle: null,

    ctor: function (ground) {
        this._super();

        this._ground = ground;

        this.building = new Building();
        this.role = new Role();
        this.obstacle = new Obstacle(this.role, function (obstacle, role) {
            //TODO on collided
            //self._role.die()

        });
    },

    init: function () {
        this._super();

        var groundHeight = this._ground.getContentSize().height;

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
        this.gradeLabel = new cc.LabelTTF(v_PlayDistance, "Impact", 38);
        this.anwser = new cc.Sprite(I_Anwser)
        this.title = new cc.LabelTTF('题目', "Impact", 58);
        this.correct = new cc.Sprite(I_Correct);


        var self = this;
        answerSelf = this
        cc.log(self)
        this.leftBtn = new Button(
            'left_right_leap.png', 'left_right_leap_UI_Hit.png',
            function () {
                v_PlayState = c_PLAY_STATE_LEFT;

                self._role.left();
            }, function () {
                v_PlayState = c_PLAY_STATE_IDLE;

                self._role.idle();
            });

        this.rightBtn = new Button(
            'left_right_leap.png', 'left_right_leap_UI_Hit.png',
            function () {
                v_PlayState = c_PLAY_STATE_RIGHT;

                self._role.right();
            }, function () {
                v_PlayState = c_PLAY_STATE_IDLE;

                self._role.idle();

            });

        this.leapBtn = new Button(
            'left_right_leap.png', 'left_right_leap_UI_Hit.png',
            function () {

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

        this.leftBtn.rotation = -90;
        this.leftBtn.setAnchorPoint(0.5, 0.5);
        this.leftBtn.setPosition(120, 80);
        this.addChild(this.leftBtn);

        this.rightBtn.rotation = 90;
        this.rightBtn.setAnchorPoint(0.5, 0.5);
        this.rightBtn.setPosition(300, 80);
        this.addChild(this.rightBtn);

        this.leapBtn.setAnchorPoint(0.5, 0.5);
        this.leapBtn.setPosition(size.width - 120, 80);
        this.addChild(this.leapBtn);

        this.anwser.setAnchorPoint(0, 0);
        this.anwser.setPosition(800, 100);
        this.addChild(this.anwser, 0);

        this.title.setAnchorPoint(1, 1);
        this.title.setPosition(1000, 900);
        this.addChild(this.title);



        // 題目讀取
        NUM = Math.floor(Math.random() * 4);
        this.question = QuestionAndAnswer.questions[NUM];
        this.options = QuestionAndAnswer.options[NUM];
        self.answerd = QuestionAndAnswer.answers[NUM];

        this.question = new cc.LabelTTF(this.question, "Impact", 38, cc.size(600,200));
        this.question.setAnchorPoint(0, 0);
        this.question.setPosition(210, 590);
        this.anwser.addChild(this.question);

        this.option1 = new cc.LabelTTF(this.options.A, "Impact", 38, cc.size(300,100));
        this.option1.setAnchorPoint(0, 0);
        this.option1.setPosition(210, 550);
        this.anwser.addChild(this.option1);

        this.option2 = new cc.LabelTTF(this.options.B, "Impact", 38, cc.size(300,100));
        this.option2.setAnchorPoint(0, 0);
        this.option2.setPosition(210, 450);
        this.anwser.addChild(this.option2);

        this.option3 = new cc.LabelTTF(this.options.C, "Impact", 38, cc.size(300,100));
        this.option3.setAnchorPoint(0, 0);
        this.option3.setPosition(210, 360);
        this.anwser.addChild(this.option3);

        this.option4 = new cc.LabelTTF(this.options.D, "Impact", 38, cc.size(300,100));
        this.option4.setAnchorPoint(0, 0);
        this.option4.setPosition(210, 270);
        this.anwser.addChild(this.option4);

        this.isRight = new cc.LabelTTF('回答正确加分哦', "Impact", 38, cc.size(300,100));
        this.isRight.setAnchorPoint(0, 0);
        this.isRight.setPosition(440, 100);
        this.anwser.addChild(this.isRight);

        // 创建一个事件监听器 OneByOne 为单点触摸
        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
            target:self.option2,
            onTouchBegan: function (touch, event) {//实现 onTouchBegan 事件处理回调函数
                var anwserd = event._currentTarget._originalText
                var a = anwserd[0]
                cc.log(QuestionAndAnswer)
                cc.log(answerSelf)
                answerSelf.correct.setAnchorPoint(0, 0);
                switch (NUM){
                    case 0:
                        answerSelf.correct.setPosition(70, 550);
                        break;
                    case 1:
                        answerSelf.correct.setPosition(70, 450);
                        break;
                    case 2:
                        answerSelf.correct.setPosition(70, 350);
                        break;
                    case 3:
                        answerSelf.correct.setPosition(70, 250);
                        break;

                }
                answerSelf.anwser.addChild(answerSelf.correct);

                if(NUM ===a){
                     cc.log('答对了')
                     v_PlayGrade+=50
                     answerSelf.removeChild(answerSelf.anwser)
                     answerSelf.removeChild(answerSelf.title)

                 }else{
                     cc.log('答错了')
                    /* answerSelf.removeChild(answerSelf.anwser)
                     answerSelf.removeChild(answerSelf.title)*/
                 }

            },
            onTouchEnded: function (touch, event) {         // 实现onTouchEnded事件处理回调函数

            }
        });

        cc.eventManager.addListener(listener1, this.option1);
        cc.eventManager.addListener(listener1, this.option2);
        cc.eventManager.addListener(listener1, this.option3);
        cc.eventManager.addListener(listener1, this.option4);





    },

    update: function () {
        v_PlayGrade = Math.floor(v_PlayDistance / 10);

        this.gradeLabel.setString(v_PlayGrade);
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

    ctor: function () {
        this._super();

        this.bgLayer = new PlaySceneBgLayer();
        this._ground = this.bgLayer.ground;

        this.aniLayer = new PlaySceneAniLayer(this._ground);
        this._role = this.aniLayer.role;

        this.uiLayer = new PlaySceneUILayer(this._role);

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

        this.bgLayer.init();
        this.aniLayer.init();
        this.uiLayer.init();

        this.bgLayer.bake();

        this.scheduleUpdate();
    },

    onExit: function () {

    },

    update: function (dt) {
        v_PlayDistance = v_PlayDistance + v_PlaySpeed * v_PlayState;

        this.aniLayer.update(dt);
        this.uiLayer.update(dt);

    }
});
