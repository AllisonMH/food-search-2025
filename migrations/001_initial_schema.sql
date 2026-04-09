-- Migration 001: Initial Database Schema
-- Creates tables for food resources application

-- Enable UUID extension (if needed for future use)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Counties lookup table
CREATE TABLE IF NOT EXISTS counties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service types lookup table
CREATE TABLE IF NOT EXISTS service_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Main food resources table
CREATE TABLE IF NOT EXISTS food_resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL DEFAULT 'GA',
  zip_code VARCHAR(10) NOT NULL,
  county_id INTEGER REFERENCES counties(id) ON DELETE RESTRICT,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  phone VARCHAR(20) NOT NULL,
  website VARCHAR(500),
  description TEXT NOT NULL,
  hours TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for many-to-many relationship between resources and service types
CREATE TABLE IF NOT EXISTS resource_services (
  resource_id INTEGER REFERENCES food_resources(id) ON DELETE CASCADE,
  service_type_id INTEGER REFERENCES service_types(id) ON DELETE CASCADE,
  PRIMARY KEY (resource_id, service_type_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_food_resources_county ON food_resources(county_id);
CREATE INDEX IF NOT EXISTS idx_food_resources_zip ON food_resources(zip_code);
CREATE INDEX IF NOT EXISTS idx_food_resources_active ON food_resources(is_active);
CREATE INDEX IF NOT EXISTS idx_food_resources_location ON food_resources(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_resource_services_resource ON resource_services(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_services_service ON resource_services(service_type_id);

-- Create full-text search index for name, description, and address
CREATE INDEX IF NOT EXISTS idx_food_resources_search ON food_resources
  USING gin(to_tsvector('english', name || ' ' || description || ' ' || address));

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on food_resources table
CREATE TRIGGER update_food_resources_updated_at
  BEFORE UPDATE ON food_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comments to tables for documentation
COMMENT ON TABLE counties IS 'Lookup table for Georgia counties served by food resources';
COMMENT ON TABLE service_types IS 'Lookup table for types of services offered (Food Pantry, Free Meals, etc.)';
COMMENT ON TABLE food_resources IS 'Main table storing food assistance locations and contact information';
COMMENT ON TABLE resource_services IS 'Junction table mapping resources to their offered service types';

COMMENT ON COLUMN food_resources.is_active IS 'Soft delete flag - false means resource is no longer available';
COMMENT ON COLUMN food_resources.latitude IS 'Latitude in decimal degrees for map display';
COMMENT ON COLUMN food_resources.longitude IS 'Longitude in decimal degrees for map display';
