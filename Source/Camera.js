/**
 * @requires NAPMAP3D.js
 * Class: NAPMAP3D.Camera
 *
 * 相机
 *
 * @param viewer 必须
 */
NPMap3D.Camera = function(map) {
    'use strict';

    var camera = map.viewer.camera,
        clock = map.viewer.clock,         
        multiplier,
        isFollow,
        pointCount,
        firstPoint,
        startTime,
        stopTime,
        entity = undefined,
        position,
        preCartesian = undefined,
        trackFlightOverLayLayer,

        pitch = camera.pitch,
        heading = camera.heading,
        roll = camera.roll,

        trackType = 'drive',
        trackLine,
        trackOpts;

    //this.camera = new Cesium.Camera(scene);
    //this.camera = camera;
    /** 
     * flyTo,使用 viewer 的 flyTo()
     * @param {NPMAP3D.Overlay} target ,必须
     * @param {Object} opts  属性
     *
     *        duration: 飞行持续时间，单位秒，默认 3.0
     *        maximumHeight: 最大飞行高度，默认
     *        heading:
     *        pitch:
     *        range:
     */
    this.flyTo = function(target, options) {
        if (!Cesium.defined(target)) {
             return;
        }
        if (!Cesium.defined(options)) {
            options = {};
        }

        viewer.viewer.flyTo(target, getFlyToOpts(options));
    };

    /** 
     * zoomTo,使用 viewer 的 zoomTo()
     * @param {NPMAP3D.Overlay} target ,必须
     */
    this.zoomTo = function(target) {
        if (!Cesium.defined(target)) {
            return;
        }
        viewer.viewer.zoomTo(target);
    };

    /*
     * flyTo options 处理
     *
     */
    var getFlyToOpts = function(opts) {
        var duration = opts.duration,
            maximumHeight = opts.maximumHeight || -1,
            heading = opts.heading || -1,
            pitch = opts.pitch || -1,
            range = opts.range || -1,
            offset,
            newOpts = {};

        if (!Cesium.defined(duration)) {
            duration = 3;
        }
        newOpts.duration = duration;

        if (maximumHeight !== -1) {
            newOpts.maximumHeight = maximumHeight;
        }

        if (heading !== -1 || pitch !== -1 || range !== -1) {

            offset = new Cesium.HeadingPitchRange();
            if (heading !== -1) {
                offset.heading = heading;
            }
            if (pitch !== -1) {
                offset.pitch = pitch;
            }
            if (range !== -1) {
                offset.range = range;
            }
            newOpts.offset = offset;
        }

        return newOpts;
    };


    /** 
     * 沿轨迹飞行
     * @param {NPMAP3D.Geometry.Polyline} polyline 几何,必须
     * @param {Object} opts  属性
     *
     *        isLoop: 是否循环，默认 false ,此属性不开放
     *        multiplier: 速度倍数，默认 10
     *        color: 轨迹线颜色，默认 #FF0000
     *        width: 轨迹线宽度，默认 5
     *        follow: camera 是否跟随，默认 true
     */
    this.trackFlight = function(polyline, options) {
        trackType = 'flight';
        track(polyline, options);
    };

    /** 
     * 沿轨迹 drive
     *  @param {NPMAP3D.Geometry.Polyline} polyline 几何,必须
     * @param {Object} opts  属性
     *
     *        isLoop: 是否循环，默认 false ,此属性不开放
     *        multiplier: 速度倍数，默认 10
     *        color: 轨迹线颜色，默认 #FF0000
     *        width: 轨迹线宽度，默认 5
     *        follow: camera 是否跟随，默认 true
     */
    this.trackDrive = function(polyline, options) {
        trackType = 'drive';
        track(polyline, options);
    }

    /** 
     * 停止飞行
     *
     */
    this.stopTrack = function() {
        doStop();
    };

    var track = function(polyline, options) {
        trackLine = polyline;
        trackOpts = options;

        getCondition();

        camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(firstPoint.x, firstPoint.y, 50),
            orientation: {
                heading: heading,
                pitch: pitch,
                roll: roll
            },
            duration: 3,
            complete: doTrack
        });
    };


    var doTrack = function() {
        var opt = buildOptions(trackOpts);

        trackFlightOverLayLayer = new Cesium.CustomDataSource('trackFlightOverLayLayer');
        map.viewer.dataSources.add(trackFlightOverLayLayer);

        multiplier = opt.multiplier;

        isFollow = opt.follow;

        setClock();

        entity = getEntity(opt.color, opt.width);

        entity.position.setInterpolationOptions({
            interpolationDegree: 1,
            interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
        });

        trackFlightOverLayLayer.entities.add(entity);

        if (isFollow) {
            clock.onTick.addEventListener(followCallback);
        }
    };

    /** 
     * 相机跟随
     *
     */
    var followCallback = function(clock) {
        var currentTime = clock.currentTime,
            isTrue = Cesium.JulianDate.equals(currentTime, stopTime),
            currentCartesian,
            angle;

        if (isTrue) {
            doStop();
        } else {
            currentCartesian = position.getValue(currentTime);
            if (Cesium.defined(currentCartesian)) {

                if (Cesium.defined(preCartesian)) {
                    angle = getRadian(currentCartesian, preCartesian);
                    setCamera(currentCartesian, angle);
                }
                preCartesian = currentCartesian;
            }

        }

    };

    /** 
     * 设置相机
     *
     */
    var setCamera = function(currentCartesian, angle) {
        var heading = Cesium.Math.toRadians(angle),
            pitch = Cesium.Math.toRadians(-10),
            range = 50.0;

        if (trackType === 'flight') {
            pitch = Cesium.Math.toRadians(-45);
            range = 100.0;
        }

        camera.lookAt(currentCartesian, new Cesium.HeadingPitchRange(heading, pitch, range));
    };

    /** 
     * 计算相机 heading
     *
     */
    var getRadian = function(currentCartesian, preCartesian) {
        var cDegrees = cartesianToDegrees(currentCartesian),
            pDegrees = cartesianToDegrees(preCartesian),
            radian = calculateRadian(cDegrees, pDegrees),
            angle = Math.abs(radian) - 90;

        return angle
    };

    /** 
     * Cartesian3 转换 WGS84
     *
     */
    var cartesianToDegrees = function(cartesian) {

        var wgs84 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian),
            lon = Cesium.Math.toDegrees(wgs84.longitude),
            lat = Cesium.Math.toDegrees(wgs84.latitude);

        return {
            lon: lon,
            lat: lat
        };
    };

    /** 
     * 计算弧度
     *
     */
    var calculateRadian = function(obj1, obj2) {
        return Math.atan2((obj2.lat - obj1.lat), (obj2.lon - obj1.lon)) * 180 / Math.PI;
    };

    /** 
     * 停止轨迹
     *
     */
    var doStop = function() {
        if (typeof entity != 'undefined') {
            clock.onTick.removeEventListener(followCallback);
            preCartesian = undefined;
            map.viewer.dataSources.remove(trackFlightOverLayLayer);
            entity = undefined;

            if (isFollow) {
                camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
            }
        }
    };

    /** 
     * 获取轨迹点的数量和第一个点
     *
     */
    var getCondition = function() {
        var pathLength = trackLine.length,
            i,
            path;
        for (i = 0; i < pathLength; i++) {
            path = trackLine[i];
            firstPoint = path[0];
            pointCount = path.length;
        }
    };

    /** 
     * 设置相机
     *
     */
    var setClock = function() {
        var myDate = new Date()
        startTime = Cesium.JulianDate.fromDate(new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), myDate.getHours()));
        stopTime = Cesium.JulianDate.addSeconds(startTime, pointCount * multiplier, new Cesium.JulianDate());
        clock.startTime = startTime.clone();
        clock.stopTime = stopTime.clone();
        clock.currentTime = startTime.clone();
        clock.clockRange = Cesium.ClockRange.CLAMPED; //CLAMPED 达到终止时间后停止 ,UNBOUNDED 达到终止时间后继续读秒,LOOP_STOP; //达到终止时间后重新循环

        clock.multiplier = multiplier;
    };

    /** 
     * 轨迹 Entity
     *
     */
    var getEntity = function(color, width) {
        var host = NPMap3D.Util.getHost();
        var modelURI = host + '/assets/models/CesiumMilkTruck.gltf'
        if (trackType === 'flight') {
            modelURI = host + '/assets/models/Cesium_Air.gltf';
        }

        position = computeTrajectory();

        var entityOpts = {
            availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                start: startTime,
                stop: stopTime
            })]),

            position: position,

            orientation: new Cesium.VelocityOrientationProperty(position),

            model: {
                uri: modelURI,
                minimumPixelSize: 32
            },

            path: {
                resolution: 1,
                material: new Cesium.PolylineOutlineMaterialProperty({
                    color: color,
                    outlineWidth: 1,
                    outlineColor: color
                }),
                width: width
            }
        }
        return new Cesium.Entity(entityOpts)
    };

    /** 
     * 轨迹数据处理
     *
     */
    var computeTrajectory = function() {
        var property = new Cesium.SampledPositionProperty(),
            pathLength = trackLine.length,
            i = 0,
            j = 0,
            path,
            pLength,
            time,
            point,
            newPoint,
            position;

        for (i = 0; i < pathLength; i++) {
            path = trackLine[i];
            pLength = path.length;

            for (j = 0; j < pLength; j++) {
                time = Cesium.JulianDate.addSeconds(startTime, j * multiplier, new Cesium.JulianDate());
                point = path[j];
                newPoint = NPMap3D.Util.T.setPoint(point);

                if (trackType === 'flight') {
                    position = Cesium.Cartesian3.fromDegrees(newPoint.x, newPoint.y, point.z);
                } else {
                    position = Cesium.Cartesian3.fromDegrees(newPoint.x, newPoint.y);
                }

                property.addSample(time, position);
            }
        }
        return property;
    };

    /** 
     * 属性处理
     *
     */
    var buildOptions = function(opts) {

        var isLoop = opts.isLoop || false,
            multiplier = opts.multiplier || 10,
            width = opts.width || 5,
            colorTemp = opts.color || '#FF0000',
            color = Cesium.Color.fromCssColorString(colorTemp),
            followTemp = opts.follow,
            follow,
            opt;

        if (typeof opts.follow === 'undefined') {
            follow = true;
        } else {
            follow = followTemp;
        }

        opt = {
            isLoop: isLoop,
            multiplier: multiplier,
            color: color,
            width: width,
            follow: follow
        };

        return opt;
    };
};

 
