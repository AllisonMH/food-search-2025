-- Migration 004: Seed Food Resources Data (pure SQL, generated from src/data/foodResources.json)
-- Run AFTER 001_initial_schema.sql, 002_seed_counties.sql, 003_seed_service_types.sql
-- Safe to re-run: uses NOT EXISTS guards keyed on name+address so it will not duplicate rows.

BEGIN;

-- Atlanta Community Food Bank
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Atlanta Community Food Bank', '732 Joseph E Lowery Blvd NW', 'Atlanta', 'GA', '30318', c.id, 33.7629, -84.4283, '(404) 892-9822', 'https://www.acfb.org', 'Provides food assistance through a network of partner agencies. Main distribution center and resources.', 'Monday-Friday: 8:00 AM - 5:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Atlanta Community Food Bank' AND fr.address = '732 Joseph E Lowery Blvd NW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Atlanta Community Food Bank' AND fr.address = '732 Joseph E Lowery Blvd NW'
  AND st.name IN ('Food Pantry', 'Mobile Pantry', 'Partner Network')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- YMCA of Metro Atlanta - Hunger Relief
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'YMCA of Metro Atlanta - Hunger Relief', '100 Edgewood Ave NE', 'Atlanta', 'GA', '30303', c.id, 33.7548, -84.3856, '(404) 588-9622', 'https://www.ymcaatlanta.org/hunger-relief', 'Multiple locations offering free meals and food pantry services.', 'Varies by location'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'YMCA of Metro Atlanta - Hunger Relief' AND fr.address = '100 Edgewood Ave NE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'YMCA of Metro Atlanta - Hunger Relief' AND fr.address = '100 Edgewood Ave NE'
  AND st.name IN ('Free Meals', 'Food Pantry', 'Youth Programs')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- DeKalb County Public Library - Food Pantry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'DeKalb County Public Library - Food Pantry', '215 Sycamore St', 'Decatur', 'GA', '30030', c.id, 33.774, -84.294, '(404) 370-8450', 'https://www.dekalbcountyga.gov/libraries', 'Food pantry services available at select DeKalb library branches.', 'Monday-Saturday: 10:00 AM - 6:00 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'DeKalb County Public Library - Food Pantry' AND fr.address = '215 Sycamore St');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'DeKalb County Public Library - Food Pantry' AND fr.address = '215 Sycamore St'
  AND st.name IN ('Food Pantry', 'Community Resources')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- The Grocery Spot ATL
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'The Grocery Spot ATL', 'Various Mobile Locations', 'Atlanta', 'GA', '30303', c.id, 33.749, -84.388, '(404) 555-0100', 'https://www.thegroceryspot.org', 'Mobile food pantry serving multiple Atlanta neighborhoods.', 'Check website for mobile schedule'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'The Grocery Spot ATL' AND fr.address = 'Various Mobile Locations');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'The Grocery Spot ATL' AND fr.address = 'Various Mobile Locations'
  AND st.name IN ('Mobile Pantry', 'Fresh Produce', 'Grocery Delivery')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Must Ministries
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Must Ministries', '1210 Johnson Ferry Rd', 'Marietta', 'GA', '30068', c.id, 33.9799, -84.4181, '(770) 429-1277', 'https://www.mustministries.org', 'Provides food, shelter, and supportive services to families in crisis.', 'Monday-Friday: 9:00 AM - 5:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Must Ministries' AND fr.address = '1210 Johnson Ferry Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Must Ministries' AND fr.address = '1210 Johnson Ferry Rd'
  AND st.name IN ('Food Pantry', 'Emergency Assistance', 'Case Management')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- North Fulton Community Charities
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'North Fulton Community Charities', '11270 Elkins Rd', 'Roswell', 'GA', '30076', c.id, 34.0533, -84.3356, '(770) 640-0399', 'https://www.nfcchelp.org', 'Serves North Fulton County with food pantry and emergency assistance.', 'Monday-Thursday: 9:00 AM - 4:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'North Fulton Community Charities' AND fr.address = '11270 Elkins Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'North Fulton Community Charities' AND fr.address = '11270 Elkins Rd'
  AND st.name IN ('Food Pantry', 'Financial Assistance', 'Clothing')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Gateway Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Gateway Center', '275 Pryor St SW', 'Atlanta', 'GA', '30303', c.id, 33.7476, -84.3946, '(404) 215-6600', 'https://www.gatewayctr.org', 'Provides meals and comprehensive services for individuals experiencing homelessness.', '24/7'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Gateway Center' AND fr.address = '275 Pryor St SW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Gateway Center' AND fr.address = '275 Pryor St SW'
  AND st.name IN ('Free Meals', 'Shelter', 'Case Management')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Hosea Feed the Hungry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Hosea Feed the Hungry', '200 Hightower Rd NW', 'Atlanta', 'GA', '30318', c.id, 33.778, -84.4743, '(404) 755-3353', 'https://www.hoseahelps.org', 'Year-round food programs and holiday meal distributions.', 'Monday-Friday: 9:00 AM - 5:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Hosea Feed the Hungry' AND fr.address = '200 Hightower Rd NW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Hosea Feed the Hungry' AND fr.address = '200 Hightower Rd NW'
  AND st.name IN ('Food Pantry', 'Holiday Meals', 'Senior Programs')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Emmaus House
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Emmaus House', '1014 South Gordon St SW', 'Atlanta', 'GA', '30310', c.id, 33.7397, -84.4398, '(404) 874-4756', 'https://www.emmaushouse.org', 'Community center providing food assistance and support services.', 'Tuesday-Thursday: 10:00 AM - 2:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Emmaus House' AND fr.address = '1014 South Gordon St SW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Emmaus House' AND fr.address = '1014 South Gordon St SW'
  AND st.name IN ('Food Pantry', 'Youth Programs', 'Senior Services')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Community Assistance Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Community Assistance Center', '4300 Ponce de Leon Ave', 'Clarkston', 'GA', '30021', c.id, 33.8133, -84.2374, '(404) 296-9861', 'https://www.caction.org', 'Provides food, clothing, and emergency assistance to DeKalb County residents.', 'Monday-Friday: 9:00 AM - 4:30 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Community Assistance Center' AND fr.address = '4300 Ponce de Leon Ave');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Community Assistance Center' AND fr.address = '4300 Ponce de Leon Ave'
  AND st.name IN ('Food Pantry', 'Clothing', 'Emergency Assistance')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Samaritan House
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Samaritan House', '1600 Church St', 'Decatur', 'GA', '30033', c.id, 33.7893, -84.2879, '(404) 377-5648', 'https://www.samaritanhouseatl.org', 'Food pantry serving Decatur and surrounding areas.', 'Monday-Friday: 10:00 AM - 3:00 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Samaritan House' AND fr.address = '1600 Church St');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Samaritan House' AND fr.address = '1600 Church St'
  AND st.name IN ('Food Pantry', 'Emergency Food')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- St. Vincent de Paul Georgia
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'St. Vincent de Paul Georgia', '2050 Marietta Blvd NW', 'Atlanta', 'GA', '30318', c.id, 33.8118, -84.4392, '(404) 351-5050', 'https://www.svdpgeorgia.org', 'Provides food, furniture, and support to families in need.', 'Monday-Saturday: 9:00 AM - 5:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'St. Vincent de Paul Georgia' AND fr.address = '2050 Marietta Blvd NW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'St. Vincent de Paul Georgia' AND fr.address = '2050 Marietta Blvd NW'
  AND st.name IN ('Food Pantry', 'Furniture Bank', 'Home Visits')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Open Hand Atlanta
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Open Hand Atlanta', '1715 Baltimore Pl SE', 'Atlanta', 'GA', '30316', c.id, 33.7244, -84.3485, '(770) 416-7530', 'https://www.openhandatlanta.org', 'Meal delivery service for individuals living with chronic illnesses.', 'Monday-Friday: 8:00 AM - 5:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Open Hand Atlanta' AND fr.address = '1715 Baltimore Pl SE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Open Hand Atlanta' AND fr.address = '1715 Baltimore Pl SE'
  AND st.name IN ('Meal Delivery', 'Nutrition Support', 'Grocery Programs')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Nourish Food Bank
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Nourish Food Bank', '5900 North Allen Rd', 'Peachtree Corners', 'GA', '30092', c.id, 33.967, -84.2203, '(770) 449-4111', 'https://www.nourishgwinnett.org', 'Serves Gwinnett County with food pantry and nutrition programs.', 'Monday-Friday: 9:00 AM - 4:00 PM'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Nourish Food Bank' AND fr.address = '5900 North Allen Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Nourish Food Bank' AND fr.address = '5900 North Allen Rd'
  AND st.name IN ('Food Pantry', 'Mobile Pantry', 'Senior Programs')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Good Samaritan Health Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Good Samaritan Health Center', '1015 Donald Lee Hollowell Pkwy NW', 'Atlanta', 'GA', '30318', c.id, 33.7733, -84.4224, '(404) 523-6571', 'https://www.goodsamatlanta.org', 'Healthcare and food assistance for uninsured individuals.', 'Monday-Thursday: 8:00 AM - 5:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Good Samaritan Health Center' AND fr.address = '1015 Donald Lee Hollowell Pkwy NW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Good Samaritan Health Center' AND fr.address = '1015 Donald Lee Hollowell Pkwy NW'
  AND st.name IN ('Food Pantry', 'Healthcare', 'Pharmacy')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Lawrenceville Cooperative Ministry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Lawrenceville Cooperative Ministry', '385 Grayson Hwy', 'Lawrenceville', 'GA', '30046', c.id, 33.9414, -83.9828, '(770) 962-6160', 'https://www.lawrencevillecoop.org', 'Emergency assistance including food and financial support.', 'Monday-Friday: 9:00 AM - 4:00 PM'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Lawrenceville Cooperative Ministry' AND fr.address = '385 Grayson Hwy');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Lawrenceville Cooperative Ministry' AND fr.address = '385 Grayson Hwy'
  AND st.name IN ('Food Pantry', 'Financial Assistance', 'Clothing')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Interfaith Outreach Home
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Interfaith Outreach Home', '1590 English St NW', 'Atlanta', 'GA', '30318', c.id, 33.7933, -84.4199, '(404) 367-0909', 'https://www.iohomeless.org', 'Provides meals and shelter services for homeless families.', '24/7'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Interfaith Outreach Home' AND fr.address = '1590 English St NW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Interfaith Outreach Home' AND fr.address = '1590 English St NW'
  AND st.name IN ('Free Meals', 'Shelter', 'Case Management')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Rainbow Village
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Rainbow Village', '4818 Snapfinger Woods Dr', 'Decatur', 'GA', '30035', c.id, 33.7065, -84.2426, '(770) 986-1333', 'https://www.rainbowvillage.org', 'Transitional housing and food support for homeless families.', 'Monday-Friday: 9:00 AM - 5:00 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Rainbow Village' AND fr.address = '4818 Snapfinger Woods Dr');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Rainbow Village' AND fr.address = '4818 Snapfinger Woods Dr'
  AND st.name IN ('Food Pantry', 'Housing Support', 'Childcare')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Salvation Army - Atlanta
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Salvation Army - Atlanta', '800 Martin St SE', 'Atlanta', 'GA', '30315', c.id, 33.7327, -84.3842, '(404) 486-7900', 'https://www.salvationarmyatlanta.org', 'Multiple locations offering food pantry and emergency services.', 'Varies by location'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Salvation Army - Atlanta' AND fr.address = '800 Martin St SE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Salvation Army - Atlanta' AND fr.address = '800 Martin St SE'
  AND st.name IN ('Food Pantry', 'Emergency Assistance', 'Shelter')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Community Outreach Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Community Outreach Center', '2720 Bankhead Hwy', 'Austell', 'GA', '30106', c.id, 33.8043, -84.6371, '(770) 941-4300', 'https://www.communityoutreachcenter.org', 'Food pantry and support services for Cobb County residents.', 'Monday-Friday: 9:00 AM - 4:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Community Outreach Center' AND fr.address = '2720 Bankhead Hwy');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Community Outreach Center' AND fr.address = '2720 Bankhead Hwy'
  AND st.name IN ('Food Pantry', 'Financial Assistance', 'Thrift Store')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Ser Familia
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Ser Familia', '3155 Peachtree Industrial Blvd', 'Duluth', 'GA', '30096', c.id, 33.9908, -84.1696, '(770) 476-7797', 'https://www.serfamilia.org', 'Bilingual services including food assistance for Latino families.', 'Monday-Friday: 9:00 AM - 5:00 PM'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Ser Familia' AND fr.address = '3155 Peachtree Industrial Blvd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Ser Familia' AND fr.address = '3155 Peachtree Industrial Blvd'
  AND st.name IN ('Food Pantry', 'Case Management', 'Education')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Action Ministries
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Action Ministries', '3830 North Druid Hills Rd', 'Decatur', 'GA', '30033', c.id, 33.8232, -84.3127, '(404) 321-3854', 'https://www.actionministries.org', 'Emergency food and financial assistance for DeKalb residents.', 'Monday-Friday: 10:00 AM - 2:00 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Action Ministries' AND fr.address = '3830 North Druid Hills Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Action Ministries' AND fr.address = '3830 North Druid Hills Rd'
  AND st.name IN ('Food Pantry', 'Financial Assistance', 'Case Management')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- New Life Community Ministries
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'New Life Community Ministries', '3592 Chamblee Tucker Rd', 'Atlanta', 'GA', '30341', c.id, 33.8862, -84.2778, '(770) 457-1200', 'https://www.newlifecm.org', 'Food pantry and support services for Chamblee area.', 'Tuesday, Thursday: 10:00 AM - 1:00 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'New Life Community Ministries' AND fr.address = '3592 Chamblee Tucker Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'New Life Community Ministries' AND fr.address = '3592 Chamblee Tucker Rd'
  AND st.name IN ('Food Pantry', 'After School Programs', 'English Classes')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Helping Hands Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Helping Hands Center', '2550 Sandy Plains Rd', 'Marietta', 'GA', '30066', c.id, 33.9966, -84.528, '(770) 427-9862', 'https://www.helpinghandscenter.org', 'Food pantry serving East Cobb and surrounding areas.', 'Monday-Friday: 10:00 AM - 3:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Helping Hands Center' AND fr.address = '2550 Sandy Plains Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Helping Hands Center' AND fr.address = '2550 Sandy Plains Rd'
  AND st.name IN ('Food Pantry', 'Emergency Assistance')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Goodr
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Goodr', 'Various Locations', 'Atlanta', 'GA', '30303', c.id, 33.749, -84.388, '(404) 555-0123', 'https://www.goodr.co', 'Food rescue and distribution to combat hunger and reduce waste.', 'Check website for popup schedule'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Goodr' AND fr.address = 'Various Locations');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Goodr' AND fr.address = 'Various Locations'
  AND st.name IN ('Food Distribution', 'Mobile Pantry', 'Community Popups')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Metro-Atlanta Georgia Community Food Bank
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Metro-Atlanta Georgia Community Food Bank', '2020 Marietta Blvd NW', 'Atlanta', 'GA', '30318', c.id, 33.811, -84.439, '(404) 892-3333', 'https://mgcfb.org', 'Large food bank serving metro Atlanta with multiple distribution sites and partner agencies.', 'Monday-Friday: 9:00 AM - 5:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Metro-Atlanta Georgia Community Food Bank' AND fr.address = '2020 Marietta Blvd NW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Metro-Atlanta Georgia Community Food Bank' AND fr.address = '2020 Marietta Blvd NW'
  AND st.name IN ('Food Pantry', 'Mobile Pantry', 'Partner Agency Network')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Helping In His Name
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Helping In His Name', '8896 Dunwoody Place', 'Atlanta', 'GA', '30350', c.id, 33.9351, -84.3304, '(770) 396-8890', 'https://helpinginhisname.org', 'Faith-based food pantry serving North Atlanta and Sandy Springs area.', 'Tuesday, Thursday: 10:00 AM - 1:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Helping In His Name' AND fr.address = '8896 Dunwoody Place');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Helping In His Name' AND fr.address = '8896 Dunwoody Place'
  AND st.name IN ('Food Pantry', 'Emergency Food', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Southern Crescent Resource Ministry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Southern Crescent Resource Ministry', '187 W Campbellton St', 'Fairburn', 'GA', '30213', c.id, 33.5714, -84.5844, '(770) 969-4673', 'http://www.southerncrescentresourceministry.com', 'Serving South Fulton with food assistance and community resources.', 'Monday-Friday: 9:00 AM - 4:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Southern Crescent Resource Ministry' AND fr.address = '187 W Campbellton St');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Southern Crescent Resource Ministry' AND fr.address = '187 W Campbellton St'
  AND st.name IN ('Food Pantry', 'Emergency Assistance', 'Community Resources')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- One Clayton - A Doorway of Hope
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'One Clayton - A Doorway of Hope', '7610 N McDonough St', 'Jonesboro', 'GA', '30236', c.id, 33.5218, -84.3548, '(770) 478-3803', 'https://www.oneclayton.org', 'Comprehensive services including food pantry for Clayton County residents.', 'Monday-Thursday: 9:00 AM - 4:00 PM'
FROM counties c WHERE c.name = 'Clayton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'One Clayton - A Doorway of Hope' AND fr.address = '7610 N McDonough St');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'One Clayton - A Doorway of Hope' AND fr.address = '7610 N McDonough St'
  AND st.name IN ('Food Pantry', 'Clothing', 'Financial Assistance')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Clayton State University Food Pantry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Clayton State University Food Pantry', '2000 Clayton State Blvd', 'Morrow', 'GA', '30260', c.id, 33.5929, -84.3292, '(678) 466-4000', 'https://www.clayton.edu/family-resources/food-pantries', 'On-campus food pantry serving students and families in the Clayton County area.', 'Check website for current hours'
FROM counties c WHERE c.name = 'Clayton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Clayton State University Food Pantry' AND fr.address = '2000 Clayton State Blvd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Clayton State University Food Pantry' AND fr.address = '2000 Clayton State Blvd'
  AND st.name IN ('Food Pantry', 'Student Support', 'Family Resources')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Hearts to Nourish Hope
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Hearts to Nourish Hope', '165 Courtland St NE', 'Atlanta', 'GA', '30303', c.id, 33.7588, -84.3833, '(404) 523-3333', 'https://www.heartstonourishhope.org', 'Free grocery delivery service providing fresh food to families in need.', 'Monday-Friday: 9:00 AM - 5:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Hearts to Nourish Hope' AND fr.address = '165 Courtland St NE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Hearts to Nourish Hope' AND fr.address = '165 Courtland St NE'
  AND st.name IN ('Grocery Delivery', 'Fresh Produce', 'Family Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Fulton County Daily Bread Food Pantry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Fulton County Daily Bread Food Pantry', '3746 Old Gordon Rd', 'Atlanta', 'GA', '30354', c.id, 33.768, -84.5129, '(404) 768-3210', 'https://www.needhelppayingbills.com/html/fulton_county_food_banks.html', 'Food pantry providing daily bread and groceries to Fulton County residents.', 'Monday-Friday: 10:00 AM - 3:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Fulton County Daily Bread Food Pantry' AND fr.address = '3746 Old Gordon Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Fulton County Daily Bread Food Pantry' AND fr.address = '3746 Old Gordon Rd'
  AND st.name IN ('Food Pantry', 'Emergency Food')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- United Food Force Georgia
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'United Food Force Georgia', 'Multiple Locations', 'Atlanta', 'GA', '30303', c.id, 33.749, -84.388, '(404) 555-1234', 'https://unitedfoodforce.org', 'Collaborative network distributing food across Georgia communities.', 'Varies by distribution site'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'United Food Force Georgia' AND fr.address = 'Multiple Locations');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'United Food Force Georgia' AND fr.address = 'Multiple Locations'
  AND st.name IN ('Food Distribution', 'Community Partnerships', 'Mobile Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- South Fulton Service Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'South Fulton Service Center', '5600 Stonewall Tell Rd', 'College Park', 'GA', '30349', c.id, 33.6042, -84.4964, '(770) 306-3260', 'https://www.needhelppayingbills.com/html/fulton_county_food_banks.html', 'South Fulton food pantry providing groceries and emergency assistance.', 'Monday-Friday: 9:00 AM - 4:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'South Fulton Service Center' AND fr.address = '5600 Stonewall Tell Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'South Fulton Service Center' AND fr.address = '5600 Stonewall Tell Rd'
  AND st.name IN ('Food Pantry', 'Emergency Assistance', 'Community Resources')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- East Point Food Pantry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'East Point Food Pantry', '1393 Headland Dr', 'East Point', 'GA', '30344', c.id, 33.6865, -84.4526, '(404) 761-2112', 'https://www.needhelppayingbills.com/html/fulton_county_food_banks.html', 'Community food pantry serving East Point and surrounding areas.', 'Tuesday, Thursday: 10:00 AM - 2:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'East Point Food Pantry' AND fr.address = '1393 Headland Dr');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'East Point Food Pantry' AND fr.address = '1393 Headland Dr'
  AND st.name IN ('Food Pantry', 'Emergency Food')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Clayton County Community Services Authority
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Clayton County Community Services Authority', '1173 Battlecreek Rd', 'Jonesboro', 'GA', '30236', c.id, 33.5184, -84.3691, '(770) 603-4500', 'https://www.clayton.edu/family-resources/food-pantries', 'Government-supported services including food assistance for Clayton County.', 'Monday-Friday: 8:30 AM - 5:00 PM'
FROM counties c WHERE c.name = 'Clayton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Clayton County Community Services Authority' AND fr.address = '1173 Battlecreek Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Clayton County Community Services Authority' AND fr.address = '1173 Battlecreek Rd'
  AND st.name IN ('Food Pantry', 'Emergency Services', 'Community Programs')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Morrow Community Food Pantry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Morrow Community Food Pantry', '1400 Maddox Dr', 'Morrow', 'GA', '30260', c.id, 33.5848, -84.3395, '(770) 968-1115', 'https://www.clayton.edu/family-resources/food-pantries', 'Local food pantry serving Morrow and Clayton County residents.', 'Wednesday: 10:00 AM - 1:00 PM'
FROM counties c WHERE c.name = 'Clayton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Morrow Community Food Pantry' AND fr.address = '1400 Maddox Dr');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Morrow Community Food Pantry' AND fr.address = '1400 Maddox Dr'
  AND st.name IN ('Food Pantry', 'Emergency Food')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Riverdale Food Bank
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Riverdale Food Bank', '6695 Church St', 'Riverdale', 'GA', '30274', c.id, 33.572, -84.4159, '(770) 997-9914', 'https://www.oneclayton.org', 'Food bank serving Riverdale and Clayton County communities.', 'Monday, Wednesday: 11:00 AM - 3:00 PM'
FROM counties c WHERE c.name = 'Clayton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Riverdale Food Bank' AND fr.address = '6695 Church St');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Riverdale Food Bank' AND fr.address = '6695 Church St'
  AND st.name IN ('Food Pantry', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Center for Pan Asian Community Services (CPACS)
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Center for Pan Asian Community Services (CPACS)', '3510 Shallowford Road NE', 'Atlanta', 'GA', '30341', c.id, 33.8862, -84.2778, '(770) 936-0969', 'https://www.cpacs.org', 'Nonprofit organization providing food pantry and comprehensive services for American citizens and non-citizens of all races, ethnicities, and national origins. Requires detailed documentation and proof of legal status.', 'See website for current hours'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Center for Pan Asian Community Services (CPACS)' AND fr.address = '3510 Shallowford Road NE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Center for Pan Asian Community Services (CPACS)' AND fr.address = '3510 Shallowford Road NE'
  AND st.name IN ('Food Pantry', 'Case Management', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Atlanta Inner-City Ministry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Atlanta Inner-City Ministry', '1966 Lakewood Terrace SE', 'Atlanta', 'GA', '30315', c.id, 33.6972, -84.3719, '(404) 622-7931', 'https://www.aimatlanta.org', 'Food pantry providing weekly support bags for families and individuals. Serves seniors 65+ and parents with children under 18. Registration required.', 'Sunday for families, Wednesday for individuals (registration required)'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Atlanta Inner-City Ministry' AND fr.address = '1966 Lakewood Terrace SE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Atlanta Inner-City Ministry' AND fr.address = '1966 Lakewood Terrace SE'
  AND st.name IN ('Food Pantry', 'Emergency Food', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Another Chance Atlanta
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Another Chance Atlanta', '777 Cleveland Ave SW', 'Atlanta', 'GA', '30315', c.id, 33.6915, -84.4201, '(678) 974-5989', 'https://anotherchanceofatlanta.org', 'Community organization providing free food distribution on Fridays. Picture ID required along with TLC intake form and USDA/TEFAP household eligibility form.', 'Friday: 11:00 AM - 4:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Another Chance Atlanta' AND fr.address = '777 Cleveland Ave SW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Another Chance Atlanta' AND fr.address = '777 Cleveland Ave SW'
  AND st.name IN ('Food Distribution', 'Emergency Food', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Sol Underground Free Store - Auburn Avenue
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Sol Underground Free Store - Auburn Avenue', '171 Auburn Ave NE', 'Atlanta', 'GA', '30303', c.id, 33.7563, -84.3836, '(404) 555-0150', 'https://www.saintsol.org', 'Mutual aid free store providing clothing, household items, books, and food. No requirements or documentation needed. 1st Friday location outside For Keeps Books.', '1st Friday: 7:00 PM - 10:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Sol Underground Free Store - Auburn Avenue' AND fr.address = '171 Auburn Ave NE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Sol Underground Free Store - Auburn Avenue' AND fr.address = '171 Auburn Ave NE'
  AND st.name IN ('Food Distribution', 'Clothing', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Sol Underground Free Store - MLK Jr Drive
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Sol Underground Free Store - MLK Jr Drive', '48 MLK Jr Dr SW', 'Atlanta', 'GA', '30303', c.id, 33.7543, -84.3922, '(404) 555-0150', 'https://www.saintsol.org', 'Mutual aid free store providing clothing, household items, books, and food. No requirements or documentation needed. 2nd and 4th Friday location outside Catholic Shrine of Immaculate Conception.', '2nd and 4th Friday: 7:00 PM - 10:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Sol Underground Free Store - MLK Jr Drive' AND fr.address = '48 MLK Jr Dr SW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Sol Underground Free Store - MLK Jr Drive' AND fr.address = '48 MLK Jr Dr SW'
  AND st.name IN ('Food Distribution', 'Clothing', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- South Bend Commons
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'South Bend Commons', '1799 Lakewood Terrace SE', 'Atlanta', 'GA', '30315', c.id, 33.6969, -84.3716, '(404) 555-0160', 'https://southbend.co', 'Free social space focused on autonomous self-organization providing free grocery distribution in Lakewood Heights. No requirements or documentation needed.', 'Tuesday: 5:00 PM - 7:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'South Bend Commons' AND fr.address = '1799 Lakewood Terrace SE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'South Bend Commons' AND fr.address = '1799 Lakewood Terrace SE'
  AND st.name IN ('Food Distribution', 'Fresh Produce', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- New Life Community Alliance
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'New Life Community Alliance', '3592 Flat Shoals Road', 'Decatur', 'GA', '30034', c.id, 33.6896, -84.2519, '(404) 381-6731', 'https://www.newlife-atl.org', 'Community organization providing food pantry and meals for South DeKalb residents. Photo ID and proof of residency recommended but not strictly required.', 'Tuesday-Saturday: 10:00 AM - 12:00 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'New Life Community Alliance' AND fr.address = '3592 Flat Shoals Road');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'New Life Community Alliance' AND fr.address = '3592 Flat Shoals Road'
  AND st.name IN ('Food Pantry', 'Free Meals', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Intown Food Pantry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Intown Food Pantry', '1026 Ponce de Leon Ave NE', 'Atlanta', 'GA', '30306', c.id, 33.7729, -84.3494, '(404) 875-7591', 'https://www.intowncares.org', 'Food pantry located at Druid Hills Presbyterian Church serving over 300 households weekly. Photo ID requested but no legal status proof needed. Serves Intown Atlanta neighborhoods.', 'Tuesday, Saturday: 10:00 AM - 12:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Intown Food Pantry' AND fr.address = '1026 Ponce de Leon Ave NE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Intown Food Pantry' AND fr.address = '1026 Ponce de Leon Ave NE'
  AND st.name IN ('Food Pantry', 'Emergency Food', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Community Church Atlanta
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Community Church Atlanta', '838 Cascade Avenue SW', 'Atlanta', 'GA', '30311', c.id, 33.7184, -84.4462, '(404) 755-4100', 'https://ccogatl.org', 'Community Marketplace food pantry at Vicars Community Center addressing food insecurity on Atlanta''s west side. Photo ID requested. Open to all during posted hours.', 'Wednesday: 10:00 AM - 1:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Community Church Atlanta' AND fr.address = '838 Cascade Avenue SW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Community Church Atlanta' AND fr.address = '838 Cascade Avenue SW'
  AND st.name IN ('Food Pantry', 'Emergency Food', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Salem Bible Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Salem Bible Church', '2283 Baker Road NW', 'Atlanta', 'GA', '30318', c.id, 33.7946, -84.4516, '(404) 792-0303', 'https://www.salembiblechurch.org', 'Church food pantry through Social Services Ministry and Sunshine Brotherhood Community Center, distributing over 30,000 pounds of food weekly. Photo ID and proof of residency requested.', 'Tuesday, Thursday: 9:00 AM - 1:00 PM (2nd and 4th Thursday)'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Salem Bible Church' AND fr.address = '2283 Baker Road NW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Salem Bible Church' AND fr.address = '2283 Baker Road NW'
  AND st.name IN ('Food Pantry', 'Emergency Food', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Toco Hills Community Alliance
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Toco Hills Community Alliance', '1790 LaVista Rd NE', 'Atlanta', 'GA', '30329', c.id, 33.8201, -84.3183, '(404) 325-0677', 'https://tocohillsalliance.org', 'Food pantry serving North Central DeKalb County residents, individuals experiencing homelessness, and veterans. Registration starts at 12 PM.', 'Tuesday-Thursday: 1:00 PM - 3:30 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Toco Hills Community Alliance' AND fr.address = '1790 LaVista Rd NE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Toco Hills Community Alliance' AND fr.address = '1790 LaVista Rd NE'
  AND st.name IN ('Food Pantry', 'Emergency Food', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- New Beginnings Food Outreach
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'New Beginnings Food Outreach', '7034 Glade Road SE', 'Acworth', 'GA', '30102', c.id, 34.0652, -84.6439, '(770) 529-6353', 'https://cobb-county.communityplatform.us', 'Food pantry serving multiple metro Atlanta counties. New clients must bring valid ID, proof of income for household members, and proof of residence.', 'Friday: 11:00 AM - 1:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'New Beginnings Food Outreach' AND fr.address = '7034 Glade Road SE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'New Beginnings Food Outreach' AND fr.address = '7034 Glade Road SE'
  AND st.name IN ('Food Pantry', 'Emergency Food')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Fellowship of Faith Church International
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Fellowship of Faith Church International', '2553 Connally Dr', 'Atlanta', 'GA', '30344', c.id, 33.6736, -84.4537, '(404) 346-1162', 'http://www.fofciatl.com', 'Food pantry in East Point serving multiple metro Atlanta counties. Picture ID and proof of residence required; does not require proof of legal status.', 'Tuesday, Friday: 6:00 PM - 7:30 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Fellowship of Faith Church International' AND fr.address = '2553 Connally Dr');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Fellowship of Faith Church International' AND fr.address = '2553 Connally Dr'
  AND st.name IN ('Food Pantry', 'Emergency Food', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Atlanta Justice Alliance - Woodruff Park
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Atlanta Justice Alliance - Woodruff Park', '91 Peachtree St NW', 'Atlanta', 'GA', '30303', c.id, 33.7566, -84.387, '(404) 555-0170', 'https://www.justicecenter.org', 'Grassroots mutual aid organization providing free food distribution at Woodruff Park in downtown Atlanta. No requirements, proof, or documentation needed. Open to all, especially serving homeless community.', 'Saturday: 12:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Atlanta Justice Alliance - Woodruff Park' AND fr.address = '91 Peachtree St NW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Atlanta Justice Alliance - Woodruff Park' AND fr.address = '91 Peachtree St NW'
  AND st.name IN ('Food Distribution', 'Community Support', 'Free Meals')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Food4Life - Edgewood Distribution
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Food4Life - Edgewood Distribution', '80 Mayson Ave NE', 'Atlanta', 'GA', '30307', c.id, 33.7612, -84.3445, '(678) 616-1285', 'https://food4lives.org', 'Atlanta Survival Program providing free groceries at the corner of Mayson Avenue and Hardee Street in Edgewood. No requirements or documentation needed. Welcome to all.', 'Sunday: 1:00 PM - 2:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Food4Life - Edgewood Distribution' AND fr.address = '80 Mayson Ave NE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Food4Life - Edgewood Distribution' AND fr.address = '80 Mayson Ave NE'
  AND st.name IN ('Food Distribution', 'Fresh Produce', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Duluth Cooperative Ministry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Duluth Cooperative Ministry', '3649 Rogers Bridge Road', 'Duluth', 'GA', '30097', c.id, 34.0139, -84.1447, '(770) 623-9563', 'https://duluthco-op.org', 'Cooperative ministry providing food assistance and support services to Duluth area families. Serves zip codes 30096 and 30097. Contact for appointment.', 'Monday, Wednesday, Friday: 10:00 AM - 2:00 PM (by appointment)'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Duluth Cooperative Ministry' AND fr.address = '3649 Rogers Bridge Road');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Duluth Cooperative Ministry' AND fr.address = '3649 Rogers Bridge Road'
  AND st.name IN ('Food Pantry', 'Emergency Assistance', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Lilburn Cooperative Ministry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Lilburn Cooperative Ministry', '5329 Five Forks Trickum Rd', 'Lilburn', 'GA', '30047', c.id, 33.8979, -84.1239, '(770) 931-8333', 'https://lilburnco-op.org', 'Cooperative ministry serving Gwinnett County residents with food pantry services through Kay''s Pantry. Requires appointment and standard identification. Zip codes 30087 and 30084.', 'Monday, Wednesday, Friday: 10:00 AM - 1:30 PM (by appointment)'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Lilburn Cooperative Ministry' AND fr.address = '5329 Five Forks Trickum Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Lilburn Cooperative Ministry' AND fr.address = '5329 Five Forks Trickum Rd'
  AND st.name IN ('Food Pantry', 'Emergency Assistance', 'Thrift Store')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Southeast Gwinnett Cooperative Ministry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Southeast Gwinnett Cooperative Ministry', '55 Grayson Industrial Parkway', 'Grayson', 'GA', '30017', c.id, 33.8933, -83.9536, '(770) 985-5229', 'https://segwinnettcoop.org', 'Cooperative ministry providing food security to families in Southeast Gwinnett. Serves zip codes 30078, 30039, 30017, 30052. Proof of address required. Requires social security card and/or proof of legal status.', 'Monday: 3:00 PM - 7:00 PM, Wednesday, Friday: 10:00 AM - 2:00 PM'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Southeast Gwinnett Cooperative Ministry' AND fr.address = '55 Grayson Industrial Parkway');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Southeast Gwinnett Cooperative Ministry' AND fr.address = '55 Grayson Industrial Parkway'
  AND st.name IN ('Food Pantry', 'Emergency Assistance', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Buford Family Community Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Buford Family Community Center', '4042 Friendship Road', 'Buford', 'GA', '30518', c.id, 34.0971, -84.0044, '(678) 292-5954', 'https://www.bufordfamilysda.org', 'Community center operated by Buford Family Seventh-day Adventist Church providing food, clothing and classes. ID required. Requires application.', 'Tuesday: 11:30 AM - 4:00 PM'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Buford Family Community Center' AND fr.address = '4042 Friendship Road');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Buford Family Community Center' AND fr.address = '4042 Friendship Road'
  AND st.name IN ('Food Pantry', 'Clothing', 'Community Programs')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Hope and Life Compassion Ministry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Hope and Life Compassion Ministry', '1001 Old Snellville Hwy', 'Lawrenceville', 'GA', '30043', c.id, 33.9464, -84.0093, '(770) 979-1595', 'https://hopeandlife.tv', 'Multi-ethnic, inclusive church-based food bank serving Gwinnett County. Call for details on food bank services.', 'Call for details'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Hope and Life Compassion Ministry' AND fr.address = '1001 Old Snellville Hwy');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Hope and Life Compassion Ministry' AND fr.address = '1001 Old Snellville Hwy'
  AND st.name IN ('Food Pantry', 'Community Support', 'Community Programs')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- North Gwinnett Cooperative Ministry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'North Gwinnett Cooperative Ministry', '4395 Commerce Drive', 'Buford', 'GA', '30518', c.id, 34.072, -83.9928, '(770) 271-9793', 'https://northgwinnettcoop.org', 'Cooperative ministry serving Buford, Sugar Hill, Suwanee and portions of Auburn, Bethlehem, Braselton and Hoschton. Zip codes 30024, 30518, 30519. Proof of residence and ID required, social security card required, does not need proof of legal status.', 'Monday: 6:00 PM - 8:00 PM, Wednesday, Friday: 10:00 AM - 12:00 PM'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'North Gwinnett Cooperative Ministry' AND fr.address = '4395 Commerce Drive');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'North Gwinnett Cooperative Ministry' AND fr.address = '4395 Commerce Drive'
  AND st.name IN ('Food Pantry', 'Clothing', 'Financial Assistance')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Vision Academy Life Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Vision Academy Life Center', '458 N Chestnut Street', 'Lawrenceville', 'GA', '30046', c.id, 33.9568, -83.9944, '(678) 206-0688', 'http://www.vision-of-life.org', 'Community center providing food pantry services. ID required, does not need proof of legal status. By appointment only.', 'Tuesday: 10:00 AM - 4:00 PM (by appointment)'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Vision Academy Life Center' AND fr.address = '458 N Chestnut Street');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Vision Academy Life Center' AND fr.address = '458 N Chestnut Street'
  AND st.name IN ('Food Pantry', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- The Pantry at Hamilton Mill
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'The Pantry at Hamilton Mill', '3601 Braselton Highway', 'Dacula', 'GA', '30019', c.id, 33.9884, -83.8935, '(770) 271-8855', 'https://tphm.org', 'Large food pantry serving Gwinnett County and all Georgia residents. Distributes over 35,000 pounds of food weekly, feeding average of 700 families. Photo ID required. No eligibility requirements, all are welcome.', 'Saturday: 7:00 AM - 10:30 AM'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'The Pantry at Hamilton Mill' AND fr.address = '3601 Braselton Highway');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'The Pantry at Hamilton Mill' AND fr.address = '3601 Braselton Highway'
  AND st.name IN ('Food Pantry', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- StreetWise GA
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'StreetWise GA', '1770 Cedars Road', 'Lawrenceville', 'GA', '30045', c.id, 33.9414, -83.9828, '(678) 985-9915', 'https://streetwisegeorgia.org', 'Food pantry serving Gwinnett County by appointment only. Monday, Tuesday, Thursday appointments 10:00 AM - 2:00 PM. Alternative evening hours every other Thursday 6:00 PM - 8:00 PM for working clients.', 'Monday, Tuesday, Thursday: 10:00 AM - 1:30 PM (by appointment)'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'StreetWise GA' AND fr.address = '1770 Cedars Road');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'StreetWise GA' AND fr.address = '1770 Cedars Road'
  AND st.name IN ('Food Pantry', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- CarePointe at Cross Pointe Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'CarePointe at Cross Pointe Church', '1800 Satellite Boulevard', 'Duluth', 'GA', '30097', c.id, 34.0024, -84.1462, '(678) 812-4500', 'https://crosspointechurch.com/carepointe', 'Community ministry providing food and clothing pantry. Good resource for Spanish-speakers with ESL courses. Valid photo ID and proof of address required.', 'Wednesday, Saturday: 10:00 AM - 2:00 PM'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'CarePointe at Cross Pointe Church' AND fr.address = '1800 Satellite Boulevard');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'CarePointe at Cross Pointe Church' AND fr.address = '1800 Satellite Boulevard'
  AND st.name IN ('Food Pantry', 'Clothing', 'English Classes')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Overcomers House
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Overcomers House', '2114 Fountain Square', 'Snellville', 'GA', '30078', c.id, 33.8499, -84.0209, '(678) 615-7714', 'https://www.myovercomershouse.com', 'Non-profit social service center providing drive-thru food pantry and senior food box delivery program for homebound residents 60 or older in Gwinnett County.', 'Monday, Saturday: 12:00 PM - 2:00 PM'
FROM counties c WHERE c.name = 'Gwinnett'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Overcomers House' AND fr.address = '2114 Fountain Square');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Overcomers House' AND fr.address = '2114 Fountain Square'
  AND st.name IN ('Food Pantry', 'Senior Services', 'Meal Delivery')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- St. Vincent de Paul - Chamblee Tucker
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'St. Vincent de Paul - Chamblee Tucker', '2050 Chamblee Tucker Road, Suite C', 'Chamblee', 'GA', '30341', c.id, 33.8862, -84.2778, '(678) 892-6160', 'https://svdpgeorgia.org', 'Food pantry and food recovery distribution providing financial, material, educational and spiritual support to those in need regardless of background or faith.', 'Monday-Friday: 8:30 AM - 4:00 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'St. Vincent de Paul - Chamblee Tucker' AND fr.address = '2050 Chamblee Tucker Road, Suite C');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'St. Vincent de Paul - Chamblee Tucker' AND fr.address = '2050 Chamblee Tucker Road, Suite C'
  AND st.name IN ('Food Pantry', 'Food Distribution', 'Emergency Assistance')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- McEachern Memorial UMC
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'McEachern Memorial UMC', '4075 Macland Rd', 'Powder Springs', 'GA', '30127', c.id, 33.8658, -84.6822, '(678) 567-5015', 'https://www.mceachernumc.org', 'Church food pantry serving food insecure families in Powder Springs 30127 or Marietta 30064. Call outreach office to schedule appointment. Third Wednesday of every month.', '3rd Wednesday of month (call to arrange)'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'McEachern Memorial UMC' AND fr.address = '4075 Macland Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'McEachern Memorial UMC' AND fr.address = '4075 Macland Rd'
  AND st.name IN ('Food Pantry', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Lakeview Seventh Day Adventist Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Lakeview Seventh Day Adventist Church', '4001 Macedonia Road', 'Powder Springs', 'GA', '30127', c.id, 33.8841, -84.6434, '(770) 222-1511', 'http://www.lakeviewadventist.org', 'West Cobb church providing hot food and pantry items. Mobile drive-thru pantry most Thursdays and bi-monthly Sunday distribution. Call to verify schedule.', '3rd Sunday of month (call to verify)'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Lakeview Seventh Day Adventist Church' AND fr.address = '4001 Macedonia Road');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Lakeview Seventh Day Adventist Church' AND fr.address = '4001 Macedonia Road'
  AND st.name IN ('Food Pantry', 'Free Meals', 'Food Distribution')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Christian Aid Mission Partnership (C.A.M.P.)
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Christian Aid Mission Partnership (C.A.M.P.)', '6289 Veterans Memorial Highway, Building 12-A', 'Austell', 'GA', '30168', c.id, 33.8127, -84.6372, '(770) 819-0662', 'https://www.christianaid.org', 'Food pantry serving Austell, Clarkdale, East Douglas County, Lithia Springs, Mableton, and Powder Springs. Requires social security card or birth certificate but not proof of legal status.', 'Monday-Friday: 9:00 AM - 2:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Christian Aid Mission Partnership (C.A.M.P.)' AND fr.address = '6289 Veterans Memorial Highway, Building 12-A');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Christian Aid Mission Partnership (C.A.M.P.)' AND fr.address = '6289 Veterans Memorial Highway, Building 12-A'
  AND st.name IN ('Food Pantry', 'Clothing', 'Financial Assistance')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- The Center for Family Resources
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'The Center for Family Resources', '400 Franklin Gateway SE, Suite 250', 'Marietta', 'GA', '30067', c.id, 33.9426, -84.4748, '(770) 428-2601', 'https://thecfr.org', 'Family Cupboard Choice Pantry offering canned goods, protein, fresh meat and produce, diapers and personal hygiene items. Serves families experiencing or at risk of homelessness. Requires social security or birth certificate, eviction notice, utility cut-off notice, and proof of legal status.', 'Monday-Friday: 8:30 AM - 4:30 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'The Center for Family Resources' AND fr.address = '400 Franklin Gateway SE, Suite 250');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'The Center for Family Resources' AND fr.address = '400 Franklin Gateway SE, Suite 250'
  AND st.name IN ('Food Pantry', 'Emergency Assistance', 'Housing Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Cobb Vineyard Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Cobb Vineyard Church', '3206 Old Hwy 41', 'Kennesaw', 'GA', '30144', c.id, 34.0194, -84.6156, '(678) 574-0005', 'https://www.cobbvineyard.com', 'Church food pantry open first and third Saturday of every month. Sign-in begins at 9 AM, ends at 1 PM. First come first serve, open to anyone in need. Need identification or CVC scan card.', '1st and 3rd Saturday: 11:00 AM - 1:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Cobb Vineyard Church' AND fr.address = '3206 Old Hwy 41');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Cobb Vineyard Church' AND fr.address = '3206 Old Hwy 41'
  AND st.name IN ('Food Pantry', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Family Life Restoration Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Family Life Restoration Center', '6105 Mableton Parkway', 'Mableton', 'GA', '30126', c.id, 33.8193, -84.5578, '(770) 944-1066', 'https://www.familyliferestorationcenter.org', 'Non-profit dedicated to family restoration providing food pantry. Serves Cobb and Fulton counties. Social security card or birth certificate required for household members.', 'Monday-Friday: 10:00 AM - 3:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Family Life Restoration Center' AND fr.address = '6105 Mableton Parkway');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Family Life Restoration Center' AND fr.address = '6105 Mableton Parkway'
  AND st.name IN ('Food Pantry', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Turner Chapel AME
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Turner Chapel AME', '548 Lawrence Street NE', 'Marietta', 'GA', '30060', c.id, 33.9556, -84.5405, '(770) 422-6791', 'https://www.turnerchapelame.org', 'Church food pantry and CSFP Senior Food Distribution Program for people 59+. ID and proof of residence required. Serves Cobb County and Georgia residents.', 'Wednesday: 1:00 PM - 3:00 PM, Saturday: 10:00 AM - 2:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Turner Chapel AME' AND fr.address = '548 Lawrence Street NE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Turner Chapel AME' AND fr.address = '548 Lawrence Street NE'
  AND st.name IN ('Food Pantry', 'Senior Programs')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Reflections of Trinity - Team 58
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Reflections of Trinity - Team 58', '4037 Austell-Powder Springs Road', 'Powder Springs', 'GA', '30127', c.id, 33.8631, -84.6742, '(404) 861-1663', 'https://reflectionsoftrinity.org', 'Division of Reflections of Trinity offering free boxes of groceries. Started in 2012, serves Cobb County families. Partnership with Tapp Middle School pantry.', 'Saturday: 11:00 AM - 1:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Reflections of Trinity - Team 58' AND fr.address = '4037 Austell-Powder Springs Road');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Reflections of Trinity - Team 58' AND fr.address = '4037 Austell-Powder Springs Road'
  AND st.name IN ('Food Pantry', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Papa's Pantry - Encompass Ministries
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Papa''s Pantry - Encompass Ministries', '6551 Commerce Parkway, Suite 200', 'Woodstock', 'GA', '30189', c.id, 34.1015, -84.5194, '(770) 591-4730', 'https://www.encompassministriesinc.org', 'Founded in 1998 as Papa''s Pantry, renamed Encompass Ministries in 2019. Provides food pantry and grocery assistance. Serves Cherokee, Cobb, Bartow, North Fulton, and Pickens Counties. Reservations preferred.', 'Monday, Friday: 9:30 AM - 2:30 PM, Tuesday-Thursday: 9:30 AM - 4:30 PM, Saturday: 9:00 AM - 1:00 PM (appointment only for grocery assistance)'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Papa''s Pantry - Encompass Ministries' AND fr.address = '6551 Commerce Parkway, Suite 200');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Papa''s Pantry - Encompass Ministries' AND fr.address = '6551 Commerce Parkway, Suite 200'
  AND st.name IN ('Food Pantry', 'Grocery Programs', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Never Alone Community Food Pantry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Never Alone Community Food Pantry', '291 Rope Mill Road', 'Woodstock', 'GA', '30188', c.id, 34.1018, -84.4937, '(470) 302-4055', 'https://www.neveralone.org', 'Food pantry serving Cherokee, Cobb, Bartow, and Pickens counties. Partners with churches and organizations for remote distributions including Hasty Elementary in Canton. By appointment only.', 'Monday, Wednesday, Thursday: 10:00 AM - 2:00 PM, 2nd Thursday: 4:00 PM - 6:00 PM, 3rd Saturday: 10:00 AM - 1:00 PM'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Never Alone Community Food Pantry' AND fr.address = '291 Rope Mill Road');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Never Alone Community Food Pantry' AND fr.address = '291 Rope Mill Road'
  AND st.name IN ('Food Pantry', 'Community Partnerships')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Helping Hands of Paulding County
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Helping Hands of Paulding County', '228 West Spring Street', 'Dallas', 'GA', '30132', c.id, 33.9226, -84.8417, '(770) 443-1230', 'https://hhpcga.org', 'Non-profit assisting Paulding County residents with food pantry and support services. Requires current utility bill and social security card. Proof of legal status required.', 'Monday-Friday: 10:00 AM - 1:30 PM'
FROM counties c WHERE c.name = 'Paulding'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Helping Hands of Paulding County' AND fr.address = '228 West Spring Street');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Helping Hands of Paulding County' AND fr.address = '228 West Spring Street'
  AND st.name IN ('Food Pantry', 'Emergency Assistance')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Malachi's Storehouse at St. Patrick's Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Malachi''s Storehouse at St. Patrick''s Church', '4755 N Peachtree Rd', 'Dunwoody', 'GA', '30338', c.id, 33.9335, -84.3386, '(770) 455-6523', 'https://malachis.org', 'Emergency food pantry at St. Patrick''s Episcopal Church addressing food insecurity in metro Atlanta. Provides hot lunch and free groceries. Photo ID recommended for household count. Open every Tuesday except Thanksgiving and Christmas weeks.', 'Tuesday: 10:00 AM - 2:00 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Malachi''s Storehouse at St. Patrick''s Church' AND fr.address = '4755 N Peachtree Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Malachi''s Storehouse at St. Patrick''s Church' AND fr.address = '4755 N Peachtree Rd'
  AND st.name IN ('Food Pantry', 'Free Meals')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Providence Community Baptist Church - Daily Bread Ministry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Providence Community Baptist Church - Daily Bread Ministry', '38 Austin Ave SE', 'Marietta', 'GA', '30060', c.id, 33.9525, -84.5497, '(770) 428-3125', 'https://www.providencecbc.org', 'Daily Bread Ministry operating for over 30 years, providing food and clothing distribution. Serves Cobb County residents. Photo ID and household birthdates required.', 'Wednesday: 1:00 PM - 4:00 PM, 3rd Saturday: 9:00 AM - 1:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Providence Community Baptist Church - Daily Bread Ministry' AND fr.address = '38 Austin Ave SE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Providence Community Baptist Church - Daily Bread Ministry' AND fr.address = '38 Austin Ave SE'
  AND st.name IN ('Food Pantry', 'Clothing')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Schaffer Road Church of Christ
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Schaffer Road Church of Christ', '554 Schaffer Rd SW', 'Marietta', 'GA', '30060', c.id, 33.9472, -84.5705, '(770) 437-9047', 'https://schafferroad.org', 'Food pantry serving Cobb, Douglas, and Paulding counties. Photo ID or driver''s license required. Provides food assistance to individuals and families in need including children, adults, and senior citizens with limited or no income.', 'Monday-Friday: 8:00 AM - 5:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Schaffer Road Church of Christ' AND fr.address = '554 Schaffer Rd SW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Schaffer Road Church of Christ' AND fr.address = '554 Schaffer Rd SW'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Wright Street Baptist Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Wright Street Baptist Church', '395 Wright St', 'Marietta', 'GA', '30060', c.id, 33.9531, -84.5516, '(770) 422-5851', 'https://wsbcmarietta.com', 'Monthly food pantry serving Cobb County residents. Open the 3rd Saturday of every month. Call ahead to confirm hours and requirements.', '3rd Saturday: 8:00 AM - 9:30 AM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Wright Street Baptist Church' AND fr.address = '395 Wright St');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Wright Street Baptist Church' AND fr.address = '395 Wright St'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Shiloh Seventh-Day Adventist Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Shiloh Seventh-Day Adventist Church', '810 Church St', 'Smyrna', 'GA', '30080', c.id, 33.8839, -84.5144, '(770) 434-4548', 'https://shilohsda.org', 'Church Street Food Pantry operates through the Community Resource Center. Partners with Atlanta Community Food Bank to provide free food to South Cobb area residents in need.', '2nd & 4th Tuesday: 2:00 PM - 5:00 PM, 2nd & 4th Wednesday: 3:00 PM - 6:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Shiloh Seventh-Day Adventist Church' AND fr.address = '810 Church St');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Shiloh Seventh-Day Adventist Church' AND fr.address = '810 Church St'
  AND st.name IN ('Food Pantry', 'Community Resources')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Pleasant Grove Missionary Baptist Church - Grove Cares
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Pleasant Grove Missionary Baptist Church - Grove Cares', '566 Whitlock Ave NW', 'Marietta', 'GA', '30064', c.id, 33.9477, -84.5673, '(770) 428-3681', 'https://pleasantgrove.org', 'Grove Cares ministry offers periodic drive-thru grocery distributions throughout the year. Serves Cobb, Douglas, and Paulding counties. Text THEGROVEATL to 470-466-8552 for distribution dates notification. No appointment needed.', 'Periodic distributions - text THEGROVEATL to 470-466-8552 for dates'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Pleasant Grove Missionary Baptist Church - Grove Cares' AND fr.address = '566 Whitlock Ave NW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Pleasant Grove Missionary Baptist Church - Grove Cares' AND fr.address = '566 Whitlock Ave NW'
  AND st.name IN ('Food Distribution')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Hollydale United Methodist Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Hollydale United Methodist Church', '2364 Powder Springs Rd', 'Marietta', 'GA', '30064', c.id, 33.9351, -84.5898, '(770) 943-2273', 'https://www.hollydaleumc.org', 'Community food pantry serving Cobb, Douglas, and Paulding counties. Spanish-speaking services available (Hablamos Español). Open to anyone with need in the community.', 'Monday: 9:00 AM - 11:00 AM, Friday: 4:00 PM - 6:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Hollydale United Methodist Church' AND fr.address = '2364 Powder Springs Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Hollydale United Methodist Church' AND fr.address = '2364 Powder Springs Rd'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- St. Catherine of Siena Catholic Church - St. Vincent de Paul
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'St. Catherine of Siena Catholic Church - St. Vincent de Paul', '1618 Ben King Rd', 'Kennesaw', 'GA', '30144', c.id, 34.0233, -84.6153, '(770) 428-7139', 'https://www.stcatherinercc.org', 'Saint Vincent de Paul food pantry providing week''s worth of bagged non-perishable food and frozen meat once monthly to Kennesaw area households. Also provides paper products, diapers, and feminine products. By appointment only.', 'By appointment - email svdpcat@gmail.com'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'St. Catherine of Siena Catholic Church - St. Vincent de Paul' AND fr.address = '1618 Ben King Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'St. Catherine of Siena Catholic Church - St. Vincent de Paul' AND fr.address = '1618 Ben King Rd'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Acworth Emergency Food Pantry - Mars Hill Presbyterian Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Acworth Emergency Food Pantry - Mars Hill Presbyterian Church', '3385 Mars Hill Rd', 'Acworth', 'GA', '30101', c.id, 34.0653, -84.6779, '(770) 419-5649', 'https://www.mhchurch.com', 'Emergency food pantry operated by Mars Hill Presbyterian Church. By appointment only on Tuesdays and Fridays. Call to schedule appointment - if no answer, leave a message and a volunteer will return your call.', 'Tuesday & Friday: 9:30 AM - 10:00 AM (by appointment)'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Acworth Emergency Food Pantry - Mars Hill Presbyterian Church' AND fr.address = '3385 Mars Hill Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Acworth Emergency Food Pantry - Mars Hill Presbyterian Church' AND fr.address = '3385 Mars Hill Rd'
  AND st.name IN ('Food Pantry', 'Emergency Food')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Bascomb Mission Thrift Food Pantry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Bascomb Mission Thrift Food Pantry', '9550 Main St', 'Woodstock', 'GA', '30188', c.id, 34.1014, -84.5194, '(678) 324-7937', 'https://www.foodpantries.org', 'Thrift store and food pantry serving Cherokee County. No documentation required. Open Wednesday through Saturday for food assistance.', 'Wednesday-Friday: 10:00 AM - 5:00 PM, Saturday: 10:00 AM - 4:00 PM'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Bascomb Mission Thrift Food Pantry' AND fr.address = '9550 Main St');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Bascomb Mission Thrift Food Pantry' AND fr.address = '9550 Main St'
  AND st.name IN ('Food Pantry', 'Thrift Store')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Timothy's Cupboard - Timothy Lutheran Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Timothy''s Cupboard - Timothy Lutheran Church', '556 Arnold Mill Rd', 'Woodstock', 'GA', '30188', c.id, 34.1009, -84.5068, '(770) 591-5515', 'https://timothylutheran.360unite.com', 'Food ministry operating since October 1991 serving Cherokee, Bartow, and Cobb counties. By appointment only on Tuesdays. Call ahead to schedule.', 'Tuesday: 8:00 AM - 12:00 PM (by appointment)'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Timothy''s Cupboard - Timothy Lutheran Church' AND fr.address = '556 Arnold Mill Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Timothy''s Cupboard - Timothy Lutheran Church' AND fr.address = '556 Arnold Mill Rd'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- St. Michael the Archangel Catholic Church Food Pantry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'St. Michael the Archangel Catholic Church Food Pantry', '490 Arnold Mill Rd', 'Woodstock', 'GA', '30188', c.id, 34.1024, -84.5087, '(770) 516-0009', 'https://saintmichaelcc.org', 'Food pantry serving Cherokee County residents in need. First come, first served basis with no appointment necessary. Located at top of hill past playground. Signage posted in parking lot.', 'Tuesday, Thursday, Saturday: 10:00 AM - 11:45 AM'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'St. Michael the Archangel Catholic Church Food Pantry' AND fr.address = '490 Arnold Mill Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'St. Michael the Archangel Catholic Church Food Pantry' AND fr.address = '490 Arnold Mill Rd'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Acworth United Methodist Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Acworth United Methodist Church', '4340 Collins Cir', 'Acworth', 'GA', '30101', c.id, 34.0665, -84.6772, '(770) 974-3312', 'https://www.acworthumc.org', 'Drive-through food pantry serving 160 families weekly and distributing almost 100,000 pounds of food annually. Open every Tuesday afternoon for drive-through pickup.', 'Tuesday: 12:00 PM - 3:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Acworth United Methodist Church' AND fr.address = '4340 Collins Cir');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Acworth United Methodist Church' AND fr.address = '4340 Collins Cir'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Jay Weaver Emergency Food Pantry - Heritage Presbyterian Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Jay Weaver Emergency Food Pantry - Heritage Presbyterian Church', '5323 Bells Ferry Rd', 'Acworth', 'GA', '30102', c.id, 34.0389, -84.6453, '(770) 926-3558', 'https://www.heritagepres.com', 'Emergency food pantry serving limited area within five miles of church location. For food pantry inquiries, call and dial extension 212.', 'Call (770) 926-3558 ext. 212 for hours and eligibility'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Jay Weaver Emergency Food Pantry - Heritage Presbyterian Church' AND fr.address = '5323 Bells Ferry Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Jay Weaver Emergency Food Pantry - Heritage Presbyterian Church' AND fr.address = '5323 Bells Ferry Rd'
  AND st.name IN ('Food Pantry', 'Emergency Food')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- MUST Ministries Cherokee
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'MUST Ministries Cherokee', '111 Brown Industrial Pkwy', 'Canton', 'GA', '30114', c.id, 34.2368, -84.4907, '(770) 479-5397', 'https://www.mustministries.org', 'MUST Ministries Cherokee County location offering food, clothing, employment services, and breads & sweets. Donations accepted Monday-Friday 8 AM - 2 PM.', 'Monday-Friday: 10:00 AM - 2:00 PM'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'MUST Ministries Cherokee' AND fr.address = '111 Brown Industrial Pkwy');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'MUST Ministries Cherokee' AND fr.address = '111 Brown Industrial Pkwy'
  AND st.name IN ('Food Pantry', 'Clothing', 'Community Resources')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Dominic's Mission
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Dominic''s Mission', '2960 Canton Hwy', 'Ball Ground', 'GA', '30107', c.id, 34.3344, -84.3754, '(404) 276-8182', 'https://www.dominicsmission.com', 'Community food kitchen offering free food, clothing, hygiene items, baby essentials, and meal vouchers. Located next to Rife Repurposing. Open Saturdays.', 'Saturday: 9:00 AM - 2:00 PM'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Dominic''s Mission' AND fr.address = '2960 Canton Hwy');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Dominic''s Mission' AND fr.address = '2960 Canton Hwy'
  AND st.name IN ('Food Pantry', 'Free Meals', 'Clothing')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- CAYA Reconciliation Ministries
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'CAYA Reconciliation Ministries', '445 Paulding Ln', 'Dallas', 'GA', '30132', c.id, 33.9276, -84.8408, '(770) 445-9303', 'https://www.cayaministry.com', 'Come As You Are Reconciliation Ministries food pantry serving Dallas and surrounding Paulding County communities. Each family may receive food assistance once per month.', 'Tuesday & Friday: 10:00 AM - 12:30 PM'
FROM counties c WHERE c.name = 'Paulding'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'CAYA Reconciliation Ministries' AND fr.address = '445 Paulding Ln');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'CAYA Reconciliation Ministries' AND fr.address = '445 Paulding Ln'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Northwest Christian Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Northwest Christian Church', '3737 Dallas Acworth Hwy NW', 'Acworth', 'GA', '30101', c.id, 34.0434, -84.6938, '(770) 425-2525', 'https://nwcc.net', 'Community food bank partnered with Atlanta Community Food Bank providing thousands of pounds of food monthly to hundreds of people. Proof of income and photo ID required. Located between Kennesaw and Acworth on Dallas Acworth Highway.', 'Tuesday & Thursday: 9:00 AM - 12:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Northwest Christian Church' AND fr.address = '3737 Dallas Acworth Hwy NW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Northwest Christian Church' AND fr.address = '3737 Dallas Acworth Hwy NW'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Faith Family Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Faith Family Church', '5744 Bells Ferry Rd', 'Acworth', 'GA', '30102', c.id, 34.0618, -84.6367, '(770) 926-4560', 'https://www.faithstreet.com/church/faith-family-church-acworth-ga', 'Assemblies of God church operating food pantry serving Cherokee County. Documents required: photo ID, Social Security proof, and proof of residence. Open Monday and Thursday mornings.', 'Monday & Thursday: 10:00 AM - 1:00 PM'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Faith Family Church' AND fr.address = '5744 Bells Ferry Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Faith Family Church' AND fr.address = '5744 Bells Ferry Rd'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Forever Fed
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Forever Fed', '4474 Towne Lake Pkwy', 'Woodstock', 'GA', '30189', c.id, 34.0933, -84.5691, '(678) 883-3314', 'https://www.foreverfed.org', 'Mobile ministry hosting seven outdoor drive-thru food pantries monthly at various locations throughout Cherokee and Cobb Counties. Call or visit website for current schedule and locations.', 'Monthly drive-thru events - check website for schedule'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Forever Fed' AND fr.address = '4474 Towne Lake Pkwy');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Forever Fed' AND fr.address = '4474 Towne Lake Pkwy'
  AND st.name IN ('Mobile Pantry', 'Food Distribution')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- House of Hope North Georgia
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'House of Hope North Georgia', '11954 Cumming Hwy', 'Canton', 'GA', '30115', c.id, 34.2086, -84.4845, '(770) 313-6287', 'https://houseofhopeng.org', 'Food bank ministry under Blessed Hope Baptist Church serving Cherokee County. Additional programs include clothes closet, smoke detector installation, car seat surplus, and satellite food pantries. Volunteer opportunities available Tuesday and Thursday mornings.', 'Wednesday: 3:30 PM - 6:30 PM'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'House of Hope North Georgia' AND fr.address = '11954 Cumming Hwy');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'House of Hope North Georgia' AND fr.address = '11954 Cumming Hwy'
  AND st.name IN ('Food Pantry', 'Clothing', 'Community Resources')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Encompass Ministries
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Encompass Ministries', '6551 Commerce Pkwy Suite 200', 'Woodstock', 'GA', '30189', c.id, 34.0877, -84.5239, '(770) 591-4707', 'https://www.encompassministriesinc.org', 'Client-choice food pantry serving Cherokee, Cobb, Bartow, North Fulton, and Pickens Counties. Provides week''s worth of groceries to individuals and families once every 3 months. By appointment only.', 'By appointment - call (770) 591-4707'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Encompass Ministries' AND fr.address = '6551 Commerce Pkwy Suite 200');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Encompass Ministries' AND fr.address = '6551 Commerce Pkwy Suite 200'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Greater Community Church Of God In Christ
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Greater Community Church Of God In Christ', '406 Roswell Street', 'Marietta', 'GA', '30060', c.id, 33.9621, -84.5402, '(770) 590-8510', 'https://www.gccogic.org/', 'Food pantry serving Cobb County. ', '2nd and 3rd Saturday: 10 AM - 1 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Greater Community Church Of God In Christ' AND fr.address = '406 Roswell Street');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Greater Community Church Of God In Christ' AND fr.address = '406 Roswell Street'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- First Christian Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'First Christian Church', '569 Frasier St SE', 'Marietta', 'GA', '30060', c.id, 33.9489, -84.5361, '(770) 428-3125', 'https://fccmarietta.org/', 'Food pantry serving Cobb County. ', 'Monday: 9 AM - 1 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'First Christian Church' AND fr.address = '569 Frasier St SE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'First Christian Church' AND fr.address = '569 Frasier St SE'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Northwest Christian Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Northwest Christian Church', '3737 Dallas Acworth Hwy NW', 'Acworth', 'GA', '30101', c.id, 34.061, -84.7311, '(770) 425-2525', 'https://nwcc.net/', 'Food pantry serving Cherokee County. Bring identification.', 'Tuesday, Thursday: 9 AM - 12 PM'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Northwest Christian Church' AND fr.address = '3737 Dallas Acworth Hwy NW');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Northwest Christian Church' AND fr.address = '3737 Dallas Acworth Hwy NW'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Canton First Baptist
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Canton First Baptist', '1 Mission Point', 'Canton', 'GA', '30114', c.id, 34.2698, -84.4863, '(770) 479-5538', 'https://cantonfirstbaptist.org/', 'Food pantry serving canned and dry goods.', '1st Saturday: 9 AM - 12 PM'
FROM counties c WHERE c.name = 'Cherokee'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Canton First Baptist' AND fr.address = '1 Mission Point');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Canton First Baptist' AND fr.address = '1 Mission Point'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Grace Community Resource Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Grace Community Resource Center', '2170 Hwy 138 East', 'Stockbridge', 'GA', '30281', c.id, 33.5492, -84.2244, '(770) 474-8611', 'https://www.gcdiatl.org/', 'Food pantry serving Henry County residents. Call ahead to confirm hours.', 'Tuesday: 5:00 PM - 7:00 PM, Saturday: 9:00 AM - 12:00 PM'
FROM counties c WHERE c.name = 'Henry'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Grace Community Resource Center' AND fr.address = '2170 Hwy 138 East');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Grace Community Resource Center' AND fr.address = '2170 Hwy 138 East'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Locust Grove United Methodist Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Locust Grove United Methodist Church', '211 Peeksville Rd.', 'Locust Grove', 'GA', '30248', c.id, 33.3514, -84.1041, '(770) 957-9605', 'https://www.locustgroveumc.org/outreach', 'Food pantry serving the Locust Grove community.', 'Monday - Thursday: 9:00 AM - 3:00 PM'
FROM counties c WHERE c.name = 'Henry'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Locust Grove United Methodist Church' AND fr.address = '211 Peeksville Rd.');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Locust Grove United Methodist Church' AND fr.address = '211 Peeksville Rd.'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Helping in His Name Ministries
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Helping in His Name Ministries', '85 Bellamy Place', 'Stockbridge', 'GA', '30281', c.id, 33.5443, -84.2338, '(678) 565-6135', 'https://helpinginhisname.org/', 'Ecumenical nonprofit providing emergency assistance to unemployed, underemployed, elderly, and single parents in Henry County. By appointment only.', 'Monday, Wednesday, Friday: 9:00 AM - 11:30 AM, Tuesday: 5:30 PM - 6:30 PM, Thursday: 4:30 PM - 5:30 PM (by appointment only)'
FROM counties c WHERE c.name = 'Henry'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Helping in His Name Ministries' AND fr.address = '85 Bellamy Place');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Helping in His Name Ministries' AND fr.address = '85 Bellamy Place'
  AND st.name IN ('Food Pantry', 'Emergency Assistance', 'Case Management', 'Clothing', 'Housing Support', 'Financial Assistance')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Ambassador Life Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Ambassador Life Center', '125 Rock Quarry Rd.', 'Stockbridge', 'GA', '30281', c.id, 33.5412, -84.2257, '(470) 771-3663', 'https://ambassadorslifecenter.org/', 'Non-profit food pantry helping fight hunger in the Stockbridge community.', 'Monday - Friday: 1:30 PM - 6:30 PM'
FROM counties c WHERE c.name = 'Henry'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Ambassador Life Center' AND fr.address = '125 Rock Quarry Rd.');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Ambassador Life Center' AND fr.address = '125 Rock Quarry Rd.'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Good Samaritan Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Good Samaritan Center', '8366 Grady Street', 'Douglasville', 'GA', '30134', c.id, 33.7525, -84.7392, '(770) 949-7335', 'https://www.goodsamaritan-center.org/', 'Faith-based organization offering food and emergency financial aid to Douglas County citizens in need since 1983. Photo ID required.', 'Monday - Thursday: 9:00 AM - 12:30 PM, Thursday: 5:00 PM - 7:00 PM, Friday: 9:00 AM - 11:30 AM'
FROM counties c WHERE c.name = 'Douglas'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Good Samaritan Center' AND fr.address = '8366 Grady Street');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Good Samaritan Center' AND fr.address = '8366 Grady Street'
  AND st.name IN ('Food Pantry', 'Emergency Assistance', 'Financial Assistance')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Sweetwater Mission
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Sweetwater Mission', '6130 Hotel Street', 'Austell', 'GA', '30106', c.id, 33.8043, -84.6404, '(770) 819-0662', 'https://www.sweetwatermission.org/', 'Full-service client choice food pantry providing nutritious foods including meat and fresh produce. Photo ID and proof of residence required.', 'Monday - Thursday: 9:00 AM - 1:00 PM'
FROM counties c WHERE c.name = 'Cobb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Sweetwater Mission' AND fr.address = '6130 Hotel Street');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Sweetwater Mission' AND fr.address = '6130 Hotel Street'
  AND st.name IN ('Food Pantry', 'Clothing')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Columbia Drive United Methodist Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Columbia Drive United Methodist Church', '2067 Columbia Dr.', 'Decatur', 'GA', '30032', c.id, 33.7612, -84.2773, '(404) 284-4151', 'https://www.cdumc.com/', 'Food pantry serving DeKalb County residents in zip codes 30032, 30033, 30034, 30035. Requires documentation.', 'Thursday: 11:00 AM - 1:00 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Columbia Drive United Methodist Church' AND fr.address = '2067 Columbia Dr.');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Columbia Drive United Methodist Church' AND fr.address = '2067 Columbia Dr.'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Food4Life - Clarkston Distribution
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Food4Life - Clarkston Distribution', 'Corner of East Ponce de Leon and Brockett Roads', 'Clarkston', 'GA', '30021', c.id, 33.8191, -84.2318, '(678) 616-1285', 'https://atlsurvival.org/food/', 'Atlanta Survival Program providing free groceries at Clarkston distribution site. No requirements or documentation needed. Welcome to all.', 'Tuesday: 3:30 PM - 5:30 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Food4Life - Clarkston Distribution' AND fr.address = 'Corner of East Ponce de Leon and Brockett Roads');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Food4Life - Clarkston Distribution' AND fr.address = 'Corner of East Ponce de Leon and Brockett Roads'
  AND st.name IN ('Food Distribution', 'Fresh Produce', 'Community Support')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Clifton United Methodist Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Clifton United Methodist Church', '2918 Clifton Church Rd SE', 'Atlanta', 'GA', '30316', c.id, 33.7014, -84.3006, '(404) 241-3388', 'https://www.cliftonumc.org/', 'Food pantry serving zip codes 30032, 30034, 30316. Proof of income required. Open 3rd Wednesday of each month.', '3rd Wednesday: 10:00 AM - 12:30 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Clifton United Methodist Church' AND fr.address = '2918 Clifton Church Rd SE');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Clifton United Methodist Church' AND fr.address = '2918 Clifton Church Rd SE'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- World Changers Church International
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'World Changers Church International', '2500 Burdett Rd.', 'College Park', 'GA', '30349', c.id, 33.5949, -84.4735, '(770) 210-5757', 'https://worldchangers.org/', 'Food pantry serving multiple metro Atlanta counties. Proof of residence, picture ID, and birth certificates for children under 18 required.', 'Wednesday: 10:00 AM - 11:30 AM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'World Changers Church International' AND fr.address = '2500 Burdett Rd.');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'World Changers Church International' AND fr.address = '2500 Burdett Rd.'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Friendship Community Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Friendship Community Church', '4141 Old Fairburn Rd.', 'College Park', 'GA', '30349', c.id, 33.6456, -84.545, '(404) 349-6040', 'https://www.friendshipatl.org/', 'Food pantry serving multiple metro Atlanta counties including Fulton, Clayton, Cobb, DeKalb, Gwinnett, Henry, Paulding, and Rockdale.', 'Monday: 4:00 PM - 6:00 PM'
FROM counties c WHERE c.name = 'Fulton'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Friendship Community Church' AND fr.address = '4141 Old Fairburn Rd.');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Friendship Community Church' AND fr.address = '4141 Old Fairburn Rd.'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Lighthouse Food Pantry
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Lighthouse Food Pantry', 'Dallas', 'Dallas', 'GA', '30132', c.id, 33.9189, -84.8403, '(678) 363-7470', 'https://www.findhelp.org/', 'Food pantry serving Paulding County. Arrive by 11:45 AM at the latest to receive food.', 'Monday, Thursday, Friday: 10:00 AM - 12:00 PM'
FROM counties c WHERE c.name = 'Paulding'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Lighthouse Food Pantry' AND fr.address = 'Dallas');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Lighthouse Food Pantry' AND fr.address = 'Dallas'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- All Nations Life and Praise Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'All Nations Life and Praise Church', '3060 Hwy 155', 'Stockbridge', 'GA', '30281', c.id, 33.6163, -84.1637, '(770) 474-2996', 'http://www.allnationslifepraise.org/home.html', 'Food pantry helping fight hunger in the Stockbridge community.', 'Sunday: 11 AM - 12 PM, Wednesday: 5 PM - 8 PM, Saturday: 9 AM - 11 AM'
FROM counties c WHERE c.name = 'Henry'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'All Nations Life and Praise Church' AND fr.address = '3060 Hwy 155');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'All Nations Life and Praise Church' AND fr.address = '3060 Hwy 155'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- DEAM (Decatur Emergency Assistance Ministry)
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'DEAM (Decatur Emergency Assistance Ministry)', '515 E Ponce de Leon Ave', 'Decatur', 'GA', '30030', c.id, 33.7808, -84.2883, '(404) 373-9283', 'https://deamdecatur.org/', 'Provides food and emergency assistance to DeKalb County residents. Appointments scheduled Monday, Tuesday, Thursday, Friday between 9:00-11:30 AM (closed Wednesday).', 'Monday, Tuesday, Thursday, Friday: 9:00 AM - 11:30 AM (by appointment)'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'DEAM (Decatur Emergency Assistance Ministry)' AND fr.address = '515 E Ponce de Leon Ave');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'DEAM (Decatur Emergency Assistance Ministry)' AND fr.address = '515 E Ponce de Leon Ave'
  AND st.name IN ('Food Pantry', 'Emergency Assistance')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Hillside Presbyterian Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Hillside Presbyterian Church', '1879 Columbia Drive', 'Decatur', 'GA', '30032', c.id, 33.7369, -84.2532, '(404) 289-3092', 'https://hillsidepresbyterian.org/', 'Food pantry services available at Hillside Presbyterian Church serving the Decatur community.', 'Tuesday: 1:00 PM - 3:00 PM'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Hillside Presbyterian Church' AND fr.address = '1879 Columbia Drive');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Hillside Presbyterian Church' AND fr.address = '1879 Columbia Drive'
  AND st.name IN ('Food Pantry')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Made For Bigger, Inc.
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Made For Bigger, Inc.', '4209 Northeast Expy', 'Doraville', 'GA', '30340', c.id, 33.9053, -84.2739, '(470) 395-2104', 'https://www.madeforbigger.org', 'Community nonprofit hosting monthly grocery distributions (Proud Eats Food Pantry) and outreach programs.', 'Monthly distributions; check site or listings for next date'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Made For Bigger, Inc.' AND fr.address = '4209 Northeast Expy');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Made For Bigger, Inc.' AND fr.address = '4209 Northeast Expy'
  AND st.name IN ('Food Pantry', 'Grocery Distribution', 'Community Outreach')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- The Salvation Army — Atlanta Peachcrest Corps
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'The Salvation Army — Atlanta Peachcrest Corps', '3500 Sherrydale Ln', 'Decatur', 'GA', '30032', c.id, 33.7546, -84.2683, '1-800-SAL-ARMY', 'https://southernusa.salvationarmy.org/atlanta-peachcrest/', 'Family & Social Services including a food pantry and seasonal hunger relief in DeKalb County.', 'Food pantry open Mon, Tue, Thu, Fri (call for times)'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'The Salvation Army — Atlanta Peachcrest Corps' AND fr.address = '3500 Sherrydale Ln');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'The Salvation Army — Atlanta Peachcrest Corps' AND fr.address = '3500 Sherrydale Ln'
  AND st.name IN ('Food Pantry', 'Hunger Relief', 'Utility/Rent Assistance (seasonal)')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Wade Walker Park Family YMCA
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Wade Walker Park Family YMCA', '5605 Rockbridge Rd', 'Stone Mountain', 'GA', '30088', c.id, 33.7806, -84.1671, '(678) 781-9622', 'https://ymcaatlanta.org/locations/wade-walker-park-family-ymca', 'YMCA branch that hosts recurring hunger-relief grocery distributions.', '1st & 3rd Friday each month, 11:30 AM – 1:00 PM (distribution)'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Wade Walker Park Family YMCA' AND fr.address = '5605 Rockbridge Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Wade Walker Park Family YMCA' AND fr.address = '5605 Rockbridge Rd'
  AND st.name IN ('Mobile Pantry / Drive-Through Distribution', 'Youth & Family Programs')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Omega Support Center
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Omega Support Center', '2001 Montreal Rd, Ste 100', 'Tucker', 'GA', '30084', c.id, 33.8384, -84.2239, '(678) 615-2390', 'http://www.omegasupportcenter.org', 'Community nonprofit providing mass food distributions and outreach; office open on select weekdays.', 'Mon–Wed & Fri: 9:00 AM – 5:00 PM (distribution schedules vary)'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Omega Support Center' AND fr.address = '2001 Montreal Rd, Ste 100');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Omega Support Center' AND fr.address = '2001 Montreal Rd, Ste 100'
  AND st.name IN ('Food Distribution', 'Little Food Pantries', 'Community Outreach')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- New Love Tabernacle Christian Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'New Love Tabernacle Christian Church', '5480 Browns Mill Rd', 'Stonecrest', 'GA', '30038', c.id, 33.6675, -84.1454, '(770) 981-0072', 'https://newlovetabernacle.org', 'Church that hosts community food distributions/food-bank events.', 'Events scheduled as announced; check church site or call'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'New Love Tabernacle Christian Church' AND fr.address = '5480 Browns Mill Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'New Love Tabernacle Christian Church' AND fr.address = '5480 Browns Mill Rd'
  AND st.name IN ('Food Distribution Events', 'Church & Community Outreach')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- New Birth Missionary Baptist Church — The King’s Table
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'New Birth Missionary Baptist Church — The King’s Table', '6400 Woodrow Rd', 'Stonecrest', 'GA', '30038', c.id, 33.7077, -84.1399, '(770) 696-9600', 'https://www.wearenewbirth.org/kings-table', 'New Birth’s King’s Table Food Ministry provides large-scale free grocery distributions for families.', '1st & 3rd Saturday monthly, typically 9:00 AM (arrive early)'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'New Birth Missionary Baptist Church — The King’s Table' AND fr.address = '6400 Woodrow Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'New Birth Missionary Baptist Church — The King’s Table' AND fr.address = '6400 Woodrow Rd'
  AND st.name IN ('Food Pantry / Drive-Through Distribution', 'Regional Distribution Hub')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- Ray of Hope Christian Church
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'Ray of Hope Christian Church', '2778 Snapfinger Rd', 'Decatur', 'GA', '30034', c.id, 33.6997, -84.1977, '(770) 696-5100', 'https://www.rayofhope.org/', 'Church hosting periodic free food giveaway events for the community.', 'Dates vary; recent events listed on site (e.g., Saturday 10:00 AM)'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'Ray of Hope Christian Church' AND fr.address = '2778 Snapfinger Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'Ray of Hope Christian Church' AND fr.address = '2778 Snapfinger Rd'
  AND st.name IN ('Food Giveaway (periodic)', 'Church & Community Outreach')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

-- God’s Life and Living Holiness Church of Jesus Christ
INSERT INTO food_resources (name, address, city, state, zip_code, county_id, latitude, longitude, phone, website, description, hours)
SELECT 'God’s Life and Living Holiness Church of Jesus Christ', '3837 Linecrest Rd', 'Ellenwood', 'GA', '30294', c.id, 33.6625, -84.2473, '(404) 244-5656', 'https://www.facebook.com/p/Gods-Life-and-Living-Holiness-Church-of-Jesus-Christ-100092838262686/', 'Church location used for community food pantry/giveaway events.', 'Schedule varies; call for upcoming distributions'
FROM counties c WHERE c.name = 'DeKalb'
AND NOT EXISTS (SELECT 1 FROM food_resources fr WHERE fr.name = 'God’s Life and Living Holiness Church of Jesus Christ' AND fr.address = '3837 Linecrest Rd');
INSERT INTO resource_services (resource_id, service_type_id)
SELECT fr.id, st.id FROM food_resources fr, service_types st
WHERE fr.name = 'God’s Life and Living Holiness Church of Jesus Christ' AND fr.address = '3837 Linecrest Rd'
  AND st.name IN ('Food Pantry / Food Giveaway (periodic)', 'Church & Community Outreach')
ON CONFLICT (resource_id, service_type_id) DO NOTHING;

COMMIT;

-- Verification queries (run after commit):
-- SELECT COUNT(*) FROM food_resources;
-- SELECT COUNT(*) FROM resource_services;
-- Expect 125 rows in food_resources.