(function() {
    NPMap3D.Layer.GoogleMap = function(options) {
        this.Projection = 'EPSG:900913';
        var options = NPMap3D.extend(options || {}, {
            isImageLayer: false,
            isOnLine: true,
            url: '',
        });

        this.getLayer = function() {
            if (options.isImageLayer) {
                var googleyx = new Cesium.UrlTemplateImageryProvider({
                    url: 'http://{s}.google.cn/vt/lyrs=y@177000000&,highlight:0x35f05296e7142cb9:0xb9625620af0fa98a@1|style:maps&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&s=Galil&src=app', //y@177000000&hl=zh-CN&gl=CN&x={x}&y={y}&z={z}&s=Galil&src=app
                    credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                });
                return [googleyx];
            } else {
                var googleyx = new Cesium.UrlTemplateImageryProvider({
                    url: 'http://{s}.google.cn/vt?pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i285000000!3m9!2szh-CN!3sCN!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0',
                    credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
                    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
                });
                return [googleyx];
            }
        }
    }
})();