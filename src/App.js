import {Switch,Route} from 'react-router-dom'
import Home from './components/Home'
import UserDetails from './components/UserDetails'
import './App.css' 

const App = () => (
  
  
  <Switch>
   <Route exact path="/" component={Home}/>
   <Route exact path="/task/user/:id/" component={UserDetails}/>
  </Switch>

  
)

export default App