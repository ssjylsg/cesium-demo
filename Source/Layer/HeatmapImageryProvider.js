(function() {
    NPMap3D.Layer.HeatmapImageryProvider = function(options) {
        function _getContainer(width, height, id) {
            var c = document.createElement("div");
            if (id) {
                c.setAttribute("id", id);
            }
            c.setAttribute("style", "width: " + width + "px; height: " + height + "px; margin: 0px; display: none;");
            document.body.appendChild(c);
            return c;
        }

        
        this.getLayer = function() {
            var googleyx = new Cesium.SingleTileImageryProvider({
                url: options.url
            });
            return [googleyx];
        };
    };
})();
