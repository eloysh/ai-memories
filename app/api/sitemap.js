export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://aimemories.ru";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/animate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
