import { z } from 'zod'

export const itinerarySchema = z.object({
  isActive: z.enum(['active', 'inactive']),
  name: z.string(),
  description: z.string(),
  numberOfDays: z.number().min(1, 'O número deve ser maior que 0.'),
  valuePerPerson: z.number().min(1, 'O número deve ser maior que 0.'),
  content: z.array(z.string()),
  classification: z.array(z.string()),
  categoryId: z.string().uuid(),
  accommodationId: z.string().uuid(),
})

export type ItinerariesInputProps = z.infer<typeof itinerarySchema>
