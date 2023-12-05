import { Provider } from 'react-redux'
import './App.css'
import Posts from './components/Posts'
import store from './store/store'

function App() {
  return (
    <Provider store={store}>
      <Posts />
    </Provider>
  )
}

export default App
