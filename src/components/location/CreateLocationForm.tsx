import UpdateLocationForm from 'components/location/UpdateLocationForm'
import DashboardLayout from 'components/ui/DashboardLayout'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import mapboxgl, { Map } from 'mapbox-gl'
import { observer } from 'mobx-react'
import { MdClose } from 'react-icons/md'

const CreateLocationForm: FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<Map | null>(null)
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState(false)

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
  const location = useLocation()

  //IMAGE
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
      <div className=" justify-center">
        <div className="my-6">
          <h1 className=" text-4xl text-dark text-center">
            Add a new <span className="text-primary">location</span>
          </h1>
        </div>
        <div className="mb-4">
          <img
            className="w-full h-48 md:h-72"
            src={preview ? preview : '/images/blankLocation.png'}
            alt="avatar"
          />
          {/* <input
            // onChange={handleFileChange}
            id="avatar"
            name="avatar"
            type="file"
            aria-label="Avatar"
            aria-describedby="avatar"
            className=" hidden"
          /> */}
        </div>
        <div className="mb-4 flex justify-end ">
          <button className=" rounded bg-primary w-full md:w-52 mr-5 text-white py-2">
            UPLOAD IMAGE
          </button>
          <div className=" bg-delete rounded w-10 p-2">
            <MdClose
              size={24}
              className="  text-white"
              // onClick={() => setWindowOpen(true)}
            />
          </div>
        </div>
        <div ref={mapContainer} className=" " />
        <div>
          <p className="mb-3">Location</p>
          <input
            type="text"
            className=" border mb-4 border-gray-300 w-full py-2"
          />
          <div className="flex justify-end">
            <button className=" rounded bg-primary w-full md:w-36 text-white py-2">
              ADD NEW
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(CreateLocationForm)
