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
        <div className="overlay" onClick={toggleWindow}></div>

        <div className={`menu-box row ${animation ? '' : 'closing'}`}>
          <div className="col mb-2">
            {' '}
            <MdClose size={24} className="text-orange" onClick={toggleWindow} />
          </div>
          <div className="w-100"></div>
          {authStore.user ? (
            <>
              <Link
                className="text-decoration-none"
                // to={`${routes.PROFILE}/users/edit`}
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
                <div className="col d-flex align-items-center mb-3">
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
                  <p className="m-0 font-size-24 px-3 text-dark">
                    {authStore.user.first_name} {authStore.user.last_name}
                  </p>
                </div>
              </Link>
              <Link to={routes.HOME} className="text-decoration-none mb-3">
                <div
                  className="col d-flex align-items-center justify-content-between mb-2"
                  onClick={() => routes.HOME}
                >
                  <p className="m-0 font-size-24 text-dark">Home</p>
                  <RiArrowRightSLine size={24} color="black" />
                </div>
              </Link>
              <div className="col d-flex align-items-center justify-content-between mb-2">
                {/* <SettingsForm navbarClass={'text-dark font-size-24 p-0'} /> */}
                <RiArrowRightSLine size={24} color="black" />
              </div>
              <div className="w-100"></div>
              <div
                className="col d-flex align-items-center justify-content-between mb-2"
                onClick={signout}
              >
                <p className="m-0 font-size-24 text-orange">Logout</p>
                <RiArrowRightSLine size={24} className="text-orange" />
              </div>
            </>
          ) : (
            <>
              <Link to={routes.HOME} className="text-decoration-none mb-3">
                <div
                  className="col d-flex align-items-center justify-content-between mb-2"
                  onClick={() => routes.HOME}
                >
                  <p className="m-0 font-size-24 text-dark">Home</p>
                  <RiArrowRightSLine size={24} color="black" />
                </div>
              </Link>
              <div className="w-100"></div>
              <div className="col">
                <Link to={routes.SIGNUP} className="text-decoration-none">
                  <button className="w-100 signup-button-litlle">
                    Sign up
                  </button>
                </Link>
              </div>
              <div className="w-100"></div>
              <div className="col">
                <Link to={routes.LOGIN} className="text-decoration-none">
                  <button className="w-100 login-button-litlle">Login</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Popup>
      {showError && (
        <ToastContainer className="p-3" position="top-end">
          <Toast onClose={() => setShowError(false)} show={showError}>
            <Toast.Header>
              <strong className="me-suto text-danger">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-danger" bg-light>
              {apiError}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  )
}

export default NavbarMenuForm
