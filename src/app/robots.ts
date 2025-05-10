import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/static/"],
    },
    sitemap: "https://nuvyxui.vercel.app/sitemap.xml",
    host: "https://nuvyxui.vercel.app",
  };
}
