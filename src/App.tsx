import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/config/router'

function App (): React.ReactElement {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
