export type CityStatus = 'primary' | 'secondary';

export interface City {
  slug: string;
  name: string;
  locative: string;
  status: CityStatus;
  /** Shown in HowItWorks AFTER mock — the "where" line of the matched game */
  venueExample: string;
  /** ProductHub Korty card description — what venues we connect to in this city */
  venueDesc: string;
  /** ProductHub Korty card metadata badge */
  venueMeta: string;
}

export const cities: City[] = [
  {
    slug: 'szczecin',
    name: 'Szczecin',
    locative: 'w Szczecinie',
    status: 'primary',
    venueExample: 'Twój klub · Kort 3',
    venueDesc: 'Korty tenisowe i padlowe w Szczecinie — dostępność i rezerwacja w jednym flow.',
    venueMeta: 'Tenis + padel',
  },
  {
    slug: 'warszawa',
    name: 'Warszawa',
    locative: 'w Warszawie',
    status: 'secondary',
    venueExample: 'Twój klub · Kort 3',
    venueDesc: 'Korty w Warszawie. Dostępność i rezerwacja w jednym flow — wkrótce.',
    venueMeta: 'Wkrótce',
  },
  {
    slug: 'poznan',
    name: 'Poznań',
    locative: 'w Poznaniu',
    status: 'secondary',
    venueExample: 'Twój klub · Kort 3',
    venueDesc: 'Korty w Poznaniu. Dostępność i rezerwacja w jednym flow — wkrótce.',
    venueMeta: 'Wkrótce',
  },
  {
    slug: 'krakow',
    name: 'Kraków',
    locative: 'w Krakowie',
    status: 'secondary',
    venueExample: 'Twój klub · Kort 3',
    venueDesc: 'Korty w Krakowie. Dostępność i rezerwacja w jednym flow — wkrótce.',
    venueMeta: 'Wkrótce',
  },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
