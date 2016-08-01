(function() {
    NPMap3D.ImageMaterialProperty = function(image, repeat, color, transparent, glowPower) {
        color = color || NPMap3D.Color.fromCssColorString('rgb(255,200,200)'),
            repeat = repeat || {
                x: 1,
                y: 1
            },
            NPMap3D.Material.call(this, {}),
            this._e = new Cesium.ImageMaterialProperty({
                color: color._e,
                glowPower: glowPower,
                image: image,
                transparent: transparent,
                repeat: new Cesium.Cartesian2(repeat.x, repeat.y)
            });
    }
})();