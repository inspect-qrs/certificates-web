import { CertificatesService } from '@/api/certificates.service'
import CertificateDetail from '@/components/public/CertificateDetail'
import PublicHeader from '@/components/PublicHeader'
import { Certificate, STATUS } from '@/types/certificate.interface'
import React, { ReactElement, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const INITIAL_VALUE = {
  id: '',
  fullName: '',
  dni: '',
  area: '',
  course: '',
  mark: 0,
  company: '',
  modality: '',
  duration: '',
  validity: 0,
  certification: '',
  date: '',
  status: 'active' as STATUS
}

const VerifyCertificateView = (): ReactElement => {
  const [searchParams] = useSearchParams()
  const [cod, setCod] = useState<string>('')

  useEffect(() => {
    setCod(searchParams.get('cod') ?? '')
  }, [])

  const certificatesService = new CertificatesService()
  const [certificate, setCertificate] = useState<Certificate>(INITIAL_VALUE)
  const [error, setError] = useState<string>('')

  const handleVerifyOnClick = (): void => {
    void certificatesService.findOneByCod(cod)
      .then(response => {
        setCertificate(response)
      })
      .catch((error) => {
        const { message } = error.data
        setError(message)
      })
  }

  const handleSetCertificate = (certificate: Certificate): void => {
    setCertificate(certificate)
  }

  return (
    <>
      <PublicHeader />
      <div className='mt-4'>
        <div className='container'>
          <div>
            <input
              className='block w-full h-10 px-2 border-b border-solid border-black outline-none mb-2 rounded-t-sm  disabled:bg-gray-100'
              type="text" value={cod} disabled />
            <button
              className='bg-black text-white px-12 py-2 rounded-lg text-lg'
              onClick={handleVerifyOnClick}>Verify</button>
          </div>
          { error !== '' && (<p className='mt-2 w-full py-1 text-center bg-red text-white rounded-lg'>{error}</p>)}
          {
            certificate !== INITIAL_VALUE && <CertificateDetail certificate={certificate} setCertificate={handleSetCertificate}/>
          }
        </div>
      </div>
    </>
  )
}

export default VerifyCertificateView
