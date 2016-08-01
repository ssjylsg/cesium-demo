(function() {
    NPMap3D.ColorMaterial = function(color) {
        color = color || NPMap3D.Color.fromCssColorString('rgb(1,1,1)'),
            NPMap3D.Material.call(this, {}),
            this._e = new Cesium.ColorMaterialProperty(color._e);
    }
})();