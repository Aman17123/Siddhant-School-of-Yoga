import { site } from "@/data/siteData";
import { L } from "@/data/why-us/links";
import { onlineCourses } from "@/data/onlineCourses";

const WHY_US_KEYS = [
  "hub", "ashram", "pranayama", "groupSize", "curriculum", "growth", "professional",
  "attention", "knowledge", "asana", "schedule", "community", "intensive", "mantras",
  "nidra", "methodology", "practicum", "certification", "koshas", "gratitude",
];

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/#about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/#courses`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/#kundalini`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/#retreats`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${site.url}/#founder`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.url}/#teachers`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.url}/#residential`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.url}/#testimonials`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${site.url}/#faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${site.url}/payment`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...WHY_US_KEYS.map((key) => ({
      url: `${site.url}${L[key]}`,
      lastModified,
      changeFrequency: "monthly",
      priority: key === "hub" ? 0.8 : 0.7,
    })),
    ...onlineCourses.map((c) => ({
      url: `${site.url}${c.href}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
