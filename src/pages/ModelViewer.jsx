import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Import the model directly using Vite's asset handling
import modelPath from '../assets/model.glb';  // Adjust path to your model

const Model = () => {
  const { scene } = useGLTF(modelPath);  // Load the model using the imported path

  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
};

const ModelViewer = () => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />
      <Model />
    </Canvas>
  );
};

export default ModelViewer;
