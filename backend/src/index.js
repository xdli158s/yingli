
export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            // 1. Get Bets (List)
            if (path === '/api/bets' && request.method === 'GET') {
                const period = url.searchParams.get('period');
                let query = 'SELECT * FROM betting_records';
                let params = [];

                if (period) {
                    query += ' WHERE period = ?';
                    params.push(period);
                }

                query += ' ORDER BY created_at DESC';

                const { results } = await env.DB.prepare(query).bind(...params).all();
                // Parse JSON fields
                const bets = results.map(bet => ({
                    ...bet,
                    betNumbers: JSON.parse(bet.bet_numbers), // Convert DB snake_case to app camelCase if needed, but here simple parse
                    winNumbers: bet.win_numbers ? JSON.parse(bet.win_numbers) : [],
                    hasWin: !!bet.has_win
                }));

                return new Response(JSON.stringify(bets), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }

            // 2. Create Bet
            if (path === '/api/bets' && request.method === 'POST') {
                const body = await request.json();
                // Body: { period, playerName, betType, betNumbers: [], betAmountPerNumber, totalAmount }

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

            // 3. Get Draw History
            if (path === '/api/history' && request.method === 'GET') {
                const { results } = await env.DB.prepare('SELECT * FROM draw_history ORDER BY period DESC').all();
                const history = results.map(row => ({
                    ...row,
                    drawNumbers: JSON.parse(row.draw_numbers)
                }));
                return new Response(JSON.stringify(history), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }

            // 4. Settle / Save Draw Result
            if (path === '/api/settle' && request.method === 'POST') {
                const body = await request.json();
                // Body: { period, drawNumbers: [], specialNumber, totalBets, totalBetAmount, winCount, totalPayout, profit }

                const stmt = env.DB.prepare(`
          INSERT OR REPLACE INTO draw_history 
          (period, draw_numbers, special_number, total_bets, total_bet_amount, win_count, total_payout, profit)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

                await stmt.bind(
                    body.period,
                    JSON.stringify(body.drawNumbers),
                    body.specialNumber,
                    body.totalBets,
                    body.totalBetAmount,
                    body.winCount,
                    body.totalPayout,
                    body.profit
                ).run();

                return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
            }

            return new Response('Not Found', { status: 404, headers: corsHeaders });

        } catch (e) {
            return new Response(e.message, { status: 500, headers: corsHeaders });
        }
    }
};
