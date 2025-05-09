
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Text, Float } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';
import { motion } from 'framer-motion';

// Extended type declarations for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: React.DetailedHTMLProps<any, any> & { ref?: React.RefObject<THREE.Mesh> };
      ambientLight: React.DetailedHTMLProps<any, any>;
      directionalLight: React.DetailedHTMLProps<any, any>;
      torusKnotGeometry: React.DetailedHTMLProps<any, any>;
      meshStandardMaterial: React.DetailedHTMLProps<any, any>;
    }
  }
}

function LogoModel() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.3, 0]} castShadow receiveShadow>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial 
        color="#8B5CF6" 
        roughness={0.3}
        metalness={0.7}
        emissive="#4C1D95"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function FloatingText() {
  return (
    <Float
      speed={2} // Animation speed, defaults to 1
      rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
      floatIntensity={1.5} // Up/down float intensity, defaults to 1
    >
      <Text
        font="/fonts/Inter-Bold.woff"
        fontSize={0.6}
        color="#ffffff"
        position={[0, -1.1, 0]}
        anchorX="center"
        anchorY="middle"
      >
        Snipster
      </Text>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />
      <LogoModel />
      <FloatingText />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

export default function ThreeScene() {
  // Initialize font preloading
  useEffect(() => {
    const font = new FontFace('Inter', 'url(/fonts/Inter-Bold.woff)');
    
    document.fonts.add(font);
    font.load().then(() => {
      console.log('Font loaded');
    }).catch(err => {
      console.error('Font loading error:', err);
    });
  }, []);

  return (
    <motion.div
      className="w-full h-[300px] bg-gradient-to-b from-black to-purple-950 rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Canvas shadows>
        <Scene />
      </Canvas>
    </motion.div>
  );
}
