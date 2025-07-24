import postgres, { Sql } from 'postgres';
import { runMigrations } from './migrate';

let sql: Sql;

export const db = {
	connect: async () => {
		sql = postgres('postgres://', {
			host: '127.0.0.1',
			port: 5432,
			database: 'db',
			username: 'postgres',
			password: 'password',
		});

		await runMigrations(sql);

		console.log('Database connected');
		return;
	},
	disconnect: () => {
		if (sql) {
			sql.end();
		}
		console.log('Database disconnected');
	},
};

export default db;
export { sql };
