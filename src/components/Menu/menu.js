import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from './link';

class MenuDraft extends React.Component {

    componentWillMount() {
        const { location: { pathname }} = this.props;
        this.setTitle(pathname);
    };
    componentWillReceiveProps(nextProps) {
        const { location: { pathname: oldPathname } } = this.props;
        const { location: { pathname }} = nextProps;
        if (pathname !== oldPathname) {
            this.setTitle(pathname);
        }
    }

    setTitle = titleRaw => {
        const t = titleRaw.replace('/', '');
        const title = `Invoice App ${titleRaw !== '/' ? '- ' + t : ''}`;
        document.title = title;
    }
 
    render() {
        const { to } = this.props;
        return (
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
    };
};

const Menu = withRouter(MenuDraft);
export { Menu };