import type { MetadataRoute } from "next";
import { allItems, categories } from "@/lib/catalog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/all-products", priority: 0.9 },
    { path: "/get-a-quote", priority: 0.9 },
    { path: "/hire-a-designer", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/our-team", priority: 0.5 },
    { path: "/contact", priority: 0.7 },
    { path: "/faqs", priority: 0.5 },
    { path: "/blog", priority: 0.4 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/terms-and-conditions", priority: 0.2 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...categories.map((category) => ({
      url: `${site.url}/category/${category.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...allItems.map((item) => ({
      url: `${site.url}/services/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}