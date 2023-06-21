import { ItineraryProps } from './Itinerary'

export interface PackageProps {
  id: string
  isActive: 'active' | 'inactive'
  name: string
  description: string
  imagePath: string
  departureDate: Date
  backDate: Date
  transferParticular: boolean
  transferExclusive: boolean
  transferShared: boolean
  itineraries: {
    itinerary: ItineraryProps
  }[]
}
