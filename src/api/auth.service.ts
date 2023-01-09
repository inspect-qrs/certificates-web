import { AppServices } from './api.service'

export class AuthService extends AppServices {
  constructor () {
    super({ url: 'auth' })
  }
}
