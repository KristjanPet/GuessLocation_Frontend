import React, { FC, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import * as API from 'api/Api'
import { LocationType } from 'models/location'
import { routes } from 'constants/routesConstants'
import { useForm } from 'react-hook-form'
import { StatusCode } from 'constants/errorConstants'
import mapboxgl, { Map, MapMouseEvent, Marker } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { GuessType, createGuessType } from 'models/guess'
import GuessForm from 'components/guess/GuessForm'

const LocationForm: FC = () => {
  const navigate = useNavigate()
  const { locationId } = useParams()

  const [distance, setDistance] = useState<number | null>(null)

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

  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  //GET
  const { data: location } = useQuery<{ data: LocationType }, Error>(
    ['location', locationId],
    () => API.getLocationById(locationId!),
    {
      refetchOnWindowFocus: false, // Fetching is initially disabled
      keepPreviousData: true,
    },
  )

  const { data: guesses, refetch: refetchGuesses } = useQuery<
    { data: { data: GuessType[] } },
    Error
  >(['guesses', locationId], () => API.getGeuess(locationId!), {
    refetchOnWindowFocus: false, // Fetching is initially disabled
    keepPreviousData: true,
  })

  //GUESS
  const { handleSubmit, register } = useForm<createGuessType>({
    defaultValues: {
      lon: 0,
      lat: 0,
    },
  })

  const onSubmit = async () => {
    const data: createGuessType = { lon: markerLon, lat: markerLat }
    const fileResponse = await API.createGuess(data, locationId!)
    if (fileResponse.data?.statusCode === StatusCode.BAD_REQUEST) {
      setShowError(true)
      setApiError(fileResponse.data.message)
    } else if (
      fileResponse.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR
    ) {
      setShowError(true)
      setApiError(fileResponse.data.message)
    } else {
      // console.log(fileResponse.data)
      setDistance(fileResponse.data.distance)
      refetchGuesses()
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

  const formatDistance = (distance: number | null) => {
    if (distance === null) {
      return ''
    } else if (distance < 1) {
      const meters = Math.floor(distance * 1000)
      return meters + ' m'
    } else {
      return Math.floor(distance) + ' km'
    }
  }

  return (
    <>
      <div className="grid md:grid-flow-col auto-cols-auto columns-3 gap-4">
        <div className=" md:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className=" justify-center">
            <div className="my-6">
              <h1 className=" text-4xl text-dark ">
                Take a <span className="text-primary">guess</span>!
              </h1>
            </div>
            <div className="mb-4">
              <img
                className="w-full h-64 md:h-96 object-cover"
                src={`${process.env.REACT_APP_API_URL}/files/${location?.data.avatar}`}
                alt="avatar"
              />
            </div>
            <div ref={mapContainer} className=" w-full h-[12.18rem] mb-4" />
            <div className="md:flex gap-6">
              <div className=" order-2 md:w-full">
                <p className="mb-1">Location</p>
                <input
                  type="text"
                  value={`${markerLat}, ${markerLon}`}
                  readOnly
                  className=" border mb-4 border-gray-300 w-full py-2"
                />
              </div>
              <div className="md:w-52">
                <p className="mb-1">Error distance</p>
                <input
                  type="text"
                  value={formatDistance(distance)}
                  readOnly
                  className=" border mb-4 border-gray-300 w-full py-2"
                />
              </div>
            </div>
            <div className=" float-right">
              <button
                type="submit"
                className=" rounded bg-primary text-white py-2 px-12"
              >
                GUESS
              </button>
            </div>
          </form>
        </div>
        <div className=" col-span-1">
          <div className="my-6">
            <h1 className=" text-4xl text-dark text-start mb-5">Leaderboard</h1>
            {guesses?.data.data && guesses.data.data.length > 0 ? (
              <>
                {guesses?.data.data.map((guess, index) => (
                  <div key={index}>
                    <div className=" mb-2.5">
                      <GuessForm key={guess?.id} guess={guess} place={index} />
                    </div>
                    {/* <div className="w-100"></div> */}
                  </div>
                ))}
              </>
            ) : (
              <p>No guesses yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default LocationForm
