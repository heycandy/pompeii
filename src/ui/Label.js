var Label = cc.LabelTTF.extend({

    // _text: null,

    onTouchBegan: null,
    onTouchEnded: null,

    touchListener: null,

    ctor: function (text, fontName, fontSize, onTouchBegan, onTouchEnded) {
        this._super(text, fontName, fontSize);

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
                    event._currentTarget._setFontStyle('bold')
                    if (self.onTouchBegan) {
                        self.onTouchBegan(touch, event);
                    }

                    return true;
                }

                return false;
            }
        });

        cc.eventManager.addListener(this.touchListener, this);

    },

    removeTouchListener: function () {
        cc.eventManager.removeListener(this.touchListener);
    }

});
