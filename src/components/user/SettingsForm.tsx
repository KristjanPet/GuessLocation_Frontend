import { UpdatePasswordFields, UpdateUserFields } from 'models/auth'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import * as API from 'api/Api'
import Popup from 'reactjs-popup'
import { StatusCode } from 'constants/errorConstants'
import authStore from 'stores/auth.store'
import { Form, FormLabel } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Avatar from 'react-avatar'

const SettingsForm: FC = () => {
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [windowOpen, setWindowOpen] = useState(false)
  const [ConformOpen, setConformOpen] = useState(false)
  const [PasswordOpen, setPasswordOpen] = useState(false)
  const [AvatarOpen, setAvatarOpen] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

  const closeAll = () => {
    setWindowOpen(false)
    setConformOpen(false)
    setPasswordOpen(false)
    setAvatarOpen(false)
  }

  //USER INFO CHANGE
  const { handleSubmit, register } = useForm<UpdateUserFields>({
    defaultValues: {
      first_name: authStore.user ? authStore.user.first_name : '',
      last_name: authStore.user ? authStore.user.last_name : '',
      email: authStore.user ? authStore.user.email : '',
      avatar: authStore.user ? authStore.user.avatar : '',
    },
  })

  const onSubmit = async (data: UpdateUserFields) => {
    // console.log(data)
    if (file) {
      const formData = new FormData()
      formData.append('avatar', file, file.name)
      const fileResponse = await API.uploadAvatar(formData, authStore.user?.id!)
      if (fileResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(fileResponse.data.message)
        setShowError(true)
      } else if (
        fileResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(fileResponse.data.message)
        setShowError(true)
      } else {
        setAvatarOpen(false)
        setConformOpen(true)
      }
    } else {
      const response = await API.updateUser(data)

      if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(response.data.message)
        setShowError(true)
      } else if (
        response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(response.data.message)
        setShowError(true)
      } else {
        authStore.login(response.data)
        setWindowOpen(false)
        setPasswordOpen(false)
        setAvatarOpen(false)
        setConformOpen(true)
      }
    }
  }

  //PASSWORD CHANGE
  const {
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    register: registerPassword,
    setError: setErrorPassword,
  } = useForm<UpdatePasswordFields>({
    defaultValues: {
      old_password: '',
      password: '',
      confirm_password: '',
    },
  })

  const onSubmitPassword = async (data: UpdatePasswordFields) => {
    // console.log(data)

    if (authStore.user) {
      if (data.password !== data.confirm_password) {
        setErrorPassword('confirm_password', {
          type: 'custom',
          message: 'Passwords do not match',
        })
        return
      }

      const check = await API.login({
        email: authStore.user.email,
        password: data.old_password,
      })

      if (check.data.statusCode === StatusCode.BAD_REQUEST) {
        setErrorPassword('old_password', {
          type: 'custom',
          message: 'Wrong old password',
        })
        return
      }

      const response = await API.updateUser(data)

      if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
        setApiError(response.data.message)
        setShowError(true)
      } else if (
        response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
      ) {
        setApiError(response.data.message)
        setShowError(true)
      } else {
        console.log('UPDATED')

        authStore.login(response.data)
        setWindowOpen(false)
        setPasswordOpen(false)
        setAvatarOpen(false)
        setConformOpen(true)
      }
    }
  }

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
        // setFileError(false)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }, [file])

  //HIDE PASS
  const [pVisible, setPVisible] = useState(false)
  const [cVisible, setCVisible] = useState(false)
  const [oVisible, setOVisible] = useState(false)

  return (
    <>
      <button onClick={() => setWindowOpen(true)}>Profile settings</button>

      {/* PROFILE SETTINGS */}
      <Popup modal nested className="relative" open={windowOpen}>
        <div
          className=" fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-10"
          onClick={() => setWindowOpen(false)}
        />

        <div className="flex flex-col p-4 items-start absolute top-1/2 left-1/2 w-72 md:w-[37rem] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-20">
          <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
            <div className=" text-dark">
              <p className=" text-4xl">
                Profile <span className=" text-primary">settings.</span>{' '}
              </p>
              <p className=" my-4">Change your information.</p>
            </div>

            <Form.Group className="mb-4">
              <FormLabel htmlFor="email" className=" text-sm">
                Mail
              </FormLabel>
              <input
                type="email"
                placeholder="example@email.com"
                aria-label="Email"
                aria-describedby="email"
                className=" w-full border-b-2 border-gray-300 text-sm mt-4"
                {...register('email')}
              />
            </Form.Group>

            <div className="grid gap-4 my-4 text-sm">
              <div className=" col-start-1">
                <Form.Group className=" flex flex-col">
                  <FormLabel htmlFor="first_name" className="mb-1">
                    Fisrt name
                  </FormLabel>
                  <input
                    type="text"
                    aria-label="First_name"
                    aria-describedby="first_name"
                    className=" w-full border-b-2 border-gray-300 mt-4"
                    {...register('first_name')}
                  />
                </Form.Group>
              </div>
              <div className=" col-start-2">
                <Form.Group className=" flex flex-col">
                  <FormLabel htmlFor="last_name" className="mb-1">
                    Last name
                  </FormLabel>
                  <input
                    type="text"
                    aria-label="Last_name"
                    aria-describedby="last_name"
                    className=" w-full border-b-2 border-gray-300 mt-4"
                    {...register('last_name')}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="grid md:grid-cols-2 mb-4 gap-4 items-center">
              <div className="  ">
                <button
                  className=" w-full bg-dark py-2 text-white rounded "
                  type="button"
                  onClick={() => {
                    setPasswordOpen(true)
                    setWindowOpen(false)
                  }}
                >
                  {' '}
                  Change password{' '}
                </button>
              </div>
              <div className=" ">
                <button
                  className="w-full bg-primary py-2 text-white rounded"
                  type="button"
                  onClick={() => {
                    setAvatarOpen(true)
                    setWindowOpen(false)
                  }}
                >
                  {' '}
                  Change profile picture{' '}
                </button>
              </div>
            </div>

            <div className="flex justify-between md:justify-start items-center gap-3">
              <div className="">
                <button
                  className=" bg-primary py-2 px-7 text-white rounded"
                  type="submit"
                >
                  SUBMIT
                </button>
              </div>
              <div className="">
                <button
                  className=" text-dark "
                  onClick={() => closeAll()}
                  type="button"
                >
                  Cancle
                </button>
              </div>
            </div>
          </form>
        </div>
      </Popup>

      {/* PASSWORD SETTINGS */}
      <Popup modal nested className="relative" open={PasswordOpen}>
        <div
          className=" fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-10"
          onClick={() => closeAll()}
        />

        <div className="flex flex-col p-4 items-start absolute top-1/2 left-1/2 w-72 md:w-[37rem] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-20">
          <form
            onSubmit={handleSubmitPassword(onSubmitPassword)}
            className=" w-full"
          >
            <div className=" text-dark">
              <p className=" text-4xl">
                Profile <span className=" text-primary">settings.</span>{' '}
              </p>
              <p className=" my-4">Change your password.</p>
            </div>

            <Form.Group className="mb-4">
              <FormLabel htmlFor="old_password" className="text-sm">
                Current password
              </FormLabel>
              <div className=" flex flex-row border-b-2">
                <input
                  type={oVisible ? 'text' : 'password'}
                  placeholder="***********"
                  aria-label="Old_password"
                  aria-describedby="old_password"
                  className="w-full border-b-2 border-gray-300 text-sm mt-4"
                  {...registerPassword('old_password')}
                />
                <img
                  title={oVisible ? 'Hide password' : 'Show password'}
                  src={
                    oVisible
                      ? 'images/hidePassword.svg'
                      : 'images/showPassword.svg'
                  }
                  onClick={() => setOVisible(!oVisible)}
                  width={20}
                />
              </div>
              {errorsPassword.old_password && (
                <p className="text-danger">
                  {errorsPassword.old_password.message}
                </p>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <FormLabel htmlFor="new_password" className="text-sm">
                New password
              </FormLabel>
              <div className=" flex flex-row border-b-2">
                <input
                  type={pVisible ? 'text' : 'password'}
                  placeholder="***********"
                  aria-label="New_password"
                  aria-describedby="new_password"
                  className=" w-full border-b-2 border-gray-300 text-sm mt-4"
                  {...registerPassword('password', {
                    pattern: {
                      value:
                        /^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/,
                      message:
                        'Password must contain at least one special letter and be 7 or more characters long',
                    },
                    required: true,
                  })}
                />
                <img
                  title={pVisible ? 'Hide password' : 'Show password'}
                  src={
                    pVisible
                      ? 'images/hidePassword.svg'
                      : 'images/showPassword.svg'
                  }
                  onClick={() => setPVisible(!pVisible)}
                  width={20}
                />
              </div>
              {errorsPassword.password && (
                <p className="text-danger">{errorsPassword.password.message}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <FormLabel htmlFor="confirm_password" className="text-sm">
                Confirm new password
              </FormLabel>
              <div className=" flex flex-row border-b-2">
                <input
                  type={cVisible ? 'text' : 'password'}
                  placeholder="***********"
                  aria-label="Confirm_password"
                  aria-describedby="confirm_password"
                  className=" w-full border-b-2 border-gray-300 text-sm mt-4"
                  {...registerPassword('confirm_password', {
                    required: true,
                  })}
                />
                <img
                  title={cVisible ? 'Hide password' : 'Show password'}
                  src={
                    cVisible
                      ? 'images/hidePassword.svg'
                      : 'images/showPassword.svg'
                  }
                  onClick={() => setCVisible(!cVisible)}
                  width={20}
                />
              </div>
              {errorsPassword.confirm_password && (
                <p className="text-danger">
                  {errorsPassword.confirm_password.message}
                </p>
              )}
            </Form.Group>

            <div className="flex justify-between md:justify-start items-center gap-3">
              <div className="">
                <button
                  className=" bg-primary py-2 px-7 text-white rounded"
                  type="submit"
                >
                  SUBMIT
                </button>
              </div>
              <div className="">
                <button
                  className=" text-dark "
                  onClick={() => closeAll()}
                  type="button"
                >
                  Cancle
                </button>
              </div>
            </div>
          </form>
        </div>
      </Popup>

      {/* AVATAR SETTINGS */}
      <Popup modal nested className="position-relative" open={AvatarOpen}>
        <div
          className=" fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-10"
          onClick={() => closeAll()}
        />

        <div className="flex flex-col p-4 items-start absolute top-1/2 left-1/2 w-72 md:w-[37rem] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-20">
          <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
            <div className=" text-dark">
              <p className=" text-4xl">
                Profile <span className=" text-primary">settings.</span>{' '}
              </p>
              <p className=" my-4">Change your profile photo.</p>
            </div>

            <Form.Group className="flex flex-col justify-center items-center my-6">
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

            <div className="">
              <button
                className=" bg-primary py-2 px-7 text-white rounded w-full"
                type="button"
              >
                Upload new image
              </button>
            </div>

            <div className="flex justify-between md:justify-start items-center gap-3 mt-6">
              <div className="">
                <button
                  className=" bg-primary py-2 px-7 text-white rounded"
                  type="submit"
                >
                  SUBMIT
                </button>
              </div>
              <div className="">
                <button
                  className=" text-dark "
                  onClick={() => closeAll()}
                  type="button"
                >
                  Cancle
                </button>
              </div>
            </div>
          </form>
        </div>
      </Popup>

      {/* CONFORAMTION */}
      <Popup modal nested className=" relative" open={ConformOpen}>
        <div
          className=" fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-10"
          onClick={() => setConformOpen(false)}
        ></div>

        <div className=" flex flex-col p-6 gap-3 absolute top-1/2 left-1/2 w-72 md:w-[37rem] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-20">
          <p className=" text-4xl text-dark">Information changed.</p>
          <p className=" text-dark mb-2">Your settings are saved.</p>
          <div className="d-flex justify-content-center">
            <button
              className="text-white bg-primary px-8 py-2 rounded"
              type="button"
              onClick={() => setConformOpen(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default SettingsForm
