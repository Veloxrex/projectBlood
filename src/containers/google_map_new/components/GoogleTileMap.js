import $ from 'jquery';
import _ from 'lodash';
import TileSystem from './TileSystem';
import BloodLandService from './BloodLandService';
import GoogleTileOverlay from './GoogleTileOverlay';
import GoogleAdOverlay from './GoogleAdOverlay';
import connect from "react-redux/es/connect/connect";
import React from "react";
import {landService} from "../../../redux/services/landService";
const google = window.google;

// Private Static Constants
var MAX_TILE_LEVEL = 24;
var TILE_COUNT_BY_LEVEL_LIST = (function () {
    var list = [];
    for (var i = 0; i <= 24; i++) list.push(Math.pow(4, Math.max(0, MAX_TILE_LEVEL - i)));
    return list;
})();

// Private Static Constants
var DEFAULT_LEVEL_OFFSET = 2;
var DEFAULT_MARGIN = 5;

// Select Modes
var SELECT = 0;
var MULTI_SELECT = 1;
var BOX_SELECT = 2;
var BOX_TOGGLE = 3;

var clearAllTile = function (map){
    var tilesByQuadKey = map.tilesByQuadKey = map.tilesByQuadKey || {};
    for (var quadKey in tilesByQuadKey) {
        tilesByQuadKey[quadKey].setMap(null);
        tilesByQuadKey[quadKey] = null;
        delete tilesByQuadKey[quadKey];
    }
};

var getTileByQuadKey = function (map, quadKey){
    map.tilesByQuadKey = map.tilesByQuadKey || {};
    return map.tilesByQuadKey[quadKey];
};

var insertTileByQuadKey = function (map, quadKey, tile) {
    map.tilesByQuadKey = map.tilesByQuadKey || {};
    map.tilesByQuadKey[quadKey] = tile;
};

// var cleanupTilesOutOf = function(map, beginTileX, endTileX, beginTileY, endTileY)
// {
//     var tilesByQuadKey = map.tilesByQuadKey = map.tilesByQuadKey || {};
//     var tileXY;
//     for(var quadKey in tilesByQuadKey) {
//         tileXY = tilesByQuadKey[quadKey].getTileXY();
//         // 구역 밖에 있는지 체크
//         if (tileXY.x < beginTileX || tileXY.x > endTileX || tileXY.y < beginTileY || tileXY.y > endTileY) {
//             // 그랩된 타일이면 해제
//             if (map.quadKeyGrabbed == quadKey) {
//                 map.quadKeyGrabbed = null;
//                 tilesByQuadKey[quadKey].setGrabbed(false);
//             }
//             // 캐시가 필요한 건 패스
//             if (tilesByQuadKey[quadKey].isNeededCache()) {
//                 continue;
//             }
//             tilesByQuadKey[quadKey].setMap(null);
//             tilesByQuadKey[quadKey] = null;
//             delete tilesByQuadKey[quadKey];
//         }
//     }
// };

var displayGrid = function (map, level, margin) {
    map.option = map.option || {};
    map.option.level = level = level || (map.getZoom() + DEFAULT_LEVEL_OFFSET);
    map.option.margin = margin = margin || DEFAULT_MARGIN;

    var bounds = getBounds(map);
    var beginTile = TileSystem.LatLongToTileXY(bounds.beginLat, bounds.beginLng, level);
    var endTile = TileSystem.LatLongToTileXY(bounds.endLat, bounds.endLng, level);

    var beginTileX = beginTile.x - margin;
    var beginTileY = beginTile.y - margin;
    var endTileY = endTile.y + 1 + margin;
    var endTileX = endTile.x + 1 + margin;

    // If calculated and saved position are same, should not update
    if (beginTileX === map.beginTileX && beginTileY === map.beginTileY) {
        return;
    }

    map.beginTileX = beginTileX;
    map.beginTileY = beginTileY;
    map.level = level;

    if (beginTileX < endTileX) {
        createTiles(map, beginTileX, endTileX, beginTileY, endTileY, level);
        //cleanupTilesOutOf(map, beginTileX, endTileX, beginTileY, endTileY);
    }
    else {
        createTiles(map, beginTileX, Math.pow(2, level), beginTileY, endTileY, level);
        createTiles(map, 0, endTileX, beginTileY, endTileY, level);
        //cleanupTilesOutOf(map, beginTileX, Math.pow(2, level), beginTileY, endTileY);
        //cleanupTilesOutOf(map, 0, endTileX, beginTileY, endTileY);
    }

    updateTileSelection(map);
    // Request purchased land to server
    BloodLandService.requestPublicAd(bounds, function (data) {
        // If not same, this request is not necessary
        if (level !== map.getZoom() + DEFAULT_LEVEL_OFFSET) {
            return;
        }

        // Reset Ad to Tile
        updateAd(map, level, data.ad || {});
    }, 400);
};

