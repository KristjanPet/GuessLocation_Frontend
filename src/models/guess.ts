import { UserType } from './auth'

export type GuessType = {
  id: string
  lon: number
  lat: number
  distance: number
  user: UserType
  created_at: Date
}

export type createGuessType = {
  lon: number
  lat: number
}
