/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthStore } from '@/config/store/auth'
import React, { ReactElement } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const Layout = (): ReactElement => {
  const isAuth = useAuthStore((state) => state.isAuth)
  const location = useLocation()
  return (
    <>
      {
        <Navigate to='/login' state={{ from: location }} replace />
      }
    </>

  )
}

export default Layout
