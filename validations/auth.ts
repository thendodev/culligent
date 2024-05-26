import z from 'zod';

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

export type TSignUp = z.infer<typeof signUpSchema>;

export type TLogin = z.infer<typeof loginSchema>;
