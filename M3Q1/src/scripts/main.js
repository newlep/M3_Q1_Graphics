import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

//Camera and Scene
const scene = new THREE.Scene();

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 200;
const cameraHeight = cameraWidth / aspectRatio;




const camera = new THREE.OrthographicCamera(
    cameraWidth / -2.5, // left
    cameraWidth / 2.5, // right
    cameraHeight / 2.5, // top
    cameraHeight / -2.5, // bottom
    0, // near plane
    1000 // far plane
  );
  camera.position.set(100, 100, 100);
  camera.lookAt(0, 0, 0);
  
  const renderer = new THREE.WebGLRenderer();
  const ambientLight = new THREE.AmbientLight(0xffffff, 0);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xEEB4B4, 0.3);
  directionalLight.position.set(1, 7, 5);
  scene.add(directionalLight); 

  const spotLight = new THREE.SpotLight(0xFFFFFF, 1, 50, 0.8 );
  spotLight.position.set(1, 5, -45);
  spotLight.castShadow=true;
  spotLight.shadow.mapSize.set(2056,2056);
  scene.add(spotLight);
  
  const hemLight = new THREE.HemisphereLight(0x181B1B, 100 );
  hemLight.position.set(0, 5, 0);
  hemLight.castShadow=true;
  scene.add(hemLight);

  const pointLight = new THREE.PointLight( 0xFFB700, 3, 20 );
    pointLight.position.set( -11, 5, 30 );
    scene.add( pointLight );
  
  renderer.setSize( window.innerWidth, window.innerHeight );
  
  document.body.appendChild( renderer.domElement );
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.update();
  
//Code Starts here
//Texture / Materials
const matrSteel = new THREE.TextureLoader().load('./assets/car.jpg');
const matrRubber = new THREE.TextureLoader().load('./assets/tire.jpg');
const matrConc = new THREE.TextureLoader().load('./assets/floor.jpg');
const matrWood = new THREE.TextureLoader().load('./assets/wall.jpg');

//wont work??
//scene.background = new THREE.MeshBasicMaterial({color: 0x7D662D, map: matrConc});
scene.background = new THREE.Color(0x1A0A17 );
//Room Code
//Walls 
function generateBaseWall(){

    const wall = new THREE.Mesh(
        new THREE.BoxGeometry(100, 20, 4),
        new THREE.MeshToonMaterial({color: 0xfff4e6, map: matrWood}) //wall color
    );
    return wall;

}

//to create room
function generateRoom(){

        const room = new THREE.Group();

        const leftWall = generateBaseWall();
        leftWall.rotation.y = 17.28;
        leftWall.position.set(-47.9, 3.6, 0);
        room.add(leftWall);

        const rightWall = generateBaseWall();
        rightWall.position.set(0, 3.6, -50)
        room.add(rightWall);

        const floor = new THREE.Mesh( 
        new THREE.PlaneGeometry( 100, 100, 3, 3 ), 
        new THREE.MeshToonMaterial( { color: 0xbe9b7b, map: matrConc} ), 

        );
        floor.material.side = THREE.DoubleSide;
        floor.rotation.x = 11;
        floor.position.y= -6.5;
        room.add(floor);




return room;

}
const room = generateRoom();
scene.add(room); 

// ^^ INSERT CODE UP HERE FOR ROOM  ^^        
//last ng generate room code
function generateDecor(){

    const decor = new THREE.Group();

//stuff


const CarHead = new THREE.Mesh(
    new THREE.BoxGeometry(5,4,10),
    new THREE.MeshPhongMaterial({color: 0xFF0000, map: matrSteel}));
    CarHead.material.side = THREE.DoubleSide;
    CarHead.rotation.y = 17.5;
    CarHead.position.set(-1, -3, -40);


    decor.add(CarHead);

const CarBody = new THREE.Mesh(
    new THREE.BoxGeometry(15,4,15),
    new THREE.MeshPhongMaterial({color: 0xFF0000, map: matrSteel}));
    CarBody.material.side = THREE.DoubleSide;
    CarBody.rotation.y = 17.5;
    CarBody.position.set(-3, -2, -48);
    
    
    decor.add(CarBody);

const CarWheelL = new THREE.Mesh(
    new THREE.TorusGeometry(1.5,1,16,100), 
    new THREE.MeshPhongMaterial({color: 0xE4E4E4, map: matrRubber}));
    CarWheelL.material.side = THREE.DoubleSide;
    CarWheelL.rotation.y = 17.5;
    CarWheelL.position.set(5,-4,-40);

    const CarWheelR = new THREE.Mesh(
        new THREE.TorusGeometry(1.5,1,16,100), 
        new THREE.MeshPhongMaterial({color: 0xE4E4E4, map: matrRubber}));
        CarWheelR.material.side = THREE.DoubleSide;
        CarWheelR.rotation.y = 17.5;
        CarWheelR.position.set(-6.5,-4,-38);


    const Cfire = new THREE.Mesh(
        new THREE.ConeGeometry(5,12,30),
        new THREE.MeshLambertMaterial({color: 0xFF0000, map: matrWood }));
        Cfire.material.side = THREE.DoubleSide;
        Cfire.position.set(-11, -2, 30);

        const Cfire2 = new THREE.Mesh(
            new THREE.ConeGeometry(12,6,20),
            new THREE.MeshLambertMaterial({color: 0xFF0000, map: matrWood }));
            Cfire2.material.side = THREE.DoubleSide;
            Cfire2.position.set(-11, 2, 30);
    
    const Artifact = new THREE.Mesh(
        new THREE.TorusKnotGeometry( 10, 3, 300, 60),
        new THREE.MeshDistanceMaterial({color: 0x00000}));
        Artifact.material.side = THREE.DoubleSide;
        Artifact.position.set(20, 15, 10);

    
    decor.add(Artifact);
    decor.add(Cfire);
    decor.add(Cfire2);
    decor.add(CarWheelR);
    decor.add(CarWheelL);

    
    return decor;
}

//to add decor
const decor = generateDecor();
scene.add(decor);
//NO CODE AFTER THIS 
//Renderer must be at the bottom
function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}
animate();