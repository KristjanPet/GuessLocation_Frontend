import UpdateLocationForm from 'components/location/UpdateLocationForm'
import DashboardLayout from 'components/ui/DashboardLayout'
import { FC, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import mapboxgl, { Map } from 'mapbox-gl'
import Layout from 'components/ui/Layout'

const LocationEdit: FC = () => {
  return (
    <Layout>
      {/* <UpdateLocationForm defaultValues={location.state} /> */}
      <UpdateLocationForm />
    </Layout>
  )
}

export default LocationEdit
