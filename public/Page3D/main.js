import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { ObjectLoader } from 'three/addons/loaders/ObjectLoader.js';

let playVinyl = document.getElementById('playVinyl');
let playBobble = document.getElementById("bobbleLamp");
let playWindmill = document.getElementById("spinMill");
let toggleWireframe = document.getElementById("wireframeButton");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(3.759, 2.024, 4.384);
// const cameraRot = new THREE.Vector3(-22, 46, 16);
const cameraRot = [-1, 1, 0];
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock()


renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
// controls.target.set(cameraRot[0], cameraRot[1], cameraRot[2])
// console.log('cameraRot', cameraRot)
controls.target.set(...cameraRot)
controls.update();

const loaderGLTF = new GLTFLoader();
const vinylURL = 'models/turntable1.glb'
let vinylPos;

// scene object references
let vinyl;
let animations;
let mixer;
let bulb;
let mill;
let lamp;
let materials = [];
let wireframe = false;

loaderGLTF.load(vinylURL, (gltf) => {
	const root = gltf.scene;
	animations = gltf.animations;
	console.log(animations)
	scene.add(root)
	vinylPos = scene.getObjectByName("Scene").getObjectByName("VinylDisk").position;
	addDL1();
	vinyl = scene.getObjectByName("Scene").getObjectByName("VinylDisk");
	mixer = new THREE.AnimationMixer(scene.getObjectByName("Scene"));
	mill = scene.getObjectByName("MillWings");
	lamp = scene.getObjectByName("Scene").getObjectByName("Armature");
	scene.background = new THREE.Color().setHex( 0xFFFFFF );
	scene.traverse( function( object ) {

		if ( object.material ) materials.push( object.material );
	
	} );
})

console.log(scene)
console.log('Materials: ', materials)

const ambLightProps = {
	color: 0xFFFFFF,
	intensity: 1
}

const ambLight = new THREE.AmbientLight(ambLightProps.color, ambLightProps.intensity);
scene.add(ambLight);

function addDL1() {

	const DL1Props = {
		color: 0xFFFFFF,
		intensity: 10,
		position: {x: 0, y: 1, z: 0},
		targetPos: vinylPos
	}

	const PLight1 = new THREE.PointLight(DL1Props.color, 25, 10);
	PLight1.name = 'PointLight';
	PLight1.position.set(
		DL1Props.position.x,
		DL1Props.position.y,
		DL1Props.position.z
	);

	scene.add(PLight1);

}


function ObjCoords(obj, camera, canvas) {
	let vector = new THREE.Vector3();
	if (obj) {
		vector.set(obj.position.x, obj.position.y, obj.position.z)
		vector.project(camera)
	
		vector.x = Math.round( (   vector.x + 1 ) * canvas.width  / 2 );
		vector.y = Math.round( ( - vector.y + 1 ) * canvas.height / 2 );
	}

	return vector
}

function updateButtonPos(btnElement, vector) {
	btnElement.style.position = 'absolute';
	btnElement.style.top = String(vector.y + 'px');
	btnElement.style.left = String(vector.x + 'px');
	// btnElement.style.bottom = '3px';
	// btnElement.style.left = '10px';
}

function animate() {
	lightFollowBulb();
    renderer.render( scene, camera );
	if (mixer && clock) {
		mixer.update( clock.getDelta() );
	}
	// try {
		let OBJs = {
			'vinyl' : [playVinyl, vinyl], 
			'lamp' : [playBobble, lamp], 
			'mill' : [playWindmill, mill]
		}
		Object.keys(OBJs).forEach(obj => {
			updateButtonPos(OBJs[obj][0], ObjCoords(OBJs[obj][1], camera, renderer.domElement))
	});
}

function update () {
	mixer.update( deltaSeconds );
}

renderer.setAnimationLoop( animate );

function handlePlayVinyl() {

	let vinylAnims = [THREE.AnimationClip.findByName(animations, 'VinylDiskSpin'), THREE.AnimationClip.findByName(animations, 'Action')];
	vinylAnims.forEach((anim) => {
		console.log(anim)
		mixer.clipAction(anim).play();
	})

}

function handleSpinMill() {
	let spinAnim = THREE.AnimationClip.findByName(animations, 'MillWing1.001Action');
	let action = mixer.clipAction(spinAnim).setLoop(THREE.LoopOnce)
	action.clampWhenFinished = true;
	action.reset();
	action.play();
}

function handleBobbleLamp() {
	console.log('!')
	let bobbleAnim = THREE.AnimationClip.findByName(animations, 'LampBobble');
	let action = mixer.clipAction(bobbleAnim).setLoop(THREE.LoopOnce)
	action.clampWhenFinished = true;
	action.reset();
	action.play();
}

function lightFollowBulb() {
	try {
		if (!bulb) {
			
			let lampArmature = scene.getObjectByName("Scene").getObjectByName("Armature").getObjectByName("Bone");
	
			// traverse to get bulb position lmao
			let bulbPos;
			lampArmature.traverse((obj) => {
				if (obj.name == "Bone006") {
					bulb = obj
				}
			})
		}
		let lightPos = new THREE.Vector3;
		bulb.getWorldPosition(lightPos);
		let light = scene.getObjectByName("PointLight");
		light.position.set(lightPos.x, lightPos.y, lightPos.z);
	}
	catch(error) {
		console.error(error);
	}
	
}

function handleToggleWireframe() {
	wireframe = wireframe ? false : true;
	materials.forEach((mat) => {
		console.log(mat);
		mat.wireframe = (wireframe);
	})
}

playVinyl.addEventListener("click", handlePlayVinyl);
playBobble.addEventListener("click", handleBobbleLamp);
playWindmill.addEventListener("click", handleSpinMill);
toggleWireframe.addEventListener("click", handleToggleWireframe)
