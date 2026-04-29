import { redirect } from 'next/navigation';

// `/` is a temporary redirect (307) to /szczecin — Szczecin is the founder city
// and home base. When Warszawa goes LIVE, this can flip to a real city hub
// in a single commit without SEO/cache fallout (308 would lock browsers in).
export default function Home() {
  redirect('/szczecin');
}
