(function() {
    NPMap3D.Layer.OpenStreetMap = function(options) {
        var options = NPMap3D.extend(options || {}, {
            isImageLayer: false,
            isOnLine: true,
            url: '',
        });

        this.getLayer = function() {
            var googleyx = new Cesium.UrlTemplateImageryProvider({
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                credit: '',
                subdomains: ['a', 'b', 'c']
            });
            return [googleyx];
        }
    }
})();