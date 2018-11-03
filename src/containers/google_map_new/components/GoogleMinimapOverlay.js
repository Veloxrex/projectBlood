var GoogleMinimapOverlay = window.GoogleMinimapOverlay = function(map, bounds) {

    // Initialize all properties.
    this.bounds = bounds;
    this.map = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
};

GoogleMinimapOverlay.prototype = new google.maps.OverlayView();
GoogleMinimapOverlay.prototype.updateBounds = function(bounds) {
    this.bounds = bounds;
};


// onAdd is called when the map's panes are ready and the overlay has been
// added to the map.

GoogleMinimapOverlay.prototype.onAdd = function() {
    var _self = this;

    var div = document.createElement('div');
    div.classList.add('minimap');

    this.div = div;

    // Add the element to the "overlayLayer" pane.
    // Pane can get event is "overlayMouseTarget" pane.
    var panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(div);
};

GoogleMinimapOverlay.prototype.draw = function() {

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
    var width = Math.abs(ne.x - sw.x);
    var height = Math.abs(sw.y - ne.y);

    if (width < 20 || height < 20) {
        div.classList.add('pin');
        div.style.left = (sw.x + ne.x) / 2 + 'px';
        div.style.top = (ne.y + sw.y) / 2 + 'px';
        div.style.width = '';
        div.style.height = '';
    } else {
        div.classList.remove('pin');
        div.style.left = sw.x + 'px';
        div.style.top = ne.y + 'px';
        div.style.width = width + 'px';
        div.style.height = height + 'px';
    }
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
GoogleMinimapOverlay.prototype.onRemove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }
};

// Set the visibility to 'hidden' or 'visible'.
GoogleMinimapOverlay.prototype.hide = function() {
    if (this.div) {
        // The visibility property must be a string enclosed in quotes.
        this.div.style.visibility = 'hidden';
    }
};

GoogleMinimapOverlay.prototype.show = function() {
    if (this.div) {
        this.div.style.visibility = 'visible';
    }
};

GoogleMinimapOverlay.prototype.toggle = function() {
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
GoogleMinimapOverlay.prototype.toggleDOM = function() {
    if (this.getMap()) {
        // Note: setMap(null) calls OverlayView.onRemove()
        this.setMap(null);
    } else {
        this.setMap(this.map);
    }
};