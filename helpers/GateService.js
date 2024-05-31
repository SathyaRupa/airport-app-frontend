import axios from 'axios';
import url from './Url';

export default {
  fetchAll: async (page, floor) => {
    try {
      console.log(' floor no', floor);
      // if (floor <= 0) {
      //   const response = await axios.get(`${url}/gates?page=${page}`);
      //   return response.data;
      // } else {
      const response = await axios.get(
        `${url}/gates?page=${page}&floor=${floor}`,
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  },
  show: async id => {
    try {
      const response = await axios.get(`${url}/gate/${id}`);
      return response.data;
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  },
};
