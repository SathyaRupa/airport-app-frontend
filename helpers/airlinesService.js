import axios from 'axios';
import url from './url';

export default {
    fetchAll: async (page) => {
        try{
        const response = await axios.get(`${url}/airlines?page=${page}`)
        return response.data
        } catch (error) {
            console.log("Error fetching data: ", error)
        }
    },
    create: async (payload) => {
        try {
            const response = await axios.post(`http://127.0.0.1:8080/airline`, payload)
            return response
        } catch (error) {
            console.log("Error adding airline: ", error)
        }
  },

  fetchAirlineDetails: async id => {
    try {
      const response = await axios.get(`${url}/airline/${id}`);
      return response.data;
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  },
};
