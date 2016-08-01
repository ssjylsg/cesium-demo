(function() {
    NPMap3D.LabelOption = function(options) {
        options = NPMap3D.extend(options, {
            text: '',
            show: true,
            position: Cesium.Cartesian3.ZERO,
            pixelOffset: Cesium.Cartesian2.ZERO,
            eyeOffset: Cesium.Cartesian3.ZERO,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            scale: 1.0,
            color: Cesium.Color.WHITE,
            id: undefined,
            pixelOffset: Cesium.Cartesian2.ZERO
        });
        this._ = null;
        options.color = options.color._e || options.color;
        options.fillColor = options.fillColor._e || options.fillColor;
        options.position = NPMap3D.toRadians(options.position);
        this.options = options;
    }
})();
(function() {
    NPMap3D.LabelCollection = function(map) {
        var scene = map.viewer.scene;
        var _billboards = scene.primitives.add(new Cesium.LabelCollection());
        // _billboards['leftClick'],
        //  _billboards['leftClick']
        this.add = function(labelOption) {
            labelOption._ = _billboards.add(labelOption.options);
        };
        this.destroy = function() {
            _billboards.destroy();
        };
        this.removeAll = function() {
            _billboards.removeAll();
        };
        this.remove = function(labelOption) {
            _billboards.remove(markerOption._);
        };
    };
})();
