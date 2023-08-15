"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
//import * as LIB from './LibraryElements';
var Renderer = /** @class */ (function () {
    function Renderer() {
        var _this = this;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('app')
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        var axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
        this.camera.position.set(1, 1, 5);
        this.renderer.render(this.scene, this.camera);
        // Apply a resize event Cause let's be honest. Otherwise it would make me look sloppy. 
        window.addEventListener('resize', function () {
            _this.camera.aspect = window.innerWidth / window.innerHeight;
            _this.camera.updateProjectionMatrix();
            _this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        function CreateMenuText(text) {
            var canvas = document.createElement('canvas');
            var MenuItem = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 100;
            MenuItem.fillStyle = 'white';
            MenuItem.fillRect(0, 0, canvas.width, canvas.height);
            MenuItem.font = '50px Arial';
            MenuItem.fillStyle = 'black';
            MenuItem.textAlign = 'center';
            MenuItem.textBaseline = 'middle';
            MenuItem.fillText(text, canvas.width / 2, canvas.height / 2);
            var texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        }
        function CreateMenuItem(text, position) {
            var geometry = new THREE.PlaneGeometry(1, 1);
            var material = new THREE.MeshBasicMaterial({
                map: CreateMenuText(text),
                side: THREE.DoubleSide
            });
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(position);
            return mesh;
        }
        var MenuItemOne = CreateMenuItem('MenuItem', new THREE.Vector3(0, 0, 5));
        this.scene.add(MenuItemOne);
    }
    return Renderer;
}());
var R = new Renderer();
