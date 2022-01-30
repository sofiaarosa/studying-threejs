import * as THREE from 'three';
import * as dat from 'dat.gui'

// Debug
// const gui = new dat.GUI()

const scene1 = new THREE.Scene();

const headerHTML = document.getElementById("header");

const camera1 = new THREE.PerspectiveCamera( 75, (headerHTML.clientWidth/2) / headerHTML.clientHeight, 0.1, 1000 );
const renderer1 = new THREE.WebGLRenderer({
    canvas:document.querySelector('#one'),
    alpha:true
});

renderer1.setSize(headerHTML.clientWidth/2 , headerHTML.clientHeight);

camera1.position.z = 3;

const geometry = new THREE.BoxGeometry( 1.75,1.75,1.75 );
const texture = new THREE.TextureLoader().load('rubiks.jpg');
const material = new THREE.MeshBasicMaterial( {map: texture} );
const cube = new THREE.Mesh( geometry, material );
scene1.add( cube );

cube.rotation.y = 70;
// cube.rotation.z = -30;

function animate() {
	requestAnimationFrame( animate );
    // cube.position.copy(camera.position);
	renderer1.render( scene1, camera1 );
}

animate();

function hover(i){
  let tx = new THREE.TextureLoader().load('rubiks'+i+'.jpg');
  const m = new THREE.MeshBasicMaterial( {map: tx} );
  let rotY = 0, rotX = 0;

  switch (i) {
    case 1:
      rotY = 170;
      break;
    case 2:
      rotX = -170;
      break;
    case 3:
      rotX = 170;
      break;
    case 4:
      rotY = -170;
      break;
    default:
      break;
  } //switch

  cube.material = m;
  cube.rotation.y = rotY;
  cube.rotation.x = rotX;
}

function off(){
  let tx = new THREE.TextureLoader().load('rubiks.jpg');
  const m = new THREE.MeshBasicMaterial( {map: tx} );
  cube.rotation.y = 70;
  cube.rotation.x = 0;
  cube.material = m;
}

let links = document.getElementsByClassName("content-link");
links[0].addEventListener("mouseover", ()=>{
  hover(1);
});
links[0].addEventListener("mouseout", ()=>{
  off();
});

links[1].addEventListener("mouseover", ()=>{
  hover(2);
});
links[1].addEventListener("mouseout", ()=>{
  off();
});

links[2].addEventListener("mouseover", ()=>{
  hover(3);
});
links[2].addEventListener("mouseout", ()=>{
  off();
});

links[3].addEventListener("mouseover", ()=>{
  hover(4);
});
links[3].addEventListener("mouseout", ()=>{
  off();
});

