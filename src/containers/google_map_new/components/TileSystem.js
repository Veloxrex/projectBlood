/* eslint-disable no-unused-vars*/
var TileSystem = window.TileSystem = {};

// Private Static Constants
var COUNT_BY_LEVEL_LIST = (function() {
    var list = [];
    for (var i = 0; i <= 24; i++) list.push(Math.pow(2, i));
    return list;
})();

//var EarthRadius = 6378137;
var MinLatitude = -85.05112878;
var MaxLatitude = 85.05112878;
var MinLongitude = -180;
var MaxLongitude = 180;
var TilePixelSize = 256;

/// <summary>
/// Clips a number to the specified minimum and maximum values.
/// </summary>
/// <param name="n">The number to clip.</param>
/// <param name="minValue">Minimum allowable value.</param>
/// <param name="maxValue">Maximum allowable value.</param>
/// <returns>The clipped value.</returns>
var Clip = TileSystem.Clip = function(n, minValue, maxValue)
{
    return Math.min(Math.max(n, minValue), maxValue);
};

/// <summary>
/// Determines the map width and height (in pixels) at a specified level
/// of detail.
/// </summary>
/// <param name="levelOfDetail">Level of detail, from 1 (lowest detail)
/// to 23 (highest detail).</param>
/// <returns>The map width and height in pixels.</returns>
var MapSize = TileSystem.MapSize = function(levelOfDetail)
{
    return TilePixelSize * COUNT_BY_LEVEL_LIST[levelOfDetail];
};

/// <summary>
/// Determines the ground resolution (in meters per pixel) at a specified
/// latitude and level of detail.
/// </summary>
/// <param name="latitude">Latitude (in degrees) at which to measure the
/// ground resolution.</param>
/// <param name="levelOfDetail">Level of detail, from 1 (lowest detail)
/// to 23 (highest detail).</param>
/// <returns>The ground resolution, in meters per pixel.</returns>
/*
var GroundResolution = TileSystem.GroundResolution = function(latitude, levelOfDetail)
{
     latitude = Clip(latitude, MinLatitude, MaxLatitude);
     return Math.cos(latitude * Math.PI / 180) * 2 * Math.PI * EarthRadius / MapSize(levelOfDetail);
};*/

/// <summary>
/// Determines the map scale at a specified latitude, level of detail,
/// and screen resolution.
/// </summary>
/// <param name="latitude">Latitude (in degrees) at which to measure the
/// map scale.</param>
/// <param name="levelOfDetail">Level of detail, from 1 (lowest detail)
/// to 23 (highest detail).</param>
/// <param name="screenDpi">Resolution of the screen, in dots per inch.</param>
/// <returns>The map scale, expressed as the denominator N of the ratio 1 : N.</returns>
/*
var MapScale = TileSystem.MapScale = function(latitude, levelOfDetail, screenDpi)
{
    return GroundResolution(latitude, levelOfDetail) * screenDpi / 0.0254;
};*/

/// <summary>
/// Converts a point from latitude/longitude WGS-84 coordinates (in degrees)
/// into pixel XY coordinates at a specified level of detail.
/// </summary>
/// <param name="latitude">Latitude of the point, in degrees.</param>
/// <param name="longitude">Longitude of the point, in degrees.</param>
/// <param name="levelOfDetail">Level of detail, from 1 (lowest detail)
/// to 23 (highest detail).</param>
/// <param name="pixelX">Output parameter receiving the X coordinate in pixels.</param>
/// <param name="pixelY">Output parameter receiving the Y coordinate in pixels.</param>

var LatLongToPixelXY = TileSystem.LatLongToPixelXY = function(latitude, longitude, levelOfDetail)
{
    latitude = Clip(latitude, MinLatitude, MaxLatitude);
    longitude = Clip(longitude, MinLongitude, MaxLongitude);

    var x = (longitude + 180) / 360;
    var sinLatitude = Math.sin(latitude * Math.PI / 180);
    var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);

    var mapSize = MapSize(levelOfDetail);
    var pixelX = Clip(x * mapSize + 0.5, 0, mapSize - 1);
    var pixelY = Clip(y * mapSize + 0.5, 0, mapSize - 1);

    return {x: pixelX, y: pixelY};
};

