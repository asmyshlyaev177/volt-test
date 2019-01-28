import React from 'react';
import { NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router';

const Link = ({ history, to }) => {

    const onClick = ev => {
        ev.preventDefault();
        history.push(String(to).toLowerCase());
    }

    return (
        <NavItem
        eventKey={to}
        onClick={onClick}
        >
            {to}
        </NavItem>
    );
    
};

const NavLink = withRouter(Link);

export { NavLink };