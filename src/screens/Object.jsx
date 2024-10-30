import React, { useEffect, useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";
import tinkerObject from "../assets/objects/tinker.obj";

function ThreeDModel() {
  const mountRef = useRef(null);

  useEffect(() => {
    const objectPropertiesMap = new WeakMap(); // Move WeakMap inside useEffect

    const mountNode = mountRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, -1.5, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountNode.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const objLoader = new OBJLoader();
    objLoader.load(
      tinkerObject,
      (object) => {
        object.scale.set(0.009, 0.009, 0.004);
        object.position.set(0, -1, -1);

        const material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
        });

        object.traverse((child) => {
          if (child.isMesh) {
            child.material = material;
            objectPropertiesMap.set(child, { name: "3DObject", scale: 1 });
          }
        });

        scene.add(object);

        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the 3D object", error);
      }
    );

    const handleResize = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (aspectRatio < 1) {
        camera.fov = 75 * aspectRatio;
      } else {
        camera.fov = 75;
      }
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountNode.removeChild(renderer.domElement);
    };
  }, []); // Empty dependency array

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", textAlign: "center" }}
    />
  );
}

export default ThreeDModel;
