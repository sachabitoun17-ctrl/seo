// Weekly cron entry point. On Cloudflare Pages, this runs as an edge
// function. Triggered by GitHub Actions weekly which posts a Bearer
// token to this endpoint. When data sources (Numbeo, REST Countries,
// Speedtest) are wired, this route fetches them, writes data/*.json,
// and commits via the GitHub API to trigger a Pages rebuild.

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

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