var clearAllAd = function (map) {
    var adsByQuadKey = map.adsByQuadKey;
    for (var quadKey in adsByQuadKey) {
        adsByQuadKey[quadKey].setMap(null);
        adsByQuadKey[quadKey] = null;
        delete adsByQuadKey[quadKey];
    }
};

var updateAd = function (map, level, ads) {
    ads = map.ads = ads || {};
    // quadKey should be same to ads[quadKey].area.begin
    var ad;
    var bounds;
    for (var quadKey in ads) {
        if (map.adsByQuadKey[quadKey]) continue;

        ad = ads[quadKey];
        bounds = new google.maps.LatLngBounds(TileSystem.QuadKeyToLatLong(ad.area.begin), TileSystem.QuadKeyToLatLong(ad.area.end, 1, 1));

        map.adsByQuadKey[quadKey] = new GoogleAdOverlay(map, bounds, ad.type, ad.contents, quadKey);
        map.adsByQuadKey[quadKey].setOnClick(map.onAdClick);
    }
};

var updateLand = function (map, level, lands) {
    var tilesByQuadKey = map.tilesByQuadKey = map.tilesByQuadKey || {};
    var mapLands = map.lands = lands || {};

    var landCountOfTile = Math.pow(4, MAX_TILE_LEVEL - level);
    var landInfoList;

    // Make land info list, put included land info for tile.
    var tileQuadKey, landQuadKey;
    for (tileQuadKey in tilesByQuadKey) {
        landInfoList = [];
        var totalLevelLow = 0;
        for (landQuadKey in mapLands) {
            if (landQuadKey.indexOf(tileQuadKey.substr(0, landQuadKey.length)) === 0) {
                // Set count, included land in tile
                // If length of land quad key and max level(=23) are same, count is 1.
                if (landQuadKey.length === MAX_TILE_LEVEL) {
                    mapLands[landQuadKey].count = 1;
                } else {
                    // 랜드의 키의 길이가 최대 레벨과 다르면, 해당 타일의 포함된 랜드의 개수를 계산

                    if(landQuadKey.length > level)
                    {
                        mapLands[landQuadKey].count = TILE_COUNT_BY_LEVEL_LIST[landQuadKey.length];
                        totalLevelLow += mapLands[landQuadKey].count
                    }
                    else if(landQuadKey.length === level)
                    {
                        mapLands[landQuadKey].count = TILE_COUNT_BY_LEVEL_LIST[landQuadKey.length] - totalLevelLow;
                        totalLevelLow += mapLands[landQuadKey].count
                    }
                    else
                    {
                        mapLands[landQuadKey].count = TILE_COUNT_BY_LEVEL_LIST[level] - totalLevelLow;
                        totalLevelLow = mapLands[landQuadKey].count;
                    }
                 }

                // 타일에 설정할 랜드 정보를 넣어둠
                landInfoList.push(mapLands[landQuadKey]);
            }
        }

        // 랜드 정보를 타일에 설정
        tilesByQuadKey[tileQuadKey].setLandInfo(landInfoList, landCountOfTile);
    }
};

