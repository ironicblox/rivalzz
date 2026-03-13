// 3D Robot with Three.js
let scene, camera, renderer, robot, mouseX = 0, mouseY = 0;

function init3DRobot() {
    const canvas = document.getElementById('robot-canvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x2563eb, 1, 100);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4f46e5, 0.8, 100);
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);

    // Create Spider Robot
    createSpiderRobot();

    // Mouse move event
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / height) * 2 + 1;
    });

    // Handle resize
    window.addEventListener('resize', () => {
        const newWidth = container.offsetWidth;
        const newHeight = container.offsetHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });

    // Animation loop
    animate();
}

function createSpiderRobot() {
    robot = new THREE.Group();

    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xff5733,  // Orange/red color
        metalness: 0.7,
        roughness: 0.4
    });

    const darkMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a2332,  // Dark blue-gray
        metalness: 0.9,
        roughness: 0.5
    });

    const glowMaterial = new THREE.MeshStandardMaterial({
        color: 0x3498db,  // Blue
        emissive: 0x3498db,
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.2
    });

    const metalAccent = new THREE.MeshStandardMaterial({
        color: 0x7f8c8d,  // Dark gray metal
        metalness: 0.95,
        roughness: 0.2
    });

    const orangeGlow = new THREE.MeshStandardMaterial({
        color: 0xff6b35,
        emissive: 0xff6b35,
        emissiveIntensity: 0.4,
        metalness: 0.6,
        roughness: 0.3
    });

    // Main Body (cylindrical/rectangular)
    const bodyGeometry = new THREE.BoxGeometry(0.7, 0.6, 1.2);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    robot.add(body);

    // Body side panels
    const sidePanelGeometry = new THREE.BoxGeometry(0.72, 0.5, 1.0);
    const leftPanel = new THREE.Mesh(sidePanelGeometry, darkMaterial);
    leftPanel.position.x = -0.36;
    robot.add(leftPanel);

    const rightPanel = new THREE.Mesh(sidePanelGeometry, darkMaterial);
    rightPanel.position.x = 0.36;
    robot.add(rightPanel);

    // Central core with details
    const coreGeometry = new THREE.BoxGeometry(0.5, 0.4, 0.9);
    const core = new THREE.Mesh(coreGeometry, orangeGlow);
    robot.add(core);

    // Add mechanical details - vents/grills
    for (let i = 0; i < 5; i++) {
        const ventGeometry = new THREE.BoxGeometry(0.52, 0.03, 0.15);
        const vent = new THREE.Mesh(ventGeometry, darkMaterial);
        vent.position.set(0, 0.15 - i * 0.08, 0.46);
        robot.add(vent);
    }

    // Head/Sensor Unit (tall cylindrical)
    const headGeometry = new THREE.CylinderGeometry(0.25, 0.3, 0.8, 8);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0, 0.7, 0);
    robot.add(head);

    // Head panels (dark sections)
    const headPanelGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.1);
    const frontHeadPanel = new THREE.Mesh(headPanelGeometry, darkMaterial);
    frontHeadPanel.position.set(0, 0.7, 0.25);
    robot.add(frontHeadPanel);

    const backHeadPanel = new THREE.Mesh(headPanelGeometry, darkMaterial);
    backHeadPanel.position.set(0, 0.7, -0.25);
    robot.add(backHeadPanel);

    // Head top cap
    const headCapGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.15, 8);
    const headCap = new THREE.Mesh(headCapGeometry, darkMaterial);
    headCap.position.set(0, 1.1, 0);
    robot.add(headCap);

    // Sensor/Camera housing (front)
    const sensorHousingGeometry = new THREE.BoxGeometry(0.6, 0.35, 0.2);
    const sensorHousing = new THREE.Mesh(sensorHousingGeometry, darkMaterial);
    sensorHousing.position.set(0, 0, 0.65);
    robot.add(sensorHousing);

    // Main camera eyes (large glowing)
    const mainEyeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16);
    const leftMainEye = new THREE.Mesh(mainEyeGeometry, glowMaterial);
    leftMainEye.position.set(-0.15, 0.05, 0.72);
    leftMainEye.rotation.x = Math.PI / 2;
    robot.add(leftMainEye);

    const rightMainEye = new THREE.Mesh(mainEyeGeometry, glowMaterial);
    rightMainEye.position.set(0.15, 0.05, 0.72);
    rightMainEye.rotation.x = Math.PI / 2;
    robot.add(rightMainEye);

    // Small orange sensor light
    const smallSensorGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.05, 12);
    const orangeSensor = new THREE.Mesh(smallSensorGeometry, orangeGlow);
    orangeSensor.position.set(0, 0.05, 0.73);
    orangeSensor.rotation.x = Math.PI / 2;
    robot.add(orangeSensor);

    // Additional small sensors
    for (let i = 0; i < 4; i++) {
        const tinyLensGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.03, 8);
        const tinyLens = new THREE.Mesh(tinyLensGeometry, metalAccent);
        tinyLens.position.set(-0.2 + i * 0.13, -0.12, 0.71);
        tinyLens.rotation.x = Math.PI / 2;
        robot.add(tinyLens);
    }

    // Mechanical grill on head
    for (let i = 0; i < 8; i++) {
        const grillBarGeometry = new THREE.BoxGeometry(0.45, 0.015, 0.02);
        const grillBar = new THREE.Mesh(grillBarGeometry, metalAccent);
        grillBar.position.set(0, 0.85 - i * 0.03, 0.26);
        robot.add(grillBar);
    }

    // Side mechanical details
    for (let side of [-1, 1]) {
        // Wheel/gear details
        const gearGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 16);
        const gear = new THREE.Mesh(gearGeometry, metalAccent);
        gear.position.set(side * 0.38, 0.2, 0.3);
        gear.rotation.z = Math.PI / 2;
        robot.add(gear);

        // Gear spokes
        for (let i = 0; i < 6; i++) {
            const spokeGeometry = new THREE.BoxGeometry(0.02, 0.1, 0.02);
            const spoke = new THREE.Mesh(spokeGeometry, darkMaterial);
            const angle = (i * Math.PI) / 3;
            spoke.position.set(
                side * 0.38,
                0.2 + Math.cos(angle) * 0.08,
                0.3 + Math.sin(angle) * 0.08
            );
            spoke.rotation.x = angle;
            robot.add(spoke);
        }
    }

    // Create 6 legs (spider-like) - positioned for front view
    const legPositions = [
        { angle: -45, y: 0.25, z: 0.4 },   // Front left
        { angle: 45, y: 0.25, z: 0.4 },    // Front right
        { angle: -85, y: 0, z: 0 },        // Middle left
        { angle: 85, y: 0, z: 0 },         // Middle right
        { angle: -125, y: -0.25, z: -0.4 }, // Back left
        { angle: 125, y: -0.25, z: -0.4 }   // Back right
    ];

    robot.legs = [];

    legPositions.forEach((pos, index) => {
        const leg = createLeg(darkMaterial, bodyMaterial, glowMaterial, metalAccent);
        const angleRad = (pos.angle * Math.PI) / 180;
        leg.position.set(
            Math.cos(angleRad) * 0.5,
            pos.y,
            Math.sin(angleRad) * 0.5 + pos.z
        );
        leg.rotation.y = angleRad;
        robot.add(leg);
        robot.legs.push(leg);
    });

    scene.add(robot);
    robot.rotation.x = 0.1;
    robot.rotation.y = 0;
}

