import React, { ReactElement, useEffect, useState } from 'react'
import { CertificatesService } from '@/api/certificates.service'
import { Certificate } from '@/types/certificate.interface'
import QRCode from 'react-qr-code'

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
  certification: '',
  date: ''
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
      .then(response => {
        setCertificate(response)
        setQrValue(`${QR_BASE_URL}/verificar-certificado?cod=${response.certification}`)
      })
  }, [id])

  return (
    <div className='min-h-screen h-full sm:h-screen p-3' ref={reference}>
      {certificate === INITIAL_VALUE
        ? (
          <div className='bg-white z-[100] absolute top-0 left-0 w-full h-full rounded-xl after:absolute after:w-10 after:h-10 after:top-0 after:right-0 after:left-0 after:bottom-0 after:m-auto after:border-8 after:border-t-black after:opacity-100 after:rounded-[50%] after:animate-spin'>
          </div>
          )
        : (
          <div className='h-full p-6 sm:px-36 flex flex-col justify-between gap-5 sm:gap-0'>
            <div className='flex gap-2 justify-between items-center'>
              <img src="/logo.png" alt="logo" className='h-[60px] sm:h-[80px] w-auto' />
              <img src="/escudo.jpg" alt="escudo" className='h-[70px] sm:h-[90px] w-auto' />
            </div>
            <div className='flex flex-col items-center justify-center h-[75%] text-xl'>
              <h1 className='font-bold uppercase text-5xl'>Certificado</h1>
              <p className='text-center text-2xl'>Otorgado a:</p>
              <p className='text-center font-bold uppercase text-3xl'>{certificate.fullName}</p>
              <p className='text-center italic'>Por haber { certificate.mark > 13 ? 'aprobado satisfactoriamente' : 'participado en'} el curso de:</p>
              <p className='text-center font-bold uppercase text-2xl'>{certificate.course}</p>
              <p className='text-center font-bold'>( <span className='font-bold'>{certificate.modality}</span> )</p>
              <p className='text-center font-bold'>Duración: {certificate.duration} horas</p>
              <p className='text-center italic text-lg'>Brindado a la empresa {certificate.company.toUpperCase()}</p>
              <p className='text-center italic text-lg'>el <span className='capitalize'>{new Date(certificate.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: '2-digit' })}</span></p>
              <div className='flex flex-col justify-center items-center mt-3'>
                <img src="/firma.jpg" alt="" className='h-[95px]' />
                <div className='text-sm border-t border-black px-6 -mt-6'>
                  <p className='font-bold'>Sandra Otero Kruger</p>
                  <p>Jefe de Capacitación</p>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center gap-4 sm:gap-0 pb-4'>
              <div className='w-full flex flex-col sm:flex-row justify-between items-center sm:items-end gap-2'>
                <img className='w-[200px] contrast-50 order-2 sm:order-1' src="/brand.png" alt="brand" />
                <div className='w-auto text-center order-1 sm:order-2'>
                  <div className='mx-auto max-w-[130px] sm:max-w-[100px] '>
                    <QRCode
                      style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                      value={qrValue}
                    />
                  </div>
                  <p className='text-sm'>{certificate.certification}</p>
                </div>
              </div>
              <p className='text-center'>Av. República de Panamá 4575 Ofic. 803-804. Lima 34 - Perú</p>
            </div>
          </div>
          )
      }

    </div>
  )
}

export default CertificateToPdf
