import React from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Layout from '@/components/Layout'
import NotFoundView from '@/pages/NotFoundView'
import Dashboard from '@/pages/Dashboard'
import CertificateDetail from '@/pages/CertificateDetail'

const authRequiredRoutes: RouteObject[] = [
  {
    index: true,
    path: '',
    element: <Dashboard />
  }
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: authRequiredRoutes
  },
  {
    path: 'certificate',
    element: <CertificateDetail />
  },
  {
    path: '*',
    element: <NotFoundView />
  }
])

export default router
