import React from 'react';
import {
    Modal as Mod,
    Button,
    FormGroup,
    ControlLabel,
    FormControl,
 } from 'react-bootstrap';

class Modal extends React.Component {

    editName = ev => {
        const { setField } = this.props;
        setField('name', ev.target.value);
    }
    editAddress = ev => {
        const { setField } = this.props;
        setField('address', ev.target.value);
    }
    editPhone = ev => {
        const { setField } = this.props;
        setField('phone', ev.target.value);
    }
  
    render() {
        const { address, name, phone, id, show, close, send } = this.props;
        const isNewEntry = id === null;
        const title = isNewEntry ? 'Add customer' : `Edit customer ${id}`;
        const btn = isNewEntry ? 'Add' : 'Save';

      return (
          <Mod show={show} onHide={close}>
            <Mod.Header closeButton>
              <Mod.Title>{ title }</Mod.Title>
            </Mod.Header>

            <Mod.Body>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl type="text"
                  onChange={this.editName}
                  value={name || ''}
                />
                <ControlLabel>Address</ControlLabel>
                <FormControl
                  type="text"
                  onChange={this.editAddress}
                  value={address || ''}
                />
                <ControlLabel>Phone</ControlLabel>
                <FormControl
                  type="text"
                  onChange={this.editPhone}
                  value={phone || ''}
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