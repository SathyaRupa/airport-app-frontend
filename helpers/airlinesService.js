import axios from "axios"

export default {
    fetchAllAirlines: async (page) => {
        try{
        const response = await axios.get(`https://localhost:8080/airlines`)
        return response.data
        } catch (error) {
            console.log("Error fetching data: ", error)
        }
    }
}