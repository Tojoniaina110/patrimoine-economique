import axios from 'axios';

export const getPossessions = async () => {
    const response = await axios.get('http://localhost:5000/possession');
    return response.data;
};

export const createPossession = (possession) => {
    return axios.post(`http://localhost:5000/possession/create`, possession);
};

export const updatePossession = (libelle, possession) => {
    return axios.put(`http://localhost:5000/possession/${libelle}`, possession);
};

export const closePossession = (libelle) => {
    return axios.post(`http://localhost:5000/possession/${libelle}/close`);
};
