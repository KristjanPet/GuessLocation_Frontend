import CreateLocationForm from 'components/location/CreateLocationForm'
import DashboardLayout from 'components/ui/DashboardLayout'
import { FC } from 'react'

const DashboardUsersAdd: FC = () => {
  return (
    <DashboardLayout>
      <h1 className="mb-4 text-center">Create location</h1>
      <CreateLocationForm />
    </DashboardLayout>
  )
}

export default DashboardUsersAdd
