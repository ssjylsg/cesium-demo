(function() {
    NPMap3D.Overlay.Polygon = function(options) {
        var a = ['height', 'show','extrudedHeight', 'fill', 'outline', 'outlineWidth', 'stRotation', 'perPositionHeight', 'closeTop', 'closeBottom'],
            type = 'polygon';
        options.position = NPMap3D.Util.T.setPoint(options.position);
        NPMap3D.Overlay.call(this, options, a, type),
            this._entity.polygon = {
                hierarchy: Cesium.Cartesian3.fromNPCartesian3List(options.position),
                material: Cesium.Color.RED
            };
        NPMap3D.Overlay.extendLabel.call(this, options);
        NPMap3D.Overlay.extendMaterial.call(this, options, 'polygon');
    };
})();
