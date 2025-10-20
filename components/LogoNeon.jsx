export default function LogoNeon({size=220, subtitle=true}){
  const stroke = "#38bdf8";
  return (
    <div className="inline-flex flex-col items-center select-none">
      <svg width={size} height={size} viewBox="0 0 200 200" aria-label="AI Memories — логотип">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path d="M100 170 C 10 110, 30 40, 100 80 C 170 40, 190 110, 100 170 Z"
              fill="none" stroke={stroke} strokeWidth="6" filter="url(#glow)"/>
        <text x="100" y="110" textAnchor="middle" fontSize="42" fill={stroke} filter="url(#glow)">AI</text>
      </svg>
      {subtitle && (
        <div className="mt-2 text-sky-600 text-3xl font-medium" style={{filter: "drop-shadow(0 0 22px rgba(56,189,248,.55))"}}>
          Memories
        </div>
      )}
    </div>
  );
}
