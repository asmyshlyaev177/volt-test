import React from 'react';
import {
  Modal as Mod,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  editName = ev => {
    const {setField} = this.props;
    setField('name', ev.target.value);
  };
  editPrice = ev => {
    const {setField} = this.props;
    setField('price', ev.target.value);
  };

  render() {
    const {price, name, id, show, close, send} = this.props;
    const isNewEntry = id === null;
    const title = isNewEntry ? 'Add product' : `Edit product ${id}`;
    const btn = isNewEntry ? 'Add' : 'Save';

    return (
      <Mod show={show} onHide={close}>
        <Mod.Header closeButton>
          <Mod.Title>{title}</Mod.Title>
        </Mod.Header>

        <Mod.Body>
          <FormGroup>
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              onChange={this.editName}
              value={name || ''}
            />
            <ControlLabel>Price</ControlLabel>
            <FormControl
              type="text"
              onChange={this.editPrice}
              value={price || ''}
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
Modal.propTypes = {
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  show: PropTypes.bool,
  close: PropTypes.func,
  send: PropTypes.func,
  setField: PropTypes.func,
};

Modal.defaultProps = {
  price: '',
  name: '',
  id: '',
  show: false,
  close: () => false,
  send: () => false,
  setField: PropTypes.func,
};

export {Modal};
