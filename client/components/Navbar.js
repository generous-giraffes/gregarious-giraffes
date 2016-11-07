import React from 'react';
import { Link } from 'react-router';

const Navbar = () => (
    <header className="header">
        <Link to='/dashboard' className="header-profile">Profile</Link>
        <Link to='/signin' className="header-login">Login</Link>
    </header>
)

export default Navbar
