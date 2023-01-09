import React, { ReactElement, useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import CertificateToPdf from '@/components/certificate/CertificatePdf'
import { useReactToPrint } from 'react-to-print'

const CertificateDetail = (): ReactElement => {
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
              <button className='ml-4 px-4 py-1 rounded-lg text-white bg-blue' onClick={handlePrint}>Print</button>
              <CertificateToPdf id={id} reference={certificateRef}/>
            </div>
            )
          : (<p className='text-center text-3xl font-bold uppercase'>There was an error, try it later</p>)
      }
    </>

  )
}

export default CertificateDetail
