import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import FormLabel from 'react-bootstrap/FormLabel'
import { routes } from 'constants/routesConstants'
import Button from 'react-bootstrap/Button'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import authStore from 'stores/auth.store'
import Avatar from 'react-avatar'
import { observer } from 'mobx-react'
import {
  RegisterUserFields,
  useRegisterForm,
} from 'hooks/react-hook-form/useRegister'

const LoginForm: FC = () => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useRegisterForm()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    if (!file) return
    const response = await API.register(data)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      // Login user before uploading an avatar image
      const loginResponse = await API.login({
        email: data.email,
        password: data.password,
      })
      if (loginResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(loginResponse.data.message)
        setShowError(true)
      } else if (
        loginResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(loginResponse.data.message)
        setShowError(true)
      } else {
        // Upload avatar
        const formData = new FormData()
        formData.append('avatar', file, file.name)
        const fileResponse = await API.uploadAvatar(
          formData,
          loginResponse.data.id,
        )
        if (fileResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
          setApiError(fileResponse.data.message)
          setShowError(true)
        } else if (
          fileResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
        ) {
          setApiError(fileResponse.data.message)
          setShowError(true)
        } else {
          // Get user with avatar image
          const userResponse = await API.fetchUser()
          if (
            userResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
          ) {
            setApiError(fileResponse.data.message)
            setShowError(true)
          } else {
            authStore.login(userResponse.data)
            navigate(routes.HOME)
          }
        }
      }
    }
  })

  const handleFileError = () => {
    if (!file) setFileError(true)
    else setFileError(false)
  }

  const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const myFile = target.files[0]
      setFile(myFile)
    }
  }

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        setFileError(false)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }, [file])

  return (
    <>
      <Form
        className="flex flex-col max-w-md mx-auto px-3 gap-3"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col items-center">
          <h3 className="text-dark text-5xl font-medium mb-2">Sign up</h3>
          <p className="text-dark font-normal text-center">
            Your name will appear on posts and your public profle.
          </p>
        </div>
        <Form.Group className="flex flex-col justify-center items-center">
          <FormLabel htmlFor="avatar" id="avatar-p" className="">
            {/* <div id="avatarParent">
              <div id="avatar">
                <Avatar round src={preview as string ?  preview as string : '/images/blankAvatarIcon.svg'} alt="avatar"/>
              </div>
              <div id="upload">
                <Avatar round src='/images/uploadAvatar.svg' alt="avatar"/>
              </div>
            </div> */}
            <img
              className=" rounded-full w-16 h-16"
              src={
                (preview as string)
                  ? (preview as string)
                  : '/images/blankAvatarIcon.svg'
              }
              alt="avatar"
            />
          </FormLabel>
          <input
            onChange={handleFileChange}
            id="avatar"
            name="avatar"
            type="file"
            aria-label="Avatar"
            aria-describedby="avatar"
            className="d-none"
          />
          {/* {fileError && (
            <div className="d-block invalid-feedback text-danger mb-2 text-center">
              Field avatar is required
            </div>
          )} */}
        </Form.Group>
      </Form>
    </>
  )
}

export default observer(LoginForm)
