var Role = cc.Sprite.extend({

    // Run
    _animation0: null,
    // Leap
    _animation1: null,
    // Die
    _animation2: null,

    fast:false,
    state:0,

    ctor:function () {
        this._super("#Role_Run_00000.png");
        this._animation0 = new cc.Animation();
        for (var i = 0; i < c_FRAMES_SIZE; i++) {
            var name = "Role_Run_000" + (i < 10 ? ('0' + i) : i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(name);
            this._animation0.addSpriteFrame(frame);
        }

        this._animation1 = new cc.Animation();
        for (var i = 0; i < c_FRAMES_SIZE; i++) {
            var name = "Role_Leap_000" + (i < 10 ? ('0' + i) : i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(name);
            this._animation1.addSpriteFrame(frame);
        }

        this._animation2 = new cc.Animation();
        for (var i = 0; i < c_FRAMES_SIZE; i++) {
            var name = "Role_Die_000" + (i < 10 ? ('0' + i) : i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(name);
            this._animation2.addSpriteFrame(frame);
        }

        return true;
    },

    init: function () {
        this.fast = false;
        this.state = 0;

        this._animation0.setDelayPerUnit(1 / c_FRAMES_SIZE);
        this._animation1.setDelayPerUnit(1 / c_FRAMES_SIZE);
        this._animation2.setDelayPerUnit(1 / c_FRAMES_SIZE);
    },

    update:function () {

    },

    run: function () {
        var action = cc.animate(this._animation0).repeatForever();

        this.runAction(action);
    },

    leap: function () {
        var action = cc.animate(this._animation1);

        this.runAction(action);
    },

    die: function () {
        var action = cc.animate(this._animation2);

        this.runAction(action);
    },

    toggleSpeed:function(fast) {
        if(this.fast === false)
            return;

        this.fast = fast;
        this.stopAllActions();

        if(!fast)
            this._animation0.setDelayPerUnit(1 / c_FRAMES_SIZE);
        else
            this._animation0.setDelayPerUnit(1 / c_FRAMES_SIZE / 2);

        var action = cc.animate(this._animation).repeatForever();
        this.runAction(action);
    },

    onExit: function () {
        this._super();

        this._animation0.release();
        this._animation1.release();
        this._animation2.release();
    }

});
