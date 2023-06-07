import { FC, lazy, Suspense } from 'react'
import { Route, RouteProps, Routes as Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import RestrictedRoute from './RestrictedRoute'
import LocationAdd from 'pages/Dashboard/Location/Add'

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}

type AppRoute = RouteProps & {
  type?: RouteType
}

/* Public routes */
const Home = lazy(() => import('pages/Home'))

/* Private routes */
const Profile = lazy(() => import('pages/Profile'))
const Dashboard = lazy(() => import('pages/Dashboard'))
const DashboardLocation = lazy(() => import('pages/Dashboard/Location'))
const DashboardLocationAdd = lazy(() => import('pages/Dashboard/Location/Add'))
const DashboardLocationEdit = lazy(
  () => import('pages/Dashboard/Location/Edit'),
)

/* Restricted routes */
const Login = lazy(() => import('pages/Login'))
const Register = lazy(() => import('pages/Register'))
const RestorePassword = lazy(() => import('pages/RestorePassword'))
const RefreshPassword = lazy(() => import('pages/RefreshPassword'))

/* Error routes */
const Page404 = lazy(() => import('pages/Page404'))

export const AppRoutes: AppRoute[] = [
  // Restricted Routes
  {
    type: RouteType.RESTRICTED,
    path: '/login',
    children: <Login />,
  },
  {
    type: RouteType.RESTRICTED,
    path: '/signup',
    children: <Register />,
  },
  {
    type: RouteType.RESTRICTED,
    path: '/restore_password',
    children: <RestorePassword />,
  },
  {
    type: RouteType.RESTRICTED,
    path: '/reset_password',
    children: <RefreshPassword />,
  },
  // Private Routes
  {
    type: RouteType.PRIVATE,
    path: '/dashboard',
    children: <Dashboard />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/dashboard/location',
    children: <DashboardLocation />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/dashboard/location/add',
    children: <LocationAdd />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/dashboard/location/edit',
    children: <DashboardLocationEdit />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/profile/:userId',
    children: <Profile />,
  },
  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: '/',
    children: <Home />,
  },
  // 404 Error
  {
    type: RouteType.PUBLIC,
    path: '*',
    children: <Page404 />,
  },
]

const Routes: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {AppRoutes.map((r) => {
          const { type } = r
          if (type === RouteType.PRIVATE) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<PrivateRoute>{r.children}</PrivateRoute>}
              />
            )
          }
          if (type === RouteType.RESTRICTED) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<RestrictedRoute>{r.children}</RestrictedRoute>}
              />
            )
          }

          return (
            <Route key={`${r.path}`} path={`${r.path}`} element={r.children} />
          )
        })}
        <Route path="*" element={<Page404 />} />
      </Switch>
    </Suspense>
  )
}

export default Routes
