var Building = cc.Layer.extend({

    offsetX: null,
    buildings: null,

    ctor: function () {
        this._super();

        this.offsetX = 0;
        this.buildings = [
            new cc.Sprite('#MS_1.png'),
            new cc.Sprite('#MS_2.png'),
            new cc.Sprite('#MS_3.png')
        ]
    },

    init: function () {
        this._super();

        var size = cc.director.getWinSize();

        for(var i = 0; i < this.buildings.length; i++){
            var buliding = this.buildings[i];

            buliding.x = this.offsetX;
            buliding.setAnchorPoint(0, 0);

            this.addChild(buliding, 0);

            this.offsetX = this.offsetX + buliding.getContentSize().width + 200;
        }

    },

    update: function (dt) {
        var posX = this.getPositionX();
        var size = cc.director.getWinSize();

        if(-posX > this.offsetX) {
            posX = size.width;
        } else {
            posX = posX - v_PlaySpeed * v_PlayState;
        }

        this.x = posX;
    }

});
