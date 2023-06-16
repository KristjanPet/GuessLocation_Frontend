import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { EventPayload } from 'hooks/useLogLiostener'

export const getLog = async (id: string) =>
  apiRequest<undefined, EventPayload[]>(
    'get',
    `${apiRoutes.LOG}?userId=${id}&page=${1}&take=${100}`,
  )

export const createLog = async (data: EventPayload) =>
  apiRequest<EventPayload, void>('post', apiRoutes.LOG, data)
