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
            <>
              <Link className="flex justify-center pl-2 " to={routes.HOME}>
                <img
                  src="/images/NavbarLogo.svg"
                  alt="GeoTagger"
                  width={130}
                  height={25}
                />
              </Link>

              <div className="" id="navbarTogglerDemo02">
                <ul className="flex flex-row items-center gap-4 ">
                  {authStore.user ? (
                    // <>
                    //   <li className="nav-item">
                    //     <NavLink to={routes.HOME} className={navbarClass}>
                    //       Home
                    //     </NavLink>
                    //   </li>
                    //   <li className="nav-item ">
                    //     <SettingsForm navbarClass={navbarClass} />
                    //   </li>
                    //   <li className="nav-item ">
                    //     <button
                    //       onClick={signout}
                    //       // className="navbar-text logout-button"
                    //       className={`${navbarClass} logout-button`}
                    //     >
                    //       Logout
                    //     </button>
                    //   </li>
                    //   <li className="nav-item ">
                    //     <Link
                    //       className={`${opacity} text-decoration-none text-light`}
                    //       // to={`${routes.PROFILE}/users/edit`}
                    //       to={`${routes.PROFILE}/${authStore.user.id}`}
                    //       state={{
                    //         id: authStore.user?.id,
                    //         first_name: authStore.user?.first_name,
                    //         last_name: authStore.user?.last_name,
                    //         email: authStore.user?.email,
                    //         avatar: authStore.user?.avatar,
                    //         isActiveUser: true,
                    //       }}
                    //     >
                    //       <Avatar
                    //         className="navbar-avatar"
                    //         round
                    //         src={
                    //           authStore.user?.avatar
                    //             ? `${process.env.REACT_APP_API_URL}/files/${authStore.user?.avatar}`
                    //             : '/images/blankAvatarIcon.svg'
                    //         }
                    //         alt={
                    //           authStore.user?.first_name ||
                    //           authStore.user?.last_name
                    //             ? `${authStore.user?.first_name} ${authStore.user?.last_name}`
                    //             : authStore.user?.email
                    //         }
                    //       />
                    //     </Link>
                    //   </li>
                    //   <li className="nav-item">
                    //     <CreateQuoteForm opacity={opacity} />
                    //   </li>
                    // </>
                    <div>neki</div>
                  ) : (
                    <>
                      {!isSignupPage && (
                        <li className="">
                          <NavLink
                            to={routes.LOGIN}
                            // className={'text-decoration-none'}
                          >
                            <button className=" text-dark font-medium">
                              Sign in
                            </button>
                          </NavLink>
                        </li>
                      )}
                      <li>or</li>
                      {!isLoginPage && (
                        <li className="">
                          <NavLink
                            to={routes.SIGNUP}
                            // className={'text-decoration-none'}
                          >
                            <button className=" bg-primary rounded text-white px-10 py-0.5">
                              Sign up
                            </button>
                          </NavLink>
                        </li>
                      )}
                    </>
                  )}
                </ul>
              </div>
            </>
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
