import React from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import LoginView from '@/pages/LoginView'
import Layout from '@/components/Layout'
import NotFoundView from '@/pages/NotFoundView'
import Dashboard from '@/pages/Dashboard'
import CertificateDetail from '@/pages/CertificateDetail'

const authRequiredRoutes: RouteObject[] = [
  {
    index: true,
    path: 'dashboard',
    element: <Dashboard />
  }
]

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginView />
  },
  {
    path: '/',
    element: <Layout />,
    children: authRequiredRoutes
  },
  {
    path: '*',
    element: <NotFoundView />
  },
  {
    path: 'certificate',
    element: <CertificateDetail />
  }
])

export default router
