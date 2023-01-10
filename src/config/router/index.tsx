import React from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Layout from '@/components/Layout'
import NotFoundView from '@/pages/NotFoundView'
import Dashboard from '@/pages/Dashboard'
import CertificateDetail from '@/pages/CertificateDetail'
import Home from '@/components/Home'

const router = createBrowserRouter([
  {
    path: '',
    element: <Home />
  },
  {
    path: 'dashboard',
    element: <Dashboard />
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
