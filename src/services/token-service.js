import config from '../config';
import {AsyncStorage} from 'react-native';
import {decode as atob, encode as btoa} from 'base-64';

const TokenService = {
  saveAuthToken(token) {
    AsyncStorage.setItem(config.TOKEN_KEY, token);
  },
  getAuthToken() {
    return AsyncStorage.getItem(config.TOKEN_KEY);
  },
  clearAuthToken() {
    AsyncStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(user_name, password) {
    return btoa(`${user_name}:${password}`);
  },
  getUserFromToken(token) {
    try{
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);

    return {
      id: payload.id,
      email: payload.email
    }
  } catch(e) {
    console.log(e)
  }
  },
};

export default TokenService;
