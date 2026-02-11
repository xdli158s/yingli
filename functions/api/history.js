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

    try {
        if (request.method === 'GET') {
            const { results } = await env.DB.prepare('SELECT * FROM draw_history ORDER BY period DESC').all();
            const history = results.map(row => ({
                period: row.period,
                drawNumbers: JSON.parse(row.draw_numbers),
                specialNumber: row.special_number,
                totalBets: row.total_bets,
                totalBetAmount: row.total_bet_amount,
                winCount: row.win_count,
                totalPayout: row.total_payout,
                profit: row.profit,
                drawTime: row.draw_time
            }));
            return new Response(JSON.stringify(history), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
    }

    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
}
