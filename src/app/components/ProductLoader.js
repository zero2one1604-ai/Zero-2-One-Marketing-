import { Html, useProgress } from '@react-three/drei'

function ProductLoader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div style={{
        color: '#aaa',
        fontSize: '14px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase'
      }}>
        Loading {Math.round(progress)}%
      </div>
    </Html>
  )
}
export default ProductLoader
