//import $ from 'jquery';

var GoogleTileOverlayPopup = window.GoogleTileOverlayPopup = function(tile) {
    this.tile = tile;
    this.popupDiv = null;
    this.adList = null;
    this.adIndex = null;
    this.isHidden = true;
};

// GoogleTileOverlayPopup.prototype.open = function() {
//     var _self = this;
//     var tile = this.tile;
//     // var adList = this.adList = tile.adList;
//
//     // // Set ad to tile.
//     // var groupAdDiv;
//     // var childAdDiv;
//     // var contentsDiv;
//     // var overlayDiv;
//     // var overlayButtonDiv;
//
//     // var contents;
//     // // Title is info about purchased.
//     // if (tile.purchasedLandCount === 0) {
//     //   contents = '해당 구역의 소유자가 없습니다.';
//     // } else if (tile.purchasedLandCount === tile.landCount) {
//     //   if (tile.landCount === 1) {
//     //     contents = '해당 구역에 소유자가 있습니다.';
//     //   } else {
//     //     contents = '해당 구역 모든 곳에 소유자가 있습니다.';
//     //   }
//     // } else {
//     //   contents = '해당 구역 총 ' + tile.landCount + '곳 중, ' + tile.purchasedLandCount + '곳에 소유자가 있습니다.';
//     // }
//
//     if (!this.popupDiv) {
//         this.popupDiv = document.createElement('div');
//         this.popupDiv.classList.add('popup');
//
//         // if (adList && adList.length > 0) {
//         //   groupAdDiv = document.createElement('div');
//         //   groupAdDiv.classList.add('ad-group');
//
//         //   for (var i in adList) {
//         //     // 광고가 들어갈 빈껍데기 영역을 미리 만들어둠
//         //     childAdDiv = document.createElement('div');
//         //     childAdDiv.classList.add('ad-child');
//
//         //     // 광고 내용은 여기서 넣지 않음
//         //     childAdDiv.appendChild(AdContents.create(this.adList[i].type, this.adList[i].contents, 256, 172));
//         //     this.popupDiv.appendChild(childAdDiv);
//         //     break;
//         //   }
//
//         // }
//
//         var element = document.createElement('iframe');
//         element.src = './map_menu/:index';
//         element.allow = 'autoplay; encrypted-media';
//         element.style.width = '100%';
//         element.style.height = '100%';
//         element.style.border = 'none';
//         element.style.overflow = 'hidden';
//
//         element.onload = function() {
//             element.contentWindow.quadKey = _self.tile.quadKey;
//         };
//
//         this.dicemenu = element;
//         this.popupDiv.appendChild(element);
//         tile.div.appendChild(this.popupDiv);
//
//         this.popupEventDiv = document.createElement('div');
//         this.popupEventDiv.classList.add('popup-event-layer');
//         this.popupEventDiv.pointerEvents = 'none';
//         this.popupEventDiv.click = function() {
//             _self.popupDiv.style.pointerEvents = 'all';
//             _self.popupEventDiv.style.pointerEvents = 'none';
//         };
//         this.popupEventDiv.onmouseover = function() {
//             _self.popupDiv.style.pointerEvents = 'all';
//             _self.popupEventDiv.style.pointerEvents = 'none';
//         };
//
//         this.popupBubbleGroupDiv = document.createElement('div');
//         this.popupBubbleGroupDiv.classList.add('popup-bubble-group-layer');
//         setTimeout(function() {
//             insertButtons(_self, _self.popupBubbleGroupDiv);
//         }, 1000);
//
//         tile.div.appendChild(this.popupDiv);
//         tile.div.appendChild(this.popupEventDiv);
//         tile.div.appendChild(this.popupBubbleGroupDiv);
//     }
// };
//
// GoogleTileOverlayPopup.prototype.close = function() {
//     if (this.popupDiv) {
//         if (this.tile.div) {
//             this.tile.div.classList.remove('focused');
//         }
//         this.popupDiv.remove();
//         this.popupDiv = null;
//         this.popupEventDiv.remove();
//         this.popupEventDiv = null;
//         this.popupBubbleGroupDiv.remove();
//         this.popupBubbleGroupDiv = null;
//         this.adIndex = null;
//     }
// };

GoogleTileOverlayPopup.prototype.open = function() {
    //var _self = this;
    //var tile = this.tile;

    if (this.isHidden)
    {
        var leftPanel = this.leftPanel();

        var mainpart = document.getElementById("MainPart");
        mainpart.appendChild(leftPanel);
        this.isHidden = false;
    }
    else if(document.getElementById("mapInfoPanel"))
    {
        document.getElementById("mapInfoPanel").remove();
        this.isHidden = true;
    }
};

