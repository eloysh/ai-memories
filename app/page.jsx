"use client";
import { useEffect, useState } from "react";
import BackgroundFX from "../components/BackgroundFX";
import EntryOverlay from "../components/EntryOverlay";
import LogoNeon from "../components/LogoNeon";
// import BeforeAfter from "../components/BeforeAfter";
import Stats from "../components/Stats";
import Calculator from "../components/Calculator";
import Pricing from "../components/Pricing";
import TestimonialsText from "../components/TestimonialsText";
import HowToOrder from "../components/HowToOrder";
import FAQ from "../components/FAQ";
import Showcase from "../components/Showcase";
import Scenes from "../components/Scenes";
import VideoTestimonials from "../components/VideoTestimonials";
import Songs from "../components/Songs";
import BeforeAfterHero from "../components/BeforeAfterHero";
import WhatsAppButton from "../components/WhatsAppButton";


export default function Page() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
      { threshold: 0.2 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen">
      <BackgroundFX />
      {/* если нет файла /public/sounds/enter.mp3 — оставьте audioSrc={null} */}
      {!entered && <EntryOverlay audioSrc={null} onEnter={() => setEntered(true)} />}

      <section className="container py-16 space-y-16">
        <header className="text-center reveal">
          <LogoNeon size={180} subtitle={true} />
          <p className="text-slate-700 mt-4 max-w-2xl mx-auto">
            Оживлю ваши фото и соберу трогательное видео-историю. Бесплатный тест — «Оживить фото».
          </p>

          <div className="mt-6 flex gap-3 justify-center">
            <WhatsAppButton
              className="btn-primary"
              message={"Здравствуйте! Хочу оживить фото. Пришлите, пожалуйста, детали."}
            >
              Написать в WhatsApp
            </WhatsAppButton>

            <a className="btn-ghost" href="/animate">Оживить фото бесплатно</a>
          </div>
        </header>

        {/* Большой До/После: ДО — фото, ПОСЛЕ — видео */}
        <div className="mx-auto mt-8 w-full max-w-6xl">
          <BeforeAfterHero
            before="/works/hero_before.jpg"
            after="/works/hero_after.jpg"
            afterVideo="/works/hero_after.mp4"
          />
          {/* Для 1:1: <BeforeAfterHero ... aspectClass="aspect-square" /> */}
        </div>

        {/* <BeforeAfter /> */}
        <Stats />
        <Showcase />
        <Scenes />
        <VideoTestimonials />
        <Songs />
        <Calculator />

        <Pricing />
        <TestimonialsText />
        <HowToOrder />
        <FAQ />

        <footer className="text-slate-600 reveal pt-8 pb-16">
          <p>
            Почта:{" "}
            <a className="text-sky-700" href="mailto:info@aimemories.ru">info@aimemories.ru</a>
          </p>
          <p>
            WhatsApp:{" "}
            <a className="text-sky-700" href="https://wa.me/79841933792">+7 984 193-37-92</a>
          </p>
          <p className="mt-2 text-xs">© {new Date().getFullYear()} AI Memories</p>
        </footer>
      </section>
    </div>
  );
}
