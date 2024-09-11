/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';

/** Auth Users  */
const authSchema = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string(),
	password_confirmation: z.string(),
	token: z.string()
});

type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'email' | 'password' >;
export type UserRegistrationForm = Pick<Auth,"username" | "email" | "password" | "password_confirmation">;
export type TokenConformation = Pick<Auth, 'token'>

