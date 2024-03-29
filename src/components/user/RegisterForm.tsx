import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import FormLabel from 'react-bootstrap/FormLabel'
import { routes } from 'constants/routesConstants'
import Button from 'react-bootstrap/Button'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import authStore from 'stores/auth.store'
import { observer } from 'mobx-react'
import {
  RegisterUserFields,
  useRegisterForm,
} from 'hooks/react-hook-form/useRegister'

const LoginForm: FC = () => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useRegisterForm()
  const [apiError, setApiError] = useState('')

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

  //HIDE PASS
  const [pVisible, setPVisible] = useState(false)
  const [cVisible, setCVisible] = useState(false)

  const onSubmit = handleSubmit(async (data: RegisterUserFields) => {
    if (!file) return
    const response = await API.register(data)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
    } else {
      // Login user before uploading an avatar image
      const loginResponse = await API.login({
        email: data.email,
        password: data.password,
      })
      // console.log(loginResponse.data)

      if (loginResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(loginResponse.data.message)
      } else if (
        loginResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(loginResponse.data.message)
      } else {
        authStore.login(loginResponse.data)
        // Upload avatar
        const formData = new FormData()
        formData.append('avatar', file, file.name)
        const fileResponse = await API.uploadAvatar(
          formData,
          loginResponse.data.id,
        )
        if (fileResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
          setApiError(fileResponse.data.message)
        } else if (
          fileResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
        ) {
          setApiError(fileResponse.data.message)
        } else {
          // Get user with avatar image
          const userResponse = await API.fetchUser()
          if (
            userResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
          ) {
            setApiError(fileResponse.data.message)
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
      <div className="flex justify-center items-center md:justify-start mt-36 md:mt-0">
        <div className=" md:grid md:columns-2 md:h-screen ">
          <Link className="m-4 mobile-hidden " to={routes.HOME}>
            <img src="/images/NavbarLogo.svg" alt="GeoTagger" width={171} />
          </Link>
          <Form
            className="flex flex-col max-w-md mx-auto px-7 gap-3 md:row-start-2 md:col-start-2"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col items-center">
              <h3 className="text-dark text-5xl font-medium mb-2">Sign up</h3>
              <p className="text-dark font-normal text-center">
                Your name will appear on posts and your public profle.
              </p>
            </div>
            <Form.Group className="flex flex-col justify-center items-center">
              <FormLabel htmlFor="avatar" id="avatar-p" className=" relative">
                <div className=" relative w-16 h-16 [&>*]:h-16 [&>*]:w-16 ">
                  <img
                    className=" rounded-full  absolute hover:opacity-0 duration-100 object-cover"
                    src={preview ? preview : '/images/blankAvatarIcon.svg'}
                    alt="avatar"
                  />
                  <img
                    className=" rounded-full absolute opacity-0 hover:opacity-100 duration-100"
                    src={'/images/uploadAvatar.svg'}
                    alt="avatar"
                  />
                </div>
              </FormLabel>
              <input
                onChange={handleFileChange}
                id="avatar"
                name="avatar"
                type="file"
                aria-label="Avatar"
                aria-describedby="avatar"
                className=" hidden"
              />
              {fileError && (
                <div className="d-block invalid-feedback text-danger mb-2 text-center">
                  Field avatar is required
                </div>
              )}
            </Form.Group>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Form.Group className="mb-2">
                  <FormLabel
                    htmlFor="email"
                    className="mb-2 text-xs font-medium text-dark"
                  >
                    Email
                  </FormLabel>
                  <input
                    {...field}
                    type="email"
                    placeholder="example@email.com"
                    aria-label="Email"
                    aria-describedby="email"
                    className="flex flex-col items-center border-b-2 w-full h-11 px-3 text-xs"
                  />
                  {errors.email && (
                    <div className="Invalid-feedback text-danger">
                      {errors.email.message}
                    </div>
                  )}
                  {apiError && (
                    <div className="Invalid-feedback text-danger">
                      {apiError}
                    </div>
                  )}
                </Form.Group>
              )}
            />

            <div className="columns-2 mb-2">
              <div className="  col-span-1">
                <Controller
                  control={control}
                  name="first_name"
                  render={({ field }) => (
                    <Form.Group>
                      <FormLabel
                        htmlFor="first_name"
                        className="mb-2 text-xs font-medium text-dark"
                      >
                        Fisrt name
                      </FormLabel>
                      <input
                        {...field}
                        type="text"
                        aria-label="First_name"
                        aria-describedby="first_name"
                        placeholder="Jacob"
                        className="flex flex-col items-center border-b-2 w-full h-11 px-3 text-xs"
                      />
                      {errors.first_name && (
                        <div className="Invalid-feedback text-danger">
                          {errors.first_name.message}
                        </div>
                      )}
                    </Form.Group>
                  )}
                />
              </div>
              <div className=" col-span-1">
                <Controller
                  control={control}
                  name="last_name"
                  render={({ field }) => (
                    <Form.Group>
                      <FormLabel
                        htmlFor="last_name"
                        className="mb-2 text-xs font-medium text-dark"
                      >
                        Last name
                      </FormLabel>
                      <input
                        {...field}
                        type="text"
                        aria-label="Last_name"
                        aria-describedby="last_name"
                        placeholder="Jones"
                        className="flex flex-col items-center border-b-2 w-full h-11 px-3 text-xs"
                      />
                      {errors.last_name && (
                        <div className="Invalid-feedback text-danger">
                          {errors.last_name.message}
                        </div>
                      )}
                    </Form.Group>
                  )}
                />
              </div>
            </div>

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Form.Group className="mb-2">
                  <FormLabel
                    htmlFor="password"
                    className="mb-2 text-xs font-medium text-dark"
                  >
                    Password
                  </FormLabel>
                  <div className=" flex flex-row border-b-2">
                    <input
                      {...field}
                      type={pVisible ? 'text' : 'password'}
                      placeholder="************"
                      aria-label="Password"
                      aria-describedby="password"
                      className="flex flex-col items-center  w-full h-11 px-3 text-xs"
                    />
                    <img
                      title={pVisible ? 'Hide password' : 'Show password'}
                      src={
                        pVisible
                          ? 'images/hidePassword.svg'
                          : 'images/showPassword.svg'
                      }
                      alt="show pass"
                      onClick={() => setPVisible(!pVisible)}
                      width={20}
                    />
                  </div>

                  {errors.password && (
                    <div className="Invalid-feedback text-danger">
                      {errors.password.message}
                    </div>
                  )}
                </Form.Group>
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field }) => (
                <Form.Group className="mb-3">
                  <FormLabel
                    htmlFor="confirm_password"
                    className="mb-2 text-xs font-medium text-dark"
                  >
                    Confirm Password
                  </FormLabel>
                  <div className=" flex flex-row border-b-2">
                    <input
                      {...field}
                      type={cVisible ? 'text' : 'password'}
                      placeholder="************"
                      aria-label="confirm_Password"
                      aria-describedby="confirm_password"
                      className="flex flex-col items-center border-b-2 w-full h-11 px-3 text-xs"
                    />
                    <img
                      title={cVisible ? 'Hide password' : 'Show password'}
                      src={
                        cVisible
                          ? 'images/hidePassword.svg'
                          : 'images/showPassword.svg'
                      }
                      alt="show pass"
                      onClick={() => setCVisible(!cVisible)}
                      width={20}
                    />
                  </div>

                  {errors.confirm_password && (
                    <div className="Invalid-feedback text-danger">
                      {errors.confirm_password.message}
                    </div>
                  )}
                </Form.Group>
              )}
            />

            <Button
              className="w-full bg-primary text-white rounded py-2"
              type="submit"
              onMouseUp={handleFileError}
            >
              Sign up
            </Button>
            <div className="flex justify-between  mt-2">
              <p className=" text-dark">Already have an account?</p>
              <Link className="text-primary" to={routes.LOGIN}>
                Sign in
              </Link>
            </div>
          </Form>
        </div>
        <div className=" laptop-hidden absolute right-0 top-0 h-full md:w-2/5 desktop:w-3/5">
          <img
            src="images/loginImage.png"
            alt="login "
            className=" object-cover h-full z-0 w-full"
          />
          <img
            src="images/loginLogo.svg"
            alt="login "
            className=" z-10 absolute right-1/3 top-1/3 m-auto w-auto"
          />
        </div>
      </div>
    </>
  )
}

export default observer(LoginForm)
