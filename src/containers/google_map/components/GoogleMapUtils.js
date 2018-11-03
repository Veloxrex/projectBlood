/* eslint-disable */

const GoogleMapUtils = window.GoogleMapUtils = {};

const syncLocation = GoogleMapUtils.syncLocation = function(maps, callback) {
    const status = {};
    status.maps = maps;
    status.interval = null;
    status.firstChangedMap = null;
    status.callback = callback;

    for (var i in maps) {
        maps[i].addListener('bounds_changed', createBoundsChangedCallback(maps[i], status));
    }
};

const createBoundsChangedCallback = function(map, status) {
    return function()
    {
        if (!status.firstChangedMap) {
            status.firstChangedMap = map;
        } else if (status.firstChangedMap !== map) {
            return;
        }

        var lastBounds = null;
        if (!status.interval)
        {
            status.interval = setInterval(function()
            {
                var bounds = map.getBounds();

                if (lastBounds && isEqualsBounds(bounds, lastBounds))
                {
                    clearInterval(status.interval);
                    status.interval = null;

                    setTimeout(function() {
                        status.firstChangedMap = null;
                    }, 100);
                    return;
                }

                for (var i in status.maps)
                {
                    if (status.maps[i] === map) continue;
                    status.maps[i].setCenter(map.getCenter());
                }

                lastBounds = bounds;

                status.callback && status.callback(bounds);
            }, 33);
        }
        return true;
    };
};

const isEqualsBounds = GoogleMapUtils.isEqualsBounds = function(bounds1, bounds2)
{
    var latLng1, latLng2;

    latLng1 = bounds1.getNorthEast();
    latLng2 = bounds2.getNorthEast();
    if (latLng1.lat() !== latLng2.lat()) return false;
    if (latLng1.lng() !== latLng2.lng()) return false;

    latLng1 = bounds1.getSouthWest();
    latLng2 = bounds2.getSouthWest();
    if (latLng1.lat() !== latLng2.lat()) return false;
    if (latLng1.lng() !== latLng2.lng()) return false;

    return true;
};

const setZoomRange = GoogleMapUtils.setZoomRange = function(map, minZoom, maxZoom) {
    map.addListener('zoom_changed', function() {
        var zoom = map.getZoom();
        if (zoom < minZoom) {
            map.setZoom(minZoom);
            return true;
        }
        if (zoom > maxZoom) {
            map.setZoom(maxZoom);
            return true;
        }
    });
};

export default GoogleMapUtils