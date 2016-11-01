(function() {
    var viewer;
    var e = NPMap3D.Overlay.AnimationLine = function(map, points, options) {
        this.drawSpeed = 15;
        this.status = 0;
        this.points = points;
        this.timer = null;
        this.newStart = true;
        this.drawIndex = 0;
        this.segArray = [];
        this.interval = 100;
        options = options || {};
        options.polylineStyle = NPMap3D.extend(options.polylineStyle, {
            width: 1.0,
            show: true,
            material: Cesium.Color.RED
        })
        this.headMarker;
        viewer = map.viewer;
        var p = this.points[0];
        p = NPMap3D.Util.T.setPoint(p);
        p = Cesium.Cartesian3.fromDegrees(p.x, p.y);
        if (options.headMarker) {
            var marker = options.headMarker;


            this.headMarker = new Cesium.Entity({
                id: '',
                name: '',
                position: p,
                billboard: {
                    image: marker.image,
                    width: marker.width,
                    height: marker.height,
                    show: true
                }
                // ,
                // model: {
                //     uri: NPMap3D.Util.getHost() + '/assets/models/CesiumMilkTruck.gltf',
                //     minimumPixelSize: 64
                // }

            });
        }
        this.car = new Cesium.Entity({
            polyline: options.polylineStyle,
            position: p,
            point: {
                color: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.RED,
                outlineWidth: 1,
                pixelSize: 6
            }
        });

        this.car.polyline.positions = [p];
        NPMap3D.Util.enhanceWithListeners(this);
    };

    e.prototype._calculateSeg = function(start) {
        var result = [];
        if (start + 1 >= this.points.length) {
            result.push(0);
            return result;
        }
        var b = this.points[start],
            e = this.points[start + 1];
        var d = NPMap3D.distinct(b, e);
        var total = 0;
        if (this.drawSpeed > 0) {
            total = Math.round(d / this.drawSpeed);
        }
        var per, t;
        for (var i = 1; i < total; i++) {
            per = i / total;
            x = parseFloat((e.x - b.x) * per) + parseFloat(b.x);
            y = parseFloat((e.y - b.y) * per) + parseFloat(b.y);
            t = {
                x: x,
                y: y
            };
            result.push(t);
        }
        result.push(this.points[start + 1]);
        result.reverse();
        return result;
    };
    e.prototype.stop = function() {
        if (this.status == -1) {
            this.executeListeners({
                name: 'STOP'
            }, null, this);
        }
        this.status = 0;
        window.clearTimeout(this.timer);
    };
    e.prototype.start = function() {
        if (this.status > 0) {
            return;
        }
        this.headMarker && viewer.entities.add(this.headMarker);
        viewer.entities.add(this.car);
        this.status = 1;
        this.executeListeners({
            name: 'START'
        }, null, this);
        this.timer = window.setTimeout(this._startDraw.bind(this), this.interval);

    };
    e.prototype._startDraw = function() {
        if (this.drawIndex == this.points.length) {
            this.status = 0;
            window.clearTimeout(this.timer);
        }
        if (this.status == 0) {
            this.executeListeners({
                name: 'STOP'
            }, null, this);
            return;
        } else if (this.status == -1) {
            this.executeListeners({
                name: 'PAUSE'
            }, null, this);
            return;
        }
        this._preDraw();
        this._draw();
        this._drawEnd();

    }

    function calculateAngle(ptFrom, ptTarget) {
        return Math.atan2(ptTarget.y - ptFrom.y, ptTarget.x - ptFrom.x);
    };
    var _preRotation;
    e.prototype._draw = function() {
        var p = temp = this.segArray.pop();
        if (p) {
            p = NPMap3D.Util.T.setPoint(p);
            p = Cesium.Cartesian3.fromDegrees(p.x, p.y);
            if (this.headMarker) {
                var ptTarget = this.segArray.length == 0 ? this.points[this.drawIndex + 1] : this.segArray[this.segArray.length - 1];
                this.headMarker.position = p;
                this.headMarker.billboard.rotation = ptTarget ? (_preRotation = calculateAngle(temp, ptTarget), _preRotation) : _preRotation;
            }
            var ps = this.car.polyline.positions.getValue();
            ps.push(p);
            this.car.polyline.positions = ps;
        }
    }
    e.prototype._drawEnd = function() {
        this.timer = window.setTimeout(this._startDraw.bind(this), this.interval);
    }
    e.prototype._preDraw = function() {
        if (this.segArray.length === 0) {
            this.segArray = this._calculateSeg(this.drawIndex);
            this.executeListeners({
                name: 'STEP',
                drawIndex: this.drawIndex,
                point: this.points[this.drawIndex]
            }, null, this);
            this.drawIndex++;
        }
    }
    e.prototype.restart = function() {

    }
    e.prototype.pause = function() {
        this.status = -1;
    };


    NPMap3D.Overlay.AnimationLine.EVENTS = {
        START: 'START',
        STOP: 'STOP',
        PAUSE: 'PAUSE',
        MOVING: 'MOVING',
        MOVED: 'MOVED'
    }
})();
