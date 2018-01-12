var Barrier = cc.Sprite.extend({

    ctor: function (type) {
        this._super('#Barrier_'+ type +'.png');

        this.init();
    },

    init: function () {

    },

    update: function (dt) {
        this.x -= v_PlaySpeed * v_PlayState;
    },

    unuse: function () {
        this.retain();
        this.removeFromParent();
    },

    reuse: function () {
        this.init();
    }

});
