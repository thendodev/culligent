import { z } from 'zod';

export const AddressSchema = z.object({
  street: z.string().max(100),
  secondStreet: z.string().max(100).optional(),
  town: z.string().max(100),
  city: z.string().max(100),
  province: z.string().max(100),
  postalCode: z.string().max(4).regex(/[0-9]/),
});
