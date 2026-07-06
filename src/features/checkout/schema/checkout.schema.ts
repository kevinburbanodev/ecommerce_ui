import { z } from 'zod'

export const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Enter your full name'),
  email: z.email('Enter a valid email address'),
  address: z.string().min(4, 'Enter a street address'),
  city: z.string().min(2, 'Enter a city'),
  postalCode: z.string().min(3, 'Enter a postal code'),
  country: z.string().min(2, 'Enter a country'),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, 'Enter a 16-digit card number'),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY format'),
  cvc: z.string().regex(/^\d{3,4}$/, 'Enter a valid CVC'),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
