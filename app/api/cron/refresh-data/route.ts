// Weekly cron entry point. Triggered by Vercel cron defined in vercel.json.
// For now this is a stub. When data sources (Numbeo, REST Countries, Speedtest)
// are wired, this route fetches them, writes data/*.json, and commits via the
// GitHub API to trigger a Vercel rebuild.

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(req: Request) {
  const auth = req.headers.get('Authorization');
  const expected = process.env.CRON_SECRET;
  if (!expected || auth !== `Bearer ${expected}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  return Response.json({
    ok: true,
    message: 'cron stub: wire data sources in lib/data/refresh.ts',
    timestamp: new Date().toISOString(),
  });
}
