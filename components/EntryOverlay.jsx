"use client";
import { useRef, useState, useEffect } from "react";

export default function EntryOverlay({ audioSrc="/sounds/enter.mp3", onEnter }){
  const [visible, setVisible] = useState(true);
  const audioRef = useRef(null);
  useEffect(()=>{ if(audioSrc && audioRef.current){ audioRef.current.load(); } },[audioSrc]);

  const handleEnter = async ()=>{
    if(audioSrc && audioRef.current){
      try{ await audioRef.current.play(); }catch(e){ /* autoplay may be blocked */ }
    }
    setVisible(false); onEnter?.();
  };
  if(!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-center text-white"
         style={{background: 'linear-gradient(180deg,#040714 0%,#0a0f1e 100%)'}}>
      {/* star field */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length:80}).map((_,i)=>(
          <span key={i} className="absolute block w-1 h-1 rounded-full bg-white/60"
                style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, opacity: 0.2 + Math.random()*0.6, filter: "blur(0.7px)" }}/>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Pulsing heart button */}
        <button
          onClick={handleEnter}
          aria-label="Вход"
          className="relative grid place-items-center w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-sky-500/15 border border-sky-300/40"
          style={{ animation: 'heart-beat 1.9s ease-in-out infinite' }}
        >
          <svg width="100" height="90" viewBox="0 0 200 180" className="drop-shadow-[0_0_22px_rgba(56,189,248,.55)]">
            <path d="M100 170 C 10 110, 30 40, 100 80 C 170 40, 190 110, 100 170 Z"
                  fill="none" stroke="#38bdf8" strokeWidth="6" />
          </svg>
          <span className="absolute bottom-6 text-xl font-medium">Вход</span>
        </button>
        <p className="mt-6 text-white/80 max-w-md">Нажмите «Вход», чтобы перейти на сайт.</p>
        {audioSrc && <audio ref={audioRef} src={audioSrc} preload="auto" />}
      </div>
    </div>
  );
}
