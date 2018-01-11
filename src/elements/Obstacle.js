var Obstacle = cc.Layer.extend({
    _scene: null,
    _obstacles: null,

    ctor: function (scene) {
        this._super();

        this._scene = scene;
        this._obstacles = [];
    },

    init: function () {
        // for(var i = 0; i < 4; i++) {
        //     this._create(i);
        // }

        this.removeAll();
    },

    update: function (dt) {
        if(v_PlayDistance != 0 && v_PlayDistance % c_OBSTACLE_GAP === 0) {
            // this._create();
            var self = this;
            cc.async.parallel([
                function () {
                    self._create();
                }
            ]);
        }

        for(var i = 0; i < this._obstacles.length; i++) {
            var obstacle = this._obstacles[i];
            if(obstacle.x > 0) {
                obstacle.update(dt);
            } else {
                this._obstacles.splice(i, 1);

                cc.pool.putInPool(obstacle);
            }
        }
    },

    removeAll: function () {
        if (this._obstacles.length > 0) {
            for (var i = this._obstacles.length - 1; i >= 0; i--) {
                var obstacle = this._obstacles[i];

                this._obstacles.splice(i, 1);

                cc.pool.putInPool(obstacle);
            }
        }
    },

    _create: function (type) {
        var type = type | Math.floor(Math.random() * 4);
        var size = cc.director.getWinSize();

        var obstacle;
        if(type === 0) {
            obstacle = this._createFireball();
            obstacle.init();

            obstacle.x = Math.ceil(Math.random() * size.width / 2 + size.width / 2);
            obstacle.y = size.height;

        } else {
            obstacle = this._createBarrier(type);
            obstacle.init();

            obstacle.x = Math.ceil(Math.random() * size.width / 2 + size.width);
            obstacle.y = 170;

        }

        this._obstacles.push(obstacle);
        this.addChild(obstacle);

        return obstacle;

    },

    _createFireball: function () {
        if(cc.pool.hasObject(Fireball)) {
            return cc.pool.getFromPool(Fireball);
        } else {
            return new Fireball();
        }
    },

    _createBarrier: function (type) {
        if(cc.pool.hasObject(Barrier)) {
            return cc.pool.getFromPool(Barrier);
        } else {
            return new Barrier(type);
        }
    }


});
