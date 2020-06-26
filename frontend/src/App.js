import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import SigninPage from './pages/SigninPage';
import RegisterPage from './pages/RegisterPage';
import ManageProducts from './pages/ManageProducts';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';

function App() {

  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;

  const openMenu = () => { document.querySelector(".sidebar").classList.add("open"); }
  const closeMenu = () => { document.querySelector(".sidebar").classList.remove("open"); }

  return (
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>&#9776;</button>
          <Link to='/'>Amazona</Link>
        </div>
        <div className="header-links">
          <a href="cart.html">Cart</a>
          {
            userInfo ? <Link to="/profile/">{userInfo.name}</Link>:
            <Link to="/signin">Sign-in</Link>
          }
        </div>
      </header>
      <aside className="sidebar">
        <h3>Shopping Categories:</h3>
        <button className="close-button" onClick={closeMenu} >X</button>
        <ul>
          <li><a href="index.html">Pants</a></li>
          <li><a href="index.html">Shirts</a></li>
        </ul>
      </aside>
      <main className="main">
        <div className="content">
          <Route path="/order/:id" component={OrderPage}/>
          <Route path="/signin" component={SigninPage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/placeorder"  component={PlaceOrderPage}/>
          <Route path="/payment"  component={PaymentPage}/>
          <Route path="/shipping"  component={ShippingPage}/>
          <Route path="/products"  component={ManageProducts}/>
          <Route path="/product/:id"  component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/" exact={true} component={HomePage} />
        </div>
      </main>
      <footer className="footer">All rights reserved</footer>
    </div>
  );
}

export default App;
