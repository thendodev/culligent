import mongoose from 'mongoose';
import { z } from 'zod';

export const objectIdValidator = z
  .custom(
    (value) => (
      mongoose.Types.ObjectId.isValid(value),
      {
        message: 'Invalid ObjectId',
      }
    ),
  )
  .transform((value, ctx): mongoose.Types.ObjectId => {
    try {
      return mongoose.Types.ObjectId.createFromTime(value as any);
    } catch (e) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Value cannot be parsed to mongo id`,
      });

      return z.NEVER;
    }
  });

const objectIdStringValidator = z
  .string()
  .refine(mongoose.Types.ObjectId.isValid);

export const mongooseObjectId = {
  _id: objectIdValidator,
};

export const mongooseObjectIdString = {
  _id: objectIdStringValidator,
};
