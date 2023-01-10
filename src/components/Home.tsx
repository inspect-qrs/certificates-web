import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

const Home = (): ReactElement => {
  return (
    <Navigate to='/dashboard'></Navigate>
  )
}

export default Home
