// import { LoginUserFields, useLoginForm } from 'hooks/react-hook-form/useLogin'
import { FC, useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import FormLabel from 'react-bootstrap/FormLabel'
import { routes } from 'constants/routesConstants'
import Button from 'react-bootstrap/Button'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import { observer } from 'mobx-react'
import {
  PasswordUserFields,
  usePasswordForm,
} from 'hooks/react-hook-form/usePassword'

const RefreshPasswordFrom: FC = () => {
  const navigate = useNavigate()
  const [param] = useSearchParams()
  const { handleSubmit, errors, control } = usePasswordForm()

  const onSubmit = handleSubmit(async (data: PasswordUserFields) => {
    if (!param.get('token')) {
      return
    }

    const response = await API.resetPassword({
      ...data,
      token: param.get('token') || undefined,
    })
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      console.log(response.data.message)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      console.log(response.data.message)
    } else {
      navigate(routes.LOGIN)
    }
  })

  //HIDE PASS
  const [pVisible, setPVisible] = useState(false)
  const [cVisible, setCVisible] = useState(false)

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
              <h3 className="text-dark text-5xl text-center font-medium mb-2">
                Change password
              </h3>
              <p className="text-dark font-normal text-center">
                Change you password and please remeber it.
              </p>
            </div>
            {/* <Controller
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
            /> */}

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
              className=" w-full bg-primary text-white rounded py-2"
              type="submit"
            >
              {' '}
              SEND{' '}
            </Button>

            <div className="flex justify-between mb-2">
              <p className="mb-0 text-dark">
                Do you want to go back to sign in?
              </p>
              <Link className="text-primary" to={routes.LOGIN}>
                Sign in
              </Link>
            </div>
          </Form>
        </div>
        <div className=" laptop-hidden absolute right-0 top-0 h-full md:w-2/5 desktop:w-3/5">
          <img
            src="images/loginImage.png"
            alt="login"
            className=" object-cover h-full z-0 w-full"
          />
          <img
            src="images/loginLogo.svg"
            alt="login"
            className=" z-10 absolute right-1/3 top-1/3 m-auto w-auto"
          />
        </div>
      </div>
    </>
  )
}

export default observer(RefreshPasswordFrom)
