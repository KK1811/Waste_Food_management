import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/navigation/navbar'
import login from './components/auth/sellerLogin'
import register from './components/auth/sellerRegister'
import create from './components/seller/create'
import landingpage from './components/home/landingPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {/* <br /><br /><br /><br /> */}
        <Switch>
          <Route exact path='/' component={landingpage} />
          <Route exact path='/login' component={login} />
          <Route exact path='/register' component={register} />
          <Route exact path='/seller' component={create} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
