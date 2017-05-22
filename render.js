orbitControls = new THREE.OrbitControls(camera);

function render() {		
	renderer.render(scene, camera);
    requestAnimationFrame(render);
    water.material.uniforms.time.value += 1.0 / 60.0;
    water.render();

    if(sphere.position.y < 500){
        sphere.position.x += 0.8*Math.cos(Math.PI*0.3);
        sphere.position.y += 0.7*Math.sin(Math.PI*0.3);
    }
    else{
        sphere.position.y = 0;
    }
}

render();