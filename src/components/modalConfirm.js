import React from 'react';
import {
    Modal as Mod,
    Button,
 } from 'react-bootstrap';

const ModalConfirm = ({ show, cancel, ok }) => {

    return (
      <Mod show={show} onHide={cancel}>
      <Mod.Header closeButton>
        <Mod.Title>Are you sure watn to delete this entry?</Mod.Title>
      </Mod.Header>
  
      <Mod.Body>
        <Button onClick={cancel}>Cancel</Button>
        <Button onClick={ok}>Ok</Button>
      </Mod.Body>
  
    </Mod>
    );
  };

export { ModalConfirm };