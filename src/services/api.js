import axios from "axios";

const instance = axios.create({
    baseURL: 'https://65b21e949bfb12f6eafce72c.mockapi.io/api',
});

export const requestContacts = async () => {
    const { data } = await instance.get('/contacts');
    return data;
};

export const postContact = async (contact) => {
    const { data } = await instance.post('/contacts', contact);
    return data;
};

export const deleteContact = async (id) => {
    const { data } = await instance.delete(`/contacts/${id}`);
    return data;
};

