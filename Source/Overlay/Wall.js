(function() {
    NPMap3D.Overlay.Wall = function(options) {
        var a = ['show', 'fill', 'outline', 'outlineColor', 'outlineWidth'],
            type = 'wall';
        options.position = NPMap3D.Util.T.setPoint(options.position);
        NPMap3D.Overlay.call(this, options, a, type),
            this._entity[type] = {
                positions: Cesium.Cartesian3.fromNPCartesian3List(options.position),
                maximumHeights: options.maximumHeights,
                minimumHeights: options.minimumHeights,
                material: Cesium.Color.BLUE.withAlpha(0.5),
                outline: !0,
                outlineColor: Cesium.Color.YELLOW
            };
        NPMap3D.Overlay.extendLabel.call(this, options);
        NPMap3D.Overlay.extendMaterial.call(this, options, 'wall');
    };
})();
