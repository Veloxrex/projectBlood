const GoogleMinimapMap = window.GoogleMinimapMap = {};

const init = GoogleMinimapMap.init = function(map, targetMap) {
    map.addListener('center_changed', getUpdateBoundsCallback(map, targetMap));

    map.setClickableIcons(false);

    GoogleMinimapMap.displayMinimap(map, targetMap);
};

const displayMinimap = GoogleMinimapMap.displayMinimap = function(map, targetMap) {
    var area = new GoogleMinimapOverlay(map, targetMap.getBounds());
    map.area = area;
};

const getUpdateBoundsCallback = function(map, targetMap) {
    return function() {
        if (map.area) {
            map.area.updateBounds(targetMap.getBounds());
            map.area.draw();
        }
        return true;
    }
};