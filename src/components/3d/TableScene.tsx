import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Table } from './models/Table';
import { FoodItem } from './models/FoodItem';
import { Suspense, useState } from 'react';
import { TableOrder } from '@/lib/types';

interface TableSceneProps {
  tableId: string;
  order: TableOrder | null;
  isDisabled: boolean;
}

export function TableScene({ tableId, order, isDisabled }: TableSceneProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <div className="h-[250px] w-full rounded-lg overflow-hidden">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera
          makeDefault
          position={[0, 3, 5]}
          fov={50}
        />
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
        
        {/* Enhanced lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          castShadow
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />

        <Suspense fallback={null}>
          {/* Environment map for realistic reflections */}
          <Environment preset="sunset" />

          {/* Table */}
          <Table
            position={[0, 0, 0]}
            isActive={!!order}
            isDisabled={isDisabled}
          />

          {/* Food items */}
          {order?.items.map((item, index) => {
            const angle = (index * Math.PI * 2) / order.items.length;
            const radius = 0.7;

            // Skip empty items
            if (item.name === "") return null;

            return (
              <FoodItem
                key={index}
                position={[Math.cos(angle) * radius, 0.1, Math.sin(angle) * radius]}
                type={getFoodType(item.name)}
                hovered={hoveredItem === index}
              />
            );
          })}
        </Suspense>

        {/* Ground plane for shadows */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
      </Canvas>
    </div>
  );
}

function getFoodType(itemName: string): 'apple' | 'mango' | 'banana' | 'pear' | 'guava' | 'papaya' {
  const name = itemName.toLowerCase();
  if (name.includes('apple')) return 'apple';
  if (name.includes('mango')) return 'mango';
  if (name.includes('banana')) return 'banana';
  if (name.includes('pear')) return 'pear';
  if (name.includes('guava')) return 'guava';
  return 'papaya';  // Default to papaya if no match
}
