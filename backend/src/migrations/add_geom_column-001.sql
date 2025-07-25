-- Add a geom column to the gpx_files table with PostGIS geometry type
ALTER TABLE gpx_files
ADD COLUMN geom GEOMETRY(LINESTRING, 4326) NOT NULL;

CREATE INDEX idx_gpx_files_geom ON gpx_files USING GIST (geom);