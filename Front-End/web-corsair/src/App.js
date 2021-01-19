import logo from './logo.svg';
import React from 'react'
import './App.module.scss';
import Main from './pages/main.js';
import Auth from './pages/auth.js';
import { BrowserRouter , Route} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import  Content from './containers/Content/Content.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/'>
          <Main />
        </Route>

        <Route path='/dashboard' component={Content}>
        </Route>
        
        <Route path='/auth' >
          <Auth />
        </Route>

      </BrowserRouter>
    </div>
  );
}

export default App;
