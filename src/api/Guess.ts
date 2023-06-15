import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { GuessType, createGuessType } from 'models/guess'

export const getGeuess = async (locationId: string) =>
  apiRequest<undefined, GuessType[]>(
    'get',
    `${apiRoutes.GUESS}/${locationId}/location?page=${1}&take=${13}`,
  )

export const getGeuessByUser = async (
  locationId: string,
  page: number,
  take: number,
) =>
  apiRequest<undefined, GuessType[]>(
    'get',
    `${apiRoutes.GUESS}/${locationId}/user?page=${page}&take=${take}`,
  )

export const createGuess = async (data: createGuessType, locationId: string) =>
  apiRequest<createGuessType, GuessType>(
    'post',
    `${apiRoutes.GUESS}/${locationId}`,
    data,
  )
