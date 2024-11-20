import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Object3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountElement = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountElement.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 4); // Increased intensity
    const pointLight = new THREE.PointLight(0xffffff, 2); // Increased intensity
    pointLight.position.set(50, 50, 50);
    scene.add(ambientLight, pointLight);

    // Add a Directional Light to simulate strong light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Increased intensity
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
  
        // (Existing logo setup code)
  
        // Particle system
        const particleCount = 900; // Number of particles
        const positions = [];
        const colors = []; // Array to hold color values
        const velocities = [];
  
        // Generate random positions, velocities, and colors for particles
        for (let i = 0; i < particleCount; i++) {
          const x = (Math.random() - 0.5) * 1000; // Random x position
          const y = (Math.random() - 0.5) * 1000; // Random y position
          const z = (Math.random() - 0.5) * 1000; // Random z position
          positions.push(x, y, z);
  
          const velocityX = Math.random() * 0.05 - 0.01;
          const velocityY = Math.random() * 0.08 - 0.01;
          const velocityZ = Math.random() * 1.2 - 0.05;
          velocities.push(velocityX, velocityY, velocityZ);
  
          // Assign random colors: some white (#ffffff), some #a70e46
          const isSpecialColor = Math.random() < 0.3; // 30% chance for #a70e46
          const color = new THREE.Color(isSpecialColor ? '#a70e46' : '#ffffff');
          colors.push(color.r, color.g, color.b);
        }
  
        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); // Add color attribute
  
        const particleMaterial = new THREE.PointsMaterial({
          vertexColors: true, // Enable vertex colors
          size: 5,
        });
  
        const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
        scene.add(particleSystem);

        // Particle movement animation
        const animateParticles = () => {
          const positionsArray = particlesGeometry.attributes.position.array;
          for (let i = 0; i < particleCount; i++) {
            // Apply the velocity to move each particle
            const index = i * 3;
            positionsArray[index] += velocities[index]; // X
            positionsArray[index + 1] += velocities[index + 1]; // Y
            positionsArray[index + 2] += velocities[index + 2]; // Z

            // Optionally, bounce the particles back if they go out of bounds
            if (positionsArray[index] > 1000 || positionsArray[index] < -1000) {
              velocities[index] *= -1;
            }
            if (positionsArray[index + 1] > 1000 || positionsArray[index + 1] < -1000) {
              velocities[index + 1] *= -1;
            }
            if (positionsArray[index + 2] > 1000 || positionsArray[index + 2] < -1000) {
              velocities[index + 2] *= -1;
            }
          }
          particlesGeometry.attributes.position.needsUpdate = true;
        };

        // Logo scaling animation
        let logoScale = 0;
        const targetScale = 1;
        const scaleSpeed = 0.02;

        const scaleLogo = () => {
          if (logoScale < targetScale) {
            logoScale += scaleSpeed;
            logo.scale.set(logoScale, logoScale, logoScale);
          }
        };

        // Rotation logic for both logo and particles
        let rotationSpeed = 0.699; // Initial high rotation speed
        let rotationDecreaseRate = 0.02; // Rate at which speed decreases
        let isRotating = false;

        // Start rotating both logo and particles
        const startRotatingLogoAndParticles = () => {
          isRotating = true;
          const rotateLogoAndParticles = () => {
            if (rotationSpeed > 0) {
              // Rotate the logo in all directions
              logo.rotation.x += rotationSpeed; // Rotate around X-axis
              logo.rotation.y += rotationSpeed; // Rotate around Y-axis
              logo.rotation.z += rotationSpeed; // Rotate around Z-axis

              // Rotate the particle system (same speed)
              particleSystem.rotation.x += rotationSpeed;
              particleSystem.rotation.y += rotationSpeed;
              particleSystem.rotation.z += rotationSpeed;

              // Gradually decrease the rotation speed
              rotationSpeed -= rotationDecreaseRate;

              requestAnimationFrame(rotateLogoAndParticles); // Continue the animation
            } else {
              // Stop rotation after the speed drops to zero
              isRotating = false;
            }
          };

          rotateLogoAndParticles();
        };

        // Render loop
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

    // Cleanup
    return () => {
      if (mountElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Object3D;
