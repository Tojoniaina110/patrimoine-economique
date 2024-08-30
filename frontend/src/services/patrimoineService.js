import axios from 'axios';


export const getValeurPatrimoine = async (date) => {
    const response = await axios.get(`http://localhost:5000/patrimoine/${date}`);
    return response;
};
export const getValeurPatrimoineRange = (rangeData) => {
    return axios.post('http://localhost:5000/patrimoine/range', rangeData);
};
