import { useSelector } from 'react-redux'
import { RootState } from '../reducer/rootReducer'
import { useNavigate } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}
const ProtectedRouter = ({ children }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const navigation = useNavigate()
  {
    isAuthenticated ? children : navigation('/login')
  }
}

export default ProtectedRouter
