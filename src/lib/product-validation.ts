// Esquema de validación con Zod
import { z } from 'zod';

export const ProductSchema = z.object({
  product_name: z.array(z.string()).optional(),
  product_description: z.string().optional(),
  created_product_from: z.array(z.string()).optional(),
  product_invest: z.array(z.string()).optional(),
  keep_product_track: z.array(z.string()).optional(),
  price_appropiate: z.number().optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;
