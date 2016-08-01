(function() {
    NPMap3D.Overlay.Path = function(options) {
        var a = ['show', 'scale', 'resolution', 'width'],
            type = 'path';
        options = NPMap3D.extend(options || {}, {
                show: true,
                width: 1.0,
                resolution: 60
            }),
            NPMap3D.Overlay.call(this, options, a, type),
            this._entity[type] = options;
    };
})();