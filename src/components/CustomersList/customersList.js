import React from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import { api } from '../../api';
import { Modal } from './modal';
import { Table } from './table';

class CustomersList extends React.Component {
    constructor(props) {
        super(props);
        this.api = api;
        this.state = {
            customers: []
        };
    };

    componentWillMount() {
        this.get();
    };

    get = () => api.customers.get()
        .then(res => this.setState({
            customers: res.data
        }));

    render() {
        const { customers } = this.state;

        return (
            <div>
                <PageHeader>
                    Customers list  
                    <small>
                         <Button style={{marginLeft: '20px'}}>Create</Button>
                    </small>
                </PageHeader>

                <Table data={customers} />
                <Modal />
                </div>
        );
    };
};
export { CustomersList }; 