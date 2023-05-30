import { z } from 'zod'

export const generalInfoSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({
      message: 'Must be a valid email',
    })
    .optional(),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' })
    .optional(),
});
export type GeneralInfoSchemaType = z.infer<typeof generalInfoSchema>