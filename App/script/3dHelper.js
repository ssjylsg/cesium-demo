 define([require], function(require) {
     window.helper = {
         navItems: [{
             url: '/map3dassert/app/index.html?d=s',
             name: '柱状统计图'
         }, {
             url: '/map3dassert/app/index.html?d=c',
             name: '行政区统计图'
         }, {
             url: '/map3dassert/app/index.html?d=p',
             name: '人口统计图'
         }, {
             url: '/map3dassert/app/index.html?d=d',
             name: '动画线'
         }, {
             url: '/map3dassert/app/index.html?d=v',
             name: '播放视频'
         }, {
             url: '/map3dassert/app/index.html?d=h',
             name: '热力图'
         }, {
             url: '/map3dassert/app/index.html?d=f',
             name: '伴线运动'
         }],
         getQueryString: function(name) {
             var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
             var r = window.location.search.substr(1).match(reg);
             if (r != null) return unescape(r[2]);
             return null;
         },
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
             'Open-StreetMap': new NPMap3D.Layer.OpenStreetMap(),
             '高德': new NPMap3D.Layer.GaodeMap(),
             '高德影像': new NPMap3D.Layer.GaodeMap({
                 isImageLayer: true
             }),
             '百度': new NPMap3D.Layer.BaiduMap(),
             // '腾讯':new NPMap3D.Layer.QQMap()
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
                 position: new NPMap3D.Cartesian3(116.39204443271859, 39.916900866377404),
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
             //this.startDraw();
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
         },
         loadData: function() {
             map.setCenter({
                 x: 116.50898413999023,
                 y: 40.19482975746802,
                 z: 433519.63970846223
             });
             var url = '/server2428080/netposa/query/shangquan/getBoundary?areacode=';
             $.when($.getJSON(url + '1117'), $.getJSON(url + '1118'), $.getJSON(url + '2898'),
                 $.getJSON(url + '2305'), $.getJSON(url + '2603'), $.getJSON(url + '1116'),
                 $.getJSON(url + '1959'), $.getJSON(url + '1551'), $.getJSON(url + '1115'),
                 $.getJSON(url + '2507'), $.getJSON(url + '1898'), $.getJSON(url + '1548'),
                 $.getJSON(url + '1550'), $.getJSON(url + '1960'), $.getJSON(url + '2304'), $.getJSON(url + '1552')
             ).then(function(f0, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16) {
                 var data = [];
                 data.push(f0), data.push(f1), data.push(f2), data.push(f3), data.push(f4), data.push(f5),
                     data.push(f6), data.push(f7), data.push(f8), data.push(f9), data.push(f10), data.push(f11),
                     data.push(f12), data.push(f13), data.push(f14), data.push(f15);
                 var ps = [];
                 $.each(data, function(i, f) {
                     var temp = f[0].data[0];
                     temp.height = 0;
                     temp.geo = eval("(" + temp.geo + ")");
                     temp.color = new NPMap3D.Color(Math.random(), Math.random(), Math.random()); //NPMap3D.Color.fromRandom();
                     temp.polygon = [];
                     for (var i = temp.geo.coordinates.length - 1; i >= 0; i--) {
                         var c = temp.geo.coordinates[i];
                         var ms = $.map(c[0], function(f) {
                             return new NPMap3D.Cartesian3(f[0], f[1])
                         });

                         var p = new NPMap3D.Overlay.Polygon({
                             position: ms
                         });
                         p.material = temp.color;
                         p.extrudedHeight = Math.random() * 10000;
                         p.label.text = temp.area_name;
                         p.label.labelPosition = new NPMap3D.Cartesian3(temp.x, temp.y);
                         temp.polygon.push(p);
                         map.addOverlay(p);
                     }
                     ps.push(temp);
                 });
                 window.beijing = ps;
                 var i = 0;
                 var interval = window.setInterval(function() {
                     if ((i++) == 10) {
                         window.clearInterval(interval);
                         return;
                     }
                     $.each(ps, function(i, value) {
                         $.each(value.polygon, function(j, polygon) {
                             // polygon.material = NPMap3D.Color.fromRandom();
                             polygon.extrudedHeight += Math.random() * 10000;
                         })
                     });
                 }, 1500)

                 $(document).bind('keydown', function(e) {
                     if (e.keyCode === 46) {
                         window.clearInterval(interval);
                         map.removeAll();
                         $(document).unbind('keydown')
                     }
                 })

             })

         },
         loadDataCylinder: function() {
             map.setCenter({
                 x: 116.50898413999023,
                 y: 40.19482975746802,
                 z: 433519.63970846223
             });
             var url = '/server2428080/netposa/query/shangquan/getBoundary?areacode=';
             $.when($.getJSON(url + '1117'), $.getJSON(url + '1118'), $.getJSON(url + '2898'),
                 $.getJSON(url + '2305'), $.getJSON(url + '2603'), $.getJSON(url + '1116'),
                 $.getJSON(url + '1959'), $.getJSON(url + '1551'), $.getJSON(url + '1115'),
                 $.getJSON(url + '2507'), $.getJSON(url + '1898'), $.getJSON(url + '1548'),
                 $.getJSON(url + '1550'), $.getJSON(url + '1960'), $.getJSON(url + '2304'), $.getJSON(url + '1552')
             ).then(function(f0, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16) {
                 var data = [];
                 data.push(f0), data.push(f1), data.push(f2), data.push(f3), data.push(f4), data.push(f5),
                     data.push(f6), data.push(f7), data.push(f8), data.push(f9), data.push(f10), data.push(f11),
                     data.push(f12), data.push(f13), data.push(f14), data.push(f15);
                 var ps = [];
                 $.each(data, function(i, f) {
                     var temp = f[0].data[0];
                     temp.height = Math.random() * 100000;
                     temp.geo = eval("(" + temp.geo + ")");
                     temp.color = new NPMap3D.Color(Math.random(), Math.random(), Math.random()); //NPMap3D.Color.fromRandom();
                     for (var i = temp.geo.coordinates.length - 1; i >= 0; i--) {
                         var c = temp.geo.coordinates[i];
                         var ms = $.map(c[0], function(f) {
                             return new NPMap3D.Cartesian3(f[0], f[1])
                         });

                         var p1 = new NPMap3D.Overlay.Polygon({
                             position: ms
                         });
                         p1.material = temp.color;
                         map.addOverlay(p1);
                     }

                     var p = new NPMap3D.Overlay.Ellipse({
                         position: new NPMap3D.Cartesian3(temp.x, temp.y, 0),
                         semiMinorAxis: 800,
                         semiMajorAxis: 800
                     });
                     p.material = temp.color;
                     p.extrudedHeight = temp.height;
                     p.outline = false;
                     p.topRadius = p.bottomRadius = 5000;
                     p.label.text = temp.area_name;
                     p.label.font = "18px Helvetica";
                     p.label.fillColor = helper.color.red;
                     p.label.outlineColor = helper.color.red;
                     p.label.outlineWidth = 0;
                     p.label.labelPosition = new NPMap3D.Cartesian3(temp.x, temp.y, temp.height);
                     temp.polygon = p;
                     map.addOverlay(p);

                     ps.push(temp);
                 });
                 window.beijing = ps;
                 var i = 0;
                 var interval = window.setInterval(function() {
                     if ((i++) == 50) {
                         window.clearInterval(interval);
                         return;
                     }
                     $.each(ps, function(i, value) {
                         value.polygon.extrudedHeight += 1000;
                         value.polygon.label.labelPosition = new NPMap3D.Cartesian3(value.x, value.y, value.polygon.extrudedHeight);
                     });
                 }, 1000)

                 $(document).bind('keydown', function(e) {
                     if (e.keyCode === 46) {
                         window.clearInterval(interval);
                         map.removeAll();
                         $(document).unbind('keydown')
                     }
                 })

             })

         },
         loadPopulation: function() {
             $.when($.getJSON('script/population909500.json')).then(function(a) {
                 for (var j = 0; j < a.length; j++) {
                     var g = a[j],
                         c = g[0],
                         g = g[1];
                     var f = j === 0;
                     var b = 1E7;
                     helper.map.viewer.entities.suspendEvents()
                     for (var m = 0; m < g.length; m += 3) {
                         var e = g[m],
                             k = g[m + 1],
                             h = g[m + 2];
                         if (h !== 0) {
                             var i = Cesium.Color.fromHsl(0.6 - h * 0.5, 1, 0.5),
                                 l = Cesium.Cartesian3.fromDegrees(k, e, 0),
                                 e = Cesium.Cartesian3.fromDegrees(k, e, h * b),
                                 k = new Cesium.PolylineGraphics;
                             k.material = new Cesium.ColorMaterialProperty(i);
                             k.width = new Cesium.ConstantProperty(2);
                             k.followSurface = new Cesium.ConstantProperty(!1);
                             k.positions = new Cesium.ConstantProperty([l, e]);
                             i = new Cesium.Entity({
                                 id: c + " index " + m.toString(),
                                 show: f,
                                 polyline: k,
                                 seriesName: c
                             });
                             helper.map.viewer.entities.add(i);
                         }
                     }
                     helper.map.viewer.entities.resumeEvents()
                 }
             })

         },

         addAnimationLine: function() {
             var ps = [{
                 x: 107.30544710088672,
                 y: 34.41147607964951
             }, {
                 x: 108.82454138457992,
                 y: 34.383563880200214
             }, {
                 x: 109.46858516661652,
                 y: 34.508123804825466
             }, {
                 x: 111.28259125537518,
                 y: 34.10212992722389
             }, {
                 x: 113.09755776502115,
                 y: 33.47231243021267
             }, {
                 x: 114.04612857377508,
                 y: 33.05525842233073
             }, {
                 x: 115.26480033860298,
                 y: 32.530450308636425
             }, {
                 x: 116.44076317465549,
                 y: 32.095129189566585
             }, {
                 x: 117.16304115799717,
                 y: 31.890602109679964
             }, {
                 x: 118.35783529181644,
                 y: 31.552299639104106
             }, {
                 x: 119.47568077730975,
                 y: 31.104741288306524
             }, {
                 x: 120.14570819471743,
                 y: 30.385141664902303
             }, {
                 x: 120.96183607045893,
                 y: 29.59101003168381
             }, {
                 x: 121.35235920366534,
                 y: 28.733714395489944
             }, {
                 x: 120.72920693613007,
                 y: 28.10081101016545
             }];
             var animationLine = new NPMap3D.Overlay.AnimationLine(this.map, ps, {
                 polylineStyle: {
                     width: 2.0
                 },
                 'headMarker': {
                     image: '/map3dassert/App/images/Car.png',
                     width: 46,
                     height: 46
                 }
             });
             animationLine.drawSpeed = 100000 / 10;
             var pointcollection = new NPMap3D.PointCollection(this.map);
             animationLine.addListener('STEP', function(f) {
                 if (f.drawIndex != ps.length - 1) {
                     pointcollection.add(new NPMap3D.PointOption({
                         color: Cesium.Color.WHITE,
                         outlineColor: Cesium.Color.RED,
                         outlineWidth: 1,
                         pixelSize: 6,
                         position: f.point
                     }))
                 }
             })
             animationLine.start();
             this.animationLine = animationLine;
         },

         addVideo: function() {
             var video = document.createElement('video');
             video.id = 'trailer';
             video.style.display = 'none';
             video.style.position = ' absolute';
             video.style.bottom = '75px';
             video.style.right = '0';
             video.style.width = '320px';
             video.style.height = '180px';
             video.autoplay = "autoplay";
             video.loop = "true";
             video.crossorigin = "";
             video.controls = "";
             var source = [{
                 src: "/map3dassert/App/videos/big-buck-bunny_trailer.webm",
                 type: "video/webm"
             }, {
                 src: "/map3dassert/App/videos/big-buck-bunny_trailer.mp4",
                 type: "video/mp4"
             }, {
                 src: "/map3dassert/App/videos/big-buck-bunny_trailer.mov",
                 type: "video/quicktime"
             }];

             $.each(source, function(i, v) {
                 var s = document.createElement('SOURCE');
                 s.src = v.src;
                 s.type = v.type;
                 $(video).append(s);
             })

             $(window.document.body).append(video)

             var e = new NPMap3D.Overlay.Ellipsoid({
                 position: new NPMap3D.Cartesian3(104.71325577059447, 36.90962472341095, 100000),
                 radii: {
                     x: 3E5,
                     y: 3E5,
                     z: 3E5
                 },
                 material: video
             });
             helper.map.addOverlay(e);
             helper.currentOverlay = e;
             e._entity.ellipsoid.material.repeat = {
                 x: 4,
                 y: 4
             };

         },
         createHeatMap: function() {
             var c = this.map.getCenter();
             var ps = [];
             for (var i = 100; i >= 0; i--) {
                 ps.push({
                     x: c.x + Math.random() * Math.pow(-1, i),
                     y: c.y + Math.random() * Math.pow(-1, i),
                     value: Math.round(300 * Math.random())
                 })
             }
             var heatMap = this.heatMap = CesiumHeatmap.create(this.map.viewer, {
                 north: 40.908179104039016,
                 east: 115.91325577059447,
                 south: 30.008179104039016,
                 west: 100.01325577059447
             }, {
                 opacity: 0.3,
                 visible: true,
                 radius: 10,
             });
             heatMap.setWGS84Data(0, 300, ps);
             this.map.setCenter({
                 x: ps[0].x,
                 y: ps[0].y,
                 z: 464598.80472653284
             });
         },
         crateTrajectory: function() {
             var polyline = [
                 [new NPMap3D.Cartesian3(108.93497975211476, 34.24270719817938, 300),
                     new NPMap3D.Cartesian3(108.93516608065623, 34.24270758354259, 300),
                     new NPMap3D.Cartesian3(108.93584875486133, 34.24271198399154, 300),
                     new NPMap3D.Cartesian3(108.93607065638382, 34.24271410274987, 300),
                     new NPMap3D.Cartesian3(108.93745985528139, 34.242721942980374, 300),
                     new NPMap3D.Cartesian3(108.93759976723965, 34.24272281395232, 300),
                     new NPMap3D.Cartesian3(108.93789255269307, 34.24271784287146, 300),
                     new NPMap3D.Cartesian3(108.93839923306159, 34.242712211951535, 300),
                     new NPMap3D.Cartesian3(108.9394271160909, 34.24269088663736, 300),
                     new NPMap3D.Cartesian3(108.93968357405139, 34.24276427254095, 300),
                     new NPMap3D.Cartesian3(108.93994920869126, 34.24276016798567, 300),
                     new NPMap3D.Cartesian3(108.94053331425961, 34.242748241968506, 300),
                     new NPMap3D.Cartesian3(108.9405361060052, 34.24274962615361, 300),
                     new NPMap3D.Cartesian3(108.94070730625353, 34.24274680214072, 300),
                     new NPMap3D.Cartesian3(108.94081808197924, 34.242747141066296, 300),
                     new NPMap3D.Cartesian3(108.94118500373574, 34.2427489383016, 300),
                     new NPMap3D.Cartesian3(108.94211255002521, 34.24275463838312, 300),
                     new NPMap3D.Cartesian3(108.94234405652021, 34.242756134014904, 300),
                     new NPMap3D.Cartesian3(108.94234654135133, 34.24285081333843, 300),
                     new NPMap3D.Cartesian3(108.94284952634065, 34.24285065042066, 300),
                     new NPMap3D.Cartesian3(108.9432818150264, 34.24285062942233, 300),
                     new NPMap3D.Cartesian3(108.94340753207644, 34.24285064770816, 300),
                     new NPMap3D.Cartesian3(108.94402314650746, 34.24285079659468, 300),
                     new NPMap3D.Cartesian3(108.9448700247924, 34.24285073645632, 300),
                     new NPMap3D.Cartesian3(108.94534962561761, 34.24285418368149, 300),
                     new NPMap3D.Cartesian3(108.94565666050552, 34.24285660364663, 300),
                     new NPMap3D.Cartesian3(108.94633172418482, 34.24285962532787, 300),
                     new NPMap3D.Cartesian3(108.9465519167343, 34.24293801988555, 300),
                     new NPMap3D.Cartesian3(108.94855045903802, 34.242928717184995, 300),
                     new NPMap3D.Cartesian3(108.94914789584799, 34.24292379469015, 300),
                     new NPMap3D.Cartesian3(108.94917436227426, 34.24471250800584, 300),
                     new NPMap3D.Cartesian3(108.9491768191811, 34.245140389858804, 300),
                     new NPMap3D.Cartesian3(108.94919589068517, 34.24594199234075, 300),
                     new NPMap3D.Cartesian3(108.94920439965715, 34.24671167971242, 300),
                     new NPMap3D.Cartesian3(108.94920984184125, 34.24719898134311, 300),
                     new NPMap3D.Cartesian3(108.9492181812456, 34.247603248125884, 300),
                     new NPMap3D.Cartesian3(108.94927459491485, 34.247602843398724, 300),
                     new NPMap3D.Cartesian3(108.9492944972803, 34.247992380028585, 300),
                     new NPMap3D.Cartesian3(108.94930969311712, 34.24865181328034, 300),
                     new NPMap3D.Cartesian3(108.94930938957947, 34.24870734262104, 300),
                     new NPMap3D.Cartesian3(108.94931027330492, 34.24887061792121, 300),
                     new NPMap3D.Cartesian3(108.94931104821676, 34.24914606029744, 300),
                     new NPMap3D.Cartesian3(108.9493112292502, 34.24926641109382, 300)
                 ]
             ];
             var camera = new NPMap3D.Camera(helper.map);
             camera.trackFlight(polyline, {
                 multiplier: 0.2,
                 color: '#FF0000',
                 width: 3,
                 follow: true,
                 isLoop: true
             });

         },
         createTileSet: function() {
             var viewer = viewer.viewer;
             var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                 url: 'http://192.168.61.28:8001/project/3d-tiles-samples/tilesets/TilesetWithDiscreteLOD/'
             }));

             tileset.readyPromise.then(function(tileset) {
                 viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
                 viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
             });
             return tileset;
         },
         createCustomerTile: function() {

             var googleyx = new Cesium.UrlTemplateImageryProvider({
                 url: 'tile/{z}/{x}/{y}.jpg',
                 maximumLevel: 16,
                 minimumLevel: 0,
                 ready: true,
                 tilingScheme: new Cesium.WebMercatorTilingScheme,
                 flipXY: true
             });
             map.viewer.imageryLayers.removeAll();
             map.viewer.imageryLayers.addImageryProvider(googleyx);
         }
     }
     return helper;
 })
