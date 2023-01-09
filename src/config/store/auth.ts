import create from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  token: string
  user: any
  isAuth: boolean
}

interface Actions {
  setToken: (token: string) => void
  setUser: (user: any) => void
  logout: () => void
}

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: '',
      user: null,
      isAuth: false,
      setToken: (token: string) => {
        set((state) => ({
          token,
          isAuth: !!token
        }))
      },
      setUser: (user: any) => { set((state) => ({ user })) },
      logout: () => { set((state) => ({ token: '', user: null, isAuth: false })) }
    }),
    {
      name: 'auth'
    }
  )
)
