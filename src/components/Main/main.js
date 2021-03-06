import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import {Menu} from '../Menu/menu';
import {InvoiceList} from '../InvoiceList/invoiceList';
import {ProductsList} from '../ProductsList/productsList';
import {CustomersList} from '../CustomersList/customersList';
import {Grid, Col, Row} from 'react-bootstrap';

const Block = ({children}) => (
  <Row>
    <Col xs={12} md={8}>
      {children}
    </Col>
  </Row>
);
const Invoices = props => (
  <Block>
    <InvoiceList {...props} />
  </Block>
);
const Products = props => (
  <Block>
    <ProductsList {...props} />
  </Block>
);
const Customers = props => (
  <Block>
    <CustomersList {...props} />
  </Block>
);

class Main extends React.Component {
  render() {
    return (
      <Grid>
        <Router>
          <div>
            <Menu />
            <Route
              path="/"
              exact={true}
              render={() => <Redirect to="/invoices" />}
            />
            <Route
              path="/invoices"
              render={props => <Invoices props={props} />}
            />
            <Route
              path="/products"
              render={props => <Products props={props} />}
            />
            <Route
              path="/customers"
              render={props => <Customers props={props} />}
            />
          </div>
        </Router>
      </Grid>
    );
  }
}

export {Main};
