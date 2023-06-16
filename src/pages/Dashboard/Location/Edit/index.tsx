import UpdateLocationForm from 'components/location/UpdateLocationForm'

import { FC } from 'react'

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
