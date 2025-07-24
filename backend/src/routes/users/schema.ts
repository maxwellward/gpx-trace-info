export interface CreateUserDto {
	token: string;
}

export interface CreateUserResponse {
	id: string;
	createdAt: string;
}

export const createUserSchema = {
	body: {
		type: 'object',
		required: ['token'],
		properties: {
			token: { type: 'string', minLength: 1 },
		},
	},
} as const;

export const createUserResponseSchema = {
	response: {
		201: {
			type: 'object',
			properties: {},
		},
	},
} as const;
