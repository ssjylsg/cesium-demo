function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var v = getQueryString('v');
if (v === 'release' || v === 'r') {
    require.config({
        baseUrl: '/map3dassert/',
        urlArgs: "v=" + (new Date()).getTime(),
        map: {
            '*': {
                'css': 'App/css.min'
            }
        }
    })

    require(['css!http://dataxiu.com/xius/assets/bootstrap/css/bootstrap.min.css',
        'css!dist/map.css'
    ], function() {

    })
    window.CESIUM_BASE_URL = '/map3dassert/dist/' //'../Source/lib'
    require(['dist/NPMap3D.min', 'App/script/jquery'], function() {
        require(['App/script/3dHelper'], function(helper) {
            var map = helper.initMap();
            map.setCenter({
                x: 104.71325577059447,
                y: 36.90962472341095,
                z: 7264834.261304271
            });
            window.map = map;
        });
    })

} else {
    require.config({
        baseUrl: '/map3dassert/',
        urlArgs: "v=" + (new Date()).getTime(),
        map: {
            '*': {
                'css': 'App/css.min'
            }
        }
    });

    require(['css!http://dataxiu.com/xius/assets/bootstrap/css/bootstrap.min.css',
        'css!Source/lib/Widgets/widgets.css', 'css!Source/lib/Widgets/shared.css',
        'css!Source/lib/ThirdParty/DrawHelper/DrawHelper.css'
    ], function() {

    })
    require(['Source/lib/Cesium'], function() {
        require(['Source/lib/viewerCesiumNavigationMixin.min'], function() {
            require(['Source/Init', 'Source/Util'], function() {
                require(['Source/lib/ThirdParty/DrawHelper/DrawHelper', 'Source/Layer/QQMap', 'Source/Layer/TiandiMap', 'Source/Layer/ArcgisMap', 'Source/Layer/BingMap',
                    'Source/Layer/BaiduMap', 'Source/Layer/GaodeMap', 'Source/Layer/OpenStreetMap', 'Source/Layer/GoogleMap', 'Source/Layer/TiandiMap', 'Source/NPMap3D',
                    'Source/Overlay', 'Source/Color', 'Source/Material', 'Source/Material/CheckerboardMaterialProperty', 'Source/Material/ColorMaterial',
                    'Source/Material/CompositeMaterialProperty', 'Source/Material/GridMaterialProperty', 'Source/Material/ImageMaterialProperty',
                    'Source/Material/PolylineGlowMaterialProperty', 'Source/Material/PolylineOutlineMaterialProperty',
                    'Source/Material/StripeMaterialProperty', 'Source/Overlay/Box', 'Source/Overlay/Cylinder', 'Source/Overlay/Ellipse',
                    'Source/Overlay/Ellipsoid', 'Source/Overlay/Label', 'Source/Overlay/LabelCollection', 'Source/Overlay/Marker', 'Source/Overlay/MarkerCollection',
                    'Source/Overlay/Model', 'Source/Overlay/Path', 'Source/Overlay/PointCollection', 'Source/Overlay/Polygon', 'Source/Overlay/Polyline',
                    'Source/Overlay/Rectangle', 'Source/Overlay/PolylineVolume', 'Source/Overlay/Wall', 'Source/Overlay/AnimationLine', 'Source/lib/CesiumHeatmap'
                ], function() {                    
                    require(['App/script/jquery', 'App/script/3dHelper'], function(jq,helper) {
                        var map = helper.initMap();
                        map.setCenter({
                            x: 104.71325577059447,
                            y: 36.90962472341095,
                            z: 7264834.261304271
                        });
                        window.map = map;
                    })
                })
            })
        });
    })
}
