// Esquema de validación con Zod
import { z } from 'zod';

export const CompanyFormSchema = z.object({
  year_foundation: z
    .number()
    .min(4, 'Los datos de la empresa son obligatorios.'),
  market: z.array(z.string()).optional(),
  peru_was_founded: z.boolean(),
  country_was_founded: z.string().optional(),
  people_joined: z.number().optional(),
  need_hire_staff: z.number().optional(),
  payment_vouchers: z.array(z.string()).optional(),
  main_challenges: z.array(z.string()).optional(),
  political: z.number().optional(),
  social: z.number().optional(),
  economic: z.number().optional(),
  technological: z.number().optional(),
  environmental: z.number().optional(),
});

export type CompanyFormType = z.infer<typeof CompanyFormSchema>;
