import React, { ReactElement, useState } from 'react'
import Certificates from '@/components/certificate/Certificates'
import Header from '@/components/Header'
import Toast from '@/components/Toast'

export const ToastContext = React.createContext({ id: '' })
export const SelectedRowsContext = React.createContext({
  selectedRows: [] as string[],
  setSelectedRows: (rows: string[]) => { }
})

const Dashboard = (): ReactElement => {
  const [isExcelModalShowed, setIsExcelModalShowed] = useState<boolean>(false)
  const [isDeleteModalShowed, setIsDeleteModalShowed] = useState<boolean>(false)
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  return (
    <>
      <ToastContext.Provider value={{ id: 'dashboard' }}>
        <SelectedRowsContext.Provider value={{ selectedRows, setSelectedRows }}>
          <Header />
          <div className='container mt-4 w-[80%] mx-auto'>
            <div>
              <div className='flex justify-between items-center mb-5'>
                <h1 className='uppercase font-bold text-xl'>Certificados</h1>
                <div className='flex flex-col sm:flex-row gap-2'>
                  <button
                    className='bg-black text-white px-5 py-2 rounded-lg text-lg'
                    onClick={() => { setIsDeleteModalShowed(!isDeleteModalShowed) }}
                  >
                    {selectedRows.length > 0 ? 'Eliminar seleccionados' : 'Eliminar todo'}
                  </button>
                  <button
                    className='bg-red text-white px-5 py-2 rounded-lg text-lg'
                    onClick={() => { setIsExcelModalShowed(!isExcelModalShowed) }}
                  >
                    Importar Excel
                  </button>
                </div>
              </div>

              <Certificates
                isExcelModalShowed={isExcelModalShowed}
                closeExcelModal={() => { setIsExcelModalShowed(false) }}
                isDeleteModalShowed={isDeleteModalShowed}
                closeDeleteModal={() => { setIsDeleteModalShowed(false) }}
              />
            </div>
          </div>
          <Toast id='dashboard'></Toast>
        </SelectedRowsContext.Provider>
      </ToastContext.Provider>
    </>
  )
}

export default Dashboard
