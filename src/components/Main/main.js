import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
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
const Invoices = props => (<Block key="1"><InvoiceList {...props}/></Block>);
const Products = props => (<Block key="2"><ProductsList {...props}/></Block>);
const Customers = props => (<Block key="3"><CustomersList {...props}/></Block>);


class Main extends React.Component {

  render() {

    return (
      <Grid>
        <Router>
          <div>
            <Menu />
            <Route exact path="/" render={() => (
              <Redirect to="/invoices" />
              )} />
            <Route
              path="/invoices"
              render={
              props => <Invoices {...props} />
              }
            />
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

export { Main };
