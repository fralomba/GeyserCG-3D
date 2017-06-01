$(function() {
    orbitControls = new THREE.OrbitControls(camera);
	
	var begin_time = Date.now();
	
    var water_drops = [];
    var steam_drops = [];
    var reset = false;

    var explosions = 0;
    var numExp = 60;
    var time_steam_drop = 2.5;

    var guiControls = new function () { // creo dei nuovi controlli
        this.Explosion = 60;
        this.Radius = 50;
        this.Water_to_Steam = 70;
        this.DropDimension = 8.0;
        this.WaterOpacity = 1.0;
        this.Y_PowerWater = 1000;
        this.SteamDimension = 8.0
        this.SteamOpacity = 0.5;
        this.Y_PowerSteam = 300; 
        this.Time_Steam = 2.5;
    };

    var datGui = new dat.GUI({width: 350});//associo i controlli creati sopra a un oggetto dat.GUI

    var generalFolder = datGui.addFolder('Generals');
    var waterFolder = datGui.addFolder('Waterdrops');
    var steamFolder = datGui.addFolder('Steamdrops');

    generalFolder.add(guiControls, 'Explosion', 20, 100).onFinishChange(function(){
	    numExp = Math.round(guiControls.Explosion);
	    explosions = numExp;
	    keyboard[32] = false;
    });

    generalFolder.add(guiControls,'Radius', 50, 100).onFinishChange(function () {
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
    
    generalFolder.add(guiControls, 'Water_to_Steam', 50, 100).onFinishChange(function(){
	    jMax_water = Math.round(guiControls.Water_to_Steam);
    });

    waterFolder.add(guiControls, 'DropDimension', 3, 20).onFinishChange(function(){
        waterDropDim = guiControls.DropDimension;
    });

    waterFolder.add(guiControls, 'WaterOpacity', 0, 1).onFinishChange(function(){
        waterOpacity = guiControls.WaterOpacity;
    });
    
    waterFolder.add(guiControls, 'Y_PowerWater', 700, 1500).onFinishChange(function(){
        v0y_water = guiControls.Y_PowerWater;
    });

    steamFolder.add(guiControls, 'SteamDimension', 3, 20).onFinishChange(function(){
        steamDropDim = guiControls.SteamDimension;
    });

    steamFolder.add(guiControls, 'SteamOpacity', 0, 1.0).onFinishChange(function(){
        steamOpacity = guiControls.SteamOpacity;
    });
    
    steamFolder.add(guiControls, 'Y_PowerSteam', 200, 500).onFinishChange(function(){
        v0y_steam = guiControls.Y_PowerSteam;
    });
    
    steamFolder.add(guiControls, 'Time_Steam', 1, 5).onFinishChange(function(){
        time_steam_drop = guiControls.Time_Steam;
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
                }
                for(var i=0; i<steam_drops.length; i++){
                    ground.remove(steam_drops[i]);
                }
                explosions = 0;
            }

            if(!reset){
                var n = (geyserRadius-50)*1.5 + 10;
                var sigma = (geyserRadius-50)*12.5 + 500;
				
				var particles = create_particles_water(n, sigma);
				
                water_drops[explosions] = particles[0];
                steam_drops[explosions] = particles[1];
                
                explosions++;
            }

            if(explosions >= numExp){
                keyboard[32] = false;
            }
        }
        
        for(var i=0; i<water_drops.length; i++){
	        
	        if(water_drops[i].material.uniforms.t.value > 3){
		        
		        ground.remove(water_drops[i]);
		        
		        water_drops.splice(i, 1);
		       
	        } else {
		        
				//water_drops[i].material.uniforms.t.value += 0.4;
		    	water_drops[i].material.uniforms.t.value += 1.0/60.0;
		    	 
	        }
            
        }
        
        for(var i=0; i<steam_drops.length; i++){
	        
	        if(steam_drops[i].material.uniforms.t.value > time_steam_drop){
		        
		        ground.remove(steam_drops[i]);
		        steam_drops.splice(i, 1);
		        
	        }else{
		        
		        //steam_drops[i].material.uniforms.t.value += 0.4;    
		        steam_drops[i].material.uniforms.t.value += 1.0/60.0;    
		        
	        }
        }
        
    }

    render();
});
