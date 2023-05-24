import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import FormLabel from 'react-bootstrap/FormLabel'
import { routes } from 'constants/routesConstants'
import Button from 'react-bootstrap/Button'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import { observer } from 'mobx-react'
import { useQuery } from 'react-query'

const UpdateLocationForm: FC = () => {
  return <></>
}

export default observer(UpdateLocationForm)
