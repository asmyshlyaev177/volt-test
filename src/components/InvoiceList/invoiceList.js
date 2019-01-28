import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from '../Containers/Wrapper';
import { Button, PageHeader } from 'react-bootstrap';
import { api } from '../../api';
import { Modal } from '../InvoiceList/modal';
import { ModalConfirm } from '../ModalConfirm';
import { Table } from '../InvoiceList/table';

class InvoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    api.customers.get()
      .then(res => this.setState({ data: res.data }));
  }

  render() {
    const { data = [] } = this.state;

    return(
      <Wrapper
        title="Invoices list"
        api={api.invoices}
        render={ props => (
        <div>
          <Table
            data={props.data.map(el => {
              const cust = data.find(c => c.id === el.customer_id);
              return { ...el, name: (cust || {}).name };
            })}
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
            data={props.data}
            customers={data}
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
};

export { InvoiceList }; 
