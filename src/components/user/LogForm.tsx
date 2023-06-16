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

  //USER INFO CHANGE
  const { handleSubmit, register } = useForm<{ userId: string }>({
    defaultValues: {
      userId: '',
    },
  })

  const onSubmit = async (data: { userId: string }) => {
    // console.log(data)
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

        <div className="flex flex-col p-4 items-start absolute top-1/2 left-1/2 w-72 md:w-[80rem] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-20">
          <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
            <div className=" text-dark">
              <p className=" text-4xl">
                User <span className=" text-primary">log.</span>{' '}
              </p>
            </div>

            <div className="grid grid-flow-col items-center gap-4 my-4 text-sm">
              <div className=" ">
                <Form.Group className=" flex flex-col">
                  <input
                    type="text"
                    placeholder="User ID"
                    aria-label="userID"
                    aria-describedby="userID"
                    className=" w-full  pt-2 border-b-2 border-gray-300 mt-4"
                    {...register('userId')}
                  />
                </Form.Group>
              </div>
              <div className=" ">
                <button
                  className=" bg-primary py-2 px-7 text-white rounded"
                  type="submit"
                >
                  SEARCH
                </button>
              </div>
            </div>
          </form>
          <div className="border border-slate-700 w-full h-full p-5"></div>
        </div>
      </Popup>
    </>
  )
}

export default SettingsForm
