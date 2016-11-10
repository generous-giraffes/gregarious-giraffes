import React from 'react';
import { Link } from 'react-router';
import {Navbar, Nav, MenuItem, NavItem, NavDropdown} from 'react-bootstrap';

const Navigation = () => (
    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/dashboard">PawPrints</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <NavItem eventKey={1}><Link to='/signin' className="header-login">Log In</Link></NavItem>
                <NavItem eventKey={1}><Link to='/' className="header-login">Edit Profile</Link></NavItem>
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider/>
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={1} href="#">Logout</NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>

)

export default Navigation
