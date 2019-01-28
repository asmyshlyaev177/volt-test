import axios from 'axios';

const baseUri = '/api';
const customers = (id = '') => `customers/${id}`;

const instance = ({ method = 'get', url = '/', data = null }) => {
    const { protocol, port, hostname } = window.location;
    return axios({
        method,
        baseURL: 'api',
        url,
        data
    });
}

const api = {
    instance,
    customers: {
        get: () => instance({ url: customers() }),
        create: data => {
            return instance({ url: customers(), method: 'post', data });
        },
        edit: (id, data) => {
            return instance({ url: customers(id), method: 'put', data });
        },
        delete: id => {
            return instance({ url: customers(id), method: 'delete' });
        },
    },
};

export { api };