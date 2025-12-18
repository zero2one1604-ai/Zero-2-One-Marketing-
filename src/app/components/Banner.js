export default function RoyalBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-white to-amber-50 py-6 px-8 border-y border-amber-200">
      {/* Subtle damask pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(180,83,9,0.3) 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, rgba(180,83,9,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
      
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
      <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
      
      {/* Content */}
      <div className="relative flex items-center justify-center gap-6">
        {/* Left ornament */}
        <div className="hidden sm:block">
          <svg className="w-6 h-6 text-amber-700/60" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-6h6" />
            <circle cx="12" cy="12" r="8" />
          </svg>
        </div>
        
        {/* Text content */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-600/50"></div>
            <svg className="w-4 h-4 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-600/50"></div>
          </div>
          
          <h2 className="text-amber-900 text-3xl font-serif tracking-wider mb-1.5">
            Free Shipping
          </h2>
          
          <p className="text-amber-800/80 text-xs font-light tracking-widest uppercase">
            Complimentary Delivery on Prepaid Orders
          </p>
        </div>
        
        {/* Right ornament */}
        <div className="hidden sm:block">
          <svg className="w-6 h-6 text-amber-700/60" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-6h6" />
            <circle cx="12" cy="12" r="8" />
          </svg>
        </div>
      </div>
      
      {/* Subtle corner details */}
      <div className="absolute top-3 left-8 w-8 h-8 border-t border-l border-amber-300/40"></div>
      <div className="absolute top-3 right-8 w-8 h-8 border-t border-r border-amber-300/40"></div>
      <div className="absolute bottom-3 left-8 w-8 h-8 border-b border-l border-amber-300/40"></div>
      <div className="absolute bottom-3 right-8 w-8 h-8 border-b border-r border-amber-300/40"></div>
    </div>
  );
}