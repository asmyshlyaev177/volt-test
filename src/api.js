import axios from 'axios';

const baseUri = '/api';
const customers = (id = '') => `customers/${id}`;
const products = (id = '') => `products/${id}`;
const invoices = (id = '') => `invoices/${id}`;

const instance = ({method = 'get', url = '/', data = null}) => {
  const {protocol, port, hostname} = window.location;
  return axios({
    method,
    baseURL: 'api',
    url,
    data,
  });
};

const api = {
  instance,
  invoices: {
    get: () => instance({url: invoices()}),
    create: ({discount, total, customer_id}) => {
      const payload = {discount, total, customer_id};
      return instance({url: invoices(), method: 'post', data: payload});
    },
    edit: (id, data) => {
      const payload = {
        discount: data.discount,
        total: data.total,
        customer_id: data.customer_id,
      };
      return instance({url: invoices(id), method: 'put', data: payload});
    },
    delete: id => {
      return instance({url: invoices(id), method: 'delete'});
    },
  },
  customers: {
    get: () => instance({url: customers()}),
    create: ({name, address, phone}) => {
      const payload = {name, address, phone};
      return instance({url: customers(), method: 'post', data: payload});
    },
    edit: (id, data) => {
      const payload = {
        name: data.name,
        address: data.address,
        phone: data.phone,
      };
      return instance({url: customers(id), method: 'put', data: payload});
    },
    delete: id => {
      return instance({url: customers(id), method: 'delete'});
    },
  },
  products: {
    get: () => instance({url: products()}),
    create: ({name, price}) => {
      const payload = {name, price};
      return instance({url: products(), method: 'post', data: payload});
    },
    edit: (id, data) => {
      const payload = {name: data.name, price: data.price};
      return instance({url: products(id), method: 'put', data: payload});
    },
    delete: id => {
      return instance({url: products(id), method: 'delete'});
    },
  },
};

export {api};
