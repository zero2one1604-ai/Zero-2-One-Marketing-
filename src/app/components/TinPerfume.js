import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Decal, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function TinPerfume({ image }) {
  const group = useRef()
  const body = useRef()
  const [hovered, setHovered] = useState(false)

  const labelTexture = useTexture(image)
  labelTexture.colorSpace = THREE.SRGBColorSpace
  labelTexture.anisotropy = 16

  // REAL TIN GEOMETRY (flat faces + rounded edges)
  const tinGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    const w = 2.2
    const h = 3.4
    const r = 0.22 // edge roundness ONLY

    shape.moveTo(-w / 2 + r, -h / 2)
    shape.lineTo(w / 2 - r, -h / 2)
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
    shape.lineTo(w / 2, h / 2 - r)
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
    shape.lineTo(-w / 2 + r, h / 2)
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
    shape.lineTo(-w / 2, -h / 2 + r)
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.45,        // REAL thickness from video
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.06,
      bevelSegments: 6,
    })
  }, [])

  // MOTION
  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()

    const idleX = Math.sin(t * 0.9) * 0.18
    const idleY = Math.cos(t * 0.7) * 0.22

    const pointerX = hovered ? mouse.y * 0.4 : 0
    const pointerY = hovered ? mouse.x * 0.5 : 0

    group.current.rotation.x +=
      (idleX + pointerX - group.current.rotation.x) * 0.08
    group.current.rotation.y +=
      (idleY + pointerY - group.current.rotation.y) * 0.08
  })

  return (
    <group
      ref={group}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* TIN BODY */}
      <mesh ref={body} geometry={tinGeometry}>
        <meshStandardMaterial
          color="#1a1a1a"
       metalness={0.05}          // was 0.08
  roughness={0.65}          // was 0.55
  envMapIntensity={0.35}  
        />
      </mesh>

      {/* FRONT ARTWORK — PERFECTLY FLAT & VISIBLE */}
      <Decal
        mesh={body}
        position={[0, 0, 0.23]}
        rotation={[0, 0, 0]}
   scale={[2.12, 3.28, 1]}  
      >
     <meshStandardMaterial
  map={labelTexture}
  metalness={0}             // ink is non-metal
  roughness={0.85}          // MUCH more matte
  envMapIntensity={0.15}    // tiny reflection only
  toneMapped={false}
  color="#f2f2f2"
  polygonOffset
  polygonOffsetFactor={-5}
/>

      </Decal>
    </group>
  )
}
