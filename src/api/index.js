import axios from 'axios';

export const API = axios.create({
  // baseURL: 'http://localhost:3001/api',
  baseURL: 'http://192.168.1.4:3001/api',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'X-Frame-Options': 'DENY',
  }
});
