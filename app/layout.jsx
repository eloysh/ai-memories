export const metadata = {
  title: "AI Memories — оживляю фото в трогательное видео",
  description: "Бесплатная пробная анимация, расчёт в WhatsApp. Подарок для родных.",
  openGraph: { title: "AI Memories", images: ["/og.png"] },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/icon-192.png" }
};
import "./globals.css";

export default function RootLayout({ children }){
  return (
    <html lang="ru">
      <body>
        <div id="app">{children}</div>
      </body>
    </html>
  );
}
