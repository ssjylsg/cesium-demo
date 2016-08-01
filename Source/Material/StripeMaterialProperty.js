(function() {
    NPMap3D.StripeMaterialProperty = function(options) {
        var
            defaultOpt = {
                evenColor: NPMap3D.Color.fromCssColorString('rgb(237,17,17)'),
                oddColor: NPMap3D.Color.fromCssColorString('rgb(237,17,17)'),
                repeat: 1,
                offset: 0,
                orientation: 1
            },
            options = NPMap3D.extend(options || {},
                defaultOpt);
        options.evenColor = options.evenColor._e,
            options.oddColor = options.oddColor._e,
            NPMap3D.Material.call(this, options),
            this._e = new Cesium.StripeMaterialProperty(options);
    }
})();