import axios from 'axios';
const baseURL = '/api/';

export const publicRequest = axios.create({
  baseURL,
});

export const privateRequest = axios.create({
  baseURL,
  headers: {
    Authorization: true,
  },
});
