import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import Home from '../Home';
import Dashboard from '../Dashboard';
import NotFound from './NotFound';
import Authetication from './Authetication';

const App = () => {
  const { isAuthValidated } = useSelector(state => state.userInfo);
  return (
    <Router>
      <Route path="/" component={Authetication} />
      {isAuthValidated && (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route component={NotFound}/>
        </Switch>
      )}
    </Router>
  );
};

export default App;