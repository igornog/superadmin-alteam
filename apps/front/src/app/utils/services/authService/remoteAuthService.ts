import {AuthService} from "@yjcapp/app";
import axios from "axios";
const API_URL = 'https://dev.api.alteam.io';
export function createRemoteAuthService(): AuthService {
  return {
    login: async (email, password) => {
      return await axios.post(`${API_URL}/auth/login`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data :{email, password}
      });
    }
  }
}
