import { FC, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import authStore from 'stores/auth.store'
import { StatusCode } from 'constants/errorConstants'
import ToastContainer from 'react-bootstrap/esm/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import * as API from 'api/Api'
import Avatar from 'react-avatar'
// import SettingsForm from 'components/user/SettingsForm'
import useMediaQuery from 'hooks/useMediaQuery'
import NavbarMenuForm from './NavbarMenuForm'
// import MobileMenuForm from '../user/MobileMenuForm'

const Navbar: FC = () => {
  const { isMobile } = useMediaQuery(769)
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')
  const [showError, setShowError] = useState(false)

  const location = useLocation()
  const isLoginPage = location.pathname === routes.LOGIN
  const isSignupPage = location.pathname === routes.SIGNUP

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
      <header>
        <nav className=" p-4 flex justify-between items-center w-auto">
          {isMobile ? (
            <>
              {authStore.user && (
                <div
                  className={
                    'navbar-brand navbar-add d-flex justify-content-center align-items-center bg-white rounded-circle'
                  }
                >
                  <img
                    src="/images/addIcon.svg"
                    // className='bg-light'
                    alt="Add"
                    width={15}
                    height={15}
                  />
                </div>
              )}

              <Link
                className="text-decoration-none navbar-brand d-flex justify-content-center px-2 "
                to={routes.HOME}
              >
                <img
                  src="/images/NavbarLogo.svg"
                  alt="GeoTagger"
                  width={130}
                  height={25}
                />
              </Link>

              <NavbarMenuForm />
            </>
          ) : (
            <div>neki</div>
          )}
        </nav>
      </header>
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

export default Navbar
