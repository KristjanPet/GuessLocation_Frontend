import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import {
  LocationType,
  UpdateLocationType,
  createLocationType,
} from 'models/location'

export const getLocation = async (page: number, take: number) =>
  apiRequest<undefined, LocationType[]>(
    'get',
    `${apiRoutes.LOCATION}?page=${page}&take=${take}`,
  )

export const getLocationById = async (id: string) =>
  apiRequest<undefined, LocationType>('get', `${apiRoutes.LOCATION}/${id}`)

export const createLocation = async (data: createLocationType) =>
  apiRequest<createLocationType, LocationType>('post', apiRoutes.LOCATION, data)

export const updateLocation = async (formData: FormData, id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_LOCATION_IMAGE}/${id}`,
    formData,
  )
