import UpdateLocationForm from 'components/location/UpdateLocationForm'
import DashboardLayout from 'components/ui/DashboardLayout'
import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'

const DashboardUsersEdit: FC = () => {
  const location = useLocation()
  return (
    <DashboardLayout>
      <h1 className="mb-4 text-center">Edit Location</h1>
      {/* <UpdateLocationForm defaultValues={location.state} /> */}
    </DashboardLayout>
  )
}

export default DashboardUsersEdit
