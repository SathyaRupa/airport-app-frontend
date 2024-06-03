import axios from 'axios';
import url from './Url';

export default {
  fetchAll: async (page, isAvailable) => {
    try {
      const response = await axios.get(
        `${url}/slots?page=${page}&is_available=${isAvailable}`,
      );
      return response.data;
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  },
};
