// app/page.jsx
"use client";

import { useEffect, useState } from "react";

// Фон/вход
import BackgroundFX from "../components/BackgroundFX";
import EntryOverlay from "../components/EntryOverlay";
import LogoNeon from "../components/LogoNeon";

// Герой-до/после (ДО — фото, ПОСЛЕ — постер/видео)
import BeforeAfterHero from "../components/BeforeAfterHero";

// Галерея работ (в неё мы передадим +1 работу реставрации)
import Showcase from "../components/Showcase";

// Два вертикальных ролика (мобайл)
import TwoWorksVideo from "../components/TwoWorksVideo";

// Плееры с треками
import Songs from "../components/Songs";

// Кнопка WhatsApp (с твоим номером)
import WhatsAppButton from "../components/WhatsAppButton";

// Если используешь эти секции — раскомментируй импорты и JSX ниже
 import Stats from "../components/Stats";
import Scenes from "../components/Scenes";
 import VideoTestimonials from "../components/VideoTestimonials";
 import Calculator from "../components/Calculator";
import Pricing from "../components/Pricing";
 import TestimonialsText from "../components/TestimonialsText";
 import HowToOrder from "../components/HowToOrder";
import FAQ from "../components/FAQ";
import BrandLogo from "../components/BrandLogo";
export default function Page() {
  const [entered, setEntered] = useState(false);

  // плавное появление секций (класс .reveal → .show)
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.2 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // треки для блока «Песня на заказ и примеры»
  const tracks = [
    { title: "Ромашковая любовь", src: "/songs/song1.mp3" },
    { title: "Светлые дни",        src: "/songs/song2.mp3" },
    { title: "Дорога домой",       src: "/songs/song3.mp3" },
  ];

  // +1 работа для витрины «Память оживает»
  const extraShowcaseItems = [
    {
      before: "/works/restore2_before.jpg",
      after:  "/works/restore2_after.jpg",
      label:  "Реставрация (доп.) · Удаление шумов/царапин",
    },
    
    // вертикальные примеры 9:16 внутри той же сетки
    {
      before: "/works/talk_before.jpg",
      after:  "/works/talk_after.jpg",
      afterVideo: "/works/talk_after.mp4",
      label: "Говорит · Анимация лица (вертикально)",
      aspectClass: "aspect-[9/16]",
    },
    {
      before: "/works/sing_before.jpg",
      after:  "/works/sing_after.jpg",
      afterVideo: "/works/sing_after.mp4", // если видео не найдено — покажется картинка «После»
      label: "Поёт · Синхронизация губ (вертикально)",
      aspectClass: "aspect-[9/16]",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <BackgroundFX />

      {/* звук при входе: положи файл /public/songs/enter.mp3 */}
      {!entered && (
        <EntryOverlay
          audioSrc="/songs/enter.mp3"
          onEnter={() => setEntered(true)}
        />
      )}

      <section className="container py-16 space-y-16">
        {/* Шапка */}
        <header className="text-center reveal">
          <BrandLogo size={160} withWordmark />

          <p className="text-slate-700 mt-4 max-w-2xl mx-auto">
            Оживлю ваши фото и соберу трогательное видео-историю. Бесплатный тест — «Оживить фото».
          </p>
          <div className="mt-6 flex gap-3 justify-center flex-wrap">
            <WhatsAppButton />{/* использует твой номер из lib/whatsapp */}
            <a className="btn-ghost" href="/animate">
              Оживить фото бесплатно
            </a>
          </div>
        </header>

        {/* Большой ДО/ПОСЛЕ в герое (ДО — фото, ПОСЛЕ — видео) */}
        <div className="mx-auto mt-8 w-full max-w-6xl">
          <BeforeAfterHero
            before="/works/hero_before.jpg"
            after="/works/hero_after.jpg"
            afterVideo="/works/hero_after.mp4"
            // aspectClass="aspect-square" // если нужен квадрат — раскомментируй
          />
        </div>

        {/* Витрина «Память оживает» + добавленные работы/вертикали */}
        <Showcase extraItems={extraShowcaseItems} />

        {/* ДВА ВЕРТИКАЛЬНЫХ РОЛИКА РЯДОМ — только на мобилке */}
        <div className="reveal md:hidden">
          <TwoWorksVideo />
        </div>

        {/* На ПК «оставить как было»: один большой 16:9 ролик (пример работы) */}
        <section className="reveal hidden md:block">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">
            Пример работы (полноэкранный)
          </h2>
          <div className="relative max-w-3xl mx-auto aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/30">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/works/videos/full_01.mp4"
              poster="/works/videos/full_01_poster.jpg"
              controls
              playsInline
            />
            <div className="absolute top-3 left-3 text-xs bg-white/10 backdrop-blur px-2 py-1 rounded">
              AI Memories
            </div>
          </div>
        </section>

        {/* Песни — передаём список, чтобы не искались старые пути /sounds/... */}
        <Songs tracks={tracks} />

        {/* Если используешь остальные блоки — раскомментируй ниже */}
      
        <Stats />
        <Scenes />
      
        <Calculator />
        <Pricing />
        <TestimonialsText />
        <HowToOrder />
        <FAQ />
       

        <footer className="text-slate-600 reveal pt-8 pb-16 text-center">
          <p>
            Почта:{" "}
            <a className="text-sky-700" href="mailto:info@aimemories.ru">
              info@aimemories.ru
            </a>
          </p>
          <p>
            WhatsApp:{" "}
            <a className="text-sky-700" href="https://wa.me/79841933792">
              +7 984 193-37-92
            </a>
          </p>
          <p className="mt-2 text-xs">© {new Date().getFullYear()} AI Memories</p>
        </footer>
      </section>
    </div>
  );
}
