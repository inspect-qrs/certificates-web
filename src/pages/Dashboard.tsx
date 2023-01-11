import React, { ReactElement, useState } from 'react'
import Certificates from '@/components/certificate/Certificates'
import Header from '@/components/Header'
import Toast from '@/components/Toast'

export const ToastContext = React.createContext({ id: '' })

const Dashboard = (): ReactElement => {
  const [isModalShowed, setIsModalShowed] = useState(false)

  return (
    <>
      <ToastContext.Provider value={{ id: 'dashboard' }}>
        <Header />
        <div className='container mt-4 w-[80%] mx-auto'>
          <div>
            <div className='flex justify-between items-center mb-5'>
              <h1 className='uppercase font-bold text-xl'>Certificates</h1>
              <button
                className='bg-red text-white px-5 py-2 rounded-lg text-lg'
                onClick={() => { setIsModalShowed(!isModalShowed) }}
              >
                Import
              </button>
            </div>

            <Certificates isModalShowed={isModalShowed} close={() => { setIsModalShowed(false) }} />
          </div>
        </div>
        <Toast id='dashboard'></Toast>
      </ToastContext.Provider>
    </>
  )
}

export default Dashboard
