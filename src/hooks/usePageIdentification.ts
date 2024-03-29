import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const onDefault = () => {
  document.title = 'Home'
  document.body.id = ''
}
const onHome = () => {
  document.title = 'Home'
  document.body.id = 'home-page'
}
const onDashboard = () => {
  document.title = 'Dashboard'
  document.body.id = 'dashboard-page'
}
const onLogin = () => {
  document.title = 'Login'
  document.body.id = 'login-page'
}
const onSignup = () => {
  document.title = 'Signup'
  document.body.id = 'signup-page'
}
const onRestorePassword = () => {
  document.title = 'Restore password'
  document.body.id = 'restorePassword-page'
}
const onResetPassword = () => {
  document.title = 'Reset password'
  document.body.id = 'resetPassword-page'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callbacks: any = {
  '/': [onHome],
  '/dashboard': [onDashboard],
  '/dashboard/users': [onDashboard],
  '/dashboard/users/add': [onDashboard],
  '/dashboard/users/edit': [onDashboard],
  '/login': [onLogin],
  '/signup': [onSignup],
  '/restore_password': [onRestorePassword],
  '/reset_password': [onResetPassword],
  '*': [onDefault],
}

export const addPageIdentification = (_case: string, fn: () => void) => {
  callbacks[_case] = callbacks[_case] || []
  callbacks[_case].push(fn)
}

export const usePageIdentification = () => {
  const location = useLocation()

  const customSwitch = (value: string) => {
    if (callbacks[value]) {
      callbacks[value].forEach((fn: () => void) => {
        fn()
      })
    } else {
      onDefault()
    }
  }

  useEffect(() => {
    if (location.pathname) customSwitch(location.pathname)
  }, [location.pathname])
}
