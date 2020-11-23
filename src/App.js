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

function App() {
  return (
    <Router>

      <Switch>

        <Route path = "/journal-entries">
          <All/>
        </Route>

        <Route path = "/journal-entries/:journal-entry">
          <All/>
        </Route>

        <Route path = "/">
          <Home/>
        </Route>

      </Switch>

    </Router>
  );
}

export default App;


// <Route path = "/journal-entries/:journal-entry">
// <Journal/>
// </Route>