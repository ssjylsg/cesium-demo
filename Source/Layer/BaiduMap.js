(function() {
    NPMap3D.Layer.BaiduMap = function(options) {
        this.Projection = 'EPSG:4326_BAIDU';
        var options = NPMap3D.extend(options || {}, {
            isImageLayer: false,
            isOnLine: true,
            url: '',
        });

        this.getLayer = function() {

            function BDImageryProvider(options) {

                this._url = "http://online1.map.bdimg.com/onlinelabel/?qt=tile";

                this._tileWidth = 256;
                this._tileHeight = 256;
                this._maximumLevel = 18;

                var rectangleSouthwestInMeters = new Cesium.Cartesian2(-25165824, -25165824);
                var rectangleNortheastInMeters = new Cesium.Cartesian2(25165824, 25165824);
                this._tilingScheme = new Cesium.WebMercatorTilingScheme({
                    rectangleSouthwestInMeters: rectangleSouthwestInMeters,
                    rectangleNortheastInMeters: rectangleNortheastInMeters
                });

                //var rectangleSouthwestInMeters = new Cesium.Cartesian2(-25165824, -25165824);
                //var rectangleNortheastInMeters = new Cesium.Cartesian2(25165824, 25165824);
                //this._tilingScheme = new Cesium.WebMercatorTilingScheme();

                this._credit = undefined;
                this._rectangle = this._tilingScheme.rectangle;
                this._ready = true;
            }

            function buildImageUrl(imageryProvider, x, y, level) {
                var url = imageryProvider._url + "&x={x}&y={y}&z={z}";
                var tileW = imageryProvider._tilingScheme.getNumberOfXTilesAtLevel(level);
                var tileH = imageryProvider._tilingScheme.getNumberOfYTilesAtLevel(level);

                url = url
                    .replace('{x}', x - tileW / 2)
                    .replace('{y}', tileH / 2 - y)
                    .replace('{z}', level);

                return url;
 
            }

            Cesium.defineProperties(BDImageryProvider.prototype, {
                url: {
                    get: function() {
                        return this._url;
                    }
                },

                token: {
                    get: function() {
                        return this._token;
                    }
                },

                proxy: {
                    get: function() {
                        return this._proxy;
                    }
                },

                tileWidth: {
                    get: function() {
                        //>>includeStart('debug', pragmas.debug);
                        if (!this._ready) {
                            throw new DeveloperError('tileWidth must not be called before the imagery provider is ready.');
                        }
                        //>>includeEnd('debug');

                        return this._tileWidth;
                    }
                },

                tileHeight: {
                    get: function() {
                        //>>includeStart('debug', pragmas.debug);
                        if (!this._ready) {
                            throw new DeveloperError('tileHeight must not be called before the imagery provider is ready.');
                        }
                        //>>includeEnd('debug');

                        return this._tileHeight;
                    }
                },

                maximumLevel: {
                    get: function() {
                        //>>includeStart('debug', pragmas.debug);
                        if (!this._ready) {
                            throw new DeveloperError('maximumLevel must not be called before the imagery provider is ready.');
                        }
                        //>>includeEnd('debug');

                        return this._maximumLevel;
                    }
                },

                minimumLevel: {
                    get: function() {
                        //>>includeStart('debug', pragmas.debug);
                        if (!this._ready) {
                            throw new DeveloperError('minimumLevel must not be called before the imagery provider is ready.');
                        }
                        //>>includeEnd('debug');

                        return 0;
                    }
                },

                tilingScheme: {
                    get: function() {
                        //>>includeStart('debug', pragmas.debug);
                        if (!this._ready) {
                            throw new DeveloperError('tilingScheme must not be called before the imagery provider is ready.');
                        }
                        //>>includeEnd('debug');

                        return this._tilingScheme;
                    }
                },

                rectangle: {
                    get: function() {
                        //>>includeStart('debug', pragmas.debug);
                        if (!this._ready) {
                            throw new DeveloperError('rectangle must not be called before the imagery provider is ready.');
                        }
                        //>>includeEnd('debug');

                        return this._rectangle;
                    }
                },

                tileDiscardPolicy: {
                    get: function() {
                        //>>includeStart('debug', pragmas.debug);
                        if (!this._ready) {
                            throw new DeveloperError('tileDiscardPolicy must not be called before the imagery provider is ready.');
                        }
                        //>>includeEnd('debug');

                        return this._tileDiscardPolicy;
                    }
                },

                errorEvent: {
                    get: function() {
                        return this._errorEvent;
                    }
                },

                ready: {
                    get: function() {
                        return this._ready;
                    }
                },

                readyPromise: {
                    get: function() {
                        return this._readyPromise.promise;
                    }
                },

                credit: {
                    get: function() {
                        return this._credit;
                    }
                },

                usingPrecachedTiles: {
                    get: function() {
                        return this._useTiles;
                    }
                },

                hasAlphaChannel: {
                    get: function() {
                        return true;
                    }
                },

                layers: {
                    get: function() {
                        return this._layers;
                    }
                }
            });

            BDImageryProvider.prototype.getTileCredits = function(x, y, level) {
                return undefined;
            };

            BDImageryProvider.prototype.requestImage = function(x, y, level) {
                if (!this._ready) {
                    throw new DeveloperError('requestImage must not be called before the imagery provider is ready.');
                }

                var url = buildImageUrl(this, x, y, level);
                return Cesium.ImageryProvider.loadImage(this, url);
            };


            var bdlayer = new BDImageryProvider();
            return [bdlayer];
        }
    }
})();
