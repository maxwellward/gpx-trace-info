-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create user_tokens table
CREATE TABLE IF NOT EXISTS user_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    token_type VARCHAR(50) NOT NULL DEFAULT 'bearer',
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used TIMESTAMP
);

-- Token indexes
CREATE INDEX IF NOT EXISTS idx_user_tokens_user_id ON user_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tokens_token ON user_tokens(token);
CREATE INDEX IF NOT EXISTS idx_user_tokens_expires ON user_tokens(expires_at);

CREATE TYPE visibility_type AS ENUM ('public', 'private', 'trackable', 'identifiable');

-- Create gpx_files table
CREATE TABLE IF NOT EXISTS gpx_files (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	filename VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	distance DECIMAL(9,2) NOT NULL, -- in kilometers
	elevation_gain DECIMAL(9,2) NOT NULL,
	average_speed DECIMAL(9,2) NOT NULL,
	duration INTEGER NOT NULL, -- in seconds
	points INTEGER NOT NULL,
	start_point GEOMETRY(POINT, 4326) NOT NULL,  -- WGS84 coordinate system
	end_point GEOMETRY(POINT, 4326) NOT NULL,
	visibility visibility_type NOT NULL,
	uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- GPX indexes
CREATE INDEX IF NOT EXISTS idx_gpx_files_user_id ON gpx_files(user_id);