import axios from "axios";

export const loginAPI = async(formData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/login", formData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const registerAPI = async(formData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/register", formData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


