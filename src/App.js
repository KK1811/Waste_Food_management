import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import { Navbar } from './components/navigation/navbar1'
// import { Navbar1 } from './components/navigation/navbar1'
import sellerLogin from './components/auth/sellerLogin'
import sellerRegister from './components/auth/sellerRegister'
import buyerLogin from './components/auth/buyerLogin'
import buyerRegister from './components/auth/buyerRegister'
import create from './components/seller/create'
import orders from './components/seller/orders'
import landingpage from './components/home/landingPage'
import subscriptions from './components/buyer/subscriptions'
import addSubscription from './components/buyer/addSubscription'
// import { SellerNavbar } from './components/navigation/sellerNavbar'
import buyerProfile from './components/buyer/profile'
import sellerProfile from './components/seller/profile'
import payment from './components/buyer/payment'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={landingpage} />
          <Route exact path='/sellerLogin' component={sellerLogin} />
          <Route exact path='/sellerRegister' component={sellerRegister} />
          <Route exact path='/buyerLogin' component={buyerLogin} />
          <Route exact path='/buyerRegister' component={buyerRegister} />
          <Route exact path='/seller/create' component={create} />
          <Route exact path='/buyer/subscriptions' component={subscriptions} />
          <Route exact path='/buyer/addSubscription' component={addSubscription} />
          <Route exact path='/seller/orders' component={orders} />
          <Route exact path ='/buyer/profile' component={buyerProfile} />
          <Route exact path ='/seller/profile' component={sellerProfile} />
          <Route exact path ='/buyer/payment' component={payment} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
