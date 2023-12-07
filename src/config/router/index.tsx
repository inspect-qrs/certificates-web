/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Layout from '@/components/Layout'
import NotFoundView from '@/pages/NotFoundView'
import Dashboard from '@/pages/Dashboard'
import VerifyCertificateView from '@/pages/VerifyCertificateView'
import LoginView from '@/pages/LoginView'
import Home from '@/components/Home'
import MyCertificatesView from '@/pages/MyCertificatesView'
import PrintCertificateView from '@/pages/PrintCertificateView'
import PrintCertificatesView from '@/pages/PrintCertificatesView'

const AUTH_REQUIRED: RouteObject[] = [
  {
    index: true,
    path: '',
    element: <Home />
  },
  {
    path: 'admin',
    element: <Dashboard />
  },
  {
    path: 'imprimir-certificados',
    element: <PrintCertificatesView />
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
    element: <MyCertificatesView />
  },
  {
    path: 'verificar-certificado',
    element: <VerifyCertificateView />
  },
  {
    path: 'imprimir-certificado',
    element: <PrintCertificateView />
  },
  {
    path: '*',
    element: <NotFoundView />
  }
])

export default router
