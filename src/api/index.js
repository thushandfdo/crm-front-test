import axios from 'axios';

export const BASE_URL = 'https://localhost:7143/';

export const ENDPOINTS = {
    userCustomer : 'DTOUserCustomer',
    user : 'User',
    project : 'Project'
}

export const createAPIEndpoint = (endpoint) => {
    let url = BASE_URL + 'api/' + endpoint;

    return {
        fetch : () => axios.get(url),
        fetchById : (id) => axios.get(url + '/' + id),
        post : (newRecord) => axios.post(url, newRecord),
        put : (id, updateRecord) => axios.put(url + '/' + id, updateRecord),
        delete : (id) => axios.delete(url + '/' + id)
    }
}

export const sendEmail = (to, subject, content, files) => {
    let url = BASE_URL + 'api/Email';

    const formData = new FormData();

    to.map(receiver => 
        formData.append('to', JSON.stringify(receiver))
    );

    formData.append('subject', subject);
    formData.append('content', content);
    
    if(files === null) {
        // formData.append('attachments', null);
    }
    else {
        files.forEach((file) => {
            formData.append('attachments', file);
        });
    }

    axios.post(url, formData)
    .catch(err => {
        console.log(err);
        alert('Send Failed..!');
    });
}