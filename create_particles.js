function random_range(a,b){
	
	return (b-a)*Math.random() + a;
	
}

var particlesGeometry = new THREE.Geometry();

function create_particles(n, sigma){
	
	var A = 5;
	
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
            
            var particle = new THREE.Vector3();
            
			particle.x = x;
			particle.z = z;
			particle.y = 30;
		
			particlesGeometry.vertices.push( particle )
			
		}	
	}
}

//1px del raggio equivale a +0.5 n e +12.5 sigma

create_particles(11, 525);

var particlesMaterial = new THREE.PointsMaterial( { color: 0xffffff, size:5 } );

var particlesField = new THREE.Points( particlesGeometry, particlesMaterial );

ground.add(particlesField);


