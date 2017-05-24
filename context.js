var keyboard = {};

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 10000);
var renderer = new THREE.WebGLRenderer({antialias: true});
//renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 1500;

document.body.appendChild( renderer.domElement );

/*var pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(-50,25,25)
scene.add(pointLight);
var sphereSize = 50;
var pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );*/


//LIGHTS

//Ambient White Light 
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

//Sun Spot Light
var spotLight = new THREE.SpotLight(0xffffff, 2, 1000, 0.8, 0.5, 1);
spotLight.position.set(-450,130,130);
scene.add(spotLight);
//Light Helper
var spotLightHelper = new THREE.SpotLightHelper( spotLight );
//scene.add( spotLightHelper );

//Meshes

//Loading World Textures
var worldTexture = [
	THREE.ImageUtils.loadTexture( 'texture/cube_map/skybox/nx.jpg' ),
	THREE.ImageUtils.loadTexture( 'texture/cube_map/skybox/nz.jpg' ),
	THREE.ImageUtils.loadTexture( 'texture/cube_map/skybox/ny.jpg' ),
	THREE.ImageUtils.loadTexture( 'texture/cube_map/skybox/py.jpg' ),
	THREE.ImageUtils.loadTexture( 'texture/cube_map/skybox/pz.jpg' ),
	THREE.ImageUtils.loadTexture( 'texture/cube_map/skybox/px.jpg' )
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
	    side: THREE.BackSide,
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
var worldGeometry = new THREE.BoxGeometry(500, 500, 500, 3, 3, 3);
var world = new THREE.Mesh(worldGeometry, new THREE.MeshFaceMaterial(worldMaterials));

//Ground Geometry
var groundGeometry = new THREE.BoxGeometry(500, 30, 500);
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
ground.position.set(0,-235,0);

//WATER!!!!!

waterNormals = new THREE.TextureLoader().load( 'texture/water/water_normals.jpg' );
waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

water = new THREE.Water( renderer, camera, scene, {
	textureWidth: 1024,
	textureHeight: 1024,
	waterNormals: waterNormals,
	alpha: 	1,
	sunDirection: spotLight.position.clone().normalize(),
	sunColor: 0xffffff,
	waterColor: 0x3399ff,
	distortionScale: 0
} );

//Geyser Geometry
var geyserGeometry = new THREE.CircleGeometry(52, 50);//parametro
/*var geyserMaterial = new THREE.MeshStandardMaterial({
	color: 0x3399ff
});
var geyser = new THREE.Mesh(geyserGeometry, geyserMaterial);
*/
var geyser = new THREE.Mesh(geyserGeometry, water.material);
geyser.rotation.x = -Math.PI/2;
geyser.position.y = 15.1;
geyser.add(water);

ground.add(geyser);
scene.add(ground);
scene.add(world);

document.onkeydown = function(ev){

	keyboard[ev.keyCode] = true;
};

