import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from './App'

import './styles/reset.scss'
import { CookiesProvider } from 'react-cookie'
import { Toaster } from 'react-hot-toast'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <CookiesProvider>
        <App />
        <Toaster position='bottom-center' />
      </CookiesProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
