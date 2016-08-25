NPMap3D.Util = {
    isArray: function(value) {
        if (NPMap3D.Util.defined(value)) {
            return Object.prototype.toString.call(value) === '[object Array]';
        }
        return false;
    },
    getHost: function() {
        function c(scriptName) {
            var r = new RegExp("(^|(.*?\\/))(" + scriptName + ")(\\?|$)"),
                s = document.getElementsByTagName('script'),
                src, m, l = "";
            for (var i = 0, len = s.length; i < len; i++) {
                src = s[i].getAttribute('src');
                if (src) {
                    m = src.match(r);
                    if (m) {
                        l = m[1];
                        break;
                    }
                }
            }
            return l;
        }
        window.CESIUM_BASE_URL = c('Cesium.js') || c('NPMap3D.min.js');
        return window.CESIUM_BASE_URL;
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
};

(function() {
    var coordHelper = (function() {
        var pi = 3.14159265358979324; // 圆周率
        var ee = 0.00669342162296594323; // WGS 偏心率的平方
        var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        var pole = 20037508.34;
        var a = 6378245.0 // WGS 长轴半径
        var helper = {};
        // 84->火星
        helper.transform = function(lon, lat) {
            lon = parseFloat(lon);
            lat = parseFloat(lat);
            var localHashMap = {};
            if (this.outofChina(lat, lon)) {
                localHashMap.lon = lon;
                localHashMap.lat = lat;
                return localHashMap;
            }
            var dLat = this.transformLat(lon - 105.0, lat - 35.0);
            var dLon = this.transformLon(lon - 105.0, lat - 35.0);
            var radLat = lat / 180.0 * pi;
            var magic = Math.sin(radLat);
            magic = 1 - ee * magic * magic;
            var sqrtMagic = Math.sqrt(magic);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
            dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
            var mgLat = lat + dLat;
            var mgLon = lon + dLon;
            localHashMap.lon = mgLon;
            localHashMap.lat = mgLat;
            return localHashMap;
        };

        helper.outofChina = function(lat, lon) {
            if (lon < 72.004 || lon > 137.8347)
                return true;
            if (lat < 0.8293 || lat > 55.8271)
                return true;
            return false;
        };

        helper.transformLat = function(x, y) {
            var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
            return ret;
        };

        helper.transformLon = function(x, y) {
            var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
            return ret;
        };
        // 火星->84
        helper.gcj2wgs = function(lon, lat) {
            var p = {
                lon: 0,
                lat: 0
            }
            var lontitude = lon - (this.transform(lon, lat).lon - lon);
            var latitude = lat - (this.transform(lon, lat).lat - lat);
            p.lon = lontitude;
            p.lat = latitude;
            return p;
        };

        // 火星坐标转百度坐标
        helper.bd_encrypt = function(gg_lon, gg_lat) {
            var x = gg_lon,
                y = gg_lat;
            var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
            var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
            var bd_lon = z * Math.cos(theta) + 0.0065;
            var bd_lat = z * Math.sin(theta) + 0.006;
            return {
                lon: bd_lon,
                lat: bd_lat
            };
        };

        // 百度坐标转火星坐标
        helper.bd_decrypt = function(bd_lon, bd_lat) {
            var x = bd_lon - 0.0065,
                y = bd_lat - 0.006;
            var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
            var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
            var gg_lon = z * Math.cos(theta);
            var gg_lat = z * Math.sin(theta);
            return {
                lon: gg_lon,
                lat: gg_lat
            };
        };

        // 经纬度-> 墨卡托投影转换
        helper.webMoctorJW2PM = function(lon, lat) {
            var c = {
                lon: 0,
                lat: 0
            };
            lon = parseFloat(lon);
            lat = parseFloat(lat);
            c.lon = (lon / 180.0) * 20037508.34;
            if (lat > 85.05112) {
                lat = 85.05112;
            }
            if (lat < -85.05112) {
                lat = -85.05112;
            }
            lat = (Math.PI / 180.0) * lat;
            var tmp = Math.PI / 4.0 + lat / 2.0;
            c.lat = 20037508.34 * Math.log(Math.tan(tmp)) / Math.PI;
            return c;
        };
        // 墨卡托投影转换-》经纬度
        helper.inverseMercator = function(lon, lat) {
            lon = 180 * lon / pole;
            lat = 180 / Math.PI * (2 * Math.atan(Math.exp((lat / pole) * Math.PI)) - Math.PI / 2);
            return {
                lon: lon,
                lat: lat
            };
        }

        return helper;
    });
    var Hb = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    function Ib(a) {
        var b = "",
            c, d, e = "",
            f, g = "",
            i = 0;
        f = /[^A-Za-z0-9\+\/\=]/g;
        if (!a || f.exec(a))
            return a;
        a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        do
            c = Hb.indexOf(a.charAt(i++)),
            d = Hb.indexOf(a.charAt(i++)),
            f = Hb.indexOf(a.charAt(i++)),
            g = Hb.indexOf(a.charAt(i++)),
            c = c << 2 | d >> 4,
            d = (d & 15) << 4 | f >> 2,
            e = (f & 3) << 6 | g,
            b += String.fromCharCode(c),
            64 != f && (b += String.fromCharCode(d)),
            64 != g && (b += String.fromCharCode(e));
        while (i < a.length);
        return b
    }

    function Xa(a) {
        return "string" == typeof a
    }

    function H(a, b) {
        isNaN(a) && (a = Ib(a),
            a = isNaN(a) ? 0 : a);
        Xa(a) && (a = parseFloat(a));
        isNaN(b) && (b = Ib(b),
            b = isNaN(b) ? 0 : b);
        Xa(b) && (b = parseFloat(b));
        this.lng = a;
        this.lat = b
    };
    var baiduHelper = {
        $O: 6370996.81,
        lG: [1.289059486E7, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
        Au: [75, 60, 45, 30, 15, 0],
        fP: [
            [1.410526172116255E-8, 8.98305509648872E-6, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 1.73379812E7],
            [-7.435856389565537E-9, 8.983055097726239E-6, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 1.026014486E7],
            [-3.030883460898826E-8, 8.98305509983578E-6, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37],
            [-1.981981304930552E-8, 8.983055099779535E-6, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06],
            [3.09191371068437E-9, 8.983055096812155E-6, 6.995724062E-5, 23.10934304144901, -2.3663490511E-4, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4],
            [2.890871144776878E-9, 8.983055095805407E-6, -3.068298E-8, 7.47137025468032, -3.53937994E-6, -0.02145144861037, -1.234426596E-5, 1.0322952773E-4, -3.23890364E-6, 826088.5]
        ],
        iG: [
            [-0.0015702102444, 111320.7020616939, 1704480524535203, -10338987376042340, 26112667856603880, -35149669176653700, 26595700718403920, -10725012454188240, 1800819912950474, 82.5],
            [8.277824516172526E-4, 111320.7020463578, 6.477955746671607E8, -4.082003173641316E9, 1.077490566351142E10, -1.517187553151559E10, 1.205306533862167E10, -5.124939663577472E9, 9.133119359512032E8, 67.5],
            [0.00337398766765, 111320.7020202162, 4481351.045890365, -2.339375119931662E7, 7.968221547186455E7, -1.159649932797253E8, 9.723671115602145E7, -4.366194633752821E7, 8477230.501135234, 52.5],
            [0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5],
            [-3.441963504368392E-4, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5],
            [-3.218135878613132E-4, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]
        ],
        p: null,
        JD: function(a, b, c) {
            for (; a > c;)
                a -= c - b;
            for (; a < b;)
                a += c - b;
            return a
        },
        ND: function(a, b, c) {
            b != null && (a = Math.max(a, b));
            c != null && (a = Math.min(a, c));
            return a
        },
        Fb: function(a) {
            a.lng = a.lon;
            a.lat = a.lat;
            if (!a || 180 < a.lng || -180 > a.lng || 90 < a.lat || -90 > a.lat)
                return new H(0, 0);
            var b, c;
            a.lng = this.JD(a.lng, -180, 180);
            a.lat = this.ND(a.lat, -74, 74);
            b = new H(a.lng, a.lat);
            for (var d = 0; d < this.Au.length; d++)
                if (b.lat >= this.Au[d]) {
                    c = this.iG[d];
                    break
                }
            if (!c)
                for (d = this.Au.length - 1; 0 <= d; d--)
                    if (b.lat <= -this.Au[d]) {
                        c = this.iG[d];
                        break
                    }
            a = this.gK(a, c);
            a = new H(a.lng, a.lat)
            return {
                lon: a.lng,
                lat: a.lat
            };
        },
        gK: function(a, b) {
            if (a && b) {
                var c = b[0] + b[1] * Math.abs(a.lng),
                    d = Math.abs(a.lat) / b[9],
                    d = b[2] + b[3] * d + b[4] * d * d + b[5] * d * d * d + b[6] * d * d * d * d + b[7] * d * d * d * d * d + b[8] * d * d * d * d * d * d,
                    c = c * (0 > a.lng ? -1 : 1),
                    d = d * (0 > a.lat ? -1 : 1);
                return new H(c, d)
            }
        },
        ToLL: function(b) {
            b.lng = b.lon;
            var c;
            for (var i = 0; i < this.lG.length; i++) {
                if (b.lat >= this.lG[i]) {
                    c = this.fP[i];
                    break;
                }
            }
            b = this.gK(b, c);
            return {
                lon: b.lng.toFixed(6),
                lat: b.lat.toFixed(6)
            };
        }

    };

    var o = NPMap3D.Util.T = {
        map: null,
        Baidu: baiduHelper
    };
    var helper = new coordHelper();
    // 84 -> 地图
    o.setPoint = function(point, map) {
        if (!NPMap3D.ISPOINTCONVERT) {
            return point;
        }
        if (NPMap3D.Util.isArray(point)) {
            var p = [];
            for (var i = 0; i < point.length; i++) {
                p.push(NPMap3D.Util.T.setPoint(point[i]));
            }
            return p;
        }
        var point = {
            lon: point.x,
            lat: point.y,
            z: point.z
        };
        map = map || NPMap3D.Util.T.map;
        var projection = map.getProjection();
        var e;
        switch (projection) {
            case "EPSG:900913":
                e = helper.transform(point.lon, point.lat);
                return new NPMap3D.Cartesian3(e.lon, e.lat, point.z);
                break;
            case "EPSG:4326":
                e = point;
                return new NPMap3D.Cartesian3(e.lon, e.lat, point.z);
            case "EPSG:900913_":
                e = point;
                return new NPMap3D.Cartesian3(e.lon, e.lat, point.z);
                break;
            case "EPSG:4326_BAIDU":
                return point;
                e = helper.transform(point.lon, point.lat); // 84-> 火星
                e = helper.bd_encrypt(e.lon, e.lat); //火星-》百度
                e = NPMap3D.Util.T.Baidu.Fb(e);
                return new NPMap3D.Cartesian3(e.lon, e.lat, point.z);
                break;
            default:
                return point;
        }
    };

    o.setPoints = function(point, map) {
        var result = [];
        for (var i = 0; i < points.length; i++) {
            result.push(NPMapLib.T.setPoint(points[i], map));
        }
        return result;
    };
    // 从地图到84
    o.getPoint = function(point, map) {
        if (!NPMap3D.ISPOINTCONVERT) {
            return point;
        }
        if (NPMap3D.Util.isArray(point)) {
            var p = [];
            for (var i = 0; i < point.length; i++) {
                p.push(NPMap3D.Util.T.getPoint(point[i]));
            }
            return p;
        }
        var point = {
            lon: point.x,
            lat: point.y,
            z: point.z
        };

        map = map || NPMap3D.Util.T.map;
        var projection = map.getProjection();
        var e;
        switch (projection) {
            case "EPSG:900913":
                e = point;
                e = helper.gcj2wgs(e.lon, e.lat);
                return new NPMap3D.Cartesian3(e.lon, e.lat, point.z);
                break;
            case "EPSG:4326":
                return point;
            case "EPSG:900913_":
                return point;
                break;
            case "EPSG:4326_BAIDU":
                return point;
                e = NPMap3D.Util.T.Baidu.ToLL(point);
                e = helper.bd_decrypt(e.lon, e.lat); // 百度->火星
                e = helper.gcj2wgs(e.lon, e.lat); // 火星->经纬度
                return new NPMap3D.Cartesian3(e.lon, e.lat, point.z);
                break;
            default:
                return point;
        }
    };
    o.getPoints = function(points, map) {
        var result = [];
        for (var i = 0; i < points.length; i++) {
            result.push(NPMapLib.T.getPoint(points[i]));
        }
        return result;
    };
    o.setExtent = function(extent, map) {
        if (map.getProjection() == "EPSG:900913") {
            var point0 = NPMapLib.T.setPoint({
                lon: extent.left,
                lat: extent.top
            });
            var point1 = NPMapLib.T.setPoint({
                lon: extent.right,
                lat: extent.bottom
            });
            return new NPMapLib.Geometry.Extent(point0.lon, point1.lat, point1.lon, point0.lat);

        } else {
            return extent;
        }
    };

    o.getExtent = function(map, extent) {
        if (map.getProjection() == "EPSG:900913") {
            var point0 = NPMapLib.T.getPoint({
                lon: extent.left,
                lat: extent.top
            });
            var point1 = NPMapLib.T.getPoint({
                lon: extent.right,
                lat: extent.bottom
            });
            return new NPMapLib.Geometry.Extent(point0.lon, point1.lat, point1.lon, point0.lat);

        } else {
            return extent;
        }
    };

})();
