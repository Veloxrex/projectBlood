import $ from 'jquery';
import {PureComponent} from 'react';

var THREE = require('three');
var cube = new THREE.Group();
window.cube = cube;

class Menu extends PureComponent {
    componentDidMount()
    {
        function reserveTexture(mesh, imagePath, specularImagePath) {
            var waitImage = !!imagePath;
            var waitSpecularImage = !!specularImagePath;

            var imageTexture = null;
            var specularImageTexture = null;

            mesh.material = new THREE.MeshPhongMaterial( { color: '#999999', wireframe: false } );

            if (waitImage) {
                $('<img>').on('load', function(evt) {
                    imageTexture = new THREE.Texture(evt.target);
                    imageTexture.needsUpdate = true;
                    waitImage = false;
                    tryAssign();
                }).attr('src', imagePath); //.appendTo('#offscreenLayer');
            }

            if (waitSpecularImage) {
                $('<img>').on('load', function(evt) {
                    specularImageTexture = new THREE.Texture(evt.target);
                    specularImageTexture.needsUpdate = true;
                    waitSpecularImage = false;
                    tryAssign();
                }).attr('src', specularImagePath); //.appendTo('#offscreenLayer');
            }

            function tryAssign() {
                if (waitImage || waitSpecularImage) return;

                mesh.material = new THREE.MeshPhongMaterial( {
                    map: imageTexture,
                    specularMap: specularImageTexture,
                    side: THREE.FrontSide,
                    flatShading: true,
                    wireframe: false
                });
            }
        }
        var camera, scene, renderer;//, mesh, material;
        var motionValues = {};
        var rotationValues = {};
        var scaleValue = {};

        init();
        animate();

        function init() {
            // Renderer.
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor( 0x000000, 0 );
            renderer.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
            // Add renderer to page
            document.body.appendChild(renderer.domElement);
            document.getElementById("root").style.display = 'none';
            document.body.style.background = 'none';

            // Create camera.
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 400;

            // Create scene.
            scene = new THREE.Scene();

            // Create cube and add to scene.
            var geometry = new THREE.PlaneGeometry(100, 100, 1, 1);

            // Front
            var mesh1 = new THREE.Mesh(geometry);
            mesh1.translateZ(50);
            mesh1.rotateY(0);
            cube.add(mesh1);
            reserveTexture(mesh1, process.env.PUBLIC_URL + '/images/menu-bloodland.png');

            // Right
            var mesh2 = new THREE.Mesh(geometry);
            mesh2.translateX(50);
            mesh2.rotateY(Math.PI / 2);
            cube.add(mesh2);
            reserveTexture(mesh2, process.env.PUBLIC_URL + '/images/menu-game.png');

            // Left
            var mesh3 = new THREE.Mesh(geometry);
            mesh3.translateX(-50);
            mesh3.rotateY(-Math.PI / 2);
            cube.add(mesh3);
            reserveTexture(mesh3, process.env.PUBLIC_URL + '/images/menu-transaction.png');

            // Top
            var mesh4 = new THREE.Mesh(geometry);
            mesh4.translateY(50);
            mesh4.rotateX(-Math.PI / 2);
            cube.add(mesh4);
            reserveTexture(mesh4, process.env.PUBLIC_URL + '/images/menu-video.png');

            // Bottom
            var mesh5 = new THREE.Mesh(geometry);
            mesh5.translateY(-50);
            mesh5.rotateX(Math.PI / 2);
            cube.add(mesh5);
            reserveTexture(mesh5, process.env.PUBLIC_URL + '/images/menu-ads.png');

            // Back
            var mesh6 = new THREE.Mesh(geometry);
            mesh6.translateZ(-50);
            mesh6.rotateY(-Math.PI);
            cube.add(mesh6);
            reserveTexture(mesh6, process.env.PUBLIC_URL + '/images/menu-blochat.png');

            var group = new THREE.Group();
            group.add(cube);
            window.group = group;

            var group2 = new THREE.Group();
            group2.rotation.y = 13.5 / 180 * Math.PI;
            group2.rotation.x = 13.5 / 180 * Math.PI;
            group2.add(group);

            scene.add(group2);

            // Create ambient light and add to scene.
            var light = new THREE.AmbientLight(0x404040); // soft white light
            scene.add(light);

            // Create directional light and add to scene.
            var directionalLight = new THREE.DirectionalLight(0xffffff);
            directionalLight.position.set(1, 1, 1).normalize();
            scene.add(directionalLight);

            var lights = [];
            lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
            lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
            lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

            lights[ 0 ].position.set( 0, 200, 0 );
            lights[ 1 ].position.set( 100, 200, 100 );
            lights[ 2 ].position.set( - 100, - 200, - 100 );

            scene.add( lights[ 0 ] );
            scene.add( lights[ 1 ] );
            scene.add( lights[ 2 ] );

            // Add listener for window resize.
            // window.addEventListener('resize', onWindowResize, false);

            // Add stats to page.
            // stats = new Stats();
            // document.body.appendChild(stats.dom);

            // var orbit = new THREE.OrbitControls( camera, renderer.domElement );
            // orbit.enableZoom = false;

            $(document).ready(function() {
                motionValues.py = -100 * Math.random();
                $(motionValues)
                    .animate({py: 100}, 300,null, 'easeOutQuad')
                    .animate({py: 0}, 200,null, 'easeInQuad')
                    .animate({py: 40}, 150,null, 'easeOutQuad')
                    .animate({py: 0,}, 140,null, 'easeInQuad')
                    .animate({py: 12}, 80,null, 'easeOutQuad')
                    .animate({py: 0}, 70,null, 'easeInQuad')
                    .animate({py: 3}, 40,null, 'easeOutQuad')
                    .animate({py: 0}, 30,null, 'easeInQuad');//.animate({py: 0}, 400, null, 'easeout');

                scaleValue.scale = 0.001;
                $(scaleValue).animate({scale: 1}, 500,null, 'easeOutQuad');

                // rotationValues.px = 200 * Math.random() - 100;
                rotationValues.pz = 200 * Math.random() - 100;
                rotationValues.ry = -Math.PI * 4 * (0.5 - Math.random());
                rotationValues.rz = -Math.PI * 2 * (0.5 - Math.random());
                rotationValues.rx = Math.PI * 2 * (0.5 - Math.random());
                $(rotationValues).animate({ry: 0, rz: 0, rx: 0, pz: 0}, 1100,null, 'easeOutQuad');
            });

            window.showFace = function(face, callback) {
                // 'video';// 'top';
                // 'ads';// 'bottom';
                // 'bloodland'; //'front';
                // 'transaction';// 'left';
                // 'blochat';// 'back';
                // 'game';// 'right';
                var targetRotationX = 0;
                var targetRotationY = 0;

                switch(face) {
                    case 'video':
                        targetRotationX = Math.PI / 2;
                        break;
                    case 'ads':
                        targetRotationX = -Math.PI / 2;
                        break;
                    case 'bloodland':
                        targetRotationX = 0;
                        targetRotationY = 0;
                        break;
                    case 'transaction':
                        targetRotationY = Math.PI / 2;
                        break;
                    case 'blochat':
                        targetRotationY = Math.PI;
                        break;
                    case 'game':
                        targetRotationY = -Math.PI / 2;
                        break;
                    default:
                        return;
                }

                $(group.rotation).stop().animate({
                    x: targetRotationX,
                    y: targetRotationY
                }, 200,null, 'easeOutQuad', function() {
                    callback && callback();
                });

            };

            initializeEvents({
                element: renderer.domElement,
                renderer: renderer,
                camera: camera,
                object: group
            }, {
                'onClick': function() {
                    setFaceFront();

                    //var eular360 = Math.PI * 2;
                    var eular90 = Math.PI / 2;
                    var levelX = Math.round(group.rotation.x / eular90);
                    var levelY = Math.round(group.rotation.y / eular90);

                    var face;
                    var sideIndex = (levelY % 4 + 4) % 4;
                    if (levelX === 1) face = 'video';// 'top';
                    else if (levelX === -1) face = 'ads';// 'bottom';
                    else if (sideIndex === 0) face = 'bloodland'; //'front';
                    else if (sideIndex === 1) face = 'transaction';// 'left';
                    else if (sideIndex === 2) face = 'blochat';// 'back';
                    else if (sideIndex === 3) face = 'game';// 'right';

                    if(window.parent && window.parent.onWidgetEvent) {
                        window.parent.onWidgetEvent('dicemenu', window.quadKey, face);
                    }
                },
                'onDragStart': function() {
                    $(group.rotation).stop();
                    $(scaleValue).stop().animate({scale: 0.9}, 200,null, 'easeOutQuad');
                },
                'onDragEnd': function() {
                    $(scaleValue).stop().animate({scale: 1}, 200,null, 'easeOutQuad');
                },
                'onScrollEnd': function() {

                }
            });

            function setFaceFront() {
                //var eular360 = Math.PI * 2;
                var eular90 = Math.PI / 2;
                var levelX = Math.round((group.rotation.x) / eular90);
                var levelY = Math.round((group.rotation.y) / eular90);

                var targetRotationX = levelX * eular90;
                var targetRotationY = levelY * eular90;

                if ((levelX + 2) % 2 === 1) {
                    levelY = Math.round(levelY / 4) * 4;
                }

                targetRotationX = levelX * eular90;
                targetRotationY = levelY * eular90;

                if (targetRotationX < -Math.PI / 2) targetRotationX = -Math.PI / 2;
                else if (targetRotationX > Math.PI / 2) targetRotationX = Math.PI / 2;

                $(group.rotation).stop().animate({
                    x: targetRotationX,
                    y: targetRotationY
                }, 200,null, 'easeOutQuad', function() {

                });
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            cube.scale.setScalar(scaleValue.scale);
            // cube.position.x = rotationValues.px;
            cube.position.y = motionValues.py;
            cube.position.z = rotationValues.pz;
            cube.rotation.y = rotationValues.ry;
            cube.rotation.z = rotationValues.rz;
            cube.rotation.x = rotationValues.rx;
            cube.matrixAutoUpdate = false;
            cube.updateMatrix();

            renderer.render(scene, camera);
        }

        // function onWindowResize() {
        //     camera.aspect = window.innerWidth / window.innerHeight;
        //     camera.updateProjectionMatrix();
        //     renderer.setSize(window.innerWidth, window.innerHeight);
        // }

        function initializeEvents(obj, options) {
            var dragging = false;
            var startX = 0;
            var startY = 0;
            var rx, ry;
            var sumX, sumY;

            var history = [];

            options = options || {};

            var onDown = function(e) {
                if (obj.element !== e.target) {
                    if (!~Array.prototype.indexOf.call(obj.element.childNodes, e.target)) {
                        return;
                    }
                }

                if (e.type === 'touchstart') {
                    e.preventDefault();//for Mobile
                }

                if (e.target !== obj.renderer.domElement) return;

                var pointer = e.targetTouches? e.targetTouches[0] : e;//for Mobile

                dragging = true;
                startX = pointer.pageX;
                startY = pointer.pageY;

                sumX = 0;
                sumY = 0;
                history = [];
                history.push({dx: 0, dy: 0, ms: +new Date()});

                options.onDragStart && options.onDragStart();
            };

            var onMove = function(e) {
                var pointer = e.targetTouches? e.targetTouches[0] : e;//for Mobile

                if (!dragging) {
                    var beginX = (window.innerWidth - 100) / 2;
                    var beginY = (window.innerHeight - 100) / 2;

                    if (pointer.pageX < beginX || pointer.pageX > beginX + 100
                        || pointer.pageY < beginY || pointer.pageY > beginY + 100) {
                        if(window.parent && window.parent.onWidgetEvent) {
                            window.parent.onWidgetEvent('dicemenu', window.quadKey, 'out');
                        }
                    }

                    return;
                }

                var pixelRatio = window.innerHeight / 12;

                if (options.inObject) {
                    rx = obj.object.rotation.x - (pointer.pageY - startY) / pixelRatio / 2;
                    ry = obj.object.rotation.y - (pointer.pageX - startX) / pixelRatio;
                } else {
                    rx = obj.object.rotation.x - (startY - pointer.pageY) / pixelRatio / 2;
                    ry = obj.object.rotation.y - (startX - pointer.pageX) / pixelRatio;
                }

                if (rx < -Math.PI / 2) rx = -Math.PI / 2;
                else if (rx > Math.PI / 2) rx = Math.PI / 2;

                history.push({dx: rx - obj.object.rotation.x, dy: ry -  obj.object.rotation.y, ms: +new Date()});

                obj.object.rotation.x = rx;
                obj.object.rotation.y = ry;

                sumX += pointer.pageY - startY;
                sumY += pointer.pageX - startX;

                startX = pointer.pageX;
                startY = pointer.pageY;
            };

            var onUp = function(e) {
                dragging = false;

                //var pixelRatio = window.innerHeight / 12;

                options.onDragEnd && options.onDragEnd();

                if (Math.abs(sumX) < 0.3 && Math.abs(sumY) < 0.5) {
                    options.onClick && options.onClick();
                    return;
                }

                while (history[0]) {
                    if (+new Date() - history[0].ms > 400) history.shift();
                    else break;
                }

                var sumDX = 0, sumDY = 0;
                if (history.length === 0) {
                    options.onScrollEnd && options.onScrollEnd();
                } else {
                    for (var i in history) {
                        sumDX += history[i].dx;
                        sumDY += history[i].dy;
                    }
                }

                //var eular360 = Math.PI * 2;
                var eular90 = Math.PI / 2;
                var levelX = Math.round((obj.object.rotation.x + sumDX) / eular90);
                var levelY = Math.round((obj.object.rotation.y + sumDY) / eular90);

                var targetRotationX = levelX * eular90;
                var targetRotationY = levelY * eular90;

                if ((levelX + 2) % 2 === 1) {
                    levelY = Math.round(levelY / 4) * 4;
                }

                targetRotationX = levelX * eular90;
                targetRotationY = levelY * eular90;


                if (targetRotationX < -Math.PI / 2) targetRotationX = -Math.PI / 2;
                else if (targetRotationX > Math.PI / 2) targetRotationX = Math.PI / 2;

                var duration = (Math.abs(obj.object.rotation.x - targetRotationX) + Math.abs(obj.object.rotation.y - sumDY)) * 100;

                $(obj.object.rotation).stop().animate({
                    x: targetRotationX,
                    y: targetRotationY
                }, duration,null, 'easeOutQuad', function() {
                    options.onScrollEnd && options.onScrollEnd();
                });

            };

            window.addEventListener('mousedown', onDown, false);
            window.addEventListener('mousemove', onMove, false);
            window.addEventListener('mouseup', onUp, false);
            obj.element.addEventListener('touchstart', onDown);
            obj.element.addEventListener('touchmove', onMove);
            obj.element.addEventListener('touchend', onUp);
            // window.addEventListener('wheel', function(e) {
            //     if (e.deltaY < 0) {
            //         obj.fov = Math.max(obj.fov - 1, 10);
            //     } else if (e.deltaY > 0) {
            //         obj.fov = Math.min(obj.fov + 1, 120);
            //     }
            //     obj.camera.fov = obj.fov;
            //     obj.camera.updateProjectionMatrix();
            // }, false);
            window.addEventListener('resize', function() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }, false);
        }
    }

    render() {
        return null;
    }
}

export default Menu;