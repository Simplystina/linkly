import axios from 'axios';



// Create an instance of Axios with the desired default configuration
const api = axios.create({
  baseURL: 'https://urlshortner-3u0i.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Retrieve the token from storage

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.log(typeof error.response.status,"erorrrrrrrrrr")
    if ((error.response.status === 401) || (error.response.error === 'token_expired')) {
        window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
