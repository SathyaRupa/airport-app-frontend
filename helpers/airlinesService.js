import axios from 'axios';
import url from './url';

export default {
  fetchAll: async page => {
    try {
      const response = await axios.get(`${url}/airlines?page=${page}`);
      return response.data;
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  },
  create: async payload => {
    const response = await axios.post(`${url}/airline`, payload);
    return response;
  },

  fetchAirlineDetails: async id => {
    try {
      const response = await axios.get(`${url}/airline/${id}`);
      return response.data;
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  },
  deleteAirline: async id => {
    try {
      const response = await axios.delete(`${url}/airline/${id}`);
      return response;
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  },
};
