
import axios from 'axios'

export const login = async (username, password) => {
  try {
    const response = await axios.post(process.env.API_BASEURL + "/v1/login", {username, password})
    return response.data.data
  } catch (error) {
    throw error?.response?.data.error
  }
}