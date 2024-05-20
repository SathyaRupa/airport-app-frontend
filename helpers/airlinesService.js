import axios from "axios"

export default {
    fetchAllAirlines: async () => {
        try{
        const response = await axios.get(`http://127.0.0.1:8080/airlines`)
        return response.data
        } catch (error) {
            console.log("Error fetching data: ", error)
        }
    }
}