orbitControls = new THREE.OrbitControls(camera);

function render() {		
	renderer.render(scene, camera);
    requestAnimationFrame(render);
    water.material.uniforms.time.value += 1.0 / 60.0;
    water.render();
	
	if(keyboard[32]){
		if(particlesField.position.y < 500){
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
		}
	}   
}

render();