(function() {
    NPMap3D.PolylineGlowMaterialProperty = function(color, glowPower) {
        color = color || NPMap3D.Color.fromCssColorString('rgb(255,200,200)'),
            NPMap3D.Material.call(this, {}),
            this._e = new Cesium.PolylineGlowMaterialProperty({
                color: color._e,
                glowPower: glowPower || 1
            });
    }
})();