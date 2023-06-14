import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import mapboxgl, { Map, MapMouseEvent, Marker } from 'mapbox-gl'
import { observer } from 'mobx-react'
import { MdClose } from 'react-icons/md'
import 'mapbox-gl/dist/mapbox-gl.css'
import { createLocationType } from 'models/location'
import { useForm } from 'react-hook-form'
import { StatusCode } from 'constants/errorConstants'
import * as API from 'api/Api'
import { routes } from 'constants/routesConstants'

const CreateLocationForm: FC = () => {
  const navigate = useNavigate()

  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<Map | null>(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)
  const [marker, setMarker] = useState<Marker>(
    new mapboxgl.Marker({
      color: '#000000',
    }),
  )
  const [markerLat, setMarkerLat] = useState(0)
  const [markerLon, setMarkerLon] = useState(0)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  //CREATE
  const { handleSubmit, register } = useForm<createLocationType>({
    defaultValues: {
      lon: 0,
      lat: 0,
      avatar: '',
    },
  })

  const onSubmit = async (data: createLocationType) => {
    data.lat = markerLat
    data.lon = markerLon
    if (!file) {
      setApiError('Image is required')
      setShowError(true)
      return
    }
    const response = await API.createLocation(data)
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setShowError(true)
      setApiError(response.data.message)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setShowError(true)
      setApiError(response.data.message)
    } else {
      // navigate(routes.HOME)
      const formData = new FormData()
      formData.append('avatar', file, file.name)
      const fileResponse = await API.updateLocation(formData, response.data.id)
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
  }

  //MAP
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY || ''
  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    })
  })
  // const location = useLocation()

  useEffect(() => {
    if (map.current && marker) {
      map.current.on('click', (e) => {
        marker.setLngLat([e.lngLat.lng, e.lngLat.lat])
        setMarkerLat(e.lngLat.lat)
        setMarkerLon(e.lngLat.lng)
      })
      marker.setLngLat([0, 0])
      marker.addTo(map.current)
    }
  }, [])

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

  const handleDeleteButtonClick = () => {
    setPreview(null)
    setFile(null)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className=" justify-center">
        <div className="my-6">
          <h1 className=" text-4xl text-dark text-center">
            Add a new <span className="text-primary">location</span>
          </h1>
        </div>
        <div className="mb-4">
          <img
            className="w-full h-48 md:h-72 object-cover"
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
        <div className="mb-4 flex justify-end ">
          <button
            onClick={handleAddButtonClick}
            className=" rounded bg-primary w-full md:w-52 mr-5 text-white py-2"
            type="button"
          >
            UPLOAD IMAGE
          </button>
          <div className=" bg-delete rounded w-10 p-2">
            <MdClose
              size={24}
              className="  text-white"
              onClick={handleDeleteButtonClick}
            />
          </div>
        </div>
        <div ref={mapContainer} className=" w-full h-[12.18rem] mb-4" />
        <div>
          <p className="mb-3">Location</p>
          <input
            type="text"
            value={`${markerLat}, ${markerLon}`}
            readOnly
            className=" border mb-4 border-gray-300 w-full py-2"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className=" rounded bg-primary w-full md:w-36 text-white py-2"
            >
              ADD NEW
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default observer(CreateLocationForm)
