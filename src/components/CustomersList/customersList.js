import React from 'react';
import PropTypes from 'prop-types';
import { Button, PageHeader } from 'react-bootstrap';
import { api } from '../../api';
import { Modal } from './modal';
import { ModalConfirm } from '../modalConfirm';
import { Table } from './table';

class CustomersList extends React.Component {
    constructor(props) {
        super(props);
        this.api = api;
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
        this.removeCustomer = this. emoveCustomer.bind(this);
        this.setField = this.setField.bind(this);
        this.send = this.send.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);

        this.mode = 'create';

        this.state = {
            customers: [],
            showModal: false,
            confirmModal: false,
            newEntry: {
                name: null,
                address: null,
                phone: null,
                id: null
            }
        };
    };

    componentWillMount() {
        this.get();
    };

    setField = (field, val) => {
        const { newEntry } = this.state;
        this.setState({ newEntry: { ...newEntry, [field]: val} });
    };

    closeModal() {
        this.setState({ showModal: false });
    }

    clearData() {
        this.setState({ newEntry: { name: null, address: null, phone: null, id: null }});
    }

    showModal(id) {
        this.setState({ showModal: true });
    }

    send = () => {
        const {  newEntry: { id, name, address, phone} } = this.state;
        const data = { id, name, address, phone };

        const fn = this.mode === 'edit'
        ? () => api.customers.edit(id, data)
        : () => api.customers.create(data);
        
        fn()
            .then(() => {
                this.clearData();
                this.closeModal();
                this.get();
            })
    };

    get = () => {
        const { setCustomers: cb } = this.context;
        api.customers.get()
        .then(res => {
            this.setState({ customers: res.data });
            cb(res.data);
         });
    };

    confirm = id => {
        const { newEntry } = this.state;
        this.setState({ confirmModal: true, newEntry: { ...newEntry, id } });
    };

    closeConfirmModal = () => {
        this.setState({ confirmModal: false });
    };

    removeCustomer = () => {
        const { newEntry: {id} } = this.state;
        this.clearData();
        this.closeConfirmModal();
        api.customers.delete(id)
            .then(() => {
                this.clearData();
                this.get();
            })
    };

    createCustomer = () => {
        this.mode = 'create';
        this.clearData();
        this.showModal();
    };

    editCustomer = (id = 0) => {
        const { customers } = this.state;
        const elem = customers.find(el => el.id === id);
        const { name, address, phone } = elem;
        this.mode = 'edit';
        this.clearData();

        this.setState({ newEntry: { name, address, phone, id } }, () => this.showModal());
    };

    render() {
        const { customers, newEntry, showModal, confirmModal } = this.state;

        return (
            <div>
                <PageHeader>
                    Customers list
                    <small>
                         <Button
                            onClick={this.createCustomer}
                            style={{marginLeft: '20px'}}>
                             Create
                         </Button>
                    </small>
                </PageHeader>

                <Table
                    data={customers}
                    edit={this.editCustomer}
                    remove={this.confirm}
                />
                <ModalConfirm
                    show={confirmModal}
                    ok={this.removeCustomer}
                    cancel={this.closeConfirmModal}
                />
                <Modal
                    close={this.closeModal}
                    send={this.send}
                    setField={this.setField}
                    show={showModal}
                    {...newEntry}
                />
            </div>
        );
    };
};
CustomersList.contextTypes = {
    setCustomers: PropTypes.func
};
export { CustomersList }; 