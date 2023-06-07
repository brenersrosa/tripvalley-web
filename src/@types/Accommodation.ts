export interface AccommodationProps {
  id: string
  isActive: 'active' | 'inactive'
  name: string
  description: string
  dailyValue: number
  imagePath: string
  zipCode: string
  addressName: string
  districtName: string
  addressNumber: string
  city: string
  singleRoom: boolean
  doubleRoom: boolean
  doubleBedroom: boolean
  dormRoom: boolean
  breakfast: boolean
  lunch: boolean
  dinner: boolean
  wifi: boolean
  petFriendly: boolean
  parking: boolean
  gyn: boolean
  pool: boolean
  onSiteRestaurants: boolean
  nearbyRestaurants: boolean
  roomService: boolean
  transportService: boolean
  childrensArea: boolean
}
