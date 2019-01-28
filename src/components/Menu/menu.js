import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from './link';

const Menu = ({ to }) => (
    <Navbar>
        <Navbar.Brand>
            <Link to='/'>
                Invoice App
            </Link>
        </Navbar.Brand>
        <Nav>
            <NavLink
                to="Invoices"
            />
            <NavLink
                to="Products"
            />
            <NavLink
                to="Customers"
            />
        </Nav>
    </Navbar>
);

export { Menu };