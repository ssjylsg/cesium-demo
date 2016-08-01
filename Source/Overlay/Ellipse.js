(function() {
    NPMap3D.Overlay.Ellipse = function(options) {
        var type = 'ellipse',
            a = ['height', 'extrudedHeight', 'rotation', 'semiMinorAxis', 'semiMinorAxis', 'show', 'fill', 'outline', 'outlineWidth', 'numberOfVerticalLines', 'stRotation'];
        NPMap3D.Overlay.call(this, options, a, type),
            this._entity.position = Cesium.Cartesian3.fromDegrees(options.position.x, options.position.y, options.position.z),
            this._entity[type] = {
                semiMinorAxis: options.semiMinorAxis || 15E4,
                semiMajorAxis: options.semiMajorAxis || 3E5,
                extrudedHeight: 0,
                rotation: Cesium.Math.toRadians(0),
                material: Cesium.Color.BLUE.withAlpha(0.5),
                outline: !0
            };
        NPMap3D.Overlay.extendLabel.call(this, options);
        NPMap3D.Overlay.extendMaterial.call(this, options, 'ellipse');
    };
})();