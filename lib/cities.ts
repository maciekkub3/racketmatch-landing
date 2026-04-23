export type CityStatus = 'live' | 'filling' | 'dormant';

export interface City {
  id: string;
  name: string;
  x: number; // SVG coord, viewBox 0 0 500 450
  y: number;
  status: CityStatus;
  signups: number;
  threshold: number;
}

export const cities: City[] = [
  { id: 'szczecin',    name: 'Szczecin',      x: 27,  y: 109, status: 'live',    signups: 200, threshold: 200 },
  { id: 'warszawa',    name: 'Warszawa',       x: 345, y: 201, status: 'filling', signups: 147, threshold: 200 },
  { id: 'poznan',      name: 'Poznań',         x: 144, y: 188, status: 'filling', signups: 112, threshold: 200 },
  { id: 'krakow',      name: 'Kraków',         x: 293, y: 368, status: 'filling', signups: 89,  threshold: 200 },
  { id: 'gdansk',      name: 'Gdańsk',         x: 229, y: 38,  status: 'filling', signups: 78,  threshold: 200 },
  { id: 'wroclaw',     name: 'Wrocław',        x: 150, y: 288, status: 'filling', signups: 43,  threshold: 200 },
  { id: 'lodz',        name: 'Łódź',           x: 269, y: 237, status: 'dormant', signups: 34,  threshold: 200 },
  { id: 'gdynia',      name: 'Gdynia',         x: 222, y: 24,  status: 'dormant', signups: 17,  threshold: 200 },
  { id: 'bydgoszcz',   name: 'Bydgoszcz',      x: 197, y: 133, status: 'dormant', signups: 19,  threshold: 200 },
  { id: 'bialystok',   name: 'Białystok',      x: 451, y: 132, status: 'dormant', signups: 15,  threshold: 200 },
  { id: 'olsztyn',     name: 'Olsztyn',        x: 319, y: 83,  status: 'dormant', signups: 13,  threshold: 200 },
  { id: 'radom',       name: 'Radom',          x: 352, y: 265, status: 'dormant', signups: 14,  threshold: 200 },
  { id: 'torun',       name: 'Toruń',          x: 228, y: 141, status: 'dormant', signups: 11,  threshold: 200 },
  { id: 'lublin',      name: 'Lublin',         x: 422, y: 277, status: 'dormant', signups: 12,  threshold: 200 },
  { id: 'kielce',      name: 'Kielce',         x: 327, y: 307, status: 'dormant', signups: 9,   threshold: 200 },
  { id: 'katowice',    name: 'Katowice',       x: 247, y: 353, status: 'dormant', signups: 8,   threshold: 200 },
  { id: 'opole',       name: 'Opole',          x: 193, y: 322, status: 'dormant', signups: 5,   threshold: 200 },
  { id: 'rzeszow',     name: 'Rzeszów',        x: 394, y: 370, status: 'dormant', signups: 7,   threshold: 200 },
  { id: 'czestochowa', name: 'Częstochowa',    x: 252, y: 311, status: 'dormant', signups: 6,   threshold: 200 },
  { id: 'zielona-gora',name: 'Zielona Góra',   x: 74,  y: 224, status: 'dormant', signups: 3,   threshold: 200 },
];

export const totalSignups = cities.reduce((acc, c) => acc + c.signups, 0);
export const totalCities = cities.length;
