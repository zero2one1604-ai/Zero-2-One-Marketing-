import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import TinPerfume from './TinPerfume'

export default function Product3DScene({ image }) {
  return (
    <div className="w-full h-[520px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -3, 4]} intensity={0.8} />

        {/* environment reflections */}
        <Environment preset="studio" />

        {/* product */}
        <TinPerfume image={image} />

        {/* realistic grounding */}
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.35}
          blur={2.5}
          scale={10}
        />
      </Canvas>
    </div>
  )
}
