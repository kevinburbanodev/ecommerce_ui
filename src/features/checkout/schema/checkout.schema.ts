import { z } from 'zod'

// No card fields on purpose: this is a public demo and must never collect payment data.
// Messages shown to the buyer come from the active dictionary, keyed by field name.
export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.email(),
  phone: z.string().refine((value) => /^\d{10}$/.test(value.replace(/[\s-]/g, ''))),
  address: z.string().trim().min(6),
  city: z.string().trim().min(2),
  department: z.string().trim().min(2),
  payment: z.enum(['transfer', 'delivery']),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
