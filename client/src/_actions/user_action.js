import axios from 'axios';
import * as actions from './types';

export function loginUser(dataSubmit) {
  const request = axios
    .post('/api/users/login', dataSubmit)
    .then((response) => {
      return response.data;
    });

  return {
    type: actions.LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataSubmit) {
  const request = axios
    .post('/api/users/register', dataSubmit)
    .then((response) => {
      return response.data;
    });

  return {
    type: actions.REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get('/api/users/auth').then((response) => {
    return response.data;
  });

  return {
    type: actions.AUTH_USER,
    payload: request,
  };
}
