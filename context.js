var keyboard = {};
var geyserRadius = 50;
var cubeSize = 600;
var groundSize = 30;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 10000);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 1500;
document.body.appendChild( renderer.domElement );

//LIGHTS

//Ambient White Light 
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//Sun Spot Light
var spotLight = new THREE.SpotLight(0xffffff, 2, 1500, 0.8, 0.5, 1.0);
spotLight.position.set(-600,130,130);
scene.add(spotLight);
//Light Helper
var spotLightHelper = new THREE.SpotLightHelper(spotLight);
//scene.add(spotLightHelper);

//Meshes

//Loading World Textures
var worldTexture = [
	new THREE.TextureLoader().load( 'texture/cube_map/skybox/nx.jpg' ),
	new THREE.TextureLoader().load( 'texture/cube_map/skybox/nz.jpg' ),
	new THREE.TextureLoader().load( 'texture/cube_map/skybox/ny.jpg' ),
	new THREE.TextureLoader().load( 'texture/cube_map/skybox/py.jpg' ),
	new THREE.TextureLoader().load( 'texture/cube_map/skybox/pz.jpg' ),
	new THREE.TextureLoader().load( 'texture/cube_map/skybox/px.jpg' )
];
//Define Materials for each Face
var worldMaterials = [
    new THREE.MeshBasicMaterial({
	    side: THREE.BackSide,
        map: worldTexture[0] }),
    new THREE.MeshBasicMaterial({
	    side: THREE.BackSide,
        map: worldTexture[1] }),
    new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        map: worldTexture[2] }),
    new THREE.MeshBasicMaterial({
	    side: THREE.BackSide,
		map: worldTexture[3] }),
    new THREE.MeshBasicMaterial({
	    side: THREE.BackSide,
        map: worldTexture[4] }),
    new THREE.MeshBasicMaterial( {
	    side: THREE.BackSide,
		map: worldTexture[5] })
];  
var worldGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, 3, 3, 3);
var world = new THREE.Mesh(worldGeometry, new THREE.MeshFaceMaterial(worldMaterials));

//Ground Geometry
var groundGeometry = new THREE.BoxGeometry(cubeSize, groundSize, cubeSize);
//Loading Ground Texture
var groundTexture = new THREE.TextureLoader().load( "texture/ground.jpg" );
var groundTextureNoRepeat = new THREE.TextureLoader().load( "texture/ground.jpg" );
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 2, 1 );
var groundMaterials = [
	new THREE.MeshBasicMaterial({
		map: groundTexture
	}),
	new THREE.MeshBasicMaterial({
		map: groundTexture
	}),
	new THREE.MeshPhongMaterial({
		map: groundTextureNoRepeat
	}),
	new THREE.MeshBasicMaterial({
		map: groundTextureNoRepeat
	}),
	new THREE.MeshBasicMaterial({
		map: groundTexture
	}),
	new THREE.MeshBasicMaterial({
		map: groundTexture
	})
];
var ground = new THREE.Mesh(groundGeometry, new THREE.MeshFaceMaterial(groundMaterials));
ground.position.set(0,-cubeSize/2+groundSize/2,0);

//WATER!!!!!

waterNormals = new THREE.TextureLoader().load( 'texture/water/water_normals.jpg' );
waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

water = new THREE.Water( renderer, camera, scene, {
	textureWidth: 1024,
	textureHeight: 1024,
	waterNormals: waterNormals,
	alpha: 	1.0,
	sunDirection: spotLight.position.clone().normalize(),
	sunColor: 0xffffff,
	waterColor: 0x3399ff,
	distortionScale: 0.0,
} );

//Geyser Geometry
var geyserGeometry = new THREE.CircleGeometry(geyserRadius, 50);//parametro
var geyser = new THREE.Mesh(geyserGeometry, water.material);
geyser.rotation.x = -Math.PI/2;
geyser.position.y = groundSize/2 + 0.2;
geyser.add(water);

//Water Bottom
var circleBlueGeometry = new THREE.CircleGeometry(geyserRadius, 50);
var circleMaterial = new THREE.MeshBasicMaterial({
	color:0x3399ff
});
var circleBlue = new THREE.Mesh(circleBlueGeometry, circleMaterial);
circleBlue.position.y = groundSize/2 + 0.1;
circleBlue.rotation.x = -Math.PI/2;
ground.add(circleBlue);

ground.add(geyser);
scene.add(ground);
scene.add(world);

document.onkeydown = function(ev){
	keyboard[ev.keyCode] = true;
};

//TEXT

var loader = new THREE.FontLoader();

var textMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
var font = loader.parse(fontJSON);
var textGeometry = new THREE.TextGeometry('Press Space to Explode!', {font: font, size: 50, height: 5, material: 0, bevelThickness: 1, extrudeMaterial: 1});
var textMesh = new THREE.Mesh( textGeometry, textMaterial );
textMesh.position.set(-cubeSize/2 - 80,+cubeSize/2 + 80,0);

scene.add(textMesh);

