-- Seed users table with 4 campers
INSERT INTO users (email, name, username, emoji)
VALUES
  ('maya@example.com', 'Maya Johnson', 'VelociMaya', '🦕'),
  ('liam@example.com', 'Liam Chen', 'TriceraLiam', '🦖'),
  ('sofia@example.com', 'Sofia Ramirez', 'StegoSofia', '🦴'),
  ('noah@example.com', 'Noah Williams', 'RexNoah', '🌋')
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  username = EXCLUDED.username,
  emoji = EXCLUDED.emoji;
