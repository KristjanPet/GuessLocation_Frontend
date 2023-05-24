import Layout from 'components/ui/Layout'
import { FC, useState } from 'react'
import Avatar from 'react-avatar'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import * as API from 'api/Api'
import { UserType } from 'models/auth'

// interface Props {
//   defaultValues?: UserType
// }

const Profile: FC = () => {
  return (
    <Layout>
      <div>Profile</div>
    </Layout>
  )
}

export default Profile
