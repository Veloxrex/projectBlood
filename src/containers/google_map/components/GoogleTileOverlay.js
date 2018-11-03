import $ from 'jquery';
import _ from 'lodash';
import GoogleTileOverlayPopup from './GoogleTileOverlayPopup'

const google = window.google;
var TILE_BORDER_WIDTH = 1;

// Private static variable
var _focusedTile = null;

var GoogleTileOverlay = window.GoogleTileOverlay = function(map, bounds, tileX, tileY, quadKey) {

    // Initialize all properties.
    this.bounds = bounds;
    this.map = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div = null;
    this.selectable = false;
    this.selected = false;
    this.buyable = false;
    this.hovered = false;

    this.purchasedLandCount = 0;
    this.adList = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);

    this.setTileXY(tileX, tileY);
    this.setQuadKey(quadKey);
};

GoogleTileOverlay.getFocusedTile = function() {
    return _focusedTile;
};

GoogleTileOverlay.prototype = new google.maps.OverlayView();

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
GoogleTileOverlay.prototype.onAdd = function()
{
    var _self = this;

    var div = document.createElement('div');
    div.classList.add('tile');
    div.classList.add('unknown');
    div.setAttribute('data-tile-x', this.tileX);
    div.setAttribute('data-tile-y', this.tileY);
    div.setAttribute('data-quad-key', this.quadKey);

    addEvent('click', div, function(evt)
    {
        if (evt.target !== div) return;
        if (_focusedTile !== _self) {
            if (_focusedTile && _focusedTile.popup) {
                _focusedTile.closeInformation();
            }
            _focusedTile = _self;
        }
        _self.onClickCallback && _self.onClickCallback(_self, evt);
    });

    addEvent('mouseover', div, function(evt)
    {
        if (evt.target !== div) return;
        _self.onMouseOverCallback && _self.onMouseOverCallback(_self, evt);
    });

    this.div = div;

    this.updateTileStyle();

    // Add the element to the "overlayLayer" pane.
    // Pane can get event is "overlayMouseTarget" pane.
    var panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(div);
};

GoogleTileOverlay.prototype.draw = function()
{
    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    var overlayProjection = this.getProjection();

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds.getNorthEast());

    // Resize the image's div to fit the indicated dimensions.
    var div = this.div;
    div.style.left = sw.x + 'px';
    div.style.top = sw.y + 'px';
    div.style.width = (Math.abs(ne.x - sw.x) - TILE_BORDER_WIDTH) + 'px';
    div.style.height = (Math.abs(sw.y - ne.y) - TILE_BORDER_WIDTH) + 'px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
GoogleTileOverlay.prototype.onRemove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }
};

// Set the visibility to 'hidden' or 'visible'.
GoogleTileOverlay.prototype.hide = function() {
    if (this.div) {
        // The visibility property must be a string enclosed in quotes.
        this.div.style.visibility = 'hidden';
    }
};

GoogleTileOverlay.prototype.show = function() {
    if (this.div) {
        this.div.style.visibility = 'visible';
    }
};

GoogleTileOverlay.prototype.toggle = function() {
    if (this.div) {
        if (this.div.style.visibility === 'hidden') {
            this.show();
        } else {
            this.hide();
        }
    }
};

// Detach the map from the DOM via toggleDOM().
// Note that if we later reattach the map, it will be visible again,
// because the containing <div> is recreated in the overlay's onAdd() method.
GoogleTileOverlay.prototype.toggleDOM = function() {
    if (this.getMap()) {
        // Note: setMap(null) calls OverlayView.onRemove()
        this.setMap(null);
    } else {
        this.setMap(this.map);
    }
};

GoogleTileOverlay.prototype.setTileXY = function(tileX, tileY) {
    this.tileX = tileX;
    this.tileY = tileY;

    if(this.div) {
        this.div.setAttribute('data-tile-x', this.tileX);
        this.div.setAttribute('data-tile-y', this.tileY);
    }
};

GoogleTileOverlay.prototype.setQuadKey = function(quadKey) {
    this.quadKey = quadKey;

    if(this.div) {
        this.div.setAttribute('data-quad-key', this.quadKey);
    }
};

GoogleTileOverlay.prototype.getTileXY = function() {
    return {x: this.tileX, y: this.tileY};
};

GoogleTileOverlay.prototype.getQuadKey = function() {
    return this.quadKey;
};

GoogleTileOverlay.prototype.setOnClick = function(callback) {
    this.onClickCallback = callback;
};

GoogleTileOverlay.prototype.setOnMouseOver = function(callback) {
    this.onMouseOverCallback = callback;
};

GoogleTileOverlay.prototype.setOnMouseOver = function(callback) {
    this.onMouseOverCallback = callback;
};

GoogleTileOverlay.prototype.setLandInfo = function(landInfoList, landCount) {
    this.landInfoList =_(landInfoList)
        .groupBy('userName')
        .map((objs, key) => ({
            'userName': key,
            'sellPrice': _.sumBy(objs, 'sellPrice'),
            'count': _.sumBy(objs, 'count') }))
        .value();
    this.landCount = landCount;

    // Counting purchased land for this tile.
    var purchasedLandCount = 0;
    var adList = [];

    for (var i in landInfoList)
    {
        purchasedLandCount += landInfoList[i].count;

        if (landInfoList[i].ad) {
            landInfoList[i].ad.weight = landCount / landInfoList[i].count;
            adList.push(landInfoList[i].ad);
        }
    }
    this.purchasedLandCount = purchasedLandCount;
    this.adList = adList.length > 0? adList: null;

    // 소유자가 있는 랜드가 없는 경우, 선택 가능
    this.selectable = false;

    this.selectable = this.purchasedLandCount===0||(this.purchasedLandCount>0&&this.purchasedLandCount!==this.landCount);

    if (!this.selectable) {
        this.setSelected(false, true);
    }
    this.updateTileStyle();
};

GoogleTileOverlay.prototype.updateTileStyle = function() {
    if (!this.div) return;
    // If landInfoList is null, info about this tile is not loaded or error occured.
    if (this.landInfoList === null) {
        this.div.classList.add('unknown');
        return;
    }

    // Reset status css-class
    this.div.classList.remove('unknown');
    this.div.classList.remove('purchased');
    this.div.classList.remove('partial');
    this.div.classList.remove('hovered');

    if (this.purchasedLandCount > 0)
    {
        var innerHTML = '<p style="padding: 5px; font-size: 7px; font-weight: bold; color: blue; pointer-events: none;">'+this.purchasedLandCount+'/'+this.landCount+'<br/>';
        this.buyable = false;
        var sellPrice = 0;
        $.each(this.landInfoList,function(index, node){
            if(node.count>0)
            {
                innerHTML += '<br/><span style="font-size: 10px; pointer-events: none;"> '+node.userName+': '+node.count+'</span>';
                if(node.sellPrice>0)
                {
                    innerHTML += ' ('+node.sellPrice+')';

                    var userName = JSON.parse(localStorage.getItem('user')).userName;
                    if(node.userName!==userName)
                        sellPrice += node.sellPrice;
                }
            }
        });
        innerHTML += '</p>';
        this.div.innerHTML = innerHTML;

        if(sellPrice > 0)
            this.buyable = true;

        // Purchased all land in this tile
        if(this.purchasedLandCount === this.landCount) {
            this.div.classList.add('purchased');
        } else {
            // Purchased some land in this tile
            this.div.classList.add('partial');
        }
    }
};

GoogleTileOverlay.prototype.updateTileSelectStyle = function() {
    if (!this.div) return;

    // If landInfoList is null, info about this tile is not loaded or error occured.
    if (this.landInfoList === null) {
        this.div.classList.add('unknown');
        return;
    }

    if (this.selected) {
        this.div.classList.add('selected');
    } else {
        this.div.classList.remove('selected');
    }
};

