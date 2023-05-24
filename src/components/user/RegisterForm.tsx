import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'
import { Form } from 'react-bootstrap'
import { Controller } from 'react-hook-form'
import FormLabel from 'react-bootstrap/FormLabel'
import { routes } from 'constants/routesConstants'
import Button from 'react-bootstrap/Button'
import * as API from 'api/Api'
import { StatusCode } from 'constants/errorConstants'
import authStore from 'stores/auth.store'
import Avatar from 'react-avatar'
import { observer } from 'mobx-react'

const LoginForm: FC = () => {
  return <></>
}

export default observer(LoginForm)
