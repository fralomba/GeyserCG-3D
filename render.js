$(function() {
    orbitControls = new THREE.OrbitControls(camera);

    var water_drops = [];
    var steam_drops = [];
    var reset = false;


    var explosions = 0;
    var numExp = 25;

    var guiControls = new function () { // creo dei nuovi controlli
        this.Explosion = 25;
        this.Radius = 50;
        this.Drop_Dimension = 8;
        this.Opacity = 1.0;
    };

    var datGui = new dat.GUI();//associo i controlli creati sopra a un oggetto dat.GUI

    datGui.add(guiControls, 'Explosion', 20, 100).onFinishChange(function(){
	    numExp = Math.round(guiControls.Explosion);
	    explosions = numExp;
	    keyboard[32] = false;
    });

    datGui.add(guiControls,'Radius', 50, 200).onFinishChange(function () {
        ground.remove(geyser);
        ground.remove(circleBlue);
        geyserRadius = Math.round(guiControls.Radius);

        geyserGeometry = new THREE.CircleGeometry(geyserRadius, 50);
        geyser = new THREE.Mesh(geyserGeometry, water.material);

        circleBlue = new THREE.Mesh(geyserGeometry, circleMaterial);

        geyser.rotation.x = -Math.PI/2;
        geyser.position.y = 15.2;

        circleBlue.rotation.x = -Math.PI/2;
        circleBlue.position.y = 15.1;

        geyser.add(water);
        ground.add(geyser);
        ground.add(circleBlue);
    });

    datGui.add(guiControls, 'Drop_Dimension', 3, 20).onFinishChange(function(){
        dropDim = guiControls.DropDimension;
    });
    
    datGui.add(guiControls, 'Opacity', 0, 1).onFinishChange(function(){
        opacity = guiControls.Opacity;
    });

    function render() {

        renderer.render(scene, camera);
        requestAnimationFrame(render);
        water.material.uniforms.time.value += 1.0 / 60.0;
        water.render();        
		
        if(keyboard[32]){

            if(explosions >= numExp){

                for(var i=0; i<water_drops.length; i++){
                    ground.remove(water_drops[i]);
                    ground.remove(steam_drops[i]);
                }
                explosions = 0;
            }

            if(!reset){
                var n = (geyserRadius-50)*1.5 + 10;
                var sigma = (geyserRadius-50)*12.5 + 500;

                water_drops[explosions] = create_particles_water(n, sigma);
                steam_drops[explosions] = create_particles_steam(n, sigma);
                
                explosions++;
            }

            if(explosions >= numExp){
                keyboard[32] = false;
            }
        }
        
        for(var i=0; i<water_drops.length; i++){
	        
	        if(water_drops[i].material.uniforms.t.value > 50){
		        
		        ground.remove(water_drops[i]);
		        
		        water_drops.splice(i, 1);
		       
	        } else {
		        console.log('gpu');
		    	water_drops[i].material.uniforms.t.value += 0.4;
		    	 
	        }
            
        }
        
        for(var i=0; i<steam_drops.length; i++){
	        
	        if(steam_drops[i].material.uniforms.t.value > 60 ){
		        
		        ground.remove(steam_drops[i]);
		        steam_drops.splice(i, 1);
		        
	        }else{
		        
		        steam_drops[i].material.uniforms.t.value += 0.4;    
		        
	        }
        }
        
    }

    render();
});
