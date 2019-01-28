import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '../Containers/Wrapper';
import { Button, PageHeader } from 'react-bootstrap';
import { api } from '../../api';
import { Modal } from '../CustomersList/modal';
import { ModalConfirm } from '../ModalConfirm';
import { Table } from '../CustomersList/table';

const CustomersList = props => {

  return(
    <Wrapper
      title="Customers list"
      api={api.customers}
      cb={props.cb}
      render={ props => (
      <div>
        <Table
          data={props.data}
          edit={props.editItem}
          remove={props.confirm}
        />
        <ModalConfirm
          show={props.statusModal}
          ok={props.removeItem}
          cancel={props.closeConfirmModal}
        />
        <Modal
          close={props.closeModal}
          send={props.send}
          setField={props.setField}
          show={props.status}
          {...props.newEntry}
        />
      </div>
      )}
    />
    );
};

export { CustomersList }; 
