import { GuessType } from 'models/guess'
import React, { FC, useState } from 'react'
import Avatar from 'react-avatar'
import authStore from 'stores/auth.store'

interface Props {
  guess: GuessType
  place: number
}

const GuessForm: FC<Props> = ({ guess, place }) => {
  const placeColor = useState(() => {
    if (place === 0) {
      return 'gold'
    } else if (place === 1) {
      return 'silver'
    } else if (place === 2) {
      return 'bronze'
    } else {
      return 'bg-dark'
    }
  })

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined)
  }

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
      {authStore.user && authStore.user.id === guess.user.id ? (
        <div className="flex items-center bg-primary text-white">
          <div
            className={`${placeColor} rounded-full w-7 h-7 text-white text-xs m-2 text-center pt-2`}
          >
            {place + 1}
          </div>
          <div className="ml-3">
            <Avatar
              className="navbar-avatar"
              round
              src={
                guess.user?.avatar
                  ? `${process.env.REACT_APP_API_URL}/files/${guess.user?.avatar}`
                  : '/images/blankAvatarIcon.svg'
              }
              alt={
                guess.user?.first_name || guess.user?.last_name
                  ? `${guess.user?.first_name} ${guess.user?.last_name}`
                  : guess.user?.email
              }
            />
          </div>
          <div className="flex flex-col ml-4">
            <p>You</p>
            <p>{formatDate(guess.created_at)}</p>
          </div>
          <div className="mr-2 ml-auto">{formatDistance(guess.distance)}</div>
        </div>
      ) : (
        <div className="flex items-center">
          <div
            className={`${placeColor} rounded-full w-7 h-7 text-white text-xs m-2 text-center pt-2`}
          >
            {place + 1}
          </div>
          <div className="ml-3">
            <Avatar
              className="navbar-avatar"
              round
              src={
                guess.user?.avatar
                  ? `${process.env.REACT_APP_API_URL}/files/${guess.user?.avatar}`
                  : '/images/blankAvatarIcon.svg'
              }
              alt={
                guess.user?.first_name || guess.user?.last_name
                  ? `${guess.user?.first_name} ${guess.user?.last_name}`
                  : guess.user?.email
              }
            />
          </div>
          <div className="flex flex-col ml-4 text-dark">
            <p>
              {guess.user.first_name} {guess.user.last_name}
            </p>
            <p>{formatDate(guess.created_at)}</p>
          </div>
          <div className="mr-2 ml-auto text-primary">
            {formatDistance(guess.distance)}
          </div>
        </div>
      )}
    </>
  )
}

export default GuessForm
