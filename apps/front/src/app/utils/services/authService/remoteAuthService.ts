import { AuthService } from '@yjcapp/app';
import axios from '../axios';

class RemoteAuthService implements AuthService {
  async login(email: string, password: string) {
    const response = await axios.post('/auth/login', {
      data: { email, password },
    });
    return response.data;
  }
}

export default RemoteAuthService;
