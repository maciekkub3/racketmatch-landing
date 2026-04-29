import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase';

const schema = z.object({
  email: z.email().max(254),
  city: z.string().min(1).max(50),
  sport: z.enum(['tenis', 'padel', 'oba']).optional(),
  level: z.enum(['poczatkujacy', 'sredni', 'zaawansowany']).optional(),
  _honey: z.string().optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'validation_failed' }, { status: 400 });
  }

  const { email, city, sport, level, _honey } = parsed.data;

  if (_honey && _honey.length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const supabase = getSupabaseAdmin();

  const isComplete = Boolean(sport && level);

  const { error } = isComplete
    ? await supabase
        .from('waitlist')
        .upsert(
          { email: normalizedEmail, city, sport, level, consent: true },
          { onConflict: 'email' }
        )
    : await supabase
        .from('waitlist')
        .upsert(
          { email: normalizedEmail, city, consent: true },
          { onConflict: 'email', ignoreDuplicates: true }
        );

  if (error) {
    console.error('[waitlist] supabase error', { code: error.code, message: error.message });
    return Response.json({ error: 'server_error' }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 200 });
}
