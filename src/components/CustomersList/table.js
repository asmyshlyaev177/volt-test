import React from 'react';
import { Table as Tab } from 'react-bootstrap';

const Customer = ({ ind, name, address, phone, onClick}) => (
    <tr>
        <td>{ind}</td>
        <td>{name}</td>
        <td>{address}</td>
        <td>{phone}</td>
        <td>Edit</td>
    </tr>
);

class Table extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <Tab responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    { data && data.map((el, ind) => (
                        <Customer key={ind} {...el} ind={ind} />
                    ))}

                </tbody>
            </Tab>
        );
    };
};

export { Table };