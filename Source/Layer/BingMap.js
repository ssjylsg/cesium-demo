(function() {
    NPMap3D.Layer.BingMap = function(options) {
        this.Projection = 'EPSG:4326';
        var options = NPMap3D.extend(options || {}, {
            isImageLayer: false,
            isOnLine: true,
            url: '',
            mapStyle: 'bing_Road'
        });

        this.getLayer = function() {
            var bing = new Cesium.BingMapsImageryProvider({
                url: '//dev.virtualearth.net',
                key: 'AnnJBLmScQLGhCET-i0R2hNlhBsnyR2pC2EXe4zCJrgWIIqbFToRle3Xwbiig6wK',
                mapStyle: options.mapStyle
            });
            return [bing];
        }
    };
    NPMap3D.Layer.BingMap.MapStyle = {
        AERIAL: "Aerial",
        AERIAL_WITH_LABELS: "AerialWithLabels",
        ROAD: "Road"
    }

})();
