import { useSelector } from 'react-redux'
import { RootState } from '../reducer/rootReducer'

const ProtectedRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => state.activeAccount)
  return <div></div>
}

export default ProtectedRouter
