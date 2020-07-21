import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/navigation/navbar1'
// import { Navbar1 } from './components/navigation/navbar1'
import sellerLogin from './components/auth/sellerLogin'
import sellerRegister from './components/auth/sellerRegister'
import buyerLogin from './components/auth/buyerLogin'
import buyerRegister from './components/auth/buyerRegister'
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
          <Route exact path='/sellerLogin' component={sellerLogin} />
          <Route exact path='/sellerRegister' component={sellerRegister} />
          <Route exact path='/buyerLogin' component={buyerLogin} />
          <Route exact path='/buyerRegister' component={buyerRegister} />
          <Route exact path='/seller' component={create} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
