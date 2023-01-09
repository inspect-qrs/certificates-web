import React, { ReactElement } from 'react'

interface ModalProp {
  children?: React.ReactNode
}

const Modal = ({ children }: ModalProp): ReactElement => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-light flex justify-center items-start z-[100]">
      <div className="w-[80%] md:max-w-[700px] bg-white p-5 rounded-xl mt-10">
        { children }
      </div>
    </div>
  )
}

export default Modal
