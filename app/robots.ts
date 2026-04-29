import type { MetadataRoute } from 'next';

const BASE_URL = 'https://racketmatch.pl';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/privacy'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
