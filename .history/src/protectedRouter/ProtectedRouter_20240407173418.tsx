import { useSelector } from 'react-redux'
import { RootState } from '../reducer/rootReducer'

const ProtectedRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return <div></div>
}

export default ProtectedRouter
