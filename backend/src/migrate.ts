import fs from 'fs';
import path from 'path';

export async function runMigrations(sql: any) {
	const migrationsDir = path.join(__dirname, 'migrations');

	// Check if migrations directory exists
	if (!fs.existsSync(migrationsDir)) {
		fs.mkdirSync(migrationsDir, { recursive: true });
		console.log('Created migrations directory');
		return;
	}

	const migrationFiles = fs
		.readdirSync(migrationsDir)
		.filter((file) => file.endsWith('.sql'))
		.sort();

	// Create migrations table if it doesn't exist
	await sql`
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            filename VARCHAR(255) UNIQUE NOT NULL,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

	for (const file of migrationFiles) {
		const rows = await sql`
            SELECT filename FROM migrations WHERE filename = ${file}
        `;

		if (rows.length === 0) {
			console.log(`Running migration: ${file}`);
			const sqlContent = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

			try {
				// Execute the migration SQL
				await sql.unsafe(sqlContent);

				// Record that this migration was executed
				await sql`
                    INSERT INTO migrations (filename) VALUES (${file})
                `;

				console.log(`Migration completed: ${file}`);
			} catch (error) {
				console.error(`Migration failed: ${file}`, error);
				throw error;
			}
		}
	}
}
