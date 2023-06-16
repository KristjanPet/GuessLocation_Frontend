import { routes } from 'constants/routesConstants'
import { LocationType } from 'models/location'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RiPencilFill } from 'react-icons/ri'
import DeleteLocationForm from './DeleteLocationForm'

interface Props {
  data: LocationType
}

const LocationComponent: FC<Props> = ({ data }) => {
  const location = useLocation()
  const isHomePage = location.pathname === routes.HOME

  return (
    <div className=" relative">
      <Link to={`${routes.LOCATION}/${data.id}`}>
        <img
          className=" relative w-full h-48 md:h-60 object-cover"
          src={`${process.env.REACT_APP_API_URL}/files/${data.avatar}`}
          alt="avatar"
        />
      </Link>

      {!isHomePage ? (
        <>
          <div className="absolute left-2 top-3">
            <Link to={`${routes.EDIT_LOCATION}/${data.id}`}>
              <div className=" bg-primary rounded p-2">
                <RiPencilFill size={28} className="  text-white"></RiPencilFill>
              </div>
            </Link>
          </div>
          <DeleteLocationForm location_id={data.id} />
        </>
      ) : (
        <Link to={`${routes.LOCATION}/${data.id}`}>
          <div className="group absolute left-0 top-0 w-full h-full hover:bg-primary duration-500">
            <p className="absolute invisible group-hover:visible py-0.5 px-5 rounded duration-100 text-primary bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              GUESS
            </p>
          </div>
        </Link>
      )}
    </div>
  )
}

export default LocationComponent
