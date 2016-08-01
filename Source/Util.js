NPMap3D.Util = {
    isArray: function(value) {
        if (NPMap3D.Util.defined(value)) {
            return Object.prototype.toString.call(value) === '[object Array]';
        }
        return false;
    },
    getHost: function() {
        return '/map3dassert/Source/lib/ThirdParty/DrawHelper/';
    },
    rad: function(x) {
        return x * Math.PI / 180;
    },
    getGeodesicArea: function(points) {
        var area = 0.0;
        var len = points.length;
        for (var i = 0; i < len - 1; i++) {
            p1 = points[i];
            p2 = points[i + 1];
            area += NPMap3D.Util.rad(p2.x - p1.x) *
                (2 + Math.sin(NPMap3D.Util.rad(p1.y)) +
                    Math.sin(NPMap3D.Util.rad(p2.y)));
        }
        area = area * 6378137.0 * 6378137.0 / 2.0;
        area *= Math.pow((39.37 / 39370), 2);
        return Math.abs(area);
    },
    defined: function(e) {
        return void 0 !== e && null !== e;
    },
    enhanceWithListeners: function(element) {

        element._listeners = {};

        element.addListener = function(name, callback) {
            this._listeners[name] = (this._listeners[name] || []);
            this._listeners[name].push(callback);
            return this._listeners[name].length;
        }
        element.clearListener = function() {
            this._listeners = {};
        }
        element.removeLisenter = function(name, callback) {
            if (this._listeners[name] && this._listeners[name].indexOf(callback) != -1) {
                this._listeners[name].remove(callback);
            }
        }
        element.executeListeners = function(event, defaultCallback, target) {
            if (this._listeners[event.name] && this._listeners[event.name].length > 0) {
                var index = 0;
                for (; index < this._listeners[event.name].length; index++) {
                    if (target) {
                        this._listeners[event.name][index].call(target, event);
                    } else {
                        this._listeners[event.name][index](event);
                    }
                }
            } else {
                if (defaultCallback) {
                    defaultCallback(event);
                }
            }
        }

    }

}
