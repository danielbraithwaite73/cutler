-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255),
  emoji VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
