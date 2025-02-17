import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

// Define the Zod schema for creating a task
export const CreateTaskDtoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title is too long'),
  description: z.string().nullable(), // optional or null field
  dueDate: z.string().datetime().optional(), // ISO date-time format
});

// Generate the DTO type from Zod schema
export class CreateTaskDto extends createZodDto(CreateTaskDtoSchema) {}
