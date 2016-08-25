(function() {
    NPMap3D.Overlay.Cylinder = function(options) {
        var a = ['length','topRadius','bottomRadius', 'fill', 'outline', 'outlineWidth', 'slices', 'numberOfVerticalLines'],
            type = 'cylinder';
        options.position = NPMap3D.Util.T.setPoint(options.position);
        NPMap3D.Overlay.call(this, options, a, type),
            this._entity.position = Cesium.Cartesian3.fromDegrees(options.position.x, options.position.y, options.position.z),
            this._entity.cylinder = {
                length: 4E5,
                topRadius: 2E5,
                bottomRadius: 2E5,
                material: Cesium.Color.GREEN.withAlpha(0.5),
                outline: !0,
                outlineColor: Cesium.Color.DARK_GREEN
            };
        NPMap3D.Overlay.extendLabel.call(this, options);
        NPMap3D.Overlay.extendMaterial.call(this, options, 'cylinder');
    };
})();
