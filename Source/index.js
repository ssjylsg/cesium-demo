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
        map: {
            '*': {
                'css': 'Source/css.min'
            }
        }
    })

    require(['css!http://dataxiu.com/xius/assets/bootstrap/css/bootstrap.min.css',
        'css!dist/map.css'
    ], function() {

    })
    window.CESIUM_BASE_URL = '/map3dassert/dist/' //'../Source/lib'
    require(['dist/NPMap3D.min', 'App/script/jquery'], function() {
        require(['App/script/3dHelper'], function() {
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
        baseUrl: '/map3dassert/Source/',
        map: {
            '*': {
                'css': 'css.min'
            }
        }
    });
    require(['css!http://dataxiu.com/xius/assets/bootstrap/css/bootstrap.min.css',
        'css!lib/Widgets/widgets.css', 'css!lib/Widgets/shared.css',
        'css!lib/ThirdParty/DrawHelper/DrawHelper.css'
    ], function() {

    })
    require(['lib/Cesium'], function($) {
        require(['lib/viewerCesiumNavigationMixin.min'], function() {
            require(['Init', 'Util'], function() {
                require(['lib/ThirdParty/DrawHelper/DrawHelper', 'Layer/TiandiMap', 'Layer/ArcgisMap', 'Layer/BingMap',
                    'Layer/BaiduMap', 'Layer/OpenStreetMap', 'Layer/GoogleMap', 'Layer/TiandiMap', 'NPMap3D',
                    'Overlay', 'Color', 'Material', 'Material/CheckerboardMaterialProperty', 'Material/ColorMaterial',
                    'Material/CompositeMaterialProperty', 'Material/GridMaterialProperty', 'Material/ImageMaterialProperty',
                    'Material/PolylineGlowMaterialProperty', 'Material/PolylineOutlineMaterialProperty',
                    'Material/StripeMaterialProperty', 'Overlay/Box', 'Overlay/Cylinder', 'Overlay/Ellipse',
                    'Overlay/Ellipsoid', 'Overlay/Label', 'Overlay/LabelCollection', 'Overlay/Marker', 'Overlay/MarkerCollection',
                    'Overlay/Model', 'Overlay/Path', 'Overlay/PointCollection', 'Overlay/Polygon', 'Overlay/Polyline',
                    'Overlay/Rectangle', 'Overlay/PolylineVolume', 'Overlay/Wall'
                ], function() {
                    require.config({
                        baseUrl: '/map3dassert/',
                    })
                    require(['App/script/jquery', 'App/script/3dHelper'], function() {
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
