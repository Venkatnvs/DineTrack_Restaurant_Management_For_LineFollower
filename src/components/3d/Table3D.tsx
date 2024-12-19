import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface Table3DProps {
  position: [number, number, number];
  isActive: boolean;
  isDisabled: boolean;
  itemCount: number;
}

export function Table3D({ position, isActive, isDisabled, itemCount }: Table3DProps) {
  const tableRef = useRef<Mesh>(null);
  const plateRefs = useRef<Mesh[]>([]);

  // Animation for table color
  const { color } = useSpring({
    color: isDisabled
      ? '#666666'
      : isActive
      ? '#f97316'
      : '#ffffff',
  });

  // Rotate table slightly on each frame
  useFrame((state) => {
    if (tableRef.current) {
      tableRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    // Animate plates floating above table
    plateRefs.current.forEach((plate, index) => {
      if (plate) {
        const offset = (index * Math.PI * 2) / itemCount;
        plate.position.y = 1 + Math.sin(state.clock.elapsedTime + offset) * 0.1;
        plate.rotation.y = state.clock.elapsedTime + offset;
      }
    });
  });

  // Update plate refs when item count changes
  useEffect(() => {
    plateRefs.current = plateRefs.current.slice(0, itemCount);
  }, [itemCount]);

  return (
    <group position={position}>
      {/* Table base */}
      <animated.mesh
        ref={tableRef}
        receiveShadow
        castShadow
      >
        <cylinderGeometry args={[1, 0.8, 0.1, 32]} />
        <animated.meshStandardMaterial color={color} />
      </animated.mesh>

      {/* Table leg */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Table foot */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Plates for active items */}
      {Array.from({ length: itemCount }).map((_, index) => (
        <mesh
          key={index}
          ref={(el) => (plateRefs.current[index] = el as Mesh)}
          position={[
            Math.cos((index * Math.PI * 2) / itemCount) * 0.5,
            1,
            Math.sin((index * Math.PI * 2) / itemCount) * 0.5,
          ]}
          scale={0.15}
          castShadow
        >
          <cylinderGeometry args={[1, 1, 0.1, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.5}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}