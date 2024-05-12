import { useSelector } from 'react-redux'
import { RootState } from '../reducer/rootReducer'
import { useNavigate } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}
const ProtectedRouter = ({ children }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const navigation = useNavigate()
  return <>{isAuthenticated ? children : <Redirect to='/login' />}</>
}

export default ProtectedRouter
