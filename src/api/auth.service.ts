import { User } from '@/types/user.interface'
import { AppServices } from './api.service'

interface UserData {
  username: string
  password: string
}

interface LoginData {
  token: string
  user: User
}
export class AuthService extends AppServices {
  constructor () {
    super({ url: 'auth' })
  }

  login = async (data: UserData): Promise<LoginData> => {
    return await this.post<LoginData>('/login', data)
      .then(response => {
        const { token, user } = response.data
        return {
          token,
          user
        }
      })
  }

  register = async (data: UserData): Promise<User> => {
    return await this.post<User>('/register', data)
      .then(response => response.data)
  }

  currentUser = async (): Promise<User> => {
    return await this.get<User>('/current-user')
      .then(response => response.data)
  }
}
