import { sql } from '../db';

export class UserService {
	async getUserById(id: string) {
		console.log(`Getting user by ID: ${id}`);
		return { id, name: 'Mock User' };
	}

	async createUser(token: string, id: number, username: string) {
		await sql`
      insert into users (id, username)
      values (${id}, ${username})
      on conflict (id) do update set username = excluded.username
	  `;

		// expires_at is 14 days from now
		await sql`
	  insert into user_tokens (user_id, token, expires_at)
	  values (${id}, ${token}, to_timestamp(${Date.now() / 1000 + 14 * 24 * 60 * 60}))
	  on conflict (user_id) do update 
	  set token = excluded.token, expires_at = excluded.expires_at
	`;
	}
}

export default new UserService();
