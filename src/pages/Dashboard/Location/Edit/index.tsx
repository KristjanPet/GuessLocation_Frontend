import UpdateLocationForm from 'components/location/UpdateLocationForm'
import DashboardLayout from 'components/ui/DashboardLayout'
import { FC, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import mapboxgl, { Map } from 'mapbox-gl'

const DashboardLocationEdit: FC = () => {
  return (
    <DashboardLayout>
      <h1 className="mb-4 text-center">Edit Location</h1>

      {/* <UpdateLocationForm defaultValues={location.state} /> */}
    </DashboardLayout>
  )
}

export default DashboardLocationEdit
