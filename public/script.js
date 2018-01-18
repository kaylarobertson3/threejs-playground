// SCENE ==================
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 250);
camera.position.z = 80;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // append stuff to html

// RESIZE something on browser resize
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

// LIGHTING ==================
var light = new THREE.AmbientLight( 0xFFFFFF );
scene.add( light );

//earth
var geometry = new THREE.SphereGeometry( 10, 32, 32 );
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load('assets/earthmap4k.jpg');
var earthMesh = new THREE.Mesh( geometry, material );
scene.add( earthMesh );


//moon
var geometry2 = new THREE.SphereGeometry(5, 15, 15);
var material2 = new THREE.MeshPhongMaterial();
material2.map = new THREE.TextureLoader().load('assets/moonmap4k.jpg');
var moonMesh = new THREE.Mesh( geometry2, material2 )
scene.add( moonMesh );
moonMesh.position.set(1,20,1);

//mars
var geometry3 = new THREE.SphereGeometry(8, 14,14);
var material3 = new THREE.MeshPhongMaterial();
material3.map = new THREE.TextureLoader().load('assets/marsmap1k.jpg');
var marsMesh = new THREE.Mesh( geometry3, material3 )
scene.add( marsMesh );

marsMesh.position.set(20,1,1);


var pivot = new THREE.SphereGeometry( 0.001, 1, 1)
var pivotSkin = new THREE.MeshPhongMaterial()
var pivotMesh = new THREE.Mesh( pivot, pivotSkin);

let textMesh;
var loader = new THREE.FontLoader();
loader.load( '/assets/helvetiker_bold.typeface.json', function ( font ) {
	var textGeometry = new THREE.TextGeometry( `HELLO, WORLD`, {
		font: font,
		size: 5,
		height: 3
	});
    var textMaterial = new THREE.MeshPhongMaterial();
    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(5, 10, 4);
    pivotMesh.add(textMesh);
});

scene.add( pivotMesh );

// ORBIT CONTORLS ==================
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;

// ADD A SKYBOX =============
var imagePrefix = "assets/";
var urls = [ 'bg6.jpg', 'bg6.jpg', 'bg6.jpg', 'bg6.jpg', 'bg6.jpg', 'bg6.jpg' ];
var skyBox = new THREE.CubeTextureLoader().setPath(imagePrefix).load(urls);
scene.background = skyBox;

// DAT.GUI ================
var controls = new function() {
    this.textColor = 0xffae23;
    this.guiRotationX = 0.005;
    this.guiRotationY = 0.005;
};

var gui = new dat.GUI();
gui.add(controls, 'guiRotationX', 0, .2);
gui.add(controls, 'guiRotationY', 0, .2);

gui.addColor(controls, 'textColor').onChange(function (e) {
    textMesh.material.color = new THREE.Color(e);
})

var render = function() {
    requestAnimationFrame(render)
    earthMesh.rotation.x += controls.guiRotationX
    earthMesh.rotation.y += controls.guiRotationY
    marsMesh.rotation.x += controls.guiRotationX
    marsMesh.rotation.y += controls.guiRotationY
    moonMesh.rotation.x += controls.guiRotationX
    moonMesh.rotation.y += controls.guiRotationY
    // pivotMesh.rotation.x -= 0.00001
    // pivotMesh.rotation.y += 0.01
    renderer.render(scene, camera)
}

render()
