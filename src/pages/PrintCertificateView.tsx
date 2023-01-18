import CertificateToPdf from '@/components/public/CertificatePdf'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

const PrintCertificateView = (): ReactElement => {
  const [searchParams] = useSearchParams()
  const [id, setId] = useState<string>('')
  const certificateRef = useRef< HTMLDivElement | null>(null)

  useEffect(() => {
    setId(searchParams.get('id') ?? '')
  }, [])

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current
  })

  return (
    <>
      {
        id !== ''
          ? (
            <div className='mt-4'>
              <button className='ml-4 px-4 py-1 rounded-lg text-white bg-red' onClick={handlePrint}>Imprimir</button>
              <CertificateToPdf id={id} reference={certificateRef}/>
            </div>
            )
          : (<p className='text-center text-3xl font-bold uppercase'>Hubo un error, intente mas tarde</p>)
      }
    </>

  )
}

export default PrintCertificateView
