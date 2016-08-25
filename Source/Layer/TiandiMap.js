(function() {
    NPMap3D.Layer.TiandiMap = function(options) {
        this.Projection = 'EPSG:4326';
        var options = NPMap3D.extend(options || {}, {
            isImageLayer: false,
            isOnLine: true,
            url: '',
        });

        this.getLayer = function() {
            if (options.isImageLayer) {
                var tiandituimg = new Cesium.WebMapTileServiceImageryProvider({
                    url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
                    layer: "tdtBasicLayer",
                    style: "default",
                    format: "image/jpeg",
                    tileMatrixSetID: "GoogleMapsCompatible",
                    show: true
                });
                var tianditutxt = new Cesium.WebMapTileServiceImageryProvider({
                    url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
                    layer: "tdtAnnoLayer",
                    style: "default",
                    format: "image/jpeg",
                    tileMatrixSetID: "GoogleMapsCompatible",
                    show: false
                });
                return [tiandituimg, tianditutxt];
            } else {
                var tianditusl = new Cesium.WebMapTileServiceImageryProvider({
                    url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
                    layer: "tdtVecBasicLayer",
                    style: "default",
                    format: "image/jpeg",
                    tileMatrixSetID: "GoogleMapsCompatible",
                    show: false
                });
                var tianditutxt = new Cesium.WebMapTileServiceImageryProvider({
                    url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
                    layer: "tdtAnnoLayer",
                    style: "default",
                    format: "image/jpeg",
                    tileMatrixSetID: "GoogleMapsCompatible",
                    show: false
                });
                return [tianditusl, tianditutxt];

            }
        }
    }
})();
