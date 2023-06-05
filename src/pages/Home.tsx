import Layout from 'components/ui/Layout'
import { routes } from 'constants/routesConstants'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import authStore from 'stores/auth.store'

const Home: FC = () => {
  return (
    <Layout>
      <div className="p-4 mb-4 grid grid-cols-6 justify-items-center">
        {authStore.user ? (
          <>
            <div className="col-span-full justify-self-start grid ">
              <h1 className=" font-normal text-4xl text-primary">
                Personal best guesses
              </h1>
              <p className="text-dark mt-4">
                Your personal best guesses appear here. Go on and try to beat
                your personal records or set a new one!
              </p>
            </div>
            <div className="col-span-full flex overflow-x-auto flex-nowrap mt-8 ">
              <div className="relative col-span-full md:col-span-1">
                <img
                  src="images/lockedCard1.svg"
                  alt="locekd Card"
                  className=" relative top-0 left-0"
                />
                <img
                  src="images/lock.svg"
                  alt="locekd Card"
                  className=" absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative col-span-full md:col-span-1">
                <img
                  src="images/lockedCard2.svg"
                  alt="locekd Card"
                  className=" relative top-0 left-0"
                />
                <img
                  src="images/lock.svg"
                  alt="locekd Card"
                  className=" absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative col-span-full md:col-span-1">
                <img
                  src="images/lockedCard3.svg"
                  alt="locekd Card"
                  className=" relative top-0 left-0"
                />
                <img
                  src="images/lock.svg"
                  alt="locekd Card"
                  className=" absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
            <div className="col-span-full my-10 hidden md:block">
              <button className=" border border-primary text-primary px-5 py-1.5 rounded">
                LOAD MORE
              </button>
            </div>
            <div className="col-span-full justify-self-start grid mt-12">
              <h1 className=" font-normal text-4xl text-primary ">
                New uploads
              </h1>
              <p className="text-dark mt-4">
                New uploads from users. Try to guess all the locations by
                pressing on a picture.
              </p>
            </div>
            <div className="col-span-full grid grid-cols-3 gap-2 mt-8">
              <div className="relative col-span-full md:col-span-1">
                <img
                  src="images/lockedCard1.svg"
                  alt="locekd Card"
                  className=" relative top-0 left-0"
                />
                <img
                  src="images/lock.svg"
                  alt="locekd Card"
                  className=" absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative col-span-full md:col-span-1">
                <img
                  src="images/lockedCard2.svg"
                  alt="locekd Card"
                  className=" relative top-0 left-0"
                />
                <img
                  src="images/lock.svg"
                  alt="locekd Card"
                  className=" absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative col-span-full md:col-span-1">
                <img
                  src="images/lockedCard3.svg"
                  alt="locekd Card"
                  className=" relative top-0 left-0"
                />
                <img
                  src="images/lock.svg"
                  alt="locekd Card"
                  className=" absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
            <div className="col-span-full my-10">
              <button className=" border border-primary text-primary px-5 py-1.5 rounded">
                LOAD MORE
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="col-span-full z-10 grid justify-items-center m-auto md:col-start-1 md:col-end-3 md:justify-items-start md:row-start-1">
              <h1 className=" font-normal text-4xl text-primary text-center md:text-6xl md:font-medium md:text-left">
                Explore the world with Geotagger!
              </h1>
              <p className="text-dark text-center mt-8 md:text-left">
                Geotagger is website that allows you to post picture and tag it
                on the map. Other user than try to locate it via Google Maps.{' '}
              </p>
              <NavLink to={routes.SIGNUP} className="mt-12">
                <button className="bg-primary rounded text-white px-10 py-2">
                  SIGN IN
                </button>
              </NavLink>
            </div>

            <div className="mt-8 col-span-full z-0 md:col-start-2 md:row-start-1">
              <img src="images/map.svg" alt="map" width={1150} />
            </div>

            <div className="col-span-full">
              <h3 className="font-normal text-2xl mt-8 text-primary text-center md:text-4xl md:mt-14">
                Try yourself at Geotagger!
              </h3>
            </div>

            <div className="col-span-full md:mx-80">
              <p className=" text-dark text-center mt-2 ">
                Try to guess the location of image by selecting position on the
                map. When you guess it, it gives you the error distance.
              </p>
            </div>

            <div className="col-span-full grid grid-cols-3 gap-2 mt-8">
              <div className="relative col-span-full md:col-span-1">
                <img
                  src="images/lockedCard1.svg"
                  alt="locekd Card"
                  className=" relative top-0 left-0"
                />
                <img
                  src="images/lock.svg"
                  alt="locekd Card"
                  className=" absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative col-span-full md:col-span-1">
                <img
                  src="images/lockedCard2.svg"
                  alt="locekd Card"
                  className=" relative top-0 left-0"
                />
                <img
                  src="images/lock.svg"
                  alt="locekd Card"
                  className=" absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative col-span-full md:col-span-1">
                <img
                  src="images/lockedCard3.svg"
                  alt="locekd Card"
                  className=" relative top-0 left-0"
                />
                <img
                  src="images/lock.svg"
                  alt="locekd Card"
                  className=" absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
            <div className="my-12 col-span-full">
              <NavLink to={routes.SIGNUP}>
                <button className="bg-primary rounded text-white px-10 py-2">
                  SIGN UP
                </button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default Home
