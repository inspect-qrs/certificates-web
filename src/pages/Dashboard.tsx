import React, { ReactElement } from 'react'
import Certificates from '@/components/certificate/Certificates'
import Header from '@/components/Header'

const Dashboard = (): ReactElement => {
  return (
    <>
      <Header />
      <div className='container'>
        <Certificates />
      </div>
    </>
  )
}

export default Dashboard
