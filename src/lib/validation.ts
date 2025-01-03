// lib/validations.ts (por ejemplo)
import { z } from 'zod';

export const UserFormSchema = z.object({
  full_name: z.string().min(1, 'El nombre completo es obligatorio'),
  email: z.string().email('Debe ser un correo válido'),
  year_birthday: z.number().optional(),
  nationality: z.string().optional(),
  gender: z.number().optional(), // en Django es PositiveSmallIntegerField
  level_of_study: z.number().optional(),
  academic_or_work_area: z.array(z.string()).optional(),
  current_position: z.string().optional(),
});

export type UserFormType = z.infer<typeof UserFormSchema>;
