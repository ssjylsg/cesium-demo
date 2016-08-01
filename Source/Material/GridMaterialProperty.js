(function() {
    NPMap3D.GridMaterialProperty = function(options) {
        var
            defaultOpt = {
                color: NPMap3D.Color.fromCssColorString('rgb(237,17,17)'),
                cellAlpha: 0.1,
                lineCount: new NPMap3D.Cartesian2(8, 8),
                lineThickness: new NPMap3D.Cartesian2(1.0, 1.0),
                lineOffset: new NPMap3D.Cartesian2(0.0, 0.0)
            },
            options = NPMap3D.extend(options || {},
                defaultOpt);
        options.color = options.color._e,
            NPMap3D.Material.call(this, options),
            this._e = new Cesium.GridMaterialProperty(options);
    }
})();