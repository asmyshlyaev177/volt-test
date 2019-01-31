import React from 'react';
import {
  Modal as Mod,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const Modal = ({
  setField,
  data,
  customer_id,
  customers,
  discount,
  total,
  id,
  show,
  close,
  send,
}) => {
  const editCustomer = ev => {
    setField('customer_id', ev.target.value);
  };
  const editDiscount = ev => {
    setField('discount', ev.target.value);
  };
  const editTotal = ev => {
    setField('total', ev.target.value);
  };

  const isNewEntry = id === null;
  const title = isNewEntry ? 'Add invoice' : `Edit invoice ${id}`;
  const btn = isNewEntry ? 'Add' : 'Save';

  const customerId = customer_id;

  return (
    <Mod show={show} onHide={close}>
      <Mod.Header closeButton>
        <Mod.Title>{title}</Mod.Title>
      </Mod.Header>

      <Mod.Body>
        <FormGroup>
          <ControlLabel>Customer</ControlLabel>
          <FormControl
            type="text"
            componentClass="select"
            onChange={editCustomer}
            value={customerId}>
            {customers.map((el, ind) => {
              return (
                <option key={ind} value={el.id}>
                  {el.name}
                </option>
              );
            })}
            <option key={'empty'} value={undefined} />
          </FormControl>
          <ControlLabel>Discount</ControlLabel>
          <FormControl
            type="text"
            onChange={editDiscount}
            value={discount || ''}
          />
          <ControlLabel>Total</ControlLabel>
          <FormControl type="text" onChange={editTotal} value={total || ''} />
        </FormGroup>
      </Mod.Body>

      <Mod.Footer>
        <Button onClick={send}>{btn}</Button>
      </Mod.Footer>
    </Mod>
  );
};

Modal.propTypes = {
  data: PropTypes.array,
  customer_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  customers: PropTypes.array,
  discount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  show: PropTypes.bool,
  close: PropTypes.func,
  send: PropTypes.func,
  setField: PropTypes.func,
};

Modal.defaultProps = {
  data: [],
  customer_id: '',
  customers: [],
  discount: '',
  total: '',
  id: '',
  show: false,
  close: () => false,
  send: () => false,
  setField: () => false,
};
export {Modal};
