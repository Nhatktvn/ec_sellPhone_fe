import { useSelector } from 'react-redux'
import { RootState } from '../reducer/rootReducer'
import { useNavigate } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}
const ProtectedRouter = ({ children }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  console.log(isAuthenticated)

  const navigation = useNavigate()
  return <>{children}</>
}

export default ProtectedRouter