var updateTileSelection = function (map) {
    // 로딩된 모든 타일들 상태 검사
    for (var quadKey in map.tilesByQuadKey) {
        // 그랩된 타일인지 설정
        map.tilesByQuadKey[quadKey].setGrabbed(map.quadKeyGrabbed === quadKey);

        // 선택된 타일인지 설정
        setTileSelected(map, quadKey, isTileSelected(map, quadKey));
    }
};

var setTileSelected = function (map, quadKey, flag) {
    var tile = map.tilesByQuadKey[quadKey];
    var index = map.quadKeySelectedList.indexOf(quadKey);
    // 일단 선택 목록에 저장
    if (!flag) {
        (index !== -1) && map.quadKeySelectedList.splice(index, 1);
        delete map.quadKeySelectedMap[quadKey];
        tile && tile.setSelected(flag);
        $('.tile').removeClass('hovered');
    }
    else {
        // 타일이 있는 경우 플래그를 설정하지만, 다른 결과를 반환하면 삭제
        if (tile && tile.setSelected(flag) === false) {
            (index !== -1) && map.quadKeySelectedList.splice(index, 1);
            delete map.quadKeySelectedMap[quadKey];
        } else {
            (index === -1) && map.quadKeySelectedList.push(quadKey);
            map.quadKeySelectedMap[quadKey] = quadKey;
        }
    }

    map.selectedCount = map.quadKeySelectedList.length;
};

var setTileHovered = function (map, quadKey, flag) {
    var tile = map.tilesByQuadKey[quadKey];
    var index = map.quadKeyHoveredList.indexOf(quadKey);

    // 일단 선택 목록에 저장
    if (!flag) {
        (index !== -1) && map.quadKeyHoveredList.splice(index, 1);
        delete map.quadKeyHoveredMap[quadKey];
        tile && tile.setHovered(flag);
    }
    else {
        // 타일이 있는 경우 플래그를 설정하지만, 다른 결과를 반환하면 삭제
        if (tile && tile.setHovered(flag) === false) {
            (index !== -1) && map.quadKeyHoveredList.splice(index, 1);
            delete map.quadKeyHoveredMap[quadKey];
        }
        else {
            (index === -1) && map.quadKeyHoveredList.push(quadKey);
            map.quadKeyHoveredMap[quadKey] = quadKey;
        }
    }
};

var deselectAllTile = function (map) {
    var quadKey;
    var tile;

    for (var i in map.quadKeySelectedList)
    {
        quadKey = map.quadKeySelectedList[i];
        tile = map.tilesByQuadKey[quadKey];

        tile && tile.setSelected(false);
        delete map.quadKeySelectedMap[quadKey];
    }
    map.quadKeySelectedList = [];
    map.selectedCount = map.quadKeySelectedList.length;
};

var isTileSelected = function (map, quadKey) {
    return !!map.quadKeySelectedMap[quadKey];
};

var createTiles = function (map, beginTileX, endTileX, beginTileY, endTileY, level) {
    var c, r;
    for (c = beginTileX; c < endTileX; c++) {
        for (r = beginTileY; r < endTileY; r++) {
            createTile(map, c, r, level);
        }
    }
};

var createTile = function (map, col, row, level) {
    var quadKey = TileSystem.TileXYToQuadKey(col, row, level);
    var existingTile = getTileByQuadKey(map, quadKey);
    if (existingTile) return existingTile;

    var bounds = new google.maps.LatLngBounds(TileSystem.TileXYToLatLong(col, row, level), TileSystem.TileXYToLatLong(col + 1, row + 1, level));
    var tile = new GoogleTileOverlay(map, bounds, col, row, quadKey);
    tile.setOnClick(map.onTileClick);
    tile.setOnMouseOver(map.onTileMouseOver);

    insertTileByQuadKey(map, quadKey, tile);
    return tile;
};

var getBounds = function (map) {
    var bounds = map.getBounds();
    return {
        beginLat: bounds.getNorthEast().lat(),
        beginLng: bounds.getSouthWest().lng(),
        endLat: bounds.getSouthWest().lat(),
        endLng: bounds.getNorthEast().lng()
    }
};

