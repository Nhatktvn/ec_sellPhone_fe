import useRouteElements from './useRouteElements'
import { Provider } from 'react-redux'
import store from './store/configureStore'

function App() {
  const routeElements = useRouteElements()
  document.querySelector('.km-cta-multi-button-container').addEventListener('click', function () {
    alert('Bạn đã nhấp vào nút!')
  })
  return (
    <Provider store={store}>
      <div>{routeElements}</div>
    </Provider>
  )
}

export default App
