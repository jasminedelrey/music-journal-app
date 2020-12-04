import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './Home';
import Journal from './Journal';
import All from './All';
import Vibe from './Vibe'
import Login from './Login';

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

        <Route exact path = "/journal-entries/:single_entry">
          <Journal/>
        </Route>


      </Switch>

    </Router>
  );
}

export default App;
