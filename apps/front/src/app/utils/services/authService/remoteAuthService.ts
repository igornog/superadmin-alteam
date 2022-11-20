import { AuthService } from '@yjcapp/app';
import axios from '../axios';

class RemoteAuthService implements AuthService {
  async login(email: string, password: string) {
    const response = await axios.post('/auth/login', {
      data: { email, password },
    });
    const { token, user } = response.data; // TODO store token in local storage
    return user;
  }
}

export default RemoteAuthService;
