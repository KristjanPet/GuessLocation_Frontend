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

  return (
    <>
      <button onClick={() => setWindowOpen(true)}>Users log</button>

      {/* LOG */}
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
    </>
  )
}

export default SettingsForm