/// <summary>
/// Converts a pixel from pixel XY coordinates at a specified level of detail
/// into latitude/longitude WGS-84 coordinates (in degrees).
/// </summary>
/// <param name="pixelX">X coordinate of the point, in pixels.</param>
/// <param name="pixelY">Y coordinates of the point, in pixels.</param>
/// <param name="levelOfDetail">Level of detail, from 1 (lowest detail)
/// to 23 (highest detail).</param>
/// <param name="latitude">Output parameter receiving the latitude in degrees.</param>
/// <param name="longitude">Output parameter receiving the longitude in degrees.</param>

var PixelXYToLatLong = TileSystem.PixelXYToLatLong = function(pixelX, pixelY, levelOfDetail)
{
    var mapSize = MapSize(levelOfDetail);
    var x = (Clip(pixelX, 0, mapSize - 1) / mapSize) - 0.5;
    var y = 0.5 - (Clip(pixelY, 0, mapSize - 1) / mapSize);

    var latitude = 90 - 360 * Math.atan(Math.exp(-y * 2 * Math.PI)) / Math.PI;
    var longitude = 360 * x;

    return {lat: latitude, lng: longitude};
};

/// <summary>
/// Converts pixel XY coordinates into tile XY coordinates of the tile containing
/// the specified pixel.
/// </summary>
/// <param name="pixelX">Pixel X coordinate.</param>
/// <param name="pixelY">Pixel Y coordinate.</param>
/// <param name="tileX">Output parameter receiving the tile X coordinate.</param>
/// <param name="tileY">Output parameter receiving the tile Y coordinate.</param>

/*
var PixelXYToTileXY = TileSystem.PixelXYToTileXY = function(pixelX, pixelY)
{
    var tileX = pixelX / TilePixelSize;
    var tileY = pixelY / TilePixelSize;

    return {x: tileX, y: tileY};
};*/

/// <summary>
/// Converts tile XY coordinates into pixel XY coordinates of the upper-left pixel
/// of the specified tile.
/// </summary>
/// <param name="tileX">Tile X coordinate.</param>
/// <param name="tileY">Tile Y coordinate.</param>
/// <param name="pixelX">Output parameter receiving the pixel X coordinate.</param>
/// <param name="pixelY">Output parameter receiving the pixel Y coordinate.</param>

/*
var TileXYToPixelXY = TileSystem.TileXYToPixelXY = function(tileX, tileY)
{
    var pixelX = tileX * TilePixelSize;
    var pixelY = tileY * TilePixelSize;

    return {x: pixelX, y: pixelY};
};*/

/// <summary>
/// Converts tile XY coordinates into a QuadKey at a specified level of detail.
/// </summary>
/// <param name="tileX">Tile X coordinate.</param>
/// <param name="tileY">Tile Y coordinate.</param>
/// <param name="levelOfDetail">Level of detail, from 1 (lowest detail)
/// to 23 (highest detail).</param>
/// <returns>A string containing the QuadKey.</returns>

var TileXYToQuadKey = TileSystem.TileXYToQuadKey = function(tileX, tileY, levelOfDetail)
{
    var quadKey = '';
    for (var i = levelOfDetail; i > 0; i--)
    {
        var digit = '0';
        var mask = 1 << (i - 1);
        if ((tileX & mask) !== 0)
        {
            digit++;
        }
        if ((tileY & mask) !== 0)
        {
            digit++;
            digit++;
        }
        quadKey += String(digit);
    }
    return quadKey;
};

/// <summary>
/// Converts a QuadKey into tile XY coordinates.
/// </summary>
/// <param name="quadKey">QuadKey of the tile.</param>
/// <param name="tileX">Output parameter receiving the tile X coordinate.</param>
/// <param name="tileY">Output parameter receiving the tile Y coordinate.</param>
/// <param name="levelOfDetail">Output parameter receiving the level of detail.</param>

