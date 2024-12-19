import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useSpring, animated } from '@react-spring/three';

interface TableProps {
  position: [number, number, number];
  isActive: boolean;
  isDisabled: boolean;
}

export function Table({ position, isActive, isDisabled }: TableProps) {
  const tableRef = useRef<Mesh>(null);

  const { color } = useSpring({
    color: isDisabled
      ? '#666666'
      : isActive
      ? '#f97316'
      : '#ffffff',
  });

  useFrame((state) => {
    if (tableRef.current) {
      tableRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Table surface with rounded edges */}
      <animated.mesh
        ref={tableRef}
        receiveShadow
        castShadow
        position={[0, 0, 0]}
      >
        <cylinderGeometry args={[1, 0.9, 0.08, 32]} />
        <animated.meshStandardMaterial
          color={color}
          metalness={0.2}
          roughness={0.8}
        />
      </animated.mesh>

      {/* Table rim */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <torusGeometry args={[1, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#2c2c2c"
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>

      {/* Center support */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial
          color="#444444"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Base with decorative rings */}
      <group position={[0, -1, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[0.6, 0.7, 0.1, 32]} />
          <meshStandardMaterial
            color="#333333"
            metalness={0.4}
            roughness={0.6}
          />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.5, 0.02, 16, 32]} />
          <meshStandardMaterial
            color="#4a4a4a"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
      </group>
    </group>
  );
}