export async function onRequest(context) {
    const { request, env } = context;
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    const normalizePeriod = (value) => {
        const digits = String(value || '').replace(/\D/g, '');
        if (!digits) return '';
        return digits.length >= 7 ? digits.slice(0, 7) : digits;
    };

    try {
        if (request.method === 'POST') {
            const body = await request.json();
            // Expected body: { period, drawNumbers, specialNumber, totalBets, totalBetAmount, winCount, totalPayout, profit }
            const totalBets = Number(body.totalBets || 0);
            const period = normalizePeriod(body.period);

            if (totalBets <= 0) {
                return new Response(JSON.stringify({ success: true, skipped: true, reason: 'no-orders' }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }

            const stmt = env.DB.prepare(`
                INSERT OR REPLACE INTO draw_history 
                (period, draw_numbers, special_number, total_bets, total_bet_amount, win_count, total_payout, profit)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `);

            await stmt.bind(
                period,
                JSON.stringify(body.drawNumbers),
                body.specialNumber,
                totalBets,
                body.totalBetAmount,
                body.winCount,
                body.totalPayout,
                body.profit
            ).run();

            return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
    }

    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
}
