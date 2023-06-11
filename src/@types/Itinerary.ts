import { AccommodationProps } from './Accommodation'

export interface ItineraryProps {
  id: string
  isActive: 'active' | 'inactive'
  name: string
  numberOfDays: number
  description: string
  valuePerPerson: number
  content: string[]
  classification: string[]
  transferParticular: boolean
  transferExclusive: boolean
  transferShared: boolean
  categoryId: string
  accommodation: AccommodationProps
}
