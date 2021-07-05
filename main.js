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

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus = new THREE.Mesh(geometry,material);

//scene.add(torus);

const pointLight = new THREE.PointLight(0xFFFFFF);
const ambientLight = new THREE.AmbientLight(0xFFFFFF);

pointLight.position.set(20,20,20);
scene.add(pointLight,ambientLight);

const lightHelp = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);

//scene.add(lightHelp,gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

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

//avatar

const moonTexture = new THREE.TextureLoader().load('textures/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('textures/normal.jpg');
const earthTexture = new THREE.TextureLoader().load('textures/earth.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture, 
    normalMap:normalTexture
  })
);

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5,50,50),
  new THREE.MeshBasicMaterial({map:earthTexture})
)

earth.position.x+=10;
earth.position.y-=5;

scene.add(moon,earth);

function animate(){
  requestAnimationFrame(animate);
  
  moon.rotation.y+=0.005;
  earth.rotation.y+=0.01;

  // moon.position.x+=0.01;
  // moon.position.z+=0.02;

  controls.update();

  renderer.render(scene,camera);
}

animate();
