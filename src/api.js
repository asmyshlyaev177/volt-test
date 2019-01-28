import axios from 'axios';

const baseUri = '/api';
const customers = 'customers';

const instance = ({ method = 'get', url = '/', data = {}}) => {
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
        get: () => instance({ url: customers }),
        post: data => instance({ url: customers, data })
    },
};

export { api };