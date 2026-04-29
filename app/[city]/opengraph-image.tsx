import { ImageResponse } from 'next/og';
import { getCityBySlug } from '@/lib/cities';

export const alt = 'RacketMatch — tenis i padel';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  const cityName = city?.name ?? 'Twoim mieście';
  const isPrimary = city?.status === 'primary';

  const ribbonText = isPrimary
    ? `${cityName} pierwszy →`
    : `Czekamy na 200 osób ${city?.locative ?? ''}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'linear-gradient(135deg, #0A120E 0%, #121C17 50%, #1A2620 100%)',
          color: '#E8F0EA',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: '20px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#8FA69A',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '999px',
              background: '#C8FF5E',
              boxShadow: '0 0 24px rgba(200, 255, 94, 0.6)',
            }}
          />
          RacketMatch · {cityName}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '92px',
              fontWeight: 800,
              letterSpacing: '-2px',
              lineHeight: 1.04,
              color: '#E8F0EA',
            }}
          >
            Tenis i padel
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '92px',
              fontWeight: 800,
              letterSpacing: '-2px',
              lineHeight: 1.04,
              color: '#C8FF5E',
            }}
          >
            {city?.locative ?? 'w Twoim mieście'}.
          </div>
          <div
            style={{
              fontSize: '32px',
              color: '#8FA69A',
              maxWidth: '900px',
              lineHeight: 1.3,
            }}
          >
            Apka która dobiera Ci partnera na Twoim poziomie.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '22px',
            color: '#5A6E64',
          }}
        >
          <div>racketmatch.pl/{slug}</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '999px',
              background: '#C8FF5E',
              color: '#0B1A10',
              fontSize: '22px',
              fontWeight: 700,
            }}
          >
            {ribbonText}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
