import { useAuthStore } from '@/config/store/auth'
import React, { ReactElement, useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

export interface Login {
  username: string
  password: string
}

const INITIAL_VALUE = {
  username: '',
  password: ''
}

const LoginView = (): ReactElement => {
  const setToken = useAuthStore((state) => state.setToken)
  const setUser = useAuthStore((state) => state.setUser)

  const isAuth = useAuthStore((state) => state.isAuth)

  const [data, setData] = useState<Login>(INITIAL_VALUE)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) navigate('/dashboard')
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setToken('token')
    setUser({ id: 1, username: 'renato' })
    navigate('/dashboard')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target

    setData({
      ...data,
      [name]: value
    })
  }
  return (
    <div className='grid place-items-center h-screen'>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" placeholder='username' value={data.username} name='username'/>
          <input onChange={handleChange} type="password" placeholder='password' value={data.password} name='password'/>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginView
