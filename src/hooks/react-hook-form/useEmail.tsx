import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface EmailUserFields {
  email: string
}

export const useEmailForm = () => {
  const EmailSchema = Yup.object().shape({
    email: Yup.string().email().required('please enter a vild email'),
  })

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(EmailSchema),
  })

  return {
    handleSubmit,
    errors,
    reset,
    control,
  }
}

export type EmailForm = ReturnType<typeof useEmailForm>
