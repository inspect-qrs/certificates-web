import React, { ReactElement } from 'react'
import Certificates from '@/components/certificate/Certificates'

const Dashboard = (): ReactElement => {
  return (
    <>
      {/* <Header /> */}
      <div className='mt-4 w-[80%] mx-auto'>
        <Certificates />
      </div>
    </>
  )
}

export default Dashboard
