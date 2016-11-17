import React from 'react';
import { Link, browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import {Navbar, Nav, MenuItem, NavItem, NavDropdown, Image} from 'react-bootstrap';



const Navigation = () => (
    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/"><img src={'../styles/assets/pawprint2.png'}/></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <LinkContainer to={{ pathname: '/signin'}} className="header-login">
                    <NavItem eventKey={1}>Log In</NavItem>
                </LinkContainer>
                <LinkContainer to={{ pathname: '/myProfile'}} className="header-login">
                    <NavItem eventKey={2}>My Profile</NavItem>
                </LinkContainer>
                <NavDropdown eventKey={3} title="See More" id="basic-nav-dropdown" onSelect={handleSelect}>
                    <MenuItem eventKey={3.1}>Dashboard</MenuItem>
                    <MenuItem eventKey={3.2}>Events</MenuItem>
                    <MenuItem divider/>
                    <MenuItem eventKey={3.3}>Chat</MenuItem>
                </NavDropdown>
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={1} href="#">Logout</NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>

);

function handleSelect(eventKey) {
  if (eventKey === 3.3) {
    browserHistory.push('/chat');
  } else if (eventKey === 3.2) {
    browserHistory.push('/events');
  } else if (eventKey === 3.1) {
    browserHistory.push('/dashboard');
  }
}

export default Navigation
