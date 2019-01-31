import React from 'react';
import PropTypes from 'prop-types';
import {Table as Tab, Button} from 'react-bootstrap';

const Customer = ({ind, id, name, discount, total, edit, remove}) => {
  const editHandler = () => {
    if (isNaN(parseInt(id))) return false;
    edit(id);
  };
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
Customer.propTypes = {
  ind: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  discount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  edit: PropTypes.func,
  remove: PropTypes.func,
};

Customer.defaultProps = {
  ind: '',
  id: '',
  name: '',
  discount: '',
  total: '',
  edit: () => false,
  remove: () => false,
};

const Table = ({data, edit, remove}) => (
  <Tab responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Customer name</th>
        <th>Discount</th>
        <th>Total</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {data &&
        data.map((el, ind) => (
          <Customer key={ind} {...el} ind={ind} edit={edit} remove={remove} />
        ))}
    </tbody>
  </Tab>
);
Table.propTypes = {
  data: PropTypes.array,
  edit: PropTypes.func,
  remove: PropTypes.func,
};
Table.defaultProps = {
  data: [],
  edit: () => false,
  remove: () => false,
};

export {Table};
