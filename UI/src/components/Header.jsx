import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light container">
        <Link className="navbar-brand" to="/patrimoine">Patrimoine</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/patrimoine">Patrimoine</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/possession">Possessions</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
