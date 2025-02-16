import { z } from 'zod';

// Define the Zod schema for user registration
export const RegisterDtoSchema = z
    .object({
        username: z.string().min(1, 'Username is required'),
        password: z.string().min(5, 'Password must be at least 5 characters long'),
        confirmPassword: z
            .string()
            .min(5, 'Confirm password must be at least 5 characters long'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'], // Path to highlight mismatch in error details
    });

// Infer the RegisterDto Type
export type RegisterDto = z.infer<typeof RegisterDtoSchema>;