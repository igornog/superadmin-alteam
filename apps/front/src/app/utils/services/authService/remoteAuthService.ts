import { AuthService } from '@yjcapp/app';
import axios from '../axios';

class RemoteAuthService implements AuthService {
  async login(email: string, password: string) {
    return axios.post('/auth/login', {
      data: { email, password },
    });
  }
}

export default RemoteAuthService;
