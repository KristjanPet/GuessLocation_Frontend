import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import {
  LocationType,
  UpdateLocationType,
  createLocationType,
} from 'models/location'

export const createLocation = async (data: createLocationType) =>
  apiRequest<createLocationType, LocationType>('post', apiRoutes.LOCATION, data)

export const updateLocation = async (formData: FormData, id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_LOCATION_IMAGE}/${id}`,
    formData,
  )
