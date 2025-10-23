export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aimemories.ru"),
  title: "AI Memories — оживляю фото в трогательное видео",
  description: "Оживлю ваши фото и соберу трогательное видео-историю. Бесплатный тест — «Оживить фото».",
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI Memories — оживляю фото в трогательное видео",
    description: "Оживлю ваши фото и соберу трогательное видео-историю. Бесплатный тест — «Оживить фото».",
    url: "/",
    siteName: "AI Memories",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Memories — оживляю фото",
    description: "Оживлю ваши фото и соберу трогательное видео-историю.",
    images: ["/opengraph-image.jpg"],
  },
};
