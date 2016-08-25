Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            return i;
        }
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

// var Class = {
//     create: function() {
//         return function() {
//             this.initialize.apply(this, arguments);
//         }
//     }
// };
// if (!Object.create) {
//     Object.create = function(o) {
//         function F() {}
//         F.prototype = o;
//         return new F();
//     };
// }

(function() {
    var e = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {};
    e.NPMap3D = e.NPMap3D || {
        ISPOINTCONVERT: true,
        StripeOrientation: {
            HORIZONTAL: 0,
            VERTICAL: 1
        },
        CornerType: {
            ROUNDED: 0,
            MITERED: 1,
            BEVELED: 2
        },
        Static: {
            HorizontalOrigin: {
                CENTER: 0,
                LEFT: 1,
                RIGHT: -1
            },
            LabelStyle: {
                FILL: 0,
                OUTLINE: 1,
                FILL_AND_OUTLINE: 2
            },
            VerticalOrigin: {
                CENTER: 0,
                BOTTOM: 1,
                TOP: -1
            }
        },
        Settings: {
            VERSION: "v1.0.0.0",
            signature: "",
            description: '三维地图API',
            company: '东方网力科技股份有限公司'
        },
        defineProperties: function(obj, properties) {
            for (var k in properties) {
                Object.defineProperty(obj, k, properties[k])
            }
        },
        generateUUID: function() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
            });
            return uuid;
        },
        PinBuilder: {
            _: new Cesium.PinBuilder(),
            fromText: function(text, color, size) {
                return this._.fromText(text, color._e, size).toDataURL();
            },
            fromColor: function(argument) {
                return this._.fromColor(color._e, size).toDataURL();
            }
        },
        clone: function(from, to) {
            if (from == null || typeof from != "object") return from;
            if (from.constructor != Object && from.constructor != Array) {
                return from;
            }
            if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
                from.constructor == String || from.constructor == Number || from.constructor == Boolean) {
                return new from.constructor(from);
            }

            to = to || new from.constructor();

            for (var name in from) {
                to[name] = typeof to[name] == "undefined" ? clone(from[name], null) : to[name];
            }

            return to;
        },
        extend: function(target, options) {
            target = target || {};
            for (var key in options) {
                if (target[key] === undefined) {
                    target[key] = this.clone(options[key]);
                }
            }
            return target;
        },
        Cartesian2: function(x, y) {
            this.x = Number(x),
                this.y = Number(y)
        },
        Cartesian3: function(x, y, z) {
            this.x = Number(x),
                this.y = Number(y),
                this.z = Number(z) || 0;
            this.toString = function() {
                return "x:" + this.x + ",y:" + this.y + ",z:" + this.z;
            };
            this.toRadians = function() {
                return Cesium.Cartesian3.fromDegrees(this.x, this.y, this.z);
            }
        },
        toRadians: function(xyz) {
            return Cesium.Cartesian3.fromDegrees(xyz.x, xyz.y, xyz.z);
        },
        forwardMercator: function(xy0) {
            var pole = 20037508.34;
            var xy = {
                x: xy0.x,
                y: xy0.y
            };
            xy.x = xy.x * pole / 180;
            var y = Math.log(Math.tan((90 + xy.y) * Math.PI / 360)) / Math.PI * pole;
            xy.y = Math.max(-20037508.34, Math.min(y, 20037508.34));
            return xy;
        },
        distinct: function(xy0, xy1) {
            var source = NPMap3D.forwardMercator(xy0),
                target = NPMap3D.forwardMercator(xy1);
            return Math.sqrt((source.x - target.x) * (source.x - target.x) + (source.y - target.y) * (source.y - target.y))
        }
    };

})(window);
Cesium.Cartesian3.fromNPCartesian3List = function(list) {
    var p = [];
    for (var i = 0; i < list.length; i++) {
        p.push(list[i].x);
        p.push(list[i].y);
        p.push(list[i].z);
    }
    return Cesium.Cartesian3.fromDegreesArrayHeights(p);
};
Cesium.Rectangle.fromDegreesArray = function(argument) {
    return Cesium.Rectangle.fromDegrees(argument[0].x, argument[0].y, argument[1].x, argument[1].y);
};
NPMap3D.Cartesian2.ZERO = new NPMap3D.Cartesian2(0, 0);
NPMap3D.Cartesian3.ZERO = new NPMap3D.Cartesian3(0, 0, 0);
NPMap3D.Layer = {};
