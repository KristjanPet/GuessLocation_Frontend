import DashboardLayout from 'components/ui/DashboardLayout'
import React, { FC, useState } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { useMutation, useQuery } from 'react-query'
import useMediaQuery from 'hooks/useMediaQuery'
import * as API from 'api/Api'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { StatusCode } from 'constants/errorConstants'
import { UserType } from 'models/auth'
import authStore from 'stores/auth.store'

const DashboardUsers: FC = () => {
  return <DashboardLayout>Location</DashboardLayout>
}

export default DashboardUsers
