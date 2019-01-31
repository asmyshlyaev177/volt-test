import React from 'react';
import PropTypes from 'prop-types';
import {Wrapper} from '../Containers/Wrapper';
import {Button, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {actions} from '../../store/actions';
import {apiUrls} from '../../api';
import {Modal} from '../CustomersList/modal';
import {ModalConfirm} from '../ModalConfirm';
import {Table} from '../CustomersList/table';

const apiUrl = 'customers';

const CustomersList = props => {
  return (
    <Wrapper
      title="Customers list"
      api={props.api}
      data={props.data}
      showModal={props.showModal}
      toggleModal={props.toggleModal}
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
CustomersList.propTypes = {
  api: PropTypes.object.isRequired,
  data: PropTypes.array,
  props: PropTypes.object.isRequired,
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,
};
CustomersList.defaultProps = {
  data: [],
  showModal: false,
  toggleModal: () => false,
};

const mapStateToProps = state => {
  return {
    data: state[apiUrl],
    showModal: state.modalShow[apiUrl],
  };
};
const mapDispatchToProps = dispatch => {
  return {
    api: {
      get: args => dispatch(actions[apiUrl].get(args)),
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
)(CustomersList);
export {Connected as CustomersList};
