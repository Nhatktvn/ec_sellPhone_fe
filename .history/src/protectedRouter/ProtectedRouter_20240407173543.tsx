import { useSelector } from 'react-redux'
import { RootState } from '../reducer/rootReducer'

interface Props {
  children?: React.ReactNode
}
const ProtectedRouter = ({ children }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return <div>Ơ</div>
}

export default ProtectedRouter
