import { baseUrl } from '@/global/config';
import axios from 'axios';
const requestbase = baseUrl + '/api/';

export const publicRequest = axios.create({
  baseURL: requestbase,
});

export const privateRequest = axios.create({
  baseURL: requestbase,
  headers: {
    Authorization: true,
  },
});
