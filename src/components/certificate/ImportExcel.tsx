import { CertificatesService } from '@/api/certificates.service'
import { Certificate } from '@/types/certificate.interface'
import React, { ReactElement, useState } from 'react'
import Modal from '../Modal'

interface ImportExcelProps {
  close: () => void
  addCertificates: (certificates: Certificate[]) => void
}

const ImportExcel = ({ close, addCertificates }: ImportExcelProps): ReactElement => {
  const certificatesService = new CertificatesService()
  const [file, setFile] = useState<File | null | undefined>(null)
  const [error, setError] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    if (file === null || file === undefined) {
      setError('No se ha subido nigún archivo')
      return
    }

    const formData = new FormData()
    formData.append('excel-file', file)
    void certificatesService.importExcel(formData)
      .then(response => {
        addCertificates(response)
        close()
      })
      .catch(error => {
        const { message } = error.data
        setError(message)
        console.log(error)
      })
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.item(0)

    if (file) {
      const { name } = file
      const lastDot = name.lastIndexOf('.')
      const ext = name.substring(lastDot + 1)

      if (!['xlsx', 'xlsm', 'xls', 'xlt', 'xlsb'].includes(ext)) {
        setError('El archivo no tiene la extension correcta')
        event.target.value = ''
        return
      } else {
        setError('')
      }
    }

    setFile(file)
  }

  return (
    <Modal>
      <h1 className='block uppercase text-center text-xl font-bold'>Import excel</h1>
      <form onSubmit={handleSubmit}>
        <div className='mt-5'>
          <input onChange={onChange} type="file" accept='.xlsx,.xlsm,.xls,.xlt,.xlsb' />
          <p className='m-0 mt-1 text-red lowercase'>{error}</p>
        </div>

        <div className='mt-5 flex gap-3 justify-center'>
          <button className='bg-red text-white px-5 py-1 rounded-lg text-lg' type='button' onClick={close}>Cancel</button>
          <button className='bg-blue text-white px-5 py-1 rounded-lg text-lg' type='submit'>Submit</button>
        </div>
      </form>
    </Modal>
  )
}

export default ImportExcel
