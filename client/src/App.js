import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
