-- Run this if your users table was created before username/emoji existed
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS emoji VARCHAR(20);

-- Backfill existing rows (adjust if you have different data)
UPDATE users SET name = 'Maya Johnson', username = 'VelociMaya', emoji = '🦕' WHERE id = 1;
UPDATE users SET name = 'Liam Chen', username = 'TriceraLiam', emoji = '🦖' WHERE id = 2;
UPDATE users SET name = 'Sofia Ramirez', username = 'StegoSofia', emoji = '🦴' WHERE id = 3;
UPDATE users SET name = 'Noah Williams', username = 'RexNoah', emoji = '🌋' WHERE id = 4;
