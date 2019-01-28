import React from 'react';
import { Table as Tab, Button} from 'react-bootstrap';

const Customer = ({ ind, id, name, discount, total, edit, remove }) => {

    const editHandler = () => {
        if (isNaN(parseInt(id))) return false;
        edit(id);
    }
    const removeHandler = () => remove(id);

    return (
        <tr>
            <td>{ind}</td>
            <td>{name}</td>
            <td>{discount}</td>
            <td>{total}</td>
            <td>
                <Button onClick={editHandler}>Edit</Button>
                <Button onClick={removeHandler}>Remove</Button>
                </td>
        </tr>
    );
};

class Table extends React.Component {
    render() {
        const { data, edit, remove } = this.props;
        return (
            <Tab responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Discount</th>
                    <th>Phone</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    { data && data.map((el, ind) => (
                        <Customer key={ind} {...el} ind={ind} edit={edit} remove={remove} />
                    ))}

                </tbody>
            </Tab>
        );
    };
};

export { Table };
