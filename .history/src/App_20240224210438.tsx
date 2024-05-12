import { ToastContainer } from 'react-toastify'
import useRouteElements from './useRouteElements'
import { Provider } from 'react-redux'
import store from './store/configureStore'

function App() {
  const routeElements = useRouteElements()
  return (
    <Provider store={store}>
      <div>{routeElements}</div>
    </Provider>
  )
}

export default App
