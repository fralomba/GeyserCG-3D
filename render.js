orbitControls = new THREE.OrbitControls(camera);

function render() {		
	renderer.render(scene, camera);
    requestAnimationFrame(render);
    water.material.uniforms.time.value += 1.0 / 60.0;
    water.render();
    
}

render();