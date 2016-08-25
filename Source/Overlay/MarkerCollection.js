(function() {
    NPMap3D.MarkerOption = function(options) {
        //this._ = new Cesium.Billboard();
        options = NPMap3D.extend(options, {
            show: true,
            position: Cesium.Cartesian3.ZERO,
            pixelOffset: Cesium.Cartesian2.ZERO,
            eyeOffset: Cesium.Cartesian3.ZERO,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            scale: 1.0,
            image: 'url/to/image',
            color: Cesium.Color.WHITE,
            id: undefined
        });
        this._ = null;
        options.position = NPMap3D.toRadians(options.position);
        options.position = NPMap3D.Util.T.setPoint(options.position);
        this.options = options;
        //this._ = new Cesium.Billboard(options);
        // for (var k in options) {
        //     this._[k] = options[k];
        // }

    }
})();
(function() {
    NPMap3D.MarkerCollection = function(map) {
        var scene = map.viewer.scene;
        var _billboards = scene.primitives.add(new Cesium.BillboardCollection());
        // _billboards['leftClick'],
        //  _billboards['leftClick']
        this.add = function(markerOption) {
            markerOption._ = _billboards.add(markerOption.options);
        };
        this.destroy = function() {
            _billboards.destroy();
        };
        this.removeAll = function() {
            _billboards.removeAll();
        };
        this.remove = function(markerOption) {
            _billboards.remove(markerOption._);
        };
        this.registerEvent = function(event, efunction) {
            _billboards[event] = efunction;
        }
    };
})();