function createLeg(darkMaterial, bodyMaterial, glowMaterial, metalAccent) {
    const leg = new THREE.Group();

    // Base joint (connects to body) - larger
    const baseJointGeometry = new THREE.SphereGeometry(0.14, 16, 16);
    const baseJoint = new THREE.Mesh(baseJointGeometry, darkMaterial);
    robot.add(baseJoint);

    // Joint housing
    const housingGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
    const housing = new THREE.Mesh(housingGeometry, metalAccent);
    housing.rotation.z = Math.PI / 2;
    leg.add(housing);

    // Upper leg segment (cylindrical with details)
    const upperGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.0, 16);
    const upper = new THREE.Mesh(upperGeometry, bodyMaterial);
    upper.position.set(0.5, -0.1, 0);
    upper.rotation.z = Math.PI / 2;
    leg.add(upper);

    // Add mechanical bands to upper segment
    for (let i = 0; i < 4; i++) {
        const bandGeometry = new THREE.TorusGeometry(0.105, 0.018, 8, 16);
        const band = new THREE.Mesh(bandGeometry, darkMaterial);
        band.position.set(0.15 + i * 0.22, -0.1, 0);
        band.rotation.y = Math.PI / 2;
        leg.add(band);
    }

    // Gear/wheel detail on upper leg
    const gearGeometry = new THREE.CylinderGeometry(0.13, 0.13, 0.06, 12);
    const gear = new THREE.Mesh(gearGeometry, metalAccent);
    gear.position.set(0.5, -0.1, 0);
    gear.rotation.z = Math.PI / 2;
    leg.add(gear);

    // Gear teeth
    for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2) / 12;
        const toothGeometry = new THREE.BoxGeometry(0.03, 0.04, 0.07);
        const tooth = new THREE.Mesh(toothGeometry, darkMaterial);
        tooth.position.set(
            0.5,
            -0.1 + Math.cos(angle) * 0.14,
            Math.sin(angle) * 0.14
        );
        tooth.rotation.x = angle;
        leg.add(tooth);
    }

    // Middle joint (larger, more detailed)
    const midJointGeometry = new THREE.SphereGeometry(0.13, 16, 16);
    const midJoint = new THREE.Mesh(midJointGeometry, darkMaterial);
    midJoint.position.set(1.0, -0.1, 0);
    leg.add(midJoint);

    // Joint connector
    const connectorGeometry = new THREE.CylinderGeometry(0.11, 0.11, 0.1, 12);
    const connector = new THREE.Mesh(connectorGeometry, metalAccent);
    connector.position.set(1.0, -0.1, 0);
    connector.rotation.z = Math.PI / 2;
    leg.add(connector);

    // Lower leg segment (slightly thinner)
    const lowerGeometry = new THREE.CylinderGeometry(0.09, 0.09, 0.9, 16);
    const lower = new THREE.Mesh(lowerGeometry, bodyMaterial);
    lower.position.set(1.35, -0.5, 0);
    lower.rotation.z = Math.PI / 2.3;
    leg.add(lower);

    // Add bands to lower segment
    for (let i = 0; i < 3; i++) {
        const bandGeometry = new THREE.TorusGeometry(0.095, 0.018, 8, 16);
        const band = new THREE.Mesh(bandGeometry, darkMaterial);
        band.position.set(1.1 + i * 0.25, -0.4 - i * 0.15, 0);
        band.rotation.y = Math.PI / 2;
        leg.add(band);
    }

    // End joint
    const endJointGeometry = new THREE.SphereGeometry(0.11, 16, 16);
    const endJoint = new THREE.Mesh(endJointGeometry, darkMaterial);
    endJoint.position.set(1.65, -0.95, 0);
    leg.add(endJoint);

    // Foot/claw assembly
    const footGroup = new THREE.Group();
    
    // Main foot cylinder
    const footGeometry = new THREE.CylinderGeometry(0.08, 0.06, 0.35, 12);
    const foot = new THREE.Mesh(footGeometry, darkMaterial);
    foot.rotation.z = Math.PI / 5;
    footGroup.add(foot);

    // Mechanical details on foot
    for (let i = 0; i < 2; i++) {
        const detailGeometry = new THREE.TorusGeometry(0.07, 0.01, 6, 12);
        const detail = new THREE.Mesh(detailGeometry, metalAccent);
        detail.position.y = -0.08 + i * 0.12;
        detail.rotation.x = Math.PI / 2;
        footGroup.add(detail);
    }

    // Main claw tip (sharp)
    const clawGeometry = new THREE.ConeGeometry(0.07, 0.3, 8);
    const claw = new THREE.Mesh(clawGeometry, metalAccent);
    claw.position.set(0.06, -0.3, 0);
    claw.rotation.z = Math.PI;
    footGroup.add(claw);

    // Side blade/spikes
    for (let i = 0; i < 2; i++) {
        const bladeGeometry = new THREE.ConeGeometry(0.04, 0.25, 6);
        const blade = new THREE.Mesh(bladeGeometry, darkMaterial);
        blade.position.set(i === 0 ? -0.1 : 0.12, -0.2, i === 0 ? -0.05 : 0.05);
        blade.rotation.z = i === 0 ? Math.PI / 3 : -Math.PI / 3;
        blade.rotation.y = i === 0 ? -Math.PI / 6 : Math.PI / 6;
        footGroup.add(blade);
    }

    // Glowing tip accent
    const tipGlowGeometry = new THREE.SphereGeometry(0.03, 12, 12);
    const tipGlow = new THREE.Mesh(tipGlowGeometry, glowMaterial);
    tipGlow.position.set(0.06, -0.45, 0);
    footGroup.add(tipGlow);

    footGroup.position.set(1.75, -1.15, 0);
    leg.add(footGroup);

    return leg;
}

function animate() {
    requestAnimationFrame(animate);

    if (robot) {
        // Floating animation
        robot.position.y = Math.sin(Date.now() * 0.001) * 0.1;

        // Magnetic mouse follow
        const targetRotationY = mouseX * 0.3;
        const targetRotationX = mouseY * 0.3;
        
        robot.rotation.y += (targetRotationY - robot.rotation.y) * 0.05;
        robot.rotation.x += (targetRotationX - robot.rotation.x + 0.2) * 0.05;

        // Animate legs
        if (robot.legs) {
            robot.legs.forEach((leg, index) => {
                const offset = index * Math.PI / 3;
                leg.rotation.z = Math.sin(Date.now() * 0.002 + offset) * 0.1;
            });
        }

        // Rotate entire robot slowly
        robot.rotation.z = Math.sin(Date.now() * 0.0005) * 0.05;
    }

    renderer.render(scene, camera);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DRobot);
} else {
    init3DRobot();
}
