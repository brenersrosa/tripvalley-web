import { z } from 'zod'

export const packageSchema = z.object({
  isActive: z.enum(['active', 'inactive']),
  name: z.string(),
  description: z.string(),
  imagePath: z.string(),
  departureDate: z.string().datetime(),
  backDate: z.string().datetime(),
  transferParticular: z.boolean().default(false),
  transferExclusive: z.boolean().default(false),
  transferShared: z.boolean().default(false),
  itineraries: z.array(z.string().uuid()),
})

export type PackageInputProps = z.infer<typeof packageSchema>
