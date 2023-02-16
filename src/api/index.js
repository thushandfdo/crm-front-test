import axios from 'axios';

export const BASE_URL = 'https://localhost:7143/';

export const ENDPOINTS = {
    note : 'Note',
    customer : 'Customer',
}

export const createAPIEndpoint = (endpoint) => {
    let url = BASE_URL + 'api/' + endpoint;

    return {
        fetch : () => axios.get(url),
        fetchById : (id) => axios.get(url + '/' + id),
        post : (newRecord) => axios.post(url, newRecord),
        put : (id, updateRecord) => axios.put(url + '?customerId=' + id, updateRecord),
        delete : (id) => axios.delete(url + '/' + id)
    }
}