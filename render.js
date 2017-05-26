$(function() {
    orbitControls = new THREE.OrbitControls(camera);

    var uniforms = [];
    var reset = false;


    var explosions = 0;
    var numExp = 25;

    var guiControls = new function () { // creo dei nuovi controlli
        this.exp = 25;
        this.geyserRad = 50;
    };

    var datGui = new dat.GUI();//associo i controlli creati sopra a un oggetto dat.GUI

    datGui.add(guiControls, 'exp', 20, 100).onFinishChange(function(){
	    numExp = Math.round(guiControls.exp);
	    explosions = numExp;
	    keyboard[32] = false;
    });

    datGui.add(guiControls,'geyserRad', 50, 200).onFinishChange(function () {
        ground.remove(geyser);
        ground.remove(circleBlue);
        geyserRadius = Math.round(guiControls.geyserRad);

        geyserGeometry = new THREE.CircleGeometry(geyserRadius, 50);
        geyser = new THREE.Mesh(geyserGeometry, water.material);

        circleBlue = new THREE.Mesh(geyserGeometry, circleMaterial);

        geyser.rotation.x = -Math.PI/2;
        geyser.position.y = 15.2;
        geyser.add(water);
        ground.add(geyser);
    });

    function render() {

        renderer.render(scene, camera);
        requestAnimationFrame(render);
        water.material.uniforms.time.value += 1.0 / 60.0;
        water.render();
		
        if(keyboard[32]){

            if(explosions >= numExp){

                for(var i=0; i<uniforms.length; i++){
                    ground.remove(uniforms[i]);
                }
                explosions = 0;
            }

            if(!reset){
                var n = (geyserRadius-50)*1.5 + 10;
                var sigma = (geyserRadius-50)*12.5 + 500;

                uniforms[explosions] = create_particles(n, sigma);
                uniforms[explosions].geometry.attributes.position.needsUpdate = true;

                explosions++;
            }

            if(explosions >= numExp){
                keyboard[32] = false;
            }
        }

        for(var i=0; i<uniforms.length; i++){
            uniforms[i].material.uniforms.t.value += 0.4;
        }
    }

    render();
});
