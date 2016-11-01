(function() {
    NPMap3D.Layer.QQMap = function(options) {
        var options = NPMap3D.extend(options || {}, {
            isImageLayer: false,
            isOnLine: true,
            url: '',
        });
        this.Projection = options.projection || 'EPSG:900913';
        this.getLayer = function() {
            var googleyx = new Cesium.UrlTemplateImageryProvider({
                url: 'http://rt{s}.map.gtimg.com//tile?z={z}&x={x}&y={y}&styleid=1&version=100',
                credit: new Cesium.Credit('高德地图服务'),
                subdomains: ['0', '1','2'],
                tilingScheme: new Cesium.WebMercatorTilingScheme(),
                maximumLevel: 18
            });
            return [googleyx];
        };
    };
})();
