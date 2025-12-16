import { useState } from 'react';

export default function Product3D({ image }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!isHovered) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 30;
    const rotateX = ((centerY - y) / centerY) * 30;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <div
          className="relative flex items-center justify-center"
          style={{ perspective: '2000px' }}
       onPointerMove={handleMouseMove}
onPointerEnter={() => setIsHovered(true)}
onPointerLeave={handleMouseLeave}

        >
          {/* SCALE WRAPPER */}
          <div className="product-3d-wrapper">
            {/* ORIGINAL TRANSFORM LAYER */}
            <div
              className="relative transition-transform duration-500 ease-out"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(50px)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="absolute bg-black rounded-3xl opacity-30 blur-3xl"
                style={{
                  width: '420px',
                  height: '80px',
                  left: '-10px',
                  top: '630px',
                  transform: 'rotateX(90deg) translateZ(-200px)',
                }}
              />

              <div
                className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 rounded-3xl overflow-hidden"
                style={{
                  width: '400px',
                  height: '600px',
                  transformStyle: 'preserve-3d',
                  boxShadow:
                    '0 30px 60px rgba(0,0,0,0.4), 0 0 100px rgba(245,158,11,0.2)',
                }}
              >
                <div className="absolute inset-0 z-10">
                  <img
                    src={image}
                    alt="Saavi"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className="absolute inset-0 z-20 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)',
                  }}
                />

                <div
                  className="absolute z-30 pointer-events-none rounded-full blur-2xl"
                  style={{
                    width: '300px',
                    height: '300px',
                    top: '-50px',
                    left: '-50px',
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)',
                    opacity: isHovered ? 0.6 : 0.4,
                    transition: 'opacity 0.5s',
                  }}
                />

                <div className="absolute inset-0 z-40 pointer-events-none rounded-3xl border-2 border-white/20" />

                <div
                  className="absolute inset-0 z-30 pointer-events-none rounded-3xl"
                  style={{
                    boxShadow: 'inset 0 0 60px rgba(255,237,213,0.3)',
                  }}
                />

                <div
                  className="absolute z-50 pointer-events-none"
                  style={{
                    width: '150%',
                    height: '150%',
                    top: '-25%',
                    left: '-100%',
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                    transform: `translateX(${isHovered ? '200%' : '0'})`,
                    transition: 'transform 1.5s ease-in-out',
                  }}
                />

                <div
                  className="absolute inset-0 z-5 bg-gradient-to-br from-amber-950 to-orange-950 rounded-3xl"
                  style={{ transform: 'translateZ(-5px)' }}
                />
                <div
                  className="absolute inset-0 z-0 bg-gradient-to-br from-amber-950 to-black rounded-3xl"
                  style={{
                    transform: 'translateZ(-10px)',
                    opacity: 0.8,
                  }}
                />
                <div
                  className="absolute inset-0 bg-black rounded-3xl"
                  style={{
                    transform: 'translateZ(-15px)',
                    opacity: 0.6,
                  }}
                />
              </div>

              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-40 blur-sm"
                  style={{
                    top: `${Math.random() * 600}px`,
                    left: `${Math.random() * 400}px`,
                    transform: `translateZ(${50 + i * 10}px)`,
                    animation: `float ${3 + i}s ease-in-out infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        /* MOBILE ONLY */
        @media (max-width: 767px) {
          .product-3d-wrapper {
            transform: scale(0.7);
          }
        }
      `}</style>
    </div>
  );
}
