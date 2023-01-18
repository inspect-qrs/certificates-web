import React, { ReactElement } from 'react'

const PublicHeader = (): ReactElement => {
  return (
    <header className='bg-black shadow-lg py-3'>
      <div className='container'>
        <img className='max-w-[120px]' src="/logo-blanco.png" alt="" />
      </div>
    </header>
  )
}

export default PublicHeader
