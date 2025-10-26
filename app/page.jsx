"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

import BackgroundFX from "../components/BackgroundFX";
import EntryOverlay from "../components/EntryOverlay";
import BeforeAfterHero from "../components/BeforeAfterHero";
import Showcase from "../components/Showcase";
import TwoWorksVideo from "../components/TwoWorksVideo";
import Songs from "../components/Songs";
import WhatsAppButton from "../components/WhatsAppButton";

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

  // Анимация появления секций (.reveal -> .show)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("show"));
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Примеры песен (файлы в /public/songs)
  const tracks = [
    { title: "Ромашковая любовь", src: "/songs/song1.mp3" },
    { title: "Светлые дни", src: "/songs/song2.mp3" },
    { title: "Дорога домой", src: "/songs/song3.mp3" },
  ];

  // Дополнительные карточки для витрины «Память оживает» (включая вертикальные 9:16 с видео)
  const extraShowcaseItems = [
    {
      before: "/works/restore2_before.jpg",
      after: "/works/restore2_after.jpg",
      label: "Реставрация (доп.) · Удаление шумов/царапин",
    },
    {
      before: "/works/talk_before.jpg",
      after: "/works/talk_after.jpg",
      afterVideo: "/works/talk_after.mp4",
      label: "Говорит · Анимация лица (вертикально)",
      aspectClass: "aspect-[9/16]",
    },
    {
      before: "/works/sing_before.jpg",
      after: "/works/sing_after.jpg",
      afterVideo: "/works/sing_after.mp4",
      label: "Поёт · Синхронизация губ (вертикально)",
      aspectClass: "aspect-[9/16]",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <BackgroundFX />

      {/* Звук при входе (файл положи в /public/songs/enter.mp3) */}
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
            <WhatsAppButton />
            <a className="btn-ghost" href="/animate">Оживить фото бесплатно</a>
          </div>
        </header>

        {/* Герой: До/После (До — фото, После — видео) */}
        <div className="mx-auto mt-8 w-full max-w-6xl">
          <BeforeAfterHero
            before="/works/hero_before.jpg"
            after="/works/hero_after.jpg"
            afterVideo="/works/hero_after.mp4"
          />
        </div>

        {/* Память оживает (карточки + добавленные вертикали) */}
        <Showcase extraItems={extraShowcaseItems} />

        {/* Мобильная адаптация: два вертикальных ролика рядом (отзыв + пример) */}
        <div className="reveal md:hidden" aria-hidden={false}>
  <TwoWorksVideo />
</div>

{/* ПК версия: один большой вертикальный ролик 9:16 */}
<section className="reveal hidden md:block">
  <h2 className="text-3xl md:text-4xl font-semibold text-center mb-2">
    Пример работы 
  </h2>

  {/* Центрируем и ограничиваем размеры, чтобы не «выпрыгивало» за экран */}
  <div className="relative mx-auto aspect-[9/16] w-full max-w-[280px] max-h-[70vh] rounded-3xl overflow-hidden border border-white/10 bg-black/30">
    <video
      className="absolute inset-0 w-full h-full object-contain bg-black"
      src="/works/videos/review_01.mp4"
      poster="/works/videos/review_01_poster.jpg"
      controls
      playsInline
    />
    <div className="absolute top-3 left-3 text-xs bg-white/10 backdrop-blur px-2 py-1 rounded">
      AI Memories
    </div>
  </div>
</section>


        {/* Блок с песнями (демо-треки) */}
        <Songs tracks={tracks} />

        {/* Остальные секции (как у тебя были) */}
        <Stats />
        <Scenes />
        <VideoTestimonials />
        <Calculator />
        <Pricing />
        <TestimonialsText />
        <HowToOrder />
        <FAQ />

        {/* Подвал */}
        <footer className="text-slate-600 reveal pt-8 pb-16 text-center">
          <p>
            Почта: <a className="text-sky-700" href="mailto:info@aimemories.ru">info@aimemories.ru</a>
          </p>
          <p>
            WhatsApp: <a className="text-sky-700" href="https://wa.me/79841933792">+7 984 193-37-92</a>
          </p>
          <p className="mt-2 text-xs">© {new Date().getFullYear()} AI Memories</p>
        </footer>
      </section>
    </div>
  );
}
