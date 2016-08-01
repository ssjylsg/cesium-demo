(function() {
    NPMap3D.PointOption = function(options) {
        options = NPMap3D.extend(options, {
            show: true,
            position: Cesium.Cartesian3.ZERO,
            outlineWidth: 0,
            outlineColor: Cesium.Color.WHITE,
            pixelSize: 0,
            scale: 1.0,
            color: Cesium.Color.WHITE,
            id: undefined
        });
        this._ = null;
        options.color = options.color._e || options.color;
        options.position = NPMap3D.toRadians(options.position);
        this.options = options;
    }
})();
(function() {
    NPMap3D.PointCollection = function(map) {
        var scene = map.viewer.scene;
        var _billboards = scene.primitives.add(new Cesium.PointPrimitiveCollection());
        this.add = function(pointOption) {
            pointOption._ = _billboards.add(pointOption.options);
        };
        this.destroy = function() {
            _billboards.destroy();
        };
        this.removeAll = function() {
            _billboards.removeAll();
        };
        this.remove = function(pointOption) {
            _billboards.remove(pointOption._);
        };
        this.registerEvent = function(event, efunction) {
            _billboards[event] = efunction;
        }
    };
})();