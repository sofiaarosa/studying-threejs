import * as THREE from 'three';
import * as dat from 'dat.gui'

// Debug
// const gui = new dat.GUI()

const scene1 = new THREE.Scene();

const canvasContainerHTML = document.getElementById("canvas-container")

const camera1 = new THREE.PerspectiveCamera( 75, canvasContainerHTML.clientWidth / canvasContainerHTML.clientHeight, 0.1, 1000 );
const renderer1 = new THREE.WebGLRenderer({
    canvas:document.querySelector('#bg'),
    // alpha:true
});

renderer1.setSize(canvasContainerHTML.clientWidth , canvasContainerHTML.clientHeight);

camera1.position.z = 3;

const textureLoader = new THREE.TextureLoader();

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshLambertMaterial({color:'gray'});
const cube = new THREE.Mesh(geometry, material);

cube.position.z = 0;
scene1.add(cube);

// Lights

const sphere = new THREE.SphereGeometry( 0.05, 16, 8 );

const lightR = new THREE.PointLight(0xFF0000, 1, 50)
lightR.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFF0000 } ) ) );
lightR.position.x = -1
lightR.position.y = 0
lightR.position.z = 1
scene1.add(lightR)

const lightG = new THREE.PointLight(0x00FF00, 1, 50)
lightG.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x00FF00 } ) ) );
lightG.position.x = 1
lightG.position.y = 0
lightG.position.z = 1
scene1.add(lightG)

const lightB = new THREE.PointLight(0x0000FF, 1, 50)
lightB.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0000FF } ) ) );
lightB.position.x = 0
lightB.position.y = -1
lightB.position.z = 1
scene1.add(lightB)

//////////////////////////////////////// HTML Events Listener

const form = document.getElementById("lights-form")
form.intensityR.onchange = ()=>{
    intensityChange(0, form.intensityR.value)
}
form.intensityG.onchange = ()=>{
    intensityChange(1, form.intensityG.value)
}
form.intensityB.onchange = ()=>{
    intensityChange(2, form.intensityB.value)
}
form.positionXR.onchange = ()=>{
    posXChange(0,form.positionXR.value);
}
form.positionXG.onchange = ()=>{
    posXChange(1,form.positionXG.value);
}
form.positionXB.onchange = ()=>{
    posXChange(2,form.positionXB.value);
}
form.positionYR.onchange = ()=>{
    posYChange(0,form.positionYR.value);
}
form.positionYG.onchange = ()=>{
    posYChange(1,form.positionYG.value);
}
form.positionYB.onchange = ()=>{
    posYChange(2,form.positionYB.value);
}


const lights = [lightR, lightG, lightB]

function intensityChange(light, intensity){
    lights[light].intensity = intensity;
}
function posXChange(light, position){
    lights[light].position.x = position;
}
function posYChange(light, position){
    lights[light].position.y = position;
}


function animate() {
	requestAnimationFrame( animate );

	renderer1.render( scene1, camera1 );
}

animate();


