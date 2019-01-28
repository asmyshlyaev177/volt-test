import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Menu } from '../Menu/menu';
import { InvoiceList } from '../InvoiceList/invoiceList';
import { ProductsList } from '../ProductsList/productsList';
import { CustomersList } from '../CustomersList/customersList';
import { Grid, Col, Row } from 'react-bootstrap';

const Block = ({ children }) => (
    <Row>
        <Col xs={12} md={8}>
            { children }
        </Col>
    </Row>
);
const Invoices = props => (<Block><InvoiceList {...props}/></Block>);
const Products = props => (<Block><ProductsList {...props}/></Block>);
const Customers = props => (<Block><CustomersList {...props}/></Block>);

const state = {
    customers: [],
    products: []
};

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...state
        };
        this.setCustomers = this.setCustomers.bind(this);
        this.setProducts = this.setProducts.bind(this);
    };
    setCustomers = customers => {
        this.setState({ customers });
    };
    setProducts = products => {
        this.setState({ products });
    };

    getChildContext() {
        return {
            setCustomers: this.setCustomers
        };
    };

    render() {
        return (
            <Grid>
                <Router>
                    <div>
                        <Menu />
                        <Route exact path="/" component={Invoices} />
                        <Route path="/invoices" component={Invoices} />
                        <Route
                            path="/products"
                            render={
                                props => <Products {...props} />
                            }
                        />
                        <Route
                            path="/customers"
                            render={
                                props => <Customers {...props} />
                            }
                        />
                    </div>
                </Router>
            </Grid>
        );
    };
};

Main.childContextTypes = {
    setCustomers: PropTypes.func,
    setProducts: PropTypes.func,
}
export { Main };