import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 15, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 0.5));


const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({ color: 0x228b22 })
);
ground.rotation.x = -Math.PI/2;
scene.add(ground);


const road = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.1, 30),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
);
road.position.y = 0.05;
scene.add(road);


function addBuilding(x, y, z, color = 0x4682b4) {
    const building = new THREE.Mesh(
        new THREE.BoxGeometry(4, 2, 2),
        new THREE.MeshStandardMaterial({ color })
    );
    building.position.set(x, y, z);
    scene.add(building);
}

// Ndërtesat
addBuilding(5, 1, -5);
addBuilding(5, 1, 5);
addBuilding(-5, 1, 0, 0xffffff);


function addLamp(x, z) {
    const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.1, 3),
        new THREE.MeshStandardMaterial({ color: 0x333333 })
    );
    pole.position.set(x, 1.5, z);
    scene.add(pole);

    const top = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xffffaa, emissive: 0xffffaa })
    );
    top.position.set(x, 3.15, z);
    scene.add(top);
}

// Lampionet (3 nga njera ane, 3 nga ana tjeter)
addLamp(-2, -10); addLamp(2, -10);
addLamp(-2, 0); addLamp(2, 0);
addLamp(-2, 10); addLamp(2, 10);


function addTree(x, z) {
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 1.5),
        new THREE.MeshStandardMaterial({ color: 0x8b4513 })
    );
    trunk.position.set(x, 0.75, z);
    scene.add(trunk);

    const top = new THREE.Mesh(
        new THREE.ConeGeometry(1, 2, 8),
        new THREE.MeshStandardMaterial({ color: 0x006400 })
    );
    top.position.set(x, 2.25, z);
    scene.add(top);
}

addTree(-8, -8);
addTree(-7, 6);
addTree(10, -7);
addTree(11, 5);


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
