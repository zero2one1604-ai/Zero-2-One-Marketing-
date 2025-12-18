export default function RoyalBanner() {
  return (
    <div className="relative w-full bg-[#fdfdfd] border-y border-neutral-100 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-2">
        
        {/* Main Message */}
        <h2 className="text-xl md:text-2xl font-light tracking-tight text-neutral-900">
          Free Delivery <span className="font-serif italic text-neutral-400 mx-1">on</span> Prepaid Orders
        </h2>

        {/* Minimalist Subtext */}
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-4 bg-neutral-200"></div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-medium">
            Standard Shipping Included
          </p>
          <div className="h-[1px] w-4 bg-neutral-200"></div>
        </div>
        
      </div>
    </div>
  );
}