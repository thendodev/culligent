import { z } from 'zod';

export const ProfileDetailsSchema = z.object({
  bio: z.string().max(1000).optional(),
  profilePicture: z.string().optional(),
  phone: z.string().max(11),
  street: z.string().max(100),
  secondStreet: z.string().max(100).optional(),
  town: z.string().max(100),
  city: z.string().max(100),
  province: z.string().max(100),
  postalCode: z.string().max(4).regex(/[0-9]/),
  urls: z.string().array(),
});
