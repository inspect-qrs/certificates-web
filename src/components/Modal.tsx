import React, { ReactElement } from 'react'

interface ModalProp {
  children?: React.ReactNode
}

const Modal = ({ children }: ModalProp): ReactElement => {
  return (
    <div className={'fixed top-0 left-0 mt-10 w-full h-full bg-gray-light flex justify-center items-start z-[100]'}>
      <div className={'w-[100%] md:max-w-[700px]'}>
        <div className={'w-full bg-white rounded-xl relative'}>
            {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
