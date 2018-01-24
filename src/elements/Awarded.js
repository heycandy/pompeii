var Awarded = cc.Sprite.extend({

    _animation: null,

    ctor:function () {
        this._super("#Awarded/awarded marks_00000.png");

        this._animation = new cc.Animation();
        for (var i = 1; i < c_FRAMES_SIZE * 2; i++) {
            var name = "Awarded/awarded marks_000" + (i < 10 ? ('0' + i) : i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(name);

            this._animation.addSpriteFrame(frame);
        }
    },

    init: function () {
        this._animation.setDelayPerUnit(1 / c_FRAMES_SIZE / 2);
    },

    show: function () {
        this.runAction(cc.animate(this._animation));

        v_PlayGrade += 50;
    }


});