var onTileClick = function (map, tile, evt) {
    var quadKey = tile.getQuadKey();
    if (map.selectMode === SELECT) {
        // Pass click event
        map.onTileClickCallback && map.onTileClickCallback(map, tile, evt);
    }
    else if (map.selectMode === MULTI_SELECT)
    {
        // Toggle
        if (isTileSelected(map, quadKey)) {
            setTileSelected(map, quadKey, false);
        } else {
            setTileSelected(map, quadKey, true);
        }
        // Pass select event
        map.onTileSelectCallback && map.onTileSelectCallback(map, tile, evt);
    }
    else if (map.selectMode === BOX_SELECT || map.selectMode === BOX_TOGGLE) {
        // Toggle
        // Grabbed tile 이 없으면, 영역 선택을 시작함
        if (map.quadKeyGrabbed === null) {
            map.quadKeyGrabbed = quadKey;
            tile.setGrabbed(true);
        }
        else {
            // Grabbed tile 이 있는 경우,
            // Grabbed tile 을 선택하였으면, 선택 취소
            if (map.quadKeyGrabbed === quadKey) {
                map.quadKeyGrabbed = null;
                tile.setGrabbed(false);
            }
            else {
                // 다른 타일을 선택하였으면, 선택을 완료
                selectAreaByQuadKey(map, map.quadKeyGrabbed, quadKey, map.selectMode === BOX_TOGGLE, evt);

                // 그랩 선택 해제
                if (map.tilesByQuadKey[map.quadKeyGrabbed]) {
                    map.tilesByQuadKey[map.quadKeyGrabbed].setGrabbed(false);
                }
                map.quadKeyGrabbed = null;
            }
        }
        $('.tile').removeClass('hovered');
    }
};

var onTileMouseOver = function (map, tile, evt) {
    if ((map.quadKeyGrabbed !== null) && (map.selectMode === BOX_SELECT || map.selectMode === BOX_TOGGLE)) {
        var quadKey = tile.getQuadKey();
        hoverAreaByQuadKey(map, map.quadKeyGrabbed, quadKey, map.selectMode === BOX_TOGGLE, evt);
    }
};

// var onAdClick = function (map, tile, evt) {
//     map.onAdClickCallback && map.onAdClickCallback(map, tile, evt);
// };

var selectAreaByQuadKey = function (map, startQuadKey, endQuadKey, toggle, evt) {
    var beginTileXY = TileSystem.QuadKeyToTileXY(startQuadKey);
    var endTileXY = TileSystem.QuadKeyToTileXY(endQuadKey);
    var quadKey;
    var tile;

    var startX = Math.min(beginTileXY.x, endTileXY.x);
    var endX = Math.max(beginTileXY.x, endTileXY.x);
    var startY = Math.min(beginTileXY.y, endTileXY.y);
    var endY = Math.max(beginTileXY.y, endTileXY.y);

    // 구역에 있는 타일을 모두 선택/해제
    // Select Grabbed Tile To Current Tile
    var x, y;
    for (x = startX; x <= endX; x++) {
        for (y = startY; y <= endY; y++) {
            quadKey = TileSystem.TileXYToQuadKey(x, y, map.level);
            tile = map.tilesByQuadKey[quadKey];
            if (isTileSelected(map, quadKey) === false) {
                setTileSelected(map, quadKey, true);
            } else if (toggle) {
                setTileSelected(map, quadKey, false);
            } else {
                continue;
            }

            // Pass select event
            map.onTileSelectCallback && map.onTileSelectCallback(map, tile, evt);
        }
    }
};

var hoverAreaByQuadKey = function (map, startQuadKey, endQuadKey, toggle, evt) {
    $('.tile').removeClass('hovered');
    var beginTileXY = TileSystem.QuadKeyToTileXY(startQuadKey);
    var endTileXY = TileSystem.QuadKeyToTileXY(endQuadKey);
    var quadKey;

    var startX = Math.min(beginTileXY.x, endTileXY.x);
    var endX = Math.max(beginTileXY.x, endTileXY.x);
    var startY = Math.min(beginTileXY.y, endTileXY.y);
    var endY = Math.max(beginTileXY.y, endTileXY.y);

    var x, y;
    for (x = startX; x <= endX; x++) {
        for (y = startY; y <= endY; y++) {
            quadKey = TileSystem.TileXYToQuadKey(x, y, map.level);
            setTileHovered(map, quadKey, true);
        }
    }
};

