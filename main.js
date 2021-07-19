import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xFFFFFF);
const ambientLight = new THREE.AmbientLight(0xFFFFFF);

pointLight.position.set(20,20,20);
scene.add(pointLight,ambientLight);

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry= new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xFFFFFF});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z]=Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(500).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('textures/space.jpg');
scene.background = spaceTexture;

//earth and moon

const moonTexture = new THREE.TextureLoader().load('textures/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('textures/normal.jpg');
const earthTexture = new THREE.TextureLoader().load('textures/earth.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.75,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture, 
    normalMap:normalTexture
  })
);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3,30,30),
  new THREE.MeshBasicMaterial({map:earthTexture})
)

scene.add(moon);
moon.position.setZ(2);
moon.position.setY(2);

scene.add(earth);
earth.position.setZ(3);
earth.position.setX(3);
earth.position.setY(-1);

var count = 0;

//scroll event

function moveCamera(){
  console.log("scroll");

  //get how far the user is from the top of the page
  const t = document.body.getBoundingClientRect().top;
  console.log(t);

  camera.position.z=t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t* -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);
  
  //moon and earth rotation
  moon.rotation.y+=0.005;
  earth.rotation.y+=0.01;

  /*moon revolution - x
  if(moon.position.x.valueOf()<20 && count<=400){moon.position.x+=0.05; count++;}
  else {moon.position.x-=0.05; count++}
  if(count>=800) count=0;

  //moon revolution - z
  if(count<=200 || count>600)moon.position.z-=0.08;
  if(count>200 && count <=600)moon.position.z+=0.08;*/

  // controls.update();

  renderer.render(scene,camera);
}  

animate();

