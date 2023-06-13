import { routes } from 'constants/routesConstants'
import { LocationType } from 'models/location'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  location: LocationType
}

const LocationComponent: FC<Props> = ({ location }) => {
  return (
    <Link to={`${routes.LOCATION}/${location.id}`}>
      <div className=" relative">
        <img
          className=" relative w-full h-48 md:h-60 object-cover"
          src={`${process.env.REACT_APP_API_URL}/files/${location.avatar}`}
          alt="avatar"
        />
        <div className="group absolute left-0 top-0 w-full h-full hover:bg-primary duration-500">
          <p className="absolute invisible group-hover:visible py-0.5 px-5 rounded duration-100 text-primary bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            GUESS
          </p>
        </div>
      </div>
    </Link>
  )
}

export default LocationComponent
