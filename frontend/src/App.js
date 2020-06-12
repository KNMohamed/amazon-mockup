import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'

function App() {
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
          <a href="signin.html">Sign in</a>
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
          <Route path="/products/:id" component={ProductPage} />
          <Route path="/" exact={true} component={HomePage} />
        </div>
      </main>
      <footer className="footer">All rights reserved</footer>
    </div>
  );
}

export default App;
