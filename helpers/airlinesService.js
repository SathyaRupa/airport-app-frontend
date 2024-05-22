import axios from 'axios';

export default {
  fetchAllAirlines: async page => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/airlines?page=${page}`,
      );
      return response.data;
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  },

  fetchAirlineDetails: async id => {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/airline/${id}`);
      return response.data;
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  },
};
