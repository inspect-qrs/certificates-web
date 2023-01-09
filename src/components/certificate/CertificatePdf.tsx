import React, { ReactElement, useEffect, useState } from 'react'
import { CertificatesService } from '@/api/certificates.service'
import { Certificate } from '@/types/certificate.interface'
import QRCode from 'react-qr-code'

const INITIAL_VALUE = {
  id: '',
  name: '',
  lastName: '',
  dni: '',
  course: '',
  duration: '',
  company: '',
  place: '',
  startDate: '',
  endDate: ''
}

interface CertificateToPdfProps {
  id: string
  reference: React.MutableRefObject<HTMLDivElement | null>
}

const QR_BASE_URL: string = import.meta.env.VITE_QR_BASE_URL ?? ''

const CertificateToPdf = ({ id, reference }: CertificateToPdfProps): ReactElement => {
  const certificatesService = new CertificatesService()
  const [certificate, setCertificate] = useState<Certificate>(INITIAL_VALUE)
  const [qrValue, setQrValue] = useState<string>('')

  useEffect(() => {
    if (id === '') return
    void certificatesService.findOneById(id)
      .then(setCertificate)

    setQrValue(`${QR_BASE_URL}?id=${id}`)
  }, [id])

  return (
    <div className='min-h-screen h-full sm:h-screen p-3' ref={reference}>
      <div className='h-full p-6 px-24 flex flex-col justify-between gap-5 sm:gap-0'>
        <div className='flex justify-between'>
          <img src="/logo.png" alt="logo" className='h-auto sm:h-[120px] w-auto' />
          <img src="/escudo.png" alt="escudo" className='h-auto sm:h-[120px] w-auto' />
        </div>
        <div className='flex flex-col items-center justify-center gap-2 h-[75%] text-xl'>
          <h1 className='font-bold uppercase text-5xl'>Certificado</h1>
          <p className='text-center text-2xl'>Otorgado a:</p>
          <p className='text-center font-bold uppercase text-5xl'>{certificate.name} {certificate.lastName}</p>
          <p className='text-center italic'>Por haber aprobado satisfactoriamente los cursos de:</p>
          <p className='text-center font-bold uppercase text-2xl'>{certificate.course}</p>
          <p className='text-center font-bold'>Duración: {certificate.duration}</p>
          <p className='text-center italic'>Brindado por la empresa {certificate.company}</p>
          <p className='text-center italic'>Del {new Date(certificate.startDate).toLocaleDateString()} a {new Date(certificate.endDate).toLocaleDateString()} en {certificate.place}</p>
          <img src="/firma.png" alt="" className='h-auto sm:h-[120px]' />
        </div>

        <div className='flex flex-col items-center gap-4 sm:gap-0 sm:flex-row sm:justify-between pb-4'>
          <img className='' src="/brand.png" alt="brand" />
          <p className='text-center'>Av. República de Panamá 4575 Ofic. 803-804. Lima 34 - Perú</p>
          <div className='w-auto max-w-[120px]'>
            <QRCode
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={qrValue}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificateToPdf
