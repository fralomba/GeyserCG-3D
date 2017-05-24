orbitControls = new THREE.OrbitControls(camera); 

var uniforms = [];
var reset = false;

var explosions = 0;

function render() {	
		
	renderer.render(scene, camera);
    requestAnimationFrame(render);
    water.material.uniforms.time.value += 1.0 / 60.0;
    water.render();
	
	if(keyboard[32]){
		
		
		
		if(explosions == 25){
			for(var i=0; i<uniforms.length; i++){
			
				ground.remove(uniforms[i]);
						
			}
			explosions = 0;
		}
		
		
		if(!reset){
			uniforms[explosions] = create_particles(11, 525);
			explosions++;
			console.log('yeah');
		}
		
		if(explosions == 25){
			
			keyboard[32] = false;
		}
		
	}  
	
	for(var i=0; i<uniforms.length; i++){
		
		uniforms[i].material.uniforms.t.value += 0.4;
		
	}
	
	
}

render();