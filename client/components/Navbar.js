import React from 'react';
import { Link, browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
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
                <LinkContainer to={{ pathname: '/signin'}} className="header-login">
                    <NavItem eventKey={1}>Log In</NavItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/'}} className="header-login">
                    <NavItem eventKey={1}>Edit Profile</NavItem>
                </LinkContainer>
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown" onSelect={handleSelect}>
                    <MenuItem eventKey={3.1}>Events</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider/>
                    <MenuItem eventKey={3.4}>Chat</MenuItem>
                </NavDropdown>
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={1} href="#">Logout</NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>

)

function handleSelect(eventKey) {
  if (eventKey === 3.4) {
    browserHistory.push('/chat');
  } else if (eventKey === 3.1) {
    browserHistory.push('/events');
  }
}

export default Navigation
