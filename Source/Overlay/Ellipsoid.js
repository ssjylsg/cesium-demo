
(function() {
    NPMap3D.Overlay.Ellipsoid = function(options) {
        var a = ['show', 'fill', 'outline', 'outlineColor', 'outlineWidth', 'subdivisions', 'stackPartitions', 'slicePartitions'],
            type = 'ellipsoid';
        NPMap3D.Overlay.call(this, options, a, type),
            this._entity.position = Cesium.Cartesian3.fromDegrees(options.position.x, options.position.y, options.position.z),
            this._entity[type] = {
                radii: new Cesium.Cartesian3(3E5, 3E5, 3E5),
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: !0,
                outlineColor: Cesium.Color.BLACK
            };
        NPMap3D.Overlay.extendLabel.call(this, options);
        NPMap3D.Overlay.extendMaterial.call(this, options, 'ellipsoid');
    };
})();