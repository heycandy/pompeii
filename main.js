cc.game.onStart = function () {
    if (!cc.sys.isNative && document.getElementById("cocosLoading")) { //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));
    }

    var designSize = cc.size(1920, 1080);
    var screenSize = cc.view.getFrameSize();

    // if(!cc.sys.isNative && screenSize.height < 800){
    //     designSize = cc.size(320, 480);
    //     cc.loader.resPath = "res/Normal";
    // }else{
    //     cc.loader.resPath = "res/HD";
    // }

    cc.loader.resPath = "res";

    cc.view.resizeWithBrowserSize(true);
    cc.view.setOrientation(cc.ORIENTATION_LANDSCAPE);
    cc.view.enableAutoFullScreen(false);
    cc.view.setDesignResolutionSize(designSize.width, designSize.height, cc.ResolutionPolicy.EXACT_FIT);

    //load resources
    cc.LoaderScene.preload(g_Resources, function () {
        cc.spriteFrameCache.addSpriteFrames(p_Role);
        cc.spriteFrameCache.addSpriteFrames(p_Item0);
        cc.spriteFrameCache.addSpriteFrames(p_UI0);

        cc.director.runScene(new HomeScene());
    }, this);
};
cc.game.run();
