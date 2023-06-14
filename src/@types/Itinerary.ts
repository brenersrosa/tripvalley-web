import { AccommodationProps } from './Accommodation'
import { CategoryProps } from './Category'

export interface ItineraryProps {
  id: string
  isActive: 'active' | 'inactive'
  name: string
  description: string
  numberOfDays: number
  valuePerPerson: number
  content: string[]
  classification: string[]
  category: CategoryProps
  accommodation: AccommodationProps
}
