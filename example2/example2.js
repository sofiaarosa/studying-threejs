import * as THREE from 'three';


const scene1 = new THREE.Scene();

const mainHTML = document.getElementById("main");

const camera1 = new THREE.PerspectiveCamera( 75, mainHTML.clientWidth / mainHTML.clientHeight, 0.1, 1000 );
const renderer1 = new THREE.WebGLRenderer({
    canvas:document.querySelector('#bg'),
    alpha:true
});

renderer1.setSize(mainHTML.clientWidth , mainHTML.clientHeight);

camera1.position.z = 3;

const geometry = new THREE.SphereGeometry( 1.2,64,32 );
// const material = new THREE.MeshBasicMaterial( {color: 0x0C327D} );
const texture = new THREE.TextureLoader().load('earth.jpg');
const material = new THREE.MeshBasicMaterial({map:texture})
const earth = new THREE.Mesh( geometry, material );
scene1.add( earth );

// earth.rotation.y = 10;
earth.position.y = -0.5;

function animate() {
	requestAnimationFrame( animate );
	renderer1.render( scene1, camera1 );
}

var mouseX = 0, mouseY = 0;

function mouseMove(evt){
    var deltaX = evt.clientX - mouseX,
        deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    earth.rotation.y += deltaX / 100;
}

document.getElementById("bg").addEventListener("mousemove",function (e){
    mouseMove(e);
})

animate();


