// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Если где-то используешь <Image>, но нет внешних доменов:
  images: { unoptimized: true },
};
export default nextConfig;
