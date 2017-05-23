orbitControls = new THREE.OrbitControls(camera);
var t = 0;
x0 = particlesField.position.x;
y0 = particlesField.position.y;
var vx = 5;
var vy = 5;
var sec = 0;

function render() {	
		
	renderer.render(scene, camera);
    requestAnimationFrame(render);
    water.material.uniforms.time.value += 1.0 / 60.0;
    water.render();
	
	
	if(keyboard[32]){
		
		t++
		particlesField.position.x = vx*t;
		particlesField.position.y = vy*t-(0.5*(t*t)); 
		
		
		
		/*if(particlesField.position.y < 500){
			particlesField.position.y += 30;
		}else{
			console.log('yeha');
			ground.remove(particlesField);
			keyboard[32] = false;
			create_particles(11, 525);
			var particlesMaterial = new THREE.PointsMaterial( { color: 0xffffff, size:5 } );
			
			var particlesFieldNew = new THREE.Points( particlesGeometry, particlesMaterial );
			
			particlesField = particlesFieldNew;
			
			ground.add(particlesField);
		}*/
	}   
}

render();