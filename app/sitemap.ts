import type { MetadataRoute } from 'next';
import { cities } from '@/lib/cities';

const BASE_URL = 'https://racketmatch.pl';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...cities.map((city) => ({
      url: `${BASE_URL}/${city.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: city.status === 'primary' ? 0.9 : 0.7,
    })),
  ];
}
