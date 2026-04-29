import { ImageResponse } from 'next/og';

export const alt = 'RacketUp — tenis i padel';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
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
          background: '#0A120E',
          color: '#E8F0EA',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '999px',
              background: '#C8FF5E',
            }}
          />
          <div style={{ display: 'flex', fontSize: '22px', color: '#8FA69A', letterSpacing: '4px' }}>
            RACKETUP
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '88px',
              fontWeight: 800,
              lineHeight: 1.04,
              color: '#E8F0EA',
            }}
          >
            Tenis i padel
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '88px',
              fontWeight: 800,
              lineHeight: 1.04,
              color: '#C8FF5E',
            }}
          >
            w Twoim mieście.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '32px',
              color: '#8FA69A',
              lineHeight: 1.3,
              marginTop: '8px',
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
          <div style={{ display: 'flex' }}>racketup.pl</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 26px',
              borderRadius: '999px',
              background: '#C8FF5E',
              color: '#0B1A10',
              fontSize: '24px',
              fontWeight: 700,
            }}
          >
            Najpierw Szczecin →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
