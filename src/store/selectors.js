import {createSelector} from 'reselect';

const invoicesData = state => state.invoices;
const customersData = state => state.customers;

export const invoicesSelector = createSelector(
  invoicesData,
  customersData,
  (invoices, customers) =>
    invoices.map(inv => {
      const cust = customers.find(c => c.id === inv.customer_id);
      return {...inv, name: (cust || {}).name};
    }),
);
