export type CityStatus = 'primary' | 'secondary';

export interface City {
  slug: string;
  name: string;
  locative: string;
  status: CityStatus;
}

export const cities: City[] = [
  { slug: 'szczecin', name: 'Szczecin', locative: 'w Szczecinie', status: 'primary' },
  { slug: 'warszawa', name: 'Warszawa', locative: 'w Warszawie', status: 'secondary' },
  { slug: 'poznan',   name: 'Poznań',   locative: 'w Poznaniu',  status: 'secondary' },
  { slug: 'krakow',   name: 'Kraków',   locative: 'w Krakowie',  status: 'secondary' },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
