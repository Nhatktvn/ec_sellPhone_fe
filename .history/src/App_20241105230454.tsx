import useRouteElements from './useRouteElements'
import { Provider } from 'react-redux'
import store from './store/configureStore'
import Kommunicate from '@kommunicate/kommunicate-chatbot-plugin'

function App() {
  Kommunicate.init('kommunicate-support', {
    automaticChatOpenOnNavigation: true,
    popupWidget: true
  })
  const routeElements = useRouteElements()
  return (
    <Provider store={store}>
      <div>{routeElements}</div>
    </Provider>
  )
}

export default App
