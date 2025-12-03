import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { BackSide, TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

interface PanoramaProps {
  imageUrl: string;
}

const Panorama = ({ imageUrl }: PanoramaProps) => {
  const texture = useLoader(TextureLoader, imageUrl);
  
  return (
    <Sphere args={[500, 60, 40]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={texture} side={BackSide} />
    </Sphere>
  );
};

interface VirtualTourViewerProps {
  imageUrl: string;
}

const VirtualTourViewer = ({ imageUrl }: VirtualTourViewerProps) => {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted">
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <Suspense fallback={null}>
          <Panorama imageUrl={imageUrl} />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={-0.5}
            minDistance={0.1}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-2 rounded-full text-sm font-medium shadow-lg">
        🔄 Drag to explore • Scroll to zoom
      </div>
      
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin opacity-50" />
      </div>
    </div>
  );
};

export default VirtualTourViewer;
