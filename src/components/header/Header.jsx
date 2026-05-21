import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-left">
        <Link to="/">
          <img src="/img/logo.png" alt="Ace of Base" />
        </Link>
        </div>
      
      <div className="header__title">
        <h1>Ace of Beer</h1>
        
      </div>
      
      <div className="header__logo-right">
        <Link to="/">
          <img src="/img/logo.png" alt="Ace of Base" />
        </Link>
      </div>
    </header>
  );
};

export default Header;