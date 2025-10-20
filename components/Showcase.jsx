"use client";
import { useEffect, useRef, useState } from "react";

/* Картинка с фолбэком — если файла нет, подставит демо */
function ImgFallback({ src, alt, fallback, className }) {
  const [s, setS] = useState(src);
  return (
    <img
      src={s}
      alt={alt}
      className={className}
      onError={() => fallback && setS(fallback)}
      draggable={false}
    />
  );
}

function Slider({ before, after, afterVideo = null, label, fbBefore, fbAfter }) {
  const [x, setX] = useState(50); // позиция слайдера в %
  const [videoError, setVideoError] = useState(false);
  const boxRef = useRef(null);

  // Перетаскивание по самому превью (мышь/тач)
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

  return (
    <div
      ref={boxRef}
      className="relative aspect-square rounded-3xl overflow-hidden border border-slate-200 bg-white select-none"
    >
      {/* BEFORE */}
      <ImgFallback
        src={before}
        fallback={fbBefore || "/demo_before_bw.jpg"}
        alt="До"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* AFTER — обрезаем по текущему x */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
        {afterVideo && !videoError ? (
          <video
            className="w-full h-full object-cover object-center"
            src={afterVideo}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
          />
        ) : (
          <ImgFallback
            src={after}
            fallback={fbAfter || "/demo_after_color.jpg"}
            alt="После"
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* Вертикальная линия разделения */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 shadow"
        style={{ left: `${x}%`, transform: "translateX(-0.5px)" }}
        aria-hidden="true"
      />

      {/* Индикатор ⇆, движется с ползунком */}
      <div className="absolute top-1/2 -translate-y-1/2" style={{ left: `${x}%` }}>
        <div
          className="-translate-x-1/2 p-2 rounded-full bg-blue-500 text-white text-xs shadow"
          aria-hidden="true"
        >
          ⇆
        </div>
      </div>

      {/* Ползунок */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2/3">
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

      {/* Подпись */}
      <div className="absolute top-3 left-3 bg-white/90 rounded px-2 py-1 text-sm text-slate-700">
        {label}
      </div>
    </div>
  );
}

export default function Showcase() {
  // Положите свои файлы в /public/works/.
  // Если какого-то файла нет — автоматически подставятся демо изображения.
  const items = [
    { before: "/works/01_before.jpg", after: "/works/01_after.jpg", label: "Цвет вместо ч/б", fbBefore: "/demo_before_bw.jpg", fbAfter: "/demo_after_color.jpg" },
    { before: "/works/02_before.jpg", after: "/works/02_after.jpg", label: "Чётче и ярче · Повышение резкости и цвета", fbBefore: "/demo_before_soft.jpg", fbAfter: "/demo_after_sharp.jpg" },
    { before: "/works/03_before.jpg", after: "/works/03_after.jpg", label: "Живая эмоция · Естественная улыбка и движение", fbBefore: "/demo_before_emotion.jpg", fbAfter: "/demo_after_emotion.jpg" },
    { before: "/works/04_before.jpg", after: "/works/04_after.jpg", label: "Реставрация снимка · Удаление царапин и артефактов", fbBefore: "/demo_before_restore.jpg", fbAfter: "/demo_after_restore.jpg" },
    { before: "/works/05_before.jpg", after: "/works/05_after.jpg", label: "Две фотографии — до/после", fbBefore: "/demo_two_before.jpg", fbAfter: "/demo_two_after.jpg" },
    { before: "/works/06_before.jpg", after: "/works/06_after.jpg", afterVideo: "/works/06_after.mp4", label: "После — короткое видео (mp4)", fbBefore: "/demo_after_color.jpg", fbAfter: "/demo_after_color.jpg" },
  ];

  return (
    <section id="showcase" className="reveal">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">Память оживает</h2>
      <p className="text-center text-slate-600 mb-6">Подборка готовых работ — тоже в формате До/После.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
        {items.map((it, i) => (
          <Slider key={i} {...it} />
        ))}
      </div>
    </section>
  );
}
