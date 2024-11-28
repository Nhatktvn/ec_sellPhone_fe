import useRouteElements from './useRouteElements'
import { Provider } from 'react-redux'
import store from './store/configureStore'

function App() {
  const routeElements = useRouteElements()
  // const btnLink = document.querySelector('.my-button') as HTMLButtonElement
  // console.log(btnLink)

  return (
    <Provider store={store}>
      <div>{routeElements}</div>
    </Provider>
  )
}

export default App
