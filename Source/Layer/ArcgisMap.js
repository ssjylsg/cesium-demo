(function() {
    NPMap3D.Layer.ArcgisMap = function(options) {
        var options = NPMap3D.extend(options || {}, {
            isImageLayer: false,
            isOnLine: true,
            url: '',
        });

        this.getLayer = function() {
            var googleyx = new Cesium.ArcGisMapServerImageryProvider({
                url: options.url
            });
            return [googleyx];
        };
    };
})();