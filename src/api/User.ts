import { apiRoutes } from 'constants/apiConstants'
// import {
//   UpdateUserFields,
// } from 'hooks/react-hook-form/useCreateUpdateUser'
// import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
// import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'
import { UpdatePasswordFields, UpdateUserFields, UserType } from 'models/auth'
import { apiRequest } from './Api'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'
import { EmailUserFields } from 'hooks/react-hook-form/useEmail'
import { PasswordUserFields } from 'hooks/react-hook-form/usePassword'
import { LocationType } from 'models/location'

export const fetchUser = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.FETCH_USER)

export const signout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data)

export const register = async (data: RegisterUserFields) =>
  apiRequest<RegisterUserFields, void>('post', apiRoutes.SIGNUP, data)

export const emailSend = async (data: EmailUserFields) =>
  apiRequest<EmailUserFields, void>('post', apiRoutes.FORGOT_PASSWORD, data)

export const resetPassword = async (data: PasswordUserFields) =>
  apiRequest<PasswordUserFields, void>('post', apiRoutes.RESET_PASSWORD, data)

export const refreshTokens = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.REFRESH_TOKENS)

export const uploadAvatar = async (formData: FormData, id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${id}`,
    formData,
  )

export const getLocationsOfUser = async (page: number, take: number) =>
  apiRequest<undefined, LocationType[]>(
    'get',
    `${apiRoutes.USERS_PREFIX}/location?page=${page}&take=${take}`,
  )

export const updateUser = async (
  data: UpdateUserFields | UpdatePasswordFields,
) =>
  apiRequest<UpdateUserFields | UpdatePasswordFields, void>(
    'patch',
    `${apiRoutes.USERS_PREFIX}/update-user`,
    data,
  )
