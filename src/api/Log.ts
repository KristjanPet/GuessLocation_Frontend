import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { EventPayload } from 'hooks/useLogLiostener'

export const createLog = async (data: EventPayload) =>
  apiRequest<EventPayload, void>('post', apiRoutes.LOG, data)
