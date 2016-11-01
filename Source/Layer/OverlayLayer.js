(function() {
    NPMap3D.Layer.OverlayLayer = function(name) {
        var layer = new Cesium.CustomDataSource(name);

        this.addOverlay = function(e) {
            layer.entities.add(e._entity);
        }
        this.removeOverlay = function(e) {
            layer.entities.remove(e._entity);
        }
        this.addOverlays = function(es) {
            for (var i = 0; i < es.length; i++) {
                this.addOverlay(es[i]);
            }
        }
        this.removeAll = function() {
            layer.entities.removeAll();
        }
        this.show = function() {
            layer.show = true;
        }
        this.hide = function() {
            layer.show = false;
        }
        this.get = function() {
            return layer;
        }
    }
})();
