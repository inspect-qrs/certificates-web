import { AuthService } from '@/api/auth.service'
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
  const authService = new AuthService()
  const setToken = useAuthStore((state) => state.setToken)
  const setUser = useAuthStore((state) => state.setUser)

  const isAuth = useAuthStore((state) => state.isAuth)

  const [data, setData] = useState<Login>(INITIAL_VALUE)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) navigate('/dashboard')
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    void authService.login(data)
      .then(response => {
        setToken(response.token)
        setUser(response.user)
        navigate('/dashboard')
      })
      .catch(error => {
        console.log(error)
        const { message } = error.data
        setError(message)
      })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target

    setData({
      ...data,
      [name]: value
    })
  }
  return (
    <div className='grid place-items-center h-screen container '>
      <div className='w-full max-w-[600px]'>
        <h2 className='block uppercase font-medium text-xl'>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className='block w-full h-10 px-2 border-b border-solid border-blue-dark outline-none mb-5'
            onChange={handleChange} type="text" placeholder='username' value={data.username} name='username'/>
          <input
            className='block w-full h-10 px-2 border-b border-solid border-blue-dark outline-none  mb-5'
            onChange={handleChange} type="password" placeholder='password' value={data.password} name='password'/>
          <p className='m-0 my-1 text-red lowercase'>{error}</p>
          <button className='bg-red text-white px-5 py-2 rounded-lg text-lg' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginView
