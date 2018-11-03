import AdContents from './AdContents';
const google = window.google;

var TILE_BORDER_WIDTH = 2;

var GoogleAdOverlay = window.GoogleAdOverlay = function(map, bounds, adType, adContents, quadKey) {

    // Initialize all properties.
    this.bounds = bounds;
    this.map = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div = null;

    this.adType = adType;
    this.adContents = adContents;
    this.quadKey = quadKey;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
};

GoogleAdOverlay.prototype = new google.maps.OverlayView();

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
GoogleAdOverlay.prototype.onAdd = function() {
    var _self = this;

    var div = document.createElement('div');
    div.classList.add('ad-tile');

    this.div = div;

    this.adDiv = AdContents.create(this.adType, this.adContents);
    this.adDiv.classList.add('ad');
    this.div.appendChild(this.adDiv);

    var overlay = document.createElement('div');
    overlay.classList.add('ad-overlay');

    addEvent('click', overlay, function(evt) {
        if (evt.target !== overlay) return;

        _self.onClickCallback && _self.onClickCallback(_self, evt);
    });

    this.div.appendChild(overlay);

    // Add the element to the "overlayLayer" pane.
    // Pane can get event is "overlayMouseTarget" pane.
    var panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(div);
};

GoogleAdOverlay.prototype.draw = function() {

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
GoogleAdOverlay.prototype.onRemove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }
};

// Set the visibility to 'hidden' or 'visible'.
GoogleAdOverlay.prototype.hide = function() {
    if (this.div) {
        // The visibility property must be a string enclosed in quotes.
        this.div.style.visibility = 'hidden';
    }
};

GoogleAdOverlay.prototype.show = function() {
    if (this.div) {
        this.div.style.visibility = 'visible';
    }
};

GoogleAdOverlay.prototype.toggle = function() {
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
GoogleAdOverlay.prototype.toggleDOM = function() {
    if (this.getMap()) {
        // Note: setMap(null) calls OverlayView.onRemove()
        this.setMap(null);
    } else {
        this.setMap(this.map);
    }
};

GoogleAdOverlay.prototype.setOnClick = function(callback) {
    this.onClickCallback = callback;
};

GoogleAdOverlay.prototype.getQuadKey = function() {
    return this.quadKey;
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

export default GoogleAdOverlay