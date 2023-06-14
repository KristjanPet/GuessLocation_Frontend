import { routes } from 'constants/routesConstants'
import { GuessType } from 'models/guess'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  guess: GuessType
}

const GuessComponent: FC<Props> = ({ guess }) => {
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
    <Link to={`${routes.LOCATION}/${guess.location.id}`}>
      <div className=" relative">
        <img
          className=" relative w-full h-48 md:h-60 object-cover"
          src={`${process.env.REACT_APP_API_URL}/files/${guess.location.avatar}`}
          alt="avatar"
        />
        <div className="group green_background absolute left-0 top-0 w-full h-full hover:bg-primary duration-500">
          <p className="absolute text-white text-2xl font-bold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {formatDistance(guess.distance)}
          </p>
          <p className="absolute invisible group-hover:visible py-0.5 px-5 rounded duration-100 text-primary bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            GUESS
          </p>
        </div>
      </div>
    </Link>
  )
}

export default GuessComponent
