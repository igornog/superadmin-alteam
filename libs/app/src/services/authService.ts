export interface User {
  name: string
  email: string
}

export interface AuthService {
  login: (email: string, password: string) => Promise<User>
}
