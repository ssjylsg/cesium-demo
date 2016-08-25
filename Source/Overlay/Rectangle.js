(function() {
    NPMap3D.Overlay.Rectangle = function(options) {
        var a = ['height', 'closeTop', 'extrudedHeight', 'closeBottom', 'show', 'fill', 'outline', 'outlineWidth', 'rotation', 'stRotation'],
            type = 'rectangle';
        options.position = NPMap3D.Util.T.setPoint(options.position);
        NPMap3D.Overlay.call(this, options, a, type),
            this._entity.rectangle = {
                coordinates: Cesium.Rectangle.fromDegreesArray(options.position),
                material: Cesium.Color.GREEN.withAlpha(0.5),
                rotation: 0,
                extrudedHeight: options.extrudedHeight || 0,
                height: options.height || 0,
                outline: !0,
                outlineColor: Cesium.Color.YELLOW
            };
        NPMap3D.Overlay.extendLabel.call(this, options);
        NPMap3D.Overlay.extendMaterial.call(this, options, 'rectangle');
    };
})();
