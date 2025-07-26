-- Migration: add_last_sync_to_user_table
ALTER TABLE users
ADD COLUMN last_sync TIMESTAMP DEFAULT CURRENT_TIMESTAMP
