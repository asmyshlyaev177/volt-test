import {combineReducers} from 'redux';

import {SET_INVOICES, SET_PRODUCTS, SET_CUSTOMERS, TOGGLE_MODAL} from './types';

const initialState = {
  customers: [],
  products: [],
  invoices: [],
  modalShow: {
    customers: false,
    invoices: false,
    products: false,
  },
};

function customers(state = initialState.customers, action) {
  switch (action.type) {
    case SET_CUSTOMERS:
      return [...action.data];
    default:
      return state;
  }
}
function products(state = initialState.products, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return [...action.data];
    default:
      return state;
  }
}
function invoices(state = initialState.invoices, action) {
  switch (action.type) {
    case SET_INVOICES:
      return [...action.data];
    default:
      return state;
  }
}

function modalShow(state = initialState.modalShow, action) {
  switch (action.type) {
    case TOGGLE_MODAL: {
      const {url, val} = action;
      return {...state, [url]: val};
    }
    default:
      return state;
  }
}

const reducer = combineReducers({
  customers,
  products,
  invoices,
  modalShow,
});

export default reducer;
