export interface SyncUserDto {
	token: string;
}

export const syncUserSchema = {
	body: {
		type: 'object',
		required: ['token'],
		properties: {
			token: { type: 'string', minLength: 1 },
		},
	},
} as const;

export const syncUserResponseSchema = {
	response: {
		201: {
			type: 'object',
			properties: {},
		},
	},
} as const;
