import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

const NotFound = (): ReactElement => {
  return (
    <div>
      <Navigate to='/'/>
    </div>

  )
}

export default NotFound
