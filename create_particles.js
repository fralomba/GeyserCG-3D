function random_range(a,b){
	
	return (b-a)*Math.random() + a;
	
}

var texture_water_drop = THREE.ImageUtils.loadTexture('texture/gocce4.jpeg');

function create_particles(n, sigma){
	
	var A = 5;
	var vertices = new Float32Array(n*100*3);
	var movements = new Float32Array(n*100*3);
	var particleGeometry = new THREE.BufferGeometry();
	
	for(var i=0; i<n; i++){
		
		var z = (A/n)*(n-i);
		
		//External radius
		var R = Math.sqrt(-2*(sigma^2)*Math.log(z/A));
		
		//Internal Radius
		if(i==0){
			r = 0;
		}else{
			var zp = (A/n)*(n-i+1);
			var r = Math.sqrt(-2*(sigma^2)*Math.log(zp/A));
		}
		
		//Create particles
		for(var j=0; j<100; j++){
			var theta = random_range(0,2*Math.PI);
            rp = random_range(r,R);

            x = rp*Math.cos(theta);
            z = rp*Math.sin(theta);
             
            vertices[i*300 + j*3] = x;
            vertices[i*300 + j*3 + 1] = 0;
            vertices[i*300 + j*3 + 2] = z;
            
            movements[i*300 + j*3] = random_range(2,7);
            movements[i*300 + j*3 + 1] = theta;
            movements[i*300 + j*3 + 2] = random_range(25,75);
			
		}	
	}
	
	
	particleGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
	particleGeometry.addAttribute('movements', new THREE.BufferAttribute(movements, 3));
	
	
	var uniforms = {
		t: {value: 0.0},
		texture_sampler: {type: 't', value: texture_water_drop},
	};
	
	particleMaterial = new THREE.ShaderMaterial({  
		uniforms: uniforms,
		vertexShader: document.getElementById('vertex_particles').textContent,
		fragmentShader: document.getElementById('fragment_particles').textContent,
		blending: THREE.AdditiveBlending,
		transparent: true,
	}); 
	var particlePoints = new THREE.Points( particleGeometry, particleMaterial );
	ground.add(particlePoints);
	
	return particlePoints;
	
}
 
//1px del raggio equivale a +0.5 n e +12.5 sigma (50 = 10 e 500)

//var uniforms = create_particles(11, 525);





