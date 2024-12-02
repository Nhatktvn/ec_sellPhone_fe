import { useSelector } from 'react-redux'
import { RootState } from '../reducer/rootReducer'
import { Navigate } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}
const ProtectedRouter = ({ children }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  console.log(isAuthenticated)

  return <>{isAuthenticated ? children : <Navigate to={'/login'} />}</>
}

export default ProtectedRouter
