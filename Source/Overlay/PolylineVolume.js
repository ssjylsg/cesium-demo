(function() {
    NPMap3D.Overlay.PolylineVolume = function(options) {
        var a = ['show', 'fill', 'outline', 'outlineColor', 'outlineWidth'],
            type = 'polylineVolume';
        options.position = NPMap3D.Util.T.setPoint(options.position);
        NPMap3D.Overlay.call(this, options, a, type),
            this._entity[type] = {
                positions: Cesium.Cartesian3.fromNPCartesian3List(options.position),
                shape: options.shape,
                cornerType: Cesium.CornerType.BEVELED,
                material: Cesium.Color.GREEN.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.BLACK
            };
        NPMap3D.Overlay.extendLabel.call(this, options);
        NPMap3D.Overlay.extendMaterial.call(this, options, 'polylineVolume');
    };
})();
