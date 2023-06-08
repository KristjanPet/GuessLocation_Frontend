export type LocationType = {
  id: string
  lon: number
  lat: number
  avatar?: string
}

export type createLocationType = {
  lon: number
  lat: number
  avatar?: string
}

export type UpdateLocationType = {
  id: string
  avatar: string
}
