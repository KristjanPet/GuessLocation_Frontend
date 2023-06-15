import { StatusCode } from 'constants/errorConstants'
import { routes } from 'constants/routesConstants'
import React, { FC, useState } from 'react'
import Avatar from 'react-avatar'
import { AiOutlineMenu } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'
import { RiArrowRightSLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'
import authStore from 'stores/auth.store'
import * as API from 'api/Api'
// import SettingsForm from './SettingsForm'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import SettingsForm from 'components/user/SettingsForm'

const NavbarMenuForm: FC = () => {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)
  const [windowOpen, setWindowOpen] = useState(false)
  const [animation, setAnimation] = useState(false)

  const toggleWindow = () => {
    if (windowOpen) {
      setAnimation(false)
      setTimeout(() => {
        setWindowOpen(!windowOpen)
      }, 190)
    } else {
      setWindowOpen(!windowOpen)
      setAnimation(true)
    }
  }

  const signout = async () => {
    const response = await API.signout()
    if (response.data?.statusCode === StatusCode.BAD_REQUEST) {
      setApiError(response.data.message)
      setShowError(true)
    } else if (response.data?.statusCode === StatusCode.INTERNAL_SERVER_ERROR) {
      setApiError(response.data.message)
      setShowError(true)
    } else {
      authStore.signout()
      navigate(routes.LOGIN)
    }
  }

  return (
    <>
      <AiOutlineMenu
        size={24}
        onClick={toggleWindow}
        className="mx-3 text-primary"
      />
      {/* SIGN OUT SETTINGS */}
      <Popup modal nested open={windowOpen}>
        <div
          className=" fixed bg-black bg-opacity-50 top-0 left-0 w-full h-full z-10"
          onClick={toggleWindow}
        />

        <div
          className={`${
            animation ? '' : 'closing'
          } fixed top-0 left-0 w-full bg-white z-20 p-6`}
        >
          <div className="flex justify-end mb-5">
            <MdClose
              size={24}
              className="text-primary"
              onClick={toggleWindow}
            />
          </div>
          {authStore.user ? (
            <>
              <Link
                className=""
                to={`${routes.PROFILE}/${authStore.user.id}`}
                state={{
                  id: authStore.user?.id,
                  first_name: authStore.user?.first_name,
                  last_name: authStore.user?.last_name,
                  email: authStore.user?.email,
                  avatar: authStore.user?.avatar,
                  isActiveUser: true,
                }}
              >
                <div className="flex items-center mb-3">
                  <Avatar
                    className="navbar-avatar"
                    round
                    src={
                      authStore.user?.avatar
                        ? `${process.env.REACT_APP_API_URL}/files/${authStore.user?.avatar}`
                        : '/images/blankAvatarIcon.svg'
                    }
                    alt={
                      authStore.user?.first_name || authStore.user?.last_name
                        ? `${authStore.user?.first_name} ${authStore.user?.last_name}`
                        : authStore.user?.email
                    }
                  />
                  <p className="ml-4 text-2xl px-3 text-dark">
                    {authStore.user.first_name} {authStore.user.last_name}
                  </p>
                </div>
              </Link>
              <Link to={routes.HOME} className="text-decoration-none mb-3">
                <div
                  className="flex justify-between items-center my-6"
                  onClick={() => routes.HOME}
                >
                  <p className="m-0 text-2xl text-dark">Home</p>
                  <RiArrowRightSLine size={24} color="black" />
                </div>
              </Link>
              <div className="flex justify-between items-center my-6 text-2xl text-dark">
                <SettingsForm />
                <RiArrowRightSLine size={24} color="black" />
              </div>
              <div
                className="flex justify-between items-center my-6"
                onClick={signout}
              >
                <p className="m-0 text-2xl text-primary">Logout</p>
                <RiArrowRightSLine size={24} className="text-primary" />
              </div>
            </>
          ) : (
            <>
              <Link to={routes.HOME} className="text-decoration-none">
                <div
                  className="flex justify-between items-center my-6"
                  onClick={() => routes.HOME}
                >
                  <p className=" text-2xl text-dark">Home</p>
                  <RiArrowRightSLine size={24} color="text-dark" />
                </div>
              </Link>
              <div className=" my-8">
                <Link
                  to={routes.SIGNUP}
                  className=" bg-primary text-white py-2 rounded"
                >
                  <button className=" w-full">SIGN UP</button>
                </Link>
              </div>
              <div className="">
                <Link
                  to={routes.LOGIN}
                  className=" text-primary border border-primary py-2 rounded"
                >
                  <button className="w-full">SIGN IN</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Popup>
    </>
  )
}

export default NavbarMenuForm
