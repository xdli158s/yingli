export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        // GET /api/bets?period=...
        if (request.method === 'GET') {
            const period = url.searchParams.get('period');
            let query = 'SELECT * FROM betting_records';
            let params = [];

            if (period) {
                query += ' WHERE period = ?';
                params.push(period);
            }

            query += ' ORDER BY created_at DESC';

            const { results } = await env.DB.prepare(query).bind(...params).all();

            const bets = results.map(bet => ({
                id: bet.id,
                orderId: `${String(bet.period || '').replace(/\D/g, '')}-${bet.id}`,
                period: bet.period,
                player: bet.player_name,  // DB: player_name -> API: player (or check frontend needs)
                playerName: bet.player_name, // redundant but safe
                type: bet.bet_type,
                betType: bet.bet_type,
                betNumbers: JSON.parse(bet.bet_numbers),
                betAmountPerNumber: bet.bet_amount_per_number,
                totalAmount: bet.total_amount,
                winNumbers: bet.win_numbers ? JSON.parse(bet.win_numbers) : [],
                hasWin: !!bet.has_win,
                timestamp: bet.created_at
            }));

            return new Response(JSON.stringify(bets), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // POST /api/bets
        if (request.method === 'POST') {
            const body = await request.json();
            // Expected body: { period, playerName, betType, betNumbers, betAmountPerNumber, totalAmount }

            const stmt = env.DB.prepare(`
                INSERT INTO betting_records 
                (period, player_name, bet_type, bet_numbers, bet_amount_per_number, total_amount) 
                VALUES (?, ?, ?, ?, ?, ?)
            `);

            const info = await stmt.bind(
                body.period,
                body.playerName,
                body.betType,
                JSON.stringify(body.betNumbers),
                body.betAmountPerNumber,
                body.totalAmount
            ).run();

            return new Response(JSON.stringify({ success: true, id: info.meta.last_row_id }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 201
            });
        }

    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
    }

    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
}
