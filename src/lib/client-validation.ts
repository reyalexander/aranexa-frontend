// Esquema de validación con Zod
import { z } from 'zod';

export const ClientSchema = z.object({
  client_type: z.number().optional(),
  target_audience: z.number().optional(),
  recommendations: z.array(z.string()).optional(),
});

export type ClientType = z.infer<typeof ClientSchema>;
