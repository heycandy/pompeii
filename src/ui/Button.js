var Button = cc.Sprite.extend({

    _frame0: null,
    _frame1: null,

    onTouchBegan: null,
    onTouchEnded: null,

    touchListener: null,

    ctor: function (beganName, endedName, onTouchBegan, onTouchEnded) {
        this._super('#' + beganName);

        this._frame0 = cc.spriteFrameCache.getSpriteFrame(beganName);
        this._frame1 = cc.spriteFrameCache.getSpriteFrame(endedName);

        this.onTouchBegan = onTouchBegan;
        this.onTouchEnded = onTouchEnded;

    },

    init: function () {

    },

    onEnter: function () {
        this._super();

        this.addTouchListener();
    },

    onExit: function () {
        this.removeTouchListener();
    },

    addTouchListener: function () {
        var self = this;
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    cc.log('onTouchBegan');

                    self.setSpriteFrame(self._frame1);
                    if (self.onTouchBegan) {
                        self.onTouchBegan(touch, event);
                    }

                    return true;
                }

                return false;
            },
            onTouchMoved: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    cc.log('onTouchMoved');

                    return true;
                }

                return false;
            },
            onTouchEnded: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    cc.log('onTouchEnded');

                    self.setSpriteFrame(self._frame0);
                    if (self.onTouchEnded) {
                        self.onTouchEnded(touch, event);
                    }
                }
            }
        });

        cc.eventManager.addListener(this.touchListener, this);

    },

    removeTouchListener: function () {
        cc.eventManager.removeListener(this.touchListener);
    }

});
