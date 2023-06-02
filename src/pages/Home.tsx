import Layout from 'components/ui/Layout'
import { routes } from 'constants/routesConstants'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const Home: FC = () => {
  return (
    <Layout>
      <div className="p-4 mb-4 flex flex-col items-center">
        <h1 className=" font-normal text-4xl text-primary text-center">
          Explore the world with Geotagger!
        </h1>
        <p className="text-dark text-center mt-8">
          Geotagger is website that allows you to post picture and tag it on the
          map. Other user than try to locate it via Google Maps.{' '}
        </p>
        <NavLink to={routes.SIGNUP} className="mt-12">
          <button className=" bg-primary rounded text-white px-10 py-0.5">
            Sign up
          </button>
        </NavLink>
      </div>
    </Layout>
  )
}

export default Home
