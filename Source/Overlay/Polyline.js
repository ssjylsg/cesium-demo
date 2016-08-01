(function() {
    NPMap3D.Overlay.Polyline = function(options) {
        var a = ['width', 'followSurface', 'show'],
            type = 'polyline';
        NPMap3D.Overlay.call(this, options, a, type),
            this._entity.polyline = {
                positions: Cesium.Cartesian3.fromNPCartesian3List(options.position),
                width: 5,
                material: Cesium.Color.RED
            };
        NPMap3D.Overlay.extendLabel.call(this, options);
        NPMap3D.Overlay.extendMaterial.call(this, options, 'polyline');
    };
})();
