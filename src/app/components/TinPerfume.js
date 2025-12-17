import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Decal, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function TinPerfume({ image }) {
  const group = useRef()
  const body = useRef()
  const [hovered, setHovered] = useState(false)

  const labelTexture = useTexture(image)
  labelTexture.colorSpace = THREE.SRGBColorSpace
  labelTexture.anisotropy = 16

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime()

    const idleX = Math.sin(t * 0.8) * 0.18
    const idleY = Math.cos(t * 0.6) * 0.22

    const pointerX = hovered ? mouse.y * 0.45 : 0
    const pointerY = hovered ? mouse.x * 0.55 : 0

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
      <RoundedBox
        ref={body}
        args={[2.2, 3.4, 0.45]}
        radius={0.38}
        smoothness={8}
      >
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.28}
          envMapIntensity={1.6}
        />
      </RoundedBox>

      {/* CURVED FRONT LABEL (PROJECTED) */}
      <Decal
        mesh={body}
        position={[0, 0, 0.23]}
        rotation={[0, 0, 0]}
        scale={[2.02, 3.1, 1]}
      >
        <meshStandardMaterial
          map={labelTexture}
          transparent
          polygonOffset
          polygonOffsetFactor={-4}
          metalness={0.15}
          roughness={0.45}
          envMapIntensity={1.1}
          toneMapped={false}
        />
      </Decal>
    </group>
  )
}
