(function() {
    NPMap3D.Layer.GaodeMap = function(options) {
        var options = NPMap3D.extend(options || {}, {
            isImageLayer: false,
            isOnLine: true,
            url: '',
        });
        this.Projection = options.projection || 'EPSG:900913';
        this.getLayer = function() {
            var googleyx = null;
            if (options.isImageLayer === false) {
                googleyx = new Cesium.UrlTemplateImageryProvider({
                    url: 'http://{s}.is.autonavi.com/appmaptile??lang=zh_cn&size=1&scale=1&style=7&L={z}&Z={z}&Y={y}&X={x}',
                    credit: new Cesium.Credit('高德地图服务'),
                    subdomains: ['webrd01', 'webrd02', 'webrd03', 'webrd04'],
                    tilingScheme: new Cesium.WebMercatorTilingScheme(),
                    maximumLevel: 18
                });
            } else {
                googleyx = new Cesium.UrlTemplateImageryProvider({
                    url: 'http://{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                    credit: new Cesium.Credit('高德地图服务'),
                    subdomains: ['webst01', 'webst02', 'webst03', 'webst04'],
                    tilingScheme: new Cesium.WebMercatorTilingScheme(),
                    maximumLevel: 18,
                    show: false
                });
                var googleyx1 = new Cesium.UrlTemplateImageryProvider({
                    url: 'http://wprd{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8&ltype=11',
                    credit: new Cesium.Credit('高德地图服务'),
                    subdomains: ['01', '02', '03', '04'],
                    tilingScheme: new Cesium.WebMercatorTilingScheme(),
                    maximumLevel: 18,
                    show: false
                });
                return [googleyx1, googleyx];
            }
            return [googleyx];
        };
    };
})();
