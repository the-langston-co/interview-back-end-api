import { z } from 'zod';

// Define the Zod schema for login DTO
export const LoginDtoSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(5, 'Password must be at least 5 characters long'),
});

// Infer the LoginDto Type
export type LoginDto = z.infer<typeof LoginDtoSchema>;
