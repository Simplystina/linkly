import axios from 'axios';
import api from '../utils/api'


const API_BASE_URL = 'https://urlshortner-3u0i.onrender.com';

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyMail = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/verify?token=${token}`);

    console.log(response,"response")
    return response.data;
  } catch (error) {
    console.log(error,"errorrr")
    throw error.response.data;
  }
};

export const resendMail = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/resend-link`, data);

    console.log(response,"response")
    return response.data;
  } catch (error) {
    console.log(error,"errorrr")
    throw error.response.data;
  }
};
export const shortenLink = async(data)=>{
  try {
    const response = await api.post('/urls/shorten', data)

    return response.data
  } catch (error) {
    console.log(error,"erorr")
    throw error.response.data;
  }
}

export const linkHistory = async()=>{
  try {
    const response = await api.get('/urls/links/history')
     return response.data
  } catch (error) {
    console.log(error,"erorr")
    throw error.response.data;
  }
}

export const deleteLinks = async(id)=>{
  try {
    const response = await api.delete(`/urls/links/${id}`)
    return response
  } catch (error) {
    console.log(error,"erorr")
    throw error.response.data;
  }
}

export const copyToClipboard = (text, toast) => {

  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Link copied to clipboard');
     

     toast({
      title: 'Link copied successfully',
      status: 'success',
      duration: 1000,
      isClosable: true,
      position:"top-left"
    })
    })
    .catch((error) => {
      console.error('Error copying link to clipboard:', error);
      // Handle the error, e.g., show an error message to the user
    });
};