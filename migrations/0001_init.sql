-- 期数表
CREATE TABLE IF NOT EXISTS periods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  period_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'open',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  closed_at DATETIME,
  result_number INTEGER
);

-- 投注记录表
CREATE TABLE IF NOT EXISTS bets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  period_id INTEGER NOT NULL,
  player_name TEXT DEFAULT '匿名',
  bet_type TEXT NOT NULL,
  bet_value TEXT NOT NULL,
  amount REAL NOT NULL,
  odds REAL NOT NULL,
  equivalent_numbers TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (period_id) REFERENCES periods(id)
);

-- 特码统计视图（实时计算每个号码的投注情况）
CREATE INDEX idx_bets_period ON bets(period_id);
CREATE INDEX idx_periods_status ON periods(status);
