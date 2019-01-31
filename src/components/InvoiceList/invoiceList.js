import React from 'react';
import PropTypes from 'prop-types';
import {Wrapper} from '../Containers/Wrapper';
import {Button, PageHeader} from 'react-bootstrap';
import {apiUrls} from '../../api';
import {actions} from '../../store/actions';
import {connect} from 'react-redux';
import {Modal} from '../InvoiceList/modal';
import {ModalConfirm} from '../ModalConfirm';
import {Table} from '../InvoiceList/table';
import {invoicesSelector} from '../../store/selectors';

const apiUrl = 'invoices';

class InvoiceList extends React.Component {
  componentWillMount() {
    const {
      customers,
      api: {getCustomers},
    } = this.props;
    if (!customers.length) {
      getCustomers();
    }
  }

  render() {
    const {api, data, showModal, toggleModal, customers} = this.props;
    return (
      <Wrapper
        title="Invoices list"
        api={api}
        data={data}
        showModal={showModal}
        toggleModal={toggleModal}
        render={props => (
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
              data={props.data}
              customers={customers}
              send={props.send}
              setField={props.setField}
              show={props.status}
              {...props.newEntry}
            />
          </div>
        )}
      />
    );
  }
}
InvoiceList.propTypes = {
  api: PropTypes.object.isRequired,
  customers: PropTypes.array,
  data: PropTypes.array,
  props: PropTypes.object.isRequired,
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,
};
InvoiceList.defaultProps = {
  customers: [],
  data: [],
  showModal: false,
  toggleModal: () => false,
};

const mapStateToProps = state => {
  const {customers} = state;
  return {
    data: invoicesSelector(state),
    customers: customers,
    showModal: state.modalShow[apiUrl],
  };
};
const mapDispatchToProps = dispatch => {
  return {
    api: {
      get: args => dispatch(actions[apiUrl].get(args)),
      getCustomers: args => dispatch(actions['customers'].get(args)),
      edit: args => dispatch(actions[apiUrl].edit(args)),
      create: args => dispatch(actions[apiUrl].create(args)),
      delete: args => dispatch(actions[apiUrl].delete(args)),
    },
    toggleModal: val => dispatch(actions.toggleModal(apiUrl, val)),
  };
};
const Connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvoiceList);
export {Connected as InvoiceList};
