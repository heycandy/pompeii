var Fireball = cc.Sprite.extend({

    _animation0: null,
    _animation1: null,
    auE: null,

    speed:0,
    state:0,

    ctor:function () {
        this.auE = cc.audioEngine;
        this._super("#Fireball/Fireball_00000.png");

        this._animation0 = new cc.Animation();
        for (var i = 1; i < c_FRAMES_SIZE; i++) {
            var name = "Fireball/Fireball_000" + (i < 10 ? ('0' + i) : i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(name);
            this._animation0.addSpriteFrame(frame);
        }

        this._animation0.retain();
        this._animation0.setDelayPerUnit(1 / c_FRAMES_SIZE);

        this._animation1 = new cc.Animation();
        for (var j = 1; j < c_FRAMES_SIZE; j++) {
            var name = "Bonfire/Bonfire_000" + (j < 10 ? ('0' + j) : j) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(name);
            this._animation1.addSpriteFrame(frame);
        }

        this._animation1.retain();
        this._animation1.setDelayPerUnit(1 / c_FRAMES_SIZE);
    },

    init: function () {
        this.state = 0;

        var action = cc.animate(this._animation0).repeatForever();
        this.runAction(action);
    },

    update:function () {



        var pos = this.getPosition();

        if(!this.state && pos.y < 200) {
            this._falldown();
        } else if(!this.state) {
            this.auE.playEffect(e_fireBall, false)
            this.y -= v_PlayFireballSpeed;
        }

        if(!this.state){
            if(!v_PlayState) {
                this.x -= Math.ceil(v_PlayFireballSpeed / 2);
            } else {
                this.x -= v_PlayFireballSpeed
            }
        } else {
            this.x -= v_PlayFireballSpeed * v_PlayState;
        }

    },

    unuse: function () {
        this.stopAllActions();
        this.retain();
        this.removeFromParent();
    },

    reuse: function () {
        this.init();
    },

    _falldown: function () {
        this.auE.playEffect(e_fireFloor, false)

        this.stopAllActions();

        this.state = 1;

        var action = cc.animate(this._animation1).repeatForever();
        this.runAction(action);
    }

});
