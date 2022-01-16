/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    storyblokAcessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
    storyblokPreviewToken: process.env.STORYBLOK_PREVIEW_TOKEN,
    storyblokPreviewSecret: process.env.STORYBLOK_PREVIEW_SECRET,
  },
  i18n: {
    locales: ["en", "fr", "zh"],
    defaultLocale: "en",
  },
  images: {
    domains: ["a.storyblok.com"],
  },
};
