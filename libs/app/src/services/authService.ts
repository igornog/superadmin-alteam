export interface AuthService {
  login: (email: string, password: string) => Promise<void>;
}
