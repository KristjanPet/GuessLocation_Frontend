import { apiRoutes } from 'constants/apiConstants'
// import {
//   UpdateUserFields,
// } from 'hooks/react-hook-form/useCreateUpdateUser'
// import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
// import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'
import { UserType } from 'models/auth'
import { apiRequest } from './Api'

export const fetchUser = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.FETCH_USER)

export const signout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)

// export const login = async (data: LoginUserFields) =>
//   apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data)

// export const register = async (data: RegisterUserFields) =>
//   apiRequest<RegisterUserFields, void>('post', apiRoutes.SIGNUP, data)

export const refreshTokens = async () =>
  apiRequest<undefined, UserType>('get', apiRoutes.REFRESH_TOKENS)

export const uploadAvatar = async (formData: FormData, id: string) =>
  apiRequest<FormData, void>(
    'post',
    `${apiRoutes.UPLOAD_AVATAR_IMAGE}/${id}`,
    formData,
  )

// export const updateUser = async (data: UpdateUserFields, id: string) =>
//   apiRequest<UpdateUserFields, void>(
//     'patch',
//     `${apiRoutes.USERS_PREFIX}/${id}`,
//     data,
//   )
