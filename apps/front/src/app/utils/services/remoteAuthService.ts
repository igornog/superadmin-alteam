import { AuthService } from '@yjcapp/app'
import axios from './axios'

class RemoteAuthService implements AuthService {
  async login(email: string, password: string) {
    const response = await axios.post('/auth/login', {
      email,
      password,
    })

    if (response.data.token) {
      const { token } = response.data
      localStorage.setItem('alt_user_token', JSON.stringify(token))
      window.location.href = '/talents'
    }

    return response.data
  }

  logout() {
    localStorage.removeItem('alt_user_token')
  }
}

export default RemoteAuthService
