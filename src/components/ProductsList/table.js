import React from 'react';
import { Table as Tab, Button} from 'react-bootstrap';

const Product = ({ ind, id, name, price, edit, remove }) => {

    const editHandler = () => {
        if (isNaN(parseInt(id))) return false;
        edit(id);
    }
    const removeHandler = () => remove(id);

    return (
        <tr>
            <td>{ind}</td>
            <td>{name}</td>
            <td>{price}</td>
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
                    <th>Name</th>
                    <th>Price</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    { data && data.map((el, ind) => (
                        <Product key={ind} {...el} ind={ind} edit={edit} remove={remove} />
                    ))}

                </tbody>
            </Tab>
        );
    };
};

export { Table };