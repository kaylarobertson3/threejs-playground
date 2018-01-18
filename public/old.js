
// SCENE ==================
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(105, window.innerWidth / window.innerHeight, 0.1, 250);
camera.position.z = 70;

// resizes something on browser resize
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // append stuff to html

// LIGHTING ==================
var light = new THREE.AmbientLight( 0xFFFFFF );
scene.add( light );

// THE MESH ================== //
//all meshes need a geometry (sleketon) and a material (skin)

//earth
var geometry = new THREE.SphereGeometry( 10, 32, 32 );
var material = new THREE.MeshPhongMaterial();
material.map = new THREE.TextureLoader().load('assets/earthmap4k.jpg');
var earthMesh = new THREE.Mesh( geometry, material );
earthMesh.position.set(10,10,10);

//moon
var geometry2 = new THREE.SphereGeometry( 5, 15, 15);
var material2 = new THREE.MeshPhongMaterial();
material2.map = new THREE.TextureLoader().load('assets/moonmap4k.jpg');
var moonMesh = new THREE.Mesh( geometry2, material2 )
moonMesh.position.set(1,20,1);

//mars
var geometry3 = new THREE.SphereGeometry( 8, 60, 60);
var material3 = new THREE.MeshPhongMaterial();
material3.map = new THREE.TextureLoader().load('assets/marsmap1k.jpg');
var marsMesh = new THREE.Mesh( geometry3, material3 )
marsMesh.position.set(20,30,30);

scene.add( earthMesh );
scene.add( moonMesh );
scene.add( marsMesh );




// ORBIT CONTORLS ==================
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.enableZoom = false;


// RENDER ==================
var render = function() {
    requestAnimationFrame(render);
    earthMesh.rotation.x += 0.005;
    earthMesh.rotation.y += 0.005;
    moonMesh.rotation.x += 0.020;
    moonMesh.rotation.y += 0.020;
    marsMesh.rotation.x += 0.050;
    marsMesh.rotation.y += 0.050;
    renderer.render(scene, camera);
};
render();

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

earthMesh.rotation.x += controls.guiRotationX;
earthMesh.rotation.y += controls.guiRotationY;
