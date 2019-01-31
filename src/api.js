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
  invoices: {
    get: () => instance({url: invoices()}),
    create: ({discount, total, customer_id}) => {
      const payload = {discount, total, customer_id};
      return instance({url: invoices(), method: 'post', data: payload});
    },
    edit: ({id, discount, total, customer_id}) => {
      const payload = {
        discount,
        total,
        customer_id,
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
    edit: ({id, name, address, phone}) => {
      const payload = {
        name,
        address,
        phone,
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
    edit: ({id, name, price}) => {
      const payload = {name, price};
      return instance({url: products(id), method: 'put', data: payload});
    },
    delete: id => {
      return instance({url: products(id), method: 'delete'});
    },
  },
};

const apiUrls = Object.keys(api).reduce((acc, val) => {
  acc[val] = val;
  return acc;
}, {});
export {api, apiUrls};
