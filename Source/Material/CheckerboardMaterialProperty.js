(function() {
    NPMap3D.CheckerboardMaterialProperty = function(evenColor, oddColor, repeat) {
        NPMap3D.Material.call(this, {}),
            this._e = new Cesium.CheckerboardMaterialProperty({
                evenColor: evenColor._e,
                oddColor: oddColor._e,
                repeat: new Cesium.Cartesian2(repeat.x, repeat.y)
            });
    }
})();