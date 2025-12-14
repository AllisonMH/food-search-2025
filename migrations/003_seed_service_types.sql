-- Migration 003: Seed Service Types Data
-- Populates service_types table with all available service categories

-- Primary Food Services
INSERT INTO service_types (name, category) VALUES
  ('Food Pantry', 'Food Services'),
  ('Free Meals', 'Food Services'),
  ('Mobile Pantry', 'Food Services'),
  ('Emergency Food', 'Food Services'),
  ('Meal Delivery', 'Food Services'),
  ('Food Distribution', 'Food Services'),
  ('Fresh Produce', 'Food Services'),
  ('Grocery Delivery', 'Food Services'),
  ('Grocery Programs', 'Food Services'),
  ('Holiday Meals', 'Food Services'),
  ('Nutrition Support', 'Food Services')
ON CONFLICT (name) DO NOTHING;

-- Support Services
INSERT INTO service_types (name, category) VALUES
  ('Emergency Assistance', 'Support Services'),
  ('Emergency Services', 'Support Services'),
  ('Financial Assistance', 'Support Services'),
  ('Case Management', 'Support Services')
ON CONFLICT (name) DO NOTHING;

-- Housing Services
INSERT INTO service_types (name, category) VALUES
  ('Shelter', 'Housing Services'),
  ('Housing Support', 'Housing Services')
ON CONFLICT (name) DO NOTHING;

-- Health Services
INSERT INTO service_types (name, category) VALUES
  ('Healthcare', 'Health Services'),
  ('Pharmacy', 'Health Services')
ON CONFLICT (name) DO NOTHING;

-- Age-Specific Programs
INSERT INTO service_types (name, category) VALUES
  ('Senior Programs', 'Age-Specific Programs'),
  ('Senior Services', 'Age-Specific Programs'),
  ('Youth Programs', 'Age-Specific Programs'),
  ('After School Programs', 'Age-Specific Programs'),
  ('Childcare', 'Age-Specific Programs')
ON CONFLICT (name) DO NOTHING;

-- Education Services
INSERT INTO service_types (name, category) VALUES
  ('Education', 'Education Services'),
  ('English Classes', 'Education Services')
ON CONFLICT (name) DO NOTHING;

-- Material Assistance
INSERT INTO service_types (name, category) VALUES
  ('Clothing', 'Material Assistance'),
  ('Furniture Bank', 'Material Assistance'),
  ('Thrift Store', 'Material Assistance')
ON CONFLICT (name) DO NOTHING;

-- Community Services
INSERT INTO service_types (name, category) VALUES
  ('Community Resources', 'Community Services'),
  ('Community Support', 'Community Services'),
  ('Community Programs', 'Community Services'),
  ('Community Partnerships', 'Community Services'),
  ('Community Popups', 'Community Services'),
  ('Family Resources', 'Community Services'),
  ('Family Support', 'Community Services'),
  ('Home Visits', 'Community Services'),
  ('Student Support', 'Community Services')
ON CONFLICT (name) DO NOTHING;

-- Partnership Services
INSERT INTO service_types (name, category) VALUES
  ('Partner Network', 'Partnership Services'),
  ('Partner Agency Network', 'Partnership Services')
ON CONFLICT (name) DO NOTHING;

-- Verify insert
SELECT category, COUNT(*) as service_count
FROM service_types
GROUP BY category
ORDER BY category;
