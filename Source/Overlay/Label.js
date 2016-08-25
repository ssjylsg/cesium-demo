(function() {
    NPMap3D.Overlay.Label = function(options) {
        var a = ['text', 'font', 'outlineWidth', 'scale', 'show', 'horizontalOrigin', 'verticalOrigin'],
            type = 'label';
        options.position = NPMap3D.Util.T.setPoint(options.position);
        NPMap3D.Overlay.call(this, options, a, type),
            this._entity.position = Cesium.Cartesian3.fromDegrees(options.position.x, options.position.y),
            this._entity.label = {
                text: options.text,
                font: '24px Helvetica',
                fillColor: Cesium.Color.SKYBLUE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: options.outlineWidth || 1,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                show: true,
                scale: options.scale || 1,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.CENTER
            };
        NPMap3D.defineProperties(this, {
            "fillColor": {
                get: function() {
                    var e = this._entity[type]['fillColor'].getValue();
                    return new NPMap3D.Color(e.red, e.green, e.blue, e.alpha);
                },
                set: function(e) {
                    this._entity[type]['fillColor'] = e._;
                }
            },
            "outlineColor": {
                get: function() {
                    var e = this._entity[type]['outlineColor'].getValue();
                    return new NPMap3D.Color(e.red, e.green, e.blue, e.alpha);
                },
                set: function(e) {
                    this._entity[type]['outlineColor'] = e._;
                }
            }
        });
    };
})();
