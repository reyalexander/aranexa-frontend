// Esquema de validación con Zod
import { z } from 'zod';

export const CompanyBrandSchema = z.object({
  brand_information: z
    .string()
    .min(4, 'Los datos de la empresa son obligatorios.'),
  brand_name_registered: z.number().optional(),
  currently_present_media: z.array(z.string()).optional(),
  goals_achieve: z.array(z.string()).optional(),
  digital_media: z.coerce.number().optional(),
});

export type CompanyBrandType = z.infer<typeof CompanyBrandSchema>;
