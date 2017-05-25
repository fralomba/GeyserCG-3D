$(function() {
    orbitControls = new THREE.OrbitControls(camera);

    var uniforms = [];
    var reset = false;


    var explosions = 0;
    var numExp;

    var guiControls = new function () {         // creo dei nuovi controlli
        this.exp = 25;
    };

    var datGui = new dat.GUI();//associo i controlli creati sopra a un oggetto dat.GUI

    datGui.add(guiControls, 'exp', 10, 100);

    function render() {

        renderer.render(scene, camera);
        requestAnimationFrame(render);
        water.material.uniforms.time.value += 1.0 / 60.0;
        water.render();

        if(keyboard[32]){

        	numExp = Math.round(guiControls.exp);

            if(explosions == numExp){

                for(var i=0; i<uniforms.length; i++){
                    ground.remove(uniforms[i]);
                }
                explosions = 0;
                numExp = Math.round(guiControls.exp);


            }

            if(!reset){
                var n = (geyserRadius-50)*1.5 + 10;
                var sigma = (geyserRadius-50)*12.5 + 500;
                console.log(n + " " + sigma);
                uniforms[explosions] = create_particles(n, sigma);
                uniforms[explosions].geometry.attributes.position.needsUpdate = true;
                explosions++;
            }

            if(explosions == numExp){
                keyboard[32] = false;
            }
        }

        for(var i=0; i<uniforms.length; i++){
            uniforms[i].material.uniforms.t.value += 0.4;
        }
    }

    render();
});
