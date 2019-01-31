import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal as Mod,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

const Modal = ({setField, address, name, phone, id, show, close, send}) => {
  const editName = ev => {
    setField('name', ev.target.value);
  };
  const editAddress = ev => {
    setField('address', ev.target.value);
  };
  const editPhone = ev => {
    setField('phone', ev.target.value);
  };

  const isNewEntry = id === null;
  const title = isNewEntry ? 'Add customer' : `Edit customer ${id}`;
  const btn = isNewEntry ? 'Add' : 'Save';

  return (
    <Mod show={show} onHide={close}>
      <Mod.Header closeButton>
        <Mod.Title>{title}</Mod.Title>
      </Mod.Header>

      <Mod.Body>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl type="text" onChange={editName} value={name || ''} />
          <ControlLabel>Address</ControlLabel>
          <FormControl
            type="text"
            onChange={editAddress}
            value={address || ''}
          />
          <ControlLabel>Phone</ControlLabel>
          <FormControl type="text" onChange={editPhone} value={phone || ''} />
        </FormGroup>
      </Mod.Body>

      <Mod.Footer>
        <Button onClick={send}>{btn}</Button>
      </Mod.Footer>
    </Mod>
  );
};
Modal.propTypes = {
  address: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  phone: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  show: PropTypes.bool,
  close: PropTypes.func,
  send: PropTypes.func,
  setField: PropTypes.func,
};

Modal.defaultProps = {
  address: '',
  name: '',
  id: '',
  phone: '',
  show: false,
  close: () => false,
  send: () => false,
  setField: PropTypes.func,
};
export {Modal};
