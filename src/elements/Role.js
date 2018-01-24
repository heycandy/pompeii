var Role = cc.Sprite.extend({

    // Idle
    _frameIdles: null,
    // Run
    _aniRuns: null,
    // Leap
    _aniLeaps: null,
    // Die
    _aniDies: null,

    state: c_PLAY_STATE_IDLE,
    currIndex: 1,

    /**
     * Role1/Role1_Run/Role1_Run_00000.png
     * Role2/Role2_Run/Role2_run_00000.png
     *
     * @param index
     * @returns {boolean}
     */
    ctor: function (index) {
        this._super("#Role"+ index | 1 +"/Role"+ index | 1 +"_Run/Role"+ index | 1 +"_Run_00000.png");

        this.currIndex = index | 1;
        this._frameIdles = new Array();
        this._aniRuns = new Array();
        this._aniLeaps = new Array();
        this._aniDies = new Array();

        for(var i = 1; i <= c_ROLE_SIZE; i++) {
            var frameIdle = cc.spriteFrameCache.getSpriteFrame(
                "Role"+ i +"/Role"+ i +"_Run/Role"+ i +"_Run_00000.png");
            this._frameIdles.push(frameIdle);

            var aniRun = new cc.Animation();
            for(var j = 0; j < c_ROLE_RUN_FRAMES; j++) {
                var name = "Role"+ i +"/Role"+ i +"_Run/Role"+ i +"_Run_000" + (j < 10 ? ('0' + j) : j) + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(name)

                aniRun.addSpriteFrame(frame);
                aniRun.retain();
            }
            this._aniRuns.push(aniRun);

            var aniLeap = new cc.Animation();
            for(var j = 0; j < c_ROLE_LEAP_FRAMES; j++) {
                var name = "Role"+ i +"/Role"+ i +"_Leap/Role"+ i +"_Leap_000" + (j < 10 ? ('0' + j) : j) + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(name);

                aniLeap.addSpriteFrame(frame);
                aniLeap.retain();
            }
            this._aniLeaps.push(aniLeap);

            var aniDie = new cc.Animation();
            for(var j = 0; j < c_ROLE_DIE_FRAMES; j++) {
                var name = "Role"+ i +"/Role"+ i +"_Die/Role"+ i +"_Die_000" + (j < 10 ? ('0' + j) : j) + ".png";
                var frame = cc.spriteFrameCache.getSpriteFrame(name);

                aniDie.addSpriteFrame(frame);
                aniDie.retain();
            }
            this._aniDies.push(aniDie);

        }

        return true;
    },

    init: function () {
        for(var i = 0; i < this._aniRuns.length; i++) {
            this._aniRuns[i].setDelayPerUnit(1 / c_FRAMES_SIZE);
        }

        for(var i = 0; i < this._aniLeaps.length; i++) {
            this._aniLeaps[i].setDelayPerUnit(1 / c_FRAMES_SIZE);
        }

        for(var i = 0; i < this._aniDies.length; i++) {
            this._aniDies[i].setDelayPerUnit(1 / c_FRAMES_SIZE);
        }

        this.idle();
    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();

        for(var i = 0; i < this._aniRuns.length; i++) {
            this._aniRuns[i].release();
        }

        for(var i = 0; i < this._aniLeaps.length; i++) {
            this._aniLeaps[i].release();
        }

        for(var i = 0; i < this._aniDies.length; i++) {
            this._aniDies[i].release();
        }

    },

    idle: function () {
        if(this.state !== c_ROLE_STATE_DIE && this.state !== c_ROLE_STATE_LEAP) {
            this.state = c_ROLE_STATE_IDLE;
            this.stopAllActions();
            this.setSpriteFrame(this._frameIdles[this.currIndex - 1]);
        }
    },

    left: function () {
        this._run();
    },

    right: function () {
        this._run();
    },

    _run: function () {
        if(this.state === c_ROLE_STATE_IDLE) {
            this.state = c_ROLE_STATE_RUN;
            cc.log('!!!!!!!!!!!!!!11');
            var action = cc.animate(this._aniRuns[this.currIndex - 1]).repeatForever();

            this.stopAllActions();
            this.runAction(action);
        }
    },

    leap: function () {
        if (this.state !== c_ROLE_STATE_DIE && this.state !== c_ROLE_STATE_LEAP) {
            this.state = c_ROLE_STATE_LEAP;

            var action0 = cc.animate(this._aniLeaps[this.currIndex - 1]);
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

            var action = cc.animate(this._aniDies[this.currIndex - 1]);

            this.stopAllActions();
            this.runAction(action);
        }
    },

    setCurr: function (index) {
        this.currIndex = index;
    }

});
