import axios from "axios"
import url from "./url"

export default {
    fetchAllAirlines: async (page) => {
        try{
        const response = await axios.get(`${url}/airlines?page=${page}`)
        return response.data
        } catch (error) {
            console.log("Error fetching data: ", error)
        }
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
