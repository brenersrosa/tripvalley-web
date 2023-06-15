import { z } from 'zod'

export const accommodationSchema = z.object({
  isActive: z.enum(['active', 'inactive']),
  name: z.string(),
  description: z.string(),
  dailyValue: z.number().min(1, 'O número deve ser maior que 0.'),
  imagePath: z.string().url(),
  zipCode: z.string(),
  addressName: z.string(),
  districtName: z.string(),
  addressNumber: z.string(),
  uf: z.string(),
  city: z.string(),
  singleRoom: z.boolean(),
  doubleRoom: z.boolean(),
  doubleBedroom: z.boolean(),
  dormRoom: z.boolean(),
  breakfast: z.boolean(),
  lunch: z.boolean(),
  dinner: z.boolean(),
  wifi: z.boolean(),
  petFriendly: z.boolean(),
  parking: z.boolean(),
  gyn: z.boolean(),
  pool: z.boolean(),
  onSiteRestaurants: z.boolean(),
  nearbyRestaurants: z.boolean(),
  roomService: z.boolean(),
  transportService: z.boolean(),
  childrensArea: z.boolean(),
})

export type AccommodationsInputProps = z.infer<typeof accommodationSchema>
