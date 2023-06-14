import { UserType } from './auth'
import { LocationType } from './location'

export type GuessType = {
  id: string
  lon: number
  lat: number
  distance: number
  user: UserType
  location: LocationType
  created_at: Date
}

export type createGuessType = {
  lon: number
  lat: number
}
