import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './Components/Home/Home';
import Journal from './Components/Journal/Journal';
import All from './Components/All/All';
import Vibe from './Components/Vibe/Vibe'
import Login from './Components/Login/Login';

function App() {
  return (
    <Router>

      <Switch>

        <Route exact path = "/journal-entries/:useremail">
          <All/>
        </Route>

        <Route exact path = "/">
          <Login/>
        </Route>

        <Route exact path = "/home/:useremail">
          <Home/>
        </Route>

        <Route exact path = "/journal-entries/vibes/:useremail">
          <Vibe/>
        </Route>

        <Route exact path = "/selectedjournal/:useremail/:single_entry">
          <Journal/>
        </Route>


      </Switch>

    </Router>
  );
}

export default App;
