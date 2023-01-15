import { CertificatesService } from '@/api/certificates.service'
import { SelectedRowsContext, ToastContext } from '@/pages/Dashboard'
import { Certificate } from '@/types/certificate.interface'
import React, { ReactElement, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from '../Modal'

interface DeleteModalProps {
  close: () => void
  removeCertificates: (certificates: Certificate[]) => void
}

const DeleteModal = ({ close, removeCertificates }: DeleteModalProps): ReactElement => {
  const certificatesService = new CertificatesService()

  const toastContext = useContext(ToastContext)
  const { selectedRows, setSelectedRows } = useContext(SelectedRowsContext)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleDelete = (): void => {
    setIsLoading(true)
    const deleteFunction = selectedRows.length > 0 ? deleteMultiple : deleteAll
    void deleteFunction()
      .then(response => {
        setSelectedRows([])
        removeCertificates(response)
        setIsLoading(false)
        toast('Los registros se eliminaron correctamente', { toastId: toastContext.id, type: 'success' })
        close()
      })
      .catch(error => {
        const { message } = error.data
        setSelectedRows([])
        setIsLoading(false)
        setError(message)
        toast(message, { toastId: toastContext.id, type: 'error' })
      })
  }

  const deleteMultiple = async (): Promise<Certificate[]> => {
    return await certificatesService.removeMultiple(selectedRows)
  }

  const deleteAll = async (): Promise<Certificate[]> => {
    const certificates = await certificatesService.findAll()
    return await certificatesService.removeMultiple(certificates.map(certificate => certificate.id))
  }

  return (
    <Modal>
      {isLoading && (
        <div className='bg-gray-light absolute top-0 left-0 w-full h-full rounded-xl after:absolute after:w-10 after:h-10 after:top-0 after:right-0 after:left-0 after:bottom-0 after:m-auto after:border-8 after:border-t-white after:opacity-100 after:rounded-[50%] after:animate-spin'>
        </div>
      )}
      <div className='p-5'>
        <div className='text-center font-bold mb-4'>
          <p className='text-xl'>¿Estás seguro que desea eliminar <span className='text-red'>{selectedRows.length > 0 ? 'los registros seleccionados' : 'todos los registros'}</span>?</p>
          <p className='text-red text-lg'>Se eliminaran {selectedRows.length > 0 ? selectedRows.length : 'todos los'} {selectedRows.length === 1 ? 'registro' : 'registros'}</p>
        </div>
        <p className='text-red'>{error}</p>
        <div className='flex flex-col sm:flex-row justify-center gap-2'>
          <button
            className='bg-black text-white px-5 py-2 rounded-lg text-lg'
            onClick={close}
          >Cancelar</button>
          <button
            className='bg-red text-white px-5 py-2 rounded-lg text-lg'
            onClick={handleDelete}
          >Eliminar</button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
