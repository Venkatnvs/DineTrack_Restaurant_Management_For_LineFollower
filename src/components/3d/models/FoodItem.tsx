import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface FoodItemProps {
  position: [number, number, number];
  type: 'apple' | 'mango' | 'banana' | 'pear' | 'guava' | 'papaya';
  hovered?: boolean;
}

export function FoodItem({ position, type, hovered }: FoodItemProps) {
  const meshRef = useRef<Mesh>(null);

  const { scale, rotation } = useSpring({
    scale: hovered ? 1.1 : 1,
    rotation: hovered ? [0, Math.PI * 2, 0] : [0, 0, 0],
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.02;
    }
  });

  const renderFood = () => {
    // Plate dimensions
    const plateSize = 0.5; // Plate radius

    switch (type) {
      case 'apple':
        return (
          <>
            {/* Plate */}
            <mesh position={[0, -0.05, 0]}>
              <cylinderGeometry args={[plateSize, plateSize, 0.02, 32]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Apple base (sphere) */}
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshStandardMaterial color="#FF0000" />
          </>
        );
      case 'mango':
        return (
          <>
            {/* Plate */}
            <mesh position={[0, -0.05, 0]}>
              <cylinderGeometry args={[plateSize, plateSize, 0.02, 32]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Mango base (elongated sphere) */}
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#FFEB3B" />
          </>
        );
      case 'banana':
        return (
          <>
            {/* Plate */}
            <mesh position={[0, -0.05, 0]}>
              <cylinderGeometry args={[plateSize, plateSize, 0.02, 32]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Banana shape (elongated cylinder) */}
            <cylinderGeometry args={[0.08, 0.1, 0.4, 32]} />
            <meshStandardMaterial color="#FFEB3B" />
          </>
        );
      case 'pear':
        return (
          <>
            {/* Plate */}
            <mesh position={[0, -0.05, 0]}>
              <cylinderGeometry args={[plateSize, plateSize, 0.02, 32]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Pear shape (modified sphere) */}
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="#8BC34A" />
          </>
        );
      case 'guava':
        return (
          <>
            {/* Plate */}
            <mesh position={[0, -0.05, 0]}>
              <cylinderGeometry args={[plateSize, plateSize, 0.02, 32]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Guava base (sphere) */}
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshStandardMaterial color="#FF4081" />
          </>
        );
      case 'papaya':
        return (
          <>
            {/* Plate */}
            <mesh position={[0, -0.05, 0]}>
              <cylinderGeometry args={[plateSize, plateSize, 0.02, 32]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Papaya shape (elongated sphere) */}
            <sphereGeometry args={[0.35, 32, 32]} />
            <meshStandardMaterial color="#FF7043" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <animated.mesh
      ref={meshRef}
      position={position}
      scale={scale}
      rotation={rotation as unknown as [number, number, number]}
      castShadow
    >
      {renderFood()}
    </animated.mesh>
  );
}