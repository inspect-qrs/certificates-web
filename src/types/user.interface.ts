import { UserRole } from './enum/role.enum'

export interface User {
  id: string
  username: string
  role: UserRole
}
