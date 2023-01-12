import React, { ReactElement, useEffect, useState } from 'react'
import Certificates from '../components/certificate/Certificates'

const isNumber = (value: string): boolean => {
  return /^\d+$/.test(value)
}

const MyCertificates = (): ReactElement => {
  const [dni, setDni] = useState('')
  const [error, setError] = useState('')

  const [certificates, setCertificates] = useState<ReactElement>((<div></div>))

  useEffect(() => {
    if (dni.trim() !== '') {
      setError(isNumber(dni) ? '' : 'Formato inválido')
    } else {
      setError('Inserta un valor')
    }
  }, [dni])

  const handleSubmitDni = (): void => {
    setCertificates(<Certificates dni={dni} />)
  }

  const clear = (): void => {
    setDni('')
    setCertificates((<div></div>))
  }

  const onDniChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setDni(value)
  }

  return (
    <>
      <header className='bg-black shadow-lg py-3'>
        <div className='container'>
          <img className='max-w-[120px]' src="/logo-blanco.png" alt="" />
        </div>
      </header>
      <div className='container'>
        <div className='mt-5'>
          <div className='mb-5'>
            <label className='font-medium uppercase'>Enter your dni</label>
            <input
              onChange={onDniChange}
              className='block w-full h-10 px-2 border-b border-solid border-blue-dark outline-none'
              type='text'
              placeholder='Dni'
              value={dni}
            />
            <p className='lowercase text-red'>{error}</p>
            <div className='flex items-center gap-3'>
              <button
                disabled={error !== ''}
                onClick={handleSubmitDni}
                className={`${error !== '' ? 'bg-red-dark' : 'bg-red'}  text-white px-5 py-1 rounded-lg text-lg mt-4`}
              >Search</button>

              <button
                onClick={clear}
                className='bg-black text-white px-5 py-1 rounded-lg text-lg mt-4'
              >Clear</button>
            </div>
          </div>

          <section>
            {certificates}
          </section>
        </div>
      </div>
    </>

  )
}

export default MyCertificates
