var Question;
Question = cc.Layer.extend({

    _question: null,
    _options: [],
    _answer: '',
    _role: null,

    awarded: null,

    ctor: function (role) {
        this._super();
        this._role = role

        var NUM = Math.floor(Math.random() * 5);
        this.anwserBg = new cc.Sprite('#Answer_BG.png');

        this.question = QuestionAndAnswer.questions[NUM];
        this.options = QuestionAndAnswer.options[NUM];
        this.answer = QuestionAndAnswer.answers[NUM];
        this.awarded = new Awarded();
        this.role = new Role()
    },
    touchListener: function () {
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true
            }
        });
        cc.eventManager.addListener(this.touchListener, this);
    },
    init: function () {
        this._super();
        var self = this;
        this.touchListener();
        this.title = new cc.LabelTTF('题目', "Arial Bold", 48);
        this.question = new cc.LabelTTF(this.question, "Arial Bold", 36, cc.size(600, 200));
        this.option1 = new Label(this.options.A, "Arial Bold", 36, function () {
            self.isRight(self.options.A[0], self.answer[0])
        }, function () {
        });

        this.option2 = new Label(this.options.B, "Arial Bold", 36, function () {
            self.isRight(self.options.B[0], self.answer[0])
        }, function () {
        });

        this.option3 = new Label(this.options.C, "Arial Bold", 36, function () {
            self.isRight(self.options.C[0], self.answer[0])
        }, function () {
        });

        this.option4 = new Label(this.options.D, "Arial Bold", 36, function () {
            self.isRight(self.options.D[0], self.answer[0])
        }, function () {
        });

        this.addScorelabel = new cc.LabelTTF('回答正确加分哦', "Arial Bold", 32);

        this.correctAnwser = new cc.Sprite('#Right.png');

        var size = cc.director.getWinSize();
        this.anwserBg.setAnchorPoint(1, 1);
        this.anwserBg.setPosition(size.width - 100, size.height - 80);
        this.addChild(this.anwserBg);

        this.title.setAnchorPoint(0, 0);
        this.title.setPosition(size.width - 900, size.height - 250);
        this.addChild(this.title);

        this.question.setAnchorPoint(0, 0);
        this.question.setPosition(size.width - 850, size.height - 450);
        this.addChild(this.question);

        this.option1.setAnchorPoint(0, 0);
        this.option1.setPosition(size.width - 800, size.height - 400);
        this.addChild(this.option1);

        this.option2.setAnchorPoint(0, 0);
        this.option2.setPosition(size.width - 800, size.height - 500);
        this.addChild(this.option2);

        this.option3.setAnchorPoint(0, 0);
        this.option3.setPosition(size.width - 800, size.height - 600);
        this.addChild(this.option3);

        this.option4.setAnchorPoint(0, 0);
        this.option4.setPosition(size.width - 800, size.height - 700);
        this.addChild(this.option4);

        this.addScorelabel.setAnchorPoint(0, 0);
        this.addScorelabel.setPosition(size.width - 450, size.height - 900);
        this.addChild(this.addScorelabel);

        this.awarded.setAnchorPoint(0.5, 0.5);
        this.awarded.setPosition(size.width / 2, size.height / 2);
        this.addChild(this.awarded);

        this.awarded.init();


    },
    isRight: function (userAnwser, correctAnwser) {
        var self = this;
        var size = cc.director.getWinSize();
        this.correctAnwser.setAnchorPoint(0, 0);
        switch (self.answer[0]) {
            case 'A':
                self.correctAnwser.setPosition(size.width - 950, size.height - 450);
                break;
            case 'B':
                self.correctAnwser.setPosition(size.width - 950, size.height - 550);
                break;
            case 'C':
                self.correctAnwser.setPosition(size.width - 950, size.height - 650);
                break;
            case 'D':
                self.correctAnwser.setPosition(size.width - 950, size.height - 750);
                break;
        }
        this.addChild(this.correctAnwser);
        if (userAnwser === correctAnwser) {
            this.awarded.show();
            setTimeout(function () {
                self.removeFromParent();
                v_PlayState = c_PLAY_STATE_RIGHT;
                self._role.right()
            }, 2000)


        } else {
            cc.log('错误')
            setTimeout(function () {
                self.removeFromParent();
                v_PlayState = c_PLAY_STATE_RIGHT;
                self._role.right()
            }, 2000)
        }
    }
});
