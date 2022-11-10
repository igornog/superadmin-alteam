import axios from 'axios';

const atAxios = axios.create({
  baseURL: 'https://dev.api.alteam.io',
  responseType: 'json',
});

export default atAxios;
