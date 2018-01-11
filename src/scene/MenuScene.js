var MenuSceneLayer = cc.Layer.extend({
    helloLabel:null,
    sprite:null,
    role:null,

    ctor: function () {
        this._super();
    },

    init:function () {

        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.director.getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            i_CloseNormal,
            i_CloseSelected,
            function () {
                cc.log("close");
            },this);
        closeItem.setAnchorPoint(0.5, 0.5);

        var menu = new cc.Menu(closeItem);
        menu.setPosition(0, 0);
        this.addChild(menu, 1);
        closeItem.setPosition(size.width - 20, 20);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        this.helloLabel = new cc.LabelTTF("Hello World", "Impact", 38);
        // position the label on the center of the screen
        this.helloLabel.setPosition(size.width / 2, size.height - 40);
        // add the label as a child to this layer
        this.addChild(this.helloLabel, 5);

        // add "Helloworld" splash screen"
        this.sprite = new cc.Sprite(i_HelloWorld);
        this.sprite.setAnchorPoint(0.5, 0.5);
        this.sprite.setPosition(size.width / 2, size.height / 2);
        this.sprite.setScale(size.height / this.sprite.getContentSize().height);
        this.addChild(this.sprite, 0);

    }
});

var MenuScene = cc.Scene.extend({

    ctor:function () {
        this._super();

    },

    init: function () {
        this._super();

    },

    onEnter: function () {
        this._super();

        var layer = new MenuSceneLayer();
        this.addChild(layer);

        layer.init();
    }
});
