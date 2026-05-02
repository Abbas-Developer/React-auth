import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">MyProject</Link>
            <ul className="nav-links">
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/signup">Signup</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;