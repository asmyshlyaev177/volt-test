import React from 'react';
import PropTypes from 'prop-types';
import { Button, PageHeader } from 'react-bootstrap';
import { api } from '../../api';
import { Modal } from './modal';
import { ModalConfirm } from '../modalConfirm';
import { Table } from './table';

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.api = api;
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.setField = this.setField.bind(this);
        this.send = this.send.bind(this);
        this.closeConfirmModal = this.closeConfirmModal.bind(this);

        this.mode = 'create';

        this.state = {
            products: [],
            showModal: false,
            confirmModal: false,
            newEntry: {
                name: null,
                price: null,
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
        this.setState({ newEntry: { name: null, price: null, id: null }});
    }

    showModal(id) {
        this.setState({ showModal: true });
    }

    send = () => {
        const {  newEntry: { id, name, price } } = this.state;
        const data = { id, name, price };

        const fn = this.mode === 'edit'
        ? () => api.products.edit(id, data)
        : () => api.products.create(data);
        
        fn()
            .then(() => {
                this.clearData();
                this.closeModal();
                this.get();
            })
    };

    get = () => {
        const { setProducts: cb } = this.context;
        api.products.get()
        .then(res => {
            this.setState({ products: res.data });
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

    removeProduct = () => {
        const { newEntry: {id} } = this.state;
        this.clearData();
        this.closeConfirmModal();
        api.products.delete(id)
            .then(() => {
                this.clearData();
                this.get();
            })
    };

    createProduct = () => {
        this.mode = 'create';
        this.clearData();
        this.showModal();
    };

    editProduct = (id = 0) => {
        const { products } = this.state;
        const elem = products.find(el => el.id === id);
        const { name, price } = elem;
        this.mode = 'edit';
        this.clearData();

        this.setState({ newEntry: { name, price, id } }, () => this.showModal());
    };

    render() {
        const { products, newEntry, showModal, confirmModal } = this.state;

        return (
            <div>
                <PageHeader>
                    Products list
                    <small>
                         <Button
                            onClick={this.createProduct}
                            style={{marginLeft: '20px'}}>
                             Create
                         </Button>
                    </small>
                </PageHeader>

                <Table
                    data={products}
                    edit={this.editProduct}
                    remove={this.confirm}
                />
                <ModalConfirm
                    show={confirmModal}
                    ok={this.removeProduct}
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
ProductsList.contextTypes = {
    setProducts: PropTypes.func
};
export { ProductsList }; 