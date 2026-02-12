const DRAW_API_URL = 'https://macaumarksix.com/api/macaujc2.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const normalizeDraw = (raw) => {
  if (!raw || typeof raw !== 'object') return null;

  const expect = String(raw.expect || '').trim();
  const openCode = String(raw.openCode || '').trim();
  const numbers = openCode
    .split(',')
    .map((item) => Number(item.trim()))
    .filter((n) => Number.isInteger(n) && n >= 1 && n <= 49);

  return {
    expect,
    openCode,
    numbers,
    openTime: raw.openTime || null
  };
};

export async function onRequest(context) {
  const { request } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const res = await fetch(DRAW_API_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `Upstream error: ${res.status}` }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const payload = await res.json();
    const first = Array.isArray(payload) ? payload[0] : payload;
    const draw = normalizeDraw(first);

    if (!draw) {
      return new Response(JSON.stringify({ error: 'Invalid upstream payload' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(draw), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
