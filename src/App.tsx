import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/config/router'

import 'react-toastify/dist/ReactToastify.css'

function App (): React.ReactElement {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
