"use client";
import { useEffect, useRef, useState } from "react";

/* Лёгкий плейсхолдер */
function Skeleton() {
  return (
    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 to-slate-100" />
  );
}

/* Картинка с фолбэком + ленивой загрузкой */
function ImgFallback({ src, alt, fallback, className }) {
  const [s, setS] = useState(src);
  return (
    <img
      src={s}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => fallback && setS(fallback)}
      draggable={false}
    />
  );
}

/* Рамка с фиксированным соотношением (надёжно на мобилках) */
function Frame({ ratio = "1:1", className = "", children, boxRef }) {
  let pt = 100; // 1:1
  try {
    const [w, h] = ratio.split(":").map(Number);
    if (w > 0 && h > 0) pt = (h / w) * 100;
  } catch {}
  return (
    <div ref={boxRef} className={`relative ${className}`} style={{ paddingTop: `${pt}%` }}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

/* Слайдер До/После */
function Slider({
  before,
  after,
  afterVideo = null,
  afterPoster = null,       // ← добавили постер
  label,
  fbBefore,
  fbAfter,
  ratio = "1:1",            // "1:1" | "9:16"
}) {
  const [x, setX] = useState(50);
  const [videoError, setVideoError] = useState(false);
  const [muted, setMuted] = useState(true); // автоплей возможен только с muted
  const [inView, setInView] = useState(false);
  const videoRef = useRef(null);
  const boxRef = useRef(null);

  // Drag/Touch
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    let active = false;
    const getPct = (clientX) => {
      const r = el.getBoundingClientRect();
      const pct = ((clientX - r.left) / r.width) * 100;
      return Math.min(100, Math.max(0, pct));
    };

    const onDown = (e) => {
      active = true;
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
      setX(getPct(cx));
    };
    const onMove = (e) => {
      if (!active) return;
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
      setX(getPct(cx));
      e.preventDefault();
    };
    const onUp = () => (active = false);

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("touchstart", onDown, { passive: false });
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  // Ленивая инициализация видео только когда карточка видна
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Переключение звука
  const toggleMute = async (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = !muted;
      setMuted(!muted);
      if (v.paused) await v.play().catch(() => {});
    } catch {}
  };
  const stop = (e) => e.stopPropagation();

  return (
    <div className="relative group rounded-3xl overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur select-none">
      <Frame ratio={ratio} boxRef={boxRef}>
        {/* BEFORE */}
        <ImgFallback
          src={before}
          fallback={fbBefore || "/demo_before_bw.jpg"}
          alt="До"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* AFTER */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
          {afterVideo && !videoError ? (
            <>
              {!inView && <Skeleton />}
              {inView && (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover object-center"
                  src={afterVideo}
                  poster={afterPoster || "/video-poster-fallback.jpg"}
                  autoPlay
                  loop
                  muted={muted}
                  playsInline
                  preload="none"           // ← экономим трафик
                  onError={() => setVideoError(true)}
                />
              )}
            </>
          ) : (
            <ImgFallback
              src={after}
              fallback={fbAfter || "/demo_after_color.jpg"}
              alt="После"
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>

        {/* Кнопка звука */}
        {afterVideo && !videoError && (
          <button
            onClick={toggleMute}
            onMouseDown={stop}
            onTouchStart={stop}
            aria-label={muted ? "Включить звук" : "Выключить звук"}
            className="absolute top-3 right-3 z-10 rounded-full bg-black/55 text-white text-sm px-2 py-1 backdrop-blur-sm border border-white/20 hover:bg-black/70"
          >
            {muted ? "🔇" : "🔊"}
          </button>
        )}

        {/* Линия разделения */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/80 shadow"
          style={{ left: `${x}%`, transform: "translateX(-0.5px)" }}
          aria-hidden="true"
        />

        {/* Ручка */}
        <div className="absolute top-1/2 -translate-y-1/2" style={{ left: `${x}%` }}>
          <div className="-translate-x-1/2 p-2 rounded-full bg-blue-500 text-white text-xs shadow">
            ⇆
          </div>
        </div>

        {/* Ползунок */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2/3">
          <input
            aria-label="Слайдер сравнения"
            type="range"
            min={0}
            max={100}
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Подпись: одна — снизу, читаемая на белой полупрозрачной плашке */}
        <div className="absolute inset-x-1 bottom-1 pointer-events-none">
          <div className="mx-auto w-full rounded-xl bg-white/80 text-slate-900 backdrop-blur-sm border border-white/30 shadow px-1 py-1">
            <span className="block text-center text-[10px] sm:text-sm font-medium leading-tight">
              {label}
            </span>
          </div>
        </div>
      </Frame>
    </div>
  );
}

export default function Showcase() {
  // Квадратные работы (1:1)
  const items = [
    { before: "/works/01_before.jpg",  after: "/works/01_after.jpg",  label: "Цвет вместо ч/б" },
    { before: "/works/02_before.jpg",  after: "/works/02_after.jpg",  label: "Чётче и ярче · Повышение резкости и цвета" },
    { before: "/works/03_before.jpg",  after: "/works/03_after.jpg",  label: "Живая эмоция · Естественная улыбка и движение" },
    { before: "/works/04_before.jpg",  after: "/works/04_after.jpg",  label: "Реставрация снимка · Удаление царапин и артефактов" },
    { before: "/works/05_before.jpg",  after: "/works/05_after.jpg",  label: "Две фотографии — до/после" },
    { before: "/works/011_before.jpg", after: "/works/011_after.jpg", label: "Реставрация снимка · Удаление царапин и артефактов" },
  ];

  // Вертикальные 9:16 (всегда с постером!)
  const vertical = [
    {
      before: "/works/talk_before.jpg",
      after:  "/works/talk_after.jpg",
      afterVideo:  "/works/talk_after.mp4",
      afterPoster: "/works/talk_after_poster.jpg",
      label: "Говорит · Анимация лица",
    },
    {
      before: "/works/06_before.jpg",
      after:  "/works/06_after.jpg",
      afterVideo:  "/works/06_after.mp4",
      afterPoster: "/works/06_after_poster.jpg",
      label: "Поёт · Синхронизация губ",
    },
  ];

  return (
    <section id="showcase" className="reveal">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Память оживает</h2>
      <p className="text-center text-slate-600 mb-6">Подборка готовых работ — тоже в формате До/После.</p>

      {/* Мобилка: 2 колонки; ПК: 2 колонки — компактно и быстро */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {items.map((it, i) => <Slider key={`i${i}`} {...it} ratio="1:1" />)}
        {vertical.map((it, i) => <Slider key={`v${i}`} {...it} ratio="9:16" />)}
      </div>
    </section>
  );
}
