import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface PasswordUserFields {
  password: string
  confirm_password: string
  token?: string
}

export const usePasswordForm = () => {
  const PasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/,
        'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters.',
      )
      .required(),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password do not match')
      .required('password do not match'),
  })

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      password: '',
      confirm_password: '',
      token: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(PasswordSchema),
  })

  return {
    handleSubmit,
    errors,
    reset,
    control,
  }
}

export type EmailForm = ReturnType<typeof usePasswordForm>
