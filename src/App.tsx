import { FC } from 'react'
import Routes from 'routes/Routes'
import { usePageIdentification } from 'hooks/usePageIdentification'
import { observer } from 'mobx-react'
import useLogListener from 'hooks/useLogLiostener'
import authStore from 'stores/auth.store'

const App: FC = () => {
  usePageIdentification()
  useLogListener()
  return <Routes />
}

export default observer(App)
