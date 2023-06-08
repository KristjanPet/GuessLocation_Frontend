import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import FormLabel from 'react-bootstrap/FormLabel'
import { routes } from 'constants/routesConstants'
import Button from 'react-bootstrap/Button'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import { observer } from 'mobx-react'
import { useQuery } from 'react-query'
import { LocationType, UpdateLocationType } from 'models/location'

const UpdateLocationForm: FC = () => {
  const navigate = useNavigate()
  const { locationId } = useParams()

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  //GET
  const { data: location, refetch } = useQuery<LocationType, Error>(
    ['location', locationId],
    () => API.getLocation(locationId!),
    {
      enabled: false, // Fetching is initially disabled
    },
  )
  useEffect(() => {
    // Manually trigger the location fetch when the component mounts
    refetch()
  }, [refetch])

  //UPDATE
  const { handleSubmit, register } = useForm<UpdateLocationType>({
    defaultValues: {
      avatar: '',
    },
  })

  const onSubmit = async (data: UpdateLocationType) => {
    if (!file) {
      setApiError('Image is required')
      setShowError(true)
      return
    }

    // navigate(routes.HOME)
    const formData = new FormData()
    formData.append('avatar', file, file.name)
    const fileResponse = await API.updateLocation(formData, locationId!)
    if (fileResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
      setShowError(true)
      setApiError(fileResponse.data.message)
    } else if (
      fileResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
    ) {
      setShowError(true)
      setApiError(fileResponse.data.message)
    } else {
      navigate(routes.HOME)
    }
  }

  //IMAGE
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

  const handleAddButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=" justify-center">
        <div className="my-6">
          <h1 className=" text-4xl text-dark text-center">
            Edit <span className="text-primary">location</span>
          </h1>
        </div>
        <div className="mb-4">
          <img
            className="w-full h-64 md:h-96 object-cover"
            src={preview ? preview : '/images/blankLocation.png'}
            alt="avatar"
          />
          <input
            onChange={handleFileChange}
            ref={fileInputRef}
            id="avatar"
            name="avatar"
            type="file"
            aria-label="Avatar"
            aria-describedby="avatar"
            className=" hidden"
          />
          {showError && <div className="text-danger">{apiError}</div>}
        </div>

        <div className="mb-4 flex">
          <p className="mr-2">Location:</p>
          <input
            type="text"
            value={`${location}`}
            readOnly
            className="w-full"
          />
        </div>
        <div className="md:flex justify-between">
          <div className="mb-4 md:mb-0">
            <button
              onClick={handleAddButtonClick}
              className=" rounded bg-primary w-full md:w-52 text-white py-2"
              type="button"
            >
              UPLOAD IMAGE
            </button>
          </div>
          <div className="flex justify-between gap-6">
            <button
              type="submit"
              className=" rounded bg-primary text-white py-2 px-12"
            >
              SAVE
            </button>
            <button type="submit" className=" text-dark">
              Cancle
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default observer(UpdateLocationForm)
