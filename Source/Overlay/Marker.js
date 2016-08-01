(function() {
    var _ = NPMap3D.Overlay.Marker = function(options) {
        var a = ['scale', 'rotation', 'image',
                'show', 'horizontalOrigin', 'verticalOrigin', 'width', 'height'
            ],
            type = 'billboard';
        NPMap3D.Overlay.call(this, options, a, type),
            this._entity.position = Cesium.Cartesian3.fromDegrees(options.position.x, options.position.y),
            this._entity.billboard = {
                image: options.image || '/Cesium/demo/img/Flag.png',
                width: options.width || 32,
                height: options.height || 32,
                show: true,
                scale: 1,
                rotation: 0
            };

        NPMap3D.Overlay.extendLabel.call(this, options);
        NPMap3D.defineProperties(this, {
            color: {
                get: function() {
                    var e = this._entity['billboard'].color;
                    if (e) {
                        e = e.getValue();
                        return new NPMap3D.Color(e.red, e.green, e.blue, e.alpha);
                    }
                },
                set: function(c) {
                    this._entity['billboard'].color = c._e;
                }
            }
        })

    };

    _.prototype.setEditable = function(editable) {
        editable = editable == undefined ? true : editable;
        var billboard = this._entity;
        if (editable === false) {
            this.setListener(billboard, 'leftDown', null);
            this._editable = false;
            return;
        }
        if (this._editable) {
            return;
        }

        this._editable = true;
        var ellipsoid = Cesium.Ellipsoid.WGS84;


        var _self = this._entity;
        var drawHelper = {
            _scene: this._map.viewer.scene
        };

        function enableRotation(enable) {
            drawHelper._scene.screenSpaceCameraController.enableRotate = enable;
        }

        this.setListener(billboard, 'leftDown', function(position) {
            function onDrag(position) {
                billboard.position = position;
                _self.executeListeners({
                    name: 'drag',
                    positions: position
                });
            }

            var handler = new Cesium.ScreenSpaceEventHandler(drawHelper._scene.canvas);

            function onDragEnd(position) {
                handler.destroy();
                enableRotation(true);
                _self.executeListeners({
                    name: 'dragEnd',
                    positions: position
                });
            }

            handler.setInputAction(function(movement) {
                var cartesian = drawHelper._scene.camera.pickEllipsoid(movement.endPosition, ellipsoid);
                if (cartesian) {
                    onDrag(cartesian);
                } else {
                    onDragEnd(cartesian);
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

            handler.setInputAction(function(movement) {
                onDragEnd(drawHelper._scene.camera.pickEllipsoid(movement.position, ellipsoid));
            }, Cesium.ScreenSpaceEventType.LEFT_UP);

            enableRotation(false);

        });

        NPMap3D.Util.enhanceWithListeners(billboard);
    };


})();