class GoogleTileMap extends React.Component
{
    static init(map)
    {
        map.onTileClick = function (tile, evt) {
            onTileClick(map, tile, evt);
        };

        map.onTileMouseOver = function (tile, evt) {
            onTileMouseOver(map, tile, evt);
        };

        /*map.onAdClick = function (ad, evt) {
            onAdClick(map, ad, evt);
            var quadKey = ad.getQuadKey();
            map.adsByQuadKey[quadKey].setMap(null);
            map.adsByQuadKey[quadKey] = null;
            delete map.adsByQuadKey[quadKey];
        };*/

        //map.setClickableIcons(false);

        // 타일 관련
        map.selectMode = SELECT;
        map.quadKeySelectedList = [];
        map.quadKeySelectedMap = {};
        map.quadKeyHoveredList = [];
        map.quadKeyHoveredMap = {};
        map.selectedCount = 0;
        map.quadKeyGrabbed = null;

        // 지도 광고 관련
        map.adsByQuadKey = {};
        this.reload(map);
    };

    static reload = (map) => {
        var zoom = map.getZoom();
        if (map.loadedZoom !== zoom) {
            // Reset Tiles
            clearAllTile(map);
            map.quadKeySelectedList = [];
            map.quadKeySelectedMap = {};
            map.quadKeyHoveredList = [];
            map.quadKeyHoveredMap = {};
            map.selectedCount = 0;
            map.quadKeyGrabbed = null;
            // Reset Ad Tiles
            clearAllAd(map);
        }
        displayGrid(map);
        map.loadedZoom = zoom;

        var dataLand = {};
        landService.getAll()
        .then(
            lands => {
                //console.log("lands");
                //console.log(lands);
                lands.map((land, index) => {
                    _.assign(
                        dataLand,
                        {[land.quadKey]:{'userName':land.userName,'sellPrice':land.sellPrice,'quadKey':land.quadKey}}
                    );
                    return true;
                });
                dataLand = _.sortBy(dataLand, function (obj) {
                    return parseInt(obj.quadKey, 10);
                });
                dataLand = _.reverse(dataLand);

                // 현재 레벨에서 한 타일당 포함되는 랜드 개수
                var tempMapLands = {};
                $.map( dataLand, function( val, i ) {
                    _.assign(tempMapLands,{[val.quadKey]:{'userName':val.userName, 'sellPrice':val.sellPrice}})
                });
                dataLand = tempMapLands;
                updateLand(map, (zoom+DEFAULT_LEVEL_OFFSET), dataLand || {});
            },
            error => {
                console.log('Fail to upload Lands!');
            }
        );
    };

    static setSelectMode = (map, mode) => {
        // Initialize select state
        if (mode === SELECT)
        {
            deselectAllTile(map);
            //  Pass select event
            map.onTileSelectCallback && map.onTileSelectCallback(map, null, null);
        }

        if (map.tilesByQuadKey[map.quadKeyGrabbed]) {
            map.tilesByQuadKey[map.quadKeyGrabbed].setGrabbed(false);
        }
        map.quadKeyGrabbed = null;
        $('.tile').removeClass('hovered');

        map.selectMode = mode;
    };

    static setOnTileClickCallback = (map, callback) => {
        map.onTileClickCallback = callback;
    };

    static setOnTileMouseOverCallback = (map, callback) => {
        map.onTileMouseOverCallback = callback;
    };

    static setOnTileSelectCallback = (map, callback) => {
        map.onTileSelectCallback = callback;
    };

    static setOnAdClickCallback = (map, callback) => {
        map.onAdClickCallback = callback;
    };
}

function mapStateToProps(state) {
    const { lands, authentication } = state;
    const { user } = authentication;
    return {
        lands,
        user
    };
}

const connectedPage = connect(mapStateToProps)(GoogleTileMap);
export default connectedPage;