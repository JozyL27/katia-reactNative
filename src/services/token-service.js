import config from '../config';
import {decode as atob, encode as btoa} from 'base-64';
import AsyncStorage from '@react-native-community/async-storage';
import jwt from 'jwt-decode';

const TokenService = {
  async saveAuthToken(token) {
    try {
      await AsyncStorage.setItem(config.TOKEN_KEY, token);
    } catch (error) {
      console.log(error);
    }
  },
  async getAuthToken() {
    try {
      return await AsyncStorage.getItem(config.TOKEN_KEY).then(res => {
        return jwt(res);
      });
    } catch (error) {
      console.log(error);
    }
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
  async getUserFromToken(token) {
    try {
      const payload = await token;
      return {
        id: payload.id,
        email: payload.sub,
      };
    } catch (e) {
      console.log(e);
    }
  },
};

export default TokenService;
