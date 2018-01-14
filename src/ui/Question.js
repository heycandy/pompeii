var Question;
Question = cc.Layer.extend({

    _question: null,
    _options: [],
    _answer: '',

    ctor: function () {
        this._super();

        var NUM = Math.floor(Math.random() * 5);
        this.anwserBg = new cc.Sprite(I_Anwser);
        this.question = QuestionAndAnswer.questions[NUM];
        this.options = QuestionAndAnswer.options[NUM];
        this.answer = QuestionAndAnswer.answers[NUM];
    },

    init: function () {
        this._super();
        var self = this;
        this.title = new Lable('题目', "Impact", 36, function () {
                alert('题目')
            return true
            },
            function () {
                alert('题目')
                return true
            });
        this.question = new Lable(this.question, "Impact", 24, function () {
                cc.log(self.question)

            },
            function () {
                cc.log(self.question)
            });
        this.option1 = new Lable(this.options.A, "Impact", 24, function() {
            cc.log(self.options.A[0])
            cc.log(self.answer[0])
            self.isRight(self.options.A[0], self.answer[0])

        },function() {
        });

        this.option2 = new Lable(this.options.B, "Impact", 24, function() {
            cc.log(self.options.B[0])
            cc.log(self.answer[0])
            self.isRight(self.options.B[0], self.answer[0])
            self.options.B.style.fontWeight = 'blod'
        },function() {
        });

        this.option3 = new Lable(this.options.C, "Impact", 24, function() {
            cc.log(self.options.C[0])
            cc.log(self.answer[0])
            self.isRight(self.options.C[0], self.answer[0])
            self.options.C.style.fontWeight = 'blod'

        },function() {
        });

        this.option4 = new Lable(this.options.D, "Impact", 24, function() {
            cc.log(self.options.D[0])
            cc.log(self.answer[0])
            self.isRight(self.options.D[0], self.answer[0])
            self.options.D.style.fontWeight = 'blod'
        },function() {
        });

        this.addScorelabel = new Lable('回答正确加分哦', "Impact", 24, function () {
            },
            function () {
            });

        this.correctAnwser = new cc.Sprite(I_Correct);

        var size = cc.director.getWinSize();
        this.anwserBg.setAnchorPoint(1, 1);
        this.anwserBg.setPosition(size.width - 100, size.height - 80);
        this.addChild(this.anwserBg);

        this.title.setAnchorPoint(0, 0);
        this.title.setPosition(size.width - 900, size.height - 220);
        this.addChild(this.title);

        this.question.setAnchorPoint(0, 0);
        this.question.setPosition(size.width - 900, size.height - 300);
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
        this.addScorelabel.setPosition(size.width - 400, size.height - 900);
        this.addChild(this.addScorelabel);


    },
    isRight: function (userAnwser, correctAnwser) {
        var self = this;
        var size = cc.director.getWinSize();
        this.correctAnwser.setAnchorPoint(0, 0);
        switch (self.answer[0]){
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
        if(userAnwser === correctAnwser){
            setTimeout(function () {
                self.removeChild(self.anwserBg)
                self.removeChild(self.title)
                self.removeChild(self.question)
                self.removeChild(self.option1)
                self.removeChild(self.option2)
                self.removeChild(self.option3)
                self.removeChild(self.option4)
                self.removeChild(self.correctAnwser)
                self.removeChild(self.addScorelabel)
                alert('回答正确，加50米')
            },2000)
        }else{
            cc.log('错误')
            setTimeout(function () {
                self.removeChild(self.anwserBg)
                self.removeChild(self.title)
                self.removeChild(self.question)
                self.removeChild(self.option1)
                self.removeChild(self.option2)
                self.removeChild(self.option3)
                self.removeChild(self.option4)
                self.removeChild(self.correctAnwser)
                self.removeChild(self.addScorelabel)
            },2000)
        }
    }
});
