(function() {

    /**
     * 
     * @param {[type]} options [description]
     * @param {[type]} extend  [description]
     * @param {[type]} type    [description]
     */
    NPMap3D.Overlay = function(options, extend, type) {
        this._events = {},
            options = options || {},
            this._entity = new Cesium.Entity({
                id: NPMap3D.generateUUID(),
                name: options.name,
                parent: options.parent,
                show: true
            });
        this.setMap = function(map) {
            this._map = map;
        }
        this.setData = function(value) {
            this._clientData = value;
        };
        this.getData = function() {
            return this._clientData;
        };
        if (!type) {
            return;
        }
        var b = ['show'],
            a = b.concat(extend || []);
        for (var i = a.length - 1; i >= 0; i--) {
            var l = a[i];
            var temp = l;
            if (l == "rotation") {
                (function(index, self) {
                    Object.defineProperty(self, index, {
                        get: function() {
                            var e = this._entity[type][index];
                            if (e) {
                                return Cesium.Math.toDegrees(e.getValue());
                            }
                        },
                        set: function(value) {
                            this._entity[type][index] = Cesium.Math.toRadians(Number(value));
                        }
                    });
                })(l, this);
                continue;
            }
            if (l === "position") {
                (function(index, self) {
                    Object.defineProperty(self, index, {
                        get: function() {
                            var e = this._entity[index];
                            if (e) {
                                e = e.getValue();
                                var l = Cesium.Cartographic.fromCartesian(e);
                                return NPMap3D.Util.T.getPoint(new NPMap3D.Cartesian3(Cesium.Math.toDegrees(l.longitude), Cesium.Math.toDegrees(l.latitude), l.height));
                            }
                        },
                        set: function(value) {
                            if (NPMap3D.Util.defined(value)) {
                                value = NPMap3D.Util.T.setPoint(value);
                                this._entity[index] = Cesium.Cartesian3.fromDegrees(value.x, value.y, value.z);
                            }
                        }
                    });
                })(l, this);
                continue;
            }
            (function(index, self) {
                if (!self.hasOwnProperty(index)) {
                    Object.defineProperty(self, index, {
                        get: function() {
                            var e = this._entity[type][index];
                            if (e) {
                                return e.getValue();
                            }
                        },
                        set: function(value) {
                            this._entity[type][index] = value;
                        }
                    });
                }

            })(l, this)
        }
        NPMap3D.defineProperties(this, {
            parent: {
                get: function() {
                    return this._parent;
                },
                set: function(value) {
                    this._parent = value;
                    this._entity.parent = value._entity;
                }
            },
            name: {
                get: function() {
                    return this._entity.name;
                },
                set: function(value) {
                    this._entity.name = value;
                }
            },
            id: {
                get: function() {
                    return this._entity.id;
                }
            },
            center: {
                get: function() {
                    var e;
                    switch (type) {
                        case 'label':
                        case 'billboard':
                        case 'box':
                        case 'cylinder':
                        case 'ellipse':
                        case 'ellipsoid':
                            e = this._entity.position.getValue();
                            break;
                        case "polyline":
                        case "wall":
                        case "polylineVolume":
                            e = this._entity[type].positions.getValue()[0]
                            break;
                        case "polygon":
                            e = this._entity[type].hierarchy.getValue()[0]
                            break;
                        case "rectangle":
                            e = this._entity[type].coordinates.getValue();
                            var l = Cesium.Rectangle.center(e);
                            return NPMap3D.Util.T.getPoint(new NPMap3D.Cartesian3(Cesium.Math.toDegrees(l.longitude), Cesium.Math.toDegrees(l.latitude), l.height));
                            break;
                    }

                    if (e) {
                        var l = Cesium.Cartographic.fromCartesian(e);
                        return NPMap3D.Util.T.getPoint(new NPMap3D.Cartesian3(Cesium.Math.toDegrees(l.longitude), Cesium.Math.toDegrees(l.latitude), l.height));
                    }
                }
            }
        });

        NPMap3D.Util.enhanceWithListeners(this);

        this.setListener = function(primitive, type, callback) {
            primitive[type] = callback;
        };

    };

    NPMap3D.Overlay.extendLabel = function(options) {
        this.label = {},
            this._entity.label = new Cesium.LabelGraphics({
                text: options.text,
                verticalOrigin: Cesium.VerticalOrigin.TOP,
                font: '24px Helvetica'
            }),
            labelType = 'label';
        var a = ['text', 'font', 'outlineWidth', 'scale', 'show', 'horizontalOrigin', 'verticalOrigin'];
        var that = this;
        NPMap3D.defineProperties(this.label, {
            "fillColor": {
                get: function() {
                    var e = that._entity[labelType]['fillColor'];
                    if (e) {
                        e = e.getValue();
                        return new NPMap3D.Color(e.red, e.green, e.blue, e.alpha);
                    }
                },
                set: function(e) {
                    that._entity[labelType]['fillColor'] = e._e;
                }
            },
            "outlineColor": {
                get: function() {
                    var e = that._entity[labelType]['outlineColor'].getValue();
                    return new NPMap3D.Color(e.red, e.green, e.blue, e.alpha);
                },
                set: function(e) {
                    that._entity[labelType]['outlineColor'] = e._e;
                }
            },
            'labelPosition': {
                set: function(p) {
                    if (p) {
                        if (NPMap3D.Util.isArray(p)) {
                            that._entity.position = Cesium.Cartesian3.fromDegrees(p[0], p[1], p[2] || 0);
                        } else {
                            that._entity.position = Cesium.Cartesian3.fromDegrees(p.x, p.y, p.z);
                        }
                    }
                }
            }
        });
        for (var i = a.length - 1; i >= 0; i--) {
            var l = a[i];
            var temp = l;

            (function(index, self) {
                if (!self.label.hasOwnProperty(index)) {
                    var that = self;
                    Object.defineProperty(self.label, index, {
                        get: function() {
                            return that._entity[labelType][index];
                        },
                        set: function(value) {
                            that._entity[labelType][index] = value;
                        }
                    });
                }

            })(l, this)
        }
    };

    NPMap3D.Overlay.extendMaterial = function(options, type) {
        Object.defineProperty(this, "material", {
            set: function(material) {
                this._entity[type].material = material._e;
            }
        });
    };


})();
