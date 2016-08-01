(function() {
    NPMap3D.Overlay.Model = function(options) {
        var a = ['show', 'scale', 'minimumPixelSize', 'runAnimations', 'incrementallyLoadTextures', 'castShadows'],
            type = 'model';
        options = NPMap3D.extend(options || {}, {
                show: true,
                scale: 1.0,
                minimumPixelSize: 0,
                incrementallyLoadTextures: true,
                castShadows: true,
                receiveShadows: true,
                runAnimations: true
            }),
            NPMap3D.Overlay.call(this, options, a, type),
            this._entity[type] = options;
    };
})();