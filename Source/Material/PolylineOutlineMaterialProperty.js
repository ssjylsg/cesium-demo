(function() {
    NPMap3D.PolylineOutlineMaterialProperty = function(options) {
        var
            defaultOpt = {
                color: NPMap3D.Color.fromCssColorString('rgb(237,17,17)'),
                outlineColor: NPMap3D.Color.fromCssColorString('rgb(237,17,17)'),
                outlineWidth: 1.0
            },
            options = NPMap3D.extend(options || {},
                defaultOpt);
        options.color = options.color._e,
            options.outlineColor = options.outlineColor._e,
            NPMap3D.Material.call(this, options),
            this._e = new Cesium.PolylineOutlineMaterialProperty(options);
    }
})();