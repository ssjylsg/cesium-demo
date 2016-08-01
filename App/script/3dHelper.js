window.helper = {
    map: null,
    currentOverlay: null,
    color: {
        red: NPMap3D.Color.fromCssColorString('#CD0000'),
        blue: NPMap3D.Color.fromCssColorString('#6495ED'),
        green: NPMap3D.Color.fromCssColorString('#00FF66'),
        ALICEBLUE: NPMap3D.Color.fromCssColorString('#F0F8FF'),
        ANTIQUEWHITE: NPMap3D.Color.fromCssColorString('#FAEBD7'),
        BEIGE: NPMap3D.Color.fromCssColorString('#F5F5DC'),
        CHOCOLATE: NPMap3D.Color.fromCssColorString('#D2691E'),
        CORAL: NPMap3D.Color.fromCssColorString('#FF7F50'),
        DARKKHAKI: NPMap3D.Color.fromCssColorString('#BDB76B'),
        DARKORCHID: NPMap3D.Color.fromCssColorString('#9932CC'),
        DEEPSKYBLUE: NPMap3D.Color.fromCssColorString('#00BFFF'),
        DODGERBLUE: NPMap3D.Color.fromCssColorString('#1E90FF'),
        WHITE: NPMap3D.Color.fromCssColorString('#FFFFFF'),
    },
    layer: {
        '天地矢量': new NPMap3D.Layer.TiandiMap(),
        '天地影像': new NPMap3D.Layer.TiandiMap({
            isImageLayer: true
        }),
        '谷歌矢量': new NPMap3D.Layer.GoogleMap(),
        '谷歌影像': new NPMap3D.Layer.GoogleMap({
            isImageLayer: true
        }),
        'Bing Maps Aerial': new NPMap3D.Layer.BingMap({
            mapStyle: 'Aerial'
        }),
        'Bing Maps Roads': new NPMap3D.Layer.BingMap({
            mapStyle: 'Road'
        }),
        'Bing Maps Aerial with labels': new NPMap3D.Layer.BingMap({
            mapStyle: 'AerialWithLabels'
        }),
        'Open-StreetMap': new NPMap3D.Layer.OpenStreetMap()
    },
    czml: {
        'Billboard and Label': [{
            "id": "document",
            "name": "Basic CZML billboard and label",
            "version": "1.0"
        }, {
            "id": "some-unique-id",
            "name": "AGI",
            "description": "<p><a href='http://www.agi.com' target='_blank'>Analytical Graphics, Inc.</a> (AGI) founded Cesium.</p>",
            "billboard": {
                "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACvSURBVDhPrZDRDcMgDAU9GqN0lIzijw6SUbJJygUeNQgSqepJTyHG91LVVpwDdfxM3T9TSl1EXZvDwii471fivK73cBFFQNTT/d2KoGpfGOpSIkhUpgUMxq9DFEsWv4IXhlyCnhBFnZcFEEuYqbiUlNwWgMTdrZ3JbQFoEVG53rd8ztG9aPJMnBUQf/VFraBJeWnLS0RfjbKyLJA8FkT5seDYS1Qwyv8t0B/5C2ZmH2/eTGNNBgMmAAAAAElFTkSuQmCC",
                "scale": 1.5
            },
            "label": {
                "fillColor": {
                    "rgba": [0, 255, 255, 255]
                },
                "font": "11pt Lucida Console",
                "horizontalOrigin": "LEFT",
                "outlineColor": {
                    "rgba": [0, 0, 0, 255]
                },
                "outlineWidth": 2,
                "pixelOffset": {
                    "cartesian2": [12, 0]
                },
                "style": "FILL_AND_OUTLINE",
                "text": "AGI"
            },
            "position": {
                "cartesian": [
                    1216361.4096947117, -4736253.175342511, 4081267.4865667094
                ]
            }
        }],
        'Box': [{
            "id": "document",
            "name": "box",
            "version": "1.0"
        }, {
            "id": "shape1",
            "name": "Blue box",
            "position": {
                "cartographicDegrees": [-114.0, 40.0, 300000.0]
            },
            "box": {
                "dimensions": {
                    "cartesian": [400000.0, 300000.0, 500000.0]
                },
                "material": {
                    "solidColor": {
                        "color": {
                            "rgba": [0, 0, 255, 255]
                        }
                    }
                }
            }
        }, {
            "id": "shape2",
            "name": "Red box with black outline",
            "position": {
                "cartographicDegrees": [-107.0, 40.0, 300000.0]
            },
            "box": {
                "dimensions": {
                    "cartesian": [400000.0, 300000.0, 500000.0]
                },
                "material": {
                    "solidColor": {
                        "color": {
                            "rgba": [255, 0, 0, 128]
                        }
                    }
                },
                "outline": true,
                "outlineColor": {
                    "rgba": [0, 0, 0, 255]
                }
            }
        }, {
            "id": "shape3",
            "name": "Yellow box outline",
            "position": {
                "cartographicDegrees": [-100.0, 40.0, 300000.0]
            },
            "box": {
                "dimensions": {
                    "cartesian": [400000.0, 300000.0, 500000.0]
                },
                "fill": false,
                "outline": true,
                "outlineColor": {
                    "rgba": [255, 255, 0, 255]
                }
            }
        }]
    },
    material: {
        'StripeMaterialProperty': function() {
            return new NPMap3D.StripeMaterialProperty({
                evenColor: helper.color.red,
                oddColor: helper.color.green,
                repeat: 32
            });
        },
        'ColorMaterial': function() {
            return new NPMap3D.ColorMaterial(helper.color.green);
        },
        'CheckerboardMaterialProperty': function() {
            return new NPMap3D.CheckerboardMaterialProperty(
                new NPMap3D.ColorMaterial(helper.color.BEIGE),
                new NPMap3D.ColorMaterial(helper.color.DODGERBLUE), {
                    x: 1,
                    y: 2
                })
        },
        'PolylineGlowMaterialProperty': function() {
            return new NPMap3D.PolylineGlowMaterialProperty(helper.color.DODGERBLUE, 0.5);
        },
        'ImageMaterialProperty': function() {
            return new NPMap3D.ImageMaterialProperty('img/gril.jpg', {
                x: 1,
                y: 1
            }, helper.color.WHITE, 0.3)
        },
        'CompositeMaterialProperty': function() {
            return new NPMap3D.CompositeMaterialProperty()
        },
        'GridMaterialProperty': function() {
            return new NPMap3D.GridMaterialProperty({
                color: helper.color.blue
            });
        },
        'PolylineOutlineMaterialProperty': function() {
            return new NPMap3D.PolylineOutlineMaterialProperty({
                color: helper.color.red,
                outlineColor: helper.color.green,
                outlineWidth: 1
            })
        }
    },
    m: function() {
        return new NPMap3D.Overlay.Marker({
            position: new NPMap3D.Cartesian3(121.32, 23.56),
            image: NPMap3D.PinBuilder.fromText('A', new NPMap3D.Color(0.2, 0.6, 0.8, 1), 46),
            width: 46,
            height: 46
        });
    },
    pv: function() {
        return new NPMap3D.Overlay.PolylineVolume({
            position: [new NPMap3D.Cartesian3(-90.0, 32.0, 0.0), new NPMap3D.Cartesian3(-90.0, 36.0, 100000.0), new NPMap3D.Cartesian3(-94.0, 36.0, 0.0)],
            shape: [
                new NPMap3D.Cartesian2(-50000, -50000),
                new NPMap3D.Cartesian2(50000, -50000),
                new NPMap3D.Cartesian2(50000, 50000),
                new NPMap3D.Cartesian2(-50000, 50000)
            ]
        });
    },

    l: function() {
        return new NPMap3D.Overlay.Label({
            text: 'lsg_netposa',
            position: new NPMap3D.Cartesian3(122.32, 34)
        })
    },

    p: function() {
        return new NPMap3D.Overlay.Polyline({
            position: [new NPMap3D.Cartesian3(121, 21), new NPMap3D.Cartesian3(122, 32)]
        });
    },
    po: function() {
        return new NPMap3D.Overlay.Polygon({
            position: [new NPMap3D.Cartesian3(-115.0, 37.0), new NPMap3D.Cartesian3(-115.0, 32.0), new NPMap3D.Cartesian3(-107.0, 33.0), new NPMap3D.Cartesian3(-102.0, 31.0), new NPMap3D.Cartesian3(-102.0, 35.0)]
        });
    },

    r: function() {
        return new NPMap3D.Overlay.Rectangle({
            position: [new NPMap3D.Cartesian3(-110.0, 20.0), new NPMap3D.Cartesian3(-80.0, 25.0)]
        })
    },

    box: function() {
        return new NPMap3D.Overlay.Box({
            xyz: {
                x: 400000.0,
                y: 300000.0,
                z: 500000.0
            },
            position: new NPMap3D.Cartesian3(121.32, 23.56, 30000)
        });
    },

    c: function() {
        return new NPMap3D.Overlay.Cylinder({
            position: new NPMap3D.Cartesian3(121.32, 23.56, 30000)
        });
    },

    e: function() {
        return new NPMap3D.Overlay.Ellipse({
            position: new NPMap3D.Cartesian3(121.32, 23.56, 30000)
        });
    },
    wall: function() {
        return new NPMap3D.Overlay.Wall({
            position: [new NPMap3D.Cartesian3(-107.0, 43.0, 100000.0),
                new NPMap3D.Cartesian3(-97.0, 43.0, 100000.0), new NPMap3D.Cartesian3(-97.0, 40.0, 100000.0),
                new NPMap3D.Cartesian3(-107.0, 40.0, 100000.0), new NPMap3D.Cartesian3(-107.0, 43.0, 100000.0)
            ]
        });
    },
    initMap: function(mapId) {
        this.map = new NPMap3D.Map3D({
            container: mapId || 'mapId'
        });
        this.bindHtml();
        this.startDraw();
        return this.map;
    },
    addOverlay: function(m) {
        var f = this[m]();
        this.map.removeAll(),
            this.map.addOverlay(f),
            o = f.center,
            o.z = 3000000,
            this.map.setCenter(o);
        this.currentOverlay = f;
        return f;
    },
    kgetCurrentCenter: function() {
        this.bindInfo(this.map.getCenter().toString());
    },
    bindInfo: function(msg) {
        $('#pointMsg').val(msg);
    },
    bindHtml: function() {
        var that = this;
        $(document.body).keydown(function(e) {
            if (e.keyCode == 46 && that.currentOverlay) {
                that.map.removeOverlay(that.currentOverlay);
            }
        })

        $("#materials").change(function() {
            if (NPMap3D.Util.defined(that.currentOverlay)) {
                if (that.currentOverlay.hasOwnProperty('material')) {
                    that.currentOverlay.material = helper.material[$(this).val()]();
                }
            }
        });

        for (var k in helper.layer) {
            var opt = document.createElement('option');
            opt.value = helper.layer[k];
            opt.text = k;
            opt.layer = helper.layer[k];
            $('#layer').append(opt);
        }

        $('#layer').change(function() {
            that.map.addLayer(this.options[this.selectedIndex].layer);
        });


        for (var k in helper.czml) {
            var opt = document.createElement('option');
            opt.value = helper.czml[k];
            opt.data = helper.czml[k];
            opt.text = k;
            $('#czml').append(opt);
        }
        $('#czml').change(function() {
            that.map.loadCzmlData(this.options[this.selectedIndex].data);
        });

        $('#mode').change(function() {
            that.map.setMode($(this).val());
        });
    },
    mutilMarkers: function() {
        var x = 121.23,
            y = 23.12,
            collections = new NPMap3D.MarkerCollection(this.map);
        for (var i = 1500; i >= 0; i--) {
            collections.add(new NPMap3D.MarkerOption({
                position: {
                    x: x + Math.random(4),
                    y: y + Math.random(4),
                    z: 1000
                },
                imageIndex: i,
                image: NPMap3D.PinBuilder.fromText(i, NPMap3D.Color.fromRandom(), 45)
            }));
            console.log('end');
        }
        window.onbeforeunload = function() {
            collections.removeAll();
        }
    },
    mutilLables: function() {
        var x = 121.23,
            y = 23.12,
            collections = new NPMap3D.LabelCollection(this.map);
        for (var i = 1500; i >= 0; i--) {
            collections.add(new NPMap3D.LabelOption({
                position: {
                    x: x + Math.random(4),
                    y: y + Math.random(4),
                    z: 1000
                },
                text: i + '',
                color: NPMap3D.Color.fromRandom(),
                fillColor: NPMap3D.Color.fromRandom()
            }));
            console.log('end');
        }
        window.onbeforeunload = function() {
            collections.removeAll();
        }
    },
    mutilPoints: function() {
        var x = 121.23,
            y = 23.12,
            collections = new NPMap3D.PointCollection(this.map);
        for (var i = 15000; i >= 0; i--) {
            collections.add(new NPMap3D.PointOption({
                position: {
                    x: x + Math.random(4),
                    y: y + Math.random(10),
                    z: 0
                },
                color: this.color.red,
                outlineColor: Cesium.Color.BLUE,
                pixelSize: 10,
            }));
            console.log('end');
        }
        window.onbeforeunload = function() {
            collections.removeAll();
        }
    },
    startDraw: function() {
        this.drawer = new DrawHelper(helper.map);
        this.drawer.start();
    },
    measureDistance: function() {
        this.drawer.measureDistance();
    },
    measureArea: function() {
        this.drawer.measureArea();
    }


}
