(function() {
    var _defaultlayer;
    var _ = NPMap3D.Map3D = function(options) {
        this.options = options || {};
        this.options = NPMap3D.extend(this.options, {
            scene3DOnly: true,
            baseLayerPicker: false,
            animation: false,
            fullscreenButton: false,
            geocoder: false,
            homeButton: false,
            infoBox: true,
            sceneModePicker: false,
            selectionIndicator: true,
            timeline: false,
            navigationHelpButton: false,
            shadows: true,
            navigationInstructionsInitiallyVisible: false,
            sceneMode: Cesium.SceneMode.SCENE3D,
            showRenderLoopErrors: true //false
        });
        this.options.imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url: 'http://{s}.google.cn/vt?pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i285000000!3m9!2szh-CN!3sCN!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0',
            credit: 'Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.',
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        this.mapProjection = 'EPSG:900913';
        this.getProjection = function() {
            return this.mapProjection;
        };

        _defaultlayer = new Cesium.CustomDataSource('_默认图层');
        this._entities = [];
        this.container = options.container || 'map';
        this.viewer = new Cesium.Viewer(this.container, this.options);
        this.viewer.extend(Cesium.viewerCesiumNavigationMixin, {});
        this.viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
        this.viewer.dataSources.add(_defaultlayer);
        // this.viewer.scene.camera.constrainedAxis = undefined; //Cartesian3.UNIT_Z;
        // this.viewer.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH];
        // this.viewer.scene.screenSpaceCameraController.tiltEventTypes = [Cesium.CameraEventType.PINCH, Cesium.CameraEventType.RIGHT_DRAG];        

        var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        var scene = this.viewer.scene;
        var that = this;
        NPMap3D.Util.T.map = {
            getProjection: function() {
                return that.mapProjection;
            }
        }
        NPMap3D.Util.enhanceWithListeners(this);

        function callPrimitiveCallback(name, position) {
            if (that._handlersMuted == true) return;
            var pickedObject = scene.pick(position);
            if (pickedObject && pickedObject.id && pickedObject.id[name]) {
                pickedObject.id[name](position, function() {
                    that._handlersMuted = false;
                });
            }
        }

        function callEntityCallback(name, position) {
            var ls = that.viewer.scene.drillPick(position),
                b = that.viewer.camera.pickEllipsoid(position);
            if (!b) {
                return;
            }
            var d = Cesium.Cartographic.fromCartesian(b),
                c = Cesium.Math.toDegrees(d.longitude);

            var event = {
                position: {
                    x: Cesium.Math.toDegrees(d.longitude),
                    y: Cesium.Math.toDegrees(d.latitude),
                    z: Math.ceil(that.viewer.camera.positionCartographic.height)
                },
                name: name
            };
            event.position = NPMap3D.Util.T.getPoint(event.position);
            that.executeListeners(event, null, that);

            for (var i = ls.length - 1; i >= 0; i--) {
                if (!NPMap3D.Util.defined(ls[i].id)) {
                    continue;
                }
                var e = that._entities[ls[i].id.id];
                that.selectEntity = e;
                if (e) {
                    e.executeListeners(event, null, e);
                }
            }
        }
        handler.setInputAction(function(c) {
            callPrimitiveCallback('leftClick', c.position);
            callEntityCallback('click', c.position);

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // mousermove
        // var ellipsoid = scene.globe.ellipsoid;
        // var mouseOutObject;
        // handler.setInputAction(function(c) {

        //     if (that._handlersMuted == true) return;
        //     var pickedObject = scene.pick(c.endPosition);
        //     if (mouseOutObject && (!pickedObject || mouseOutObject != pickedObject.primitive)) {
        //         !(mouseOutObject.isDestroyed && mouseOutObject.isDestroyed()) && mouseOutObject.mouseOut(movement.endPosition);
        //         mouseOutObject = null;
        //     }
        //     if (pickedObject && pickedObject.primitive) {
        //         pickedObject = pickedObject.primitive;
        //         if (pickedObject.mouseOut) {
        //             mouseOutObject = pickedObject;
        //         }
        //         if (pickedObject.mouseMove) {
        //             pickedObject.mouseMove(c.endPosition);
        //         }
        //     }
        //     callEntityCallback('mousermove', c.endPosition);
        // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        handler.setInputAction(function(c) {
            callPrimitiveCallback('leftDoubleClick', c.position);
            callEntityCallback('dbclick', c.position);

        }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        handler.setInputAction(
            function(c) {
                callPrimitiveCallback('leftUp', c.position);
                callEntityCallback('mouseup', c.position);
            }, Cesium.ScreenSpaceEventType.LEFT_UP);
        handler.setInputAction(
            function(c) {
                callPrimitiveCallback('leftDown', c.position);
                callEntityCallback('mousedown', c.position);
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    };
    _.prototype.setCenter = function(p, complete, cancel) {
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(p.x,p.y,p.z),
            //duration: 5,
            // orientation: {
            //     heading: Cesium.Math.toRadians(0.0),
            //     pitch: Cesium.Math.toRadians(0.0),
            //     roll: 0.0
            // },
            complete: complete,
            cancel: cancel
        });
    };

    _.prototype.exportImage = function(name) {
        var saveData = function(a, b) {
            var c = $("<a>");
            c.attr("href", a);
            c.attr("download", b);
            c.get(0).click()
        };
        var c = this.viewer.canvas;
        c.getContext("2d");
        c = c.toDataURL("png");
        c = c.replace("image/png", "image/octet-stream");
        saveData(c, (name || 'export') + ".png");
    }
    _.prototype.setMode = function(mode) {
        this.viewer.scene.mode = Number(mode) || 1;
    }
    _.prototype.getWindowCoordinates = function(p) {
        var cartographicPosition = Cesium.Cartesian3.fromDegrees(p.x, p.y);
        var screenPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, cartographicPosition);
        return {
            x: screenPosition.x,
            y: screenPosition.y
        };
    }
    _.prototype.getCenter = function() {
        var l = Cesium.Cartographic.fromCartesian(this.viewer.scene.camera.position);
        return new NPMap3D.Cartesian3(Cesium.Math.toDegrees(l.longitude), Cesium.Math.toDegrees(l.latitude), l.height);
    };
    _.prototype.removeAll = function() {
        // this.viewer.entities.suspendEvents();
        // this.viewer.scene.primitives.removeAll();
        // this.viewer.entities.removeAll();
        _defaultlayer.entities.removeAll();
        // this.viewer.entities.resumeEvents();
        this._entities = {};
    };

    _.prototype.addOverlays = function(es) {
        for (var i = 0; i < es.length; i++) {
            this.addOverlay(es[i]);
        }
    }
    _.prototype.zoomIn = function() {
        this.viewer.camera.zoomIn();
    }
    _.prototype.zoomOut = function() {
        this.viewer.camera.zoomOut();
    }
    _.prototype.addOverlay = function(e) {
        e.setMap(this);
        _defaultlayer.entities.add(e._entity);
        // this.viewer.entities.suspendEvents();
        // this.viewer.entities.add(e._entity);
        // this._entities[e._entity.id] = e;
        // this.viewer.entities.resumeEvents();
    };
    _.prototype.removeOverlay = function(e) {
        _defaultlayer.entities.suspendEvents();
        _defaultlayer.entities.remove(e._entity);
        this._entities[e._entity.id] = null;
        _defaultlayer.entities.resumeEvents();
    };
    _.prototype.loadCzmlData = function(czml, sucessFun, errorFun) {
        var viewer = this.viewer;
        Cesium.CzmlDataSource.load(czml).then(function(dataSource) {
            viewer.dataSources.add(dataSource);
            if (sucessFun) {
                sucessFun(dataSource);
            }
        }).otherwise(function(e) {
            errorFun = errorFun || function(err) {
                console.log(err)
            };
            errorFun(e);
        });
    };
    _.prototype.addLayer = function(layer) {
        if (layer instanceof(NPMap3D.Layer.OverlayLayer)) {
            this.viewer.entities.add(layer.get());
        } else {
            var imageryLayers = this.viewer.scene.globe.imageryLayers;
            imageryLayers.removeAll();
            var layers = layer.getLayer();
            for (var i = 0; i < layers.length; i++) {
                imageryLayers.addImageryProvider(layers[i]);
            }
            this.mapProjection = layer.Projection;
        }

    };
    _.prototype.getExtent = function() {
        var extent = {},
            scene = this.viewer.scene,
            ellipsoid = scene.globe.ellipsoid,
            canvas = scene.canvas;

        var car3_lt = this.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);
        var car3_rb = this.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid);


        if (car3_lt && car3_rb) {
            var carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
            var carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
            extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
            extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
            extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
            extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
        } else if (!car3_lt && car3_rb) {
            var car3_lt2 = null;
            var yIndex = 0;
            do {
                yIndex <= canvas.height ? yIndex += 10 : canvas.height;
                car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, yIndex), ellipsoid);
            } while (!car3_lt2);
            var carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
            var carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
            extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
            extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
            extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
            extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
        }

        // 获取高度
        extent.height = Math.ceil(this.viewer.camera.positionCartographic.height);
        return extent;
    }
})();
