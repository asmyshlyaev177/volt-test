import {SET_INVOICES, SET_PRODUCTS, SET_CUSTOMERS, TOGGLE_MODAL} from './types';
import {api} from '../api';

export const toggleModal = (url, val) => (dispatch, getState) => {
  return dispatch({
    type: TOGGLE_MODAL,
    url,
    val,
  });
};

export const fetchCustomers = () => (dispatch, getState) => {
  return api.customers.get().then(res => {
    const {data} = res;
    dispatch({
      type: SET_CUSTOMERS,
      data,
    });
  });
};
export const editCustomers = args => (dispatch, getState) => {
  const {id} = args;
  const {customers} = getState();
  const edited = customers.find(el => el.id === id);
  return api.customers.edit(args).then(res => {
    const {data} = res;
    const newCustomers = customers.map(el => (el.id === id ? {...data} : el));
    dispatch({
      type: SET_CUSTOMERS,
      data: newCustomers,
    });
  });
};
export const createCustomers = args => (dispatch, getState) => {
  const {customers} = getState();
  return api.customers.create(args).then(res => {
    const {data} = res;
    dispatch({
      type: SET_CUSTOMERS,
      data: customers.concat({...data}),
    });
  });
};
export const deleteCustomers = id => (dispatch, getState) => {
  return api.customers.delete(id).then(res => {
    const {customers} = getState();
    dispatch({
      type: SET_CUSTOMERS,
      data: customers.filter(el => el.id !== id),
    });
  });
};

export const fetchProducts = () => (dispatch, getState) => {
  return api.products.get().then(res => {
    const {data} = res;
    dispatch({
      type: SET_PRODUCTS,
      data,
    });
  });
};
export const editProducts = args => (dispatch, getState) => {
  const {id} = args;
  const {products} = getState();
  const edited = products.find(el => el.id === id);
  return api.products.edit(args).then(res => {
    const {data} = res;
    const newData = products.map(el => (el.id === id ? {...data} : el));
    dispatch({
      type: SET_PRODUCTS,
      data: newData,
    });
  });
};
export const createProducts = args => (dispatch, getState) => {
  const {products} = getState();
  return api.products.create(args).then(res => {
    const {data} = res;
    dispatch({
      type: SET_PRODUCTS,
      data: products.concat({...data}),
    });
  });
};
export const deleteProducts = id => (dispatch, getState) => {
  return api.products.delete(id).then(res => {
    const {products} = getState();
    dispatch({
      type: SET_PRODUCTS,
      data: products.filter(el => el.id !== id),
    });
  });
};
export const fetchInvoices = () => (dispatch, getState) => {
  return api.invoices.get().then(res => {
    const {data} = res;
    dispatch({
      type: SET_INVOICES,
      data,
    });
  });
};
export const editInvoices = args => (dispatch, getState) => {
  const {id} = args;
  const {invoices} = getState();
  const edited = invoices.find(el => el.id === id);
  return api.invoices.edit(args).then(res => {
    const {data} = res;
    const newData = invoices.map(el =>
      +el.id === +id ? {...data, customer_id: +data.customer_id} : el,
    );
    dispatch({
      type: SET_INVOICES,
      data: newData,
    });
  });
};
export const createInvoices = args => (dispatch, getState) => {
  const {invoices} = getState();
  return api.invoices.create(args).then(res => {
    const {data} = res;
    dispatch({
      type: SET_INVOICES,
      data: invoices.concat({...data, customer_id: +data.customer_id}),
    });
  });
};
export const deleteInvoices = id => (dispatch, getState) => {
  return api.invoices.delete(id).then(res => {
    const {invoices} = getState();
    dispatch({
      type: SET_INVOICES,
      data: invoices.filter(el => el.id !== id),
    });
  });
};

export const actions = {
  customers: {
    get: fetchCustomers,
    edit: editCustomers,
    create: createCustomers,
    delete: deleteCustomers,
  },
  products: {
    get: fetchProducts,
    edit: editProducts,
    create: createProducts,
    delete: deleteProducts,
  },
  invoices: {
    get: fetchInvoices,
    edit: editInvoices,
    create: createInvoices,
    delete: deleteInvoices,
  },
  toggleModal,
};
