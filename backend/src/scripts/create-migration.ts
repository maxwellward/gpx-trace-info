import fs from 'fs';
import path from 'path';
import { parseArgs } from 'node:util';

// Parse command line arguments
const { values } = parseArgs({
	options: {
		name: { type: 'string' }
	}
});

// Validate name parameter
if (!values.name) {
	console.error('Error: --name parameter is required');
	console.error('Usage: ts-node create-migration.ts --name=your-migration-name');
	process.exit(1);
}

// Generate migration filename
const timestamp = Math.floor(Date.now() / 1000); // Unix timestamp (seconds)
const filename = `${timestamp}_${values.name}.sql`;

// Define paths
const migrationsDir = path.resolve(__dirname, '../migrations');
const migrationPath = path.join(migrationsDir, filename);

// Ensure migrations directory exists
if (!fs.existsSync(migrationsDir)) {
	fs.mkdirSync(migrationsDir, { recursive: true });
}

// Create empty migration file
fs.writeFileSync(migrationPath, '-- Migration: ' + values.name + '\n\n');

console.log(`Created migration file: ${migrationPath}`);