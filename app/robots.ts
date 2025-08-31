import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/static/", "/admin/", "/*.json"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/static/"],
      }
    ],
    sitemap: "https://nyxui.com/sitemap.xml",
    host: "https://nyxui.com/",
  };
}