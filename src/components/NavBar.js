import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { history } from '../helpers/history'


const logout = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    history.push('/login');
    window.location.reload(false);
  }

const NavBar = ({currentUser}) => 
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">NUSCALLIE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="setting">Setting</Nav.Link>
            {currentUser === null
            ? <Nav.Link href="login">Log in</Nav.Link>
            : <Nav.Link href="/" onClick={logout}>Log out</Nav.Link>
            }
            </Nav>
            
            {currentUser === null
            ? null
            : <Nav> 
                <Navbar.Text className="ml-auto">  
                Welcome, { currentUser.username }
              </Navbar.Text>
              </Nav>}
            
        </Navbar.Collapse>
    </Navbar>


export default NavBar