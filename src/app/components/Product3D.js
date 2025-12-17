import { useState, useEffect, useRef } from 'react';

export default function Product3D({ image }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState(-120);
  const [isHovered, setIsHovered] = useState(false);

  const tRef = useRef(0);

  // AUTO ORBIT + SHINE
  useEffect(() => {
    const interval = setInterval(() => {
      tRef.current += 0.028;

      if (!isHovered) {
        setTargetRotation({
          x: Math.sin(tRef.current) * 18,
          y: Math.cos(tRef.current * 0.85) * 22,
        });
      }

      setShine((prev) => {
        const next = prev + 2.4;
        return next > 220 ? -120 : next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered]);

  // SMOOTH FOLLOW
  useEffect(() => {
    const lerp = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x + (targetRotation.x - prev.x) * 0.12,
        y: prev.y + (targetRotation.y - prev.y) * 0.12,
      }));
    }, 16);

    return () => clearInterval(lerp);
  }, [targetRotation]);

  const handlePointerMove = (e) => {
    if (window.innerWidth < 768) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTargetRotation({
      x: (0.5 - y) * 24,
      y: (x - 0.5) * 28,
    });
  };

  return (
    <div className="relative w-full flex justify-center py-20 overflow-hidden">
      <div
        className="relative w-full max-w-[240px] sm:max-w-[270px] md:max-w-[300px]"
        style={{ perspective: '1800px' }}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onPointerMove={handlePointerMove}
      >
        <div
          className="relative transition-transform duration-500 ease-out"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* CONTACT SHADOW */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: '55%',
              height: '12px',
              bottom: '-10px',
              background: 'rgba(0,0,0,0.25)',
              filter: 'blur(10px)',
              transform: 'translateZ(-18px)',
            }}
          />

          {/* TIN OBJECT */}
          <div className="relative aspect-[2/3]" style={{ transformStyle: 'preserve-3d' }}>
            
            {/* BACK PANEL (RECESSED BASE) */}
            <div
              className="absolute inset-[6px] rounded-[22px]"
              style={{
                transform: 'translateZ(-12px)',
                background: 'linear-gradient(180deg, #0d0d0d, #030303)',
                boxShadow: 'inset 0 6px 12px rgba(0,0,0,0.6)',
              }}
            />

            {/* METAL LIP / WALL */}
            <div
              className="absolute inset-[-4px] rounded-[30px]"
              style={{
                transform: 'translateZ(-6px)',
                background: 'linear-gradient(180deg, #1a1a1a, #0a0a0a)',
                boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
              }}
            />

            {/* FRONT LID */}
            <div
              className="absolute inset-0 rounded-[26px] overflow-hidden bg-black"
              style={{
                transform: 'translateZ(0)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.22)',
              }}
            >
              {/* ARTWORK */}
              <img
                src={image}
                alt="solid perfume"
                className="w-full h-full object-cover"
              />

              {/* BRUSHED METAL GRAIN */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 3px)',
                  mixBlendMode: 'overlay',
                  opacity: 0.4,
                }}
              />

              {/* SHINING SWEEP */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    linear-gradient(
                      120deg,
                      transparent ${shine - 25}%,
                      rgba(255,255,255,0.85) ${shine}%,
                      transparent ${shine + 25}%
                    )
                  `,
                  mixBlendMode: 'screen',
                  opacity: 0.75,
                }}
              />

              {/* STATIC METAL REFLECTION */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(130deg, rgba(255,255,255,0.28), transparent 35%, transparent 70%, rgba(255,255,255,0.18))',
                  opacity: isHovered ? 0.6 : 0.4,
                  transition: 'opacity 0.3s',
                }}
              />

              {/* INNER SEAM */}
              <div
                className="absolute inset-[3px] rounded-[22px] pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.6)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
