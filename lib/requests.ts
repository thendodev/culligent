import axios from 'axios';
const baseURL = '/api/';

export const publicRequest = axios.create({
  baseURL,
  timeout: 3000,
});

export const privateRequest = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    Authorization: true,
  },
});
