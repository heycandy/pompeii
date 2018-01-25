var Trees = cc.Layer.extend({

    offsetX: null,
    trees: null,

    ctor: function () {
        this._super();

        this.offsetX = 0;
        this.trees = [
            new cc.Sprite('#FG_1.png'),
            new cc.Sprite('#FG_2.png'),
            new cc.Sprite('#FG_3.png'),
            new cc.Sprite('#FG_4.png')
        ]
    },

    init: function () {
        this._super();

        var size = cc.director.getWinSize();

        for(var i = 0; i < this.trees.length; i++){
            var tree = this.trees[i];

            tree.x = this.offsetX;
            tree.setAnchorPoint(0, 0);

            this.addChild(tree, 0);

            this.offsetX = this.offsetX + tree.getContentSize().width + 100;
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
