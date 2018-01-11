var Volcano = cc.Sprite.extend({

    ctor: function () {
        this._super('#volcano_00000.png');

        this._animation = new cc.Animation();
        for (var i = 1; i < c_FRAMES_SIZE; i++) {
            var name = "volcano_000" + (i < 10 ? ('0' + i) : i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(name);
            this._animation.addSpriteFrame(frame);
        }

        this._animation.retain();
        this._animation.setDelayPerUnit(1 / c_FRAMES_SIZE);
    },

    init: function () {
        var action = cc.animate(this._animation).repeatForever();

        this.runAction(action);
    }

});
