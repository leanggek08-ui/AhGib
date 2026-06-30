CREATE TABLE test_users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);