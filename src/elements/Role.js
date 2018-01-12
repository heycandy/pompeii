var Role = cc.Sprite.extend({

    // Idle
    _frame0: null,
    // Run
    _animation1: null,
    // Leap
    _animation2: null,
    // Die
    _animation3: null,

    state: c_PLAY_STATE_IDLE,
    direction: c_ROLE_DIRECTION_RIGHT,

    ctor: function () {
        this._super("#Role_Run_00000.png");
        this._frame0 = cc.spriteFrameCache.getSpriteFrame('Role_Run_00000.png');
        this._animation1 = new cc.Animation();
        for (var i = 0; i < c_FRAMES_SIZE; i++) {
            var name = "Role_Run_000" + (i < 10 ? ('0' + i) : i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(name);
            this._animation1.addSpriteFrame(frame);
        }
        this._animation1.retain();

        this._animation2 = new cc.Animation();
        for (var i = 0; i < c_FRAMES_SIZE; i++) {
            var name = "Role_Leap_000" + (i < 10 ? ('0' + i) : i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(name);
            this._animation2.addSpriteFrame(frame);
        }
        this._animation2.retain();

        this._animation3 = new cc.Animation();
        for (var i = 0; i < c_FRAMES_SIZE; i++) {
            var name = "Role_Die_000" + (i < 10 ? ('0' + i) : i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(name);
            this._animation3.addSpriteFrame(frame);
        }
        this._animation3.retain();

        return true;
    },

    init: function () {
        this._animation1.setDelayPerUnit(1 / c_FRAMES_SIZE);
        this._animation2.setDelayPerUnit(1 / c_FRAMES_SIZE);
        this._animation3.setDelayPerUnit(1 / c_FRAMES_SIZE);

        this.idle();
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

        this._animation1.release();
        this._animation2.release();
        this._animation3.release();
    },

    idle: function () {
        if(this.state !== c_ROLE_STATE_DIE && this.state !== c_ROLE_STATE_LEAP) {
            this.state = c_ROLE_STATE_IDLE;

            this.stopAllActions();
            this.setSpriteFrame(this._frame0);
        }
    },

    left: function () {
        this.direction = c_ROLE_DIRECTION_LEFT;
        this._run();
    },

    right: function () {
        this.direction = c_ROLE_DIRECTION_RIGHT;
        this._run();
    },

    _run: function () {
        if(this.state === c_ROLE_STATE_IDLE) {
            this.state = c_ROLE_STATE_RUN;

            var action = cc.animate(this._animation1).repeatForever();

            this.stopAllActions();
            this.runAction(action);
        }
    },

    leap: function () {
        if (this.state !== c_ROLE_STATE_DIE && this.state !== c_ROLE_STATE_LEAP) {
            this.state = c_ROLE_STATE_LEAP;

            var action0 = cc.animate(this._animation2);
            var action1 = cc.callFunc(this.afterLeap, this);
            var sequence = cc.sequence(action0, action1);

            this.stopAllActions();
            this.runAction(sequence);
        }
    },

    afterLeap: function () {
        this.state = c_ROLE_STATE_IDLE;

        if (!v_PlayState) {
            this.idle();
        } else {
            this._run();
        }
    },

    die: function () {
        if (this.state !== c_ROLE_STATE_DIE) {
            this.state = c_ROLE_STATE_DIE;

            var action = cc.animate(this._animation3);

            this.stopAllActions();
            this.runAction(action);
        }
    }

});
