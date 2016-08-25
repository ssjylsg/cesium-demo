(function() {
    NPMap3D.Overlay.Box = function(options) {
        var a = ['show', 'fill', 'outline', 'outlineWidth'],
            type = 'box';
            options.position = NPMap3D.Util.T.setPoint(options.position);
        NPMap3D.Overlay.call(this, options, a, type),
            this._entity.position = Cesium.Cartesian3.fromDegrees(options.position.x, options.position.y, options.position.z),
            this._entity.box = {
                dimensions: new Cesium.Cartesian3(options.xyz.x, options.xyz.y, options.xyz.z),
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: !0,
                outlineColor: Cesium.Color.BLACK
            };
        NPMap3D.Overlay.extendLabel.call(this, options);
        NPMap3D.Overlay.extendMaterial.call(this, options, 'box');
    };
})();