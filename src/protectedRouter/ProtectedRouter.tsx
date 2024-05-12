import { useSelector } from 'react-redux'
import { RootState } from '../reducer/rootReducer'
import { Navigate, useNavigate } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
  role: string
}
const ProtectedRouter = ({ children, role }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  console.log(isAuthenticated)

  const navigation = useNavigate()
  return <>{isAuthenticated ? children : <Navigate to={'/login'} />}</>
}

export default ProtectedRouter
