import React, { FC, useState } from 'react'
import * as API from 'api/Api'
import { useForm } from 'react-hook-form'
import { MdClose } from 'react-icons/md'
import Popup from 'reactjs-popup'
import { StatusCode } from 'constants/errorConstants'
import { routes } from 'constants/routesConstants'
import { useNavigate } from 'react-router-dom'
import authStore from 'stores/auth.store'

type props = {
  location_id: string
}

const DeleteLocationForm: FC<props> = ({ location_id }) => {
  const navigate = useNavigate()
  const { handleSubmit } = useForm()

  const [windowOpen, setWindowOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)

  const onSubmit = async () => {
    const response = await API.deleteLocation(location_id)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setWindowOpen(false)
      setErrorOpen(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setWindowOpen(false)
      setErrorOpen(true)
    } else {
      setWindowOpen(false)
      setConfirmOpen(true)
    }
  }

  return (
    <>
      <div
        onClick={() => setWindowOpen(true)}
        className="absolute right-2 top-3"
      >
        <div className=" bg-delete rounded  p-2">
          <MdClose size={28} className="  text-white" />
        </div>
      </div>

      {/* DELTE LOCATION */}
      <Popup modal nested className=" relative" open={windowOpen}>
        <div
          className=" fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-10"
          onClick={() => setWindowOpen(false)}
        ></div>

        <div className=" flex flex-col p-4 items-start absolute top-1/2 left-1/2 w-72 md:w-96 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-20">
          <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
            <div className="">
              <p className=" text-4xl text-dark font-normal mb-8">
                Are you sure?
              </p>
              <p className=" text-dark mb-8">
                This location will be deleted. There is no undo of this action.
              </p>
            </div>

            <div className="flex justify-between my-2 gap-3">
              <button
                className=" text-white bg-primary px-8 py-2 rounded"
                type="submit"
              >
                SUBMIT
              </button>
              <button
                className="text-dark "
                onClick={() => setWindowOpen(false)}
                type="button"
              >
                Cancle
              </button>
            </div>
          </form>
        </div>
      </Popup>

      {/* CONFORAMTION */}
      <Popup modal nested className=" relative" open={confirmOpen}>
        <div
          className=" fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-10"
          onClick={() => setConfirmOpen(false)}
        ></div>

        <div className=" flex flex-col p-4 gap-6 items-center absolute top-1/2 left-1/2 w-72 md:w-96 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-20">
          <p className=" text-2xl  text-center">Your location was deleted.</p>
          {/* </div> */}

          <div className="d-flex justify-content-center w-100 my-2">
            <button
              className="text-white bg-primary px-8 py-2 rounded"
              type="button"
              onClick={() => setConfirmOpen(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      </Popup>

      {/* ERROR */}
      <Popup modal nested className=" relative" open={errorOpen}>
        <div
          className=" fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-10"
          onClick={() => setErrorOpen(false)}
        ></div>

        <div className=" flex flex-col p-4 gap-6 items-center absolute top-1/2 left-1/2 w-72 md:w-96 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl z-20">
          <p className=" text-2xl  text-center">
            Something went wrong while deliting your location, please try again.
            later
          </p>

          <div className="d-flex justify-content-center w-100 my-2">
            <button
              className="text-white bg-primary px-8 py-2 rounded"
              type="button"
              onClick={() => {
                setErrorOpen(false)
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default DeleteLocationForm
