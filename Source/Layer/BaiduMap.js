(function() {
    NPMap3D.Layer.BaiduMap = function(options) {
        var options = NPMap3D.extend(options || {}, {
            isImageLayer: false,
            isOnLine: true,
            url: '',
        });

        this.getLayer = function() {
            var googleyx = new Cesium.UrlTemplateImageryProvider({
                url: 'http://shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&udt=20150504&app=webearth2&v=009&udt=20150601',
                credit: '',
                subdomains: ['2', '1', '0']
            });
            return [googleyx];
        }
    }
})();