GoogleTileOverlay.prototype.updateTileGrabbedStyle = function() {
    if (!this.div) return;

    // If landInfoList is null, info about this tile is not loaded or error occured.
    if (this.landInfoList === null) {
        this.div.classList.add('unknown');
        return;
    }

    if (this.grabbed) {
        this.div.classList.add('grabbed');
    } else {
        this.div.classList.remove('grabbed');
    }
};

GoogleTileOverlay.prototype.updateTileHoverStyle = function() {
    if (!this.div) return;

    // If landInfoList is null, info about this tile is not loaded or error occured.
    if (this.landInfoList === null) {
        this.div.classList.add('unknown');
        return;
    }

    if (this.hovered) {
        this.div.classList.add('hovered');
    } else {
        this.div.classList.remove('hovered');
    }
};

GoogleTileOverlay.prototype.toggleInformation = function() {
    if (!this.popup) {
        this.popup = new GoogleTileOverlayPopup(this);
    }

    if (this.popup.isOpened()) {
        this.closeInformation();
    } else {
        this.openInformation();
    }
};

GoogleTileOverlay.prototype.openInformation = function() {
    var _self = this;
    this.popup.open();
    this.div.classList.add('focused');
    if (this.menuRoot !== null) {
        $(this.menuRoot).fadeOut(200, function() {_self.menuRoot.remove()});
        this.menuRoot = null;
    }
};

GoogleTileOverlay.prototype.closeInformation = function() {
    this.popup.close();
    if (this.div) {
        this.div.classList.remove('focused');
    }
    $(this.menuRoot).fadeOut(200);
    this.menuRoot = null;
};

GoogleTileOverlay.prototype.escape = function() {
    var _self = this;

    this.popup.close();

    if (this.menuRoot) {
        $(this.menuRoot).fadeOut(200, function() {_self.menuRoot.remove()});
        this.menuRoot = null;
        this.popup.open();
    }
};

GoogleTileOverlay.prototype.setSelected = function(flag, force) {
    if (!this.selectable && !this.buyable && !force) {
        return false;
    }
    this.selected = flag;
    this.updateTileSelectStyle();
    return true;
};

GoogleTileOverlay.prototype.setHovered = function(flag, force) {
    if (!this.selectable && !this.buyable && !force) {
        return false;
    }

    this.hovered = flag;
    this.updateTileHoverStyle();
    return true;
};

GoogleTileOverlay.prototype.setGrabbed = function(flag) {
    this.grabbed = flag;
    this.updateTileGrabbedStyle();
};

GoogleTileOverlay.prototype.isNeededCache = function() {
    // 선택된 항목은 가능한 유지 시킴
    return this.selected || this.grabbed;
};

GoogleTileOverlay.prototype.open = function(data) {
    var _self = this;

    if (this.menuRoot !== null) {
        return;
    }

    this.menuRoot = $('<div class="menu-root"></div>');
    this.menuRoot.hide().fadeIn(400, function() {
        _self.popup.close();
    });

    // TODO::
    var wrap = $('<div></div>').css({'left': 5, 'right': 5, 'top': 5, 'bottom': 5, 'position': 'absolute', 'border': '1px solid #cccccc'});
    var iframe = $('<iframe></iframe>').css({'width': '100%', 'height': '100%', 'border': 'none'});
    var src;
    switch (data) {
        case 'bloodland': src = './map_menu/:bloodland'; break;
        case 'game': src = './map_menu/:game'; break;
        case 'transaction': src = './map_menu/:transaction'; break;
        case 'ads': src = './map_menu/:ads'; break;
        case 'video': src = './map_menu/:video'; break;
        case 'blochat': src = './map_menu/:blochat'; break;
        default: break;
    }
    iframe.attr('src', src);

    this.menuRoot.append(wrap.append(iframe));
    this.menuRoot.appendTo(this.div);
};

function addEvent(evnt, elem, func) {
    if (elem.addEventListener) { // W3C DOM
        elem.addEventListener(evnt, func, false);
    } else if (elem.attachEvent) { // IE DOM
        elem.attachEvent('on' + evnt, func);
    } else { // No much to do
        elem['on' + evnt] = func;
    }
}

export default GoogleTileOverlay