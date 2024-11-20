import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './Object.css';

const Object3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountElement = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountElement.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 4);
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(50, 50, 50);
    scene.add(ambientLight, pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(0, 0, 1).normalize();
    scene.add(directionalLight);

    // Orbit controls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    // Load 3D Logo
    const loader = new GLTFLoader();
    loader.load(
      '/ImageToStl.com_tinker.glb',
      (gltf) => {
        const logo = gltf.scene;
        scene.add(logo);

        // Particle system
        const particleCount = 900;
        const positions = [];
        const colors = [];
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
          const x = (Math.random() - 0.5) * 1000;
          const y = (Math.random() - 0.5) * 1000;
          const z = (Math.random() - 0.5) * 1000;
          positions.push(x, y, z);

          const velocityX = Math.random() * 0.05 - 0.01;
          const velocityY = Math.random() * 0.08 - 0.01;
          const velocityZ = Math.random() * 1.2 - 0.05;
          velocities.push(velocityX, velocityY, velocityZ);

          const isSpecialColor = Math.random() < 0.3;
          const color = new THREE.Color(isSpecialColor ? '#a70e46' : '#ffffff');
          colors.push(color.r, color.g, color.b);
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
          vertexColors: true,
          size: 5,
        });

        const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
        scene.add(particleSystem);

        const animateParticles = () => {
          const positionsArray = particlesGeometry.attributes.position.array;
          for (let i = 0; i < particleCount; i++) {
            const index = i * 3;
            positionsArray[index] += velocities[index];
            positionsArray[index + 1] += velocities[index + 1];
            positionsArray[index + 2] += velocities[index + 2];

            if (positionsArray[index] > 1000 || positionsArray[index] < -1000) velocities[index] *= -1;
            if (positionsArray[index + 1] > 1000 || positionsArray[index + 1] < -1000) velocities[index + 1] *= -1;
            if (positionsArray[index + 2] > 1000 || positionsArray[index + 2] < -1000) velocities[index + 2] *= -1;
          }
          particlesGeometry.attributes.position.needsUpdate = true;
        };

        let logoScale = 0;
        const targetScale = 1;
        const scaleSpeed = 0.02;

        const scaleLogo = () => {
          if (logoScale < targetScale) {
            logoScale += scaleSpeed;
            logo.scale.set(logoScale, logoScale, logoScale);
          }
        };

        let rotationSpeed = 0.699;
        let rotationDecreaseRate = 0.02;
        let isRotating = false;

        const startRotatingLogoAndParticles = () => {
          isRotating = true;
          const rotateLogoAndParticles = () => {
            if (rotationSpeed > 0) {
              logo.rotation.x += rotationSpeed;
              logo.rotation.y += rotationSpeed;
              logo.rotation.z += rotationSpeed;

              particleSystem.rotation.x += rotationSpeed;
              particleSystem.rotation.y += rotationSpeed;
              particleSystem.rotation.z += rotationSpeed;

              rotationSpeed -= rotationDecreaseRate;
              requestAnimationFrame(rotateLogoAndParticles);
            } else {
              isRotating = false;
            }
          };

          rotateLogoAndParticles();
        };

        const animate = () => {
          requestAnimationFrame(animate);
          animateParticles();
          scaleLogo();
          if (logoScale >= targetScale && !isRotating) {
            startRotatingLogoAndParticles();
          }
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => console.error('Error loading GLTF:', error)
    );

    // Handle responsiveness
    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      if (mountElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '35%', height: '100vh' }} />;
};

export default Object3D;