GoogleTileOverlayPopup.prototype.leftPanel= function(){
    var leftPanel = document.createElement('div');
    leftPanel.classList.add('map-info-panel');
    leftPanel.setAttribute("id","mapInfoPanel");
    leftPanel.innerHTML =
        "<div class='map-info-content'>"
        +"<div class='d-flex p-3' style='background:darkred'>"
        +"<img src='https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-outline.svg' alt='' width='48' height='48' class='col-4'>"
        +    "<div>"
        +        "<h2 class='mb-0 text-white lh-100 font-weight-bold'>Blood Land</h2>"
        +        "<medium class='font-italic text-white'>Build your map in the realworld</medium>"
        +    "</div>"
        +"</div>"
        +"<div class='p-3'>"
        +"<h2>"+this.tile.getQuadKey()+"</h2>"
        +"<p class='lead'>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>"
        +"<hr class='my-3'>"
        +"<a class='btn btn-primary btn-md' href='#' role='button'><span class='lnr lnr-map'></span></a>"
        +"<a class='btn btn-secondary btn-md' href='#' role='button'><span class='lnr lnr-apartment'></span></a>"
        +"<a class='btn btn-success btn-md' href='#' role='button'><span class='lnr lnr-license'></span></a>"
        +"<a class='btn btn-danger btn-md' href='#' role='button'><span class='lnr lnr-camera-video'></span></a>"
        +"<a class='btn btn-warning btn-md' href='#' role='button'><span class='lnr lnr-book'></span></a>"
        +"<a class='btn btn-info btn-md' href='#' role='button'><span class='lnr lnr-users'></span></a>"
        +"<a class='btn btn-dark btn-md' href='#' role='button'><span class='lnr lnr-smartphone'></span></a>"
        +"</div>"
        +"</div>";

    return leftPanel;
};


GoogleTileOverlayPopup.prototype.close = function() {
    if (!this.isHidden) {
        document.getElementById("mapInfoPanel").remove();
        this.isHidden = false;
    }
};

GoogleTileOverlayPopup.prototype.isOpened = function() {
    return !!this.popupDiv;
};

// function addEvent(evnt, elem, func) {
//     if (elem.addEventListener) { // W3C DOM
//         elem.addEventListener(evnt, func, false);
//     } else if (elem.attachEvent) { // IE DOM
//         elem.attachEvent('on' + evnt, func);
//     } else { // No much to do
//         elem['on' + evnt] = func;
//     }
// }

// function insertButtons(obj, element) {
//     var leftOffset1 = -152;
//     var leftOffset2 = -240;
//     var rightOffset1 = 92;
//     var rightOffset2 = 180;
//     var left1 = $('<div class="menu-button left1"></div>').on('click', function() {clickMenu(obj, 'transaction');});
//     var left2 = $('<div class="menu-button left2"></div>').on('click', function() {clickMenu(obj, 'blochat');});
//     var right1 = $('<div class="menu-button right1"></div>').on('click', function() {clickMenu(obj, 'bloodland');});
//     var right2 = $('<div class="menu-button right2"></div>').on('click', function() {clickMenu(obj, 'game');});
//     var top = $('<div class="menu-button top"></div>').on('click', function() {clickMenu(obj, 'video');});
//     var bottom = $('<div class="menu-button bottom"></div>').on('click', function() {clickMenu(obj, 'ads');});
//
//     left1.appendTo(element).stop().animate({left: leftOffset1}, 200).animate({height: 60, top: -30}, 200);
//     left2.appendTo(element).stop().animate({left: leftOffset2}, 300).animate({height: 60, top: -30}, 200);
//     right1.appendTo(element).stop().animate({left: rightOffset1}, 200).animate({height: 60, top: -30}, 200);
//     right2.appendTo(element).stop().animate({left: rightOffset2}, 300).animate({height: 60, top: -30}, 200);
//     setTimeout(function() {
//         top.appendTo(element).stop().animate({top: leftOffset1}, 200).animate({width: 60, left: -30}, 200);
//         bottom.appendTo(element).stop().animate({top: rightOffset1}, 200).animate({width: 60, left: -30}, 200);
//     }, 200);
//
// }
//
// function clickMenu(obj, data) {
//     if (!obj.tile) return;
//     if (obj.dicemenu && obj.dicemenu.contentWindow.showFace) {
//         obj.dicemenu.contentWindow.showFace(data, function() {
//             obj.tile.open(data);
//         })
//     } else {
//         obj.tile.open(data);
//     }
// }

export default GoogleTileOverlayPopup