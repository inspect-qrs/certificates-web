import React from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Layout from '@/components/Layout'
import NotFoundView from '@/pages/NotFoundView'
import Dashboard from '@/pages/Dashboard'
import CertificateDetail from '@/pages/CertificateDetail'
import LoginView from '@/pages/LoginView'
import Home from '@/components/Home'
import MyCertificates from '@/pages/MyCertificates'

const AUTH_REQUIRED: RouteObject[] = [
  {
    index: true,
    path: '',
    element: <Home />
  },
  {
    path: 'admin',
    element: <Dashboard />
  }
]

const router = createBrowserRouter([
  {
    path: 'login',
    element: <LoginView />
  },
  {
    path: '/',
    element: <Layout />,
    children: AUTH_REQUIRED
  },
  {
    path: 'mis-certificados',
    element: <MyCertificates />
  },
  {
    path: 'certificado',
    element: <CertificateDetail />
  },
  {
    path: '*',
    element: <NotFoundView />
  }
])

export default router