var QuadKeyToTileXY = TileSystem.QuadKeyToTileXY = function(quadKey)
{
    quadKey = String(quadKey);
    var tileX = 0;
    var tileY = 0;
    var levelOfDetail = quadKey.length;
    for (var i = levelOfDetail; i > 0; i--)
    {
        var mask = 1 << (i - 1);
        switch (quadKey[levelOfDetail - i])
        {
            case '0':
                break;

            case '1':
                tileX |= mask;
                break;

            case '2':
                tileY |= mask;
                break;

            case '3':
                tileX |= mask;
                tileY |= mask;
                break;

            default:
                throw new Error("Invalid QuadKey digit sequence.");
        }
    }

    return {x: tileX, y: tileY, lod: levelOfDetail};
};

//var LatLongToTileXY =
TileSystem.LatLongToTileXY = function(latitude, longitude, levelOfDetail)
{
    latitude = Clip(latitude, MinLatitude, MaxLatitude);
    longitude = Clip(longitude, MinLongitude, MaxLongitude);

    var x = (longitude + 180) / 360;
    var sinLatitude = Math.sin(latitude * Math.PI / 180);
    var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);

    var mapSize = MapSize(levelOfDetail);
    var pixelX = Clip(x * mapSize + 0.5, 0, mapSize - 1);
    var pixelY = Clip(y * mapSize + 0.5, 0, mapSize - 1);

    return {x: parseInt(pixelX / TilePixelSize,0), y: parseInt(pixelY / TilePixelSize,0)};
};

var TileXYToLatLong = TileSystem.TileXYToLatLong = function(tileX, tileY, levelOfDetail)
{
    var pixelX = tileX * TilePixelSize;
    var pixelY = tileY * TilePixelSize;

    var mapSize = MapSize(levelOfDetail);
    var x = (Clip(pixelX, 0, mapSize - 1) / mapSize) - 0.5;
    var y = 0.5 - (Clip(pixelY, 0, mapSize - 1) / mapSize);

    var latitude = 90 - 360 * Math.atan(Math.exp(-y * 2 * Math.PI)) / Math.PI;
    var longitude = 360 * x;

    return {lat: latitude, lng: longitude};
};

/*
var TileXYToLatLongBounds = TileSystem.TileXYToLatLongBounds = function(tileX, tileY, levelOfDetail)
{
    var pixelX = tileX * TilePixelSize;
    var pixelY = tileY * TilePixelSize;

    var mapSize = MapSize(levelOfDetail);
    var x = (Clip(pixelX, 0, mapSize - 1) / mapSize) - 0.5;
    var y = 0.5 - (Clip(pixelY, 0, mapSize - 1) / mapSize);
    var x2 = ((Clip(pixelX, 0, mapSize - 1) + TilePixelSize) / mapSize) - 0.5;
    var y2 = 0.5 - ((Clip(pixelY, 0, mapSize - 1) + TilePixelSize) / mapSize);

    var latitude = 90 - 360 * Math.atan(Math.exp(-y * 2 * Math.PI)) / Math.PI;
    var longitude = 360 * x;
    var latitude2 = 90 - 360 * Math.atan(Math.exp(-y2 * 2 * Math.PI)) / Math.PI;
    var longitude2 = 360 * x2;

    return {lat: latitude, lng: longitude, nextLat: latitude2, nextLng: longitude2};
};*/

var QuadKeyToLatLong = TileSystem.QuadKeyToLatLong = function(quadKey, offsetX, offsetY)
{
    quadKey = String(quadKey);
    var levelOfDetail = quadKey.length;
    var tileXY = QuadKeyToTileXY(quadKey);
    return TileXYToLatLong(tileXY.x + (offsetX || 0), tileXY.y + (offsetY || 0), levelOfDetail);
};

export default TileSystem;