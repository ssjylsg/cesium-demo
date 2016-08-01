(function() {
    NPMap3D.CompositeMaterialProperty = function() {
        NPMap3D.Material.call(this, {}),
            this._e = new Cesium.CompositeMaterialProperty({});
    }
})();