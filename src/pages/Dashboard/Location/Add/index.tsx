import CreateLocationForm from 'components/location/CreateLocationForm'
import DashboardLayout from 'components/ui/DashboardLayout'
import Layout from 'components/ui/Layout'
import { FC } from 'react'

const LocationAdd: FC = () => {
  return (
    <Layout>
      <CreateLocationForm />
    </Layout>
  )
}

export default LocationAdd
