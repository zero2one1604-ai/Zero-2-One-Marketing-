import { useState, useEffect } from 'react';

export default function Product3D({ image }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [idle, setIdle] = useState({ x: 0, y: 0, z: 0 });

  // more visible idle motion
  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.025;
      setIdle({
        x: Math.sin(t) * 3.2,
        y: Math.cos(t * 0.8) * 4.5,
        z: Math.sin(t * 0.6) * 6,
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handlePointerMove = (e) => {
    if (!isHovered || window.innerWidth < 768) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRotation({
      x: (0.5 - y / rect.height) * 16,
      y: (x / rect.width - 0.5) * 16,
    });
  };

  const finalX = rotation.x + idle.x;
  const finalY = rotation.y + idle.y;
  const finalZ = idle.z;

  return (
    <div className="relative w-full flex justify-center pb-16 pt-4 md:py-14 overflow-hidden">
      <div
        className="relative w-full cursor-pointer max-w-[300px] sm:max-w-[340px] md:max-w-[380px]"
        style={{ perspective: '1300px' }}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => {
          setIsHovered(false);
          setRotation({ x: 0, y: 0 });
        }}
      >
        <div
          className="relative transition-transform duration-700 ease-out"
          style={{
            transform: `
              rotateX(${finalX}deg)
              rotateY(${finalY}deg)
              translateZ(${finalZ}px)
            `,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* grounded shadow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: '70%',
              height: '28px',
              bottom: '-18px',
              background: 'rgba(0,0,0,0.28)',
              filter: 'blur(18px)',
              transform: 'translateZ(-30px)',
            }}
          />

          {/* card */}
          <div
            className="relative aspect-[2/3] rounded-3xl overflow-hidden bg-black"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow:
                '0 18px 40px rgba(0,0,0,0.35), 0 0 40px rgba(245,158,11,0.08)',
            }}
          >
            {/* image */}
            <img
              src={image}
              alt="product"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: 'translateZ(2px)',
                zIndex: 10,
                backfaceVisibility: 'hidden',
              }}
            />

            {/* light */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 20,
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, transparent 40%, transparent 65%, rgba(0,0,0,0.35) 100%)',
              }}
            />

            {/* glow */}
            <div
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-xl pointer-events-none"
              style={{
                zIndex: 30,
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.45), transparent 70%)',
                opacity: isHovered ? 0.55 : 0.35,
                transition: 'opacity 0.4s',
              }}
            />

            {/* inner depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 5,
                boxShadow: 'inset 0 0 40px rgba(255,237,213,0.2)',
              }}
            />

            {/* border */}
            <div
              className="absolute inset-0 rounded-3xl border border-white/15 pointer-events-none"
              style={{ zIndex: 40 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
