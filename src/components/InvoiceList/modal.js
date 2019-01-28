import React from 'react';
import {
  Modal as Mod,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

class Modal extends React.Component {

  editCustomer = ev => {
    const { setField } = this.props;
    setField('customer_id', ev.target.value);
  }
  editDiscount = ev => {
    const { setField } = this.props;
    setField('discount', ev.target.value);
  }
  editTotal = ev => {
    const { setField } = this.props;
    setField('total', ev.target.value);
  }

  render() {
    const { data, customer_id, customers, discount, total, id, show, close, send } = this.props;
    const isNewEntry = id === null;
    const title = isNewEntry ? 'Add invoice' : `Edit invoice ${id}`;
    const btn = isNewEntry ? 'Add' : 'Save';

    return (
      <Mod show={show} onHide={close}>
        <Mod.Header closeButton>
          <Mod.Title>{ title }</Mod.Title>
        </Mod.Header>

        <Mod.Body>
          <FormGroup>
            <ControlLabel>Customer</ControlLabel>
            <FormControl type="text"
              componentClass="select"
              onChange={this.editCustomer}
              value={customer_id || ''}
            >
              { customers.map((el, ind) => {
              return (<option key={ind} value={el.id}>{el.name}</option>);
              }) }

          </FormControl>
          <ControlLabel>Discount</ControlLabel>
          <FormControl
            type="text"
            onChange={this.editDiscount}
            value={discount || ''}
          />
          <ControlLabel>Total</ControlLabel>
          <FormControl
            type="text"
            onChange={this.editTotal}
            value={total || ''}
          />
        </FormGroup>
      </Mod.Body>

      <Mod.Footer>
        <Button onClick={send}>{btn}</Button>
      </Mod.Footer>
    </Mod>
    );
}
}

export { Modal };
