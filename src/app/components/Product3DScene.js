import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import TinPerfume from './TinPerfume'
import ProductLoader from './ProductLoader'

export default function Product3DScene({ image }) {
  return (
    <div className="w-full h-[520px]">
      <Canvas
        camera={{ position: [0, 0.3, 6], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        <directionalLight position={[-5, -3, 4]} intensity={0.4} />

        <Suspense fallback={<ProductLoader />}>
          <Environment preset="studio" environmentIntensity={0.4} />
          <TinPerfume image={image} />

          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.35}
            blur={2.5}
            scale={8}
            far={4}
            frames={1}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
