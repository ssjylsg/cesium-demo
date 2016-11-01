(function() {
    /**
     * 颜色
     * @class NPMap3D.Color
     * @constructor
     * @param {number} red    
     * @param {number} green  
     * @param {number} blue   
     * @param {number} alpha 
     */
    NPMap3D.Color = function(red, green, blue, alpha) {
        this._e = new Cesium.Color(red, green, blue, alpha || 1);
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    NPMap3D.Color.fromRandom = function(options) {
        var result = {};
        Cesium.Color.fromRandom(options, result);
        return new NPMap3D.Color(result.red, result.green, result.blue, result.alpha);
    };
    NPMap3D.Color.fromCssColorString = function(color) {
        var result = {};
        Cesium.Color.fromCssColorString(color, result);
        return new NPMap3D.Color(result.red, result.green, result.blue, result.alpha);
    };

    NPMap3D.Color.fromHsl = function(i, r, n, o, l) {
        var result = Cesium.Color.fromHsl(i, r, n, o, l);
        return new NPMap3D.Color(result.red, result.green, result.blue, result.alpha);
    }

})();
