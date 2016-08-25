(function() {
    NPMap3D.Overlay.Ellipsoid = function(options) {
        var a = ['show', 'fill', 'outline', 'outlineColor', 'outlineWidth', 'subdivisions', 'stackPartitions', 'slicePartitions'],
            type = 'ellipsoid';
        options.position = NPMap3D.Util.T.setPoint(options.position);
        var c = options.radii || new Cesium.Cartesian3(3E5, 3E5, 3E5);
        NPMap3D.Overlay.call(this, options, a, type),
            this._entity.position = Cesium.Cartesian3.fromDegrees(options.position.x, options.position.y, options.position.z),

            this._entity[type] = {
                radii: new Cesium.Cartesian3(c.x, c.y, c.z),
                material: options.material || Cesium.Color.RED.withAlpha(0.5),
                outline: false,
                outlineColor: Cesium.Color.BLACK
            };
        NPMap3D.Overlay.extendLabel.call(this, options);
        NPMap3D.Overlay.extendMaterial.call(this, options, 'ellipsoid');
    };
})();
