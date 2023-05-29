// import { LoginUserFields, useLoginForm } from 'hooks/react-hook-form/useLogin'
import { FC, useState } from 'react'
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
import { observer } from 'mobx-react'
import { LoginUserFields, useLoginForm } from 'hooks/react-hook-form/useLogin'

const LoginForm: FC = () => {
  const navigate = useNavigate()
  const { handleSubmit, errors, control } = useLoginForm()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const onSubmit = handleSubmit(async (data: LoginUserFields) => {
    const response = await API.login(data)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      authStore.login(response.data)
      navigate(routes.HOME)
    }
  })

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
            <div className="flex flex-col items-center p-1">
              <h3 className="text-dark text-5xl font-medium mb-2">Sign in</h3>
              <p className="text-dark font-normal text-center">
                Welcome back to Geotagger. We are glad that you are back.
              </p>
            </div>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Form.Group className="mb-2 text-xs font-medium text-dark">
                  <FormLabel htmlFor="email" className="">
                    Email
                  </FormLabel>
                  <input
                    {...field}
                    type="text"
                    placeholder="example@email.com"
                    aria-label="Email"
                    aria-describedby="email"
                    className="flex flex-col items-center border w-full h-11  px-3"
                  />
                  {errors.email && (
                    <div className="Invalid-feedback text-danger">
                      {errors.email.message}
                    </div>
                  )}
                </Form.Group>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Form.Group className="mb-3 text-xs font-medium text-dark">
                  <FormLabel htmlFor="password" className="">
                    Password
                  </FormLabel>
                  <input
                    {...field}
                    type="password"
                    placeholder="***********"
                    aria-label="Password"
                    aria-describedby="password"
                    className="flex flex-col items-center border w-full h-11 px-3"
                  />
                  {errors.password && (
                    <div className="Invalid-feedback text-danger">
                      {errors.password.message}
                    </div>
                  )}
                  {showError && <div className="text-danger">{apiError}</div>}
                </Form.Group>
              )}
            />

            <Button
              className=" w-full bg-primary text-white rounded py-2"
              type="submit"
            >
              {' '}
              SIGN IN{' '}
            </Button>

            <div className="flex justify-between mb-2">
              <p className="mb-0 text-dark">
                Do you want to create an account?
              </p>
              <Link className="text-primary" to={routes.SIGNUP}>
                Sign up
              </Link>
            </div>
          </Form>
        </div>
        <div className=" laptop-hidden absolute right-0 top-0 h-full md:w-2/5 desktop:w-3/5">
          <img
            src="images/loginImage.png"
            alt="login image"
            className=" object-cover h-full z-0 w-full"
          />
          <img
            src="images/loginLogo.svg"
            alt="login image"
            className=" z-10 absolute right-1/3 top-1/3 m-auto w-auto"
          />
        </div>
      </div>
    </>
  )
}

export default observer(LoginForm)
