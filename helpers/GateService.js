import axios from 'axios';
import url from './Url';

export default {
  fetchAll: async page => {
    try {
      const response = await axios.get(`${url}/gates?page=${page}`);
      return response.data;
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  },
};
