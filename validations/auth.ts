import z from 'zod';
import { objectIdValidator } from './mongoose';

export const loginSchema = z.object({
  email: z.string(),
  password: z
    .string()
    .refine((i) => !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.[\W]).{8,}$/.test(i), {
      message:
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character',
    }),
});

export const signUpSchema = z
  .object({
    name: z.string().min(1),
    surname: z.string().min(1),
    email: z.string().email(),
    password: z
      .string()
      .refine(
        (i) => /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(i),
        {
          message:
            'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character',
        },
      ),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export const SocialAccountSchema = z.object({
  access_token: z.object({
    token: z.string(),
    expires_in: z.number(),
  }),
  id_token: z.object({
    token: z.string(),
    expires_at: z.number(),
  }),
  scope: z.string(),
  token_type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  type: z.string(),
  userId: objectIdValidator,
});

const UserSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  isVerified: z.boolean().default(false),
  profile: z.number().default(1).optional(),
});

export const magicLinkSchema = z.object({
  email: z.string().email('Invalid email address'),
  userId: objectIdValidator,
  otp: z.string().min(6).max(6),
  isExpired: z.boolean().default(false),
  expiresAt: z.date(),
});

export const otpSchema = z.object({
  userId: objectIdValidator,
  otp: z.string().min(6).max(6),
  isExpired: z.boolean().superRefine((isExpired, ctx) => {
    if (isExpired) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'OTP is expired',
        path: ['isExpired'],
      });
    }
  }),
  expiresAt: z.date(),
});

const RefreshTokenSchema = z.object({
  userId: objectIdValidator,
  token: z.string(),
});

export type TRefreshToken = z.infer<typeof RefreshTokenSchema>;

export type TUser = z.infer<typeof UserSchema>;

export type TForgotPassword = z.infer<typeof magicLinkSchema>;

export type TSignUp = z.infer<typeof signUpSchema>;

export type TLogin = z.infer<typeof loginSchema>;

export type TOtp = z.infer<typeof otpSchema>;
export type TMagicLink = z.infer<typeof magicLinkSchema>;
export type TSocialAccount = z.infer<typeof SocialAccountSchema>;
