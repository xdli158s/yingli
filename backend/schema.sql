
CREATE TABLE IF NOT EXISTS betting_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  period TEXT NOT NULL,
  player_name TEXT NOT NULL,
  bet_type TEXT NOT NULL,
  bet_numbers TEXT NOT NULL, -- JSON formatted array
  bet_amount_per_number REAL NOT NULL,
  total_amount REAL NOT NULL,
  win_numbers TEXT,
  has_win INTEGER DEFAULT 0,
  payout REAL DEFAULT 0,
  profit REAL DEFAULT 0,
  odds REAL DEFAULT 47.0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS draw_history (
  period TEXT PRIMARY KEY,
  draw_numbers TEXT NOT NULL, -- JSON formatted array e.g., '[1,2,3,4,5,6,7]'
  special_number INTEGER NOT NULL,
  draw_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  total_bets INTEGER DEFAULT 0,
  total_bet_amount REAL DEFAULT 0,
  win_count INTEGER DEFAULT 0,
  total_payout REAL DEFAULT 0,
  profit REAL DEFAULT 0
);
