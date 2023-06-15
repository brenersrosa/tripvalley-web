import { ItineraryProps } from './Itinerary'

export interface PackageProps {
  id: string
  isActive: 'active' | 'inactive'
  name: string
  imagePath: string
  description: string
  transferParticular: boolean
  transferExclusive: boolean
  transferShared: boolean
  departureDate: string
  backDate: string
  itineraries: {
    itinerary: ItineraryProps
  }[]
}
