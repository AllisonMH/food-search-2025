-- Migration 002: Seed Counties Data
-- Populates the counties table with Atlanta metro counties

INSERT INTO counties (name) VALUES
  ('Fulton'),
  ('DeKalb'),
  ('Cobb'),
  ('Gwinnett'),
  ('Clayton'),
  ('Cherokee'),
  ('Paulding'),
  ('Henry'),
  ('Douglas')
ON CONFLICT (name) DO NOTHING;

-- Verify insert
SELECT * FROM counties ORDER BY name;
