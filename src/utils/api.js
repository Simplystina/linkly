import axios from 'axios';

// Create an instance of Axios with the desired default configuration
const api = axios.create({
  baseURL: 'https://urlshortner-3u0i.onrender.com',
  headers: {
 
    'Content-Type': 'application/json', // Example: Setting the content type to JSON
    'Accept': 'application/json', // Example: Specifying the accepted response format as JSON
  },
});

// Add an interceptor to include the token in the header for all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Retrieve the token from storage

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, error => {
    console.log(error,"error")
  return Promise.reject(error);
});

export default api;
